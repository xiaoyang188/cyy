<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex resultPayment_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center resultPayment_fd0_0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="resultPayment_fd0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '278.png'" v-if="payPath == ''"></image>
        </view>
        <text class="resultPayment_fd0_1_babdd">{{ $t('支付结果') }}</text>
        <view class="flex flex-wrap align-center resultPayment_fd0_0_babdd"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-center benben-flex-layout">
        <image class="resultPayment_fd1_0_babdd" mode="aspectFit" :src="STATIC_URL + '129.png'"></image>
        <text class="resultPayment_fd1_1_babdd">{{ $t('支付成功') }}</text>
        <view class="flex flex-wrap align-center">
          <text class="resultPayment_fd1_2_c0_babdd">{{ $t('支付方式') }}</text>
          <text class="resultPayment_fd1_2_c1_babdd">{{ paymentResults.pay_type }}</text>
        </view>
        <view class="flex flex-wrap align-center resultPayment_fd1_3_babdd">
          <text class="resultPayment_fd1_2_c0_babdd">{{ $t('支付时间') }}</text>
          <text class="resultPayment_fd1_2_c1_babdd">{{ paymentResults.pay_time }}</text>
        </view>
        <button
          class="resultPayment_fd1_4_babdd"
          @tap.stop="handleJumpDiy"
          data-type="redirectTo"
          :data-url="`/pages/ddgl/order/order?type=all&isNativePay=1`"
          v-if="showViewOrderBtn && payPath == ''"
        >
          {{ $t('查看订单') }}
        </button>
        <button class="resultPayment_fd1_4_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1" v-if="showViewOrderBtn && payPath != ''">
          {{ $t('查看订单') }}
        </button>
        <button class="resultPayment_fd1_6_babdd" :class="{ 'resultPayment_fd1_6_babdd--solo': !showViewOrderBtn }" @tap.stop="toHomeDiy()">
          {{ $t('返回首页') }}
        </button>
        <!-- <image class='resultPayment_fd1_7_babdd'  mode="aspectFit"  :src='STATIC_URL+"1490.png"' @tap="ddFunc()" v-if= " drawNumber.lottery_num>='1'"></image>
 -->
      </view>

      <!---flex布局flex布局结束-->
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      order_sn: 'GD20230625191945142064',
      /** order_type【支付类型: 3 普通订单 5 拼团订单 6 秒杀订单】
       *   pay_time【支付时间】
       *   pay_type【支付方式】 **/ paymentResults: { pay_type: '', pay_time: '', order_type: '' },
      /** drawNumber【抽奖次数】
       *   lottery_text【抽奖次数描述】
       *   lottery_num【本次抽奖次数】 **/ drawNumber: { lottery_num: '', lottery_text: 0 },
      money: '',
      payPath: '',
      order_type: '',
    }
  },
  computed: {
    showViewOrderBtn() {
      const type = String(this.order_type || this.paymentResults.order_type || '')
      return type !== '1'
    },
  },
  watch: {},
  onLoad(options) {
    let { order_sn, money, payPath, order_type } = options
    if (order_sn !== undefined) this.order_sn = order_sn
    if (money !== undefined) this.money = money
    if (payPath !== undefined) this.payPath = payPath
    if (order_type !== undefined) this.order_type = order_type
    setTimeout(() => {
      this.paymentResultsFunc()
    }, 500)
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //支付结果
    async paymentResultsFunc() {
      //请求方法
      //数据验证

      let datapaymentResults = await this.$api.post(global.apiUrls.post64215178a23ec, {
        order_sn: this.order_sn,
      })

      if (datapaymentResults.data.code != 1) {
        this.$message.info(datapaymentResults.data.msg)
        return
      }
      let infopaymentResults = datapaymentResults.data
      this.paymentResults = infopaymentResults.data
    },
    //获取抽奖次数
    async getDrawnumberFunc() {
      //请求方法
      //数据验证

      let datadrawNumber = await this.$api.post(global.apiUrls.post641846f0a19d3, {
        order_money: this.money,
        order_sn: this.order_sn,
      })

      if (datadrawNumber.data.code != 1) {
        this.$message.info(datadrawNumber.data.msg)
        return
      }
      let infodrawNumber = datadrawNumber.data
      this.drawNumber = infodrawNumber.data
    },
    //抽奖跳转
    ddFunc() {
      this.$urouter.navigateTo(`/pages/wd/drawalotteryorraffle/drawalotteryorraffle?count=${this.drawNumber.lottery_num}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: #fff;
  background-size: 100% auto;
  .resultPayment_fd1_0_babdd {
    width: 250rpx;
    height: 180rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 88rpx 0rpx 0rpx 0rpx;
  }
  .resultPayment_fd1_1_babdd {
    color: var(--benbenFontColor0);
    font-size: 32rpx;
    font-weight: 600;
    line-height: 45rpx;
    margin: 40rpx 0rpx 30rpx 0rpx;
  }
  .resultPayment_fd1_2_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 10rpx 0rpx 0rpx;
  }
  .resultPayment_fd1_2_c1_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }
  .resultPayment_fd1_3_babdd {
    margin: 16rpx 0rpx 87rpx 0rpx;
  }
  .resultPayment_fd1_4_babdd {
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 28rpx;
    background: var(--benbenbtnColor0);
    color: #fff;
    width: 280rpx;
    height: 72rpx;
    line-height: 72rpx;
  }
  .resultPayment_fd1_6_babdd {
    border-radius: 36rpx 36rpx 36rpx 36rpx;
    font-size: 28rpx;
    background: var(--benbenbgColor1);
    color: var(--benbenFontColor4);
    width: 280rpx;
    height: 72rpx;
    border: 1px solid var(--benbenbdColor2);
    line-height: 72rpx;
    margin: 33rpx 0rpx 112rpx 0rpx;
    &--solo {
      margin-top: 87rpx;
    }
  }
  .resultPayment_fd1_7_babdd {
    width: 686rpx;
    height: 164rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }
  .resultPayment_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;
    .resultPayment_fd0_1_babdd {
      color: #333333;
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
    }
  }
  .resultPayment_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;
    .resultPayment_fd0_0_c0_babdd {
      width: 20rpx;
      height: 36rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }
}
</style>
