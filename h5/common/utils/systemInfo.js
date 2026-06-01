/** 写入 themeColor CSS 变量的 px 字段（不含 rpx / unitRatio） */
export const SYSTEM_INFO_CSS_KEYS = ['StatusBar', 'CustomBar', 'bottomSafeArea']

/** H5：通过 env(safe-area-inset-*) 探测真实安全区 */
function readCssSafeAreaInsets() {
  if (typeof document === 'undefined' || !document.body) {
    return { top: 0, bottom: 0 }
  }
  try {
    const probe = document.createElement('div')
    probe.style.cssText =
      'position:fixed;top:0;left:0;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top);padding-bottom:constant(safe-area-inset-bottom);padding-bottom:env(safe-area-inset-bottom);visibility:hidden;pointer-events:none;'
    document.body.appendChild(probe)
    const style = window.getComputedStyle(probe)
    const top = parseFloat(style.paddingTop) || 0
    const bottom = parseFloat(style.paddingBottom) || 0
    document.body.removeChild(probe)
    return { top, bottom }
  } catch (e) {
    return { top: 0, bottom: 0 }
  }
}

/** 根据 uni.getSystemInfoSync 结果计算布局尺寸 */
export function buildSystemInfo(rawInfo) {
  const e = rawInfo || uni.getSystemInfoSync()
  const windowWidth = e.windowWidth || 375
  let statusBar
  let customBar

  // #ifndef MP
  statusBar = e.statusBarHeight || 0
  if (e.platform === 'android') {
    customBar = statusBar + 50
  } else {
    customBar = statusBar + 45
  }
  // #endif

  // #ifdef MP-WEIXIN
  statusBar = e.statusBarHeight || 0
  const custom = wx.getMenuButtonBoundingClientRect()
  customBar = custom.bottom + custom.top - statusBar
  // #endif

  // #ifdef MP-ALIPAY
  statusBar = e.statusBarHeight || 0
  customBar = statusBar + (e.titleBarHeight || 0)
  // #endif

  let bottomSafeArea = (e.safeAreaInsets && e.safeAreaInsets.bottom) || 0

  // #ifdef H5
  const safeTopPx =
    (e.safeAreaInsets && e.safeAreaInsets.top) || (e.safeArea && typeof e.safeArea.top === 'number' ? e.safeArea.top : 0) || 0
  if (safeTopPx > statusBar) statusBar = safeTopPx

  const cssInsets = readCssSafeAreaInsets()
  if (cssInsets.top > statusBar) statusBar = cssInsets.top
  if (cssInsets.bottom > bottomSafeArea) bottomSafeArea = cssInsets.bottom

  if (e.platform === 'ios' && bottomSafeArea === 0) bottomSafeArea = 34
  // #endif

  const unitRatio = 750 / windowWidth
  const StatusBarRpx = statusBar * unitRatio
  const CustomBarRpx = customBar * unitRatio
  const bottomSafeAreaRpx = bottomSafeArea * unitRatio

  return {
    StatusBar: statusBar,
    CustomBar: customBar,
    StatusBarRpx,
    CustomBarRpx,
    bottomSafeArea,
    bottomSafeAreaRpx,
    unitRatio,
  }
}

export function refreshSystemInfo(store) {
  if (!store) return null
  try {
    const info = buildSystemInfo(uni.getSystemInfoSync())
    store.commit('setSystemInfo', info)
    return info
  } catch (err) {
    console.warn('[systemInfo] refresh failed', err)
    return null
  }
}

/** H5 / WebView：在 Bridge、DOM、load 就绪后多次重试 */
export function scheduleSystemInfoRefresh(store) {
  if (!store) return

  const retry = () => refreshSystemInfo(store)

  if (typeof document !== 'undefined') {
    document.addEventListener('UniAppJSBridgeReady', retry, { once: true })
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', retry, { once: true })
    }
    window.addEventListener('load', retry, { once: true })
  }

  ;[0, 50, 150, 300, 600].forEach((delay) => {
    setTimeout(retry, delay)
  })
}

/** 启动时同步初始化，H5 额外调度延迟刷新 */
export function initSystemInfo(store) {
  refreshSystemInfo(store)
  // #ifdef H5
  scheduleSystemInfoRefresh(store)
  // #endif
}

/** 全局 mixin：从 store 响应式读取，延迟刷新后页面自动更新 */
export const systemInfoMixin = {
  computed: {
    StatusBar() {
      return this.$store?.state?.SystemInfo?.StatusBar ?? 0
    },
    CustomBar() {
      return this.$store?.state?.SystemInfo?.CustomBar ?? 0
    },
    StatusBarRpx() {
      return this.$store?.state?.SystemInfo?.StatusBarRpx ?? 0
    },
    CustomBarRpx() {
      return this.$store?.state?.SystemInfo?.CustomBarRpx ?? 0
    },
    bottomSafeArea() {
      return this.$store?.state?.SystemInfo?.bottomSafeArea ?? 0
    },
    bottomSafeAreaRpx() {
      return this.$store?.state?.SystemInfo?.bottomSafeAreaRpx ?? 0
    },
    unitRatio() {
      return this.$store?.state?.SystemInfo?.unitRatio ?? 2
    },
  },
}
