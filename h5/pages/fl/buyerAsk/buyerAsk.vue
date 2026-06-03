<template>
  <page-body>
    <view class="page">
      <view class="flex flex-wrap align-center justify-between benben-position-layout flex buyerAsk_flex_0_dija"
        :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
        <view class='flex flex-wrap align-center buyerAsk_fd0_0_dija' @tap.stop="handleJumpDiy" data-type="back"
          data-url="1">
          <image class='buyerAsk_fd0_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"278.png"'></image>
        </view>
        <text class='buyerAsk_fd0_1_dija'>{{$t('发布问题')}}</text>
        <view class='flex flex-wrap align-center justify-end buyerAsk_fd0_0_dija'>
          <text class='buyerAsk_fd0_2_c0_dija' v-if=" appSystemIdentification!='Wechat'"
            @tap.stop="submitFunc()">{{$t('发布')}}</text>
        </view>
      </view>
      <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout buyerAsk_flex_1_dija">
        <view class='flex flex-wrap align-center buyerAsk_fd1_0_dija'>
          <image class='buyerAsk_fd1_0_c0_dija' mode="aspectFill" :src='img'></image>
          <text class='flex-sub buyerAsk_fd1_0_c1_dija'>{{name}}</text>
        </view>
        <view class='flex flex-wrap buyerAsk_fd1_1_dija'>
          <benben-textarea class='flex buyerAsk_input_fd1_1_dija' :placeholder="$t('说出你的问题，已购买的人会帮你解答哦~')"
            :adjust-position="false" :maxlength="255" :show-num='true' placeholder-style="color:#999;font-size:28rpx"
            v-model="content" />
          <template>
            <view class='flex flex justify-end buyerAsk_numberfd1_1_c0_dija'>
              <text>{{content.length}}</text>
              <text>/</text>
              <text>255</text>
            </view>
          </template>
        </view>
        <view class='flex flex-wrap align-center justify-center buyerAsk_fd1_2_dija'
          v-if=" appSystemIdentification=='Wechat'">
          <button class='buyerAsk_fd1_2_c0_dija' @tap.stop="submitFunc()">{{$t('发布')}}</button>
        </view>
      </view>
      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1679643169487" :mask="true" :mask-close-able="true" mode='center'>
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout buyerAsk_flex_2_dija">
          <view class='flex flex-direction flex-wrap align-center buyerAsk_fd2_0_dija'>
            <image class='buyerAsk_fd2_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"106.png"'></image>
            <text class='buyerAsk_fd2_0_c1_dija'>{{$t('发布成功')}}</text>
            <text class='buyerAsk_fd2_0_c2_dija'>{{$t('等待后台审核，审核通过后可以去我的回答里查看已发布的回答')}}</text>
            <button class='buyerAsk_fd2_0_c3_dija' @tap.stop="backFunc()">{{$t('我知道了')}}</button>
          </view>
        </view>
        <!---flex布局flex布局结束-->
      </benben-popup>
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
        "popupShow1679643169487": false,
        "content": "",
        "is_post": false,
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
    onShow() {},
    onHide() {},
    onResize() {},
    onPullDownRefresh() {},
    onReachBottom(e) {},
    onPageScroll(e) {},
    methods: {
      //返回
      backFunc() {
        this.popupShow1679643169487 = false;
        this.$urouter.navigateBack(1);
      },
      //商品问答-提交问题
      async submitFunc() {
        if (this.isLogin === true) {
          if (this.is_post === false) {
            if (!validate(this.content, 'require')) {
              this.$message.info(this.$t('请输入您的问题'));
              return false;
            }
            if (this.content.trim() == '') {
              this.$message.info('请输入您的问题');
              return false;
            }
            this.popupShow1679643169487 = true;
            this.is_post = true;
            //请求方法
            //数据验证
            let data64199c0482e5e = await this.$api.dbGet(global.apiUrls.post64199c0482e5e, {
              activity_id: this.activity_id,
              goods_id: this.goods_id,
              content: this.content
            });
            if (!data64199c0482e5e) return
            if (data64199c0482e5e.data.code != 1) {
              this.$message.info(data64199c0482e5e.data.msg);
              return
            }
            let info64199c0482e5e = data64199c0482e5e.data;
            this.content = '';
            this.is_post = false;
          }
        } else {
          uni.showToast({
            title: this.$t('请先登录'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
          this.toLoginDiy();
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
    background: rgba(248, 248, 248, 1);
    background-size: 100% auto;

    .buyerAsk_flex_2_dija {
      padding: 0rpx 86rpx 0rpx 86rpx;

      .buyerAsk_fd2_0_dija {
        border-radius: 24rpx 24rpx 24rpx 24rpx;
        border: 1px solid #707070;
        background: #FFFFFF;
        padding: 48rpx 51rpx 48rpx 51rpx;

        .buyerAsk_fd2_0_c0_dija {
          width: 72rpx;
          height: 72rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .buyerAsk_fd2_0_c1_dija {
          color: #333333;
          font-size: 40rpx;
          font-weight: 500;
          line-height: 56rpx;
          margin: 16rpx 0rpx 0rpx 0rpx;
        }

        .buyerAsk_fd2_0_c2_dija {
          color: #333333;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          text-align: center;
          margin: 40rpx 0rpx 0rpx 0rpx;
        }

        .buyerAsk_fd2_0_c3_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          font-size: 32rpx;
          background: var(--benbenbgColor7);
          color: #fff;
          width: 308rpx;
          height: 80rpx;
          line-height: 80rpx;
          margin: 67rpx 0rpx 0rpx 0rpx;
        }
      }
    }

    .buyerAsk_flex_1_dija {
      padding: 0rpx 24rpx 0rpx 24rpx;

      .buyerAsk_fd1_0_dija {
        margin: 24rpx 0rpx 32rpx 0rpx;

        .buyerAsk_fd1_0_c0_dija {
          width: 72rpx;
          height: 72rpx;
          border-radius: 8rpx;
          margin: 0rpx 24rpx 0rpx 0rpx;
        }

        .buyerAsk_fd1_0_c1_dija {
          color: #333333;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }

      .buyerAsk_fd1_1_dija {
        margin: 0rpx 0rpx 150rpx 0rpx;
        border-radius: 16rpx;
        background: var(--benbenbgColor1);
        background-size: 100% auto;
        padding: 24rpx 12rpx 24rpx 24rpx;

        .buyerAsk_input_fd1_1_dija {
          height: 500rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #333;
          white-space: pre-wrap;
          width: 100%;
        }

        .buyerAsk_numberfd1_1_c0_dija {
          width: 100%;
          font-size: 24rpx;
          color: var(--benbenFontColor1);
          line-height: 46rpx;
          font-weight: 400;
        }
      }

      .buyerAsk_fd1_2_dija {
        position: fixed;
        left: 0rpx;
        bottom: calc(40rpx + var(--benben-window-bottom, 0px));
        width: 750rpx;

        .buyerAsk_fd1_2_c0_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          width: 500rpx;
          line-height: 88rpx;
          font-size: 32rpx;
          background: var(--benbenbgColor7);
          color: #fff;
        }
      }
    }

    .buyerAsk_flex_0_dija {
      width: 750rpx;
      height: 88rpx;
      overflow: hidden;
      z-index: 10;
      top: 0rpx;
      background: #fff;
      background-size: 100% auto !important;

      .buyerAsk_fd0_1_dija {
        color: #333333;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
      }
    }

    .buyerAsk_fd0_0_dija {
      width: 200rpx;
      height: 88rpx;

      .buyerAsk_fd0_0_c0_dija {
        width: 20rpx;
        height: 36rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;
      }
    }

    .buyerAsk_fd0_2_c0_dija {
      color: #333333;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      margin: 0rpx 24rpx 0rpx 0rpx;
    }
  }
</style>
