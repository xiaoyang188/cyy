<template>
  <view class="benben-safe-area" :style="safeAreaStyle"></view>
</template>
<script>
export default {
  name: 'benben-safe-area',
  computed: {
    safeAreaStyle() {
      const h = this.bottomSafeArea || 0
      if (h > 0) {
        return { height: `${h}px` }
      }
      return {}
    },
  },
}
</script>

<style scoped lang="scss">
.benben-safe-area {
  width: 100%;
  flex-shrink: 0;
  /* #ifdef H5 */
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom, 0px);
  /* #endif */
}
</style>
