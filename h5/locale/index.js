import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { initVueI18n } from '@dcloudio/uni-i18n'
const commonLangs = require.context('@/locale/', true, /\.json$/);
const componentsLangs = require.context('@/components/', true, /\lang.js$/);
const pageLangs = require.context('@/pages/', true, /\lang.js$/);
const messages = {}
commonLangs.keys().map((modulePath) => {
	if (modulePath.includes('uni-app')) return
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = commonLangs(modulePath);
	messages[moduleName] = value
});
componentsLangs.keys().map((modulePath) => {

	if ((typeof value == 'object') && value.default) {
		const value = componentsLangs(modulePath, value.default.hasOwnProperty(type));
		Object.keys(messages).map(type => {
			// 排除建了lang.js没有内容时报错
			if (value.default.hasOwnProperty(type)) {
				messages[type] = { ...value.default[type], ...messages[type] }
			}
			if (type == 'zh-Hans' && value.default.hasOwnProperty('zh')) {
				messages[type] = { ...value.default['zh'], ...messages[type] }
			}
		})
	}
});
pageLangs.keys().map((modulePath) => {
	const value = pageLangs(modulePath);
	if ((typeof value == 'object') && value.default) {
		Object.keys(messages).map(type => {
			// 排除建了lang.js没有内容时报错
			console.log('pageLangs', value.default.hasOwnProperty(type), type);
			if (value.default.hasOwnProperty(type)) {
				messages[type] = { ...value.default[type], ...messages[type] }
			}
			if (type == 'zh-Hans' && value.default.hasOwnProperty('zh')) {
				messages[type] = { ...value.default['zh'], ...messages[type] }
			}
		})
	}
});
Vue.use(VueI18n);
const i18nConfig = {
	locale: uni.getLocale(),
	messages,
	silentTranslationWarn: true,
};
export const i18n = new VueI18n(i18nConfig);
export const { t } = initVueI18n(messages);