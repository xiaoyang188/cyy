
// #ifdef APP-NVUE
import { benbenImageSrcResolution, syncUniApi } from '@/common/utils/utils.js';
import { t } from '@/locale/index.js';
import { message } from '@/common/utils/index.js';
// #endif
export default {
    // #ifdef APP-NVUE
    data() { return {} },
    computed: {
    },
    created() {
        this.$message = message
    },
    methods: {
        // 图片点击放大
        previewImage(url) {
            uni.previewImage({
                current: url,
                urls: [url],
            })
        },
        benbenImageSrcResolution,
        syncUniApi,
        uniShowToast(title) {
            uni.showToast({
                title: this.$t(title),
                icon: 'none',
            })
        },
        $t(key) {
            return t(key)
        },
    }
    // #endif

}
