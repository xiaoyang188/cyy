<template>
  <view class="benben-waterfall">
    <slot></slot>
  </view>
</template>
<script>
/**
 * 验证十进制数字
 */
export function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}
export function addUnit(value = 'auto', unit = uni?.$uv?.config?.unit ? uni?.$uv?.config?.unit : 'px') {
  value = String(value)
  // 用uvui内置验证规则中的number判断是否为数值
  return number(value) ? `${value}${unit}` : value
}
/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$uv.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
export function sleep(value = 50) {
  if (value < 50) value = 50
  return new Promise((resolve) => {
    let setObj = setTimeout(() => {
      clearTimeout(setObj)
      resolve()
    }, +value)
  })
}
export default {
  name: 'benben-waterfalls',
  props: {
    // 瀑布流数据
    // #ifdef VUE2
    value: {
      type: Array,
      default: () => [],
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type: Array,
      default: () => [],
    },
    // #endif
    waterfallData: {
      type: Array,
      default: () => [],
    },
    // 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms
    addTime: {
      type: [Number, String],
      default: 200,
    },
    // 瀑布流的列数，默认2，最高为5
    columnCount: {
      type: [Number, String],
      default: 2,
    },
    // 列与列的间隙，默认20
    columnGap: {
      type: [Number, String],
      default: 20,
    },
    // 左边和列表的间隙
    leftGap: {
      type: [Number, String],
      default: 0,
    },
    // 右边和列表的间隙
    rightGap: {
      type: [Number, String],
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
      loadIndex: 0,
      flag: false,
      tempList: [],
      waterfallList: [],
    }
  },
  created() {},
  computed: {
    listData() {
      // #ifdef VUE2
      return this.value
      // #endif
      // #ifdef VUE3
      return this.modelValue
      // #endif
    },
    styleInfos() {
      let styleInfos = []
      for (let index = 0; index < this.columnCount; index++) {
        styleInfos.push(
          `margin-left: ${index == 0 ? addUnit(this.leftGap) : `calc(${addUnit(this.columnGap)} / 2)`};margin-right: ${
            index == this.columnCount - 1 ? addUnit(this.rightGap) : `calc(${addUnit(this.columnGap)} / 2)`
          };width:calc((100% - (${addUnit(this.columnGap)} * ${this.columnCount - 1}) - ${addUnit(this.rightGap)} - ${addUnit(this.leftGap)}) / ${
            this.columnCount
          })`,
        )
      }
      return styleInfos
    },
  },
  watch: {
    'listData.length': {
      deep: true,
      immediate: true,
      handler(newVal, OldVal) {
        if (newVal == 0) {
          this.loadIndex = 0
          this.addWaterfall()
        } else if (newVal < OldVal) {
          this.loadIndex = newVal - 1
          this.addWaterfall(this.loadIndex)
        } else {
          this.addItem()
        }
      },
    },
    waterfallData: {
      deep: true,
      handler(val) {
        this.flag = false
        this.addItem()
      },
    },
  },
  mounted() {},
  methods: {
    refresh() {},
    renew() {},
    // 清除指定的某一条数据，根据id来实现
    remove() {},
    addWaterfall(data, index) {
      let newWaterfallData = []
      let waterfallData = this.waterfallData
      if (data < this.columnCount) {
        for (let i = 0; i < this.columnCount; i++) {
          newWaterfallData.push(i <= data ? [i] : [])
        }
      } else {
        let waterfallObj = {}
        for (let i = 0; i < this.columnCount; i++) {
          waterfallObj[i] = {}
          waterfallData[i]?.map((val) => {
            if (data > val) waterfallObj[i][val] = ''
          })
        }
        if (data >= 0 && index >= 0) waterfallObj[index][data] = ''
        Object.keys(waterfallObj).map((key) => {
          newWaterfallData.push(Object.keys(waterfallObj[key]))
        })
      }
      // 追加前先判断是否有对应的index
      if (JSON.stringify(newWaterfallData) != JSON.stringify(waterfallData)) {
        this.flag = true
        this.$emit('update:waterfall-data', newWaterfallData)
      } else {
        this.addItem()
      }
    },
    getMin(arr) {
      let result = null
      const filter = arr.filter((item) => item.height == 0)
      if (!filter.length) {
        result = arr.reduce((min, current) => {
          return current['height'] < min['height'] ? current : min
        }, arr[0])
      } else {
        let newArr = []
        arr.map((item, index) => {
          newArr.push({
            len: this.waterfallData[index].length,
            item: item,
          })
        })
        const minLen = Math.min.apply(
          Math,
          newArr.map((item) => {
            return item.len
          }),
        )
        try {
          const { item } = newArr.find((item) => item.len == minLen && item.item.height == 0)
          result = item
        } catch (e) {
          const { item } = newArr.find((item) => item.item.height == 0)
          result = item
        }
      }
      return result
    },
    async addItem() {
      if (this.flag) return
      if (this.loadIndex >= this.listData.length) return
      if (this.loadIndex < +this.columnCount) {
        this.listData.length >= this.columnCount ? (this.loadIndex = this.columnCount - 1) : ''
        this.addWaterfall(this.loadIndex++)
        return
      }
      if (!this.listData.length) return
      await sleep(this.addTime)
      let rectArr = []
      for (let i = 0; i < this.waterfallList.length; i++) {
        let rect = await this.waterfallList[i]()
        rectArr.push({
          ...rect,
          index: i,
        })
      }
      let minRect = this.getMin(rectArr)
      this.addWaterfall(this.loadIndex, minRect.index)
      if (this.listData.length > this.loadIndex) {
        this.loadIndex = this.loadIndex + 1
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.benben-waterfall {
  display: flex;
  align-items: flex-start;
}
</style>
