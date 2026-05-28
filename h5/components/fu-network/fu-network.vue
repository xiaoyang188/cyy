<template>
  <view class="fu-network" v-if="isConnected">
    <view class="fu-count-df" v-if="mode == 'full'" :style="{ zIndex: zIndex }">
      <image class="icon" :src="image ? image : benbenImageSrcResolution('network.png', 'global')" mode="aspectFit"></image>
      <view class="tips">{{ tips }}</view>
      <view class="text-gray text-sm margin-bottom-sm">{{ $t('请检查网络，或者前往') }}{{ $t('设置') }}</view>
      <view class="text-blue" @click="getNetworkStattus">{{ $t('点击刷新') }}</view>
    </view>
    <view class="fu-count-tips" v-if="mode == 'tips'">
      <text></text>
      <text>{{ tips }}</text>
    </view>
  </view>
</template>

<script>
/**
 * fu-network 无网络提示
 * @description 该组件无需任何配置，引入即可，内部自动处理所有功能和事件。
 * @property {String} mode full 全屏模式 | tips 占位模式 | toast 提示框模式 | modal 弹框模式
 * @property {String} tips 没有网络时的提示语（默认哎呀，网络信号丢失）
 * @property {String Number} zIndex 组件的z-index值（默认1080）
 * @property {String} image 无网络的图片提示，可用的src地址或base64图片
 * @event {Function} retry 用户点击页面的"重试"按钮时触发
 * @example <fu-network></fu-network>
 */
export default {
  name: 'fu-network',
  props: {
    // 组件模式 默认全屏模式 、tips 占位模式 、toast 提示框模式
    mode: {
      type: String,
      default() {
        return 'full'
      },
    },
    tips: {
      type: String,
      default() {
        return global.i18n.t('哎呀，网络信号丢失')
      },
    },
    zIndex: {
      type: [String, Number],
      default() {
        return 100
      },
    },

    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    isConnected() {
      return this.$store.state.networkType == 'none'
    },
  },
  watch: {
    isConnected(val, old) {
      if (val != old && val) {
        this.$emit('networkSuccess', this.$store.state.networkType)
      }
    },
  },
  created() {},
  methods: {
    // 功能：获取当前网络状态
    getNetworkStattus() {
      uni.getNetworkType({
        success: (res) => {
          this.$store.commit('updateNetworkType', res.networkType)
          if (res.networkType == 'none') {
            this.$message.info(this.tips)
          }
        },
      })
    },
  },
}
</script>

<style lang="scss">
.fu {
  &-network {
    color: #666;
    .fu-count-df {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      text-align: center;
      padding-top: 380rpx;
      z-index: 9999;
      .icon {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 20rpx;
      }

      .tips {
        margin-bottom: 20rpx;
      }
    }

    .fu-count-tips {
      font-size: 24rpx;
      line-height: 80rpx;
      background-color: #ffdfdf;
      color: #666;
      text-align: center;
    }
  }
}
</style>
