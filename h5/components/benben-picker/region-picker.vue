<template>
  <view class="w-picker-view">
    <picker-view
      mask-class="benben-picker-mask"
      class="d-picker-view"
      :indicator-style="itemHeight"
      :value="pickVal"
      :immediate-change="true"
      @change="handlerChange"
    >
      <picker-view-column>
        <view class="w-picker-item" v-for="(item, index) in range.provinces" :key="index">
          {{ item[defaultName] }}
        </view>
      </picker-view-column>
      <picker-view-column v-if="!hideCity">
        <view class="w-picker-item" v-for="(item, index) in range.citys" :key="index">{{ item[defaultName] }}</view>
      </picker-view-column>
      <picker-view-column v-if="!hideCity && !hideArea">
        <view class="w-picker-item" v-for="(item, index) in range.areas" :key="index">{{ item[defaultName] }}</view>
      </picker-view-column>
      <picker-view-column v-if="!hideCity && !hideArea && !hideTownship">
        <view class="w-picker-item" v-for="(item, index) in range.townships" :key="index">
          {{ item[defaultName] }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      pickVal: [],
      range: {
        provinces: [],
        citys: [],
        areas: [],
        townships: [],
      },
      checkObj: {},
    }
  },
  props: {
    itemHeight: {
      type: String,
      default: '44px',
    },
    value: {
      type: [Array, String],
      default: '',
    },
    defaultType: {
      type: String,
      default: 'code',
    },
    defaultName: {
      type: String,
      default: 'name',
    },
    defaultChildren: {
      type: String,
      default: 'children',
    },
    hideArea: {
      type: Boolean,
      default: false,
    },
    hideCity: {
      type: Boolean,
      default: false,
    },
    hideTownship: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    areaData() {
      return this.$store.state.areaData
    },
  },
  watch: {
    areaData: {
      handler() {
        this.initData()
      },
      deep: true,
    },
    value(val) {
      this.initData()
    },
  },
  created() {
    this.initData()
  },
  methods: {
    getData() {
      //用来处理初始化数据
      let provinces = this.areaData
      let value = this.value
      let a1 = value[0] //默认值省
      let a2 = value[1] //默认值市
      let a3 = value[2] //默认值区、县
      let a4 = value[3] //默认值乡镇
      let province, city
      let provinceIndex = provinces.findIndex((v) => v[this.defaultType] == a1)
      provinceIndex = value ? (provinceIndex != -1 ? provinceIndex : 0) : 0
      province = provinces[provinceIndex]
      let returnObj = {
        provinces,
        dVal: [provinceIndex],
        obj: {
          province,
        },
      }
      if (!this.hideCity) {
        let citys = provinces[provinceIndex][this.defaultChildren]
        let cityIndex = citys.findIndex((v) => v[this.defaultType] == a2)
        cityIndex = value ? (cityIndex != -1 ? cityIndex : 0) : 0
        returnObj.citys = citys
        returnObj.dVal.push(cityIndex)
        returnObj.obj.city = citys[cityIndex]
        if (!this.hideArea) {
          let areas = citys[cityIndex][this.defaultChildren]
          let areaIndex = areas.findIndex((v) => v[this.defaultType] == a3)
          areaIndex = value ? (areaIndex != -1 ? areaIndex : 0) : 0
          returnObj.areas = areas
          returnObj.dVal.push(areaIndex)
          returnObj.obj.area = areas[areaIndex]
          if (!this.hideTownship) {
            let townships = areas[areaIndex][this.defaultChildren] || []
            let townshipIndex = townships.findIndex((v) => v[this.defaultType] == a4)
            townshipIndex = value ? (townshipIndex != -1 ? townshipIndex : 0) : 0
            returnObj.townships = townships
            returnObj.dVal.push(townshipIndex)
            returnObj.obj.township = townships[townshipIndex] || {}
          }
        }
      }
      return returnObj
    },
    initData() {
      if (!this.areaData?.length) return
      let { provinces, citys = [], areas = [], townships = [], dVal, obj } = this.getData()
      let province = obj.province,
        city = {},
        area = {},
        township = {}
      let result = `${province[this.defaultName]}`
      let value = [province[this.defaultType]]
      let range = {
        provinces: Object.freeze(provinces),
      }
      if (!this.hideCity) {
        city = obj.city
        result += city[this.defaultName]
        value.push(city[this.defaultType])
        range.citys = Object.freeze(citys || [])
        if (!this.hideArea) {
          area = obj.area
          result += area[this.defaultName]
          value.push(area[this.defaultType])
          range.areas = Object.freeze(areas || [])
          if (!this.hideTownship && obj.township) {
            township = obj.township
            result += township[this.defaultName]
            value.push(township[this.defaultType])
            range.townships = Object.freeze(townships || [])
          }
        }
      }
      this.range = range
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = dVal
      })
      this.$emit('change', {
        result: result,
        value: value,
        obj: obj,
      })
    },
    handlerChange(e) {
      let arr = [...e.detail.value].map((v) => (v === undefined ? 0 : v))
      let _index = this.findChangeIndex(this.pickVal, arr)
      if (_index == 0) {
        arr = [arr[0], 0, 0, 0]
      } else if (_index == 1) {
        arr = [arr[0], arr[1], 0, 0]
      } else if (_index == 2) {
        arr = [arr[0], arr[1], arr[2], 0]
      }
      let [provinceIndex, cityIndex, areaIndex, townshipIndex] = arr
      let provinces = this.areaData
      let citys = []
      let areas = []
      let townships = []
      if (!this.hideCity && provinces[provinceIndex] && provinces[provinceIndex][this.defaultChildren]) {
        citys = provinces[provinceIndex] && provinces[provinceIndex][this.defaultChildren]
        if (!this.hideArea && citys[cityIndex] && citys[cityIndex][this.defaultChildren]) {
          areas = citys[cityIndex][this.defaultChildren]
          if (!this.hideTownship && areas[areaIndex] && areas[areaIndex][this.defaultChildren]) {
            townships = areas[areaIndex][this.defaultChildren]
          }
        }
      }
      let province = provinces[provinceIndex],
        city = {},
        area = {},
        township = {}
      let obj = {
        province,
      }
      if (!this.hideCity && citys.length) {
        city = citys[cityIndex]
        obj.city = city
        if (!this.hideArea && areas.length) {
          area = areas[areaIndex]
          obj.area = area
          if (!this.hideTownship && townships.length) {
            township = townships[townshipIndex]
            obj.township = township
          }
        }
      }
      if (
        this.checkObj?.province[this.defaultName] != province[this.defaultName] ||
        this.checkObj?.city[this.defaultName] != city[this.defaultName] ||
        this.checkObj.area[this.defaultName] != area[this.defaultName]
      ) {
        //当省更新的时候需要刷新市、区县的数据;
        if (this.checkObj.province[this.defaultName] != province[this.defaultName]) {
          this.range.citys = Object.freeze(citys)
        }
        if (
          !this.hideArea &&
          (this.checkObj.province[this.defaultName] != province[this.defaultName] || this.checkObj.city[this.defaultName] != city[this.defaultName])
        ) {
          this.range.areas = Object.freeze(areas)
        }
        if (!this.hideArea && !this.hideTownship) {
          this.range.townships = Object.freeze(townships)
        }
      }
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = arr
      })
      let result = `${province[this.defaultName]}`
      let value = [province[this.defaultType]]
      if (!this.hideCity) {
        value.push(city[this.defaultType])
        result += city[this.defaultName]
        if (!this.hideArea) {
          value.push(area[this.defaultType])
          result += area[this.defaultName]
          if (!this.hideTownship && obj.township) {
            value.push(township[this.defaultType])
            result += township[this.defaultName]
          }
        }
      }
      this.$emit('change', {
        result: result,
        value: value,
        obj: obj,
      })
    },
    findChangeIndex(arr1, arr2) {
      if (arr1[0] !== arr2[0]) {
        return 0
      } else if (arr1[1] !== arr2[1]) {
        return 1
      } else if (arr1[2] !== arr2[2]) {
        return 2
      } else if (arr1[3] !== arr2[3]) {
        return 3
      }
      return -1
    },
  },
}
</script>

<style lang="scss">
@import './w-picker.scss';
</style>
