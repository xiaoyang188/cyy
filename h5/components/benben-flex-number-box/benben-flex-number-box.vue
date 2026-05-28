<template>
  <view :class="classStr">
    <view @tap.stop="_calcValue('minus')" :class="minDisabled ? 'disabledBtn' : ''">
      <slot name="minus"></slot>
    </view>
    <input :class="inputClass" :disabled="disabled" type="number" v-model="inputValue" @input="changeValue" />
    <view @tap.stop="_calcValue('plus')" :class="maxDisabled ? 'disabledBtn' : ''">
      <slot name="plus"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'benben-flex-number-box',
  props: {
    value: {
      type: [Number, String],
      default: 1,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: '',
    },
    //已弃用
    className: {
      type: [String, Object, Array],
      default: '',
    },
    //className为支付宝小程序保留字段，故使用classText
    classText: {
      type: [String, Object, Array],
      default: '',
    },
  },
  data: () => ({
    inputValue: 0,
    timer: null,
  }),
  computed: {
    classStr() {
      return this.classText || this.className
    },
    minDisabled() {
      return this.inputValue <= this.min || this.disabled
    },
    maxDisabled() {
      return this.inputValue >= this.max || this.disabled
    },
    decimalPlaces() {
      const stepStr = this.step.toString()
      const decimalIndex = stepStr.indexOf('.')
      let num = decimalIndex === -1 ? 0 : stepStr.length - decimalIndex - 1
      return num
    },
  },
  //监听value
  watch: {
    value: {
      handler(val) {
        this.inputValue = +val
      },
      immediate: true,
    },
  },
  methods: {
    _calcValue(type) {
      if (type === 'minus' && !this.disabled && this.inputValue == this.min) {
        this.$emit('change', this.inputValue)
        return
      }
      if (type === 'plus' && !this.disabled && this.inputValue == this.max) {
        this.$emit('change', this.inputValue)
        return
      }
      if (this.disabled) return
      if (this.max < this.inputValue) {
        this.inputValue = this.max
      }
      let value = this.inputValue
      let step = this.step
      if (type === 'minus') {
        if (this.decimalPlaces == 0) {
          value -= step
        } else {
          value = Number((value - step).toFixed(2))
        }
        if (value < this.min) return
        if (value > this.max) {
          value = this.max
        }
      } else if (type === 'plus') {
        if (this.decimalPlaces == 0) {
          value += step
        } else {
          value = Number((value + step).toFixed(2))
        }

        if (value > this.max) return
        if (value < this.min) {
          value = this.min
        }
      }
      this.inputValue = value
      this.$emit('input', this.inputValue)
      this.$emit('change', this.inputValue)
    },
    changeValue(e) {
      let value = e.detail.value
      if (!value) {
        this.inputValue = this.min
        setTimeout(() => {
          this.$emit('input', this.inputValue)
          this.$emit('change', this.inputValue)
        }, 400)
        return
      }
      if (value > this.max) {
        value = this.max
      } else if (value < this.min) {
        value = this.min
      }
      setTimeout(() => {
        this.inputValue = Number(value)
        this.$emit('input', this.inputValue)
        this.$emit('change', this.inputValue)
      }, 400)
    },
  },
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style>
.disabledBtn {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
