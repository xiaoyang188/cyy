<template>
  <view class="benben-image-upload-item">
    <view class="choose-imgbox">
      <image @tap.stop="handImage" :lazy-load="lazyLoad" :show-menu-by-longpress="showMenuByLongpress" :src="src" :mode="mode" />
      <view class="progress-wrapper" v-if="parent.isShowProgress && handMethod == 'manyChooseImage'">
        <view class="progress-wrapper-inner">
          <progress :percent="parent.progress" :active-color="activeColor" stroke-width="5" border-radius="3" class="upload-progress" />
          <view class="upload-text">{{ parent.progress }}%</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { themeColorConfig } from '@/common/config.js'
export default {
  name: 'benben-image-item',
  props: {
    src: {
      type: [String],
      default: '',
    },
    lazyLoad: {
      type: [Boolean],
      default: false,
    },
    showMenuByLongpress: {
      type: [Boolean],
      default: false,
    },
    mode: {
      type: [String],
      default: 'aspectFit',
    },
    handIndex: {
      type: [String, Number],
      default: 'null',
    },
    handName: {
      type: String,
      default: '',
    },
    handMethod: {
      type: String,
      default: '',
    },
  },
  // #ifndef MP-ALIPAY
  options: {
    styleIsolation: 'shared',
  },
  // #endif
  // #ifdef MP-ALIPAY
  options: {
    virtualHost: false,
  },
  // #endif
  components: {},
  //监听value
  watch: {},
  computed: {
    activeColor() {
      const btnColor = themeColorConfig[0]?.btnColorConfig?.[0]
      return btnColor || '#2f98fe'
    },
  },
  data: () => ({
    parent: null,
  }),
  methods: {
    handImage() {
      let benbenImagesUpload = this.getCollapse(this.handName)
      if (this.handMethod && benbenImagesUpload[this.handMethod]) {
        if (this.handIndex !== 'null') {
          benbenImagesUpload[this.handMethod](this.handIndex)
        } else {
          benbenImagesUpload[this.handMethod]()
        }
      }
    },
    getCollapse(name) {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== name) {
        parent = parent.$parent
        if (!parent) return false
        parentName = parent.$options.name
      }
      return parent
    },
  },
  created() {
    this.parent = this.getCollapse('benben-images-upload')
  },
}
</script>
<style lang="scss" scoped>
/* #ifndef MP-WEIXIN */
image {
  border-radius: inherit;
  width: 100%;
  height: 100%;
}
/* #endif */
/* #ifdef MP-WEIXIN */
.benben-image-upload-item {
  width: inherit;
  height: inherit;
  border-radius: inherit;

  image {
    border-radius: inherit;
    width: inherit;
    height: inherit;
  }
}
/* #endif */
.progress-wrapper {
  // 加一个显示隐藏的过渡动画
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  .progress-wrapper-inner {
    position: absolute;
    top: 42%;
    width: 100%;
    .upload-progress {
      width: 92%;
      border-radius: 10rpx;
      margin: 0 auto;
    }
    .upload-text {
      margin-top: 16rpx;
      text-align: center;
      color: #fff;
      position: relative;
      top: 60%;
    }
  }
}
.choose-imgbox {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
