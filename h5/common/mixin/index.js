import Vue from 'vue'
import { Router } from '@/common/utils/index.js'
import { needLoginPages, STATIC_URL, HOME_PAGE_URL, LOGIN_PAGE_URL, ACCEPT_PLATFORM } from '@/common/config.js'
import { benbenImageSrcResolution, syncUniApi, isEmpty } from '@/common/utils/utils.js'
const router = new Router({ needLoginPages })

Vue.mixin({
  data() {
    return { STATIC_URL: STATIC_URL }
  },
  computed: {
    i18n() {
      return this.$t('defVal')
    },
  },
  methods: {
    benbenImageSrcResolution,
    //修改uniapi为promise类型
    syncUniApi,
    // #ifdef APP-PLUS
    toJSON() { },
    // #endif
    // 动态跳转
    dynamicJump(url) {
      if (!url) return
      // 判断路径是否为网络路径
      if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
        uni.navigateTo({ url: `/pages/benben-built-in/web-view/web-view?webPath=${encodeURIComponent(url)}` })
      } else {
        router.navigateTo(url)
      }
    },
    //客服
    async getKefuFunc() {
      let datadatakefu = await this.$api.get(global.apiUrls.post64897f6fd5486, {
        store_id: 0,
      })

      if (datadatakefu.data.code != 1) {
        this.$message.info(datadatakefu.data.msg)
        return
      }
      let infodatakefu = datadatakefu.data
      let datakefu = infodatakefu.data
      uni.navigateTo({
        url: `/pages/benben-built-in/web-view/kefu-web-view?webPath=${encodeURIComponent(datakefu.chat_url)}`,
      })
      return
      this.dynamicJump(this.datakefu.chat_url)
    },
    // 获取三方授权信息
    getThreePartyInfo(type) {
      let typeObj = {
        weixin: { name: '微信', pname: 'com.tencent.mm', action: 'weixin://' },
        qq: { name: 'qq', pname: 'com.tencent.mobileqq', action: 'mqq://' },
        sinaweibo: { name: '微博', pname: 'com.sina.weibo', action: 'sinaweibo://' },
        google: { name: 'google', pname: 'com.google.android.apps.plus', action: 'google://' },
        apple: { name: '苹果', pname: 'com.apple.authentication', action: 'apple://' },
        facebook: { name: 'facebook', pname: 'com.facebook.katana', action: 'facebook://' },
      }
      // #ifndef APP-PLUS
      this.$message.info(this.$t('功能暂未开放'))
      return Promise.reject()
      // #endif
      if (!Object.keys(typeObj).includes(type)) {
        this.$message.info(this.$t('功能暂未开放'))
        return Promise.reject()
      }
      return new Promise((resolve, reject) => {
        // 判断用户是否安装对应app调起失败时提醒用户
        if (
          !plus.runtime.isApplicationExist({
            pname: typeObj[type].pname,
            action: typeObj[type].action,
          })
        ) {
          this.$message.info(`${this.$t('请安装')}${typeObj[type].name}${this.$t('后再使用此功能')}`)
          reject()
          return
        }
        uni.getProvider({
          service: 'oauth',
          success: function (res) {
            // 如果支持微信等，就执行 wx_login_fn 方法
            if (!res.provider.includes(type)) {
              reject()
              return
            }
            uni.login({
              provider: type,
              success: ({ authResult: { access_token } }) => {
                uni.getUserInfo({
                  provider: type,
                  success: ({ userInfo }) => {
                    resolve({ JsonData: JSON.stringify({ ...userInfo, access_token }), ...userInfo, access_token })
                  },
                })
              },
              fail: function (err) {
                reject(res)
              },
              complete(res) {
                reject(res)
              },
            })
          },
          fail: function (err) {
            // api错误是打印错误
            console.log(err)
            reject(err)
          },
        })
      })
    },
    // 画布生成图片
    painterGenerateImages(refName, showName) {
      return new Promise(async (resolve, reject) => {
        if (this[showName]) {
          Promise.resolve('')
          return
        }
        this[showName] = true
        uni.showLoading({
          mask: true,
        })
        setTimeout(() => {
          this.$refs[refName].canvasToTempFilePathSync({
            fileType: 'jpg',
            // 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
            pathType: 'url',
            quality: 1,
            success: (res) => {
              uni.hideLoading()
              resolve(res.tempFilePath)
              this[showName] = false
            },
            fail(e) {
              this[showName] = false
              uni.hideLoading()
              reject(e)
            },
          })
        }, 300)
      })
    },
    // 页面抛出事件
    benbenThrowPageEvent(event, data) {
      uni.$emit(event, data)
    },

    // 跳转首页
    toHomeDiy() {
      router.switchTab(HOME_PAGE_URL[global.appTabBarType])
    },
    // 跳转登录页
    toLoginDiy() {
      router.navigateTo(LOGIN_PAGE_URL)
    },
    //微信支付
    requestPaymentWx(data) {
      return new Promise((resolve, reject) => {
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
              resolve()
            }
          },
          fail: (e) => {
            // #ifdef APP-PLUS
            let failMsg = 'requestPayment:fail canceled'
            // #endif
            // #ifndef APP-PLUS
            let failMsg = 'requestPayment:fail cancel'
            // #endif
            if (e.errMsg == failMsg) {
              this.$message.info(this.$t('取消支付'))
            } else {
              this.$message.info(this.$t('支付失败,请稍后重试'))
            }
            reject(e)
          },
          complete: () => { },
        })
      })
    },
    // 支付宝支付
    requestPaymentAli(data) {
      return new Promise((resolve, reject) => {
        uni.requestPayment({
          provider: 'alipay',
          orderInfo: data,
          success: (e) => {
            if (e.errMsg == 'requestPayment:ok') {
              resolve()
            }
          },
          fail: (e) => {
            if (e.errMsg == 'requestPayment:fail canceled') {
              this.$message.info(this.$t('取消支付'))
            } else {
              this.$message.info(this.$t('支付失败,请稍后重试'))
            }
            reject(e)
          },
          complete: () => { },
        })
      })
    },
    // 设置自定义头部
    setNavigationBarTitle(title) {
      uni.setNavigationBarTitle({
        title: title,
      })
    },
    // 点击复制
    copyText(data) {
      uni.setClipboardData({
        data: data,
        success: () => {
          this.$message.success(this.$t('复制成功'))
        },
      })
    },
    // 点击打电话
    callMobile(phoneNumber) {
      if (ACCEPT_PLATFORM === 'Android') {
        var Intent = plus.android.importClass('android.content.Intent')
        var Uri = plus.android.importClass('android.net.Uri')
        var main = plus.android.runtimeMainActivity()
        var intent = new Intent(Intent.ACTION_DIAL)
        intent.setData(Uri.parse('tel:' + phoneNumber))
        main.startActivity(intent)
      } else {
        uni.makePhoneCall({
          phoneNumber: phoneNumber,
        })
      }
    },
    isEmpty(value) {
      return isEmpty(value)
    },
    // 判断是否多值是否成立
    in_array(type, str) {
      let arr = []
      // str 是否为字符串
      if (typeof str === 'string') arr = str.split(',')
      // str 是否为数组
      if (typeof str === 'object') arr = str
      let index = -1
      index = arr.findIndex((item) => type == item)
      if (index == -1) {
        return false
      }
      return true
    },
    // 页面跳转
    handleJump(e) {
      let target = e.currentTarget || e.target,
        url = target.dataset.url || 'back',
        type = target.dataset.type
      if (url == '' || url == '#') return
      switch (type) {
        case 'SWITCH':
          router.switchTab(url)
          break
        case 'REDIRECT':
          router.redirectTo(url)
          break
        case 'RELAUNCH':
          router.reLaunch(url)
          break
        case 'BACK':
          router.navigateBack()
          break
        default:
          router.navigateTo(url)
          break
      }
    },
    // Diy页面跳转
    handleJumpDiy(e) {
      let target = e.currentTarget || e.target,
        url = target.dataset.url || 'back',
        type = target.dataset.type
      if (url == '' || url == '#') return
      switch (type) {
        case 'switchTab':
          router.switchTab(url)
          break
        case 'redirectTo':
          router.redirectTo(url)
          break
        case 'reLaunch':
          router.reLaunch(url)
          break
        case 'navigateTo':
          router.navigateTo(url)
          break
        case 'back':
          router.navigateBack(+url)
          break
        default:
          router.navigateTo(url)
          break
      }
    },
    mixinToPlayVideo(src) {
      let parm = encodeURIComponent(src)
      router.navigateTo(`/pages/benben-built-in/playVideo/playVideo?src=${parm}`)
    },
    singleImagePreview(url) {
      uni.previewImage({
        current: url,
        urls: [url],
      })
    },
    multiImagePreview(url, images, field) {
      let arr = []
      if (field) {
        images.map((item) => {
          arr.push(item[field])
        })
      } else {
        arr = images
      }
      uni.previewImage({
        current: url,
        urls: arr,
        indicator:"number"
      })
    },
  },
})
