<template>
  <page-body :loading="benbenPageloading">
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex myTrack_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub myTrack_fd0_0_babdd">
          <view class="flex align-center myTrack_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 myTrack_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex align-center">
            <text class="myTrack_fd0_0_c1_c0_babdd">{{ $t('我的足迹') }}</text>
          </view>
          <view
            class="flex align-center justify-end myTrack_fd0_0_c0_babdd"
            :style="{ 'margin-right': `${appSystemIdentification == 'Wechat' ? '30%' : ''}` }"
          >
            <view class="flex flex-wrap align-center" @tap.stop="switchTypeFunc()" v-if="appSystemIdentification != 'Wechat'">
              <text class="myTrack_fd0_0_c2_c0_c0_babdd" v-if="dataList.length != 0 && is_edit === false">{{ $t('编辑') }}</text>
              <text class="myTrack_fd0_0_c2_c0_c0_babdd" v-if="is_edit === true && dataList.length != 0">{{ $t('完成') }}</text>
            </view>
          </view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1691652180194" :mask="true" :mask-close-able="true" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <benben-calendar-diy
            mode="range"
            year-arrow-color="#666666"
            month-arrow-color="#666666"
            start-text=" "
            end-text=" "
            active-bg-color="rgba(45, 175, 65, 1)"
            range-bg-color="rgba(45, 175, 65, 0.5)"
            :future="false"
            :change-title="true"
            :change-year="true"
            :change-month="true"
            class="myTrack_fd1_0_babdd"
            @change="queryListFunc()"
            :start-time.sync="start_time"
            :end-time.sync="end_time"
          ></benben-calendar-diy>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex benben-flex-layout flex-wrap align-center myTrack_flex_2_babdd" v-if="dataList.length > 0 || start_time || end_time">
        <view class="flex flex-wrap align-center justify-center myTrack_fd2_0_babdd" @tap.stop="popupShow1691652180194 = true">
          <text>{{ start_time }}</text>
          <text v-if="start_time != ''">~</text>
          <text>{{ end_time }}</text>
          <text class="flex-sub myTrack_fd2_0_c3_babdd" v-if="start_time == ''">{{ $t('选择时间') }}</text>
          <image class="myTrack_fd2_0_c4_babdd" mode="aspectFit" :src="STATIC_URL + '479.png'" v-if="start_time == ''"></image>
          <image
            class="myTrack_fd2_0_c4_babdd"
            mode="aspectFit"
            :src="STATIC_URL + '85.png'"
            @tap.stop="dltDateFunc()"
            v-if="start_time != ''"
          ></image>
        </view>
        <view class="flex align-center myTrack_fd2_1_babdd" @tap.stop="switchTypeFunc()" v-if="appSystemIdentification == 'Wechat'">
          <text class="myTrack_fd2_1_c0_babdd" v-if="dataList.length != 0 && is_edit === false">{{ $t('编辑') }}</text>
          <text class="myTrack_fd2_1_c0_babdd" v-if="is_edit === true && dataList.length != 0">{{ $t('完成') }}</text>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex align-center benben-flex-layout myTrack_flex_3_babdd">
        <text>{{ $t('仅展示近三个月的数据') }}</text>
      </view>

      <!---flex布局flex布局结束-->
      <benben-goods-footprint
        time-format="MM月DD日"
        price-before="￥"
        :is-editor.sync="is_edit"
        :goods-list.sync="dataList"
        :goods-id.sync="shop_id"
        v-model="detele_id"
        @handleDel="openPopFunc()"
        @handleGoods="jumpFunc()"
      ></benben-goods-footprint>
      <benben-popup v-model="popupShow1720421246863" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---清除本地缓存flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center myTrack_fd5_0_babdd">
            <text class="myTrack_fd5_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="myTrack_fd5_0_c1_babdd">{{ $t('是否确认删除？') }}</text>
            <view class="flex align-center myTrack_fd5_0_c2_babdd">
              <button class="myTrack_fd5_0_c2_c0_babdd" @tap.stop="popupShow1720421246863 = false">{{ $t('取消') }}</button>
              <button class="myTrack_fd5_0_c2_c1_babdd" @tap.stop="deleteFootprintFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>

        <!---清除本地缓存flex布局结束-->
      </benben-popup>
      <!---订单列表flex布局开始-->
      <view
        class="flex flex-wrap align-center justify-center benben-flex-layout myTrack_flex_6_babdd"
        v-if="dataList.length <= 0 && dataGoodsList.length > 0"
      >
        <image class="myTrack_fd6_0_babdd" mode="aspectFit" :src="STATIC_URL + '748.png'"></image>
        <text class="myTrack_fd6_1_babdd">{{ $t('猜你喜欢') }}</text>
        <image class="myTrack_fd6_0_babdd" mode="aspectFit" :src="STATIC_URL + '749.png'"></image>
      </view>

      <!---订单列表flex布局结束-->
      <!---flex布局flex布局开始-->
      <view
        class="flex flex-direction flex-wrap align-stretch benben-flex-layout myTrack_flex_7_babdd"
        v-if="dataList.length <= 0 && dataGoodsList.length > 0"
      >
        <view class="flex flex-wrap align-center justify-between myTrack_fd7_0_babdd">
          <template v-for="(item, key0) in dataGoodsList">
            <view
              class="flex flex-direction flex-wrap align-stretch myTrack_fd7_0_c0_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"
              :key="key0"
            >
              <image class="myTrack_fd7_0_c0_c0_babdd" mode="aspectFill" :src="item.thumb"></image>
              <text class="myTrack_fd7_0_c0_c1_babdd">{{ item.name }}</text>
              <view class="flex flex-wrap align-center myTrack_fd7_0_c0_c2_babdd">
                <text class="myTrack_fd7_0_c0_c2_c0_babdd">{{ $t('销量') }}</text>
                <text class="myTrack_fd7_0_c0_c2_c1_babdd">{{ item.sales_sum }}</text>
              </view>
              <view class="flex flex-wrap align-center myTrack_fd7_0_c0_c3_babdd">
                <text class="myTrack_fd7_0_c0_c3_c0_babdd">{{ $t('￥') }}</text>
                <text class="myTrack_fd7_0_c0_c3_c1_babdd">
                  <text class="myTrack_price1_fd7_0_c0_c3_c1_babdd">{{ item.shop_price | frontPrice }}</text>
                  <text class="myTrack_price2_fd7_0_c0_c3_c1_babdd">{{ item.shop_price | laterPrice }}</text>
                </text>
                <view class="flex flex-wrap align-center">
                  <text class="myTrack_fd7_0_c0_c3_c2_c0_babdd">￥</text>
                  <text class="myTrack_fd7_0_c0_c3_c2_c1_babdd">{{ item.market_price }}</text>
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
      popupShow1720421246863: false,
      popupShow1691652180194: false,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      dataList: [],
      is_edit: false,
      /** shop_id【商品id】 **/ shop_id: '',
      detele_id: '',
      true: true,
      falses: false,
      start_time: '',
      end_time: '',
      dataGoodsList: [],
      /** benbenPageloading【页面加载状态】 **/ benbenPageloading: true,
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
  },
  watch: {},
  onLoad(options) {},
  onUnload() {},
  onReady() {},
  onShow() {
    this.queryListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.queryListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //切换编辑状态
    switchTypeFunc() {
      if (this.is_edit === false) {
        this.is_edit = this.true
        return
      }
      if (this.is_edit === true) {
        this.is_edit = this.falses
        return
      }
    },
    //点击商品
    jumpFunc() {
      this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${this.shop_id}&goods_id=${this.shop_id}`)
    },
    //获取为你推荐
    getGoosListFunc() {
      if (this.dataList.length <= 0) {
        this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3
        this.pageingListApiMethod = 'get'
        this.allowOnloadGetList = false
        this.pagingListPostDataContent = {
          goods_type: '2',
        }
        this.listData = []
        this.dataGoodsList = this.listData
        this.pagingListToggle()
      }
    },
    //删除足迹
    async deleteFootprintFunc() {
      //请求方法
      //数据验证

      let data64145e74b3a92 = await this.$api.get(global.apiUrls.post64145e74b3a92, {
        aid: this.detele_id,
      })

      if (data64145e74b3a92.data.code != 1) {
        this.$message.info(data64145e74b3a92.data.msg)
        return
      }
      let info64145e74b3a92 = data64145e74b3a92.data

      this.queryListFunc()
      this.popupShow1720421246863 = false
    },
    //获取足迹列表
    async queryListFunc() {
      //请求方法
      //数据验证

      let datadataList = await this.$api.get(global.apiUrls.post64145c1253b3e, {
        start_time: this.start_time,
        end_time: this.end_time,
      })

      if (datadataList.data.code != 1) {
        this.$message.info(datadataList.data.msg)
        return
      }
      let infodataList = datadataList.data
      this.dataList = infodataList.data

      this.benbenPageloading = false
      if (this.dataList.length == 0) {
        this.getGoosListFunc()
        this.is_edit = false
      }
      this.popupShow1691652180194 = false
    },
    //打开删除弹框
    openPopFunc() {
      this.popupShow1720421246863 = true
    },
    //清除时间
    dltDateFunc() {
      this.start_time = ''
      this.end_time = ''
      this.queryListFunc()
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
  background: #fff;
  background-size: 100% auto;

  .myTrack_flex_7_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .myTrack_fd7_0_babdd {
      margin: 0rpx 0rpx 0rpx 0rpx;

      .myTrack_fd7_0_c0_babdd {
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        background: #ffffff;
        width: 344rpx;
        padding: 0rpx 0rpx 24rpx 0rpx;
        box-shadow: 0rpx 3rpx 30rpx #e8e8e8;
        margin: 0rpx 0rpx 20rpx 0rpx;

        .myTrack_fd7_0_c0_c0_babdd {
          width: 346rpx;
          height: 346rpx;
          border-radius: 16rpx 16rpx 0rpx 0rpx;
        }

        .myTrack_fd7_0_c0_c1_babdd {
          color: #333333;
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

        .myTrack_fd7_0_c0_c2_babdd {
          margin: 16rpx 20rpx 16rpx 20rpx;

          .myTrack_fd7_0_c0_c2_c0_babdd {
            color: #999999;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 33rpx;
            margin: 0rpx 10rpx 0rpx 0rpx;
          }

          .myTrack_fd7_0_c0_c2_c1_babdd {
            color: #999999;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 33rpx;
          }
        }

        .myTrack_fd7_0_c0_c3_babdd {
          margin: 0rpx 20rpx 0rpx 20rpx;

          .myTrack_fd7_0_c0_c3_c0_babdd {
            color: #ef3a3a;
            font-weight: 600;
            font-size: 20rpx;
          }

          .myTrack_fd7_0_c0_c3_c1_babdd {
            color: #ff5536;
            font-weight: 700;
            font-size: 20rpx;
            line-height: 30rpx;
            margin: 6rpx 0rpx 0rpx 0rpx;

            .myTrack_price1_fd7_0_c0_c3_c1_babdd {
              font-size: 32rpx;
              font-weight: 700;
            }

            .myTrack_price2_fd7_0_c0_c3_c1_babdd {
              font-size: 22rpx;
            }
          }

          .myTrack_fd7_0_c0_c3_c2_c0_babdd {
            font-size: 24rpx;
            color: var(--benbenFontColor2);
            text-decoration: line-through;
            margin: 5rpx 0rpx 0rpx 10rpx;
          }

          .myTrack_fd7_0_c0_c3_c2_c1_babdd {
            color: #b2b2b2;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 33rpx;
            text-decoration: line-through;
            margin: 0rpx 0rpx -8rpx 0rpx;
          }
        }
      }
    }
  }

  .myTrack_flex_6_babdd {
    padding: 51rpx 0rpx 33rpx 0rpx;

    .myTrack_fd6_1_babdd {
      font-size: 40rpx;
      font-weight: 600;
      color: #333;
      margin: 0rpx 24rpx 0rpx 24rpx;
    }
  }

  .myTrack_fd6_0_babdd {
    width: 138rpx;
    height: 28rpx;
  }

  .myTrack_fd5_0_babdd {
    width: 540rpx;
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .myTrack_fd5_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: #333333;
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .myTrack_fd5_0_c1_babdd {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .myTrack_fd5_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .myTrack_fd5_0_c2_c0_babdd {
        font-size: 32rpx;
        background: #fff;
        color: rgba(153, 153, 153, 1);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid #eee;
      }

      .myTrack_fd5_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbgColor1);
        color: var(--benbenFontColor5);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
      }
    }
  }

  .myTrack_flex_3_babdd {
    padding: 0 24rpx 8rpx;
    font-size: 24rpx;
    color: #999;
  }

  .myTrack_flex_2_babdd {
    padding: 24rpx 32rpx 24rpx 32rpx;

    .myTrack_fd2_0_babdd {
      width: 400rpx;
      height: 56rpx;
      border: 1px solid rgba(191, 191, 191, 1);
      border-radius: 8rpx;
      padding: 0rpx 20rpx 0rpx 20rpx;

      .myTrack_fd2_0_c3_babdd {
        text-align: center;
        font-size: 24rpx;
      }
    }

    .myTrack_fd2_1_babdd {
      margin: 0rpx 0rpx 0rpx auto;
    }
  }

  .myTrack_fd2_0_c4_babdd {
    width: 30rpx;
    height: 30rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 4rpx 0rpx 0rpx auto;
  }

  .myTrack_fd2_1_c0_babdd {
    font-size: 32rpx;
    font-weight: 400;
    color: #333;
  }

  .myTrack_fd1_0_babdd {
    width: 640rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 12rpx 012rpx 012rpx 012rpx;
    --active-bg-color: var(--benbenbgColor7);
    --range-bg-color: var(--benbenbgColor3);
  }

  .myTrack_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .myTrack_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .myTrack_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
      }
    }
  }

  .myTrack_fd0_0_c0_babdd {
    width: 120rpx;

    .myTrack_fd0_0_c0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .myTrack_fd0_0_c2_c0_c0_babdd {
    font-size: 32rpx;
    font-weight: 400;
    color: #333;
  }
}
</style>
