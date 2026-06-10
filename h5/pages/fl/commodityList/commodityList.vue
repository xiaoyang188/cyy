<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex commodityList_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub commodityList_fd0_0_babdd">
          <view class="flex align-center" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 commodityList_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex align-center flex-sub commodityList_fd0_0_c1_babdd">
            <text class="fu-iconfont2 commodityList_fd0_0_c1_c0_babdd" @tap.stop="topSearchFunc()">&#xE738;</text>
            <benben-input
              class="flex-sub commodityList_fd0_0_c1_c1_babdd"
              type="text"
              :placeholder="$t('请输入商品名称')"
              confirm-type="done"
              :maxlength="-1"
              placeholder-style="color:var(--benbenFontColor1);font-size:28rpx"
              @confirm="topSearchFunc()"
              v-model="keyword"
              v-if="showId == '1'"
            />
            <benben-input
              class="flex-sub commodityList_fd0_0_c1_c1_babdd"
              type="text"
              :placeholder="$t('请输入店铺名称')"
              confirm-type="done"
              :maxlength="-1"
              placeholder-style="color:var(--benbenFontColor1);font-size:28rpx"
              @confirm="topSearchFunc()"
              v-model="keyword"
              v-if="showId == '2'"
            />
            <image
              class="commodityList_fd0_0_c1_c3_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '1485.png'"
              @tap.stop="cleanKeywordFunc()"
              v-if="keyword != ''"
            ></image>
          </view>
          <view class="flex flex-wrap align-center commodityList_fd0_0_c2_babdd" v-if="appSystemIdentification == 'Wechat'"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <view class="flex benben-position-layout flex align-center commodityList_flex_1_babdd" :style="{ top: 87 + StatusBarRpx + 'rpx' }">
        <view class="flex self-center align-center flex-sub commodityList_fd1_0_babdd" v-if="showId == '1'">
          <view class="flex align-center commodityList_fd1_0_c0_babdd" @tap.stop="switchComprehensiveFunc()">
            <text class="commodityList_fd1_0_c0_c0_babdd" v-if="sort_field != '1'">{{ $t('综合') }}</text>
            <text class="commodityList_fd1_0_c0_c0_1_babdd" v-if="sort_field == '1'">{{ $t('综合') }}</text>
          </view>
          <view class="flex align-center commodityList_fd1_0_c1_babdd" @tap.stop="switchShopListFunc(2)">
            <text class="commodityList_fd1_0_c1_c0_babdd" v-if="sort_field != '2'">{{ $t('销量') }}</text>
            <text class="commodityList_fd1_0_c1_c0_1_babdd" v-if="sort_field == '2'">{{ $t('销量') }}</text>
            <image class="commodityList_fd1_0_c1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '396.png'" v-if="sort_field != '2'"></image>
            <image
              class="commodityList_fd1_0_c1_c1_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '1521.png'"
              v-if="sort_field == '2' && sort_type == 'desc'"
            ></image>
            <image
              class="commodityList_fd1_0_c1_c1_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '65.png'"
              v-if="sort_field == '2' && sort_type == 'asc'"
            ></image>
          </view>
          <view class="flex align-center commodityList_fd1_0_c1_babdd" @tap.stop="switchShopListFunc(3)">
            <text class="commodityList_fd1_0_c1_c0_babdd" v-if="sort_field != '3'">{{ $t('价格') }}</text>
            <text class="commodityList_fd1_0_c2_c0_1_babdd" v-if="sort_field == '3'">{{ $t('价格') }}</text>
            <image class="commodityList_fd1_0_c1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '396.png'" v-if="sort_field != '3'"></image>
            <image
              class="commodityList_fd1_0_c1_c1_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '1521.png'"
              v-if="sort_field == '3' && sort_type == 'desc'"
            ></image>
            <image
              class="commodityList_fd1_0_c1_c1_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '65.png'"
              v-if="sort_field == '3' && sort_type == 'asc'"
            ></image>
          </view>
          <view class="flex align-center commodityList_fd1_0_c3_babdd" v-if="showId == '1'">
            <image
              class="commodityList_fd1_0_c3_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '50.png'"
              @tap.stop="switchcutFunc(2)"
              v-if="cutId == '1'"
            ></image>
            <image
              class="commodityList_fd1_0_c3_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '51.png'"
              @tap.stop="switchcutFunc(1)"
              v-if="cutId == '2'"
            ></image>
          </view>
          <view class="flex flex-wrap align-center commodityList_fd1_0_c4_babdd" @tap.stop="popupShow1679566295078 = true" v-if="showId == '1'">
            <text class="commodityList_fd1_0_c4_c0_babdd">{{ $t('筛选') }}</text>
            <image class="commodityList_fd1_0_c4_c1_babdd" mode="aspectFit" :src="STATIC_URL + '49.png'"></image>
          </view>
        </view>
      </view>
      <view :style="{ height: '100rpx' }"></view>
      <benben-popup v-model="popupShow1679566295078" :mask="true" :mask-close-able="true" mode="right">
        <!---筛选弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout commodityList_flex_2_babdd">
          <view class="flex flex-wrap align-center justify-between commodityList_fd2_0_babdd" :style="{ 'margin-top': `2vh` }">
            <text class="commodityList_fd2_0_c0_babdd">{{ $t('筛选') }}</text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub" v-if="Boolean(dataDrandList.length)">
            <view class="flex flex-wrap align-center justify-between commodityList_fd2_1_c0_babdd" @tap.stop="showBrandFunc()">
              <text class="commodityList_fd2_1_c0_c0_babdd">{{ $t('品牌') }}</text>
              <image class="commodityList_fd2_1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '291.png'" v-if="is_showbrand === false"></image>
              <image class="commodityList_fd2_1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '1515.png'" v-if="is_showbrand === true"></image>
            </view>
            <benben-select-diy
              ref="showSelectPopup1679567052685"
              class-text="flex-wrap flex commodityList_fd2_1_c1_babdd"
              :items.sync="dataDrandList"
              v-model="brand_id"
              default-type="aid"
              default-label="name"
              :allow-cancel="true"
              type="radio"
              :disabled="false"
              v-if="is_showbrand === true"
            >
              <benben-select-item v-for="(item, key0) in dataDrandList" :hand-value="item.aid" :key="key0">
                <template #selected>
                  <view class="flex align-center self-center justify-center flex commodityList_fd2_1_c1_c0_babdd" :style="{ 'min-width': `160rpx` }">
                    <text class="commodityList_fd2_1_c1_c0_c0_babdd">{{ item.name }}</text>
                  </view>
                </template>
                <template #no-selected>
                  <view class="flex align-center justify-center flex commodityList_fd2_1_c1_c1_babdd" :style="{ 'min-width': `160rpx` }">
                    <text class="commodityList_fd2_1_c1_c1_c0_babdd">{{ item.name }}</text>
                  </view>
                </template>
              </benben-select-item>
            </benben-select-diy>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub commodityList_fd2_2_babdd" v-if="is_showPrice === true">
            <view class="flex flex-wrap align-center justify-between commodityList_fd2_1_c0_babdd" @tap.stop="showPrcieFunc()">
              <text class="commodityList_fd2_1_c0_c0_babdd">{{ $t('价格') }}</text>
              <image class="commodityList_fd2_1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '1515.png'"></image>
            </view>
            <benben-price-range
              class="commodityList_fd2_2_c1_babdd"
              :min-price.sync="min_price"
              :max-price.sync="max_price"
              active-color="var(--benbenFontColor4)"
              price-color="var(--benbenbgColor0)"
              name-key="name"
              max-key="max"
              min-key="min"
            ></benben-price-range>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
            <view class="flex flex-wrap align-center justify-center commodityList_fd2_3_c0_babdd">
              <button class="commodityList_fd2_3_c0_c0_babdd" @tap.stop="resettingFunc()">{{ $t('重置') }}</button>
              <button class="commodityList_fd2_3_c0_c1_babdd" @tap.stop="confirmFunc()">{{ $t('确认') }}</button>
              <benben-safe-area></benben-safe-area>
            </view>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub" v-if="is_showPrice === false">
            <view class="flex flex-wrap align-center justify-between commodityList_fd2_1_c0_babdd" @tap.stop="showPrcieFunc()">
              <text class="commodityList_fd2_1_c0_c0_babdd">{{ $t('价格') }}</text>
              <image class="commodityList_fd2_1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '291.png'"></image>
            </view>
          </view>
        </view>

        <!---筛选弹窗flex布局结束-->
      </benben-popup>
      <!---商品列表_商品flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout commodityList_flex_3_babdd" v-if="cutId == '1' && showId == '1'">
        <template v-for="(item, key0) in goods_List">
          <view
            class="flex align-stretch commodityList_fd3_0_babdd commodityList_goods-card"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"
            :key="key0"
          >
            <view class="commodityList_fd3_0_imgwrap_babdd">
              <image class="commodityList_fd3_0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
            </view>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub commodityList_fd3_0_c1_babdd">
              <view class="commodityList_fd3_0_c1_c0_babdd">
                <text class="commodityList_fd3_0_c1_c0_c0_babdd" v-if="item.is_new == '1'">{{ $t('新品') }}</text>
                <text class="commodityList_fd3_0_c1_c0_c1_babdd">{{ item.name }}</text>
              </view>
              <view class="flex flex-wrap align-center commodityList_fd3_0_c1_tags_babdd" v-if="item.active_info && item.active_info.active_id">
                <text class="commodityList_fd3_0_c1_c1_c0_c0_babdd" v-if="item.active_info.type == '1'">{{ $t('秒杀') }}</text>
                <text class="commodityList_fd3_0_c1_c1_c0_c0_1_babdd" v-if="item.active_info.type == '2'">{{ $t('拼团') }}</text>
                <text class="commodityList_fd3_0_c1_c1_c0_c0_1_babdd" v-if="item.active_info.type == '3'">{{ $t('预售') }}</text>
                <text class="commodityList_fd3_0_c1_c1_c0_c0_1_babdd" v-if="item.active_info.type == '4'">{{ $t('特价') }}</text>
              </view>
              <view class="flex flex-wrap align-baseline commodityList_fd3_0_c1_c2_babdd">
                <text class="commodityList_fd3_0_c1_c1_c1_babdd">{{ $t('￥') }}</text>
                <text class="commodityList_fd3_0_c1_c1_c2_babdd">
                  <text class="commodityList_price1_fd3_0_c1_c1_c2_babdd">{{ item.shop_price | frontPrice }}</text>
                  <text class="commodityList_price2_fd3_0_c1_c1_c2_babdd">{{ item.shop_price | laterPrice }}</text>
                </text>
              </view>
              <view class="flex flex-wrap align-center justify-between commodityList_fd3_0_c1_c4_babdd">
                <view class="flex flex-wrap align-center commodityList_fd3_0_c1_c2_c0_babdd" v-if="item.market_price">
                  <text class="commodityList_fd3_0_c1_c4_c0_babdd">{{ $t('￥') }}</text>
                  <text class="commodityList_fd3_0_c1_c4_c1_babdd">{{ item.market_price }}</text>
                </view>
                <view class="flex flex-wrap align-center commodityList_fd3_0_c1_c4_c2_babdd">
                  <text class="commodityList_fd3_0_c1_c1_c3_babdd">{{ $t('销量') }}</text>
                  <text class="commodityList_fd3_0_c1_c1_c4_babdd">{{ item.sales_sum }}</text>
                </view>
              </view>
              <view class="flex flex-wrap align-center commodityList_fd3_0_c1_c3_babdd" v-if="item.coupon && item.coupon.name">
                <view class="flex flex-wrap align-center commodityList_fd3_0_c1_c3_c0_babdd">
                  <text class="commodityList_fd3_0_c1_c3_c0_c0_babdd">{{ item.coupon.name }}</text>
                </view>
              </view>
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

      <!---商品列表_商品flex布局结束-->
      <benben-specs-popup
        ref="specsPopup1719633630974"
        class="commodityList_flex_specs_4_babdd"
        price-name="shop_price"
        :speclist="dataDetail.spec_list"
        :skulist="dataDetail.sku_list"
        :sku-id.sync="sku_id"
        :sku-name.sync="sku_name"
        :price.sync="dataDetail.shop_price"
        :thumb.sync="dataDetail.thumb"
        :stock.sync="dataDetail.stock"
        :number.sync="buy_num"
        @addCart="addCarFunc()"
      ></benben-specs-popup>
      <!---商品列表_商品1flex布局开始-->
      <view class="flex flex-wrap align-stretch benben-flex-layout commodityList_flex_5_babdd" v-if="cutId == '2' && showId == '1'">
        <view class="flex-sub">
          <benben-waterfalls
            ref="waterfalls1706929510943"
            :waterfall-data.sync="waterfallsfd5_0"
            v-model="goods_List"
            id-key="aid"
            add-time="200"
            column-count="2"
            left-gap="10"
            right-gap="10"
            column-gap="10"
          >
            <benben-waterfalls-item :sort-index="sortIndex" :key="sortIndex" v-for="(waterfall, sortIndex) in waterfallsfd5_0">
              <template v-for="waterfallIndex in waterfall">
                <template v-if="goods_List[waterfallIndex]">
                  <view
                    class="flex flex-direction align-stretch commodityList_fd5_0_c0_babdd commodityList_goods-card"
                    @tap.stop="handleJumpDiy"
                    data-type="navigateTo"
                    :data-url="`/pages/fl/shopDetail/shopDetail?id=${goods_List[waterfallIndex].aid}`"
                    :key="waterfallIndex"
                  >
                    <view class="commodityList_fd5_0_c0_imgwrap_babdd">
                      <image class="commodityList_fd5_0_c0_c0_babdd" mode="aspectFill" :src="goods_List[waterfallIndex].thumb"></image>
                    </view>
                    <view class="commodityList_fd5_0_c0_body_babdd">
                      <view class="commodityList_fd5_0_c0_c1_babdd">
                        <text class="commodityList_fd5_0_c0_c1_c0_babdd" v-if="goods_List[waterfallIndex].is_new == '1'">{{ $t('新品') }}</text>
                        <text class="commodityList_fd5_0_c0_c1_c1_babdd">{{ goods_List[waterfallIndex].name }}</text>
                      </view>
                      <view
                        class="flex flex-wrap align-center commodityList_fd5_0_c0_tags_babdd"
                        v-if="goods_List[waterfallIndex].active_info && goods_List[waterfallIndex].active_info.active_id"
                      >
                        <text class="commodityList_fd5_0_c0_c2_c0_c0_babdd" v-if="goods_List[waterfallIndex].active_info.type == '1'">
                          {{ $t('秒杀') }}
                        </text>
                        <text class="commodityList_fd5_0_c0_c2_c0_c0_1_babdd" v-if="goods_List[waterfallIndex].active_info.type == '2'">
                          {{ $t('拼团') }}
                        </text>
                        <text class="commodityList_fd5_0_c0_c2_c0_c0_1_babdd" v-if="goods_List[waterfallIndex].active_info.type == '3'">
                          {{ $t('预售') }}
                        </text>
                        <text class="commodityList_fd5_0_c0_c2_c0_c0_1_babdd" v-if="goods_List[waterfallIndex].active_info.type == '4'">
                          {{ $t('特价') }}
                        </text>
                      </view>
                      <view class="flex flex-wrap align-baseline commodityList_fd5_0_c0_c2_babdd">
                        <text class="commodityList_fd5_0_c0_c2_c1_babdd">{{ $t('￥') }}</text>
                        <text class="commodityList_fd5_0_c0_c2_c2_babdd">
                          <text class="commodityList_price1_fd5_0_c0_c2_c2_babdd">{{ goods_List[waterfallIndex].shop_price | frontPrice }}</text>
                          <text class="commodityList_price2_fd5_0_c0_c2_c2_babdd">{{ goods_List[waterfallIndex].shop_price | laterPrice }}</text>
                        </text>
                      </view>
                      <view class="flex flex-wrap align-center justify-between commodityList_fd5_0_c0_c3_babdd">
                        <view
                          class="flex flex-wrap align-center commodityList_fd5_0_c0_c3_market_babdd"
                          v-if="goods_List[waterfallIndex].market_price"
                        >
                          <text class="commodityList_fd5_0_c0_c3_c0_c0_babdd">{{ $t('￥') }}</text>
                          <text class="commodityList_fd5_0_c0_c3_c0_c0_babdd">{{ goods_List[waterfallIndex].market_price }}</text>
                        </view>
                        <view class="flex flex-wrap align-center commodityList_fd5_0_c0_c3_sales_babdd">
                          <text class="commodityList_fd5_0_c0_c3_c1_babdd">{{ $t('销量') }}</text>
                          <text class="commodityList_fd5_0_c0_c2_c4_babdd">{{ goods_List[waterfallIndex].sales_sum }}</text>
                        </view>
                      </view>
                      <view
                        class="flex flex-wrap align-center commodityList_fd5_0_c0_c5_babdd"
                        v-if="goods_List[waterfallIndex].coupon && goods_List[waterfallIndex].coupon.name"
                      >
                        <view class="flex flex-wrap align-center commodityList_fd5_0_c0_c4_c0_babdd">
                          <text class="commodityList_fd5_0_c0_c4_c0_c0_babdd">{{ goods_List[waterfallIndex].coupon.name }}</text>
                        </view>
                      </view>
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
        <!--     <template v-for = '(item,key0) in goods_List'>
    <view   class='flex flex-direction flex-wrap align-stretch commodityList_fd5_1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"    :key='key0'>
        <image class='commodityList_fd5_1_c0_babdd'  mode="aspectFill"  :src='item.thumb'></image>
<text class='commodityList_fd5_1_c1_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center commodityList_fd5_1_c2_babdd'      >
        <text class='commodityList_fd5_1_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' commodityList_fd5_1_c2_c1_babdd'   >
    <text class=' commodityList_price2_fd5_0_c0_c2_c2_babdd' >{{ item.shop_price | frontPrice }}</text><text class=' commodityList_price2_fd5_1_c2_c1_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
    <view   class='flex flex-wrap align-center commodityList_fd5_1_c2_c2_babdd'    v-if= " item.discounts>money"  >
        <image class='commodityList_fd5_1_c2_c2_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"823.png"'></image>
<text class='commodityList_fd5_1_c2_c2_c1_babdd'  >{{item.discounts}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center commodityList_fd5_1_c3_babdd'      >
        <text class='commodityList_fd5_1_c3_c0_babdd'  >{{$t('￥')}}</text>
<text class='commodityList_fd5_1_c3_c1_babdd'  >{{item.market_price}}</text>
<text class='commodityList_fd5_1_c3_c2_babdd'  >{{$t('销量')}}</text>
<text class='commodityList_fd5_0_c0_c2_c4_babdd'  >{{item.sales_sum}}</text>
</view>
    <view   class='flex flex-wrap align-center commodityList_fd5_1_c4_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopIndex/shopIndex?usermerchant_aid=${item.usermerchant_id}`"   >
        <text class='commodityList_fd5_1_c4_c0_babdd'  >{{item.shop_info.store_name}}</text>
<text class='commodityList_fd5_1_c4_c1_babdd'  >{{$t('进店')}}</text>
<text class='fu-iconfont2  commodityList_fd5_1_c4_c2_babdd'  >&#xe7f2;</text>
</view>
    <view   class='flex flex-wrap align-center commodityList_fd5_1_c5_babdd'    v-if= " item.share_award_money>0"  >
        <image class='commodityList_fd5_1_c5_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"813.png"'></image>
<text class='commodityList_fd5_1_c5_c1_babdd'  >{{$t('分享赚')}}</text>
<text class='commodityList_fd5_1_c5_c1_babdd'  >{{$t('￥')}}</text>
<text class='commodityList_fd5_1_c5_c1_babdd'  >{{item.share_award_money}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
 -->
      </view>

      <!---商品列表_商品1flex布局结束-->
    </view>
  </page-body>
</template>
<script>
import pagingList from '@/common/mixin/paging_list.js'
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},
  mixins: [pagingList],

  data() {
    return {
      waterfallsfd5_0: [],
      popupShow1679566295078: false,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      /** showId【商品店铺升降序】 **/
      showId: '1',
      sort_field: '1',
      /** sort_type【desc升降序】 **/
      sort_type: 'desc',
      max_price: '',
      brand_id: '',
      min_price: '',
      /** areaId【地区id】 **/
      areaId: '',
      goods_List: [],
      dataShopList: [],
      cutId: '1',
      dataDrandList: [],
      money: 0,
      is_showbrand: true,
      is_showPrice: true,
      sku_id: '',
      sku_name: '',
      buy_num: 1,
      /** count【购物车数量】 **/
      dataNum: {
        count: '',
      },
      /** goods_image【规格图片】
       *   stock【库存】
       *   market_price【划线价】
       *   shop_price【售价】
       *   member_price【会员价】
       *   key_name【规格名称】
       *   key【规格key键】
       *   sku_id【规格ID】 **/
      dataSpecs: {
        sku_id: '',
        key: '',
        key_name: '',
        member_price: '',
        shop_price: '',
        market_price: '',
        stock: '',
        goods_image: '',
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
      dataDetail: {
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
      goods_id: '',
      shopType: '',
      keyword: '',
      cid: '',
      type: '0',
    }
  },
  computed: {
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
  },
  watch: {},
  onLoad(options) {
    let { keyword, cid, type } = options
    if (keyword !== undefined) this.keyword = keyword
    if (cid !== undefined) this.cid = cid
    if (type !== undefined) this.type = type
    this.getListFunc()
    this.queryDrandListFunc()
    this.getShopDataFunc()
    this.diyPageListen()
  },
  onUnload() {
    this.diyOffPageListen()
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.queryDrandListFunc()
    this.showNewFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //顶部搜索
    topSearchFunc() {
      this.$store.commit('appSearchHistoryAdd', {
        name: this.keyword,
      })
      if (this.showId == '1') {
        this.getListFunc()
      } else {
      }
    },
    //清空关键词
    cleanKeywordFunc() {
      this.keyword = ''
      if (this.showId == '1') {
        this.getListFunc()
      } else {
      }
    },
    //综合切换
    switchComprehensiveFunc() {
      this.sort_field = '1'
      this.showId = '1'
      this.sort_type = 'desc'
      this.getListFunc()
    },
    //商品管理-商品列表
    getListFunc() {
      this.$refs.waterfalls1706929510943?.refresh()
      this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3
      this.pageingListApiMethod = 'aGet'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        keyword: this.keyword,
        order: this.sort_type,
        sort: this.sort_field,
        cid: this.cid,
        business_parameters: 'synthesize',
        max_price: this.max_price,
        brand_id: this.brand_id,
        min_price: this.min_price,
        goods_type: this.type,
      }
      this.listData = []
      this.goods_List = this.listData
      this.pagingListToggle()
    },
    //切换商品排序
    switchShopListFunc(type) {
      this.sort_field = type
      if (this.showId == '1') {
        if (type == '2') {
          if (this.sort_type == 'desc') {
            this.sort_type = 'asc'
          } else if (this.sort_type == 'asc') {
            this.sort_type = 'desc'
          }
        } else if (type == '3') {
          if (this.sort_type == 'desc') {
            this.sort_type = 'asc'
          } else if (this.sort_type == 'asc') {
            this.sort_type = 'desc'
          }
        }
        this.getListFunc()
      } else {
        if (this.sort_type == 'desc') {
          this.sort_type = 'asc'
        } else if (this.sort_type == 'asc') {
          this.sort_type = 'desc'
        }
      }
    },
    //切换商品店铺
    switchShopStoreFunc() {
      this.showId = '2'
      this.sort_field = ''
    },
    //宫格列表切换
    switchcutFunc(cutId) {
      this.cutId = cutId
    },
    //商品管理-获取品牌列表
    async queryDrandListFunc() {
      console.log(`this.cid`, Boolean(this.cid))
      if (!Boolean(this.cid)) {
        this.dataDrandList = []
        return
      }
      //请求方法
      //数据验证

      let datadataDrandList = await this.$api.get(global.apiUrls.post63e36c4963fb8, {
        goodscategory_id: this.cid,
      })

      if (datadataDrandList.data.code != 1) {
        this.$message.info(datadataDrandList.data.msg)
        return
      }
      let infodataDrandList = datadataDrandList.data
      this.dataDrandList = infodataDrandList.data
    },
    //确认
    confirmFunc() {
      this.popupShow1679566295078 = false
      this.getListFunc()
    },
    //重置
    resettingFunc() {
      this.brand_id = ''
      this.min_price = ''
      this.max_price = ''
      this.popupShow1679566295078 = false
      this.getListFunc()
    },
    //下拉刷新
    showNewFunc() {
      if (this.showId == '1') {
        this.getListFunc()
      } else if (this.showId == '2') {
      }
    },
    //展示品牌
    showBrandFunc() {
      if (this.is_showbrand === true) {
        this.is_showbrand = false
      } else {
        this.is_showbrand = true
      }
    },
    //展示价格
    showPrcieFunc() {
      if (this.is_showPrice === true) {
        this.is_showPrice = false
      } else {
        this.is_showPrice = true
      }
    },
    //监听店铺关注
    ListenlikeCommentsFunc(data) {
      var obj = this.dataShopList.find((e) => e.store_id == data.aid)
      console.log(obj, 'obj')
      if (obj) {
        obj.store_collection_num = data.store_collection_num
      }
    },
    //加入购物车
    async addCarFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let data6412f82acb5ba = await this.$api.post(global.apiUrls.post6412f82acb5ba, {
          goods_id: this.goods_id,
          sku_id: this.sku_id,
          num: this.buy_num,
        })

        if (data6412f82acb5ba.data.code != 1) {
          this.$message.info(data6412f82acb5ba.data.msg)
          return
        }
        let info6412f82acb5ba = data6412f82acb5ba.data

        this.$refs.specsPopup1719633630974.close()
        uni.showToast({
          title: this.$t('加入购物车成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.getShoppingnumFunc()
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
    //获取购物车数量
    async getShoppingnumFunc() {
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
    //获取商品id
    getShoppingidFunc(id) {
      this.goods_id = id
      this.getShoppingdetailFunc()
    },
    //获取商品规格
    async getShoppingdetailFunc() {
      //请求方法
      //数据验证

      let datadataDetail = await this.$api.get(global.apiUrls.post641987361d887, {
        goods_id: this.goods_id,
        user_id: this.userInfo.id,
      })

      if (datadataDetail.data.code != 1) {
        this.$message.info(datadataDetail.data.msg)
        return
      }
      let infodataDetail = datadataDetail.data
      this.dataDetail = infodataDetail.data

      this.$refs.specsPopup1719633630974.open('cart')
    },
    //单多融合
    async getShopDataFunc() {
      let datashopType = await this.$api.post(global.apiUrls.post6758eb9165329, {
        path: 'pages/fl/commodityList/commodityList',
      })

      if (datashopType.data.code != 1) {
        this.$message.info(datashopType.data.msg)
        return
      }
      let infoshopType = datashopType.data
      this.shopType = infoshopType.data
    },
    pagingListPostData() {
      return this.pagingListPostDataContent
    },
    //页面监听
    diyPageListen() {
      uni.$on('shopIndex', (data) => {
        this.ListenlikeCommentsFunc(data)
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('shopIndex')
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: #f5f6f8;
  background-size: 100% auto;

  .commodityList_goods-card {
    background: #ffffff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
  }

  .commodityList_flex_5_babdd {
    padding: 0rpx 12rpx 0rpx 12rpx;
    margin: 16rpx 0rpx 0rpx 0rpx;

    .commodityList_fd5_0_c0_babdd {
      margin: 0rpx 0rpx 16rpx 0rpx;

      .commodityList_fd5_0_c0_imgwrap_babdd {
        width: 100%;
        height: 340rpx;
        overflow: hidden;
        background: #f3f4f6;
      }

      .commodityList_fd5_0_c0_c0_babdd {
        width: 100%;
        height: 100%;
      }

      .commodityList_fd5_0_c0_body_babdd {
        padding: 20rpx 20rpx 22rpx 20rpx;
      }

      .commodityList_fd5_0_c0_c1_babdd {
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0;

        .commodityList_fd5_0_c0_c1_c0_babdd {
          display: inline-block;
          vertical-align: middle;
          color: #ffffff;
          font-size: 20rpx;
          font-weight: 600;
          line-height: 32rpx;
          background: linear-gradient(135deg, #ff6b4a 0%, #ff3b30 100%);
          padding: 0 10rpx;
          border-radius: 6rpx;
          margin-right: 8rpx;
        }

        .commodityList_fd5_0_c0_c1_c1_babdd {
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: #1a1a1a;
        }
      }
    }

    .commodityList_fd5_1_babdd {
      width: 346rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #fff;
      margin: 0rpx 0rpx 10rpx 10rpx;

      .commodityList_fd5_1_c0_babdd {
        width: 346rpx;
        height: 346rpx;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
      }

      .commodityList_fd5_1_c1_babdd {
        font-size: 28rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 40rpx;
        height: 80rpx;
        margin: 24rpx 20rpx 16rpx 20rpx;
      }

      .commodityList_fd5_1_c2_babdd {
        margin: 0rpx 20rpx 18rpx 20rpx;

        .commodityList_fd5_1_c2_c0_babdd {
          color: var(--benbenFontColor7);
          font-size: 24rpx;
          font-weight: 700;
          line-height: 39rpx;
        }

        .commodityList_fd5_1_c2_c1_babdd {
          color: var(--benbenFontColor7);
          font-weight: 600;

          .commodityList_price2_fd5_1_c2_c1_babdd {
            font-size: 20rpx;
          }
        }

        .commodityList_fd5_1_c2_c2_babdd {
          border-radius: 4rpx;
          border: 1px solid var(--benbenbdColor2);
          margin: 0rpx 0rpx 0rpx 16rpx;

          .commodityList_fd5_1_c2_c2_c0_babdd {
            width: 36.9rpx;
            height: 29rpx;
            border-radius: 0rpx 0rpx 0rpx 0rpx;
          }

          .commodityList_fd5_1_c2_c2_c1_babdd {
            color: rgba(253, 81, 61, 1);
            font-size: 24rpx;
            margin: 0rpx 9rpx 0rpx 6rpx;
          }
        }
      }

      .commodityList_fd5_1_c3_babdd {
        margin: 0rpx 20rpx 0rpx 20rpx;

        .commodityList_fd5_1_c3_c0_babdd {
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor2);
          line-height: 27rpx;
          text-decoration: line-through;
        }

        .commodityList_fd5_1_c3_c1_babdd {
          color: var(--benbenFontColor2);
          font-size: 24rpx;
          font-weight: 400;
          line-height: 27rpx;
          text-decoration: line-through;
        }

        .commodityList_fd5_1_c3_c2_babdd {
          color: var(--benbenFontColor2);
          font-size: 22rpx;
          font-weight: 400;
          line-height: 30rpx;
          margin: 0rpx 0rpx 0rpx auto;
        }
      }

      .commodityList_fd5_1_c4_babdd {
        margin: 10rpx 20rpx 16rpx 20rpx;

        .commodityList_fd5_1_c4_c0_babdd {
          color: var(--benbenFontColor2);
          font-size: 24rpx;
          font-weight: 400;
          line-height: 33rpx;
          max-width: 200rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .commodityList_fd5_1_c4_c1_babdd {
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
          line-height: 33rpx;
          margin: 0rpx 0rpx 0rpx 24rpx;
        }

        .commodityList_fd5_1_c4_c2_babdd {
          font-size: 18rpx;
          margin: 0rpx 0rpx 0rpx 4rpx;
        }
      }

      .commodityList_fd5_1_c5_babdd {
        height: 38rpx;
        margin: 0rpx 31rpx 20rpx 18rpx;
        padding: 0rpx 0rpx 0rpx 40rpx;
        background: url(#{image-path('812.png')
        }) no-repeat;
        background-size: 100% 100%;

        .commodityList_fd5_1_c5_c0_babdd {
          width: 22rpx;
          height: 22rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 12rpx 0rpx 0rpx;
        }
      }
    }
  }

  .commodityList_fd5_0_c0_tags_babdd {
    margin: 12rpx 0 0 0;
    gap: 8rpx;
  }

  .commodityList_fd5_0_c0_c2_babdd {
    margin: 14rpx 0 0 0;

    .commodityList_fd5_0_c0_c2_c0_c0_babdd {
      display: inline-block;
      color: #ff3b30;
      font-size: 20rpx;
      font-weight: 600;
      line-height: 36rpx;
      padding: 0 12rpx;
      border-radius: 6rpx;
      background: rgba(255, 59, 48, 0.08);
      margin-right: 8rpx;
    }

    .commodityList_fd5_0_c0_c2_c1_babdd {
      color: #ff3b30;
      font-size: 22rpx;
      font-weight: 700;
      line-height: 1;
    }

    .commodityList_fd5_0_c0_c2_c2_babdd {
      color: #ff3b30;
      font-weight: 700;
      line-height: 1;

      .commodityList_price1_fd5_0_c0_c2_c2_babdd {
        font-size: 40rpx;
        letter-spacing: -1rpx;
      }
    }
  }

  .commodityList_fd5_0_c0_c3_babdd {
    margin: 10rpx 0 0 0;
    width: 100%;

    .commodityList_fd5_0_c0_c3_c0_c0_babdd {
      font-size: 22rpx;
      font-weight: 400;
      color: #b0b4bc;
      line-height: 32rpx;
      text-decoration: line-through;
    }

    .commodityList_fd5_0_c0_c3_c1_babdd {
      font-size: 22rpx;
      font-weight: 400;
      color: #b0b4bc;
      line-height: 32rpx;
      margin-right: 4rpx;
    }
  }

  .commodityList_fd5_0_c0_c3_sales_babdd {
    flex-shrink: 0;
    margin-left: auto;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    background: #f5f6f8;
  }

  .commodityList_fd5_0_c0_c5_babdd {
    margin: 12rpx 0 0 0;
  }

  .commodityList_fd5_0_c0_c2_c0_c0_1_babdd {
    display: inline-block;
    color: #ff6b4a;
    font-size: 20rpx;
    font-weight: 600;
    line-height: 36rpx;
    padding: 0 12rpx;
    border-radius: 6rpx;
    background: rgba(255, 107, 74, 0.1);
    margin-right: 8rpx;
  }

  .commodityList_price2_fd5_0_c0_c2_c2_babdd {
    font-size: 28rpx;
  }

  .commodityList_fd5_0_c0_c2_c4_babdd {
    color: #b0b4bc;
    font-size: 22rpx;
    font-weight: 500;
    line-height: 32rpx;
  }

  .commodityList_fd5_0_c0_c4_c0_babdd {
    display: inline-flex;
    align-items: center;
    height: auto;
    min-height: 36rpx;
    margin: 0;
    padding: 4rpx 14rpx;
    background: rgba(255, 59, 48, 0.06);
    border: none;
    border-radius: 8rpx;

    .commodityList_fd5_0_c0_c4_c0_c0_babdd {
      color: #ff3b30;
      font-size: 20rpx;
      font-weight: 500;
      line-height: 28rpx;
    }
  }

  .commodityList_fd5_1_c5_c1_babdd {
    color: rgba(177, 110, 5, 1);
    font-size: 24rpx;
    line-height: 36rpx;
  }

  .commodityList_flex_specs_4_babdd {
    --active-sku-tag-color: #fa2033;
    --active-sku-tag-bg: #fff2ef;
    --sku-tag-color: #33333;
    --sku-tag-bg: #f5f5f5;
    --cart-btn-bg: var(--benbenbtnColor0);
    --buy-btn-bg: var(--benbenbtnColor5);
    --confirm-btn-bg: var(--benbenbtnColor0);
  }

  .commodityList_flex_3_babdd {
    padding: 0rpx 20rpx 24rpx 20rpx;

    .commodityList_fd3_0_babdd {
      padding: 20rpx;
      margin: 16rpx 0rpx 0rpx 0rpx;

      .commodityList_fd3_0_imgwrap_babdd {
        flex-shrink: 0;
        width: 200rpx;
        height: 200rpx;
        border-radius: 16rpx;
        overflow: hidden;
        background: #f3f4f6;
      }

      .commodityList_fd3_0_c0_babdd {
        width: 100%;
        height: 100%;
      }

      .commodityList_fd3_0_c1_babdd {
        margin: 0rpx 0rpx 0rpx 20rpx;
        min-height: 200rpx;
        justify-content: space-between;

        .commodityList_fd3_0_c1_c0_babdd {
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;

          .commodityList_fd3_0_c1_c0_c0_babdd {
            display: inline-block;
            vertical-align: middle;
            color: #ffffff;
            font-size: 20rpx;
            font-weight: 600;
            line-height: 32rpx;
            background: linear-gradient(135deg, #ff6b4a 0%, #ff3b30 100%);
            padding: 0 10rpx;
            border-radius: 6rpx;
            margin-right: 8rpx;
          }

          .commodityList_fd3_0_c1_c0_c1_babdd {
            line-height: 40rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: #1a1a1a;
          }
        }

        .commodityList_fd3_0_c1_c3_babdd {
          margin: 12rpx 0 0 0;

          .commodityList_fd3_0_c1_c3_c0_babdd {
            display: inline-flex;
            align-items: center;
            height: auto;
            min-height: 36rpx;
            margin: 0;
            padding: 4rpx 14rpx;
            background: rgba(255, 59, 48, 0.06);
            border: none;
            border-radius: 8rpx;

            .commodityList_fd3_0_c1_c3_c0_c0_babdd {
              color: #ff3b30;
              font-size: 20rpx;
              font-weight: 500;
              line-height: 28rpx;
            }
          }
        }
      }
    }
  }

  .commodityList_fd3_0_c1_tags_babdd {
    margin: 10rpx 0 0 0;
    gap: 8rpx;
  }

  .commodityList_fd3_0_c1_c2_babdd {
    margin: 14rpx 0 0 0;
  }

  .commodityList_fd3_0_c1_c4_babdd {
    margin: 8rpx 0 0 0;
    width: 100%;

    .commodityList_fd3_0_c1_c4_c0_babdd {
      font-size: 22rpx;
      font-weight: 400;
      color: #b0b4bc;
      line-height: 32rpx;
    }

    .commodityList_fd3_0_c1_c4_c1_babdd {
      font-size: 22rpx;
      font-weight: 400;
      color: #b0b4bc;
      line-height: 32rpx;
      text-decoration: line-through;
    }

    .commodityList_fd3_0_c1_c4_c2_babdd {
      flex-shrink: 0;
      margin-left: auto;
      padding: 4rpx 12rpx;
      border-radius: 20rpx;
      background: #f5f6f8;
    }
  }

  .commodityList_fd3_0_c1_c1_c0_c0_babdd {
    display: inline-block;
    color: #ff3b30;
    font-size: 20rpx;
    font-weight: 600;
    line-height: 36rpx;
    padding: 0 12rpx;
    border-radius: 6rpx;
    background: rgba(255, 59, 48, 0.08);
    margin-right: 8rpx;
  }

  .commodityList_fd3_0_c1_c1_c1_babdd {
    color: #ff3b30;
    font-size: 22rpx;
    font-weight: 700;
    line-height: 1;
  }

  .commodityList_fd3_0_c1_c1_c2_babdd {
    color: #ff3b30;
    font-weight: 700;
    line-height: 1;

    .commodityList_price1_fd3_0_c1_c1_c2_babdd {
      font-size: 44rpx;
      letter-spacing: -1rpx;
    }

    .commodityList_price2_fd3_0_c1_c1_c2_babdd {
      font-size: 28rpx;
    }
  }

  .commodityList_fd3_0_c1_c1_c0_c0_1_babdd {
    display: inline-block;
    color: #ff6b4a;
    font-size: 20rpx;
    font-weight: 600;
    line-height: 36rpx;
    padding: 0 12rpx;
    border-radius: 6rpx;
    background: rgba(255, 107, 74, 0.1);
    margin-right: 8rpx;
  }

  .commodityList_fd3_0_c1_c1_c3_babdd {
    font-size: 22rpx;
    font-weight: 400;
    color: #b0b4bc;
    line-height: 32rpx;
    margin: 0rpx 4rpx 0rpx 0rpx;
  }

  .commodityList_fd3_0_c1_c1_c4_babdd {
    font-size: 22rpx;
    font-weight: 500;
    color: #8a8f99;
    line-height: 32rpx;
  }

  .commodityList_fd3_0_c1_c2_c0_babdd {
    color: #b0b4bc;
  }

  .commodityList_flex_2_babdd {
    width: 620rpx;
    position: relative;
    padding: 40rpx 0rpx 0rpx 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto;

    .commodityList_fd2_0_babdd {
      margin: 0rpx 0rpx 35rpx 0rpx;
      height: 86rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;

      .commodityList_fd2_0_c0_babdd {
        line-height: 50rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        margin: 0rpx 0rpx 0rpx 32rpx;
      }
    }

    .commodityList_fd2_1_c1_c0_babdd {
      height: 80rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      margin: 0rpx 8rpx 16rpx 8rpx;
      border: 1px solid var(--benbenbdColor2);
      padding: 0rpx 20rpx 0rpx 20rpx;

      .commodityList_fd2_1_c1_c0_c0_babdd {
        line-height: 33rpx;
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor4);
      }
    }

    .commodityList_fd2_1_c1_c1_babdd {
      height: 80rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: var(--benbenbgColor2);
      margin: 0rpx 8rpx 16rpx 8rpx;
      padding: 0rpx 20rpx 0rpx 20rpx;

      .commodityList_fd2_1_c1_c1_c0_babdd {
        line-height: 33rpx;
        font-size: 24rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .commodityList_fd2_2_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto;

      .commodityList_fd2_2_c1_babdd {
        margin: 0rpx 24rpx 0rpx 32rpx;
      }
    }

    .commodityList_fd2_3_c0_babdd {
      padding: 32rpx 23rpx 32rpx 23rpx;
      position: fixed;
      bottom: calc(0rpx + var(--benben-window-bottom, 0px));
      width: 620rpx;
      background: var(--benbenbgColor0);
      background-size: 100% auto;

      .commodityList_fd2_3_c0_c0_babdd {
        border-radius: 36rpx;
        font-size: 28rpx;
        background: var(--benbenbtnColor4);
        color: var(--benbenFontColor3);
        height: 72rpx;
        line-height: 72rpx;
        min-width: 246rpx;
        padding: 0rpx 20rpx 0rpx 20rpx;
      }

      .commodityList_fd2_3_c0_c1_babdd {
        border-radius: 36rpx;
        font-size: 28rpx;
        background: var(--benbenbtnColor0);
        color: var(--benbenFontColor3);
        width: 246rpx;
        height: 72rpx;
        line-height: 72rpx;
        margin: 0rpx 0rpx 0rpx 18rpx;
        min-width: 246rpx;
        padding: 0rpx 20rpx 0rpx 20rpx;
      }
    }
  }

  .commodityList_fd2_1_c0_babdd {
    margin: 0rpx 24rpx 17rpx 32rpx;
  }

  .commodityList_fd2_1_c0_c0_babdd {
    line-height: 45rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
  }

  .commodityList_fd2_1_c0_c1_babdd {
    width: 24rpx;
    height: 24rpx;
  }

  .commodityList_flex_1_babdd {
    width: 750rpx;
    height: 100rpx;
    overflow: hidden;
    z-index: 10;
    top: 87rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .commodityList_fd1_0_babdd {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      padding: 0rpx 32rpx 0rpx 32rpx;

      .commodityList_fd1_0_c0_babdd {
        margin: 0rpx 49rpx 0rpx 0rpx;

        .commodityList_fd1_0_c0_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 28rpx;
          font-weight: 500;
          line-height: 35rpx;
        }

        .commodityList_fd1_0_c0_c0_1_babdd {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 35rpx;
          color: var(--benbenFontColor5);
        }
      }

      .commodityList_fd1_0_c3_babdd {
        border-right: 1px solid rgba(237, 237, 237, 1);
        padding: 0rpx 20rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx auto;
      }

      .commodityList_fd1_0_c4_babdd {
        margin: 0rpx 0rpx 0rpx 20rpx;

        .commodityList_fd1_0_c4_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
        }

        .commodityList_fd1_0_c4_c1_babdd {
          width: 30rpx;
          height: 30rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 0rpx 0rpx 12rpx;
        }
      }
    }
  }

  .commodityList_fd1_0_c1_babdd {
    margin: 0rpx 64rpx 0rpx 0rpx;

    .commodityList_fd1_0_c1_c0_1_babdd {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      margin: 0rpx 10rpx 0rpx 0rpx;
      color: var(--benbenFontColor5);
    }
  }

  .commodityList_fd1_0_c1_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 10rpx 0rpx 0rpx;
  }

  .commodityList_fd1_0_c1_c1_babdd {
    width: 10rpx;
    height: 18rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .commodityList_fd1_0_c2_c0_1_babdd {
    color: var(--benbenFontColor5);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin: 0rpx 10rpx 0rpx 0rpx;
  }

  .commodityList_fd1_0_c3_c0_babdd {
    width: 30rpx;
    height: 28rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .commodityList_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .commodityList_fd0_0_babdd {
      padding: 0rpx 24rpx 0rpx 24rpx;
      line-height: 88rpx;
      border-bottom: 1px solid var(--benbenbdColor0);

      .commodityList_fd0_0_c0_c0_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: #333;
      }

      .commodityList_fd0_0_c1_babdd {
        height: 64rpx;
        border-radius: 34rpx 34rpx 34rpx 34rpx;
        background: var(--benbenbgColor0);
        padding: 0rpx 24rpx 0rpx 24rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;

        .commodityList_fd0_0_c1_c0_babdd {
          font-size: 24rpx;
          color: rgba(153, 153, 153, 1);
          margin: 0rpx 14rpx 0rpx 0rpx;
        }

        .commodityList_fd0_0_c1_c3_babdd {
          width: 40rpx;
          height: 40rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 0rpx 0rpx 20rpx;
        }
      }

      .commodityList_fd0_0_c2_babdd {
        width: 30%;
      }
    }
  }

  .commodityList_fd0_0_c1_c1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }
}

::v-deep .commodityList_fd2_1_c1_babdd {
  margin: 0rpx 16rpx 28rpx 16rpx;
}
</style>
