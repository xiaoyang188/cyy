<template>
  <view :id="waterfallItemId" :style="styleInfo" class="benben-waterfall-item">
    <slot></slot>
  </view>
</template>
<script>
import { getUUID } from '@/common/utils/utils.js'
export default {
  name: 'benben-waterfalls-item',
  props: {
    sortIndex: {
      type: [String, Number],
      default: 0,
    },
  },
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  // #endif
  data() {
    return {
      // 临时列表
      waterfallItemId: 'waterfall' + getUUID(),
      parent: null,
    }
  },
  created() {
    this.parent = this.parentFn('benben-waterfalls')
    if (this.parent.waterfallList[this.sortIndex]) {
      this.parent.waterfallList[this.sortIndex] = this.uvGetRect
    } else {
      this.parent.waterfallList.push(this.uvGetRect)
    }
  },
  computed: {
    styleInfo() {
      if (this.parent && this.parent?.styleInfos[this.sortIndex]) {
        return this.parent?.styleInfos[this.sortIndex]
      }
      return ''
    },
  },
  watch: {},
  mounted() {},
  methods: {
    uvGetRect() {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select('#' + this.waterfallItemId)
          .boundingClientRect((rect) => {
            resolve(rect)
          })
          .exec()
      })
    },
    parentFn(name = undefined) {
      let parent = this.$parent
      // 通过while历遍，这里主要是为了H5需要多层解析的问题
      while (parent) {
        // 父组件
        if (parent.$options && parent.$options.name !== name) {
          // 如果组件的name不相等，继续上一级寻找
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },
  },
}
</script>
<style lang="scss" scoped></style>
