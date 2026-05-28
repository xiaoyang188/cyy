<template>
  <view :class="classStr">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'benben-select-diy',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
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
    type: {
      type: String,
      default: 'radio',
    },
    maxSelect: {
      type: Number,
      default: -1,
    },
    items: {
      type: Array,
      default: () => [],
    },
    defaultType: {
      type: String,
      default: 'value',
    },
    defaultLabel: {
      type: String,
      default: 'name',
    },
    allowCancel: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    classStr() {
      return this.classText || this.className
    },
    allIds() {
      return this.items.map((item) => item[this.defaultType] + '')
    },
    activeIds() {
      if (this.value === '' || this.value === null || this.value === undefined) return []
      return (this.value + '').split(',')
    },
    activeLabel() {
      if (!this.activeIds.length) return []
      if (this.type == 'checkbox') {
        return this.items.filter((item) => this.activeIds.includes(item[this.defaultType] + '')).map((item) => item[this.defaultLabel])
      } else {
        let activItem = this.items.find((item) => this.activeIds.includes(item[this.defaultType] + ''))
        return activItem ? [activItem[this.defaultLabel]] : []
      }
    },
    isSelectAll() {
      if (!this.allIds.length) return false
      let noSelect = this.allIds.find((item) => !this.activeIds.includes(item))
      return !noSelect
    },
  },
  //监听value
  watch: {
    value(val, old) {
      if (val != old) {
        setTimeout(() => {
          this.$emit('change', {
            label: this.activeLabel.join(','),
            value: this.value,
          })
        }, 50)
      }
    },
    isSelectAll(val, old) {
      if (val != old) {
        this.$emit('update:select-all', val)
      }
    },
    activeLabel: {
      handler(val, old) {
        if (val?.toString() != old?.toString()) {
          let label = val.join(',')
          this.$emit('update:label', label)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    checkAll(flag = this.isSelectAll) {
      if (this.disabled) return
      if (flag) {
        this.$emit('input', '')
      } else {
        this.$emit('input', this.allIds.join(','))
        this.$emit('change', {
          value: this.allIds.join(','),
          label: this.items.map((item) => item[this.defaultLabel]),
        })
      }
    },
    tapHandle(aid) {
      if (this.disabled) return
      let activeIds = JSON.parse(JSON.stringify(this.activeIds))
      if (this.type == 'checkbox') {
        let activeIndex = activeIds.findIndex((id) => id == aid)
        if (activeIndex != -1) {
          if (this.allowCancel) activeIds.splice(activeIndex, 1)
        } else if ((this.maxSelect != -1 && activeIds.length <= this.maxSelect - 1) || this.maxSelect == -1) {
          activeIds.push(aid)
        }
      } else {
        if (activeIds.includes(aid)) {
          if (this.allowCancel) activeIds = []
        } else {
          activeIds = [aid]
        }
      }
      this.$emit('input', activeIds.join(','))
      this.$emit('tap-change', aid)
      return
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

<style></style>
