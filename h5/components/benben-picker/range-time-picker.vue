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
      <picker-view-column class="w-picker-flex2">
        <view class="w-picker-item" v-for="(hour, index) in startHours" :key="hour">
          {{ hour }}
        </view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view class="w-picker-item" v-for="(minute, index) in startMinutes" :key="minute">
          {{ minute }}
        </view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex1">
        <view class="w-picker-item">-</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view class="w-picker-item" v-for="(hour, index) in endHours" :key="hour">
          {{ hour }}
        </view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view class="w-picker-item" v-for="(minute, index) in endMinutes" :key="minute">
          {{ minute }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  props: {
    itemHeight: {
      type: String,
      default: '44px',
    },
    value: {
      type: [Array],
      default() {
        return []
      },
    },
    current: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: String,
      default: '00:00',
    },
    endTime: {
      type: String,
      default: '23:59',
    },
    isBefore: {
      type: Boolean,
      default: true,
    },
    isAfter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pickVal: [0, 0, 0, 0, 0],
      startHours: [],
      startMinutes: [],
      endHours: [],
      endMinutes: [],
      currentTime: '',
      changeObj: { startHour: '', startMinute: '', endHour: '', endMinute: '' },
      historicalTime: {
        startHour: {
          min: '',
          max: '',
        },
        startMinute: {
          min: '',
          max: '',
        },
        endHour: {
          min: '',
          max: '',
        },
        endMinute: {
          min: '',
          max: '',
        },
      },
    }
  },
  computed: {
    minTime() {
      if (!this.isBefore) {
        return this.compareTimes(this.currentTime, this.startTime) == -1 ? this.startTime : this.currentTime
      }
      return this.startTime
    },
    maxTime() {
      if (!this.isAfter) {
        return this.compareTimes(this.currentTime, this.endTime) == -1 ? this.currentTime : this.endTime
      }
      return this.endTime
    },
  },
  watch: {
    value(val) {
      this.initData()
    },
  },
  created() {
    this.initData()
  },
  methods: {
    formatNum(n) {
      return n < 10 ? '0' + n : n
    },
    compareTimes(time1, time2) {
      // 将时间字符串转换为分钟数
      function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
      }
      const minutes1 = timeToMinutes(time1)
      const minutes2 = timeToMinutes(time2)
      if (minutes1 < minutes2) {
        return -1
      } else if (minutes1 > minutes2) {
        return 1
      } else {
        return 0
      }
    },
    checkValue(value) {
      const strReg = /^\d{2}:\d{2}$/
      if (Array.isArray(value)) {
        if (!strReg.test(value[0]) || !strReg.test(value[1])) {
          console.log('请传入与mode匹配的value值，例["09:00", "09:00"]')
          return false
        }
      } else {
        console.log('value必须是数组')
        return false
      }
      return true
    },

    //限制时间是否合法
    timeLimitLegal(time) {
      let currentTime = time
      if (this.compareTimes(time, this.maxTime) == 1) {
        currentTime = this.maxTime
      }
      if (this.compareTimes(time, this.minTime) == -1) {
        currentTime = this.minTime
      }
      return currentTime
    },
    initData() {
      const now = new Date()
      this.currentTime = `${this.formatNum(now.getHours())}:${this.formatNum(now.getMinutes())}`
      let startTime = ''
      let endTime = ''
      if (!this.checkValue(this.value)) {
        let currentTime = this.minTime
        if (this.current) currentTime = this.timeLimitLegal(this.currentTime)
        startTime = currentTime
        endTime = currentTime
      } else {
        startTime = this.timeLimitLegal(this.value[0])
        endTime = this.timeLimitLegal(this.value[1])
      }
      const [startHour, startMinute] = startTime.split(':')
      const [endHour, endMinute] = endTime.split(':')
      this.getTimeArr(startHour, startMinute, endHour, endMinute)
    },
    getIndex(str, arr) {
      let index = arr.findIndex((item) => item == str)
      return index === -1 ? 0 : index
    },
    getTimeArr(startHour, startMinute, endHour, endMinute) {
      const [minHour, minMinute] = this.minTime.split(':').map(Number)
      const [maxHour, maxMinute] = this.maxTime.split(':').map(Number)
      if (this.historicalTime.startHour.min !== minHour || this.historicalTime.startHour.max !== maxHour) {
        this.historicalTime.startHour.min = minHour
        this.historicalTime.startHour.max = maxHour
        this.startHours = this.generateTimeArray(minHour, maxHour)
      }
      let startMinuteS = 0
      let startMinuteE = 59
      if (+startHour == minHour) startMinuteS = minMinute
      if (+startHour == maxHour) startMinuteE = maxMinute
      if (this.historicalTime.startMinute.min !== startMinuteS || this.historicalTime.startMinute.max !== startMinuteE) {
        this.historicalTime.startMinute.min = startMinuteS
        this.historicalTime.startMinute.max = startMinuteE
        this.startMinutes = this.generateTimeArray(startMinuteS, startMinuteE)
      }
      if (this.historicalTime.endHour.min !== startHour || this.historicalTime.endHour.max !== maxHour) {
        this.historicalTime.endHour.min = startHour
        this.historicalTime.endHour.max = maxHour
        this.endHours = this.generateTimeArray(+startHour, maxHour)
      }
      let endMinuteS = 0
      let endMinuteE = 59
      if (+endHour == startHour) endMinuteS = +startMinute
      if (+endHour == maxHour) endMinuteE = maxMinute
      if (this.historicalTime.endMinute.min !== endMinuteS || this.historicalTime.endMinute.max !== endMinuteE) {
        this.historicalTime.endMinute.min = endMinuteS
        this.historicalTime.endMinute.max = endMinuteE
        this.endMinutes = this.generateTimeArray(endMinuteS, endMinuteE)
      }
      let pickVal = [
        this.getIndex(startHour, this.startHours),
        this.getIndex(startMinute, this.startMinutes),
        0, // Separator column index
        this.getIndex(endHour, this.endHours),
        this.getIndex(endMinute, this.endMinutes),
      ]
      if (this.pickVal.toString() != pickVal.toString()) {
        this.$nextTick(() => {
          this.pickVal = pickVal
        })
      }
      let changeObj = this.getTime(pickVal)
      if (JSON.stringify(this.changeObj) != JSON.stringify(changeObj)) {
        this.changeObj = changeObj
        this.$emit('change', {
          result: `${changeObj.startHour}:${changeObj.startMinute}-${changeObj.endHour}:${changeObj.endMinute}`,
          value: `${changeObj.startHour}:${changeObj.startMinute}-${changeObj.endHour}:${changeObj.endMinute}`,
          obj: changeObj,
        })
      }
    },
    getTime(val) {
      const [startHourIndex, startMinuteIndex, _, endHourIndex, endMinuteIndex] = val
      const startHour = this.startHours[startHourIndex]
      const endHour = this.endHours[endHourIndex]
      const startMinute = this.startMinutes[startMinuteIndex]
      const endMinute = this.endMinutes[endMinuteIndex]
      return {
        startHour,
        startMinute,
        endHour,
        endMinute,
      }
    },
    generateTimeArray(min, max) {
      const array = []
      for (let i = +min; i <= +max; i++) {
        array.push(this.formatNum(i))
      }
      return array
    },
    handlerChange(e) {
      const val = e.detail.value
      let { startHour, endHour, startMinute, endMinute } = this.getTime(e.detail.value)
      this.getTimeArr(startHour, startMinute, endHour, endMinute)
    },
  },
}
</script>

<style lang="scss">
@import './w-picker.scss';
</style>
