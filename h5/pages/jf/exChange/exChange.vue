<template>
  <page-body>
    <view class="page">
      <view
        class="flex benben-position-layout flex flex-wrap align-center exChange_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center justify-between flex-sub exChange_fd0_0_babdd">
          <view class="flex flex-wrap align-center" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 exChange_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="exChange_fd0_0_c1_c0_babdd">{{ $t('兑换记录') }}</text>
          </view>
          <view class="flex flex-wrap align-center exChange_fd0_0_c2_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---tabs标题flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view>
          <benben-flex-tabs
            class-text="exChange_benbenTabsfd1_0_babdd"
            v-model="tabs"
            ref="benben_tabsfd1_0"
            select-mark="benben_tabsfd1_0"
            key="benben_tabsfd1_0"
            :open-title-type="false"
            :open-sticky="true"
            :top="88"
            :is-show-content="false"
            :scrollspy="false"
            :tabs-info.sync="tabsInfofd1_0"
            @change="getListFunc()"
          >
            <scroll-view
              :throttle="false"
              @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft"
              id="benben_tabsfd1_0"
              class="benben-tabs"
              style="width: 750rpx"
              :scroll-x="true"
              :scroll-left="tabsInfofd1_0.moveX"
              scroll-with-animation="all .3s ease"
              :show-scrollbar="false"
              :enhanced="true"
            >
              <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
                <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex flex align-center justify-around">
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'all', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'all'"
                    :id="`benben_tabsfd1_0-title-item-${'all'}`"
                  >
                    <text>{{ $t('全部') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'unpay', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'unpay'"
                    :id="`benben_tabsfd1_0-title-item-${'unpay'}`"
                  >
                    <text>{{ $t('待付款') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'shipped', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'shipped'"
                    :id="`benben_tabsfd1_0-title-item-${'shipped'}`"
                  >
                    <text>{{ $t('待发货') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'received', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'received'"
                    :id="`benben_tabsfd1_0-title-item-${'received'}`"
                  >
                    <text>{{ $t('待收货') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'Completed', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'Completed'"
                    :id="`benben_tabsfd1_0-title-item-${'Completed'}`"
                  >
                    <text>{{ $t('已完成') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: tabs == 'cancel', 'flex flex-wrap align-center exChange_titlefd1_0_c3_babdd': true }"
                    @tap="tabs = 'cancel'"
                    :id="`benben_tabsfd1_0-title-item-${'cancel'}`"
                  >
                    <text>{{ $t('已取消') }}</text>
                  </view>
                </view>
                <view
                  :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth }"
                  id="benben_tabsfd1_0-line"
                  class="benben-tabs-line flex benben-flex-tabs-line exChange_linefd1_0_babdd"
                  :class="{ 'benben-tabs-line-active': tabsInfofd1_0.isInit }"
                ></view>
              </view>
            </scroll-view>
          </benben-flex-tabs>
        </view>
        <view class="flex flex-direction align-stretch exChange_fd1_1_babdd">
          <template v-for="(item, key0) in dataMessage">
            <view
              class="flex flex-direction flex-wrap align-stretch exChange_fd1_1_c0_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/jf/orderDetails/orderDetails?integral_id=${item.order_sn}`"
              :key="key0"
            >
              <view class="flex flex-wrap align-center exChange_fd1_1_c0_c0_babdd">
                <text class="exChange_fd1_1_c0_c0_c0_babdd">{{ $t('订单编号：') }}</text>
                <text class="flex-sub exChange_fd1_1_c0_c0_c1_babdd">{{ item.order_sn }}</text>
                <text class="exChange_fd1_1_c0_c0_c2_babdd" v-if="item.status == '0'">{{ $t('待付款') }}</text>
                <text class="exChange_fd1_1_c0_c0_c2_1_babdd" v-if="item.status == '1'">{{ $t('待发货') }}</text>
                <text class="exChange_fd1_1_c0_c0_c2_1_babdd" v-if="item.status == '2'">{{ $t('待收货') }}</text>
                <text class="exChange_fd1_1_c0_c0_c2_1_babdd" v-if="item.status == '4'">{{ $t('已完成') }}</text>
                <text class="exChange_fd1_1_c0_c0_c2_1_babdd" v-if="item.status == '-1'">{{ $t('已取消') }}</text>
              </view>
              <view class="flex flex-wrap align-stretch exChange_fd1_1_c0_c1_babdd">
                <image class="exChange_fd1_1_c0_c1_c0_babdd" mode="aspectFill" :src="item.goods_thumb" v-if="changetype != '2'"></image>
                <image class="exChange_fd1_1_c0_c1_c0_babdd" mode="aspectFill" :src="item.goods_thumb" v-if="changetype == '2'"></image>
                <view class="flex flex-direction flex-wrap align-stretch flex-sub exChange_fd1_1_c0_c1_c1_babdd">
                  <text class="exChange_fd1_1_c0_c1_c1_c0_babdd">{{ item.goods_name }}</text>
                  <view class="flex flex-wrap align-center exChange_fd1_1_c0_c1_c1_c1_babdd">
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c0_babdd">{{ item.goods_integral }}</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c1_babdd">{{ $t('积分') }}</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c1_babdd" v-if="item.shop_price != '0.00'">+</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c0_babdd" v-if="item.shop_price != '0.00'">{{ item.shop_price }}</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c1_babdd" v-if="item.shop_price != '0.00'">{{ $t('元') }}</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c5_babdd">x</text>
                    <text class="exChange_fd1_1_c0_c1_c1_c1_c6_babdd">{{ item.num }}</text>
                  </view>
                </view>
              </view>
              <view class="flex flex-wrap align-center justify-end exChange_fd1_1_c0_c2_babdd">
                <view class="flex flex-wrap align-center exChange_fd1_1_c0_c2_c0_babdd" v-if="item.status == 0">
                  <text class="exChange_fd1_1_c0_c2_c0_c0_babdd">{{ $t('剩余时间：') }}</text>
                  <benben-countdown class="exChange_fd1_1_c0_c2_c0_c1_babdd" :show-day="false" :time-type="false" :count-time="item.cancel_time">
                    <benben-countdown-item date-type="h"></benben-countdown-item>

                    <text>:</text>

                    <benben-countdown-item date-type="i"></benben-countdown-item>

                    <text>:</text>

                    <benben-countdown-item date-type="s"></benben-countdown-item>

                    <text></text>
                  </benben-countdown>
                </view>
                <button class="exChange_fd1_1_c0_c2_c1_babdd" @tap.stop="getcancleIDFunc(item.order_sn)" v-if="item.status == '0'">
                  {{ $t('取消订单') }}
                </button>
                <button
                  class="exChange_fd1_1_c0_c2_c1_1_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/ddgl/logisticsCheck/logisticsCheck?order_id=${item.aid}`"
                  v-if="in_array(item.status, '2,4')"
                >
                  {{ $t('查看物流') }}
                </button>
                <button class="exChange_fd1_1_c0_c2_c1_1_babdd" @tap.stop="getdeleteIDFunc(item.order_sn)" v-if="in_array(item.status, '4,-1')">
                  {{ $t('删除订单') }}
                </button>
                <button class="exChange_fd1_1_c0_c2_c2_babdd" @tap.stop="goPayFunc(item)" v-if="item.status == '0'">
                  {{ $t('去付款') }}
                </button>
                <button
                  class="exChange_fd1_1_c0_c2_c2_1_babdd"
                  @tap.stop="remindshipFunc(item.order_sn)"
                  v-if="item.status == '1' && item.is_remind.info == '0'"
                >
                  {{ $t('提醒发货') }}
                </button>
                <button class="exChange_fd1_1_c0_c2_c2_1_babdd" @tap.stop="getconfirmIDFunc(item.order_sn)" v-if="item.status == '2'">
                  {{ $t('确认收货') }}
                </button>
                <button class="exChange_fd1_1_c0_c2_c2_3_babdd" v-if="item.status == '1' && item.is_remind.info == '1'">{{ $t('已提醒') }}</button>
              </view>
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

      <!---tabs标题flex布局结束-->
      <benben-popup v-model="popupShow1686119263829" :mask="true" :mask-close-able="true" mode="center">
        <!---删除订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center exChange_flex_2_babdd">
          <text class="exChange_fd2_0_babdd">{{ $t('提示') }}</text>
          <text class="exChange_fd2_1_babdd">{{ $t('是否确认删除订单?') }}</text>
          <view class="flex align-center">
            <button class="exChange_fd2_2_c0_babdd" @tap.stop="popupShow1686119263829 = false">{{ $t('取消') }}</button>
            <button class="exChange_fd2_2_c1_babdd" @tap.stop="getDeleteFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---删除订单弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686118994080" :mask="true" :mask-close-able="true" mode="center">
        <!---确认收货弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center exChange_flex_3_babdd">
          <text class="exChange_fd3_0_babdd">{{ $t('提示') }}</text>
          <text class="exChange_fd3_1_babdd">{{ $t('是否确认收货?') }}</text>
          <view class="flex align-center">
            <button class="exChange_fd3_2_c0_babdd" @tap.stop="popupShow1686118994080 = false">{{ $t('取消') }}</button>
            <button class="exChange_fd3_2_c1_babdd" @tap.stop="getConfirmFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---确认收货弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686119225596" :mask="true" :mask-close-able="true" mode="center">
        <!---取消订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center exChange_flex_4_babdd">
          <text class="exChange_fd4_0_babdd">{{ $t('提示') }}</text>
          <text class="exChange_fd4_1_babdd">{{ $t('是否确认取消订单?') }}</text>
          <view class="flex align-center">
            <button class="exChange_fd4_2_c0_babdd" @tap.stop="popupShow1686119225596 = false">{{ $t('取消') }}</button>
            <button class="exChange_fd4_2_c1_babdd" @tap.stop="getCancleFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---取消订单弹窗flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js'
import hostAppPayMixin from '@/common/mixin/hostAppPay.js'
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},
  mixins: [pagingList, hostAppPayMixin],

  data() {
    return {
      popupShow1686119225596: false,
      popupShow1686118994080: false,
      popupShow1686119263829: false,
      tabsInfofd1_0: {
        lineleft: '',
        lineWidth: '',
        moveX: 0,
        scrollX: 0,
        PageScrollX: 0,
        isInit: false,
      },
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      tabs: 'all',
      changetype: '1',
      cut: '1',
      dataMessage: [],
      /** cancle_id【取消id】 **/ cancle_id: '',
      /** confirm_id【确认收货id】 **/ confirm_id: '',
      /** delete_id【删除id】 **/ delete_id: '',
      isNativePay: '',
      currentOrderSn: '',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { isNativePay } = options
    if (isNativePay !== undefined) this.isNativePay = isNativePay
    this.diyPageListen()
    this.setupHostAppPaySuccess()
  },
  onUnload() {
    this.diyOffPageListen()
    this.teardownHostAppPaySuccess()
  },
  onReady() {},
  onShow() {
    this.getListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //获取取消id
    getcancleIDFunc(order_sn) {
      this.cancle_id = order_sn
      this.popupShow1686119225596 = true
    },
    //获取确认收货id
    getconfirmIDFunc(order_sn) {
      this.confirm_id = order_sn
      this.popupShow1686118994080 = true
    },
    //获取删除订单id
    getdeleteIDFunc(order_sn) {
      this.delete_id = order_sn
      this.popupShow1686119263829 = true
    },
    //取消订单
    async getCancleFunc() {
      //请求方法
      //数据验证

      let data64155c02284ef = await this.$api.post(global.apiUrls.post64155c02284ef, {
        order_sn: this.cancle_id,
      })

      if (data64155c02284ef.data.code != 1) {
        this.$message.info(data64155c02284ef.data.msg)
        return
      }
      let info64155c02284ef = data64155c02284ef.data

      this.popupShow1686119225596 = false
      this.getListFunc()
    },
    //确认收货
    async getConfirmFunc() {
      //请求方法
      //数据验证

      let data64156687686b5 = await this.$api.post(global.apiUrls.post64156687686b5, {
        order_sn: this.confirm_id,
      })

      if (data64156687686b5.data.code != 1) {
        this.$message.info(data64156687686b5.data.msg)
        return
      }
      let info64156687686b5 = data64156687686b5.data

      this.popupShow1686118994080 = false
      this.getListFunc()
    },
    //删除订单
    async getDeleteFunc() {
      //请求方法
      //数据验证

      let data641568f194350 = await this.$api.post(global.apiUrls.post641568f194350, {
        order_sn: this.delete_id,
      })

      if (data641568f194350.data.code != 1) {
        this.$message.info(data641568f194350.data.msg)
        return
      }
      let info641568f194350 = data641568f194350.data

      this.popupShow1686119263829 = false
      this.getListFunc()
    },
    //积分商城-兑换记录
    getListFunc() {
      this.minixPagingListsApi = global.apiUrls.post6415318b455ed
      this.pageingListApiMethod = 'post'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        type: this.tabs,
      }
      this.listData = []
      this.dataMessage = this.listData
      this.pagingListToggle()
    },
    //积分商城-提醒发货
    async remindshipFunc(id) {
      //请求方法
      //数据验证

      let data64155d9464c1d = await this.$api.post(global.apiUrls.post64155d9464c1d, {
        order_sn: id,
      })

      if (data64155d9464c1d.data.code != 1) {
        this.$message.info(data64155d9464c1d.data.msg)
        return
      }
      let info64155d9464c1d = data64155d9464c1d.data

      uni.showToast({
        title: this.$t('提醒成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.getListFunc()
    },
    pagingListPostData() {
      return this.pagingListPostDataContent
    },
    //页面监听
    diyPageListen() {
      uni.$on('upjflist', (data) => {
        this.getListFunc()
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('upjflist')
    },
    // 去付款（与 order 支付跳转逻辑一致）
    async goPayFunc(item) {
      const orderSn = item.order_sn
      if (!orderSn) return
      await this.proceedHostAppPay({
        orderSn,
        amount: item.payable_money,
        orderType: 4,
        source: 'exChange',
        offerPayExtra: 'order_type=4&payPath=1',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: var(--benbenbgColor0);
  background-size: 100% auto;

  .exChange_flex_4_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .exChange_fd4_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .exChange_fd4_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 40rpx 40rpx;
    }

    .exChange_fd4_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      width: 269rpx;
    }

    .exChange_fd4_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 268rpx;
    }
  }

  .exChange_flex_3_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .exChange_fd3_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .exChange_fd3_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 40rpx 40rpx;
    }

    .exChange_fd3_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      width: 269rpx;
    }

    .exChange_fd3_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 269rpx;
    }
  }

  .exChange_flex_2_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .exChange_fd2_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .exChange_fd2_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 40rpx 40rpx;
    }

    .exChange_fd2_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      width: 269rpx;
    }

    .exChange_fd2_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 268rpx;
    }
  }

  .checkTitlefd1_0_babdd {
    font-weight: 500 !important;
    font-size: 28rpx !important;
    color: var(--benbenFontColor4) !important;
    background-color: var(--benbenbgColor1) !important;
  }

  .exChange_linefd1_0_babdd {
    width: 40rpx;
    height: 8rpx;
    top: 75rpx;
    background: var(--benbenbgColor7);
    background-size: 100% auto !important;
    border-radius: 80rpx 80rpx 80rpx 80rpx;
  }

  .exChange_titlefd1_0_c3_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .exChange_bodyfd1_0_c3_babdd {
    padding: 24rpx 24rpx 0rpx 24rpx;
  }

  .exChange_fd1_1_babdd {
    margin: 24rpx 0rpx 0rpx 0rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;

    .exChange_fd1_1_c0_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 0rpx 24rpx 0rpx 24rpx;
      margin: 0rpx 0rpx 24rpx 0rpx;

      .exChange_fd1_1_c0_c0_babdd {
        margin: 32rpx 0rpx 32rpx 0rpx;

        .exChange_fd1_1_c0_c0_c0_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
        }

        .exChange_fd1_1_c0_c0_c1_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .exChange_fd1_1_c0_c0_c2_babdd {
          font-size: 28rpx;
          font-weight: 600;
          color: var(--benbenFontColor4);
        }
      }

      .exChange_fd1_1_c0_c1_babdd {
        padding: 0rpx 0rpx 32rpx 0rpx;
        border-bottom: 1px solid #eee;

        .exChange_fd1_1_c0_c1_c1_babdd {
          height: 200rpx;

          .exChange_fd1_1_c0_c1_c1_c0_babdd {
            font-size: 28rpx;
            font-weight: 600;
            color: var(--benbenFontColor0);
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }

          .exChange_fd1_1_c0_c1_c1_c1_babdd {
            margin: auto 0rpx 0rpx 0rpx;

            .exChange_fd1_1_c0_c1_c1_c1_c5_babdd {
              margin: 0rpx 0rpx 0rpx auto;
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }

            .exChange_fd1_1_c0_c1_c1_c1_c6_babdd {
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }

      .exChange_fd1_1_c0_c2_babdd {
        padding: 24rpx 0rpx 24rpx 0rpx;

        .exChange_fd1_1_c0_c2_c0_babdd {
          margin: 0rpx auto 0rpx 0rpx;
          font-size: 24rpx;
          color: rgba(102, 102, 102, 1);

          .exChange_fd1_1_c0_c2_c0_c0_babdd {
            font-size: 24rpx;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }

          .exChange_fd1_1_c0_c2_c0_c1_babdd {
            background: var(--benbenbgColor1);
          }
        }

        .exChange_fd1_1_c0_c2_c1_babdd {
          border-radius: 28rpx 28rpx 28rpx 28rpx;
          font-size: 24rpx;
          background: var(--benbenbtnColor3);
          color: var(--benbenFontColor0);
          width: 160rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-weight: 500;
          margin: 0rpx 0rpx 0rpx 24rpx;
        }

        .exChange_fd1_1_c0_c2_c2_babdd {
          border-radius: 28rpx 28rpx 28rpx 28rpx;
          font-size: 24rpx;
          background: var(--benbenbtnColor0);
          color: var(--benbenFontColor3);
          width: 160rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-weight: 400;
          margin: 0rpx 0rpx 0rpx 24rpx;
        }

        .exChange_fd1_1_c0_c2_c2_3_babdd {
          border-radius: 28rpx 28rpx 28rpx 28rpx;
          font-size: 24rpx;
          background: var(--benbenbgColor7);
          color: var(--benbenFontColor3);
          width: 160rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-weight: 400;
          margin: 0rpx 0rpx 0rpx 24rpx;
        }
      }
    }
  }

  .exChange_fd1_1_c0_c0_c2_1_babdd {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--benbenFontColor5);
  }

  .exChange_fd1_1_c0_c1_c0_babdd {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .exChange_fd1_1_c0_c1_c1_c1_c0_babdd {
    font-size: 36rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    margin: 0rpx 8rpx 0rpx 0rpx;
  }

  .exChange_fd1_1_c0_c1_c1_c1_c1_babdd {
    font-size: 22rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .exChange_fd1_1_c0_c2_c1_1_babdd {
    border-radius: 28rpx 28rpx 28rpx 28rpx;
    font-size: 24rpx;
    background: #f6f6f6;
    color: rgba(51, 51, 51, 1);
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    font-weight: 500;
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .exChange_fd1_1_c0_c2_c2_1_babdd {
    border-radius: 28rpx 28rpx 28rpx 28rpx;
    font-size: 24rpx;
    background: var(--benbenbgColor7);
    color: #fff;
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    font-weight: 400;
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .exChange_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .exChange_fd0_0_babdd {
      margin: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .exChange_fd0_0_c0_c0_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbeniconColor1);
      }

      .exChange_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
      }

      .exChange_fd0_0_c2_babdd {
        width: 36rpx;
      }
    }
  }
}

::v-deep .exChange_benbenTabsfd1_0_babdd {
  width: 750rpx;
  height: 87rpx;
  white-space: nowrap;
  background: var(--benbenbgColor1);
  text-align: center;
}
</style>
