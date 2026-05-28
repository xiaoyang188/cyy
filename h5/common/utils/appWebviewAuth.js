/**
 * App web-view 打开 H5 时，通过 URL 传入 user_token，免登录并同步 store
 * 示例：https://shop.chongyueyue.cn/web/#/?__app_webview=1&user_token=xxx
 */

import { http } from '@/common/api/index.js'

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

/** 标记 App 内嵌场景（可供页面判断隐藏退出登录等） */
export function markAppWebviewContext() {
  if (!isAppWebviewLaunch()) return false
  global.__APP_WEBVIEW__ = true
  return true
}

/**
 * 从 URL 写入 token（须在 store.initApp 之前调用）
 * @returns {boolean} 是否写入了 URL token
 */
export function applyAppWebviewTokenFromUrl(store) {
  markAppWebviewContext()
  const urlToken = getUrlUserToken()
  if (!urlToken || !store) return false

  store.commit('saveToken', urlToken)
  return true
}

/**
 * 拉取会员详情并写入 store.userInfo（接口 post5c78c4772da97）
 */
export async function fetchAndCacheUserInfo(store, { force = false } = {}) {
  if (!store || !store.state.token) return false

  if (!force && store.state.userInfo && store.state.userInfo.id) {
    return true
  }

  try {
    const res = await http.get(global.apiUrls.post5c78c4772da97, {})
    const body = res.data || {}
    if (body.code != 1) {
      console.warn('[appWebviewAuth] 获取会员信息失败', body.msg)
      return false
    }
    if (body.data) {
      store.commit('updateUserInfo', body.data)
    }
    return true
  } catch (e) {
    console.warn('[appWebviewAuth] 获取会员信息异常', e)
    return false
  }
}

/** 启动时：URL token + 会员信息（在 initApp 之后调用 fetch 部分） */
export async function bootstrapAppWebviewAuth(store) {
  const hadUrlToken = applyAppWebviewTokenFromUrl(store)
  if (!store.state.token) {
    return { hadUrlToken, userInfoLoaded: false }
  }
  const userInfoLoaded = await fetchAndCacheUserInfo(store, { force: hadUrlToken })
  return { hadUrlToken, userInfoLoaded }
}
