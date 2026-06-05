<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex questionsAnswers_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center questionsAnswers_fd0_0_dija" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="questionsAnswers_fd0_0_c0_dija" mode="aspectFit" :src="STATIC_URL + '278.png'"></image>
        </view>
        <text class="questionsAnswers_fd0_1_dija">{{ $t('我的问答') }}</text>
        <view class="flex flex-wrap align-center questionsAnswers_fd0_0_dija"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="questionsAnswers_tabs-wrap">
          <benben-flex-tabs
            class-text="questionsAnswers_benbenTabsfd1_0_dija"
            v-model="tabs"
            ref="benben_tabsfd1_0"
            select-mark="benben_tabsfd1_0"
            key="benben_tabsfd1_0"
            :open-title-type="false"
            :open-sticky="true"
            :top="0"
            :is-show-content="false"
            :scrollspy="false"
            :tabs-info.sync="tabsInfofd1_0"
            @change="getListFunc()"
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
                <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex flex align-center">
                  <view
                    :class="{ checkTitlefd1_0_dija: tabs == 'question', 'flex flex-wrap align-center questionsAnswers_tab-item': true }"
                    @tap="tabs = 'question'"
                    :id="`benben_tabsfd1_0-title-item-${'question'}`"
                  >
                    <text class="questionsAnswers_titleItemfd1_0_c3_c0_dija">{{ $t('提问') }}</text>
                    <text class="questionsAnswers_tab-badge" v-if="dataNum.question_num > 0">{{ dataNum.question_num }}</text>
                  </view>
                  <view
                    :class="{ checkTitlefd1_0_dija: tabs == 'answer', 'flex flex-wrap align-center questionsAnswers_tab-item': true }"
                    @tap="tabs = 'answer'"
                    :id="`benben_tabsfd1_0-title-item-${'answer'}`"
                  >
                    <text class="questionsAnswers_titleItemfd1_0_c3_c0_dija">{{ $t('回答') }}</text>
                    <text class="questionsAnswers_tab-badge" v-if="dataNum.answer_num > 0">{{ dataNum.answer_num }}</text>
                  </view>
                  <!-- <view
                    :class="{ checkTitlefd1_0_dija: tabs == 'follow', 'flex flex-wrap align-center questionsAnswers_tab-item': true }"
                    @tap="tabs = 'follow'"
                    :id="`benben_tabsfd1_0-title-item-${'follow'}`"
                  >
                    <text class="questionsAnswers_titleItemfd1_0_c3_c0_dija">{{ $t('关注') }}</text>
                    <text class="questionsAnswers_tab-badge" v-if="dataNum.follow_num > 0">{{ dataNum.follow_num }}</text>
                  </view> -->
                  <view
                    :class="{ checkTitlefd1_0_dija: tabs == 'likes', 'flex flex-wrap align-center questionsAnswers_tab-item': true }"
                    @tap="tabs = 'likes'"
                    :id="`benben_tabsfd1_0-title-item-${'likes'}`"
                  >
                    <text class="questionsAnswers_titleItemfd1_0_c3_c0_dija">{{ $t('点赞') }}</text>
                    <text class="questionsAnswers_tab-badge" v-if="dataNum.likes_num > 0">{{ dataNum.likes_num }}</text>
                  </view>
                </view>
                <view
                  :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth }"
                  id="benben_tabsfd1_0-line"
                  class="benben-tabs-line flex benben-flex-tabs-line questionsAnswers_linefd1_0_dija"
                  :class="{ 'benben-tabs-line-active': tabsInfofd1_0.isInit }"
                ></view>
              </view>
            </scroll-view>
          </benben-flex-tabs>
        </view>
        <view class="questionsAnswers_list-wrap">
          <template v-for="(item, key0) in dataList">
            <view
              class="flex flex-direction flex-wrap align-stretch questionsAnswers_fd1_1_dija"
              @tap.stop="goAnwerFunc(item.question_id, item.goodsquestion_id)"
              :key="key0"
            >
              <view class="flex flex-wrap align-center">
                <image class="questionsAnswers_fd1_1_c0_c0_dija" mode="aspectFill" :src="item.goods_thumb"></image>
                <text class="flex-sub questionsAnswers_fd1_1_c0_c1_dija">{{ item.goods_name }}</text>
                <view
                  class="flex flex-wrap align-center questionsAnswers_fd1_1_c0_c2_dija"
                  @tap.stop="clickDltFunc(item.question_id, item.goodsquestion_id, item.answer_id)"
                >
                  <image
                    class="questionsAnswers_fd1_1_c0_c2_c0_dija"
                    mode="aspectFit"
                    src="https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51767"
                  ></image>
                  <text class="questionsAnswers_fd1_1_c0_c2_c1_dija">{{ $t('删除') }}</text>
                </view>
              </view>
              <view class="questionsAnswers_question-row">
                <view class="questionsAnswers_q-badge">Q</view>
                <text class="flex-sub questionsAnswers_fd1_1_c1_dija">{{ item.question_content }}</text>
              </view>
              <view class="flex flex-wrap align-center questionsAnswers_meta-row">
                <text class="questionsAnswers_fd1_1_c2_c0_dija">{{ item.create_time }}</text>
                <view class="questionsAnswers_answer-tag" v-if="item.answer_number > 0">
                  <text class="questionsAnswers_fd1_1_c2_c1_dija">{{ item.answer_number }}</text>
                  <text class="questionsAnswers_fd1_1_c2_c2_dija">{{ $t('人回答') }}</text>
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
      <benben-popup v-model="popupShow1711005831489" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---清除本地缓存flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center questionsAnswers_fd2_0_dija">
            <text class="questionsAnswers_fd2_0_c0_dija">{{ $t('提示') }}</text>
            <text class="questionsAnswers_fd2_0_c1_dija">{{ $t('是否确认删除？') }}</text>
            <view class="flex align-center questionsAnswers_fd2_0_c2_dija">
              <button class="questionsAnswers_fd2_0_c2_c0_dija" @tap.stop="popupShow1711005831489 = false">{{ $t('取消') }}</button>
              <button class="questionsAnswers_fd2_0_c2_c1_dija" @tap.stop="deleteanswerFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>
        <!---清除本地缓存flex布局结束-->
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
      popupShow1711005831489: false,
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
      tabs: 'question',
      dataList: [],
      /** likes_num【点赞】
       *   follow_num【关注】
       *   answer_num【回答】
       *   question_num【提问】 **/
      dataNum: {
        question_num: '',
        answer_num: '',
        follow_num: '',
        likes_num: '',
      },
      type: '1',
      /** is_collection【是否关注或点赞 0 否 1 是】 **/ dataBack: {
        is_collection: 0,
      },
      question_id: '',
      goodsquestion_id: '',
      answer_id: '',
      goods_id: '125',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { goods_id } = options
    if (goods_id !== undefined) this.goods_id = goods_id
    this.getListFunc()
    this.getNumFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getNumFunc()
    this.getListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //获取数量
    async getNumFunc() {
      //请求方法
      //数据验证
      let datadataNum = await this.$api.get(global.apiUrls.post649aa87f7b4fc, {})
      if (datadataNum.data.code != 1) {
        this.$message.info(datadataNum.data.msg)
        return
      }
      let infodataNum = datadataNum.data
      this.dataNum = infodataNum.data
    },
    //删除问答
    async deleteanswerFunc() {
      if (this.tabs == 'question') {
        this.type = '1'
        //请求方法
        //数据验证
        let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
          type: this.type,
          delete_id: this.question_id,
        })
        if (data6419b4ef279bf.data.code != 1) {
          this.$message.info(data6419b4ef279bf.data.msg)
          return
        }
        let info6419b4ef279bf = data6419b4ef279bf.data
      } else if (this.tabs == 'answer') {
        this.type = '2'
        //请求方法
        //数据验证
        let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
          type: this.type,
          delete_id: this.goodsquestion_id,
        })
        if (data6419b4ef279bf.data.code != 1) {
          this.$message.info(data6419b4ef279bf.data.msg)
          return
        }
        let info6419b4ef279bf = data6419b4ef279bf.data
      } else if (this.tabs == 'follow') {
        this.type = '1'
        //请求方法
        //数据验证
        let datadataBack = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
          type: this.type,
          collect_id: this.question_id,
          question_id: this.question_id,
        })
        if (datadataBack.data.code != 1) {
          this.$message.info(datadataBack.data.msg)
          return
        }
        let infodataBack = datadataBack.data
        this.dataBack = infodataBack.data
      } else if (this.tabs == 'likes') {
        this.type = '2'
        //请求方法
        //数据验证
        let datadataBack = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
          type: this.type,
          collect_id: this.answer_id,
          question_id: this.question_id,
        })
        if (datadataBack.data.code != 1) {
          this.$message.info(datadataBack.data.msg)
          return
        }
        let infodataBack = datadataBack.data
        this.dataBack = infodataBack.data
      }
      uni.showToast({
        title: this.$t('删除成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.getListFunc()
      this.getNumFunc()
      this.popupShow1711005831489 = false
    },
    //商品问答-获取商品提问列表
    getListFunc() {
      this.minixPagingListsApi = global.apiUrls.post649aaab29ce9b
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        type: this.tabs,
      }
      this.listData = []
      this.dataList = this.listData
      this.pagingListToggle()
    },
    //跳转问答详情
    goAnwerFunc(question_id, answer_id) {
      if (this.tabs == 'answer') {
        this.$urouter.navigateTo(`/pages/fl/detailsQuestion/detailsQuestion?question_id=${answer_id}`)
      } else {
        this.$urouter.navigateTo(`/pages/fl/detailsQuestion/detailsQuestion?question_id=${question_id}`)
      }
    },
    //确认删除问答
    clickDltFunc(question_id, goodsquestion_id, answer_id) {
      this.question_id = question_id
      this.goodsquestion_id = goodsquestion_id
      this.answer_id = answer_id
      this.popupShow1711005831489 = true
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

  .questionsAnswers_tabs-wrap {
    background: #fff;
    box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.04);
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .questionsAnswers_list-wrap {
    padding: 8rpx 0 32rpx;
  }

  .questionsAnswers_fd2_0_dija {
    width: 560rpx;
    background: #fff;
    border-radius: 28rpx;
    overflow: hidden;
    box-shadow: 0 24rpx 64rpx rgba(15, 23, 42, 0.12);

    .questionsAnswers_fd2_0_c0_dija {
      line-height: 44rpx;
      font-size: 34rpx;
      font-weight: 700;
      color: #1a1a1a;
      margin-top: 48rpx;
    }

    .questionsAnswers_fd2_0_c1_dija {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666;
      text-align: center;
      margin: 24rpx 48rpx 0;
    }

    .questionsAnswers_fd2_0_c2_dija {
      width: 100%;
      margin-top: 48rpx;
      border-top: 1rpx solid #f0f0f0;

      .questionsAnswers_fd2_0_c2_c0_dija {
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

      .questionsAnswers_fd2_0_c2_c1_dija {
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

  .checkTitlefd1_0_dija {
    font-weight: 700 !important;
    color: var(--benbenFontColor5) !important;
    background-color: rgba(184, 36, 65, 0.08) !important;
    border-radius: 999rpx !important;
  }

  .questionsAnswers_tab-item {
    padding: 12rpx 20rpx;
    border-radius: 999rpx;
    transition: all 0.2s ease;
    gap: 8rpx;
  }

  .questionsAnswers_tab-badge {
    font-size: 20rpx;
    font-weight: 600;
    color: #fff;
    background: var(--benbenFontColor5);
    min-width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    border-radius: 999rpx;
    padding: 0 8rpx;
  }

  .checkTitlefd1_0_dija .questionsAnswers_tab-badge {
    background: var(--benbenFontColor5);
  }

  .questionsAnswers_linefd1_0_dija {
    display: none;
  }

  .questionsAnswers_titleItemfd1_0_c3_c0_dija {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: #666;
    margin: 0 44rpx;
  }

  .checkTitlefd1_0_dija .questionsAnswers_titleItemfd1_0_c3_c0_dija {
    color: var(--benbenFontColor5);
  }

  .questionsAnswers_fd1_1_dija {
    border-radius: 24rpx;
    background: #ffffff;
    padding: 24rpx;
    margin: 16rpx 24rpx 0;
    box-shadow: 0 8rpx 28rpx rgba(15, 23, 42, 0.06);
    border: 1rpx solid rgba(16, 24, 40, 0.04);
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.985);
      background: #fafbfc;
    }

    .questionsAnswers_fd1_1_c0_c0_dija {
      width: 72rpx;
      height: 72rpx;
      border-radius: 12rpx;
      flex-shrink: 0;
      background: #f3f4f6;
    }

    .questionsAnswers_fd1_1_c0_c1_dija {
      color: #666;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 36rpx;
      margin: 0 16rpx;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .questionsAnswers_fd1_1_c0_c2_dija {
      flex-shrink: 0;
      padding: 8rpx 16rpx;
      border-radius: 999rpx;
      background: #f8f9fb;

      .questionsAnswers_fd1_1_c0_c2_c0_dija {
        width: 22rpx;
        height: 26rpx;
      }

      .questionsAnswers_fd1_1_c0_c2_c1_dija {
        color: #999;
        font-size: 22rpx;
        font-weight: 400;
        margin-left: 6rpx;
      }
    }

    .questionsAnswers_question-row {
      display: flex;
      align-items: flex-start;
      margin-top: 20rpx;
    }

    .questionsAnswers_q-badge {
      width: 36rpx;
      height: 36rpx;
      border-radius: 8rpx;
      background: rgba(184, 36, 65, 0.1);
      color: var(--benbenFontColor5);
      font-size: 20rpx;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-right: 12rpx;
      margin-top: 4rpx;
    }

    .questionsAnswers_fd1_1_c1_dija {
      color: #1a1a1a;
      font-size: 30rpx;
      font-weight: 600;
      line-height: 44rpx;
    }

    .questionsAnswers_meta-row {
      margin-top: 20rpx;
      padding-top: 16rpx;
      border-top: 1rpx solid #f5f5f5;
    }

    .questionsAnswers_fd1_1_c2_c0_dija {
      color: #bbb;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 33rpx;
    }

    .questionsAnswers_answer-tag {
      margin-left: auto;
      display: flex;
      align-items: center;
      padding: 4rpx 16rpx;
      border-radius: 999rpx;
      background: rgba(184, 36, 65, 0.08);
    }

    .questionsAnswers_fd1_1_c2_c1_dija {
      color: var(--benbenFontColor5);
      font-size: 24rpx;
      font-weight: 600;
      line-height: 33rpx;
    }

    .questionsAnswers_fd1_1_c2_c2_dija {
      color: var(--benbenFontColor5);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 33rpx;
      margin-left: 4rpx;
    }
  }

  .questionsAnswers_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0;
    background: #fff;
    border-bottom: 1rpx solid rgba(16, 24, 40, 0.06);
    box-shadow: 0 2rpx 12rpx rgba(15, 23, 42, 0.04);

    .questionsAnswers_fd0_1_dija {
      color: #1a1a1a;
      font-size: 34rpx;
      font-weight: 700;
      line-height: 50rpx;
    }
  }

  .questionsAnswers_fd0_0_dija {
    width: 100rpx;
    height: 88rpx;

    .questionsAnswers_fd0_0_c0_dija {
      width: 20rpx;
      height: 36rpx;
      margin-left: 32rpx;
    }
  }
}

::v-deep .questionsAnswers_benbenTabsfd1_0_dija {
  width: 750rpx;
  height: 96rpx;
  white-space: nowrap;
  background: #fff;
  text-align: center;
  padding: 8rpx 16rpx;
  box-sizing: border-box;
}
</style>
