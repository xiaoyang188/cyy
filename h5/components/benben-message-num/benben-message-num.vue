<template>
  <view :style="styleInfo" v-if="validateLogon ? isLogin && messageNum > 0 : messageNum > 0" class="benben_message_num">
    <template v-if="isMore">
      {{ messageNum }}
    </template>
    <template v-else-if="styleType == 'default'">
      <view :style="{ 'background-color': color }" class="more"></view>
      <view :style="{ 'background-color': color }" class="more"></view>
      <view :style="{ 'background-color': color }" class="more"></view>
    </template>
    <template v-else-if="styleType == 'oval'">99+</template>
  </view>
</template>
<script>
export default {
  name: 'benben-message-num',
  // #ifdef MP-ALIPAY
  options: {
    virtualHost: false,
  },
  // #endif
  props: {
    messageNum: { type: [String, Number], default: 0 },
    validateLogon: { type: Boolean, default: true }, //是否需要登录验证
    size: { type: [String, Number], default: '24' }, //消息字体大小
    color: { type: [String, Number], default: '#eee' },
    backgroundColor: { type: [String, Number], default: 'red' },
    styleType: { type: String, default: 'default' },
  },
  components: {},
  computed: {
    styleInfo() {
      let _size = this.size / 0.6
      let styleInfo = `background-color:${this.backgroundColor};font-size:${this.size}rpx;color:${this.color};height:${_size}rpx;line-height:${_size}rpx;text-align: center;`
      if (this.styleType == 'default') {
        styleInfo += `border-radius: 50%; width:${_size}rpx;`
      } else {
        styleInfo += `padding:0 ${_size / 3}rpx;border-radius: ${_size / 2}rpx; min-width:${_size}rpx;`
      }
      return styleInfo
    },
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
    isMore() {
      return +this.messageNum < 100
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {},
  created() {},
  beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
.benben_message_num {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0px;
}

.more {
  width: 0.25em;
  height: 0.25em;
  margin-right: 0.12em;
  border-radius: 50%;
  &:first-child {
    margin-left: 0.12em;
  }
}
</style>
