<template>
  <benben-popup z-index="1000" v-model="inputPopup" :mask="true" mode="center">
    <view class="input-popup">
      <input class="input-popup-value" type="number" v-model="popupValue" />
      <view class="input-popup-bottom">
        <view @tap="inputPopup = false">{{ $t('取消') }}</view>
        <view class="confirm-btn" @tap="handleConfirm">{{ $t('完成') }}</view>
      </view>
    </view>
  </benben-popup>
</template>
<script>
function safeModulo(x, y, precision = 10000) {
  let intX = x * precision;
  let intY = y * precision;
  return (intX % intY) / precision;
}
export default {
  name: 'benben-input-popup',
  props: {
    value: {
      type: [Number, String],
      default: 1,
    },
    zIndex: {
      type: [Number, String],
      default: 100,
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: Infinity,
    },
    step: {
      type: [Number, String],
      default: 1,
    },

  },
  data: () => ({
    inputPopup: false,
    popupValue: '',
  }),
  computed: {
  },
  //监听value
  watch: {
  },
  methods: {
    open(value) {
      this.inputPopup = true
      console.log('vaue', value);
      if (value !== undefined) {
        this.popupValue = value + ''
      } else {
        this.popupValue = this.value
      }
    },
    handleConfirm() {
      if (this.popupValue > this.max && this.max > 0) {
        this.popupValue = this.max
        this.$message.info(global.i18n.t('该商品最多能购买') + this.max + global.i18n.t('件'))
        return
      }
      if (this.popupValue < this.min) {
        this.popupValue = this.min
        this.$message.info(global.i18n.t('不能再少了呦~'))
        return
      }
      let remainder = Number(safeModulo(this.popupValue - this.min, this.step).toFixed(2))
      let inputValue = 0
      if (remainder > 0) {
        inputValue = Number((this.popupValue - remainder).toFixed(2))
      } else {
        inputValue = this.popupValue
      }
      this.inputValue = inputValue
      this.inputPopup = false
      this.$emit('input', inputValue)
      this.$emit('change', inputValue)
    },
  },
  mounted() { },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() { },
  // 组件周期函数--监听组件数据更新之后
  updated() { },
  // 组件周期函数--监听组件激活(显示)
  activated() { },
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() { },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() { },
}
</script>

<style lang="scss" scoped>
.disabledBtn {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-class {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.input-popup {
  width: 400rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding-top: 40rpx;
  overflow: hidden;

  .input-popup-value {
    width: 80%;
    height: 80rpx;
    text-align: center;
    background-color: #f8f8f8;
    border-radius: 16rpx;
    margin: 0 auto 40rpx;
  }

  .input-popup-bottom {
    display: flex;
    height: 80rpx;
    border-top: 1px solid #f8f8f8;

    view {
      flex: 1;
      text-align: center;
      line-height: 80rpx;
      color: #999;
    }

    .confirm-btn {
      border-left: 1px solid #f8f8f8;
      color: #2e9a3c;
    }
  }

}
</style>
