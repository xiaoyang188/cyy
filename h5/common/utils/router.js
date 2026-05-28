import { LOGIN_PAGE_URL } from '../config.js'
export default class Router {
  needLoginPages = []
  setTimeoutFn = null
  constructor(options) {
    if (options) this.needLoginPages = options.needLoginPages || [];
  }
  splicingUrl(res) {
    return typeof res === 'string' ? res : res.params ? res.url + '?' + Object.keys(res.params).map(item =>
      `${item}=${res.params[item]}`).join('&') : res.url;
  }
  getPageUrl(url) {
    return uni.$store.state.token ? url : LOGIN_PAGE_URL
  }
  antiShake() {
    if (this.setTimeoutFn) return true
    this.setTimeoutFn = setTimeout(() => {
      clearTimeout(this.setTimeoutFn)
      this.setTimeoutFn = null
    }, 500)
    return false
  }
  testingNeedLogin(url) {
    return this.needLoginPages.findIndex(item => item == url || url.startsWith(item)) != -1
  }

  getNeedLoginPages() {
    return this.needLoginPages
  }
  switchTab(url) {
    if (this.antiShake()) return
    url = this.splicingUrl(url)
    if (this.testingNeedLogin(url)) {
      if (uni.$store.state.token) {
        uni.switchTab({ url });
      } else {
        uni.navigateTo({ url: LOGIN_PAGE_URL })
      }
      return false;
    }
    uni.switchTab({ url });
  }
  redirectTo(url) {
    if (this.antiShake()) return
    url = this.splicingUrl(url)
    if (this.testingNeedLogin(url)) {
      uni.redirectTo({ url: this.getPageUrl(url) });
      return false;
    }
    uni.redirectTo({ url });
  }
  reLaunch(url) {
    if (this.antiShake()) return
    uni.reLaunch({ url });
  }
  navigateBack(num) {
    if (this.antiShake()) return
    uni.navigateBack({ delta: num || 1 });
  }
  navigateTo(url) {
    if (this.antiShake()) return
    url = this.splicingUrl(url)
    if (this.testingNeedLogin(url)) {
      uni.navigateTo({
        url: this.getPageUrl(url)
      });
      return false;
    }
    uni.navigateTo({ url });
  }
}
