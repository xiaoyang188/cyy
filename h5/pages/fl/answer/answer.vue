<template>
  <page-body>
    <view class="page">
      <view class="flex flex-wrap align-center justify-between benben-position-layout flex answer_flex_0_dija"
        :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
        <view class='flex flex-wrap align-center answer_fd0_0_dija' @tap.stop="handleJumpDiy" data-type="back"
          data-url="1">
          <image class='answer_fd0_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"278.png"'></image>
        </view>
        <text class='answer_fd0_1_dija'>{{$t('我来回答')}}</text>
        <view class='flex flex-wrap align-center justify-end answer_fd0_0_dija'>
          <text class='answer_fd0_2_c0_dija' v-if=" appSystemIdentification!='Wechat'"
            @tap.stop="queryMessageFunc()">{{$t('发布')}}</text>
        </view>
      </view>
      <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
      <benben-popup v-model="popupShow1679644874893" :mask="true" :mask-close-able="false" mode='center'>
        <!---回复成功flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout answer_flex_1_dija">
          <view class='flex flex-direction flex-wrap align-center answer_fd1_0_dija'>
            <image class='answer_fd1_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"106.png"'></image>
            <text class='answer_fd1_0_c1_dija'>{{$t('回复成功')}}</text>
            <button class='answer_fd1_0_c2_dija' @tap.stop="handleJumpDiy" data-type="back"
              data-url="1">{{$t('我知道了')}}</button>
          </view>
        </view>
        <!---回复成功flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout answer_flex_2_dija">
        <view class='flex flex-wrap answer_fd2_0_dija'>
          <benben-textarea class='flex answer_input_fd2_0_dija' confirm-type="done" :placeholder="$t('我知道，我来答')"
            :maxlength="500" :show-num='true' placeholder-style="color:#999;font-size:28rpx" v-model="content" />
          <template>
            <view class='flex flex justify-end answer_numberfd2_0_c0_dija'>
              <text>{{content.length}}</text>
              <text>/</text>
              <text>500</text>
            </view>
          </template>
        </view>
        <view class='flex flex-wrap align-center answer_fd2_1_dija'>
          <view class='flex flex-wrap align-center' @tap.stop="HiddenFunc()">
            <image class='answer_fd2_1_c0_c0_dija' mode="aspectFit"
              src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51775' v-if="cut=='0'"></image>
            <text class='fu-iconfont2  answer_fd2_1_c0_c1_dija' v-if="cut=='1'">&#xe837;</text>
            <text class='answer_fd2_1_c0_c2_dija' v-if="cut=='0'">{{$t('实名回答')}}</text><text
              class='answer_fd2_1_c0_c2_dija' v-if="cut=='1'">{{$t('匿名回答')}}</text>
          </view>
        </view>
        <view class='flex flex-wrap align-center justify-center answer_fd2_2_dija'
          v-if=" appSystemIdentification=='Wechat'">
          <button class='answer_fd2_2_c0_dija' @tap.stop="queryMessageFunc()">{{$t('发布')}}</button>
        </view>
      </view>
      <!---flex布局flex布局结束-->
    </view>
  </page-body>
</template>
<script>
  import {
    validate
  } from '@/common/utils/validate.js'
  export default {
    components: {},
    data() {
      return {
        "popupShow1679644874893": false,
        "content": "",
        "cut": "1",
        "question_id": "17"
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
        question_id
      } = options
      if (question_id !== undefined) this.question_id = question_id
    },
    onUnload() {},
    onReady() {},
    onShow() {},
    onHide() {},
    onResize() {},
    onPullDownRefresh() {},
    onReachBottom(e) {},
    onPageScroll(e) {},
    methods: {
      //商品问答-回答问题
      async queryMessageFunc() {
        if (this.isLogin === true) {
          if (!validate(this.content, 'require')) {
            this.$message.info(this.$t('请输入您的回答'));
            return false;
          }
          if (this.content.trim() == '') {
            this.$message.info('请输入您的回答');
            return false;
          }
          //请求方法
          //数据验证
          let data6419a05cd695d = await this.$api.dbGet(global.apiUrls.post6419a05cd695d, {
            question_id: this.question_id,
            content: this.content,
            is_anonymous: this.cut
          });
          if (!data6419a05cd695d) return
          if (data6419a05cd695d.data.code != 1) {
            this.$message.info(data6419a05cd695d.data.msg);
            return
          }
          let info6419a05cd695d = data6419a05cd695d.data;
          this.popupShow1679644874893 = true;
        } else {
          uni.showToast({
            title: this.$t('请先登录'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
          this.toLoginDiy();
        }
      },
      //是否隐藏
      HiddenFunc() {
        if (this.cut == 0) {
          this.cut = '1';
        } else {
          this.cut = '0';
        }
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

    .answer_flex_2_dija {
      padding: 24rpx 24rpx 0rpx 24rpx;

      .answer_fd2_0_dija {
        width: 702rpx;
        border-radius: 10rpx 10rpx 10rpx 10rpx;
        background: #fff;

        .answer_input_fd2_0_dija {
          width: 100%;
          height: 1086rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #333;
          padding: 24rpx 24rpx 24rpx 24rpx;
          border-radius: 16rpx 16rpx 16rpx 16rpx;
        }

        .answer_numberfd2_0_c0_dija {
          width: 100%;
          font-size: 24rpx;
          color: rgba(191, 191, 191, 1);
          line-height: 46rpx;
          font-weight: 400;
          margin: 0rpx 032rpx 032rpx 032rpx;
        }
      }

      .answer_fd2_1_dija {
        margin: 32rpx 0rpx 150rpx 0rpx;

        .answer_fd2_1_c0_c0_dija {
          width: 32rpx;
          height: 32rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .answer_fd2_1_c0_c1_dija {
          color: #374047;
          font-weight: 700;
        }
      }

      .answer_fd2_2_dija {
        position: fixed;
        left: 0rpx;
        bottom: calc(40rpx + var(--benben-window-bottom, 0px));
        width: 750rpx;

        .answer_fd2_2_c0_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          width: 500rpx;
          line-height: 88rpx;
          font-size: 32rpx;
          background: var(--benbenbgColor0);
          color: #fff;
        }
      }
    }

    .answer_fd2_1_c0_c2_dija {
      color: #333333;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      margin: 0rpx 0rpx 0rpx 16rpx;
    }

    .answer_flex_1_dija {
      padding: 0rpx 86rpx 0rpx 86rpx;

      .answer_fd1_0_dija {
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        border: 1px solid #707070;
        background: var(--benbenbgColor1);
        width: 540rpx;
        padding: 50rpx 0rpx 50rpx 0rpx;

        .answer_fd1_0_c0_dija {
          width: 72rpx;
          height: 72rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .answer_fd1_0_c1_dija {
          color: #333333;
          font-size: 40rpx;
          font-weight: 500;
          line-height: 56rpx;
          margin: 16rpx 0rpx 0rpx 0rpx;
        }

        .answer_fd1_0_c2_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          font-size: 32rpx;
          background: var(--benbenbgColor3);
          color: #fff;
          width: 308rpx;
          height: 80rpx;
          line-height: 80rpx;
          margin: 67rpx 0rpx 0rpx 0rpx;
        }
      }
    }

    .answer_flex_0_dija {
      width: 750rpx;
      height: 88rpx;
      overflow: hidden;
      z-index: 10;
      top: 0rpx;
      background: #fff;
      background-size: 100% auto !important;

      .answer_fd0_1_dija {
        color: #333333;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
      }
    }

    .answer_fd0_0_dija {
      width: 200rpx;
      height: 88rpx;

      .answer_fd0_0_c0_dija {
        width: 20rpx;
        height: 36rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;
      }
    }

    .answer_fd0_2_c0_dija {
      color: #333333;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      margin: 0rpx 24rpx 0rpx 0rpx;
    }
  }
</style>
