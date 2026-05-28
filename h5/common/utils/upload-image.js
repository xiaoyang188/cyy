import { message } from './message.js'
import { host, SERIAL, API_VERSION, SERVER_TYPE, tokenName } from '../config.js'
import { http } from '@/common/api/index.js'
import dayjs from '@/libs/day.js'
import { decrypt } from '@/common/utils/crypto.js'
import { getUUID, getSuffix, imageAllType, videoAllType, getSaizhugeLang } from '@/common/utils/utils.js' // 获取文件后缀名
import { S3Uploader } from '@/common/utils/upload-s3.js'
/* 判断url路径处理 */
function posUrl(url) {
  let newUrl = ''
  if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
    newUrl = url
  } else {
    newUrl = `${host}/api/${url}`
  }
  return newUrl
}
// 赛诸葛上传
/**
 * [constructor description]
 * @param  {[Array]} files [chooseImg选中的tempFilePaths、chooseVideo选中的rempFilePath]
 * @param  {[Object]} json  [success每上传成功一张调用 complete全部上传完成调用]
 * @return {[void]}       [description]
 */
class SaiZhuGeUploadFiles {
  constructor(files, json) {
    if (!Array.isArray(files)) {
      throw new Error('Class UploadFileToOSS parameter must be an array')
    }
    this.data = []
    this.fn = json.success
    this.S3 = null
    this.complete = json.complete
    this.progressChange = json.progressChange
    this.fail = json.fail
    this.files = files
    this.fileLen = this.files.length
    this.curIndex = 0
    this.resData = false
    /**——————————————————————————————————————————————————————————
     * 腾讯云上传需要提前生成文件路径，因为需要在接口queryAutograph中使用
     * 示例：m2245/2025-10-01/1278c5c3d0746694fa5661a41553024e1761615010496.png
     */
    let joint = getUUID()
    this.curFileName = `${joint}${getSuffix(this.files[this.curIndex].name ?? this.files[this.curIndex].path)}`
    this.curFilePath = `${API_VERSION}/${dayjs(new Date()).format('YYYY-MM-DD')}/${this.curFileName}`
    // —————————————————————— 上传文件 ——————————————————————————

    uni.showLoading({
      title: global.i18n.t('正在加载...'),
      mask: true,
    })
    if (!this.resData) this.getUploadConfig()
  }
  async getUploadConfigCos(resData) {
    try {
      let joint = getUUID()
      this.curFileName = `${joint}${getSuffix(this.files[this.curIndex].name ?? this.files[this.curIndex].path)}`
      this.curFilePath = `${API_VERSION}/${dayjs(new Date()).format('YYYY-MM-DD')}/${this.curFileName}`
      let {
        data: { code, msg, data },
      } = await http.post(global.apiUrls.queryAutograph, { is_encrypt: 1, member_id: API_VERSION.replace(/\D/g, ''), filename: this.curFilePath })
      if (code != 1) {
        uni.hideLoading()
        message.info(msg)
        return
      }
      // 判断data是否为字符串
      if (typeof data === 'string') {
        data = JSON.parse(decrypt(data))
      }
      this.resData = data
      const fileInfo = this.files[this.curIndex]
      let allowUploadFile = this.uploadVerification(fileInfo, data)
      if (allowUploadFile !== true) {
        uni.hideLoading()
        let msg = global.i18n.t('文件超出大小限制')
        this.fail && this.fail(msg)
        return message.info(msg)
      }

      if (data.deploy == 'tencent') {
        this.uploadFileToCOS(data)
      }
    } catch (error) {
      uni.hideLoading()
      console.error(error)
    }
  }
  async getUploadConfig() {
    try {
      let {
        data: { code, msg, data },
      } = await http.post(global.apiUrls.queryAutograph, { is_encrypt: 1, member_id: API_VERSION.replace(/\D/g, ''), filename: this.curFilePath })
      if (code != 1) {
        uni.hideLoading()
        message.info(msg)
        return
      }
      // 判断data是否为字符串
      if (typeof data === 'string') {
        data = JSON.parse(decrypt(data))
      }
      this.resData = data
      if (['amazons3', 'ecloud'].includes(data.deploy)) {
        this.S3 = new S3Uploader({
          dir: data.dir || '',
          accessKeyId: data.value_info.ak,
          secretAccessKey: data.value_info.sk,
          bucket: data.value_info.bucket,
          region: data.value_info.region,
          endpoint: data.value_info.endpoint,
          type: data.deploy,
        })
      }
      if (data.deploy == 'tencent') {
        this.getUploadConfigCos(data)
        return
      }
      this.uploadFile()
    } catch (error) {
      uni.hideLoading()
      console.error(error)
    }
  }
  uploadFile() {
    let resData = this.resData
    const fileInfo = this.files[this.curIndex]
    let allowUploadFile = this.uploadVerification(fileInfo, resData)
    if (allowUploadFile !== true) {
      uni.hideLoading()
      let msg = global.i18n.t('文件超出大小限制')
      this.fail && this.fail(msg)
      return message.info(msg)
    }
    // deploy 1 本地服务器上传 否则 上传至oss
    if (resData.deploy == 1) this.uploadFileToLocal(resData)
    else if (resData.deploy == 'huawei') {
      this.uploadFileToOBS(resData)
    } else if (['amazons3', 'ecloud'].includes(resData.deploy)) {
      this.uploadFileToS3()
    } else if (resData.deploy == 'tencent') {
      this.uploadFileToCOS(resData)
    } else this.uploadFileToOSS(resData)
  }
  // oss 上传验证
  uploadVerification(file, info) {
    if (!file.size) return true
    //获取文件类型
    let suffix = getSuffix(file.name ?? file.path).replace('.', '')
    let size = 0
    if (info.image_ext?.split(',').includes(suffix)) {
      size = +info.image_size
    } else if (info.video_ext?.split(',').includes(suffix)) {
      size = +info.video_size
    } else if (info.file_ext?.split(',').includes(suffix)) {
      size = +info.size
    } else if (info.audio_ext?.split(',').includes(suffix)) {
      size = +info.audio_size
    }
    if (size <= 0) return true
    if (file.size / 1024 < size) return true
    return false
  }
  // 上传到亚马逊或移动云
  async uploadFileToS3() {
    const fileInfo = this.files[this.curIndex]
    try {
      let { statusCode, ...file } = await this.S3.uploadFile(fileInfo, {
        onComplete: (res) => {
          console.log('上传完成', res)
          this.curIndex++ // 这个图片执行完上传后，开始上传下一张
          if (this.curIndex >= this.fileLen) {
            // 当图片传完时，停止调用
            this.complete(this.data)
            uni.hideLoading()
          } else {
            // 若图片还没有传完，则继续调用函数
            this.uploadFile()
          }
        },
      })
      if (statusCode == 200 || statusCode < 300) {
        this.data.push(file)
        if (this.fn) this.fn(this.data)
      } else {
        message.info(global.i18n.t('上传失败，请重试'))
      }
    } catch (error) {
      console.error('上传失败:', error)
    }
  }
  // 上传到腾讯云
  uploadFileToCOS(resData) {
    // 构造表单数据
    const formData = {
      key: this.curFilePath,
      policy: resData.policy,
      success_action_status: 200,
      'q-signature': resData.signature,
      'q-sign-algorithm': 'sha1',
      'q-ak': resData.value_info.ak,
      'q-key-time': resData.value_info['q-key-time'],
      'x-cos-security-token': resData.value_info.securityToken,
    }
    // 执行上传
    const uploadTask = uni.uploadFile({
      url: resData.value_info.cosHost,
      formData: formData,
      filePath: this.files[this.curIndex].path,
      name: 'file',
      success: (res) => {
        if (res.statusCode == 200) {
          var fileUrl = resData.value_info.domain + '/' + resData.value_info.cosKey
          this.data.push({
            id: fileUrl,
            name: this.curFileName,
            path: fileUrl,
            thumb: fileUrl + '?vframe/jpeg/offset/1',
          })
          if (this.fn) this.fn(this.data)
        } else {
          message.info(global.i18n.t('上传失败，请重试'))
        }
      },
      fail: (err) => {
        console.log(err)
        message.info(global.i18n.t('上传失败，请重试'))
        uni.hideLoading()
        this.fail && this.fail(err)
      },
      complete: () => {
        this.curIndex++ // 当前文件执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当文件传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若文件还没有传完，则继续调用函数
          this.getUploadConfigCos()
        }
      },
    })
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.progressChange && this.progressChange(res.progress)
    })
  }
  // 本地上传
  uploadFileToLocal(resData) {
    let fileInfo = this.files[this.curIndex]
    const uploadTask = uni.uploadFile({
      url: posUrl(global.apiUrls.UPLOAD_IMAGE_URL),
      filePath: fileInfo.path,
      name: 'file',
      // #ifdef MP-DINGTALK
      fileType: 'image',
      // #endif
      header: {
        [tokenName]: global.token || '',
        'Accept-Language': global.locale,
        lang: getSaizhugeLang(global.locale),
        'Accept-Serial': SERIAL,
      },
      formData: {
        module: '',
        dir: resData.dir || '',
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.code == 1) {
          this.data.push({ name: fileInfo.name, ...data.data[0] })
          if (this.fn) this.fn(this.data)
        } else {
          message.info(global.i18n.t('上传失败，请重试'))
        }
      },
      fail: (err) => {
        console.log(err)
        message.info(global.i18n.t('上传失败，请重试'))
        uni.hideLoading()
        this.fail && this.fail(err)
      },
      complete: () => {
        this.curIndex++ // 这个图片执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当图片传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若图片还没有传完，则继续调用函数
          this.uploadFile()
        }
      },
    })
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.progressChange && this.progressChange(res.progress)
    })
  }
  // OBS上传 华为云上传
  uploadFileToOBS(ossData) {
    const fileInfo = this.files[this.curIndex]
    let joint = getUUID()
    let fileSuffix = getSuffix(fileInfo.name ?? fileInfo.path)
    let fileName = `${joint}${fileSuffix}`
    let filePath = `${ossData.dir}${dayjs(new Date()).format('YYYY-MM-DD')}/${fileName}`
    let fileNetworkPath = `${ossData.host}/${filePath}`
    const uploadTask = uni.uploadFile({
      url: ossData.host,
      filePath: fileInfo.path,
      // #ifdef MP-DINGTALK
      fileType: 'image',
      // #endif
      name: 'file',
      formData: {
        key: filePath, // 文件名
        policy: ossData.policy, // 后台获取超时时间
        signature: ossData.signature, // 后台获取签名
        AccessKeyId: ossData.accessid, // 后台获取临时ID
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.data.push({
            id: fileNetworkPath,
            name: fileInfo.name || fileName,
            path: fileNetworkPath,
            thumb: fileNetworkPath + '?vframe/jpeg/offset/1',
          })
          if (this.fn) this.fn(this.data)
        } else {
          message.info(global.i18n.t('上传失败，请重试'))
        }
      },
      fail: (err) => {
        console.log(err)
        message.info(global.i18n.t('上传失败，请重试'))
        uni.hideLoading()
        this.fail && this.fail(err)
      },
      complete: () => {
        this.curIndex++ // 当前文件执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当文件传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若文件还没有传完，则继续调用函数
          this.uploadFile()
        }
      },
    })
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.progressChange && this.progressChange(res.progress)
    })
  }
  uploadFileToOSS(ossData) {
    const fileInfo = this.files[this.curIndex]
    let joint = getUUID()
    let fileSuffix = getSuffix(fileInfo.name ?? fileInfo.path)
    let fileName = `${joint}${fileSuffix}`
    let filePath = `${ossData.dir}${dayjs(new Date()).format('YYYY-MM-DD')}/${fileName}`
    let fileNetworkPath = `${ossData.host}/${filePath}`
    const uploadTask = uni.uploadFile({
      url: ossData.host,
      filePath: fileInfo.path,
      // #ifdef MP-DINGTALK
      fileType: 'image',
      // #endif
      name: 'file',
      formData: {
        key: filePath, // 文件名
        policy: ossData.policy, // 后台获取超时时间
        OSSAccessKeyId: ossData.accessid, // 后台获取临时ID
        success_action_status: 200, // 让服务端返回200,不然，默认会返回204
        signature: ossData.signature, // 后台获取签名
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          // 判断fileNetworkPath是否为heic结尾
          let thumb = fileNetworkPath
          if (['.heif', '.heic'].includes(fileSuffix)) {
            thumb = fileNetworkPath + '?x-oss-process=image/format,png'
          } else if (imageAllType.includes(fileSuffix)) {
            thumb = fileNetworkPath + '?x-oss-process=image/resize,w_100'
          } else if (videoAllType.includes(fileSuffix)) {
            thumb = fileNetworkPath + '?x-oss-process=video/snapshot,t_1,m_fast,ar_auto'
          }
          this.data.push({
            id: fileNetworkPath,
            name: fileInfo.name || fileName,
            path: fileNetworkPath,
            thumb: thumb,
          })
          if (this.fn) this.fn(this.data)
        } else {
          message.info(global.i18n.t('上传失败，请重试'))
        }
      },
      fail: (err) => {
        console.log(err)
        message.info(global.i18n.t('上传失败，请重试'))
        uni.hideLoading()
        this.fail && this.fail(err)
      },
      complete: () => {
        this.curIndex++ // 当前文件执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当文件传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若文件还没有传完，则继续调用函数
          this.uploadFile()
        }
      },
    })
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.progressChange && this.progressChange(res.progress)
    })
  }
}
// 普通上传
class OrdinaryUploadFiles {
  /**
   * [constructor description]
   * @param  {[Array]} files [chooseImg选中的tempFilePaths]
   * @param  {[Object]} json  [success每上传成功一张调用 complete全部上传完成调用]
   * @return {[void]}       [description]
   */
  constructor(files, json) {
    if (!Array.isArray(files)) {
      throw new Error('Class UploadImg parameter must be an array')
    }
    let _this = this
    _this.data = []
    _this.fn = json.success
    _this.url = json.url ? host + '/api' + json.url : host + '/api' + global.apiUrls.UPLOAD_IMAGE_URL
    _this.complete = json.complete
    _this.fail = json.fail
    _this.progressChange = json.progressChange
    _this.files = files
    _this.formData = json.formData || {}
    _this.fileLen = _this.files.length
    _this.curIndex = 0
    uni.showLoading({
      // title: '上传中'
      title: global.i18n.t('上传中'),
    })
    _this.upload()
  }
  upload() {
    const uploadTask = uni.uploadFile({
      url: this.url,
      filePath: this.files[this.curIndex].path,
      name: 'file',
      header: {
        [tokenName]: global.token || '',
        'Accept-Language': global.locale,
        lang: getSaizhugeLang(global.locale),
        'Accept-Serial': SERIAL,
      },
      formData: {
        module: '',
        dir: '',
        ...this.formData,
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.code == 1) {
          let file = Array.isArray(data.data) ? data.data[0] : data.data
          let fileSuffix = getSuffix(this.files[this.curIndex].path)
          let thumb = file.path
          if (['.heif', '.heic'].includes(fileSuffix)) {
            thumb = thumb + '?x-oss-process=image/format,png'
          } else if (imageAllType.includes(fileSuffix)) {
            thumb = thumb + '?x-oss-process=image/resize,w_100'
          } else if (videoAllType.includes(fileSuffix)) {
            thumb = thumb + '?x-oss-process=video/snapshot,t_1,m_fast,ar_auto'
          }
          file.thumb = thumb
          this.data.push(file)
          if (this.fn) this.fn(this.data)
        } else {
          message.info(global.i18n.t('上传失败，请重试'))
        }
      },
      fail: (err) => {
        console.log(err)
        message.info(global.i18n.t('上传失败，请重试'))
        uni.hideLoading()
        this.fail && this.fail(err)
      },
      complete: () => {
        this.curIndex++ // 这个图片执行完上传后，开始上传下一张
        if (this.curIndex >= this.fileLen) {
          // 当图片传完时，停止调用
          this.complete(this.data)
          uni.hideLoading()
        } else {
          // 若图片还没有传完，则继续调用函数
          this.upload()
        }
      },
    })
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.progressChange && this.progressChange(res.progress)
    })
  }
}

let UploadFiles = null

switch (SERVER_TYPE) {
  case 0: //赛诸葛
    UploadFiles = SaiZhuGeUploadFiles
    break
  case 1: //java
    UploadFiles = OrdinaryUploadFiles
    break
  default:
    UploadFiles = OrdinaryUploadFiles
    break
}
export default UploadFiles
