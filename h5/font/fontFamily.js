import { RESOURCES_PATH } from '@/common/config.js';
export default function getFontFamily() {
    // #ifdef MP-WEIXIN
    if (RESOURCES_PATH) {
		uni.loadFontFace({
			global: true,
			family: 'fu-iconfont2',
			source: `url("${RESOURCES_PATH}/static/font_family/fu-iconfont2.ttf")`,
			success() {
				console.log('fu-iconfont2 字体图标加载成功')
			},
		})
	}
    
    // #endif
}