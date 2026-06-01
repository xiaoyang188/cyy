import Vue from 'vue';
import App from './App';
import store from './store/index';
import apiUrls from '@/common/api/url.js'
import {
  i18n
} from '@/locale/index'
import {
  http
} from '@/common/api/index.js';
import {
  message,
  Router,
  validate
} from '@/common/utils/index.js';
import {
  BASE_URL,
  IMG_BASE_URL,
  SYSTEM_CONFIG,
  PAGE_SIZE,
  IS_DEV,
  needLoginPages,
  LANGUAGES
} from '@/common/config.js';
import * as utils from '@/common/utils/utils';
import { initSystemInfo, systemInfoMixin, refreshSystemInfo } from '@/common/utils/systemInfo.js';
import './common/filter/index.js';
import './common/mixin/index.js';
const router = new Router({
  needLoginPages
});
Vue.config.productionTip = false;
global.i18n = i18n
global.locale = i18n.locale;
// 获取系统信息（H5 WebView 内会在就绪后延迟刷新）
initSystemInfo(store)
Vue.mixin(systemInfoMixin)
Vue.prototype._i18n = i18n;
// 加载语言包 END
Vue.prototype.$urouter = router;
Vue.prototype.$api = http;
Vue.prototype.$message = message;
Vue.prototype.$util = utils;
Vue.prototype.$store = store;
uni.$store = store;
Vue.prototype.$validate = validate;
global.apiUrls = apiUrls;
global.IS_DEV = IS_DEV == 0 ? 0 : 1;
global.PAGE_SIZE = PAGE_SIZE;
// global.VERSION_CODE = VERSION_CODE;
global.SYSTEM_CONFIG = SYSTEM_CONFIG;
App.mpType = 'app';
const app = new Vue({
  ...App,
  store,
  i18n,
});
app.$mount();

// #ifdef H5
// App web-view 内嵌时：须在 H5 的 uni 初始化后再注入 web-view SDK（须用 uni.webView.navigateTo 跳原生页）
import {
  reinjectWebviewSdkAfterAppReady
} from '@/common/utils/hostAppPay.js'
reinjectWebviewSdkAfterAppReady().then(() => refreshSystemInfo(store))
// #endif
