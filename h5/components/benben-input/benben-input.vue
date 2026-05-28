<template>
  <view class="benben-input">
    <input
      @keyup="$emit('keyup', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @confirm="$emit('confirm', $event)"
      @click="$emit('click', $event)"
      @tap="$emit('tap', $event)"
      @input="changeValue"
      :value="inputValue"
      :placeholder="placeholder"
      :type="type"
      :focus="focus"
      :maxlength="maxlength"
      :password="password"
      :disabled="inputDisabled"
      :confirm-type="confirmType"
      :adjust-position="adjustPosition"
      :placeholder-style="placeholderStyleStr"
    />
    <view v-if="inputDisabled" class="benben-input-mack"></view>
  </view>
</template>
<script>
import { replaceCSSVariables } from '@/common/utils/utils.js'
export default {
  name: 'benben-input',
  props: {
    placeholderStyle: {
      type: [Object, String, Array],
      default: '',
    },
    adjustPosition: {
      type: [Boolean],
      default: true,
    },
    focus: {
      type: [Boolean],
      default: false,
    },
    confirmType: {
      type: [String],
      default: 'done',
    },
    placeholder: {
      type: [String],
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: -1,
    },
    disabled: {
      type: [Boolean, String, Number],
      default: false,
    },
    password: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: [String],
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  // #ifndef MP-ALIPAY
  options: {
    styleIsolation: 'shared',
    virtualHost: false,
  },
  // #endif
  // #ifdef MP-ALIPAY
  options: {
    virtualHost: false,
  },
  // #endif
  components: {},
  //监听value
  watch: {
    value: {
      handler(val) {
        this.inputValue = val
      },
      immediate: true,
    },
  },
  computed: {
    placeholderStyleStr() {
      // #ifdef MP
      return replaceCSSVariables(this.placeholderStyle, this.$store.getters.themeColorObj)
      // #endif
      return this.placeholderStyle
    },
    inputLength() {
      return this.value.length
    },
    inputDisabled() {
      let isDisabled = false
      if (typeof this.disabled === 'boolean') {
        // 处理布尔值的情况
        isDisabled = this.disabled
      } else if (typeof this.disabled === 'string') {
        // 处理字符串的情况
        isDisabled = this.disabled == '1' ? true : false
      } else if (typeof this.disabled === 'number') {
        // 处理数字的情况
        isDisabled = this.disabled ? true : false
      } else {
        // 处理其他情况
        isDisabled = false
      }
      return isDisabled
    },
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    changeValue(e) {
      let value = e.detail.value
      this.$emit('input', value)
    },
  },
  created() {},
}
</script>
<style lang="scss" scoped>
.benben-input {
  position: relative;
  /* #ifdef MP-WEIXIN */
  line-height: inherit;
  font-size: inherit;
  height: 100%;
  /* #endif */
  input {
    height: inherit;
    line-height: inherit;
    font-size: inherit;
  }
  .benben-input-mack {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
}
</style>
