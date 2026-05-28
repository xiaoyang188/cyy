<template>
  <view :style="themeColor">
    <slot></slot>
    <benben-loading
      :text-color="textColor"
      :loadingning="loading"
      :type="loadingType"
      :loading-text="loadingText"
      :background-color="backgroundColor"
      :text-flicker="true"
      :size="loadingSize"
      :text-size="textSize"
      :fixed="true"
    ></benben-loading>
    <!-- #ifdef APP-PLUS -->
    <fu-network v-if="openNetwork" @networkSuccess="$emit('networkSuccess', $event)"></fu-network>
    <!-- #endif -->
    <float-main-tabbar v-if="DIY_TABBAR && isTabbar" mode="fab" :page-path="pagePath" />
  </view>
</template>
<script>
import pageLoadingConfig from '../benben-loading/page-loading-config.json'
import pageLoadingProps from '../benben-loading/page-loading-props.js'
import { DIY_TABBAR } from '@/common/config.js'
export default {
  name: 'page-body',
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
  // options: {
  // virtualHost: true,
  // multipleSlots: true,
  //   styleIsolation: 'apply-shared',
  // },
  // #endif
  props: {
    zIndex: {
      type: [Number, String],
      default: pageLoadingConfig?.zIndex || 100,
    },
    isTabbar: {
      type: [Boolean],
      default: false,
    },
    openNetwork: {
      //开启网络提示
      type: [Boolean],
      default: false,
    },
    pagePath: {
      type: [String],
      default: '',
    },
    loading: {
      type: [Boolean],
      default: false,
    },
    loadingType: {
      type: [String],
      default: pageLoadingConfig?.defaultLoadingType || 'loading0',
    },
    loadingSize: {
      type: [String, Number],
      default: pageLoadingConfig?.size || 120,
    },
    textSize: {
      type: [Number, String],
      default: pageLoadingConfig?.textSize || 24,
    },
    textColor: {
      type: String,
      default: pageLoadingConfig?.textColor || '#3375f6',
    },
    backgroundColor: {
      type: String,
      default: pageLoadingConfig?.backgroundColor || '#FFF',
    },
    ...pageLoadingProps,
  },
  data() {
    return {
      DIY_TABBAR,
    }
  },
  computed: {
    themeColor() {
      // #ifdef MP-WEIXIN
      return (
        this.$store.getters.themeColor +
        `--benben-window-bottom: 0px;`
      )
      // #endif
      // #ifndef MP-WEIXIN
      return (
        this.$store.getters.themeColor +
        `--benben-window-bottom: var(--window-bottom,0px);`
      )
      // #endif
    },
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
