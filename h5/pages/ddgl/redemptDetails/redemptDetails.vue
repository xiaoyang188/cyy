<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-direction flex-wrap align-stretch benben-position-layout flex redemptDetails_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center justify-between redemptDetails_fd0_0_babdd">
          <view class="flex flex-wrap align-center redemptDetails_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 redemptDetails_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="redemptDetails_fd0_0_c1_c0_babdd">{{ $t('订单详情') }}</text>
          </view>
          <view class="flex align-center justify-end redemptDetails_fd0_0_c2_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1698806556276" :mask="true" :mask-close-able="true" mode="center">
        <!---删除订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center redemptDetails_flex_1_babdd">
          <text class="redemptDetails_fd1_0_babdd">{{ $t('提示') }}</text>
          <text class="redemptDetails_fd1_1_babdd">{{ $t('确定删除订单？') }}</text>
          <view class="flex align-center redemptDetails_fd1_2_babdd">
            <button class="redemptDetails_fd1_2_c0_babdd" @tap.stop="popupShow1698806556276 = false">{{ $t('取消') }}</button>
            <button class="redemptDetails_fd1_2_c1_babdd" @tap.stop="deleteOrderFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---删除订单弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1763608410324" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---确认收货弹窗flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-stretch redemptDetails_fd2_0_babdd">
            <text class="redemptDetails_fd2_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="redemptDetails_fd2_0_c1_babdd">{{ $t('确认收到货物吗？') }}</text>
            <view class="flex align-center redemptDetails_fd2_0_c2_babdd">
              <button class="redemptDetails_fd2_0_c2_c0_babdd" @tap.stop="popupShow1763608410324 = false">{{ $t('取消') }}</button>
              <button class="redemptDetails_fd2_0_c2_c1_babdd" @tap.stop="confirmReceiptFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>

        <!---确认收货弹窗flex布局结束-->
      </benben-popup>
      <!---订单flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout redemptDetails_flex_3_babdd">
        <view class="flex align-center redemptDetails_fd3_0_babdd">
          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
            <text class="redemptDetails_fd3_0_c0_c0_babdd" v-if="dataDetails.status == '0' && dataDetails.pay_type != 'offline_pay'">
              {{ $t('订单待付款') }}
            </text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '1'">{{ $t('订单待发货') }}</text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '2'">{{ $t('订单待收货') }}</text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '3'">{{ $t('订单待评价') }}</text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '4'">{{ $t('订单已完成') }}</text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '-1'">{{ $t('订单已关闭') }}</text>
            <text class="redemptDetails_fd3_0_c0_c0_1_babdd" v-if="dataDetails.status == '7'">{{ $t('预售待付尾款') }}</text>
            <view
              class="flex flex-wrap align-stretch redemptDetails_fd3_0_c0_c1_babdd"
              v-if="dataDetails.status == '0' && dataDetails.pay_type != 'offline_pay'"
            >
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ $t('剩余时间：') }}</text>
              <benben-countdown
                class="redemptDetails_fd3_0_c0_c1_c1_babdd"
                :show-day="true"
                :time-type="false"
                :count-time="dataDetails.cancel_surplus_second"
                @time-end="getDetailFunc()"
                v-if="dataDetails.cancel_surplus_second >= daojishi"
              >
                <benben-countdown-item date-type="d"></benben-countdown-item>

                <text>{{ $t('天') }}</text>

                <benben-countdown-item date-type="h"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="i"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="s"></benben-countdown-item>

                <text></text>
              </benben-countdown>
              <benben-countdown
                :show-day="false"
                :time-type="false"
                :count-time="dataDetails.cancel_surplus_second"
                @time-end="getDetailFunc()"
                v-if="dataDetails.cancel_surplus_second < daojishi"
              >
                <benben-countdown-item date-type="h"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="i"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="s"></benben-countdown-item>

                <text></text>
              </benben-countdown>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd3_0_c0_c1_babdd" v-if="dataDetails.status == '2'">
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ $t('还剩') }}</text>
              <benben-countdown
                class="redemptDetails_fd3_0_c0_c1_c1_babdd"
                :show-day="true"
                :time-type="false"
                :count-time="dataDetails.receive_surplus_time"
                @time-end="getDetailFunc()"
              >
                <benben-countdown-item date-type="d"></benben-countdown-item>

                <text>{{ $t('天') }}</text>

                <benben-countdown-item date-type="h"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="i"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="s"></benben-countdown-item>

                <text></text>
              </benben-countdown>
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ $t('自动确认') }}</text>
            </view>
            <text class="redemptDetails_fd3_0_c0_c3_babdd" v-if="dataDetails.status == '3'">{{ $t('您的评价将会给其他买家参考') }}</text>
            <view class="flex flex-wrap align-center redemptDetails_fd3_0_c0_c1_babdd" v-if="dataDetails.status == '7'">
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ $t('尾款支付时间:') }}</text>
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ dataDetails.balance_payment_stime }}</text>
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">-</text>
              <text class="redemptDetails_fd3_0_c0_c1_c0_babdd">{{ dataDetails.balance_payment_etime }}</text>
            </view>
          </view>
          <image
            class="redemptDetails_fd3_0_c1_babdd"
            mode="aspectFit"
            :src="STATIC_URL + '375.png'"
            v-if="dataDetails.status == '0' && dataDetails.pay_type != 'offline_pay'"
          ></image>
          <image class="redemptDetails_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '376.png'" v-if="dataDetails.status == '1'"></image>
          <image class="redemptDetails_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '377.png'" v-if="dataDetails.status == '2'"></image>
          <image class="redemptDetails_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '1522.png'" v-if="dataDetails.status == '3'"></image>
          <image class="redemptDetails_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '378.png'" v-if="dataDetails.status == '4'"></image>
          <image class="redemptDetails_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '375.png'" v-if="dataDetails.status == '7'"></image>
        </view>
        <view class="flex flex-wrap align-center redemptDetails_fd3_1_babdd" v-if="dataDetails.send_type == 0">
          <image class="redemptDetails_fd3_1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub redemptDetails_fd3_1_c1_babdd">
            <view class="flex flex-wrap align-center">
              <text class="redemptDetails_fd3_1_c1_c0_c0_babdd">{{ dataDetails.order_info.label_name }}</text>
              <text class="redemptDetails_fd3_1_c1_c0_c1_babdd">{{ dataDetails.order_info.receiver_name }}</text>
              <text class="flex-sub redemptDetails_fd3_1_c1_c0_c2_babdd">{{ dataDetails.order_info.receiver_mobile }}</text>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd3_1_c1_c1_babdd">
              <view class="flex-sub redemptDetails_fd3_1_c1_c1_c0_babdd">
                <text class="redemptDetails_fd3_1_c1_c1_c0_c0_babdd">{{ dataDetails.order_info.province }}</text>
                <text class="redemptDetails_fd3_1_c1_c1_c0_c0_babdd">{{ dataDetails.order_info.city }}</text>
                <text class="redemptDetails_fd3_1_c1_c1_c0_c0_babdd">{{ dataDetails.order_info.district }}</text>
                <text class="redemptDetails_fd3_1_c1_c1_c0_c3_babdd">{{ dataDetails.order_info.receiver_address }}</text>
              </view>
            </view>
          </view>
          <!-- <image class='redemptDetails_fd3_1_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"814.png"'></image>
 -->
        </view>
        <view class="flex flex-direction flex-wrap align-stretch redemptDetails_fd3_2_babdd">
          <template v-for="(item, key0) in dataDetails.order_goods_list">
            <view class="flex flex-direction align-stretch redemptDetails_fd3_2_c0_babdd" :key="key0">
              <view
                class="flex align-stretch redemptDetails_fd3_2_c0_c0_babdd"
                @tap.stop="goShopDetailFunc(item.goods_id, item.sku_id, item.activity_id)"
              >
                <image class="redemptDetails_fd3_2_c0_c0_c0_babdd" mode="aspectFill" :src="item.goods_thumb"></image>
                <view class="flex flex-direction align-stretch flex-sub redemptDetails_fd3_2_c0_c0_c1_babdd">
                  <text class="redemptDetails_fd3_2_c0_c0_c1_c0_babdd">{{ item.goods_name }}</text>
                  <text class="redemptDetails_fd3_2_c0_c0_c1_c1_babdd">{{ item.sku_name }}</text>
                  <view class="flex flex-wrap align-center justify-between">
                    <view class="flex flex-wrap align-center">
                      <text class="redemptDetails_fd3_2_c0_c0_c1_c2_c0_c0_babdd">{{ $t('￥') }}</text>
                      <text class="redemptDetails_fd3_2_c0_c0_c1_c2_c0_c1_babdd">
                        <text class="redemptDetails_price1_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ item.shop_price | frontPrice }}</text>
                        <text class="redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ item.shop_price | laterPrice }}</text>
                      </text>
                    </view>
                    <view class="flex flex-wrap align-center redemptDetails_fd3_2_c0_c0_c1_c2_c1_babdd">
                      <text>x</text>
                      <text>{{ item.num }}</text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c0_c1_babdd">
                <button
                  class="redemptDetails_fd3_2_c0_c1_c0_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/ddgl/serviceApply/serviceApply?aid=${item.aid}`"
                  v-if="item.refund_btn.apply_refund == '1'"
                >
                  {{ $t('申请售后') }}
                </button>
                <button
                  class="redemptDetails_fd3_2_c0_c1_c1_babdd"
                  @tap.stop="gotoreturnFuncFunc(item.aid, item.refund_btn.refund_id, item.refund_btn.view_refund_list)"
                  v-if="item.refund_btn.view_refund == '1'"
                >
                  {{ $t('查看售后详情') }}
                </button>
              </view>
            </view>
          </template>

          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c1_babdd">
            <text class="redemptDetails_fd3_2_c1_c0_babdd">{{ $t('商品总额') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ $t('￥') }}</text>
            <text class="redemptDetails_fd3_2_c1_c2_babdd">
              <text class="redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ dataDetails.goods_total | frontPrice }}</text>
              <text class="redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ dataDetails.goods_total | laterPrice }}</text>
            </text>
          </view>
          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c2_babdd" v-if="dataDetails.coupon_money != '0.00'">
            <text class="redemptDetails_fd3_2_c1_c0_babdd">{{ $t('优惠券') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">-</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ $t('￥') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ dataDetails.coupon_money }}</text>
          </view>
          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c2_babdd" v-if="dataDetails.send_type == 0">
            <text class="redemptDetails_fd3_2_c1_c0_babdd">{{ $t('运费') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd" v-if="dataDetails.order_info.express_price > money">{{ $t('￥') }}</text>
            <text class="redemptDetails_fd3_2_c3_c1_1_babdd" v-if="dataDetails.order_info.express_price == money">{{ $t('包邮') }}</text>
            <text class="redemptDetails_fd3_2_c1_c2_babdd" v-if="dataDetails.order_info.express_price > money">
              <text class="redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ dataDetails.order_info.express_price | frontPrice }}</text>
              <text class="redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd">{{ dataDetails.order_info.express_price | laterPrice }}</text>
            </text>
          </view>
          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c2_babdd" v-if="dataDetails.discount_money > money">
            <text class="redemptDetails_fd3_2_c1_c0_babdd">{{ $t('会员折扣') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ $t('-￥') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ dataDetails.discount_money }}</text>
          </view>
          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c2_babdd" v-if="Number(dataDetails.order_discount_money) > 0">
            <text class="redemptDetails_fd3_2_c1_c0_babdd">{{ $t('积分折扣') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ $t('-￥') }}</text>
            <text class="redemptDetails_fd3_2_c1_c1_babdd">{{ dataDetails.order_discount_money }}</text>
          </view>
          <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c6_babdd" v-if="dataDetails.order_type != '7'">
            <text class="redemptDetails_fd3_2_c6_c0_babdd" v-if="!dataDetails.pay_type">{{ $t('应付款') }}</text>
            <text class="redemptDetails_fd3_2_c6_c0_1_babdd" v-if="dataDetails.pay_type">{{ $t('实付款') }}</text>
            <text class="redemptDetails_fd3_2_c6_c1_babdd">{{ $t('￥') }}</text>
            <text class="redemptDetails_fd3_2_c6_c2_babdd" v-if="dataDetails.status < '1'">
              <text class="redemptDetails_price1_fd3_2_c6_c2_babdd">{{ dataDetails.payable_money | frontPrice }}</text>
              <text class="redemptDetails_price2_fd3_2_c6_c2_babdd">{{ dataDetails.payable_money | laterPrice }}</text>
            </text>
            <text class="redemptDetails_fd3_2_c6_c2_1_babdd" v-if="dataDetails.status >= '1'">
              <text class="redemptDetails_price1_fd3_2_c6_c2_babdd">{{ dataDetails.real_money | frontPrice }}</text>
              <text class="redemptDetails_price2_fd3_2_c6_c2_babdd">{{ dataDetails.real_money | laterPrice }}</text>
            </text>
          </view>
          <view class="flex flex-direction align-stretch justify-end redemptDetails_fd3_2_c6_babdd" v-if="dataDetails.order_type == '7'">
            <view
              class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c7_c0_babdd"
              v-if="dataDetails.pay_status == 0 && dataDetails.final_status == 0"
            >
              <text class="redemptDetails_fd3_2_c6_c0_babdd">{{ $t('待付定金') }}</text>
              <text class="redemptDetails_fd3_2_c6_c1_babdd">￥</text>
              <text class="redemptDetails_fd3_2_c6_c2_babdd">
                <text class="redemptDetails_price1_fd3_2_c7_c0_c2_babdd">{{ dataDetails.deposit | frontPrice }}</text>
                <text class="redemptDetails_price2_fd3_2_c7_c0_c2_babdd">{{ dataDetails.deposit | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center justify-end redemptDetails_fd3_2_c7_c0_babdd" v-if="dataDetails.pay_status == '1'">
              <text class="redemptDetails_fd3_2_c6_c0_babdd">{{ $t('已付定金') }}</text>
              <text class="redemptDetails_fd3_2_c6_c1_babdd">￥</text>
              <text class="redemptDetails_fd3_2_c6_c2_babdd">
                <text class="redemptDetails_price1_fd3_2_c7_c0_c2_babdd">{{ dataDetails.deposit | frontPrice }}</text>
                <text class="redemptDetails_price2_fd3_2_c7_c0_c2_babdd">{{ dataDetails.deposit | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center justify-end" v-if="dataDetails.pay_status == '1' && dataDetails.final_status == 0">
              <text class="redemptDetails_fd3_2_c6_c0_babdd">{{ $t('待付尾款') }}</text>
              <text class="redemptDetails_fd3_2_c6_c1_babdd">￥</text>
              <text class="redemptDetails_fd3_2_c6_c2_babdd">
                <text class="redemptDetails_price1_fd3_2_c7_c0_c2_babdd">{{ dataDetails.balance_money | frontPrice }}</text>
                <text class="redemptDetails_price2_fd3_2_c7_c0_c2_babdd">{{ dataDetails.balance_money | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center justify-end" v-if="dataDetails.pay_status == '1' && dataDetails.final_status == '1'">
              <text class="redemptDetails_fd3_2_c6_c0_babdd">{{ $t('已付尾款') }}</text>
              <text class="redemptDetails_fd3_2_c6_c1_babdd">￥</text>
              <text class="redemptDetails_fd3_2_c6_c2_babdd">
                <text class="redemptDetails_price1_fd3_2_c7_c0_c2_babdd">{{ dataDetails.balance_money | frontPrice }}</text>
                <text class="redemptDetails_price2_fd3_2_c7_c0_c2_babdd">{{ dataDetails.balance_money | laterPrice }}</text>
              </text>
            </view>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch redemptDetails_fd3_3_babdd">
          <view class="flex flex-wrap align-center redemptDetails_fd3_3_c0_babdd">
            <view class="flex redemptDetails_fd3_3_c0_c0_babdd"></view>

            <text class="redemptDetails_fd3_3_c0_c1_babdd">{{ $t('订单信息') }}</text>
          </view>
          <view class="flex flex-wrap align-stretch redemptDetails_fd3_2_c0_c0_babdd">
            <text class="redemptDetails_fd3_3_c1_c0_babdd">{{ $t('订单备注') }}</text>
            <text class="flex-sub redemptDetails_fd3_3_c1_c1_babdd" v-if="dataDetails.order_info_pickup.remark != ''">
              {{ dataDetails.order_info_pickup.remark }}
            </text>
            <text class="flex-sub redemptDetails_fd3_3_c1_c1_1_babdd" v-if="dataDetails.order_info_pickup.remark == ''">{{ $t('无') }}</text>
          </view>
          <view class="flex flex-wrap align-stretch redemptDetails_fd3_3_c2_babdd">
            <text class="redemptDetails_fd3_3_c2_c0_babdd">{{ $t('订单编号') }}</text>
            <text class="redemptDetails_fd3_3_c2_c1_babdd">{{ dataDetails.order_sn }}</text>
            <text class="redemptDetails_fd3_3_c2_c2_babdd" @tap.stop="copyText(dataDetails.order_sn)">{{ $t('复制') }}</text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch">
            <view class="flex flex-wrap align-center redemptDetails_fd3_2_c0_c0_babdd">
              <text class="redemptDetails_fd3_3_c2_c0_babdd">{{ $t('下单时间') }}</text>
              <text class="redemptDetails_fd3_1_c1_c1_c0_c3_babdd">{{ dataDetails.create_time }}</text>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd3_2_c0_c0_babdd" v-if="dataDetails.pay_type">
              <text class="redemptDetails_fd3_3_c2_c0_babdd">{{ $t('付款金额') }}</text>
              <text class="redemptDetails_fd3_1_c1_c1_c0_c3_babdd">{{ $t('￥') }}</text>
              <text class="redemptDetails_fd3_3_c3_c1_c2_babdd">
                <text class="redemptDetails_price1_fd3_3_c3_c1_c2_babdd">{{ dataDetails.real_money | frontPrice }}</text>
                <text class="redemptDetails_price1_fd3_3_c3_c1_c2_babdd">{{ dataDetails.real_money | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd3_2_c0_c0_babdd" v-if="dataDetails.pay_type">
              <text class="redemptDetails_fd3_3_c2_c0_babdd">{{ $t('支付方式') }}</text>
              <text class="redemptDetails_fd3_3_c3_c2_c1_babdd">{{ dataDetails.pay_type_str }}</text>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd3_2_c0_c0_babdd" v-if="dataDetails.pay_type">
              <text class="redemptDetails_fd3_3_c2_c0_babdd">{{ $t('支付时间') }}</text>
              <text class="redemptDetails_fd3_1_c1_c1_c0_c3_babdd">{{ dataDetails.pay_time }}</text>
            </view>
          </view>
        </view>
        <view class="flex flex-direction align-stretch justify-end redemptDetails_fd3_4_babdd">
          <view class="flex flex-wrap align-center justify-end">
            <button
              class="redemptDetails_fd3_4_c0_c0_babdd"
              @tap.stop="popupShow1657247297312 = true"
              v-if="dataDetails.btn_list.cancel_order == '1'"
            >
              {{ $t('取消订单') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c0_babdd"
              @tap.stop="isMultiplePackagesFunc(dataDetails.is_multiple_package)"
              v-if="dataDetails.btn_list.view_logistics == '1'"
            >
              {{ $t('查看物流') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c1_babdd"
              @tap.stop="popupShow1679650134928 = true"
              v-if="dataDetails.btn_list.apply_invoice == '1'"
            >
              {{ $t('申请开票') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c1_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fp/invoiceDetail/invoiceDetail?order_id=${order_id}`"
              v-if="dataDetails.btn_list.view_invoice == '1'"
            >
              {{ $t('查看发票') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c1_babdd"
              @tap.stop="popupShow1698806556276 = true"
              v-if="dataDetails.btn_list.delete_order == '1'"
            >
              {{ $t('删除订单') }}
            </button>
            <button class="redemptDetails_fd3_4_c0_c2_babdd" @tap.stop="goPayFunc()" v-if="dataDetails.btn_list.go_pay == '1'">
              {{ $t('去付款') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c2_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/sy/offerPay/offerPay?order_sn=${dataDetails.final_order_sn}&order_type=3`"
              v-if="dataDetails.btn_list.pay_balance == '1' && dataDetails.order_type == '7'"
            >
              {{ $t('支付尾款') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c3_babdd"
              @tap.stop="remindShopFunc()"
              v-if="dataDetails.status == '1' && dataDetails.btn_list.remind_send == '1'"
            >
              {{ $t('提醒发货') }}
            </button>
            <button class="redemptDetails_fd3_4_c0_c2_babdd" v-if="dataDetails.btn_list.remind_already == '1'">{{ $t('已提醒') }}</button>
            <button
              class="redemptDetails_fd3_4_c0_c3_babdd"
              @tap.stop="popupShow1763608410324 = true"
              v-if="dataDetails.btn_list.confirm_receive == '1'"
            >
              {{ $t('确认收货') }}
            </button>
            <button
              class="redemptDetails_fd3_4_c0_c2_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/evaluation/evaluation?id=${order_id}`"
              v-if="dataDetails.btn_list.evaluate == '1'"
            >
              {{ $t('评价') }}
            </button>
          </view>
          <!-- <benben-safe-area></benben-safe-area> -->
        </view>
      </view>

      <!---订单flex布局结束-->
      <benben-popup v-model="popupShow1737680677873" :mask="true" :mask-close-able="false" mode="center">
        <!---取消二次确认弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center redemptDetails_flex_4_babdd">
          <text class="redemptDetails_fd4_0_babdd">{{ $t('提示') }}</text>
          <text class="redemptDetails_fd4_1_babdd">{{ $t('确认取消订单吗？') }}</text>
          <view class="flex align-center redemptDetails_fd4_2_babdd">
            <button class="redemptDetails_fd4_2_c0_babdd" @tap.stop="popupShow1737680677873 = false">{{ $t('取消') }}</button>
            <button class="redemptDetails_fd4_2_c1_babdd" @tap.stop="cancelOrderFunc()">{{ $t('确认') }}</button>
          </view>
        </view>

        <!---取消二次确认弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1657247297312" :mask="true" :mask-close-able="true" mode="bottom">
        <!---取消订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout redemptDetails_flex_5_babdd">
          <view class="flex flex-direction flex-wrap align-stretch redemptDetails_fd5_0_babdd">
            <view class="flex flex-wrap align-center justify-between redemptDetails_fd5_0_c0_babdd">
              <text class="redemptDetails_fd5_0_c0_c0_babdd" @tap.stop="popupShow1657247297312 = false">{{ $t('取消') }}</text>
              <text class="redemptDetails_fd5_0_c0_c1_babdd">{{ $t('取消订单') }}</text>
              <text class="redemptDetails_fd5_0_c0_c2_babdd" @tap.stop="deselectFunc()">{{ $t('确定') }}</text>
            </view>
            <view class="flex flex-wrap align-center redemptDetails_fd5_0_c1_babdd">
              <text class="redemptDetails_fd5_0_c1_c0_babdd">{{ $t('请选择取消订单原因') }}</text>
            </view>

            <scroll-view class="redemptDetails_fd5_0_c2_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <benben-select-diy
                  ref="showSelectPopup1693558416727"
                  class-text="flex-direction flex"
                  :items.sync="dataMessage"
                  v-model="cancel_id"
                  default-type="aid"
                  default-label="reason"
                  :allow-cancel="true"
                  type="radio"
                  :disabled="false"
                >
                  <benben-select-item v-for="(item, key0) in dataMessage" :hand-value="item.aid" :key="key0">
                    <template #selected>
                      <view class="flex justify-between flex redemptDetails_fd5_0_c2_c0_c0_babdd">
                        <text>{{ item.reason }}</text>
                        <image class="redemptDetails_fd5_0_c2_c0_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
                      </view>
                    </template>
                    <template #no-selected>
                      <view class="flex justify-between flex redemptDetails_fd5_0_c2_c0_c0_babdd">
                        <text>{{ item.reason }}</text>
                        <image class="redemptDetails_fd5_0_c2_c0_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '336.png'"></image>
                      </view>
                    </template>
                  </benben-select-item>
                </benben-select-diy>
              </view>
            </scroll-view>
          </view>
        </view>

        <!---取消订单弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679650134928" :mask="true" :mask-close-able="true" mode="bottom">
        <!---发票弹窗flex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout redemptDetails_flex_6_babdd">
          <view class="flex flex-wrap align-center justify-center redemptDetails_fd6_0_babdd">
            <image class="redemptDetails_fd6_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
            <text class="redemptDetails_fd6_0_c1_babdd">{{ $t('抬头选择') }}</text>
            <image class="redemptDetails_fd6_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            <image
              class="redemptDetails_fd6_0_c3_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '124.png'"
              @tap.stop="popupShow1679650134928 = false"
            ></image>
          </view>

          <scroll-view class="redemptDetails_fd6_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <benben-select-diy
                ref="showSelectPopup1687658365917"
                class-text="flex-direction align-stretch flex"
                :items.sync="invoiceData"
                v-model="invoice_id"
                default-type="aid"
                default-label="username"
                :allow-cancel="true"
                type="radio"
                :disabled="false"
              >
                <benben-select-item v-for="(item, key0) in invoiceData" :hand-value="item.aid" :key="key0">
                  <template #selected>
                    <view class="flex align-center flex redemptDetails_fd6_1_c0_c0_babdd">
                      <image class="redemptDetails_fd6_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub redemptDetails_fd6_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c0_c2_babdd">
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c1_c0_babdd" v-if="item.type == '1'">{{ $t('个人') }}</text>
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd" v-if="item.type != '1'">{{ $t('企业') }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="redemptDetails_fd6_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                  <template #no-selected>
                    <view class="flex align-center flex redemptDetails_fd6_1_c0_c0_babdd">
                      <image class="redemptDetails_fd6_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '128.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub redemptDetails_fd6_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c0_c2_babdd">
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c1_c0_babdd" v-if="item.type == '1'">{{ $t('个人') }}</text>
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd" v-if="item.type != '1'">{{ $t('企业') }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center redemptDetails_fd6_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="redemptDetails_fd6_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="redemptDetails_fd6_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                </benben-select-item>
              </benben-select-diy>
              <benben-empty :list-data="invoiceData">
                <view>
                  <view class="flex flex-direction flex-wrap align-center redemptDetails_fd6_1_c1_babdd">
                    <image class="redemptDetails_fd6_1_c1_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
                  </view>
                </view>
              </benben-empty>
            </view>
          </scroll-view>

          <button
            class="redemptDetails_fd6_2_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fp/applyInvoic/applyInvoic`"
            v-if="invoice_id == ''"
          >
            {{ $t('添加新的抬头') }}
          </button>
          <button class="redemptDetails_fd6_2_babdd" @tap.stop="isokfapiaoFunc()" v-if="invoice_id != ''">{{ $t('确定') }}</button>
          <button class="redemptDetails_fd6_3_babdd" @tap.stop="popupShow1679650134928 = false">{{ $t('不开发票') }}</button>
        </view>

        <!---发票弹窗flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'
import hostAppPayMixin from '@/common/mixin/hostAppPay.js'

export default {
  components: {},
  mixins: [hostAppPayMixin],

  data() {
    return {
      popupShow1679650134928: false,
      popupShow1657247297312: false,
      popupShow1737680677873: false,
      popupShow1763608410324: false,
      popupShow1698806556276: false,
      /** cancelId【取消订单】 **/ cancelId: '',
      /** return_id【取消id】 **/ return_id: '',
      dataList: [],
      dltOrderId: '',
      /** invoice_order_id【发票订单id】 **/ invoice_order_id: '',
      dataAfterList: [],
      /** refundId【售后删除id】 **/ refundId: '',
      kdlb: '',
      kdid: '1',
      /** sender_list【仓库列表】
       *   company_list【快递公司列表】 **/
      dataType: {
        company_list: [],
        sender_list: [],
      },
      key: '',
      sender_name: '',
      sender_id: '',
      order_goods_id: '',
      cut: '1',
      cancel_id: '',
      /** bargain_price【砍掉的价格】
       *   final_status【0未支付尾款 1支付尾款】
       *   deposit【定金金额】
       *   balance_money【预售尾款金额】
       *   final_order_sn【预售订单支付尾款订单编号】
       *   pay_status【支付状态】
       *   goods_total【商品总额】
       *   receive_surplus_time【订单待收货剩余时间】
       *   balance_payment_etime【尾款支付时间2】
       *   balance_payment_stime【尾款支付时间1】
       *   cancel_surplus_second【订单待付款剩余时间：】
       *   real_money【实付金额】
       *   group_user【拼团人员列表】
       *   group_info【拼团活动信息】
       *   status_txt【状态说明】
       *   join_number【拼团总人数【可参加】】
       *   group_members_nums【还差几人拼成】
       *   activity_status【活动状态: 0 待成团 1 拼团成功 2 拼团失败】
       *   join_timeout【拼团结束倒计时(秒)】
       *   discount_str【折扣说明】
       *   is_multiple_package【是否多包裹，如果多包裹查看物流需要先调用包裹列表接口】
       *   btn_list【按钮状态】
       *   pay_balance【支付尾款】
       *   delete_order【删除订单】
       *   evaluate【评价】
       *   confirm_receive【确认收货】
       *   view_logistics【查看物流】
       *   apply_refund【申请售后】
       *   view_invoice【查看发票】
       *   apply_invoice【申请发票】
       *   remind_already【已提醒】
       *   remind_send【提醒发货】
       *   go_pay【去付款】
       *   cancel_order【取消订单】
       *   shop_info【店铺信息】
       *   store_logo_id【商家logo图片ID】
       *   store_logo【商家Logo】
       *   store_name【商家名称】
       *   aid【商家ID】
       *   order_goods_list【订单商品】
       *   order_info【订单信息】
       *   pickup_img【核销码图片】
       *   pickup_code【核销码】
       *   express_price【运费】
       *   label_name【收货地址标签】
       *   sex【收货人性别】
       *   district【收货区】
       *   city【收货市】
       *   province【收货省】
       *   remark【订单备注】
       *   receiver_name【收货人】
       *   receiver_address【收货地址】
       *   receiver_mobile【收货电话】
       *   pay_type_str【支付方式说明】
       *   status【状态;-1:取消;0:待付款;1:已付款;2:已发货;3:已完成;4:已评价 5:售后中  6:已结束(订单所有商品已售后完成)   7:预售待付尾款   预售尾款超时(订单取消)】
       *   pay_type【支付方式】
       *   create_time【下单时间】
       *   discount_money【会员优惠金额】
       *   use_score【使用积分】
       *   order_discount_ratio【抵扣比例（积分：现金）】
       *   order_discount_money【积分抵扣金额】
       *   pay_time【支付时间】
       *   receive_time【收货时间】
       *   send_time【发货时间】
       *   coupon_money【平台优惠券金额】
       *   coupon_id【平台优惠券ID】
       *   payable_money【应付金额】
       *   order_money【订单金额】
       *   order_sn【订单编号】
       *   aid【订单ID】 **/
      dataDetails: {
        aid: '',
        order_sn: '',
        order_money: '',
        payable_money: '',
        coupon_id: '',
        coupon_money: '',
        send_time: '',
        receive_time: '',
        pay_time: '',
        discount_money: '',
        use_score: '',
        order_discount_ratio: '',
        order_discount_money: '',
        create_time: '',
        pay_type: '',
        status: '',
        pay_type_str: '',
        order_info: {
          receiver_mobile: '',
          receiver_address: '',
          receiver_name: '',
          remark: '',
          province: '',
          city: '',
          district: '',
          sex: '',
          label_name: '',
          express_price: '',
          pickup_code: '',
          pickup_img: '',
        },
        order_goods_list: [],
        shop_info: {
          aid: 0,
          store_name: '',
          store_logo: '',
          store_logo_id: 0,
        },
        btn_list: {
          cancel_order: '',
          go_pay: '',
          remind_send: '',
          remind_already: '',
          apply_invoice: '',
          view_invoice: '',
          apply_refund: '',
          view_logistics: '',
          confirm_receive: '',
          evaluate: '',
          delete_order: '',
          pay_balance: '',
        },
        is_multiple_package: 0,
        order_type: '',
        advance_sn: '',
        usermerchant_id: '',
        discount_str: '',
        surplus_receive_time: '',
        group_info: {
          join_timeout: '',
          activity_status: 0,
          group_members_nums: 0,
          join_number: 0,
          status_txt: '',
        },
        group_user: [],
        real_money: '',
        cancel_surplus_second: 0,
        balance_payment_stime: '',
        balance_payment_etime: '',
        receive_surplus_time: '',
        goods_total: '',
        pay_status: '',
        final_order_sn: '',
        balance_money: 0,
        deposit: 0,
        final_status: 0,
        bargain_price: false,
        send_type: '',
        invoice_status: '',
        settle_status: '',
        cancel_surplus_second_end: '',
        order_info_pickup: {
          aid: 0,
          order_sn: '',
          name: '',
          mobile: '',
          remark: '',
          pickuppoint_name: '',
          pickup_code: '',
          pickup_img: '',
          create_time: '',
          orderpickup_aid: 0,
          userpickup_id: 0,
          pickuppoint_contact_information: '',
          pickuppoint_logo: '',
          pickuppoint_address_detailed: '',
          pickuppoint_aid: 0,
        },
      },
      dataMessage: [],
      invoiceData: [],
      /** invoice_id【发票id】 **/ invoice_id: '',
      text: '1',
      money: 0,
      daojishi: 86400,
      shopType: '',
      order_id: '12192',
      order_sn: '',
      type: '',
      id: '10918',
      order_type: '3',
      usermerchant_id: '24',
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
  watch: {},
  onLoad(options) {
    let { order_id, order_sn, type, id, order_type, usermerchant_id } = options
    if (order_id !== undefined) this.order_id = order_id
    if (order_sn !== undefined) this.order_sn = order_sn
    if (type !== undefined) this.type = type
    if (id !== undefined) this.id = id
    if (order_type !== undefined) this.order_type = order_type
    if (usermerchant_id !== undefined) this.usermerchant_id = usermerchant_id
    this.getShopDataFunc()
    this.setupHostAppPaySuccess()
  },
  onUnload() {
    this.teardownHostAppPaySuccess()
  },
  onReady() {},
  onShow() {
    this.queryHeadipFunc()
    this.getCancelTypeFunc()
    this.getDetailFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //预下单-查询发票抬头
    async queryHeadipFunc() {
      //请求方法
      //数据验证

      let datainvoiceData = await this.$api.post(global.apiUrls.post641848d371e2f, {})

      if (datainvoiceData.data.code != 1) {
        this.$message.info(datainvoiceData.data.msg)
        return
      }
      let infoinvoiceData = datainvoiceData.data
      this.invoiceData = infoinvoiceData.data

      this.invoice_id = ''
    },
    //使用发票
    async isokfapiaoFunc() {
      //请求方法
      //数据验证

      let data641ebe3244065 = await this.$api.dbPost(global.apiUrls.post641ebe3244065, {
        order_id: this.order_id,
        invoice_header_id: this.invoice_id,
      })
      if (!data641ebe3244065) return
      if (data641ebe3244065.data.code != 1) {
        this.$message.info(data641ebe3244065.data.msg)
        return
      }
      let info641ebe3244065 = data641ebe3244065.data

      uni.showToast({
        title: this.$t('申请成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.popupShow1679650134928 = false
      this.invoice_id = ''
      this.getDetailFunc()
      uni.$emit('shenqingchengg', this.text)
    },
    //删除订单
    async deleteOrderFunc() {
      //请求方法
      //数据验证

      let data6447c3b69f234 = await this.$api.dbGet(global.apiUrls.post6447c3b69f234, {
        order_id: this.order_id,
      })
      if (!data6447c3b69f234) return
      if (data6447c3b69f234.data.code != 1) {
        this.$message.info(data6447c3b69f234.data.msg)
        return
      }
      let info6447c3b69f234 = data6447c3b69f234.data

      this.popupShow1698806556276 = false
      setTimeout(() => {
        uni.showToast({
          title: this.$t('删除成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }, 200)
      uni.$emit('shenqingchengg', this.text)
      setTimeout(() => {
        this.$urouter.navigateBack(1)
      }, 500)
    },
    //订单-订单详情
    async getDetailFunc() {
      //请求方法
      //数据验证

      let datadataDetails = await this.$api.post(global.apiUrls.post62c92b9d5ada3, {
        order_id: this.order_id,
        order_type: '3',
      })

      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data

      if (this.dataDetails.order_info == null) {
        this.dataDetails.order_info = {
          remark: '',
        }
      }
    },
    //取消订单
    async cancelOrderFunc() {
      //请求方法
      //数据验证

      let data62cb8b8438141 = await this.$api.dbPost(global.apiUrls.post62cb8b8438141, {
        order_id: this.dataDetails.aid,
        return_id: this.cancel_id,
      })
      if (!data62cb8b8438141) return
      if (data62cb8b8438141.data.code != 1) {
        this.$message.info(data62cb8b8438141.data.msg)
        return
      }
      let info62cb8b8438141 = data62cb8b8438141.data

      this.popupShow1737680677873 = false
      uni.showToast({
        title: this.$t('取消成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      uni.$emit('shenqingchengg', this.text)
      this.getDetailFunc()
    },
    //获取取消订单状态
    async getCancelTypeFunc() {
      //请求方法
      //数据验证

      let datadataMessage = await this.$api.get(global.apiUrls.post641ae6544d2d5, {
        type: '2',
        sort_type: 'desc',
      })

      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.dataMessage = infodataMessage.data
    },
    //提现发货
    async remindShopFunc() {
      //请求方法
      //数据验证

      let data62bec4f86725d = await this.$api.dbPost(global.apiUrls.post62bec4f86725d, {
        order_id: this.dataDetails.aid,
      })
      if (!data62bec4f86725d) return
      if (data62bec4f86725d.data.code != 1) {
        this.$message.info(data62bec4f86725d.data.msg)
        return
      }
      let info62bec4f86725d = data62bec4f86725d.data

      uni.showToast({
        title: this.$t('提醒成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      uni.$emit('shenqingchengg', this.text)
      this.getDetailFunc()
    },
    //确认收货
    async confirmReceiptFunc() {
      //请求方法
      //数据验证

      let data64218bff49e61 = await this.$api.dbPost(global.apiUrls.post64218bff49e61, {
        order_id: this.dataDetails.aid,
      })
      if (!data64218bff49e61) return
      if (data64218bff49e61.data.code != 1) {
        this.$message.info(data64218bff49e61.data.msg)
        return
      }
      let info64218bff49e61 = data64218bff49e61.data

      uni.showToast({
        title: this.$t('收货成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.popupShow1763608410324 = false
      uni.$emit('shenqingchengg', this.text)
      this.getDetailFunc()
    },
    //是否多包裹
    isMultiplePackagesFunc(type) {
      if (type == '1') {
        this.$urouter.navigateTo(`/pages/ddgl/multiplePackages/multiplePackages?order_id=${this.dataDetails.aid}`)
      } else if (type == 0) {
        this.$urouter.navigateTo(`/pages/ddgl/logisticsCheck/logisticsCheck?order_id=${this.dataDetails.aid}`)
      }
    },
    //跳转售后详情
    gotoreturnFuncFunc(aid, refund_id, view_refund_list) {
      if (view_refund_list == 0) {
        this.$urouter.navigateTo(`/pages/ddgl/detailsRefund/detailsRefund?id=${refund_id}`)
      } else {
        this.$urouter.navigateTo(`/pages/ddgl/refundList/refundList?order_goods_id=${aid}`)
      }
    },
    //跳转商品详情
    goShopDetailFunc(good_id, sku_id, activity_id) {
      if (this.dataDetails.order_type == '7') {
        this.$urouter.navigateTo(`/pages/sy/merchandiseDetails/merchandiseDetails?goods_id=${good_id}&activity_id=${activity_id}&sku_id=${sku_id}`)
      } else if (this.dataDetails.order_type == '5') {
        this.$urouter.navigateTo(`/pages/sy/listDetailsGoods/listDetailsGoods?goods_id=${good_id}&activity_id=${activity_id}&sku_id=${sku_id}`)
      } else if (this.dataDetails.order_type == '9') {
        this.$urouter.navigateTo(`/pages/sy/offersDetails/offersDetails?goods_id=${good_id}&activity_id=${activity_id}&sku_id=${sku_id}`)
      } else if (this.dataDetails.order_type == '6') {
        this.$urouter.navigateTo(
          `/pages/sy/killMerchandiseDetails/killMerchandiseDetails?goods_id=${good_id}&activity_id=${activity_id}&sku_id=${sku_id}`,
        )
      } else if (this.dataDetails.order_type == '10') {
        this.$urouter.navigateTo(`/pages/sy/goodsDetailsBargain/goodsDetailsBargain?goods_id=${good_id}&activity_id=${activity_id}&sku_id=${sku_id}`)
      } else {
        this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${good_id}`)
      }
    },
    //单多融合
    async getShopDataFunc() {
      let datashopType = await this.$api.post(global.apiUrls.post6758eb9165329, {
        path: 'pages/ddgl/redemptDetails/redemptDetails',
      })

      if (datashopType.data.code != 1) {
        this.$message.info(datashopType.data.msg)
        return
      }
      let infoshopType = datashopType.data
      this.shopType = infoshopType.data
    },
    //取消二次确认
    deselectFunc() {
      if (!validate(this.cancel_id, 'require')) {
        this.$message.info(global.i18n.t('请选择取消原因'))
        return false
      }
      this.popupShow1657247297312 = false
      this.popupShow1737680677873 = true
    },
    // 去付款（与 directOrder 提交后支付跳转逻辑一致）
    async goPayFunc() {
      const orderSn = this.dataDetails.order_sn
      if (!orderSn) return
      await this.proceedHostAppPay({
        orderSn,
        amount: this.dataDetails.payable_money,
        orderType: 3,
        source: 'redemptDetails',
        offerPayExtra: 'order_type=3&payPath=1',
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
  background: url(#{image-path('449.png')
  }) no-repeat;
  background-size: 100% 450rpx;

  .redemptDetails_flex_6_babdd {
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    background: #ffffff;
    padding: 41rpx 24rpx 40rpx 24rpx;

    .redemptDetails_fd6_0_babdd {
      position: relative;

      .redemptDetails_fd6_0_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 36rpx;
        font-weight: 500;
        line-height: 50rpx;
        margin: 0rpx 24rpx 0rpx 24rpx;
      }

      .redemptDetails_fd6_0_c3_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        position: absolute;
        top: -16rpx;
        right: 0rpx;
      }
    }

    .redemptDetails_fd6_1_babdd {
      touch-action: none;
      height: 40vh;
      width: 702rpx;

      .redemptDetails_fd6_1_c1_babdd {
        width: 100%;
        padding: 50rpx 0rpx 50rpx 0rpx;

        .redemptDetails_fd6_1_c1_c0_babdd {
          width: 400rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }
      }
    }

    .redemptDetails_fd6_3_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 686rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin: 0rpx 8rpx 0rpx 8rpx;
    }
  }

  .redemptDetails_fd6_0_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #f8f8f8;
    padding: 32rpx 32rpx 32rpx 32rpx;
    margin: 32rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 32rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c0_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-width: 400rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 16rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c0_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd {
    color: #b82441;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_babdd {
    margin: 16rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 0rpx 0rpx 10rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_c0_c1_babdd {
    margin: 8rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_c1_c0_babdd {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .redemptDetails_fd6_1_c0_c0_c1_c1_c1_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .redemptDetails_fd6_2_babdd {
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
    width: 686rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 56rpx 8rpx 24rpx 8rpx;
  }

  .redemptDetails_flex_5_babdd {
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;

    .redemptDetails_fd5_0_babdd {
      border-radius: 24rpx 24rpx 0rpx 0rpx;

      .redemptDetails_fd5_0_c0_babdd {
        padding: 32rpx 32rpx 32rpx 32rpx;

        .redemptDetails_fd5_0_c0_c0_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor2);
          line-height: 40rpx;
        }

        .redemptDetails_fd5_0_c0_c1_babdd {
          font-size: 36rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
        }

        .redemptDetails_fd5_0_c0_c2_babdd {
          font-size: 28rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          line-height: 40rpx;
        }
      }

      .redemptDetails_fd5_0_c1_babdd {
        background: #f8f8f8;

        .redemptDetails_fd5_0_c1_c0_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
          margin: 25rpx 24rpx 25rpx 24rpx;
        }
      }

      .redemptDetails_fd5_0_c2_babdd {
        touch-action: none;
        width: 686rpx;
        height: 40vh;
        margin: 0rpx auto 40rpx auto;
      }
    }
  }

  .redemptDetails_fd5_0_c2_c0_c0_babdd {
    padding: 20rpx 0rpx 20rpx 0rpx;
  }

  .redemptDetails_fd5_0_c2_c0_c0_c1_babdd {
    width: 32rpx;
    height: 32rpx;
  }

  .redemptDetails_flex_4_babdd {
    background: var(--benbenbgColor1);
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .redemptDetails_fd4_0_babdd {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 32rpx;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 40rpx 0rpx;
    }

    .redemptDetails_fd4_1_babdd {
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      text-align: center;
    }

    .redemptDetails_fd4_2_babdd {
      margin: 40rpx 0rpx 0rpx 0rpx;
      border-top: 1px solid #eee;

      .redemptDetails_fd4_2_c0_babdd {
        line-height: 110rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        font-weight: 500;
        width: 270rpx;
      }

      .redemptDetails_fd4_2_c1_babdd {
        line-height: 110rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        font-weight: 500;
        width: 269rpx;
        border-left: 1px solid #eee;
      }
    }
  }

  .redemptDetails_flex_3_babdd {
    padding: 5rpx 24rpx 32rpx 24rpx;
    margin: 0rpx 0rpx 88rpx 0rpx;

    .redemptDetails_fd3_0_babdd {
      padding: 12rpx 0rpx 0rpx 0rpx;

      .redemptDetails_fd3_0_c0_c0_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor3);
      }

      .redemptDetails_fd3_0_c0_c3_babdd {
        color: var(--benbenFontColor3);
        font-size: 24rpx;
        font-weight: 400;
        line-height: 33rpx;
        margin: 8rpx 0rpx 0rpx 0rpx;
      }
    }

    .redemptDetails_fd3_1_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      margin: 32rpx 0rpx 12rpx 0rpx;
      padding: 40rpx 21rpx 40rpx 24rpx;

      .redemptDetails_fd3_1_c0_babdd {
        width: 60rpx;
        height: 60rpx;
      }

      .redemptDetails_fd3_1_c1_babdd {
        margin: 0rpx 0rpx 0rpx 24rpx;

        .redemptDetails_fd3_1_c1_c0_c0_babdd {
          border-radius: 8rpx 8rpx 8rpx 8rpx;
          background: var(--benbenbtnColor0);
          padding: 1rpx 16rpx 0rpx 16rpx;
          font-size: 23rpx;
          font-weight: 500;
          color: var(--benbenFontColor3);
        }

        .redemptDetails_fd3_1_c1_c0_c1_babdd {
          font-size: 32rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          margin: 0rpx 0rpx 0rpx 16rpx;
          max-width: 200rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          line-height: 40rpx;
        }

        .redemptDetails_fd3_1_c1_c0_c2_babdd {
          font-size: 32rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          margin: 0rpx 0rpx 0rpx 16rpx;
          line-height: 40rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .redemptDetails_fd3_1_c1_c1_babdd {
          margin: 19rpx 0rpx 0rpx 0rpx;

          .redemptDetails_fd3_1_c1_c1_c0_babdd {
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }
      }

      .redemptDetails_fd3_1_c2_babdd {
        width: 14rpx;
        height: 26rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 24rpx;
      }
    }

    .redemptDetails_fd3_2_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 32rpx 24rpx 32rpx 24rpx;
      background: #fff;
      background-size: 100% auto !important;
      margin: 12rpx 0rpx 12rpx 0rpx;

      .redemptDetails_fd3_2_c0_babdd {
        padding: 0rpx 0rpx 32rpx 0rpx;
        border-bottom: 1px solid #eee;

        .redemptDetails_fd3_2_c0_c1_babdd {
          margin: 24rpx 0rpx 0rpx 0rpx;

          .redemptDetails_fd3_2_c0_c1_c0_babdd {
            border-radius: 28rpx 28rpx 28rpx 28rpx;
            font-size: 24rpx;
            background: var(--benbenbtnColor3);
            color: var(--benbenFontColor0);
            width: 144rpx;
            height: 56rpx;
            margin: 0rpx 0rpx 0rpx 24rpx;
          }

          .redemptDetails_fd3_2_c0_c1_c1_babdd {
            border-radius: 28rpx 28rpx 28rpx 28rpx;
            font-size: 24rpx;
            background: var(--benbenbtnColor3);
            color: var(--benbenFontColor0);
            height: 56rpx;
            margin: 0rpx 0rpx 0rpx 24rpx;
            padding: 0rpx 20rpx 0rpx 20rpx;
          }
        }
      }

      .redemptDetails_fd3_2_c1_babdd {
        margin: 32rpx 0rpx 32rpx 0rpx;
      }
    }

    .redemptDetails_fd3_3_babdd {
      background: #fff;
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 32rpx 24rpx 32rpx 24rpx;
      margin: 12rpx 0rpx 100rpx 0rpx;

      .redemptDetails_fd3_3_c0_babdd {
        padding: 0rpx 0rpx 24rpx 0rpx;
        border-bottom: 1px solid #eee;
        margin: 0rpx 0rpx 0rpx 0rpx;

        .redemptDetails_fd3_3_c0_c0_babdd {
          width: 6rpx;
          height: 30rpx;
          background: var(--benbenbgColor3);
          margin: 0rpx 15rpx 0rpx 0rpx;
          transform: scaleX(0.5);
        }

        .redemptDetails_fd3_3_c0_c1_babdd {
          font-size: 32rpx;
          font-weight: 500;
          color: var(--benbenFontColor0);
        }
      }

      .redemptDetails_fd3_3_c2_babdd {
        line-height: 34rpx;
        margin: 32rpx 0rpx 0rpx 0rpx;

        .redemptDetails_fd3_3_c2_c1_babdd {
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
          margin: 0rpx 43rpx 0rpx 0rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .redemptDetails_fd3_3_c2_c2_babdd {
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor4);
        }
      }
    }

    .redemptDetails_fd3_4_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      position: fixed;
      bottom: calc(0rpx + var(--benben-window-bottom, 0px));
      width: 750rpx;
      left: 0rpx;
      padding: 12rpx 24rpx 12rpx 24rpx;
    }
  }

  .redemptDetails_fd3_0_c0_c0_1_babdd {
    font-size: 32rpx;
    font-weight: 700;
    color: #ffffff;
  }

  .redemptDetails_fd3_0_c0_c1_babdd {
    margin: 8rpx 0rpx 0rpx 0rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #fff;
  }

  .redemptDetails_fd3_0_c0_c1_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor3);
  }

  .redemptDetails_fd3_0_c0_c1_c1_babdd {
    background: transparent;
  }

  .redemptDetails_fd3_0_c1_babdd {
    width: 140rpx;
    height: 140rpx;
  }

  .redemptDetails_fd3_1_c1_c1_c0_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 5rpx 0rpx 0rpx;
  }

  .redemptDetails_fd3_1_c1_c1_c0_c3_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .redemptDetails_fd3_2_c0_c0_babdd {
    margin: 32rpx 0rpx 0rpx 0rpx;

    .redemptDetails_fd3_2_c0_c0_c0_babdd {
      width: 200rpx;
      height: 200rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
    }

    .redemptDetails_fd3_2_c0_c0_c1_babdd {
      margin: 0rpx 0rpx 0rpx 34rpx;

      .redemptDetails_fd3_2_c0_c0_c1_c0_babdd {
        font-size: 28rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 42rpx;
      }

      .redemptDetails_fd3_2_c0_c0_c1_c1_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
        margin: 8rpx 0rpx auto 0rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 33rpx;
      }

      .redemptDetails_fd3_2_c0_c0_c1_c2_c0_c0_babdd {
        color: var(--benbenFontColor0);
        font-size: 20rpx;
        font-weight: 700;
        line-height: 30rpx;
        margin: 4rpx 0rpx 0rpx 0rpx;
      }

      .redemptDetails_fd3_2_c0_c0_c1_c2_c0_c1_babdd {
        color: var(--benbenFontColor0);
        font-weight: 600;

        .redemptDetails_price1_fd3_2_c0_c0_c1_c2_c0_c1_babdd {
          font-size: 32rpx;
        }
      }

      .redemptDetails_fd3_2_c0_c0_c1_c2_c1_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }
    }
  }

  .redemptDetails_price2_fd3_2_c0_c0_c1_c2_c0_c1_babdd {
    font-size: 28rpx;
  }

  .redemptDetails_fd3_2_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    margin: 0rpx auto 0rpx 0rpx;
  }

  .redemptDetails_fd3_2_c1_c1_babdd {
    font-size: 28rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    line-height: 42rpx;
  }

  .redemptDetails_fd3_2_c1_c2_babdd {
    color: var(--benbenFontColor0);
    font-weight: 700;
    font-size: 28rpx;
    line-height: 42rpx;
  }

  .redemptDetails_fd3_2_c2_babdd {
    margin: 0rpx 0rpx 32rpx 0rpx;
  }

  .redemptDetails_fd3_2_c3_c1_1_babdd {
    font-size: 28rpx;
    font-weight: 700;
    color: #333333;
    line-height: 42rpx;
  }

  .redemptDetails_fd3_2_c6_babdd {
    padding: 32rpx 0rpx 0rpx 0rpx;
    border-top: 1px solid #eee;

    .redemptDetails_fd3_2_c6_c0_1_babdd {
      font-size: 24rpx;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin: 0rpx 8rpx 0rpx 0rpx;
    }

    .redemptDetails_fd3_2_c6_c2_1_babdd {
      color: rgba(250, 32, 51, 1);
      font-weight: 700;
      font-size: 22rpx;
    }
  }

  .redemptDetails_fd3_2_c6_c0_babdd {
    font-size: 24rpx;
    font-weight: 500;
    color: var(--benbenFontColor1);
    margin: 0rpx 8rpx 0rpx 0rpx;
  }

  .redemptDetails_fd3_2_c6_c1_babdd {
    font-size: 20rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
  }

  .redemptDetails_fd3_2_c6_c2_babdd {
    color: var(--benbenFontColor0);
    font-weight: 700;
    font-size: 22rpx;

    .redemptDetails_price1_fd3_2_c6_c2_babdd {
      font-size: 40rpx;
      color: var(--benbenFontColor0);
    }

    .redemptDetails_price2_fd3_2_c6_c2_babdd {
      font-size: 22rpx;
      color: var(--benbenFontColor0);
    }
  }

  .redemptDetails_fd3_2_c7_c0_babdd {
    margin: 0rpx 0rpx 24rpx 0rpx;
  }

  .redemptDetails_price1_fd3_2_c7_c0_c2_babdd {
    font-size: 40rpx;
  }

  .redemptDetails_price2_fd3_2_c7_c0_c2_babdd {
    font-size: 22rpx;
  }

  .redemptDetails_fd3_3_c1_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    width: 200rpx;
  }

  .redemptDetails_fd3_3_c1_c1_babdd {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .redemptDetails_fd3_3_c1_c1_1_babdd {
    color: #333333;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .redemptDetails_fd3_3_c2_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    width: 200rpx;
  }

  .redemptDetails_fd3_3_c3_c1_c2_babdd {
    color: var(--benbenFontColor0);
    font-weight: 400;
    font-size: 24rpx;
  }

  .redemptDetails_price1_fd3_3_c3_c1_c2_babdd {
    font-size: 24rpx;
  }

  .redemptDetails_fd3_3_c3_c2_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-width: 150rpx;
  }

  .redemptDetails_fd3_4_c0_c0_babdd {
    border-radius: 50rpx 50rpx 50rpx 50rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor0);
    width: 170rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 400;
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .redemptDetails_fd3_4_c0_c1_babdd {
    border-radius: 30rpx 30rpx 30rpx 30rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor0);
    width: 170rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 400;
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .redemptDetails_fd3_4_c0_c2_babdd {
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
    width: 170rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 400;
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .redemptDetails_fd3_4_c0_c3_babdd {
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
    height: 60rpx;
    line-height: 60rpx;
    font-weight: 400;
    margin: 0rpx 0rpx 0rpx 24rpx;
    padding: 0rpx 35rpx 0rpx 35rpx;
  }

  .redemptDetails_fd2_0_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    width: 540rpx;

    .redemptDetails_fd2_0_c0_babdd {
      color: #333333;
      font-size: 36rpx;
      font-weight: 800;
      text-align: center;
      margin: 40rpx 0rpx 32rpx 0rpx;
    }

    .redemptDetails_fd2_0_c1_babdd {
      color: #333333;
      font-size: 32rpx;
      font-weight: 400;
      text-align: center;
      width: 448rpx;
      margin: 0rpx 0rpx 0rpx 40rpx;
    }

    .redemptDetails_fd2_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 32rpx 0rpx 0rpx 0rpx;
      line-height: 95rpx;

      .redemptDetails_fd2_0_c2_c0_babdd {
        font-size: 34rpx;
        background: #fff;
        color: #999999;
        width: 270rpx;
        height: 95rpx;
        line-height: 95rpx;
        font-weight: 400;
        border-right: 1px solid #eee;
      }

      .redemptDetails_fd2_0_c2_c1_babdd {
        font-size: 34rpx;
        background: var(--benbenbgColor1);
        color: var(--benbenFontColor0);
        width: 270rpx;
        height: 95rpx;
        line-height: 95rpx;
        font-weight: 400;
      }
    }
  }

  .redemptDetails_flex_1_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .redemptDetails_fd1_0_babdd {
      font-size: 36rpx;
      font-weight: 800;
      line-height: 44rpx;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 40rpx 0rpx;
    }

    .redemptDetails_fd1_1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
    }

    .redemptDetails_fd1_2_babdd {
      margin: 37rpx 0rpx 0rpx 0rpx;

      .redemptDetails_fd1_2_c0_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        border-top: 1px solid var(--benbenbdColor0);
        width: 269rpx;
      }

      .redemptDetails_fd1_2_c1_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        border-top: 1px solid var(--benbenbdColor0);
        border-left: 1px solid var(--benbenbdColor0);
        width: 269rpx;
      }
    }
  }

  .redemptDetails_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: url(#{image-path('449.png')
  }) no-repeat;
    background-size: 100% auto !important;

    .redemptDetails_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .redemptDetails_fd0_0_c0_babdd {
        width: 200rpx;

        .redemptDetails_fd0_0_c0_c0_babdd {
          font-size: 36rpx;
          color: var(--benbeniconColor4);
          font-weight: 500;
        }
      }

      .redemptDetails_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: var(--benbenFontColor3);
      }

      .redemptDetails_fd0_0_c2_babdd {
        padding: 0rpx 0rpx 0rpx 0rpx;
        width: 200rpx;
      }
    }
  }
}
</style>
