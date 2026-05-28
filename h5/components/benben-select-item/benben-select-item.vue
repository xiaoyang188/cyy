<template>
  <view class="benben-select-item" @click.stop="handImage">
    <view v-if="isSelected">
      <slot name="selected" />
    </view>
    <view v-else>
      <slot name="no-selected" />
    </view>
  </view>
</template>
<script>
export default {
  name: 'benben-select-item',
  props: {
    handName: {
      type: String,
      default: 'benben-select-diy',
    },
    handMethod: {
      type: String,
      default: 'tapHandle',
    },
    handValue: {
      type: [String, Number],
      default: '',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
  components: {},
  //监听value
  watch: {},
  computed: {
    isSelected() {
      let parentData = this.getCollapse(this.handName)
      //将value以,haon分隔开，然后判断当前的value是否在其中
      if (!parentData?.activeIds?.length) {
        return false
      }
      return parentData?.activeIds.includes(this.handValue + '')
    },
  },
  data: () => ({}),
  methods: {
    handImage() {
      let benbenImagesUpload = this.getCollapse(this.handName)
      if (this.handMethod && benbenImagesUpload[this.handMethod]) {
        if (this.handValue !== 'null' && this.handValue !== '') {
          benbenImagesUpload[this.handMethod](this.handValue + '')
        }
      }
    },
    getCollapse(name) {
      if (!name) return null
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
<style lang="scss" scoped>
.benben-select-item {
  flex-shrink: 0;
}

</style>
