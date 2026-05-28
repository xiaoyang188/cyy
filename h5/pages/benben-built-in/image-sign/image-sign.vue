<template>
  <view class="signature" :class="{ landscape }">
    <text class="signature-text">{{ $t('请在此处签名') }}</text>
    <view class="signature-area">
      <l-signature
        disableScroll
        ref="signatureRef"
        :penColor="penColor"
        :penSize="penSize"
        :key="landscape"
        uid="0"
        :minLineWidth="2"
        :openSmooth="openSmooth"
        :boundingBox="bBox"
        landscape
      ></l-signature>
    </view>
    <view class="tools">
      <view class="tools-item" @tap="isShowPen = !isShowPen">
        <!-- #ifdef APP-NVUE -->
        <text>{{ $t('设置') }}</text>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <text class="fu-iconfont2">&#xe711;</text>
        <!-- #endif -->
      </view>
      <view class="tools-item" @tap="onClick('undo')">
        <!-- #ifdef APP-NVUE -->
        <text>{{ $t('撤消') }}</text>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <text class="fu-iconfont2">&#xe62d;</text>
        <!-- #endif -->
      </view>
      <view class="tools-item restore" @tap="onClick('restore')">
        <!-- #ifdef APP-NVUE -->
        <text>{{ $t('上一步') }}</text>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <text class="fu-iconfont2">&#xe62d;</text>
        <!-- #endif -->
      </view>
      <view class="tools-item" @tap="onClick('clear')">
        <!-- #ifdef APP-NVUE -->
        <text>{{ $t('清空') }}</text>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <text class="fu-iconfont2">&#xe7c8;</text>
        <!-- #endif -->
      </view>
      <view class="tools-item">
        <button type="default" size="mini" @tap="onCancel" style="border: 1px solid #ccc; background: #fff">{{ $t('取消') }}</button>
      </view>
      <view class="tools-item">
        <button type="primary" size="mini" @tap="onClick('save')" class="margin-left-xs">{{ $t('保存') }}</button>
      </view>
    </view>
    <benben-popup mode="bottom" v-model="isShowPen">
      <view class="popup-wrap">
        <view class="popup-item">
          <view class="flex align-center padding-tb-sm">
            <view>{{ $t('模拟压感') }}</view>
            <view class="flex-sub text-right padding-right">
              <text>{{ openSmooth ? $t('开') : $t('关') }}</text>
              <switch class="popup-item__more-switch" @change="() => (openSmooth = !openSmooth)" :checked="openSmooth" />
            </view>
          </view>
          <view class="flex align-center justify-between padding-top-sm">
            <view>{{ $t('画笔粗细') }}</view>
            <view class="uni-numbox">
              <view :class="{ 'uni-numbox--disabled': penSize <= 1 }" class="uni-numbox__minus" @click="_calcValue('minus')">－</view>
              <text class="uni-numbox__value input-class">{{ penSize }}</text>
              <view :class="{ 'uni-numbox--disabled': penSize >= 20 }" class="uni-numbox__plus" @click="_calcValue('plus')">＋</view>
            </view>
          </view>
        </view>
      </view>
    </benben-popup>
  </view>
</template>

<script>
import lSignature from './l-signature/l-signature.vue'
export default {
  components: {
    lSignature,
  },
  data() {
    return {
      penColor: 'red',
      penSize: 8,
      aurl: '',
      show: false,
      landscape: true,
      openSmooth: true,
      bBox: true,
      isShowPen: false,
    }
  },
  watch: {},
  onUnload() {
    uni.$emit('image-cropping-success', false)
  },
  methods: {
    _calcValue(type) {
      if (type == 'plus' && this.penSize < 20) {
        this.penSize += 1
      }
      if (type == 'minus' && this.penSize > 1) {
        this.penSize -= 1
      }
    },
    open() {
      this.isShowPen = true
    },
    onCancel() {
      uni.navigateBack()
    },
    onClick(type) {
      const { signatureRef } = this.$refs
      if (type == 'openSmooth') {
        this.openSmooth = !this.openSmooth
        return
      }
      if (type == 'save') {
        signatureRef.canvasToTempFilePath({
          // destWidth: 300,
          // destHeight: 200,
          quality: 0.8,
          fileType: 'png',
          success: async (res) => {
            if (!res.isEmpty) {
              let filepath = res.tempFilePath
              uni.$emit('image-cropping-success', { name: 'signature.png', path: filepath })
              uni.navigateBack({
                delta: 1,
              })
            } else {
              this.$message.info(this.$t('请签名'))
            }
          },
        })
        return
      }
      if (signatureRef) signatureRef[type]()
    },
  },
}
</script>

<style lang="scss">
.uni-numbox {
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 46upx;
  align-items: center;
  position: relative;
}

.uni-numbox__minus,
.uni-numbox__plus {
  margin: 0;
  width: 50rpx;
  font-size: 32upx;
  height: 46rpx;
  line-height: 46rpx;
  text-align: center;
  display: inline-block;
  color: #333;
  position: relative;
  font-weight: bold;
  background: #eeeeee;
}

.uni-numbox__value {
  position: relative;
  /* background-color: #f9f9f9; */
  width: 80upx;
  min-width: 0;
  flex: 1;
  height: 100%;
  text-align: center;
  padding: 0;
  border-radius: 8rpx;
  margin: 0 10rpx;
  /* background: #F7F7F7; */
}

.uni-numbox--disabled {
  color: silver;
  /* background: #f9f9f9; */
}
.signature {
  /* #ifndef APP-NVUE */
  height: 100vh;
  /* #endif */
  /* #ifdef APP-NVUE */
  flex: 1;

  /* #endif */
  &-area {
    /* #ifndef APP-NVUE */
    height: 100vh;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex: 1;
    /* #endif */
  }

  &-text {
    position: absolute;
    /* #ifndef APP-NVUE */
    left: 50%;
    top: 50%;
    /* #endif */
    /* #ifdef APP-NVUE */
    left: 375rpx;
    top: 375rpx;
    /* #endif */
    font-size: 60rpx;
    color: #ddd;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: transform 300ms;
  }

  &-preview {
    position: absolute;
    bottom: 120rpx;
    right: 20rpx;
    width: 120px;
    background: #000;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

    &__image {
      /* #ifndef APP-NVUE */
      width: 100%;
      /* #endif */
      /* #ifdef APP-NVUE */
      flex: 1;
      /* #endif */
    }
  }

  &.landscape {
    .signature-preview {
      bottom: 20rpx;
      width: 220px;
    }

    .signature-text {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    .tools {
      z-index: 1;
      position: absolute;
      left: 20rpx;
      bottom: 10rpx;
      transform: rotate(90deg) translate(-100%, 0%);
      transform-origin: bottom left;
      padding-left: 16rpx;
      border-top-left-radius: 50rpx;
      border-bottom-left-radius: 50rpx;
      margin-bottom: 30rpx;

      &_item {
        padding: 0 16rpx;
      }
    }
    .popup-wrap {
      box-sizing: border-box;
      height: 750rpx;
      padding: 0 32rpx;
      padding-top: 50px;
      padding-bottom: 0;
      transform: rotate(90deg) translate(-100%, 0%);
      transform-origin: bottom left;
    }
  }
}

.screen-handle {
  position: absolute;
  right: 10rpx;
  top: 100rpx;
  width: 60rpx;
  height: 60rpx;
  background-color: white;
  border-radius: 10rpx;
  border: 1rpx solid #ddd;
  z-index: 10;
  justify-content: center;
  align-items: center;

  &__image {
    /* #ifndef APP-NVUE */
    width: 80%;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex: 0.8;
    /* #endif */
  }
}

.tools {
  background-color: #fff;
  position: relative;
  z-index: 999999;
  display: flex;
  height: 120rpx;
  box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.05);
  /* #ifdef APP-NVUE */
  flex-direction: row;
  /* #endif */
  /* #ifndef APP-NVUE */
  padding-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);

  /* #endif */
  &-item {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 0.1s ease-out;

    &.restore {
      /* #ifndef APP-NVUE */
      transform: scaleX(-1);
      /* #endif */
    }

    &.active {
      opacity: 1;
    }

    &__image {
      width: 60rpx;
    }
  }
}

.popup {
  &-wrap {
    padding-bottom: 120rpx;
    background-color: #fff;
  }

  &-item {
    padding-bottom: 30rpx;

    &__head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
    }

    &__title {
      font-size: 30rpx;
    }

    &__more {
      flex-direction: row;

      &-text {
        font-size: 24rpx;
        // padding-right 10rpx
        color: #999;
      }

      &-switch {
        transform: scale(0.7);
        transform-origin: center right;
      }
    }
  }
}
</style>
