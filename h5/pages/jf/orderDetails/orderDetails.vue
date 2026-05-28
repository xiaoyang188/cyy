<template>
  <page-body>
    <view class="page">
      <view class="flex benben-position-layout flex flex-wrap align-center orderDetails_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }">
        <view class="flex flex-wrap align-center justify-between flex-sub orderDetails_fd0_0_babdd">
          <view class="flex flex-wrap align-center" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 orderDetails_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="orderDetails_fd0_0_c1_c0_babdd">{{ $t('订单详情') }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd0_0_c2_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1686122276477" :mask="true" :mask-close-able="true" mode="center">
        <!---删除订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center orderDetails_flex_1_babdd">
          <text class="orderDetails_fd1_0_babdd">{{ $t('提示') }}</text>
          <text class="orderDetails_fd1_1_babdd">{{ $t('是否确认删除订单?') }}</text>
          <view class="flex align-center">
            <button class="orderDetails_fd1_2_c0_babdd"
              @tap.stop="popupShow1686122276477 = false">{{ $t('取消') }}</button>
            <button class="orderDetails_fd1_2_c1_babdd" @tap.stop="getDeleteFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---删除订单弹窗flex布局结束-->
      </benben-popup>
      <!---订单详情flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout orderDetails_flex_2_babdd">
        <view class="flex flex-wrap align-center orderDetails_fd2_0_babdd">
          <view class="flex flex-direction flex-wrap align-start">
            <text class="orderDetails_fd2_0_c0_c0_babdd" v-if="dataDetails.status == '0'">{{ $t('订单待付款') }}</text>
            <text class="orderDetails_fd2_0_c0_c0_babdd" v-if="dataDetails.status == '1'">{{ $t('订单待发货') }}</text>
            <text class="orderDetails_fd2_0_c0_c0_babdd" v-if="dataDetails.status == '2'">{{ $t('订单待收货') }}</text>
            <text class="orderDetails_fd2_0_c0_c0_babdd" v-if="dataDetails.status == '4'">{{ $t('订单已完成') }}</text>
            <text class="orderDetails_fd2_0_c0_c0_babdd" v-if="dataDetails.status == '-1'">{{ $t('订单已取消') }}</text>
            <view class="flex flex-wrap align-center orderDetails_fd2_0_c0_c1_babdd">
              <text class="orderDetails_fd2_0_c0_c1_c0_babdd" v-if="dataDetails.status == '0'">{{ $t('剩余时间：') }}</text>
              <text class="orderDetails_fd2_0_c0_c1_c0_babdd"
                v-if="dataDetails.status == '1'">{{ $t('已付款，等待卖家发货') }}</text>
              <text class="orderDetails_fd2_0_c0_c1_c0_babdd"
                v-if="dataDetails.status == '2'">{{ $t('卖家已发货等待买家收货') }}</text>
              <benben-countdown class="orderDetails_fd2_0_c0_c1_c1_babdd" :show-day="false" :time-type="false"
                :count-time="dataDetails.cancel_time" v-if="dataDetails.status == '0'">
                <benben-countdown-item date-type="h"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="i"></benben-countdown-item>

                <text>:</text>

                <benben-countdown-item date-type="s"></benben-countdown-item>

                <text></text>
              </benben-countdown>
            </view>
          </view>
          <image class="orderDetails_fd2_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '375.png'"
            v-if="dataDetails.status == '0'"></image>
          <image class="orderDetails_fd2_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '376.png'"
            v-if="dataDetails.status == '1'"></image>
          <image class="orderDetails_fd2_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '377.png'"
            v-if="dataDetails.status == '2'"></image>
          <image class="orderDetails_fd2_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '378.png'"
            v-if="dataDetails.status == '4'"></image>
          <image class="orderDetails_fd2_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '379.png'"
            v-if="dataDetails.status == '-1'"></image>
        </view>
        <view class="flex flex-direction align-stretch orderDetails_fd2_1_babdd">
          <view class="flex flex-wrap align-center orderDetails_fd2_1_c0_babdd">
            <image class="orderDetails_fd2_1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub">
              <view class="flex flex-wrap align-center orderDetails_fd2_1_c0_c1_c0_babdd">
                <text class="orderDetails_fd2_1_c0_c1_c0_c0_babdd">{{ dataDetails.order_address.label_name }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c0_c1_babdd">{{ dataDetails.order_address.receiver_name }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c0_c2_babdd">(</text>
                <text class="orderDetails_fd2_1_c0_c1_c0_c2_babdd"
                  v-if="dataDetails.order_address.sex == '1'">{{ $t('先生') }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c0_c3_1_babdd"
                  v-if="dataDetails.order_address.sex != '1'">{{ $t('女士') }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c0_c4_babdd">)</text>
                <text
                  class="orderDetails_fd2_1_c0_c1_c0_c5_babdd">{{ dataDetails.order_address.receiver_mobile }}</text>
              </view>
              <view class="orderDetails_fd2_1_c0_c1_c1_babdd">
                <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ dataDetails.order_address.province }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ dataDetails.order_address.city }}</text>
                <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ dataDetails.order_address.district }}</text>
                <text
                  class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ dataDetails.order_address.receiver_address }}</text>
              </view>
            </view>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_1_c1_babdd"></view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch orderDetails_fd2_2_babdd">
          <template v-for="(item, key0) in dataDetails.goods_integral">
            <view class="flex flex-wrap align-center orderDetails_fd2_2_c0_babdd" :key="key0">
              <image class="orderDetails_fd2_2_c0_c0_babdd" mode="aspectFill" :src="item.goods_thumb"></image>
              <view class="flex flex-direction flex-wrap align-stretch flex-sub orderDetails_fd2_2_c0_c1_babdd">
                <text class="orderDetails_fd2_2_c0_c1_c0_babdd">{{ item.goods_name }}</text>
                <view class="flex flex-wrap align-center orderDetails_fd2_2_c0_c1_c1_babdd">
                  <text class="orderDetails_fd2_2_c0_c1_c1_c0_babdd">{{ item.goods_integral }}</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c1_babdd"
                    v-if="item.shop_price != '0.00'">{{ $t('积分+') }}</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c1_1_babdd"
                    v-if="item.shop_price == '0.00'">{{ $t('积分') }}</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c0_babdd"
                    v-if="item.shop_price != '0.00'">{{ item.shop_price }}</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c1_babdd"
                    v-if="item.shop_price != '0.00'">{{ $t('元') }}</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c4_babdd">x</text>
                  <text class="orderDetails_fd2_2_c0_c1_c1_c5_babdd">{{ item.num }}</text>
                </view>
              </view>
            </view>
          </template>

          <view class="flex flex-wrap align-center justify-between orderDetails_fd2_2_c1_babdd">
            <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ $t('商品总额') }}</text>
            <view class="flex flex-wrap align-center">
              <text class="orderDetails_fd2_2_c1_c1_c0_babdd">{{ $t('￥') }}</text>
              <text class="orderDetails_fd2_2_c1_c1_c0_babdd">{{ dataDetails.goods_money }}</text>
            </view>
          </view>
          <view class="flex align-center orderDetails_fd2_2_c2_babdd">
            <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ $t('商品积分(当前积分：') }}</text>
            <text class="orderDetails_fd2_2_c2_c1_babdd">{{ dataUserInfo.score }}</text>
            <text class="orderDetails_fd2_2_c2_c1_babdd">)</text>
            <view class="flex align-center orderDetails_fd2_2_c2_c3_babdd">
              <text class="orderDetails_fd2_2_c1_c1_c0_babdd">-</text>
              <text class="orderDetails_fd2_2_c1_c1_c0_babdd">{{ dataDetails.integral_reduce }}</text>
            </view>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_2_c3_babdd">
            <text class="orderDetails_fd2_2_c3_c0_babdd" v-if="dataDetails.status <= '0'">{{ $t('应付款') }}</text>
            <text class="orderDetails_fd2_2_c3_c0_1_babdd" v-if="dataDetails.status > '0'">{{ $t('实付款') }}</text>
            <text class="orderDetails_fd2_2_c3_c1_babdd">{{ $t('￥') }}</text>
            <text class="orderDetails_fd2_2_c3_c2_babdd">{{ dataDetails.payable_money }}</text>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch orderDetails_fd2_3_babdd">
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c0_babdd">
            <view class="flex flex-wrap align-center orderDetails_fd2_3_c0_c0_babdd"></view>
            <text class="orderDetails_fd2_3_c0_c1_babdd">{{ $t('订单信息') }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c1_babdd">
            <text class="orderDetails_fd2_3_c1_c0_babdd">{{ $t('订单编号：') }}</text>
            <text class="orderDetails_fd2_3_c1_c1_babdd">{{ dataDetails.order_sn }}</text>
            <text class="orderDetails_fd2_3_c1_c2_babdd"
              @tap.stop="copyText(dataDetails.order_sn)">{{ $t('复制') }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c2_babdd">
            <text class="orderDetails_fd2_3_c1_c0_babdd">{{ $t('兑换时间：') }}</text>
            <text class="flex-sub orderDetails_fd2_3_c1_c1_babdd">{{ dataDetails.create_time }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c2_babdd">
            <text class="orderDetails_fd2_3_c1_c0_babdd" v-if="dataDetails.status <= '0'">{{ $t('应付金额：') }}</text>
            <text class="orderDetails_fd2_3_c3_c0_1_babdd" v-if="dataDetails.status > '0'">{{ $t('实付金额：') }}</text>
            <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ $t('￥') }}</text>
            <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd">{{ dataDetails.payable_money }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c2_babdd" v-if="dataDetails.pay_type != ''">
            <text class="orderDetails_fd2_3_c1_c0_babdd">{{ $t('支付方式：') }}</text>
            <text class="orderDetails_fd2_1_c0_c1_c1_c0_babdd"
              v-if="dataDetails.pay_type == 'wxpay'">{{ $t('微信支付') }}</text>
            <text class="orderDetails_fd2_2_c2_c1_babdd"
              v-if="dataDetails.pay_type == 'balance'">{{ $t('余额支付') }}</text>
            <text class="orderDetails_fd2_2_c2_c1_babdd"
              v-if="dataDetails.pay_type == 'alipay'">{{ $t('支付宝支付') }}</text>
            <text class="orderDetails_fd2_2_c2_c1_babdd"
              v-if="dataDetails.pay_type == 'integral'">{{ $t('积分支付') }}</text>
          </view>
          <view class="flex flex-wrap align-center orderDetails_fd2_3_c2_babdd" v-if="dataDetails.pay_time != ''">
            <text class="orderDetails_fd2_3_c1_c0_babdd">{{ $t('支付时间：') }}</text>
            <text class="flex-sub orderDetails_fd2_3_c1_c1_babdd">{{ dataDetails.pay_time }}</text>
          </view>
        </view>
        <view class="flex flex-direction align-stretch orderDetails_fd2_4_babdd">
          <view class="flex align-center justify-end orderDetails_fd2_4_c0_babdd">
            <button class="orderDetails_fd2_4_c0_c0_babdd" @tap.stop="popupShow1686123082025 = true"
              v-if="dataDetails.status == '0'">
              {{ $t('取消订单') }}
            </button>
            <button class="orderDetails_fd2_4_c0_c0_1_babdd" @tap.stop="handleJumpDiy" data-type="navigateTo"
              :data-url="`/pages/ddgl/logisticsCheck/logisticsCheck?order_id=${dataDetails.aid}`"
              v-if="in_array(dataDetails.status, '2,4')">
              {{ $t('查看物流') }}
            </button>
            <button class="orderDetails_fd2_4_c0_c0_1_babdd" @tap.stop="popupShow1686122276477 = true"
              v-if="in_array(dataDetails.status, '4,-1')">
              {{ $t('删除订单') }}
            </button>
            <!-- <button
              class="orderDetails_fd2_4_c0_c1_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/sy/offerPay/offerPay?order_sn=${dataDetails.order_sn}&order_type=4`"
              v-if="dataDetails.status == '0'"
            >
              {{ $t('去付款') }}
            </button> -->
            <button class="orderDetails_fd2_4_c0_c1_1_babdd" @tap.stop="shipremindFunc()"
              v-if="dataDetails.is_remind.info == 0 && dataDetails.status == '1'">
              {{ $t('提醒发货') }}
            </button>
            <button class="orderDetails_fd2_4_c0_c1_1_babdd" @tap.stop="popupShow1686122373181 = true"
              v-if="dataDetails.status == '2'">
              {{ $t('确认收货') }}
            </button>
            <button class="orderDetails_fd2_4_c0_c1_babdd"
              v-if="dataDetails.is_remind.info == '1' && dataDetails.status == '1'">
              {{ $t('已提醒') }}
            </button>
          </view>
          <benben-safe-area></benben-safe-area>
        </view>
      </view>

      <!---订单详情flex布局结束-->
      <benben-popup v-model="popupShow1686122373181" :mask="true" :mask-close-able="true" mode="center">
        <!---确认收货弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center orderDetails_flex_3_babdd">
          <text class="orderDetails_fd3_0_babdd">{{ $t('提示') }}</text>
          <text class="orderDetails_fd3_1_babdd">{{ $t('是否确认收货?') }}</text>
          <view class="flex align-center">
            <button class="orderDetails_fd3_2_c0_babdd"
              @tap.stop="popupShow1686122373181 = false">{{ $t('取消') }}</button>
            <button class="orderDetails_fd3_2_c1_babdd" @tap.stop="getConfirmFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---确认收货弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686123082025" :mask="true" :mask-close-able="true" mode="center">
        <!---取消订单弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center orderDetails_flex_4_babdd">
          <text class="orderDetails_fd4_0_babdd">{{ $t('提示') }}</text>
          <text class="orderDetails_fd4_1_babdd">{{ $t('是否确认取消订单?') }}</text>
          <view class="flex align-center">
            <button class="orderDetails_fd4_2_c0_babdd"
              @tap.stop="popupShow1686123082025 = false">{{ $t('取消') }}</button>
            <button class="orderDetails_fd4_2_c1_babdd" @tap.stop="getCancleFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---取消订单弹窗flex布局结束-->
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
        popupShow1686123082025: false,
        popupShow1686122373181: false,
        popupShow1686122276477: false,
        /** goods_money【商品总额】
         *   goods_integral【积分商品信息】
         *   order_address【收货地址信息】
         *   label_name【标签】
         *   sex【性别】
         *   district【区】
         *   city【市】
         *   province【省】
         *   express_price【运费】
         *   remark【备注信息】
         *   receiver_name【姓名】
         *   receiver_address【详细地址】
         *   receiver_mobile【手机号】
         *   address_id【地址id】
         *   is_remind【提醒发货信息】
         *   hour【发货提醒过期时间(小时)】
         *   info【是否能提醒发货:0 是 1 否】
         *   cancel_time【付款倒计时(秒)】
         *   pay_time【支付时间】
         *   integral_reduce【订单总积分】
         *   pay_type【支付方式】
         *   create_time【兑换时间】
         *   real_money【订单实际支付价格】
         *   payable_money【	订单总价格】
         *   pay_status【支付状态: 0 未支付 1 已支付】
         *   status【	状态: 0 待付款 1待发货 2待收货 3 待评价 4 已完成 -1或-2:已取消】
         *   order_type【4 积分订单】
         *   order_sn【订单编号】
         *   user_id【用户id】
         *   aid【订单id】 **/
        dataDetails: {
          aid: '',
          user_id: '',
          order_sn: '',
          order_type: '',
          status: '',
          pay_status: '',
          payable_money: '',
          real_money: '',
          create_time: '',
          pay_type: '',
          integral_reduce: '',
          pay_time: '',
          cancel_time: '',
          is_remind: {
            info: '',
            hour: '',
          },
          order_address: {
            address_id: '',
            receiver_mobile: '',
            receiver_address: '',
            receiver_name: '',
            remark: '',
            express_price: '',
            province: '',
            city: '',
            district: '',
            sex: '',
            label_name: '',
          },
          goods_integral: [],
          goods_money: '',
        },
        tabs: 'all',
        text: '更新积分列表',
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
        dataUserInfo: {
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
        integral_id: 'JF230625165405520630',
      }
    },
    computed: {},
    watch: {},
    onLoad(options) {
      let {
        integral_id
      } = options
      if (integral_id !== undefined) this.integral_id = integral_id
    },
    onUnload() {},
    onReady() {},
    onShow() {
      this.getDetailFunc()
      this.getUserinfoFunc()
    },
    onHide() {},
    onResize() {},
    onPullDownRefresh() {},
    onReachBottom(e) {},
    onPageScroll(e) {},
    methods: {
      //确认收货
      async getConfirmFunc() {
        //请求方法
        //数据验证

        let data64156687686b5 = await this.$api.post(global.apiUrls.post64156687686b5, {
          order_sn: this.dataDetails.order_sn,
        })

        if (data64156687686b5.data.code != 1) {
          this.$message.info(data64156687686b5.data.msg)
          return
        }
        let info64156687686b5 = data64156687686b5.data

        this.popupShow1686122373181 = false
        this.getDetailFunc()
        uni.$emit('upjflist', this.text)
      },
      //删除订单
      async getDeleteFunc() {
        //请求方法
        //数据验证

        let data641568f194350 = await this.$api.post(global.apiUrls.post641568f194350, {
          order_sn: this.dataDetails.order_sn,
        })

        if (data641568f194350.data.code != 1) {
          this.$message.info(data641568f194350.data.msg)
          return
        }
        let info641568f194350 = data641568f194350.data

        this.popupShow1686122276477 = false
        this.getDetailFunc()
        uni.$emit('upjflist', this.text)
        setTimeout(() => {
          this.$urouter.navigateBack(1)
        }, 500)
      },
      //取消订单
      async getCancleFunc() {
        //请求方法
        //数据验证

        let data64155c02284ef = await this.$api.post(global.apiUrls.post64155c02284ef, {
          order_sn: this.dataDetails.order_sn,
        })

        if (data64155c02284ef.data.code != 1) {
          this.$message.info(data64155c02284ef.data.msg)
          return
        }
        let info64155c02284ef = data64155c02284ef.data

        this.popupShow1686123082025 = false
        this.getDetailFunc()
        uni.$emit('upjflist', this.text)
      },
      //获取用户信息
      async getUserinfoFunc() {
        //请求方法
        //数据验证

        let datadataUserInfo = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

        if (datadataUserInfo.data.code != 1) {
          this.$message.info(datadataUserInfo.data.msg)
          return
        }
        let infodataUserInfo = datadataUserInfo.data
        this.dataUserInfo = infodataUserInfo.data
      },
      //积分商城-积分订单详情
      async getDetailFunc() {
        //请求方法
        //数据验证

        let datadataDetails = await this.$api.post(global.apiUrls.post6415509c196eb, {
          order_sn: this.integral_id,
        })

        if (datadataDetails.data.code != 1) {
          this.$message.info(datadataDetails.data.msg)
          return
        }
        let infodataDetails = datadataDetails.data
        this.dataDetails = infodataDetails.data
      },
      //积分商城-提醒发货
      async shipremindFunc() {
        //请求方法
        //数据验证

        let data64155d9464c1d = await this.$api.post(global.apiUrls.post64155d9464c1d, {
          order_sn: this.dataDetails.order_sn,
        })

        if (data64155d9464c1d.data.code != 1) {
          this.$message.info(data64155d9464c1d.data.msg)
          return
        }
        let info64155d9464c1d = data64155d9464c1d.data

        uni.showToast({
          title: this.$t('提醒成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        this.getDetailFunc()
        uni.$emit('upjflist', this.text)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .page {
    width: 100vw;
    overflow-x: hidden;
    min-height: calc(100vh - var(--benben-window-bottom, 0px));
    background: url(#{image-path('449.png')
  }) no-repeat;
  background-size: 100% auto;

  .orderDetails_flex_4_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .orderDetails_fd4_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .orderDetails_fd4_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 60rpx 40rpx 60rpx;
    }

    .orderDetails_fd4_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      width: 270rpx;
    }

    .orderDetails_fd4_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 268rpx;
    }
  }

  .orderDetails_flex_3_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .orderDetails_fd3_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .orderDetails_fd3_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 60rpx 40rpx 60rpx;
    }

    .orderDetails_fd3_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor1);
      padding: 0rpx 103rpx 0rpx 103rpx;
      border-top: 1px solid var(--benbenbdColor0);
    }

    .orderDetails_fd3_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 268rpx;
    }
  }

  .orderDetails_flex_2_babdd {
    padding: 0rpx 24rpx 0rpx 24rpx;

    .orderDetails_fd2_0_babdd {
      margin: 0rpx 0rpx 24rpx 0rpx;

      .orderDetails_fd2_0_c0_c1_babdd {
        color: var(--benbenFontColor3);

        .orderDetails_fd2_0_c0_c1_c1_babdd {
          background: transparent;
        }
      }
    }

    .orderDetails_fd2_1_babdd {
      padding: 44rpx 0rpx 0rpx 0rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      border-radius: 24rpx 24rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 32rpx 0rpx;

      .orderDetails_fd2_1_c0_babdd {
        margin: 0rpx 50rpx 30rpx 48rpx;

        .orderDetails_fd2_1_c0_c0_babdd {
          width: 60rpx;
          height: 60rpx;
          border-radius: 30rpx 30rpx 30rpx 30rpx;
          margin: 0rpx 32rpx 0rpx 0rpx;
        }

        .orderDetails_fd2_1_c0_c1_c0_babdd {
          margin: 0rpx 0rpx 16rpx 0rpx;

          .orderDetails_fd2_1_c0_c1_c0_c0_babdd {
            padding: 0rpx 16rpx 0rpx 16rpx;
            border-radius: 8rpx 8rpx 8rpx 8rpx;
            background: var(--benbenbgColor5);
            border: 1px solid var(--benbenbdColor2);
            font-size: 24rpx;
            font-weight: 500;
            color: var(--benbenFontColor4);
            margin: 0rpx 16rpx 0rpx 0rpx;
          }

          .orderDetails_fd2_1_c0_c1_c0_c1_babdd {
            font-size: 32rpx;
            font-weight: 700;
            color: var(--benbenFontColor0);
            max-width: 200rpx;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }

          .orderDetails_fd2_1_c0_c1_c0_c3_1_babdd {
            font-size: 32rpx;
            font-weight: 700;
            color: #333;
          }

          .orderDetails_fd2_1_c0_c1_c0_c4_babdd {
            font-size: 32rpx;
            font-weight: 700;
            color: var(--benbenFontColor0);
            margin: 0rpx 32rpx 0rpx 0rpx;
          }

          .orderDetails_fd2_1_c0_c1_c0_c5_babdd {
            font-size: 32rpx;
            font-weight: 700;
            color: var(--benbenFontColor0);
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }

        .orderDetails_fd2_1_c0_c1_c1_babdd {
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }

      .orderDetails_fd2_1_c1_babdd {
        height: 6rpx;
        background: url(#{image-path('365.png')
      }) no-repeat;
      background-size: 100% auto !important;
    }
  }

  .orderDetails_fd2_2_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 0rpx 20rpx 0rpx;
    padding: 32rpx 24rpx 0rpx 24rpx;

    .orderDetails_fd2_2_c0_babdd {
      padding: 0rpx 0rpx 32rpx 0rpx;
      border-bottom: 1px solid #eee;

      .orderDetails_fd2_2_c0_c0_babdd {
        width: 200rpx;
        height: 200rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        margin: 0rpx 24rpx 0rpx 0rpx;
      }

      .orderDetails_fd2_2_c0_c1_babdd {
        height: 200rpx;

        .orderDetails_fd2_2_c0_c1_c0_babdd {
          font-size: 28rpx;
          font-weight: 600;
          color: var(--benbenFontColor0);
          margin: 0rpx 0rpx 8rpx 0rpx;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .orderDetails_fd2_2_c0_c1_c1_babdd {
          margin: auto 0rpx 0rpx 0rpx;

          .orderDetails_fd2_2_c0_c1_c1_c1_1_babdd {
            font-size: 22rpx;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }

          .orderDetails_fd2_2_c0_c1_c1_c4_babdd {
            margin: 0rpx 0rpx 0rpx auto;
            font-size: 24rpx;
            font-weight: 400;
            color: var(--benbenFontColor1);
          }

          .orderDetails_fd2_2_c0_c1_c1_c5_babdd {
            font-size: 24rpx;
            font-weight: 400;
            color: var(--benbenFontColor1);
          }
        }
      }
    }

    .orderDetails_fd2_2_c1_babdd {
      margin: 32rpx 0rpx 0rpx 0rpx;
    }

    .orderDetails_fd2_2_c2_babdd {
      margin: 32rpx 0rpx 32rpx 0rpx;

      .orderDetails_fd2_2_c2_c3_babdd {
        margin: 0rpx 0rpx 0rpx auto;
      }
    }

    .orderDetails_fd2_2_c3_babdd {
      padding: 24rpx 0rpx 24rpx 0rpx;
      border-top: 1px solid #eee;

      .orderDetails_fd2_2_c3_c0_babdd {
        margin: 0rpx 0rpx 0rpx auto;
        font-size: 24rpx;
        font-weight: 500;
        color: var(--benbenFontColor1);
      }

      .orderDetails_fd2_2_c3_c0_1_babdd {
        margin: 0rpx 0rpx 0rpx auto;
        font-size: 24rpx;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }

      .orderDetails_fd2_2_c3_c1_babdd {
        font-size: 24rpx;
        font-weight: 500;
        color: var(--benbenFontColor4);
      }

      .orderDetails_fd2_2_c3_c2_babdd {
        font-size: 28rpx;
        font-weight: 500;
        color: var(--benbenFontColor4);
      }
    }
  }

  .orderDetails_fd2_3_babdd {
    background: var(--benbenbgColor1);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    margin: 0rpx 0rpx 130rpx 0rpx;

    .orderDetails_fd2_3_c0_babdd {
      padding: 32rpx 0rpx 24rpx 0rpx;
      border-bottom: 1px solid #eee;

      .orderDetails_fd2_3_c0_c0_babdd {
        width: 6rpx;
        height: 30rpx;
        margin: 0rpx 0rpx 0rpx 0rpx;
        background: var(--benbenbgColor3);
        border-radius: 4rpx 4rpx 4rpx 4rpx;
      }

      .orderDetails_fd2_3_c0_c1_babdd {
        padding: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
      }
    }

    .orderDetails_fd2_3_c1_babdd {
      margin: 24rpx 0rpx 32rpx 0rpx;

      .orderDetails_fd2_3_c1_c2_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor4);
        margin: 0rpx 0rpx 0rpx 24rpx;
      }
    }
  }

  .orderDetails_fd2_4_babdd {
    width: 750rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    position: fixed;
    left: 0rpx;
    bottom: calc(0rpx + var(--benben-window-bottom, 0px));

    .orderDetails_fd2_4_c0_babdd {
      margin: 12rpx 0rpx 12rpx 0rpx;

      .orderDetails_fd2_4_c0_c0_babdd {
        border-radius: 39rpx 39rpx 39rpx 39rpx;
        font-size: 28rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        margin: 0rpx 32rpx 0rpx 0rpx;
        width: 200rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-weight: 500;
      }
    }
  }
  }

  .orderDetails_fd2_0_c0_c0_babdd {
    font-size: 32rpx;
    font-weight: 700;
    color: #fff;
    margin: 0rpx 0rpx 8rpx 0rpx;
  }

  .orderDetails_fd2_0_c0_c1_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: #fff;
  }

  .orderDetails_fd2_0_c1_babdd {
    width: 140rpx;
    height: 140rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 0rpx 0rpx auto;
  }

  .orderDetails_fd2_1_c0_c1_c0_c2_babdd {
    font-size: 32rpx;
    font-weight: 700;
    color: var(--benbenFontColor0);
  }

  .orderDetails_fd2_1_c0_c1_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .orderDetails_fd2_2_c0_c1_c1_c0_babdd {
    font-size: 36rpx;
    font-weight: 700;
    color: var(--benbenFontColor4);
    margin: 0rpx 8rpx 0rpx 0rpx;
  }

  .orderDetails_fd2_2_c0_c1_c1_c1_babdd {
    font-size: 22rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .orderDetails_fd2_2_c1_c1_c0_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .orderDetails_fd2_2_c2_c1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .orderDetails_fd2_3_c1_c0_babdd {
    color: var(--benbenFontColor1);
    margin: 0rpx 16rpx 0rpx 0rpx;
    font-size: 28rpx;
    font-weight: 400;
  }

  .orderDetails_fd2_3_c1_c1_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .orderDetails_fd2_3_c2_babdd {
    margin: 0rpx 0rpx 32rpx 0rpx;
  }

  .orderDetails_fd2_3_c3_c0_1_babdd {
    color: rgba(153, 153, 153, 1);
    margin: 0rpx 16rpx 0rpx 0rpx;
    font-size: 28rpx;
    font-weight: 400;
  }

  .orderDetails_fd2_4_c0_c0_1_babdd {
    border-radius: 39rpx 39rpx 39rpx 39rpx;
    font-size: 28rpx;
    background: var(--benbenbtnColor3);
    color: rgba(51, 51, 51, 1);
    margin: 0rpx 32rpx 0rpx 0rpx;
    width: 200rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-weight: 500;
  }

  .orderDetails_fd2_4_c0_c1_babdd {
    border-radius: 39rpx 39rpx 39rpx 39rpx;
    font-size: 28rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
    margin: 0rpx 24rpx 0rpx 0rpx;
    width: 200rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-weight: 500;
  }

  .orderDetails_fd2_4_c0_c1_1_babdd {
    border-radius: 39rpx 39rpx 39rpx 39rpx;
    font-size: 28rpx;
    background: var(--benbenbtnColor0);
    color: #fff;
    margin: 0rpx 24rpx 0rpx 0rpx;
    width: 200rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-weight: 500;
  }

  .orderDetails_flex_1_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .orderDetails_fd1_0_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      text-align: center;
      margin: 40rpx 60rpx 0rpx 60rpx;
    }

    .orderDetails_fd1_1_babdd {
      line-height: 52rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin: 32rpx 60rpx 40rpx 60rpx;
    }

    .orderDetails_fd1_2_c0_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: #fff;
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      width: 270rpx;
    }

    .orderDetails_fd1_2_c1_babdd {
      line-height: 110rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbgColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      width: 268rpx;
    }
  }

  .orderDetails_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: url(#{image-path('449.png')
  }) no-repeat;
  background-size: 100% auto !important;

  .orderDetails_fd0_0_babdd {
    margin: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;

    .orderDetails_fd0_0_c0_c0_babdd {
      font-size: 36rpx;
      font-weight: 500;
      color: #fff;
    }

    .orderDetails_fd0_0_c1_c0_babdd {
      font-size: 36rpx;
      font-weight: 600;
      color: #fff;
    }

    .orderDetails_fd0_0_c2_babdd {
      width: 36rpx;
    }
  }
  }
  }
</style>
