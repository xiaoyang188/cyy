<template>
  <page-body>
    <view class="page">
      <view class="page-bg">
        <view class="page-bg-gradient"></view>
        <image v-if="bgcImg" class="page-bg-img" :src="bgcImg" mode="widthFix"></image>
        <view class="page-bg-mask"></view>
      </view>

      <view class="gift-nav benben-position-layout" :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }">
        <view class="gift-nav__inner">
          <view class="gift-nav__back" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <image class="gift-nav__back-icon" mode="aspectFit" src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/52542"></image>
          </view>
          <text class="gift-nav__title">{{ $t('礼包') }}</text>
          <view class="gift-nav__placeholder"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>

      <view class="gift-hero">
        <view class="gift-hero__badge">{{ $t('限时尊享') }}</view>
        <text class="gift-hero__title">{{ $t('升级会员 · 解锁权益') }}</text>
        <text class="gift-hero__sub">{{ $t('购买礼包即可升级对应会员等级，享专属折扣与特权') }}</text>
      </view>

      <view class="gift-list-container">
        <view v-if="moneyList.length" class="gift-list-head">
          <text class="gift-list-head__label">{{ $t('精选礼包') }}</text>
          <text class="gift-list-head__count">{{ moneyList.length }}{{ $t('款') }}</text>
        </view>

        <template v-for="(item, key0) in moneyList">
          <view class="gift-card" :key="key0">
            <view class="gift-card__ribbon">
              <text>{{ $t('会员专享') }}</text>
            </view>

            <view class="gift-card__header">
              <view class="gift-card__title-wrap">
                <text class="gift-card__title">{{ item.name }}</text>
                <view v-if="item.userlevel_name" class="gift-card__level-tag">
                  <text>{{ item.userlevel_name }}</text>
                </view>
              </view>
              <view class="gift-card__price">
                <text class="gift-card__price-symbol">￥</text>
                <text class="gift-card__price-int">{{ item.price | frontPrice }}</text>
                <text class="gift-card__price-dec">{{ item.price | laterPrice }}</text>
              </view>
            </view>

            <view class="gift-card__media">
              <view class="gift-card__icon-wrap">
                <image class="gift-card__icon" mode="aspectFill" :src="item.userlevel_icon || STATIC_URL + '421.png'"></image>
                <view class="gift-card__icon-ring"></view>
              </view>
              <view class="gift-card__desc-box">
                <text class="gift-card__desc-label">{{ $t('礼包说明') }}</text>
                <text class="gift-card__desc">{{ item.brief_introduction || $t('开通即享会员专属权益与服务') }}</text>
              </view>
            </view>

            <view class="gift-card__rights-box">
              <view class="gift-card__rights-header">
                <view class="rights-medal-icon"></view>
                <text class="gift-card__rights-title">
                  {{ $t('升级为') }}
                  <text class="bold">{{ item.userlevel_name || $t('专属会员') }}</text>
                </text>
              </view>

              <view class="gift-card__rights-list">
                <view class="gift-card__rights-item" v-if="item.userlevel_content">
                  <view class="icon-check"></view>
                  <view class="gift-card__rights-item-text">
                    <jyf-parser class="gift-card__parser" :html="(item.userlevel_content || '') | richTextFormat"></jyf-parser>
                  </view>
                </view>
                <template v-else>
                  <view class="gift-card__rights-item gift-card__rights-item--plain">
                    <view class="icon-check"></view>
                    <text class="gift-card__rights-item-text">{{ $t('会员专属价格与折扣') }}</text>
                  </view>
                  <view class="gift-card__rights-item gift-card__rights-item--plain">
                    <view class="icon-check"></view>
                    <text class="gift-card__rights-item-text">{{ $t('积分与活动优先参与') }}</text>
                  </view>
                </template>
              </view>
            </view>

            <button class="gift-card__btn" @tap.stop="ClaimcouponsFunc(item)">
              <text>{{ $t('立即购买') }}</text>
              <view class="icon-cart"></view>
            </button>
          </view>
        </template>

        <fu-empty
          :pagingListLoadedAll="pagingListLoadedAll"
          :pagingListNoListData="pagingListNoListData"
          :listDataLength="listDataLength"
          :isLoadInit="isLoadInit"
        ></fu-empty>
      </view>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'
import pagingList from '@/common/mixin/paging_list.js'
import hostAppPayMixin from '@/common/mixin/hostAppPay.js'
export default {
  mixins: [pagingList, hostAppPayMixin],
  components: {},

  data() {
    return {
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      moneyList: [],
      bgcImg: 'https://shop.chongyueyue.cn/uploads/images/64/642f0bbd93de727263f5a94f1123b1.png',
      currentOrderSn: '',
    }
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
    },
  },
  onLoad(options) {
    this.couponListFunc()
    this.setupHostAppPaySuccess((orderSn) => {
      this.$urouter.redirectTo(`/pages/sy/resultPayment/resultPayment?order_sn=${orderSn}&order_type=1`)
    })
  },
  onUnload() {
    this.teardownHostAppPaySuccess()
  },
  onPullDownRefresh() {
    this.couponListFunc()
  },
  methods: {
    async couponListFunc() {
      this.minixPagingListsApi = global.apiUrls.post6a154ced919fe
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {}
      this.listData = []
      this.moneyList = this.listData
      this.pagingListToggle()
    },
    pagingListPostData() {
      return this.pagingListPostDataContent
    },
    async ClaimcouponsFunc(item) {
      let aid = typeof item === 'object' ? item.aid : item
      let price = typeof item === 'object' ? item.price : ''

      if (!aid) return
      uni.showLoading({
        title: this.$t('订单生成中...'),
        mask: true,
      })
      try {
        let res = await this.$api.post(global.apiUrls.post67e67234a704a, {
          product_id: aid,
        })
        uni.hideLoading()

        if (res.data.code != 1) {
          this.$message.info(res.data.msg)
          return
        }

        let order_sn = res.data.data.order_sn || res.data.data
        if (order_sn) {
          await this.proceedHostAppPay({
            orderSn: order_sn,
            amount: price,
            orderType: 1,
            source: 'gift',
            onFallback: (sn) => {
              this.$urouter.navigateTo(`/pages/sy/offerPay/offerPay?order_sn=${sn}&order_money=${price}&order_type=1`)
            },
          })
        } else {
          this.$message.info(this.$t('订单生成失败，未能获取订单号'))
        }
      } catch (err) {
        uni.hideLoading()
        this.$message.info(this.$t('网络请求异常，请稍后重试'))
        console.error('生成礼包订单失败', err)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background-color: #f5f6f8;
  position: relative;
  overflow-x: hidden;

  .page-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;

    .page-bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 520rpx;
      background: linear-gradient(165deg, #ffe8ec 0%, #fff5f6 45%, rgba(245, 246, 248, 0) 100%);
    }

    .page-bg-img {
      width: 100%;
      display: block;
      opacity: 0.85;
    }

    .page-bg-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 160rpx;
      background: linear-gradient(to bottom, rgba(245, 246, 248, 0) 0%, #f5f6f8 100%);
    }
  }

  .gift-nav {
    width: 750rpx;
    z-index: 20;
    top: 0;

    &__inner {
      height: 88rpx;
      padding: 0 24rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &__back {
      width: 72rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
    }

    &__back-icon {
      width: 20rpx;
      height: 36rpx;
    }

    &__title {
      font-size: 34rpx;
      font-weight: 700;
      color: #1a1a1a;
    }

    &__placeholder {
      width: 72rpx;
    }
  }

  .gift-hero {
    position: relative;
    z-index: 2;
    margin: 0 32rpx 24rpx;
    padding: 32rpx 28rpx;
    border-radius: 24rpx;
    background: linear-gradient(135deg, #b82441 0%, #d63a56 55%, #e85a72 100%);
    box-shadow: 0 16rpx 40rpx rgba(184, 36, 65, 0.28);

    &__badge {
      display: inline-flex;
      padding: 6rpx 20rpx;
      background: rgba(255, 255, 255, 0.22);
      border-radius: 999rpx;
      font-size: 22rpx;
      color: #fff;
      margin-bottom: 16rpx;
    }

    &__title {
      display: block;
      font-size: 40rpx;
      font-weight: 800;
      color: #fff;
      line-height: 1.35;
      margin-bottom: 12rpx;
    }

    &__sub {
      display: block;
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.88);
      line-height: 1.5;
    }
  }

  .gift-list-container {
    position: relative;
    z-index: 2;
    padding: 0 32rpx 48rpx;
  }

  .gift-list-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    padding: 0 8rpx;

    &__label {
      font-size: 32rpx;
      font-weight: 700;
      color: #222;
    }

    &__count {
      font-size: 24rpx;
      color: #999;
    }
  }

  .gift-card {
    background: #fff;
    border-radius: 28rpx;
    padding: 0 28rpx 32rpx;
    margin-bottom: 28rpx;
    box-shadow: 0 8rpx 36rpx rgba(0, 0, 0, 0.06);
    position: relative;
    overflow: hidden;
    border: 1rpx solid rgba(184, 36, 65, 0.08);

    &__ribbon {
      margin: 0 -28rpx 20rpx;
      padding: 12rpx 28rpx;
      background: linear-gradient(90deg, rgba(184, 36, 65, 0.08) 0%, rgba(184, 36, 65, 0.02) 100%);

      text {
        font-size: 22rpx;
        color: #b82441;
        font-weight: 600;
        letter-spacing: 2rpx;
      }
    }

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 28rpx;
    }

    &__title-wrap {
      flex: 1;
      min-width: 0;
      margin-right: 16rpx;
    }

    &__title {
      font-size: 36rpx;
      font-weight: 800;
      color: #1a1a1a;
      line-height: 1.3;
      display: block;
      margin-bottom: 12rpx;
    }

    &__level-tag {
      display: inline-flex;
      padding: 4rpx 16rpx;
      background: linear-gradient(90deg, #fff0f3 0%, #ffe8ec 100%);
      border-radius: 8rpx;
      border: 1rpx solid rgba(184, 36, 65, 0.15);

      text {
        font-size: 22rpx;
        color: #b82441;
        font-weight: 600;
      }
    }

    &__price {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      flex-shrink: 0;
      padding: 8rpx 16rpx;
      background: #fff5f6;
      border-radius: 16rpx;
    }

    &__price-symbol,
    &__price-int,
    &__price-dec {
      color: #b82441;
      font-weight: 700;
    }

    &__price-symbol {
      font-size: 26rpx;
    }

    &__price-int {
      font-size: 48rpx;
    }

    &__price-dec {
      font-size: 26rpx;
    }

    &__media {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 28rpx;
      padding: 20rpx;
      background: #fafafa;
      border-radius: 20rpx;
    }

    &__icon-wrap {
      position: relative;
      flex-shrink: 0;
      margin-right: 24rpx;
    }

    &__icon {
      width: 128rpx;
      height: 128rpx;
      border-radius: 24rpx;
      background: linear-gradient(145deg, #fdf1dd 0%, #f5e6c8 100%);
      position: relative;
      z-index: 1;
    }

    &__icon-ring {
      position: absolute;
      left: -8rpx;
      top: -8rpx;
      width: 144rpx;
      height: 144rpx;
      border-radius: 28rpx;
      border: 2rpx solid rgba(184, 36, 65, 0.2);
      z-index: 0;
    }

    &__desc-box {
      flex: 1;
      min-width: 0;
    }

    &__desc-label {
      display: block;
      font-size: 22rpx;
      color: #b82441;
      font-weight: 600;
      margin-bottom: 8rpx;
    }

    &__desc {
      font-size: 26rpx;
      color: #666;
      line-height: 1.55;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    &__rights-box {
      background: linear-gradient(180deg, #fff8f9 0%, #fff 100%);
      border-radius: 20rpx;
      padding: 24rpx;
      margin-bottom: 28rpx;
      border: 1rpx solid #ffe8ec;
    }

    &__rights-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20rpx;
    }

    .rights-medal-icon {
      width: 44rpx;
      height: 44rpx;
      background: linear-gradient(135deg, #b82441, #e04d66);
      border-radius: 50%;
      margin-right: 16rpx;
      flex-shrink: 0;
      position: relative;
    }

    .rights-medal-icon::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 22rpx;
      height: 22rpx;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'/%3E%3C/svg%3E")
        no-repeat center;
      background-size: contain;
    }

    &__rights-title {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;

      .bold {
        font-weight: 800;
        color: #b82441;
        margin-left: 6rpx;
      }
    }

    &__rights-list {
      display: flex;
      flex-direction: column;
      gap: 12rpx;
    }

    &__rights-item {
      background: #fff;
      border-radius: 14rpx;
      padding: 16rpx 20rpx;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);

      &--plain {
        align-items: center;
      }
    }

    .icon-check {
      width: 32rpx;
      height: 32rpx;
      margin-right: 14rpx;
      flex-shrink: 0;
      margin-top: 2rpx;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b82441' stroke-width='2.5'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")
        no-repeat center;
      background-size: contain;
    }

    &__rights-item-text {
      font-size: 26rpx;
      color: #555;
      line-height: 1.5;
      flex: 1;
    }

    &__parser {
      font-size: 26rpx;
      color: #555;
      line-height: 1.5;
    }

    &__btn {
      margin: 0;
      width: 100%;
      height: 92rpx;
      line-height: 92rpx;
      background: linear-gradient(90deg, #b82441 0%, #d63a56 100%);
      border-radius: 46rpx;
      color: #fff;
      font-size: 32rpx;
      font-weight: 700;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      box-shadow: 0 12rpx 28rpx rgba(184, 36, 65, 0.35);
      border: none;
    }

    &__btn::after {
      border: none;
    }

    .icon-cart {
      width: 36rpx;
      height: 36rpx;
      margin-left: 12rpx;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='9' cy='21' r='1'/%3E%3Ccircle cx='20' cy='21' r='1'/%3E%3Cpath d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'/%3E%3C/svg%3E")
        no-repeat center;
      background-size: contain;
    }
  }
}
</style>
