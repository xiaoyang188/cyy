<template>
  <page-body>
    <view class="page">
      <view class="flex benben-position-layout flex flex-wrap align-center articleList_flex_0_babdd"
        :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
        <view class='flex flex-wrap align-center justify-between flex-sub articleList_fd0_0_babdd'>
          <view class='flex flex-wrap align-center justify-center articleList_fd0_0_c0_babdd' @tap.stop="handleJumpDiy"
            data-type="back" data-url="1">
            <text class='fu-iconfont2  articleList_fd0_0_c0_c0_babdd'>&#xE794;</text>
          </view>
          <view class='flex flex-wrap align-stretch justify-center'>
            <text class='articleList_fd0_0_c1_c0_babdd'>{{$t('商城头条')}}</text>
          </view>
          <view class='flex flex-wrap align-center articleList_fd0_0_c0_babdd'>
          </view>
        </view>

      </view>
      <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
       <!-- <view>
          <benben-flex-tabs class-text='articleList_benbenTabsfd1_0_babdd' v-model="tabs" ref="benben_tabsfd1_0"
            select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='0'
            :is-show-content='false' :scrollspy='false' :tabs-info.sync="tabsInfofd1_0" @change="getListFunc()">

            <scroll-view :throttle='false' @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft"
              id="benben_tabsfd1_0" class="benben-tabs" style="width:750rpx" :scroll-x="true"
              :scroll-left="tabsInfofd1_0.moveX" scroll-with-animation="all .3s ease" :show-scrollbar='false'
              :enhanced="true">
              <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
                <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex align-center flex ">
                  <template v-for='(item,key0) in dataType'>
                    <view :key='key0'
                      :class="{ 'checkTitlefd1_0_babdd': tabs == item.category_id, 'flex flex-wrap align-center articleList_titlefd1_0_c3_babdd': true }"
                      @tap="tabs = item.category_id" :id="`benben_tabsfd1_0-title-item-${item.category_id}`">

                      <text class='articleList_titleItemfd1_0_c3_c0_babdd'>{{item.category_name}}</text>

                    </view>
                  </template>
                </view>
                <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}"
                  id="benben_tabsfd1_0-line"
                  class="benben-tabs-line flex benben-flex-tabs-line articleList_linefd1_0_babdd"
                  :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
              </view>
            </scroll-view>

          </benben-flex-tabs>

        </view> -->
        <view class='flex flex-direction align-stretch'>
          <template v-for='(item,key0) in dataList'>
            <view class='flex align-center articleList_fd1_1_c0_babdd' @tap.stop="handleJumpDiy" data-type="navigateTo"
              :data-url="`/pages/sy/articleDetails/articleDetails?id=${item.aid}`" v-if=" item.thumb!=''" :key='key0'>
              <image class='articleList_fd1_1_c0_c0_babdd' mode="aspectFill" :src='item.thumb'></image>
              <view class='flex flex-direction flex-wrap align-stretch flex-sub articleList_fd1_1_c0_c1_babdd'>
                <text class='articleList_fd1_1_c0_c1_c0_babdd'>{{item.title}}</text>
                <view class='flex flex-wrap align-center'>
                  <text class='articleList_fd1_1_c0_c1_c1_c0_babdd'>{{item.create_time}}</text>
                </view>
              </view>
            </view>
          </template>
          <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData"
            :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
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
        "tabsInfofd1_0": {
          lineleft: '',
          lineWidth: '',
          moveX: 0,
          scrollX: 0,
          PageScrollX: 0,
          isInit: false
        },
        "minixPagingListsApi": "",
        "pageingListApiMethod": "",
        "allowOnloadGetList": false,
        "tabs": "1",
        "dataType": [],
        "dataList": []
      };
    },
    computed: {

    },
    watch: {},
    onLoad(options) {
      // this.getTypeFunc()
      this.getListFunc()
    },
    onUnload() {

    },
    onReady() {

    },
    onShow() {
    },
    onHide() {


    },
    onResize() {

    },
    onPullDownRefresh() {
      this.getListFunc()
    },
    onReachBottom(e) {

    },
    onPageScroll(e) {

    },
    methods: {


      //获取tabs类型
      async getTypeFunc() {
        //请求方法
        //数据验证


        let datadataType = await this.$api.get(global.apiUrls.post6421a00e4fa4e, {
          category_id: '8'
        });

        if (datadataType.data.code != 1) {
          this.$message.info(datadataType.data.msg);
          return
        }
        let infodataType = datadataType.data;
        this.dataType = infodataType.data

        if (this.dataType) {
          this.tabs = this.dataType[0].category_id
        }
      },
      //获取文章列表
      getListFunc() {
        this.minixPagingListsApi = global.apiUrls.post6415752f56d0f;
        this.pageingListApiMethod = 'get';
        this.allowOnloadGetList = false;
        this.pagingListPostDataContent = {}
        this.listData = [];
        this.dataList = this.listData;
        this.pagingListToggle();
        return
        // this.minixPagingListsApi = global.apiUrls.post64219a95b6200;
        // this.pageingListApiMethod = 'get';
        // this.allowOnloadGetList = false;
        // this.pagingListPostDataContent = {
        //   category_id: this.tabs
        // }
        // this.listData = [];
        // this.dataList = this.listData;
        // this.pagingListToggle();

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
    background: var(--benbenbgColor1);
    background-size: 100% auto;

    .checkTitlefd1_0_babdd {
      font-weight: 700 !important;
      font-size: 32rpx !important;
      color: #333 !important;
      background-color: rgba(255, 255, 255, 1) !important;
    }

    .articleList_linefd1_0_babdd {
      width: 48rpx;
      height: 8rpx;
      top: 80rpx;
      background: red;
      background-size: 100% auto !important;
      border-radius: 16rpx;
    }

    .articleList_titlefd1_0_c3_babdd {
      margin: 0rpx 0rpx 0rpx 48rpx;
    }

    .articleList_titleItemfd1_0_c3_c0_babdd {
      color: var(--benbenFontColor0);
    }

    .articleList_fd1_1_c0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #fff;
      padding: 24rpx 24rpx 24rpx 24rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;

      .articleList_fd1_1_c0_c0_babdd {
        width: 240rpx;
        height: 180rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
      }

      .articleList_fd1_1_c0_c1_babdd {
        margin: 0rpx 0rpx 0rpx 24rpx;

        .articleList_fd1_1_c0_c1_c0_babdd {
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: var(--benbenFontColor0);
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          margin: 0rpx 0rpx 76rpx 0rpx;
          height: 80rpx;
        }

        .articleList_fd1_1_c0_c1_c1_c0_babdd {
          margin: 0rpx 0rpx 0rpx 8rpx;
          line-height: 28rpx;
          font-size: 26rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
        }
      }
    }

    .articleList_flex_0_babdd {
      width: 750rpx;
      height: 88rpx;
      overflow: hidden;
      z-index: 10;
      top: 0rpx;
      background: #fff;
      background-size: 100% auto !important;

      .articleList_fd0_0_babdd {
        padding: 0rpx 32rpx 0rpx 32rpx;

        .articleList_fd0_0_c1_c0_babdd {
          font-size: 36rpx;
          font-weight: 600;
          color: var(--benbenFontColor0);
          line-height: 88rpx;
        }
      }
    }

    .articleList_fd0_0_c0_babdd {
      width: 50rpx;
      height: 50rpx;

      .articleList_fd0_0_c0_c0_babdd {
        font-size: 36rpx;
        color: var(--benbeniconColor1);
      }
    }
  }

  ::v-deep .articleList_benbenTabsfd1_0_babdd {
    width: 750rpx;
    height: 90rpx;
    white-space: nowrap;
    background: #fff;
    text-align: center;
    font-size: 32rpx;
  }
</style>
