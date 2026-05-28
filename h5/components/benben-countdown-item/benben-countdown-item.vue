<template>
  <text class="benben-countdown-item">
    {{ showData }}
  </text>
</template>
<script>
export default {
  name: 'benben-countdown-item',
  props: {
    dateType: {
      type: String,
      default: 'h',
    },
  },
  options: {
    styleIsolation: "shared"
  },
  components: {},
  //监听value
  watch: {
  },
  computed: {
    showData() {
      let benbencountdown = this.getCollapse('benben-countdown')
      if (!benbencountdown || !benbencountdown?.showTime) {
        return ''
      }
      return benbencountdown?.showTime[this.dateType]
    }

  },
  data: () => ({

  }),
  methods: {
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
  created() { },
}
</script>
<style lang="scss" scoped>
/* #ifdef MP-WEIXIN */
.benben-countdown-item {
  font-size: inherit;
  color: inherit;
}
/* #endif */
</style>
