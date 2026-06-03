<template>
  <page-body>
    <view class="page">
      <view class="flex flex-wrap align-center justify-between benben-position-layout flex answerQuestion_flex_0_dija"
        :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
        <view class='flex flex-wrap align-center answerQuestion_fd0_0_dija' @tap.stop="handleJumpDiy" data-type="back"
          data-url="1">
          <image class='answerQuestion_fd0_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"278.png"'></image>
        </view>
        <text class='answerQuestion_fd0_1_dija'>{{$t('问答')}}</text>
        <view class='flex flex-wrap align-center justify-end answerQuestion_fd0_0_dija'>
          <text class='answerQuestion_fd0_2_c0_dija' v-if=" appSystemIdentification!='Wechat'" @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`">{{$t('我的问答')}}</text>
        </view>
      </view>
      <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout answerQuestion_flex_1_dija">
        <view class='flex flex-wrap align-center justify-end answerQuestion_fd1_0_dija'
          v-if=" appSystemIdentification=='Wechat'">
          <text class='answerQuestion_fd1_0_c0_dija' @tap.stop="handleJumpDiy" data-type="navigateTo"
            :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`">{{$t('我的问答')}}</text>
        </view>
        <view class='flex flex-direction flex-wrap align-stretch answerQuestion_fd1_1_dija'>
          <view class='flex flex-wrap align-center answerQuestion_fd1_1_c0_dija'>
            <image class='answerQuestion_fd1_1_c0_c0_dija' mode="aspectFill" :src='img'></image>
            <text class='flex-sub answerQuestion_fd1_1_c0_c1_dija'>{{name}}</text>
          </view>
          <view class='flex flex-wrap align-center answerQuestion_fd1_1_c1_dija'>
            <image class='answerQuestion_fd1_1_c1_c0_dija' mode="aspectFit"
              src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51764'></image>
            <benben-input class='flex-sub answerQuestion_fd1_1_c1_c1_dija' type="text" :placeholder="$t('搜索已有提问')"
              confirm-type="search" :maxlength="-1" placeholder-style="color:#999;font-size:28rpx"
              @confirm="getListFunc()" v-model="question_content" />
          </view>
          <template v-for='(item,key0) in dataList'>
            <view class='flex flex-direction flex-wrap align-stretch answerQuestion_fd1_1_c2_dija' :key='key0'>
              <view class='flex flex-wrap align-start'>
                <image class='answerQuestion_fd1_1_c2_c0_c0_dija' mode="aspectFit"
                  src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51735'></image>
                <text class='flex-sub answerQuestion_fd1_1_c2_c0_c1_dija'>{{item.question_content}}</text>
              </view>
              <view class='flex flex-wrap align-start answerQuestion_fd1_1_c2_c1_dija' v-if="item.answer_number>'0'">
                <image class='answerQuestion_fd1_1_c2_c0_c0_dija' mode="aspectFit"
                  src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51765'></image>
                <text class='flex-sub answerQuestion_fd1_1_c2_c1_c1_dija'>{{item.answer_content}}</text>
              </view>
              <view class='flex flex-wrap align-center answerQuestion_fd1_1_c2_c2_dija' @tap.stop="handleJumpDiy"
                data-type="navigateTo" :data-url="`/pages/fl/detailsQuestion/detailsQuestion?question_id=${item.aid}`">
                <text class='answerQuestion_fd1_1_c2_c2_c0_dija'>{{$t('全部')}}</text>
                <text class='answerQuestion_fd1_1_c2_c2_c0_dija'>{{item.answer_number}}</text>
                <text class='answerQuestion_fd1_1_c2_c2_c0_dija'>{{$t('人进行了回答')}}</text>
              </view>
            </view>
          </template>
          <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
            :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
        </view>
        <view class='flex flex-wrap align-center justify-center answerQuestion_fd1_2_dija'>
          <view class='flex flex-wrap align-center justify-center answerQuestion_fd1_2_c0_dija'
            @tap.stop="goQuizFunc()">
            <image class='answerQuestion_fd1_2_c0_c0_dija' mode="aspectFit" :src='STATIC_URL+"104.png"'></image>
            <text class='answerQuestion_fd1_2_c0_c1_dija'>{{$t('问问买家')}}</text>
          </view>
          <view class='flex flex-wrap align-center justify-center answerQuestion_fd1_2_c1_dija'
            @tap.stop="handleJumpDiy" data-type="navigateTo"
            :data-url="`/pages/fl/questionsAnswers/questionsAnswers?goods_id=${goods_id}`"
            v-if=" appSystemIdentification=='Wechat'">
            <text class='answerQuestion_fd1_2_c1_c0_dija'>{{$t('我的问答')}}</text>
          </view>
        </view>
      </view>
      <!---flex布局flex布局结束-->
    </view>
  </page-body>
</template>
<script>
  import pagingList from '@/common/mixin/paging_list.js';
  import {
    validate
  } from '@/common/utils/validate.js'
  export default {
    components: {},
    mixins: [pagingList],
    data() {
      return {
        "minixPagingListsApi": "",
        "pageingListApiMethod": "",
        "allowOnloadGetList": false,
        "dataList": [],
        "question_content": "",
        "goods_id": "125",
        "img": "https://oss.tiantianhuoke.com/uploads/images/20221206/91fc57269ce162f71b858d3637ee50f8.jpg",
        "name": "Apple iPhone 14 Pro (A2892) 128GB 暗紫色 支持移动联通电信5G 双卡双待手机"
      };
    },
    computed: {
      isLogin() {
        return this.$store.state.token == '' ? false : true;
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
      }
    },
    watch: {},
    onLoad(options) {
      let {
        goods_id,
        img,
        name
      } = options
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
        this.minixPagingListsApi = global.apiUrls.post6419a296eb18a;
        this.pageingListApiMethod = 'get';
        this.allowOnloadGetList = false;
        this.pagingListPostDataContent = {
          goods_id: this.goods_id,
          question_content: this.question_content
        }
        this.listData = [];
        this.dataList = this.listData;
        this.pagingListToggle();
      },
      //跳转问问买家
      goQuizFunc() {
        if (this.isLogin === false) {
          uni.showToast({
            title: this.$t('请先登录'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
          setTimeout(() => {
            this.toLoginDiy();
          }, 500)
          return
        } else {
          this.$urouter.navigateTo(
            `/pages/fl/buyerAsk/buyerAsk?goods_id=${this.goods_id}&img=${this.img}&name=${this.name}`);
        }
      },
      pagingListPostData() {
        return this.pagingListPostDataContent
      }
    }
  };
</script>
<style lang="scss" scoped>
  .page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--benben-window-bottom, 0px));
    background: #F8F8F8;
    background-size: 100% auto;

    .answerQuestion_flex_1_dija {
      padding: 0rpx 24rpx 0rpx 24rpx;

      .answerQuestion_fd1_0_dija {
        padding: 24rpx 0rpx 24rpx 0rpx;

        .answerQuestion_fd1_0_c0_dija {
          color: #333333;
          font-size: 28rpx;
          font-weight: 600;
          line-height: 50rpx;
          margin: 0rpx 0rpx 0rpx 0rpx;
        }
      }

      .answerQuestion_fd1_1_dija {
        margin: 0rpx 0rpx 150rpx 0rpx;

        .answerQuestion_fd1_1_c0_dija {
          margin: 24rpx 0rpx 24rpx 0rpx;

          .answerQuestion_fd1_1_c0_c0_dija {
            width: 72rpx;
            height: 72rpx;
            border-radius: 8rpx;
            margin: 0rpx 24rpx 0rpx 0rpx;
          }

          .answerQuestion_fd1_1_c0_c1_dija {
            color: #333333;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }

        .answerQuestion_fd1_1_c1_dija {
          border-radius: 28rpx 28rpx 28rpx 28rpx;
          background: #FFFFFF;
          padding: 12rpx 24rpx 12rpx 24rpx;
          margin: 0rpx 0rpx 20rpx 0rpx;

          .answerQuestion_fd1_1_c1_c0_dija {
            width: 32rpx;
            height: 32rpx;
            border-radius: 0rpx 0rpx 0rpx 0rpx;
            margin: 0rpx 24rpx 0rpx 0rpx;
          }

          .answerQuestion_fd1_1_c1_c1_dija {
            color: var(--benbenFontColor0);
          }
        }

        .answerQuestion_fd1_1_c2_dija {
          border-radius: 16rpx 16rpx 16rpx 16rpx;
          background: #FFFFFF;
          padding: 24rpx 24rpx 24rpx 24rpx;
          margin: 0rpx 0rpx 32rpx 0rpx;

          .answerQuestion_fd1_1_c2_c0_c1_dija {
            color: #333333;
            font-size: 28rpx;
            font-weight: 700;
            line-height: 40rpx;
            margin: 0rpx 0rpx 0rpx 16rpx;
            word-break: break-word;
          }

          .answerQuestion_fd1_1_c2_c1_dija {
            margin: 16rpx 0rpx 0rpx 0rpx;

            .answerQuestion_fd1_1_c2_c1_c1_dija {
              color: #333333;
              font-size: 28rpx;
              font-weight: 700;
              line-height: 40rpx;
              margin: 0rpx 0rpx 0rpx 16rpx;
            }
          }

          .answerQuestion_fd1_1_c2_c2_dija {
            padding: 0rpx 0rpx 0rpx 56rpx;
            margin: 24rpx 0rpx 0rpx 0rpx;
          }
        }
      }

      .answerQuestion_fd1_2_dija {
        position: fixed;
        left: 0rpx;
        bottom: calc(40rpx + var(--benben-window-bottom, 0px));
        width: 750rpx;

        .answerQuestion_fd1_2_c0_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          background: var(--benbenbgColor7);
          padding: 18rpx 66rpx 17rpx 66rpx;

          .answerQuestion_fd1_2_c0_c0_dija {
            width: 32rpx;
            height: 32rpx;
            border-radius: 0rpx 0rpx 0rpx 0rpx;
          }

          .answerQuestion_fd1_2_c0_c1_dija {
            color: var(--benbenFontColor3);
            font-size: 32rpx;
            font-weight: 400;
            line-height: 45rpx;
            margin: 0rpx 0rpx 0rpx 16rpx;
          }
        }

        .answerQuestion_fd1_2_c1_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          background: var(--benbenbgColor7);
          padding: 18rpx 66rpx 17rpx 66rpx;
          margin: 0rpx 0rpx 0rpx 24rpx;

          .answerQuestion_fd1_2_c1_c0_dija {
            color: var(--benbenFontColor3);
            font-size: 32rpx;
            font-weight: 400;
            line-height: 45rpx;
          }
        }
      }
    }

    .answerQuestion_fd1_1_c2_c0_c0_dija {
      width: 40rpx;
      height: 40rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }

    .answerQuestion_fd1_1_c2_c2_c0_dija {
      color: var(--benbenFontColor4);
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
    }

    .answerQuestion_flex_0_dija {
      width: 750rpx;
      height: 88rpx;
      overflow: hidden;
      z-index: 10;
      top: 0rpx;
      background: #fff;
      background-size: 100% auto !important;

      .answerQuestion_fd0_1_dija {
        color: #333333;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
      }
    }

    .answerQuestion_fd0_0_dija {
      width: 200rpx;
      height: 88rpx;

      .answerQuestion_fd0_0_c0_dija {
        width: 20rpx;
        height: 36rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;
      }
    }

    .answerQuestion_fd0_2_c0_dija {
      color: #333333;
      font-size: 28rpx;
      font-weight: 600;
      line-height: 40rpx;
      margin: 0rpx 24rpx 0rpx 0rpx;
    }
  }
</style>
