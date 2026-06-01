import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '@/common/api/index'
import * as utils from '@/common/utils/utils'
import { message } from '@/common/utils/index.js'
// #ifdef APP-PLUS
import { appUpdateListener } from '@/common/utils/appUpdateTips.js'
// #endif
Vue.use(Vuex)
import {
  tabbarConfig,
  themeColorConfig,
  ACCEPT_PLATFORM,
  LOCALE,
  LANGUAGES,
  cartNumIndex,
  benbenStorage,
  DIY_TABBAR,
  cartNumEdit,
  TAB_BAR_MESSAGE,
} from '@/common/config.js'
import onlineStore from './onlineStore.js'
import { SYSTEM_INFO_CSS_KEYS } from '@/common/utils/systemInfo.js'
const store = new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
    appRubbishCacheSize: '0B', // 缓存大小
    appSearchHistory: [], // 搜索历史
    appVersion: '', // app版本号
    token: '', // 用户token
    shareCode: null, // 邀请人邀请码
    locale: LOCALE, // 语言类型
    appLangUages: LANGUAGES,
    themeColor: '#FA2033', // 主题色
    themeBgColor: 'linear-gradient(126deg, #FA2033 0%, #FF6530 100%);',
    location: {},
    phone: '', //用户登录时多页面共享手机号信息
    partner_id: 0, // 店铺id
    shopInfo: {}, //店铺信息
    cartNum: 0, //购物车角标数量
    themeType: 0, //主题色类型
    appSystemIdentification: ACCEPT_PLATFORM, //系统标识
    appTabBarType: 0,
    networkType: 'unknown',
    areaData: [],
    tabBarMessage: TAB_BAR_MESSAGE,
    SystemInfo: {
      StatusBar: 0,
      CustomBar: 0,
      StatusBarRpx: 0,
      CustomBarRpx: 0,
      bottomSafeArea: 0,
      bottomSafeAreaRpx: 0,
      unitRatio: 2,
    },
    ...onlineStore?.state,
  },
  mutations: {
    // 更新网络状态
    updateNetworkType(state, networkType) {
      state.networkType = networkType
      if (networkType != 'none' && !state.areaData.length) this.dispatch('getAreaData')
    },
    //设置地区数据
    setAreaData(state, areaData) {
      state.areaData = Object.freeze(areaData)
    },
    // 更新tabbar数量
    updateTabBarMassage(state, data) {
      Object.keys(data).map((key) => {
        state.tabBarMessage[key] = data[key]
      })
    },
    //清除消息数量
    clearTabBarMassage(state, data) {
      Object.keys(state.tabBarMessage).map((key) => {
        state.tabBarMessage[key] = 0
      })
    },
    setLocale(state, { locale }) {
      if (!locale) return
      uni.setLocale(locale.value)
      state.locale = locale
      global.i18n.locale = locale.value
      global.locale = locale.value
      this.commit('setAppTabbarType', state.appTabBarType)
    },
    setSystemInfo(state, SystemInfo) {
      state.SystemInfo = { ...state.SystemInfo, ...SystemInfo }
    },
    setBadge(state, num) {
      state.cartNum = num
    },
    // 设置tabBar类型
    setAppTabbarType(state, data) {
      //判断data是否为对象且是否包含type属性
      let type = typeof data === 'object' && data.hasOwnProperty('type') ? +data.type : +data
      state.appTabBarType = type || 0
      global.appTabBarType = type || 0
      this.dispatch('putAppTabbarType', type)
    },
    // 初始化APP,获取缓存的token,用户信息等其他缓存内容
    initApp(state) {
      this.dispatch('appUpdate', false)
      //获取地址信息
      this.dispatch('getAreaData')
      const _userInfo = benbenStorage.getStorageSync('USER_INFO')
      const token = benbenStorage.getStorageSync('USER_TOKEN') || ''
      this.commit('saveToken', token)
      global.appTabBarType = 0
      const appTabBarType = token ? benbenStorage.getStorageSync('appTabBarType') || 0 : 0
      state.appSearchHistory = benbenStorage.getStorageSync('appSearchHistory') || []
      if (_userInfo) {
        state.userInfo = _userInfo
        global.userInfo = _userInfo
      }
      this.commit('setAppTabbarType', appTabBarType)
    },
    // 添加搜索历史
    appSearchHistoryAdd(state, data) {
      if (!data.name.trim()) return
      let appSearchHistory = state.appSearchHistory.filter((item) => item.name != data.name)
      appSearchHistory.unshift(data)
      state.appSearchHistory = appSearchHistory.slice(0, 10)
      benbenStorage.setStorageSync('appSearchHistory', state.appSearchHistory)
    },
    // 删除搜索历史
    appSearchHistoryDel(state, data) {
      state.appSearchHistory = state.appSearchHistory.filter((item) => item.name != data.name)
      benbenStorage.setStorageSync('appSearchHistory', state.appSearchHistory)
    },
    // 清空搜索历史
    appSearchHistoryClean(state, data) {
      state.appSearchHistory = []
      benbenStorage.setStorageSync('appSearchHistory', state.appSearchHistory)
    },
    // 更新用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = {
        ...state.userInfo,
        ...userInfo,
      }
      global.userInfo = state.userInfo
      benbenStorage.setStorageSync('USER_INFO', state.userInfo)
    },
    // 保存token
    saveToken(state, token) {
      state.token = token
      global.token = token
      benbenStorage.setStorageSync('USER_TOKEN', token)
      this.dispatch('getCartList')
    },
    // 切换主题
    switchThemeColor(state, color) {
      state.themeColor = color
    },
    // 退出登录
    logout(state) {
      state.cartList = []
      state.userInfo = {}
      global.userInfo = {}
      state.verifyAgain = false // 用户退出时二次验证为false，感觉没必要
      state.phone = ''
      this.commit('setAppTabbarType', 0)
      this.commit('saveToken', '')
      this.commit('clearTabBarMassage')
      benbenStorage.removeStorageSync('USER_INFO')
    },
    ...onlineStore?.mutations,
  },
  // 从基本数据(state)派生的数据，相当于state的计算属性
  getters: {
    themeColor(state, getters) {
      let projectConfig = themeColorConfig[state.themeType]
      let themeColor = ''
      SYSTEM_INFO_CSS_KEYS.forEach((key) => {
        themeColor += `--benben${key}:${state.SystemInfo[key] || 0}px;`
      })
      projectConfig?.colorConfig?.map((item, index) => {
        if (item) themeColor += `--benbenFontColor${index}:${item};`
      })
      projectConfig?.bgColorConfig?.map((item, index) => {
        if (item) themeColor += `--benbenbgColor${index}:${item};`
      })
      projectConfig?.bdColorConfig?.map((item, index) => {
        if (item) themeColor += `--benbenbdColor${index}:${item};`
      })
      projectConfig?.iconColorConfig?.map((item, index) => {
        if (item) themeColor += `--benbeniconColor${index}:${item};`
      })
      projectConfig?.btnColorConfig?.map((item, index) => {
        if (item) themeColor += `--benbenbtnColor${index}:${item};`
      })
      return themeColor
    },
    themeColorObj(state, getters) {
      let projectConfig = themeColorConfig[state.themeType]
      let themeColor = {}
      SYSTEM_INFO_CSS_KEYS.forEach((key) => {
        themeColor[`var(--benben${key})`] = `${state.SystemInfo[key] || 0}px;`
      })
      projectConfig?.colorConfig?.map((item, index) => {
        if (item) themeColor[`var(--benbenFontColor${index})`] = item
      })
      projectConfig?.bgColorConfig?.map((item, index) => {
        if (item) themeColor[`var(--benbenbgColor${index})`] = item
      })
      projectConfig?.bdColorConfig?.map((item, index) => {
        if (item) themeColor[`var(--benbenbdColor${index})`] = item
      })
      projectConfig?.iconColorConfig?.map((item, index) => {
        if (item) themeColor[`var(--benbeniconColor${index})`] = item
      })
      projectConfig?.btnColorConfig?.map((item, index) => {
        if (item) themeColor[`var(--benbenbtnColor${index})`] = item
      })
      return themeColor
    },
    // 是否会员
    isMember(state) {
      if (state.userInfo && state.userInfo.user_level) {
        return true
      } else {
        return false
      }
    },
    ...onlineStore?.getters,
  },
  // 和mutation的功能大致相同，不同之处在于 ==》1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
  actions: {
    // APP热更新方法
    appUpdate({ state, commit, dispatch }, showTips) {
      // #ifdef APP-PLUS
      appUpdateListener(!showTips)
      // #endif
    },
    // 设置tabBar类型
    putAppTabbarType(state, type) {
      if (!tabbarConfig?.roleTabBarShow?.length) return
      if (!tabbarConfig?.roleTabBarShow[+type]) type = 0
      benbenStorage.setStorageSync('appTabBarType', type)
      if (DIY_TABBAR) return
      for (let index = 0; index < tabbarConfig.listNum; index++) {
        let flag = tabbarConfig.roleTabBarShow[+type].find((item) => item.index == index)
        let tabBarOption = {
          index: index,
          visible: flag !== undefined,
        }
        if (flag && flag.ident) tabBarOption.text = global.i18n.t(flag.ident)
        uni.setTabBarItem(tabBarOption)
      }
    },
    // 获取地址信息
    async getAreaData({ dispatch, commit, getters, state }) {
      let areaData1 = uni.getStorageSync('areaData1') || null
      if (areaData1 && areaData1.time && new Date().getTime() - areaData1.time < 2592000000) {
        let areaData2 = uni.getStorageSync('areaData2') || null
        let areaData3 = uni.getStorageSync('areaData3') || null
        if (areaData1.data && areaData2.data && areaData3.data) {
          commit('setAreaData', [...areaData1.data, ...areaData2.data, ...areaData3.data])
          return
        }
      }
      try {
        let {
          data: { data, mag, code },
        } = await http.post(global.apiUrls.getAreaData)
        if (code == 1) {
          let time = new Date().getTime()
          // data 切割为三个数组分别缓存
          const array1 = data.slice(0, 11)
          const array2 = data.slice(11, 22)
          const array3 = data.slice(22)
          uni.setStorage({
            key: 'areaData1',
            data: {
              time: time,
              data: array1,
            },
          })
          uni.setStorage({
            key: 'areaData2',
            data: {
              time: time,
              data: array2,
            },
          })
          uni.setStorage({
            key: 'areaData3',
            data: {
              time: time,
              data: array3,
            },
          })
          commit('setAreaData', [...array1, ...array2, ...array3])
        }
      } catch (error) {
        // message.info('地址信息获取失败')
      }
    },
    appClearCache({ dispatch, commit, getters, state }) {
      /* #ifdef APP-PLUS */
      let that = this
      utils.showModal({
        title: global.i18n.t('提示'),
        content: global.i18n.t('确定要清除本地缓存？'),
        confirmColor: state.themeColor,
        success: (res) => {
          if (res.confirm) {
            let os = plus.os.name
            if (os == 'Android') {
              let main = plus.android.runtimeMainActivity()
              let sdRoot = main.getCacheDir()
              let files = plus.android.invoke(sdRoot, 'listFiles')
              let len = files.length
              if (len == 0) {
                message.info(global.i18n.t('缓存清理完成!'))
                state.appRubbishCacheSize = '0B'
                return
              }
              let completedCount = 0
              for (let i = 0; i < len; i++) {
                let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
                plus.io.resolveLocalFileSystemURL(
                  filePath,
                  function (entry) {
                    if (entry.isDirectory) {
                      entry.removeRecursively(
                        function (entry) {
                          // 递归删除其下的所有文件及子目录
                          completedCount++
                          if (completedCount == len) {
                            message.info(global.i18n.t('缓存清理完成!'))
                            dispatch('getAppCache') // 重新计算缓存
                          }
                        },
                        function (e) {
                          console.log(e.message)
                        }
                      )
                    } else {
                      entry.remove()
                      completedCount++
                      if (completedCount == len) {
                        message.info(global.i18n.t('缓存清理完成!'))
                        dispatch('getAppCache') // 重新计算缓存
                      }
                    }
                  },
                  function (e) {
                    console.log('文件路径读取失败')
                  }
                )
              }
            } else {
              // iOS 清理缓存
              plus.cache.clear(
                function () {
                  message.info(global.i18n.t('缓存清理完成!'))
                  dispatch('getAppCache') // 重新计算缓存
                },
                function (e) {
                  console.log(e.message)
                }
              )
            }
          }
        },
      })
      /* #endif */
    },
    getAppCache({ dispatch, commit, getters, state }) {
      /* #ifdef APP-PLUS */
      plus.cache.calculate(function (size) {
        let sizeCache = parseInt(size)
        console.log('缓存大小：' + sizeCache)
        if (sizeCache == 0) {
          state.appRubbishCacheSize = '0B'
        } else if (sizeCache < 1024) {
          state.appRubbishCacheSize = sizeCache + 'B'
        } else if (sizeCache < 1048576) {
          state.appRubbishCacheSize = (sizeCache / 1024).toFixed(2) + 'KB'
        } else if (sizeCache < 1073741824) {
          state.appRubbishCacheSize = (sizeCache / 1048576).toFixed(2) + 'MB'
        } else {
          state.appRubbishCacheSize = (sizeCache / 1073741824).toFixed(2) + 'GB'
        }
      })
      /* #endif */
    },
    getAppVersion({
      //获取app版本号
      dispatch,
      commit,
      getters,
      state,
    }) {
      /* #ifdef APP-PLUS */
      plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
        state.appVersion = 'V' + widgetInfo.version
      })
      /* #endif */
    },
    // 获取购物车数量
    getCartList({ dispatch, commit, getters, state }) {
      let setBadge = (num) => {
        commit('setBadge', num)
        // 判断是否为自定义tabbar
        if (!DIY_TABBAR) {
          if (num) {
            if (Number(num) > 99) {
              uni.setTabBarBadge({
                index: cartNumIndex,
                text: '99+',
              })
            } else {
              uni.setTabBarBadge({
                index: cartNumIndex,
                text: num + '',
              })
            }
          } else {
            uni.removeTabBarBadge({
              index: cartNumIndex,
            })
          }
          commit('setBadge', num)
        } else {
          if (cartNumEdit) commit('updateTabBarMassage', { [cartNumEdit]: num })
        }
      }
      if (state.token && global.apiUrls.numberOfShoppingCart) {
        http.post(global.apiUrls.numberOfShoppingCart).then((res) => {
          if (res.data.code == 1) {
            let data = res.data.data
            data = data > 99 && !DIY_TABBAR ? '99+' : data
            setTimeout(() => {
              setBadge(data)
            }, 1000)
          }
        })
      } else {
        setTimeout(() => {
          setBadge(0)
        }, 1000)
      }
    },
    ...onlineStore?.actions,
  },
})
export default store
