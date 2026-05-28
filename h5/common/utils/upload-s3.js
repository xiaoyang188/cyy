import { getSuffix, getUUID } from '@/common/utils/utils.js'
import CryptoJS from '@/libs/crypto-js.min.js'
import dayjs from '@/libs/day.js'
//亚马逊和移动云
export class S3Uploader {
  /**
   * @param {Object} config 配置对象
   * @param {string} config.accessKeyId AWS访问密钥
   * @param {string} config.secretAccessKey AWS秘密密钥
   * @param {string} config.region 区域
   * @param {string} config.bucket 存储桶名称
   * @param {number} [config.expirationMinutes=15] 策略过期时间
   * @param {number} [config.fileSizeLimit=10485760] 文件大小限制
   */
  constructor(config) {
    if (!config.accessKeyId || !config.secretAccessKey) {
      console.warn('AWS密钥未配置!')
    }
    this.config = {
      expirationMinutes: 15,
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
      ...config,
    }
  }
  /**
   * 生成S3上传策略和签名
   * @returns {Object} 包含策略、签名等数据的对象
   */
  generatePolicyAndSignature() {
    const { accessKeyId, secretAccessKey, region, bucket, expirationMinutes, fileSizeLimit, endpoint } = this.config
    // 处理日期
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8) // YYYYMMDD
    // 生成策略
    const policy = {
      expiration: new Date(Date.now() + expirationMinutes * 60000).toISOString(),
      conditions: [
        { bucket },
        ['starts-with', '$key', ''],
        { acl: 'public-read' },
        ['content-length-range', 0, fileSizeLimit],
        ['starts-with', '$Content-Type', ''],
        { 'x-amz-date': amzDate },
        { 'x-amz-server-side-encryption': 'AES256' },
        { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
        { 'x-amz-credential': `${accessKeyId}/${dateStamp}/${region}/s3/aws4_request` },
      ],
    }

    // 生成签名密钥
    const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + secretAccessKey)
    const kRegion = CryptoJS.HmacSHA256(region, kDate)
    const kService = CryptoJS.HmacSHA256('s3', kRegion)
    const kSigning = CryptoJS.HmacSHA256('aws4_request', kService)
    // 生成Base64策略
    const policyString = JSON.stringify(policy).replace(/\n|\r/g, '')
    const policyBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(policyString))
    // 计算签名
    const signature = CryptoJS.HmacSHA256(policyBase64, kSigning).toString(CryptoJS.enc.Hex)
    return {
      policy: policyBase64,
      signature,
      amzDate,
      credential: `${accessKeyId}/${dateStamp}/${region}/s3/aws4_request`,
    }
  }
  /**
   * 上传文件到S3
   * @param {Object} file uni.chooseFile返回的文件对象
   * @param {Object} [options] 可选参数
   * @param {Function} [options.onProgress] 上传进度回调
   * @param {Function} [options.onComplete] 上传结束回调（无论成功失败）
   * @returns {Promise} 返回上传任务的Promise
   */
  async uploadFile(file, { onProgress, onComplete } = {}) {
    if (!file || !file.path) {
      throw new Error('无效的文件对象')
    }
    const { bucket, region, dir, endpoint, type } = this.config
    const { policy, signature, amzDate, credential } = this.generatePolicyAndSignature()
    let joint = getUUID()
    let fileName = `${joint}${getSuffix(file.name ?? file.path)}`
    let filePath = `${dir}${dayjs(new Date()).format('YYYY-MM-DD')}/${fileName}`
    let updateUrl = type == 'ecloud' ? `https://${bucket}.${endpoint}/` : `https://${bucket}.s3.${region}.amazonaws.com/`
    let fileNetworkPath = `${updateUrl}${filePath}`
    const formData = {
      key: filePath,
      acl: 'public-read',
      'Content-Type': file.type || 'application/octet-stream',
      'X-Amz-Date': amzDate,
      'X-Amz-Server-Side-Encryption': 'AES256',
      'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
      'X-Amz-Credential': credential,
      'X-Amz-Signature': signature,
      Policy: policy,
    }
    return new Promise((resolve, reject) => {
      const uploadTask = uni.uploadFile({
        url: updateUrl,
        filePath: file.path,
        name: 'file',
        formData,
        success: (res) => {
          resolve({
            statusCode: res.statusCode,
            id: fileNetworkPath,
            name: file.name || fileName,
            path: fileNetworkPath,
            thumb: fileNetworkPath,
          })
        },
        fail: reject,
        complete: (res) => {
          // 无论成功失败都会触发
          if (typeof onComplete === 'function') {
            setTimeout(() => {
              onComplete(res) // 执行完成回调
            }, 0)
          }
        },
      })

      // 进度监听
      if (typeof onProgress === 'function') {
        uploadTask.onProgressUpdate(onProgress)
      }
    })
  }
}