<template>
  <page-body :is-tabbar="true" page-path="/pages/tabBar/home/home">
    <view class="page">
      <view
        class="flex flex-direction align-around benben-position-layout flex home_flex_0_babdd"
        :style="{ height: headerWrapHeightRpx + 'rpx', paddingTop: headerTopRpx + 'rpx' }"
      >
        <view class="flex align-center home_fd0_0_babdd" style="margin-top: 24rpx">
          <view class="flex align-center home_fd0_0_side_babdd" @tap.stop="exitShopFunc">
            <text class="fu-iconfont2 home_fd0_0_back_icon_babdd">&#xE794;</text>
          </view>
          <text class="home_fd0_0_c0_babdd flex-sub">{{ $t('宠悦悦商城') }}</text>
          <view
            class="flex align-center justify-end home_fd0_0_side_babdd home_fd0_0_c1_babdd"
            @tap="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/myNews/myNews`"
            v-if="appSystemIdentification != 'Wechat'"
          >
            <image
              class="home_fd0_0_c1_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '14.png'"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/wd/signinPage/signinPage`"
            ></image>
            <image class="home_fd0_0_c1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '15.png'"></image>
            <benben-message-num
              class="home_fd0_0_c1_c2_babdd"
              :message-num="messageNum.all"
              size="20"
              color="#fff"
              background-color="#FD433C"
              v-if="messageNum.all != ''"
            ></benben-message-num>
          </view>
          <view v-else class="home_fd0_0_side_babdd"></view>
        </view>
        <view class="flex flex-wrap align-center home_fd0_1_babdd" v-if="appSystemIdentification != 'Wechat'">
          <image class="home_fd0_1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '16.png'"></image>
          <view style="position: relative">
            <swiper
              ref="benbenSwiperfd0_1_c1"
              @change="bannerIndexfd0_1_c1 = $event.detail.current"
              class="flex position-relative home_fd0_1_c1_babdd"
              previous-margin="0rpx"
              next-margin="0rpx"
              :display-multiple-items="1"
              :vertical="true"
              :interval="5000"
              :duration="500"
              :autoplay="true"
              :circular="true"
            >
              <template v-for="(item, key0) in faxianList">
                <swiper-item
                  class="flex home_fd0_1_c1_c1_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/sy/search/search?name=${item.name}`"
                  :key="key0"
                >
                  <text class="home_fd0_1_c1_c1_c0_babdd">{{ item.name }}</text>
                </swiper-item>
              </template>
            </swiper>
          </view>
        </view>
      </view>
      <view :style="{ height: headerWrapHeightRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction align-stretch home_fd3_0_babdd">
          <view class="flex flex-direction align-stretch" v-if="tabs == 0 && dataList.diy_cate_list.length > 0">
            <view style="position: relative">
              <swiper
                ref="benbenSwiperfd3_0_c0_c0"
                :current="bannerIndexfd3_0_c0_c0"
                @change="bannerIndexfd3_0_c0_c0 = $event.detail.current"
                class="flex position-relative home_fd3_0_c0_c0_babdd"
                :style="{ height: `${Math.ceil(dataList.diy_cate_list[0].child.length / 5) * 160 + 40 + 'rpx'}` }"
                previous-margin="0rpx"
                next-margin="0rpx"
                :display-multiple-items="1"
                :interval="5000"
                :duration="500"
              >
                <template v-for="(item, key0) in dataList.diy_cate_list">
                  <swiper-item class="flex home_fd3_0_c0_c0_c1_babdd" :style="{ 'align-items': `start` }" :key="key0">
                    <view class="flex flex-wrap align-stretch home_fd3_0_c0_c0_c1_babdd">
                      <template v-for="(child, key1) in item.child">
                        <view
                          class="flex flex-direction flex-wrap align-center self-center justify-center home_fd3_0_c0_c0_c1_c0_c0_babdd"
                          @tap.stop="golistFunc(child)"
                          :key="key1"
                        >
                          <image class="home_fd3_0_c0_c0_c1_c0_c0_c0_babdd" mode="aspectFill" :src="child.thumb"></image>
                          <text class="home_fd3_0_c0_c0_c1_c0_c0_c1_babdd">{{ child.name }}</text>
                        </view>
                      </template>
                    </view>
                  </swiper-item>
                </template>
              </swiper>
              <view style="position: absolute" class="flex dot flex align-center justify-center home_swiperDotfd3_0_c0_c0_babdd">
                <template v-for="(item, index) in dataList.diy_cate_list.length">
                  <view
                    :key="index"
                    v-if="bannerIndexfd3_0_c0_c0 == index"
                    class="flex dot selected flex align-center justify-center home_swiperDotSelectedfd3_0_c0_c0_babdd"
                  ></view>
                  <view
                    :key="index"
                    v-else
                    class="flex dot unselected flex align-center justify-center home_swiperDotUnselectedfd3_0_c0_c0_babdd"
                  ></view>
                </template>
              </view>
            </view>
          </view>
          <view
            style="position: relative"
            v-if="tabs != 0 && secondaryClassifieds.diy_category_list && secondaryClassifieds.diy_category_list.length > 0"
          >
            <swiper
              ref="benbenSwiperfd3_0_c3"
              :current="bannerIndexfd4_0_c3"
              @change="bannerIndexfd3_0_c3 = $event.detail.current"
              class="flex position-relative home_fd3_0_c3_babdd"
              :style="{ height: `${Math.ceil(secondaryClassifieds.diy_category_list[0].child.length / 5) * 160 + 40 + 'rpx'}` }"
              previous-margin="0rpx"
              next-margin="0rpx"
              :display-multiple-items="1"
              :interval="5000"
              :duration="500"
              :circular="true"
            >
              <template v-for="(item, key0) in secondaryClassifieds.diy_category_list">
                <swiper-item class="flex home_fd3_0_c0_c0_c1_babdd" :style="{ 'align-items': `start` }" :key="key0">
                  <view class="flex flex-wrap align-stretch home_fd3_0_c0_c0_c1_babdd">
                    <template v-for="(child, key1) in item.child">
                      <view
                        class="flex flex-direction flex-wrap align-center self-center justify-center home_fd3_0_c0_c0_c1_c0_c0_babdd"
                        @tap.stop="golistFunc(child)"
                        :key="key1"
                      >
                        <image class="home_fd3_0_c0_c0_c1_c0_c0_c0_babdd" mode="aspectFill" :src="child.thumb"></image>
                        <text class="home_fd3_0_c0_c0_c1_c0_c0_c1_babdd">{{ child.name }}</text>
                      </view>
                    </template>
                  </view>
                </swiper-item>
              </template>
            </swiper>
            <view style="position: absolute" class="flex dot flex align-center justify-center home_swiperDotfd3_0_c0_c0_babdd">
              <template v-for="(item, index) in secondaryClassifieds.diy_category_list.length">
                <view
                  :key="index"
                  v-if="bannerIndexfd3_0_c3 == index"
                  class="flex dot selected flex align-center justify-center home_swiperDotSelectedfd3_0_c3_babdd"
                ></view>
                <view
                  :key="index"
                  v-else
                  class="flex dot unselected flex align-center justify-center home_swiperDotUnselectedfd3_0_c0_c0_babdd"
                ></view>
              </template>
            </view>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-wrap align-center justify-center benben-flex-layout" v-if="tabs == 0">
        <view style="position: relative">
          <swiper
            ref="benbenSwiperfd4_0"
            :current="index"
            @change="changeSwiperFunc($event)"
            class="flex position-relative home_fd4_0_babdd"
            previous-margin="0rpx"
            next-margin="0rpx"
            :display-multiple-items="1"
            :interval="5000"
            :duration="500"
            :autoplay="true"
            :circular="true"
          >
            <template v-for="(item, key0) in dataRotograph">
              <swiper-item class="flex home_fd4_0_babdd" :key="key0">
                <image class="home_fd4_0_c1_c0_babdd" mode="aspectFill" :src="item.thumb" @tap.stop="gothumbFunc(item.href)"></image>
              </swiper-item>
            </template>
          </swiper>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout home_flex_5_babdd" v-if="tabs == 0">
        <view
          class="flex flex-wrap align-center home_fd5_0_babdd"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/sy/articleList/articleList`"
        >
          <image class="home_fd5_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '816.png'"></image>

          <view class="flex home_fd5_0_c1_babdd"></view>

          <view style="position: relative">
            <swiper
              ref="benbenSwiperfd5_0_c2"
              :current="message_index"
              @change="bannerIndexfd5_0_c2 = $event.detail.current"
              class="flex position-relative home_fd5_0_c2_babdd"
              previous-margin="0rpx"
              next-margin="0rpx"
              :display-multiple-items="1"
              :vertical="true"
              :interval="5000"
              :duration="500"
              :autoplay="true"
              :circular="true"
            >
              <template v-for="(item, key0) in articleList">
                <swiper-item class="flex home_fd5_0_c2_babdd" :key="key0">
                  <view
                    class="flex flex-wrap align-center home_fd5_0_c2_c1_c0_babdd"
                    @tap.stop="handleJumpDiy"
                    data-type="navigateTo"
                    :data-url="`/pages/sy/articleDetails/articleDetails?id=${item.aid}`"
                  >
                    <text class="flex-sub home_fd5_0_c2_c1_c0_c0_babdd">{{ item.title }}</text>
                  </view>
                </swiper-item>
              </template>
            </swiper>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="home_fd5_0_c3_c0_babdd" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/sy/articleList/articleList`">
              {{ $t('更多') }}
            </text>
            <image class="home_fd5_0_c3_c1_babdd" mode="aspectFit" :src="STATIC_URL + '817.png'"></image>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout home_flex_6_babdd">
        <view class="flex flex-wrap align-center">
          <template v-for="(item, key0) in navCentral">
            <view class="flex flex-wrap align-center home_fd6_0_c0_babdd" @tap.stop="toLunFunc(item.href)" :key="key0">
              <image class="home_fd6_0_c0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
            </view>
          </template>
        </view>
        <view class="flex align-center home_fd6_1_babdd" v-if="tabs == '0'">
          <template v-for="(item, key0) in leftAdvertisement">
            <view class="flex flex-wrap align-center" @tap.stop="toLunFunc(item.href)" v-if="key0 < '1'" :key="key0">
              <image class="home_fd6_1_c0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
            </view>
          </template>

          <view class="flex flex-wrap align-center flex-sub">
            <template v-for="(item, key0) in leftAdvertisement">
              <view class="flex flex-wrap align-center" @tap.stop="toLunFunc(item.href)" v-if="key0 > 0" :key="key0">
                <image class="home_fd6_1_c1_c0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
              </view>
            </template>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex benben-flex-layout flex-wrap align-center home_flex_7_babdd">
        <template v-for="(item, key0) in subadvertisement">
          <view class="flex flex-wrap align-center home_fd7_0_babdd" v-if="tabs == '0'" :key="key0">
            <image class="home_fd7_0_c0_babdd" mode="scaleToFill" :src="item.thumb" @tap.stop="conterGoPageFunc(item.href)"></image>
          </view>
        </template>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout home_flex_8_babdd">
        <view class="flex flex-direction align-stretch justify-between home_fd8_0_babdd" v-if="tabs == '0'">
          <benben-select-diy
            ref="showSelectPopup1687330721289"
            class-text="align-center justify-between flex"
            :items.sync="tjStatusType"
            v-model="tjStatus"
            @change="goodsListFunc()"
            default-type="value"
            default-label="name"
            :allow-cancel="false"
            type="radio"
            :disabled="false"
          >
            <benben-select-item v-for="(item, key0) in tjStatusType" :hand-value="item.value" :key="key0">
              <template #selected>
                <view class="flex align-center flex">
                  <view class="flex flex-direction flex-wrap align-center home_fd8_0_c0_c0_c0_babdd">
                    <text class="home_fd8_0_c0_c0_c0_c0_babdd">{{ item.name }}</text>
                    <text class="home_fd8_0_c0_c0_c0_c1_babdd">{{ item.label }}</text>
                    <image class="home_fd8_0_c0_c0_c0_c2_babdd" mode="aspectFit" :src="STATIC_URL + '1558.png'"></image>
                  </view>
                </view>
              </template>
              <template #no-selected>
                <view class="flex align-center flex">
                  <view class="flex flex-direction flex-wrap align-center home_fd8_0_c0_c0_c0_babdd">
                    <text class="home_fd8_0_c0_c1_c0_c0_babdd">{{ item.name }}</text>
                    <text class="home_fd8_0_c0_c1_c0_c1_babdd">{{ item.label }}</text>
                  </view>
                </view>
              </template>
            </benben-select-item>
          </benben-select-diy>
        </view>
        <view class="flex-sub">
          <benben-waterfalls
            ref="waterfalls1706931710311"
            :waterfall-data.sync="waterfallsfd8_1"
            v-model="dataGoodsList"
            id-key="aid"
            add-time="200"
            column-count="2"
            left-gap="0"
            right-gap="0"
            column-gap="20rpx"
          >
            <benben-waterfalls-item :sort-index="sortIndex" :key="sortIndex" v-for="(waterfall, sortIndex) in waterfallsfd8_1">
              <template v-for="waterfallIndex in waterfall">
                <template v-if="dataGoodsList[waterfallIndex]">
                  <view
                    class="flex flex-direction align-stretch home_fd8_1_c0_babdd"
                    @tap.stop="handleJumpDiy"
                    data-type="navigateTo"
                    :data-url="`/pages/fl/shopDetail/shopDetail?id=${dataGoodsList[waterfallIndex].aid}`"
                    :key="waterfallIndex"
                  >
                    <image class="home_fd8_1_c0_c0_babdd" mode="widthFix" :src="dataGoodsList[waterfallIndex].thumb"></image>
                    <view class="home_fd8_1_c0_c1_babdd">
                      <text class="home_fd8_1_c0_c1_c0_babdd" v-if="dataGoodsList[waterfallIndex].is_new == '1'">{{ $t('新品') }}</text>
                      <text class="home_fd8_1_c0_c1_c1_babdd">{{ dataGoodsList[waterfallIndex].name }}</text>
                    </view>
                    <view class="flex flex-wrap align-center home_fd8_1_c0_c2_babdd">
                      <view class="flex flex-wrap align-center" v-if="dataGoodsList[waterfallIndex].active_info.active_id">
                        <text class="home_fd8_1_c0_c2_c0_c0_babdd" v-if="dataGoodsList[waterfallIndex].active_info.type == '1'">
                          {{ $t('秒杀') }}
                        </text>
                        <text class="home_fd8_1_c0_c2_c0_c0_1_babdd" v-if="dataGoodsList[waterfallIndex].active_info.type == '2'">
                          {{ $t('拼团') }}
                        </text>
                        <text class="home_fd8_1_c0_c2_c0_c0_1_babdd" v-if="dataGoodsList[waterfallIndex].active_info.type == '3'">
                          {{ $t('预售') }}
                        </text>
                        <text class="home_fd8_1_c0_c2_c0_c0_1_babdd" v-if="dataGoodsList[waterfallIndex].active_info.type == '4'">
                          {{ $t('特价') }}
                        </text>
                      </view>
                      <text class="home_fd8_1_c0_c2_c1_babdd">{{ $t('￥') }}</text>
                      <text class="home_fd8_1_c0_c2_c2_babdd">
                        <text class="home_price1_fd8_1_c0_c2_c2_babdd">{{ dataGoodsList[waterfallIndex].shop_price | frontPrice }}</text>
                        <text class="home_price2_fd8_1_c0_c2_c2_babdd">{{ dataGoodsList[waterfallIndex].shop_price | laterPrice }}</text>
                      </text>
                      <text class="home_fd8_1_c0_c2_c3_babdd">{{ $t('销量') }}</text>
                      <text class="home_fd8_1_c0_c2_c4_babdd">{{ dataGoodsList[waterfallIndex].sales_sum }}</text>
                    </view>

                    <view class="flex flex-wrap align-center home_fd8_1_c0_c4_babdd">
                      <view class="flex flex-wrap align-center home_fd8_1_c0_c4_c0_babdd" v-if="dataGoodsList[waterfallIndex].discounts != price">
                        <text class="home_fd8_1_c0_c4_c0_c0_babdd">{{ $t('自购返') }}</text>
                      </view>
                      <view class="flex flex-wrap align-center home_fd8_1_c0_c4_c1_babdd" v-if="dataGoodsList[waterfallIndex].share_award_money > 0">
                        <text class="home_fd8_1_c0_c4_c1_c0_babdd">{{ $t('分享赚') }}</text>
                      </view>
                      <view class="flex flex-wrap align-center home_fd8_1_c0_c4_c1_babdd" v-if="dataGoodsList[waterfallIndex].coupon.name">
                        <text class="home_fd8_1_c0_c4_c1_c0_babdd">{{ dataGoodsList[waterfallIndex].coupon.name }}</text>
                      </view>
                    </view>
                    <view class="flex flex-wrap align-center home_fd8_1_c0_c5_babdd" v-if="shopType.status == '1'">
                      <image class="home_fd8_1_c0_c5_c0_babdd" mode="aspectFill" :src="dataGoodsList[waterfallIndex].shop_info.store_logo"></image>
                      <text class="home_fd8_1_c0_c5_c1_babdd">{{ dataGoodsList[waterfallIndex].shop_info.store_name }}</text>
                    </view>
                  </view>
                </template>
              </template>
            </benben-waterfalls-item>
          </benben-waterfalls>
        </view>
        <fu-empty
          :pagingListLoadedAll="pagingListLoadedAll"
          :pagingListNoListData="pagingListNoListData"
          :listDataLength="listDataLength"
          :isLoadInit="isLoadInit"
        ></fu-empty>
        <!--     <view   class='flex flex-wrap align-center justify-between'      >
            <template v-for = '(item,key0) in dataGoodsList'>
    <view   class='flex flex-direction flex-wrap align-stretch home_fd8_2_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"    :key='key0'>
        <image class='home_fd8_2_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'></image>
<text class='home_fd8_2_c0_c1_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center home_fd8_1_c0_c2_babdd'      >
        <text class='home_fd8_2_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' home_fd8_2_c0_c2_c1_babdd'   >
    <text class=' home_price1_fd8_1_c0_c2_c2_babdd' >{{ item.shop_price | frontPrice }}</text><text class=' home_price2_fd8_1_c0_c2_c2_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
    <view   class='flex flex-wrap align-center home_fd8_2_c0_c2_c2_babdd'    v-if= " item.discounts!=price"  >
            <view   class='flex flex-wrap align-center home_fd8_2_c0_c2_c2_c0_babdd'      >
        </view>
<text class='home_fd8_2_c0_c2_c2_c1_babdd'  >{{item.discounts}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center home_fd8_1_c0_c5_babdd'      >
        <text class='home_fd8_2_c0_c3_c0_babdd'  >{{$t('￥')}}</text>
<text class='home_fd8_2_c0_c3_c0_babdd'  >{{item.market_price}}</text>
<text class='home_fd8_2_c0_c3_c2_babdd'  >{{$t('销量')}}</text>
<text class='home_fd8_1_c0_c2_c4_babdd'  >{{item.sales_sum}}</text>
</view>
    <view   class='flex flex-wrap align-center home_fd8_2_c0_c4_babdd'    v-if= " item.share_award_money>0"  >
        <image class='home_fd8_2_c0_c4_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"813.png"'></image>
<text class='home_fd8_2_c0_c4_c1_babdd'  >{{$t('分享赚')}}</text>
<text class='home_fd8_2_c0_c4_c1_babdd'  >{{$t('￥')}}</text>
<text class='home_fd8_2_c0_c4_c1_babdd'  >{{item.share_award_money}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
 -->
      </view>

      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1685609745125" :mask="true" :mask-close-able="true" mode="center">
        <!---优惠券弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout home_flex_9_babdd">
          <view class="flex flex-direction flex-wrap align-stretch home_fd9_0_babdd">
            <scroll-view class="home_fd9_0_c0_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="true" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <template v-for="(item, key0) in treatmentList">
                  <view class="flex flex-direction flex-wrap align-stretch home_fd9_0_c0_c0_babdd" :key="key0">
                    <view class="flex flex-wrap align-center home_fd9_0_c0_c0_c0_babdd">
                      <view class="flex flex-direction flex-wrap align-center home_fd9_0_c0_c0_c0_c0_babdd">
                        <view class="flex flex-wrap align-center">
                          <text class="home_fd9_0_c0_c0_c0_c0_c0_c0_babdd">{{ $t('￥') }}</text>
                          <text class="home_fd9_0_c0_c0_c0_c0_c0_c1_babdd">{{ item.money }}</text>
                        </view>
                        <view class="flex flex-wrap align-center">
                          <text class="home_fd9_0_c0_c0_c0_c0_c1_c0_babdd">{{ $t('满') }}</text>
                          <text class="home_fd9_0_c0_c0_c0_c0_c1_c0_babdd">{{ item.min_order_money }}</text>
                          <text class="home_fd9_0_c0_c0_c0_c0_c1_c0_babdd">{{ $t('可减') }}</text>
                        </view>
                      </view>
                      <view class="flex flex-direction flex-wrap align-stretch flex-sub home_fd9_0_c0_c0_c0_c1_babdd">
                        <text class="home_fd9_0_c0_c0_c0_c1_c0_babdd">{{ item.name }}</text>
                        <view class="flex flex-wrap align-center">
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <text class="home_fd9_0_c0_c0_c0_c1_c1_c0_c0_babdd">{{ item.content }}</text>
                            <view class="flex flex-wrap align-center home_fd9_0_c0_c0_c0_c1_c1_c0_c1_babdd">
                              <text class="home_fd9_0_c0_c0_c0_c1_c1_c0_c1_c0_babdd">{{ $t('有效期至：') }}</text>
                              <text class="home_fd9_0_c0_c0_c0_c1_c1_c0_c1_c0_babdd">{{ item.end_time }}</text>
                            </view>
                          </view>
                          <button class="home_fd9_0_c0_c0_c0_c1_c1_c1_babdd" @tap.stop="lqycFunc(item.id)">{{ $t('立即领取') }}</button>
                        </view>
                      </view>
                    </view>
                  </view>
                </template>
              </view>
            </scroll-view>
          </view>
          <view class="flex flex-wrap align-center justify-center home_fd9_1_babdd">
            <!-- <view class="flex flex-wrap align-center home_fd9_1_footer_babdd">
              <view class="flex align-center home_fd9_1_dontshow_babdd" @tap.stop="popupDontShowToday = !popupDontShowToday">
                <view class="home_fd9_1_checkbox_babdd">{{ popupDontShowToday ? '✓' : '' }}</view>
                <text class="home_fd9_1_dontshow_text_babdd">{{ $t('不再显示（24小时）') }}</text>
              </view>
            </view> -->
            <image class="home_fd9_1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '197.png'" @tap="handleCloseCouponPopup"></image>
          </view>
        </view>

        <!---优惠券弹窗flex布局结束-->
      </benben-popup>
      <view
        class="flex flex-direction align-stretch benben-position-layout flex home_flex_10_babdd"
        v-if="isLocation === true && appSystemIdentification == 'Wechat'"
      >
        <!--     <view   class='flex align-center justify-between home_fd10_0_babdd'      >
        <text class='home_fd10_0_c0_babdd'  >{{$t('欢迎加入，请登录/注册享超值优惠！')}}</text>
<button class='home_fd10_0_c1_babdd'  @tap.stop="tologinFunc()"  >{{$t('立即登录')}}</button>
</view>
 -->
      </view>
      <view :style="{ height: '100rpx' }" v-if="isLocation === true && appSystemIdentification == 'Wechat'"></view>
    </view>
  </page-body>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js'
import { validate } from '@/common/utils/validate.js'
import { getWebviewBridge, loadWebviewSdk } from '@/common/utils/hostAppPay.js'
import { isAppWebviewLaunch } from '@/common/utils/appWebviewQuery.js'
let mixin = {
  onShareAppMessage() {
    return {
      path: '/pages/tabBar/home/home?invite_code=' + this.dataMessage.invite_code,
    }
  },
  onShareTimeline() {
    return {
      query: (invite_code = this.dataMessage.invite_code),
    }
  },
}
export default {
  components: {},
  mixins: [pagingList, mixin],

  data() {
    return {
      popupShow1685609745125: false,
      popupDontShowToday: false,
      waterfallsfd8_1: [],
      bannerIndexfd5_0_c2: 0,
      bannerIndexfd4_0: 0,
      bannerIndexfd3_0_c0_c0: 0,
      bannerIndexfd3_0_c2: 0,
      bannerIndexfd3_0_c3: '0',
      bannerIndexfd0_1_c1: 0,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      tabs: '0',
      time_type: [
        {
          name: '10:00',
          value: '1',
          image: '',
        },
        {
          name: '12:00',
          value: '2',
          image: '',
        },
        {
          name: '14:00',
          value: '3',
          image: '',
        },
      ],
      time_id: '1',
      dataClassification: [],
      /** diy_cate_list【diy分类列表】
       *   data【分类列表】 **/
      dataList: {
        data: [],
        diy_cate_list: [],
      },
      dataGoodsList: [],
      dataRotograph: [],
      index: 0,
      navCentral: [],
      rightAdvertisement: [],
      leftAdvertisement: [],
      /** name【商品名称】
       *   activity_id【活动id】
       *   economize_price【节省金额】
       *   rate【秒杀百分比】
       *   have_sum【总库存】
       *   stock【剩余库存】
       *   sales_sum【销量】
       *   shop_price【划线价】
       *   thumb【商品图片】
       *   is_spec【是否多规格 1 是 0 否】
       *   goods_id【商品id】
       *   activity_price【活动价格】 **/
      seckillShop: {
        activity_price: '',
        /** goods_id【秒杀商品id】 **/
        goods_id: '',
        is_spec: '',
        thumb: '',
        shop_price: '',
        sales_sum: '',
        stock: '',
        have_sum: '',
        rate: '',
        economize_price: '',
        /** activity_id【秒杀活动id】 **/
        activity_id: '',
        name: '',
      },
      groupingShop: [],
      /** diy_category_list【diy分类列表】
       *   ad_list【广告列表】
       *   category_list【子分类】 **/
      secondaryClassifieds: {
        category_list: [],
        ad_list: [],
        diy_category_list: [],
      },
      subadvertisement: [],
      /** all【未读消息总数量】
       *   chat【聊天未读数量】
       *   message【系统消息未读数量】
       *   article【系统公告未读数量】 **/
      messageNum: {
        article: '',
        message: '',
        chat: '',
        all: '',
      },
      cid: '0',
      /** tjStatus【猜你喜欢分类id】 **/
      tjStatus: '3',
      goods_type: '',
      treatmentList: [],
      price: 0,
      /** goods_id【秒杀商品id】 **/
      goods_id: '',
      /** activity_id【秒杀活动id】 **/
      activity_id: '',
      /** sku_id【秒杀规格id】 **/
      sku_id: '',
      firstNum: 0,
      /** articleList【文章列表】 **/
      articleList: [],
      /** storList【店铺列表】 **/
      storList: [],
      message_index: 0,
      swriperNum: 0,
      faxianList: [],
      isLocation: false,
      amapFile: '',
      city: '获取中...',
      longitude: '113.643439',
      latitude: '34.738436',
      /** locale【当期语言】
       *   value【语言标识】
       *   name【语言名称】 **/
      locale: {
        name: '',
        value: '',
      },
      bannerIndexfd4_0_c3: 0,
      bgColor: '#FD513D',
      /** animationData【颜色渐变动画】 **/
      animationData: {},
      tjStatusType: [
        {
          name: '猜你喜欢',
          label: '千人千面',
          value: '3',
          image: '',
        },
        {
          name: '首发新品',
          label: '最新上架',
          value: '4',
          image: '',
        },
        {
          name: '热门推荐',
          label: '近期热销',
          value: '2',
          image: '',
        },
      ],
      dataMessage: '',
      /** create_time【创建时间】
       *   status【状态】
       *   path【路径】
       *   path_name【页面名称】 **/
      shopType: {
        path_name: '',
        path: '',
        status: '',
        create_time: '',
      },
      /** projectFun【项目功能】
       *   choujiang【抽奖开关】
       *   zhongcao【种草开关】
       *   qiandao【签到开关】
       *   jifen【积分商城开关】
       *   yushou【预售开关】
       *   kanjia【砍价开关】
       *   tejia【特价开关】
       *   miaosha【秒杀开关】
       *   fenxiao【分销开关】
       *   huiyuan【会员开关】
       *   pintuan【拼团开关】 **/
      projectFun: {
        pintuan: 0,
        huiyuan: 0,
        fenxiao: 0,
        miaosha: 0,
        tejia: 0,
        kanjia: 0,
        yushou: 0,
        jifen: 0,
        qiandao: 0,
        zhongcao: 0,
        choujiang: 0,
      },
      invite_code: '',
      runtimeSafeTopRpx: 0,
      ifH5: false,
    }
  },
  computed: {
    headerTopRpx() {
      const fromGlobal = Number(this.StatusBarRpx || 0)
      return Math.max(fromGlobal, this.runtimeSafeTopRpx)
    },
    headerWrapHeightRpx() {
      return this.headerTopRpx + 160
    },
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
    },
    /**
     * @returns
     * Android       安卓
     * IOS       苹果
     * Web       H5 或 pc
     * Wechat       微信小程序
     * Alipay       支付宝小程序
     * Baidu       百度小程序
     * ByteBounce       抖音小程序
     * 360       360小程序
     * FastApp       快应用
     */
    appSystemIdentification() {
      return this.$store.state.appSystemIdentification
    },
  },
  watch: {
    popupShow1685609745125(newVal) {
      // 当通过遮罩或其它方式关闭弹窗时，也保存“不再显示”偏好
      if (!newVal && this.popupDontShowToday) {
        try {
          const hideUntil = Date.now() + 24 * 60 * 60 * 1000
          uni.setStorageSync('coupon_popup_hide_until', hideUntil)
        } catch (e) {
          console.error('setStorage coupon_popup_hide_until error', e)
        }
        this.popupDontShowToday = false
      }
    },
  },
  onLoad(options) {
    this.initSafeTopRpx()
    let { invite_code } = options
    if (invite_code !== undefined) this.invite_code = invite_code
    if (global.appTabBarType) this.toHomeDiy()
    this.locale = JSON.parse(JSON.stringify(this.$store.state.locale))
    this.ClassificationFunc()
    this.queryListFunc()
    this.queryRotographFunc()
    this.CentralFunc()
    this.AdvertisementFunc()
    this.leftFunc()
    this.SeckillShopFunc()
    this.GroupingShopFunc()
    this.queryClassifiedsSecondaryFunc()
    this.SubadvertisementFunc()
    this.goodsListFunc()
    this.getfaxianListFunc()
    this.getUserinfoFunc()
    this.setInviteCodeFunc(options)
    this.PreferentialListFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getMessageNumFunc()
    this.getArticleListFunc()
    this.getStorListFunc()
    this.getCartNumberFunc()
  },
  onHide() {
    this.popupShow1685609745125 = false
  },
  onResize() {},
  onPullDownRefresh() {
    this.ClassificationFunc()
    this.queryListFunc()
    this.queryRotographFunc()
    this.CentralFunc()
    this.AdvertisementFunc()
    this.leftFunc()
    this.SeckillShopFunc()
    this.GroupingShopFunc()
    this.queryClassifiedsSecondaryFunc()
    this.SubadvertisementFunc()
    this.getStorListFunc()
    this.getMessageNumFunc()
    this.getArticleListFunc()
    this.goodsListFunc()
    this.getfaxianListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    async exitShopFunc() {
      // #ifdef H5
      if (global.__APP_WEBVIEW__ || isAppWebviewLaunch()) {
        await loadWebviewSdk()
        const bridge = getWebviewBridge()
        if (bridge && typeof bridge.navigateBack === 'function') {
          bridge.navigateBack({ delta: 1 })
          return
        }
      }
      // #endif
      const pages = getCurrentPages()
      if (pages && pages.length > 1) {
        this.$urouter.navigateBack(1)
        return
      }
      if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
        window.history.back()
      }
    },
    initSafeTopRpx() {
      try {
        const info = uni.getSystemInfoSync()
        const windowWidth = Number(info.windowWidth || 375)
        const safeTopPx = Number((info.safeAreaInsets && info.safeAreaInsets.top) || info.statusBarHeight || 0)
        if (safeTopPx > 0 && windowWidth > 0) {
          this.runtimeSafeTopRpx = Math.round((safeTopPx * 750) / windowWidth)
        }
      } catch (e) {
        this.runtimeSafeTopRpx = 0
      }
    },
    //获取未读消息数量
    async getMessageNumFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let datamessageNum = await this.$api.get(global.apiUrls.post64241ca6cf066, {})

        if (datamessageNum.data.code != 1) {
          this.$message.info(datamessageNum.data.msg)
          return
        }
        let infomessageNum = datamessageNum.data
        this.messageNum = infomessageNum.data
      } else {
        this.messageNum = ''
      }
    },
    //切换首页tabs
    changeTabFunc() {
      this.bannerIndexfd2_0_c2 = 0
      this.bannerIndexfd4_0_c3 = 0
      this.index = '0'
      if (this.tabs == 0) {
        this.cid = ''
        this.queryRotographFunc()
        this.queryListFunc()
      } else {
        this.cid = this.tabs
        this.queryClassifiedsSecondaryFunc()
      }
      this.goodsListFunc()
    },
    //商品管理-商品列表
    goodsListFunc() {
      if (this.cid > 0) {
        this.goods_type = '1'
      } else {
        this.goods_type = this.tjStatus
      }
      this.$refs.waterfalls1706931710311?.refresh()
      this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        cid: this.cid,
        goods_type: this.goods_type,
        user_id: this.userInfo.id,
      }
      this.listData = []
      this.dataGoodsList = this.listData
      this.pagingListToggle()
    },
    //优惠券列表
    async PreferentialListFunc() {
      //请求方法
      //数据验证

      let datatreatmentList = await this.$api.post(global.apiUrls.post641960f31d0f4, {
        method: '1',
        user_id: this.userInfo.id,
      })

      if (datatreatmentList.data.code != 1) {
        this.$message.info(datatreatmentList.data.msg)
        return
      }
      let infotreatmentList = datatreatmentList.data
      this.treatmentList = infotreatmentList.data

      // 检查本地是否设置了不再显示（24小时）
      try {
        const hideUntil = uni.getStorageSync('coupon_popup_hide_until') || 0
        const now = Date.now()
        const shouldShow = !(hideUntil && now < hideUntil)
        if (this.userInfo.id != '' && this.treatmentList.length > 0 && shouldShow) {
          this.popupShow1685609745125 = true
        } else {
          this.popupShow1685609745125 = false
        }
      } catch (e) {
        // 存储异常，默认显示
        if (this.userInfo.id != '' && this.treatmentList.length > 0) {
          this.popupShow1685609745125 = true
        } else {
          this.popupShow1685609745125 = false
        }
      }
    },
    //广告跳转
    toLunFunc(href) {
      this.dynamicJump(href)
    },
    //领取优惠券
    async lqycFunc(id) {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let data64196d6a86d0d = await this.$api.post(global.apiUrls.post64196d6a86d0d, {
          id: id,
        })

        if (data64196d6a86d0d.data.code != 1) {
          this.$message.info(data64196d6a86d0d.data.msg)
          return
        }
        let info64196d6a86d0d = data64196d6a86d0d.data

        uni.showToast({
          title: this.$t('领取成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.PreferentialListFunc()
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          this.toLoginDiy()
        }, 500)
      }
    },
    handleCloseCouponPopup() {
      try {
        if (this.popupDontShowToday) {
          const hideUntil = Date.now() + 24 * 60 * 60 * 1000
          uni.setStorageSync('coupon_popup_hide_until', hideUntil)
        }
      } catch (e) {
        console.error('setStorage coupon_popup_hide_until error', e)
      }
      this.popupShow1685609745125 = false
      this.popupDontShowToday = false
    },
    //商品管理-获取一级商品分类
    async ClassificationFunc() {
      //请求方法
      //数据验证

      let datadataClassification = await this.$api.get(global.apiUrls.post641590baa0d47, {})

      if (datadataClassification.data.code != 1) {
        this.$message.info(datadataClassification.data.msg)
        return
      }
      let infodataClassification = datadataClassification.data
      this.dataClassification = infodataClassification.data
    },
    //运营管理-获取首页金刚区列表
    async queryListFunc() {
      //请求方法
      //数据验证

      let datadataList = await this.$api.get(global.apiUrls.post641e5f0526964, {
        is_page: '1',
      })

      if (datadataList.data.code != 1) {
        this.$message.info(datadataList.data.msg)
        return
      }
      let infodataList = datadataList.data
      this.dataList = infodataList.data
    },
    //获取轮播图
    async queryRotographFunc() {
      //请求方法
      //数据验证

      let datadataRotograph = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '1',
      })

      if (datadataRotograph.data.code != 1) {
        this.$message.info(datadataRotograph.data.msg)
        return
      }
      let infodataRotograph = datadataRotograph.data
      this.dataRotograph = infodataRotograph.data

      this.bgColor = this.dataRotograph[this.bannerIndexfd3_0_c0_c0].bg_color
    },
    //中部广告
    async CentralFunc() {
      //请求方法
      //数据验证

      let datanavCentral = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '3',
      })

      if (datanavCentral.data.code != 1) {
        this.$message.info(datanavCentral.data.msg)
        return
      }
      let infonavCentral = datanavCentral.data
      this.navCentral = infonavCentral.data
    },
    //广告右
    async AdvertisementFunc() {
      //请求方法
      //数据验证

      let datarightAdvertisement = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '5',
      })

      if (datarightAdvertisement.data.code != 1) {
        this.$message.info(datarightAdvertisement.data.msg)
        return
      }
      let inforightAdvertisement = datarightAdvertisement.data
      this.rightAdvertisement = inforightAdvertisement.data
    },
    //广告左侧
    async leftFunc() {
      //请求方法
      //数据验证

      let dataleftAdvertisement = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '4',
      })

      if (dataleftAdvertisement.data.code != 1) {
        this.$message.info(dataleftAdvertisement.data.msg)
        return
      }
      let infoleftAdvertisement = dataleftAdvertisement.data
      this.leftAdvertisement = infoleftAdvertisement.data
    },
    //秒杀商品
    async SeckillShopFunc() {
      //请求方法
      //数据验证

      let dataseckillShop = await this.$api.post(global.apiUrls.post641aecd93aa49, {
        page: '1',
        list_rows: '15',
      })

      if (dataseckillShop.data.code != 1) {
        this.$message.info(dataseckillShop.data.msg)
        return
      }
      let infoseckillShop = dataseckillShop.data
      this.seckillShop = infoseckillShop.data
    },
    //拼团商品
    async GroupingShopFunc() {
      //请求方法
      //数据验证

      let datagroupingShop = await this.$api.post(global.apiUrls.post641eb8b1ee7fe, {
        page: '1',
        list_rows: '15',
      })

      if (datagroupingShop.data.code != 1) {
        this.$message.info(datagroupingShop.data.msg)
        return
      }
      let infogroupingShop = datagroupingShop.data.data
      this.groupingShop = infogroupingShop.data
    },
    //获取二级分类和广告
    async queryClassifiedsSecondaryFunc() {
      if (this.tabs != 0) {
        //请求方法
        //数据验证

        let datasecondaryClassifieds = await this.$api.get(global.apiUrls.post641591a873763, {
          pid: this.tabs,
        })

        if (datasecondaryClassifieds.data.code != 1) {
          this.$message.info(datasecondaryClassifieds.data.msg)
          return
        }
        let infosecondaryClassifieds = datasecondaryClassifieds.data
        this.secondaryClassifieds = infosecondaryClassifieds.data

        this.bannerIndexfd3_0_c3 = 0
      }
    },
    //下部广告
    async SubadvertisementFunc() {
      //请求方法
      //数据验证

      let datasubadvertisement = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '14',
      })

      if (datasubadvertisement.data.code != 1) {
        this.$message.info(datasubadvertisement.data.msg)
        return
      }
      let infosubadvertisement = datasubadvertisement.data
      this.subadvertisement = infosubadvertisement.data
    },
    //金刚区跳转
    golistFunc(item) {
      if (this.tabs == 0) {
        if (!item.href) {
          this.$urouter.switchTab(`/pages/tabBar/classification/classification`)
        } else {
          this.dynamicJump(item.href)
        }
      } else {
        this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?cid=${item.aid}`)
      }
    },
    //轮播图跳转
    gothumbFunc(url) {
      if (url != '') {
        this.dynamicJump(url)
      }
    },
    //秒杀查看更多
    seckillMoreFunc() {
      this.$urouter.navigateTo(`/pages/sy/seckillList/seckillList`)
    },
    //跳转秒杀商品详情
    seckillShopFunc() {
      this.$urouter.navigateTo(
        `/pages/sy/killMerchandiseDetails/killMerchandiseDetails?goods_id=${this.goods_id}&activity_id=${this.activity_id}&sku_id=${this.sku_id}`,
      )
    },
    //获取文章列表
    async getArticleListFunc() {
      //请求方法
      //数据验证

      let dataarticleList = await this.$api.get(global.apiUrls.post64219a95b6200, {
        category_id: '1',
      })

      if (dataarticleList.data.code != 1) {
        this.$message.info(dataarticleList.data.msg)
        return
      }
      let infoarticleList = dataarticleList.data.data
      this.articleList = infoarticleList.data
    },
    //获取品牌店铺
    async getStorListFunc() {
      //请求方法
      //数据验证

      let datastorList = await this.$api.get(global.apiUrls.post641e88b843d57, {
        is_goods: '1',
        goods_num: '3',
        page: '1',
        list_rows: '10',
        is_recommend: '1',
      })

      if (datastorList.data.code != 1) {
        this.$message.info(datastorList.data.msg)
        return
      }
      let infostorList = datastorList.data.data
      this.storList = infostorList.data
    },
    //获取搜索发现
    async getfaxianListFunc() {
      //请求方法
      //数据验证

      let datafaxianList = await this.$api.get(global.apiUrls.post641af9cb8b32f, {
        view_position: 'input',
      })

      if (datafaxianList.data.code != 1) {
        this.$message.info(datafaxianList.data.msg)
        return
      }
      let infofaxianList = datafaxianList.data
      this.faxianList = infofaxianList.data

      if (this.faxianList.length <= 0) {
        this.faxianList.push({
          name: global.i18n.t('请输入商品名称'),
        })
      }
    },
    //中部广告图跳转
    conterGoPageFunc(url) {
      if (url != '') {
        this.dynamicJump(url)
      } else {
        return
      }
    },
    //立即登录
    tologinFunc() {
      this.$util.debounce(this.$util.navigateToLogin, 800, true)
    },

    //保存邀请码
    setInviteCodeFunc(options) {
      if (this.invite_code) {
        uni.setStorageSync('invite_code', this.invite_code)
      }
      if (!options.scene) return
      let scene = decodeURIComponent(options.scene)
      let resObj = {}
      let regParam = /([^&=]+)=([\w\W]*?)(&|$|#)/g
      let strParam = scene
      let result
      while ((result = regParam.exec(strParam)) != null) {
        resObj[result[1]] = result[2]
      }
      if (resObj.invite_code) {
        uni.setStorageSync('invite_code', resObj.invite_code)
      }
    },
    //切换轮播图背景色赋值，当前轮播图赋值
    changeSwiperFunc(e) {
      let { current, source } = e.detail
      if (source == 'autoplay' || source == 'touch') {
        this.index = current
      }
      this.bgColor = this.dataRotograph[current].bg_color
      var animation = uni.createAnimation({
        duration: 700,
        timingFunction: 'linear',
      })
      this.animation = animation
      animation.backgroundColor(this.bgColor).step()
      this.animationData = animation.export()
    },
    //获取会员详细信息
    async getUserinfoFunc() {
      if (this.isLogin === true) {
        let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

        if (datadataMessage.data.code != 1) {
          this.$message.info(datadataMessage.data.msg)
          return
        }
        let infodataMessage = datadataMessage.data
        this.dataMessage = infodataMessage.data
      }
    },
    //获取购物车数量
    getCartNumberFunc() {
      if (this.isLogin === true) {
        this.$store.dispatch('getCartList')
      }
    },
    pagingListPostData() {
      return this.pagingListPostDataContent
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

  .home_flex_10_babdd {
    width: 750rpx;
    height: 100rpx;
    overflow: hidden;
    z-index: 10;
    bottom: calc(20rpx + var(--benben-window-bottom, 0px));

    .home_fd10_0_babdd {
      margin: 0rpx 48rpx 0rpx 48rpx;
      background: rgba(0, 0, 0, 0.6);
      background-size: 100% auto;
      border-radius: 16rpx;
      padding: 0rpx 16rpx 0rpx 16rpx;
      height: 100rpx;

      .home_fd10_0_c0_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor3);
      }

      .home_fd10_0_c1_babdd {
        border-radius: 33rpx 33rpx 33rpx 33rpx;
        width: 130rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        background: var(--benbenbgColor7);
        color: #fff;
        height: 50rpx;
      }
    }
  }

  .home_flex_9_babdd {
    width: 648rpx;

    .home_fd9_0_babdd {
      background: url(#{image-path('234.png')
      }) no-repeat;
      background-size: 100% 100% !important;
      padding: 345rpx 68rpx 40rpx 68rpx;

      .home_fd9_0_c0_babdd {
        touch-action: none;
        width: 512rpx;
        height: 350rpx;

        .home_fd9_0_c0_c0_babdd {
          border-radius: 16rpx 16rpx 16rpx 16rpx;
          background: linear-gradient(180deg, #fcf4f1 0%, #fec4a6 100%);
          margin: 0rpx 0rpx 24rpx 0rpx;
          padding: 8rpx 8rpx 8rpx 8rpx;

          .home_fd9_0_c0_c0_c0_babdd {
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            border: 1px solid #dbb79f;
            padding: 16rpx 14rpx 16rpx 0rpx;

            .home_fd9_0_c0_c0_c0_c0_babdd {
              padding: 0rpx 20rpx 0rpx 0rpx;
              border-right: 1px solid rgba(207, 161, 126, 1);

              .home_fd9_0_c0_c0_c0_c0_c0_c0_babdd {
                color: var(--benbenFontColor0);
                font-size: 24rpx;
                font-weight: 700;
                line-height: 33rpx;
              }

              .home_fd9_0_c0_c0_c0_c0_c0_c1_babdd {
                color: var(--benbenFontColor0);
                font-size: 38rpx;
                font-weight: 700;
                line-height: 67rpx;
              }
            }

            .home_fd9_0_c0_c0_c0_c1_babdd {
              margin: 0rpx 0rpx 0rpx 16rpx;

              .home_fd9_0_c0_c0_c0_c1_c0_babdd {
                color: var(--benbenFontColor0);
                font-size: 28rpx;
                font-weight: 500;
                line-height: 40rpx;
                margin: 0rpx 0rpx 16rpx 0rpx;
              }

              .home_fd9_0_c0_c0_c0_c1_c1_c0_c0_babdd {
                color: var(--benbenFontColor0);
                font-size: 20rpx;
                font-weight: 500;
                line-height: 28rpx;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                max-width: 200rpx;
              }

              .home_fd9_0_c0_c0_c0_c1_c1_c0_c1_babdd {
                margin: 4rpx 0rpx 0rpx 0rpx;
              }

              .home_fd9_0_c0_c0_c0_c1_c1_c1_babdd {
                border-radius: 20rpx 20rpx 20rpx 20rpx;
                font-size: 20rpx;
                background: var(--benbenbtnColor0);
                color: var(--benbenFontColor3);
                width: 114rpx;
                height: 40rpx;
                line-height: 40rpx;
              }
            }
          }
        }
      }
    }

    .home_fd9_1_babdd {
      margin: 48rpx 0rpx 0rpx 0rpx;

      .home_fd9_1_c0_babdd {
        width: 56rpx;
        height: 56rpx;
        border-radius: 28rpx 28rpx 28rpx 28rpx;
      }
      .home_fd9_1_footer_babdd {
        flex: 1;
        padding-left: 28rpx;
      }
      .home_fd9_1_dontshow_babdd {
        cursor: pointer;
      }
      .home_fd9_1_checkbox_babdd {
        width: 30rpx;
        height: 30rpx;
        border-radius: 6rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12rpx;
        color: var(--benbenbtnColor0);
        font-size: 22rpx;
      }
      .home_fd9_1_dontshow_text_babdd {
        color: var(--benbenFontColor2);
        font-size: 24rpx;
      }
    }
  }

  .home_fd9_0_c0_c0_c0_c0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
  }

  .home_fd9_0_c0_c0_c0_c1_c1_c0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 18rpx;
    font-weight: 500;
    line-height: 25rpx;
  }

  .home_flex_8_babdd {
    padding: 20rpx 24rpx 0rpx 24rpx;
    min-height: 600rpx;

    .home_fd8_0_babdd {
      margin: 0rpx 0rpx 37rpx 0rpx;
    }

    .home_fd8_1_c0_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto;
      margin: 0rpx 0rpx 20rpx 0rpx;
      border-radius: 16rpx;
      padding: 0rpx 0rpx 15rpx 0rpx;
      box-shadow: 0rpx 3rpx 30rpx #e8e8e8;

      .home_fd8_1_c0_c0_babdd {
        width: 100%;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
      }

      .home_fd8_1_c0_c1_babdd {
        margin: 24rpx 20rpx 0rpx 20rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;

        .home_fd8_1_c0_c1_c0_babdd {
          line-height: 40rpx;
          font-weight: 500;
          font-size: 24rpx;
          padding: 2rpx 5rpx 2rpx 5rpx;
          background: var(--benbenbtnColor0);
          background-size: 100% auto;
          color: var(--benbenFontColor3);
          border-radius: 8rpx;
        }

        .home_fd8_1_c0_c1_c1_babdd {
          color: var(--benbenFontColor0);
          font-size: 28rpx;
          font-weight: 700;
          line-height: 40rpx;
        }
      }

      .home_fd8_1_c0_c3_babdd {
        margin: 8rpx 20rpx 8rpx 20rpx;

        .home_fd8_1_c0_c3_c0_babdd {
          text-decoration: line-through;
          color: var(--benbenFontColor2);
        }
      }

      .home_fd8_1_c0_c4_babdd {
        margin: 0rpx 20rpx 8rpx 20rpx;

        .home_fd8_1_c0_c4_c0_babdd {
          border-radius: 8rpx;
          border: 1px solid var(--benbenbdColor2);
          padding: 3rpx 5rpx 3rpx 5rpx;

          .home_fd8_1_c0_c4_c0_c0_babdd {
            color: var(--benbenFontColor5);
            font-size: 20rpx;
            font-weight: 400;
            line-height: 28rpx;
            margin: 0rpx 4rpx 0rpx 4rpx;
          }
        }
      }
    }

    .home_fd8_2_c0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      width: 344rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;
      padding: 0rpx 0rpx 24rpx 0rpx;
      box-shadow: 0rpx 3rpx 30rpx #e8e8e8;

      .home_fd8_2_c0_c0_babdd {
        width: 346rpx;
        height: 346rpx;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
      }

      .home_fd8_2_c0_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 28rpx;
        font-weight: 700;
        line-height: 40rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 24rpx 20rpx 0rpx 20rpx;
      }

      .home_fd8_2_c0_c4_babdd {
        margin: 16rpx 32rpx 0rpx 18rpx;
        height: 38rpx;
        background: url(#{image-path('812.png')
      }) no-repeat;
        background-size: 100% 100%;
        padding: 0rpx 0rpx 0rpx 40rpx;

        .home_fd8_2_c0_c4_c0_babdd {
          width: 22rpx;
          height: 22rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 12rpx 0rpx 0rpx;
        }
      }
    }
  }

  .home_fd8_0_c0_c0_c0_babdd {
    position: relative;

    .home_fd8_0_c0_c0_c0_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
    }

    .home_fd8_0_c0_c0_c0_c1_babdd {
      color: var(--benbenFontColor0);
      font-size: 24rpx;
      font-weight: 600;
      line-height: 33rpx;
    }

    .home_fd8_0_c0_c0_c0_c2_babdd {
      width: 14rpx;
      height: 14rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      position: absolute;
      bottom: 0rpx;
      right: 10rpx;
    }
  }

  .home_fd8_0_c0_c1_c0_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 36rpx;
    font-weight: 600;
    line-height: 50rpx;
  }

  .home_fd8_0_c0_c1_c0_c1_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 600;
    line-height: 33rpx;
  }

  .home_fd8_1_c0_c2_babdd {
    margin: 20rpx 20rpx 8rpx 20rpx;

    .home_fd8_1_c0_c2_c0_c0_babdd {
      font-weight: 500;
      font-size: 24rpx;
      padding: 2rpx 5rpx 2rpx 5rpx;
      background: var(--benbenbtnColor0);
      background-size: 100% auto;
      color: var(--benbenFontColor3);
      border-radius: 8rpx;
      line-height: 30rpx;
    }

    .home_fd8_1_c0_c2_c1_babdd {
      color: var(--benbenFontColor4);
      font-weight: 600;
      font-size: 24rpx;
    }

    .home_fd8_1_c0_c2_c2_babdd {
      color: var(--benbenFontColor4);
      font-weight: 700;
      font-size: 20rpx;
      line-height: 30rpx;
      margin: 6rpx 0rpx 0rpx 0rpx;
    }
  }

  .home_fd8_1_c0_c2_c0_c0_1_babdd {
    font-weight: 700;
    font-size: 28rpx;
    padding: 2rpx 5rpx 2rpx 5rpx;
    background: var(--benbenbgColor7);
    background-size: 100% auto;
    color: var(--benbenFontColor3);
    border-radius: 8rpx;
    line-height: 30rpx;
  }

  .home_price1_fd8_1_c0_c2_c2_babdd {
    font-size: 32rpx;
  }

  .home_price2_fd8_1_c0_c2_c2_babdd {
    font-size: 20rpx;
  }

  .home_fd8_1_c0_c2_c3_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 10rpx 0rpx auto;
  }

  .home_fd8_1_c0_c2_c4_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .home_fd8_1_c0_c4_c1_babdd {
    margin: 0rpx 0rpx 0rpx 8rpx;
    height: 38rpx;
    background: transparent;
    background-size: 100% 100%;
    padding: 3rpx 5rpx 3rpx 5rpx;
    border: 1px solid var(--benbenbdColor2);
    border-radius: 8rpx;
  }

  .home_fd8_1_c0_c4_c1_c0_babdd {
    color: var(--benbenFontColor5);
    font-size: 20rpx;
    line-height: 28rpx;
  }

  .home_fd8_1_c0_c5_babdd {
    margin: 0rpx 20rpx 0rpx 20rpx;

    .home_fd8_1_c0_c5_c0_babdd {
      width: 38rpx;
      height: 38rpx;
      border-radius: 19rpx;
      margin: 0rpx 10rpx 0rpx 0rpx;
    }

    .home_fd8_1_c0_c5_c1_babdd {
      color: var(--benbenFontColor0);
      font-size: 28rpx;
      max-width: 250rpx;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .home_fd8_2_c0_c2_c0_babdd {
    color: var(--benbenFontColor7);
    font-weight: 600;
    font-size: 24rpx;
  }

  .home_fd8_2_c0_c2_c1_babdd {
    color: var(--benbenFontColor7);
    font-weight: 700;
    font-size: 20rpx;
    line-height: 30rpx;
    margin: 6rpx 0rpx 0rpx 0rpx;
  }

  .home_fd8_2_c0_c2_c2_babdd {
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    border: 1px solid #f02325;
    margin: 0rpx 0rpx 0rpx 8rpx;

    .home_fd8_2_c0_c2_c2_c0_babdd {
      width: 37rpx;
      height: 30rpx;
      background: url(#{image-path('231.png')
    }) no-repeat;
      background-size: 100% auto !important;
    }

    .home_fd8_2_c0_c2_c2_c1_babdd {
      color: var(--benbenFontColor7);
      font-size: 20rpx;
      font-weight: 400;
      line-height: 28rpx;
      margin: 0rpx 4rpx 0rpx 4rpx;
    }
  }

  .home_fd8_2_c0_c3_c0_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    text-decoration: line-through;
  }

  .home_fd8_2_c0_c3_c2_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 0rpx 0rpx auto;
  }

  .home_fd8_2_c0_c4_c1_babdd {
    color: rgba(177, 110, 5, 1);
    font-size: 24rpx;
    line-height: 36rpx;
  }

  .home_flex_7_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .home_fd7_0_babdd {
      margin: 10rpx 0;

      .home_fd7_0_c0_babdd {
        width: 702rpx;
        height: 200rpx;
        border-radius: 16rpx;
      }
    }
  }

  .home_flex_6_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .home_fd6_0_c0_babdd {
      width: 50%;

      .home_fd6_0_c0_c0_babdd {
        width: 100%;
        height: 194rpx;
        margin: 0rpx 0rpx 16rpx 0rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
      }
    }

    .home_fd6_1_babdd {
      margin: 0rpx 0rpx 0rpx 0rpx;

      .home_fd6_1_c0_c0_babdd {
        width: 344rpx;
        height: 404rpx;
        margin: 0rpx 14rpx 0rpx 0rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
      }

      .home_fd6_1_c1_c0_c0_babdd {
        width: 344rpx;
        height: 194rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        margin: 6rpx 0rpx 6rpx 0rpx;
      }
    }
  }

  .home_flex_5_babdd {
    padding: 24rpx 0rpx 24rpx 0rpx;

    .home_fd5_0_babdd {
      border-radius: 50rpx;
      background:
        url(#{image-path('815.png')
    }) no-repeat,
        transparent;
      background-size: 100% auto !important;
      height: 76rpx;
      padding: 0rpx 32rpx 0rpx 26rpx;
      margin: 0rpx 24rpx 0rpx 24rpx;

      .home_fd5_0_c0_babdd {
        width: 102rpx;
        height: 24rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }

      .home_fd5_0_c1_babdd {
        width: 1rpx;
        height: 30rpx;
        background: var(--benbenbgColor2);
        margin: 0rpx 24rpx 0rpx 24rpx;
        transform: scaleX(0.5);
      }

      .home_fd5_0_c3_c0_babdd {
        color: var(--benbenFontColor0);
        font-size: 22rpx;
        margin: 0rpx 0rpx 0rpx 5rpx;
      }

      .home_fd5_0_c3_c1_babdd {
        width: 20rpx;
        height: 20rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 8rpx;
      }
    }
  }

  .home_fd5_0_c2_babdd {
    width: 400rpx;
    height: 72rpx;
    margin: 0rpx 0rpx 0rpx 0rpx;
  }

  .home_fd5_0_c2_c1_c0_babdd {
    height: 72rpx;

    .home_fd5_0_c2_c1_c0_c0_babdd {
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      color: var(--benbenFontColor0);
    }
  }

  .home_numberfd5_0_c2_c0_babdd {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    width: 80rpx;
    height: 40rpx;
    background: #525050;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 46rpx;
    font-weight: 400;
  }

  .home_fd4_0_babdd {
    width: 702rpx;
    height: 280rpx;
    overflow: hidden;
  }

  .home_fd4_0_c1_c0_babdd {
    width: 702rpx;
    height: 280rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
  }

  .home_numberfd4_0_c0_babdd {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    width: 80rpx;
    height: 40rpx;
    background: #525050;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 46rpx;
    font-weight: 400;
  }

  .home_fd3_0_babdd {
    padding: 12rpx 32rpx 0 32rpx;

    .home_fd3_0_c0_c0_babdd {
      width: 100%;
      padding: 0rpx 0rpx 0rpx 0rpx;
    }

    .home_fd3_0_c1_babdd {
      margin: 16rpx 0rpx 12rpx 0rpx;

      .home_fd3_0_c1_c0_babdd {
        border-radius: 3rpx 3rpx 3rpx 3rpx;
        width: 60rpx;
        height: 6rpx;

        .home_fd3_0_c1_c0_c0_babdd {
          border-radius: 3rpx 3rpx 3rpx 3rpx;
          background: #b82441;
          width: 30rpx;
          height: 6rpx;
        }
      }
    }

    .home_fd3_0_c2_babdd {
      width: 686rpx;
      height: 180rpx;
      margin: 0rpx 0rpx 0rpx 0rpx;
    }

    .home_fd3_0_c3_babdd {
      width: 100%;
      margin: 0rpx 0rpx 0rpx 0rpx;
    }
  }

  .home_fd3_0_c0_c0_c1_babdd {
    width: 100%;
  }

  .home_fd3_0_c0_c0_c1_c0_c0_babdd {
    width: 20%;
    height: 160rpx;
    min-width: 0;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 4rpx;
  }

  .home_fd3_0_c0_c0_c1_c0_c0_c0_babdd {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50rpx;
    flex-shrink: 0;
  }

  .home_fd3_0_c0_c0_c1_c0_c0_c1_babdd {
    width: 100%;
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 500;
    line-height: 33rpx;
    margin: 8rpx 0rpx 0rpx 0rpx;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .home_numberfd3_0_c0_c0_c0_babdd {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    width: 80rpx;
    height: 40rpx;
    background: #525050;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 46rpx;
    font-weight: 400;
  }

  .home_fd3_0_c2_c1_babdd {
    width: 686rpx;
    height: 180rpx;
  }

  .home_flex_1_babdd {
    width: 750rpx;
    overflow: hidden;
    z-index: 10;
    top: 20rpx;

    .home_fd1_0_babdd {
      margin: 0rpx 48rpx 0rpx 48rpx;
      background: rgba(0, 0, 0, 0.6);
      background-size: 100% auto;
      border-radius: 16rpx;
      padding: 0rpx 24rpx 0rpx 24rpx;
      height: 80rpx;

      .home_fd1_0_c0_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor3);
      }

      .home_fd1_0_c1_babdd {
        border-radius: 8rpx;
        width: 110rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        background: var(--benbenbgColor7);
        color: #fff;
        height: 40rpx;
        margin: 0rpx 0rpx 0rpx auto;
      }

      .home_fd1_0_c2_babdd {
        margin: 0rpx 0rpx 0rpx auto;
        color: var(--benbenFontColor3);
        font-size: 24rpx;
      }
    }
  }

  .home_flex_0_babdd {
    width: 750rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    box-sizing: border-box;
    background: var(--benbenbgColor3);
    background-size: 100% auto;

    .home_fd0_0_babdd {
      margin: 10rpx 0rpx 0rpx 0rpx;
      padding: 0rpx 32rpx 0rpx 0rpx;

      .home_fd0_0_side_babdd {
        width: 180rpx;
        min-height: 45rpx;
      }

      .home_fd0_0_back_icon_babdd {
        color: #fff;
        font-size: 32rpx;
        margin-left: 32rpx;
      }

      .home_fd0_0_c0_babdd {
        color: var(--benbenFontColor3);
        font-size: 30rpx;
        font-weight: 600;
        line-height: 45rpx;
        margin: 0rpx;
        text-align: center;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .home_fd0_0_c1_babdd {
        position: relative;
        margin-right: 8rpx;

        .home_fd0_0_c1_c0_babdd {
          width: 50rpx;
          height: 50rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .home_fd0_0_c1_c1_babdd {
          width: 40rpx;
          height: 40rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 0 0rpx 24rpx;
        }

        .home_fd0_0_c1_c2_babdd {
          position: absolute;
          top: 4rpx;
          right: 2rpx;
        }
      }
    }

    .home_fd0_1_babdd {
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      background: rgba(255, 255, 255, 0.8);
      padding: 0rpx 24rpx 0rpx 24rpx;
      margin: 12rpx 24rpx 8rpx 24rpx;
      height: 60rpx;

      .home_fd0_1_c0_babdd {
        width: 24rpx;
        height: 24rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }

      .home_fd0_1_c1_babdd {
        width: 590rpx;
        height: 50rpx;
        margin: 0rpx 0rpx 0rpx 10rpx;

        .home_fd0_1_c1_c1_babdd {
          width: 590rpx;
          height: 50rpx;

          .home_fd0_1_c1_c1_c0_babdd {
            line-height: 50rpx;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            color: var(--benbenFontColor0);
          }
        }
      }
    }
  }

  .home_numberfd0_1_c1_c0_babdd {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    width: 80rpx;
    height: 40rpx;
    background: #525050;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 46rpx;
    font-weight: 400;
  }
}

::v-deep .home_swiperDotfd5_0_c2_babdd {
  position: absolute;
  bottom: 20rpx;
  left: 0rpx;
  right: 0rpx;
}

::v-deep .home_swiperDotSelectedfd5_0_c2_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: #00a7ff;
  border: 1px solid #00a7ff;
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotUnselectedfd5_0_c2_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotfd4_0_babdd {
  position: absolute;
  bottom: 20rpx;
  left: 0rpx;
  right: 0rpx;
}

::v-deep .home_swiperDotSelectedfd4_0_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: #00a7ff;
  border: 1px solid #00a7ff;
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotUnselectedfd4_0_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotfd3_0_c0_c0_babdd {
  position: absolute;
  bottom: 10rpx;
  left: 0rpx;
  right: 0rpx;
}

::v-deep .home_swiperDotSelectedfd3_0_c0_c0_babdd {
  width: 30rpx;
  height: 6rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  background: var(--benbenbgColor0);
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotUnselectedfd3_0_c0_c0_babdd {
  width: 30rpx;
  height: 6rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  background: rgba(238, 238, 238, 1);
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotSelectedfd3_0_c3_babdd {
  width: 30rpx;
  height: 6rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  background: var(--benbenbtnColor0);
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotfd0_1_c1_babdd {
  position: absolute;
  bottom: 20rpx;
  left: 0rpx;
  right: 0rpx;
}

::v-deep .home_swiperDotSelectedfd0_1_c1_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: #00a7ff;
  border: 1px solid #00a7ff;
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .home_swiperDotUnselectedfd0_1_c1_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}
</style>
