<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex detailsQuestion_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center detailsQuestion_fd0_0_dija" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="detailsQuestion_fd0_0_c0_dija" mode="aspectFit" :src="STATIC_URL + '278.png'"></image>
        </view>
        <text class="detailsQuestion_fd0_1_dija">{{ $t('问题详情') }}</text>
        <view class="flex flex-wrap align-center detailsQuestion_fd0_0_dija"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1734666789994" :mask="true" :mask-close-able="false" mode="center">
        <!---清除本地缓存flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center detailsQuestion_fd1_0_dija">
            <text class="detailsQuestion_fd1_0_c0_dija">{{ $t('提示') }}</text>
            <text class="detailsQuestion_fd1_0_c1_dija">{{ $t('确认删除此问题吗？') }}</text>
            <view class="flex align-center detailsQuestion_fd1_0_c2_dija">
              <button class="detailsQuestion_fd1_0_c2_c0_dija" @tap.stop="popupShow1734666789994 = false">{{ $t('取消') }}</button>
              <button class="detailsQuestion_fd1_0_c2_c1_dija" @tap.stop="deleteQuestionFunc(dataDetails.question_info.aid)">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>
        <!---清除本地缓存flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout detailsQuestion_flex_2_dija">
        <view class="detailsQuestion_product-card">
          <view class="flex flex-wrap align-center detailsQuestion_fd2_0_dija">
            <image class="detailsQuestion_fd2_0_c0_dija" mode="aspectFill" :src="dataDetails.question_info.goods_thumb"></image>
            <text class="flex-sub detailsQuestion_fd2_0_c1_dija">{{ dataDetails.question_info.goods_name }}</text>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch detailsQuestion_fd2_1_dija">
          <view class="flex align-start detailsQuestion_fd2_1_c0_dija">
            <view class="detailsQuestion_q-badge">Q</view>
            <text class="flex-sub detailsQuestion_fd2_1_c0_c1_dija">{{ dataDetails.question_info.question_content }}</text>
            <view
              class="flex flex-wrap align-center detailsQuestion_action-chip detailsQuestion_action-chip--follow"
              @tap.stop="guanzhuFunc()"
              v-if="dataDetails.question_info.user_id != userInfo.id"
            >
              <image
                class="detailsQuestion_fd2_1_c0_c2_c0_dija"
                mode="aspectFit"
                src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51770"
                v-if="dataDetails.question_info.is_follow != '1'"
              ></image>
              <image
                class="detailsQuestion_fd2_1_c0_c2_c0_dija"
                mode="aspectFit"
                src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/62660"
                v-if="dataDetails.question_info.is_follow == '1'"
              ></image>
              <text class="detailsQuestion_fd2_1_c0_c2_c1_dija" v-if="dataDetails.question_info.is_follow != '1'">{{ $t('关注') }}</text>
              <text class="detailsQuestion_fd2_1_c0_c2_c1_1_dija" v-if="dataDetails.question_info.is_follow == '1'">{{ $t('已关注') }}</text>
            </view>
            <view
              class="flex flex-wrap align-center detailsQuestion_action-chip detailsQuestion_action-chip--delete"
              @tap.stop="popupShow1734666789994 = true"
              v-if="dataDetails.question_info.user_id == userInfo.id"
            >
              <image
                class="detailsQuestion_fd2_1_c0_c2_c0_dija"
                mode="aspectFit"
                src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/52648"
              ></image>
              <text class="detailsQuestion_fd2_1_c0_c2_c1_dija">{{ $t('删除') }}</text>
            </view>
          </view>
          <view class="flex flex-wrap align-center detailsQuestion_fd2_1_c1_dija" v-if="dataDetails.answer_list.data.length > 0">
            <text class="detailsQuestion_answer-count-label">{{ $t('共') }}</text>
            <text class="detailsQuestion_fd2_1_c1_c2_dija">{{ dataDetails.answer_list.total }}</text>
            <text class="detailsQuestion_answer-count-label">{{ $t('条用户回答') }}</text>
          </view>
          <view class="detailsQuestion_empty" v-if="dataDetails.answer_list.data.length == 0">
            <view class="detailsQuestion_empty-icon">💬</view>
            <text class="detailsQuestion_empty-title">{{ $t('暂无回答') }}</text>
            <text class="detailsQuestion_empty-sub">{{ $t('回答的人正在赶来的路上...') }}</text>
          </view>
          <template v-for="(item, key0) in dataDetails.answer_list.data">
            <view class="detailsQuestion_answer-card" :key="key0">
              <view class="flex flex-wrap align-center detailsQuestion_fd2_1_c4_c0_dija">
                <image class="detailsQuestion_fd2_1_c4_c0_c0_dija" mode="aspectFill" :src="item.avatar"></image>
                <view class="flex flex-direction flex-wrap align-stretch flex-sub detailsQuestion_fd2_1_c4_c0_c1_dija">
                  <text class="detailsQuestion_fd2_1_c4_c0_c1_c0_dija">{{ item.nickname }}</text>
                  <text class="detailsQuestion_fd2_1_c4_c0_c1_c1_dija">{{ item.create_time }}</text>
                </view>
                <view
                  class="flex flex-wrap align-center detailsQuestion_like-chip"
                  :class="{ 'detailsQuestion_like-chip--active': item.is_likes == '1' }"
                  @tap.stop="getLikeFunc(item.aid)"
                >
                  <image
                    class="detailsQuestion_fd2_1_c4_c1_c1_c0_dija"
                    mode="aspectFit"
                    src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/65300"
                    v-if="item.is_likes == '1'"
                  ></image>
                  <image
                    class="detailsQuestion_fd2_1_c4_c1_c1_c0_dija"
                    mode="aspectFit"
                    src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51756"
                    v-if="item.is_likes != '1'"
                  ></image>
                  <text class="detailsQuestion_fd2_1_c4_c1_c1_c1_dija" v-if="item.is_likes == '1'">{{ item.like_num }}</text>
                  <text class="detailsQuestion_fd2_1_c4_c1_c1_c1_1_dija" v-if="item.is_likes != '1'">{{ $t('点赞') }}</text>
                </view>
              </view>
              <view class="flex flex-wrap align-start detailsQuestion_fd2_1_c4_c1_dija">
                <!-- <view class="detailsQuestion_a-badge">A</view> -->
                <text class="flex-sub detailsQuestion_fd2_1_c4_c1_c0_dija">{{ item.answer_content }}</text>
              </view>
            </view>
          </template>
        </view>
        <view class="detailsQuestion_footer">
          <view class="flex flex-wrap align-center justify-center detailsQuestion_fd2_2_dija">
            <view
              class="flex flex-wrap align-center detailsQuestion_fd2_2_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/answer/answer?question_id=${question_id}`"
            >
              <image
                class="detailsQuestion_fd2_2_c0_c0_dija"
                mode="aspectFit"
                src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51774"
              ></image>
              <text class="detailsQuestion_fd2_2_c0_c1_dija">{{ $t('我来回答') }}</text>
            </view>
          </view>
          <view class="flex align-stretch self-center justify-center detailsQuestion_fd2_3_dija">
            <text>{{ $t('——近期购买过该商品的用户，才有机会回答问——') }}</text>
          </view>
        </view>
      </view>
      <!---flex布局flex布局结束-->
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'
export default {
  components: {},
  data() {
    return {
      popupShow1734666789994: false,
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
      dataDetails: {
        question_info: {
          aid: '',
          goods_id: '',
          goods_name: '',
          goods_thumb: '',
          question_content: '',
          create_time: '',
          user_id: '',
          activity_id: '',
          is_anonymous: '',
          avatar: '',
          nickname: '',
          is_follow: '',
        },
        answer_list: {
          total: '',
          per_page: '',
          current_page: '',
          last_page: '',
          data: [],
        },
      },
      /** is_collection【是否关注或点赞 0 否 1 是】 **/
      dataGuanzhu: {
        is_collection: 0,
      },
      /** is_collection【是否关注或点赞 0 否 1 是】 **/
      dataLike: {
        is_collection: 0,
      },
      question_id: '104',
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
  },
  watch: {},
  onLoad(options) {
    let { question_id } = options
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
        question_id: this.question_id,
      })
      if (datadataGuanzhu.data.code != 1) {
        this.$message.info(datadataGuanzhu.data.msg)
        return
      }
      let infodataGuanzhu = datadataGuanzhu.data
      this.dataGuanzhu = infodataGuanzhu.data
      if (this.dataGuanzhu.is_collection == 0) {
        uni.showToast({
          title: this.$t('取消关注成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      } else {
        uni.showToast({
          title: this.$t('关注成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
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
        collect_id: aid,
      })
      if (datadataLike.data.code != 1) {
        this.$message.info(datadataLike.data.msg)
        return
      }
      let infodataLike = datadataLike.data
      this.dataLike = infodataLike.data
      if (this.dataLike.is_collection == 0) {
        uni.showToast({
          title: this.$t('取消点赞成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      } else {
        uni.showToast({
          title: this.$t('点赞成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }
      this.getDetailFunc()
    },
    //商品问答-获得提问详情
    async getDetailFunc() {
      uni.showLoading({
        title: '加载中',
      })
      //请求方法
      //数据验证
      let datadataDetails = await this.$api.get(global.apiUrls.post6419b2547d627, {
        question_id: this.question_id,
      })
      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data
      uni.hideLoading()
    },
    //删除问题
    async deleteQuestionFunc(id) {
      //请求方法
      //数据验证
      let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
        type: '1',
        delete_id: id,
      })
      if (data6419b4ef279bf.data.code != 1) {
        this.$message.info(data6419b4ef279bf.data.msg)
        return
      }
      let info6419b4ef279bf = data6419b4ef279bf.data
      this.popupShow1734666789994 = false
      uni.showToast({
        title: this.$t('删除成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.$urouter.navigateBack(1)
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

  .detailsQuestion_flex_2_dija {
    padding: 24rpx 24rpx 240rpx;

    .detailsQuestion_product-card {
      background: #fff;
      border-radius: 24rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
      border: 1rpx solid rgba(16, 24, 40, 0.04);
    }

    .detailsQuestion_fd2_0_dija {
      margin: 0;

      .detailsQuestion_fd2_0_c0_dija {
        width: 88rpx;
        height: 88rpx;
        border-radius: 16rpx;
        flex-shrink: 0;
        background: #f3f4f6;
      }

      .detailsQuestion_fd2_0_c1_dija {
        color: #222;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 42rpx;
        margin-left: 20rpx;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .detailsQuestion_fd2_1_dija {
      border-radius: 24rpx;
      background: #ffffff;
      padding: 28rpx 24rpx;
      box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
      border: 1rpx solid rgba(16, 24, 40, 0.04);

      .detailsQuestion_q-badge {
        width: 44rpx;
        height: 44rpx;
        border-radius: 12rpx;
        background: rgba(184, 36, 65, 0.1);
        color: var(--benbenFontColor5);
        font-size: 24rpx;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-right: 16rpx;
        margin-top: 2rpx;
      }

      .detailsQuestion_fd2_1_c0_dija {
        padding-bottom: 28rpx;
        border-bottom: 1rpx solid #f0f0f0;

        .detailsQuestion_fd2_1_c0_c1_dija {
          color: #1a1a1a;
          font-size: 32rpx;
          font-weight: 700;
          line-height: 48rpx;
        }
      }

      .detailsQuestion_fd2_1_c1_dija {
        margin-top: 24rpx;
        padding: 12rpx 20rpx;
        background: #f8f9fb;
        border-radius: 999rpx;
        display: inline-flex;
        width: auto;

        .detailsQuestion_answer-count-label {
          color: #999;
          font-size: 26rpx;
          font-weight: 400;
          line-height: 36rpx;
        }
      }

      .detailsQuestion_empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 64rpx 32rpx;
        margin-top: 16rpx;
        background: #f8f9fb;
        border-radius: 20rpx;

        .detailsQuestion_empty-icon {
          font-size: 64rpx;
          line-height: 1;
          margin-bottom: 20rpx;
        }

        .detailsQuestion_empty-title {
          font-size: 30rpx;
          font-weight: 600;
          color: #666;
          line-height: 42rpx;
        }

        .detailsQuestion_empty-sub {
          font-size: 26rpx;
          color: #bbb;
          line-height: 38rpx;
          margin-top: 8rpx;
        }
      }

      .detailsQuestion_answer-card {
        margin-top: 28rpx;
        padding-top: 28rpx;
        border-top: 1rpx solid #f5f5f5;

        &:first-of-type {
          border-top: none;
          padding-top: 0;
          margin-top: 24rpx;
        }
      }

      .detailsQuestion_fd2_1_c4_c0_dija {
        margin: 0 0 16rpx;

        .detailsQuestion_fd2_1_c4_c0_c0_dija {
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
          flex-shrink: 0;
          border: 2rpx solid #f0f0f0;
        }

        .detailsQuestion_fd2_1_c4_c0_c1_dija {
          margin-left: 16rpx;

          .detailsQuestion_fd2_1_c4_c0_c1_c0_dija {
            color: #333;
            font-size: 28rpx;
            font-weight: 600;
            line-height: 40rpx;
          }

          .detailsQuestion_fd2_1_c4_c0_c1_c1_dija {
            color: #bbb;
            font-size: 22rpx;
            font-weight: 400;
            line-height: 30rpx;
            margin-top: 4rpx;
          }
        }
      }

      .detailsQuestion_a-badge {
        width: 36rpx;
        height: 36rpx;
        border-radius: 8rpx;
        background: rgba(52, 168, 83, 0.1);
        color: #34a853;
        font-size: 20rpx;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-right: 12rpx;
        margin-top: 4rpx;
      }

      .detailsQuestion_fd2_1_c4_c1_dija {
        padding: 0 0 0 88rpx;

        .detailsQuestion_fd2_1_c4_c1_c0_dija {
          color: #444;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 44rpx;
        }
      }
    }

    .detailsQuestion_footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 750rpx;
      padding: 16rpx 32rpx calc(16rpx + var(--benben-window-bottom, 0px));
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(12px);
      box-shadow: 0 -4rpx 24rpx rgba(15, 23, 42, 0.06);
      z-index: 10;
    }

    .detailsQuestion_fd2_2_dija {
      width: 100%;

      .detailsQuestion_fd2_2_c0_dija {
        width: 100%;
        border-radius: 999rpx;
        background: var(--benbenbgColor3);
        padding: 24rpx 48rpx;
        justify-content: center;
        box-shadow: 0 12rpx 32rpx rgba(184, 36, 65, 0.22);

        .detailsQuestion_fd2_2_c0_c0_dija {
          width: 36rpx;
          height: 36rpx;
        }

        .detailsQuestion_fd2_2_c0_c1_dija {
          color: #fff;
          font-size: 32rpx;
          font-weight: 600;
          line-height: 44rpx;
          margin-left: 12rpx;
        }
      }
    }

    .detailsQuestion_fd2_3_dija {
      margin-top: 12rpx;
      color: #bbb;
      font-size: 22rpx;
      padding: 0;
      text-align: center;
    }
  }

  .detailsQuestion_action-chip {
    flex-shrink: 0;
    padding: 10rpx 20rpx;
    border-radius: 999rpx;
    margin-left: 12rpx;
    margin-top: 4rpx;

    &--follow {
      background: #f8f9fb;
    }

    &--delete {
      background: rgba(255, 77, 79, 0.08);
    }
  }

  .detailsQuestion_like-chip {
    flex-shrink: 0;
    padding: 8rpx 20rpx;
    border-radius: 999rpx;
    background: #f8f9fb;
    margin-left: auto;

    &--active {
      background: rgba(184, 36, 65, 0.08);
    }
  }

  .detailsQuestion_fd2_1_c0_c2_c0_dija {
    width: 26rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }

  .detailsQuestion_fd2_1_c0_c2_c1_dija {
    color: #999;
    font-size: 24rpx;
    font-weight: 400;
  }

  .detailsQuestion_fd2_1_c0_c2_c1_1_dija {
    color: var(--benbenFontColor5);
    font-size: 24rpx;
    font-weight: 500;
  }

  .detailsQuestion_fd2_1_c1_c2_dija {
    color: var(--benbenFontColor5);
    font-size: 28rpx;
    font-weight: 700;
    line-height: 36rpx;
    margin: 0 6rpx;
  }

  .detailsQuestion_fd2_1_c4_c1_c1_c0_dija {
    width: 28rpx;
    height: 28rpx;
    margin-right: 6rpx;
  }

  .detailsQuestion_fd2_1_c4_c1_c1_c1_dija {
    color: var(--benbenFontColor7);
    font-size: 24rpx;
    font-weight: 600;
  }

  .detailsQuestion_fd2_1_c4_c1_c1_c1_1_dija {
    color: #999;
    font-size: 24rpx;
    font-weight: 400;
  }

  .detailsQuestion_fd1_0_dija {
    width: 560rpx;
    background: #fff;
    border-radius: 28rpx;
    overflow: hidden;
    box-shadow: 0 24rpx 64rpx rgba(15, 23, 42, 0.12);

    .detailsQuestion_fd1_0_c0_dija {
      line-height: 44rpx;
      font-size: 34rpx;
      font-weight: 700;
      color: #1a1a1a;
      margin-top: 48rpx;
    }

    .detailsQuestion_fd1_0_c1_dija {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666;
      text-align: center;
      margin: 24rpx 48rpx 0;
    }

    .detailsQuestion_fd1_0_c2_dija {
      width: 100%;
      border-top: 1rpx solid #f0f0f0;
      margin-top: 48rpx;

      .detailsQuestion_fd1_0_c2_c0_dija {
        flex: 1;
        font-size: 30rpx;
        background: #fff;
        color: #999;
        height: 96rpx;
        line-height: 96rpx;
        font-weight: 400;
        border-right: 1rpx solid #f0f0f0;
        border-radius: 0;
      }

      .detailsQuestion_fd1_0_c2_c1_dija {
        flex: 1;
        font-size: 30rpx;
        background: #fff;
        color: var(--benbenFontColor5);
        height: 96rpx;
        line-height: 96rpx;
        font-weight: 600;
        border-radius: 0;
      }
    }
  }

  .detailsQuestion_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0;
    background: #fff;
    border-bottom: 1rpx solid rgba(16, 24, 40, 0.06);
    box-shadow: 0 2rpx 12rpx rgba(15, 23, 42, 0.04);

    .detailsQuestion_fd0_1_dija {
      color: #1a1a1a;
      font-size: 34rpx;
      font-weight: 700;
      line-height: 50rpx;
    }
  }

  .detailsQuestion_fd0_0_dija {
    width: 100rpx;
    height: 88rpx;

    .detailsQuestion_fd0_0_c0_dija {
      width: 20rpx;
      height: 36rpx;
      margin-left: 32rpx;
    }
  }
}
</style>
