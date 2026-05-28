import Request from './request'
import { API_BASE_URL, SERIAL, IS_DEV, ACCEPT_PLATFORM, tokenName } from '../config.js'
import store from '@/store/index'
import { getSaizhugeLang } from '../utils/utils.js'
const http = new Request()
http.setConfig((config) => {
  config.baseUrl = API_BASE_URL
  return config
})
http.interceptor.request((config, cancel) => {
  config.header = {
    ...config.header,
    'Accept-Language': global.locale,
    lang: getSaizhugeLang(global.locale),
    'Accept-Platform': ACCEPT_PLATFORM,
    'Accept-Serial': SERIAL,
    //CUSTOM_HEADER
  }
  if (global.token) config.header[tokenName] = global.token
  if (IS_DEV == 2) {
    config.data = {
      ...config.data,
      ismock: 0,
    }
  }
  return config
})
http.interceptor.response((response) => {
  return response
})
export { http }
