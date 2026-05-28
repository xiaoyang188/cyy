import { API_BASE_URL, SYSTEM_CONFIG } from '@/common/config.js'
import { message, Router, validate } from '@/common/utils/index.js'
let updateType = 1 // 1热更新  2整包
let content = ''
let apkUrl = ''
let isLoad = false
let isDecompressed = false
let downloadTask = null
let aview = null
function showView(info) {
  // #ifdef APP-PLUS
  let updateInfo = `<div class="app_update_content">
    <div class='tips-item'>
      <div class='title'>发现新版本</div><div class='center'>${info.readme}</div>
      <div class="progress-bar" id="progress-bar">
        <div class="progress-center" id="walkbar"></div>
      </div>
    </div>
    <div class="flex align-center padding" >
      <div class="flex-sub text-center borderr" >
        <button class="abutton text-gray" id="cancel_btn">${global.i18n.t('下次再说')}</button>
      </div>
     <div class="flex-sub text-center" >
        <button class="abutton text-green" id="confirm_btn">${global.i18n.t('马上更新')}</button>
      </div>
    </div>
  </div>`
  const systemInfo = uni.getSystemInfoSync()
  let wvPath = '/hybrid/html/permissionTips/permissionTips.html'
  let wv = plus.webview.create(
    wvPath,
    'updateTips',
    {
      'uni-app': 'none',
      top: systemInfo.statusBarHeight,
      left: 0,
      width: systemInfo.screenWidth,
      height: systemInfo.screenHeight - systemInfo.statusBarHeight,
      background: 'transparent',
    },
    {
      updateInfo,
    }
  )
  wv.show()

  // 接收webview发送的通知消息
  wv.overrideUrlLoading(
    {
      mode: 'reject',
    },
    (e) => {
      let surl = e.url
      if (surl == 'updateapp://confirm_btn') {
        // 下载wgt、apk包
        if (updateType == 2) {
          fullPackageUpdate()
        } else {
          hotUpdate()
        }
      }
      if (surl == 'updateapp://cancel_btn') {
        // webview销毁掉
        closeView()
      }
      return e
    }
  )
  return wv
  // #endif
  return null
}

// 整包更新
function fullPackageUpdate() {
  if (plus.os.name.toLowerCase() === 'android') {
    // console.log('是安卓系统')
    hotUpdate()
  } else {
    // console.log('是苹果系统,跳转到苹果应用商店')
    plus.runtime.openURL(apkUrl)
    isLoad = false
  }
}
// 更新
function hotUpdate() {
  downloadTask = uni.downloadFile({
    url: apkUrl,
    success: (downloadResult) => {
      uni.showLoading({
        title: global.i18n.t('安装中...'),
        mask: true,
      })
      if (downloadResult.statusCode === 200) {
        plus.runtime.install(
          downloadResult.tempFilePath,
          {
            force: true,
          },
          () => {
            uni.hideLoading()
            closeView()
            if (updateType == 1) {
              showRestartModal()
            } else {
              plus.runtime.restart()
            }
          },
          (err) => {
            console.log('err安装失败：', err)
          }
        )
      }
    },
    fail: (err) => {
      console.log('ERROR', err)
      if (err.errMsg == 'downloadFile:fail abort') {
        message.info(global.i18n.t('取消下载'))
      } else {
        message.info(global.i18n.t('下载失败'))
      }
      downloadTask.abort()
      closeView()
    },
  })
  downloadTask.onProgressUpdate((res) => {
    aview.evalJS(`showProgress(${res.progress})`)
  })
}
function closeView() {
  isLoad = false
  if (aview && aview.close) aview.close()
  if (aview && aview.destroy) aview.destroy()
  aview = null
}
function showRestartModal() {
  uni.showModal({
    title: global.i18n.t('提示'),
    content: global.i18n.t('已准备好新版本,是否重启体验新版?'),
    confirmText: global.i18n.t('重启'),
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        plus.runtime.restart()
        isDecompressed = false
      } else {
        isDecompressed = true
      }
    },
  })
}
export function appUpdateListener(auto) {
  // auto: true  自动更新，静默检测app更新，不显示loading
  // auto: false 手动更新，点击检测更新按钮，请求接口显示loading
  try {
    if (isDecompressed) {
      showRestartModal()
      return
    }
    if (isLoad) return
    isLoad = true
    if (!auto) uni.showLoading()
    plus.runtime.getProperty(plus.runtime.appid, async function (widgetInfo) {
      const [error, result] = await uni.request({
        url: API_BASE_URL + global.apiUrls.publicUpdateAPP,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          // ...customParams,
          client: SYSTEM_CONFIG.platform === 'Android' ? 3 : 2,
        },
        method: 'POST',
      })
      if (!auto) uni.hideLoading()
      if (result.data.code != 1) {
        isLoad = false
        return !auto ? message.info(global.i18n.t('已是最新版本~')) : ''
      }
      const data = result.data.data
      if (data.is_take != 1) {
        isLoad = false
        return !auto ? message.info(global.i18n.t('已是最新版本~')) : ''
      }
      if (data.version <= widgetInfo.versionCode) {
        isLoad = false
        return !auto ? message.info(global.i18n.t('已是最新版本~')) : ''
      }
      updateType = data.type == 2 ? 2 : 1
      content = data.readme
      apkUrl = data.url
      aview = showView(data)
    })
  } catch (error) {
    console.log('error:', error)
    isLoad = false
    if (!auto) uni.hideLoading()
  }
}
