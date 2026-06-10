<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex invoicesManagement_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub invoicesManagement_fd0_0_dija">
          <view class="flex align-center invoicesManagement_fd0_0_c0_dija" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 invoicesManagement_fd0_0_c0_c0_dija">&#xE794;</text>
          </view>
          <view class="flex align-center">
            <text class="invoicesManagement_fd0_0_c1_c0_dija">{{ $t('发票管理') }}</text>
          </view>
          <view class="flex align-center invoicesManagement_fd0_0_c0_dija"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex benben-flex-layout flex-wrap align-center">
        <view>
          <benben-flex-tabs
            class-text="invoicesManagement_benbenTabsfd1_0_dija"
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
            @change="getTabDataListFunc()"
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
                    :class="{ checkTitlefd1_0_dija: tabs == '1', 'flex flex-wrap align-center': true }"
                    @tap="tabs = '1'"
                    :id="`benben_tabsfd1_0-title-item-${'1'}`"
                  >
                    <text>{{ $t('抬头管理') }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_dija: tabs == '2', 'flex flex-wrap align-center': true }"
                    @tap="tabs = '2'"
                    :id="`benben_tabsfd1_0-title-item-${'2'}`"
                  >
                    <text>{{ $t('已开发票') }}</text>
                  </view>
                </view>
                <view
                  :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth }"
                  id="benben_tabsfd1_0-line"
                  class="benben-tabs-line flex benben-flex-tabs-line invoicesManagement_linefd1_0_dija"
                  :class="{ 'benben-tabs-line-active': tabsInfofd1_0.isInit }"
                ></view>
              </view>
            </scroll-view>
          </benben-flex-tabs>
        </view>
      </view>
      <!---flex布局flex布局结束-->
      <view class="flex flex-direction align-stretch benben-flex-layout invoicesManagement_flex_2_dija" v-if="tabs == '1'">
        <template v-for="(item, key0) in dataList">
          <view class="invoicesManagement_header-card" @tap.stop="handleClickFunc(item.aid)" :key="key0">
            <view class="invoicesManagement_card-header">
              <view class="flex align-center invoicesManagement_card-title-row">
                <text class="invoicesManagement_card-name">{{ item.username }}</text>
                <view class="invoicesManagement_card-badge" style="margin-left: auto">
                  <text v-if="item.type == '1'">{{ $t('个人') }}</text>
                  <text v-if="item.type == '2'">{{ $t('公司') }}</text>
                </view>
                <!-- <view class="invoicesManagement_default-tag" v-if="item.is_default == '1'">
                  <text>{{ $t('默认') }}</text>
                </view> -->
              </view>
            </view>
            <view class="invoicesManagement_card-body">
              <view class="invoicesManagement_info-row">
                <text class="invoicesManagement_info-label">{{ $t('联系邮箱') }}</text>
                <text class="invoicesManagement_info-value">{{ item.email }}</text>
              </view>
              <view class="invoicesManagement_info-row">
                <text class="invoicesManagement_info-label">{{ $t('联系电话') }}</text>
                <text class="invoicesManagement_info-value">{{ item.mobile }}</text>
              </view>
              <view class="invoicesManagement_info-row" v-if="item.type == '2'">
                <text class="invoicesManagement_info-label">{{ $t('公司税号') }}</text>
                <text class="invoicesManagement_info-value">{{ item.tax_number }}</text>
              </view>
            </view>
            <view class="flex align-center justify-between invoicesManagement_card-footer">
              <view class="flex align-center invoicesManagement_default-action" @tap.stop="SelectDefaultFunc(item.aid, item.is_default)">
                <image
                  class="invoicesManagement_fd2_0_c0_c4_c0_c0_dija"
                  mode="aspectFit"
                  :src="STATIC_URL + '448.png'"
                  v-if="item.is_default == '1'"
                ></image>
                <image
                  class="invoicesManagement_fd2_0_c0_c4_c0_c0_dija"
                  mode="aspectFit"
                  :src="STATIC_URL + '128.png'"
                  v-if="item.is_default != '1'"
                ></image>
                <text class="invoicesManagement_fd2_0_c0_c4_c0_c1_dija">{{ $t('默认发票') }}</text>
              </view>
              <view class="flex align-center invoicesManagement_card-actions">
                <view class="flex align-center invoicesManagement_action-item" @tap.stop="getAddressIdFunc(item.aid)">
                  <image class="invoicesManagement_fd2_0_c0_c4_c1_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '384.png'"></image>
                  <text class="invoicesManagement_fd2_0_c0_c4_c1_c0_c1_dija">{{ $t('删除') }}</text>
                </view>
                <view
                  class="flex align-center invoicesManagement_action-item"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"
                >
                  <image class="invoicesManagement_fd2_0_c0_c4_c1_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '385.png'"></image>
                  <text class="invoicesManagement_fd2_0_c0_c4_c1_c0_c1_dija">{{ $t('编辑') }}</text>
                </view>
              </view>
            </view>
          </view>
        </template>
        <benben-empty :list-data="dataList">
          <view>
            <view class="flex flex-direction flex-wrap align-center invoicesManagement_fd2_1_dija">
              <image class="invoicesManagement_fd2_1_c0_dija" mode="widthFix" :src="STATIC_URL + '423.png'"></image>
            </view>
          </view>
        </benben-empty>
        <view class="flex flex-wrap align-center justify-center invoicesManagement_fd2_2_dija">
          <button
            class="invoicesManagement_fd2_2_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fp/applyInvoic/applyInvoic`"
          >
            {{ $t('添加新的抬头') }}
          </button>
        </view>
      </view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout invoicesManagement_flex_3_dija" v-if="tabs == '2'">
        <template v-for="(item, key0) in RecordList">
          <view
            class="invoicesManagement_invoice-card"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fp/invoiceDetail/invoiceDetail?order_id=${item.order_id}`"
            :key="key0"
          >
            <view class="invoicesManagement_invoice-header">
              <view class="flex align-center justify-between invoicesManagement_invoice-header-top">
                <text class="invoicesManagement_store-name">{{ $t('订单号') }}：{{ item.order_sn || item.order_id || '--' }}</text>
                <view
                  class="invoicesManagement_status-badge"
                  :class="{
                    'invoicesManagement_status-done': item.invoice_status == '2',
                    'invoicesManagement_status-pending': item.invoice_status == '1',
                  }"
                >
                  <text>{{ item.invoice_status_text || (item.invoice_status == '2' ? $t('已开票') : $t('开票中')) }}</text>
                </view>
              </view>
              <!-- <text class="invoicesManagement_order-sn">{{ $t('订单号') }}：{{ item.order_sn || item.order_id || '--' }}</text> -->
            </view>

            <view class="invoicesManagement_invoice-content" v-if="item.goods_info && item.goods_info.length">
              <view class="flex align-stretch invoicesManagement_goods-item-row" v-for="(child, key1) in item.goods_info" :key="key1">
                <image class="invoicesManagement_goods-thumb" mode="aspectFill" :src="child.goods_thumb"></image>
                <view class="flex flex-direction flex-sub invoicesManagement_goods-info">
                  <text class="invoicesManagement_goods-name">{{ child.goods_name }}</text>
                  <text class="invoicesManagement_goods-sku" v-if="child.sku_name">{{ child.sku_name }}</text>
                  <view class="flex align-center justify-between invoicesManagement_goods-price-row">
                    <view class="flex align-center invoicesManagement_goods-price-wrap">
                      <text class="invoicesManagement_goods-price-symbol">{{ $t('￥') }}</text>
                      <text class="invoicesManagement_goods-price">
                        <text class="invoicesManagement_goods-price-int">{{ child.shop_price | frontPrice }}</text>
                        <text class="invoicesManagement_goods-price-dec">{{ child.shop_price | laterPrice }}</text>
                      </text>
                    </view>
                    <text class="invoicesManagement_goods-num">x{{ child.num }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- <view class="invoicesManagement_invoice-meta">
              <view class="flex align-center invoicesManagement_meta-type">
                <text class="invoicesManagement_meta-tag">{{ $t('电子发票') }}</text>
                <text class="invoicesManagement_meta-type-text">{{ item.invoice_type_text }}</text>
              </view>
              <view class="invoicesManagement_info-row">
                <text class="invoicesManagement_info-label">{{ $t('抬头名称') }}</text>
                <text class="invoicesManagement_info-value">{{ item.invoice_title }}</text>
              </view>
              <view class="flex align-center justify-between invoicesManagement_price-row">
                <text class="invoicesManagement_price-label">{{ $t('开票金额') }}</text>
                <view class="invoicesManagement_price-value">
                  <text class="invoicesManagement_price-symbol">￥</text>
                  <text class="invoicesManagement_price1_fd3_0_c2_c1_c1_dija">{{ item.invoice_price | frontPrice }}</text>
                  <text class="invoicesManagement_price2_fd3_0_c2_c1_c1_dija">{{ item.invoice_price | laterPrice }}</text>
                </view>
              </view>
            </view> -->

            <view class="flex align-center justify-between invoicesManagement_invoice-footer">
              <text class="invoicesManagement_detail-text">{{ $t('查看详情') }}</text>
              <text class="fu-iconfont2 invoicesManagement_detail-arrow">&#xe792;</text>
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
      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1661425659576" :mask="true" :mask-close-able="true" mode="center">
        <!---删除地址弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center invoicesManagement_flex_4_dija">
          <text class="invoicesManagement_fd4_0_dija">{{ $t('提示') }}</text>
          <text class="invoicesManagement_fd4_1_dija">{{ $t('确定删除该发票？') }}</text>
          <view class="flex align-center invoicesManagement_fd4_2_dija">
            <button class="invoicesManagement_fd4_2_c0_dija" @tap.stop="popupShow1661425659576 = false">{{ $t('取消') }}</button>
            <button class="invoicesManagement_fd4_2_c1_dija" @tap.stop="deleteAddressFunc()">{{ $t('确定') }}</button>
          </view>
        </view>
        <!---删除地址弹窗flex布局结束-->
      </benben-popup>
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
      popupShow1661425659576: false,
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
      address_ids: '',
      /** switch_id【抛出id】 **/ switch_id: '',
      invoiceList: '',
      tabs: '1',
      /** RecordList【开票记录】 **/ RecordList: [],
      is_change: '',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { is_change } = options
    if (is_change !== undefined) this.is_change = is_change
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getTabDataListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //抛出选择的地址
    handleClickFunc(aid) {
      if (this.is_change == '1') {
        this.switch_id = aid
        uni.$emit('isokaddid', this.switch_id)
        setTimeout(() => {
          this.$urouter.navigateBack(1)
        }, 500)
      }
    },
    //地址管理-地址列表
    async getListFunc() {
      //请求方法
      //数据验证
      let datadataList = await this.$api.post(global.apiUrls.post641848d371e2f, {})
      if (datadataList.data.code != 1) {
        this.$message.info(datadataList.data.msg)
        return
      }
      let infodataList = datadataList.data
      this.dataList = infodataList.data
    },
    //获取地址id
    getAddressIdFunc(id) {
      this.address_ids = id
      this.popupShow1661425659576 = true
    },
    //删除地址
    async deleteAddressFunc() {
      //请求方法
      //数据验证
      let data641ec9d300c00 = await this.$api.post(global.apiUrls.post641ec9d300c00, {
        aid: this.address_ids,
      })
      if (data641ec9d300c00.data.code != 1) {
        this.$message.info(data641ec9d300c00.data.msg)
        return
      }
      let info641ec9d300c00 = data641ec9d300c00.data
      this.popupShow1661425659576 = false
      this.getListFunc()
      uni.showToast({
        title: this.$t('删除成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
    },
    //选择默认
    async SelectDefaultFunc(defaulitID, defaulitid) {
      if (defaulitid != '1') {
        //请求方法
        //数据验证
        let data647efc94037dd = await this.$api.post(global.apiUrls.post647efc94037dd, {
          aid: defaulitID,
        })
        if (data647efc94037dd.data.code != 1) {
          this.$message.info(data647efc94037dd.data.msg)
          return
        }
        let info647efc94037dd = data647efc94037dd.data
        uni.showToast({
          title: this.$t('设置成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.getListFunc()
      }
    },
    //获取开票记录
    getRecordListFunc() {
      this.minixPagingListsApi = global.apiUrls.post66f22e1c95f85
      this.pageingListApiMethod = 'post'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {}
      this.listData = []
      this.RecordList = this.listData
      this.pagingListToggle()
    },
    //获取tabs数据
    getTabDataListFunc() {
      if (this.tabs == '1') {
        this.getListFunc()
      } else {
        this.getRecordListFunc()
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
  background: #f8f8f8;
  background-size: 100% auto;

  .invoicesManagement_flex_4_dija {
    margin: 0rpx 105rpx 0rpx 105rpx;
    background: #fff;
    background-size: #eee;
    border-radius: 25rpx 25rpx 25rpx 25rpx;
    padding: 40rpx 0rpx 0rpx 0rpx;

    .invoicesManagement_fd4_0_dija {
      color: #333333;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 45rpx;
    }

    .invoicesManagement_fd4_1_dija {
      font-size: 32rpx;
      font-weight: 400;
      line-height: 52rpx;
      color: #333333;
      margin: 40rpx 40rpx 39rpx 40rpx;
      text-align: center;
    }

    .invoicesManagement_fd4_2_dija {
      border-top: 1px solid #eee;

      .invoicesManagement_fd4_2_c0_dija {
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: transparent;
        color: rgba(153, 153, 153, 1);
        border-right: 1px solid #eeeeee;
        height: 110rpx;
        line-height: 110rpx;
        width: 270rpx;
      }

      .invoicesManagement_fd4_2_c1_dija {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        font-size: 32rpx;
        background: var(--benbenbgColor1);
        color: var(--benbenFontColor5);
        width: 270rpx;
        height: 110rpx;
      }
    }
  }

  .invoicesManagement_header-card,
  .invoicesManagement_invoice-card {
    background: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
    border: 1rpx solid rgba(16, 24, 40, 0.04);
    overflow: hidden;
  }

  .invoicesManagement_card-header {
    padding: 28rpx 28rpx 0;
  }

  .invoicesManagement_card-title-row {
    min-width: 0;
    flex-wrap: wrap;
    gap: 12rpx;
  }

  .invoicesManagement_card-name {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44rpx;
    color: #1a1a1a;
    max-width: 100%;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoicesManagement_card-badge {
    flex-shrink: 0;
    padding: 4rpx 14rpx;
    border-radius: 8rpx;
    background: rgba(184, 36, 65, 0.08);

    text {
      font-size: 22rpx;
      line-height: 32rpx;
      color: var(--benbenFontColor5);
      font-weight: 500;
    }
  }

  .invoicesManagement_default-tag {
    flex-shrink: 0;
    padding: 4rpx 14rpx;
    border-radius: 8rpx;
    background: rgba(52, 199, 89, 0.1);

    text {
      font-size: 22rpx;
      line-height: 32rpx;
      color: #34c759;
      font-weight: 500;
    }
  }

  .invoicesManagement_card-body {
    padding: 20rpx 28rpx 0;
  }

  .invoicesManagement_info-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .invoicesManagement_info-label {
    flex-shrink: 0;
    width: 140rpx;
    font-size: 26rpx;
    line-height: 40rpx;
    color: #999999;
  }

  .invoicesManagement_info-value {
    flex: 1;
    min-width: 0;
    font-size: 26rpx;
    line-height: 40rpx;
    color: #333333;
    word-break: break-all;
  }

  .invoicesManagement_card-footer {
    margin-top: 24rpx;
    padding: 20rpx 28rpx 24rpx;
    border-top: 1rpx solid #f0f0f0;
  }

  .invoicesManagement_default-action {
    min-width: 0;
  }

  .invoicesManagement_card-actions {
    flex-shrink: 0;
    gap: 32rpx;
  }

  .invoicesManagement_action-item + .invoicesManagement_action-item {
    margin-left: 32rpx;
  }

  .invoicesManagement_flex_3_dija {
    padding: 24rpx 24rpx 150rpx;
  }

  .invoicesManagement_invoice-header {
    padding: 24rpx 24rpx 0;
  }

  .invoicesManagement_invoice-header-top {
    gap: 16rpx;
  }

  .invoicesManagement_store-name {
    flex: 1;
    min-width: 0;
    font-size: 30rpx;
    font-weight: 600;
    line-height: 42rpx;
    color: #1a1a1a;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoicesManagement_order-sn {
    display: block;
    margin-top: 8rpx;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #999999;
  }

  .invoicesManagement_invoice-content {
    margin: 20rpx 24rpx 0;
    padding: 0 16rpx;
    background: #f8f9fb;
    border-radius: 16rpx;
    overflow: hidden;
  }

  .invoicesManagement_goods-item-row {
    padding: 16rpx 0;

    & + .invoicesManagement_goods-item-row {
      border-top: 1rpx solid #eeeeee;
    }
  }

  .invoicesManagement_goods-thumb {
    flex-shrink: 0;
    width: 140rpx;
    height: 140rpx;
    border-radius: 12rpx;
    background: #ffffff;
    margin-right: 20rpx;
  }

  .invoicesManagement_goods-info {
    min-width: 0;
    justify-content: space-between;
    padding: 4rpx 0;
  }

  .invoicesManagement_goods-name {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoicesManagement_goods-sku {
    margin-top: 8rpx;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #999999;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoicesManagement_goods-price-row {
    margin-top: 12rpx;
    align-items: baseline;
  }

  .invoicesManagement_goods-price-wrap {
    align-items: baseline;
    min-width: 0;
  }

  .invoicesManagement_goods-num {
    flex-shrink: 0;
    margin-left: 16rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    color: #999999;
  }

  .invoicesManagement_goods-price-symbol {
    font-size: 24rpx;
    line-height: 36rpx;
    color: var(--benbenFontColor0);
    font-weight: 600;
  }

  .invoicesManagement_goods-price {
    color: var(--benbenFontColor0);
    font-weight: 600;
  }

  .invoicesManagement_goods-price-int {
    font-size: 32rpx;
    line-height: 40rpx;
  }

  .invoicesManagement_goods-price-dec {
    font-size: 24rpx;
    line-height: 40rpx;
  }

  .invoicesManagement_status-badge {
    flex-shrink: 0;
    padding: 6rpx 16rpx;
    border-radius: 999rpx;

    text {
      font-size: 22rpx;
      line-height: 32rpx;
      font-weight: 500;
    }
  }

  .invoicesManagement_status-done {
    background: rgba(52, 199, 89, 0.1);

    text {
      color: #34c759;
    }
  }

  .invoicesManagement_status-pending {
    background: rgba(255, 149, 0, 0.1);

    text {
      color: #ff9500;
    }
  }

  .invoicesManagement_invoice-meta {
    padding: 20rpx 24rpx 0;
  }

  .invoicesManagement_meta-type {
    margin-bottom: 12rpx;
    gap: 12rpx;
  }

  .invoicesManagement_meta-tag {
    flex-shrink: 0;
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    font-size: 22rpx;
    line-height: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor5);
    background: rgba(184, 36, 65, 0.08);
  }

  .invoicesManagement_meta-type-text {
    font-size: 26rpx;
    line-height: 36rpx;
    color: #666666;
  }

  .invoicesManagement_price-row {
    margin-top: 4rpx;
    padding-top: 16rpx;
    border-top: 1rpx solid #f0f0f0;
  }

  .invoicesManagement_price-label {
    font-size: 26rpx;
    line-height: 40rpx;
    color: #999999;
  }

  .invoicesManagement_price-value {
    display: flex;
    align-items: baseline;
    color: var(--benbenFontColor0);
    font-weight: 600;
  }

  .invoicesManagement_price-symbol {
    font-size: 24rpx;
    line-height: 40rpx;
  }

  .invoicesManagement_price1_fd3_0_c2_c1_c1_dija {
    font-size: 36rpx;
    line-height: 44rpx;
  }

  .invoicesManagement_price2_fd3_0_c2_c1_c1_dija {
    font-size: 28rpx;
    line-height: 44rpx;
  }

  .invoicesManagement_invoice-footer {
    padding: 24rpx;
    margin-top: 16rpx;
    border-top: 1rpx solid #f0f0f0;
  }

  .invoicesManagement_detail-text {
    font-size: 26rpx;
    line-height: 36rpx;
    color: rgba(228, 57, 60, 1);
    font-weight: 500;
  }

  .invoicesManagement_detail-arrow {
    font-size: 24rpx;
    color: #cccccc;
  }

  .invoicesManagement_flex_2_dija {
    padding: 24rpx 24rpx 150rpx;

    .invoicesManagement_fd2_1_dija {
      width: 100%;
      padding: 50rpx 0rpx 50rpx 0rpx;

      .invoicesManagement_fd2_1_c0_dija {
        width: 400rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }

    .invoicesManagement_fd2_2_dija {
      width: 750rpx;
      position: fixed;
      left: 0rpx;
      bottom: calc(40rpx + var(--benben-window-bottom, 0px));

      .invoicesManagement_fd2_2_c0_dija {
        border-radius: 44rpx 44rpx 44rpx 44rpx;
        font-size: 32rpx;
        background: var(--benbenbgColor7);
        color: rgba(255, 255, 255, 1);
        width: 686rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-weight: 400;
      }
    }
  }

  .invoicesManagement_fd2_0_c0_c4_c0_c0_dija {
    width: 36rpx;
    height: 36rpx;
    margin: 0rpx 14rpx 0rpx 0rpx;
  }

  .invoicesManagement_fd2_0_c0_c4_c1_c0_c0_dija {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .invoicesManagement_fd2_0_c0_c4_c1_c0_c1_dija {
    line-height: 28rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
  }

  .checkTitlefd1_0_dija {
    font-weight: 700 !important;
    font-size: 28rpx !important;
    color: #333 !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }

  .invoicesManagement_linefd1_0_dija {
    width: 40rpx;
    height: 6rpx;
    top: 80rpx;
    background: var(--benbenbgColor3);
    background-size: 100% auto !important;
    border-radius: 16rpx;
  }

  .invoicesManagement_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .invoicesManagement_fd0_0_dija {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .invoicesManagement_fd0_0_c1_c0_dija {
        font-size: 36rpx;
        font-weight: 500;
        color: #333;
      }
    }
  }

  .invoicesManagement_fd0_0_c0_dija {
    width: 180rpx;

    .invoicesManagement_fd0_0_c0_c0_dija {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
}

::v-deep .invoicesManagement_benbenTabsfd1_0_dija {
  height: 90rpx;
  white-space: nowrap;
  background: #fff;
  text-align: center;
}
</style>
