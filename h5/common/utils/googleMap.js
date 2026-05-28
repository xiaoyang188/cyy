// #ifdef APP-PLUS
import { GOOGLE_MAPS_WEB_KEY, GOOGLE_MAPS_WEB_MAPID } from '../config.js'
import { t } from '@/locale/index.js'
let mapwv = null
function backEvent(e) {
  if (e.keyCode === 4) {
    removeEvent()
  }
}
function removeEvent() {
  if (mapwv) {
    try {
      mapwv.close()
    } catch (e) {
      console.log('关闭webview失败:', e)
    }
    mapwv = null
  }
}
plus.key.addEventListener('backbutton', backEvent)
export default function openMAPGoogle({ success, fail, ...params }) {
  if (params?.keyword) params.name = params.keyword
  // 中文（简体）zh-CN	    中文（繁体）zh-TW
  let lang = global.locale || 'zh-CN'
  if (lang === 'zh-Hans') {
    lang = 'zh-CN'
  } else if (lang === 'zh-Hant') {
    lang = 'zh-TW'
  }
  const systemInfo = uni.getSystemInfoSync()
  let wvPath = '/hybrid/html/map/map.html'
  mapwv = plus.webview.create(
    wvPath,
    'map-view',
    {
      'uni-app': 'none',
      top: systemInfo.statusBarHeight,
      left: 0,
      width: systemInfo.screenWidth,
      height: systemInfo.screenHeight - systemInfo.statusBarHeight,
      background: '#ffffff',
      // 启用手势返回
      popGesture: 'close',
      zIndex: 9999,
    },
    {
      key: GOOGLE_MAPS_WEB_KEY,
      mapId: GOOGLE_MAPS_WEB_MAPID,
      language: lang,
      langObj: {
        a: t('地图选点'),
        b: t('确定'),
        c: t('搜索地点'),
        d: t('搜索'),
      },
      params,
    }
  )
  mapwv.show()

  // 接收webview发送的通知消息
  mapwv.overrideUrlLoading(
    {
      mode: 'reject',
    },
    (e) => {
      let obj = JSON.parse(decodeURIComponent(e.url.split('?')[1]))
      if (obj.type == 'placeSelected') {
        if (obj.latitude && obj.longitude) {
          success(obj)
        } else {
          console.error('谷歌地图 定位失败')
          fail('谷歌地图 定位失败')
        }
      }
      removeEvent()
    }
  )
}
// #endif
