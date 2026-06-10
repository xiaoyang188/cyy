<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex directOrder_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center justify-between flex-sub directOrder_fd0_0_babdd">
          <view class="flex flex-wrap align-center directOrder_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 directOrder_fd0_0_c0_c0_babdd">&#xe794;</text>
          </view>
          <text class="directOrder_fd0_0_c1_babdd">{{ $t('确认订单') }}</text>
          <view class="flex flex-wrap align-center directOrder_fd0_0_c0_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---无地址flex布局开始-->
      <view
        class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_2_babdd"
        v-if="disType == 0 && dataEssayMessage.has_address != '1'"
        @tap.stop="handleJumpDiy"
        data-type="navigateTo"
        :data-url="`/pages/wd/address/address?is_change=1`"
      >
        <view class="flex flex-wrap align-center justify-center flex-sub directOrder_fd2_0_babdd">
          <image class="directOrder_fd2_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
          <text class="directOrder_fd2_0_c1_babdd">{{ $t('添加收货地址') }}</text>
        </view>
      </view>

      <!---无地址flex布局结束-->
      <!---购物车结算flex布局开始-->
      <view
        class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_3_babdd"
        v-if="disType == 0 && dataEssayMessage.has_address == '1'"
        @tap.stop="handleJumpDiy"
        data-type="navigateTo"
        :data-url="`/pages/wd/address/address?is_change=1`"
      >
        <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd3_0_babdd">
          <view class="flex flex-wrap align-center directOrder_fd3_0_c0_babdd">
            <image class="directOrder_fd3_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd3_0_c0_c1_babdd">
              <view class="flex align-center directOrder_fd3_0_c0_c1_c0_babdd">
                <text class="directOrder_fd3_0_c0_c1_c0_c0_babdd">{{ dataEssayMessage.address.label_name }}</text>
                <text class="directOrder_fd3_0_c0_c1_c0_c1_babdd">{{ dataEssayMessage.address.real_name }}</text>
                <text class="directOrder_fd3_0_c0_c1_c0_c2_babdd">(</text>
                <text class="directOrder_fd3_0_c0_c1_c0_c2_babdd" v-if="dataEssayMessage.address.sex == '1'">{{ $t('先生') }}</text>
                <text class="directOrder_fd3_0_c0_c1_c0_c3_1_babdd" v-if="dataEssayMessage.address.sex != '1'">{{ $t('女士') }}</text>
                <text class="directOrder_fd3_0_c0_c1_c0_c2_babdd">)</text>
                <text class="flex-sub directOrder_fd3_0_c0_c1_c0_c5_babdd">{{ dataEssayMessage.address.mobile }}</text>
              </view>
              <view class="flex align-center">
                <view class="flex flex-wrap align-center flex-sub">
                  <view class="directOrder_fd3_0_c0_c1_c1_c0_c0_babdd">
                    <text class="flex-sub directOrder_fd3_0_c0_c1_c1_c0_c0_c0_babdd">{{ dataEssayMessage.address.province }}</text>
                    <text class="flex-sub directOrder_fd3_0_c0_c1_c1_c0_c0_c0_babdd">{{ dataEssayMessage.address.city }}</text>
                    <text class="flex-sub directOrder_fd3_0_c0_c1_c1_c0_c0_c0_babdd">{{ dataEssayMessage.address.district }}</text>
                    <text class="flex-sub directOrder_fd3_0_c0_c1_c1_c0_c0_c0_babdd">{{ dataEssayMessage.address.detail }}</text>
                  </view>
                </view>
              </view>
            </view>
            <image class="self-center directOrder_fd3_0_c0_c2_babdd" mode="aspectFit" :src="STATIC_URL + '74.png'"></image>
          </view>
          <view class="flex flex-wrap align-center flex-sub">
            <view class="flex flex-wrap align-center flex-sub directOrder_fd3_0_c1_c0_babdd"></view>
          </view>
        </view>
      </view>

      <!---购物车结算flex布局结束-->
      <!---结算信息flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_4_babdd">
        <template v-for="(item, key0) in dataEssayMessage.list">
          <view class="flex flex-direction flex-wrap align-stretch directOrder_fd4_0_babdd" :key="key0">
            <template v-for="(child, key1) in item.goods">
              <view class="flex flex-direction align-stretch" :key="key1">
                <view class="flex flex-wrap align-center directOrder_fd4_0_c0_c0_babdd">
                  <image class="directOrder_fd4_0_c0_c0_c0_babdd" mode="aspectFill" :src="child.thumb"></image>
                  <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                    <text class="directOrder_fd4_0_c0_c0_c1_c0_babdd">{{ child.name }}</text>
                    <text class="directOrder_fd4_0_c0_c0_c1_c1_babdd">{{ child.key_name }}</text>
                    <view class="flex flex-wrap align-center" v-if="package_id == ''">
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c0_babdd">{{ $t('￥') }}</text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c1_babdd">
                        <text>{{ child.shop_price | frontPrice }}</text>
                        <text class="directOrder_price2_fd4_0_c0_c0_c1_c2_c1_babdd">{{ child.shop_price | laterPrice }}</text>
                      </text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c2_babdd">x</text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c3_babdd">{{ child.number }}</text>
                    </view>
                    <view class="flex flex-wrap align-center" v-if="package_id != ''">
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c0_babdd">{{ $t('￥') }}</text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c1_babdd">
                        <text>{{ child.member_price | frontPrice }}</text>
                        <text class="directOrder_price2_fd4_0_c0_c0_c1_c2_c1_babdd">{{ child.member_price | laterPrice }}</text>
                      </text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c2_babdd">x</text>
                      <text class="directOrder_fd4_0_c0_c0_c1_c2_c3_babdd">{{ child.number }}</text>
                    </view>
                  </view>
                </view>
                <view class="flex flex-wrap align-center directOrder_fd4_0_c0_c0_babdd" v-if="child.reason && cartid">
                  <text class="directOrder_fd4_0_c0_c1_c0_babdd">{{ $t('温馨提示：') }}</text>
                  <text class="directOrder_fd4_0_c0_c1_c1_babdd">{{ child.reason }}</text>
                  <text class="directOrder_fd4_0_c0_c1_c2_babdd" @tap.stop="dltGoodsFunc(child.goods_id, child.cart_id)">{{ $t('移除') }}</text>
                </view>
              </view>
            </template>

            <view class="flex flex-wrap align-center directOrder_fd4_0_c1_babdd">
              <text class="directOrder_fd4_0_c0_c1_c0_babdd">{{ $t('商品总额') }}</text>
              <text class="directOrder_fd4_0_c1_c1_babdd">{{ $t('￥') }}</text>
              <text class="directOrder_fd4_0_c1_c2_babdd">
                <text>{{ item.goods_money | frontPrice }}</text>
                <text>{{ item.goods_money | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center directOrder_fd4_0_c2_babdd" @tap.stop="openPopupShowFunc(item)">
              <text class="directOrder_fd4_0_c2_c0_babdd">{{ $t('发票') }}</text>
              <text class="directOrder_fd4_0_c2_c1_babdd" v-if="!invoice_list[item.shop_info.aid].invoice_id">{{ $t('不开发票') }}</text>
              <text class="directOrder_fd4_0_c2_c2_babdd" v-if="invoice_list[item.shop_info.aid].invoice_id">
                {{ invoice_list[item.shop_info.aid].invoice_name || username }}
              </text>
              <image class="directOrder_fd4_0_c2_c3_babdd" mode="aspectFit" :src="STATIC_URL + '273.png'"></image>
            </view>
            <view class="flex flex-wrap align-center directOrder_fd4_0_c2_babdd" @tap="getExplainFunc(item.freight_explain)">
              <text class="directOrder_fd4_0_c0_c1_c0_babdd">{{ $t('运费') }}</text>
              <text class="directOrder_fd4_0_c3_c1_babdd" v-if="dataEssayMessage.express_price == 0">{{ $t('包邮') }}</text>
              <view class="flex flex-wrap align-center directOrder_fd4_0_c3_c2_babdd" v-if="dataEssayMessage.express_price != 0">
                <text class="directOrder_fd4_0_c3_c1_babdd">{{ $t('￥') }}</text>
                <text class="directOrder_fd4_0_c3_c1_babdd">{{ item.express_price }}</text>
              </view>
              <image class="directOrder_fd4_0_c2_c3_babdd" mode="aspectFit" :src="STATIC_URL + '273.png'"></image>
            </view>
            <view class="flex flex-wrap align-center directOrder_fd4_0_c2_babdd">
              <text class="directOrder_fd4_0_c0_c1_c0_babdd">{{ $t('留言') }}</text>
              <benben-input
                class="flex-sub directOrder_fd4_0_c4_c1_babdd"
                type="text"
                :placeholder="$t('建议留言前先与商家沟通确认')"
                confirm-type="done"
                :maxlength="45"
                placeholder-style="color:var(--benbenFontColor1);font-size:28rpx"
                v-model="remark_list[item.shop_info.aid].remark"
              />
            </view>
            <view class="flex flex-wrap align-center justify-end directOrder_fd4_0_c0_c0_babdd">
              <text class="directOrder_fd4_0_c5_c0_babdd">{{ $t('共') }}</text>
              <text class="directOrder_fd4_0_c5_c0_babdd">{{ item.goods_num }}</text>
              <text class="directOrder_fd4_0_c5_c0_babdd">{{ $t('件合计:') }}</text>
              <text class="directOrder_fd4_0_c5_c3_babdd">{{ $t('￥') }}</text>
              <text class="directOrder_fd4_0_c5_c4_babdd">
                <text>{{ item.shop_money | frontPrice }}</text>
                <text class="directOrder_price2_fd4_0_c0_c0_c1_c2_c1_babdd">{{ item.shop_money | laterPrice }}</text>
              </text>
            </view>
          </view>
        </template>
      </view>

      <!---结算信息flex布局结束-->
      <benben-popup v-model="popupShow1663558318653" :mask="true" :mask-close-able="true" mode="bottom">
        <!---运费弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_5_babdd">
          <view class="flex flex-wrap align-center directOrder_fd5_0_babdd">
            <view class="flex flex-wrap align-center directOrder_fd5_0_c0_babdd"></view>
            <image class="directOrder_fd5_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
            <text class="directOrder_fd5_0_c2_babdd">{{ $t('运费说明') }}</text>
            <image class="directOrder_fd5_0_c3_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            <image
              class="directOrder_fd5_0_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '93.png'"
              @tap.stop="popupShow1663558318653 = false"
            ></image>
          </view>

          <scroll-view class="directOrder_fd5_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <text class="directOrder_fd5_1_c0_babdd">{{ freight_explain }}</text>
            </view>
          </scroll-view>
        </view>

        <!---运费弹窗flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout directOrder_flex_6_babdd">
        <view class="directOrder_coupon-section_babdd">
          <view class="flex flex-wrap align-center justify-between directOrder_coupon-head_babdd">
            <text class="directOrder_fd6_0_c0_babdd">{{ $t('优惠券') }}</text>
            <view class="flex align-stretch directOrder_fd6_0_c4_babdd" v-if="coupon_id != '' && Number(dataEssayMessage.coupon_money) > 0">
              <view class="flex flex-wrap align-center">
                <image class="directOrder_fd6_0_c4_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '825.png'"></image>
              </view>
              <view class="flex flex-wrap align-center directOrder_fd6_0_c4_c1_babdd">
                <text class="directOrder_fd6_0_c4_c1_c0_babdd">{{ $t('已减') }}</text>
                <text class="directOrder_fd6_0_c4_c1_c0_babdd">{{ dataEssayMessage.coupon_money }}</text>
                <text class="directOrder_fd6_0_c4_c1_c0_babdd">{{ $t('元') }}</text>
              </view>
            </view>
          </view>
          <text class="directOrder_coupon-empty_babdd" v-if="couponType.length == 0">{{ $t('暂无可用优惠劵') }}</text>
          <view class="directOrder_coupon-grid_babdd" v-else>
            <view class="directOrder_coupon-grid-col_babdd" @tap.stop="isokduoshopidFunc({}, 'remove')">
              <view class="directOrder_coupon-card_babdd" :class="{ 'directOrder_coupon-card--active': coupon_id == '' }">
                <view class="directOrder_coupon-card-price_babdd">
                  <text class="directOrder_coupon-card-price-placeholder_babdd">—</text>
                </view>
                <text class="directOrder_coupon-card-name_babdd">{{ $t('不用券') }}</text>
                <text class="directOrder_coupon-card-desc_babdd">{{ $t('暂不使用') }}</text>
              </view>
            </view>
            <view class="directOrder_coupon-grid-col_babdd" v-for="(item, key0) in couponType" :key="key0" @tap.stop="selectCouponFunc(item)">
              <view class="directOrder_coupon-card_babdd" :class="{ 'directOrder_coupon-card--active': coupon_id == item.aid }">
                <view class="directOrder_coupon-card-price_babdd">
                  <text class="directOrder_coupon-card-yen_babdd">￥</text>
                  <text class="directOrder_coupon-card-money_babdd">
                    <text class="directOrder_coupon-card-money-int_babdd">{{ item.money | frontPrice }}</text>
                    <text class="directOrder_coupon-card-money-dec_babdd">{{ item.money | laterPrice }}</text>
                  </text>
                </view>
                <text class="directOrder_coupon-card-name_babdd">{{ item.name }}</text>
                <text class="directOrder_coupon-card-desc_babdd">{{ item.content }}</text>
              </view>
            </view>
          </view>
        </view>
        <view
          class="flex flex-wrap align-center justify-between directOrder_fd6_1_babdd"
          v-if="Number(userInfoMessage.score) > 0"
          @tap="openScorePopupFunc()"
        >
          <text class="directOrder_fd6_1_c0_babdd">{{ $t('积分折扣') }}</text>
          <view class="flex flex-wrap align-center">
            <text class="directOrder_fd6_1_c1_c0_babdd" v-if="Number(dataEssayMessage.order_discount_money) > 0">{{ $t('-￥') }}</text>
            <text class="directOrder_fd6_1_c1_c0_babdd">{{ dataEssayMessage.order_discount_money || 0 }}</text>
          </view>
          <image class="directOrder_fd6_0_c5_babdd" mode="aspectFit" :src="STATIC_URL + '273.png'"></image>
        </view>
        <view class="flex flex-wrap align-center justify-between directOrder_fd6_1_babdd" v-if="dataEssayMessage.all_discount_money > zeroNum">
          <text class="directOrder_fd6_1_c0_babdd">{{ $t('会员折扣') }}</text>
          <view class="flex flex-wrap align-center">
            <text class="directOrder_fd6_1_c1_c0_babdd">{{ $t('-￥') }}</text>
            <text class="directOrder_fd6_1_c1_c0_babdd">{{ dataEssayMessage.all_discount_money }}</text>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <view class="flex flex-direction align-stretch benben-position-layout flex directOrder_flex_7_babdd">
        <view class="flex flex-wrap align-center">
          <text class="directOrder_fd7_0_c0_babdd">{{ $t('总计：') }}</text>
          <text class="directOrder_fd7_0_c1_babdd">{{ $t('￥') }}</text>
          <text class="directOrder_fd7_0_c2_babdd">
            <text>{{ dataEssayMessage.payable_money | frontPrice }}</text>
            <text class="directOrder_price2_fd7_0_c2_babdd">{{ dataEssayMessage.payable_money | laterPrice }}</text>
          </text>
          <button class="directOrder_fd7_0_c3_babdd" @tap.stop="submitFunc()" v-if="dataDetails.list_fail && dataDetails.list_fail.length <= 0">
            {{ $t('提交订单') }}
          </button>
          <button class="directOrder_fd7_0_c4_babdd" v-if="dataDetails.list_fail && dataDetails.list_fail.length > 0">{{ $t('提交订单') }}</button>
        </view>
        <benben-safe-area></benben-safe-area>
      </view>
      <view :style="{ height: `calc(100rpx + ${bottomSafeArea}px)` }"></view>
      <benben-popup v-model="popupShow1685773487026" :mask="true" :mask-close-able="false" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout directOrder_flex_8_babdd">
          <scroll-view class="directOrder_fd8_0_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <template v-for="(item, key0) in list_failName">
                <view class="flex align-center justify-center directOrder_fd8_0_c0_babdd" :key="key0">
                  <image class="directOrder_fd8_0_c0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
                  <view class="flex flex-wrap align-center flex-sub">
                    <view>
                      <text class="directOrder_fd8_0_c0_c1_c0_c0_babdd">{{ item.name }}</text>
                      <text class="directOrder_fd8_0_c0_c1_c0_c0_babdd">{{ item.reason }}</text>
                    </view>
                  </view>
                </view>
              </template>
            </view>
          </scroll-view>

          <view class="flex align-center justify-center directOrder_fd8_1_babdd">
            <!-- <button class='directOrder_fd8_1_c0_babdd'  @tap.stop="backYeFunc()"  >{{$t('返回上一页')}}</button>
 -->
            <button class="directOrder_fd8_1_c1_babdd" @tap.stop="popupShow1685773487026 = false">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679650134928" :mask="true" :mask-close-able="true" mode="bottom">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_9_babdd">
          <view class="flex flex-wrap align-center justify-center directOrder_fd9_0_babdd">
            <image class="directOrder_fd9_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
            <text class="directOrder_fd9_0_c1_babdd">{{ $t('抬头选择') }}</text>
            <image class="directOrder_fd9_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            <image
              class="directOrder_fd9_0_c3_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '124.png'"
              @tap.stop="popupShow1679650134928 = false"
            ></image>
          </view>

          <scroll-view class="directOrder_fd9_1_babdd" :scroll-x="true" :scroll-y="true" :show-scrollbar="true" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <benben-select-diy
                ref="showSelectPopup1693559447855"
                class-text="flex-direction align-stretch flex"
                :items.sync="invoiceData"
                v-model="invoice_id"
                :label.sync="username"
                @change="chooseInvoiceFunc()"
                default-type="aid"
                default-label="username"
                :allow-cancel="true"
                type="radio"
                :disabled="false"
              >
                <benben-select-item v-for="(item, key0) in invoiceData" :hand-value="item.aid" :key="key0">
                  <template #selected>
                    <view class="flex align-center flex directOrder_fd9_1_c0_c0_babdd">
                      <image class="directOrder_fd9_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd9_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="directOrder_fd9_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="directOrder_fd9_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c2_babdd">
                            <text class="directOrder_fd9_1_c0_c0_c1_c0_c1_c0_babdd">{{ item.type_name }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="directOrder_fd9_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="directOrder_fd9_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                  <template #no-selected>
                    <view class="flex align-center flex directOrder_fd9_1_c0_c0_babdd">
                      <image class="directOrder_fd9_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '128.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd9_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="directOrder_fd9_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="directOrder_fd9_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c2_babdd">
                            <text class="directOrder_fd9_1_c0_c0_c1_c0_c1_c0_babdd">{{ item.type_name }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="directOrder_fd9_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="directOrder_fd9_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                </benben-select-item>
              </benben-select-diy>
              <benben-empty :list-data="invoiceData">
                <view>
                  <view class="flex flex-direction flex-wrap align-center directOrder_fd9_1_c1_babdd">
                    <image class="directOrder_fd9_1_c1_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
                  </view>
                </view>
              </benben-empty>
            </view>
          </scroll-view>

          <button class="directOrder_fd9_2_babdd" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fp/applyInvoic/applyInvoic`">
            {{ $t('添加新的抬头') }}
          </button>
          <button class="directOrder_fd9_3_babdd" @tap.stop="NotInvoicingFunc()">{{ $t('不开发票') }}</button>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1775099446273" :mask="true" :mask-close-able="true" mode="bottom">
        <!---组件名称ayflex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout">
          <view class="flex flex-direction align-stretch directOrder_fd10_0_babdd">
            <view class="flex flex-wrap align-center justify-between">
              <view class="flex flex-wrap align-center directOrder_fd10_0_c0_c0_babdd"></view>
              <view class="flex flex-wrap align-center directOrder_fd10_0_c0_c1_babdd">
                <text class="directOrder_fd10_0_c0_c1_c0_babdd">{{ $t('积分抵扣') }}</text>
              </view>
              <view class="flex flex-wrap align-center">
                <image
                  class="directOrder_fd10_0_c0_c2_c0_babdd"
                  mode="aspectFit"
                  :src="STATIC_URL + '1672.png'"
                  @tap.stop="popupShow1775099446273 = false"
                ></image>
              </view>
            </view>
            <view class="flex align-stretch justify-between directOrder_fd10_0_c1_babdd">
              <text class="directOrder_fd10_0_c1_c0_babdd">{{ $t('目前积分数量') }}</text>
              <text class="directOrder_fd10_0_c1_c1_babdd">{{ userInfoMessage.score || 0 }}</text>
            </view>
            <!-- <view class="flex flex-direction flex-wrap align-stretch directOrder_fd10_0_c1_babdd" v-if="dataEssayMessage.order_discount_ratio">
              <text class="directOrder_fd10_0_c1_c0_babdd">{{ $t('抵扣比例') }}</text>
              <text class="directOrder_fd10_0_c1_c1_babdd">{{ dataEssayMessage.order_discount_ratio }}</text>
            </view> -->
            <view class="flex flex-direction flex-wrap align-stretch directOrder_fd10_0_c1_babdd">
              <text class="directOrder_fd10_0_c1_c1_babdd">{{ $t('请输入积分数量') }}</text>
              <view class="flex flex-direction flex-wrap align-stretch">
                <benben-input
                  class="directOrder_fd10_0_c2_c1_c0_babdd"
                  type="number"
                  :placeholder="$t('请输入要使用的积分数量')"
                  confirm-type="done"
                  :maxlength="-1"
                  placeholder-style="color:rgba(142, 142, 147, 1);font-size:28rpx"
                  v-model="inputUseScore"
                />
              </view>
            </view>
            <view class="flex flex-direction flex-wrap align-stretch" v-if="Number(dataEssayMessage.order_discount_money) > 0">
              <text class="directOrder_fd10_0_c1_c0_babdd">{{ $t('抵扣现金金额') }}</text>
              <view class="flex flex-direction flex-wrap align-stretch">
                <text class="directOrder_fd10_0_c1_c1_babdd">{{ $t('￥') }}{{ dataEssayMessage.order_discount_money }}</text>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-center directOrder_fd10_0_c4_babdd">
              <button class="directOrder_fd10_0_c4_c0_babdd" @tap.stop="confirmUseScoreFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>

        <!---组件名称ayflex布局结束-->
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
      popupShow1775099446273: false,
      popupShow1679650134928: false,
      popupShow1685773487026: false,
      popupShow1663558318653: false,
      coupon_id: '',
      couponType: [],
      dataHead: [],
      /** has_address【是否有收货地址 0否  1是】
       *   discount_str【会员折扣说明】
       *   payable_money【应付金额】
       *   all_discount_money【总计会员折扣金额】
       *   express_price【运费】
       *   coupon_money【优惠券金额】
       *   coupon_usable_num【优惠券数量】
       *   order_money【订单金额】
       *   shop_express【商家运费】
       *   list【商家列表】
       *   address【地址】
       *   lat【纬度】
       *   lng【经度】
       *   is_default【是否默认】
       *   label_name【地址标签】
       *   sex【性别  1男  2女】
       *   district【区】
       *   city【市】
       *   province【省】
       *   detail【详细地址】
       *   mobile【手机号】
       *   real_name【姓名】 **/
      dataDetails: {
        address: {
          aid: '',
          member_id: '',
          uid: '',
          create_time: '',
          update_time: '',
          sort: '',
          is_del: '',
          status: '',
          create_id: '',
          row_lock: '',
          user_id: '',
          real_name: '',
          mobile: '',
          detail: '',
          province: '',
          province_id: '',
          city: '',
          city_id: '',
          district: '',
          district_id: '',
          sex: '',
          label_name: '',
          is_default: '',
          lng: '',
          lat: '',
          address_code: '',
          address_code_province: '',
          address_code_city: '',
          address_code_district: '',
        },
        list: [],
        shop_express: '',
        order_money: '',
        coupon_usable_num: '',
        coupon_money: '',
        express_price: '',
        order_type: '',
        all_discount_money: '',
        payable_money: '',
        discount_str: '',
        has_address: 0,
      },
      /** has_address【是否有收货地址 0否  1是】
       *   discount_str【折扣说明】
       *   all_discount_money【总计会员优惠金额】
       *   express_price【运费】
       *   coupon_usable_num【平台优惠券数量】
       *   order_money【订单金额】
       *   payable_money【应付金额】
       *   address【地址】
       *   lat【纬度】
       *   lng【经度】
       *   is_default【是否默认】
       *   label_name【地址标签】
       *   sex【性别  1男 2女】
       *   district【区】
       *   city_id【城市ID】
       *   city【城市】
       *   province_id【省DI】
       *   province【省】
       *   detail【详细地址】
       *   mobile【手机号】
       *   real_name【姓名】
       *   user_id【用户ID】
       *   coupon_money【平台优惠券金额】
       *   list【商家列表】
       *   order_type【订单类型】 **/
      dataEssayMessage: {
        order_type: '',
        list: [],
        shop_coupon: '',
        coupon: '',
        coupon_money: '',
        address: {
          aid: '',
          member_id: '',
          uid: '',
          create_time: '',
          update_time: '',
          sort: '',
          is_del: '',
          status: '',
          create_id: '',
          row_lock: '',
          user_id: '',
          real_name: '',
          mobile: '',
          detail: '',
          province: '',
          province_id: '',
          city: '',
          city_id: '',
          district: '',
          district_id: '',
          sex: '',
          label_name: '',
          is_default: '',
          lng: '',
          lat: '',
          address_code: '',
          address_code_province: '',
          address_code_city: '',
          address_code_district: '',
        },
        payable_money: '',
        order_money: '',
        coupon_usable_num: '',
        express_price: '',
        all_discount_money: '',
        discount_str: '',
        use_score: '',
        order_discount_ratio: '',
        order_discount_money: '',
        has_address: 0,
        coupon_search: {
          moeny: '',
          category: [],
          goods: [],
        },
      },
      status_msg: '',
      /** invoiceId【发票id】 **/ invoiceId: '',
      username: '不开发票',
      invoiceData: [],
      shop_coupon_list: {},
      address_id: '',
      /** freight_explain【运费说明】 **/ freight_explain: '',
      zeroNum: 0,
      list_failName: [],
      /** remark_list【备注】 **/ remark_list: {},
      /** invoice_list【发票】 **/ invoice_list: {},
      /** youhuijuanId【优惠券】 **/ youhuijuanId: '',
      invoice_id: '',
      flag: false,
      invoiceTitle: '',
      /** disType【配送类型0物流1自提】 **/ disType: '0',
      pickUpInfo: {
        name: '',
        aid: '',
      },
      /** pickUpPerson【自取人信息】 **/ pickUpPerson: {
        name: '',
        aid: '',
        mobile: '',
      },
      currentOrderSn: '', // 用于记录提交产生的订单号
      goods_id: '1474',
      sku_id: '',
      num: '1',
      money: '',
      shop_coupon_id: '',
      number: '1',
      activity_id: '',
      cartid: '',
      package_id: '',
      orderinfo: '',
      userInfoMessage: {
        score: 0,
      },
      /** 用户输入的抵扣积分，确认后作为 use_score 传给预下单接口 **/
      inputUseScore: '',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { goods_id, sku_id, num, money, address_id, shop_coupon_id, number, activity_id, invoice_id, cartid, package_id, orderinfo } = options
    if (goods_id !== undefined) this.goods_id = goods_id
    if (sku_id !== undefined) this.sku_id = sku_id
    if (num !== undefined) this.num = num
    if (money !== undefined) this.money = money
    if (address_id !== undefined) this.address_id = address_id
    if (shop_coupon_id !== undefined) this.shop_coupon_id = shop_coupon_id
    if (number !== undefined) this.number = number
    if (activity_id !== undefined) this.activity_id = activity_id
    if (invoice_id !== undefined) this.invoice_id = invoice_id
    if (cartid !== undefined) this.cartid = cartid
    if (package_id !== undefined) this.package_id = package_id
    if (orderinfo !== undefined) this.orderinfo = orderinfo
    this.diyPageListen()
    this.queryMessageFunc()
    this.setupHostAppPaySuccess()
  },
  onUnload() {
    this.diyOffPageListen()
    this.teardownHostAppPaySuccess()
  },
  onReady() {},
  onShow() {
    this.panduanFunc()
    this.getInvoiceListFunc()
    this.getPackageMessageFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //个人中心-获取会员详细信息
    async queryMessageFunc() {
      //请求方法
      //数据验证
      let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {})
      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.userInfoMessage = infodataMessage.data
    },
    //返回上一页
    backYeFunc() {
      this.popupShow1685773487026 = false
      this.$urouter.navigateBack(1)
    },
    //修改收货地址
    goAddListFunc() {
      this.popupShow1685773487026 = false
    },
    //获取发票数据
    async getInvoiceListFunc() {
      //请求方法
      //数据验证

      let datainvoiceData = await this.$api.get(global.apiUrls.post6418475995586, {})

      if (datainvoiceData.data.code != 1) {
        this.$message.info(datainvoiceData.data.msg)
        return
      }
      let infoinvoiceData = datainvoiceData.data
      this.invoiceData = infoinvoiceData.data
    },
    //选择发票
    chooseInvoiceFunc() {
      this.invoice_list[this.selectRow.shop_info.aid].invoice_id = this.invoice_id
      this.invoice_list[this.selectRow.shop_info.aid].invoice_name = this.username
      this.popupShow1679650134928 = false
    },
    //不开发票
    NotInvoicingFunc() {
      this.invoice_list[this.selectRow.shop_info.aid].invoice_id = ''
      this.popupShow1679650134928 = false
    },
    // 构建预下单 use_score 参数：不使用或无积分则不传
    buildUseScoreParams() {
      const userScore = Number(this.userInfoMessage.score) || 0
      const useScore = Number(this.inputUseScore) || 0
      if (userScore <= 0 || useScore <= 0) {
        return {}
      }
      return {
        use_score: Math.min(useScore, userScore),
      }
    },
    openScorePopupFunc() {
      if (Number(this.dataEssayMessage.use_score) > 0) {
        this.inputUseScore = String(this.dataEssayMessage.use_score)
      }
      this.popupShow1775099446273 = true
    },
    confirmUseScoreFunc() {
      const userScore = Number(this.userInfoMessage.score) || 0
      const inputScore = String(this.inputUseScore || '').trim()
      if (inputScore !== '' && userScore <= 0) {
        this.$message.info(this.$t('暂无可用积分'))
        return
      }
      if (inputScore !== '') {
        const useScore = Number(inputScore)
        if (isNaN(useScore) || useScore < 0) {
          this.$message.info(this.$t('请输入正确的积分数量'))
          return
        }
        if (useScore > userScore) {
          this.$message.info(this.$t('积分数量不足'))
          return
        }
        this.inputUseScore = useScore > 0 ? String(useScore) : ''
      } else {
        this.inputUseScore = ''
      }
      this.popupShow1775099446273 = false
      this.panduanFunc()
    },
    //预下单-直接购买确认订单信息
    async queryEssayMessageFunc() {
      if (this.package_id == '') {
        let datadataEssayMessage = await this.$api.post(global.apiUrls.post62c6a51abaf56, {
          goods_id: this.goods_id,
          sku_id: this.sku_id,
          number: this.num,
          coupon_id: this.coupon_id,
          address_id: this.address_id,
          shop_coupon_id: this.shop_coupon_list,
          invoice_id: this.invoiceId,
          ...this.buildUseScoreParams(),
        })

        if (datadataEssayMessage.data.code != 1) {
          this.$message.info(datadataEssayMessage.data.msg)
          return
        }
        let infodataEssayMessage = datadataEssayMessage.data
        this.dataDetails = infodataEssayMessage.data
        this.dataEssayMessage = infodataEssayMessage.data
        if (Number(this.dataEssayMessage.use_score) > 0) {
          this.inputUseScore = String(this.dataEssayMessage.use_score)
        }

        if (this.dataEssayMessage.list_fail && this.dataEssayMessage.list_fail.length > 0) {
          this.popupShow1685773487026 = true
          this.list_failName = this.dataEssayMessage.list_fail
        } else {
          this.popupShow1685773487026 = false
        }
        if (this.dataEssayMessage.address && this.dataEssayMessage.address.length != 0) {
          this.address_id = this.dataEssayMessage.address.aid
        } else {
          this.dataEssayMessage.address = null
        }

        this.dataEssayMessage.list.forEach((item, index) => {
          // 优惠券
          if (!this.shop_coupon_list[item.shop_info.aid]) {
            this.shop_coupon_list[item.shop_info.aid] = {
              coupon_id: 0,
            }
          }
          // 备注
          if (!this.remark_list[item.shop_info.aid]) {
            this.remark_list[item.shop_info.aid] = {
              remark: '',
            }
          }
          // 发票
          if (!this.invoice_list[item.shop_info.aid]) {
            this.invoice_list[item.shop_info.aid] = {
              invoice_id: '', //1个人2企业
              invoice_name: '',
            }
          }
        })
        await this.loadCouponListFunc(0)
      }
    },
    //获取购物车直接下单信息
    async getBuyCarFunc() {
      if (this.package_id == '') {
        //请求方法
        //数据验证

        let datadataDetails = await this.$api.post(global.apiUrls.post62c7980999c75, {
          cart_ids: this.cartid,
          use_coupon: '0',
          coupon_id: this.coupon_id,
          address_id: this.address_id,
          shop_coupon_id: this.shop_coupon_list,
          send_type: this.disType,
          ...this.buildUseScoreParams(),
        })

        if (datadataDetails.data.code != 1) {
          this.$message.info(datadataDetails.data.msg)
          return
        }
        let infodataDetails = datadataDetails.data
        this.dataDetails = infodataDetails.data

        this.dataEssayMessage = this.dataDetails
        if (Number(this.dataEssayMessage.use_score) > 0) {
          this.inputUseScore = String(this.dataEssayMessage.use_score)
        }

        if (this.dataEssayMessage.list_fail && this.dataEssayMessage.list_fail.length > 0) {
          this.popupShow1685773487026 = true
          this.list_failName = this.dataEssayMessage.list_fail
        } else {
          this.popupShow1685773487026 = false
        }
        if (this.dataEssayMessage.address && this.dataEssayMessage.address.length != 0) {
          this.address_id = this.dataEssayMessage.address.aid
        } else {
          this.dataEssayMessage.address = null
        }
        // this.shop_coupon_list = {};
        this.dataEssayMessage.list.forEach((item, index) => {
          //优惠券
          if (!this.shop_coupon_list[item.shop_info.aid]) {
            this.shop_coupon_list[item.shop_info.aid] = {
              coupon_id: 0,
            }
          }

          // 备注
          if (!this.remark_list[item.shop_info.aid]) {
            this.remark_list[item.shop_info.aid] = {
              remark: '',
            }
          }

          if (!this.invoice_list[item.shop_info.aid]) {
            this.invoice_list[item.shop_info.aid] = {
              invoice_id: '', //1个人2企业
              invoice_name: '',
            }
          }
        })
        await this.loadCouponListFunc(0)
      }
    },
    //判断是否购物车
    panduanFunc() {
      if (this.cartid != '') {
        this.getBuyCarFunc()
      } else {
        this.queryEssayMessageFunc()
      }
    },
    //提交
    async submitFunc() {
      if (this.flag) {
        return
      }

      if (this.disType == 0 && !validate(this.dataEssayMessage.address, 'require')) {
        uni.showToast({
          title: global.i18n.t('请选择地址'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        return false
      }
      if (this.disType == 1 && !validate(this.pickUpPerson.aid, 'require')) {
        uni.showToast({
          title: global.i18n.t('请选择自取人'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        return false
      }
      if (this.disType == 1 && !validate(this.pickUpInfo.aid, 'require')) {
        uni.showToast({
          title: global.i18n.t('请选择自提点'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        return false
      }

      //if (!validate(this.dataEssayMessage.address, 'require')) {
      //  this.$message.info(global.i18n.t('请选择地址'));
      // return false;
      //}
      this.flag = true
      var order_info = {}

      // 将商品信息传给后端
      let newGoods = []
      this.dataEssayMessage.list.forEach((item) => {
        newGoods = newGoods.concat(item.goods)
      })
      order_info.goods = newGoods
      order_info.address = this.dataEssayMessage.address
      order_info.use_score = this.inputUseScore
      uni.showLoading({
        title: global.i18n.t('订单提交中'),
      })
      this.$api
        .post(global.apiUrls.post62c8038d96dab, {
          address_id: this.address_id,
          remark_list: JSON.stringify(this.remark_list),
          shop_coupon_list: JSON.stringify(this.shop_coupon_list),
          invoice_list: JSON.stringify(this.invoice_list),
          coupon_id: this.coupon_id,
          order_info: JSON.stringify(order_info),
          share_sign: uni.getStorageSync('invite_code') || '',
          send_type: this.disType, //	配送方式: 0 物流发货 1 门店自提
          pickup_id: this.pickUpPerson.aid, //	联系人ID
          pickup_point_id: this.pickUpInfo.aid, //自提点id
        })
        .then(async (res) => {
          uni.hideLoading()
          res = res.data
          setInterval(() => {
            this.flag = false
          }, 2000)
          if (res.code == 1) {
            uni.removeStorageSync('invite_code')
            const orderSn = Array.isArray(res.data.order_sn) ? res.data.order_sn[0] : res.data.order_sn
            await this.proceedHostAppPay({
              orderSn,
              amount: this.dataEssayMessage.payable_money,
              orderType: 3,
              source: 'directOrder',
              offerPayExtra: 'order_type=3',
            })
            if (this.cartid) {
            }
          } else {
            this.flag = false
            this.$message.info(res.msg)
          }
        })
    },
    //删除购物车信息
    async delCartGoodsFunc() {
      //请求方法
      //数据验证

      let data62beb3fca0209 = await this.$api.post(global.apiUrls.post62beb3fca0209, {
        cart_ids: this.cartid,
      })

      if (data62beb3fca0209.data.code != 1) {
        this.$message.info(data62beb3fca0209.data.msg)
        return
      }
      let info62beb3fca0209 = data62beb3fca0209.data
    },
    //获取运费说明
    getExplainFunc(test) {
      if (test == '' || !test) {
        this.freight_explain = '暂无运费说明'
      } else {
        this.freight_explain = test
      }
      this.popupShow1663558318653 = true
    },
    //获取套餐订单信息
    async getPackageMessageFunc() {
      if (this.package_id != '') {
        //请求方法
        //数据验证

        let data655c8794204e2 = await this.$api.post(global.apiUrls.post655c8794204e2, {
          package_id: this.package_id,
          orderinfo: uni.getStorageSync('suitOrderInfo'),
        })

        if (data655c8794204e2.data.code != 1) {
          this.$message.info(data655c8794204e2.data.msg)
          return
        }
        let infodataDetails = data655c8794204e2.data
        this.dataEssayMessage = infodataDetails.data
        if (this.dataEssayMessage.list_fail && this.dataEssayMessage.list_fail.length > 0) {
          this.popupShow1685773487026 = true
          this.list_failName = this.dataEssayMessage.list_fail
        } else {
          this.popupShow1685773487026 = false
        }
        if (this.dataEssayMessage.address && this.dataEssayMessage.address.length != 0) {
          this.address_id = this.dataEssayMessage.address.aid
        } else {
          this.dataEssayMessage.address = null
        }

        this.dataEssayMessage.list.forEach((item, index) => {
          // 优惠券
          if (!this.shop_coupon_list[item.shop_info.aid]) {
            this.shop_coupon_list[item.shop_info.aid] = {
              coupon_id: 0,
            }
          }
          // 备注
          if (!this.remark_list[item.shop_info.aid]) {
            this.remark_list[item.shop_info.aid] = {
              remark: '',
            }
          }
          // 发票
          if (!this.invoice_list[item.shop_info.aid]) {
            this.invoice_list[item.shop_info.aid] = {
              invoice_id: '', //1个人2企业
              invoice_name: '',
            }
          }
        })
        await this.loadCouponListFunc(0)
      }
    },
    //加载可用优惠券列表（页面内展示）
    async loadCouponListFunc(shopid = 0) {
      if (!this.dataEssayMessage || this.package_id != '' || !this.dataEssayMessage.list) {
        this.couponType = []
        return
      }
      this.youhuijuanId = shopid
      const goods_ids = []
      this.dataEssayMessage.list.forEach((e) => {
        if (e.goods) {
          e.goods.forEach((v) => {
            goods_ids.push({
              money: v.member_price,
              goods_id: v.goods_id,
            })
          })
        }
      })
      const categoryIds = this.dataEssayMessage.coupon_search ? this.dataEssayMessage.coupon_search.category : ''
      const datacouponType = await this.$api.post(global.apiUrls.post5d916c0c775ff, {
        partner_id: shopid,
        goods_ids: goods_ids,
        category_ids: categoryIds,
        money: this.dataEssayMessage.payable_money,
      })
      if (datacouponType.data.code != 1) {
        this.couponType = []
        return
      }
      this.couponType = datacouponType.data.data || []
    },
    selectCouponFunc(item) {
      const isSelected = this.youhuijuanId == 0 ? this.coupon_id == item.aid : this.shop_coupon_list[this.youhuijuanId].coupon_id == item.aid
      this.isokduoshopidFunc(item, isSelected ? 'remove' : '')
    },
    //打开发票选择
    openPopupShowFunc(item) {
      this.selectRow = item
      this.invoice_id = this.invoice_list[this.selectRow.shop_info.aid].invoice_id
      this.popupShow1679650134928 = true
    },
    //多店铺使用优惠券
    isokduoshopidFunc(item, remove) {
      if (this.youhuijuanId == 0) {
        if (remove) {
          this.coupon_id = ''
        } else {
          this.coupon_id = item.aid
        }
      } else {
        if (remove) {
          this.shop_coupon_list[this.youhuijuanId].coupon_id = ''
        } else {
          this.shop_coupon_list[this.youhuijuanId].coupon_id = item.aid
        }
      }
      if (this.cartid != '') {
        this.getBuyCarFunc()
      } else {
        this.queryEssayMessageFunc()
      }
    },
    //移除不在配送范围内的商品
    dltGoodsFunc(goods_id, cart_id) {
      this.dataDetails.list.forEach((item, index) => {
        item.goods.forEach((it, idx) => {
          if (it.goods_id == goods_id) {
            this.dataDetails.list[index].goods.splice(idx, 1)
            this.cartid = this.cartid.replace(cart_id, '')
            this.panduanFunc()
          }
        })
      })
    },
    //切换配送类型
    changeDisTypeFunc(type) {
      this.disType = type
      this.panduanFunc()
    },
    //页面监听
    diyPageListen() {
      uni.$on('isokaddid', (data) => {
        this.address_id = data
      })
      uni.$on('upinvoice', (data) => {
        this.getInvoiceListFunc()
      })
      uni.$on('select_take_address', (data) => {
        this.pickUpInfo = data
      })
      uni.$on('checkPick', (data) => {
        this.pickUpPerson = data
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('isokaddid')
      uni.$off('upinvoice')
      uni.$off('select_take_address')
      uni.$off('checkPick')
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: #f8f8f8;
  background-size: 100% auto;

  .directOrder_fd10_0_babdd {
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 32rpx 0rpx 32rpx;

    .directOrder_fd10_0_c0_c0_babdd {
      width: 24rpx;
    }

    .directOrder_fd10_0_c0_c1_babdd {
      line-height: 109rpx;

      .directOrder_fd10_0_c0_c1_c0_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: rgba(51, 51, 51, 1);
      }
    }

    .directOrder_fd10_0_c0_c2_c0_babdd {
      width: 24rpx;
      height: 24rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }

    .directOrder_fd10_0_c4_babdd {
      margin: 32rpx 0rpx 35rpx 0rpx;

      .directOrder_fd10_0_c4_c0_babdd {
        border-radius: 44rpx 44rpx 44rpx 44rpx;
        font-size: 32rpx;
        background: rgba(218, 55, 44, 1);
        color: var(--benbenFontColor3);
        width: 638rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-weight: 500;
      }
    }
  }

  .directOrder_fd10_0_c1_babdd {
    margin: 0rpx 0rpx 32rpx 0rpx;
  }

  .directOrder_fd10_0_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin: 0rpx 0rpx 16rpx 0rpx;
  }

  .directOrder_fd10_0_c1_c1_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 0rpx 0rpx 16rpx 0rpx;
  }

  .directOrder_fd10_0_c2_c1_c0_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #f8f8f8;
    height: 88rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
  }

  .directOrder_flex_9_babdd {
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    background: #ffffff;
    padding: 41rpx 24rpx 40rpx 24rpx;

    .directOrder_fd9_0_babdd {
      position: relative;

      .directOrder_fd9_0_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 36rpx;
        font-weight: 500;
        line-height: 50rpx;
        margin: 0rpx 24rpx 0rpx 24rpx;
      }

      .directOrder_fd9_0_c3_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        position: absolute;
        top: -16rpx;
        right: 0rpx;
      }
    }

    .directOrder_fd9_1_babdd {
      touch-action: none;
      width: 702rpx;
      height: 40vh;

      .directOrder_fd9_1_c1_babdd {
        width: 100%;
        padding: 50rpx 0rpx 50rpx 0rpx;

        .directOrder_fd9_1_c1_c0_babdd {
          width: 400rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }
      }
    }

    .directOrder_fd9_2_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 686rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin: 56rpx 8rpx 24rpx 8rpx;
    }

    .directOrder_fd9_3_babdd {
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

  .directOrder_fd9_0_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #f8f8f8;
    padding: 32rpx 32rpx 32rpx 32rpx;
    margin: 32rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 32rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c0_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    max-width: 400rpx;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .directOrder_fd9_1_c0_c0_c1_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 16rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c0_c1_c0_babdd {
    color: var(--benbenFontColor4);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c0_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_babdd {
    margin: 16rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_c0_c0_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 0rpx 0rpx 10rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_c0_c1_babdd {
    margin: 8rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_c1_c0_babdd {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd9_1_c0_c0_c1_c1_c1_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .directOrder_flex_8_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 540rpx;
    padding: 64rpx 24rpx 32rpx 24rpx;

    .directOrder_fd8_0_babdd {
      touch-action: none;
      width: 492rpx;
      max-height: 400rpx;

      .directOrder_fd8_0_c0_babdd {
        margin: 0rpx 32rpx 24rpx 32rpx;

        .directOrder_fd8_0_c0_c0_babdd {
          width: 120rpx;
          height: 120rpx;
          border-radius: 16rpx;
          margin: 0rpx 16rpx 0rpx 0rpx;
        }
      }
    }

    .directOrder_fd8_1_babdd {
      margin: 40rpx 0rpx 0rpx 0rpx;

      .directOrder_fd8_1_c0_babdd {
        font-size: 24rpx;
        background: rgba(253, 246, 236, 1);
        color: rgba(255, 153, 0, 1);
        height: 88rpx;
        border: 1px solid rgba(255, 153, 0, 1);
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        line-height: 88rpx;
        margin: 0rpx 20rpx 0rpx 0rpx;
        width: 200rpx;
      }

      .directOrder_fd8_1_c1_babdd {
        font-size: 24rpx;
        background: var(--benbenbtnColor0);
        color: var(--benbenFontColor3);
        height: 66rpx;
        border-radius: 33rpx;
        line-height: 66rpx;
        margin: 0rpx 0rpx 0rpx 20rpx;
        width: 200rpx;
      }
    }
  }

  .directOrder_fd8_0_c0_c1_c0_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .directOrder_flex_7_babdd {
    width: 750rpx;
    z-index: 10;
    bottom: calc(0rpx + var(--benben-window-bottom, 0px));
    background: #fff;
    background-size: 100% auto !important;
    min-height: 100rpx;

    .directOrder_fd7_0_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      margin: 0rpx 4rpx 0rpx 32rpx;
    }

    .directOrder_fd7_0_c1_babdd {
      line-height: 30rpx;
      font-size: 20rpx;
      font-weight: 700;
      color: var(--benbenFontColor4);
      margin: 4rpx 0rpx 0rpx 0rpx;
    }

    .directOrder_fd7_0_c2_babdd {
      color: var(--benbenFontColor4);
      font-weight: 700;
      line-height: 32rpx;
      font-size: 32rpx;

      .directOrder_price2_fd7_0_c2_babdd {
        font-size: 22rpx;
      }
    }

    .directOrder_fd7_0_c3_babdd {
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      margin: 0rpx 0rpx 0rpx auto;
      width: 280rpx;
      height: 90rpx;
      line-height: 90rpx;
    }

    .directOrder_fd7_0_c4_babdd {
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      font-size: 32rpx;
      background: #999;
      color: var(--benbenFontColor3);
      margin: 0rpx 0rpx 0rpx auto;
      width: 280rpx;
      height: 90rpx;
      line-height: 90rpx;
    }
  }

  .directOrder_flex_6_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    margin: 0rpx 0rpx 124rpx 0rpx;
    padding: 32rpx 28rpx 32rpx 28rpx;

    .directOrder_coupon-section_babdd {
      width: 100%;
    }

    .directOrder_coupon-head_babdd {
      margin-bottom: 20rpx;
    }

    .directOrder_coupon-empty_babdd {
      display: block;
      font-size: 26rpx;
      color: var(--benbenFontColor1);
      line-height: 40rpx;
      padding: 8rpx 0 4rpx 0;
    }

    .directOrder_coupon-grid_babdd {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -6rpx;
    }

    .directOrder_coupon-grid-col_babdd {
      box-sizing: border-box;
      width: 33.3333%;
      padding: 6rpx;
    }

    .directOrder_coupon-card_babdd {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 156rpx;
      padding: 16rpx 8rpx 12rpx;
      border-radius: 12rpx;
      background: #ffffff;
      border: 2rpx solid #f0f0f0;
      box-sizing: border-box;
    }

    .directOrder_coupon-card--active {
      border-color: #ff4d4f;
      background: #fffafa;
      box-shadow: 0 2rpx 8rpx rgba(255, 77, 79, 0.12);
    }

    .directOrder_coupon-card-price_babdd {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: center;
      width: 100%;
      height: 48rpx;
      line-height: 48rpx;
    }

    .directOrder_coupon-card-price-placeholder_babdd {
      font-size: 32rpx;
      font-weight: 600;
      color: #d9d9d9;
      line-height: 48rpx;
    }

    .directOrder_coupon-card-yen_babdd {
      font-size: 20rpx;
      font-weight: 600;
      color: #ff4d4f;
      line-height: 48rpx;
    }

    .directOrder_coupon-card-money_babdd {
      color: #ff4d4f;
      font-weight: 700;
      line-height: 48rpx;
    }

    .directOrder_coupon-card-money-int_babdd {
      font-size: 32rpx;
      letter-spacing: -1rpx;
    }

    .directOrder_coupon-card-money-dec_babdd {
      font-size: 20rpx;
    }

    .directOrder_coupon-card-name_babdd {
      width: 100%;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 22rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .directOrder_coupon-card-desc_babdd {
      width: 100%;
      height: 28rpx;
      line-height: 28rpx;
      font-size: 20rpx;
      color: #999999;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .directOrder_coupon-card--active .directOrder_coupon-card-name_babdd {
      color: #ff4d4f;
    }

    .directOrder_fd6_0_c0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
    }

    .directOrder_fd6_0_c1_babdd {
      color: var(--benbenFontColor1);
    }

    .directOrder_fd6_0_c2_babdd {
      margin: 0rpx 0rpx 0rpx 0rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333;
      text-align: right;
      width: 170rpx;
      line-height: 28rpx;
    }

    .directOrder_fd6_0_c3_babdd {
      height: 38rpx;
      background:
        url(#{image-path('284.png')
      }) no-repeat,
        transparent;
      background-size: 100% auto !important;
      padding: 0rpx 10rpx 0rpx 47rpx;
    }

    .directOrder_fd6_0_c4_babdd {
      height: 38rpx;
      background: #ffdede;
      background-size: 100% auto;
      border-radius: 8rpx;

      .directOrder_fd6_0_c4_c0_c0_babdd {
        width: 40rpx;
        height: 38rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }

      .directOrder_fd6_0_c4_c1_babdd {
        padding: 0rpx 10rpx 0rpx 7rpx;
        height: 38rpx;
        background: #ffdede;
        border-radius: 8rpx;
      }
    }
  }

  .directOrder_fd6_0_c3_c0_babdd {
    color: #fa2033;
    font-size: 22rpx;
    font-weight: 500;
    line-height: 30rpx;
  }

  .directOrder_fd6_0_c4_c1_c0_babdd {
    color: var(--benbenFontColor5);
    font-size: 22rpx;
    font-weight: 500;
    line-height: 30rpx;
  }

  .directOrder_fd6_0_c5_babdd {
    width: 12rpx;
    height: 22rpx;
    margin: 0rpx 0rpx 0rpx 16rpx;
  }

  .directOrder_fd6_1_babdd {
    padding: 32rpx 0rpx 0rpx 0rpx;
    margin: 32rpx 0rpx 0rpx 0rpx;
    border-top: 1px solid #eee;
  }

  .directOrder_fd6_1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    margin: 0rpx auto 0rpx 0rpx;
  }

  .directOrder_fd6_1_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .directOrder_flex_5_babdd {
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;

    .directOrder_fd5_0_babdd {
      margin: 40rpx 32rpx 32rpx 32rpx;

      .directOrder_fd5_0_c1_babdd {
        width: 32rpx;
        height: 10rpx;
        margin: 0rpx 0rpx 0rpx auto;
      }

      .directOrder_fd5_0_c2_babdd {
        line-height: 50rpx;
        font-size: 36rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0rpx 16rpx 0rpx 16rpx;
      }

      .directOrder_fd5_0_c3_babdd {
        width: 32rpx;
        height: 10rpx;
        margin: 0rpx auto 0rpx 0rpx;
      }
    }

    .directOrder_fd5_1_babdd {
      touch-action: none;
      width: 686rpx;
      height: 500rpx;
      margin: 0rpx auto 40rpx auto;

      .directOrder_fd5_1_c0_babdd {
        line-height: 42rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: var(--benbenFontColor1);
      }
    }
  }

  .directOrder_fd5_0_c0_babdd {
    width: 40rpx;
    height: 40rpx;
  }

  .directOrder_flex_4_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .directOrder_fd4_0_babdd {
      padding: 32rpx 24rpx 0rpx 24rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;
      background: #fff;
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .directOrder_fd4_0_c1_babdd {
        margin: 0rpx 0rpx 32rpx 0rpx;
        padding: 32rpx 0rpx 0rpx 0rpx;
        border-top: 1px solid #eee;

        .directOrder_fd4_0_c1_c1_babdd {
          margin: 0rpx 0rpx 0rpx auto;
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
        }

        .directOrder_fd4_0_c1_c2_babdd {
          color: var(--benbenFontColor0);
          font-weight: 400;
          line-height: 40rpx;
          font-size: 28rpx;
        }
      }
    }
  }

  .directOrder_fd4_0_c0_c0_babdd {
    margin: 0rpx 0rpx 32rpx 0rpx;

    .directOrder_fd4_0_c0_c0_c0_babdd {
      width: 200rpx;
      height: 200rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      margin: 0rpx 24rpx 0rpx 0rpx;
    }

    .directOrder_fd4_0_c0_c0_c1_c0_babdd {
      line-height: 42rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      height: 84rpx;
    }

    .directOrder_fd4_0_c0_c0_c1_c1_babdd {
      line-height: 33rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: var(--benbenFontColor1);
      margin: 8rpx 0rpx auto 0rpx;
    }
  }

  .directOrder_fd4_0_c0_c0_c1_c2_c0_babdd {
    line-height: 40rpx;
    font-size: 20rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
  }

  .directOrder_fd4_0_c0_c0_c1_c2_c1_babdd {
    color: var(--benbenFontColor0);
    font-weight: 700;
    line-height: 40rpx;
    font-size: 32rpx;
  }

  .directOrder_price2_fd4_0_c0_c0_c1_c2_c1_babdd {
    font-size: 22rpx;
  }

  .directOrder_fd4_0_c0_c0_c1_c2_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    line-height: 33rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .directOrder_fd4_0_c0_c0_c1_c2_c3_babdd {
    line-height: 33rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .directOrder_fd4_0_c0_c1_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .directOrder_fd4_0_c0_c1_c1_babdd {
    color: var(--benbenFontColor0);
  }

  .directOrder_fd4_0_c0_c1_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    padding: 2rpx 5rpx 2rpx 5rpx;
    background: var(--benbenbgColor7);
    background-size: 100% auto;
    color: var(--benbenFontColor3);
    border-radius: 8rpx;
  }

  .directOrder_fd4_0_c2_babdd {
    margin: 0rpx 0rpx 40rpx 0rpx;

    .directOrder_fd4_0_c2_c0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      margin: 0rpx auto 0rpx 0rpx;
    }

    .directOrder_fd4_0_c2_c1_babdd {
      color: var(--benbenFontColor2);
    }

    .directOrder_fd4_0_c2_c2_babdd {
      max-width: 400rpx;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      color: var(--benbenFontColor0);
    }
  }

  .directOrder_fd4_0_c2_c3_babdd {
    width: 12rpx;
    height: 22rpx;
    margin: 0rpx 0rpx 0rpx 16rpx;
  }

  .directOrder_fd4_0_c3_c1_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx auto;
  }

  .directOrder_fd4_0_c3_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
  }

  .directOrder_fd4_0_c4_c1_babdd {
    margin: 0rpx 0rpx 0rpx 32rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .directOrder_fd4_0_c5_c0_babdd {
    line-height: 33rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: var(--benbenFontColor1);
  }

  .directOrder_fd4_0_c5_c3_babdd {
    line-height: 32rpx;
    font-size: 22rpx;
    font-weight: 500;
    color: var(--benbenFontColor4);
  }

  .directOrder_fd4_0_c5_c4_babdd {
    color: var(--benbenFontColor4);
    font-weight: 500;
    line-height: 32rpx;
    font-size: 32rpx;
  }

  .directOrder_flex_3_babdd {
    margin: 17rpx 0rpx 24rpx 0rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;

    .directOrder_fd3_0_babdd {
      background: #fff;
      background-size: 100% auto !important;
      padding: 32rpx 0rpx 0rpx 0rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .directOrder_fd3_0_c0_babdd {
        margin: 0rpx 32rpx 32rpx 24rpx;

        .directOrder_fd3_0_c0_c0_babdd {
          width: 60rpx;
          height: 60rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .directOrder_fd3_0_c0_c1_babdd {
          margin: 0rpx 0rpx 0rpx 32rpx;

          .directOrder_fd3_0_c0_c1_c0_babdd {
            margin: 0rpx 0rpx 16rpx 0rpx;

            .directOrder_fd3_0_c0_c1_c0_c0_babdd {
              padding: 0rpx 10rpx 0rpx 10rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: var(--benbenFontColor3);
              background: var(--benbenbtnColor0);
              background-size: 100% auto !important;
              border: 1px solid var(--benbenbdColor8);
              border-radius: 4rpx 4rpx 4rpx 4rpx;
            }

            .directOrder_fd3_0_c0_c1_c0_c1_babdd {
              line-height: 45rpx;
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
            }

            .directOrder_fd3_0_c0_c1_c0_c3_1_babdd {
              line-height: 45rpx;
              font-size: 32rpx;
              font-weight: 700;
              color: #333333;
            }

            .directOrder_fd3_0_c0_c1_c0_c5_babdd {
              line-height: 40rpx;
              font-size: 32rpx;
              font-weight: 500;
              color: var(--benbenFontColor0);
              margin: 0rpx 0rpx 0rpx 32rpx;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }

          .directOrder_fd3_0_c0_c1_c1_c0_c0_babdd {
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }

        .directOrder_fd3_0_c0_c2_babdd {
          width: 12rpx;
          height: 22rpx;
          margin: 8rpx 0rpx 0rpx 32rpx;
        }
      }

      .directOrder_fd3_0_c1_c0_babdd {
        height: 6rpx;
        background:
          url(#{image-path('280.png')
      }) no-repeat,
          transparent;
        background-size: 100% auto !important;
      }
    }
  }

  .directOrder_fd3_0_c0_c1_c0_c2_babdd {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
  }

  .directOrder_fd3_0_c0_c1_c1_c0_c0_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .directOrder_flex_2_babdd {
    margin: 20rpx 0rpx 24rpx 0rpx;

    .directOrder_fd2_0_babdd {
      background: #fff;
      background-size: 100% auto !important;
      padding: 32rpx 0rpx 32rpx 0rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .directOrder_fd2_0_c0_babdd {
        width: 60rpx;
        height: 60rpx;
      }

      .directOrder_fd2_0_c1_babdd {
        line-height: 45rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0rpx 0rpx 0rpx 24rpx;
        max-width: 500rpx;
      }
    }
  }

  .directOrder_fd1_0_c1_c0_babdd {
    background:
      url(#{image-path('87.png')
    }) no-repeat,
      transparent;
    background-size: 100% 100% !important;
    padding: 30rpx 31rpx 30rpx 34rpx;
    border-radius: 16rpx;

    .directOrder_fd1_0_c1_c0_c0_babdd {
      padding: 0rpx 0rpx 14rpx 0rpx;

      .directOrder_fd1_0_c1_c0_c0_c0_babdd {
        width: 122rpx;
        height: 100rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }

      .directOrder_fd1_0_c1_c0_c0_c1_babdd {
        margin: 0rpx 0rpx 0rpx 16rpx;

        .directOrder_fd1_0_c1_c0_c0_c1_c0_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 32rpx;
          font-weight: 500;
          line-height: 45rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .directOrder_fd1_0_c1_c0_c0_c1_c1_babdd {
          margin: 8rpx 0rpx 0rpx 0rpx;
        }
      }

      .directOrder_fd1_0_c1_c0_c0_c2_c0_babdd {
        color: var(--benbenFontColor0);
        font-size: 33rpx;
        font-weight: 700;
        line-height: 40rpx;
      }

      .directOrder_fd1_0_c1_c0_c0_c2_c1_babdd {
        color: var(--benbenFontColor0);
        font-weight: 600;

        .directOrder_price1_fd1_0_c1_c0_c0_c2_c1_babdd {
          font-size: 49rpx;
        }

        .directOrder_price2_fd1_0_c1_c0_c0_c2_c1_babdd {
          font-size: 33rpx;
        }
      }
    }
  }

  .directOrder_fd1_0_c0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd1_0_c0_c2_babdd {
    width: 40rpx;
    height: 40rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd1_0_c1_c0_c0_c1_c1_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .directOrder_fd1_0_c1_c0_c1_babdd {
    margin: 20rpx 0rpx 0rpx 0rpx;
  }

  .directOrder_fd1_0_c1_c0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .directOrder_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    border-bottom: 1px solid #eee;
    background: #fff;
    background-size: 100% auto !important;

    .directOrder_fd0_0_babdd {
      height: 88rpx;
      padding: 0rpx 32rpx 0rpx 32rpx;

      .directOrder_fd0_0_c1_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        line-height: 50rpx;
      }
    }
  }

  .directOrder_fd0_0_c0_babdd {
    width: 40rpx;
    height: 40rpx;

    .directOrder_fd0_0_c0_c0_babdd {
      font-size: 36rpx;
      color: var(--benbeniconColor1);
    }
  }
}
</style>
