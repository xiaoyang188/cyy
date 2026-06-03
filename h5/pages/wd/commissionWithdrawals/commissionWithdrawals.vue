<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex commissionWithdrawals_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub commissionWithdrawals_fd0_0_babdd">
          <view class="flex align-center commissionWithdrawals_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 commissionWithdrawals_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex align-center">
            <text class="commissionWithdrawals_fd0_0_c1_c0_babdd">{{ $t('提现') }}</text>
          </view>
          <view class="flex align-center justify-end commissionWithdrawals_fd0_0_c0_babdd">
            <view
              class="flex flex-wrap align-center"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/wd/brokerageWithdrawalDetail/brokerageWithdrawalDetail`"
              v-if="appSystemIdentification != 'Wechat'"
            >
              <text class="commissionWithdrawals_fd0_0_c2_c0_c0_babdd">{{ $t('明细') }}</text>
            </view>
          </view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1701842027676" :mask="true" :mask-close-able="true" mode="center">
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_fd1_0_babdd">
            <text class="commissionWithdrawals_fd1_0_c0_babdd">{{ $t('请输入密码') }}</text>
            <benben-digital-password
              :box-num="6"
              mode="password"
              class-text="flex flex align-center justify-center commissionWithdrawals_fd1_0_c1_babdd"
              v-model="pay_password"
              :init-open.sync="xianshi"
            >
              <template #default="{ content, active, index }">
                <view
                  :key="index"
                  v-if="active"
                  class="flex align-center justify-center active-digital-password commissionWithdrawals_flex_password_active_fd1_0_c1_babdd"
                >
                  {{ content }}
                </view>
                <view :key="index" v-else class="flex align-center justify-center commissionWithdrawals_flex_password_noActive_fd1_0_c1_babdd">
                  {{ content }}
                </view>
              </template>
            </benben-digital-password>
            <text class="commissionWithdrawals_fd1_0_forgot_babdd" @tap.stop="goForgotPayPwdFunc()">{{ $t('忘记密码？') }}</text>
            <view class="flex align-stretch commissionWithdrawals_fd1_0_c2_babdd">
              <button class="commissionWithdrawals_fd1_0_c2_c0_babdd" @tap.stop="closePopupFunc()">{{ $t('取消') }}</button>
              <button class="commissionWithdrawals_fd1_0_c2_c1_babdd" @tap.stop="postWithdrawalFunc()">{{ $t('确定') }}</button>
            </view>
          </view>
        </view>
      </benben-popup>
      <benben-popup v-model="popupShow1701842399214" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---是否确定前往flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_fd2_0_babdd">
            <text class="commissionWithdrawals_fd2_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="commissionWithdrawals_fd2_0_c1_babdd">{{ $t('是否前往设置支付密码？') }}</text>
            <view class="flex align-center commissionWithdrawals_fd2_0_c2_babdd">
              <button class="commissionWithdrawals_fd2_0_c2_c0_babdd" @tap.stop="popupShow1701842399214 = false">{{ $t('取消') }}</button>
              <button class="commissionWithdrawals_fd2_0_c2_c1_babdd" @tap.stop="gopswdFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>

        <!---是否确定前往flex布局结束-->
      </benben-popup>

      <view class="flex flex-direction align-stretch benben-flex-layout commissionWithdrawals_flex_3_babdd">
        <view class="commissionWithdrawals_card_babdd commissionWithdrawals_amount_card_babdd">
          <view class="flex flex-wrap align-center justify-between commissionWithdrawals_card_header_babdd">
            <text class="commissionWithdrawals_card_title_babdd">{{ $t('提现积分') }}</text>
            <view
              class="flex flex-wrap align-center commissionWithdrawals_detail_link_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/wd/brokerageWithdrawalDetail/brokerageWithdrawalDetail`"
              v-if="appSystemIdentification == 'Wechat'"
            >
              <text>{{ $t('明细') }}</text>
            </view>
          </view>
          <view class="flex flex-direction align-center commissionWithdrawals_balance_box_babdd">
            <text class="commissionWithdrawals_balance_label_babdd">{{ $t('可提现积分') }}</text>
            <text class="commissionWithdrawals_balance_value_babdd">{{ jfMoney }}</text>
          </view>
          <view class="commissionWithdrawals_input_box_babdd">
            <view class="commissionWithdrawals_input_inner_babdd">
              <benben-input
                class="commissionWithdrawals_input_field_babdd"
                type="number"
                :placeholder="$t('请输入提现积分数量')"
                confirm-type="done"
                :maxlength="-1"
                :adjust-position="false"
                placeholder-style="color:#999999;font-size:30rpx;line-height:44rpx"
                @input="onInputFunc($event)"
                v-model="cash_fee"
              />
            </view>
            <text class="commissionWithdrawals_all_btn_babdd" @tap.stop="allmoneyFunc()">{{ $t('全部') }}</text>
          </view>
          <view class="commissionWithdrawals_rules_box_babdd" v-if="rules" @tap.stop="popupShow1673862116532 = true">
            <text class="fu-iconfont2 commissionWithdrawals_rules_icon_babdd">&#xE600;</text>
            <text class="commissionWithdrawals_rules_text_babdd">{{ rules }}</text>
          </view>
        </view>

        <view class="commissionWithdrawals_card_babdd commissionWithdrawals_method_card_babdd">
          <text class="commissionWithdrawals_card_title_babdd commissionWithdrawals_method_title_babdd">{{ $t('请选择提现方式') }}</text>
          <template v-for="(item, key0) in dataType">
            <view
              class="flex flex-wrap align-center commissionWithdrawals_method_item_babdd"
              :class="{ commissionWithdrawals_method_item_active_babdd: item.method_code == embody_id }"
              @tap.stop="getselectmessageFunc(item)"
              :key="key0"
            >
              <image class="commissionWithdrawals_method_icon_babdd" mode="aspectFit" :src="item.thumb"></image>
              <text class="commissionWithdrawals_method_name_babdd">{{ item.method_name }}</text>
              <image
                class="commissionWithdrawals_method_check_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '448.png'"
                v-if="item.method_code == embody_id"
              ></image>
              <image class="commissionWithdrawals_method_check_babdd" mode="aspectFit" :src="STATIC_URL + '333.png'" v-else></image>
            </view>
          </template>
        </view>

        <view :style="{ height: 'calc(140rpx + var(--benben-window-bottom, 0px))' }"></view>
        <view class="flex flex-wrap align-center justify-center commissionWithdrawals_footer_babdd">
          <button class="commissionWithdrawals_submit_btn_babdd" @tap.stop="queryMessageFunc()">{{ $t('提交') }}</button>
        </view>
      </view>

      <benben-popup v-model="popupShow1673862116532" :mask="true" :mask-close-able="true" mode="center">
        <!---富文本弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center benben-flex-layout">
          <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_fd4_0_babdd">
            <text class="commissionWithdrawals_fd4_0_c0_babdd">{{ dataEssay.name }}</text>

            <scroll-view class="commissionWithdrawals_fd4_0_c1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
              <view class="flex benben-scroll flex align-center">
                <jyf-parser class="commissionWithdrawals_fd4_0_c1_c0_babdd" :html="dataEssay.content | richTextFormat"></jyf-parser>
              </view>
            </scroll-view>
          </view>
          <image
            class="commissionWithdrawals_fd4_1_babdd"
            mode="aspectFit"
            :src="STATIC_URL + '197.png'"
            @tap.stop="popupShow1673862116532 = false"
          ></image>
        </view>

        <!---富文本弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686628262181" :mask="true" :mask-close-able="true" mode="center">
        <!---未绑定微信弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_flex_5_babdd">
          <text class="commissionWithdrawals_fd5_0_babdd">{{ $t('还未绑定微信,是否前往绑定?') }}</text>
          <view class="flex align-center">
            <button class="commissionWithdrawals_fd5_1_c0_babdd" @tap.stop="popupShow1686628262181 = false">{{ $t('取消') }}</button>
            <button class="commissionWithdrawals_fd5_1_c1_babdd" @tap.stop="gowxFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---未绑定微信弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686628821361" :mask="true" :mask-close-able="true" mode="center">
        <!---未绑定支付宝弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_flex_6_babdd">
          <text class="commissionWithdrawals_fd6_0_babdd">{{ $t('还未绑定支付宝,是否前往绑定?') }}</text>
          <view class="flex align-center">
            <button class="commissionWithdrawals_fd6_1_c0_babdd" @tap.stop="popupShow1686628821361 = false">{{ $t('取消') }}</button>
            <button class="commissionWithdrawals_fd6_1_c1_babdd" @tap.stop="goalipayFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---未绑定支付宝弹窗flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1686629150177" :mask="true" :mask-close-able="true" mode="center">
        <!---未绑定银行卡弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center commissionWithdrawals_flex_7_babdd">
          <text class="commissionWithdrawals_fd7_0_babdd">{{ $t('还未绑定银行卡,是否前往绑定?') }}</text>
          <view class="flex align-center">
            <button class="commissionWithdrawals_fd7_1_c0_babdd" @tap.stop="popupShow1686629150177 = false">{{ $t('取消') }}</button>
            <button class="commissionWithdrawals_fd7_1_c1_babdd" @tap.stop="gobankFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---未绑定银行卡弹窗flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      popupShow1686629150177: false,
      popupShow1686628821361: false,
      popupShow1686628262181: false,
      popupShow1673862116532: false,
      popupShow1701842399214: false,
      popupShow1701842027676: false,
      jfMoney: '',
      /** embody_id【选中类型id】 **/
      embody_id: 'wx',
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
      /** cash_fee【输入提现积分数量】 **/
      cash_fee: '',
      dataMessage: [],
      dataType: [],
      is_bind: '',
      method_fee: '',
      method_max: '',
      method_min: '',
      rules: '',
      method_name: '微信',
      pay_password: '',
      /** falg【是否已设置支付密码0 未设置 1 已设置】 **/
      payCodeIsTrue: {
        falg: 0,
      },
      /** falg【是否已设置支付密码0 未设置 1 已设置】 **/
      isSetPayCode: {
        falg: 0,
      },
      xianshi: false,
      order_sn: 'GD20230625191830714165',
      order_type: '3',
    }
  },
  computed: {
    availableScore() {
      const score = Number(this.jfMoney)
      return isNaN(score) ? 0 : score
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
  },
  watch: {},
  onLoad(options) {
    let { order_sn, order_type } = options
    if (order_sn !== undefined) this.order_sn = order_sn
    if (order_type !== undefined) this.order_type = order_type
    this.getWenzhangFunc()
    this.getJfMoneyFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getJfMoneyFunc()
    this.searchAccountFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //获取可提现积分
    async getJfMoneyFunc() {
      let datadataMoney = await this.$api.get(global.apiUrls.post62fc574bc7074, {})
      if (datadataMoney.data.code != 1) {
        this.$message.info(datadataMoney.data.msg)
        return
      }
      let infodataMoney = datadataMoney.data
      this.jfMoney = infodataMoney.data.available != null ? String(infodataMoney.data.available) : '0'
    },
    //点击全部
    allmoneyFunc() {
      if (this.availableScore <= 0) {
        this.$message.info(this.$t('暂无可提现积分'))
        return
      }
      this.cash_fee = String(this.jfMoney)
    },
    //获取支付方式
    async searchAccountFunc() {
      //请求方法
      //数据验证

      let datadataType = await this.$api.get(global.apiUrls.post62fc4f70a9d44, {
        scene: 'commission',
      })

      if (datadataType.data.code != 1) {
        this.$message.info(datadataType.data.msg)
        return
      }
      let infodataType = datadataType.data
      this.dataType = infodataType.data

      if (this.dataType) {
        this.is_bind = this.dataType[0].is_bind
        this.method_fee = this.dataType[0].method_fee
        this.method_max = this.dataType[0].method_max
        this.method_min = this.dataType[0].method_min
        this.rules = this.dataType[0].rules
        this.embody_id = this.dataType[0].method_code
        this.method_name = this.dataType[0].method_name
      }
    },
    //获取选择类型信息
    getselectmessageFunc(item) {
      this.is_bind = item.is_bind
      this.method_fee = item.method_fee
      this.method_max = item.method_max
      this.method_min = item.method_min
      this.rules = item.rules
      this.embody_id = item.method_code
      this.method_name = item.method_name
      if (this.is_bind == 0) {
        if (this.embody_id == 'wx') {
          this.popupShow1686628262181 = true
        }
        if (this.embody_id == 'alipay') {
          this.popupShow1686628821361 = true
        }
        if (this.embody_id == 'bank') {
          this.popupShow1686629150177 = true
        }
      }
    },
    //提现
    queryMessageFunc() {
      const withdrawScore = Number(this.cash_fee)
      if (!validate(this.cash_fee, 'require')) {
        this.$message.info(this.$t('请输入提现积分'))
        return false
      }
      if (isNaN(withdrawScore) || withdrawScore <= 0) {
        this.$message.info(this.$t('请输入正确的提现积分'))
        return false
      }
      if (withdrawScore > this.availableScore) {
        this.cash_fee = ''
        uni.showToast({
          title: this.$t('积分不足，请重新输入'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        return
      }
      if (this.is_bind == 0 && this.embody_id != 'yue') {
        if (this.embody_id == 'wx') {
          this.popupShow1686628262181 = true
        } else if (this.embody_id == 'alipay') {
          this.popupShow1686628821361 = true
        } else if (this.embody_id == 'bank') {
          this.popupShow1686629150177 = true
        }
      } else {
        if (withdrawScore < Number(this.method_min)) {
          uni.showToast({
            title: this.$t('提现积分小于最小提现数量'),
            mask: true,
            icon: 'none',
            duration: 1500,
          })
        } else if (withdrawScore > Number(this.method_max) && this.method_max != 0) {
          uni.showToast({
            title: this.$t('提现积分大于最大提现数量'),
            mask: true,
            icon: 'none',
            duration: 1500,
          })
        } else {
          this.verifyPayCodeFunc()
        }
      }
    },
    //跳转绑定微信
    gowxFunc() {
      this.popupShow1686628262181 = false
      this.$urouter.navigateTo(`/pages/wd/bindWechat/bindWechat`)
    },
    //跳转支付宝
    goalipayFunc() {
      this.popupShow1686628821361 = false
      this.$urouter.navigateTo(`/pages/wd/bindAlipay/bindAlipay`)
    },
    //跳转银行卡
    gobankFunc() {
      this.popupShow1686629150177 = false
      this.$urouter.navigateTo(`/pages/wd/bindBankCard/bindBankCard`)
    },
    //发送提现接口
    async postWithdrawalFunc() {
      if (!validate(this.pay_password, 'require')) {
        this.$message.info(this.$t('请输入支付密码'))
        return false
      }
      if (!(this.pay_password.split('').length == 6)) {
        this.$message.info(global.i18n.t('请输入6位支付密码'))
        return false
      }
      let datapayCodeIsTrue = await this.$api.post(global.apiUrls.post5f64a4d364b44, {
        pay_password: this.pay_password,
      })

      if (datapayCodeIsTrue.data.code != 1) {
        this.$message.info(datapayCodeIsTrue.data.msg)
        this.pay_password = ''
        return
      }
      let infopayCodeIsTrue = datapayCodeIsTrue.data
      this.payCodeIsTrue = infopayCodeIsTrue.data
      //请求方法
      //数据验证

      let data62fc862c84c64 = await this.$api.post(global.apiUrls.post62fc862c84c64, {
        account_type: this.embody_id,
        money: this.cash_fee,
        score: this.cash_fee,
        pay_password: this.pay_password,
      })

      if (data62fc862c84c64.data.code != 1) {
        this.$message.info(data62fc862c84c64.data.msg)
        return
      }

      this.pay_password = ''
      this.popupShow1701842027676 = false
      this.cash_fee = ''
      uni.showToast({
        title: this.$t('提交成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      this.getJfMoneyFunc()
    },
    //系统文章--获取系统单页内容
    async getWenzhangFunc() {
      //请求方法
      //数据验证

      let datadataEssay = await this.$api.get(global.apiUrls.post641568f1b6f87, {
        column_id: '3',
      })

      if (datadataEssay.data.code != 1) {
        this.$message.info(datadataEssay.data.msg)
        return
      }
      let infodataEssay = datadataEssay.data
      this.dataEssay = infodataEssay.data
    },
    //关闭弹窗
    closePopupFunc() {
      this.pay_password = ''
      this.popupShow1701842027676 = false
    },
    // 忘记支付密码
    goForgotPayPwdFunc() {
      this.closePopupFunc()
      this.$urouter.navigateTo('/pages/xtsz/changePayPwd/changePayPwd')
    },
    //校验支付密码
    async verifyPayCodeFunc() {
      //请求方法
      //数据验证

      let dataisSetPayCode = await this.$api.post(global.apiUrls.post5f64a4d364b44, {})

      if (dataisSetPayCode.data.code != 1) {
        this.$message.info(dataisSetPayCode.data.msg)
        return
      }
      let infoisSetPayCode = dataisSetPayCode.data
      this.isSetPayCode = infoisSetPayCode.data

      if (this.isSetPayCode.falg == 0) {
        this.popupShow1701842399214 = true
      } else {
        this.popupShow1701842027676 = true
      }
    },
    //跳转设置支付密码
    gopswdFunc() {
      this.popupShow1701842399214 = false
    },
    // 积分仅允许输入正整数
    onInputFunc(event) {
      let value = String(event || '').replace(/[^\d]/g, '')
      if (value.startsWith('0')) {
        value = value.replace(/^0+/, '')
      }
      this.$nextTick(() => {
        this.cash_fee = value
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: #f8f8f8;
  background-size: 100% auto;

  .commissionWithdrawals_flex_7_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .commissionWithdrawals_fd7_0_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      margin: 91rpx 40rpx 88rpx 40rpx;
      text-align: center;
    }

    .commissionWithdrawals_fd7_1_c0_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: #fff;
      color: rgba(153, 153, 153, 1);
      border-top: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }

    .commissionWithdrawals_fd7_1_c1_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: #fff;
      color: var(--benbenFontColor5);
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }
  }

  .commissionWithdrawals_flex_6_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .commissionWithdrawals_fd6_0_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      margin: 91rpx 40rpx 88rpx 40rpx;
      text-align: center;
    }

    .commissionWithdrawals_fd6_1_c0_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: #fff;
      color: rgba(153, 153, 153, 1);
      border-top: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }

    .commissionWithdrawals_fd6_1_c1_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: #fff;
      color: var(--benbenFontColor5);
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }
  }

  .commissionWithdrawals_flex_5_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .commissionWithdrawals_fd5_0_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      margin: 91rpx 40rpx 88rpx 40rpx;
      text-align: center;
    }

    .commissionWithdrawals_fd5_1_c0_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: #fff;
      color: rgba(153, 153, 153, 1);
      border-top: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }

    .commissionWithdrawals_fd5_1_c1_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbgColor1);
      color: var(--benbenFontColor5);
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      font-weight: 500;
      width: 269rpx;
    }
  }

  .commissionWithdrawals_fd4_0_babdd {
    width: 560rpx;
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    padding: 28rpx 32rpx 45rpx 32rpx;
    margin: 0rpx 0rpx 40rpx 0rpx;

    .commissionWithdrawals_fd4_0_c0_babdd {
      font-size: 36rpx;
      font-weight: 700;
      color: rgba(51, 51, 51, 1);
      margin: 0rpx 0rpx 32rpx 0rpx;
    }

    .commissionWithdrawals_fd4_0_c1_babdd {
      touch-action: none;
      height: 330rpx;
      width: 480rpx;
    }
  }

  .commissionWithdrawals_fd4_1_babdd {
    width: 56rpx;
    height: 56rpx;
    border-radius: 28rpx 28rpx 28rpx 28rpx;
  }

  .commissionWithdrawals_flex_3_babdd {
    padding: 24rpx 24rpx 0;
  }

  .commissionWithdrawals_card_babdd {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 28rpx 24rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
  }

  .commissionWithdrawals_amount_card_babdd {
    margin-bottom: 24rpx;
  }

  .commissionWithdrawals_card_header_babdd {
    margin-bottom: 20rpx;
  }

  .commissionWithdrawals_card_title_babdd {
    font-size: 32rpx;
    font-weight: 600;
    color: #333333;
    line-height: 44rpx;
  }

  .commissionWithdrawals_detail_link_babdd {
    padding: 8rpx 0;

    text {
      font-size: 28rpx;
      color: #b82441;
      line-height: 40rpx;
    }
  }

  .commissionWithdrawals_balance_box_babdd {
    padding: 28rpx 16rpx;
    margin-bottom: 24rpx;
    border-radius: 16rpx;
    background: linear-gradient(135deg, rgba(184, 36, 65, 0.08) 0%, rgba(255, 248, 248, 0.6) 100%);
  }

  .commissionWithdrawals_balance_label_babdd {
    font-size: 24rpx;
    color: #999999;
    line-height: 34rpx;
    margin-bottom: 8rpx;
  }

  .commissionWithdrawals_balance_value_babdd {
    font-size: 64rpx;
    font-weight: 700;
    color: #b82441;
    line-height: 72rpx;
    letter-spacing: -1rpx;
  }

  .commissionWithdrawals_input_box_babdd {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    min-height: 88rpx;
    padding: 12rpx 16rpx 12rpx 20rpx;
    border-radius: 16rpx;
    background: #f7f8fa;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
  }

  .commissionWithdrawals_input_inner_babdd {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  .commissionWithdrawals_input_field_babdd {
    width: 100%;
    font-size: 32rpx;
    font-weight: 600;
    color: #333333;
    height: 64rpx;
    line-height: 64rpx;
  }

  .commissionWithdrawals_all_btn_babdd {
    flex-shrink: 0;
    margin-left: 12rpx;
    padding: 10rpx 24rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: #b82441;
    line-height: 36rpx;
    border-radius: 32rpx;
    background: rgba(184, 36, 65, 0.12);
  }

  .commissionWithdrawals_rules_box_babdd {
    position: relative;
    margin-top: 24rpx;
    padding: 20rpx 56rpx 20rpx 20rpx;
    border-radius: 12rpx;
    background: #f7f8fa;
    box-sizing: border-box;
  }

  .commissionWithdrawals_rules_text_babdd {
    display: block;
    width: 100%;
    font-size: 24rpx;
    line-height: 40rpx;
    color: #999999;
    word-break: break-all;
    white-space: normal;
  }

  .commissionWithdrawals_rules_icon_babdd {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 28rpx;
    line-height: 28rpx;
    color: #cccccc;
  }

  .commissionWithdrawals_method_card_babdd {
    padding-bottom: 8rpx;
  }

  .commissionWithdrawals_method_title_babdd {
    display: block;
    margin-bottom: 8rpx;
  }

  .commissionWithdrawals_method_item_babdd {
    padding: 24rpx 16rpx;
    margin-top: 16rpx;
    border-radius: 16rpx;
    background: #f7f8fa;
    border: 2rpx solid transparent;
    box-sizing: border-box;
  }

  .commissionWithdrawals_method_item_active_babdd {
    background: rgba(184, 36, 65, 0.06);
    border-color: rgba(184, 36, 65, 0.25);
  }

  .commissionWithdrawals_method_icon_babdd {
    width: 56rpx;
    height: 56rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
  }

  .commissionWithdrawals_method_name_babdd {
    flex: 1;
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
  }

  .commissionWithdrawals_method_check_babdd {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
  }

  .commissionWithdrawals_footer_babdd {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: 16rpx 32rpx calc(24rpx + var(--benben-window-bottom, 0px));
    background: linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, rgba(248, 248, 248, 0.96) 24%, #f8f8f8 100%);
  }

  .commissionWithdrawals_submit_btn_babdd {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #ffffff;
    background: var(--benbenbtnColor0);
    box-shadow: 0 8rpx 20rpx rgba(184, 36, 65, 0.28);
  }

  .commissionWithdrawals_fd2_0_babdd {
    width: 540rpx;
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .commissionWithdrawals_fd2_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: #333333;
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .commissionWithdrawals_fd2_0_c1_babdd {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .commissionWithdrawals_fd2_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .commissionWithdrawals_fd2_0_c2_c0_babdd {
        font-size: 32rpx;
        background: #fff;
        color: rgba(153, 153, 153, 1);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
        border-right: 1px solid #eee;
      }

      .commissionWithdrawals_fd2_0_c2_c1_babdd {
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

  .commissionWithdrawals_fd1_0_babdd {
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #fff;
    background-size: 100% auto !important;
    padding: 40rpx 0rpx 0rpx 0rpx;

    .commissionWithdrawals_fd1_0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin: 0rpx 0rpx 32rpx 0rpx;
    }

    .commissionWithdrawals_flex_password_active_fd1_0_c1_babdd {
      width: 68rpx;
      height: 68rpx;
      border: 1px solid #409eff;
    }

    .commissionWithdrawals_flex_password_noActive_fd1_0_c1_babdd {
      width: 68rpx;
      height: 68rpx;
      border: 1px solid #ccc;
    }

    .commissionWithdrawals_fd1_0_forgot_babdd {
      margin: 0rpx 0rpx 24rpx 0rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
    }

    .commissionWithdrawals_fd1_0_c2_babdd {
      border-top: 1px solid #eee;

      .commissionWithdrawals_fd1_0_c2_c0_babdd {
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: #fff;
        color: var(--benbenFontColor2);
        line-height: 94rpx;
        width: 269rpx;
        font-weight: 400;
        border-right: 1px solid #eee;
      }

      .commissionWithdrawals_fd1_0_c2_c1_babdd {
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

  .commissionWithdrawals_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #ffffff;
    background-size: 100% auto !important;
    border-bottom: 1px solid rgba(238, 238, 238, 0.9);
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

    .commissionWithdrawals_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .commissionWithdrawals_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
      }
    }
  }

  .commissionWithdrawals_fd0_0_c0_babdd {
    width: 120rpx;

    .commissionWithdrawals_fd0_0_c0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .commissionWithdrawals_fd0_0_c2_c0_c0_babdd {
    font-size: 28rpx;
    font-weight: 500;
    color: #b82441;
  }
}

::v-deep .commissionWithdrawals_fd4_0_c1_c0_babdd {
  width: 480rpx;
}

::v-deep .commissionWithdrawals_fd1_0_c1_babdd {
  margin: 32rpx 0rpx 32rpx 0rpx;
}

::v-deep .commissionWithdrawals_input_field_babdd {
  width: 100% !important;
  height: 64rpx !important;
  min-height: 64rpx !important;
  line-height: 64rpx !important;
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  box-sizing: border-box !important;
}

::v-deep .commissionWithdrawals_input_field_babdd input,
::v-deep .commissionWithdrawals_input_field_babdd .uni-input-input {
  height: 64rpx !important;
  min-height: 64rpx !important;
  line-height: 64rpx !important;
  font-size: 32rpx !important;
  font-weight: 600 !important;
  color: #333333 !important;
}
</style>
