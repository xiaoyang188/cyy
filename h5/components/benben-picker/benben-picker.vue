<template>
  <view class="w-picker" :key="createKey" :data-key="createKey">
    <view class="mask" :class="{ mask_show: maskShow, visible: isShow }" @tap="cancel" @touchmove.stop.prevent catchtouchmove="true"></view>
    <view class="w-picker-cnt" :class="{ visible: isShow }">
      <view>
        <slot name="picker-header"></slot>
      </view>
      <date-picker
        v-if="mode == 'date'"
        class="w-picker-wrapper"
        :from-data="fromData"
        :startYear="startYear"
        :endYear="endYear"
        :value="value"
        :fields="fields"
        :item-height="itemHeight"
        :current="current"
        :disabled-after="disabledAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></date-picker>
      <range-picker
        v-if="mode == 'range'"
        class="w-picker-wrapper"
        :startYear="startYear"
        :endYear="endYear"
        :value="defaultValue"
        :item-height="itemHeight"
        :current="current"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></range-picker>
      <range-date-time-picker
        v-if="mode == 'range-date-time'"
        class="w-picker-wrapper"
        :startYear="startYear"
        :endYear="endYear"
        :value="defaultValue"
        :item-height="itemHeight"
        :current="current"
        :second="second"
        :disabled-after="disabledAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></range-date-time-picker>
      <range-time-picker
        v-if="mode == 'range-time'"
        class="w-picker-wrapper"
        :value="defaultValue"
        :item-height="itemHeight"
        :current="current"
        :start-time="startTime"
        :end-time="endTime"
        :is-before="isBefore"
        :is-after="isAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></range-time-picker>
      <half-picker
        v-if="mode == 'half'"
        class="w-picker-wrapper"
        :startYear="startYear"
        :endYear="endYear"
        :value="value"
        :item-height="itemHeight"
        :current="current"
        :disabled-after="disabledAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></half-picker>
      <shortterm-picker
        v-if="mode == 'shortTerm'"
        class="w-picker-wrapper"
        :startYear="startYear"
        :endYear="endYear"
        :value="value"
        :item-height="itemHeight"
        :current="current"
        :expand="expand"
        :expand-before="expandBefore"
        :disabled-after="disabledAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></shortterm-picker>
      <time-picker
        v-if="mode == 'time'"
        class="w-picker-wrapper"
        :value="value"
        :item-height="itemHeight"
        :current="current"
        :disabled-after="disabledAfter"
        :second="second"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></time-picker>
      <selector-picker
        v-if="mode == 'selector'"
        class="w-picker-wrapper"
        :value="value"
        :item-height="itemHeight"
        :options="options"
        :default-type="defaultType"
        :default-props="defaultProps"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></selector-picker>
      <region-picker
        v-if="mode == 'region'"
        class="w-picker-wrapper"
        :value="defaultValue"
        :hide-area="hideArea"
        :hide-township="hideTownship"
        :hide-city="hideCity"
        :item-height="itemHeight"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></region-picker>
      <linkage-picker
        v-if="mode == 'linkage'"
        class="w-picker-wrapper"
        :value="defaultValue"
        :options="options"
        :level="level"
        :default-type="defaultType"
        :default-props="defaultProps"
        :item-height="itemHeight"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></linkage-picker>
    </view>
  </view>
</template>
<script>
import datePicker from './date-picker.vue'
import rangePicker from './range-picker.vue'
import rangeDateTimePicker from './range-date-time-picker.vue'
import halfPicker from './half-picker.vue'
import shorttermPicker from './shortterm-picker.vue'
import timePicker from './time-picker.vue'
import selectorPicker from './selector-picker.vue'
import regionPicker from './region-picker.vue'
import linkagePicker from './linkage-picker.vue'
import rangeTimePicker from './range-time-picker.vue'
export default {
  name: 'benben-picker',
  components: {
    datePicker,
    rangePicker,
    rangeDateTimePicker,
    halfPicker,
    timePicker,
    selectorPicker,
    shorttermPicker,
    regionPicker,
    linkagePicker,
    rangeTimePicker,
  },
  provide() {
    return {
      second: this.second,
      disabledAfter: this.disabledAfter,
      startYear: this.startYear,
      endYear: this.endYear,
      value: this.value,
      current: this.current,
      itemHeight: this.itemHeight,
    }
  },
  props: {
    mode: {
      type: String,
      default: 'date',
    },
    pickerHeight: {
      type: [String, Number],
      default: '88',
    },
    value: {
      //默认值
      type: [String, Array, Number],
      default: '',
    },
    current: {
      //是否默认显示当前时间，如果是，传的默认值将失效
      type: Boolean,
      default: false,
    },
    fields: {
      //日期颗粒度:year、month、day、hour、minute、second
      type: String,
      default: 'day',
    },
    disabledAfter: {
      //是否禁用当前之后的日期
      type: Boolean,
      default: false,
    },
    second: {
      //time-picker是否显示秒
      type: Boolean,
      default: true,
    },
    options: {
      //selector,region数据源
      type: [Array, Object],
      default() {
        return []
      },
    },
    defaultProps: {
      //selector,linkagle字段转换配置
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          children: 'children',
        }
      },
    },
    defaultType: {
      type: String,
      default: 'label',
    },
    hideCity: {
      //mode=region时，是否隐藏区市列
      type: Boolean,
      default: false,
    },
    hideArea: {
      //mode=region时，是否隐藏区县列
      type: Boolean,
      default: false,
    },
    hideTownship: {
      //mode=region时，是否隐藏区街道
      type: Boolean,
      default: true,
    },
    level: {
      //多级联动层级，表示几级联动,区间2-4;
      type: [Number, String],
      default: 2,
    },
    timeout: {
      //是否开启点击延迟,当快速滚动 还没有滚动完毕点击关闭时得到的值是不准确的
      type: Boolean,
      default: false,
    },
    expand: {
      //mode=shortterm 默认往后拓展天数
      type: [Number, String],
      default: 30,
    },
    expandBefore: {
      //mode=shortterm 默认往前拓展天数
      type: [Number, String],
      default: 0,
    },
    startYear: {
      type: [String, Number],
      default: 1970,
    },
    endYear: {
      type: [String, Number],
      default: new Date().getFullYear(),
    },
    startTime: {
      type: [String],
      default: '00:00',
    },
    endTime: {
      type: [String],
      default: '23:59',
    },
    //是否展示选择器
    visible: {
      type: Boolean,
      default: false,
    },
    isBefore: {
      type: Boolean,
      default: true,
    },
    isAfter: {
      type: Boolean,
      default: true,
    },
    maskShow: {
      type: Boolean,
      default: true,
    },
    province: {
      //省
      type: [String, Number],
      default: '',
    },
    city: {
      //市
      type: [String, Number],
      default: '',
    },
    area: {
      //区
      type: [String, Number],
      default: '',
    },
    township: {
      //街道
      type: [String, Number],
      default: '',
    },
    startValue: {
      //开始时间
      type: [String, Number],
      default: '',
    },
    endValue: {
      //结束时间
      type: [String, Number],
      default: '',
    },
    fromData: {
      // 自定义日期选择器返回格式
      type: String,
      default: '',
    },
  },
  computed: {
    itemHeight() {
      return `height: ${uni.upx2px(this.pickerHeight)}px;`
    },
    defaultValue() {
      let defaultValue = []
      switch (this.mode) {
        case 'range':
          if (this.startValue) {
            defaultValue.push(this.startValue)
          }
          if (this.endValue) {
            defaultValue.push(this.endValue)
          }
          break
        case 'range-time':
          if (this.startValue) {
            defaultValue.push(this.startValue)
          }
          if (this.endValue) {
            defaultValue.push(this.endValue)
          }
          break
        case 'region':
          if (this.township && (this.township + '').length == 9) {
            let township = this.township + ''
            let province = township.substring(0, 2) + '0000'
            let city = township.substring(0, 4) + '00'
            let area = township.substring(0, 6)
            defaultValue = [province, city, area, township]
          } else if (this.area && ((this.area + '').length == 6 || (this.area + '').length == 9)) {
            let area = this.area + ''
            let province = area.substring(0, 2) + '0000'
            let city = area.substring(0, 4) + '00'
            defaultValue = [province, city, area]
          } else if (this.city && (this.city + '').length == 6) {
            let city = this.city + ''
            let province = city.substring(0, 2) + '0000'
            defaultValue = [province, city, 0, 0]
          } else if (this.province && (this.province + '').length == 6) {
            let province = this.province + ''
            defaultValue = [province, 0, 0, 0]
          }
          break
        case 'linkage':
          if (this.value) {
            //判断this.value是否是数组
            if (this.value.constructor === Array) {
              defaultValue = this.value
            } else {
              defaultValue = this.value.split(',')
            }
          }
          break
        default:
          break
      }
      return defaultValue
    },
  },
  watch: {
    visible(newValue, oldValue) {
      this.isShow = newValue
    },
  },
  created() {
    this.createKey = Math.random() * 1000
    this.isShow = this.visible
  },
  data() {
    return {
      LANGUAGE: '',
      isShow: false,
      result: {},
      confirmFlag: true,
    }
  },
  methods: {
    headerHandle(e) {
      let { type } = e.target.dataset
      if (type == 'cancel') {
        this.cancel()
      }
      if (type == 'confirm') {
        this.pickerConfirm()
      }
    },
    touchStart() {
      if (this.timeout) {
        this.confirmFlag = false
      }
    },
    touchEnd() {
      if (this.timeout) {
        setTimeout(() => {
          this.confirmFlag = true
        }, 500)
      }
    },
    handlerChange(res) {
      this.result = { ...res }
    },
    show() {
      this.isShow = true
      this.$emit('update:visible', true)
    },
    hide() {
      this.isShow = false
      this.$emit('update:visible', false)
    },
    cancel(res) {
      this.isShow = false
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    pickerConfirm() {
      if (!this.confirmFlag) return
      this.isShow = false
      setTimeout(() => {
        let { result, value, obj } = this.result
        let isFlag = true
        switch (this.mode) {
          case 'date':
          case 'half':
          case 'shortTerm':
          case 'time':
            this.$emit('update:value', value)
            this.$emit('update:label', result)
            break
          case 'range':
            this.$emit('update:start-value', `${obj.fyear}-${obj.fmonth}-${obj.fday}`)
            this.$emit('update:end-value', `${obj.tyear}-${obj.tmonth}-${obj.tday}`)
            this.$emit('update:label', result)
            break
          case 'range-time':
            this.$emit('update:start-value', `${obj.startHour}:${obj.startMinute}`)
            this.$emit('update:end-value', `${obj.endHour}:${obj.endMinute}`)
            this.$emit('update:label', result)
            break
          case 'range-date-time':
            const start = this.result.startDateObj
            const end = this.result.endDateObj

            // 检查必要字段是否存在及是否已选择
            const isStartComplete = start?.date && start?.time
            const isEndComplete = end?.date && end?.time

            if (!isStartComplete || !isEndComplete) {
              isFlag = false
              this.$message.info(!isStartComplete ? '请选择完整的开始时间' : '请选择完整的结束时间')
              break
            }
            const startTime = `${start.date} ${start.time}`
            const endTime = `${end.date} ${end.time}`
            this.$emit('update:value', [startTime, endTime])
            break
          case 'region':
            this.$emit('update:province', value[0] || '')
            this.$emit('update:city', value[1] || '')
            this.$emit('update:area', value[2] || '')
            this.$emit('update:township', value[3] || '')
            this.$emit('update:label', result)
            break
          case 'selector':
            this.$emit('update:value', obj[this.defaultType])
            this.$emit('update:label', result)
            break
          case 'linkage':
            if (!(this.defaultProps.label && this.defaultProps.value)) return false
            let confirmValue = {
              [this.defaultProps.label]: [],
              [this.defaultProps.value]: [],
            }
            Object.keys(obj).map((key) => {
              if (obj[key] && this.defaultProps.value && obj[key][this.defaultProps.value]) {
                confirmValue[this.defaultProps.value].push(obj[key][this.defaultProps.value])
              }
              if (obj[key] && this.defaultProps.label && obj[key][this.defaultProps.value]) {
                confirmValue[this.defaultProps.label].push(obj[key][this.defaultProps.label])
              }
            })
            Object.keys(confirmValue).map((key) => {
              if (this.defaultType == key) {
                this.$emit('update:value', confirmValue[key].join(','))
              } else {
                this.$emit('update:label', confirmValue[key].join(','))
              }
            })
            break
          default:
            break
        }
        if (isFlag) {
          this.$emit('change', this.result)
          this.$emit('update:visible', false)
        } else {
          this.isShow = true
          this.$emit('update:visible', true)
          setTimeout(() => {
            this.confirmFlag = true
          }, 1000)
        }
      }, 500)
    },
  },
}
</script>

<style lang="scss">
@import './w-picker.scss';
</style>
