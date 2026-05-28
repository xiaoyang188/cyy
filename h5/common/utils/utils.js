import { LOGIN_PAGE_URL, RESOURCES_PATH, ACCEPT_PLATFORM, isGoogleMap } from '../config.js'
import uploadImage from '@/common/utils/upload-image.js'
// #ifdef APP-PLUS
import openMAPGoogle from './googleMap.js'
// #endif
export function benbenImageSrcResolution(name, type = 'diy') {
  if (RESOURCES_PATH) {
    // 线上地址
    if (type == 'diy') return `${RESOURCES_PATH}/static/images/${name}`
    if (type == 'tab') return `${RESOURCES_PATH}/static/tab/${name}`
    return `${RESOURCES_PATH}/static/global/${name}`
  } else {
    // 本地地址
    if (type == 'diy') return require('@/static/images/' + name)
    if (type == 'tab') return require('@/static/tab/' + name)
    return require('@/static/global/' + name)
  }
}
export function getSaizhugeLang(lang) {
  let saizhugeLang = {
    'zh-Hans': 'zh',
    'zh-Hant': 'tw',
    ja: 'jp',
    ko: 'kor',
    es: 'spa',
    my: 'may',
    fr: 'fra',
    alb: 'ara',
    bo_CN: 'zang',
    vn: 'vie',
    laos: 'lao',
    kaz: 'kka',
    ide: 'id',
    bul: 'bg',
  }
  return saizhugeLang[lang] ? saizhugeLang[lang] : lang
}
export const videoAllType = [
  // === 主流通用容器格式 (最常见) ===
  '.mp4',
  '.mkv',
  '.mov',
  '.webm',
  '.avi',
  '.flv',
  '.wmv',
  '.ts',
  '.mts',
  '.m2ts', // 传输流与蓝光格式
  '.3gp',
  '.3g2', // 早期移动设备格式
  '.ogv',
  '.ogm', // Ogg开源容器

  // === 专业影视、广播与光盘格式 ===
  '.mxf', // 广播级专业交换格式
  '.m4v', // iTunes视频（带DRM的MP4）
  '.vob', // DVD视频文件
  '.mod',
  '.tod', // 老式摄像机格式
  // === 过时或边缘化的格式 ===
  '.rm',
  '.rmvb', // RealMedia（已淘汰）
  '.asf', // 微软早期流媒体
  '.divx', // DivX编码的AVI变体
  '.f4v', // Flash后期格式
  '.nsv', // Nullsoft流媒体
  // === 注意：以下通常是项目文件，不是直接可播放的视频 ===
  // '.veg', '.prproj', '.aep', '.dem' 等
]
export const imageAllType = [
  // === 网页与通用核心格式 (必知) ===
  '.jpg',
  '.jpeg',
  '.jpe',
  '.jfif', // JPEG 系列
  '.png',
  '.gif',
  '.webp',
  '.svg', // 矢量图形
  // === 高质量、印刷与专业用途 ===
  '.bmp',
  '.dib', // 位图
  '.tiff',
  '.tif', // 高质量无损
  '.heif',
  '.heic', // 高效率图像（苹果设备主要格式）
  '.raw', // 通用原始图像后缀（非相机品牌专用）
  '.ico',
  '.cur', // 图标与光标
  // === 相机原始文件 (RAW, 各品牌专有) ===
  '.arw',
  '.sr2',
  '.srf', // 索尼
  '.crw',
  '.cr2',
  '.cr3', // 佳能
  '.nef',
  '.nrw', // 尼康
  '.orf', // 奥林巴斯
  '.raf', // 富士
  '.rw2', // 松下
  '.dng', // Adobe 通用原始格式
  '.pef',
  '.ptx', // 宾得
  '.erf', // 爱普生
  '.mrw', // 美能达
  '.x3f', // 适马

  // === 过时、特殊或软件相关格式 ===
  '.pcx', // 早期DOS图像
  '.tga',
  '.icb',
  '.vda',
  '.vst', // Truevision Targa (游戏贴图常用)
  '.ppm',
  '.pgm',
  '.pbm',
  '.pnm', // 便携式像素图
  '.psd',
  '.psb', // Adobe Photoshop 项目文件 (非最终图像)
  '.xcf', // GIMP 项目文件 (非最终图像)
  '.cdr', // CorelDRAW 矢量项目文件
  '.eps',
  '.ai', // Adobe Illustrator 矢量项目文件
  '.indd', // Adobe InDesign 项目文件
  '.exif', // 含EXIF信息的JPEG变体

  // === 特殊用途 ===
  '.hdr',
  '.exr', // 高动态范围图像
  '.pict',
  '.pct',
  '.pic', // 苹果早期图像
  '.wbmp', // 无线位图 (早期手机)
  '.webp', // 强调：WebP已列入核心，此处是重复提示重要性
]
export function syncUniApi(apiName, params) {
  return new Promise((resolve, reject) => {
    let purpose = uni[apiName]
    // #ifdef H5
    if (apiName == 'saveImageToPhotosAlbum') {
      purpose = downloadBlob
    }
    // #endif

    if (!purpose) {
      reject(`${apiName}不存在`)
      return
    }
    // #ifdef APP-PLUS
    if (apiName == 'chooseLocation' && (isGoogleMap === true || isGoogleMap === 'true')) {
      purpose = openMAPGoogle
    }
    // #endif
    let data = {
      ...params,
      success: resolve,
      fail: (err) => {
        if (params.fail) return params.fail(err)
        //判断err.errMsg提示是否包含 Permission 字段不区分大小写
        if (err?.errMsg?.toLowerCase()?.includes('permission') || err?.errMsg?.toLowerCase()?.includes('权限')) {
          uni.showToast({
            title: global.i18n.t('权限已经被拒绝请前往设置中开启'),
            icon: 'none',
          })
        }
        reject(err)
      },
    }
    // #ifdef MP-WEIXIN
    let powerInfo = {
      getLocation: 'scope.userLocation',
      startLocationUpdate: 'scope.userLocation',
      getFuzzyLocation: 'scope.userFuzzyLocation',
      startLocationUpdateBackground: 'scope.userLocationBackground',
      startRecord: 'scope.record',
      joinVoIPChat: 'scope.record',
      RecorderManager: 'scope.record',
      createVKSession: 'scope.camera',
      openBluetoothAdapter: 'scope.bluetooth',
      createBLEPeripheralServer: 'scope.bluetooth',
      saveImageToPhotosAlbum: 'scope.writePhotosAlbum',
      saveVideoToPhotosAlbum: 'scope.writePhotosAlbum',
      addPhoneContact: 'scope.addPhoneContact',
      addPhoneRepeatCalendar: 'scope.addPhoneCalendar',
      getWeRunData: 'scope.werun',
      addPhoneCalendar: 'scope.addPhoneCalendar',
    }
    if (!powerInfo[apiName]) {
      purpose(data)
    } else {
      uni.getSetting({
        success: (res) => {
          //判断res.authSetting是否包含scope.record字段
          if (!res.authSetting.hasOwnProperty(powerInfo[apiName]) || res.authSetting[powerInfo[apiName]]) {
            purpose(data)
          } else {
            uni.openSetting({
              success: (res) => {
                if (res.authSetting[powerInfo[apiName]]) {
                  purpose(data)
                } else {
                  reject('用户未授权')
                }
              },
            })
          }
        },
        fail: (err) => { },
      })
    }
    // #endif
    // #ifndef MP-WEIXIN
    purpose(data)
    // #endif
  })
}
//文件到本地
export function downloadBlob(content) {
  // #ifdef H5
  // 创建一个<a>标签
  const link = document.createElement('a')
  // 设置 href 属性为 Blob 的 URL
  link.href = content.filePath
  link.download = new Date().getTime()
  // 将链接插入到文档中
  document.body.appendChild(link)

  // 模拟点击事件
  link.click()
  // 清除链接并释放 URL 对象
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
  content.success && content.success()
  // #endif
}
// 导航
export function handleNavigation(addressInfo) {
  if (!addressInfo.latitude || !addressInfo.longitude) return
  // 微信
  // #ifdef MP-WEIXIN
  let _obj = {
    latitude: parseFloat(addressInfo.latitude),
    longitude: parseFloat(addressInfo.longitude),
    name: addressInfo.name,
  }
  uni.openLocation({
    ..._obj,
    success: function (res) {
      console.log('打开系统位置地图成功')
    },
    fail: function (error) {
      console.log(error)
    },
  })
  // #endif
  // #ifdef H5
  window.location.href = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${addressInfo.latitude},${addressInfo.longitude}${addressInfo.name ? ';addr:' + addressInfo.name : ''
    }`
  // #endif
  // #ifdef APP-PLUS
  // 判断系统安装的地图应用有哪些, 并生成菜单按钮
  let _mapName = [
    {
      title: global.i18n.t('高德地图'),
      name: 'amap',
      androidName: 'com.autonavi.minimap',
      iosName: 'iosamap://',
      andName: 'amapuri://',
    },
    {
      title: global.i18n.t('百度地图'),
      name: 'baidumap',
      androidName: 'com.baidu.BaiduMap',
      iosName: 'baidumap://',
      andName: 'baidumap://',
    },
    {
      title: global.i18n.t('腾讯地图'),
      name: 'qqmap',
      androidName: 'com.tencent.map',
      iosName: 'qqmap://',
      andName: 'qqmap://',
    },
    {
      title: global.i18n.t('苹果地图'),
      name: 'applemap',
      androidName: '',
      iosName: 'http://maps.apple.com/',
      andName: '',
    },
    {
      title: global.i18n.t('谷歌地图'),
      name: 'googlemap',
      androidName: 'com.google.android.apps.maps',
      iosName: 'comgooglemaps://',
      andName: 'google.navigation://',
    },
  ]
  // 根据真机有的地图软件 生成的 操作菜单
  let buttons = []
  let platform = uni.getSystemInfoSync().platform
  platform === 'android' &&
    _mapName.forEach((item) => {
      if (
        plus.runtime.isApplicationExist({
          pname: item.androidName,
        })
      ) {
        buttons.push(item)
      }
    })
  platform === 'ios' &&
    _mapName.forEach((item) => {
      if (
        plus.runtime.isApplicationExist({
          action: item.iosName,
        })
      ) {
        buttons.push(item)
      }
    })
  if (buttons.length) {
    plus.nativeUI.actionSheet(
      {
        //选择菜单
        title: global.i18n.t('选择地图应用'),
        cancel: global.i18n.t('取消'),
        buttons: buttons,
      },
      function (e) {
        let _map = buttons[e.index - 1]
        openMAP(_map, platform, addressInfo)
      },
    )
  } else {
    uni.showToast({
      title: global.i18n.t('请安装地图软件'),
      icon: 'none',
    })
    return
  }
  // #endif
}
export function openMAP(_map, platform, addressInfo) {
  const { latitude, longitude, name } = addressInfo
  let params = {}
  let url = ''
  let openName = platform === 'android' ? 'andName' : 'iosName'
  switch (_map.name) {
    case 'amap':
      url = `${_map[openName]}viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
      break
    case 'baidumap':
      url = `${_map[openName]}map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
      break
    case 'qqmap':
      url = `${_map[openName]}map/geocoder?coord=${latitude},${longitude}&referer=XXXXX`
      break
    // 添加 Google Maps 处理逻辑
    case 'googlemap':
      if (platform === 'android') {
        // Android 使用 geo: 协议
        url = `geo:${latitude},${longitude}?q=${latitude},${longitude}`
        if (name) {
          url += `(${encodeURIComponent(name)})`
        }
      } else {
        // iOS 使用 comgooglemaps:// 协议
        url = `${_map[openName]}maps?q=${latitude},${longitude}`
        if (name) {
          url += `&center=${latitude},${longitude}&views=traffic&zoom=15`
        }
      }
      break
    case 'applemap':
      if (platform === 'ios') {
        url = `${_map.iosName}?ll=${latitude},${longitude}`
        if (name) {
          url += `&q=${encodeURIComponent(name)}`
        }
      }
      break
  }
  if (url) {
    plus.runtime.openURL(url, (error) => {
      if (error) {
        console.log(error, 'error')
        uni.showToast({
          title: global.i18n.t('请确认地图应用已安装'),
          icon: 'none',
        })
      }
    })
  } else {
    uni.showToast({
      title: global.i18n.t('不支持的平台'),
      icon: 'none',
    })
  }
}

export function imageUpload(count = 1, croppingWidth, croppingHeight) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: +count, // 默认3
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        if (croppingWidth && croppingHeight) {
          uni.navigateTo({
            url: `/pages/benben-built-in/image-cropping/image-cropping?croppingTypes=auto&rectWidth=${croppingWidth}&rectHeight=${croppingHeight}&fileType=${res.tempFiles[0].type}&myImgUrl=${res.tempFilePaths[0]}`,
            animationDuration: 0,
            success: () => {
              uni.$once('image-cropping-success', (file) => {
                if (!file) return
                new uploadImage([file], {
                  complete: function (res) {
                    if (res.length) {
                      resolve(count == 1 ? res[0] : res)
                    } else {
                      reject()
                    }
                  },
                })
              })
            },
          })
        } else {
          // 开始上传
          new uploadImage(res.tempFiles, {
            complete: function (res) {
              if (res.length) {
                resolve(count == 1 ? res[0] : res)
              } else {
                reject()
              }
            },
          })
        }
      },
      fail: (error) => reject(error),
    })
  })
}
export function videoUpload() {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      sourceType: ['camera', 'album'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        let fileInfo = [{ name: res.name, size: res.size, path: res.tempFilePath }]
        // 开始上传
        new uploadImage(fileInfo, {
          complete: function (res) {
            if (res.length) {
              resolve(res[0])
            } else {
              reject()
            }
          },
        })
      },
      fail: (error) => reject(error),
    })
  })
}
export function dataToJSONString(data) {
  if (['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(data))) return JSON.stringify(data)
  return data
}
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Number} wait 延时的时间
 * @return {boolean} 是否执行
 */
let antiShakeTimeoutFn = null
export function antiShakeThrottle(wait = 1000) {
  if (antiShakeTimeoutFn) return true
  antiShakeTimeoutFn = setTimeout(() => {
    clearTimeout(antiShakeTimeoutFn)
    antiShakeTimeoutFn = null
  }, wait)
  return false
}
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let throttleTimer, throttleFlag
export function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!throttleFlag) {
      throttleFlag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      throttleTimer = setTimeout(() => {
        throttleFlag = false
      }, wait)
    }
  } else {
    if (!throttleFlag) {
      throttleFlag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      throttleTimer = setTimeout(() => {
        throttleFlag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
}
/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
export function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
  if (timestamp == null) timestamp = Number(new Date())
  timestamp = parseInt(timestamp)
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  var timer = new Date().getTime() - timestamp
  timer = parseInt(timer / 1000)
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = ''
  switch (true) {
    case timer < 300:
      tips = global.i18n.t('刚刚')
      break
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + global.i18n.t('分钟前')
      break
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + global.i18n.t('小时前')
      break
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + global.i18n.t('天前')
      break
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + global.i18n.t('个月前')
        } else {
          tips = parseInt(timer / (86400 * 365)) + global.i18n.t('年前')
        }
      } else {
        tips = timeFormat(timestamp, format)
      }
  }
  return tips
}
export function getUUID() {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '' + S4() + '' + S4() + '' + S4() + '' + S4() + S4() + S4() + new Date().getTime()
}
export function getSuffix(fileName) {
  let pos = fileName.lastIndexOf('.')
  return pos != -1 ? fileName.substring(pos) : ''
}
// 判断arr是否为一个数组，返回一个bool值
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
// 深度克隆
export function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    //原始类型直接返回
    return obj
  }
  var o = isArray(obj) ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}
export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
  // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
  // 所以这里做一个兼容polyfill的兼容处理
  if (!String.prototype.padStart) {
    // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
    String.prototype.padStart = function (maxLength, fillString = ' ') {
      if (Object.prototype.toString.call(fillString) !== '[object String]') throw new TypeError('fillString must be String')
      let str = this
      // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
      if (str.length >= maxLength) return String(str)
      let fillLength = maxLength - str.length,
        times = Math.ceil(fillLength / fillString.length)
      while ((times >>= 1)) {
        fillString += fillString
        if (times === 1) {
          fillString += fillString
        }
      }
      return fillString.slice(0, fillLength) + str
    }
  }
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp)
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date())
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  let date = new Date(timestamp)
  let ret
  let opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}
/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timeout = null
export function debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func()
    }, wait)
  }
}
// 匹配css变量替换
export function replaceCSSVariables(cssString, variables) {
  const regex = /var\((--[a-zA-Z0-9_-]+)\)/g
  return cssString.replace(regex, (match) => {
    return variables[match] || match
  })
}
export function getLaunchOptions() {
  let launchOptions = uni.getLaunchOptionsSync()
  if (launchOptions.query?.scene) {
    let scene = decodeURIComponent(launchOptions.query.scene)
    launchOptions.query = { ...launchOptions.query, ...parseParams(scene) }
  }
  return launchOptions
}
/**
 * 通用URL参数解析函数（100%兼容所有场景）
 * @param {string} str - 待解析的字符串（可带任意前缀、?、&）
 * @returns {object} 解析后的参数键值对
 */
export function parseParams(str) {
  const params = {};
  // 步骤1：提取 ? 后的所有内容（无?则取空字符串）
  const paramStr = str.includes('?') ? str.split('?')[1] : str;
  // 步骤2：用稳健的正则匹配所有参数（你的原正则核心逻辑，仅匹配&分隔的参数）
  const regParam = /([^&=]+)=([^&]*?)(?=&|$)/g;

  let match;
  // 循环匹配参数（仅解析?后的部分）
  while ((match = regParam.exec(paramStr)) !== null) {
    params[match[1]] = match[2];
  }
  return params;
}
//1都不支持 2安卓指纹 3 苹果指纹 4 苹果人脸 5 苹果人脸加指纹
export function biometrics() {
  return new Promise((resolve) => {
    //#ifdef APP-PLUS || MP-WEIXIN
    uni.checkIsSupportSoterAuthentication({
      success(res) {
        //  console.log('检测支持的认证方式', res);
        if (res.errMsg === 'checkIsSupportSoterAuthentication:ok') {
          let support = 1
          let supportMode = res.supportMode
          let platform = uni.getSystemInfoSync().platform
          // "facial" 人脸 "fingerPrint" 指纹识别
          console.log('supportMode', supportMode)
          // 如果都不支持 隐藏该选项
          if (supportMode.length === 0) {
            support = 1
          }
          // 如果是安卓机  只让用指纹识别
          if (platform === 'android' && supportMode.findIndex((item) => item === 'fingerPrint') !== -1) {
            support = 2
          }
          // 如果是苹果机  看是否是支持人脸还是指纹
          if (platform === 'ios') {
            // 指纹
            if (supportMode.findIndex((item) => item === 'fingerPrint') !== -1) {
              support = 3
            }
            // 人脸
            if (supportMode.findIndex((item) => item === 'facial') !== -1) {
              support = 4
            }
            // 指纹人脸同时存在
            if (supportMode.findIndex((item) => item === 'facial') !== -1 && supportMode.findIndex((item) => item === 'fingerPrint') !== -1) {
              support = 5
            }
          }
          resolve(support)
        }
      },
      fail(err) {
        console.log(err)
        resolve(1)
      },
    })
    // #endif
    //#ifndef APP-PLUS || MP-WEIXIN
    return 1
    // #endif
  })
}

/**
 * @description showModal 弹窗封装
 * @param {Object} options = 参数同 uni-app 官方用法
 * */
export function showModal(options) {
  uni.showModal(options)
}
/**
 * @description 验证登录权限,接受一个回调函数,登录则执行回调函数,非登录状态则跳转登录页
 * @param {Function} cb = 回调函数
 * */
export function actionAuth(cb) {
  if (global.token) {
    cb && cb()
  } else {
    navigateToLogin()
  }
}

/**
 * @description 判断是app端还是小程序端登录
 * */
let timer = null // 登录页跳转防抖
export function navigateToLogin() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    const pages = getCurrentPages()
    let url = LOGIN_PAGE_URL
    if (pages.length != 0) {
      const lastPage = '/' + pages.pop().route
      if (lastPage == url) return
      if (pages.length > 1) {
        uni.redirectTo({
          url,
        })
      } else {
        uni.navigateTo({
          url,
        })
      }
    } else {
      uni.navigateTo({
        url,
      })
    }
  }, 200)
}

/**
 * @description 倒计时计算
 * */
export function downTime(time) {
  var days = parseInt(time / (1000 * 60 * 60 * 24))
  var hours = parseInt((time / (1000 * 60 * 60)) % 24)
  var minutes = parseInt((time / (1000 * 60)) % 60)
  var seconds = parseInt((time / 1000) % 60)
  return {
    days,
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
  }
}

/**
 * @description 参数序列化
 * */
export function serialize(data) {
  let str = ''
  Object.keys(data).forEach((key) => {
    str += key + '=' + data[key] + '&'
  })
  str = str.substr(0, str.length - 1)
  return str
}

/**
 * @description 设置状态栏颜色
 * @param {String} color dark or light
 * @example this.$util.setNavigationBarColor('dark');
 * */
export function setNavigationBarColor(color) {
  if (color == 'dark') {
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle('dark')
    // #endif
    // #ifdef MP-WEIXIN
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFFFFF',
    })
    // #endif
  } else if (color == 'light') {
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle('light')
    // #endif
    // #ifdef MP-WEIXIN
    wx.setNavigationBarColor({
      frontColor: '#FFFFFF',
      backgroundColor: '#000000',
    })
    // #endif
  }
}

/**
 * base64图片缓存到本地,返回本地路径
 * */
export function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',')
      var type = base64[0].match(/:(.*?);/)[1]
      var str = atob(base64[1])
      var n = str.length
      var array = new Uint8Array(n)
      while (n--) {
        array[n] = str.charCodeAt(n)
      }
      return resolve(
        (window.URL || window.webkitURL).createObjectURL(
          new Blob([array], {
            type: type,
          }),
        ),
      )
    }
    var extName = base64.match(/data\:\S+\/(\S+);/)
    if (extName) {
      extName = extName[1]
    } else {
      reject(new Error('base64 error'))
    }
    var fileName = Date.now() + '.' + extName
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
      bitmap.loadBase64Data(
        base64,
        function () {
          var filePath = '_doc/uniapp_temp/' + fileName
          bitmap.save(
            filePath,
            {},
            function () {
              bitmap.clear()
              resolve(filePath)
            },
            function (error) {
              bitmap.clear()
              reject(error)
            },
          )
        },
        function (error) {
          bitmap.clear()
          reject(error)
        },
      )
      return
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function () {
          resolve(filePath)
        },
        fail: function (error) {
          reject(error)
        },
      })
      return
    }
    reject(new Error('not support'))
  })
}
export function styleObjToStr(obj) {
  let str = ''
  for (let i in obj) {
    str += `${i}:${obj[i]};`
  }
  return str
}
export const dataTypeJudge = (param) => {
  if (param === null) {
    return 'Null'
  } else if (typeof param === 'undefined') {
    return 'Undefined'
  } else if (typeof param == 'string') {
    return 'String'
  } else if (typeof param == 'number') {
    return 'Number'
  } else if (typeof param == 'boolean') {
    return 'Boolean'
  } else if (typeof param == 'object') {
    if (Object.prototype.toString.call(param) == '[object Array]') {
      return 'Array'
    } else if (Object.prototype.toString.call(param) == '[object Object]') {
      return 'Object'
    }
  }
}
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && !value.length) ||
  (dataTypeJudge(value) == 'Object' && Object.keys(value).length === 0) ||
  (dataTypeJudge(value) == 'Number' && Number.isNaN(value))
