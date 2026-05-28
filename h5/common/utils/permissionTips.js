function showView(permissions) {
  // #ifdef APP-PLUS
  const permissionTipsArr = [{"keyName":"android.permission.INTERNET","title":global.i18n.t('使用网络权限'),"content":global.i18n.t('与服务器进行数据交换，如同步用户数据、获取最新信息等')},{"keyName":"android.permission.READ_EXTERNAL_STORAGE","title":global.i18n.t('读写SD卡权限'),"content":global.i18n.t('访问用户的媒体库，如音乐播放列表、照片相册等')},{"keyName":"android.permission.WRITE_EXTERNAL_STORAGE","title":global.i18n.t('读写SD卡权限'),"content":global.i18n.t('访问用户的媒体库，如音乐播放列表、照片相册等')},{"keyName":"android.permission.READ_PHONE_STATE","title":global.i18n.t('读取设备标识权限'),"content":global.i18n.t('根据设备特征提供定制化的用户体验')},{"keyName":"android.permission.CAMERA","title":global.i18n.t('拍照权限'),"content":global.i18n.t('为访问相机权限，使用拍照权限，用于上传图片')},{"keyName":"android.permission.ACCESS_COARSE_LOCATION","title":global.i18n.t('定位权限'),"content":global.i18n.t('根据用户位置提供附近的商家、景点、餐厅等信息')},{"keyName":"android.permission.CALL_PHONE","title":global.i18n.t('拨打电话权限'),"content":global.i18n.t('访问拨打电话权限，便于联系平台')}]
  const permissionTips = Array.isArray(permissionTipsArr)
    ? permissionTipsArr.reduce((accumulator, { keyName, title, content }) => {
        accumulator[keyName] = `<div class="permission_content">
            <div class='tips-item'>
                <div class='title'>${title}</div>
                <div class='center'>${content}</div>
                </div>
            </div>`
        return accumulator
      }, {})
    : {}
  let permissionInfo = ''
  permissions.map((key) => {
    if (permissionTips[key]) {
      permissionInfo += permissionTips[key]
    } else {
      console.log(key + '未配置提示语')
    }
  })
  if (!permissionInfo) return null
  const systemInfo = uni.getSystemInfoSync()
  let wvPath = '/hybrid/html/permissionTips/permissionTips.html'
  let wv = plus.webview.create(
    wvPath,
    'permissionTips',
    {
      'uni-app': 'none',
      top: systemInfo.statusBarHeight,
      left: 0,
      width: systemInfo.screenWidth,
      height: systemInfo.screenHeight - systemInfo.statusBarHeight,
      background: 'transparent',
    },
    {
      permissionInfo,
    }
  )
  wv.show()
  return wv
  // #endif
  return null
}
let platform = uni.getSystemInfoSync().platform
export function permissionListener() {
  // showView(["android.permission.CAMERA", "android.permission.ACCESS_COARSE_LOCATION", "android.permission.READ_PHONE_STATE", "android.permission.READ_EXTERNAL_STORAGE"])
  if (platform !== 'android') return
  let view = null
  let createRequestPermissionListener = uni.createRequestPermissionListener()
  createRequestPermissionListener.onRequest((e) => {
    console.log('onRequest', e)
  })
  createRequestPermissionListener.onConfirm((e) => {
    console.log('onConfirm', e)
    if (view && view.close) view.close()
    if (view && view.destroy) view.destroy()
    view = showView(e)
  })
  createRequestPermissionListener.onComplete((e) => {
    if (view && view.close) view.close()
    if (view && view.destroy) view.destroy()
    view = null
    console.log('onComplete', e)
  })
}
