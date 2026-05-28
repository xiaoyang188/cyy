<template>
  <page-body>
    <view class="page">
      <view
        class="flex benben-position-layout flex flex-wrap align-center orderSure_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center justify-between flex-sub orderSure_fd0_0_babdd">
          <view class="flex flex-wrap align-center" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 orderSure_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="orderSure_fd0_0_c1_c0_babdd">{{ $t('确认订单') }}</text>
          </view>
          <view class="flex flex-wrap align-center orderSure_fd0_0_c2_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---订单详情flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout orderSure_flex_1_babdd">
        <view
          class="flex flex-wrap align-center justify-center flex-sub orderSure_fd1_0_babdd"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/wd/address/address?is_change=1`"
          v-if="dataMessage.has_address == 0"
        >
          <image class="orderSure_fd1_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
          <text class="orderSure_fd1_0_c1_babdd">{{ $t('添加收货地址') }}</text>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch flex-sub orderSure_fd1_1_babdd"
          @tap.stop="handleJumpDiy"
          data-type="navigateTo"
          :data-url="`/pages/wd/address/address?is_change=1`"
          v-if="dataMessage.has_address == '1'"
        >
          <view class="flex flex-wrap align-center orderSure_fd1_1_c0_babdd">
            <image class="orderSure_fd1_1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '433.png'"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub orderSure_fd1_1_c0_c1_babdd">
              <view class="flex align-center orderSure_fd1_1_c0_c1_c0_babdd">
                <text class="orderSure_fd1_1_c0_c1_c0_c0_babdd">{{ dataMessage.address.label_name }}</text>
                <text class="orderSure_fd1_1_c0_c1_c0_c1_babdd">{{ dataMessage.address.real_name }}</text>
                <text class="orderSure_fd1_1_c0_c1_c0_c2_babdd">(</text>
                <text class="orderSure_fd1_1_c0_c1_c0_c3_babdd" v-if="dataMessage.address.sex == '1'">{{ $t('先生') }}</text>
                <text class="orderSure_fd1_1_c0_c1_c0_c2_babdd" v-if="dataMessage.address.sex != '1'">{{ $t('女士') }}</text>
                <text class="orderSure_fd1_1_c0_c1_c0_c2_babdd">)</text>
                <text class="flex-sub orderSure_fd1_1_c0_c1_c0_c5_babdd">{{ dataMessage.address.mobile }}</text>
              </view>
              <view class="flex align-center">
                <view class="flex flex-wrap align-center flex-sub">
                  <view class="orderSure_fd1_1_c0_c1_c1_c0_c0_babdd">
                    <text class="flex-sub orderSure_fd1_1_c0_c1_c1_c0_c0_c0_babdd">{{ dataMessage.address.province }}</text>
                    <text class="flex-sub orderSure_fd1_1_c0_c1_c1_c0_c0_c0_babdd">{{ dataMessage.address.city }}</text>
                    <text class="flex-sub orderSure_fd1_1_c0_c1_c1_c0_c0_c0_babdd">{{ dataMessage.address.district }}</text>
                    <text class="flex-sub orderSure_fd1_1_c0_c1_c1_c0_c0_c0_babdd">{{ dataMessage.address.detail }}</text>
                  </view>
                </view>
              </view>
            </view>
            <image class="self-center orderSure_fd1_1_c0_c2_babdd" mode="aspectFit" :src="STATIC_URL + '74.png'"></image>
          </view>
          <view class="flex flex-wrap align-center flex-sub">
            <view class="flex flex-wrap align-center flex-sub orderSure_fd1_1_c1_c0_babdd"></view>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch orderSure_fd1_2_babdd" v-if="dataMessage.goods_integral">
          <view class="flex flex-wrap align-center orderSure_fd1_2_c0_babdd">
            <image class="orderSure_fd1_2_c0_c0_babdd" mode="aspectFill" :src="dataMessage.goods_integral.thumb" v-if="coupon == '0'"></image>
            <image class="orderSure_fd1_2_c0_c0_babdd" mode="aspectFill" :src="dataMessage.goods_integral.thumb" v-if="coupon == '1'"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub orderSure_fd1_2_c0_c1_babdd">
              <text class="orderSure_fd1_2_c0_c1_c0_babdd">{{ dataMessage.goods_integral.name }}</text>
              <view class="flex flex-wrap align-center orderSure_fd1_2_c0_c1_c1_babdd">
                <text class="orderSure_fd1_2_c0_c1_c1_c0_babdd">{{ dataMessage.goods_integral.integral }}</text>
                <text class="orderSure_fd1_2_c0_c1_c1_c1_babdd" v-if="dataMessage.goods_integral.shop_price != '0.00'">{{ $t('积分+') }}</text>
                <text class="orderSure_fd1_2_c0_c1_c1_c1_1_babdd" v-if="dataMessage.goods_integral.shop_price == '0.00'">{{ $t('积分') }}</text>
                <text class="orderSure_fd1_2_c0_c1_c1_c0_babdd" v-if="dataMessage.goods_integral.shop_price != '0.00'">
                  {{ dataMessage.goods_integral.shop_price }}
                </text>
                <text class="orderSure_fd1_2_c0_c1_c1_c1_babdd" v-if="dataMessage.goods_integral.shop_price != '0.00'">{{ $t('元') }}</text>
                <text class="orderSure_fd1_2_c0_c1_c1_c4_babdd">x</text>
                <text class="orderSure_fd1_2_c0_c1_c1_c5_babdd">{{ dataMessage.goods_integral.number }}</text>
              </view>
            </view>
          </view>
          <view class="flex flex-wrap align-center orderSure_fd1_2_c1_babdd">
            <text class="orderSure_fd1_2_c1_c0_babdd">{{ $t('商品总额') }}</text>
            <text class="orderSure_fd1_2_c1_c1_babdd">{{ $t('￥') }}</text>
            <text class="orderSure_fd1_2_c1_c2_babdd">{{ dataMessage.order_money }}</text>
          </view>
          <view class="flex flex-wrap align-center orderSure_fd1_2_c1_babdd">
            <text class="orderSure_fd1_2_c1_c0_babdd">{{ $t('商品积分(当前积分：') }}</text>
            <text class="orderSure_fd1_2_c1_c0_babdd">{{ dataUserInfo.score }}</text>
            <text class="orderSure_fd1_2_c2_c2_babdd">)</text>
            <text class="orderSure_fd1_2_c2_c3_babdd">-</text>
            <text class="orderSure_fd1_2_c1_c2_babdd">{{ dataMessage.goods_integral.integral }}</text>
          </view>
          <view class="flex flex-wrap align-center orderSure_fd1_2_c3_babdd">
            <text class="orderSure_fd1_2_c1_c0_babdd">{{ $t('运费') }}</text>
            <view class="flex flex-wrap align-center orderSure_fd1_2_c3_c1_babdd">
              <text class="orderSure_fd1_2_c1_c1_babdd">{{ $t('￥') }}</text>
              <text class="orderSure_fd1_2_c1_c2_babdd">0.00</text>
            </view>
          </view>
          <view class="flex flex-wrap align-center orderSure_fd1_2_c4_babdd">
            <text class="orderSure_fd1_2_c4_c0_babdd">{{ $t('合计：') }}</text>
            <text class="orderSure_fd1_2_c4_c1_babdd">{{ $t('￥') }}</text>
            <text class="orderSure_fd1_2_c4_c2_babdd">{{ dataMessage.payable_money }}</text>
          </view>
        </view>
        <view class="flex flex-direction align-stretch orderSure_fd1_3_babdd">
          <view class="flex flex-wrap align-center">
            <text class="orderSure_fd1_3_c0_c0_babdd">{{ $t('合计：') }}</text>
            <text class="orderSure_fd1_3_c0_c1_babdd">{{ $t('￥') }}</text>
            <text class="orderSure_fd1_3_c0_c2_babdd">{{ dataMessage.payable_money }}</text>
            <button class="orderSure_fd1_3_c0_c3_babdd" @tap.stop="PointsMallOrderFunc()">{{ $t('去支付') }}</button>
          </view>
          <!-- <benben-safe-area     >
        </benben-safe-area> -->
        </view>
      </view>

      <!---订单详情flex布局结束-->
      <benben-popup v-model="popupShow1686109619915" :mask="true" :mask-close-able="true" mode="center">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction align-stretch benben-flex-layout orderSure_flex_2_babdd">
          <view class="flex align-center justify-center orderSure_fd2_0_babdd">
            <text class="orderSure_fd2_0_c0_babdd">{{ status_msg }}</text>
          </view>
          <view class="flex align-center justify-center">
            <button class="orderSure_fd2_1_c0_babdd" @tap.stop="backYeFunc()">{{ $t('返回上一页') }}</button>
            <button class="orderSure_fd2_1_c1_babdd" @tap.stop="goAddListFunc()">{{ $t('切换收货地址') }}</button>
          </view>
        </view>

        <!---flex布局flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'
import hostAppPayMixin from '@/common/mixin/hostAppPay.js'

export default {
  components: {},
  mixins: [hostAppPayMixin],

  data() {
    return {
      popupShow1686109619915: false,
      coupon: '0',
      /** has_address【是否有收货地址 0否  1是】
       *   order_type【订单类型】
       *   order_money【商品总额】
       *   payable_money【订单合计金额】
       *   total_integral【订单总积分】
       *   address【收货地址信息】
       *   label_name【	标签】
       *   sex【	性别 1 男 2 女】
       *   district【	区】
       *   city【	市】
       *   province【	省】
       *   detail【	详细地址】
       *   mobile【	手机号】
       *   real_name【	姓名】
       *   user_id【用户id】
       *   goods_integral【下单商品信息】
       *   number【数量】
       *   thumb【商品图片】
       *   stock【库存】
       *   integral【积分】
       *   shop_price【价格】
       *   name【商品名称】
       *   aid【商品id】 **/
      dataMessage: {},
      sex_name: '',
      /** is_pay【是否需要调起支付:1 是 0 否】
       *   order_sn【订单号】 **/
      dataDetails: {
        order_sn: '',
        is_pay: '',
      },
      status_msg: '',
      freight_explain: '',
      liuyan: '',
      /** invoiceId【发票id】 **/
      invoiceId: '',
      username: '',
      address_id: '223',
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
      goods_id: '10',
      number: '',
      activity_id: '',
      sku_id: '',
      invoice_id: '',
      currentOrderSn: '',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { goods_id, address_id, number, activity_id, sku_id, invoice_id } = options
    if (goods_id !== undefined) this.goods_id = goods_id
    if (address_id !== undefined) this.address_id = address_id
    if (number !== undefined) this.number = number
    if (activity_id !== undefined) this.activity_id = activity_id
    if (sku_id !== undefined) this.sku_id = sku_id
    if (invoice_id !== undefined) this.invoice_id = invoice_id
    this.diyPageListen()
    this.setupHostAppPaySuccess()
  },
  onUnload() {
    this.diyOffPageListen()
    this.teardownHostAppPaySuccess()
  },
  onReady() {},
  onShow() {
    this.PointsMallConfirmationFunc()
    this.getUserinfoFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //返回上一页
    backYeFunc() {
      this.popupShow1685773487026 = false
      this.$urouter.navigateBack(1)
    },
    //修改收货地址
    goAddListFunc() {
      this.popupShow1685773487026 = false
    },
    //获取会员详情信息
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
    //积分商城确认订单
    async PointsMallConfirmationFunc() {
      let datadataMessage = await this.$api.post(global.apiUrls.post6414631bc7cdf, {
        goods_id: this.goods_id,
        address_id: this.address_id,
      })
      if (datadataMessage.data.code != 1) {
        if (datadataMessage.data.code == -1) {
          //code=-1地址超出范围
          this.status_code = -1
          this.status_msg = datadataMessage.data.msg
          this.popupShow1686109619915 = true
          this.dataMessage = datadataMessage.data.data
        } else {
          this.$message.info(datadataMessage.data.msg)
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
        return
      }
      let info = datadataMessage.data.data
      this.dataMessage = info
      //清空地址id
      if (!info.address.aid) {
        this.address_id = ''
      }
    },
    //积分商城下单
    async PointsMallOrderFunc() {
      if (this.address_id == '') {
        this.$message.info(global.i18n.t('请添加收货地址'))
        return
      }
      let datadataDetails = await this.$api.post(global.apiUrls.post641465fa0b5df, {
        goods_id: this.dataMessage.goods_integral.aid,
        address_id: this.address_id,
        number: this.dataMessage.goods_integral.number,
        payable_money: this.dataMessage.payable_money,
      })
      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data
      if (this.dataDetails.is_pay == '0') {
        this.$urouter.redirectTo(`/pages/jf/exchangeSuccessful/exchangeSuccessful`)
        return
      }
      const orderSn = this.dataDetails.order_sn
      if (!orderSn) return
      await this.proceedHostAppPay({
        orderSn,
        amount: this.dataMessage.payable_money,
        orderType: 4,
        source: 'orderSure',
        offerPayExtra: 'order_type=4',
      })
    },
    //页面监听
    diyPageListen() {
      uni.$on('isokaddid', (data) => {
        this.address_id = data
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('isokaddid')
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: var(--benbenbgColor0);
  background-size: 100% auto;

  .orderSure_flex_2_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    width: 540rpx;
    padding: 80rpx 24rpx 80rpx 24rpx;

    .orderSure_fd2_0_babdd {
      margin: 0rpx 0rpx 46rpx 0rpx;

      .orderSure_fd2_0_c0_babdd {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(253, 81, 61, 1);
      }
    }

    .orderSure_fd2_1_c0_babdd {
      font-size: 24rpx;
      background: rgba(253, 246, 236, 1);
      color: rgba(255, 153, 0, 1);
      height: 100rpx;
      padding: 0rpx 18rpx 0rpx 18rpx;
      border: 1px solid rgba(255, 153, 0, 1);
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      line-height: 100rpx;
      margin: 0rpx 20rpx 0rpx 0rpx;
    }

    .orderSure_fd2_1_c1_babdd {
      font-size: 24rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      height: 100rpx;
      padding: 0rpx 18rpx 0rpx 18rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      line-height: 100rpx;
      margin: 0rpx 0rpx 0rpx 20rpx;
    }
  }

  .orderSure_flex_1_babdd {
    padding: 20rpx 24rpx 0rpx 24rpx;

    .orderSure_fd1_0_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      padding: 32rpx 0rpx 32rpx 0rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .orderSure_fd1_0_c0_babdd {
        width: 60rpx;
        height: 60rpx;
      }

      .orderSure_fd1_0_c1_babdd {
        line-height: 45rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
        max-width: 200rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0rpx 0rpx 0rpx 24rpx;
      }
    }

    .orderSure_fd1_1_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      padding: 32rpx 0rpx 0rpx 0rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .orderSure_fd1_1_c0_babdd {
        margin: 0rpx 32rpx 32rpx 24rpx;

        .orderSure_fd1_1_c0_c0_babdd {
          width: 60rpx;
          height: 60rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .orderSure_fd1_1_c0_c1_babdd {
          margin: 0rpx 0rpx 0rpx 32rpx;

          .orderSure_fd1_1_c0_c1_c0_babdd {
            margin: 0rpx 0rpx 16rpx 0rpx;

            .orderSure_fd1_1_c0_c1_c0_c0_babdd {
              padding: 0rpx 10rpx 0rpx 10rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: var(--benbenFontColor4);
              background: var(--benbenbgColor1);
              background-size: 100% auto !important;
              border: 1px solid var(--benbenbdColor2);
              border-radius: 4rpx 4rpx 4rpx 4rpx;
            }

            .orderSure_fd1_1_c0_c1_c0_c1_babdd {
              line-height: 45rpx;
              font-size: 32rpx;
              font-weight: 700;
              color: var(--benbenFontColor0);
              margin: 0rpx 0rpx 0rpx 16rpx;
              max-width: 200rpx;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }

            .orderSure_fd1_1_c0_c1_c0_c3_babdd {
              line-height: 45rpx;
              font-size: 32rpx;
              font-weight: 700;
              color: var(--benbenFontColor0);
            }

            .orderSure_fd1_1_c0_c1_c0_c5_babdd {
              line-height: 40rpx;
              font-size: 32rpx;
              font-weight: 500;
              color: var(--benbenFontColor0);
              margin: 0rpx 0rpx 0rpx 32rpx;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }

          .orderSure_fd1_1_c0_c1_c1_c0_c0_babdd {
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }

        .orderSure_fd1_1_c0_c2_babdd {
          width: 12rpx;
          height: 22rpx;
          margin: 8rpx 0rpx 0rpx 32rpx;
        }
      }

      .orderSure_fd1_1_c1_c0_babdd {
        height: 6rpx;
        background:
          url(#{image-path('280.png')
        }) no-repeat,
          transparent;
        background-size: 100% auto !important;
      }
    }

    .orderSure_fd1_2_babdd {
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      padding: 32rpx 24rpx 0rpx 24rpx;
      margin: 20rpx 0rpx 0rpx 0rpx;

      .orderSure_fd1_2_c0_babdd {
        padding: 0rpx 0rpx 32rpx 0rpx;
        border-bottom: 1px solid #eee;

        .orderSure_fd1_2_c0_c1_babdd {
          height: 200rpx;

          .orderSure_fd1_2_c0_c1_c0_babdd {
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

          .orderSure_fd1_2_c0_c1_c1_babdd {
            margin: auto 0rpx 0rpx 0rpx;

            .orderSure_fd1_2_c0_c1_c1_c1_1_babdd {
              font-size: 22rpx;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }

            .orderSure_fd1_2_c0_c1_c1_c4_babdd {
              margin: 0rpx 0rpx 0rpx auto;
              font-size: 24rpx;
              font-weight: 400;
              color: var(--benbenFontColor1);
            }

            .orderSure_fd1_2_c0_c1_c1_c5_babdd {
              font-size: 24rpx;
              font-weight: 400;
              color: var(--benbenFontColor1);
            }
          }
        }
      }

      .orderSure_fd1_2_c3_babdd {
        margin: 32rpx 0rpx 32rpx 0rpx;

        .orderSure_fd1_2_c3_c1_babdd {
          margin: 0rpx 0rpx 0rpx auto;
        }
      }

      .orderSure_fd1_2_c4_babdd {
        padding: 24rpx 0rpx 24rpx 0rpx;
        border-top: 1px solid #eee;

        .orderSure_fd1_2_c4_c0_babdd {
          margin: 0rpx 0rpx 0rpx auto;
          font-size: 24rpx;
          font-weight: 500;
          color: var(--benbenFontColor1);
        }

        .orderSure_fd1_2_c4_c1_babdd {
          font-size: 20rpx;
          font-weight: 500;
          color: var(--benbenFontColor4);
        }

        .orderSure_fd1_2_c4_c2_babdd {
          font-size: 28rpx;
          font-weight: 500;
          color: var(--benbenFontColor4);
        }
      }
    }

    .orderSure_fd1_3_babdd {
      width: 750rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;
      position: fixed;
      left: 0rpx;
      bottom: calc(0rpx + var(--benben-window-bottom, 0px));

      .orderSure_fd1_3_c0_c0_babdd {
        margin: 0rpx 0rpx 0rpx 24rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
      }

      .orderSure_fd1_3_c0_c1_babdd {
        font-size: 20rpx;
        font-weight: 500;
        color: var(--benbenFontColor5);
      }

      .orderSure_fd1_3_c0_c2_babdd {
        font-size: 28rpx;
        font-weight: 500;
        color: var(--benbenFontColor5);
        margin: 0rpx auto 0rpx 0rpx;
      }

      .orderSure_fd1_3_c0_c3_babdd {
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        font-size: 28rpx;
        background: var(--benbenbtnColor0);
        color: var(--benbenFontColor3);
        width: 260rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-weight: 500;
      }
    }
  }

  .orderSure_fd1_1_c0_c1_c0_c2_babdd {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 700;
    color: #333333;
  }

  .orderSure_fd1_1_c0_c1_c1_c0_c0_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .orderSure_fd1_2_c0_c0_babdd {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .orderSure_fd1_2_c0_c1_c1_c0_babdd {
    font-size: 36rpx;
    font-weight: 700;
    color: var(--benbenFontColor4);
    margin: 0rpx 8rpx 0rpx 0rpx;
  }

  .orderSure_fd1_2_c0_c1_c1_c1_babdd {
    font-size: 22rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .orderSure_fd1_2_c1_babdd {
    margin: 32rpx 0rpx 0rpx 0rpx;
  }

  .orderSure_fd1_2_c1_c0_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .orderSure_fd1_2_c1_c1_babdd {
    margin: 0rpx 0rpx 0rpx auto;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .orderSure_fd1_2_c1_c2_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .orderSure_fd1_2_c2_c2_babdd {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .orderSure_fd1_2_c2_c3_babdd {
    margin: 0rpx 4rpx 0rpx auto;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .orderSure_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-bottom: 1px solid #eee;

    .orderSure_fd0_0_babdd {
      margin: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .orderSure_fd0_0_c0_c0_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbeniconColor1);
      }

      .orderSure_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: var(--benbenFontColor0);
      }

      .orderSure_fd0_0_c2_babdd {
        width: 36rpx;
      }
    }
  }
}
</style>
