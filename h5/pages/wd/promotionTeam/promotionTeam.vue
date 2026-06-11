<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex promotionTeam_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center promotionTeam_fd0_0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="promotionTeam_fd0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '166.png'"></image>
        </view>
        <text class="promotionTeam_fd0_1_babdd">{{ $t('团队推广') }}</text>
        <view class="flex flex-wrap align-center promotionTeam_fd0_0_babdd"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout promotionTeam_header_user_babdd">
        <view class="flex flex-wrap align-center promotionTeam_fd1_0_babdd">
          <image class="promotionTeam_fd1_0_c0_babdd" mode="aspectFill" :src="dataMy.avatar"></image>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub promotionTeam_fd1_0_info_babdd">
            <text class="promotionTeam_fd1_0_c1_babdd">{{ dataMy.nickname }}</text>
            <text class="promotionTeam_fd1_0_sub_babdd">{{ $t('团队推广中心') }}</text>
          </view>
          <view class="flex flex-wrap align-center promotionTeam_fd1_0_c2_babdd" @tap.stop="popupShow1679984842354 = true">
            <text class="promotionTeam_fd1_0_c2_c0_babdd">{{ $t('规则说明') }}</text>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction align-stretch promotionTeam_fd2_0_babdd">
          <view
            class="flex flex-wrap align-center promotionTeam_points_banner_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/jf/inteDetails/inteDetails`"
          >
            <view class="flex flex-direction flex-wrap align-stretch flex-sub promotionTeam_points_banner_left_babdd">
              <text class="promotionTeam_points_label_babdd">{{ $t('可提现积分') }}</text>
              <text class="promotionTeam_points_hint_babdd">{{ $t('点击查看积分明细') }}</text>
            </view>
            <view class="flex flex-wrap align-end promotionTeam_points_banner_right_babdd">
              <text class="promotionTeam_points_value_babdd">{{ jfMoney }}</text>
            </view>
            <image class="promotionTeam_points_arrow_babdd" mode="aspectFit" :src="STATIC_URL + '273.png'"></image>
          </view>
          <view
            class="flex flex-wrap align-center promotionTeam_bind_account_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/bindAccount/bindAccount`"
          >
            <text class="promotionTeam_bind_account_label_babdd">{{ $t('绑定提现账户') }}</text>
            <view class="flex flex-wrap align-center promotionTeam_bind_account_right_babdd">
              <text
                class="promotionTeam_bind_account_status_babdd"
                :class="{ promotionTeam_bind_account_status_done_babdd: bindAccountBound }"
              ></text>
              <image class="promotionTeam_points_arrow_babdd" mode="aspectFit" :src="STATIC_URL + '273.png'"></image>
            </view>
          </view>
          <view class="promotionTeam_fd2_body_babdd">
            <!-- <view
              class="flex flex-direction flex-wrap align-start"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/wd/amountFrozen/amountFrozen`"
            >
              <view class="flex flex-wrap align-center">
                <text class="promotionTeam_fd2_0_c0_c0_c0_c0_babdd">{{ dataMessage.frozen }}</text>
                <text class="promotionTeam_fd2_0_c0_c0_c0_c1_babdd">{{ $t('元') }}</text>
              </view>
              <text class="promotionTeam_fd2_0_c0_c0_c1_babdd">{{ $t('冻结金额') }}</text>
            </view> -->
            <view class="promotionTeam_fd2_0_c1_babdd" style="margin-top: 20rpx">
              <text class="promotionTeam_stats_row_title_babdd">{{ $t('推广数据') }}</text>
              <view class="flex flex-wrap align-stretch promotionTeam_stats_grid_babdd">
                <view class="flex flex-direction align-center promotionTeam_stats_cell_babdd">
                  <view class="flex flex-wrap align-center justify-center">
                    <text class="promotionTeam_stats_value_babdd">{{ dataMessage.people_total }}</text>
                    <text class="promotionTeam_stats_unit_babdd">{{ $t('人') }}</text>
                  </view>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('总推广人数') }}</text>
                </view>
                <view
                  class="flex flex-direction align-center promotionTeam_stats_cell_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/wd/orderPromotion/orderPromotion?time=month`"
                >
                  <view class="flex flex-wrap align-center justify-center">
                    <text class="promotionTeam_stats_value_babdd">{{ dataMessage.order_month }}</text>
                    <text class="promotionTeam_stats_unit_babdd">{{ $t('单') }}</text>
                  </view>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('本月订单') }}</text>
                </view>
                <view
                  class="flex flex-direction align-center promotionTeam_stats_cell_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/wd/orderPromotion/orderPromotion`"
                >
                  <view class="flex flex-wrap align-center justify-center">
                    <text class="promotionTeam_stats_value_babdd">{{ dataMessage.order_total }}</text>
                    <text class="promotionTeam_stats_unit_babdd">{{ $t('单') }}</text>
                  </view>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('累计订单') }}</text>
                </view>
              </view>
            </view>
            <view class="promotionTeam_fd2_0_c2_babdd">
              <text class="promotionTeam_stats_row_title_babdd">{{ $t('收益数据') }}</text>
              <view class="flex flex-wrap align-stretch promotionTeam_stats_grid_babdd promotionTeam_stats_grid_earn_babdd">
                <view
                  class="flex flex-direction align-center promotionTeam_stats_cell_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/wd/IncomeDetail/IncomeDetail?time=day`"
                >
                  <text class="promotionTeam_stats_value_babdd promotionTeam_stats_value_earn_babdd">{{ dataMessage.award_today }}</text>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('今日收益') }}</text>
                </view>
                <view
                  class="flex flex-direction align-center promotionTeam_stats_cell_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/wd/IncomeDetail/IncomeDetail?time=month`"
                >
                  <text class="promotionTeam_stats_value_babdd promotionTeam_stats_value_earn_babdd">{{ dataMessage.award_month }}</text>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('本月收益') }}</text>
                </view>
                <view
                  class="flex flex-direction align-center promotionTeam_stats_cell_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/wd/IncomeDetail/IncomeDetail`"
                >
                  <text class="promotionTeam_stats_value_babdd promotionTeam_stats_value_earn_babdd">{{ dataMessage.award_total }}</text>
                  <text class="promotionTeam_stats_label_babdd">{{ $t('累计收益') }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout promotionTeam_list_wrap_babdd">
        <view class="flex flex-direction flex-wrap align-stretch promotionTeam_fd3_0_babdd">
          <view class="promotionTeam_fd3_tabs_wrap_babdd">
            <benben-flex-tabs
              class-text="promotionTeam_benbenTabsfd3_0_c0_babdd"
              v-model="tabs"
              ref="benben_tabsfd3_0_c0"
              select-mark="benben_tabsfd3_0_c0"
              key="benben_tabsfd3_0_c0"
              :open-title-type="false"
              :open-sticky="true"
              :top="0"
              :is-show-content="false"
              :scrollspy="false"
              :tabs-info.sync="tabsInfofd3_0_c0"
              @change="queryListFunc()"
            >
              <scroll-view
                :throttle="false"
                @scroll="tabsInfofd3_0_c0.scrollX = $event.detail.scrollLeft"
                id="benben_tabsfd3_0_c0"
                class="benben-tabs promotionTeam_tabs_scroll_babdd"
                :scroll-x="false"
                :scroll-left="tabsInfofd3_0_c0.moveX"
                scroll-with-animation="all .3s ease"
                :show-scrollbar="false"
                :enhanced="true"
              >
                <view class="benben-tabs-content" id="benben_tabsfd3_0_c0-content">
                  <view id="benben_tabsfd3_0_c0-title" class="benben-tabs-title flex align-center flex promotionTeam_tabs_title_babdd">
                    <view
                      :class="{ checkTitlefd3_0_c0_babdd: tabs == 'all', 'flex align-center justify-center promotionTeam_tab_item_babdd': true }"
                      @tap="tabs = 'all'"
                      :id="`benben_tabsfd3_0_c0-title-item-${'all'}`"
                    >
                      <text class="promotionTeam_tab_text_babdd">{{ $t('全部人员') }}({{ dataMessage.people_total }})</text>
                    </view>
                    <view
                      :class="{ checkTitlefd3_0_c0_babdd: tabs == 'first', 'flex align-center justify-center promotionTeam_tab_item_babdd': true }"
                      @tap="tabs = 'first'"
                      :id="`benben_tabsfd3_0_c0-title-item-${'first'}`"
                    >
                      <text class="promotionTeam_tab_text_babdd">{{ $t('直推人员') }}({{ dataMessage.people_first }})</text>
                    </view>
                    <view
                      :class="{ checkTitlefd3_0_c0_babdd: tabs == 'second', 'flex align-center justify-center promotionTeam_tab_item_babdd': true }"
                      @tap="tabs = 'second'"
                      :id="`benben_tabsfd3_0_c0-title-item-${'second'}`"
                    >
                      <text class="promotionTeam_tab_text_babdd">{{ $t('间推人员') }}({{ dataMessage.people_second }})</text>
                    </view>
                  </view>
                  <view
                    :style="{ left: tabsInfofd3_0_c0.lineleft, maxWidth: tabsInfofd3_0_c0.lineWidth }"
                    id="benben_tabsfd3_0_c0-line"
                    class="benben-tabs-line flex benben-flex-tabs-line promotionTeam_linefd3_0_c0_babdd"
                    :class="{ 'benben-tabs-line-active': tabsInfofd3_0_c0.isInit }"
                  ></view>
                </view>
              </scroll-view>
            </benben-flex-tabs>
          </view>
          <view class="promotionTeam_fd3_list_body_babdd">
            <template v-for="(item, key0) in dataList">
              <view class="flex flex-wrap align-center promotionTeam_fd3_0_c1_babdd" :key="key0">
                <image class="promotionTeam_fd3_0_c1_c0_babdd" mode="aspectFill" :src="item.avatar"></image>
                <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                  <view class="flex flex-wrap align-center">
                    <text class="promotionTeam_fd3_0_c1_c1_c0_c0_babdd">{{ item.nickname }}</text>
                    <text class="promotionTeam_fd3_0_c1_c1_c0_c1_babdd">{{ item.mobile }}</text>
                    <text class="promotionTeam_fd3_0_c1_c1_c0_c2_babdd" v-if="item.type == '直推'">{{ $t('直推') }}</text>
                    <text class="promotionTeam_fd3_0_c1_c1_c0_c2_babdd" v-if="item.type != '直推'">{{ $t('间推') }}</text>
                  </view>
                  <view class="flex flex-wrap align-center promotionTeam_fd3_0_c1_c1_c1_babdd">
                    <text class="promotionTeam_fd3_0_c1_c1_c1_c0_babdd">{{ item.create_time }}</text>
                    <text class="promotionTeam_fd3_0_c1_c1_c1_c0_babdd">{{ $t('注册') }}</text>
                    <view class="flex flex-wrap align-center promotionTeam_fd3_0_c1_c1_c1_c2_babdd">
                      <view class="flex flex-wrap align-center">
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ item.inviter_num }}</text>
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ $t('人') }}</text>
                      </view>
                      <view class="flex flex-wrap align-center promotionTeam_fd3_0_c1_c1_c1_c2_c1_babdd">
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ item.order_total }}</text>
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ $t('单') }}</text>
                      </view>
                      <view class="flex flex-wrap align-center">
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ item.award_total }}</text>
                        <text class="promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd">{{ $t('积分') }}</text>
                      </view>
                    </view>
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
      </view>

      <!---flex布局flex布局结束-->
      <view :style="{ height: 'calc(140rpx + var(--benben-window-bottom, 0px))' }"></view>
      <view class="flex flex-wrap align-center justify-center promotionTeam_fd5_babdd">
        <button
          class="promotionTeam_fd5_c0_babdd"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/wd/commissionWithdrawals/commissionWithdrawals`"
        >
          {{ $t('去提现') }}
        </button>
      </view>
      <benben-popup v-model="popupShow1679984842354" :mask="true" :mask-close-able="true" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout promotionTeam_flex_4_babdd">
          <view class="flex flex-direction align-stretch promotionTeam_fd4_0_babdd">
            <text class="promotionTeam_fd4_0_c0_babdd">{{ $t('分销规则说明') }}</text>

            <scroll-view class="promotionTeam_fd4_0_c1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex flex-direction align-stretch benben-scroll flex">
                <jyf-parser class="promotionTeam_fd4_0_c1_c0_babdd" :html="dataEssay.content | richTextFormat"></jyf-parser>
              </view>
            </scroll-view>
          </view>
          <view class="flex flex-wrap align-center justify-center promotionTeam_fd4_1_babdd">
            <image
              class="promotionTeam_fd4_1_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '206.png'"
              @tap.stop="popupShow1679984842354 = false"
            ></image>
          </view>
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
      popupShow1679984842354: false,
      tabsInfofd3_0_c0: {
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
      /** frozen【冻结金额】
       *   available【可提现金额】
       *   order_month【本月订单】
       *   order_total【累计订单】
       *   award_month【本月收益】
       *   award_today【今日收益】
       *   award_total【累计收益】
       *   people_second【间推人数】
       *   people_first【直推人数】
       *   people_total【下级总人数】 **/
      dataMessage: {
        people_total: 0,
        people_first: 0,
        people_second: 0,
        award_total: '',
        award_today: '',
        award_month: '',
        order_total: '',
        order_month: '',
        available: '',
        frozen: '',
      },
      dataList: [],
      /** introduce【简介】
       *   content【内容】
       *   thumb_img【内容图片】
       *   name【页面标题】 **/
      dataEssay: {
        aid: '',
        name: '',
        thumb_img: '',
        content: '',
        introduce: '',
      },
      /** follow_count【关注的店铺数量】
       *   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
       *   nickname【昵称】
       *   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
       *   total_money【会员总金额】
       *   browse_count【足迹数量】
       *   collection_count【收藏数量】
       *   _mobile【手机号不带*号】
       *   score【积分余额】
       *   total_consumption_money【总消费金额】
       *   freeze_money【会员冻结金额】
       *   user_money【会员余额】
       *   gender【性别 1 男 2 女】
       *   birthday【生日】
       *   email【邮箱】
       *   account【登录账号】
       *   avatar【头像】
       *   real_name【真实姓名】
       *   mobile【手机号带*号】
       *   userlevel_id【会员级别】
       *   id【会员ID】
       *   tags【标签】
       *   hobby【爱好】
       *   address_code【地址编码】
       *   address【地址】
       *   invite_code【邀请码】 **/
      dataMy: {
        invite_code: '',
        address: '',
        address_code: '',
        hobby: '',
        tags: '',
        id: 0,
        userlevel_id: 0,
        mobile: '',
        real_name: '',
        avatar: '',
        account: '',
        email: '',
        birthday: '',
        gender: '',
        create_time: '',
        user_money: '',
        freeze_money: '',
        total_consumption_money: '',
        score: '',
        _mobile: '',
        coupon: 0,
        collection_count: 0,
        browse_count: 0,
        total_money: 0,
        certified: 0,
        nickname: '',
        is_pay_password: 0,
        follow_count: 0,
      },
      tabs: 'all',
      jfMoney: '',
      bindAccountBound: false,
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {},
  onUnload() {},
  onReady() {},
  onShow() {
    this.queryMessageFunc()
    this.queryEssayFunc()
    this.queryListFunc()
    this.getUserinfoFunc()
    this.getJfMoneyFunc()
    this.getBindAccountFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.queryMessageFunc()
    this.queryListFunc()
    this.getUserinfoFunc()
    this.getJfMoneyFunc()
    this.getBindAccountFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //分销中心-获取可提现积分
    async getJfMoneyFunc() {
      //请求方法
      //数据验证
      let datadataMessage = await this.$api.get(global.apiUrls.post62fc574bc7074, {})

      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.jfMoney = infodataMessage.data.available
    },
    //分销中心-获取数据统计
    async queryMessageFunc() {
      //请求方法
      //数据验证

      let datadataMessage = await this.$api.get(global.apiUrls.post62fb638cdfb64, {})

      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.dataMessage = infodataMessage.data
    },
    //系统文章--获取系统单页内容
    async queryEssayFunc() {
      //请求方法
      //数据验证

      let datadataEssay = await this.$api.get(global.apiUrls.post641568f1b6f87, {
        column_id: '7',
      })

      if (datadataEssay.data.code != 1) {
        this.$message.info(datadataEssay.data.msg)
        return
      }
      let infodataEssay = datadataEssay.data
      this.dataEssay = infodataEssay.data
    },
    //分销中心-获取下级列表
    queryListFunc() {
      this.minixPagingListsApi = global.apiUrls.post62fb72471a2e8
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        type: this.tabs,
      }
      this.listData = []
      this.dataList = this.listData
      this.pagingListToggle()
    },
    //我的
    async getUserinfoFunc() {
      //请求方法
      //数据验证

      let datadataMy = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

      if (datadataMy.data.code != 1) {
        this.$message.info(datadataMy.data.msg)
        return
      }
      let infodataMy = datadataMy.data
      this.dataMy = infodataMy.data
    },
    // 查询提现账户绑定状态
    async getBindAccountFunc() {
      let res = await this.$api.get(global.apiUrls.post62fc4f70a9d44, {
        scene: 'money',
      })
      if (res.data.code != 1) return
      const list = res.data.data || []
      this.bindAccountBound = list.some((item) => item.is_bind == '1')
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
  background:
    url(#{image-path('449.png')}) no-repeat,
    #f5f6f8;
  background-size:
    100% 420rpx,
    100% 100%;

  .promotionTeam_flex_4_babdd {
    width: 600rpx;

    .promotionTeam_fd4_0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: var(--benbenbgColor0);
      padding: 40rpx 40rpx 97rpx 40rpx;

      .promotionTeam_fd4_0_c0_babdd {
        color: var(--benbenFontColor0);
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
        text-align: center;
      }

      .promotionTeam_fd4_0_c1_babdd {
        touch-action: none;
        margin: 32rpx 0rpx 0rpx 0rpx;
        height: 30vh;
        width: 510rpx;
      }
    }

    .promotionTeam_fd4_1_babdd {
      margin: 64rpx 0rpx 0rpx 0rpx;

      .promotionTeam_fd4_1_c0_babdd {
        width: 48rpx;
        height: 48rpx;
        border-radius: 24rpx 24rpx 24rpx 24rpx;
      }
    }
  }

  .promotionTeam_list_wrap_babdd {
    padding: 0rpx 0rpx 24rpx 0rpx;
  }

  .promotionTeam_fd3_0_babdd {
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    background: var(--benbenbgColor1);
    margin: 0rpx 24rpx 0rpx 24rpx;
    padding: 0rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);

    .promotionTeam_fd3_tabs_wrap_babdd {
      padding: 8rpx 16rpx 0rpx;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
    }

    .promotionTeam_fd3_list_body_babdd {
      min-height: 360rpx;
      padding: 0rpx 24rpx;
    }

    .checkTitlefd3_0_c0_babdd {
      font-weight: 600 !important;
      color: #b82441 !important;
      background-color: rgba(184, 36, 65, 0.08) !important;
      border-radius: 28rpx;
    }

    .promotionTeam_linefd3_0_c0_babdd {
      display: none;
    }

    .promotionTeam_fd3_0_c1_babdd {
      padding: 28rpx 0rpx;
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      &:last-child {
        border-bottom: none;
      }

      .promotionTeam_fd3_0_c1_c0_babdd {
        width: 96rpx;
        height: 96rpx;
        border-radius: 48rpx 48rpx 48rpx 48rpx;
        margin: 0rpx 24rpx 0rpx 0rpx;
      }

      .promotionTeam_fd3_0_c1_c1_c0_c0_babdd {
        color: var(--benbenFontColor0);
        font-size: 28rpx;
        font-weight: 600;
        line-height: 40rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-width: 200rpx;
      }

      .promotionTeam_fd3_0_c1_c1_c0_c1_babdd {
        color: var(--benbenFontColor1);
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        margin: 0rpx 16rpx 0rpx 32rpx;
      }

      .promotionTeam_fd3_0_c1_c1_c1_babdd {
        margin: 16rpx 0rpx 0rpx 0rpx;

        .promotionTeam_fd3_0_c1_c1_c1_c2_babdd {
          margin: 0rpx 0rpx 0rpx auto;

          .promotionTeam_fd3_0_c1_c1_c1_c2_c1_babdd {
            margin: 0rpx 48rpx 0rpx 48rpx;
          }
        }
      }
    }
  }

  .promotionTeam_tab_item_babdd {
    flex: 1;
    min-width: 0;
    padding: 12rpx 8rpx;
    box-sizing: border-box;
  }

  .promotionTeam_tab_text_babdd {
    font-size: 24rpx;
    line-height: 34rpx;
    color: var(--benbenFontColor1);
    white-space: nowrap;
    text-align: center;
  }

  .promotionTeam_fd3_0_c1_c1_c0_c2_babdd {
    color: rgba(255, 145, 0, 1);
    font-size: 22rpx;
    background: rgba(255, 244, 229, 1);
    background-size: 100% auto;
    height: 30rpx;
    text-align: center;
    border-radius: 15rpx 15rpx 15rpx 0rpx;
    border: 1px solid rgba(255, 165, 45, 1);
    min-width: 55rpx;
  }

  .promotionTeam_fd3_0_c1_c1_c1_c0_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .promotionTeam_fd3_0_c1_c1_c1_c2_c0_c0_babdd {
    color: var(--benbenFontColor4);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .promotionTeam_fd2_0_babdd {
    border-radius: 24rpx;
    background: var(--benbenbgColor1);
    margin: -28rpx 24rpx 24rpx;
    padding: 0;
    position: relative;
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 16rpx 48rpx rgba(184, 36, 65, 0.08);

    .promotionTeam_fd2_body_babdd {
      padding: 8rpx 24rpx 24rpx;
    }

    .promotionTeam_fd2_0_c1_babdd {
      padding: 0 0 24rpx;
    }

    .promotionTeam_fd2_0_c2_babdd {
      padding: 0;
    }
  }

  .promotionTeam_points_banner_babdd {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding: 28rpx 24rpx;
    background: linear-gradient(135deg, rgba(184, 36, 65, 0.06) 0%, rgba(255, 255, 255, 0) 72%);
    border-bottom: 1px solid rgba(240, 240, 240, 0.9);
  }

  .promotionTeam_points_banner_left_babdd {
    min-width: 0;
    margin-right: 16rpx;
  }

  .promotionTeam_points_banner_right_babdd {
    flex-shrink: 0;
    margin-right: 8rpx;
  }

  .promotionTeam_points_hint_babdd {
    color: var(--benbenFontColor1);
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    margin-top: 6rpx;
    opacity: 0.85;
  }

  .promotionTeam_points_arrow_babdd {
    width: 24rpx;
    height: 24rpx;
    flex-shrink: 0;
    opacity: 0.35;
  }

  .promotionTeam_bind_account_babdd {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    border-bottom: 1px solid rgba(240, 240, 240, 0.9);
  }

  .promotionTeam_bind_account_label_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
  }

  .promotionTeam_bind_account_right_babdd {
    flex-shrink: 0;
    margin-left: 16rpx;
  }

  .promotionTeam_bind_account_status_babdd {
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    margin-right: 8rpx;
  }

  .promotionTeam_bind_account_status_done_babdd {
    color: #b82441;
  }

  .promotionTeam_stats_row_title_babdd {
    display: block;
    color: var(--benbenFontColor1);
    font-size: 24rpx;
    font-weight: 500;
    line-height: 34rpx;
    margin: 0 0 16rpx;
  }

  .promotionTeam_stats_grid_babdd {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
  }

  .promotionTeam_stats_cell_babdd {
    width: 31%;
    padding: 20rpx 8rpx;
    border-radius: 12rpx;
    background: #f7f8fa;
    box-sizing: border-box;
  }

  .promotionTeam_stats_grid_earn_babdd {
    .promotionTeam_stats_cell_babdd {
      background: #f7f8fa;
    }

    .promotionTeam_stats_value_earn_babdd {
      color: #b82441;
    }
  }

  .promotionTeam_stats_value_babdd {
    color: var(--benbenFontColor0);
    font-size: 40rpx;
    font-weight: 700;
    line-height: 48rpx;
  }

  .promotionTeam_stats_value_earn_babdd {
    color: #b82441;
  }

  .promotionTeam_stats_unit_babdd {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 600;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 4rpx;
  }

  .promotionTeam_stats_label_babdd {
    color: var(--benbenFontColor1);
    font-size: 22rpx;
    font-weight: 400;
    line-height: 30rpx;
    margin: 8rpx 0rpx 0rpx;
    text-align: center;
  }

  .promotionTeam_points_label_babdd {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 600;
    line-height: 40rpx;
  }

  .promotionTeam_points_value_babdd {
    color: #b82441;
    font-size: 56rpx;
    font-weight: 700;
    line-height: 64rpx;
    letter-spacing: -1rpx;
  }

  .promotionTeam_header_user_babdd {
    padding: 8rpx 32rpx 48rpx;
  }

  .promotionTeam_fd1_0_babdd {
    width: 100%;

    .promotionTeam_fd1_0_c0_babdd {
      width: 96rpx;
      height: 96rpx;
      border-radius: 48rpx;
      border: 4rpx solid rgba(255, 255, 255, 0.35);
      flex-shrink: 0;
    }

    .promotionTeam_fd1_0_info_babdd {
      margin: 0rpx 16rpx;
      min-width: 0;
    }

    .promotionTeam_fd1_0_c1_babdd {
      color: #ffffff;
      font-size: 34rpx;
      font-weight: 600;
      line-height: 48rpx;
      margin: 0;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .promotionTeam_fd1_0_sub_babdd {
      color: rgba(255, 255, 255, 0.75);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      margin: 4rpx 0rpx 0rpx;
    }

    .promotionTeam_fd1_0_c2_babdd {
      flex-shrink: 0;
      border-radius: 28rpx;
      background: rgba(255, 255, 255, 0.22);
      padding: 10rpx 24rpx;

      .promotionTeam_fd1_0_c2_c0_babdd {
        color: #ffffff;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 34rpx;
      }
    }
  }

  .promotionTeam_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: url(#{image-path('449.png')
  }) no-repeat;
    background-size: 100% auto !important;

    .promotionTeam_fd0_1_babdd {
      color: #fff;
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
    }
  }

  .promotionTeam_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;

    .promotionTeam_fd0_0_c0_babdd {
      width: 20rpx;
      height: 36rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }

  .promotionTeam_fd5_babdd {
    width: 750rpx;
    position: fixed;
    left: 0rpx;
    bottom: 0;
    z-index: 10;
    padding: 16rpx 0 calc(24rpx + var(--benben-window-bottom, 0px));
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.96) 24%, #ffffff 100%);
    box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.04);

    .promotionTeam_fd5_c0_babdd {
      border-radius: 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-weight: 600;
      box-shadow: 0 8rpx 20rpx rgba(184, 36, 65, 0.25);
    }
  }
}

::v-deep .promotionTeam_fd4_0_c1_c0_babdd {
  width: 100%;
}

::v-deep .promotionTeam_benbenTabsfd3_0_c0_babdd {
  width: 100%;
  height: 80rpx;
  background: transparent;
  overflow: hidden;
}

::v-deep .promotionTeam_tabs_scroll_babdd {
  width: 100% !important;
}

::v-deep #benben_tabsfd3_0_c0-content {
  width: 100% !important;
}

::v-deep .promotionTeam_tabs_title_babdd {
  width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 4rpx !important;
  justify-content: space-between !important;
}

::v-deep .promotionTeam_tabs_title_babdd .promotionTeam_tab_item_babdd {
  flex: 1 !important;
  min-width: 0 !important;
  max-width: 33.33% !important;
  margin: 0 !important;
  justify-content: center !important;
}

::v-deep .promotionTeam_tabs_title_babdd .checkTitlefd3_0_c0_babdd .promotionTeam_tab_text_babdd {
  color: #b82441 !important;
  font-weight: 600;
}
</style>
