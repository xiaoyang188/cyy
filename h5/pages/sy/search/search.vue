<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex search_flex_0_babdd"
        :style="{ height: 100 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center flex-sub search_fd0_0_babdd">
          <text class="fu-iconfont2 search_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">&#xE794;</text>
          <view class="flex align-center flex-sub search_fd0_0_c1_babdd">
            <image class="search_fd0_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '23.png'"></image>
            <benben-input
              class="flex-sub search_fd0_0_c1_c1_babdd"
              type="text"
              :focus="true"
              :placeholder="`${name ? name : '请输入想要搜索的商品'}`"
              confirm-type="done"
              :maxlength="-1"
              placeholder-style="color:var(--benbenFontColor1);font-size:24rpx"
              @confirm="addSearchHistoryFunc()"
              @input="searchFunc()"
              v-model="keyword"
            />
            <image
              class="search_fd0_0_c1_c2_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '779.png'"
              @tap="ClearInputFunc()"
              v-if="keyword != ''"
            ></image>
          </view>
          <view class="flex flex-wrap align-center search_fd0_0_c2_babdd" v-if="appSystemIdentification == 'Wechat'"></view>
        </view>
      </view>
      <view :style="{ height: 100 + StatusBarRpx + 'rpx' }"></view>
      <!---搜索记录flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout" v-if="appSearchHistory.length > 0">
        <view class="flex flex-direction align-stretch" v-if="associateList.length == 0 || keyword == ''">
          <view class="flex flex-wrap align-center search_fd1_0_c0_babdd" v-if="appSearchHistory.length > 0">
            <image class="search_fd1_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '235.png'"></image>
            <text class="search_fd1_0_c0_c1_babdd">{{ $t('历史搜索') }}</text>
            <image
              class="search_fd1_0_c0_c2_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '386.png'"
              @tap.stop="openDeleteHistoryPopup('all')"
              v-if="appSearchHistory.length > 0"
            ></image>
          </view>
          <view class="flex flex-wrap align-center search_fd1_0_c1_babdd" v-if="appSearchHistory.length > 0">
            <template v-for="(item, key0) in appSearchHistory">
              <view
                class="flex align-center search_fd1_0_c1_c0_babdd"
                @tap.stop="handleJumpDiy"
                data-type="navigateTo"
                :data-url="`/pages/fl/commodityList/commodityList?keyword=${item.name}`"
                @longpress="openDeleteHistoryPopup('single', item.name)"
                :key="key0"
              >
                <text class="search_fd1_0_c1_c0_c0_babdd">{{ item.name }}</text>
              </view>
            </template>
          </view>
          <text class="search_fd1_0_c2_babdd" v-if="appSearchHistory.length == 0">{{ $t('暂无历史记录') }}</text>
        </view>
      </view>

      <!---搜索记录flex布局结束-->
      <benben-popup v-model="popupShow1661481796822" :mask="true" :mask-close-able="true" mode="center">
        <!---删除历史记录弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center search_flex_2_babdd">
          <text class="search_fd2_0_babdd">{{ $t('提示') }}</text>
          <text class="search_fd2_1_babdd">{{ deleteHistoryMode === 'all' ? $t('确定删除历史记录？') : $t('确定删除该条历史记录？') }}</text>
          <view class="flex flex-wrap align-center search_fd2_2_babdd">
            <button class="search_fd2_2_c0_babdd" @tap.stop="popupShow1661481796822 = false">{{ $t('取消') }}</button>
            <button class="search_fd2_2_c1_babdd" @tap.stop="confirmDeleteHistoryFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---删除历史记录弹窗flex布局结束-->
      </benben-popup>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout" v-if="associateList.length == 0 || keyword == ''">
        <view class="flex flex-wrap align-center search_fd3_0_babdd">
          <image class="search_fd3_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '388.png'"></image>
          <text class="search_fd3_0_c1_babdd">{{ $t('搜索发现') }}</text>
          <text class="search_fd3_0_c2_babdd" @tap.stop="changeSweetGrilFunc()">{{ $t('换一批') }}</text>
        </view>
        <view class="flex flex-wrap align-center search_fd3_1_babdd">
          <template v-for="(item, key0) in dataList">
            <view
              class="flex flex-wrap align-center search_fd3_1_c0_babdd"
              @tap.stop="clickDiscoverFunc(item.name)"
              v-if="item.is_set == '1'"
              :key="key0"
            >
              <text class="search_fd3_1_c0_c0_babdd">{{ item.name }}</text>
              <image class="search_fd3_1_c0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '389.png'"></image>
            </view>
          </template>

          <template v-for="(item, key0) in dataList">
            <view
              class="flex flex-wrap align-center search_fd3_1_c1_babdd"
              @tap.stop="clickDiscoverFunc(item.name)"
              v-if="item.is_set == '0'"
              :key="key0"
            >
              <text class="search_fd3_1_c1_c0_babdd">{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>

      <!---flex布局flex布局结束-->

      <view
        class="flex flex-direction flex-wrap align-stretch benben-flex-layout search_flex_4_babdd"
        v-if="associateList.length == 0 || keyword == ''"
      >
        <view class="flex flex-wrap align-center search_fd4_0_babdd" v-if="dataLists.length > 0">
          <image class="search_fd4_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '390.png'"></image>
          <text class="search_fd4_0_c1_babdd">{{ $t('全网热搜榜') }}</text>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch search_fd4_1_babdd" v-if="dataLists.length > 0">
          <template v-for="(item, key0) in dataLists">
            <view
              class="flex flex-wrap align-center search_fd4_1_c0_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"
              :key="key0"
            >
              <image class="search_fd4_1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '391.png'" v-if="key0 == '0'"></image>
              <image class="search_fd4_1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '393.png'" v-if="key0 == '1'"></image>
              <image class="search_fd4_1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '395.png'" v-if="key0 == '2'"></image>
              <text class="search_fd4_1_c0_c1_babdd" v-if="key0 > '2'">{{ key0 + 1 }}</text>
              <text class="flex-sub search_fd4_1_c0_c2_babdd">{{ item.name }}</text>
              <template v-for="(child, key1) in item.is_set_type">
                <view class="flex flex-wrap align-center" :key="key1">
                  <image
                    class="search_fd4_1_c0_c3_c0_babdd"
                    :style="{ opacity: `${showIcon}` }"
                    mode="aspectFit"
                    :src="STATIC_URL + '394.png'"
                    v-if="in_array(child, '1')"
                  ></image>
                  <image
                    class="search_fd4_1_c0_c3_c0_babdd"
                    :style="{ opacity: `${showIcon}` }"
                    mode="aspectFit"
                    :src="STATIC_URL + '392.png'"
                    v-if="in_array(child, '2')"
                  ></image>
                </view>
              </template>
            </view>
          </template>

          <view
            class="flex align-center justify-between"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/sy/searchList/searchList`"
          >
            <view
              class="flex flex-wrap align-center justify-center search_fd4_1_c1_c0_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/sy/searchList/searchList`"
            >
              <image class="search_fd4_1_c1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '236.png'"></image>
              <text class="search_fd4_1_c1_c0_c1_babdd">{{ $t('查看榜单') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!---flex布局flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout search_flex_5_babdd" v-if="associateList.length != 0 && keyword != ''">
        <template v-for="(item, key0) in associateList">
          <view class="flex align-center justify-between search_fd5_0_babdd" @tap="goCommodityListFunc(key0)" :key="key0">
            <jyf-parser class="search_fd5_0_c0_babdd" :html="item.name | richTextFormat"></jyf-parser>
            <image class="search_fd5_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '346.png'"></image>
          </view>
        </template>
      </view>

      <!---flex布局flex布局结束-->
      <view
        class="flex benben-position-layout flex flex-wrap align-center search_flex_6_babdd"
        @tap.stop="popupShow1730704961807 = true"
        :style="{ bottom: `${keyboardheight}px` }"
      >
        <!-- <image class='search_fd6_0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1568.png"'></image>
 -->
      </view>
      <benben-popup v-model="popupShow1730704961807" :mask="true" :mask-close-able="true" mode="bottom" :z-index="999">
        <!---flex布局flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout search_flex_7_babdd">
          <view class="flex flex-wrap align-center justify-between search_fd7_0_babdd">
            <view class="flex flex-wrap align-center search_fd7_0_c0_babdd"></view>
            <view class="flex flex-wrap align-center">
              <text class="search_fd7_0_c1_c0_babdd">{{ $t('语音搜索') }}</text>
            </view>
            <view class="flex flex-wrap align-center justify-end search_fd7_0_c2_babdd">
              <image
                class="search_fd7_0_c2_c0_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '85.png'"
                @tap.stop="popupShow1730704961807 = false"
              ></image>
            </view>
          </view>
          <view class="flex flex-direction align-center search_fd7_1_babdd">
            <text class="search_fd7_1_c0_babdd" v-if="is_recording === false">{{ $t('长按说话，松手识别') }}</text>
            <text class="search_fd7_1_c0_babdd" v-if="is_recording === true">{{ $t('请说,我在聆听...') }}</text>
            <image class="search_fd7_1_c1_babdd" mode="aspectFit" :src="STATIC_URL + '1568.png'"></image>
          </view>
          <!--     <benben-select-diy ref="showSelectPopup1730705045676" class-text='flex-direction align-stretch flex search_fd7_2_babdd'   :items.sync="language" v-model="language_value" :label.sync="language_label"  default-type="value" default-label="name" :allow-cancel='false' type="radio" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in language' :hand-value='item.value' :key='key0'>
        <template #selected>    <view   class='flex flex-direction align-center flex'      >
        <text class='search_fd7_2_c0_c0_babdd'  >{{item.name}}</text>
</view>
</template><template #no-selected>    <view   class='flex flex-direction align-center flex'      >
        <text class='search_fd7_2_c1_c0_babdd'  >{{item.name}}</text>
</view>
</template></benben-select-item></benben-select-diy>
 -->
        </view>

        <!---flex布局flex布局结束-->
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
      popupShow1730704961807: false,
      popupShow1661481796822: false,
      keyword: '',
      /** dataList【搜索发现】 **/ dataList: [],
      dataLists: [],
      deleteHistoryMode: 'all',
      pendingDeleteHistoryName: '',
      xainshi: false,
      associateList: [],
      inputList: [],
      name: '',
      /** Timer【定时器】 **/ Timer: '',
      /** showIcon【闪透明度】 **/ showIcon: '1',
      flag: true,
      keywordList: [],
      language: [
        {
          name: '中文',
          value: '1',
          image: '',
        },
        {
          name: 'English',
          value: '2',
          image: '',
        },
        {
          name: 'English13333333',
          value: '3',
          image: '',
        },
      ],
      language_value: '1',
      language_label: '中文',
      is_recording: false,
      keyboardheight: '40',
    }
  },
  computed: {
    appSearchHistory() {
      // 搜索历史
      return this.$store.state.appSearchHistory
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
    let { keyword, name } = options
    if (keyword !== undefined) this.keyword = keyword
    if (name !== undefined) this.name = name
    this.searchForFunc()
    this.fullNetworkHotSearchFunc()
    this.initTimerFunc()
  },
  onUnload() {
    this.offTimerFunc()
  },
  onReady() {
    this.onKeyboardHeightChangeFunc()
  },
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.searchForFunc()
    this.fullNetworkHotSearchFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //搜索
    async searchForFunc() {
      //请求方法
      //数据验证

      let datadataList = await this.$api.get(global.apiUrls.post641af9cb8b32f, {
        view_position: 'all',
      })

      if (datadataList.data.code != 1) {
        this.$message.info(datadataList.data.msg)
        return
      }
      let infodataList = datadataList.data
      this.dataList = infodataList.data
    },
    //全网热搜
    async fullNetworkHotSearchFunc() {
      //请求方法
      //数据验证

      let datadataLists = await this.$api.get(global.apiUrls.post641afd26102ab, {})

      if (datadataLists.data.code != 1) {
        this.$message.info(datadataLists.data.msg)
        return
      }
      let infodataLists = datadataLists.data
      this.dataLists = infodataLists.data
    },
    //换一批
    changeSweetGrilFunc() {
      this.$util.debounce(() => {
        this.searchForFunc()
      }, 300)
    },
    //添加搜索历史
    addSearchHistoryFunc() {
      if (this.keyword == '' && this.name != global.i18n.t('请输入商品名称')) {
        this.keyword = this.name
      }
      this.$store.commit('appSearchHistoryAdd', {
        name: this.keyword,
      })
      this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?keyword=${this.keyword}`)
      this.keyword = ''
    },
    //打开删除历史记录确认弹窗
    openDeleteHistoryPopup(mode, name = '') {
      this.deleteHistoryMode = mode
      this.pendingDeleteHistoryName = name
      this.popupShow1661481796822 = true
    },
    //确认删除历史记录
    confirmDeleteHistoryFunc() {
      if (this.deleteHistoryMode === 'all') {
        this.emptySearchHistoryFunc()
      } else {
        this.deleteSearchHistoryFunc(this.pendingDeleteHistoryName)
        this.popupShow1661481796822 = false
      }
    },
    //删除搜索历史
    deleteSearchHistoryFunc(name) {
      this.$store.commit('appSearchHistoryDel', {
        name: name,
      })
      this.pendingDeleteHistoryName = ''
    },
    //清空搜索记录
    emptySearchHistoryFunc() {
      this.$store.commit('appSearchHistoryClean', '')
      this.popupShow1661481796822 = false
    },
    //搜索框输入内容
    async searchFunc() {
      if (!this.flag) return
      this.flag = false
      setTimeout(async () => {
        this.flag = true
        if (this.keyword != '') {
          //请求方法
          //数据验证
          if (this.$util.antiShakeThrottle(500)) return
          let dataassociateList = await this.$api.get(global.apiUrls.post670508eef0d78, {
            keywords: this.keyword,
          })
          if (dataassociateList.data.code != 1) {
            this.$message.info(dataassociateList.data.msg)
            return
          }
          this.keywordList = JSON.parse(JSON.stringify(dataassociateList.data.data))
          let infoassociateList = dataassociateList.data.data
          this.associateList = infoassociateList
          let str = this.keyword.replace(/[A-Za-z0-9\s]+/g, '')
          this.associateList.forEach((item) => {
            for (var i = 0; i < str.length; i++) {
              let replaceReg = new RegExp(str[i], 'gi')
              let replaceString = `<span style="color: #fa5151;">${str[i]}</span>`
              item.name = item.name.replace(replaceReg, replaceString)
            }
          })
          if (this.associateList.length != 0) {
            this.xainshi = true
          }
        }
      }, 300)
    },
    //清空输入框
    ClearInputFunc() {
      this.keyword = ''
    },
    //点击发现
    clickDiscoverFunc(name) {
      this.$store.commit('appSearchHistoryAdd', {
        name: name,
      })
      this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?keyword=${name}`)
    },
    //初始化图标定时器
    initTimerFunc() {
      this.Timer = setInterval(() => {
        this.showIcon = 0
        setTimeout(() => {
          this.showIcon = 1
        }, 200)
      }, 2000)
    },
    //移除图标定时器
    offTimerFunc() {
      clearInterval(this.Timer)
    },
    //跳转页面
    goCommodityListFunc(index) {
      this.$store.commit('appSearchHistoryAdd', {
        name: this.keywordList[index].name,
      })
      this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?keyword=${this.keywordList[index].name}`)
    },
    //开始录音
    startRecordFunc() {
      this.is_recording = true

      const options = {
        duration: 50000, // 录音的最大时长，单位 ms，最大值 600000（10 分钟）
        sampleRate: 44100, // 采样率
        numberOfChannels: 1, // 录音的声道数
        encodeBitRate: 192000, // 编码码率
        format: 'mp3', // 音频格式，目前支持 'aac' 或 'mp3'
      }
      // 开始录音
      recorderManager.start(options)

      // 录音开始事件
      recorderManager.onStart(() => {
        console.log('录音开始')
      })

      // 录音错误事件
      recorderManager.onError((error) => {
        console.error('录音错误', error)
      })
    },
    //结束录音
    endRecordFunc() {
      // 停止录音
      recorderManager.stop()

      // 录音停止事件
      recorderManager.onStop((res) => {
        // 获取录音文件
        const { tempFilePath } = res
        console.log('录音文件:', res)
        // 处理录音文件，如上传、保存等
        this.uploadFileFunc(res.tempFilePath)
      })
      this.is_recording = false
      this.popupShow1730704961807 = false
    },
    //上传文件
    uploadFileFunc(tempFilePaths) {
      this.uploading = true
      uni.showLoading({
        title: '识别中...',
      })
      uni.uploadFile({
        url: API_BASE_URL + '/v1/66f12e87aee5f', //仅为示例，非真实的接口地址
        filePath: tempFilePaths,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        success: (uploadFileRes) => {
          uni.hideLoading()
          this.keyword = JSON.parse(uploadFileRes.data).result.text.replace(/[.,!?。,？!]/g, '')
          if (!this.keyword) {
            this.$message.info('未识别到内容')
            return
          } else {
            // this.searchFunc()
            this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?keyword=${this.keyword}`)
          }
        },
        fail: (err) => {
          uni.hideLoading()
          this.$message.info('识别失败')
          console.log(err, '??????1111')
        },
      })
    },
    //监听键盘高度
    onKeyboardHeightChangeFunc() {
      uni.onKeyboardHeightChange((res) => {
        this.keyboardheight = res.height
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
  background: #fff;
  background-size: 100% auto;

  .search_flex_7_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto;

    .search_fd7_0_babdd {
      border-radius: 16rpx 16rpx 0rpx 0rpx;
      background: var(--benbenbgColor1);
      width: 750rpx;
      padding: 32rpx 32rpx 32rpx 32rpx;

      .search_fd7_0_c0_babdd {
        width: 100rpx;
        height: 50rpx;
      }

      .search_fd7_0_c1_c0_babdd {
        margin: 0rpx 32rpx 0rpx 32rpx;
        color: var(--benbenFontColor0);
        font-size: 32rpx;
        font-weight: 500;
      }

      .search_fd7_0_c2_babdd {
        width: 100rpx;

        .search_fd7_0_c2_c0_babdd {
          width: 40rpx;
          height: 40rpx;
          border-radius: 0rpx;
        }
      }
    }

    .search_fd7_1_babdd {
      margin: 40rpx 0rpx 80rpx 0rpx;

      .search_fd7_1_c0_babdd {
        margin: 0rpx 0rpx 24rpx 0rpx;
        color: var(--benbenFontColor0);
      }

      .search_fd7_1_c1_babdd {
        width: 200rpx;
        height: 200rpx;
        border-radius: 0rpx;
      }
    }

    .search_fd7_2_c0_c0_babdd {
      margin: 32rpx 0rpx 32rpx 0rpx;
      color: rgba(221, 221, 221, 1);
      font-size: 32rpx;
      font-weight: 500;
    }

    .search_fd7_2_c1_c0_babdd {
      margin: 32rpx 0rpx 32rpx 0rpx;
      color: rgba(174, 174, 174, 1);
      font-size: 28rpx;
      font-weight: 500;
    }
  }

  .search_flex_6_babdd {
    overflow: hidden;
    z-index: 10;
    bottom: calc(80rpx + var(--benben-window-bottom, 0px));
    left: 43%;
    box-shadow: 0rpx 3rpx 30rpx #e8e8e8;
    border-radius: 50rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto;

    .search_fd6_0_babdd {
      width: 66rpx;
      height: 66rpx;
      border-radius: 0rpx;
      margin: 0rpx 24rpx 0rpx 24rpx;
    }
  }

  .search_flex_5_babdd {
    padding: 24rpx 24rpx 0rpx 24rpx;

    .search_fd5_0_babdd {
      padding: 32rpx 0rpx 32rpx 0rpx;
      border-bottom: 1px solid #eee;

      .search_fd5_0_c1_babdd {
        width: 20rpx;
        height: 20rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx 24rpx;
      }
    }
  }

  .search_flex_4_babdd {
    padding: 0rpx 24rpx 24rpx 24rpx;

    .search_fd4_0_babdd {
      padding: 32rpx 0rpx 24rpx 0rpx;

      .search_fd4_0_c0_babdd {
        width: 34rpx;
        height: 34rpx;
        margin: 0rpx 16rpx 0rpx 0rpx;
      }

      .search_fd4_0_c1_babdd {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--benbenFontColor0);
      }
    }

    .search_fd4_1_babdd {
      border-radius: 24rpx 24rpx 24rpx 24rpx;
      box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.08);
      background: var(--benbenbtnColor1);
      background-size: 100% auto !important;
      padding: 32rpx 24rpx 56rpx 24rpx;

      .search_fd4_1_c0_babdd {
        margin: 0rpx 0rpx 40rpx 0rpx;

        .search_fd4_1_c0_c1_babdd {
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
          margin: 0rpx 34rpx 0rpx 11rpx;
        }

        .search_fd4_1_c0_c2_babdd {
          margin: 0rpx 16rpx 0rpx 0rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor0);
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }

      .search_fd4_1_c1_c0_babdd {
        margin: 16rpx 0rpx 0rpx 0rpx;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        background: var(--benbenbgColor1);
        width: 638rpx;
        height: 80rpx;
        border: 1px solid var(--benbenbdColor2);

        .search_fd4_1_c1_c0_c0_babdd {
          width: 32rpx;
          height: 32rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 8rpx 0rpx 0rpx;
        }

        .search_fd4_1_c1_c0_c1_babdd {
          font-size: 24rpx;
          font-weight: 400;
          color: var(--benbenFontColor4);
        }
      }
    }
  }

  .search_fd4_1_c0_c0_babdd {
    width: 38rpx;
    height: 38rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .search_fd4_1_c0_c3_c0_babdd {
    width: 40rpx;
    height: 40rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
    transition: all ease 0.2s;
  }

  .search_fd3_0_babdd {
    padding: 32rpx 0rpx 15rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 24rpx;

    .search_fd3_0_c0_babdd {
      width: 34rpx;
      height: 34rpx;
      border-radius: 17rpx 17rpx 17rpx 17rpx;
      margin: 0rpx 16rpx 0rpx 0rpx;
    }

    .search_fd3_0_c1_babdd {
      font-size: 32rpx;
      font-weight: 700;
      color: var(--benbenFontColor0);
    }

    .search_fd3_0_c2_babdd {
      margin: 0rpx 0rpx 0rpx auto;
      padding: 8rpx 16rpx 8rpx 16rpx;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      border: 1px solid var(--benbenbdColor0);
      color: var(--benbenFontColor0);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 33rpx;
    }
  }

  .search_fd3_1_babdd {
    padding: 0rpx 0rpx 0rpx 12rpx;

    .search_fd3_1_c0_babdd {
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      background: var(--benbenbtnColor1);
      background-size: 100% auto !important;
      padding: 0rpx 40rpx 0rpx 40rpx;
      line-height: 56rpx;
      margin: 0rpx 12rpx 24rpx 12rpx;
      border: 1px solid var(--benbenbdColor2);
      position: relative;

      .search_fd3_1_c0_c0_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor4);
      }

      .search_fd3_1_c0_c1_babdd {
        width: 18rpx;
        height: 32rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        position: absolute;
        top: -8rpx;
        right: 4rpx;
      }
    }

    .search_fd3_1_c1_babdd {
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      background: var(--benbenbtnColor3);
      background-size: 100% auto !important;
      padding: 0rpx 40rpx 0rpx 40rpx;
      line-height: 56rpx;
      margin: 0rpx 12rpx 24rpx 12rpx;

      .search_fd3_1_c1_c0_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
      }
    }
  }

  .search_flex_2_babdd {
    margin: 0rpx 105rpx 0rpx 105rpx;
    background: #fff;
    background-size: #eee;
    border-radius: 25rpx 25rpx 25rpx 25rpx;
    padding: 40rpx 0rpx 0rpx 0rpx;

    .search_fd2_0_babdd {
      color: var(--benbenFontColor0);
      font-size: 32rpx;
      font-weight: 500;
      line-height: 45rpx;
    }

    .search_fd2_1_babdd {
      font-size: 32rpx;
      font-weight: 400;
      line-height: 52rpx;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 39rpx 0rpx;
    }

    .search_fd2_2_babdd {
      border-top: 1px solid #eee;

      .search_fd2_2_c0_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor2);
        border-right: 1px solid var(--benbenbdColor0);
        height: 110rpx;
        width: 270rpx;
      }

      .search_fd2_2_c1_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        width: 269rpx;
        height: 110rpx;
      }
    }
  }

  .search_fd1_0_c0_babdd {
    padding: 32rpx 0rpx 24rpx 0rpx;
    margin: 0rpx 24rpx 0rpx 24rpx;

    .search_fd1_0_c0_c0_babdd {
      width: 34rpx;
      height: 34rpx;
      border-radius: 17rpx 17rpx 17rpx 17rpx;
      margin: 0rpx 16rpx 0rpx 0rpx;
    }

    .search_fd1_0_c0_c1_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
    }

    .search_fd1_0_c0_c2_babdd {
      width: 24rpx;
      height: 28rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx auto;
    }
  }

  .search_fd1_0_c1_babdd {
    padding: 0rpx 0rpx 0rpx 12rpx;

    .search_fd1_0_c1_c0_babdd {
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      background: var(--benbenbtnColor3);
      background-size: 100% auto !important;
      padding: 0rpx 40rpx 0rpx 40rpx;
      line-height: 56rpx;
      margin: 0rpx 12rpx 24rpx 12rpx;

      .search_fd1_0_c1_c0_c0_babdd {
        font-size: 24rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
        margin: 0rpx 16rpx 0rpx 0rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-width: 200rpx;
      }

      .search_fd1_0_c1_c0_c1_babdd {
        width: 18rpx;
        height: 18rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }
  }

  .search_fd1_0_c2_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    margin: 0rpx 0rpx 32rpx 24rpx;
  }

  .search_flex_0_babdd {
    width: 750rpx;
    height: 100rpx;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .search_fd0_0_babdd {
      margin: 17rpx 32rpx 24rpx 32rpx;

      .search_fd0_0_c0_babdd {
        font-size: 36rpx;
        color: var(--benbeniconColor1);
        font-weight: 500;
      }

      .search_fd0_0_c1_babdd {
        background: var(--benbenbgColor0);
        background-size: 100% auto !important;
        border-radius: 34rpx 34rpx 34rpx 34rpx;
        margin: 0rpx 0rpx 0rpx 24rpx;
        padding: 0rpx 24rpx 0rpx 24rpx;
        height: 64rpx;

        .search_fd0_0_c1_c0_babdd {
          width: 24rpx;
          height: 24rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .search_fd0_0_c1_c1_babdd {
          font-size: 24rpx;
          color: var(--benbenFontColor0);
          margin: 0rpx 0rpx 0rpx 12rpx;
        }

        .search_fd0_0_c1_c2_babdd {
          width: 40rpx;
          height: 40rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
          margin: 0rpx 0rpx 0rpx 20rpx;
        }
      }

      .search_fd0_0_c2_babdd {
        width: 30%;
      }
    }
  }
}

::v-deep .search_fd7_2_babdd {
  padding: 16rpx 32rpx 48rpx 32rpx;
  margin: 0rpx 0rpx 0rpx 0rpx;
}

::v-deep .search_fd5_0_c0_babdd {
  width: 100%;
}
</style>
