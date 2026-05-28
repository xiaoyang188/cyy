<template>
  <view>
    <view @tap.stop="handleOpen" :class="[classStr, { 'dashed-style-box': isDashedStyle }, 'flex']">
      <view v-for="(item, index) in boxNum2" :key="index">
        <slot v-bind:content="getContent(index)" v-bind:active="getActive(index)" v-bind:index="index"></slot>
      </view>
    </view>
    <!-- 键盘 -->
    <view @tap="handleClose" v-if="dkFlag" class="digital-mask"></view>
    <view :class="['keyboard', dkFlag ? '' : 'keyboard-hide', 'safeArea-bottom']">
      <!-- 密码和数字键盘 -->
      <template v-if="mode == 'password' || mode == 'number'">
        <view v-for="(item, index) in '123456789'" :key="index" class="keyboard-item" @tap="handleKey(item)">{{ item }}</view>
        <view class="keyboard-item delte" @tap="handleClean">{{ $t('清除') }}</view>
        <view class="keyboard-item" @tap="handleKey('0')"><text>0</text></view>
        <view class="keyboard-item delte" @tap="handleDel">
          <span class="fu-iconfont2"></span>
        </view>
      </template>
      <!-- 车牌号键盘 -->
      <template v-if="mode == 'plateNumber'">
        <xm-keyboard-box
          ref="keyboardBox"
          :show-change-btn="type == 'plate'"
          :show-cancel-btn="!showContent"
          :activeIndex="activeIndex"
          @add="handleKey"
          @del="handleDel"
          @clear="handleClean"
          @cancel="handleClose"
          @confirm="handleConfirm"
        ></xm-keyboard-box>
      </template>
    </view>
  </view>
</template>
<script>
import xmKeyboardBox from './xm-keyboard-box/xm-keyboard-box.vue'
export default {
  name: 'benben-digital-password',
  props: {
    initOpen: {
      //支付密码键盘的显示与隐藏
      type: Boolean,
      default: false, //false 兼容旧版
    },
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
    value: {
      type: [String, Number, Array],
      default: '',
    },
    mode: {
      type: String,
      default: 'password',
    },
    boxNum: {
      type: [Number, String],
      defalut: 6,
    },
  },
  components: {
    xmKeyboardBox,
  },
  //计算属性
  computed: {
    boxNum2() {
      if (this.mode == 'password' || this.mode == 'number') {
        return this.boxNum
      } else {
        return 8
      }
    },
    classStr() {
      return this.classText || this.className
    },
    inputText: {
      get() {
        return this.value ? this.value + '' : ''
      },
      set(val) {
        this.$emit('input', val)
        if (val.length == this.boxNum2) {
          this.setOpen(false)
          this.$emit('confirm', val)
        }
      },
    },
  },
  data() {
    return {
      dkFlag: false, //支付密码键盘的显示与隐藏 兼容旧版
      showContent: false,
      type: 'plate',
      activeIndex: 0,
      isDashedStyle: false,
    }
  },
  watch: {
    initOpen: {
      handler(value) {
        if (value !== this.dkFlag) this.dkFlag = value
      },
      immediate: true,
    },
  },
  //初始化
  methods: {
    handleOpen() {
      this.setOpen(true)
    },
    handleClose() {
      this.setOpen(false)
    },
    getContent(e) {
      if (e < this.inputText.length) {
        switch (this.mode) {
          case 'number':
            return this.inputText[e] + ''
            break
          case 'password':
            return '●'
            break
          case 'plateNumber':
            return this.inputText[e]
            break
          default:
            break
        }
      }
      return ''
    },
    getActive(e) {
      if (e == this.inputText.length) {
        this.activeIndex = e
        return true
      }
      return false
    },
    getKeyboard() {
      this.setOpen(true)
    },
    setOpen(flag) {
      this.dkFlag = flag
      this.$emit('update:init-open', flag)
    },
    handleKey(key) {
      if (this.inputText.length < this.boxNum2) {
        this.inputText += key
      } else {
        this.setOpen(false)
        this.$emit('confirm', this.inputText)
      }
    },
    handleDel() {
      if (this.inputText.length > 0) {
        this.inputText = this.inputText.substring(0, this.inputText.length - 1)
      }
    },
    handleClean() {
      this.inputText = ''
    },
    // —————————————————— 车牌号键盘 ——————————————————
    handleConfirm() {
      this.setOpen(false)
      this.$emit('confirm', this.inputText)
      // 改为通过数据控制样式
      if (this.inputText.length == 7) {
        this.isDashedStyle = true
      }

      // 视情况触发更新
      this.$forceUpdate()
    },
  },
}
</script>

<style lang="scss" scoped>
.code-box-item {
  position: relative;
}
.digital-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999998;
}

.digital-keyboard {
  /* box-shadow: 0 -1rpx 0 1rpx #eee; */
  width: 100%;
  transition: all 0.2s linear;
  transform: translateY(100%);
}

.digital-keyboard-show {
  transform: translateY(0);
}

.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ebebeb;
  display: flex;
  justify-content: center;
  z-index: 9999999;
  flex-wrap: wrap;
  transition: all 0.2s ease-in 0.2s;
}
.keyboard-hide {
  display: none;
  bottom: -400rpx;
}
.active {
  border: 1px solid rgb(17, 179, 157);
}
.keyboard-item {
  box-sizing: border-box;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 40rpx;
  color: #333;
  height: 99rpx;
  border-top: none;
  border-left: none;
  position: relative;
  &::before {
    @include around-line(#ebebeb);
    border: none;
    border-top: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
  }
}
.delte {
  background: none;
  box-shadow: none;
}
.dashed-style-box ::v-deep .flex.align-center.justify-center:last-child {
  border: 1px dashed #ccc !important;
}
.dashed-style-box ::v-deep .flex.align-center.justify-center:last-child::after {
  animation: '';
  width: 0px;
}
</style>
