<template>
  <view class="kefu-web-view-page">
    <view class="kefu-web-view-page__header">
      <view class="kefu-web-view-page__back" @tap="goBack">
        <text class="kefu-web-view-page__back-icon">‹</text>
        <text class="kefu-web-view-page__back-text">{{ $t('返回') }}</text>
      </view>
    </view>
    <web-view v-if="webPath" class="kefu-web-view-page__frame" :src="webPath" :style="frameStyle"></web-view>
  </view>
</template>

<script>
/** 客服页顶栏固定高度（px），仅本页使用 */
const KEFU_HEADER_PX = 88

export default {
  data() {
    return {
      webPath: '',
    }
  },
  computed: {
    frameStyle() {
      return {
        width: '100%',
        height: `calc(100vh - ${KEFU_HEADER_PX}px)`,
        marginTop: `${KEFU_HEADER_PX}px`,
      }
    },
  },
  onLoad({ webPath }) {
    if (webPath !== undefined) {
      this.webPath = decodeURIComponent(webPath)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
  },
}
</script>

<style scoped lang="scss">
.kefu-web-view-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}

.kefu-web-view-page__header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 88px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1rpx solid #eee;
  display: flex;
  align-items: flex-end;
  padding-bottom: 12rpx;
  padding-left: 8rpx;
  padding-right: 24rpx;
}

.kefu-web-view-page__back {
  display: flex;
  align-items: center;
  min-height: 64rpx;
  padding: 0 16rpx;
}

.kefu-web-view-page__back-icon {
  font-size: 52rpx;
  line-height: 1;
  color: #333;
  margin-right: 4rpx;
  margin-top: -6rpx;
}

.kefu-web-view-page__back-text {
  font-size: 30rpx;
  color: #333;
}

.kefu-web-view-page__frame {
  display: block;
}
</style>
