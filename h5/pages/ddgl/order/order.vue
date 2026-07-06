<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center benben-position-layout flex order_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center order_fd0_0_babdd" @tap.stop="backUrl">
          <image class="order_fd0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '278.png'"></image>
        </view>
        <view class="flex align-center flex-sub order_search_wrap_babdd">
          <text class="fu-iconfont2 order_search_icon_babdd" style="margin-top: -4rpx">&#xE738;</text>
          <benben-input
            class="flex-sub order_search_input_babdd"
            type="text"
            :placeholder="$t('商品名/订单号')"
            confirm-type="search"
            :maxlength="-1"
            placeholder-style="color:var(--benbenFontColor1);font-size:26rpx"
            @confirm="orderSearchFunc()"
            v-model="keywords"
          />
          <image
            class="order_search_clear_babdd"
            mode="aspectFit"
            :src="STATIC_URL + '1485.png'"
            @tap.stop="clearKeywordsFunc()"
            v-if="keywords != ''"
          ></image>
          <text class="order_search_btn_text_babdd" @tap.stop="orderSearchFunc()">{{ $t('搜索') }}</text>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---多商订单tabsflex布局开始-->
      <view class="flex align-stretch benben-flex-layout">
        <view>
          <benben-flex-tabs
            class-text="order_benbenTabsfd1_0_babdd"
            v-model="type"
            ref="benben_tabsfd1_0"
            select-mark="benben_tabsfd1_0"
            key="benben_tabsfd1_0"
            :open-title-type="false"
            :open-sticky="true"
            :top="88"
            :is-show-content="false"
            :scrollspy="false"
            :tabs-info.sync="tabsInfofd1_0"
            @change="getTabsFunc()"
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
                <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex align-center flex">
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == 'all', 'flex flex-wrap align-center order_titlefd1_0_c3_babdd': true }"
                    @tap="type = 'all'"
                    :id="`benben_tabsfd1_0-title-item-${'all'}`"
                  >
                    <text>{{ $t('全部') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == 'unpay', 'flex flex-wrap align-center order_titlefd1_0_c4_babdd': true }"
                    @tap="type = 'unpay'"
                    :id="`benben_tabsfd1_0-title-item-${'unpay'}`"
                  >
                    <text>{{ $t('待付款') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == 'unship', 'flex flex-wrap align-center order_titlefd1_0_c4_babdd': true }"
                    @tap="type = 'unship'"
                    :id="`benben_tabsfd1_0-title-item-${'unship'}`"
                  >
                    <text>{{ $t('待发货') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == 'unreceive', 'flex flex-wrap align-center order_titlefd1_0_c4_babdd': true }"
                    @tap="type = 'unreceive'"
                    :id="`benben_tabsfd1_0-title-item-${'unreceive'}`"
                  >
                    <text>{{ $t('待收货') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == 'finish', 'flex flex-wrap align-center order_titlefd1_0_c4_babdd': true }"
                    @tap="type = 'finish'"
                    :id="`benben_tabsfd1_0-title-item-${'finish'}`"
                  >
                    <text>{{ $t('待评价') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_babdd: type == '6', 'flex flex-wrap align-center order_titlefd1_0_c8_babdd': true }"
                    @tap="type = '6'"
                    :id="`benben_tabsfd1_0-title-item-${'6'}`"
                  >
                    <text>{{ $t('退款/售后') }}</text>
                  </view>
                </view>
                <view
                  :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth }"
                  id="benben_tabsfd1_0-line"
                  class="benben-tabs-line flex benben-flex-tabs-line order_linefd1_0_babdd"
                  :class="{ 'benben-tabs-line-active': tabsInfofd1_0.isInit }"
                ></view>
              </view>
            </scroll-view>
          </benben-flex-tabs>
        </view>
      </view>

      <!---多商订单tabsflex布局结束-->
      <!---多商订单商品flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout order_flex_2_babdd" v-if="type != '6'">
        <template v-for="(item, key0) in dataList">
          <view
            class="flex flex-direction flex-wrap align-stretch order_fd2_0_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/ddgl/redemptDetails/redemptDetails?order_id=${item.aid}&order_sn=${item.order_sn}`"
            :key="key0"
          >
            <view class="flex flex-wrap align-center justify-between order_fd2_0_c0_babdd">
              <view class="flex align-center flex-sub order_sn_wrap_babdd">
                <text class="order_sn_label_babdd">{{ $t('订单号') }}：</text>
                <text class="order_sn_value_babdd">{{ item.order_sn }}</text>
              </view>
              <view class="flex align-center order_status_wrap_babdd">
                <text class="order_refund_tag_babdd" v-if="item.is_exist_refund == 1">{{ $t('售后') }}</text>
                <text class="order_fd2_0_c0_c1_babdd">{{ item.status_name }}</text>
              </view>
              <!-- <text class="order_fd2_0_c0_c1_1_babdd" v-if="item.status == '1'">{{ $t('待发货') }}</text>
              <text class="order_fd2_0_c0_c1_1_babdd" v-if="item.status == '2'">{{ $t('待收货') }}</text>
              <text class="order_fd2_0_c0_c1_1_babdd" v-if="item.status == '3'">{{ $t('待评价') }}</text>
              <text class="order_fd2_0_c0_c1_1_babdd" v-if="item.status == '4'">{{ $t('交易成功') }}</text>
              <text class="order_fd2_0_c0_c1_closed_babdd" v-if="in_array(item.status, '6,-1,-2,-3')">{{ $t('交易关闭') }}</text>
              <text class="order_fd2_0_c0_c1_1_babdd" v-if="item.status == '7'">{{ $t('预售待付尾款') }}</text> -->
            </view>
            <template v-for="(child, key1) in item.goods">
              <view class="flex align-stretch order_fd2_0_c1_babdd" :key="key1">
                <image class="order_fd2_0_c1_c0_babdd" mode="aspectFill" :src="child.goods_thumb"></image>
                <view class="flex flex-direction flex-wrap align-stretch flex-sub order_fd2_0_c1_c1_babdd">
                  <text class="order_fd2_0_c1_c1_c0_babdd">{{ child.goods_name }}</text>
                  <text class="order_fd2_0_c1_c1_c1_babdd" v-if="child.sku_name">{{ child.sku_name }}</text>
                  <view class="flex align-center order_fd2_0_c1_price_row_babdd">
                    <view class="flex flex-wrap align-center">
                      <text class="order_fd2_0_c1_c1_c2_c0_c0_babdd">{{ $t('￥') }}</text>
                      <text class="order_fd2_0_c1_c1_c2_c0_c1_babdd">
                        <text class="order_price1_fd2_0_c1_c1_c2_c0_c1_babdd">{{ child.shop_price | frontPrice }}</text>
                        <text class="order_price2_fd2_0_c1_c1_c2_c0_c1_babdd">{{ child.shop_price | laterPrice }}</text>
                      </text>
                    </view>
                    <text class="order_fd2_0_c1_c1_c2_c1_c0_babdd">x{{ child.num }}</text>
                  </view>
                </view>
              </view>
            </template>

            <view class="flex flex-wrap align-center justify-end order_fd2_0_c2_babdd">
              <text class="order_fd2_0_c2_c0_babdd">{{ $t('共') }}</text>
              <text class="order_fd2_0_c2_c0_babdd">{{ item.goods_total }}</text>
              <text class="order_fd2_0_c2_c2_babdd">{{ $t('件商品') }}</text>
              <text class="order_fd2_0_c2_c3_babdd" v-if="!item.pay_type">{{ $t('应付款') }}</text>
              <text class="order_fd2_0_c2_c3_1_babdd" v-if="item.pay_type">{{ $t('实付款') }}</text>
              <text class="order_fd2_0_c2_c4_babdd">{{ $t('￥') }}</text>
              <text class="order_fd2_0_c1_c1_c2_c0_c1_babdd">
                <text class="order_price1_fd2_0_c1_c1_c2_c0_c1_babdd">{{ item.payable_money | frontPrice }}</text>
                <text class="order_price2_fd2_0_c1_c1_c2_c0_c1_babdd">{{ item.payable_money | laterPrice }}</text>
              </text>
            </view>
            <view
              class="flex flex-wrap align-center justify-end order_fd2_0_c3_babdd order_fd2_0_c3_bar_babdd"
              :class="{ 'order_fd2_0_c3_bar--expanded_babdd': expandedOrderActionMap[item.aid] }"
            >
              <button v-for="(btn, btnIndex) in getVisibleOrderActionButtons(item)" :key="btnIndex" :class="btn.btnClass" @tap.stop="btn.action()">
                {{ btn.text }}
              </button>
              <button class="order_fd2_0_c3_action_babdd" v-if="showOrderActionExpand(item)" @tap.stop="toggleOrderActionExpand(item.aid)">
                {{ $t('展开') }}
              </button>
              <button class="order_fd2_0_c3_action_babdd" v-if="showOrderActionCollapse(item)" @tap.stop="toggleOrderActionExpand(item.aid)">
                {{ $t('收起') }}
              </button>
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

      <!---多商订单商品flex布局结束-->
      <benben-popup v-model="popupShow1711000387246" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center benben-flex-layout">
          <view class="flex flex-direction flex-wrap align-center order_fd3_0_babdd">
            <text class="order_fd3_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="order_fd3_0_c1_babdd">{{ $t('确认取消订单吗？') }}</text>
            <view class="flex align-center order_fd3_0_c2_babdd">
              <button class="order_fd3_0_c2_c0_babdd" @tap.stop="popupShow1711000387246 = false">{{ $t('取消') }}</button>
              <button class="order_fd3_0_c2_c1_babdd" @tap.stop="cancelOrderFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679903057541" :mask="true" :mask-close-able="true" mode="bottom">
        <!---取消订单flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout order_flex_4_babdd">
          <view class="flex flex-direction flex-wrap align-stretch order_fd4_0_babdd">
            <view class="flex flex-wrap align-center justify-between order_fd4_0_c0_babdd">
              <text class="order_fd4_0_c0_c0_babdd" @tap.stop="popupShow1679903057541 = false">{{ $t('取消') }}</text>
              <text class="order_fd4_0_c0_c1_babdd">{{ $t('取消订单') }}</text>
              <text class="order_fd4_0_c0_c2_babdd" @tap.stop="confirmationPopupFunc()">{{ $t('确定') }}</text>
            </view>
            <view class="flex flex-wrap align-center order_fd4_0_c1_babdd">
              <text class="order_fd4_0_c1_c0_babdd">{{ $t('请选择取消订单原因') }}</text>
            </view>

            <scroll-view class="order_fd4_0_c2_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <benben-select-diy
                  ref="showSelectPopup1693558120412"
                  class-text="flex-direction flex"
                  :items.sync="cancelType"
                  v-model="return_id"
                  default-type="aid"
                  default-label="reason"
                  :allow-cancel="true"
                  type="radio"
                  :disabled="false"
                >
                  <benben-select-item v-for="(item, key0) in cancelType" :hand-value="item.aid" :key="key0">
                    <template #selected>
                      <view class="flex justify-between flex order_fd4_0_c2_c0_c0_babdd">
                        <text class="order_fd4_0_c2_c0_c0_c0_babdd">{{ item.reason }}</text>
                        <image class="order_fd4_0_c2_c0_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
                      </view>
                    </template>
                    <template #no-selected>
                      <view class="flex justify-between flex order_fd4_0_c2_c0_c0_babdd">
                        <text class="order_fd4_0_c2_c0_c0_c0_babdd">{{ item.reason }}</text>
                        <image class="order_fd4_0_c2_c0_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '336.png'"></image>
                      </view>
                    </template>
                  </benben-select-item>
                </benben-select-diy>
              </view>
            </scroll-view>
          </view>
        </view>

        <!---取消订单flex布局结束-->
      </benben-popup>
      <!---多商退货flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout order_flex_5_babdd" v-if="type == '6'">
        <template v-for="(item, key0) in dataAfterList">
          <view
            class="flex flex-direction flex-wrap align-stretch order_fd5_0_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/ddgl/detailsRefund/detailsRefund?id=${item.aid}`"
            :key="key0"
          >
            <view class="flex flex-wrap align-center order_fd5_0_c0_babdd">
              <text class="order_fd5_0_c0_c0_babdd">{{ `订单号：${item.order_sn}` }}</text>
              <text class="order_fd5_0_c0_c1_babdd" v-if="item.refund_type == '1'">{{ $t('退款') }}</text>
              <text class="order_fd5_0_c0_c1_1_babdd" v-if="item.refund_type == '2'">{{ $t('退货退款') }}</text>
              <text class="order_fd5_0_c0_c1_1_babdd" v-if="item.refund_type == '3'">{{ $t('换货') }}</text>
              <view class="flex flex-wrap align-center" v-if="item.refund_type == '1' || item.refund_type == '2'">
                <text class="order_fd5_0_c0_c2_c0_babdd" v-if="item.status == '0'">{{ $t('待审核') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '1' && item.express_no == ''">{{ $t('待寄回') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '2'">{{ $t('待退款') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '3'">{{ $t('商家已收货') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '4'">{{ $t('售后已完成') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status < '0'">{{ $t('售后关闭') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '1' && item.express_no != ''">{{ $t('待退款') }}</text>
              </view>
              <view class="flex flex-wrap align-center" v-if="item.refund_type == '3'">
                <text class="order_fd5_0_c0_c2_c0_babdd" v-if="item.status == '0'">{{ $t('待审核') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '1' && item.express_no == ''">{{ $t('待寄回') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '1' && item.express_no != ''">{{ $t('待收货') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '2'">{{ $t('待发货') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '4'">{{ $t('已发货') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status == '5'">{{ $t('售后完成') }}</text>
                <text class="order_fd5_0_c0_c2_c0_1_babdd" v-if="item.status < '0'">{{ $t('售后关闭') }}</text>
              </view>
            </view>
            <view class="flex align-stretch order_fd5_0_c1_babdd">
              <image class="order_fd5_0_c1_c0_babdd" mode="aspectFill" :src="item.goods_thumb"></image>
              <view class="flex flex-direction flex-wrap align-stretch flex-sub order_fd5_0_c1_c1_babdd">
                <text class="order_fd5_0_c1_c1_c0_babdd">{{ item.goods_name }}</text>
                <text class="order_fd5_0_c1_c1_c1_babdd">{{ item.sku_name }}</text>
                <view class="flex flex-wrap align-center justify-between">
                  <view class="flex flex-wrap align-center">
                    <text class="order_fd5_0_c1_c1_c2_c0_c0_babdd">{{ $t('￥') }}</text>
                    <text class="order_fd5_0_c1_c1_c2_c0_c1_babdd">
                      <text class="order_price1_fd5_0_c1_c1_c2_c0_c1_babdd">{{ item.shop_price | frontPrice }}</text>
                      <text class="order_price2_fd5_0_c1_c1_c2_c0_c1_babdd">{{ item.shop_price | laterPrice }}</text>
                    </text>
                  </view>
                  <view class="flex flex-wrap align-center">
                    <text class="order_fd5_0_c1_c1_c2_c1_c0_babdd">x</text>
                    <text class="order_fd5_0_c1_c1_c2_c1_c0_babdd">{{ item.num }}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-end order_fd5_0_c2_babdd">
              <button class="order_fd5_0_c2_c0_babdd" v-if="item.status == '2'">{{ $t('查看详情') }}</button>
              <button class="order_fd5_0_c2_c0_babdd" @tap.stop="getRefundDeleteIDFunc(item.aid)" v-if="item.status == '4' || item.status == '5'">
                {{ $t('删除订单') }}
              </button>
              <button class="order_fd5_0_c2_c0_babdd" @tap.stop="getRefundDeleteIDFunc(item.aid)" v-if="item.status < '0'">
                {{ $t('删除订单') }}
              </button>
              <button class="order_fd5_0_c2_c1_babdd" v-if="item.status != '2'">{{ $t('查看详情') }}</button>
              <button
                class="order_fd5_0_c2_c1_babdd"
                @tap.stop="handleJumpDiy"
                data-type="navigateTo"
                :data-url="`/pages/ddgl/refundLogisticsCheck/refundLogisticsCheck?order_id=${item.aid}`"
                v-if="item.status == '2'"
              >
                {{ $t('查看物流') }}
              </button>
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

      <!---多商退货flex布局结束-->
      <benben-popup v-model="popupShow1679650134928" :mask="true" :mask-close-able="true" mode="bottom">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout order_flex_6_babdd">
          <view class="flex flex-wrap align-center justify-center order_fd6_0_babdd">
            <image class="order_fd6_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
            <text class="order_fd6_0_c1_babdd">{{ $t('抬头选择') }}</text>
            <image class="order_fd6_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            <image class="order_fd6_0_c3_babdd" mode="aspectFit" :src="STATIC_URL + '124.png'" @tap.stop="popupShow1679650134928 = false"></image>
          </view>

          <scroll-view class="order_fd6_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <benben-select-diy
                ref="showSelectPopup1687657939559"
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
                    <view class="flex align-center flex order_fd6_1_c0_c0_babdd">
                      <image class="order_fd6_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub order_fd6_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="order_fd6_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="order_fd6_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c0_c2_babdd">
                            <text class="order_fd6_1_c0_c0_c1_c0_c1_c0_babdd" v-if="item.type == '1'">{{ $t('个人') }}</text>
                            <text class="order_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd" v-if="item.type != '1'">{{ $t('企业') }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="order_fd6_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="order_fd6_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                  <template #no-selected>
                    <view class="flex align-center flex order_fd6_1_c0_c0_babdd">
                      <image class="order_fd6_1_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '128.png'"></image>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub order_fd6_1_c0_c0_c1_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="order_fd6_1_c0_c0_c1_c0_c0_babdd">{{ item.username }}</text>
                          <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c0_c1_babdd" v-if="item.is_default == '1'">
                            <text class="order_fd6_1_c0_c0_c1_c0_c1_c0_babdd">{{ $t('默认') }}</text>
                          </view>
                          <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c0_c2_babdd">
                            <text class="order_fd6_1_c0_c0_c1_c0_c1_c0_babdd" v-if="item.type == '1'">{{ $t('个人') }}</text>
                            <text class="order_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd" v-if="item.type != '1'">{{ $t('企业') }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c1_babdd">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex flex-wrap align-center">
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系邮箱') }}</text>
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.email }}</text>
                            </view>
                            <view class="flex flex-wrap align-center order_fd6_1_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd">{{ $t('联系电话') }}</text>
                              <text class="order_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd">{{ item.mobile }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                          >
                            <image class="order_fd6_1_c0_c0_c1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="order_fd6_1_c0_c0_c1_c1_c1_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>
                </benben-select-item>
              </benben-select-diy>
              <benben-empty :list-data="invoiceData">
                <view>
                  <view class="flex flex-direction flex-wrap align-center order_fd6_1_c1_babdd">
                    <image class="order_fd6_1_c1_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
                  </view>
                </view>
              </benben-empty>
            </view>
          </scroll-view>

          <button
            class="order_fd6_2_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fp/applyInvoic/applyInvoic`"
            v-if="invoice_id == ''"
          >
            {{ $t('添加新的抬头') }}
          </button>
          <button class="order_fd6_2_babdd" @tap.stop="isokfapiaoFunc()" v-if="invoice_id != ''">{{ $t('确定') }}</button>
          <button class="order_fd6_3_babdd" @tap.stop="popupShow1679650134928 = false">{{ $t('不开发票') }}</button>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1698803478291" :mask="true" :mask-close-able="true" mode="center">
        <!---删除订单flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center order_flex_7_babdd">
          <text class="order_fd7_0_babdd">{{ $t('提示') }}</text>
          <text class="order_fd7_1_babdd">{{ $t('确定删除订单？') }}</text>
          <view class="flex align-center order_fd7_2_babdd">
            <button class="order_fd7_2_c0_babdd" @tap.stop="popupShow1698803478291 = false">{{ $t('取消') }}</button>
            <button class="order_fd7_2_c1_babdd" @tap.stop="deleteOrderFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---删除订单flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1698804416892" :mask="true" :mask-close-able="true" mode="center">
        <!---删除售后flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center order_fd8_0_babdd">
            <text class="order_fd8_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="order_fd8_0_c1_babdd">{{ $t('确定删除订单？') }}</text>
            <view class="flex align-center order_fd8_0_c2_babdd">
              <button class="order_fd8_0_c2_c0_babdd" @tap.stop="popupShow1698804416892 = false">{{ $t('取消') }}</button>
              <button class="order_fd8_0_c2_c1_babdd" @tap.stop="AfterSalesDeleteFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>

        <!---删除售后flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1724469909567" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---确认收货二次确认弹窗flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center order_fd9_0_babdd">
            <text class="order_fd9_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="order_fd9_0_c1_babdd">{{ $t('确定确认收货吗？') }}</text>
            <view class="flex align-center order_fd9_0_c2_babdd">
              <button class="order_fd9_0_c2_c0_babdd" @tap.stop="popupShow1724469909567 = false">{{ $t('取消') }}</button>
              <button class="order_fd9_0_c2_c1_babdd" @tap.stop="confirmReceiptFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>

        <!---确认收货二次确认弹窗flex布局结束-->
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
      popupShow1724469909567: false,
      popupShow1698804416892: false,
      popupShow1698803478291: false,
      popupShow1679650134928: false,
      popupShow1679903057541: false,
      popupShow1711000387246: false,
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
      dataList: [],
      /** cancelId【取消订单】 **/
      cancelId: '',
      cancelType: [],
      dataAfterList: [],
      invoiceData: [],
      /** invoice_id【发票id】 **/
      invoice_id: '',
      /** invoice_order_id【发票订单id】 **/
      invoice_order_id: '',
      /** return_id【取消id】 **/
      return_id: '',
      delete_id: '',
      RefundDeleteID: '',
      listType: '',
      /** takeoverID【确认收货ID】 **/
      takeoverID: '',
      type: 'all',
      keywords: '',
      isNativePay: '',
      currentOrderSn: '',
      systemsInfo: '',
      expandedOrderActionMap: {},
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { type, isNativePay } = options
    if (type !== undefined) this.type = type
    if (isNativePay !== undefined) this.isNativePay = isNativePay
    this.getTabsFunc()
    this.diyPageListen()
    this.setupHostAppPaySuccess()
    this.getmobileFunc()
  },
  onUnload() {
    this.diyOffPageListen()
    this.teardownHostAppPaySuccess()
  },
  onReady() {},
  onShow() {
    this.queryHeadFunc()
    this.queryCancelTypeFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getTabsFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //获取手机号
    getmobileFunc() {
      this.isShowLoading = true
      this.$api
        .post(global.apiUrls.post64534cbb2c352, {
          code: 'tel',
        })
        .then((res) => {
          this.isShowLoading = false
          if (res.data.code == 1) {
            this.systemsInfo = res.data.data
          }
        })
        .catch((err) => {
          this.isShowLoading = false
        })
    },

    //aaa
    backUrl() {
      this.$urouter.switchTab(`/pages/tabBar/myhb/myhb`)
      return
      if (this.isNativePay == 1) {
        this.$urouter.switchTab(`/pages/tabBar/myhb/myhb`)
        return
      }
      this.$urouter.navigateBack(1)
      return
      this.$urouter.switchTab(`/pages/tabBar/myhb/myhb`)
    },
    //订单-删除订单
    async deleteOrderFunc() {
      //请求方法
      //数据验证

      let data6447c3b69f234 = await this.$api.dbGet(global.apiUrls.post6447c3b69f234, {
        order_id: this.delete_id,
      })
      if (!data6447c3b69f234) return
      if (data6447c3b69f234.data.code != 1) {
        this.$message.info(data6447c3b69f234.data.msg)
        return
      }
      let info6447c3b69f234 = data6447c3b69f234.data

      this.popupShow1698803478291 = false
      setTimeout(() => {
        uni.showToast({
          title: this.$t('删除成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }, 300)
      this.getOrderListFunc()
    },
    //预下单-查询发票抬头
    async queryHeadFunc() {
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
    //获取发票订单id
    getinvoice_order_idFunc(id) {
      this.invoice_order_id = id
      this.popupShow1679650134928 = true
    },
    //使用发票
    async isokfapiaoFunc() {
      //请求方法
      //数据验证

      let data641ebe3244065 = await this.$api.dbPost(global.apiUrls.post641ebe3244065, {
        order_id: this.invoice_order_id,
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
      this.getOrderListFunc()
    },
    //订单-订单列表
    getOrderListFunc() {
      this.minixPagingListsApi = global.apiUrls.post62c8f31da5eaa
      this.pageingListApiMethod = 'aPost'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        type: this.type,
        keywords: this.keywords,
      }
      this.listData = []
      this.dataList = this.listData
      this.pagingListToggle()
    },
    //订单搜索
    orderSearchFunc() {
      this.getTabsFunc()
    },
    //清空搜索关键词
    clearKeywordsFunc() {
      if (this.keywords === '') return
      this.keywords = ''
      this.orderSearchFunc()
    },
    //取消订单
    async cancelOrderFunc() {
      if (!validate(this.return_id, 'require')) {
        this.$message.info(this.$t('请选择取消原因'))
        return false
      }
      //请求方法
      //数据验证

      let data62cb8b8438141 = await this.$api.dbPost(global.apiUrls.post62cb8b8438141, {
        order_id: this.cancelId,
        return_id: this.return_id,
      })
      if (!data62cb8b8438141) return
      if (data62cb8b8438141.data.code != 1) {
        this.$message.info(data62cb8b8438141.data.msg)
        return
      }
      let info62cb8b8438141 = data62cb8b8438141.data

      this.popupShow1711000387246 = false
      setTimeout(() => {
        uni.showToast({
          title: this.$t('取消成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.getOrderListFunc()
      }, 300)
    },
    //获取取消订单id
    getCancelIDFunc(id) {
      this.return_id = ''
      this.cancelId = id
      this.popupShow1679903057541 = true
    },
    //订单-查询取消原因
    async queryCancelTypeFunc() {
      //请求方法
      //数据验证

      let datacancelType = await this.$api.get(global.apiUrls.post641ae6544d2d5, {
        type: '2',
        list_rows: '3',
      })

      if (datacancelType.data.code != 1) {
        this.$message.info(datacancelType.data.msg)
        return
      }
      let infocancelType = datacancelType.data
      this.cancelType = infocancelType.data
    },
    //提醒发货
    async remindShipFunc(id) {
      //请求方法
      //数据验证

      let data62bec4f86725d = await this.$api.dbPost(global.apiUrls.post62bec4f86725d, {
        order_id: id,
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
      this.getOrderListFunc()
    },
    //确认收货
    async confirmReceiptFunc() {
      //请求方法
      //数据验证

      let data64218bff49e61 = await this.$api.dbPost(global.apiUrls.post64218bff49e61, {
        order_id: this.takeoverID,
      })
      if (!data64218bff49e61) return
      if (data64218bff49e61.data.code != 1) {
        this.$message.info(data64218bff49e61.data.msg)
        return
      }
      let info64218bff49e61 = data64218bff49e61.data

      this.popupShow1724469909567 = false
      uni.showToast({
        title: this.$t('收货成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.getOrderListFunc()
    },
    //售后-获取售后列表
    queryAfterListFunc() {
      if (this.$util.antiShakeThrottle()) return
      this.minixPagingListsApi = global.apiUrls.post6427d125edfc5
      this.pageingListApiMethod = 'aPost'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        keywords: this.keywords,
      }
      this.listData = []
      this.dataAfterList = this.listData
      this.pagingListToggle()
    },
    //切换tabs
    getTabsFunc() {
      if (this.type != '6') {
        this.getOrderListFunc()
      } else {
        this.queryAfterListFunc()
      }
    },
    //售后删除
    async AfterSalesDeleteFunc() {
      //请求方法
      //数据验证

      let data6427dbbacba58 = await this.$api.dbPost(global.apiUrls.post6427dbbacba58, {
        id: this.RefundDeleteID,
      })
      if (!data6427dbbacba58) return
      if (data6427dbbacba58.data.code != 1) {
        this.$message.info(data6427dbbacba58.data.msg)
        return
      }
      let info6427dbbacba58 = data6427dbbacba58.data

      this.popupShow1698804416892 = false
      setTimeout(() => {
        uni.showToast({
          title: this.$t('删除成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }, 300)
      this.queryAfterListFunc()
    },
    //是否是多包裹
    isMultiplePackagesFunc(type, aid) {
      if (type == '1') {
        this.$urouter.navigateTo(`/pages/ddgl/multiplePackages/multiplePackages?order_id=${aid}`)
      } else if (type == 0) {
        this.$urouter.navigateTo(`/pages/ddgl/logisticsCheck/logisticsCheck?order_id=${aid}`)
      }
    },
    //获取删除订单id
    getDeleteIDFunc(id) {
      this.delete_id = id
      this.popupShow1698803478291 = true
    },
    //获取售后订单id
    getRefundDeleteIDFunc(id) {
      this.RefundDeleteID = id
      this.popupShow1698804416892 = true
    },
    //取消订单确认弹窗
    confirmationPopupFunc() {
      if (!validate(this.return_id, 'require')) {
        this.$message.info(this.$t('请选择取消原因'))
        return false
      }
      this.popupShow1711000387246 = true
      this.popupShow1679903057541 = false
    },
    //获取确认收货ID
    gettakeoverIDFunc(id) {
      this.takeoverID = id
      this.popupShow1724469909567 = true
    },
    pagingListPostData() {
      return this.pagingListPostDataContent
    },
    //页面监听
    diyPageListen() {
      uni.$on('shenqingchengg', (data) => {
        this.getTabsFunc()
      })
      uni.$on('upinvoice', (data) => {
        this.getOrderListFunc()
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('shenqingchengg')
      uni.$off('upinvoice')
    },
    //再来一单：将订单商品加入购物车并跳转购物车
    async orderAgainFunc(item) {
      if (this.$util.antiShakeThrottle()) return
      let goodsList = item.goods || []
      if (!goodsList.length || !goodsList[0].goods_id) {
        uni.showLoading({
          title: this.$t('加载中...'),
          mask: true,
        })
        let datadataDetails = await this.$api.post(global.apiUrls.post62c92b9d5ada3, {
          order_id: item.aid,
          order_type: '3',
        })
        uni.hideLoading()
        if (datadataDetails.data.code != 1) {
          this.$message.info(datadataDetails.data.msg)
          return
        }
        goodsList = datadataDetails.data.data.order_goods_list || []
      }
      if (!goodsList.length) {
        this.$message.info(this.$t('暂无可加入的商品'))
        return
      }
      uni.showLoading({
        title: this.$t('加入购物车中...'),
        mask: true,
      })
      for (const goods of goodsList) {
        let data6412f82acb5ba = await this.$api.post(global.apiUrls.post6412f82acb5ba, {
          goods_id: goods.goods_id,
          sku_id: goods.sku_id,
          num: goods.num || 1,
        })
        if (data6412f82acb5ba.data.code != 1) {
          uni.hideLoading()
          this.$message.info(data6412f82acb5ba.data.msg)
          return
        }
      }
      uni.hideLoading()
      this.$urouter.switchTab('/pages/tabBar/shopping/shopping')
    },
    // 去付款（与 directOrder / redemptDetails 支付跳转逻辑一致）
    async goPayFunc(item) {
      const orderSn = item.order_sn
      if (!orderSn) return
      await this.proceedHostAppPay({
        orderSn,
        amount: item.payable_money,
        orderType: 3,
        source: 'order',
        offerPayExtra: 'order_type=3&payPath=1',
      })
    },
    toggleOrderActionExpand(orderId) {
      this.$set(this.expandedOrderActionMap, orderId, !this.expandedOrderActionMap[orderId])
    },
    getOrderActionButtons(item) {
      const buttons = []
      const pushBtn = (text, btnClass, action) => {
        buttons.push({ text, btnClass, action })
      }
      pushBtn(this.$t('联系商家'), 'order_fd2_0_c3_contact_babdd', () => this.getKefuFunc())
      if (item.goods && item.goods.length) {
        pushBtn(this.$t('再来一单'), 'order_fd2_0_c3_action_babdd', () => this.orderAgainFunc(item))
      }
      if (item.btn_list.apply_invoice == '1') {
        pushBtn(this.$t('申请开票'), 'order_fd2_0_c3_action_babdd', () => this.getinvoice_order_idFunc(item.aid))
      }
      if (item.btn_list.view_invoice == '1') {
        pushBtn(this.$t('查看发票'), 'order_fd2_0_c3_action_babdd', () => {
          this.$urouter.navigateTo(`/pages/fp/invoiceDetail/invoiceDetail?order_id=${item.aid}`)
        })
      }
      if (item.btn_list.view_logistics == '1') {
        pushBtn(this.$t('查看物流'), 'order_fd2_0_c3_action_babdd', () => this.isMultiplePackagesFunc(item.is_multiple_package, item.aid))
      }
      if (item.btn_list.delete_order == '1') {
        pushBtn(this.$t('删除订单'), 'order_fd2_0_c3_action_babdd', () => this.getDeleteIDFunc(item.aid))
      }
      if (item.btn_list.cancel_order == '1') {
        pushBtn(this.$t('取消订单'), 'order_fd2_0_c3_action_babdd', () => this.getCancelIDFunc(item.aid))
      }
      if (item.btn_list.go_pay == '1') {
        pushBtn(this.$t('去付款'), 'order_fd2_0_c3_action_primary_babdd', () => this.goPayFunc(item))
      }
      if (item.btn_list.remind_send == '1') {
        pushBtn(this.$t('提醒发货'), 'order_fd2_0_c3_action_primary_babdd', () => this.remindShipFunc(item.aid))
      }
      if (item.btn_list.confirm_receive == '1') {
        pushBtn(this.$t('确认收货'), 'order_fd2_0_c3_action_primary_babdd', () => this.gettakeoverIDFunc(item.aid))
      }
      if (item.btn_list.evaluate == '1') {
        pushBtn(this.$t('评价'), 'order_fd2_0_c3_action_primary_babdd', () => {
          this.$urouter.navigateTo(`/pages/ddgl/evaluation/evaluation?id=${item.aid}`)
        })
      }
      if (item.btn_list.pay_balance == '1' && item.order_type == '7') {
        pushBtn(this.$t('支付尾款'), 'order_fd2_0_c3_action_primary_babdd', () => {
          this.$urouter.navigateTo(`/pages/sy/offerPay/offerPay?order_sn=${item.final_order_sn}&order_type=3`)
        })
      }
      if (item.status == '0' && item.order_type == 'offline_pay') {
        pushBtn(this.$t('转账详情'), 'order_fd2_0_c3_action_primary_babdd', () => {})
      }
      if (item.btn_list.remind_already == '1') {
        pushBtn(this.$t('已提醒'), 'order_fd2_0_c3_action_primary_babdd', () => {})
      }
      return buttons
    },
    getVisibleOrderActionButtons(item) {
      const buttons = this.getOrderActionButtons(item)
      if (this.expandedOrderActionMap[item.aid] || buttons.length <= 4) {
        return buttons
      }
      return buttons.slice(0, 3)
    },
    showOrderActionExpand(item) {
      return this.getOrderActionButtons(item).length > 4 && !this.expandedOrderActionMap[item.aid]
    },
    showOrderActionCollapse(item) {
      return this.getOrderActionButtons(item).length > 4 && this.expandedOrderActionMap[item.aid]
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

  .order_fd9_0_babdd {
    width: 540rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .order_fd9_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .order_fd9_0_c1_babdd {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .order_fd9_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .order_fd9_0_c2_c0_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid var(--benbenbdColor0);
      }

      .order_fd9_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
      }
    }
  }

  .order_fd8_0_babdd {
    width: 540rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .order_fd8_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .order_fd8_0_c1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .order_fd8_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .order_fd8_0_c2_c0_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        width: 269rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid var(--benbenbdColor0);
      }

      .order_fd8_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        width: 269rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
      }
    }
  }

  .order_flex_7_babdd {
    background: var(--benbenbgColor1);
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .order_fd7_0_babdd {
      font-size: 36rpx;
      font-weight: 800;
      line-height: 44rpx;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 40rpx 0rpx;
    }

    .order_fd7_1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
    }

    .order_fd7_2_babdd {
      margin: 37rpx 0rpx 0rpx 0rpx;

      .order_fd7_2_c0_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        border-top: 1px solid var(--benbenbdColor0);
        width: 269rpx;
      }

      .order_fd7_2_c1_babdd {
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

  .order_flex_6_babdd {
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    background: var(--benbenbgColor1);
    padding: 41rpx 24rpx 40rpx 24rpx;

    .order_fd6_0_babdd {
      position: relative;

      .order_fd6_0_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 36rpx;
        font-weight: 500;
        line-height: 50rpx;
        margin: 0rpx 24rpx 0rpx 24rpx;
      }

      .order_fd6_0_c3_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        position: absolute;
        top: -16rpx;
        right: 0rpx;
      }
    }

    .order_fd6_1_babdd {
      touch-action: none;
      height: 40vh;
      width: 702rpx;

      .order_fd6_1_c1_babdd {
        width: 100%;
        padding: 50rpx 0rpx 50rpx 0rpx;

        .order_fd6_1_c1_c0_babdd {
          width: 400rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }
      }
    }

    .order_fd6_3_babdd {
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

  .order_fd6_0_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: var(--benbenbgColor1);
    padding: 32rpx 32rpx 32rpx 32rpx;
    margin: 32rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 32rpx;
  }

  .order_fd6_1_c0_c0_c1_c0_c0_babdd {
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

  .order_fd6_1_c0_c0_c1_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 16rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .order_fd6_1_c0_c0_c1_c0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .order_fd6_1_c0_c0_c1_c0_c2_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    background: var(--benbenbgColor8);
    padding: 0rpx 8rpx 0rpx 8rpx;
  }

  .order_fd6_1_c0_c0_c1_c0_c2_c0_1_babdd {
    color: #b82441;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_babdd {
    margin: 16rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_c0_c0_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_c0_c0_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 0rpx 0rpx 10rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_c0_c1_babdd {
    margin: 8rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_c1_c0_babdd {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .order_fd6_1_c0_c0_c1_c1_c1_c1_babdd {
    color: var(--benbenFontColor1);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .order_fd6_2_babdd {
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
    width: 686rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 56rpx 8rpx 24rpx 8rpx;
  }

  .order_flex_5_babdd {
    padding: 16rpx 24rpx 0rpx 24rpx;

    .order_fd5_0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      padding: 0rpx 24rpx 0rpx 24rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

      .order_fd5_0_c0_babdd {
        padding: 24rpx 0rpx 20rpx 0rpx;
        border-bottom: 1px solid var(--benbenbdColor0);

        .order_fd5_0_c0_c0_babdd {
          line-height: 36rpx;
          font-size: 26rpx;
          font-weight: 500;
          color: var(--benbenFontColor0);
          max-width: none;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0rpx auto 0rpx 0rpx;
        }

        .order_fd5_0_c0_c1_babdd {
          color: var(--benbenFontColor4);
          font-size: 22rpx;
          font-weight: 500;
          border-radius: 40rpx 40rpx 0rpx 40rpx;
          border: 1px solid var(--benbenbdColor2);
          background: var(--benbenbgColor1);
          padding: 0rpx 10rpx 0rpx 10rpx;
          margin: 0rpx 10rpx 0rpx 0rpx;
          line-height: 32rpx;
          height: 32rpx;
        }
      }

      .order_fd5_0_c1_babdd {
        margin: 20rpx 0rpx 0rpx 0rpx;

        .order_fd5_0_c1_c0_babdd {
          width: 160rpx;
          height: 160rpx;
          border-radius: 12rpx 12rpx 12rpx 12rpx;
          flex-shrink: 0;
        }

        .order_fd5_0_c1_c1_babdd {
          margin: 0rpx 0rpx 0rpx 20rpx;

          .order_fd5_0_c1_c1_c0_babdd {
            line-height: 40rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: var(--benbenFontColor0);
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }

          .order_fd5_0_c1_c1_c1_babdd {
            line-height: 33rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: var(--benbenFontColor1);
            margin: 8rpx 0rpx auto 0rpx;
          }

          .order_fd5_0_c1_c1_c2_c0_c0_babdd {
            line-height: 40rpx;
            font-size: 22rpx;
            font-weight: 700;
            color: var(--benbenFontColor0);
          }

          .order_fd5_0_c1_c1_c2_c0_c1_babdd {
            color: var(--benbenFontColor0);
            font-weight: 700;
            line-height: 40rpx;
            font-size: 22rpx;

            .order_price1_fd5_0_c1_c1_c2_c0_c1_babdd {
              font-size: 32rpx;
            }

            .order_price2_fd5_0_c1_c1_c2_c0_c1_babdd {
              font-size: 22rpx;
            }
          }
        }
      }

      .order_fd5_0_c2_babdd {
        margin: 0rpx 0rpx 0rpx 0rpx;
        padding: 20rpx 0rpx 24rpx 0rpx;
        border-top: 1px solid var(--benbenbdColor0);
      }
    }
  }

  .order_fd5_0_c0_c1_1_babdd {
    color: rgba(47, 152, 254, 1);
    font-size: 22rpx;
    font-weight: 500;
    border-radius: 40rpx 40rpx 0rpx 40rpx;
    border: 1px solid rgba(47, 152, 254, 1);
    background: rgba(47, 152, 254, 0.06);
    padding: 0rpx 10rpx 0rpx 10rpx;
    margin: 0rpx 10rpx 0rpx 0rpx;
    line-height: 32rpx;
    height: 32rpx;
  }

  .order_fd5_0_c0_c2_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: var(--benbenFontColor0);
  }

  .order_fd5_0_c0_c2_c0_1_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: var(--benbenFontColor5);
  }

  .order_fd5_0_c1_c1_c2_c1_c0_babdd {
    line-height: 33rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .order_fd5_0_c2_c0_babdd {
    border-radius: 28rpx 28rpx 28rpx 28rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor0);
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .order_fd5_0_c2_c1_babdd {
    border-radius: 28rpx 28rpx 28rpx 28rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor0);
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
  }

  .order_flex_4_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;

    .order_fd4_0_babdd {
      border-radius: 24rpx 24rpx 0rpx 0rpx;

      .order_fd4_0_c0_babdd {
        padding: 32rpx 32rpx 32rpx 32rpx;

        .order_fd4_0_c0_c0_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor2);
          line-height: 40rpx;
        }

        .order_fd4_0_c0_c1_babdd {
          font-size: 36rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
        }

        .order_fd4_0_c0_c2_babdd {
          font-size: 28rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          line-height: 40rpx;
        }
      }

      .order_fd4_0_c1_babdd {
        background: var(--benbenbgColor0);

        .order_fd4_0_c1_c0_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
          margin: 25rpx 24rpx 25rpx 24rpx;
        }
      }

      .order_fd4_0_c2_babdd {
        touch-action: none;
        width: 686rpx;
        margin: 0rpx auto 40rpx auto;
        height: 40vh;
      }
    }
  }

  .order_fd4_0_c2_c0_c0_babdd {
    padding: 20rpx 0rpx 20rpx 0rpx;
  }

  .order_fd4_0_c2_c0_c0_c0_babdd {
    color: var(--benbenFontColor0);
  }

  .order_fd4_0_c2_c0_c0_c1_babdd {
    width: 32rpx;
    height: 32rpx;
  }

  .order_fd3_0_babdd {
    width: 540rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    overflow: hidden;

    .order_fd3_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .order_fd3_0_c1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .order_fd3_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .order_fd3_0_c2_c0_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor1);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid var(--benbenbdColor0);
        border-radius: 0rpx 0rpx 0rpx 16rpx;
      }

      .order_fd3_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
        border-radius: 0rpx 0rpx 16rpx 0rpx;
      }
    }
  }

  .order_flex_2_babdd {
    padding: 16rpx 24rpx 0rpx 24rpx;

    .order_fd2_0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      padding: 0rpx 24rpx 0rpx 24rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

      .order_fd2_0_c0_babdd {
        padding: 24rpx 0rpx 20rpx 0rpx;
        border-bottom: 1px solid var(--benbenbdColor0);

        .order_fd2_0_c0_c1_babdd {
          line-height: 36rpx;
          font-size: 26rpx;
          font-weight: 500;
          color: var(--benbenbtnColor0);
          margin: 0rpx 0rpx 0rpx 16rpx;
          flex-shrink: 0;
        }
      }

      .order_fd2_0_c1_babdd {
        margin: 20rpx 0rpx 0rpx 0rpx;

        .order_fd2_0_c1_c0_babdd {
          width: 160rpx;
          height: 160rpx;
          border-radius: 12rpx 12rpx 12rpx 12rpx;
          flex-shrink: 0;
        }

        .order_fd2_0_c1_c1_babdd {
          margin: 0rpx 0rpx 0rpx 20rpx;
          min-height: 160rpx;
          display: flex;
          flex-direction: column;

          .order_fd2_0_c1_c1_c0_babdd {
            line-height: 40rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: var(--benbenFontColor0);
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }

          .order_fd2_0_c1_c1_c1_babdd {
            line-height: 34rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: var(--benbenFontColor1);
            margin: 8rpx 0rpx 0rpx 0rpx;
          }

          .order_fd2_0_c1_c1_c2_c0_c0_babdd {
            line-height: 40rpx;
            font-size: 22rpx;
            font-weight: 600;
            color: var(--benbenFontColor0);
          }
        }
      }

      .order_fd2_0_c2_babdd {
        padding: 20rpx 0rpx 0rpx 0rpx;
        margin-top: 8rpx;

        .order_fd2_0_c2_c2_babdd {
          margin: 0rpx 16rpx 0rpx 0rpx;
          line-height: 36rpx;
          font-size: 26rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
        }

        .order_fd2_0_c2_c3_babdd {
          line-height: 36rpx;
          font-size: 26rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
          margin: 0rpx 8rpx 0rpx 0rpx;
        }

        .order_fd2_0_c2_c3_1_babdd {
          line-height: 36rpx;
          font-size: 26rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
          margin: 0rpx 8rpx 0rpx 0rpx;
        }

        .order_fd2_0_c2_c4_babdd {
          line-height: 40rpx;
          font-size: 26rpx;
          font-weight: 600;
          color: var(--benbenFontColor0);
        }
      }

      .order_fd2_0_c3_babdd {
        margin: 0rpx 0rpx 0rpx 0rpx;
        padding: 20rpx 0rpx 24rpx 0rpx;
        border-top: 1px solid var(--benbenbdColor0);
      }
    }
  }

  .order_fd2_0_c1_price_row_babdd {
    margin-top: auto;
    padding-top: 12rpx;
  }

  .order_status_wrap_babdd {
    flex-shrink: 0;
  }

  .order_refund_tag_babdd {
    line-height: 32rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: var(--benbenbtnColor0);
    border: 1px solid var(--benbenbtnColor0);
    border-radius: 4rpx;
    padding: 0 8rpx;
    margin: 0 8rpx 0 0;
    flex-shrink: 0;
  }

  .order_sn_wrap_babdd {
    min-width: 0;
    margin-right: 16rpx;
  }

  .order_sn_label_babdd {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    flex-shrink: 0;
  }

  .order_sn_value_babdd {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .order_fd2_0_c0_c1_1_babdd {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: var(--benbenbtnColor0);
    flex-shrink: 0;
  }

  .order_fd2_0_c0_c1_closed_babdd {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    flex-shrink: 0;
  }

  .order_fd2_0_c1_c1_c2_c0_c1_babdd {
    color: var(--benbenFontColor0);
    font-weight: 700;
    line-height: 40rpx;
    font-size: 22rpx;
  }

  .order_price1_fd2_0_c1_c1_c2_c0_c1_babdd {
    font-size: 30rpx;
  }

  .order_price2_fd2_0_c1_c1_c2_c0_c1_babdd {
    font-size: 22rpx;
  }

  .order_fd2_0_c1_c1_c2_c1_c0_babdd {
    line-height: 40rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    margin-left: 12rpx;
  }

  .order_fd2_0_c2_c0_babdd {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .order_fd2_0_c3_bar_babdd {
    width: 100%;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
  }

  .order_fd2_0_c3_bar--expanded_babdd {
    flex-wrap: wrap;
  }

  .order_fd2_0_c3_contact_babdd {
    flex-shrink: 0;
    border-radius: 32rpx;
    font-size: 24rpx;
    background: #ffffff;
    color: var(--benbenbtnColor0);
    border: 1px solid var(--benbenbtnColor0);
    min-width: 144rpx;
    height: 60rpx;
    line-height: 58rpx;
    font-weight: 500;
    margin: 0 0 12rpx 12rpx;
    padding: 0 20rpx;
    white-space: nowrap;
  }

  .order_fd2_0_c3_action_babdd,
  .order_fd2_0_c3_action_primary_babdd {
    flex-shrink: 0;
    border-radius: 32rpx;
    font-size: 24rpx;
    height: 60rpx;
    line-height: 60rpx;
    min-width: 144rpx;
    padding: 0 20rpx;
    margin: 0 0 12rpx 12rpx;
    white-space: nowrap;
  }

  .order_fd2_0_c3_action_babdd {
    background: #f5f5f5;
    color: #666666;
  }

  .order_fd2_0_c3_action_primary_babdd {
    background: var(--benbenbtnColor0);
    color: #fff;
  }

  .checkTitlefd1_0_babdd {
    font-weight: 600 !important;
    font-size: 30rpx !important;
    color: var(--benbenbtnColor0) !important;
    background-color: var(--benbenbgColor1) !important;
  }

  .order_linefd1_0_babdd {
    width: 40rpx;
    height: 8rpx;
    top: 80rpx;
    background: var(--benbenbtnColor0);
    background-size: 100% auto !important;
    border-radius: 80rpx 80rpx 80rpx 80rpx;
  }

  .order_titlefd1_0_c3_babdd {
    margin: 0rpx 52rpx 0rpx 24rpx;
  }

  .order_titlefd1_0_c4_babdd {
    margin: 0rpx 52rpx 0rpx 0rpx;
  }

  .order_titlefd1_0_c8_babdd {
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .order_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbtnColor1);
    background-size: 100% auto !important;
    border-bottom: 1px solid var(--benbenbdColor0);
    padding: 0 24rpx 0 0;
  }

  .order_fd0_0_babdd {
    width: 64rpx;
    height: 88rpx;
    flex-shrink: 0;

    .order_fd0_0_c0_babdd {
      width: 18rpx;
      height: 32rpx;
      margin: 0rpx 0rpx 0rpx 24rpx;
    }
  }

  .order_search_wrap_babdd {
    height: 68rpx;
    margin-left: 4rpx;
    padding: 0rpx 8rpx 0rpx 20rpx;
    background: var(--benbenbgColor0);
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    overflow: hidden;
  }

  .order_search_icon_babdd {
    font-size: 28rpx;
    color: var(--benbenFontColor1);
    margin-right: 12rpx;
    flex-shrink: 0;
  }

  .order_search_input_babdd {
    font-size: 26rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    min-width: 0;
  }

  .order_search_clear_babdd {
    width: 32rpx;
    height: 32rpx;
    margin: 0rpx 8rpx;
    flex-shrink: 0;
  }

  .order_search_btn_text_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenbtnColor0);
    line-height: 68rpx;
    padding: 0rpx 20rpx 0rpx 12rpx;
    flex-shrink: 0;
  }
}

::v-deep .order_benbenTabsfd1_0_babdd {
  width: 750rpx;
  height: 88rpx;
  white-space: nowrap;
  background: var(--benbenbtnColor1);
  text-align: center;
  font-size: 28rpx;
  font-weight: 400;
  color: var(--benbenFontColor1);
  border-bottom: 1px solid var(--benbenbdColor0);
}
</style>
