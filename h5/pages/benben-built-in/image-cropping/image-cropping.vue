<template>
  <view>
    <view class="cu-custom" :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }">
      <view class="action" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
        <text class="fu-iconfont2">&#xe794;</text>
      </view>
    </view>
    <qf-image-cropper ref="qfImageCropper" :width="width" :height="height" :showAngle="showAngle" :src="src" @crop="handleCrop"></qf-image-cropper>
  </view>
</template>

<script>
import QfImageCropper from './qf-image-cropper/qf-image-cropper.vue'
export default {
  components: {
    QfImageCropper,
  },
  data() {
    return {
      src: '',
      width: 0,
      height: 0,
      showAngle: true,
    }
  },
  onLoad(options) {
    this.width = Number(options.rectWidth)
    this.height = Number(options.rectHeight)
    this.src = options.myImgUrl
    // croppingTypes裁切模式   auto（不设尺寸）、settled（固定尺寸）
    this.showAngle = options.croppingTypes == 'auto' ? true : options.croppingTypes == 'settled' ? false : true
  },
  onUnload() {
    uni.$emit('image-cropping-success', false)
  },
  methods: {
    handleCrop(e) {
      let path = e.tempFilePath
      // 裁剪完成推送裁剪后的path并返回上一页
      uni.$emit('image-cropping-success', { name: 'cropping.png', path })
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>

<style lang="scss">
.cu-custom {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 750rpx;
  padding: 0rpx 32rpx 0rpx 32rpx;
  line-height: 88rpx;
  .action {
    width: 100rpx;
    .fu-iconfont2 {
      font-size: 36rpx;
      font-weight: 400;
      color: #fff;
      position: relative;
      z-index: 20;
    }
  }
}
</style>
