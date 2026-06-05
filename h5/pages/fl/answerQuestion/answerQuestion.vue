<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex answerQuestion_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center answerQuestion_fd0_0_dija" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="answerQuestion_fd0_0_c0_dija" mode="aspectFit" :src="STATIC_URL + '278.png'"></image>
        </view>
        <text class="answerQuestion_fd0_1_dija">{{ $t('问答') }}</text>
        <view class="flex flex-wrap align-center justify-end answerQuestion_fd0_0_dija">
          <text
            class="answerQuestion_fd0_2_c0_dija"
            v-if="appSystemIdentification != 'Wechat'"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`"
          >
            {{ $t('我的问答') }}
          </text>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout answerQuestion_flex_1_dija">
        <view class="flex flex-wrap align-center justify-end answerQuestion_fd1_0_dija" v-if="appSystemIdentification == 'Wechat'">
          <text
            class="answerQuestion_fd1_0_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`"
          >
            {{ $t('我的问答') }}
          </text>
        </view>
        <view class="answerQuestion_product-card">
          <view class="flex flex-wrap align-center answerQuestion_fd1_1_c0_dija">
            <image class="answerQuestion_fd1_1_c0_c0_dija" mode="aspectFill" :src="img"></image>
            <text class="flex-sub answerQuestion_fd1_1_c0_c1_dija">{{ name }}</text>
          </view>
        </view>
        <view class="flex flex-wrap align-center answerQuestion_fd1_1_c1_dija">
          <image
            class="answerQuestion_fd1_1_c1_c0_dija"
            mode="aspectFit"
            src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51764"
          ></image>
          <benben-input
            class="flex-sub answerQuestion_fd1_1_c1_c1_dija"
            type="text"
            :placeholder="$t('搜索已有提问')"
            confirm-type="search"
            :maxlength="-1"
            placeholder-style="color:#999;font-size:28rpx"
            @confirm="getListFunc()"
            v-model="question_content"
          />
        </view>
        <view class="answerQuestion_list-wrap">
          <template v-for="(item, key0) in dataList">
            <view
              class="flex flex-direction flex-wrap align-stretch answerQuestion_fd1_1_c2_dija"
              :key="key0"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/detailsQuestion/detailsQuestion?question_id=${item.aid}`"
            >
              <view class="answerQuestion_q-row">
                <view class="answerQuestion_q-badge">Q</view>
                <text class="flex-sub answerQuestion_fd1_1_c2_c0_c1_dija">{{ item.question_content }}</text>
              </view>
              <view class="flex flex-wrap align-start answerQuestion_fd1_1_c2_c1_dija" v-if="item.answer_number > '0'">
                <view class="answerQuestion_a-badge">A</view>
                <text class="flex-sub answerQuestion_fd1_1_c2_c1_c1_dija">{{ item.answer_content }}</text>
              </view>
              <view class="flex flex-wrap align-center answerQuestion_fd1_1_c2_c2_dija" v-if="item.answer_number > '0'">
                <text class="answerQuestion_fd1_1_c2_c2_c0_dija">{{ $t('全部') }}</text>
                <text class="answerQuestion_answer-count">{{ item.answer_number }}</text>
                <text class="answerQuestion_fd1_1_c2_c2_c0_dija">{{ $t('人进行了回答') }}</text>
                <text class="answerQuestion_arrow">›</text>
              </view>
              <view class="answerQuestion_no-answer" v-else>
                <text>{{ $t('暂无回答，快来抢沙发') }}</text>
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
        <view class="answerQuestion_footer">
          <view class="flex flex-wrap align-center justify-center answerQuestion_fd1_2_dija">
            <view class="flex flex-wrap align-center justify-center answerQuestion_fd1_2_c0_dija" @tap.stop="goQuizFunc()">
              <image class="answerQuestion_fd1_2_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '104.png'"></image>
              <text class="answerQuestion_fd1_2_c0_c1_dija">{{ $t('问问买家') }}</text>
            </view>
            <view
              class="flex flex-wrap align-center justify-center answerQuestion_fd1_2_c1_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`"
              v-if="appSystemIdentification == 'Wechat'"
            >
              <text class="answerQuestion_fd1_2_c1_c0_dija">{{ $t('我的问答') }}</text>
            </view>
          </view>
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
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      dataList: [],
      question_content: '',
      goods_id: '125',
      img: 'https://oss.tiantianhuoke.com/uploads/images/20221206/91fc57269ce162f71b858d3637ee50f8.jpg',
      name: 'Apple iPhone 14 Pro (A2892) 128GB 暗紫色 支持移动联通电信5G 双卡双待手机',
    }
  },
  computed: {
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
    let { goods_id, img, name } = options
    if (goods_id !== undefined) this.goods_id = goods_id
    if (img !== undefined) this.img = img
    if (name !== undefined) this.name = name
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //商品问答-获取商品提问列表
    getListFunc() {
      this.minixPagingListsApi = global.apiUrls.post6419a296eb18a
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        goods_id: this.goods_id,
        question_content: this.question_content,
      }
      this.listData = []
      this.dataList = this.listData
      this.pagingListToggle()
    },
    //跳转问问买家
    goQuizFunc() {
      if (this.isLogin === false) {
        uni.showToast({
          title: this.$t('请先登录'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          this.toLoginDiy()
        }, 500)
        return
      } else {
        this.$urouter.navigateTo(`/pages/fl/buyerAsk/buyerAsk?goods_id=${this.goods_id}&img=${this.img}&name=${this.name}`)
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
  background: #f5f6f8;
  background-size: 100% auto;

  .answerQuestion_flex_1_dija {
    padding: 0 24rpx;

    .answerQuestion_fd1_0_dija {
      padding: 16rpx 0;

      .answerQuestion_fd1_0_c0_dija {
        color: var(--benbenFontColor5);
        font-size: 26rpx;
        font-weight: 600;
        line-height: 40rpx;
        padding: 8rpx 20rpx;
        border-radius: 999rpx;
        background: rgba(184, 36, 65, 0.08);
      }
    }

    .answerQuestion_product-card {
      background: #fff;
      border-radius: 24rpx;
      padding: 24rpx;
      margin: 20rpx 0;
      box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
      border: 1rpx solid rgba(16, 24, 40, 0.04);
    }

    .answerQuestion_fd1_1_c0_dija {
      margin: 0;

      .answerQuestion_fd1_1_c0_c0_dija {
        width: 88rpx;
        height: 88rpx;
        border-radius: 16rpx;
        margin-right: 20rpx;
        flex-shrink: 0;
        background: #f3f4f6;
      }

      .answerQuestion_fd1_1_c0_c1_dija {
        color: #222;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 42rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .answerQuestion_fd1_1_c1_dija {
      border-radius: 999rpx;
      background: #ffffff;
      padding: 16rpx 28rpx;
      margin-bottom: 24rpx;
      box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.05);
      border: 1rpx solid rgba(16, 24, 40, 0.06);

      .answerQuestion_fd1_1_c1_c0_dija {
        width: 32rpx;
        height: 32rpx;
        margin-right: 16rpx;
        flex-shrink: 0;
        opacity: 0.5;
      }

      .answerQuestion_fd1_1_c1_c1_dija {
        color: var(--benbenFontColor0);
        font-size: 28rpx;
      }
    }

    .answerQuestion_list-wrap {
      padding-bottom: 180rpx;
    }

    .answerQuestion_fd1_1_c2_dija {
      border-radius: 24rpx;
      background: #ffffff;
      padding: 28rpx 24rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
      border: 1rpx solid rgba(16, 24, 40, 0.04);
      transition: transform 0.15s ease;

      &:active {
        transform: scale(0.985);
        background: #fafbfc;
      }

      .answerQuestion_q-row {
        display: flex;
        align-items: flex-start;
      }

      .answerQuestion_q-badge,
      .answerQuestion_a-badge {
        width: 40rpx;
        height: 40rpx;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
        font-weight: 700;
        flex-shrink: 0;
        margin-right: 16rpx;
        margin-top: 2rpx;
      }

      .answerQuestion_q-badge {
        background: rgba(184, 36, 65, 0.1);
        color: var(--benbenFontColor5);
      }

      .answerQuestion_a-badge {
        background: rgba(52, 168, 83, 0.1);
        color: #34a853;
      }

      .answerQuestion_fd1_1_c2_c0_c1_dija {
        color: #1a1a1a;
        font-size: 30rpx;
        font-weight: 600;
        line-height: 44rpx;
        word-break: break-word;
      }

      .answerQuestion_fd1_1_c2_c1_dija {
        margin-top: 20rpx;
        padding: 20rpx;
        background: #f8f9fb;
        border-radius: 16rpx;
      }

      .answerQuestion_fd1_1_c2_c1_c1_dija {
        color: #555;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 42rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .answerQuestion_fd1_1_c2_c2_dija {
        margin-top: 20rpx;
        padding-top: 16rpx;
        border-top: 1rpx solid #f0f0f0;
      }

      .answerQuestion_no-answer {
        margin-top: 16rpx;
        padding: 12rpx 0 0;

        text {
          font-size: 24rpx;
          color: #bbb;
        }
      }
    }
  }

  .answerQuestion_footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 750rpx;
    padding: 20rpx 32rpx calc(20rpx + var(--benben-window-bottom, 0px));
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(12px);
    box-shadow: 0 -4rpx 24rpx rgba(15, 23, 42, 0.06);
    z-index: 10;

    .answerQuestion_fd1_2_dija {
      width: 100%;
      gap: 20rpx;
    }

    .answerQuestion_fd1_2_c0_dija {
      flex: 1;
      border-radius: 999rpx;
      background: var(--benbenbgColor3);
      padding: 24rpx 32rpx;
      box-shadow: 0 12rpx 32rpx rgba(184, 36, 65, 0.22);

      .answerQuestion_fd1_2_c0_c0_dija {
        width: 36rpx;
        height: 36rpx;
      }

      .answerQuestion_fd1_2_c0_c1_dija {
        color: #fff;
        font-size: 30rpx;
        font-weight: 600;
        line-height: 42rpx;
        margin-left: 12rpx;
      }
    }

    .answerQuestion_fd1_2_c1_dija {
      flex: 1;
      border-radius: 999rpx;
      background: #fff;
      padding: 24rpx 32rpx;
      border: 2rpx solid rgba(184, 36, 65, 0.3);

      .answerQuestion_fd1_2_c1_c0_dija {
        color: var(--benbenFontColor5);
        font-size: 30rpx;
        font-weight: 600;
        line-height: 42rpx;
      }
    }
  }

  .answerQuestion_fd1_1_c2_c2_c0_dija {
    color: #999;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 36rpx;
  }

  .answerQuestion_answer-count {
    color: var(--benbenFontColor5);
    font-size: 24rpx;
    font-weight: 600;
    margin: 0 4rpx;
  }

  .answerQuestion_arrow {
    margin-left: auto;
    font-size: 32rpx;
    color: #ccc;
    line-height: 1;
  }

  .answerQuestion_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0;
    background: #fff;
    border-bottom: 1rpx solid rgba(16, 24, 40, 0.06);
    box-shadow: 0 2rpx 12rpx rgba(15, 23, 42, 0.04);

    .answerQuestion_fd0_1_dija {
      color: #1a1a1a;
      font-size: 34rpx;
      font-weight: 700;
      line-height: 50rpx;
    }
  }

  .answerQuestion_fd0_0_dija {
    width: 200rpx;
    height: 88rpx;

    .answerQuestion_fd0_0_c0_dija {
      width: 20rpx;
      height: 36rpx;
      margin-left: 32rpx;
    }
  }

  .answerQuestion_fd0_2_c0_dija {
    color: var(--benbenFontColor5);
    font-size: 26rpx;
    font-weight: 600;
    line-height: 40rpx;
    margin-right: 32rpx;
    padding: 8rpx 20rpx;
    border-radius: 999rpx;
    background: rgba(184, 36, 65, 0.08);
  }
}
</style>
