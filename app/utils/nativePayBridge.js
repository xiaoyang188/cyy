/**
 * App 侧：H5 web-view 唤起原生支付页 & 支付成功后通知 H5
 */

/** 与 H5 hostAppPay.js 中 SHOP_PAY_TOKEN_PLUS_KEY 保持一致 */
export const SHOP_PAY_TOKEN_PLUS_KEY = 'SHOP_USER_TOKEN'

export function readShopPayTokenFromOptions(options = {}) {
  let token = options.token || ''
  try {
    token = decodeURIComponent(token)
  } catch (e) {
    /* 已是明文 */
  }
  if (token) return token

  // #ifdef APP-PLUS
  try {
    if (typeof plus !== 'undefined' && plus.storage) {
      const fromPlus = plus.storage.getItem(SHOP_PAY_TOKEN_PLUS_KEY)
      if (fromPlus) return fromPlus
    }
  } catch (e) {
    console.warn('readShopPayToken plus.storage', e)
  }
  // #endif

  // 若 H5 与 App 共用 uni 存储（部分打包场景）
  return uni.getStorageSync('USER_TOKEN_10133') || uni.getStorageSync('USER_TOKEN') || ''
}

export function buildNativePayUrl({ orderSn, orderType = '3', amount = '', token = '' }) {
  if (!orderSn) return ''

  let url = `/pages/shop/native-pay?order_sn=${encodeURIComponent(orderSn)}&order_type=${encodeURIComponent(
    String(orderType),
  )}&amount=${encodeURIComponent(amount || '')}`

  if (token) {
    url += `&token=${encodeURIComponent(token)}`
  }

  return url
}

export function navigateToNativePay({ orderSn, orderType = '3', amount = '', token = '' }) {
  if (!orderSn) {
    uni.showToast({ title: '订单号不能为空', icon: 'none' })
    return false
  }

  const resolvedToken = token || readShopPayTokenFromOptions({})
  const url = buildNativePayUrl({ orderSn, orderType, amount, token: resolvedToken })
  if (!url) return false

  uni.navigateTo({ url })
  return true
}

/**
 * 从页面栈向上查找带 web-view 子页的页面，执行 onNativePaySuccess
 */
export function notifyH5PaySuccess() {
  // #ifdef APP-PLUS
  const pages = getCurrentPages()
  for (let i = pages.length - 2; i >= 0; i--) {
    const page = pages[i]
    if (!page || typeof page.$getAppWebview !== 'function') continue

    const appWebview = page.$getAppWebview()
    if (!appWebview) continue

    const children = appWebview.children && appWebview.children()
    if (!children || children.length === 0) continue

    const wv = children[0]
    if (!wv || typeof wv.evalJS !== 'function') continue

    wv.evalJS(`
      if (typeof window.onNativePaySuccess === 'function') {
        window.onNativePaySuccess();
      }
    `)
    return true
  }
  // #endif
  return false
}

export function normalizeWebviewMessage(event) {
  const rawData = event?.detail?.data
  let firstMessage = Array.isArray(rawData) ? rawData[0] : rawData

  while (firstMessage?.data && !firstMessage.action) {
    firstMessage = firstMessage.data
  }

  return firstMessage
}
