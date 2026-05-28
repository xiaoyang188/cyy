<template>
  <textarea
    :class="{ 'benben-textarea-content': true, 'auto-height': autoHeight }"
    @keyup="$emit('keyup', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @confirm="$emit('confirm', $event)"
    @input="changeValue"
    :value="inputValue"
    :placeholder="placeholder"
    :focus="focus"
    :maxlength="maxlength"
    :auto-height="autoHeight"
    :disabled="disabled"
    :confirm-type="confirmType"
    :adjust-position="adjustPosition"
    :placeholder-style="placeholderStyleStr"
    :show-count="false"
  />
</template>
<script>
import { replaceCSSVariables } from '@/common/utils/utils.js'
export default {
  name: 'benben-textarea',
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
  props: {
    placeholderStyle: {
      type: [Object, String, Array],
      default: '',
    },
    adjustPosition: {
      type: [Boolean],
      default: true,
    },
    autoHeight: {
      type: [Boolean],
      default: false,
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
      type: [Boolean],
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
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
    inputLength() {
      return this.value.length
    },
    placeholderStyleStr() {
      // #ifdef MP
      return replaceCSSVariables(this.placeholderStyle, this.$store.getters.themeColorObj)
      // #endif
      return this.placeholderStyle
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
      if (this.maxlength > -1 && value.length > this.maxlength) {
        value = value.substr(0, this.maxlength)
        setTimeout(() => {
          this.$emit('input', value)
        }, 0)
      }
    },
  },
  created() {},
}
</script>
<style lang="scss" scoped>
.benben-textarea-content {
  /* #ifdef MP-WEIXIN */
  width: 100%;
  height: 100%;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  display: block;
  /* #endif */
  &.auto-height {
    min-height: inherit;
    height: auto;
  }
}
</style>
