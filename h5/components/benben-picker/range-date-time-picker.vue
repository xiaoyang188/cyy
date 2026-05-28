<template>
  <view>
    <view class="solid-bottom-eee">
      <view class="flex align-center text-center text-sm">
        <view @click="changeTab(0)" class="flex-sub padding-top-xs">
          <text class="text-bold">开始时间</text>
          <view class="padding-top-xs">
            <text>{{ startTextObj.date || '-' }}</text>
            <text class="padding-left-xs">{{ startTextObj.time || '-' }}</text>
          </view>
          <text class="line" :class="{ 'bg-red': tabIndex == 0 }"></text>
        </view>
        <view @click="changeTab(1)" class="flex-sub padding-tb-xs">
          <text class="text-bold">结束时间</text>
          <view class="padding-top-xs">
            <text>{{ endTextObj.date || '-' }}</text>
            <text class="padding-left-xs">{{ endTextObj.time || '-' }}</text>
          </view>
          <text class="line" :class="{ 'bg-red': tabIndex == 1 }"></text>
        </view>
      </view>
    </view>
    <view class="w-picker-view">
      <date-picker
        v-show="currentMode == 'date'"
        class="w-picker-wrapper"
        :startYear="startYear"
        :endYear="endYear"
        :value="valueDate"
        :item-height="itemHeight"
        :disabled-after="disabledAfter"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></date-picker>
      <time-picker
        v-show="currentMode == 'time'"
        class="w-picker-wrapper"
        :value="valueTime"
        :item-height="itemHeight"
        :current="current"
        :second="second"
        @change="handlerChange"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></time-picker>
    </view>
    <view class="flex justify-center align-center padding-tb-sm solid-bottom">
      <view class="margin-right">
        <button @click="changeMode" type="default" size="mini" class="btn1">{{ btnText }}</button>
      </view>
      <view>
        <button type="default" size="mini" class="btn2" @click="confirmDateOrTime">确定{{ btn2Text }}</button>
      </view>
    </view>
  </view>
</template>

<script>
import { inject } from 'vue'
import datePicker from './date-picker.vue'
import timePicker from './time-picker.vue'
export default {
  inject: ['value', 'second', 'current', 'disabledAfter', 'startYear', 'endYear', 'itemHeight'],
  props: {
    // value: {
    //   //默认值
    //   type: [String, Array, Number],
    //   default: '',
    // },
    // fields: {
    //   //日期颗粒度:year、month、day、hour、minute、second
    //   type: String,
    //   default: 'day',
    // },
    // itemHeight: {
    //   type: String,
    //   default: '44px',
    // },
    // current: {
    //   //是否默认选中当前日期
    //   type: Boolean,
    //   default: false,
    // },
    // disabledAfter: {
    //   //是否禁用当前之后的日期
    //   type: Boolean,
    //   default: false,
    // },
    // second: {
    //   //是否显示秒
    //   type: Boolean,
    //   default: false,
    // },
    // fromData: {
    //   // 自定义日期选择器返回格式
    //   type: String,
    //   default: '',
    // },
    // startYear: {
    //   type: [String, Number],
    //   default: 1970,
    // },
    // endYear: {
    //   type: [String, Number],
    //   default: new Date().getFullYear(),
    // },
  },
  components: {
    datePicker,
    timePicker,
  },
  computed: {
    btnText() {
      return this.currentMode == 'date' ? '选择时间点' : '选择日期'
    },
    btn2Text() {
      return this.currentMode == 'date' ? '日期' : '时间点'
    },
  },
  data() {
    return {
      confirmFlag: true,
      tabIndex: 0,
      currentMode: 'date',

      startTextObj: { date: '', time: '' },
      endTextObj: { date: '', time: '' },
      startDateObj: {
        date: '',
        time: '',
      },
      endDateObj: {
        date: '',
        time: '',
      },
      valueDate: '',
      valueTime: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        // this.confirmFlag = false
        this.initData(val)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // this.initData()
  },
  methods: {
    /** 拆分回显数据 ['2025-11-01 00:00:00', '2025-11-30 23:59:59'] */
    initData(val) {
      if (val && val.length) {
        let startArr = val[0].split(' ')
        let endArr = val[1].split(' ')

        this.startDateObj.date = this.startTextObj.date = startArr[0]
        this.endDateObj.date = this.endTextObj.date = endArr[0]
        this.startDateObj.time = this.startTextObj.time = startArr[1]
        this.endDateObj.time = this.endTextObj.time = endArr[1]

        this.setValueDateORTime()
      }
    },
    /** 切换开始时间 或 结束时间 */
    changeTab(index) {
      this.tabIndex = index
      this.currentMode = 'date'
      this.setValueDateORTime()
    },
    /** 切换选择日期 或 时间 */
    changeMode() {
      if (this.currentMode == 'date') {
        this.currentMode = 'time'
      } else {
        this.currentMode = 'date'
      }

      this.setValueDateORTime()
    },
    touchStart() {
      console.log('1range-date-time-picker- touchStart')
      if (this.timeout) {
        this.confirmFlag = false
      }
    },
    touchEnd() {
      console.log('1range-date-time-picker- touchEnd')

      if (this.timeout) {
        setTimeout(() => {
          this.confirmFlag = true
        }, 500)
      }
    },
    handlerChange(res) {
      if (!this.confirmFlag) return
      if (this.tabIndex == 0) {
        if (this.currentMode == 'date') {
          if (!res.obj.day) return
          this.startDateObj.date = res.result
        } else {
          if (!res.obj.hour) return
          this.startDateObj.time = res.result
        }
      } else {
        if (this.currentMode == 'date') {
          if (!res.obj.day) return
          this.endDateObj.date = res.result
        } else {
          if (!res.obj.hour) return
          this.endDateObj.time = res.result
        }
      }
    },
    confirmDateOrTime() {
      if (!this.confirmFlag) return
      if (this.tabIndex == 0) {
        if (this.currentMode == 'date') {
          this.valueDate = this.startTextObj.date = this.startDateObj.date
        } else {
          this.valueTime = this.startTextObj.time = this.startDateObj.time
        }
      } else {
        if (this.currentMode == 'date') {
          this.valueDate = this.endTextObj.date = this.endDateObj.date
        } else {
          this.valueTime = this.endTextObj.time = this.endDateObj.time
        }
      }

      this.$emit('change', {
        startDateObj: this.startDateObj,
        endDateObj: this.endDateObj,
      })
    },
    setValueDateORTime() {
      if (this.tabIndex == 0) {
        if (this.currentMode == 'date') {
          this.valueDate = this.startDateObj.date
        } else {
          this.valueTime = this.startDateObj.time
        }
      } else {
        if (this.currentMode == 'date') {
          this.valueDate = this.endDateObj.date
        } else {
          this.valueTime = this.endDateObj.time
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import './w-picker.scss';
.solid-bottom {
  border-bottom: 2rpx solid #f7f7f7;
}
.solid-bottom-eee {
  border-bottom: 2rpx solid #eee;
}
.line {
  display: inline-block;
  width: 100rpx;
  height: 2px;
  background-color: transparent;
  margin: 0 auto;
}
.bg-red {
  background-color:var(--benbenbgColor3, red) !important;
}
.btn1 {
  width: 220rpx;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.btn2 {
  width: 400rpx;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #ccc;
}
</style>
