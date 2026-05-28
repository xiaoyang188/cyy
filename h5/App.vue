<script>
// #ifdef APP-PLUS
import { permissionListener } from '@/common/utils/permissionTips.js'
// #endif
// #ifdef MP-WEIXIN
import getFontFamily from '@/font/fontFamily.js'
// #endif
import appMixin from './appMixin.js'
// #ifdef H5
import { applyAppWebviewTokenFromUrl, fetchAndCacheUserInfo } from '@/common/utils/appWebviewAuth.js'
// #endif
export default {
  mixins: [appMixin],
  onLaunch: function () {
    // #ifdef MP-WEIXIN
    // 检查小程序更新
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate() // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              }
            },
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，请您删除当前小程序，重新搜索打开！',
          })
        })
      }
    })
    getFontFamily()
    // #endif
    // #ifdef H5
    // App web-view 通过 ?user_token= 传入登录态，须先于 initApp 写入缓存
    const hadUrlToken = applyAppWebviewTokenFromUrl(this.$store)
    // #endif
    this.$store.commit('initApp')
    // #ifdef H5
    if (this.$store.state.token) {
      fetchAndCacheUserInfo(this.$store, { force: hadUrlToken })
    }
    // #endif
    // #ifdef APP-PLUS
    //权限提示监听
    permissionListener()
    //网络状态监听
    uni.getNetworkType({
      success: (res) => {
        // updateNetworkStatus
        this.$store.commit('updateNetworkType', res.networkType)
      },
    })
    uni.onNetworkStatusChange((res) => {
      this.$store.commit('updateNetworkType', res.networkType)
    })
    // 锁定屏幕显示方向为竖屏正方向
    plus.screen.lockOrientation('portrait-primary')
    // 推送服务
    uni.onPushMessage(({ type, message }) => {
      //点击
      if (type == 'click') {
        this.pushCallback && this.pushCallback(message)
      }
      //接收透传消息
      if (type == 'receive') {
        this.pushReceiveCallback && this.pushReceiveCallback(message)
      }
    })
    // #endif
  },
  onShow: function () {
    console.log('APP Show')
    document.addEventListener('UniAppJSBridgeReady', () => {
      console.log('✅ UniApp 环境已就绪，uni 对象可以用了！')
      this.isUniReady = true
    })
    // #ifdef APP-PLUS
    // 获取参数
    const args = plus.runtime.arguments
    if (args) {
      plus.runtime.arguments = null
      plus.runtime.arguments = ''
      let params_str = args.split('?')[1]
      if (params_str) {
        let params = params_str.split('&').reduce(function (total, item) {
          let arr = item.split('=')
          total[arr[0]] = arr[1]
          return total
        }, {})
        // 判断appMixin中是否定义有showCallback回调函数
        this.showCallback && this.showCallback(params)
      }
    }
    // #endif
  },
  onHide: function () {
    // 用户退出app时，把二次验证状态改为true
    console.log('APP Hide')
  },
  methods: {
    // #ifdef APP-PLUS
    // 权限检查
    checkPermissions() {
      if (plus.os.name == 'Android') {
        // 判断是Android
        var main = plus.android.runtimeMainActivity()
        var pkName = main.getPackageName()
        var uid = main.getApplicationInfo().plusGetAttribute('uid')
        var NotificationManagerCompat = plus.android.importClass('android.support.v4.app.NotificationManagerCompat')
        var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled()
        // 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
        if (!areNotificationsEnabled) {
          uni.showModal({
            title: this.$t('通知权限开启提醒'),
            content: this.$t('您还没有开启通知权限，无法接受到消息通知，是否前往设置？'),
            success: function (res) {
              if (res.confirm) {
                var Intent = plus.android.importClass('android.content.Intent')
                var Build = plus.android.importClass('android.os.Build')
                //android 8.0引导
                if (Build.VERSION.SDK_INT >= 26) {
                  var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
                  intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
                } else if (Build.VERSION.SDK_INT >= 21) {
                  //android 5.0-7.0
                  var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
                  intent.putExtra('app_package', pkName)
                  intent.putExtra('app_uid', uid)
                } else {
                  //(<21)其他--跳转到该应用管理的详情页
                  intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                  var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
                  intent.setData(uri)
                }
                // 跳转到该应用的系统通知设置页
                main.startActivity(intent)
              }
            },
          })
        }
      } else if (plus.os.name == 'iOS') {
        // 判断是IOS
        var isOn = undefined
        var types = 0
        var app = plus.ios.invoke('UIApplication', 'sharedApplication')
        var settings = plus.ios.invoke(app, 'currentUserNotificationSettings')
        if (settings) {
          types = settings.plusGetAttribute('types')
          plus.ios.deleteObject(settings)
        } else {
          types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes')
        }
        plus.ios.deleteObject(app)
        isOn = 0 != types
        if (isOn == false) {
          uni.showModal({
            title: this.$t('通知权限开启提醒'),
            content: this.$t('您还没有开启通知权限，无法接受到消息通知，是否前往设置？'),
            success: function (res) {
              if (res.confirm) {
                var app = plus.ios.invoke('UIApplication', 'sharedApplication')
                var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:')
                plus.ios.invoke(app, 'openURL:', setting)
                plus.ios.deleteObject(setting)
                plus.ios.deleteObject(app)
              }
            },
          })
        }
      }
    },
    // #endif
  },
}
</script>
<style lang="scss">
/* #ifndef APP-PLUS-NVUE */
@import './style/main.css';
@import './style/animation.css';
@import './style/iconfont.scss';
@import './style/common.scss';
@import './style/diyStyle.scss';
@import './font/font.scss';
/* #endif */
</style>
