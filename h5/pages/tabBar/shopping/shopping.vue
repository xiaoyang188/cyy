<template>
  <page-body :is-tabbar="true" page-path="/pages/tabBar/shopping/shopping">
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex shopping_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center shopping_fd0_0_babdd"></view>
        <text class="shopping_fd0_1_babdd">{{ $t('购物车') }}</text>
        <view class="flex flex-direction-row-reverse align-center justify-end shopping_fd0_0_babdd">
          <view class="flex flex-wrap align-center justify-end flex-sub" v-if="appSystemIdentification != 'Wechat'">
            <text class="shopping_fd0_2_c0_c0_babdd" v-if="is_edit === false" @tap.stop="editTabFunc()">{{ $t('管理') }}</text>
            <text class="shopping_fd0_2_c0_c0_babdd" v-if="is_edit === true" @tap.stop="editTabFunc()">{{ $t('完成') }}</text>
          </view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-specs-popup
        ref="specsPopup1706595992726"
        class="shopping_flex_specs_1_babdd"
        price-name="shop_price"
        :speclist="dataDetail.spec_list"
        :skulist="dataDetail.sku_list"
        :sku-id.sync="sku_name_sku"
        :sku-name.sync="shopsku_id"
        :price.sync="dataDetail.shop_price"
        :thumb.sync="dataDetail.thumb"
        :stock.sync="dataDetail.stock"
        :number.sync="num"
        @confirm="confirmSelectionFunc()"
      ></benben-specs-popup>

      <!---flex布局flex布局开始-->
      <view
        class="flex align-center justify-between benben-flex-layout shopping_flex_3_babdd"
        v-if="appSystemIdentification == 'Wechat' && isLogin === true && dataList && dataList.length > 0"
      >
        <view class="flex flex-wrap align-center shopping_fd3_0_babdd">
          <text>{{ $t('共') }}</text>
          <text class="shopping_fd3_0_c1_babdd">{{ dataNum.count }}</text>
          <text>{{ $t('商品') }}</text>
        </view>
        <text class="shopping_fd3_1_babdd" v-if="is_edit === false" @tap.stop="editTabFunc()">{{ $t('管理') }}</text>
        <text class="shopping_fd3_1_1_babdd" v-if="is_edit === true" @tap.stop="editTabFunc()">{{ $t('完成') }}</text>
      </view>

      <!---flex布局flex布局结束-->
      <benben-multiquotient-cart
        type="card"
        :show-shop="false"
        class="shopping_flex_cart_4_babdd"
        :is-editor.sync="is_edit"
        :cart-list.sync="dataList"
        :cart-ids.sync="cart_ids"
        :cart-id.sync="cart_id"
        :goods-id.sync="goods_id"
        :merchant-id.sync="store_aid"
        :sku-id.sync="sku_name_sku"
        :cart-num.sync="num"
        @toGoods="goToGoodsDetailFunc()"
        @goMerchant="clickStoreFunc()"
        @transCartGoods="addCollectFunc()"
        @delCart="deleteCartsFunc()"
        @createOrder="ConfirmOrderFunc()"
        @numberChange="editCartNumFunc()"
        @changeSku="editSkuFunc()"
      >
        <template #login>
          <view class="flex flex-direction flex-wrap align-center justify-center shopping_shopCart0_0_babdd">
            <image class="shopping_shopCart0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '1516.png'"></image>
            <text class="shopping_shopCart0_0_c1_babdd">{{ $t('还没登录，快去登录吧') }}</text>
            <button class="shopping_shopCart0_0_c2_babdd" @tap.stop="toLoginDiy()">{{ $t('去登录') }}</button>
          </view>
        </template>
        <template #empty>
          <view class="flex flex-direction flex-wrap align-center justify-center shopping_shopCart0_0_babdd">
            <image class="shopping_shopCart0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '1516.png'"></image>
            <text class="shopping_shopCart0_0_c1_babdd">{{ $t('您的购物车还没有商品，快去挑选吧') }}</text>
            <button class="shopping_shopCart0_0_c2_babdd" @tap.stop="toHomeDiy()">{{ $t('去挑选好货') }}</button>
          </view>
        </template>
      </benben-multiquotient-cart>
      <!---订单列表flex布局开始-->
      <view class="flex flex-wrap align-center justify-center benben-flex-layout shopping_flex_5_babdd">
        <image class="shopping_fd5_0_babdd" mode="aspectFit" :src="STATIC_URL + '748.png'"></image>
        <text class="shopping_fd5_1_babdd">{{ $t('猜你喜欢') }}</text>
        <image class="shopping_fd5_0_babdd" mode="aspectFit" :src="STATIC_URL + '749.png'"></image>
      </view>

      <!---订单列表flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout shopping_flex_6_babdd">
        <view class="flex-sub">
          <benben-waterfalls
            ref="waterfalls1706939363764"
            :waterfall-data.sync="waterfallsfd6_0"
            v-model="dataGoodsList"
            id-key="aid"
            add-time="200"
            column-count="2"
            left-gap="0"
            right-gap="0"
            column-gap="10"
          >
            <benben-waterfalls-item :sort-index="sortIndex" :key="sortIndex" v-for="(waterfall, sortIndex) in waterfallsfd6_0">
              <template v-for="waterfallIndex in waterfall">
                <template v-if="dataGoodsList[waterfallIndex]">
                  <view
                    class="flex flex-direction align-stretch shopping_fd6_0_c0_babdd"
                    @tap.stop="handleJumpDiy"
                    data-type="navigateTo"
                    :data-url="`/pages/fl/shopDetail/shopDetail?id=${dataGoodsList[waterfallIndex].aid}`"
                    :key="waterfallIndex"
                  >
                    <image class="shopping_fd6_0_c0_c0_babdd" mode="widthFix" :src="dataGoodsList[waterfallIndex].thumb"></image>
                    <text class="shopping_fd6_0_c0_c1_babdd">{{ dataGoodsList[waterfallIndex].name }}</text>
                    <view class="flex flex-wrap align-center shopping_fd6_0_c0_c2_babdd">
                      <text class="shopping_fd6_0_c0_c2_c0_babdd">{{ $t('￥') }}</text>
                      <text class="shopping_fd6_0_c0_c2_c1_babdd">
                        <text class="shopping_price1_fd6_0_c0_c2_c1_babdd">{{ dataGoodsList[waterfallIndex].shop_price | frontPrice }}</text>
                        <text class="shopping_price2_fd6_0_c0_c2_c1_babdd">{{ dataGoodsList[waterfallIndex].shop_price | laterPrice }}</text>
                      </text>
                    </view>
                    <view class="flex flex-wrap align-center shopping_fd6_0_c0_c3_babdd">
                      <text class="shopping_fd6_0_c0_c3_c0_babdd">{{ $t('￥') }}</text>
                      <text class="shopping_fd6_0_c0_c3_c0_babdd">{{ dataGoodsList[waterfallIndex].market_price }}</text>
                      <text class="shopping_fd6_0_c0_c3_c2_babdd">{{ $t('销量') }}</text>
                      <text class="shopping_fd6_0_c0_c3_c3_babdd">{{ dataGoodsList[waterfallIndex].sales_sum }}</text>
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
    <view   class='flex flex-direction flex-wrap align-stretch shopping_fd6_1_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"    :key='key0'>
        <image class='shopping_fd6_1_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'></image>
<text class='shopping_fd6_0_c0_c1_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center shopping_fd6_0_c0_c2_babdd'      >
        <text class='shopping_fd6_1_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' shopping_fd6_1_c0_c2_c1_babdd'   >
    <text class=' shopping_price1_fd6_0_c0_c2_c1_babdd' >{{ item.shop_price | frontPrice }}</text><text class=' shopping_price2_fd6_0_c0_c2_c1_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
    <view   class='flex flex-wrap align-center shopping_fd6_1_c0_c2_c2_babdd'    v-if= " item.discounts>money"  >
            <view   class='flex flex-wrap align-center shopping_fd6_1_c0_c2_c2_c0_babdd'      >
        </view>
<text class='shopping_fd6_1_c0_c2_c2_c1_babdd'  >{{item.discounts}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center shopping_fd6_0_c0_c3_babdd'      >
        <text class='shopping_fd6_0_c0_c3_c0_babdd'  >{{$t('￥')}}</text>
<text class='shopping_fd6_0_c0_c3_c0_babdd'  >{{item.market_price}}</text>
<text class='shopping_fd6_1_c0_c3_c2_babdd'  >{{$t('销量')}}</text>
<text class='shopping_fd6_0_c0_c3_c3_babdd'  >{{item.sales_sum}}</text>
</view>
    <view   class='flex flex-wrap align-center shopping_fd6_1_c0_c4_babdd'    v-if= " item.share_award_money>0"  >
        <image class='shopping_fd6_1_c0_c4_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"813.png"'></image>
<text class='shopping_fd6_1_c0_c4_c1_babdd'  >{{$t('分享赚')}}</text>
<text class='shopping_fd6_1_c0_c4_c1_babdd'  >{{$t('￥')}}</text>
<text class='shopping_fd6_1_c0_c4_c3_babdd'  >{{item.share_award_money}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
 -->
        <view class="flex flex-wrap align-center shopping_fd6_2_babdd"></view>
      </view>

      <!---flex布局flex布局结束-->
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
      waterfallsfd6_0: [],
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      dataList: [],
      /** is_edit【是否编辑】 **/ is_edit: false,
      cart_ids: '',
      /** goods_id【商品id】 **/ goods_id: '',
      /** store_aid【店铺id】 **/ store_aid: '',
      /** sku_name【商品规格】 **/ sku_name: '',
      /** num【商品数量】 **/ num: '',
      /** cart_id【购物车id】 **/ cart_id: '',
      /** clickSkuAction【选中的多规格】 **/ clickSkuAction: '',
      /** sku_name_sku【规格id】 **/ sku_name_sku: '',
      /** buy_num【购买数量】 **/ buy_num: '',
      goodsDetails: [],
      /** dataDetail【商品详情】
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
      },
      /** shopsku_id【选中商品规格name】 **/ shopsku_id: '',
      /** shopsku_name【选中商品多规格名称】 **/ shopsku_name: '',
      /** shopnum【商品购买数量】 **/ shopnum: 0,
      tabs: '1',
      dataGoodsList: [],
      index: 0,
      navCentral: [],
      rightAdvertisement: [],
      leftAdvertisement: [],
      groupingShop: [],
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
      /** tjStatus【猜你喜欢分类id】 **/ tjStatus: '3',
      goods_type: '2',
      tjStatusType: [
        {
          name: '猜你喜欢',
          value: '3',
          image: '',
        },
        {
          name: '首发新品',
          value: '4',
          image: '',
        },
        {
          name: '热门推荐',
          value: '2',
          image: '',
        },
      ],
      money: 0,
      /** dataNum【购物车数量】
       *   count【购物车数量】 **/
      dataNum: {
        count: '',
      },
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
    isLogin() {
      return this.$store.state.token == '' ? false : true
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
  watch: {},
  onLoad(options) {
    this.getShopListFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getCarListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getCarListFunc()
    this.getShopListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //获取购物车列表
    async getCarListFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证

        let datadataList = await this.$api.post(global.apiUrls.post62bebd70c4bad, {})

        if (datadataList.data.code != 1) {
          this.$message.info(datadataList.data.msg)
          return
        }
        let infodataList = datadataList.data
        this.dataList = infodataList.data

        //更新购物车数量
        this.$store.dispatch('getCartList')
        this.getShoppingnumFunc()
      }
    },
    //移入收藏夹
    async addCollectFunc() {
      //请求方法
      //数据验证

      let data62c0087912574 = await this.$api.post(global.apiUrls.post62c0087912574, {
        cart_ids: this.cart_ids,
      })

      if (data62c0087912574.data.code != 1) {
        this.$message.info(data62c0087912574.data.msg)
        return
      }
      let info62c0087912574 = data62c0087912574.data

      this.getCarListFunc()
      //this.$store.dispatch('getCartList')
    },
    //是否编辑
    editTabFunc() {
      if (this.is_edit === true) {
        this.is_edit = false
      } else {
        this.is_edit = true
      }
    },
    //删除购物车
    async deleteCartsFunc() {
      //请求方法
      //数据验证

      let data62beb3fca0209 = await this.$api.post(global.apiUrls.post62beb3fca0209, {
        cart_ids: this.cart_ids,
      })

      if (data62beb3fca0209.data.code != 1) {
        this.$message.info(data62beb3fca0209.data.msg)
        return
      }
      let info62beb3fca0209 = data62beb3fca0209.data

      this.getCarListFunc()
    },
    //获取商品列表
    getShopListFunc() {
      this.$refs.waterfalls1706939363764?.refresh()
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
    //修改购物车数量
    async editCartNumFunc() {
    
      //请求方法
      //数据验证

      let data64144ab8dc6c6 = await this.$api.post(global.apiUrls.post64144ab8dc6c6, {
        cart_id: this.cart_id,
        num: this.num,
      })

      if (data64144ab8dc6c6.data.code != 1) {
        this.$message.info(data64144ab8dc6c6.data.msg)
        return
      }
      let info64144ab8dc6c6 = data64144ab8dc6c6.data

      this.getCarListFunc()
      //this.$store.dispatch('getCartList')
    },
    //确认选择规格
    async confirmSelectionFunc() {
      //请求方法
      //数据验证

      let data641312cc712d2 = await this.$api.post(global.apiUrls.post641312cc712d2, {
        cart_id: this.cart_id,
        sku_id: this.sku_name_sku,
        sku_name: this.shopsku_id,
        shop_price: this.dataDetail.shop_price,
        num: this.num,
      })

      if (data641312cc712d2.data.code != 1) {
        this.$message.info(data641312cc712d2.data.msg)
        return
      }
      let info641312cc712d2 = data641312cc712d2.data

      this.getCarListFunc()
      this.$refs.specsPopup1706595992726.close()
    },
    //获取商品详情多规格
    async editSkuFunc() {
      //请求方法
      //数据验证

      let datadataDetail = await this.$api.get(global.apiUrls.post641987361d887, {
        goods_id: this.goods_id,
      })

      if (datadataDetail.data.code != 1) {
        this.$message.info(datadataDetail.data.msg)
        return
      }
      let infodataDetail = datadataDetail.data
      this.dataDetail = infodataDetail.data

      this.$refs.specsPopup1706595992726.open('confirm')
    },
    //点击店铺
    clickStoreFunc() {
      this.$urouter.navigateTo(`/pages/fl/shopIndex/shopIndex?usermerchant_aid=${this.store_aid}`)
    },
    //点击跳转商品详情
    goToGoodsDetailFunc() {
      this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${this.goods_id}&goods_id=${this.goods_id}`)
    },
    //跳转确认订单
    ConfirmOrderFunc() {
      this.$urouter.navigateTo(`/pages/ddgl/directOrder/directOrder?cartid=${this.cart_ids}`)
    },
    //获取购物车数量
    async getShoppingnumFunc() {
      if (this.isLogin === false) {
        return
      }
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

  .shopping_flex_6_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .shopping_fd6_0_c0_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto;
      margin: 0rpx 0rpx 20rpx 0rpx;
      border-radius: 16rpx;
      padding: 0rpx 0rpx 15rpx 0rpx;

      .shopping_fd6_0_c0_c0_babdd {
        width: 100%;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
      }
    }

    .shopping_fd6_1_c0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      width: 344rpx;
      padding: 0rpx 0rpx 24rpx 0rpx;
      box-shadow: 0rpx 3rpx 30rpx #e8e8e8;
      margin: 0rpx 0rpx 20rpx 0rpx;

      .shopping_fd6_1_c0_c0_babdd {
        width: 346rpx;
        height: 346rpx;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
      }

      .shopping_fd6_1_c0_c4_babdd {
        margin: 16rpx 32rpx 0rpx 18rpx;
        height: 38rpx;
        background: url(#{image-path('812.png')
        }) no-repeat;
        background-size: 100% 100%;
        padding: 0rpx 0rpx 0rpx 40rpx;

        .shopping_fd6_1_c0_c4_c0_babdd {
          width: 22rpx;
          height: 22rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 12rpx 0rpx 0rpx;
        }

        .shopping_fd6_1_c0_c4_c3_babdd {
          color: rgba(177, 110, 5, 1);
          font-size: 4rpx;
          line-height: 36rpx;
        }
      }
    }

    .shopping_fd6_2_babdd {
      height: 43px;
    }
  }

  .shopping_fd6_0_c0_c1_babdd {
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

  .shopping_fd6_0_c0_c2_babdd {
    margin: 20rpx 20rpx 8rpx 20rpx;

    .shopping_fd6_0_c0_c2_c0_babdd {
      color: var(--benbenFontColor0);
      font-weight: 600;
      font-size: 24rpx;
    }

    .shopping_fd6_0_c0_c2_c1_babdd {
      color: var(--benbenFontColor0);
      font-weight: 700;
      font-size: 20rpx;
      line-height: 30rpx;
      margin: 6rpx 0rpx 0rpx 0rpx;
    }
  }

  .shopping_price1_fd6_0_c0_c2_c1_babdd {
    font-size: 32rpx;
  }

  .shopping_price2_fd6_0_c0_c2_c1_babdd {
    font-size: 20rpx;
  }

  .shopping_fd6_0_c0_c3_babdd {
    margin: 0rpx 20rpx 0rpx 20rpx;

    .shopping_fd6_0_c0_c3_c2_babdd {
      color: var(--benbenFontColor2);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 33rpx;
      margin: 0rpx 10rpx 0rpx auto;
    }
  }

  .shopping_fd6_0_c0_c3_c0_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    text-decoration: line-through;
  }

  .shopping_fd6_0_c0_c3_c3_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .shopping_fd6_1_c0_c2_c0_babdd {
    color: var(--benbenFontColor7);
    font-weight: 600;
    font-size: 24rpx;
  }

  .shopping_fd6_1_c0_c2_c1_babdd {
    color: var(--benbenFontColor7);
    font-weight: 700;
    font-size: 20rpx;
    line-height: 30rpx;
    margin: 6rpx 0rpx 0rpx 0rpx;
  }

  .shopping_fd6_1_c0_c2_c2_babdd {
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    border: 1px solid #f02325;
    margin: 0rpx 0rpx 0rpx 8rpx;

    .shopping_fd6_1_c0_c2_c2_c0_babdd {
      width: 37rpx;
      height: 30rpx;
      background: url(#{image-path('231.png')
    }) no-repeat;
      background-size: 100% auto !important;
    }

    .shopping_fd6_1_c0_c2_c2_c1_babdd {
      color: var(--benbenFontColor7);
      font-size: 20rpx;
      font-weight: 400;
      line-height: 28rpx;
      margin: 0rpx 4rpx 0rpx 4rpx;
    }
  }

  .shopping_fd6_1_c0_c3_c2_babdd {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 0rpx 0rpx 0rpx auto;
  }

  .shopping_fd6_1_c0_c4_c1_babdd {
    color: rgba(177, 110, 5, 1);
    font-size: 24rpx;
    line-height: 36rpx;
  }

  .shopping_flex_5_babdd {
    padding: 0rpx 0rpx 33rpx 0rpx;
    margin: -60rpx 0rpx 0rpx 0rpx;

    .shopping_fd5_1_babdd {
      font-size: 40rpx;
      font-weight: 600;
      color: #333;
      margin: 0rpx 24rpx 0rpx 24rpx;
    }
  }

  .shopping_fd5_0_babdd {
    width: 138rpx;
    height: 28rpx;
  }

  .shopping_flex_cart_4_babdd {
    --shop-icon-color: var(--benbenFontColor4);
    --nav-btn-bg: var(--benbenbtnColor0);
    --checked-active: var(--benbenFontColor4);
    --del-btn-color: var(--benbenFontColor3);
    --del-btn-bg: var(--benbenbgColor3);
    --submit-btn-bg: var(--benbenbtnColor0);
  }

  .shopping_shopCart0_0_babdd {
    padding: 0rpx 0rpx 24rpx 0rpx;
    height: 40vh;
  }

  .shopping_shopCart0_0_c0_babdd {
    width: 456rpx;
    height: 228rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .shopping_shopCart0_0_c1_babdd {
    font-size: 24rpx;
    color: var(--benbenFontColor1);
    margin: 0rpx 0rpx 40rpx 0rpx;
  }

  .shopping_shopCart0_0_c2_babdd {
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    width: 400rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
  }

  .shopping_flex_3_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto;
    padding: 32rpx;

    .shopping_fd3_0_babdd {
      color: var(--benbenFontColor0);

      .shopping_fd3_0_c1_babdd {
        margin: 0rpx 5rpx 0rpx 5rpx;
      }
    }

    .shopping_fd3_1_babdd {
      color: var(--benbenFontColor5);
      font-size: 32rpx;
      font-weight: 500;
      line-height: 50rpx;
    }

    .shopping_fd3_1_1_babdd {
      color: var(--benbenFontColor5);
      font-size: 32rpx;
      font-weight: 500;
      line-height: 50rpx;
      margin: 0rpx 32rpx 0rpx 0rpx;
    }
  }

  .shopping_flex_specs_1_babdd {
    --active-sku-tag-color: var(--benbenFontColor4);
    --active-sku-tag-bg: var(--benbenbgColor0);
    --sku-tag-color: var(--benbenFontColor0);
    --sku-tag-bg: var(--benbenbgColor2);
    --cart-btn-bg: var(--benbenbtnColor0);
    --buy-btn-bg: var(--benbenbtnColor4);
    --confirm-btn-bg: var(--benbenbtnColor0);
  }

  .shopping_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    .shopping_fd0_1_babdd {
      color: var(--benbenFontColor0);
      font-size: 36rpx;
      font-weight: 500;
      line-height: 50rpx;
    }
  }

  .shopping_fd0_0_babdd {
    height: 88rpx;
    width: 240rpx;
  }

  .shopping_fd0_2_c0_c0_babdd {
    color: var(--benbenFontColor5);
    font-size: 32rpx;
    font-weight: 500;
    line-height: 50rpx;
    margin: 0rpx 32rpx 0rpx 0rpx;
  }
}
</style>
