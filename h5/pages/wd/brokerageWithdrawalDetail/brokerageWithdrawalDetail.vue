<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex brokerageWithdrawalDetail_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub brokerageWithdrawalDetail_fd0_0_dija">
          <view class="flex align-center brokerageWithdrawalDetail_fd0_0_c0_dija" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 brokerageWithdrawalDetail_fd0_0_c0_c0_dija">&#xE794;</text>
          </view>
          <view class="flex align-center">
            <text class="brokerageWithdrawalDetail_fd0_0_c1_c0_dija">{{ $t('提现明细') }}</text>
          </view>
          <view class="flex align-center justify-end brokerageWithdrawalDetail_fd0_0_c0_dija">
            <image
              class="brokerageWithdrawalDetail_fd0_0_c2_c0_dija"
              mode="aspectFit"
              src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/52073"
              @tap.stop="popupShow1691659136577 = true"
              v-if="appSystemIdentification != 'Wechat'"
            ></image>
          </view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex benben-flex-layout flex-wrap align-center brokerageWithdrawalDetail_flex_1_dija">
        <view
          class="flex flex-wrap align-center brokerageWithdrawalDetail_fd1_0_dija"
          @tap.stop="popupShow1691659136577 = true"
          v-if="appSystemIdentification == 'Wechat'"
        >
          <text>{{ start_time }}</text>
          <text v-if="start_time != ''">~</text>
          <text>{{ end_time }}</text>
          <text class="flex-sub brokerageWithdrawalDetail_fd1_0_c3_dija" v-if="start_time == ''">{{ $t('选择时间') }}</text>
          <image
            class="brokerageWithdrawalDetail_fd1_0_c4_dija"
            mode="aspectFit"
            src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/52073"
            v-if="start_time == ''"
          ></image>
          <image
            class="brokerageWithdrawalDetail_fd1_0_c4_dija"
            mode="aspectFit"
            src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51744"
            @tap.stop="dltDataFunc()"
            v-if="start_time != ''"
          ></image>
        </view>
      </view>
      <!---flex布局flex布局结束-->
      <!---明细列表flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout brokerageWithdrawalDetail_flex_2_dija">
        <template v-for="(item, key0) in dataMessage">
          <view class="flex align-center justify-between brokerageWithdrawalDetail_fd2_0_dija" :key="key0">
            <view class="flex flex-direction align-stretch flex-sub brokerageWithdrawalDetail_fd2_0_c0_dija">
              <text class="brokerageWithdrawalDetail_fd2_0_c0_c0_dija">{{ item.record_desc }}</text>
              <text class="brokerageWithdrawalDetail_fd2_0_c0_c1_dija">{{ item.create_time }}</text>
            </view>
            <view class="flex flex-direction align-center">
              <view class="flex flex-wrap align-center brokerageWithdrawalDetail_fd2_0_c1_c0_dija">
                <text>{{ item.record_total }}</text>
              </view>
              <view class="flex align-center brokerageWithdrawalDetail_fd2_0_c1_c1_dija">
                <text class="brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija">{{ item.status_text }}</text>
              </view>
              <!--     <view   class='flex align-center brokerageWithdrawalDetail_fd2_0_c1_c2_dija'    v-if= " item.check_status=='3'"  >
        <text class='brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija'    v-if= "item.check_status=='1'"  >{{$t('驳回原因：')}}</text><text class='brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija'    v-if= "item.check_status=='2'"  >{{$t('已到账')}}</text><text class='brokerageWithdrawalDetail_fd2_0_c1_c2_c0_2_dija'    v-if= "item.check_status=='3'"  >{{$t('审核驳回')}}</text>
<text class='brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija'    v-if= "item.check_status=='1'"  >{{item}}</text><text class='brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija'    v-if= "item.check_status=='2'"  >{{$t('已到账')}}</text><text class='brokerageWithdrawalDetail_fd2_0_c1_c2_c0_2_dija'    v-if= "item.check_status=='3'"  >{{$t('审核驳回')}}</text>
</view>
 -->
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
      <!---明细列表flex布局结束-->
      <benben-popup v-model="popupShow1691659136577" :mask="true" :mask-close-able="true" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <benben-calendar-diy
            mode="range"
            year-arrow-color="#666666"
            month-arrow-color="#666666"
            start-text=" "
            end-text=" "
            active-bg-color="#b82441"
            range-bg-color="rgba(184, 36, 65, 0.12)"
            :future="false"
            :change-title="true"
            :change-year="true"
            :change-month="true"
            class="brokerageWithdrawalDetail_fd3_0_dija"
            @change="getListFunc()"
            :start-time.sync="start_time"
            :end-time.sync="end_time"
          ></benben-calendar-diy>
        </view>
        <!---flex布局flex布局结束-->
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
      popupShow1691659136577: false,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      start_time: '',
      end_time: '',
      dataMessage: [],
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
  onLoad(options) {
    this.getListFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //钱包-提现明细
    getListFunc() {
      this.minixPagingListsApi = global.apiUrls.post62fcd753d6e53
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        start_time: this.start_time,
        end_time: this.end_time,
      }
      this.listData = []
      this.dataMessage = this.listData
      this.pagingListToggle()
      this.popupShow1691659136577 = false
    },
    //清除时间
    dltDataFunc() {
      this.start_time = ''
      this.end_time = ''
      this.getListFunc()
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

  .brokerageWithdrawalDetail_fd3_0_dija {
    width: 622rpx;
    background: #ffffff;
    border-radius: 24rpx;
    padding: 12rpx 012rpx 012rpx 012rpx;
    --active-bg-color: #b82441;
    --active-text-color: #fff;
    --range-bg-color: rgba(184, 36, 65, 0.12);
    --range-text-color: #333;
  }

  .brokerageWithdrawalDetail_flex_2_dija {
    padding: 0rpx 24rpx 24rpx 24rpx;
    background: transparent;
    background-size: 100% auto !important;

    .brokerageWithdrawalDetail_fd2_0_dija {
      padding: 28rpx 24rpx;
      margin-bottom: 16rpx;
      background: #fff;
      border-radius: 16rpx;
      border-bottom: none !important;

      .brokerageWithdrawalDetail_fd2_0_c0_dija {
        margin: 0rpx 32rpx 0rpx 0rpx;

        .brokerageWithdrawalDetail_fd2_0_c0_c0_dija {
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          line-height: 40rpx;
          font-size: 32rpx;
          font-weight: 700;
          color: #333333;
        }

        .brokerageWithdrawalDetail_fd2_0_c0_c1_dija {
          margin: 24rpx 0rpx 0rpx 0rpx;
          line-height: 32rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: rgba(191, 191, 191, 1);
        }
      }

      .brokerageWithdrawalDetail_fd2_0_c1_c0_dija {
        line-height: 39rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #b82441;
      }

      .brokerageWithdrawalDetail_fd2_0_c1_c1_dija {
        margin: 27rpx 0rpx 0rpx 0rpx;
        line-height: 33rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #333;
      }

      .brokerageWithdrawalDetail_fd2_0_c1_c2_dija {
        line-height: 33rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #333;
      }
    }
  }

  .brokerageWithdrawalDetail_fd2_0_c1_c1_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 500;
    line-height: 33rpx;
  }

  .brokerageWithdrawalDetail_fd2_0_c1_c2_c0_2_dija {
    color: var(--benbenFontColor5);
    font-size: 24rpx;
    font-weight: 500;
    line-height: 33rpx;
  }

  .brokerageWithdrawalDetail_flex_1_dija {
    padding: 24rpx 24rpx 8rpx;

    .brokerageWithdrawalDetail_fd1_0_dija {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 16rpx;
      height: 72rpx;
      padding: 0rpx 24rpx;
      background: #fff;
      font-size: 26rpx;
      color: #333;

      .brokerageWithdrawalDetail_fd1_0_c3_dija {
        text-align: center;
      }
    }
  }

  .brokerageWithdrawalDetail_fd1_0_c4_dija {
    width: 36rpx;
    height: 36rpx;
    margin: 0rpx 0rpx 0rpx auto;
  }

  .brokerageWithdrawalDetail_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .brokerageWithdrawalDetail_fd0_0_dija {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .brokerageWithdrawalDetail_fd0_0_c1_c0_dija {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
      }
    }
  }

  .brokerageWithdrawalDetail_fd0_0_c0_dija {
    width: 100rpx;

    .brokerageWithdrawalDetail_fd0_0_c0_c0_dija {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .brokerageWithdrawalDetail_fd0_0_c2_c0_dija {
    width: 36rpx;
    height: 36rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }
}
</style>
