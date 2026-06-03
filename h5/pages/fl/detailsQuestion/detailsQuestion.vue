<template>
  <page-body>
    <view class="page">
      <view class="flex flex-wrap align-center justify-between benben-position-layout flex detailsQuestion_flex_0_dija"
        :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
        <view class='flex flex-wrap align-center detailsQuestion_fd0_0_dija' @tap.stop="handleJumpDiy" data-type="back"
          data-url="1">
          <image class='detailsQuestion_fd0_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"278.png"'></image>
        </view>
        <text class='detailsQuestion_fd0_1_dija'>{{$t('问题详情')}}</text>
        <view class='flex flex-wrap align-center detailsQuestion_fd0_0_dija'>
        </view>
      </view>
      <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
      <benben-popup v-model="popupShow1734666789994" :mask="true" :mask-close-able="false" mode='center'>
        <!---清除本地缓存flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class='flex flex-direction flex-wrap align-center detailsQuestion_fd1_0_dija'>
            <text class='detailsQuestion_fd1_0_c0_dija'>{{$t('提示')}}</text>
            <text class='detailsQuestion_fd1_0_c1_dija'>{{$t('确认删除此问题吗？')}}</text>
            <view class='flex align-center detailsQuestion_fd1_0_c2_dija'>
              <button class='detailsQuestion_fd1_0_c2_c0_dija'
                @tap.stop="popupShow1734666789994=false">{{$t('取消')}}</button>
              <button class='detailsQuestion_fd1_0_c2_c1_dija'
                @tap.stop="deleteQuestionFunc(dataDetails.question_info.aid)">{{$t('确认')}}</button>
            </view>
          </view>
        </view>
        <!---清除本地缓存flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout detailsQuestion_flex_2_dija">
        <view class='flex flex-wrap align-center detailsQuestion_fd2_0_dija'>
          <image class='detailsQuestion_fd2_0_c0_dija' mode="aspectFill" :src='dataDetails.question_info.goods_thumb'>
          </image>
          <text class='flex-sub detailsQuestion_fd2_0_c1_dija'>{{dataDetails.question_info.goods_name}}</text>
        </view>
        <view class='flex flex-direction flex-wrap align-stretch detailsQuestion_fd2_1_dija'>
          <view class='flex align-start detailsQuestion_fd2_1_c0_dija'>
            <image class='detailsQuestion_fd2_1_c0_c0_dija' mode="aspectFit"
              src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51735'></image>
            <text
              class='flex-sub detailsQuestion_fd2_1_c0_c1_dija'>{{dataDetails.question_info.question_content}}</text>
            <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c0_c2_dija' @tap.stop="guanzhuFunc()"
              v-if=" dataDetails.question_info.user_id!=userInfo.id">
              <image class='detailsQuestion_fd2_1_c0_c2_c0_dija' mode="aspectFit"
                src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51770'
                v-if="dataDetails.question_info.is_follow!='1'"></image>
              <image class='detailsQuestion_fd2_1_c0_c2_c0_dija' mode="aspectFit"
                src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/62660'
                v-if="dataDetails.question_info.is_follow=='1'"></image>
              <text class='detailsQuestion_fd2_1_c0_c2_c1_dija'
                v-if="dataDetails.question_info.is_follow!='1'">{{$t('关注')}}</text><text
                class='detailsQuestion_fd2_1_c0_c2_c1_1_dija'
                v-if="dataDetails.question_info.is_follow=='1'">{{$t('已关注')}}</text>
            </view>
            <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c0_c2_dija'
              @tap.stop="popupShow1734666789994=true" v-if=" dataDetails.question_info.user_id==userInfo.id">
              <image class='detailsQuestion_fd2_1_c0_c2_c0_dija' mode="aspectFit"
                src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/52648'
                v-if="dataDetails.question_info.is_follow!='1'"></image>
              <image class='detailsQuestion_fd2_1_c0_c2_c0_dija' mode="aspectFit" :src='STATIC_URL+"441.png"'
                v-if="dataDetails.question_info.is_follow=='1'"></image>
              <text class='detailsQuestion_fd2_1_c0_c2_c1_dija'
                v-if="dataDetails.question_info.is_follow!='1'">{{$t('删除')}}</text><text
                class='detailsQuestion_fd2_1_c0_c2_c1_1_dija'
                v-if="dataDetails.question_info.is_follow=='1'">{{$t('已关注')}}</text>
            </view>
          </view>
          <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c1_dija'
            v-if=" dataDetails.answer_list.data.length>0">
            <image class='detailsQuestion_fd2_1_c0_c0_dija' mode="aspectFit"
              src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51765'></image>
            <text class='detailsQuestion_fd2_1_c1_c1_dija'>{{$t('共')}}</text>
            <text class='detailsQuestion_fd2_1_c1_c2_dija'>{{dataDetails.answer_list.total}}</text>
            <text class='detailsQuestion_fd2_1_c1_c2_dija'>{{$t('条用户回答')}}</text>
          </view>
          <view class='flex align-stretch detailsQuestion_fd2_1_c2_dija' v-if=" dataDetails.answer_list.data.length==0">
            <text>{{$t('暂无回答')}}</text>
          </view>
          <view class='flex align-stretch self-center justify-center detailsQuestion_fd2_1_c3_dija'
            v-if=" dataDetails.answer_list.data.length==0">
            <text>{{$t('回答的人正在赶来的路上...')}}</text>
          </view>
          <template v-for='(item,key0) in dataDetails.answer_list.data'>
            <view class='flex flex-direction flex-wrap align-stretch' :key='key0'>
              <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c4_c0_dija'>
                <image class='detailsQuestion_fd2_1_c4_c0_c0_dija' mode="aspectFill" :src='item.avatar'></image>
                <view class='flex flex-direction flex-wrap align-stretch flex-sub detailsQuestion_fd2_1_c4_c0_c1_dija'>
                  <text class='detailsQuestion_fd2_1_c4_c0_c1_c0_dija'>{{item.nickname}}</text>
                  <text class='detailsQuestion_fd2_1_c4_c0_c1_c1_dija'>{{item.create_time}}</text>
                </view>
              </view>
              <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c4_c1_dija'
                :style="{'border-bottom':`${dataDetails.answer_list.data.length==(key0 +1)? '':'1px solid rgba(238, 238, 238, 1)'}`}">
                <text class='detailsQuestion_fd2_1_c4_c1_c0_dija'>{{item.answer_content}}</text>
                <view class='flex flex-wrap align-center detailsQuestion_fd2_1_c0_c2_dija'
                  @tap.stop="getLikeFunc(item.aid)">
                  <image class='detailsQuestion_fd2_1_c4_c1_c1_c0_dija' mode="aspectFit"
                    src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/65300' v-if="item.is_likes=='1'">
                  </image>
                  <image class='detailsQuestion_fd2_1_c4_c1_c1_c0_dija' mode="aspectFit"
                    src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51756' v-if="item.is_likes!='1'">
                  </image>
                  <text class='detailsQuestion_fd2_1_c4_c1_c1_c1_dija'
                    v-if="item.is_likes=='1'">{{item.like_num}}</text><text
                    class='detailsQuestion_fd2_1_c4_c1_c1_c1_1_dija' v-if="item.is_likes!='1'">{{$t('点赞')}}</text>
                </view>
              </view>
            </view>
          </template>
        </view>
        <view class='flex flex-wrap align-center justify-center detailsQuestion_fd2_2_dija'>
          <view class='flex flex-wrap align-center detailsQuestion_fd2_2_c0_dija' @tap.stop="handleJumpDiy"
            data-type="navigateTo" :data-url="`/pages/fl/answer/answer?question_id=${question_id}`">
            <image class='detailsQuestion_fd2_2_c0_c0_dija' mode="aspectFit" src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51774'></image>
            <text class='detailsQuestion_fd2_2_c0_c1_dija'>{{$t('我来回答')}}</text>
          </view>
        </view>
        <view class='flex align-stretch self-center justify-center detailsQuestion_fd2_3_dija'>
          <text>{{$t('——近期购买过该商品的用户，才有机会回答问——')}}</text>
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
        "popupShow1734666789994": false,
        /** answer_list【回答列表】
         *   question_info【问题信息】
         *   is_follow【当前会员是否关注】
         *   nickname【提问人昵称】
         *   avatar【提问人头像】
         *   is_anonymous【是否匿名】
         *   user_id【用户ID】
         *   create_time【时间】
         *   question_content【问题内容】
         *   goods_thumb【商品图片】
         *   goods_name【商品名称】
         *   goods_id【商品ID】
         *   aid【问题ID】 **/
        "dataDetails": {
          "question_info": {
            "aid": "",
            "goods_id": "",
            "goods_name": "",
            "goods_thumb": "",
            "question_content": "",
            "create_time": "",
            "user_id": "",
            "activity_id": "",
            "is_anonymous": "",
            "avatar": "",
            "nickname": "",
            "is_follow": ""
          },
          "answer_list": {
            "total": "",
            "per_page": "",
            "current_page": "",
            "last_page": "",
            "data": []
          }
        },
        /** is_collection【是否关注或点赞 0 否 1 是】 **/
        "dataGuanzhu": {
          "is_collection": 0
        },
        /** is_collection【是否关注或点赞 0 否 1 是】 **/
        "dataLike": {
          "is_collection": 0
        },
        "question_id": "104"
      };
    },
    computed: {
      userInfo: {
        get() {
          return this.$store.state.userInfo
        },
        set(value) {
          this.$store.commit('updateUserInfo', value)
        },
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
    onShow() {
      this.getDetailFunc()
    },
    onHide() {},
    onResize() {},
    onPullDownRefresh() {
      this.getDetailFunc()
    },
    onReachBottom(e) {},
    onPageScroll(e) {},
    methods: {
      //关注或取消关注
      async guanzhuFunc() {
        //请求方法
        //数据验证
        let datadataGuanzhu = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
          collect_id: this.dataDetails.question_info.aid,
          type: '1',
          question_id: this.question_id
        });
        if (datadataGuanzhu.data.code != 1) {
          this.$message.info(datadataGuanzhu.data.msg);
          return
        }
        let infodataGuanzhu = datadataGuanzhu.data;
        this.dataGuanzhu = infodataGuanzhu.data
        if (this.dataGuanzhu.is_collection == 0) {
          uni.showToast({
            title: this.$t('取消关注成功'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
        } else {
          uni.showToast({
            title: this.$t('关注成功'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
        }
        this.getDetailFunc()
      },
      //点赞或取消点赞
      async getLikeFunc(aid) {
        //请求方法
        //数据验证
        let datadataLike = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
          type: '2',
          question_id: this.question_id,
          collect_id: aid
        });
        if (datadataLike.data.code != 1) {
          this.$message.info(datadataLike.data.msg);
          return
        }
        let infodataLike = datadataLike.data;
        this.dataLike = infodataLike.data
        if (this.dataLike.is_collection == 0) {
          uni.showToast({
            title: this.$t('取消点赞成功'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
        } else {
          uni.showToast({
            title: this.$t('点赞成功'),
            mask: true,
            icon: 'none',
            duration: 1500
          });
        }
        this.getDetailFunc()
      },
      //商品问答-获得提问详情
      async getDetailFunc() {
        uni.showLoading({
          title: '加载中'
        })
        //请求方法
        //数据验证
        let datadataDetails = await this.$api.get(global.apiUrls.post6419b2547d627, {
          question_id: this.question_id
        });
        if (datadataDetails.data.code != 1) {
          this.$message.info(datadataDetails.data.msg);
          return
        }
        let infodataDetails = datadataDetails.data;
        this.dataDetails = infodataDetails.data
        uni.hideLoading()
      },
      //删除问题
      async deleteQuestionFunc(id) {
        //请求方法
        //数据验证
        let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
          type: '1',
          delete_id: id
        });
        if (data6419b4ef279bf.data.code != 1) {
          this.$message.info(data6419b4ef279bf.data.msg);
          return
        }
        let info6419b4ef279bf = data6419b4ef279bf.data;
        this.popupShow1734666789994 = false;
        uni.showToast({
          title: this.$t('删除成功'),
          mask: true,
          icon: 'none',
          duration: 1500
        });
        this.$urouter.navigateBack(1);
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

    .detailsQuestion_flex_2_dija {
      padding: 0rpx 24rpx 150rpx 24rpx;

      .detailsQuestion_fd2_0_dija {
        margin: 24rpx 0rpx 32rpx 0rpx;

        .detailsQuestion_fd2_0_c0_dija {
          width: 72rpx;
          height: 72rpx;
          border-radius: 8rpx;
        }

        .detailsQuestion_fd2_0_c1_dija {
          color: #333333;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          margin: 0rpx 0rpx 0rpx 24rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }

      .detailsQuestion_fd2_1_dija {
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        background: #FFFFFF;
        padding: 24rpx 24rpx 24rpx 24rpx;
        margin: 0rpx 0rpx 0rpx 0rpx;

        .detailsQuestion_fd2_1_c0_dija {
          padding: 0rpx 0rpx 24rpx 0rpx;
          border-bottom: 1px solid #eee;

          .detailsQuestion_fd2_1_c0_c1_dija {
            color: var(--benbenFontColor0);
            font-size: 28rpx;
            font-weight: 700;
            line-height: 40rpx;
            margin: 0rpx 16rpx 0rpx 16rpx;
          }
        }

        .detailsQuestion_fd2_1_c1_dija {
          margin: 24rpx 0rpx 0rpx 0rpx;

          .detailsQuestion_fd2_1_c1_c1_dija {
            color: var(--benbenFontColor5);
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            margin: 0rpx 0rpx 0rpx 16rpx;
          }
        }

        .detailsQuestion_fd2_1_c2_dija {
          margin: 24rpx 0rpx 0rpx 0rpx;
          background: #e9e8ed;
          background-size: 100% auto;
          padding: 24rpx;
          color: var(--benbenFontColor2);
        }

        .detailsQuestion_fd2_1_c3_dija {
          margin: 24rpx 0rpx 0rpx 0rpx;
          padding: 24rpx;
          color: var(--benbenFontColor2);
        }

        .detailsQuestion_fd2_1_c4_c0_dija {
          margin: 32rpx 0rpx 24rpx 0rpx;

          .detailsQuestion_fd2_1_c4_c0_c0_dija {
            width: 64rpx;
            height: 64rpx;
            border-radius: 32rpx 32rpx 32rpx 32rpx;
          }

          .detailsQuestion_fd2_1_c4_c0_c1_dija {
            margin: 0rpx 0rpx 0rpx 16rpx;

            .detailsQuestion_fd2_1_c4_c0_c1_c0_dija {
              color: #333333;
              font-size: 24rpx;
              font-weight: 400;
              line-height: 33rpx;
            }

            .detailsQuestion_fd2_1_c4_c0_c1_c1_dija {
              color: #999999;
              font-size: 22rpx;
              font-weight: 400;
              line-height: 30rpx;
              margin: 1rpx 0rpx 0rpx 0rpx;
            }
          }
        }

        .detailsQuestion_fd2_1_c4_c1_dija {
          padding: 0rpx 0rpx 24rpx 0rpx;

          .detailsQuestion_fd2_1_c4_c1_c0_dija {
            color: #333333;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
          }
        }
      }

      .detailsQuestion_fd2_2_dija {
        position: fixed;
        left: 0rpx;
        bottom: calc(40rpx + var(--benben-window-bottom, 0px));
        width: 750rpx;

        .detailsQuestion_fd2_2_c0_dija {
          border-radius: 44rpx 44rpx 44rpx 44rpx;
          background: var(--benbenbgColor0);
          padding: 18rpx 66rpx 17rpx 66rpx;

          .detailsQuestion_fd2_2_c0_c0_dija {
            width: 32rpx;
            height: 32rpx;
            border-radius: 0rpx 0rpx 0rpx 0rpx;
          }

          .detailsQuestion_fd2_2_c0_c1_dija {
            color: var(--benbenFontColor3);
            font-size: 32rpx;
            font-weight: 400;
            line-height: 45rpx;
            margin: 0rpx 0rpx 0rpx 16rpx;
          }
        }
      }

      .detailsQuestion_fd2_3_dija {
        margin: 24rpx 0rpx 0rpx 0rpx;
        color: var(--benbenFontColor2);
        font-size: 22rpx;
        padding: 24rpx;
      }
    }

    .detailsQuestion_fd2_1_c0_c0_dija {
      width: 40rpx;
      height: 40rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }

    .detailsQuestion_fd2_1_c0_c2_dija {
      margin: 0rpx 0rpx 0rpx auto;
    }

    .detailsQuestion_fd2_1_c0_c2_c0_dija {
      width: 26rpx;
      height: 24rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 12rpx 0rpx 0rpx;
    }

    .detailsQuestion_fd2_1_c0_c2_c1_dija {
      color: var(--benbenFontColor2);
      font-size: 22rpx;
      font-weight: 400;
    }

    .detailsQuestion_fd2_1_c0_c2_c1_1_dija {
      color: var(--benbenFontColor5);
      font-size: 22rpx;
      font-weight: 400;
      line-height: 30rpx;
    }

    .detailsQuestion_fd2_1_c1_c2_dija {
      color: var(--benbenFontColor5);
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
    }

    .detailsQuestion_fd2_1_c4_c1_c1_c0_dija {
      width: 24rpx;
      height: 26rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 8rpx 0rpx 0rpx;
    }

    .detailsQuestion_fd2_1_c4_c1_c1_c1_dija {
      color: var(--benbenFontColor7);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 28rpx;
    }

    .detailsQuestion_fd2_1_c4_c1_c1_c1_1_dija {
      color: var(--benbenFontColor0);
      font-size: 22rpx;
      font-weight: 400;
      line-height: 30rpx;
    }

    .detailsQuestion_fd1_0_dija {
      width: 540rpx;
      background: #fff;
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      overflow: hidden;

      .detailsQuestion_fd1_0_c0_dija {
        line-height: 44rpx;
        font-size: 36rpx;
        font-weight: 700;
        color: #333333;
        margin: 40rpx 0rpx 0rpx 0rpx;
      }

      .detailsQuestion_fd1_0_c1_dija {
        line-height: 44rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        text-align: center;
        margin: 32rpx 40rpx 0rpx 40rpx;
      }

      .detailsQuestion_fd1_0_c2_dija {
        border-top: 1px solid #eee;
        margin: 51rpx 0rpx 0rpx 0rpx;

        .detailsQuestion_fd1_0_c2_c0_dija {
          font-size: 32rpx;
          background: #fff;
          color: rgba(153, 153, 153, 1);
          width: 270rpx;
          height: 101rpx;
          line-height: 101rpx;
          font-weight: 400;
          border-right: 1px solid #eee;
        }

        .detailsQuestion_fd1_0_c2_c1_dija {
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

    .detailsQuestion_flex_0_dija {
      width: 750rpx;
      height: 88rpx;
      overflow: hidden;
      z-index: 10;
      top: 0rpx;
      background: #fff;
      background-size: 100% auto !important;

      .detailsQuestion_fd0_1_dija {
        color: #333333;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
      }
    }

    .detailsQuestion_fd0_0_dija {
      width: 100rpx;
      height: 88rpx;

      .detailsQuestion_fd0_0_c0_dija {
        width: 20rpx;
        height: 36rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;
      }
    }
  }
</style>
