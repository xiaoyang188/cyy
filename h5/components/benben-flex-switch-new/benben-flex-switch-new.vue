<template>
  <!-- #ifndef MP-WEIXIN -->
  <view>
    <!-- #endif -->
    <view @tap.stop="tapHandle" :class="classStr">
      <slot v-if="active" name="checked"></slot>
      <slot v-else name="unchecked"></slot>
    </view>
    <!-- #ifndef MP-WEIXIN -->
  </view>
  <!-- #endif -->
</template>
<script>
export default {
  name: 'benben-flex-switch-new',
  props: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
    auto: { type: [Boolean], default: true }, //是否自动修改值
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    classStr() {
      let classStr = this.disabled ? 'disabledSwtich' : ''
      //判断this.classText or this.className是为空数组或空对象
      if (typeof this.classText === 'object' && Object.keys(this.classText).length) {
        Object.keys(this.classText).map((key) => {
          if (this.classText[key]) classStr += ' ' + this.classText[key]
        })
      } else if (typeof this.classText === 'string' && this.classText) {
        classStr += ' ' + this.classText
      }
      if (typeof this.className === 'object' && Object.keys(this.className).length) {
        Object.keys(this.className).map((key) => {
          if (this.className[key]) classStr += ' ' + this.className[key]
        })
      } else if (typeof this.className === 'string' && this.className) {
        classStr += ' ' + this.className
      }
      return classStr
    },
    active() {
      // 处理字符串的情况
      if (typeof this.value === 'string') {
        return this.value == '1'
      }
      // 处理数字的情况
      if (typeof this.value === 'number') {
        return this.value == 1
      }
      // 处理布尔值的情况
      return this.value
    },
  },
  //监听value
  watch: {},
  methods: {
    tapHandle() {
      if (this.disabled) {
        return
      }
      let value = ''
      if (typeof this.value === 'string') {
        // 处理字符串的情况
        value = this.value == '1' ? '0' : '1'
      } else if (typeof this.value === 'number') {
        // 处理数字的情况
        value = this.value ? 0 : 1
      } else {
        // 处理其他情况
        value = !this.value
      }
      if (this.auto) this.$emit('input', value)
      this.$emit('change', value)
    },
  },
  // 组件周期函数--监听组件挂载完毕
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
.disabledSwtich {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
