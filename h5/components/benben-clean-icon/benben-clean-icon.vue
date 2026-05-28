<template>
  <text @click.stop="handClean">
    <slot />
  </text>
</template>
<script>
export default {
  name: 'benben-clean-icon',
  props: {
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
  computed: {},
  data: () => ({}),
  methods: {
    handClean() {
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
  created() {},
}
</script>
<style lang="scss" scoped></style>
