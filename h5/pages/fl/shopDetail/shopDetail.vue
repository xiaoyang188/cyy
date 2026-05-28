<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex shopDetail_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx', background: `${pageScrollTopBuilt > 30 ? '#fff' : ''}` }"
      >
        <view class="flex flex-wrap align-center shopDetail_fd0_0_babdd" @tap.stop="isWxBackFunc()">
          <text class="fu-iconfont2 shopDetail_fd0_0_c0_babdd">&#xe794;</text>
        </view>
        <view
          class="flex flex-wrap align-center justify-end shopDetail_fd0_0_babdd"
          :style="{ 'margin-right': `${appSystemIdentification == 'Wechat' ? '30%' : ''}` }"
        >
          <image
            class="shopDetail_fd0_1_c0_babdd"
            mode="aspectFit"
            :src="STATIC_URL + '70.png'"
            @tap.stop="popupShow1689239427011 = true"
            v-if="appSystemIdentification != 'Wechat'"
          ></image>
        </view>
      </view>
      <benben-specs-popup
        ref="specsPopup1706585747219"
        class="shopDetail_flex_specs_1_babdd"
        price-name="shop_price"
        :speclist="dataDetails.spec_list"
        :skulist="dataDetails.sku_list"
        :sku-id.sync="sku_id"
        :sku-name.sync="sku_name"
        :price.sync="dataDetails.shop_price"
        :thumb.sync="dataDetails.thumb"
        :market-price.sync="dataDetails.market_price"
        :member-price.sync="dataDetails.member_price"
        :stock.sync="dataDetails.stock"
        :number.sync="buy_num"
        @addCart="addCarFunc()"
        @buyNow="buyNowFunc()"
      ></benben-specs-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
        <view class="flex align-center shopDetail_fd2_0_babdd">
          <view style="position: relative">
            <swiper
              ref="benbenSwiperfd2_0_c0"
              :current="index"
              @change="bannerIndexfd2_0_c0 = $event.detail.current"
              class="flex position-relative shopDetail_fd2_0_c0_babdd"
              previous-margin="0rpx"
              next-margin="0rpx"
              :display-multiple-items="1"
              :interval="5000"
              :duration="500"
              :autoplay="true"
              :circular="true"
            >
              <swiper-item class="flex shopDetail_fd2_0_c0_babdd" v-if="dataDetails.video != ''">
                <view
                  class="flex align-center self-center justify-center shopDetail_fd2_0_c0_c1_c0_babdd"
                  @tap.stop="videoplayerFunc(dataDetails.video)"
                >
                  <image class="shopDetail_fd2_0_c0_c1_c0_c0_babdd" mode="aspectFill" :src="dataDetails.video_img"></image>
                  <image class="shopDetail_fd2_0_c0_c1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '84.png'"></image>
                </view>
              </swiper-item>

              <template v-for="(item, key0) in dataDetails.images">
                <swiper-item class="flex" :key="key0">
                  <image
                    class="shopDetail_fd2_0_c0_c1_c0_c0_babdd"
                    mode="aspectFill"
                    :src="item"
                    @tap="multiImagePreview(item, dataDetails.images, '')"
                  ></image>
                </swiper-item>
              </template>
            </swiper>
            <view style="position: absolute" class="flex dot flex align-center justify-center shopDetail_swiperDotfd2_0_c0_babdd">
              <view class="flex flex align-center justify-center shopDetail_numberfd2_0_c0_c0_babdd">
                <text class="shopDetail_numberfd2_0_c0_c0_c0_babdd">{{ bannerIndexfd2_0_c0 + 1 }}</text>
                <text class="shopDetail_numberfd2_0_c0_c0_c0_babdd">/</text>
                <text class="shopDetail_numberfd2_0_c0_c0_c0_babdd">{{ dataDetails.images.length + (dataDetails.video ? 1 : 0) }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <l-painter
        :css="{ width: `700rpx`, height: `750rpx`, background: `#FFF` }"
        ref="painter1730449491555"
        :hidden="true"
        file-type="png"
        path-type="url"
      >
        <template v-if="painterParam1730449491555">
          <l-painter-image
            :css="{ width: `500rpx`, height: `500rpx`, position: `absolute`, top: `160rpx`, left: `114rpx` }"
            :src="dataDetails.thumb"
          ></l-painter-image>
          <!-- <l-painter-view :css='{"width":`140rpx`,"height":`140rpx`,"position":`absolute`,"top":`420rpx`,"left":`364rpx`,"background":`#FFF`,"backgroundSize":`100% auto`,"zIndex":`6`}'   ></l-painter-view>
 -->
          <!-- <l-painter-view :css='{"height":`76rpx`,"position":`absolute`,"top":`618rpx`,"left":`112rpx`,"width":`562rpx`,"background":`#f8f8f8`,"backgroundSize":`100% auto`,"borderRadius":`16rpx`}'   ></l-painter-view>
 -->
          <!-- <l-painter-text :css='{"position":`absolute`,"top":`640rpx`,"left":`254rpx`,"fontSize":`24rpx`,"lineClamp":`1`}'  :text="OneComment"></l-painter-text>
 -->
          <!-- <l-painter-text :css='{"position":`absolute`,"top":`640rpx`,"left":`128rpx`,"fontSize":`24rpx`,"color":`rgba(1, 96, 173, 1)`}'  :text="$t('新犇腾家：')"></l-painter-text>
 -->
          <!-- <l-painter-text :css='{"position":`absolute`,"top":`570rpx`,"left":`114rpx`,"fontSize":`24rpx`,"color":`rgba(129, 132, 143, 1)`}'  :text="$t('1小时前')"></l-painter-text>
 -->
          <l-painter-image
            :css="{ width: `130rpx`, height: `130rpx`, position: `absolute`, top: `521rpx`, left: `487rpx`, zIndex: `6` }"
            :src="wxShareImg.base64"
          ></l-painter-image>
          <l-painter-text
            :css="{
              position: `absolute`,
              top: `74rpx`,
              left: `122rpx`,
              fontSize: `24rpx`,
              color: `var(--benbenFontColor0)`,
              width: `500rpx`,
              lineClamp: `2`,
            }"
            :text="dataDetails.name"
          ></l-painter-text>
          <l-painter-text
            :css="{ position: `absolute`, top: `28rpx`, left: `122rpx`, fontSize: `28rpx`, color: `rgba(1, 96, 173, 1)` }"
            :text="$t('推荐一个好物给你，请查收')"
          ></l-painter-text>
          <l-painter-image
            :css="{ width: `80rpx`, height: `80rpx`, position: `absolute`, top: `30rpx`, left: `28rpx`, borderRadius: `40rpx` }"
            :src="userInfo.avatar"
          ></l-painter-image>
        </template>
      </l-painter>
      <l-painter
        :css="{ width: `580rpx`, height: `924rpx`, background: `#FFF`, backgroundSize: `100% auto` }"
        ref="painter1690420071407"
        :hidden="true"
        file-type="png"
        path-type="url"
      >
        <template v-if="painterParam1690420071407">
          <l-painter-image
            :css="{ width: `580rpx`, height: `148rpx`, position: `absolute`, top: `0rpx`, left: `0rpx` }"
            :src="STATIC_URL + '822.png'"
          ></l-painter-image>
          <l-painter-text :css="{ position: `absolute`, top: `752rpx`, left: `68rpx` }" :text="dataDetails.shop_price"></l-painter-text>
          <l-painter-image
            :css="{ width: `580rpx`, height: `580rpx`, position: `absolute`, top: `146rpx`, left: `0rpx`, objectFit: `cover` }"
            :src="dataDetails.thumb"
          ></l-painter-image>
          <l-painter-image
            :css="{ width: `80rpx`, height: `80rpx`, position: `absolute`, top: `34rpx`, left: `46rpx`, borderRadius: `40rpx` }"
            :src="userInfo.avatar"
          ></l-painter-image>
          <l-painter-text
            :css="{
              position: `absolute`,
              top: `34rpx`,
              left: `150rpx`,
              color: `rgba(0, 0, 0, 1)`,
              fontSize: `28rpx`,
              width: `400rpx`,
              lineClamp: `1`,
            }"
            :text="userInfo.nickname"
          ></l-painter-text>
          <l-painter-text
            :css="{ position: `absolute`, top: `86rpx`, left: `150rpx`, width: `386rpx`, color: `rgba(0, 0, 0, 1)`, fontSize: `24rpx` }"
            :text="$t('推荐一个好物给你，请查收')"
          ></l-painter-text>
          <l-painter-image
            :css="{ width: `126rpx`, height: `130rpx`, position: `absolute`, top: `748rpx`, left: `432rpx`, objectFit: `cover` }"
            :src="sharedInfo.qrcode_url"
          ></l-painter-image>
          <l-painter-text :css="{ position: `absolute`, top: `752rpx`, left: `30rpx`, width: `NaNrpx` }" :text="'￥'"></l-painter-text>
          <l-painter-text
            :css="{ position: `absolute`, top: `812rpx`, left: `30rpx`, width: `362rpx`, lineClamp: `2` }"
            :text="dataDetails.name"
          ></l-painter-text>
        </template>
      </l-painter>
      <benben-popup v-model="popupShow1700556466468" :mask="true" :mask-close-able="true" mode="bottom" :z-index="999">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout shopDetail_flex_5_babdd">
          <view class="flex flex-wrap align-center justify-between shopDetail_fd5_0_babdd">
            <view class="flex flex-wrap align-center shopDetail_fd5_0_c0_babdd"></view>
            <view class="flex flex-wrap align-center shopDetail_fd5_0_c1_babdd">
              <text class="shopDetail_fd5_0_c1_c0_babdd">{{ $t('优惠套餐(') }}</text>
              <text>{{ dataDetails.package_count }}</text>
              <text>)</text>
            </view>
            <image class="shopDetail_fd5_0_c2_babdd" mode="aspectFit" :src="STATIC_URL + '93.png'" @tap.stop="popupShow1700556466468 = false"></image>
          </view>

          <scroll-view
            class="shopDetail_fd5_1_babdd"
            :scroll-x="false"
            :scroll-y="true"
            :show-scrollbar="false"
            v-if="dataDetails.package_arr.length > 0"
            :enhanced="true"
          >
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <template v-for="(item, key0) in dataDetails.package_arr">
                <view class="flex flex-direction align-stretch shopDetail_fd5_1_c0_babdd" v-if="item.type == '1'" :key="key0">
                  <view class="flex align-center justify-between">
                    <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c0_c0_babdd">
                      <image class="shopDetail_fd5_1_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '66.png'"></image>
                      <text>{{ $t('套餐') }}</text>
                      <text>{{ key0 + 1 }}</text>
                      <text>：</text>
                      <text>{{ item.package_name }}</text>
                    </view>
                    <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c0_c1_babdd">
                      <text>{{ $t('￥') }}</text>
                      <text class="shopDetail_fd5_1_c0_c0_c1_c1_babdd">
                        <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ item.price | frontPrice }}</text>
                        <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ item.price | laterPrice }}</text>
                      </text>
                    </view>
                  </view>
                  <template v-for="(child, key1) in item.info">
                    <view class="flex align-stretch shopDetail_fd5_1_c0_c1_babdd" :key="key1">
                      <image class="shopDetail_fd5_1_c0_c1_c0_babdd" mode="aspectFit" :src="child.goods_thumb"></image>
                      <view class="flex flex-direction align-stretch flex-sub">
                        <text class="shopDetail_fd5_1_c0_c1_c1_c0_babdd">{{ child.goods_name }}</text>
                        <text class="shopDetail_fd5_1_c0_c1_c1_c1_babdd">{{ child.sku_key_name }}</text>
                        <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_babdd">
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_c0_babdd">
                            <text class="shopDetail_fd5_0_c1_c0_babdd">{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c1_c1_c2_c0_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | laterPrice }}</text>
                            </text>
                          </view>
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_c1_babdd">
                            <text>{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c1_c1_c2_c1_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | laterPrice }}</text>
                            </text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>

                  <view class="flex align-center justify-center shopDetail_fd5_1_c0_c2_babdd">
                    <view class="flex align-center justify-center shopDetail_fd5_1_c0_c2_c0_babdd" @tap.stop="PurchasePackageFunc(item)">
                      <text>{{ $t('购买此套餐') }}</text>
                      <text>{{ item.count }}</text>
                      <text>{{ $t('件商品') }}</text>
                    </view>
                  </view>
                </view>
              </template>

              <template v-for="(item, key0) in dataDetails.package_arr">
                <view class="flex flex-direction align-stretch shopDetail_fd5_1_c0_babdd" v-if="item.type == '2'" :key="key0">
                  <view class="flex align-center justify-between">
                    <view class="flex flex-wrap align-center shopDetail_fd5_1_c1_c0_c0_babdd">
                      <image class="shopDetail_fd5_1_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '66.png'"></image>
                      <text class="shopDetail_fd5_0_c1_c0_babdd">{{ $t('套餐') }}</text>
                      <text>{{ key0 + 1 }}</text>
                      <text>：</text>
                      <text class="shopDetail_fd5_0_c1_c0_babdd">{{ item.package_name }}</text>
                    </view>
                    <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c0_c1_babdd">
                      <text>{{ $t('￥') }}</text>
                      <text class="shopDetail_fd5_1_c0_c0_c1_c1_babdd">
                        <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ item.price | frontPrice }}</text>
                        <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ item.price | laterPrice }}</text>
                      </text>
                    </view>
                  </view>
                  <template v-for="(child, key1) in item.info">
                    <view class="flex align-stretch shopDetail_fd5_1_c0_c1_babdd" v-if="key1 == 0" :key="key1">
                      <image class="shopDetail_fd5_1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '106.png'"></image>
                      <image class="shopDetail_fd5_1_c0_c1_c0_babdd" mode="aspectFit" :src="child.goods_thumb"></image>
                      <view class="flex flex-direction align-stretch flex-sub">
                        <text class="shopDetail_fd5_1_c1_c1_c2_c0_babdd">{{ child.goods_name }}</text>
                        <text class="shopDetail_fd5_1_c1_c1_c2_c1_babdd" @tap.stop="DisplaypackagespecificationsFunc()">
                          {{ child.sku_key_name }}
                        </text>
                        <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_babdd">
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c0_c1_babdd">
                            <text>{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c1_c1_c2_c0_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | laterPrice }}</text>
                            </text>
                          </view>
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_c1_babdd">
                            <text>{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c1_c1_c2_c1_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | laterPrice }}</text>
                            </text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>

                  <template v-for="(child, key1) in item.info">
                    <view class="flex align-stretch shopDetail_fd5_1_c0_c1_babdd" v-if="key1 > 0" :key="key1">
                      <image class="shopDetail_fd5_1_c1_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '6.png'"></image>
                      <image class="shopDetail_fd5_1_c0_c1_c0_babdd" mode="aspectFit" :src="child.goods_thumb"></image>
                      <view class="flex flex-direction align-stretch flex-sub">
                        <text class="shopDetail_fd5_1_c1_c2_c2_c0_babdd">{{ child.goods_name }}</text>
                        <text class="shopDetail_fd5_1_c1_c2_c2_c1_babdd">{{ child.sku_key_name }}</text>
                        <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_babdd">
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_c0_babdd">
                            <text>{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c0_c1_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.price | laterPrice }}</text>
                            </text>
                          </view>
                          <view class="flex flex-wrap align-center shopDetail_fd5_1_c0_c1_c1_c2_c1_babdd">
                            <text>{{ $t('￥') }}</text>
                            <text class="shopDetail_fd5_1_c0_c1_c1_c2_c1_c1_babdd">
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | frontPrice }}</text>
                              <text class="shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd">{{ child.shop_price | laterPrice }}</text>
                            </text>
                          </view>
                        </view>
                      </view>
                    </view>
                  </template>

                  <view class="flex align-center justify-center shopDetail_fd5_1_c0_c2_babdd">
                    <view class="flex align-center justify-center shopDetail_fd5_1_c1_c3_c0_babdd" @tap.stop="PurchasePackageFunc(item)">
                      <text>{{ $t('购买此套餐') }}</text>
                      <text>{{ item.count }}</text>
                      <text>{{ $t('件商品') }}</text>
                    </view>
                  </view>
                </view>
              </template>
            </view>
          </scroll-view>

          <benben-empty :list-data="dataDetails.package_arr">
            <view>
              <view class="flex flex-direction flex-wrap align-center shopDetail_fd5_2_babdd">
                <image class="shopDetail_fd5_2_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
              </view>
            </view>
          </benben-empty>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction align-stretch shopDetail_fd6_0_babdd" v-if="dataDetails.is_wholesale == 0">
          <view class="flex align-center flex-sub">
            <text class="shopDetail_fd6_0_c0_c0_babdd">{{ $t('￥') }}</text>
            <text class="shopDetail_fd6_0_c0_c1_babdd">
              <text class="shopDetail_price1_fd6_0_c0_c1_babdd">{{ dataDetails.shop_price | frontPrice }}</text>
              <text class="shopDetail_price2_fd6_0_c0_c1_babdd">{{ dataDetails.shop_price | laterPrice }}</text>
            </text>
            <view class="flex flex-wrap align-center shopDetail_fd6_0_c0_c2_babdd">
              <text>{{ $t('￥') }}</text>
              <text class="">
                <text>{{ dataDetails.market_price | frontPrice }}</text>
                <text class="shopDetail_price2_fd6_0_c0_c2_c1_babdd">{{ dataDetails.market_price | laterPrice }}</text>
              </text>
            </view>
            <text class="shopDetail_fd6_0_c0_c3_babdd">{{ $t('销量') }}</text>
            <text class="shopDetail_fd6_0_c0_c4_babdd">{{ dataDetails.sales_sum }}</text>
            <text class="shopDetail_fd6_0_c0_c5_babdd">{{ $t('件') }}</text>
          </view>
        </view>
        <!--     <view   class='flex flex-direction align-stretch shopDetail_fd6_1_babdd'    v-if= " dataDetails.is_wholesale=='1' && dataDetails.is_step==0"  >
            <view   class='flex align-center self-center flex-sub'      >
        <text class='shopDetail_fd6_1_c0_c0_babdd'  >{{$t('批发价：')}}</text>
<text class='shopDetail_fd6_1_c0_c1_babdd'  >{{$t('￥')}}</text>
<text class=' shopDetail_fd6_1_c0_c2_babdd'   >
    <text class=' shopDetail_price1_fd6_1_c0_c2_babdd' >{{ dataDetails.shop_price | frontPrice }}</text><text class=' shopDetail_price2_fd6_1_c0_c2_babdd' >{{ dataDetails.shop_price | laterPrice }}</text>
</text>
<text class='shopDetail_fd6_1_c0_c3_babdd'  >{{$t('销量')}}</text>
<text class='shopDetail_fd6_1_c0_c4_babdd'  >{{dataDetails.sales_sum}}</text>
<text class='shopDetail_fd6_1_c0_c5_babdd'  >{{$t('件')}}</text>
</view>
</view>
 -->
        <!--     <view   class='flex align-center justify-between shopDetail_fd6_2_babdd'    v-if= " dataDetails.is_wholesale=='1' && dataDetails.is_step==0"  >
        <text class='shopDetail_fd6_2_c0_babdd'  >{{$t('购买数量')}}</text>
    <view   class='flex flex-wrap align-center shopDetail_fd6_2_c0_babdd'      >
        <text   >2</text>
<text   >{{$t('件起购')}}</text>
</view>
</view>
 -->
        <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd6_3_babdd">
          <view class="flex flex-wrap align-center">
            <view class="flex flex-wrap align-center flex-sub">
              <text class="shopDetail_fd6_3_c0_c0_c0_babdd">{{ dataDetails.name }}</text>
            </view>
            <view class="flex flex-direction flex-wrap align-center justify-center shopDetail_fd6_3_c0_c1_babdd" @tap.stop="isLikeFunc()">
              <image
                class="shopDetail_fd6_3_c0_c1_c0_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '72.png'"
                v-if="dataDetails.is_collect == '0'"
              ></image>
              <image
                class="shopDetail_fd6_3_c0_c1_c0_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '407.png'"
                v-if="dataDetails.is_collect == '1'"
              ></image>
              <text class="shopDetail_fd6_3_c0_c1_c1_babdd" v-if="dataDetails.is_collect == '0'">{{ $t('收藏') }}</text>
              <text class="shopDetail_fd6_3_c0_c1_c1_1_babdd" v-if="dataDetails.is_collect == '1'">{{ $t('已收藏') }}</text>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center"
              @tap.stop="popupShow1689239427011 = true"
              v-if="appSystemIdentification == 'Wechat'"
            >
              <image class="shopDetail_fd6_3_c0_c2_c0_babdd" mode="aspectFit" :src="STATIC_URL + '1499.png'"></image>
              <text class="shopDetail_fd6_3_c0_c2_c1_babdd">{{ $t('分享') }}</text>
            </view>
          </view>
          <view
            class="flex align-center shopDetail_fd6_3_c1_babdd"
            @tap.stop="popupShow1679630010186 = true"
            v-if="dataDetails.coupon_list.length != '0'"
          >
            <scroll-view class="shopDetail_fd6_3_c1_c0_babdd" :scroll-x="true" :scroll-y="false" :show-scrollbar="false" :enhanced="true">
              <view class="flex align-stretch benben-scroll flex">
                <template v-for="(item, key0) in dataDetails.coupon_list">
                  <view class="flex flex-wrap align-center shopDetail_fd6_3_c1_c0_c0_babdd" v-if="key0 < '2'" :key="key0">
                    <text class="shopDetail_fd6_3_c1_c0_c0_c0_babdd" v-if="item.content == '全场可用'">{{ $t('通用｜') }}</text>
                    <text class="shopDetail_price2_fd6_0_c0_c2_c1_babdd">{{ $t('满') }}</text>
                    <text class="shopDetail_price2_fd6_0_c0_c2_c1_babdd">{{ item.min_order_money }}</text>
                    <text class="shopDetail_price2_fd6_0_c0_c2_c1_babdd">-</text>
                    <text class="shopDetail_price2_fd6_0_c0_c2_c1_babdd">{{ item.money }}</text>
                  </view>
                </template>
              </view>
            </scroll-view>

            <button class="shopDetail_fd6_3_c1_c1_babdd">{{ $t('领券') }}</button>
            <text class="fu-iconfont2 shopDetail_price2_fd6_0_c0_c2_c1_babdd">&#xe7f2;</text>
          </view>
        </view>
        <!--     <view   class='flex flex-direction align-stretch shopDetail_fd6_4_babdd'    v-if= " dataDetails.is_step=='1'"  >
        <text class='shopDetail_fd6_4_c0_babdd'  >{{$t('折扣说明')}}</text>
    <view   class='flex flex-wrap align-center justify-between'      >
            <view   class='flex flex-direction align-center shopDetail_fd6_4_c1_c0_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='shopDetail_fd6_4_c1_c0_c0_c0_babdd'  >{{$t('￥')}}</text>
<text class=' shopDetail_fd6_1_c0_c2_babdd'   >
    <text class=' shopDetail_price1_fd6_4_c1_c0_c0_c1_babdd' >{{ 100 | frontPrice }}</text><text class=' shopDetail_price2_fd6_4_c1_c0_c0_c1_babdd' >{{ 100 | laterPrice }}</text>
</text>
</view>
<text class='shopDetail_fd6_4_c1_c0_c1_babdd'  >{{$t('50件')}}</text>
</view>
</view>
</view>
 -->
      </view>

      <!---flex布局flex布局结束-->
      <benben-specs-popup
        ref="specsPopup1700719656688"
        class="shopDetail_flex_specs_7_babdd"
        price-name="shop_price"
        @confirm="ConfirmPackagePopupFunc()"
      ></benben-specs-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd8_0_babdd">
          <view
            class="flex flex-wrap align-center"
            @tap.stop="selectSpecificationsFunc()"
            v-if="dataDetails.spec_list && dataDetails.spec_list.length > 0"
          >
            <text class="shopDetail_fd8_0_c0_c0_babdd">{{ $t('规格') }}</text>
            <view class="flex flex-wrap align-center justify-end flex-sub shopDetail_fd8_0_c0_c1_babdd">
              <text class="shopDetail_fd8_0_c0_c1_c0_babdd" v-if="sku_name != ''">{{ $t('已选：') }}</text>
              <text class="shopDetail_fd8_0_c0_c1_c0_babdd" v-if="sku_name == ''">{{ $t('请选择规格') }}</text>
              <text class="shopDetail_fd8_0_c0_c1_c1_1_babdd" v-if="sku_name != ''">{{ sku_name }}</text>
              <image class="shopDetail_fd8_0_c0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '304.png'"></image>
            </view>
          </view>
          <view class="flex flex-wrap align-center" @tap.stop="isAddressFunc()">
            <text class="shopDetail_fd8_0_c0_c0_babdd">{{ $t('送至') }}</text>
            <view class="flex align-center flex-sub shopDetail_fd8_0_c0_c1_babdd">
              <view class="flex flex-wrap align-center shopDetail_fd8_0_c1_c1_c0_babdd">
                <image
                  class="shopDetail_fd8_0_c1_c1_c0_c0_babdd"
                  mode="aspectFit"
                  :src="STATIC_URL + '113.png'"
                  v-if="addressList.length > 0"
                ></image>
                <view class="flex-sub shopDetail_fd8_0_c1_c1_c0_c1_babdd" v-if="addressList.length > 0">
                  <text class="shopDetail_fd8_0_c1_c1_c0_c1_c0_babdd">{{ isokaddress.province }}</text>
                  <text class="shopDetail_fd8_0_c1_c1_c0_c1_c0_babdd">{{ isokaddress.city }}</text>
                  <text class="shopDetail_fd8_0_c1_c1_c0_c1_c0_babdd">{{ isokaddress.district }}</text>
                  <text class="shopDetail_fd8_0_c1_c1_c0_c1_c0_babdd">{{ isokaddress.detail }}</text>
                </view>
              </view>
              <text class="shopDetail_fd8_0_c1_c1_c1_babdd" v-if="addressList.length == '0'">{{ $t('暂无地址') }}</text>
              <image class="shopDetail_fd8_0_c1_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '304.png'"></image>
            </view>
          </view>
          <view class="flex flex-wrap align-center" @tap.stop="popupShow1665473180775 = true">
            <text class="shopDetail_fd8_0_c0_c0_babdd">{{ $t('运费') }}</text>
            <view class="flex flex-wrap align-center justify-end flex-sub shopDetail_fd8_0_c0_c1_babdd">
              <text class="shopDetail_fd8_0_c0_c1_c0_babdd" v-if="dataDetails.is_shipping != '0'">{{ $t('包邮') }}</text>
              <text class="shopDetail_fd8_0_c2_c1_c0_1_babdd" v-if="dataDetails.is_shipping == '0'">{{ dataDetails.freight_name }}</text>
              <image class="shopDetail_fd8_0_c0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '304.png'"></image>
            </view>
          </view>
          <view
            class="flex flex-wrap align-center shopDetail_fd8_0_c3_babdd"
            @tap.stop="popupShow1679637574316 = true"
            v-if="dataDetails.warm_prompt != '' && dataDetails.warm_prompt != '无'"
          >
            <text class="shopDetail_fd8_0_c0_c0_babdd">{{ $t('提示') }}</text>
            <view class="flex align-center justify-end flex-sub">
              <text class="flex-sub shopDetail_fd8_0_c3_c1_c0_babdd">{{ dataDetails.warm_prompt }}</text>
              <image class="shopDetail_fd8_0_c1_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '304.png'"></image>
            </view>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd9_0_babdd">
          <view
            class="flex flex-wrap align-center flex-sub shopDetail_fd9_0_c0_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/evaluates/evaluates?id=${dataDetails.id}`"
          >
            <view class="flex flex-wrap align-center shopDetail_fd9_0_c0_c0_babdd"></view>
            <text class="shopDetail_fd9_0_c0_c1_babdd">{{ $t('商品评价(') }}</text>
            <text class="shopDetail_fd9_0_c0_c1_babdd">{{ dataDetails.comment_total }}</text>
            <text class="shopDetail_fd9_0_c0_c3_babdd">)</text>
            <text class="shopDetail_fd9_0_c0_c4_babdd" v-if="dataDetails.comment_total > 0">{{ $t('好评率') }}</text>
            <text class="shopDetail_fd9_0_c0_c5_babdd" v-if="dataDetails.comment_total > 0">{{ dataDetails.praise_rate }}</text>
            <text class="shopDetail_fd9_0_c0_c6_babdd" v-if="dataDetails.comment_total > 0">%</text>
            <image class="shopDetail_fd9_0_c0_c7_babdd" mode="aspectFit" :src="STATIC_URL + '304.png'"></image>
          </view>
          <template v-for="(item, key0) in dataDetails.comment">
            <view
              class="flex flex-direction flex-wrap align-stretch flex-sub shopDetail_fd9_0_c1_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/detailsComment/detailsComment?gc_id=${item.aid}`"
              v-if="key0 < '1'"
              :key="key0"
            >
              <view class="flex flex-wrap align-start flex-sub shopDetail_fd9_0_c1_c0_babdd">
                <image class="shopDetail_fd9_0_c1_c0_c0_babdd" mode="aspectFill" :src="item.avatar"></image>
                <view class="flex flex-direction flex-wrap align-stretch flex-sub shopDetail_fd9_0_c1_c0_c1_babdd">
                  <view class="flex flex-wrap align-center shopDetail_fd9_0_c1_c0_c1_c0_babdd">
                    <text class="flex-sub shopDetail_fd9_0_c1_c0_c1_c0_c0_babdd">{{ item.nickname }}</text>
                    <text class="shopDetail_fd9_0_c1_c0_c1_c0_c1_babdd">{{ item.create_time }}</text>
                  </view>
                  <view class="flex flex-wrap align-center">
                    <template v-for="starNum in [1, 2, 3, 4, 5]">
                      <image
                        v-if="item.star >= starNum"
                        :key="starNum"
                        class="shopDetail_star1fd9_0_c1_c0_c1_c1_babdd"
                        mode="aspectFit"
                        :src="STATIC_URL + '428.png'"
                      ></image>
                      <image
                        v-else
                        :key="starNum"
                        class="shopDetail_star1fd9_0_c1_c0_c1_c1_babdd"
                        mode="aspectFit"
                        :src="STATIC_URL + '294.png'"
                      ></image>
                    </template>
                  </view>
                </view>
              </view>
              <text class="shopDetail_fd9_0_c1_c1_babdd">{{ item.content }}</text>
              <view class="flex flex-wrap align-stretch shopDetail_fd9_0_c1_c2_babdd">
                <template v-for="(child, key1) in item.thumb">
                  <view class="flex flex-direction flex-wrap align-stretch self-center shopDetail_fd9_0_c1_c2_c0_babdd" :key="key1">
                    <image class="shopDetail_fd9_0_c1_c2_c0_c0_babdd" mode="aspectFill" :src="child"></image>
                  </view>
                </template>
              </view>
              <view class="flex flex-wrap align-center self-center flex-sub shopDetail_fd9_0_c1_c3_babdd">
                <text class="shopDetail_fd9_0_c1_c3_c0_babdd" v-if="item.key_name">{{ item.key_name }}</text>
                <view class="flex flex-wrap align-center shopDetail_fd9_0_c1_c3_c1_babdd">
                  <text class="shopDetail_fd9_0_c1_c3_c1_c0_babdd">{{ $t('评论') }}</text>
                  <image class="shopDetail_fd9_0_c1_c3_c1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '76.png'"></image>
                  <text class="shopDetail_fd9_0_c1_c3_c1_c2_babdd">{{ $t('点赞') }}</text>
                  <image class="shopDetail_fd9_0_c1_c3_c1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '94.png'" v-if="item.is_likes == '0'"></image>
                  <image
                    class="shopDetail_fd9_0_c1_c3_c1_c1_babdd"
                    mode="aspectFit"
                    :src="STATIC_URL + '493.png'"
                    v-if="item.is_likes != '0'"
                  ></image>
                </view>
              </view>
            </view>
          </template>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout shopDetail_flex_10_babdd" v-if="dataDetails.body">
        <view class="flex flex-wrap align-center shopDetail_fd10_0_babdd">
          <view class="flex flex-wrap align-center shopDetail_fd10_0_c0_babdd"></view>
          <text class="shopDetail_fd10_0_c1_babdd">{{ $t('商品详情') }}</text>
        </view>
        <view class="flex flex-wrap align-center shopDetail_fd10_1_babdd">
          <jyf-parser class="shopDetail_fd10_1_c0_babdd" :html="dataDetails.body | richTextFormat"></jyf-parser>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1679645673274" :mask="true" :mask-close-able="true" mode="bottom">
        <!---分享到相册flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
          <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd11_0_babdd">
            <view class="flex flex-wrap align-center justify-between shopDetail_fd11_0_c0_babdd">
              <view class="flex flex-wrap align-center shopDetail_fd11_0_c0_c0_babdd"></view>
              <view class="flex flex-wrap align-center justify-center">
                <image class="shopDetail_fd11_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
                <text class="shopDetail_fd11_0_c0_c1_c1_babdd">{{ $t('保存到相册') }}</text>
                <image class="shopDetail_fd11_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
              </view>
              <view class="flex flex-wrap align-center" @tap.stop="popupShow1679645673274 = false">
                <image class="shopDetail_fd11_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '93.png'"></image>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-center">
              <view class="flex flex-direction flex-wrap align-stretch justify-around shopDetail_fd11_0_c1_c0_babdd">
                <image class="shopDetail_fd11_0_c1_c0_c0_babdd" mode="aspectFit" :src="fxImg"></image>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-center shopDetail_fd11_0_c2_babdd">
              <button class="shopDetail_fd11_0_c2_c0_babdd" @tap.stop="SavePictureFunc()">{{ $t('保存图片') }}</button>
            </view>
          </view>
        </view>

        <!---分享到相册flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1689239427011" :mask="true" :mask-close-able="true" mode="bottom">
        <!---分享flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
          <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd12_0_babdd">
            <view class="flex flex-wrap align-center justify-between shopDetail_fd12_0_c0_babdd">
              <view class="flex flex-wrap align-center shopDetail_fd12_0_c0_c0_babdd"></view>
              <view class="flex flex-wrap align-center justify-center shopDetail_fd12_0_c0_c1_babdd">
                <image class="shopDetail_fd12_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
                <text class="shopDetail_fd12_0_c0_c1_c1_babdd">{{ $t('分享到') }}</text>
                <image class="shopDetail_fd12_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
              </view>
              <view class="flex flex-wrap align-center shopDetail_fd12_0_c0_c2_babdd">
                <image
                  class="shopDetail_fd12_0_c0_c2_c0_babdd"
                  mode="aspectFit"
                  :src="STATIC_URL + '93.png'"
                  @tap.stop="popupShow1689239427011 = false"
                ></image>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-around shopDetail_fd12_0_c1_babdd">
              <view class="flex flex-direction flex-wrap align-center" @tap="MysharedFunc(3)" v-if="appSystemIdentification != 'Wechat'">
                <image class="shopDetail_fd12_0_c1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '111.png'"></image>
                <text class="shopDetail_fd12_0_c1_c0_c1_babdd">{{ $t('复制链接') }}</text>
              </view>
              <view class="flex flex-direction flex-wrap align-center" @tap.stop="MysharedFunc(4)">
                <image class="shopDetail_fd12_0_c1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '112.png'"></image>
                <text class="shopDetail_fd12_0_c1_c0_c1_babdd">{{ $t('分享海报') }}</text>
              </view>
            </view>
          </view>
        </view>

        <!---分享flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679637574316" :mask="true" :mask-close-able="true" mode="bottom">
        <!---温馨提醒flex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout shopDetail_flex_13_babdd">
          <view class="flex flex-wrap align-center justify-between shopDetail_fd13_0_babdd">
            <view class="flex flex-wrap align-center shopDetail_fd13_0_c0_babdd"></view>
            <view class="flex flex-wrap align-center justify-center shopDetail_fd13_0_c1_babdd">
              <image class="shopDetail_fd13_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
              <text class="shopDetail_fd13_0_c1_c1_babdd">{{ $t('温馨提示') }}</text>
              <image class="shopDetail_fd13_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            </view>
            <image
              class="shopDetail_fd13_0_c2_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '93.png'"
              @tap.stop="popupShow1679637574316 = false"
            ></image>
          </view>

          <scroll-view class="shopDetail_fd13_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <text class="shopDetail_fd13_1_c0_babdd">{{ dataDetails.warm_prompt }}</text>
            </view>
          </scroll-view>
        </view>

        <!---温馨提醒flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679630010186" :mask="true" :mask-close-able="true" mode="bottom">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout">
          <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd14_0_babdd">
            <view class="flex flex-wrap align-center justify-between shopDetail_fd14_0_c0_babdd">
              <view class="flex flex-wrap align-center shopDetail_fd14_0_c0_c0_babdd"></view>
              <view class="flex flex-wrap align-center">
                <image class="shopDetail_fd14_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
                <text class="shopDetail_fd14_0_c0_c1_c1_babdd">{{ $t('优惠') }}</text>
                <image class="shopDetail_fd14_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
              </view>
              <image
                class="shopDetail_fd14_0_c0_c2_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '85.png'"
                @tap.stop="popupShow1679630010186 = false"
              ></image>
            </view>

            <scroll-view class="shopDetail_fd14_0_c1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <template v-for="(item, key0) in dataDetails.coupon_list">
                  <view class="flex flex-direction align-stretch" :key="key0">
                    <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd14_0_c1_c0_c0_babdd" v-if="item.is_receive != '1'">
                      <view class="flex flex-wrap align-center shopDetail_fd14_0_c1_c0_c0_c0_babdd">
                        <image class="shopDetail_fd14_0_c1_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '88.png'"></image>
                        <view class="flex flex-direction flex-wrap align-stretch flex-sub shopDetail_fd14_0_c1_c0_c0_c0_c1_babdd">
                          <view class="flex flex-wrap align-center">
                            <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c0_c0_babdd">{{ item.name }}</text>
                          </view>
                          <view class="flex flex-wrap align-center shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_babdd">
                            <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd">{{ $t('有效期至：') }}</text>
                            <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd">{{ item.end_time }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center">
                          <text class="shopDetail_fd14_0_c1_c0_c0_c0_c2_c0_babdd">￥</text>
                          <text class="shopDetail_fd14_0_c1_c0_c0_c0_c2_c1_babdd">
                            <text class="shopDetail_price1_fd14_0_c1_c0_c0_c0_c2_c1_babdd">{{ item.money | frontPrice }}</text>
                            <text class="shopDetail_price2_fd14_0_c1_c0_c0_c0_c2_c1_babdd">{{ item.money | laterPrice }}</text>
                          </text>
                        </view>
                      </view>
                      <view class="flex flex-wrap align-center justify-between shopDetail_fd14_0_c1_c0_c0_c1_babdd">
                        <text class="shopDetail_fd14_0_c1_c0_c0_c1_c0_babdd">{{ item.content }}</text>
                        <button class="shopDetail_fd14_0_c1_c0_c0_c1_c1_babdd" @tap.stop="lingqucoupon_idFunc(item.aid)">{{ $t('立即领取') }}</button>
                      </view>
                    </view>
                    <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd14_0_c1_c0_c1_babdd" v-if="item.is_receive == '1'">
                      <view class="flex flex-wrap align-center shopDetail_fd14_0_c1_c0_c0_c0_babdd">
                        <image class="shopDetail_fd14_0_c1_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '90.png'"></image>
                        <view class="flex flex-direction flex-wrap align-stretch flex-sub shopDetail_fd14_0_c1_c0_c0_c0_c1_babdd">
                          <view class="flex flex-wrap align-center">
                            <text class="shopDetail_fd14_0_c1_c0_c1_c0_c1_c0_c0_babdd">{{ item.name }}</text>
                          </view>
                          <view class="flex flex-wrap align-center shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_babdd">
                            <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd">{{ $t('有效期至：') }}</text>
                            <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd">{{ item.end_time }}</text>
                          </view>
                        </view>
                        <view class="flex flex-wrap align-center">
                          <text class="shopDetail_fd14_0_c1_c0_c1_c0_c2_c0_babdd">￥</text>
                          <text class="shopDetail_fd14_0_c1_c0_c1_c0_c2_c1_babdd">
                            <text class="shopDetail_price1_fd14_0_c1_c0_c0_c0_c2_c1_babdd">{{ item.money | frontPrice }}</text>
                            <text class="shopDetail_price2_fd14_0_c1_c0_c0_c0_c2_c1_babdd">{{ item.money | laterPrice }}</text>
                          </text>
                        </view>
                      </view>
                      <view class="flex flex-wrap align-center justify-between shopDetail_fd14_0_c1_c0_c0_c1_babdd">
                        <text class="shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd">{{ item.content }}</text>
                        <button class="shopDetail_fd14_0_c1_c0_c1_c1_c1_babdd">{{ $t('已领取') }}</button>
                      </view>
                    </view>
                  </view>
                </template>

                <benben-empty :list-data="dataDetails.coupon_list">
                  <view>
                    <view class="flex flex-direction flex-wrap align-center shopDetail_fd14_0_c1_c1_babdd">
                      <image class="shopDetail_fd14_0_c1_c1_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
                    </view>
                  </view>
                </benben-empty>
              </view>
            </scroll-view>
          </view>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1665473180775" :mask="true" :mask-close-able="true" mode="bottom">
        <!---运费说明弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout shopDetail_flex_15_babdd">
          <view class="flex flex-wrap align-center justify-between shopDetail_fd15_0_babdd">
            <view class="flex flex-wrap align-center shopDetail_fd15_0_c0_babdd"></view>
            <view class="flex flex-wrap align-center justify-center shopDetail_fd15_0_c1_babdd">
              <image class="shopDetail_fd15_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
              <text class="shopDetail_fd15_0_c1_c1_babdd">{{ $t('运费说明') }}</text>
              <image class="shopDetail_fd15_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            </view>
            <image
              class="shopDetail_fd15_0_c2_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '93.png'"
              @tap.stop="popupShow1665473180775 = false"
            ></image>
          </view>

          <scroll-view class="shopDetail_fd15_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <text class="shopDetail_fd15_1_c0_babdd" v-if="dataDetails.freight_explain != ''">{{ dataDetails.freight_explain }}</text>
              <text class="shopDetail_fd15_1_c0_1_babdd" v-if="!dataDetails.freight_explain">{{ $t('暂无运费说明。') }}</text>
            </view>
          </scroll-view>
        </view>

        <!---运费说明弹窗flex布局结束-->
      </benben-popup>
      <view class="flex flex-direction align-stretch benben-position-layout flex shopDetail_flex_16_babdd" v-if="dibu === true">
        <!--     <view   class='flex flex-direction align-stretch flex-sub shopDetail_fd16_0_babdd'      >
            <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopIndex/shopIndex?usermerchant_aid=${dataDetails.shop_info.store_id}`"   >
        <image class='shopDetail_fd16_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"81.png"'></image>
<text class='shopDetail_fd16_0_c0_c1_babdd'  >{{$t('店铺')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="getKefuFuncFunc()"   >
        <image class='shopDetail_fd16_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"82.png"'></image>
<text class='shopDetail_fd16_0_c0_c1_babdd'  >{{$t('客服')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="popupShow1689239427011=true" v-if= " appSystemIdentification=='Wechat'"  >
        <image class='shopDetail_fd16_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1499.png"'></image>
<text class='shopDetail_fd16_0_c0_c1_babdd'  >{{$t('分享')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center shopDetail_fd16_0_c3_babdd'   @tap.stop="handleJumpDiy" data-type="switchTab" :data-url="`/pages/tabBar/shopping/shopping`"   >
        <image class='shopDetail_fd16_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"83.png"'></image>
        <benben-message-num class='shopDetail_fd16_0_c3_c1_babdd'  :message-num="dataNum.count" size='20' color='#fff' background-color='red'  >
        </benben-message-num>
<text class='shopDetail_fd16_0_c0_c1_babdd'  >{{$t('购物车')}}</text>
</view>
</view>
 -->
        <!-- <button class='shopDetail_fd16_1_babdd'  @tap.stop="carSpecificationsFunc()" v-if= " dataDetails.is_sale=='1' && dataDetails.is_check=='1'" >{{$t('加入购物车')}}</button>
 -->
        <view class="flex align-center justify-between flex-sub shopDetail_fd16_2_babdd">
          <view class="flex align-stretch justify-around flex-sub shopDetail_fd16_0_babdd">
            <view class="flex flex-direction flex-wrap align-center" @tap.stop="getKefuFuncFunc()">
              <image class="shopDetail_fd16_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '82.png'"></image>
              <text class="shopDetail_fd16_2_c0_c0_c1_babdd">{{ $t('客服') }}</text>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center shopDetail_fd16_0_c3_babdd"
              @tap.stop="handleJumpDiy"
              data-type="switchTab"
              :data-url="`/pages/tabBar/shopping/shopping`"
            >
              <image class="shopDetail_fd16_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '83.png'"></image>
              <benben-message-num
                class="shopDetail_fd16_0_c3_c1_babdd"
                :message-num="dataNum.count"
                size="20"
                color="#fff"
                background-color="red"
              ></benben-message-num>
              <text class="shopDetail_fd16_2_c0_c0_c1_babdd">{{ $t('购物车') }}</text>
            </view>
          </view>
          <button
            class="shopDetail_fd16_2_c1_babdd"
            @tap.stop="carSpecificationsFunc()"
            v-if="dataDetails.is_sale == '1' && dataDetails.is_check == '1'"
          >
            {{ $t('加入购物车') }}
          </button>
          <view
            class="flex flex-direction flex-wrap align-center self-center justify-center shopDetail_fd16_2_c2_babdd"
            v-if="dataDetails.is_sale == '1' && dataDetails.is_check == '1'"
          >
            <view class="flex flex-wrap align-center" v-if="dataDetails.discounts != '0.00'">
              <text class="shopDetail_fd16_2_c2_c0_c0_babdd">{{ $t('返') }}</text>
              <text class="shopDetail_fd16_2_c2_c0_c0_babdd">{{ dataDetails.discounts }}</text>
            </view>
            <text class="shopDetail_fd16_2_c2_c1_babdd" @tap.stop="buySpecificationsFunc()">{{ $t('立即购买') }}</text>
          </view>
          <button class="shopDetail_fd16_2_c3_babdd" v-if="dataDetails.is_sale == 0 || dataDetails.is_check == 0">{{ $t('商品已下架') }}</button>
        </view>
      </view>
      <view :style="{ height: '120rpx' }" v-if="dibu === true"></view>
      <benben-popup v-model="popupShow1686125027669" :mask="true" :mask-close-able="true" mode="bottom">
        <!---配送至flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout shopDetail_flex_17_babdd">
          <view class="flex flex-direction flex-wrap align-stretch shopDetail_fd17_0_babdd">
            <view class="flex flex-wrap align-center justify-between shopDetail_fd17_0_c0_babdd">
              <view class="flex flex-wrap align-center shopDetail_fd17_0_c0_c0_babdd"></view>
              <view class="flex flex-wrap align-center justify-center">
                <image class="shopDetail_fd17_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
                <text class="shopDetail_fd17_0_c0_c1_c1_babdd">{{ $t('配送至') }}</text>
                <image class="shopDetail_fd17_0_c0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
              </view>
              <view class="flex flex-wrap align-center shopDetail_fd17_0_c0_c2_babdd">
                <image
                  class="shopDetail_fd17_0_c0_c2_c0_babdd"
                  mode="aspectFit"
                  :src="STATIC_URL + '93.png'"
                  @tap.stop="popupShow1686125027669 = false"
                ></image>
              </view>
            </view>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch self-center justify-center shopDetail_fd17_1_babdd">
            <scroll-view class="shopDetail_fd17_1_c0_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <benben-select-diy
                  ref="showSelectPopup1693557567723"
                  class-text="flex-direction align-stretch flex"
                  :items.sync="addressList"
                  v-model="address_id"
                  @change="chooseAddrFunc($event)"
                  default-type="aid"
                  :allow-cancel="false"
                  type="radio"
                  :disabled="false"
                  v-if="addressList.length > 0"
                >
                  <benben-select-item v-for="(item, key0) in addressList" :hand-value="item.aid" :key="key0">
                    <template #selected>
                      <view class="flex flex-direction align-stretch flex">
                        <view class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_babdd">
                          <image class="shopDetail_fd17_1_c0_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '91.png'"></image>
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex align-center shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_babdd">
                              <view class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_babdd">
                                <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_c0_babdd">{{ item.label_name }}</text>
                              </view>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c1_babdd">{{ item.real_name }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c2_babdd">(</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c3_babdd" v-if="item.sex == '1'">{{ $t('先生') }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c2_babdd" v-if="item.sex != '1'">{{ $t('女士') }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c3_babdd">)</text>
                              <text class="flex-sub shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c5_babdd">{{ item.mobile }}</text>
                            </view>
                            <view class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_babdd">
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.province }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.city }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.district }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.detail }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_c2_babdd"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/wd/editAddress/editAddress?id=${item.aid}`"
                          >
                            <image class="shopDetail_fd17_1_c0_c0_c0_c0_c2_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="shopDetail_fd17_1_c0_c0_c0_c0_c2_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </template>
                    <template #no-selected>
                      <view class="flex flex-direction align-stretch self-center flex">
                        <view class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_babdd">
                          <image class="shopDetail_fd17_1_c0_c0_c0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '92.png'"></image>
                          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                            <view class="flex align-center shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_babdd">
                              <view class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_babdd">
                                <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_c0_babdd">{{ item.label_name }}</text>
                              </view>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c1_babdd">{{ item.real_name }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c2_babdd">(</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c3_babdd" v-if="item.sex == '1'">{{ $t('先生') }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c2_babdd" v-if="item.sex != '1'">{{ $t('女士') }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c3_babdd">)</text>
                              <text class="flex-sub shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c5_babdd">{{ item.mobile }}</text>
                            </view>
                            <view class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_babdd">
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.province }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.city }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.district }}</text>
                              <text class="shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd">{{ item.detail }}</text>
                            </view>
                          </view>
                          <view
                            class="flex flex-wrap align-center shopDetail_fd17_1_c0_c0_c0_c0_c2_babdd"
                            @tap.stop="handleJumpDiy"
                            data-type="navigateTo"
                            :data-url="`/pages/wd/editAddress/editAddress?id=${item.aid}`"
                          >
                            <image class="shopDetail_fd17_1_c0_c0_c0_c0_c2_c0_babdd" mode="aspectFit" :src="STATIC_URL + '127.png'"></image>
                            <text class="shopDetail_fd17_1_c0_c0_c0_c0_c2_c1_babdd">{{ $t('编辑') }}</text>
                          </view>
                        </view>
                      </view>
                    </template>
                  </benben-select-item>
                </benben-select-diy>
                <benben-empty :list-data="addressList">
                  <view>
                    <view class="flex flex-direction flex-wrap align-center shopDetail_fd17_1_c0_c1_babdd">
                      <image class="shopDetail_fd17_1_c0_c1_c0_babdd" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
                    </view>
                  </view>
                </benben-empty>
              </view>
            </scroll-view>
          </view>
          <view
            class="flex flex-wrap align-center justify-center shopDetail_fd17_2_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/editAddress/editAddress`"
          >
            <text class="shopDetail_fd17_2_c0_babdd">{{ $t('新增地址') }}</text>
          </view>
        </view>

        <!---配送至flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js'
import { validate } from '@/common/utils/validate.js'
let mixin = {
  onShareAppMessage() {
    return {
      title: this.dataDetails.name,
      path: `/pages/fl/shopDetail/shopDetail?id=${this.id}&code=${this.invite_code}&stype=wx&share_sign=${this.dataDetails.share_sign}`,
      imageUrl: this.sharedInfo?.share_bg,
    }
  },
  onShareTimeline() {
    return {
      title: this.dataDetails.name,
      imageUrl: this.sharedInfo?.share_bg,
    }
  },
}
export default {
  components: {},
  mixins: [pagingList, mixin],

  data() {
    return {
      popupShow1686125027669: false,
      popupShow1665473180775: false,
      popupShow1679630010186: false,
      popupShow1679637574316: false,
      popupShow1689239427011: false,
      popupShow1679645673274: false,
      popupShow1700556466468: false,
      painterParam1690420071407: false,
      painterParam1730449491555: false,
      bannerIndexfd2_0_c0: 0,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      /** coupon_id【优惠券id】 **/
      coupon_id: '',
      /** buy_num【购买数量】 **/
      buy_num: 1,
      /** sku_id【选择规格id】 **/
      sku_id: '',
      /** sku_name【选中规格名称】 **/
      sku_name: '',
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
      dataMessage: {
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
        has_address: 0,
      },
      /** chat_url【客服链接】 **/
      datakefu: {
        chat_url: '',
      },
      /** is_sale【是否上架 0否 1是】
       *   is_check【是否审核通过 0否 1是】
       *   package_count【套餐总数】
       *   package_arr【套餐信息】
       *   init_wholesale_num【起批量】
       *   is_step【是否开启阶梯价 0否 1是】
       *   is_wholesale【是否开启批发 0否 1是】
       *   comment【评论列表】
       *   warm_prompt【温馨提示】
       *   shop_info【店铺信息】
       *   store_collection_num【关注数量】
       *   store_star【店铺评分】
       *   level_name【店铺套餐】
       *   store_logo【店铺logo】
       *   store_name【店铺名称】
       *   store_id【店铺ID】
       *   question_list【提问列表】
       *   question_total【提问数量】
       *   freight_name【邮费模板名称】
       *   freight_explain【邮费描述】
       *   praise_rate【好评率】
       *   comment_total【评论总数】
       *   is_collect【是否收藏该商品】
       *   user_level【会员级别】
       *   activity_info【活动信息】
       *   activity_type【活动ID】
       *   coupon_list【优惠券列表】
       *   sku_list【SKU列表】
       *   step_price【阶梯展示价格】
       *   stock【库存】
       *   market_price【划线价】
       *   shop_price【售价】
       *   member_price【会员价】
       *   key_name【规格内容】
       *   key【规格ID组合】
       *   sku_id【skuID】
       *   spec_list【规格列表】
       *   discounts【自购返】
       *   share_award_money【分享赚】
       *   video_img【视频封面图】
       *   video【视频地址】
       *   partner_id【所属商家ID】
       *   freight_template_id【运费模板ID】
       *   support_self_mention【是否支持自提	0 不支持 1 支持】
       *   freight_price【邮费】
       *   is_shipping【是否包邮 0 不包邮 1 包邮】
       *   is_spec【是否多规格】
       *   stock【库存】
       *   description【商品简介】
       *   body【详情】
       *   thumb【标题图片】
       *   images【轮播图图片】
       *   market_price【市场价】
       *   member_price【会员价】
       *   shop_price【售价】
       *   is_hot【是否热销】
       *   is_new【是否新品】
       *   is_recommend【是否推荐】
       *   click【浏览量】
       *   spectypeid【规格类型ID】
       *   sales_sum【销量】
       *   name【商品名称】
       *   adslogan【广告语】
       *   cid【所属分类ID】
       *   id【商品ID】 **/
      dataDetails: {
        id: '',
        cid: '',
        adslogan: '',
        name: '',
        sales_sum: '',
        spectypeid: '',
        click: '',
        is_recommend: '',
        is_new: '',
        is_hot: '',
        shop_price: '',
        member_price: '',
        market_price: '',
        images: [],
        thumb: '',
        body: '',
        description: '',
        stock: '',
        is_spec: '',
        is_shipping: '',
        freight_price: '',
        support_self_mention: '',
        freight_template_id: '',
        partner_id: '',
        video: '',
        video_img: '',
        share_award_money: '',
        discounts: '',
        spec_list: [],
        sku_list: {
          /** sku_id【选择规格id】 **/
          sku_id: '',
          key: '',
          key_name: '',
          member_price: '',
          shop_price: '',
          market_price: '',
          stock: '',
          step_price: [],
        },
        coupon_list: [],
        activity_info: {
          activity_type: '',
        },
        user_level: '',
        is_collect: '',
        comment_total: '',
        praise_rate: '',
        freight_explain: '',
        freight_name: '',
        sale_top_name: '',
        question_total: '',
        question_list: [],
        goods_type: '',
        chat_price: '',
        shop_info: {
          store_id: '',
          store_name: '',
          store_logo: '',
          level_name: '',
          store_star: '',
          store_collection_num: '',
        },
        warm_prompt: '',
        comment: [],
        is_wholesale: 0,
        is_step: 0,
        init_wholesale_num: 0,
        package_arr: [],
        package_count: 0,
        is_check: 0,
        is_sale: 0,
      },
      index: 0,
      isokaddress: {
        address_code: '',
        address_code_area: '',
        aid: '',
        city: '',
        city_id: '',
        detail: '',
        district: '',
        district_id: '',
        is_default: '',
        label_name: '',
        mobile: '',
        province: '',
        province_id: '',
        real_name: '',
        sex: '',
      },
      addressList: [],
      address_id: '',
      /** sharedInfo【分享需要的链接】
       *   market_price【划线价】
       *   goods_price【商品价格】
       *   goods_thumb【商品主图】
       *   share_bg【小程序分享背景】
       *   qrcode_url【二维码图片地址】
       *   url【H5分享链接】 **/
      sharedInfo: {
        url: '',
        qrcode_url: '',
        share_bg: '',
        goods_thumb: '',
        goods_price: 0,
        market_price: 0,
      },
      /** sharedImg【分享画出来的图片】 **/
      sharedImg: '',
      /** count【购物车数量】 **/
      dataNum: {
        count: '',
      },
      orderinfo: [],
      package_id: '',
      info_id: '',
      dibu: false,
      /** login_url【后台登录地址】
       *   is_close【是否开启签到】
       *   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
       *   nickname【昵称】
       *   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
       *   total_money【会员总金额】
       *   _mobile【手机号不带*号】
       *   score【积分余额】
       *   total_consumption_money【总消费金额】
       *   freeze_money【会员冻结金额】
       *   user_money【会员余额】
       *   gender【性别 1 男 2 女】
       *   birthday【生日】
       *   email【邮箱】
       *   account【登录账号】
       *   avatar【头像】
       *   real_name【真实姓名】
       *   mobile【手机号带*号】
       *   userlevel_id【会员级别】
       *   id【会员ID】
       *   tags【标签】
       *   hobby【爱好】
       *   address_code【地址编码】
       *   address【地址】
       *   invite_code【邀请码】 **/
      infodataMessage: {
        invite_code: '',
        address: '',
        address_code: '',
        hobby: '',
        tags: '',
        id: 0,
        userlevel_id: 0,
        mobile: '',
        real_name: '',
        avatar: '',
        account: '',
        email: '',
        birthday: '',
        gender: '',
        create_time: '',
        user_money: '',
        freeze_money: '',
        total_consumption_money: '',
        score: '',
        _mobile: '',
        coupon: 0,
        total_money: 0,
        certified: 0,
        nickname: '',
        is_pay_password: 0,
        is_close: 0,
        login_url: '',
      },
      invite_code: '',
      /** pageScrollTopBuilt【页面滚动距离】 **/
      pageScrollTopBuilt: 0,
      /** tempFilePath【文件临时路径路径】 **/
      downloadImg: {
        tempFilePath: '',
      },
      /** OneComment【随机的评论】 **/
      OneComment: '这价格？不抢一个说不过去了',
      /** fxImg【卡片海报】 **/
      fxImg: '',
      messageList: [
        {
          title: '产品超赞，性价比高，非常满意！',
        },
        {
          title: '这家店很可以，已经买过几次了。',
        },
        {
          title: '服务态度真的很好，送货很快。',
        },
        {
          title: '这个价格买这样的东西很划算。',
        },
        {
          title: '态度很好，质量很好，还会再来。',
        },
      ],
      dataGoodsList: [],
      cid: '0',
      goods_type: '',
      tabs: '0',
      dataRotograph: [],
      /** diy_category_list【diy分类列表】
       *   ad_list【广告列表】
       *   category_list【子分类】 **/
      secondaryClassifieds: {
        category_list: [],
        ad_list: [],
        diy_category_list: [],
      },
      /** wxShareImg【小程序二维码】
       *   base64【二维码】 **/
      wxShareImg: {
        base64: '',
      },
      psgeUrl: '',
      scene: '',
      shopType: '',
      id: '962',
      stype: '',
      shop_id: '',
      code: '',
      share_sign: '',
    }
  },
  computed: {
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
    let { id, stype, shop_id, code, share_sign } = options
    if (id !== undefined) this.id = id
    if (stype !== undefined) this.stype = stype
    if (shop_id !== undefined) this.shop_id = shop_id
    if (code !== undefined) this.code = code
    if (share_sign !== undefined) this.share_sign = share_sign
    this.serveInviteCodeFunc()
    this.getShopDataFunc()
    this.xcxcxcFunc(options.scene)
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getAddressListFunc()
    this.getDetailFunc()
    this.getCatNumFunc()
  },
  onHide() {
    this.onHidecloseFunc()
  },
  onResize() {},
  onPullDownRefresh() {
    this.getDetailFunc()
    this.getCatNumFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {
    this.pageScrollTopBuilt = e.scrollTop
  },
  methods: {
    //是否显示运费弹窗
    isxianshiFunc() {
      if (this.dataDetails.is_shipping == '1') {
        this.popupShow1665473180775 = false
      } else {
        this.popupShow1665473180775 = true
      }
    },
    //获取地址列表
    async getAddressListFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        this.addressList = []
        let dataaddressList = await this.$api.get(global.apiUrls.post636f7683cf195, {})
        if (dataaddressList.data.code != 1) {
          this.$message.info(dataaddressList.data.msg)
          return
        }
        let infoaddressList = dataaddressList.data
        this.addressList = infoaddressList.data.data //多了一层data
        if (this.addressList.length > 0) {
          this.isokaddress = this.addressList[0]
          this.address_id = this.addressList[0].aid
        }

        return
      }
    },
    //规格选择多规格弹窗
    selectSpecificationsFunc() {
      this.$refs.specsPopup1706585747219.open('all')
    },
    //多规格购物车弹窗
    carSpecificationsFunc() {
      this.$refs.specsPopup1706585747219.open('cart')
    },
    //多规格立即购买
    buySpecificationsFunc() {
      this.$refs.specsPopup1706585747219.open('buy')
    },
    //加入购物车
    async addCarFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let data6412f82acb5ba = await this.$api.dbPost(global.apiUrls.post6412f82acb5ba, {
          goods_id: this.id,
          sku_id: this.sku_id,
          num: this.buy_num,
        })
        if (!data6412f82acb5ba) return
        if (data6412f82acb5ba.data.code != 1) {
          this.$message.info(data6412f82acb5ba.data.msg)
          return
        }
        let info6412f82acb5ba = data6412f82acb5ba.data

        this.$refs.specsPopup1706585747219.close()
        uni.showToast({
          title: this.$t('加入购物车成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.getCatNumFunc()
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.toLoginDiy()
      }
    },
    //立即购买
    async buyNowFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let datadataMessage = await this.$api.dbPost(global.apiUrls.post62c6a51abaf56, {
          goods_id: this.dataDetails.id,
          sku_id: this.sku_id,
          number: this.buy_num,
          address_id: this.address_id,
          money: this.dataDetails.shop_price,
        })
        if (!datadataMessage) return
        if (datadataMessage.data.code != 1) {
          this.$message.info(datadataMessage.data.msg)
          return
        }
        let infodataMessage = datadataMessage.data
        this.dataMessage = infodataMessage.data

        this.$refs.specsPopup1706585747219.close()
        this.$urouter.navigateTo(
          `/pages/ddgl/directOrder/directOrder?goods_id=${this.dataDetails.id}&sku_id=${this.sku_id}&num=${this.buy_num}&money=${this.dataDetails.shop_price}&address_id=${this.address_id}`,
        )
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.toLoginDiy()
      }
    },
    //领取优惠券
    async lingqucoupon_idFunc(id) {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let data64196d6a86d0d = await this.$api.dbPost(global.apiUrls.post64196d6a86d0d, {
          id: id,
        })
        if (!data64196d6a86d0d) return
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
        this.getDetailFunc()
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.toLoginDiy()
      }
    },
    //收藏
    async isLikeFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let data636caf10164ce = await this.$api.dbPost(global.apiUrls.post636caf10164ce, {
          goods_id: this.id,
        })
        if (!data636caf10164ce) return
        if (data636caf10164ce.data.code != 1) {
          this.$message.info(data636caf10164ce.data.msg)
          return
        }
        let info636caf10164ce = data636caf10164ce.data

        if (this.dataDetails.is_collect == '1') {
          uni.showToast({
            title: this.$t('取消收藏成功'),
            mask: true,
            icon: 'none',
            duration: 1500,
          })
          this.dataDetails.is_collect = '0'
        } else {
          uni.showToast({
            title: this.$t('收藏成功'),
            mask: true,
            icon: 'none',
            duration: 1500,
          })
          this.dataDetails.is_collect = '1'
        }
      } else {
        uni.showToast({
          title: this.$t('您还没有登录，请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          this.toLoginDiy()
        }, 500)
      }
    },
    //获取客服链接
    async getKefuFuncFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let datadatakefu = await this.$api.get(global.apiUrls.post64897f6fd5486, {
          store_id: this.dataDetails.shop_info.store_id,
          goods_id: this.id,
          sku_id: this.sku_id,
        })

        if (datadatakefu.data.code != 1) {
          this.$message.info(datadatakefu.data.msg)
          return
        }
        let infodatakefu = datadatakefu.data
        this.datakefu = infodatakefu.data

        this.dynamicJump(this.datakefu.chat_url)
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.toLoginDiy()
      }
    },
    //商品管理-获取商品详情
    async getDetailFunc() {
      //请求方法
      //数据验证

      let datadataDetails = await this.$api.get(global.apiUrls.post641987361d887, {
        goods_id: this.id,
      })

      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data

      this.getUserInfoFunc()
      if (this.dataDetails.comment.length > 0) {
        this.OneComment = this.dataDetails.comment[0].content
      } else {
        const randomIndex = Math.floor(Math.random() * this.messageList.length)
        this.OneComment = this.messageList[randomIndex].title
      }
      if (!this.sku_id && this.dataDetails.sku_list && this.dataDetails.sku_list.length > 0) {
        this.sku_id = this.dataDetails.sku_list[0].sku_id
      }
      uni.hideLoading()
      this.dibu = true
      this.getshareThumbFunc()
      if (this.appSystemIdentification == 'Wechat') {
        this.getWxshareImgFunc()
      } else if (this.appSystemIdentification != 'Wechat') {
        this.getMiniWxFunc()
      }
      this.goodsListFunc()
    },
    //获取选中地址信息
    async chooseAddrFunc(e) {
      console.log('e', e)
      this.addressList.forEach((item, index) => {
        if (item.aid == e.value) {
          this.isokaddress = item
          this.popupShow1686125027669 = false
          console.log(this.isokaddress)
        }
      })
    },
    //分享
    async MysharedFunc(type) {
      this.popupShow1689239427011 = false
      if (type == '1' && this.isLogin === true) {
        //请求方法
        //数据验证

        let datasharedInfo = await this.$api.get(global.apiUrls.post642402f366fd4, {
          goods_id: this.dataDetails.id,
          sku_id: this.sku_id,
        })

        if (datasharedInfo.data.code != 1) {
          this.$message.info(datasharedInfo.data.msg)
          return
        }
        let infosharedInfo = datasharedInfo.data
        this.sharedInfo = infosharedInfo.data

        await this.syncUniApi('share', {
          provider: 'weixin',
          scene: 'WXSceneSession',
          type: '0',
          title: '推荐一个好物给您',
          href: this.sharedInfo.url,
          summary: this.dataDetails.name,
          imageUrl: this.sharedInfo.share_bg,
        })
      } else if (type == '2' && this.isLogin === true) {
        //请求方法
        //数据验证

        let datasharedInfo = await this.$api.get(global.apiUrls.post642402f366fd4, {
          goods_id: this.dataDetails.id,
          sku_id: this.sku_id,
        })

        if (datasharedInfo.data.code != 1) {
          this.$message.info(datasharedInfo.data.msg)
          return
        }
        let infosharedInfo = datasharedInfo.data
        this.sharedInfo = infosharedInfo.data

        await this.syncUniApi('share', {
          provider: 'weixin',
          scene: 'WXSceneTimeline',
          type: '0',
          title: '推荐一个好物给您',
          href: this.sharedInfo.url,
          summary: this.dataDetails.name,
          imageUrl: this.sharedInfo.share_bg,
        })
      } else if (type == '4' && this.isLogin === true) {
        this.fxImg = await this.painterGenerateImages('painter1730449491555', 'painterParam1730449491555')
        this.popupShow1689239427011 = false
        this.popupShow1679645673274 = true
      } else if (type == '3' && this.isLogin === true) {
        //请求方法
        //数据验证

        let datasharedInfo = await this.$api.get(global.apiUrls.post642402f366fd4, {
          goods_id: this.dataDetails.id,
          sku_id: this.sku_id,
        })

        if (datasharedInfo.data.code != 1) {
          this.$message.info(datasharedInfo.data.msg)
          return
        }
        let infosharedInfo = datasharedInfo.data
        this.sharedInfo = infosharedInfo.data

        this.copyText(this.sharedInfo.url)
      } else if (this.isLogin === false) {
        this.toLoginDiy()
      }
    },
    //保存海报图片（最后才改一次，谁再改成保存图片到相册，出问题谁去改去了）
    SavePictureFunc() {
      if (this.appSystemIdentification == 'IOS' || this.appSystemIdentification == 'Android') {
        uni.saveImageToPhotosAlbum({
          filePath: this.fxImg,
          success: (res) => {
            console.log(res)
            this.$message.info(global.i18n.t('保存成功'))
            this.close()
          },
        })
      } else if (this.appSystemIdentification == 'Web') {
        uni.downloadFile({
          url: this.fxImg,
          success: (res) => {
            console.log(res)
            if (res.statusCode === 200) {
              console.log('下载成功')
              var oA = document.createElement('a')
              oA.download = '' // 设置下载的文件名，默认是'下载'
              oA.href = res.tempFilePath //临时路径再保存到本地
              document.body.appendChild(oA)
              oA.click()
              oA.remove() // 下载之后把创建的元素删除
            }
          },
        })
      } else if (this.appSystemIdentification == 'Wechat') {
        uni.getImageInfo({
          src: this.fxImg,
          success: (res) => {
            uni.saveImageToPhotosAlbum({
              filePath: res.path,
              success: (ress) => {
                this.$message.info(this.$t('保存成功'))
              },
              fail: (err) => {
                console.log(err)
                this.$message.info(global.i18n.t('保存失败'))
              },
            })
          },
        })
      }

      this.popupShow1679645673274 = false
    },
    //是否可以分享
    isfenxFunc() {
      if (this.isLogin === true) {
        this.popupShow1689239427011 = true
      } else {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }
    },
    //获取购物车数量
    async getCatNumFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let datadataNum = await this.$api.post(global.apiUrls.post62c6909e6ce4f, {
          type: 'diy',
        })

        if (datadataNum.data.code != 1) {
          this.$message.info(datadataNum.data.msg)
          return
        }
        let infodataNum = datadataNum.data
        this.dataNum = infodataNum.data
      }
    },
    //购买套餐
    PurchasePackageFunc(item) {
      var fandian = false
      if (fandian == true) {
        return
      }
      fandian = true
      this.package_id = item.package_id
      let PurchaseMessage = item.info
      console.log(PurchaseMessage, 'asdasdasdasss')
      PurchaseMessage.forEach((item) => {
        this.orderinfo.push({
          goods_id: item.goods_id,
          sku_id: item.sku_id,
        })
      })
      setInterval(() => {
        fandian = false
      }, 2000)
      this.$urouter.navigateTo(
        `/pages/ddgl/directOrder/directOrder?goods_id=&sku_id=&num=&money=&address_id=&shop_coupon_id=&number=&activity_id=&invoice_id=&cartid=&package_id=${this.package_id}&orderinfo=${JSON.stringify(this.orderinfo)}`,
      )
      this.orderinfo = []
      this.package_id = ''
      this.popupShow1700556466468 = false
    },
    //显示套餐弹窗
    DisplaypackagespecificationsFunc() {
      this.$refs.specsPopup1700719656688.open('confirm')
    },
    //确定套餐弹窗
    ConfirmPackagePopupFunc() {},
    //视频播放
    videoplayerFunc(video) {
      this.mixinToPlayVideo(video)
    },
    //是否显示地址弹窗
    isAddressFunc() {
      if (this.isLogin === true) {
        this.popupShow1686125027669 = true
      } else {
        this.toLoginDiy()
      }
    },
    //是否微信分享返回
    isWxBackFunc() {
      if (this.stype == 'wx') {
        this.$urouter.switchTab(`/pages/tabBar/home/home`)
      } else {
        this.$urouter.navigateBack(1)
      }
    },
    //获取个人信息
    async getUserInfoFunc() {
      if (this.isLogin === false) {
        return
      }
      //请求方法
      //数据验证

      let datainfodataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

      if (datainfodataMessage.data.code != 1) {
        this.$message.info(datainfodataMessage.data.msg)
        return
      }
      let infoinfodataMessage = datainfodataMessage.data
      this.infodataMessage = infoinfodataMessage.data

      this.invite_code = this.infodataMessage.invite_code
    },
    //保存邀请码
    serveInviteCodeFunc() {
      if (this.code) {
        uni.setStorageSync('invite_code', this.code)
      }
    },
    //跳转店铺主页
    goShopindexFunc() {
      if (this.shop_id == this.dataDetails.partner_id) {
        this.$urouter.navigateBack(1)
      } else {
        this.$urouter.navigateTo(`/pages/fl/shopIndex/shopIndex?usermerchant_aid=${this.dataDetails.partner_id}`)
      }
    },
    //获取分享信息
    async getMiniWxFunc() {
      //请求方法
      //数据验证

      let datasharedInfo = await this.$api.get(global.apiUrls.post642402f366fd4, {
        goods_id: this.dataDetails.id,
        sku_id: this.sku_id,
      })

      if (datasharedInfo.data.code != 1) {
        this.$message.info(datasharedInfo.data.msg)
        return
      }
      let infosharedInfo = datasharedInfo.data
      this.sharedInfo = infosharedInfo.data

      this.wxShareImg.base64 = this.sharedInfo.qrcode_url
    },
    //商品管理-商品列表
    goodsListFunc() {
      this.$refs.waterfalls1730518041553?.renew()
      this.minixPagingListsApi = global.apiUrls.post670ccec3bbc6a
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        cate_id: this.dataDetails.cid,
        goods_id: this.id,
      }
      this.listData = []
      this.dataGoodsList = this.listData
      this.pagingListToggle()
    },
    //页面隐藏关闭规格弹框
    onHidecloseFunc() {
      this.$refs.specsPopup1706585747219.close()
    },
    //获取小程序二维码
    async getWxshareImgFunc() {
      if (uni.getStorageSync('invite_code')) {
        this.invite_code = uni.getStorageSync('invite_code')
      }
      this.scene = `id=${this.dataDetails.id}&invite_code=${this.invite_code}`
      this.psgeUrl = `pages/fl/shopDetail/shopDetail`
      //请求方法
      //数据验证

      let datawxShareImg = await this.$api.post(global.apiUrls.post6462057de42ce, {
        scene: this.scene,
        page: this.psgeUrl,
      })

      if (datawxShareImg.data.code != 1) {
        this.$message.info(datawxShareImg.data.msg)
        return
      }
      let infowxShareImg = datawxShareImg.data
      this.wxShareImg = infowxShareImg.data
    },
    //单多融合
    async getShopDataFunc() {
      let datashopType = await this.$api.post(global.apiUrls.post6758eb9165329, {
        path: 'pages/fl/shopDetail/shopDetail',
      })

      if (datashopType.data.code != 1) {
        this.$message.info(datashopType.data.msg)
        return
      }
      let infoshopType = datashopType.data
      this.shopType = infoshopType.data
    },
    //获取分享背景图
    async getshareThumbFunc() {
      //请求方法
      //数据验证

      let datasharedInfo = await this.$api.get(global.apiUrls.post642402f366fd4, {
        goods_id: this.dataDetails.id,
        sku_id: this.sku_id,
      })

      if (datasharedInfo.data.code != 1) {
        this.$message.info(datasharedInfo.data.msg)
        return
      }
      let infosharedInfo = datasharedInfo.data
      this.sharedInfo = infosharedInfo.data
    },
    //小程序
    xcxcxcFunc(optionsscene) {
      if (!options.scene) return
      let scene = decodeURIComponent(options.scene)
      let resObj = {}
      let regParam = /([^&=]+)=([\w\W]*?)(&|$|#)/g
      let strParam = scene
      let result
      while ((result = regParam.exec(strParam)) != null) {
        resObj[result[1]] = result[2]
      }
      if (resObj.id) {
        this.id = resObj.id
        this.stype = 'wx'
      }
      if (resObj.invite_code) {
        uni.setStorageSync('invite_code', resObj.invite_code)
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
  background: var(--benbenbgColor1);
  background-size: 100% auto;

  .shopDetail_flex_17_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 0rpx 0rpx 24rpx 0rpx;

    .shopDetail_fd17_0_babdd {
      border-radius: 32rpx 32rpx 0rpx 0rpx;
      padding: 40rpx 32rpx 24rpx 32rpx;

      .shopDetail_fd17_0_c0_babdd {
        padding: 0rpx 13rpx 0rpx 0rpx;

        .shopDetail_fd17_0_c0_c0_babdd {
          width: 40rpx;
          height: 40rpx;
        }

        .shopDetail_fd17_0_c0_c1_c1_babdd {
          font-size: 36rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          line-height: 50rpx;
          margin: 0rpx 24rpx 0rpx 24rpx;
        }

        .shopDetail_fd17_0_c0_c2_babdd {
          margin: 0rpx 2rpx 0rpx 0rpx;

          .shopDetail_fd17_0_c0_c2_c0_babdd {
            width: 40rpx;
            height: 40rpx;
            border-radius: 20rpx 20rpx 20rpx 20rpx;
          }
        }
      }
    }

    .shopDetail_fd17_1_babdd {
      background: #fff;
      background-size: 100% auto !important;
      padding: 0rpx 30rpx 0rpx 30rpx;

      .shopDetail_fd17_1_c0_babdd {
        touch-action: none;
        width: 686rpx;
        height: 40vh;

        .shopDetail_fd17_1_c0_c1_babdd {
          width: 100%;
          padding: 50rpx 0rpx 50rpx 0rpx;

          .shopDetail_fd17_1_c0_c1_c0_babdd {
            width: 400rpx;
            border-radius: 0rpx 0rpx 0rpx 0rpx;
          }
        }
      }
    }

    .shopDetail_fd17_2_babdd {
      padding: 22rpx 0rpx 22rpx 0rpx;
      margin: 83rpx 56rpx 0rpx 56rpx;
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      background: var(--benbenbtnColor0);
      width: 638rpx;
      height: 88rpx;

      .shopDetail_fd17_2_c0_babdd {
        color: var(--benbenFontColor3);
        font-size: 32rpx;
        font-weight: 500;
        line-height: 32rpx;
      }
    }
  }

  .shopDetail_fd17_0_c0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_babdd {
    margin: 40rpx 0rpx 32rpx 0rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c0_babdd {
    width: 24rpx;
    height: 30rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_babdd {
    margin: 0rpx 0rpx 20rpx 0rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_babdd {
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    background: var(--benbenbtnColor0);
    padding: 4rpx 10rpx 2rpx 10rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c0_c0_babdd {
    color: var(--benbenFontColor3);
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c1_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 14rpx;
    max-width: 200rpx;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c2_babdd {
    color: #1a1a1a;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c3_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c0_c5_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 20rpx;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_babdd {
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c1_c1_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c2_babdd {
    margin: 0rpx 0rpx 0rpx 24rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c2_c0_babdd {
    width: 40rpx;
    height: 40rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd17_1_c0_c0_c0_c0_c2_c1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .shopDetail_flex_16_babdd {
    width: 750rpx;
    overflow: hidden;
    z-index: 10;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    bottom: calc(0rpx + var(--benben-window-bottom, 0px));
    height: 120rpx;

    .shopDetail_fd16_1_babdd {
      border-radius: 44rpx 0rpx 0rpx 44rpx;
      font-size: 28rpx;
      background: var(--benbenbgColor9);
      color: var(--benbenFontColor3);
      margin: 0rpx 0rpx 0rpx auto;
      width: 204rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-weight: 500;
    }

    .shopDetail_fd16_2_babdd {
      margin: 12rpx 0rpx 12rpx 0rpx;

      .shopDetail_fd16_2_c1_babdd {
        border-radius: 44rpx 0rpx 0rpx 44rpx;
        font-size: 28rpx;
        background: var(--benbenbtnColor4);
        color: var(--benbenFontColor3);
        margin: 0rpx 0rpx 0rpx auto;
        width: 204rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-weight: 500;
      }

      .shopDetail_fd16_2_c2_babdd {
        border-radius: 0rpx 44rpx 44rpx 0rpx;
        background: var(--benbenbgColor3);
        width: 204rpx;
        height: 88rpx;
        margin: 0rpx 24rpx 0rpx 0rpx;

        .shopDetail_fd16_2_c2_c1_babdd {
          color: var(--benbenFontColor3);
          font-size: 28rpx;
          font-weight: 500;
          line-height: 40rpx;
        }
      }

      .shopDetail_fd16_2_c3_babdd {
        border-radius: 44rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor3);
        color: var(--benbenFontColor1);
        margin: 0rpx 24rpx 0rpx 48rpx;
        width: 350rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-weight: 500;
      }
    }
  }

  .shopDetail_fd16_0_babdd {
    padding: 0rpx 18rpx 0rpx 28rpx;
  }

  .shopDetail_fd16_0_c0_c0_babdd {
    width: 44rpx;
    height: 44rpx;
    margin: 0rpx 0rpx 6rpx 0rpx;
  }

  .shopDetail_fd16_0_c0_c1_babdd {
    font-size: 20rpx;
    font-weight: 400;
    color: #333333;
  }

  .shopDetail_fd16_0_c3_babdd {
    position: relative;
  }

  .shopDetail_fd16_0_c3_c1_babdd {
    position: absolute;
    right: -8rpx;
    top: -8rpx;
  }

  .shopDetail_fd16_2_c0_c0_c1_babdd {
    font-size: 20rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .shopDetail_fd16_2_c2_c0_c0_babdd {
    color: var(--benbenFontColor3);
    font-size: 24rpx;
    font-weight: 500;
    line-height: 33rpx;
  }

  .shopDetail_flex_15_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    padding: 40rpx 32rpx 45rpx 32rpx;

    .shopDetail_fd15_0_babdd {
      margin: 0rpx 0rpx 46rpx 0rpx;

      .shopDetail_fd15_0_c0_babdd {
        height: 40rpx;
        width: 40rpx;
      }

      .shopDetail_fd15_0_c1_babdd {
        position: relative;

        .shopDetail_fd15_0_c1_c1_babdd {
          line-height: 45rpx;
          font-size: 36rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          margin: 0rpx 24rpx 0rpx 24rpx;
        }
      }

      .shopDetail_fd15_0_c2_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd15_1_babdd {
      touch-action: none;
      width: 686rpx;
      height: 500rpx;

      .shopDetail_fd15_1_c0_babdd {
        line-height: 52rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
      }

      .shopDetail_fd15_1_c0_1_babdd {
        line-height: 52rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #333;
      }
    }
  }

  .shopDetail_fd15_0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd14_0_babdd {
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    background: var(--benbenbgColor1);
    padding: 40rpx 32rpx 40rpx 32rpx;

    .shopDetail_fd14_0_c0_babdd {
      margin: 0rpx 0rpx 8rpx 0rpx;

      .shopDetail_fd14_0_c0_c0_babdd {
        width: 40rpx;
        height: 40rpx;
      }

      .shopDetail_fd14_0_c0_c1_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 40rpx;
        font-weight: 500;
        line-height: 56rpx;
        margin: 0rpx 32rpx 0rpx 32rpx;
      }

      .shopDetail_fd14_0_c0_c2_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd14_0_c1_babdd {
      touch-action: none;
      width: 686rpx;
      height: 40vh;

      .shopDetail_fd14_0_c1_c0_c0_babdd {
        background:
          url(#{image-path('420.png')
        }) no-repeat,
          transparent;
        background-size: 100% auto !important;
        padding: 30rpx 31rpx 34rpx 34rpx;
        margin: 24rpx 0rpx 0rpx 0rpx;
      }

      .shopDetail_fd14_0_c1_c0_c1_babdd {
        background:
          url(#{image-path('89.png')
      }) no-repeat,
          transparent;
        background-size: 100% auto !important;
        padding: 30rpx 31rpx 30rpx 34rpx;
        margin: 24rpx 0rpx 0rpx 0rpx;
      }

      .shopDetail_fd14_0_c1_c1_babdd {
        width: 100%;
        padding: 50rpx 0rpx 50rpx 0rpx;

        .shopDetail_fd14_0_c1_c1_c0_babdd {
          width: 400rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }
      }
    }
  }

  .shopDetail_fd14_0_c0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd14_0_c1_c0_c0_c0_babdd {
    padding: 0rpx 0rpx 14rpx 0rpx;

    .shopDetail_fd14_0_c1_c0_c0_c0_c2_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 32rpx;
      font-weight: 700;
      line-height: 32rpx;
    }

    .shopDetail_fd14_0_c1_c0_c0_c0_c2_c1_babdd {
      color: var(--benbenFontColor0);
      font-weight: 600;
    }
  }

  .shopDetail_fd14_0_c1_c0_c0_c0_c0_babdd {
    width: 122rpx;
    height: 100rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd14_0_c1_c0_c0_c0_c1_babdd {
    margin: 0rpx 0rpx 0rpx 16rpx;

    .shopDetail_fd14_0_c1_c0_c0_c0_c1_c0_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 32rpx;
      font-weight: 500;
      line-height: 45rpx;
    }
  }

  .shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_babdd {
    margin: 8rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd14_0_c1_c0_c0_c0_c1_c1_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .shopDetail_price1_fd14_0_c1_c0_c0_c0_c2_c1_babdd {
    font-size: 38rpx;
  }

  .shopDetail_price2_fd14_0_c1_c0_c0_c0_c2_c1_babdd {
    font-size: 28rpx;
  }

  .shopDetail_fd14_0_c1_c0_c0_c1_babdd {
    margin: 20rpx 0rpx 0rpx 0rpx;

    .shopDetail_fd14_0_c1_c0_c0_c1_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 33rpx;
    }

    .shopDetail_fd14_0_c1_c0_c0_c1_c1_babdd {
      border-radius: 24rpx 24rpx 24rpx 24rpx;
      font-size: 24rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 120rpx;
      height: 48rpx;
      line-height: 48rpx;
    }
  }

  .shopDetail_fd14_0_c1_c0_c1_c0_c1_c0_c0_babdd {
    color: var(--benbenFontColor2);
    font-size: 32rpx;
    font-weight: 500;
    line-height: 45rpx;
  }

  .shopDetail_fd14_0_c1_c0_c1_c0_c2_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 32rpx;
    font-weight: 700;
    line-height: 32rpx;
  }

  .shopDetail_fd14_0_c1_c0_c1_c0_c2_c1_babdd {
    color: var(--benbenFontColor1);
    font-weight: 600;
  }

  .shopDetail_fd14_0_c1_c0_c1_c1_c1_babdd {
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor1);
    width: 120rpx;
    height: 48rpx;
    line-height: 48rpx;
  }

  .shopDetail_flex_13_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    padding: 40rpx 32rpx 45rpx 32rpx;

    .shopDetail_fd13_0_babdd {
      margin: 0rpx 0rpx 46rpx 0rpx;

      .shopDetail_fd13_0_c0_babdd {
        height: 40rpx;
        width: 40rpx;
      }

      .shopDetail_fd13_0_c1_babdd {
        position: relative;

        .shopDetail_fd13_0_c1_c1_babdd {
          line-height: 45rpx;
          font-size: 36rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          margin: 0rpx 24rpx 0rpx 24rpx;
        }
      }

      .shopDetail_fd13_0_c2_babdd {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd13_1_babdd {
      touch-action: none;
      width: 686rpx;
      height: 500rpx;

      .shopDetail_fd13_1_c0_babdd {
        line-height: 52rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
      }
    }
  }

  .shopDetail_fd13_0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd12_0_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 0rpx 32rpx 0rpx 32rpx;

    .shopDetail_fd12_0_c0_babdd {
      padding: 0rpx 13rpx 0rpx 0rpx;

      .shopDetail_fd12_0_c0_c0_babdd {
        width: 40rpx;
      }

      .shopDetail_fd12_0_c0_c1_babdd {
        padding: 40rpx 0rpx 48rpx 0rpx;

        .shopDetail_fd12_0_c0_c1_c1_babdd {
          font-size: 32rpx;
          font-weight: 700;
          color: var(--benbenFontColor0);
          margin: 0rpx 16rpx 0rpx 16rpx;
        }
      }

      .shopDetail_fd12_0_c0_c2_babdd {
        margin: 0rpx 2rpx 0rpx 0rpx;

        .shopDetail_fd12_0_c0_c2_c0_babdd {
          width: 40rpx;
          height: 40rpx;
          border-radius: 20rpx 20rpx 20rpx 20rpx;
        }
      }
    }

    .shopDetail_fd12_0_c1_babdd {
      padding: 0rpx 0rpx 58rpx 0rpx;
    }
  }

  .shopDetail_fd12_0_c0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd12_0_c1_c0_c0_babdd {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    margin: 0rpx 0rpx 16rpx 0rpx;
  }

  .shopDetail_fd12_0_c1_c0_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .shopDetail_fd11_0_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    padding: 0rpx 32rpx 40rpx 32rpx;

    .shopDetail_fd11_0_c0_babdd {
      margin: 36rpx 0rpx 33rpx 0rpx;

      .shopDetail_fd11_0_c0_c1_c1_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
        margin: 0rpx 24rpx 0rpx 24rpx;
        line-height: 50rpx;
      }
    }

    .shopDetail_fd11_0_c1_c0_babdd {
      width: 580rpx;
      margin: 0rpx 0rpx 32rpx 0rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      border: 1px solid rgba(238, 238, 238, 1);

      .shopDetail_fd11_0_c1_c0_c0_babdd {
        width: 750rpx;
        height: 700rpx;
        border-radius: 0rpx;
      }
    }

    .shopDetail_fd11_0_c2_babdd {
      margin: 32rpx 0rpx 0rpx 0rpx;

      .shopDetail_fd11_0_c2_c0_babdd {
        border-radius: 44rpx 44rpx 44rpx 44rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor0);
        color: var(--benbenFontColor3);
        width: 308rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-weight: 500;
      }
    }
  }

  .shopDetail_fd11_0_c0_c0_babdd {
    width: 40rpx;
    height: 40rpx;
  }

  .shopDetail_fd11_0_c0_c1_c0_babdd {
    width: 32rpx;
    height: 10rpx;
  }

  .shopDetail_flex_10_babdd {
    padding: 0rpx 0rpx 150rpx 0rpx;

    .shopDetail_fd10_0_babdd {
      padding: 32rpx 0rpx 32rpx 0rpx;
      margin: 0rpx 32rpx 0rpx 24rpx;

      .shopDetail_fd10_0_c0_babdd {
        width: 7rpx;
        height: 30rpx;
        background: var(--benbenbtnColor0);
        margin: 0rpx 16rpx 0rpx 0rpx;
        border-radius: 3rpx;
      }

      .shopDetail_fd10_0_c1_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        line-height: 45rpx;
      }
    }

    .shopDetail_fd10_1_babdd {
      margin: 0rpx 24rpx 0rpx 24rpx;
    }
  }

  .shopDetail_fd9_0_babdd {
    border-top: 10px solid var(--benbenbdColor0);

    .shopDetail_fd9_0_c0_babdd {
      padding: 32rpx 0rpx 32rpx 0rpx;
      margin: 0rpx 24rpx 0rpx 24rpx;
      line-height: 33rpx;

      .shopDetail_fd9_0_c0_c0_babdd {
        width: 7rpx;
        height: 30rpx;
        background: var(--benbenbtnColor0);
        margin: 0rpx 16rpx 0rpx 0rpx;
        border-radius: 3rpx;
      }

      .shopDetail_fd9_0_c0_c3_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        line-height: 45rpx;
        margin: 0rpx auto 0rpx 0rpx;
      }

      .shopDetail_fd9_0_c0_c4_babdd {
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        text-align: right;
      }

      .shopDetail_fd9_0_c0_c5_babdd {
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
      }

      .shopDetail_fd9_0_c0_c6_babdd {
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        margin: 0rpx 12rpx 0rpx 0rpx;
      }

      .shopDetail_fd9_0_c0_c7_babdd {
        width: 12rpx;
        height: 22rpx;
        margin: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd9_0_c1_babdd {
      padding: 0rpx 0rpx 32rpx 0rpx;
      margin: 0rpx 24rpx 0rpx 24rpx;

      .shopDetail_fd9_0_c1_c0_babdd {
        margin: 0rpx 12rpx 0rpx 12rpx;

        .shopDetail_fd9_0_c1_c0_c0_babdd {
          width: 56rpx;
          height: 56rpx;
          border-radius: 50rpx 50rpx 50rpx 50rpx;
        }

        .shopDetail_fd9_0_c1_c0_c1_babdd {
          margin: 0rpx 0rpx 24rpx 16rpx;

          .shopDetail_fd9_0_c1_c0_c1_c0_babdd {
            margin: 0rpx 0rpx 8rpx 0rpx;

            .shopDetail_fd9_0_c1_c0_c1_c0_c0_babdd {
              line-height: 40rpx;
              font-size: 28rpx;
              font-weight: 400;
              color: var(--benbenFontColor0);
            }

            .shopDetail_fd9_0_c1_c0_c1_c0_c1_babdd {
              line-height: 30rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: var(--benbenFontColor2);
            }
          }

          .shopDetail_star1fd9_0_c1_c0_c1_c1_babdd {
            height: 18rpx;
            margin: 0rpx 2rpx 0rpx 2rpx;
            width: 18rpx;
          }
        }
      }

      .shopDetail_fd9_0_c1_c1_babdd {
        font-size: 28rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
        line-height: 40rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0rpx 12rpx 0rpx 12rpx;
      }

      .shopDetail_fd9_0_c1_c2_babdd {
        margin: 12rpx 0rpx 12rpx 0rpx;

        .shopDetail_fd9_0_c1_c2_c0_babdd {
          margin: 12rpx 6rpx 12rpx 6rpx;

          .shopDetail_fd9_0_c1_c2_c0_c0_babdd {
            width: 220rpx;
            height: 220rpx;
            border-radius: 8rpx 8rpx 8rpx 8rpx;
          }
        }
      }

      .shopDetail_fd9_0_c1_c3_babdd {
        width: 100%;

        .shopDetail_fd9_0_c1_c3_c0_babdd {
          line-height: 33rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor2);
        }

        .shopDetail_fd9_0_c1_c3_c1_babdd {
          margin: 0rpx 0rpx 0rpx auto;

          .shopDetail_fd9_0_c1_c3_c1_c0_babdd {
            color: var(--benbenFontColor0);
            font-size: 22rpx;
            font-weight: 400;
          }

          .shopDetail_fd9_0_c1_c3_c1_c2_babdd {
            color: var(--benbenFontColor0);
            font-size: 22rpx;
            font-weight: 400;
            margin: 0rpx 0rpx 0rpx 48rpx;
          }
        }
      }
    }
  }

  .shopDetail_fd9_0_c0_c1_babdd {
    font-size: 32rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    line-height: 45rpx;
  }

  .shopDetail_fd9_0_c1_c3_c1_c1_babdd {
    width: 26rpx;
    height: 24rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 0rpx 0rpx 8rpx;
  }

  .shopDetail_fd8_0_babdd {
    border-top: 10px solid var(--benbenbdColor0);
    padding: 0rpx 24rpx 0rpx 24rpx;

    .shopDetail_fd8_0_c3_babdd {
      padding: 24rpx 0rpx 24rpx 0rpx;

      .shopDetail_fd8_0_c3_c1_c0_babdd {
        font-size: 28rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: right;
      }
    }
  }

  .shopDetail_fd8_0_c0_c0_babdd {
    font-size: 28rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
    margin: 0rpx 49rpx 0rpx 0rpx;
  }

  .shopDetail_fd8_0_c0_c1_babdd {
    padding: 24rpx 0rpx 24rpx 0rpx;
    border-bottom: 1px solid var(--benbenbdColor1);

    .shopDetail_fd8_0_c0_c1_c1_1_babdd {
      font-size: 28rpx;
      font-weight: 400;
      color: #374047;
      margin: 0rpx 12rpx 0rpx 0rpx;
    }
  }

  .shopDetail_fd8_0_c0_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .shopDetail_fd8_0_c0_c1_c2_babdd {
    width: 12rpx;
    height: 22rpx;
  }

  .shopDetail_fd8_0_c1_c1_c0_babdd {
    margin: 0rpx 0rpx 0rpx auto;

    .shopDetail_fd8_0_c1_c1_c0_c0_babdd {
      width: 32rpx;
      height: 32rpx;
      margin: 0rpx 8rpx 0rpx 0rpx;
    }

    .shopDetail_fd8_0_c1_c1_c0_c1_babdd {
      margin: 0rpx auto 0rpx 0rpx;
      height: 40rpx;
      line-height: 40rpx;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .shopDetail_fd8_0_c1_c1_c0_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .shopDetail_fd8_0_c1_c1_c1_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    color: var(--benbenFontColor0);
    font-size: 28rpx;
  }

  .shopDetail_fd8_0_c1_c1_c2_babdd {
    width: 12rpx;
    height: 22rpx;
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .shopDetail_fd8_0_c2_c1_c0_1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: #333;
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .shopDetail_flex_specs_7_babdd {
    --active-sku-tag-color: var(--benbenFontColor4);
    --sku-tag-color: var(--benbenFontColor0);
    --sku-tag-bg: var(--benbenbgColor0);
    --cart-btn-bg: var(--benbenbtnColor0);
    --buy-btn-bg: var(--benbenbtnColor4);
    --confirm-btn-bg: var(--benbenbgColor3);
  }

  .shopDetail_fd6_0_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;
    color: var(--benbenFontColor5);
    margin: 24rpx 0rpx 0rpx 0rpx;

    .shopDetail_fd6_0_c0_c0_babdd {
      font-size: 36rpx;
      font-weight: 500;
      color: var(--benbenFontColor4);
    }

    .shopDetail_fd6_0_c0_c1_babdd {
      color: var(--benbenFontColor5);
      font-weight: 600;

      .shopDetail_price1_fd6_0_c0_c1_babdd {
        font-size: 56rpx;
        font-weight: 700;
        color: rgba(240, 35, 37, 1);
      }

      .shopDetail_price2_fd6_0_c0_c1_babdd {
        font-size: 40rpx;
        font-weight: 700;
        color: rgba(240, 35, 37, 1);
      }
    }

    .shopDetail_fd6_0_c0_c2_babdd {
      margin: 15rpx 0rpx 0rpx 16rpx;
      color: var(--benbenFontColor2);
      font-size: 24rpx;
      line-height: 28rpx;
      text-decoration: line-through;
    }

    .shopDetail_fd6_0_c0_c3_babdd {
      font-size: 24rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
      margin: 0rpx 0rpx 0rpx auto;
      line-height: 28rpx;
    }

    .shopDetail_fd6_0_c0_c4_babdd {
      font-size: 24rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
      line-height: 28rpx;
    }

    .shopDetail_fd6_0_c0_c5_babdd {
      font-size: 24rpx;
      font-weight: 400;
      color: var(--benbenFontColor2);
      line-height: 28rpx;
    }
  }

  .shopDetail_price2_fd6_0_c0_c2_c1_babdd {
    font-size: 24rpx;
  }

  .shopDetail_fd6_1_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;
    color: #333;
    margin: 24rpx 0rpx 0rpx 0rpx;

    .shopDetail_fd6_1_c0_c0_babdd {
      font-size: 30rpx;
      font-weight: 600;
      color: var(--benbenFontColor7);
    }

    .shopDetail_fd6_1_c0_c1_babdd {
      font-size: 36rpx;
      font-weight: 500;
      color: var(--benbenFontColor7);
    }

    .shopDetail_fd6_1_c0_c3_babdd {
      font-size: 20rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
      margin: 0rpx 0rpx 0rpx auto;
      line-height: 28rpx;
    }

    .shopDetail_fd6_1_c0_c4_babdd {
      font-size: 20rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
      line-height: 28rpx;
    }

    .shopDetail_fd6_1_c0_c5_babdd {
      font-size: 20rpx;
      font-weight: 400;
      color: var(--benbenFontColor2);
      line-height: 28rpx;
    }
  }

  .shopDetail_fd6_1_c0_c2_babdd {
    color: var(--benbenFontColor7);
    font-weight: 600;

    .shopDetail_price1_fd6_1_c0_c2_babdd {
      font-size: 64rpx;
      font-weight: 700;
      color: rgba(240, 35, 37, 1);
    }

    .shopDetail_price2_fd6_1_c0_c2_babdd {
      font-size: 36rpx;
      font-weight: 700;
      color: rgba(240, 35, 37, 1);
    }
  }

  .shopDetail_fd6_2_babdd {
    padding: 24rpx 24rpx 0rpx 24rpx;
  }

  .shopDetail_fd6_2_c0_babdd {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
  }

  .shopDetail_fd6_3_babdd {
    padding: 32rpx 24rpx 32rpx 24rpx;

    .shopDetail_fd6_3_c0_c0_c0_babdd {
      color: var(--benbenFontColor0);
      font-size: 32rpx;
      font-weight: 600;
      line-height: 46rpx;
    }

    .shopDetail_fd6_3_c0_c1_babdd {
      width: 100rpx;

      .shopDetail_fd6_3_c0_c1_c1_babdd {
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        margin: 8rpx 0rpx 0rpx 0rpx;
      }

      .shopDetail_fd6_3_c0_c1_c1_1_babdd {
        font-size: 24rpx;
        font-weight: 600;
        color: rgba(255, 154, 65, 1);
        margin: 8rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd6_3_c0_c2_c0_babdd {
      width: 32rpx;
      height: 32rpx;
      margin: 0rpx 0rpx 8rpx 0rpx;
    }

    .shopDetail_fd6_3_c0_c2_c1_babdd {
      font-size: 24rpx;
      font-weight: 600;
      color: var(--benbenFontColor0);
    }

    .shopDetail_fd6_3_c1_babdd {
      margin: 24rpx 0rpx 0rpx 0rpx;

      .shopDetail_fd6_3_c1_c0_babdd {
        touch-action: none;
        width: 500rpx;

        .shopDetail_fd6_3_c1_c0_c0_babdd {
          background: url(#{image-path('824.png')
        }) no-repeat;
          background-size: 100% 100% !important;
          padding: 8rpx 16rpx 8rpx 16rpx;
          color: var(--benbenFontColor0);
          margin: 0rpx 16rpx 0rpx 0rpx;
          border-radius: 6rpx;
          flex-shrink: 0;
          line-height: 28rpx;

          .shopDetail_fd6_3_c1_c0_c0_c0_babdd {
            font-size: 24rpx;
            font-weight: 500;
          }
        }
      }

      .shopDetail_fd6_3_c1_c1_babdd {
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        font-size: 24rpx;
        background: var(--benbenbtnColor0);
        color: var(--benbenFontColor3);
        margin: 0rpx 0rpx 0rpx auto;
        width: 104rpx;
        height: 48rpx;
        line-height: 48rpx;
      }
    }
  }

  .shopDetail_fd6_3_c0_c1_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd6_4_babdd {
    padding: 0rpx 24rpx 24rpx 24rpx;

    .shopDetail_fd6_4_c0_babdd {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
      margin: 0rpx 0rpx 24rpx 0rpx;
    }

    .shopDetail_fd6_4_c1_c0_babdd {
      width: 25%;
      background: #ffdede;
      background-size: 100% auto;
      padding: 12rpx 0rpx 12rpx 0rpx;
      border-radius: 16rpx;

      .shopDetail_fd6_4_c1_c0_c0_c0_babdd {
        font-size: 28rpx;
        font-weight: 600;
        color: var(--benbenFontColor7);
      }

      .shopDetail_fd6_4_c1_c0_c1_babdd {
        margin: 12rpx 0rpx 0rpx 0rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #333;
      }
    }
  }

  .shopDetail_price1_fd6_4_c1_c0_c0_c1_babdd {
    font-size: 32rpx;
  }

  .shopDetail_price2_fd6_4_c1_c0_c0_c1_babdd {
    font-size: 28rpx;
  }

  .shopDetail_flex_5_babdd {
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    padding: 24rpx 24rpx 0rpx 24rpx;
    background: var(--benbenbtnColor0);
    background-size: 100% auto;
    height: 55vh;

    .shopDetail_fd5_0_babdd {
      height: 88rpx;

      .shopDetail_fd5_0_c0_babdd {
        width: 42rpx;
        height: 42rpx;
      }

      .shopDetail_fd5_0_c1_babdd {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 45rpx;
        color: var(--benbenFontColor0);
      }

      .shopDetail_fd5_0_c2_babdd {
        width: 42rpx;
        height: 42rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .shopDetail_fd5_1_babdd {
      touch-action: none;
      width: 100%;
      height: 50vh;
    }

    .shopDetail_fd5_2_babdd {
      width: 100%;
      padding: 50rpx 0rpx 50rpx 0rpx;

      .shopDetail_fd5_2_c0_babdd {
        width: 400rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }
  }

  .shopDetail_fd5_0_c1_c0_babdd {
    color: var(--benbenFontColor0);
  }

  .shopDetail_fd5_1_c0_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto;
    border-radius: 8rpx;
    padding: 24rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 24rpx 0rpx;

    .shopDetail_fd5_1_c0_c0_c0_babdd {
      font-size: 28rpx;
      line-height: 40rpx;
      font-weight: 600;
      color: var(--benbenFontColor0);
    }
  }

  .shopDetail_fd5_1_c0_c0_c0_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .shopDetail_fd5_1_c0_c0_c1_babdd {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--benbenFontColor0);
  }

  .shopDetail_fd5_1_c0_c0_c1_c1_babdd {
    color: var(--benbenFontColor7);
    font-weight: 600;
  }

  .shopDetail_price1_fd5_1_c0_c0_c1_c1_babdd {
    font-size: 28rpx;
  }

  .shopDetail_fd5_1_c0_c1_babdd {
    padding: 24rpx 0rpx 24rpx 0rpx;
    border-bottom: 1px solid #eee;

    .shopDetail_fd5_1_c0_c1_c1_c0_babdd {
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .shopDetail_fd5_1_c0_c1_c1_c1_babdd {
      font-size: 24rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      margin: 12rpx 0rpx 0rpx 0rpx;
    }
  }

  .shopDetail_fd5_1_c0_c1_c0_babdd {
    width: 140rpx;
    height: 140rpx;
    border-radius: 8rpx;
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .shopDetail_fd5_1_c0_c1_c1_c2_babdd {
    margin: auto 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd5_1_c0_c1_c1_c2_c0_babdd {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--benbenFontColor7);
  }

  .shopDetail_fd5_1_c0_c1_c1_c2_c0_c1_babdd {
    color: var(--benbenFontColor0);
    font-weight: 600;
  }

  .shopDetail_fd5_1_c0_c1_c1_c2_c1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor2);
    margin: 0rpx 0rpx 0rpx 12rpx;
    text-decoration: line-through;
  }

  .shopDetail_fd5_1_c0_c1_c1_c2_c1_c1_babdd {
    color: var(--benbenFontColor2);
    font-weight: 400;
  }

  .shopDetail_fd5_1_c0_c2_babdd {
    margin: 24rpx 0rpx 32rpx 0rpx;

    .shopDetail_fd5_1_c0_c2_c0_babdd {
      width: 450rpx;
      height: 64rpx;
      border-radius: 100rpx;
      background: var(--benbenbgColor7);
      background-size: 100% auto;
      font-size: 24rpx;
      font-weight: 400;
      color: var(--benbenFontColor3);
      line-height: 64rpx;
    }
  }

  .shopDetail_fd5_1_c1_c0_c0_babdd {
    font-size: 28rpx;
    line-height: 40rpx;
    font-weight: 600;
  }

  .shopDetail_fd5_1_c1_c1_c0_babdd {
    width: 32rpx;
    height: 32rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: auto 16rpx auto 0rpx;
  }

  .shopDetail_fd5_1_c1_c1_c2_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .shopDetail_fd5_1_c1_c1_c2_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 12rpx 0rpx 0rpx 0rpx;
    background: var(--benbenbgColor0);
    background-size: 100% auto;
    padding: 2rpx 24rpx 2rpx 24rpx;
    border-radius: 16rpx;
  }

  .shopDetail_fd5_1_c1_c2_c2_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: #333;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .shopDetail_fd5_1_c1_c2_c2_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: #333;
    margin: 12rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_fd5_1_c1_c3_c0_babdd {
    width: 450rpx;
    height: 64rpx;
    border-radius: 100rpx;
    background: var(--benbenbgColor3);
    background-size: 100% auto;
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor3);
    line-height: 64rpx;
  }

  .shopDetail_fd2_0_babdd {
    position: relative;
  }

  .shopDetail_fd2_0_c0_babdd {
    width: 750rpx;
    height: 750rpx;
  }

  .shopDetail_fd2_0_c0_c1_c0_babdd {
    width: 750rpx;
    height: 750rpx;
    position: relative;

    .shopDetail_fd2_0_c0_c1_c0_c1_babdd {
      width: 100rpx;
      height: 100rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      position: absolute;
    }
  }

  .shopDetail_fd2_0_c0_c1_c0_c0_babdd {
    width: 750rpx;
    height: 750rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopDetail_numberfd2_0_c0_c0_babdd {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    height: 41rpx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 21rpx 21rpx 21rpx 21rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 46rpx;
    font-weight: 400;
    padding: 5rpx 20rpx 5rpx 20rpx;
  }

  .shopDetail_numberfd2_0_c0_c0_c0_babdd {
    font-size: 32rpx;
  }

  .shopDetail_flex_specs_1_babdd {
    --active-sku-tag-color: var(--benbenFontColor4);
    --sku-tag-color: var(--benbenFontColor0);
    --sku-tag-bg: var(--benbenbgColor2);
    --cart-btn-bg: var(--benbenbgColor3);
    --buy-btn-bg: var(--benbenbtnColor4);
    --confirm-btn-bg: var(--benbenbgColor3);
  }

  .shopDetail_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: transparent;
  }

  .shopDetail_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;

    .shopDetail_fd0_0_c0_babdd {
      font-size: 32rpx;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }

  .shopDetail_fd0_1_c0_babdd {
    width: 42rpx;
    height: 42rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 32rpx 0rpx 0rpx;
  }
}

::v-deep .shopDetail_fd10_1_c0_babdd {
  width: 100%;
}

::v-deep .shopDetail_swiperDotfd2_0_c0_babdd {
  position: absolute;
  bottom: 20rpx;
  left: 0rpx;
  right: 0rpx;
}

::v-deep .shopDetail_swiperDotSelectedfd2_0_c0_babdd {
  width: 16rpx;
  height: 16rpx;
  border-radius: 100rpx 100rpx 100rpx 100rpx;
  background: #00a7ff;
  border: 1px solid #00a7ff;
  margin: 0rpx 6rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: #fff;
}

::v-deep .shopDetail_swiperDotUnselectedfd2_0_c0_babdd {
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
