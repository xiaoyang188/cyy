export const dev_host = 'http://zbphp.zhongbenzx.com' // 开发环境域名
export const mock_host = 'http://mock.zhongbenruanjian.com' // MOCK环境域名
export const product_host = 'https://shop.chongyueyue.cn' // 生产环境域名
export const WEBSOCKET = 'wss://zbphp.zhongbenzx.com/socket/'
export const PAAS_URL = 'https://shop.chongyueyue.cn' // paas域名
export const IS_DEV = 3 // 0:生产环境 1:开发环境 2:mock环境 3:paas环境
export const PAGE_SIZE = 15 // 分页配置 每页条数
export const SERVER_TYPE = 0 // 服务端类型 0:赛诸葛  1  mock  2:其他
export const API_VERSION = 'm20336' //APP接口版本号 正常是V1 使用paas  m加企业ID
export const INTERFACE_PREFIX = 'api' //接口前缀
let _host = '' // 自定义请求地址
if (!_host) {
  switch (IS_DEV) {
    case 0:
      _host = product_host
      break
    case 1:
      _host = dev_host
      break
    case 2:
      _host = mock_host
      break
    case 3:
      _host = PAAS_URL
      break
    default:
      break
  }
}

export const host = _host // 项目中接口地址host
export const SHAREURL = host + '/h5/#/' // 分享的H5地址
export const SERIAL = '' // 项目序列号(千万千万千万不要修改!!!!)
export const DIY_TABBAR = true // 是否开启自定义tabbar
export const cartNumIndex = 2
export const cartNumEdit = ""
export const BASE_URL = `${host}` // 基础路径
export const API_BASE_URL = `${host}${INTERFACE_PREFIX ? '/' + INTERFACE_PREFIX : ''}` // 接口请求基础路径
export const RESOURCES_PATH = "" // 静态资源目录前缀
export const STATIC_URL = `${RESOURCES_PATH}/static/images/` // 静态资源目录
export const IMG_BASE_URL = `${host}/upload/` // 图片基础路径 公共filters assembleImgSrc依赖此配置
export const HOME_PAGE_URL = ["/pages/tabBar/home/home"] // 配置首页路由 主要用于跳转首页
export const tokenName = 'user-token' // token名称
export const isGoogleMap = false
export const GOOGLE_MAPS_WEB_KEY = ""
export const GOOGLE_MAPS_WEB_MAPID = ""
// tabBar配置
export const tabbarConfig = {
  "roleTabBarShow": [
    [{
      "index": 0,
      "ident": "首页"
    }, {
      "index": 1,
      "ident": "分类"
    }, {
      "index": 2,
      "ident": "购物车"
    }, {
      "index": 3,
      "ident": "个人中心"
    }]
  ],
  "listNum": 4
}
export const DIY_TABBAR_CONFIG = {
  "color": "#666666",
  "selectedColor": "#B82441",
  "backgroundColor": "#ffffff",
  "list": [{
    "pagePath": "/pages/tabBar/home/home",
    "iconPath": "tab_diy0.png",
    "selectedIconPath": "tab_diy0_active.png",
    "visible": [0],
    "text": "首页",
    "messageEdit": "home"
  }, {
    "pagePath": "/pages/tabBar/classification/classification",
    "iconPath": "tab_diy1.png",
    "selectedIconPath": "tab_diy1_active.png",
    "visible": [0],
    "text": "分类",
    "messageEdit": "classification"
  }, {
    "pagePath": "/pages/tabBar/shopping/shopping",
    "iconPath": "tab_diy2.png",
    "selectedIconPath": "tab_diy2_active.png",
    "visible": [0],
    "text": "购物车",
    "messageEdit": "shopping"
  }, {
    "pagePath": "/pages/tabBar/myhb/myhb",
    "iconPath": "tab_diy3.png",
    "selectedIconPath": "tab_diy3_active.png",
    "visible": [0],
    "text": "个人中心",
    "messageEdit": "myhb"
  }]
}
export const TAB_BAR_MESSAGE = DIY_TABBAR_CONFIG?.list?.reduce((acc, item) => {
  if (!item.isBtn) {
    acc[item.messageEdit] = 0
  }
  return acc
}, {})
// 主题色配置
export const themeColorConfig = [{
  "colorConfig": ["rgba(51, 51, 51, 1)", "rgba(102, 102, 102, 1)", "rgba(153, 153, 153, 1)", "#ffffff",
    "rgba(228, 57, 60, 1)", "rgba(242, 129, 16, 1)", null, null, null, null
  ],
  "bgColorConfig": ["#F8F8F8", "#FFFFFF", "#F8F8F8", "rgba(228, 57, 60, 1)", "rgba(228, 57, 60, 0.5)", "", "", "",
    "", ""
  ],
  "bdColorConfig": ["rgba(248, 248, 248, 1)", "rgba(237, 237, 237, 1)", "rgba(228, 57, 60, 1)", null, null, null,
    null, null, null, null
  ],
  "iconColorConfig": ["rgba(228, 57, 60, 1)", "rgba(51, 51, 51, 1)", "rgba(102, 102, 102, 1)",
    "rgba(153, 153, 153, 1)", "rgba(255, 255, 255, 1)", "", "", "", "", ""
  ],
  "btnColorConfig": ["rgba(228, 57, 60, 1)", "#FFFFFF", "rgba(228, 57, 60, 0.4)", "#F8F8F8",
    "rgba(242, 129, 16, 1)", "rgba(65, 151, 251, 1)", "", "", "", ""
  ]
}]
let loginPageUrl = '/pages/tabBar/loginPage/loginPage'
// #ifdef MP-WEIXIN
let wxLoginPageUrl = ''
if (wxLoginPageUrl) {
  loginPageUrl = wxLoginPageUrl
}
// #endif
// #ifdef H5
let H5LoginPageUrl = '/pages/tabBar/loginPage/loginPage'
if (H5LoginPageUrl) {
  loginPageUrl = H5LoginPageUrl
}
// #endif
export const LOGIN_PAGE_URL = loginPageUrl // 登录页面路由 request.js 依赖此配置 主要用于登录失效跳转
export const LANGUAGES = [{
  name: '中文 (简体)',
  value: 'zh-Hans'
}, {
  name: 'English',
  value: 'en'
}, {
  name: '日本語',
  value: 'ja'
}, {
  name: 'Hindustan',
  value: 'ind'
}, {
  name: 'ภาษาไทย',
  value: 'th'
}] //语言包配置
export const PROJECT_ID = "10133" //项目id
export const benbenStorage = {
  setStorageSync: (key, value) => {
    uni.setStorageSync(`${key}_${PROJECT_ID}`, value)
  },
  setStorage: (data) => {
    data.key = `${data.key}_${PROJECT_ID}`
    uni.setStorage(data)
  },
  getStorageSync: (key) => {
    return uni.getStorageSync(`${key}_${PROJECT_ID}`)
  },
  getStorage: (data) => {
    data.key = `${data.key}_${PROJECT_ID}`
    uni.getStorage(data)
  },
  removeStorageSync: (key) => {
    uni.removeStorageSync(`${key}_${PROJECT_ID}`)
  },
  removeStorage: (data) => {
    data.key = `${data.key}_${PROJECT_ID}`
    uni.removeStorage(data)
  },
}
let locale = uni.getLocale()
export const LOCALE = LANGUAGES.find((item) => item.value == locale) //语言包配置
let _platform = uni.getSystemInfoSync().platform
// #ifdef APP-PLUS
_platform = _platform === 'android' ? 'Android' : 'IOS'
// #endif
// #ifdef H5
_platform = 'Web'
// #endif
// #ifdef MP-WEIXIN
_platform = 'Wechat'
// #endif
// #ifdef MP-ALIPAY
_platform = 'Alipay'
// #endif
// #ifdef MP-BAIDU
_platform = 'Baidu'
// #endif
// #ifdef MP-TOUTIAO
_platform = 'ByteBounce'
// #endif
// #ifdef MP-360
_platform = '360'
// #endif
// #ifdef QUICKAPP-WEBVIEW
_platform = 'FastApp'
// #endif
export const ACCEPT_PLATFORM = _platform //所属平台
export const SYSTEM_CONFIG = {
  // 系统配置
  logo: '/static/logo.png',
  appName: '宠悦悦app',
  appVersion: '1.0.0',
  platform: _platform,
}
export const needProductUrl = []
const needPageUrl = ["/pages/fl/detailsComment/detailsComment", "/pages/fl/suitInfo/suitInfo",
  "/pages/ddgl/order/order", "/pages/ddgl/directOrder/directOrder", "/pages/fp/applyInvoic/applyInvoic",
  "/pages/fp/invoicesManagement/invoicesManagement", "/pages/wd/myInfo/myInfo", "/pages/wd/member/member",
  "/pages/wd/myCollections/myCollections", "/pages/wd/myTrack/myTrack", "/pages/wd/friendsLnvite/friendsLnvite",
  "/pages/wd/promotionTeam/promotionTeam", "/pages/wd/IncomeDetail/IncomeDetail", "/pages/wd/couponMy/couponMy",
  "/pages/wd/signinPage/signinPage", "/pages/wd/myNews/myNews", "/pages/wd/address/address",
  "/pages/jf/inteGral/inteGral", "/pages/jf/orderSure/orderSure", "/pages/jf/commoDity/commoDity",
  "/pages/jf/inteDetails/inteDetails", "/pages/jf/exChange/exChange", "/pages/sy/offerPay/offerPay",
  "/pages/xtsz/personalizedSettings/personalizedSettings", "/pages/xtsz/PermissionSettings/PermissionSettings",
  "/pages/xtsz/contactService/contactService", "/pages/xtsz/helpDetails/helpDetails",
  "/pages/xtsz/helpFeedback/helpFeedback", "/pages/xtsz/system/system"
]
const defNeedLoginPage = [
  '/pages/user/address/address-list/index',
  '/pages/user/address/address-add/index',
  '/pages/index/setting/change-pay-password/index',
  '/pages/index/setting/modify-pay-password/index',
  '/pages/index/setting/change-password/index',
  '/pages/service-mssage/message/message-list/index',
  '/pages/user/user/info/index',
  '/pages/user/user/avatar-cropping/index',
  '/pages/index/setting/setting/index',
  '/pages/index/setting/feedback/index',
  '/pages/index/setting/my-feedback/index',
  '/pages/index/setting/verify-oldphone/index',
  '/pages/index/setting/change-newphone/index',
  '/pages/user/wallet/my-wallet/index',
  '/pages/user/wallet/consumer-detail/index',
  '/pages/user/wallet/recharge/index',
  '/pages/user/wallet/recharge-log/index',
  '/pages/user/wallet/withdraw/index',
  '/pages/user/wallet/withdraw-success/index',
  '/pages/user/wallet/account-bind/index',
  '/pages/user/wallet/alipay-bind/index',
  '/pages/user/wallet/wechat-bind/index',
  '/pages/user/user/my-favorites/index',
  '/pages/user/user/my-footprint/index',
  '/pages/order/afterorder/afterorder-apply/index',
  '/pages/order/afterorder/afterorder-status-list/index',
  '/pages/order/afterorder/afterorder-detail/index',
  '/pages/order/afterorder/afterorder-sendback/index',
  '/pages/order/order-process/confirm-order/index',
  '/pages/order/order-process/pay-order/index',
  '/pages/order/order-process/pay-success/index',
  '/pages/order/order-process/choos_coupon/index',
  '/pages/order/order-list/all-order/index',
  '/pages/order/orderdetail/order-detail/index',
  '/pages/order/orderdetail/express-delivery/index',
  '/pages/order/evaluation/order-evaluation/index',
  '/pages/news/article/article-favoriters/index',
  '/pages/goods/ask-answer/my-ask-answer/index',
  '/pages/service-message/message/message-type/index',
  '/pages/user/coupon/my-coupon/index',
  '/pages/integral/myintegral/my-integral/index',
  '/pages/distribution/distribution/my-distribution/index',
  '/pages/service-message/service/service-detail/index',
  '/pages/user/invite/user-invite/index',
  '/pages/index/setting/modify-password-verify-phone/index',
  '/pages/index/setting/modify-password/index',
]
let needLoginPage = defNeedLoginPage
if (Array.isArray(needPageUrl)) {
  needLoginPage = defNeedLoginPage.concat(needPageUrl)
}

export const needLoginPages = needLoginPage
