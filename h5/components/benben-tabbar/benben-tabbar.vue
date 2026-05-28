<template>
  <view class="benben-tabbar" v-if="pagePath">
    <view class="benben-tabbar-center" :style="{ 'background-color': tabBar.backgroundColor }">
      <view
        :class="{ 'benben-tabbar-item': !item.isBtn, 'benben-tabbar-btn': item.isBtn }"
        :style="item.isBtn ? 'width:' + item.styleConfig.width : ''"
        @click="handleTabBar(item)"
        v-for="(item, index) in tabBarList"
        :key="index"
      >
        <template v-if="item.isBtn">
          <image
            class="benben-tabbar-btn-img"
            :style="{ width: item.styleConfig.width, bottom: item.styleConfig.bottom }"
            :src="item.iconPath"
            mode="widthFix"
          />
          <text class="benben-tabbar-btn-text" :style="{ color: tabBar.color }">{{ item.text }}</text>
        </template>
        <template v-else>
          <benben-message-num
            style-type="oval"
            class="benben-tabbar-item-msg"
            :message-num="item.massage"
            size="18"
            color="#fff"
            background-color="red"
          ></benben-message-num>
          <image class="benben-tabbar-item-img" :src="pagePath == item.pagePath ? item.selectedIconPath : item.iconPath" mode="scaleToFill" />
          <text :style="{ color: pagePath == item.pagePath ? tabBar.selectedColor : tabBar.color }">
            {{ item.text }}
          </text>
        </template>
      </view>
    </view>
  </view>
</template>
<script>
import { benbenImageSrcResolution } from '@/common/utils/utils.js'
import { DIY_TABBAR_CONFIG } from '@/common/config.js'
export default {
  name: 'benben-tabbar',
  props: {
    pagePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tabBar: DIY_TABBAR_CONFIG,
    }
  },
  computed: {
    tabBarList() {
      let tabBarList = []
      this.tabBar.list.map((item) => {
        if (item.visible.includes(this.$store.state.appTabBarType)) {
          if (item.isBtn) {
            tabBarList.push({
              ...item,
              massage: this.$store.state.tabBarMessage.hasOwnProperty(item.messageEdit) ? this.$store.state.tabBarMessage[item.messageEdit] : '',
              iconPath: benbenImageSrcResolution(item.iconPath, 'tab'),
              text: item.text ? this.$t(item.text) : '',
            })
          } else {
            tabBarList.push({
              ...item,
              iconPath: benbenImageSrcResolution(item.iconPath, 'tab'),
              selectedIconPath: benbenImageSrcResolution(item.selectedIconPath, 'tab'),
              massage: this.$store.state.tabBarMessage.hasOwnProperty(item.messageEdit) ? this.$store.state.tabBarMessage[item.messageEdit] : '',
              text: item.text ? this.$t(item.text) : '',
            })
          }
        }
      })
      return tabBarList
    },
  },
  watch: {},
  created() {
    uni.hideTabBar()
  },
  mounted() {},
  methods: {
    handleTabBar(e) {
      if (this.pagePath == e.pagePath) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
        return
      }
      if (e.isBtn) {
        this.$urouter.navigateTo(e.pagePath)
      } else {
        this.$urouter.switchTab(e.pagePath)
      }
    },
  },
}
</script>
<style scoped lang="scss">
.benben-tabbar {
  height: calc(50px + var(--benbenbottomSafeArea, 0px));
  .benben-tabbar-center {
    box-sizing: content-box;
    border-top: 1px solid #f5f5f5;
    height: 50px;
    padding-bottom: var(--benbenbottomSafeArea, 0px);
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 999;
    .benben-tabbar-btn {
      height: 100%;
      position: relative;
      margin: 0 15px;
      .benben-tabbar-btn-text {
        text-align: center;
        font-size: 10px;
        position: absolute;
        z-index: 10;
        width: 100%;
        bottom: 7px;
      }
      .benben-tabbar-btn-img {
        position: absolute;
        left: 0;
      }
    }
    .benben-tabbar-item {
      display: flex;
      height: 100%;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      position: relative;
      .benben-tabbar-item-img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
::v-deep.benben-tabbar-item-msg {
  position: absolute;
  right: 18%;
  top: 5%;
  z-index: 10;
}
</style>
