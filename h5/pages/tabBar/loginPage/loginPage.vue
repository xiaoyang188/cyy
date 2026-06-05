<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex loginPage_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center loginPage_fd0_0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <text class="fu-iconfont2 loginPage_fd0_0_c0_babdd">&#xe794;</text>
        </view>
        <view class="flex flex-wrap align-center loginPage_fd0_0_babdd"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---登录头部flex布局开始-->
      <view class="flex flex-direction flex-wrap align-center benben-flex-layout">
        <view class="flex flex-wrap align-center justify-center loginPage_fd1_0_babdd">
          <image class="loginPage_fd1_0_c0_babdd" mode="aspectFit" :src="logoInfo.app_logo"></image>
        </view>
      </view>

      <!---登录头部flex布局结束-->
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout loginPage_flex_2_babdd">
        <view class="flex flex-wrap align-center loginPage_fd2_0_babdd">
          <text class="fu-iconfont2 loginPage_fd2_0_c0_babdd">&#xe72b;</text>
          <benben-input
            class="flex-sub loginPage_fd2_0_c1_babdd"
            type="number"
            :placeholder="$t('请输入手机号')"
            confirm-type="done"
            :maxlength="11"
            placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"
            v-model="account"
          />
        </view>
        <view class="flex flex-wrap align-center loginPage_fd2_1_babdd">
          <text class="fu-iconfont2 loginPage_fd2_0_c0_babdd">&#xe730;</text>
          <benben-flex-password-diy
            v-model="password"
            class-text="flex flex align-center loginPage_fd2_1_c1_babdd"
            :placeholder="$t('请输入密码(6~12位字母+数字)')"
            :maxlength="12"
            :default-type="true"
            placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"
          >
            <template #show>
              <text class="fu-iconfont2 loginPage_fd2_1_c1_icon1_babdd" data-type="show">&#xE837;</text>
            </template>
            <template #hide>
              <text class="fu-iconfont2 loginPage_fd2_1_c1_icon2_babdd" data-type="hide">&#xEBCC;</text>
            </template>
          </benben-flex-password-diy>
        </view>
        <view class="flex flex-direction-row-reverse flex-wrap align-center loginPage_fd2_2_babdd">
          <text
            class="loginPage_fd2_2_c0_babdd"
            @tap.stop="handleJumpDiy"
            data-type="redirectTo"
            :data-url="`/pages/dlzc/verificationCodeLogin/verificationCodeLogin`"
          >
            {{ $t('验证码登录') }}
          </text>
        </view>
        <button class="loginPage_fd2_3_babdd" @tap.stop="onlogonFunc()">{{ $t('登录') }}</button>
        <view class="flex flex-wrap align-center justify-center loginPage_fd2_4_babdd">
          <text class="loginPage_fd2_4_c0_babdd" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/registerPage/registerPage`">
            {{ $t('注册账号') }}
          </text>

          <view class="flex loginPage_fd2_4_c1_babdd"></view>

          <text
            class="loginPage_fd2_4_c0_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/dlzc/forgotPasswordPage/forgotPasswordPage`"
          >
            {{ $t('忘记密码') }}
          </text>
        </view>
        <view class="flex flex-wrap align-center justify-center loginPage_fd2_5_babdd">
          <benben-flex-switch-new class-text="flex flex" v-model="id_tk" :disabled="false">
            <template v-slot:checked>
              <view class="flex flex position-relative align-center">
                <text class="fu-iconfont2 loginPage_checkfd2_5_c0_c0_c0_babdd">&#xe847;</text>
              </view>
            </template>
            <template v-slot:unchecked>
              <view class="flex flex position-relative justify-end align-center">
                <text class="fu-iconfont2 loginPage_noCheckfd2_5_c0_c1_c0_babdd">&#xe755;</text>
              </view>
            </template>
          </benben-flex-switch-new>
          <text class="loginPage_fd2_5_c1_babdd">{{ $t('已阅读并同意') }}</text>
          <text class="loginPage_fd2_5_c2_babdd" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/agreements/agreements`">
            {{ $t('《用户注册协议》') }}
          </text>
          <text class="loginPage_fd2_5_c3_babdd">{{ $t('与') }}</text>
          <text
            class="loginPage_fd2_5_c2_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`"
          >
            {{ $t('《隐私政策》') }}
          </text>
        </view>
      </view>

      <!---flex布局flex布局结束-->
      <!---微信快捷登录flex布局开始-->
      <view class="flex flex-direction flex-wrap align-center benben-flex-layout">
        <view class="flex flex-wrap align-center justify-center loginPage_fd3_0_babdd">
          <view class="flex loginPage_fd3_0_c0_babdd"></view>

          <text class="loginPage_fd3_0_c1_babdd">{{ $t('快捷登录') }}</text>

          <view class="flex loginPage_fd3_0_c2_babdd"></view>
        </view>
        <view class="flex flex-wrap align-center justify-center loginPage_fd3_1_babdd" @tap.stop="wxLoginFunc()">
          <image class="loginPage_fd3_1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '1638.png'"></image>
        </view>
      </view>

      <!---微信快捷登录flex布局结束-->
      <benben-popup v-model="popupShow1750665793134" :mask="true" :mask-close-able="false" mode="center" :z-index="999">
        <!---是否取消注销flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center loginPage_fd4_0_babdd">
            <text class="loginPage_fd4_0_c0_babdd">{{ $t('温馨提示') }}</text>
            <text class="loginPage_fd4_0_c1_babdd">{{ $t('您已申请注销，是否取消申请？确认后可正常登录，取消将无法登录。') }}</text>
            <view class="flex align-center loginPage_fd4_0_c2_babdd">
              <button class="loginPage_fd4_0_c2_c0_babdd" @tap.stop="noCancelOutFunc()">{{ $t('取消') }}</button>
              <button class="loginPage_fd4_0_c2_c1_babdd" @tap.stop="cancelOutFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>

        <!---是否取消注销flex布局结束-->
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
      popupShow1750665793134: false,
      /** logoInfo【lago信息】
       *   wechat_share_title【微信分享标题】
       *   wechat_share_img【微信分享默认图片】
       *   app_logo【applogo】
       *   web_site_title【应用名称】
       *   shop_app_icp【商家端备案信息】
       *   license【证照信息】
       *   app_icp【app备案信息】
       *   web_site_copyright【版权信息】
       *   web_site_email【公司邮箱】
       *   web_site_bgimg【联系我们背景图】
       *   web_site_address【公司地址】
       *   time【工作时间】
       *   tel【客服电话】 **/
      logoInfo: {
        tel: '',
        time: '',
        web_site_address: '',
        web_site_bgimg: '',
        web_site_email: '',
        web_site_copyright: '',
        app_icp: '',
        license: '',
        shop_app_icp: '',
        web_site_title: '',
        app_logo: '',
        wechat_share_img: 0,
        wechat_share_title: '',
      },
      /** userinfo【用户信息】
       *   phone【手机号，不带*号】
       *   client_id【推送标识】
       *   birthday【生日】
       *   mobile【手机号，带*号】
       *   gender【性别】
       *   email【邮箱】
       *   nickname【昵称】
       *   real_name【真实姓名】
       *   avatar【头像】
       *   id【用户ID】
       *   user_token【用户标识】 **/
      useless: {
        userinfo: {
          user_token: '',
          id: 0,
          avatar: '',
          real_name: '',
          nickname: '',
          email: '',
          gender: '',
          mobile: '',
          birthday: '',
          client_id: '',
          phone: '',
        },
      },
      id_tk: false,
      /** userinfo【用户信息】
       *   is_cancel【是否弹窗提醒注销信息】
       *   phone【手机号，不带*号】
       *   client_id【推送标识】
       *   birthday【生日】
       *   mobile【手机号，带*号】
       *   gender【性别】
       *   email【邮箱】
       *   nickname【昵称】
       *   real_name【真实姓名】
       *   avatar【头像】
       *   id【用户ID】
       *   user_token【用户标识】 **/
      dataList: {
        userinfo: {
          user_token: '',
          id: 0,
          avatar: '',
          real_name: '',
          nickname: '',
          email: '',
          gender: '',
          mobile: '',
          birthday: '',
          client_id: '',
          phone: '',
          is_cancel: 0,
        },
      },
      password: '',
      account: '',
      /** develop_mode【1上架中 0正常】 **/ dataBack: {
        develop_mode: '',
      },
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    this.getkn683a8da8334dFunc()
    this.getvi4cdb895b79baFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //系统配置-联系我们
    async getvi4cdb895b79baFunc() {
      //请求方法
      //数据验证

      let datalogoInfo = await this.$api.get(global.apiUrls.post64cdb895b79ba, {})

      if (datalogoInfo.data.code != 1) {
        this.$message.info(datalogoInfo.data.msg)
        return
      }
      let infologoInfo = datalogoInfo.data
      this.logoInfo = infologoInfo.data
    },
    //不取消
    noCancelOutFunc() {
      this.$store.commit('logout')
      this.popupShow1750665793134 = false
    },
    //取消注销
    async cancelOutFunc() {
      //请求方法
      //数据验证

      let data661a5adf8203b = await this.$api.post(global.apiUrls.post661a5adf8203b, {
        user_id: this.dataList.userinfo.id,
      })

      if (data661a5adf8203b.data.code != 1) {
        this.$message.info(data661a5adf8203b.data.msg)
        return
      }
      let info661a5adf8203b = data661a5adf8203b.data

      this.popupShow1750665793134 = false
      this.$store.commit('saveToken', this.dataList.userinfo.user_token)
      this.$store.commit('updateUserInfo', this.dataList.userinfo)
      uni.showToast({
        title: this.$t('登录成功'),
        mask: true,
        icon: 'none',
        duration: 1500,
      })
      setTimeout(() => {
        this.$urouter.switchTab(`/pages/tabBar/home/home`)
      }, 500)
    },
    //微信授权登录
    wxLoginFunc() {
      if (!this.id_tk) {
        this.$message.info(global.i18n.t('请勾选协议'))
        return false
      }
      let _this = this
      // #ifdef APP-PLUS
      if (
        plus.runtime.isApplicationExist({
          pname: 'com.tencent.mm',
          action: 'weixin://',
        })
      ) {
        uni.getProvider({
          service: 'oauth',
          success: function (res) {
            console.log(res, ~res.provider.indexOf('weixin'))
            // 如果支持微信等，就执行 wx_login_fnFunc 方法
            if (~res.provider.indexOf('weixin')) {
              _this.wx_login_fnFunc('weixin')
            }
          },
          fail: function (err) {
            // api错误是打印错误
            console.log(err)
          },
        })
      } else {
        // 调起失败时提醒用户
        this.$message.info(global.i18n.t('请安装微信后再使用此功能'))
      }
      // #endif
    },
    //wx_login_fn方法
    wx_login_fnFunc(type) {
      console.log(type)
      let _this = this
      let code = ''
      uni.login({
        provider: type,
        success: (loginRes) => {
          console.log('uni.login success-----', loginRes)
          // code = red.code
          uni.getUserInfo({
            provider: type,
            success: (infoRes) => {
              console.log('uni.getUserInfo success-----', infoRes)
              uni.showLoading({
                title: '加载中...',
              })
              console.log('getUserInfo===', infoRes)
              let { nickName, avatarUrl, gender, unionId, openId } = infoRes.userInfo
              console.log(
                JSON.stringify({
                  openid: openId,
                  unionid: unionId,
                }),
              )
              _this.$api
                .post(global.apiUrls.post5d7660a421e69, {
                  extend_info: JSON.stringify({
                    openid: openId,
                    unionid: unionId,
                  }),
                  third_type: 'wx_app',
                })
                .then((res) => {
                  console.log('授权返回信息===', res)
                  res = res.data
                  uni.hideLoading()
                  if (res.code == 1) {
                    if (res.data.result) {
                      //// 如果后台返回来的是 result 字段,表示此账号还没有绑定过手机号 跳转到绑定手机号页面
                      let info = {
                        unionid: unionId,
                        openid: openId,
                        gender: 0,
                        nickname: nickName,
                        avatar: avatarUrl,
                        code: code,
                      }
                      uni.setStorageSync('Wxinfo_tmp', JSON.stringify(info))
                      _this.$urouter.navigateTo('/pages/dlzc/phoneNumber/phoneNumber')
                    } else if (res.data.userinfo) {
                      // 如果后台返回的是 userinfo 字段,表示已经登录成功,把用户信息存到 store 中,
                      _this.dataList = res.data
                      if (res.data.userinfo.is_cancel == 0) {
                        _this.$message.info(res.msg)
                        _this.$store.commit('updateUserInfo', res.data.userinfo)
                        _this.$store.commit('saveToken', res.data.userinfo.user_token)
                        setTimeout(() => {
                          this.$urouter.switchTab(`/pages/tabBar/home/home`)
                        }, 800)
                      } else {
                        _this.getUserInfoMessageFunc()
                      }
                    }
                  } else if (res.code == -999) {
                    // // 服务器解析参数错误
                    uni.hideLoading()
                    this.$message.info(res.msg)
                  } else if (res.code == -1) {
                    _this.$message.info(res.msg)
                    return
                  }
                })
                .catch((err) => {
                  uni.hideLoading()
                  console.log(err)
                })
            },
          })
        },
        fail: function (err) {
          uni.hideLoading()
          console.log(err)
        },
        complete(res) {
          console.log(res)
        },
      })
    },
    //登录
    async onlogonFunc() {
      if (!validate(this.account, 'require')) {
        this.$message.info(this.$t('请输入手机号'))
        return false
      }
      if (!validate(this.account, 'phone')) {
        this.$message.info(this.$t('请输入正确的手机号'))
        return false
      }
      if (!validate(this.password, 'require')) {
        this.$message.info(this.$t('请输入密码'))
        return false
      }
      if (!validate(this.password, 'password')) {
        this.$message.info(this.$t('请输入正确的密码'))
        return false
      }
      if (this.id_tk === false) {
        this.$message.info(this.$t('请勾选协议'))
        return false
      }
      //请求方法
      //数据验证

      let datadataList = await this.$api.post(global.apiUrls.post5c78dbfd977cf, {
        account: this.account,
        account_type: 'mobile',
        password: this.password,
      })

      if (datadataList.data.code != 1) {
        this.$message.info(datadataList.data.msg)
        return
      }
      let infodataList = datadataList.data
      this.dataList = infodataList.data

      if (this.dataList.userinfo.is_cancel == 0) {
        this.$store.commit('saveToken', this.dataList.userinfo.user_token)
        this.$store.commit('updateUserInfo', this.dataList.userinfo)
        this.$store.dispatch('getCartList')
        uni.showToast({
          title: this.$t('登录成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          this.$urouter.switchTab(`/pages/tabBar/home/home`)
        }, 500)
      } else {
        this.popupShow1750665793134 = true
      }
    },
    //系统配置-是否上架
    async getkn683a8da8334dFunc() {
      //请求方法
      //数据验证

      let datadataBack = await this.$api.get(global.apiUrls.post6683a8da8334d, {})

      if (datadataBack.data.code != 1) {
        this.$message.info(datadataBack.data.msg)
        return
      }
      let infodataBack = datadataBack.data
      this.dataBack = infodataBack.data
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: url(#{image-path('1.png')
  }) no-repeat;
  background-size: 100% auto;

  .loginPage_fd4_0_babdd {
    width: 540rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .loginPage_fd4_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .loginPage_fd4_0_c1_babdd {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .loginPage_fd4_0_c2_babdd {
      border-top: 1px solid var(--benbenbdColor0);
      margin: 51rpx 0rpx 0rpx 0rpx;

      .loginPage_fd4_0_c2_c0_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor1);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid var(--benbenbdColor0);
      }

      .loginPage_fd4_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor5);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
      }
    }
  }

  .loginPage_fd3_0_babdd {
    margin: 120rpx 0rpx 0rpx 0rpx;

    .loginPage_fd3_0_c0_babdd {
      width: 156rpx;
      height: 1rpx;
      background: var(--benbenbgColor2);
      margin: 10rpx 0rpx 10rpx 0rpx;
      transform: scaleY(0.5);
      border-radius: 1rpx 1rpx 1rpx 1rpx;
    }

    .loginPage_fd3_0_c1_babdd {
      color: var(--benbenFontColor2);
      font-size: 26rpx;
      font-weight: 400;
      line-height: 37rpx;
      margin: 0rpx 7rpx 0rpx 7rpx;
    }

    .loginPage_fd3_0_c2_babdd {
      width: 156rpx;
      height: 1rpx;
      background: var(--benbenbgColor2);
      margin: 10rpx 0rpx 10rpx 0rpx;
      transform: scaleY(0.5);
      border-radius: 1rpx;
    }
  }

  .loginPage_fd3_1_babdd {
    margin: 40rpx 0rpx 0rpx 0rpx;

    .loginPage_fd3_1_c0_babdd {
      width: 80rpx;
      height: 80rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }
  }

  .loginPage_flex_2_babdd {
    padding: 0rpx 56rpx 0rpx 56rpx;

    .loginPage_fd2_0_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      background: var(--benbenbgColor2);
      box-shadow: 0rpx 3rpx 6rpx 1rpx #fff2f4;
      padding: 0rpx 32rpx 0rpx 32rpx;
      margin: 142rpx 0rpx 32rpx 0rpx;

      .loginPage_fd2_0_c1_babdd {
        color: var(--benbenFontColor0);
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        margin: 0rpx 0rpx 0rpx 32rpx;
        height: 88rpx;
      }
    }

    .loginPage_fd2_1_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      background: var(--benbenbgColor2);
      box-shadow: 0rpx 3rpx 6rpx 1rpx #fff2f4;
      padding: 0rpx 32rpx 0rpx 32rpx;

      .loginPage_fd2_1_c1_icon1_babdd {
        width: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 40rpx;
        color: var(--benbeniconColor2);
      }

      .loginPage_fd2_1_c1_icon2_babdd {
        width: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 40rpx;
      }
    }

    .loginPage_fd2_2_babdd {
      margin: 32rpx 0rpx 0rpx 0rpx;

      .loginPage_fd2_2_c0_babdd {
        color: var(--benbenFontColor4);
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
      }
    }

    .loginPage_fd2_3_babdd {
      border-radius: 50rpx 50rpx 50rpx 50rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 638rpx;
      height: 88rpx;
      line-height: 88rpx;
      margin: 46rpx 0rpx 0rpx 0rpx;
    }

    .loginPage_fd2_4_babdd {
      margin: 34rpx 0rpx 0rpx 0rpx;

      .loginPage_fd2_4_c1_babdd {
        width: 1rpx;
        height: 20rpx;
        background: var(--benbenbgColor2);
        margin: 0rpx 20rpx 0rpx 20rpx;
        transform: scaleX(0.5);
      }
    }

    .loginPage_fd2_5_babdd {
      position: fixed;
      bottom: calc(48rpx + var(--benben-window-bottom, 0px));
      left: 0rpx;
      width: 750rpx;

      .loginPage_checkfd2_5_c0_c0_c0_babdd {
        color: var(--benbeniconColor0);
        font-size: 32rpx;
      }

      .loginPage_noCheckfd2_5_c0_c1_c0_babdd {
        color: var(--benbeniconColor3);
        font-size: 32rpx;
      }

      .loginPage_fd2_5_c1_babdd {
        color: var(--benbenFontColor2);
        font-size: 28rpx;
        font-weight: 400;
        line-height: 33rpx;
        margin: 0rpx 0rpx 0rpx 16rpx;
      }

      .loginPage_fd2_5_c3_babdd {
        color: var(--benbenFontColor2);
        font-size: 28rpx;
        font-weight: 400;
        line-height: 33rpx;
      }
    }
  }

  .loginPage_fd2_0_c0_babdd {
    color: var(--benbeniconColor2);
    font-size: 32rpx;
  }

  .loginPage_fd2_4_c0_babdd {
    color: var(--benbenFontColor2);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
  }

  .loginPage_fd2_5_c2_babdd {
    color: var(--benbenFontColor4);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 33rpx;
  }

  .loginPage_fd1_0_babdd {
    margin: 120rpx 0rpx 0rpx 0rpx;

    .loginPage_fd1_0_c0_babdd {
      width: 148rpx;
      height: 148rpx;
      border-radius: 44rpx;
    }
  }

  .loginPage_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
  }

  .loginPage_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;

    .loginPage_fd0_0_c0_babdd {
      font-size: 36rpx;
      color: var(--benbeniconColor1);
      font-weight: 500;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }
}

::v-deep .loginPage_fd2_1_c1_babdd {
  height: 88rpx;
  width: 502rpx;
  font-size: 28rpx;
  margin: 0rpx 0rpx 0rpx 32rpx;
  line-height: 40rpx;
  font-weight: 400;
  color: var(--benbenFontColor0);
}
</style>
