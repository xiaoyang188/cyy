<template>
  <view class="benben-countdown">
    <slot></slot>
  </view>
</template>
<script>
import Dayjs from '@/libs/day.js'
export default {
  name: 'benben-countdown',
  props: {
    showDay: {
      type: Boolean,
      default: false,
    },
    showHour: {
      type: Boolean,
      default: true,
    },
    showMinute: {
      type: Boolean,
      default: true,
    },
    showSecond: {
      type: Boolean,
      default: true,
    },
    timeType: {
      type: Boolean,
      default: false,
    }, //false countTime为剩余秒数  true countTime 为截至时间
    countTime: {
      type: [String, Number],
      default: 0,
    }, //剩余时间
    //1 倒计时 2 正计时
    type: {
      type: Number,
      default: 1,
    },
    isStart: {
      type: Boolean,
      default: false,
    },
    // 是否自动开始倒计时
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  options: {
    // virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {},
  computed: {},
  data() {
    return {
      timer: null,
      showTime: {
        d: '00',
        h: '00',
        i: '00',
        s: '00',
      },
      seconds: 0,
      passedSeconds: 0,
    }
  },
  watch: {
    countTime(val) {
      if (this.type != 2 && this.autoplay) {
        this.startData()
      }
    },
    isStart(val) {
      if (val) {
        this.startData()
      } else {
        this.pauseCountTime()
      }
    },
    seconds(val) {
      if (val) {
        this.$emit('change', val)
      }
    },
  },
  methods: {
    pauseCountTime() {
      this.passedSeconds = this.seconds
      clearInterval(this.timer)
      this.timer = null
    },
    startData() {
      if (this.passedSeconds) {
        this.seconds = this.passedSeconds
      } else {
        this.seconds = this.getSeconds()
      }
      if (this.type == 1 && this.seconds <= 0) return

      this.countDown()
      this.timer && clearInterval(this.timer)
      if (this.type == 1) {
        this.timer = setInterval(() => {
          this.seconds--
          this.countDown()
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            this.$emit('time-end')
          }
        }, 1000)
      } else if (this.type == 2) {
        this.timer = setInterval(() => {
          this.seconds++
          this.countDown()
        }, 1000)
      }
    },
    getSeconds() {
      let countTime = this.countTime
      if (!this.timeType) {
        return countTime
      }
      if (isNaN(+this.countTime)) {
        if (this.type == 1) {
          countTime = Dayjs(this.countTime).unix() - Dayjs().unix()
        } else if (this.type == 2) {
          countTime = Dayjs().unix() - Dayjs(this.countTime).unix()
        }
      } else {
        countTime = this.countTime - Dayjs().unix()
      }
      return countTime
    },
    countDown() {
      let seconds = this.seconds
      let [day, hour, minute, second] = [0, 0, 0, 0]
      if (seconds > 0) {
        if (this.showDay) {
          day = Math.floor(seconds / (60 * 60 * 24))
          seconds = seconds % (60 * 60 * 24)
        }
        if (this.showHour) {
          hour = Math.floor(seconds / (60 * 60))
          seconds = seconds % (60 * 60)
        }
        if (this.showMinute) {
          minute = Math.floor(seconds / 60)
          seconds = seconds % 60
        }
        if (this.showSecond) {
          second = Math.floor(seconds)
        }
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.showTime.d = day
      this.showTime.h = hour
      this.showTime.i = minute
      this.showTime.s = second
    },
  },
  created() {
    if (this.autoplay) {
      this.startData()
    } else {
      this.seconds = this.getSeconds()
      if (this.seconds <= 0) return
      this.countDown()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
<style lang="scss" scoped>
.benben-countdown {
  display: inline;
}
</style>
