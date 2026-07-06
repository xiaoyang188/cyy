<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-center benben-position-layout flex offerPay_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center self-center justify-between flex-sub offerPay_fd0_0_babdd">
          <view class="flex flex-wrap align-center offerPay_fd0_0_c0_babdd" @tap.stop="showBackFunc()">
            <image class="offerPay_fd0_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '324.png'"></image>
          </view>
          <view class="flex flex-wrap align-stretch justify-center flex-sub">
            <text class="offerPay_fd0_0_c1_c0_babdd">{{ $t('立即支付') }}</text>
          </view>
          <view class="flex flex-wrap align-center offerPay_fd0_0_c0_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>

      <view class="flex flex-direction flex-wrap align-center benben-flex-layout offerPay_flex_1_babdd">
        <view class="flex flex-wrap align-end offerPay_fd1_0_babdd">
          <text class="offerPay_fd1_0_c0_babdd">{{ $t('￥') }}</text>
          <text class="offerPay_fd1_0_c1_babdd" v-if="money != ''">
            <text class="offerPay_price1_fd1_0_c1_babdd">{{ money | frontPrice }}</text>
            <text class="offerPay_price2_fd1_0_c1_babdd">{{ money | laterPrice }}</text>
          </text>
        </view>
        <view class="flex flex-wrap align-center offerPay_fd1_1_babdd">
          <text class="offerPay_fd1_1_c0_babdd">{{ $t('支付剩余时间：') }}</text>
          <benben-countdown
            class="offerPay_fd1_1_c1_babdd"
            :show-day="false"
            :show-hour="true"
            :show-minute="true"
            :show-second="true"
            :time-type="false"
            :count-time="time"
            v-if="time < daojishi"
          >
            <benben-countdown-item date-type="h"></benben-countdown-item>

            <text>:</text>

            <benben-countdown-item date-type="i"></benben-countdown-item>

            <text>:</text>

            <benben-countdown-item date-type="s"></benben-countdown-item>

            <text></text>
          </benben-countdown>
          <benben-countdown
            class="offerPay_fd1_1_c1_babdd"
            :show-day="true"
            :show-hour="true"
            :show-minute="true"
            :show-second="true"
            :time-type="false"
            :count-time="time"
            v-if="time >= daojishi"
          >
            <benben-countdown-item date-type="d"></benben-countdown-item>

            <text>{{ $t('天') }}</text>

            <benben-countdown-item date-type="h"></benben-countdown-item>

            <text>:</text>

            <benben-countdown-item date-type="i"></benben-countdown-item>

            <text>:</text>

            <benben-countdown-item date-type="s"></benben-countdown-item>

            <text></text>
          </benben-countdown>
        </view>
      </view>

      <!---flex布局flex布局开始-->
      <view class="flex benben-flex-layout flex-wrap align-center offerPay_flex_2_babdd"></view>

      <!---flex布局flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout offerPay_flex_3_babdd">
        <text class="offerPay_fd3_0_babdd">{{ $t('选择支付方式') }}</text>
        <benben-select-diy
          ref="showSelectPopup1687683901811"
          class-text="flex-direction flex-wrap align-stretch flex"
          :items.sync="dataType"
          v-model="payID"
          :label.sync="payLable"
          default-type="pay_type"
          default-label="name"
          :allow-cancel="false"
          type="radio"
          :disabled="false"
          v-if="dataType.length != '0'"
        >
          <benben-select-item v-for="(item, key0) in dataType" :hand-value="item.pay_type" :key="key0">
            <template #selected>
              <view class="flex align-center flex offerPay_fd3_1_c0_babdd">
                <image class="offerPay_fd3_1_c0_c0_babdd" mode="aspectFit" :src="item.image"></image>
                <text class="offerPay_fd3_1_c0_c1_babdd">{{ item.name }}</text>
                <view class="flex flex-wrap align-center" v-if="item.pay_type == 'balance'">
                  <text class="offerPay_fd3_1_c0_c1_babdd">{{ $t('(可用余额￥') }}</text>
                  <text class="offerPay_fd3_1_c0_c1_babdd">{{ dataMessage.user_money }}</text>
                  <text class="offerPay_fd3_1_c0_c2_c2_babdd">)</text>
                </view>
                <image class="offerPay_fd3_1_c0_c3_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
              </view>
            </template>
            <template #no-selected>
              <view class="flex align-center flex offerPay_fd3_1_c0_babdd">
                <image class="offerPay_fd3_1_c0_c0_babdd" mode="aspectFit" :src="item.image"></image>
                <text class="offerPay_fd3_1_c0_c1_babdd">{{ item.name }}</text>
                <view class="flex flex-wrap align-center" v-if="item.pay_type == 'balance'">
                  <text class="offerPay_fd3_1_c0_c1_babdd">{{ $t('(可用余额￥') }}</text>
                  <text class="offerPay_fd3_1_c0_c1_babdd">{{ dataMessage.user_money }}</text>
                  <text class="offerPay_fd3_1_c0_c2_c2_babdd">)</text>
                </view>
                <image class="offerPay_fd3_1_c1_c3_babdd" mode="aspectFit" :src="STATIC_URL + '325.png'"></image>
              </view>
            </template>
          </benben-select-item>
        </benben-select-diy>
        <button class="offerPay_fd3_2_babdd" @tap.stop="immediatePaymentFunc()">{{ $t('立即支付') }}</button>
      </view>

      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1679651812141" :mask="true" :mask-close-able="true" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout offerPay_flex_4_babdd">
          <view class="flex flex-direction flex-wrap align-stretch offerPay_fd4_0_babdd">
            <view class="flex flex-direction flex-wrap align-center offerPay_fd4_0_c0_babdd">
              <text class="offerPay_fd4_0_c0_c0_babdd">{{ $t('确认要离开收银台？') }}</text>
              <view class="flex flex-wrap align-center">
                <view class="offerPay_fd4_0_c0_c1_c0_babdd">
                  <text>{{ $t('您的订单在') }}</text>
                  <benben-countdown class="offerPay_fd4_0_c0_c1_c0_c1_babdd" :show-day="false" :time-type="false" :count-time="time">
                    <benben-countdown-item date-type="h"></benben-countdown-item>

                    <text>:</text>

                    <benben-countdown-item date-type="i"></benben-countdown-item>

                    <text>:</text>

                    <benben-countdown-item date-type="s"></benben-countdown-item>

                    <text></text>
                  </benben-countdown>
                  <text>{{ $t('内未支付将被取消，请尽快完成支付') }}</text>
                </view>
              </view>
            </view>
            <view class="flex flex-wrap align-center">
              <button class="flex-sub offerPay_fd4_0_c1_c0_babdd" @tap.stop="popupShow1679651812141 = false">{{ $t('继续支付') }}</button>
              <button class="flex-sub offerPay_fd4_0_c1_c1_babdd" @tap.stop="returntoOrderDetailsFunc()">{{ $t('确认离开') }}</button>
            </view>
          </view>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1687342431187" :mask="true" :mask-close-able="true" mode="center">
        <!---基础弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center offerPay_flex_5_babdd">
          <text class="offerPay_fd5_0_babdd">{{ $t('是否前往设置支付密码？') }}</text>
          <view class="flex align-center">
            <button class="offerPay_fd5_1_c0_babdd" @tap.stop="popupShow1687342431187 = false">{{ $t('取消') }}</button>
            <button class="offerPay_fd5_1_c1_babdd" @tap.stop="gopswdFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---基础弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1685686587824" :mask="true" :mask-close-able="false" mode="center">
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center offerPay_fd6_0_babdd">
            <text class="offerPay_fd6_0_c0_babdd">{{ $t('请输入密码') }}</text>
            <benben-digital-password
              :box-num="6"
              mode="password"
              class-text="flex flex align-center justify-center offerPay_fd6_0_c1_babdd"
              v-model="pay_password"
              :init-open.sync="xianshi"
            >
              <template #default="{ content, active, index }">
                <view
                  :key="index"
                  v-if="active"
                  class="flex align-center justify-center active-digital-password offerPay_flex_password_active_fd6_0_c1_babdd"
                >
                  {{ content }}
                </view>
                <view :key="index" v-else class="flex align-center justify-center offerPay_flex_password_noActive_fd6_0_c1_babdd">
                  {{ content }}
                </view>
              </template>
            </benben-digital-password>
            <text
              class="offerPay_fd6_0_c2_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/xtsz/changePayPwd/changePayPwd`"
            >
              {{ $t('忘记密码？') }}
            </text>
            <view class="flex align-stretch offerPay_fd6_0_c3_babdd">
              <button class="offerPay_fd6_0_c3_c0_babdd" @tap.stop="closePopupFunc()">{{ $t('取消') }}</button>
              <button class="offerPay_fd6_0_c3_c1_babdd" @tap.stop="balancepayFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'
import { bindNativePaySuccess, unbindNativePaySuccess } from '@/common/utils/hostAppPay.js'
let mixin = {
  onBackPress() {
    this.showBackFunc()
    return this.back
  },
}
export default {
  components: {},

  mixins: [mixin],
  data() {
    return {
      popupShow1685686587824: false,
      popupShow1687342431187: false,
      popupShow1679651812141: false,
      payID: 'wxpay',
      payLable: '微信支付',
      pay_password: '',
      /** dataMessage【个人信息（金额）】
       *   follow_count【关注的店铺数量】
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
        collection_count: 0,
        browse_count: 0,
        total_money: 0,
        certified: 0,
        nickname: '',
        is_pay_password: 0,
        follow_count: 0,
      },
      /** dataType【支付方式】 **/
      dataType: [],
      typeUrl: {
        wxpay: 'https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20221201/33830ae4892cd61a91208d43cbc103d3.png',
        balance: 'https://oss.tiantianhuoke.com/images/168371455948373.png',
        alipay: 'https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20221201/33830ae4892cd61a91208d43cbc103d3.png',
      },
      /** shifoupwsd【是否设置支付密码】
       *   falg【是否已设置支付密码0 未设置 1 已设置】 **/
      shifoupwsd: {
        falg: 0,
      },
      xianshi: true,
      /** datashifoucom【支付密码是否正确】
       *   falg【是否已设置支付密码0 未设置 1 已设置】 **/
      datashifoucom: {
        falg: 0,
      },
      /** pay_status【支付状态】
       *   goods_total【商品总额】
       *   receive_surplus_time【订单待收货剩余时间】
       *   balance_payment_etime【尾款支付时间2】
       *   balance_payment_stime【尾款支付时间1】
       *   cancel_surplus_second【订单待付款剩余时间：】
       *   real_money【实付金额】
       *   group_user【拼团人员列表】
       *   group_info【拼团活动信息】
       *   status_txt【状态说明】
       *   join_number【拼团总人数【可参加】】
       *   group_members_nums【还差几人拼成】
       *   activity_status【活动状态: 0 待成团 1 拼团成功 2 拼团失败】
       *   join_timeout【拼团结束倒计时(秒)】
       *   discount_str【折扣说明】
       *   is_multiple_package【是否多包裹，如果多包裹查看物流需要先调用包裹列表接口】
       *   btn_list【按钮状态】
       *   pay_balance【支付尾款】
       *   delete_order【删除订单】
       *   evaluate【评价】
       *   confirm_receive【确认收货】
       *   view_logistics【查看物流】
       *   apply_refund【申请售后】
       *   view_invoice【查看发票】
       *   apply_invoice【申请发票】
       *   remind_already【已提醒】
       *   remind_send【提醒发货】
       *   go_pay【去付款】
       *   cancel_order【取消订单】
       *   shop_info【店铺信息】
       *   store_logo_id【商家logo图片ID】
       *   store_logo【商家Logo】
       *   store_name【商家名称】
       *   aid【商家ID】
       *   order_goods_list【订单商品】
       *   order_info【订单信息】
       *   pickup_img【核销码图片】
       *   pickup_code【核销码】
       *   express_price【运费】
       *   label_name【收货地址标签】
       *   sex【收货人性别】
       *   district【收货区】
       *   city【收货市】
       *   province【收货省】
       *   remark【订单备注】
       *   receiver_name【收货人】
       *   receiver_address【收货地址】
       *   receiver_mobile【收货电话】
       *   pay_type_str【支付方式说明】
       *   status【状态;-1:取消;0:待付款;1:已付款;2:已发货;3:已完成;4:已评价 5:售后中  6:已结束(订单所有商品已售后完成)   7:预售待付尾款   预售尾款超时(订单取消)】
       *   pay_type【支付方式】
       *   create_time【下单时间】
       *   discount_money【会员优惠金额】
       *   pay_time【支付时间】
       *   receive_time【收货时间】
       *   send_time【发货时间】
       *   coupon_money【平台优惠券金额】
       *   coupon_id【平台优惠券ID】
       *   payable_money【应付金额】
       *   order_money【订单金额】
       *   order_sn【订单编号】
       *   aid【订单ID】 **/
      dataDetail: {
        aid: '',
        order_sn: '',
        order_money: '',
        payable_money: '',
        coupon_id: '',
        coupon_money: '',
        send_time: '',
        receive_time: '',
        pay_time: '',
        discount_money: '',
        create_time: '',
        pay_type: '',
        status: '',
        pay_type_str: '',
        order_info: {
          receiver_mobile: '',
          receiver_address: '',
          receiver_name: '',
          remark: '',
          province: '',
          city: '',
          district: '',
          sex: '',
          label_name: '',
          express_price: '',
          pickup_code: '',
          pickup_img: '',
        },
        order_goods_list: [],
        shop_info: {
          aid: 0,
          store_name: '',
          store_logo: '',
          store_logo_id: 0,
        },
        btn_list: {
          cancel_order: '',
          go_pay: '',
          remind_send: '',
          remind_already: '',
          apply_invoice: '',
          view_invoice: '',
          apply_refund: '',
          view_logistics: '',
          confirm_receive: '',
          evaluate: '',
          delete_order: '',
          pay_balance: '',
        },
        is_multiple_package: 0,
        order_type: '',
        advance_sn: '',
        usermerchant_id: '',
        discount_str: '',
        surplus_receive_time: '',
        group_info: {
          join_timeout: '',
          activity_status: 0,
          group_members_nums: 0,
          join_number: 0,
          status_txt: '',
        },
        group_user: [],
        real_money: '',
        cancel_surplus_second: 0,
        balance_payment_stime: '',
        balance_payment_etime: '',
        receive_surplus_time: '',
        goods_total: '',
        pay_status: '',
      },
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
      integralDetail: {
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
      end_time: '1800',
      loading: false,
      daojishi: 86400,
      back: true,
      order_sn: 'GD20230625191830714165',
      money: '',
      time: '',
      order_type: '3',
      payPath: '',
    }
  },
  computed: {
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
  },
  watch: {},
  onLoad(options) {
    let { order_sn, money, time, order_type, payPath } = options
    if (order_sn !== undefined) this.order_sn = order_sn
    if (money !== undefined) this.money = money
    if (time !== undefined) this.time = time
    if (order_type !== undefined) this.order_type = order_type
    if (payPath !== undefined) this.payPath = payPath
    this.getMessageFunc()
    this.getDetailFunc()
    this.getintegralDetailFunc()
    this.getTypeFunc()

    this.setupOfferPayNativeSuccess()
  },
  onUnload() {
    this.teardownOfferPayNativeSuccess()
  },
  onReady() {},
  onShow() {
    this.getpswdFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    setupOfferPayNativeSuccess() {
      bindNativePaySuccess(() => {
        this.paySuccessFunc()
      })
    },
    teardownOfferPayNativeSuccess() {
      unbindNativePaySuccess()
    },
    handlePay() {
      // 1. 准备要传给 App 的数据
      const payData = {
        action: 'openNativePay', // 定义一个动作标识
        orderId: '20260507001', // 订单号
        amount: 19.9, // 金额
        payType: 'balance', // 支付方式（余额）
      }

      // uni.postMessage 只存在于 App web-view 承载的外部 H5 页面中。
      if (typeof uni !== 'undefined' && typeof uni.postMessage === 'function') {
        uni.postMessage({
          data: payData,
        })
        console.log('已通知 App 打开支付')
        return
      }

      console.warn('当前不是 App web-view 环境，无法调用 uni.postMessage', payData)
      this.$message.info(this.$t('当前环境不支持唤起App支付'))
    },

    //返回到订单详情
    returntoOrderDetailsFunc() {
      this.popupShow1679651812141 = false
      this.back = false
      this.$urouter.navigateBack(1)
    },
    //立即支付
    immediatePaymentFunc() {
      if (!validate(this.payID, 'require')) {
        this.$message.info(this.$t('请选择支付方式'))
        return false
      }
      if (this.payID == 'balance') {
        if (this.shifoupwsd.falg == 0) {
          this.popupShow1687342431187 = true
        } else {
          if (+this.dataMessage.user_money < this.money) {
            this.$message.info('余额不足')
            return
          }
          this.xianshi = true
          this.popupShow1685686587824 = true
        }
      } else if (this.payID == 'wxpay') {
        if (this.loading) return false
        this.loading = true
        this.paymentByWxpayFunc()
      } else if (this.payID == 'alipay') {
        if (this.loading) return false
        this.loading = true
        this.paymentByAlipayFunc()
      }
    },
    //获取个人信息（金额）
    async getMessageFunc() {
      //请求方法
      //数据验证

      let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.dataMessage = infodataMessage.data
    },
    //获取支付方式
    async getTypeFunc() {
      //请求方法
      //数据验证

      let datadataType = await this.$api.get(global.apiUrls.post64424fe115688, {})

      if (datadataType.data.code != 1) {
        this.$message.info(datadataType.data.msg)
        return
      }
      let infodataType = datadataType.data
      this.dataType = infodataType.data

      if (this.appSystemIdentification == 'Wechat') {
        this.dataType.forEach((item, index) => {
          if (item.pay_type == 'alipay') {
            this.dataType.splice(index, 1)
          }
        })
      }
      this.payID = this.dataType.length > 0 ? this.dataType[0].pay_type : ''
    },
    //是否设置支付密码
    async getpswdFunc() {
      //请求方法
      //数据验证

      let datashifoupwsd = await this.$api.post(global.apiUrls.post5f64a4d364b44, {})

      if (datashifoupwsd.data.code != 1) {
        this.$message.info(datashifoupwsd.data.msg)
        return
      }
      let infoshifoupwsd = datashifoupwsd.data
      this.shifoupwsd = infoshifoupwsd.data
    },
    //跳转设置支付密码
    gopswdFunc() {
      this.popupShow1687342431187 = false
      this.$urouter.navigateTo(`/pages/xtsz/payment/payment`)
    },
    //余额支付
    async balancepayFunc() {
      if (!validate(this.pay_password, 'require')) {
        this.$message.info(this.$t('请输入支付密码'))
        return false
      }
      if (!(this.pay_password.split('').length == 6)) {
        this.$message.info(global.i18n.t('请输入6位支付密码'))
        return false
      }
      let datadatashifoucom = await this.$api.post(global.apiUrls.post5f64a4d364b44, {
        pay_password: this.pay_password,
      })

      if (datadatashifoucom.data.code != 1) {
        this.$message.info(datadatashifoucom.data.msg)
        this.pay_password = ''
        return
      }
      let infodatashifoucom = datadatashifoucom.data
      this.datashifoucom = infodatashifoucom.data
      //请求方法
      //数据验证

      let data641ea9f00a6ae = await this.$api.dbPost(global.apiUrls.post641ea9f00a6ae, {
        order_sn: this.order_sn,
        pay_password: this.pay_password,
      })
      if (!data641ea9f00a6ae) return
      if (data641ea9f00a6ae.data.code != 1) {
        this.$message.info(data641ea9f00a6ae.data.msg)
        return
      }
      let info641ea9f00a6ae = data641ea9f00a6ae.data

      this.popupShow1685686587824 = false
      this.paySuccessFunc()
    },
    //获取订单详情
    async getDetailFunc() {
      if (this.order_type == '3') {
        //请求方法
        //数据验证

        let datadataDetail = await this.$api.post(global.apiUrls.post62c92b9d5ada3, {
          order_sn: this.order_sn,
          order_type: '3',
        })

        if (datadataDetail.data.code != 1) {
          this.$message.info(datadataDetail.data.msg)
          return
        }
        let infodataDetail = datadataDetail.data
        this.dataDetail = infodataDetail.data

        this.money = this.dataDetail.payable_money
        this.time = this.dataDetail.cancel_surplus_second
      }
    },
    //获取积分详情
    async getintegralDetailFunc() {
      if (this.order_type == '4') {
        //请求方法
        //数据验证

        let dataintegralDetail = await this.$api.post(global.apiUrls.post6415509c196eb, {
          order_sn: this.order_sn,
        })

        if (dataintegralDetail.data.code != 1) {
          this.$message.info(dataintegralDetail.data.msg)
          return
        }
        let infointegralDetail = dataintegralDetail.data
        this.integralDetail = infointegralDetail.data

        this.money = this.integralDetail.goods_money
        this.time = this.integralDetail.cancel_time
      }
    },
    //关闭弹窗
    closePopupFunc() {
      this.popupShow1685686587824 = false
      this.pay_password = ''
      this.popupShow1685686587824 = false
    },
    //显示返回弹框
    showBackFunc() {
      this.getDetailFunc()
      if (this.order_type == '4') {
        this.getintegralDetailFunc()
      }
      this.popupShow1679651812141 = true
    },
    //支付跳转页面
    paySuccessFunc() {
      if (this.order_type != '4') {
        uni.$emit('shenqingchengg', this.payID)
        this.$urouter.redirectTo(
          `/pages/sy/resultPayment/resultPayment?order_sn=${this.order_sn}&money=${this.money}&payPath=${this.payPath}&order_type=${this.order_type}`,
        )
      } else {
        uni.$emit('upjflist', this.payID)
        this.$urouter.redirectTo(`/pages/jf/exchangeSuccessful/exchangeSuccessful`)
      }
    },
    //微信支付
    paymentByWxpayFunc() {
      console.log(global.apiUrls.post645cc07566415)
      this.$api
        .post(global.apiUrls.post645cc07566415, {
          order_sn: this.order_sn,
          // #ifdef APP-PLUS||H5
          wxpaytype: 'apppay',
          // #endif
          // #ifdef MP-WEIXIN
          wxpaytype: 'minipay',
          // #endif
        })
        .then((res) => {
          console.log('微信支付回调', res)
          if (res.data.code == 1) {
            let data = res.data.data
            console.log('支付信息', data)
            uni.requestPayment({
              provider: 'wxpay',
              // #ifdef MP-WEIXIN
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              // #endif
              // #ifdef APP-PLUS
              orderInfo: data,
              // #endif
              success: (e) => {
                console.log('success', e)
                if (e.errMsg == 'requestPayment:ok') {
                  this.paySuccessFunc()
                }
              },
              fail: (e) => {
                console.log('fail', e)
                let failMsg
                // #ifdef APP-PLUS
                failMsg = 'requestPayment:fail canceled'
                // #endif
                // #ifndef APP-PLUS
                failMsg = 'requestPayment:fail cancel'
                // #endif
                if (e.errMsg == failMsg) {
                  this.$message.info(global.i18n.t('取消支付'))
                } else {
                  this.$message.info(global.i18n.t('支付失败,请稍后重试'))
                  // this.$message.info("支付失败,原因为: " + e.errMsg);
                }
              },
              complete: () => {
                // console.log("2212: ");
                // this.paySuccess(sn);
                this.loading = false
              },
            })
          } else {
            this.loading = false
            this.$message.info(global.i18n.t('订单无效，支付失败'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.error('微信支付失败 =>', err)
        })
    },
    //支付宝支付
    paymentByAlipayFunc() {
      this.$api
        .post(global.apiUrls.post645cc048d1f34, {
          order_sn: this.order_sn,
        })
        .then((res) => {
          console.log('支付宝支付回调', res)
          if (res.data.code == 1) {
            uni.requestPayment({
              provider: 'alipay',
              orderInfo: res.data.data,
              success: (e) => {
                if (e.errMsg == 'requestPayment:ok') {
                  this.paySuccessFunc()
                }
              },
              fail: (e) => {
                if (e.errMsg == 'requestPayment:fail canceled') {
                  this.$message.info(global.i18n.t('取消支付'))
                } else {
                  this.$message.info(global.i18n.t('支付失败,请稍后重试'))
                }
              },
              complete: () => {
                this.loading = false
              },
            })
          } else {
            this.loading = false
            this.$message.info(global.i18n.t('订单无效，支付失败'))
          }
        })
        .catch((err) => {
          this.loading = false
          console.log('支付宝支付失败 => ', err)
        })
    },
    //微信支付作废勿删
    async wxFunc() {
      //请求方法
      //数据验证

      let data645cc07566415 = await this.$api.post(global.apiUrls.post645cc07566415, {
        order_sn: this.order_sn,
      })

      if (data645cc07566415.data.code != 1) {
        this.$message.info(data645cc07566415.data.msg)
        return
      }
      let info645cc07566415 = data645cc07566415.data
    },
    //支付宝支付作废勿删
    async apliyFunc() {
      //请求方法
      //数据验证

      let data645cc048d1f34 = await this.$api.post(global.apiUrls.post645cc048d1f34, {
        order_sn: this.order_sn,
      })

      if (data645cc048d1f34.data.code != 1) {
        this.$message.info(data645cc048d1f34.data.msg)
        return
      }
      let info645cc048d1f34 = data645cc048d1f34.data
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: rgba(248, 248, 248, 1);
  background-size: 100% auto;

  .offerPay_fd6_0_babdd {
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #fff;
    background-size: 100% auto !important;
    padding: 40rpx 0rpx 0rpx 0rpx;

    .offerPay_fd6_0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      margin: 0rpx 0rpx 32rpx 0rpx;
    }

    .offerPay_flex_password_active_fd6_0_c1_babdd {
      width: 68rpx;
      height: 68rpx;
      border: 1px solid #409eff;
    }

    .offerPay_flex_password_noActive_fd6_0_c1_babdd {
      width: 68rpx;
      height: 68rpx;
      border: 1px solid #ccc;
    }

    .offerPay_fd6_0_c2_babdd {
      margin: 0rpx 0rpx 24rpx 0rpx;
      color: var(--benbenFontColor0);
    }

    .offerPay_fd6_0_c3_babdd {
      border-top: 1px solid var(--benbenbdColor0);

      .offerPay_fd6_0_c3_c0_babdd {
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: #fff;
        color: var(--benbenFontColor1);
        line-height: 94rpx;
        width: 269rpx;
        font-weight: 400;
        border-right: 1px solid var(--benbenbdColor0);
      }

      .offerPay_fd6_0_c3_c1_babdd {
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        font-size: 33rpx;
        background: #fff;
        color: var(--benbenFontColor5);
        width: 269rpx;
        font-weight: 500;
        line-height: 94rpx;
      }
    }
  }

  .offerPay_flex_5_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .offerPay_fd5_0_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      margin: 91rpx 0rpx 88rpx 0rpx;
      padding: 0rpx 24rpx 0rpx 24rpx;
      text-align: center;
    }

    .offerPay_fd5_1_c0_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: #fff;
      color: var(--benbenFontColor1);
      border-top: 1px solid var(--benbenbdColor0);
      font-weight: 400;
      width: 269rpx;
    }

    .offerPay_fd5_1_c1_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: #fff;
      color: var(--benbenFontColor5);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      font-weight: 500;
      width: 269rpx;
    }
  }

  .offerPay_flex_4_babdd {
    width: 540rpx;

    .offerPay_fd4_0_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;

      .offerPay_fd4_0_c0_babdd {
        padding: 40rpx 30rpx 32rpx 30rpx;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
        border-bottom: 1px solid var(--benbenbdColor0);

        .offerPay_fd4_0_c0_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 32rpx;
          font-weight: 500;
          line-height: 45rpx;
          margin: 0rpx 0rpx 40rpx 0rpx;
        }

        .offerPay_fd4_0_c0_c1_c0_babdd {
          text-align: center;
          color: var(--benbenFontColor0);

          .offerPay_fd4_0_c0_c1_c0_c1_babdd {
            background: #ffffff;
          }
        }
      }

      .offerPay_fd4_0_c1_c0_babdd {
        font-size: 32rpx;
        background: #fff;
        color: var(--benbenFontColor1);
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        height: 110rpx;
        line-height: 110rpx;
        border-right: 1px solid var(--benbenbdColor0);
      }

      .offerPay_fd4_0_c1_c1_babdd {
        font-size: 32rpx;
        background: #fff;
        color: var(--benbenFontColor5);
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        height: 110rpx;
        line-height: 110rpx;
      }
    }
  }

  .offerPay_flex_3_babdd {
    background: #fff;
    background-size: 100% auto !important;
    padding: 0rpx 32rpx 12rpx 32rpx;
    margin: 0rpx 0rpx 120rpx 0rpx;

    .offerPay_fd3_0_babdd {
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      padding: 32rpx 0rpx 32rpx 0rpx;
      border-bottom: 1px solid #eee;
      line-height: 40rpx;
    }

    .offerPay_fd3_2_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 686rpx;
      height: 80rpx;
      line-height: 80rpx;
      position: fixed;
      bottom: calc(32rpx + var(--benben-window-bottom, 0px));
    }
  }

  .offerPay_fd3_1_c0_babdd {
    padding: 32rpx 0rpx 32rpx 0rpx;

    .offerPay_fd3_1_c0_c3_babdd {
      width: 36rpx;
      height: 36rpx;
      border-radius: 60rpx;
      margin: 0rpx 0rpx 0rpx auto;
    }
  }

  .offerPay_fd3_1_c0_c0_babdd {
    width: 56rpx;
    height: 56rpx;
    border-radius: 26rpx 26rpx 26rpx 26rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .offerPay_fd3_1_c0_c1_babdd {
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    line-height: 45rpx;
  }

  .offerPay_fd3_1_c0_c2_c2_babdd {
    font-size: 32rpx;
    font-weight: 400;
    color: #333333;
    line-height: 45rpx;
  }

  .offerPay_fd3_1_c1_c3_babdd {
    width: 37rpx;
    height: 37rpx;
    border-radius: 18rpx 18rpx 18rpx 18rpx;
    margin: 0rpx 0rpx 0rpx auto;
  }

  .offerPay_flex_2_babdd {
    height: 20rpx;
    background: rgba(246, 247, 249, 1);
    background-size: 100% auto !important;
  }

  .offerPay_flex_1_babdd {
    background: #fff;
    background-size: 100% auto !important;

    .offerPay_fd1_0_babdd {
      margin: 66rpx 0rpx 24rpx 0rpx;

      .offerPay_fd1_0_c0_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor4);
        line-height: 100rpx;
      }

      .offerPay_fd1_0_c1_babdd {
        color: var(--benbenFontColor4);
        font-weight: 700;
        line-height: 94rpx;
        font-size: 64rpx;

        .offerPay_price1_fd1_0_c1_babdd {
          line-height: 36rpx;
          font-size: 64rpx;
          font-weight: 700;
          color: rgba(250, 32, 51, 1);
        }

        .offerPay_price2_fd1_0_c1_babdd {
          font-size: 32rpx;
        }
      }
    }

    .offerPay_fd1_1_babdd {
      margin: 0rpx 0rpx 56rpx 0rpx;
      color: rgba(102, 102, 102, 1);

      .offerPay_fd1_1_c0_babdd {
        line-height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
      }
    }
  }

  .offerPay_fd1_1_c1_babdd {
    background: var(--benbenbgColor1);
  }

  .offerPay_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .offerPay_fd0_0_babdd {
      margin: 0rpx 32rpx 0rpx 32rpx;

      .offerPay_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
        line-height: 88rpx;
      }
    }
  }

  .offerPay_fd0_0_c0_babdd {
    width: 100rpx;
    height: 88rpx;

    .offerPay_fd0_0_c0_c0_babdd {
      width: 36rpx;
      height: 36rpx;
    }
  }
}

::v-deep .offerPay_fd6_0_c1_babdd {
  margin: 32rpx 0rpx 32rpx 0rpx;
}
</style>
