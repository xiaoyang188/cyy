/** App web-view URL 参数解析（无 store/http 依赖，供 systemInfo 等模块使用） */

function parseQueryString(qs) {
  const out = {}
  let s = (qs || '').trim()
  if (!s) return out
  if (s.startsWith('?')) s = s.slice(1)
  if (s.startsWith('/?')) s = s.slice(2)
  else if (s.startsWith('/')) s = s.slice(1)

  s.split('&').forEach((pair) => {
    if (!pair) return
    const idx = pair.indexOf('=')
    const key = idx >= 0 ? pair.slice(0, idx) : pair
    const val = idx >= 0 ? pair.slice(idx + 1) : ''
    if (key) {
      try {
        out[decodeURIComponent(key)] = decodeURIComponent(val || '')
      } catch (e) {
        out[key] = val
      }
    }
  })
  return out
}

/** 解析 search + hash 中的 query（兼容 hash 路由） */
export function parseAppWebviewLaunchQuery() {
  if (typeof window === 'undefined') return {}

  const merged = {}

  if (window.location.search) {
    Object.assign(merged, parseQueryString(window.location.search))
  }

  const hash = window.location.hash || ''
  if (!hash) return merged

  const qIndex = hash.indexOf('?')
  if (qIndex >= 0) {
    Object.assign(merged, parseQueryString(hash.slice(qIndex)))
  } else if (hash.startsWith('#/?')) {
    Object.assign(merged, parseQueryString(hash.slice(2)))
  } else if (hash.startsWith('#?')) {
    Object.assign(merged, parseQueryString(hash.slice(2)))
  }

  return merged
}

export function isAppWebviewLaunch() {
  const q = parseAppWebviewLaunchQuery()
  return q.__app_webview === '1' || q.__app_webview === 1 || q.__app_webview === true
}

export function getUrlUserToken() {
  const q = parseAppWebviewLaunchQuery()
  return (q.user_token || q.userToken || '').trim()
}

/** App 宿主通过 URL 传入的安全区（WebView 内 uni.getSystemInfoSync 常为 0） */
export function getUrlLayoutInsets() {
  const q = parseAppWebviewLaunchQuery()
  const top = Number(q.safe_area_top || q.status_bar_height || q.statusBarHeight || 0)
  const bottom = Number(q.safe_area_bottom || q.safeAreaBottom || 0)
  return {
    top: Number.isFinite(top) && top > 0 ? top : 0,
    bottom: Number.isFinite(bottom) && bottom > 0 ? bottom : 0,
  }
}
