/**
 * App web-view 内嵌 H5 时，唤起宿主原生支付（/pages/shop/native-pay）
 */

import { benbenStorage } from '@/common/config.js'

const SDK_FILE = 'static/js/uni.webview.1.5.4.js'

/** 根据部署路径解析 SDK 地址（正式环境在 /web/ 子目录） */
export function getWebviewSdkSrc() {
  if (typeof window === 'undefined') return `/${SDK_FILE}`

  const pathname = window.location.pathname || ''
  const href = window.location.href || ''

  if (pathname.startsWith('/web') || href.includes('/web/')) {
    return `/web/${SDK_FILE}`
  }

  if (pathname.endsWith('.html')) {
    const dir = pathname.replace(/\/[^/]*$/, '')
    return `${dir}/${SDK_FILE}`
  }

  return `/${SDK_FILE}`
}

function getWebviewSdkCandidates() {
  const primary = getWebviewSdkSrc()
  const set = new Set([primary, `/web/${SDK_FILE}`, `/${SDK_FILE}`, `./${SDK_FILE}`])
  return [...set]
}
/** 与 App native-pay 约定的 plus.storage 键，用于 web-view 与原生页共享商城 token */
export const SHOP_PAY_TOKEN_PLUS_KEY = 'SHOP_USER_TOKEN'

let nativePaySuccessHandler = null

/**
 * 解析 H5 商城登录 token（与接口 header user-token 一致）
 * 订单列表等页面可能仅有 global.token 而 vuex 未同步
 */
export function resolveShopToken(vm) {
  const fromStore = vm?.$store?.state?.token
  const fromGlobal = typeof global !== 'undefined' ? global.token : ''
  const fromStorage = benbenStorage.getStorageSync('USER_TOKEN') || ''
  return fromStore || fromGlobal || fromStorage || ''
}

/** 写入 App 级存储，供 native-pay 在 URL 未带上 token 时读取 */
export function syncShopTokenForNativePay(token) {
  if (!token) return
  try {
    if (typeof plus !== 'undefined' && plus.storage) {
      plus.storage.setItem(SHOP_PAY_TOKEN_PLUS_KEY, token)
    }
  } catch (e) {
    console.warn('syncShopTokenForNativePay failed', e)
  }
}

/** 仅当明确为 0 元时走免支付，避免空字符串被 Number('') 当成 0 */
export function isZeroPayAmount(amount) {
  if (amount === '' || amount === null || amount === undefined) return false
  const n = Number(amount)
  return !Number.isNaN(n) && n <= 0
}

/** 缓存 App web-view 桥（须在 H5 的 uni 挂载后再注入 SDK） */
export function cacheWebviewBridge() {
  if (typeof window === 'undefined') return null

  const bridge =
    (window.uni && window.uni.webView) ||
    window.uniWebview ||
    window.__hostAppWebviewBridge ||
    null

  if (bridge && (typeof bridge.navigateTo === 'function' || typeof bridge.postMessage === 'function')) {
    window.__hostAppWebviewBridge = bridge
    return bridge
  }
  return null
}

export function getWebviewBridge() {
  if (typeof window === 'undefined') return null
  return cacheWebviewBridge()
}

export function waitUniAppJSBridgeReady() {
  if (typeof document === 'undefined') return Promise.resolve()

  return new Promise((resolve) => {
    document.addEventListener('UniAppJSBridgeReady', resolve, { once: true })
    setTimeout(resolve, 300)
  })
}

function loadScriptOnce(src) {
  return new Promise((resolve) => {
    const existed = document.querySelector(`script[src="${src}"]`)
    const done = () => {
      window.uniWebview = (window.uni && window.uni.webView) || window.uniWebview
      cacheWebviewBridge()
      resolve(!!getWebviewBridge())
    }

    if (existed) {
      existed.addEventListener('load', done, { once: true })
      existed.addEventListener('error', () => resolve(false), { once: true })
      setTimeout(done, 0)
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.onload = done
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
}

export function loadWebviewSdk() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (getWebviewBridge()) return Promise.resolve(true)

  const candidates = getWebviewSdkCandidates()
  return (async () => {
    for (const src of candidates) {
      const ok = await loadScriptOnce(src)
      if (ok) {
        console.log('[hostAppPay] web-view SDK 已加载:', src)
        return true
      }
    }
    console.warn('[hostAppPay] web-view SDK 加载失败，将回退 H5 收银台', candidates)
    return false
  })()
}

/** 在 H5 应用启动后调用：H5 的 uni 会覆盖 index 里先加载的 SDK，需在 main 末尾重新注入 */
export function reinjectWebviewSdkAfterAppReady() {
  if (typeof window === 'undefined') return Promise.resolve(!!getWebviewBridge())

  return loadWebviewSdk()
}

/**
 * @param {Object} options
 * @param {string} options.orderSn
 * @param {string|number} [options.amount]
 * @param {string|number} [options.orderType=3]
 * @param {string} [options.token]
 * @param {string} [options.source]
 * @returns {Promise<boolean>}
 */
export async function openNativePay({ orderSn, amount = '', orderType = 3, token = '', source = '', vm = null }) {
  if (!orderSn) return false

  const resolvedToken = token || resolveShopToken(vm)
  syncShopTokenForNativePay(resolvedToken)

  if (!resolvedToken) {
    console.warn('[hostAppPay] 商城 token 为空，原生支付页将无法鉴权', { orderSn, source })
  }

  const payData = {
    action: 'openNativePay',
    order_sn: orderSn,
    orderSn,
    order_type: orderType,
    payType: 'wxpay',
    amount,
    token: resolvedToken,
    source,
  }

  await loadWebviewSdk()
  await waitUniAppJSBridgeReady()
  const webviewUni = getWebviewBridge()

  const nativePayUrl = `/pages/shop/native-pay?order_sn=${encodeURIComponent(orderSn)}&order_type=${encodeURIComponent(
    orderType,
  )}&amount=${encodeURIComponent(amount || '')}${resolvedToken ? `&token=${encodeURIComponent(resolvedToken)}` : ''}`

  const navigateBridge =
    webviewUni && typeof webviewUni.navigateTo === 'function'
      ? webviewUni
      : window.uni && window.uni.webView && typeof window.uni.webView.navigateTo === 'function'
        ? window.uni.webView
        : null

  if (navigateBridge) {
    navigateBridge.navigateTo({ url: nativePayUrl })
    console.log('已跳转宿主 App 支付页面', payData)
    return true
  }

  // uni.postMessage / postMessage 仅在 web-view 后退、销毁等时机批量投递，无法即时唤起支付
  if (typeof uni !== 'undefined' && typeof uni.postMessage === 'function') {
    uni.postMessage({ data: payData })
  } else if (webviewUni && typeof webviewUni.postMessage === 'function') {
    webviewUni.postMessage({ data: payData })
  } else {
    console.warn('当前不在目标 App web-view 环境，无法唤起原生支付', payData)
  }
  return false
}

export function bindNativePaySuccess(handler) {
  unbindNativePaySuccess()
  nativePaySuccessHandler = handler
  window.onNativePaySuccess = () => {
    if (typeof nativePaySuccessHandler === 'function') {
      nativePaySuccessHandler()
    }
  }
}

export function unbindNativePaySuccess() {
  nativePaySuccessHandler = null
  if (typeof window !== 'undefined') {
    window.onNativePaySuccess = null
  }
}

/**
 * 标准支付流程：零元走结果页 → 原生支付 → 由调用方处理 fallback
 * @returns {'zero'|'native'|'fallback'}
 */
export async function goHostAppPay({ orderSn, amount, orderType = 3, token = '', source = '', vm = null }) {
  if (!orderSn) return 'fallback'

  if (isZeroPayAmount(amount)) {
    return 'zero'
  }

  const resolvedToken = token || resolveShopToken(vm)
  const opened = await openNativePay({ orderSn, amount, orderType, token: resolvedToken, source, vm })
  return opened ? 'native' : 'fallback'
}
