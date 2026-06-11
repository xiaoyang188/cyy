<template>
  <page-body :is-tabbar="true" page-path="/pages/tabBar/myhb/myhb">
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex myhb_flex_0_dija"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx', background: `${pageScrollTopBuilt > 30 ? '#fff' : ''}` }"
      >
        <view class="flex flex-wrap align-center myhb_fd0_0_dija"></view>
        <text class="myhb_fd0_1_dija">{{ $t('个人中心') }}</text>
        <view
          class="flex flex-wrap align-center justify-end myhb_fd0_2_dija"
          :style="{ 'margin-right': `${appSystemIdentification == 'Wechat' ? '30%' : ''}` }"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/wd/myNews/myNews`"
        >
          <image class="myhb_fd0_2_c0_dija" mode="aspectFit" :src="STATIC_URL + '456.png'"></image>
          <benben-message-num
            class="myhb_fd0_2_c1_dija"
            :message-num="messageNum.all"
            size="24"
            color="#fff"
            background-color="red"
          ></benben-message-num>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout myhb_flex_2_dija">
        <view class="flex flex-wrap align-center myhb_fd2_0_dija" @tap.stop="goziliaoFunc()" v-if="isLogin === true">
          <image class="myhb_fd2_0_c0_dija" mode="aspectFit" :src="dataMessage.avatar" v-if="isLogin === true"></image>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub myhb_fd2_0_c1_dija">
            <view class="flex flex-wrap align-center" v-if="isLogin === true">
              <text class="myhb_fd2_0_c1_c0_c0_dija">{{ dataMessage.nickname }}</text>
              <!--    @tap.stop="handleJumpDiy"
                data-type="navigateTo"
                :data-url="`/pages/wd/member/member`" -->
              <image class="myhb_fd2_0_c1_c0_c1_dija" mode="aspectFit" :src="dataDetails.icon"></image>
            </view>
            <view class="flex flex-wrap align-center myhb_fd2_0_c1_c1_dija" v-if="isLogin === true">
              <text class="myhb_fd2_0_c1_c1_c0_dija">{{ $t('邀请码：') }}</text>
              <text class="myhb_fd2_0_c1_c1_c0_dija">{{ dataMessage.invite_code }}</text>
              <view class="flex flex-wrap align-center myhb_fd2_0_c1_c1_c2_dija" @tap.stop="copyText(dataMessage.invite_code)">
                <text class="myhb_fd2_0_c1_c1_c2_c0_dija">{{ $t('复制') }}</text>
              </view>
            </view>
          </view>
          <image class="myhb_fd2_0_c2_dija" mode="aspectFit" :src="STATIC_URL + '410.png'" v-if="isLogin === true"></image>
        </view>
        <view class="flex flex-wrap align-center myhb_fd2_0_dija" @tap.stop="toLoginDiy()" v-if="isLogin === false">
          <image class="myhb_fd2_1_c0_dija" mode="aspectFit" :src="STATIC_URL + '331.png'" v-if="isLogin === false"></image>
          <text class="myhb_fd2_1_c1_dija">{{ $t('请登录') }}</text>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch myhb_fd2_2_dija" v-if="isLogin === true">
          <!-- <view class="flex flex-wrap align-center">
            <text class="myhb_fd2_2_c0_c0_dija" v-if="dataDetails.is_max_level != '1'">{{ $t('距离下次升级') }}</text>
            <text class="myhb_fd2_2_c0_c0_dija">{{ dataDetails.intro }}</text>
            <text class="myhb_fd2_2_c0_c0_dija" v-if="dataDetails.is_max_level != '1'">{{ $t('元') }}</text>
            <view
              class="flex flex-wrap align-center myhb_fd2_2_c0_c3_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/wd/member/member`"
            >
              <text class="myhb_fd2_0_c1_c1_c2_c0_dija">{{ $t('会员权益') }}</text>
            </view>
          </view> -->
          <!-- <view class="flex flex-wrap align-center myhb_fd2_2_c1_dija">
            <view class="flex benben-progress-bar myhb_fd2_2_c1_c0_dija" v-if="dataDetails.levelid != '3'">
              <view class="benben-progress-bar-center myhb_progress1_fd2_2_c1_c0_dija" :style="{ width: dataDetails.next_speed + '%' }"></view>
              <image
                class="benben-progress-bar-image myhb_progress2_fd2_2_c1_c0_dija"
                mode="aspectFit"
                :src="STATIC_URL + '404.png'"
                :style="{ left: dataDetails.next_speed + '%' }"
              ></image>
            </view>
            <image class="myhb_fd2_2_c1_c1_dija" mode="aspectFit" :src="STATIC_URL + '142.png'"></image>
          </view>
          <view class="flex flex-wrap align-center justify-between myhb_fd2_2_c2_dija">
            <text class="myhb_fd2_2_c2_c0_dija">{{ dataDetails.name }}</text>
            <view class="flex flex-wrap align-center">
              <text class="myhb_fd2_2_c2_c0_dija">{{ dataDetails.next_level_name }}</text>
            </view>
          </view> -->
        </view>
      </view>
      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1719195487692" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---去拼单flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-stretch myhb_fd3_0_dija">
            <text class="myhb_fd3_0_c0_dija">{{ $t('选择商家端') }}</text>
            <!--     <view   class='flex align-center justify-center myhb_fd3_0_c1_dija'      >
        <button class='myhb_fd3_0_c1_c0_dija'  @tap.stop="stortOptionsFunc(1)"  >{{$t('下载商家端app')}}</button>
</view>
 -->
            <view class="flex align-center justify-center myhb_fd3_0_c2_dija">
              <button class="myhb_fd3_0_c1_c0_dija" @tap.stop="stortOptionsFunc(2)">{{ $t('复制商家端链接') }}</button>
            </view>
          </view>
        </view>
        <!---去拼单flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout myhb_flex_4_dija">
        <view class="flex flex-wrap align-center justify-around myhb_fd4_0_dija">
          <view
            class="flex flex-wrap align-center"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/myCollections/myCollections`"
          >
            <image class="myhb_fd4_0_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '457.png'"></image>
            <text class="myhb_fd4_0_c0_c1_dija">{{ $t('收藏') }}</text>
            <view class="flex flex-wrap align-center" v-if="isLogin === true">
              <text class="myhb_fd4_0_c0_c2_c0_dija">{{ collectNum.collection_count }}</text>
            </view>
            <view class="flex flex-wrap align-center" v-if="isLogin === false">
              <text class="myhb_fd4_0_c0_c2_c0_dija">0</text>
            </view>
          </view>
          <!-- <view
            class="flex flex-wrap align-center"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/concernMy/concernMy`"
            v-if="shopType.status == 1"
          >
            <image class="myhb_fd4_0_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '458.png'"></image>
            <text class="myhb_fd4_0_c0_c1_dija">{{ $t('关注') }}</text>
            <view class="flex flex-wrap align-center" v-if="isLogin === true">
              <text class="myhb_fd4_0_c1_c2_c0_dija">{{ collectNum.follow_count }}</text>
            </view>
            <view class="flex flex-wrap align-center" v-if="isLogin === false">
              <text class="myhb_fd4_0_c1_c2_c0_dija">0</text>
            </view>
          </view> -->
          <view class="flex flex-wrap align-center" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/myTrack/myTrack`">
            <image class="myhb_fd4_0_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '459.png'"></image>
            <text class="myhb_fd4_0_c2_c1_dija">{{ $t('足迹') }}</text>
            <view class="flex flex-wrap align-center" v-if="isLogin === true">
              <text class="myhb_fd4_0_c0_c2_c0_dija">{{ collectNum.browse_count }}</text>
            </view>
            <view class="flex flex-wrap align-center" v-if="isLogin === false">
              <text class="myhb_fd4_0_c0_c2_c0_dija">0</text>
            </view>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch myhb_fd4_1_dija">
          <view class="flex flex-wrap align-center justify-between">
            <text class="myhb_fd4_1_c0_c0_dija">{{ $t('我的订单') }}</text>
            <view class="flex flex-wrap align-center" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/order/order?type=all`">
              <text class="myhb_fd4_1_c0_c1_c0_dija">{{ $t('全部订单') }}</text>
              <image class="myhb_fd4_1_c0_c1_c1_dija" mode="aspectFit" :src="STATIC_URL + '146.png'"></image>
            </view>
          </view>
          <view class="flex align-center justify-between myhb_fd4_1_c1_dija">
            <view
              class="flex flex-direction flex-wrap align-center myhb_fd4_1_c1_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/order/order?type=unpay`"
            >
              <benben-message-num
                class="myhb_fd4_1_c1_c0_c0_dija"
                :message-num="dataNum.no_pay"
                size="24"
                color="#fff"
                background-color="red"
              ></benben-message-num>
              <image class="myhb_fd4_1_c1_c0_c1_dija" mode="aspectFit" :src="STATIC_URL + '460.png'"></image>
              <text class="myhb_fd4_1_c1_c0_c2_dija">{{ $t('待付款') }}</text>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center myhb_fd4_1_c1_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/order/order?type=unship`"
            >
              <image class="myhb_fd4_1_c1_c0_c1_dija" mode="aspectFit" :src="STATIC_URL + '461.png'"></image>
              <text class="myhb_fd4_1_c1_c0_c2_dija">{{ $t('待发货') }}</text>
              <benben-message-num
                class="myhb_fd4_1_c1_c1_c2_dija"
                :message-num="dataNum.deliver"
                size="24"
                color="#fff"
                background-color="red"
              ></benben-message-num>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center myhb_fd4_1_c1_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/order/order?type=unreceive`"
            >
              <image class="myhb_fd4_1_c1_c0_c1_dija" mode="aspectFit" :src="STATIC_URL + '462.png'"></image>
              <text class="myhb_fd4_1_c1_c0_c2_dija">{{ $t('待收货') }}</text>
              <benben-message-num
                class="myhb_fd4_1_c1_c1_c2_dija"
                :message-num="dataNum.receiv"
                size="24"
                color="#fff"
                background-color="red"
              ></benben-message-num>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center myhb_fd4_1_c1_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/order/order?type=finish`"
            >
              <image class="myhb_fd4_1_c1_c0_c1_dija" mode="aspectFit" :src="STATIC_URL + '463.png'"></image>
              <text class="myhb_fd4_1_c1_c0_c2_dija">{{ $t('待评价') }}</text>
              <benben-message-num
                class="myhb_fd4_1_c1_c1_c2_dija"
                :message-num="dataNum.evaluate"
                size="24"
                color="#fff"
                background-color="red"
              ></benben-message-num>
            </view>
            <view
              class="flex flex-direction flex-wrap align-center myhb_fd4_1_c1_c0_dija"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/order/order?type=6`"
            >
              <image class="myhb_fd4_1_c1_c0_c1_dija" mode="aspectFit" :src="STATIC_URL + '464.png'"></image>
              <text class="myhb_fd4_1_c1_c0_c2_dija">{{ $t('退款/售后') }}</text>
              <benben-message-num
                class="myhb_fd4_1_c1_c4_c2_dija"
                :message-num="dataNum.refund"
                size="24"
                color="#fff"
                background-color="red"
              ></benben-message-num>
            </view>
          </view>
        </view>

        <view class="flex flex-wrap align-stretch myhb_fd4_3_dija">
          <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/friendsLnvite/friendsLnvite`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '466.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('邀请好友') }}</text>
          </view>
          <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/promotionTeam/promotionTeam`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '467.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('团队推广') }}</text>
          </view>
          <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/couponMy/couponMy`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '468.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('优惠券') }}</text>
          </view>
          <!-- <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/jf/inteGral/inteGral`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '469.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('积分商城') }}</text>
          </view> -->
          <!-- <view class="flex flex-direction align-center myhb_fd4_3_c0_dija" @tap.stop="goShopComeFunc()" v-if="shopType.status == 1">
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '470.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ shopStateTitle }}</text>
          </view> -->
          <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/wd/address/address`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '472.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('地址管理') }}</text>
          </view>
          <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fp/invoicesManagement/invoicesManagement`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '1545.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('发票管理') }}</text>
          </view>

          <view class="flex flex-direction align-center myhb_fd4_3_c0_dija" @tap.stop="getKefuFunc()">
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '476.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('联系客服') }}</text>
          </view>

          <!-- <view
            class="flex flex-direction align-center myhb_fd4_3_c0_dija"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/xtsz/system/system`"
          >
            <image class="myhb_fd4_3_c0_c0_dija" mode="aspectFit" :src="STATIC_URL + '477.png'"></image>
            <text class="myhb_fd4_3_c0_c1_dija">{{ $t('系统设置') }}</text>
          </view> -->
        </view>
      </view>
      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout myhb_flex_5_dija">
        <view class="flex align-center justify-center myhb_fd5_0_dija">
          <image class="myhb_fd5_0_c0_dija" mode="aspectFit" :src="STATIC_URL + '748.png'"></image>
          <text class="myhb_fd5_0_c1_dija">{{ $t('看了又看') }}</text>
          <image class="myhb_fd5_0_c0_dija" mode="aspectFit" :src="STATIC_URL + '749.png'"></image>
        </view>
        <view class="flex-sub">
          <benben-waterfalls
            ref="waterfalls1730518154727"
            :waterfall-data.sync="waterfallsfd5_1"
            v-model="dataGoodsList"
            id-key="aid"
            add-time="200"
            column-count="2"
            left-gap="0"
            right-gap="0"
            column-gap="14"
          >
            <benben-waterfalls-item :sort-index="sortIndex" :key="sortIndex" v-for="(waterfall, sortIndex) in waterfallsfd5_1">
              <template v-for="waterfallIndex in waterfall">
                <template v-if="dataGoodsList[waterfallIndex]">
                  <view
                    class="flex flex-direction align-center myhb_fd5_1_c0_dija"
                    @tap.stop="handleJumpDiy"
                    data-type="navigateTo"
                    :data-url="`/pages/fl/shopDetail/shopDetail?id=${dataGoodsList[waterfallIndex].aid}`"
                    :key="waterfallIndex"
                  >
                    <image class="myhb_fd5_1_c0_c0_dija" mode="widthFix" :src="dataGoodsList[waterfallIndex].thumb"></image>
                    <text class="myhb_fd5_1_c0_c1_dija">{{ dataGoodsList[waterfallIndex].name }}</text>
                    <view class="flex flex-wrap align-center myhb_fd5_1_c0_c2_dija">
                      <text class="myhb_fd5_1_c0_c2_c0_dija">￥</text>
                      <text class="myhb_fd5_1_c0_c2_c1_dija">
                        <text>{{ dataGoodsList[waterfallIndex].shop_price | frontPrice }}</text>
                        <text class="myhb_price2_fd5_1_c0_c2_c1_dija">{{ dataGoodsList[waterfallIndex].shop_price | laterPrice }}</text>
                      </text>
                      <text class="myhb_fd5_1_c0_c2_c2_dija">{{ $t('销量') }}</text>
                      <text>{{ dataGoodsList[waterfallIndex].sales_sum }}</text>
                    </view>
                  </view>
                </template>
              </template>
            </benben-waterfalls-item>
          </benben-waterfalls>
        </view>
        <fu-empty
          :pagingListLoadedAll="pagingListLoadedAll"
          :pagingListNoListData="pagingListNoListData"
          :listDataLength="listDataLength"
          :isLoadInit="isLoadInit"
        ></fu-empty>
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
      waterfallsfd5_1: [],
      popupShow1719195487692: false,
      minixPagingListsApi: '',
      pageingListApiMethod: '',
      allowOnloadGetList: false,
      /** login_url【后台登录地址】
       *   is_close【是否开启签到】
       *   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
       *   nickname【昵称】
       *   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
       *   total_money【会员总金额】
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
      dataMessage: {
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
        total_money: 0,
        certified: 0,
        nickname: '',
        is_pay_password: 0,
        is_close: 0,
        login_url: '',
      },
      /** is_sale【是否上架 0否 1是】
       *   is_check【是否审核通过 0否 1是】
       *   package_count【套餐总数】
       *   package_arr【套餐信息】
       *   init_wholesale_num【起批量】
       *   is_step【是否开启阶梯价 0否 1是】
       *   is_wholesale【是否开启批发 0否 1是】
       *   comment【评论列表】
       *   warm_prompt【温馨提示】
       *   shop_info【店铺信息】
       *   store_collection_num【关注数量】
       *   store_star【店铺评分】
       *   level_name【店铺套餐】
       *   store_logo【店铺logo】
       *   store_name【店铺名称】
       *   store_id【店铺ID】
       *   question_list【提问列表】
       *   question_total【提问数量】
       *   freight_name【邮费模板名称】
       *   freight_explain【邮费描述】
       *   praise_rate【好评率】
       *   comment_total【评论总数】
       *   is_collect【是否收藏该商品】
       *   user_level【会员级别】
       *   activity_info【活动信息】
       *   activity_type【活动ID】
       *   coupon_list【优惠券列表】
       *   sku_list【SKU列表】
       *   step_price【阶梯展示价格】
       *   stock【库存】
       *   market_price【划线价】
       *   shop_price【售价】
       *   member_price【会员价】
       *   key_name【规格内容】
       *   key【规格ID组合】
       *   sku_id【skuID】
       *   spec_list【规格列表】
       *   discounts【自购返】
       *   share_award_money【分享赚】
       *   video_img【视频封面图】
       *   video【视频地址】
       *   partner_id【所属商家ID】
       *   freight_template_id【运费模板ID】
       *   support_self_mention【是否支持自提	0 不支持 1 支持】
       *   freight_price【邮费】
       *   is_shipping【是否包邮 0 不包邮 1 包邮】
       *   is_spec【是否多规格】
       *   stock【库存】
       *   description【商品简介】
       *   body【详情】
       *   thumb【标题图片】
       *   images【轮播图图片】
       *   market_price【市场价】
       *   member_price【会员价】
       *   shop_price【售价】
       *   is_hot【是否热销】
       *   is_new【是否新品】
       *   is_recommend【是否推荐】
       *   click【浏览量】
       *   spectypeid【规格类型ID】
       *   sales_sum【销量】
       *   name【商品名称】
       *   adslogan【广告语】
       *   cid【所属分类ID】
       *   id【商品ID】
       *   is_max_level【是否为最高等级】
       *   next_speed【进度条】
       *   speed【进度条 百分比】
       *   intro【说明  进度条下面的说明文字】
       *   total_consumption_money【累计消费金额】
       *   content【权限说明】
       *   discount【折扣比例】
       *   icon【图标】
       *   empirical【升级条件】
       *   levelid【标识】
       *   name【名称】
       *   aid【ID】 **/
      dataDetails: {
        id: '',
        cid: '',
        adslogan: '',
        name: '',
        sales_sum: '',
        spectypeid: '',
        click: '',
        is_recommend: '',
        is_new: '',
        is_hot: '',
        shop_price: '',
        member_price: '',
        market_price: '',
        images: [],
        thumb: '',
        body: '',
        description: '',
        stock: '',
        is_spec: '',
        is_shipping: '',
        freight_price: '',
        support_self_mention: '',
        freight_template_id: '',
        partner_id: '',
        video: '',
        video_img: '',
        share_award_money: '',
        discounts: '',
        spec_list: [],
        sku_list: {
          /** sku_id【选择规格id】 **/
          sku_id: '',
          key: '',
          key_name: '',
          member_price: '',
          shop_price: '',
          market_price: '',
          stock: '',
          step_price: [],
        },
        coupon_list: [],
        activity_info: {
          activity_type: '',
        },
        user_level: '',
        is_collect: '',
        comment_total: '',
        praise_rate: '',
        freight_explain: '',
        freight_name: '',
        sale_top_name: '',
        question_total: '',
        question_list: [],
        goods_type: '',
        chat_price: '',
        shop_info: {
          store_id: '',
          store_name: '',
          store_logo: '',
          level_name: '',
          store_star: '',
          store_collection_num: '',
        },
        warm_prompt: '',
        comment: [],
        is_wholesale: 0,
        is_step: 0,
        init_wholesale_num: 0,
        package_arr: [],
        package_count: 0,
        is_check: 0,
        is_sale: 0,
      },
      dataList: {
        share_total: '',
        self_total: '',
      },
      shopStat: '',
      shopStateTitle: '商家入驻',
      /** evaluate【评价】
       *   refund【收货】
       *   receiv【待收货】
       *   deliver【待发货】
       *   no_pay【待支付】 **/
      dataNum: {
        no_pay: '',
        deliver: '',
        receiv: '',
        refund: '',
        evaluate: '',
      },
      /** reason【原因】
       *   joinin_state【状态】 **/
      ShopState: {
        joinin_state: '',
        reason: '',
      },
      /** chat_url【客服链接】 **/
      dataKefu: {
        chat_url: '',
      },
      /** messageNum【未读消息数量】
       *   all【未读消息总数量】
       *   chat【聊天未读数量】
       *   message【系统消息未读数量】
       *   article【系统公告未读数量】 **/
      messageNum: {
        article: '',
        message: '',
        chat: '',
        all: '',
      },
      /** pageScrollTopBuilt【页面滚动距离】 **/
      pageScrollTopBuilt: 0,
      /** follow_count【关注的店铺数量】
       *   browse_count【足迹数量】
       *   collection_count【收藏数量】 **/
      collectNum: {
        collection_count: '',
        browse_count: '',
        follow_count: '',
      },
      /** locale【当期语言】
       *   value【语言标识】
       *   name【语言名称】 **/
      locale: {
        name: '',
        value: '',
      },
      dataGoodsList: [],
      dibu: false,
      /** sku_id【选择规格id】 **/
      sku_id: '',
      /** sharedInfo【分享需要的链接】
       *   market_price【划线价】
       *   goods_price【商品价格】
       *   goods_thumb【商品主图】
       *   share_bg【小程序分享背景】
       *   qrcode_url【二维码图片地址】
       *   url【H5分享链接】 **/
      sharedInfo: {
        url: '',
        qrcode_url: '',
        share_bg: '',
        goods_thumb: '',
        goods_price: 0,
        market_price: 0,
      },
      shopType: '',
      id: '998',
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
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
    let { id } = options
    if (id !== undefined) this.id = id
    this.locale = JSON.parse(JSON.stringify(this.$store.state.locale))
    this.getShopDataFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.queryMessageFunc()
    this.queryDetailsFunc()
    this.queryListFunc()
    this.getOrderTagFunc()
    this.getMessageNumFunc()
    this.getClooectNumFunc()
    this.resetLangFunc()
    this.goodsListFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.getOrderTagFunc()
    this.queryMessageFunc()
    this.queryDetailsFunc()
    this.queryListFunc()
    this.getMessageNumFunc()
    this.guanbiFunc()
    this.getClooectNumFunc()
    this.goodsListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {
    this.pageScrollTopBuilt = e.scrollTop
  },
  methods: {
    //查询店铺状态
    queryShopStateFunc() {
      if (this.isLogin === true) {
        this.$api
          .post(global.apiUrls.post63732dbecbc14)
          .then((res) => {
            if (res.data.code == 1) {
              this.shopStat = Number(res.data.data)
              console.log(this.shopStat)
              switch (this.shopStat) {
                case 0:
                  this.shopStateTitle = global.i18n.t('商家入驻')
                  break
                case 1:
                  this.shopStateTitle = global.i18n.t('待认证审核')
                  break
                case 5:
                  this.shopStateTitle = global.i18n.t('我的店铺')
                  break
                case 3:
                  this.shopStateTitle = global.i18n.t('认证审核失败')
                  break
                case 4:
                  this.shopStateTitle = global.i18n.t('待财务审核')
                  break
                case 6:
                  this.shopStateTitle = global.i18n.t('财务审核失败')
                  break
                case 2:
                  this.shopStateTitle = global.i18n.t('待提交财务凭证')
                  break
              }
            }
          })
          .catch((err) => {
            console.log('queryShopStateError', err)
          })
      } else {
        this.shopStateTitle = global.i18n.t('商家入驻')
      }
    },
    //获取订单角标
    async getOrderTagFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datadataNum = await this.$api.post(global.apiUrls.post644ceb577e29e, {})
        if (datadataNum.data.code != 1) {
          this.$message.info(datadataNum.data.msg)
          return
        }
        let infodataNum = datadataNum.data
        this.dataNum = infodataNum.data
      } else {
        this.dataNum = ''
      }
    },
    //去店铺认证页面
    goShopComeFunc() {
      if (this.isLogin === true) {
        this.$util.actionAuth(() => {
          switch (this.shopStat) {
            case 0:
              this.$urouter.navigateTo('/pages/wd/settlementMerchant/settlementMerchant')
              break
            case 5:
              this.popupShow1719195487692 = true
              break
            default:
              this.$urouter.navigateTo('/pages/wd/reviewSubmit/reviewSubmit')
              break
          }
        })
      } else {
        this.toLoginDiy()
      }
    },
    //获取客服链接
    async getKefuFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datadataKefu = await this.$api.get(global.apiUrls.post64897f6fd5486, {
          store_id: '1',
        })
        if (datadataKefu.data.code != 1) {
          this.$message.info(datadataKefu.data.msg)
          return
        }
        let infodataKefu = datadataKefu.data
        this.dataKefu = infodataKefu.data
        uni.navigateTo({
          url: `/pages/benben-built-in/web-view/kefu-web-view?webPath=${encodeURIComponent(this.dataKefu.chat_url)}`,
        })
      } else {
        this.toLoginDiy()
      }
    },

    //个人中心-获取会员详细信息
    async queryMessageFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {})
        if (datadataMessage.data.code != 1) {
          this.$message.info(datadataMessage.data.msg)
          return
        }
        let infodataMessage = datadataMessage.data
        this.dataMessage = infodataMessage.data
      }
    },
    //用户管理-会员当前等级详情
    async queryDetailsFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datadataDetails = await this.$api.get(global.apiUrls.post636de668c7eb0, {})
        if (datadataDetails.data.code != 1) {
          this.$message.info(datadataDetails.data.msg)
          return
        }
        let infodataDetails = datadataDetails.data
        this.dataDetails = infodataDetails.data
      }
    },
    //钱包-获取分享赚/自购返累计金额（我的）
    async queryListFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datadataList = await this.$api.get(global.apiUrls.post64254d2ad5999, {})
        if (datadataList.data.code != 1) {
          this.$message.info(datadataList.data.msg)
          return
        }
        let infodataList = datadataList.data
        this.dataList = infodataList.data
      }
    },
    //跳转资料
    goziliaoFunc() {
      if (this.isLogin === true) {
        this.$urouter.navigateTo(`/pages/wd/myInfo/myInfo`)
      } else {
        this.toLoginDiy()
      }
    },
    //获取未读消息数量
    async getMessageNumFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datamessageNum = await this.$api.get(global.apiUrls.post64241ca6cf066, {})
        if (datamessageNum.data.code != 1) {
          this.$message.info(datamessageNum.data.msg)
          return
        }
        let infomessageNum = datamessageNum.data
        this.messageNum = infomessageNum.data
      } else {
        this.messageNum = ''
      }
    },
    //关闭下拉刷新
    guanbiFunc() {
      if (this.isLogin === false) {
        uni.stopPullDownRefresh()
      }
    },
    //获取收藏数量
    async getClooectNumFunc() {
      if (this.isLogin === true) {
        //请求方法
        //数据验证
        let datacollectNum = await this.$api.post(global.apiUrls.post657c0f93428d9, {})
        if (datacollectNum.data.code != 1) {
          this.$message.info(datacollectNum.data.msg)
          return
        }
        let infocollectNum = datacollectNum.data
        this.collectNum = infocollectNum.data
      }
    },
    //重置tabbar语言
    resetLangFunc() {
      this.locale = JSON.parse(JSON.stringify(this.$store.state.locale))
      this.$store.commit('setLocale', {
        locale: this.locale,
      })
    },
    //店铺弹框操作
    stortOptionsFunc(type) {
      if (type == '1') {
      } else {
        this.copyText(this.dataMessage.login_url)
      }
      this.popupShow1719195487692 = false
    },
    //商品管理-商品列表
    goodsListFunc() {
      this.$refs.waterfalls1730518154727?.renew()
      this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3
      this.pageingListApiMethod = 'get'
      this.allowOnloadGetList = false
      this.pagingListPostDataContent = {
        goods_type: '1',
        user_id: this.userInfo.id,
      }
      this.listData = []
      this.dataGoodsList = this.listData
      this.pagingListToggle()
    },
    //单多融合
    async getShopDataFunc() {
      let datashopType = await this.$api.post(global.apiUrls.post6758eb9165329, {
        path: 'pages/tabBar/myhb/myhb',
      })
      if (datashopType.data.code != 1) {
        this.$message.info(datashopType.data.msg)
        return
      }
      let infoshopType = datashopType.data
      this.shopType = infoshopType.data
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
  background: url(#{image-path('455.png')
  }) no-repeat;
  background-size: 100% auto;

  .myhb_flex_5_dija {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .myhb_fd5_0_dija {
      margin: 0rpx 0rpx 24rpx 0rpx;

      .myhb_fd5_0_c1_dija {
        margin: 0rpx 24rpx 0rpx 24rpx;
        color: #333333;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
      }
    }

    .myhb_fd5_1_c0_dija {
      background: var(--benbenbgColor1);
      background-size: 100% auto;
      margin: 0rpx 0rpx 20rpx 0rpx;
      border-radius: 16rpx;
      padding: 0rpx 0rpx 15rpx 0rpx;

      .myhb_fd5_1_c0_c0_dija {
        width: 100%;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 15rpx 0rpx;
      }

      .myhb_fd5_1_c0_c1_dija {
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 40rpx;
        width: 90%;
      }

      .myhb_fd5_1_c0_c2_dija {
        width: 90%;
        font-size: 22rpx;
        color: var(--benbenFontColor1);
        line-height: 28rpx;
        padding: 15rpx 0rpx 0rpx 0rpx;

        .myhb_fd5_1_c0_c2_c0_dija {
          font-size: 24rpx;
          font-weight: 700;
          color: rgba(240, 35, 37, 1);
        }

        .myhb_fd5_1_c0_c2_c1_dija {
          color: #f02325;
          font-weight: 700;
          font-size: 32rpx;

          .myhb_price2_fd5_1_c0_c2_c1_dija {
            font-size: 22rpx;
          }
        }

        .myhb_fd5_1_c0_c2_c2_dija {
          margin: 0rpx 0rpx 0rpx auto;
        }
      }
    }
  }

  .myhb_fd5_0_c0_dija {
    width: 138rpx;
    height: 28rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .myhb_flex_4_dija {
    padding: 0rpx 32rpx 0rpx 32rpx;

    .myhb_fd4_0_dija {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      padding: 32rpx 0rpx 32rpx 0rpx;
      margin: 20rpx 0rpx 0rpx 0rpx;

      .myhb_fd4_0_c2_c1_dija {
        color: #2d2d2d;
        font-size: 28rpx;
        font-weight: 600;
        line-height: 40rpx;
      }
    }

    .myhb_fd4_1_dija {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      padding: 32rpx 32rpx 32rpx 32rpx;
      margin: 20rpx 0rpx 0rpx 0rpx;

      .myhb_fd4_1_c0_c0_dija {
        color: var(--benbenFontColor0);
        font-size: 28rpx;
        font-weight: 700;
        line-height: 40rpx;
      }

      .myhb_fd4_1_c0_c1_c0_dija {
        color: var(--benbenFontColor2);
        font-size: 24rpx;
        font-weight: 400;
        line-height: 33rpx;
      }

      .myhb_fd4_1_c0_c1_c1_dija {
        width: 10rpx;
        height: 18rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 16rpx;
      }

      .myhb_fd4_1_c1_dija {
        margin: 40rpx 0rpx 0rpx 0rpx;
        text-align: center;
      }
    }

    .myhb_fd4_2_dija {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      padding: 40rpx 29rpx 40rpx 29rpx;
      margin: 20rpx 0rpx 0rpx 0rpx;
    }

    .myhb_fd4_3_dija {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      margin: 24rpx 0rpx 50rpx 0rpx;
      padding: 30rpx 0rpx 10rpx 0rpx;
      text-align: center;
    }
  }

  .myhb_fd4_0_c0_c0_dija {
    width: 40rpx;
    height: 40rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 12rpx 0rpx 0rpx;
  }

  .myhb_fd4_0_c0_c1_dija {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 600;
    line-height: 40rpx;
  }

  .myhb_fd4_0_c0_c2_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 600;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 10rpx;
  }

  .myhb_fd4_0_c1_c2_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 600;
    line-height: 40rpx;
    margin: 0rpx 0rpx 0rpx 12rpx;
  }

  .myhb_fd4_1_c1_c0_dija {
    position: relative;

    .myhb_fd4_1_c1_c0_c0_dija {
      position: absolute;
      top: -20rpx;
      right: -2rpx;
      z-index: 99;
    }
  }

  .myhb_fd4_1_c1_c0_c1_dija {
    width: 48rpx;
    height: 48rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd4_1_c1_c0_c2_dija {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 24rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd4_1_c1_c1_c2_dija {
    position: absolute;
    top: -20rpx;
    right: -2rpx;
  }

  .myhb_fd4_1_c1_c4_c2_dija {
    position: absolute;
    top: -20rpx;
    right: 10rpx;
  }

  .myhb_fd4_2_c0_c0_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 700;
    line-height: 30rpx;
    margin: 8rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd4_2_c0_c0_c1_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 38rpx;
    font-weight: 700;
    line-height: 45rpx;
  }

  .myhb_fd4_2_c0_c1_dija {
    color: var(--benbenFontColor2);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 21rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd4_3_c0_dija {
    width: 25%;
    margin: 0rpx 0rpx 20rpx 0rpx;
  }

  .myhb_fd4_3_c0_c0_dija {
    width: 56rpx;
    height: 56rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd4_3_c0_c1_dija {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    margin: 19rpx 0rpx 0rpx 0rpx;
  }

  .myhb_fd3_0_dija {
    border-radius: 23rpx 23rpx 23rpx 23rpx;
    width: 590rpx;
    padding: 32rpx 0rpx 40rpx 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .myhb_fd3_0_c0_dija {
      text-align: center;
      margin: 0rpx 0rpx 24rpx 0rpx;
      font-size: 32rpx;
      color: var(--benbenFontColor0);
      font-weight: 600;
    }

    .myhb_fd3_0_c1_dija {
      padding: 0rpx 0rpx 0rpx 0rpx;
    }

    .myhb_fd3_0_c2_dija {
      padding: 24rpx 0rpx 0rpx 0rpx;
    }
  }

  .myhb_fd3_0_c1_c0_dija {
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    font-size: 32rpx;
    background: var(--benbenbgColor7);
    color: #fff;
    height: 72rpx;
    line-height: 72rpx;
    font-weight: 500;
    width: 300rpx;
  }

  .myhb_flex_2_dija {
    padding: 0rpx 48rpx 0rpx 56rpx;

    .myhb_fd2_2_dija {
      margin: 48rpx 0rpx 0rpx 0rpx;

      .myhb_fd2_2_c0_c3_dija {
        border-radius: 6rpx 6rpx 6rpx 6rpx;
        background: rgba(253, 81, 61, 0.3);
        padding: 2rpx 12rpx 2rpx 12rpx;
        margin: 0rpx 0rpx 0rpx auto;
      }

      .myhb_fd2_2_c1_dija {
        margin: 10rpx 0rpx 0rpx 0rpx;

        .myhb_fd2_2_c1_c0_dija {
          width: 596rpx;
          height: 8rpx;
          border-radius: 16rpx 16rpx 16rpx 16rpx;
          background: var(--benbenbgColor1);
          background-size: 100% auto !important;

          .myhb_progress1_fd2_2_c1_c0_dija {
            background: rgba(254, 233, 128, 1);
            border-radius: 10rpx 10rpx 10rpx 10rpx;
          }

          .myhb_progress2_fd2_2_c1_c0_dija {
            width: 32rpx;
            height: 32rpx;
          }
        }

        .myhb_fd2_2_c1_c1_dija {
          width: 16rpx;
          height: 16rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }
      }

      .myhb_fd2_2_c2_dija {
        margin: 20rpx 0rpx 0rpx 0rpx;
      }
    }
  }

  .myhb_fd2_0_dija {
    margin: 40rpx 0rpx 0rpx 0rpx;

    .myhb_fd2_0_c0_dija {
      width: 124rpx;
      height: 124rpx;
      border-radius: 67rpx 67rpx 67rpx 67rpx;
    }

    .myhb_fd2_0_c1_dija {
      margin: 0rpx 0rpx 0rpx 24rpx;

      .myhb_fd2_0_c1_c0_c0_dija {
        color: var(--benbenFontColor0);
        font-size: 40rpx;
        font-weight: 700;
        line-height: 56rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-width: 300rpx;
      }

      .myhb_fd2_0_c1_c0_c1_dija {
        width: 150rpx;
        height: 44rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }

      .myhb_fd2_0_c1_c1_dija {
        margin: 16rpx 0rpx 0rpx 0rpx;

        .myhb_fd2_0_c1_c1_c2_dija {
          border-radius: 6rpx 6rpx 6rpx 6rpx;
          background: rgba(253, 81, 61, 0.3);
          padding: 2rpx 15rpx 2rpx 15rpx;
          margin: 0rpx 0rpx 0rpx 14rpx;
        }
      }
    }

    .myhb_fd2_0_c2_dija {
      width: 18rpx;
      height: 32rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }
  }

  .myhb_fd2_0_c1_c1_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 28rpx;
    font-weight: 600;
    line-height: 40rpx;
  }

  .myhb_fd2_0_c1_c1_c2_c0_dija {
    color: rgba(253, 81, 61, 1);
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
  }

  .myhb_fd2_1_c0_dija {
    width: 124rpx;
    height: 124rpx;
    border-radius: 67rpx 67rpx 67rpx 67rpx;
    margin: 0rpx 32rpx 0rpx 0rpx;
  }

  .myhb_fd2_1_c1_dija {
    color: var(--benbenFontColor0);
    font-size: 40rpx;
    font-weight: 700;
    line-height: 56rpx;
  }

  .myhb_fd2_2_c0_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
  }

  .myhb_fd2_2_c2_c0_dija {
    color: var(--benbenFontColor0);
    font-size: 24rpx;
    font-weight: 600;
    line-height: 33rpx;
  }

  .myhb_flex_0_dija {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 100;
    top: 0rpx;

    .myhb_fd0_0_dija {
      width: 150rpx;
      height: 88rpx;
    }

    .myhb_fd0_1_dija {
      color: var(--benbenFontColor0);
      font-size: 36rpx;
      font-weight: 500;
      line-height: 50rpx;
    }

    .myhb_fd0_2_dija {
      width: 150rpx;
      height: 88rpx;
      position: relative;

      .myhb_fd0_2_c0_dija {
        width: 40rpx;
        height: 40rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 32rpx 0rpx 32rpx;
      }

      .myhb_fd0_2_c1_dija {
        position: absolute;
        top: 10rpx;
        right: 12rpx;
      }
    }
  }
}
</style>
