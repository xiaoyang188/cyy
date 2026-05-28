<template>
  <view class="float-main-tabbar" :class="`float-main-tabbar--${mode}`">
    <!--
      预留底部空间，避免 fixed tabbar 盖住页面内容
      （不同机型安全区不同，用 var(--benben-window-bottom) 兜底）
    -->
    <view class="float-main-tabbar__spacer" />

    <view v-if="mode === 'fab' && expanded" class="float-main-tabbar__mask" @tap="expanded = false"></view>

    <view v-if="mode === 'fab'" class="float-main-tabbar__fab-panel" :class="{ 'float-main-tabbar__fab-panel--show': expanded }">
      <view
        v-for="item in tabs"
        :key="item.key"
        class="float-main-tabbar__fab-item"
        :class="{ 'float-main-tabbar__fab-item--active': activeKey === item.key }"
        @tap.stop="onTap(item)"
      >
        <view class="float-main-tabbar__icon-box">
          <image class="float-main-tabbar__fab-icon" :src="iconSrc(item)" mode="aspectFit" />
          <text v-if="item.key === 'shopping' && cartNum" class="float-main-tabbar__badge">{{ cartNum }}</text>
        </view>
        <text class="float-main-tabbar__fab-text">{{ $t(item.i18n) }}</text>
      </view>
    </view>

    <view v-if="mode === 'fab'" class="float-main-tabbar__fab-trigger" @tap.stop="toggleExpanded">
      <view class="float-main-tabbar__fab-dots">
        <text class="float-main-tabbar__fab-dot"></text>
        <text class="float-main-tabbar__fab-dot"></text>
        <text class="float-main-tabbar__fab-dot"></text>
        <text class="float-main-tabbar__fab-dot"></text>
      </view>
      <text class="float-main-tabbar__fab-trigger-text">导航</text>
      <text v-if="cartNum" class="float-main-tabbar__badge float-main-tabbar__badge--trigger">{{ cartNum }}</text>
    </view>

    <view class="float-main-tabbar__dock">
      <view
        v-for="item in tabs"
        :key="item.key"
        class="float-main-tabbar__item"
        :class="{ 'float-main-tabbar__item--active': activeKey === item.key }"
        @tap.stop="onTap(item)"
      >
        <view class="float-main-tabbar__icon-box">
          <image class="float-main-tabbar__icon" :src="iconSrc(item)" mode="aspectFit" />
          <text v-if="item.key === 'shopping' && cartNum" class="float-main-tabbar__badge">{{ cartNum }}</text>
        </view>
        <text class="float-main-tabbar__text">{{ $t(item.i18n) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
const TAB_BAR_BASE = '/static/tab'

const TAB_ITEMS = [
  { key: 'home', path: '/pages/tabBar/home/home', i18n: '首页', iconOff: `${TAB_BAR_BASE}/tab_diy0.png`, iconOn: `${TAB_BAR_BASE}/tab_diy0_active.png` },
  {
    key: 'classification',
    path: '/pages/tabBar/classification/classification',
    i18n: '分类',
    iconOff: `${TAB_BAR_BASE}/tab_diy1.png`,
    iconOn: `${TAB_BAR_BASE}/tab_diy1_active.png`,
  },
  {
    key: 'shopping',
    path: '/pages/tabBar/shopping/shopping',
    i18n: '购物车',
    iconOff: `${TAB_BAR_BASE}/tab_diy2.png`,
    iconOn: `${TAB_BAR_BASE}/tab_diy2_active.png`,
  },
  { key: 'myhb', path: '/pages/tabBar/myhb/myhb', i18n: '个人中心', iconOff: `${TAB_BAR_BASE}/tab_diy3.png`, iconOn: `${TAB_BAR_BASE}/tab_diy3_active.png` },
]

export default {
  name: 'FloatMainTabbar',
  props: {
    mode: {
      type: String,
      default: 'fixed',
    },
    pagePath: {
      type: String,
      default: '',
    },
    active: {
      type: String,
      default: '',
    },
  },
  computed: {
    cartNum() {
      const num = this.localCartNum
      if (num > 99) return '99+'
      return num > 0 ? String(num) : ''
    },
    activeKey() {
      if (this.active && TAB_ITEMS.some((t) => t.key === this.active)) return this.active
      const hit = TAB_ITEMS.find((t) => t.path === this.pagePath)
      return hit ? hit.key : ''
    },
    storeCartNum() {
      return this.$store.state.cartNum
    }
  },
  data() {
    return { tabs: TAB_ITEMS, expanded: false, localCartNum: 0 }
  },
  watch: {
    storeCartNum: {
      handler(val) {
        this.localCartNum = val || 0
      },
      immediate: true
    }
  },
  mounted() {
    // 已在 pages.json 配置 tabBar，仅隐藏系统底栏，避免与自定义胶囊条重复
    uni.hideTabBar({ animation: false })
  },
  methods: {
    iconSrc(item) {
      return this.activeKey === item.key ? item.iconOn : item.iconOff
    },
    onTap(item) {
      this.expanded = false
      if (this.activeKey === item.key) {
        uni.pageScrollTo({ scrollTop: 0, duration: 280 })
        return
      }
      const url = item.path.startsWith('/') ? item.path : `/${item.path}`
      this.$urouter.switchTab(url)
    },
    toggleExpanded() {
      this.expanded = !this.expanded
    },
  },
}
</script>

<style lang="scss" scoped>
.float-main-tabbar {
  /* 统一高度变量，方便页面占位与 dock 对齐 */
  --float-main-tabbar-height: 88rpx;
}

.float-main-tabbar__spacer {
  /* 与 dock 距底一致，避免页面再叠一层安全区 */
  height: calc(var(--float-main-tabbar-height) + 18rpx + var(--benben-window-bottom, 0px));
}

.float-main-tabbar__dock {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(18rpx + var(--benben-window-bottom, 0px));
  z-index: 999;
  width: calc(100% - 32rpx);
  max-width: 710rpx;
  /* 与 padding 左右一致，用于计算选中高亮与外层胶囊同心的圆角 */
  --dock-pad-x: 18rpx;
  /* 外层 999rpx 在高度上夹成半高；内沿圆角 ≈ 半高 − 水平内边距 */
  --tab-active-edge-r: calc(var(--float-main-tabbar-height) / 2 - var(--dock-pad-x));
  padding: 6rpx var(--dock-pad-x);
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(16, 24, 40, 0.06);
  border-radius: 44rpx;
  box-shadow: 0 4rpx 12rpx rgba(16, 24, 40, 0.06);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  column-gap: 6rpx;
  box-sizing: border-box;
  min-height: var(--float-main-tabbar-height);
}

.float-main-tabbar__item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rpx 6rpx;
  /* 比外层小一圈的圆角，留出「环状」白边，层次更清楚 */
  border-radius: 24rpx;
  transition: background-color 0.2s ease;
}

.float-main-tabbar__item--active {
  background-color: rgba(184, 36, 65, 0.08);
}

/* 首尾选中：朝外一侧用大圆角，与白色底胶囊内沿对齐；朝内一侧保持与中间项一致 */
.float-main-tabbar__item--active:first-child {
  border-top-left-radius: var(--tab-active-edge-r);
  border-bottom-left-radius: var(--tab-active-edge-r);
  border-top-right-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}

.float-main-tabbar__item--active:last-child {
  border-top-right-radius: var(--tab-active-edge-r);
  border-bottom-right-radius: var(--tab-active-edge-r);
  border-top-left-radius: 24rpx;
  border-bottom-left-radius: 24rpx;
}

.float-main-tabbar__icon {
  width: 42rpx;
  height: 42rpx;
}

.float-main-tabbar__text {
  margin-top: 0rpx;
  font-size: 19rpx;
  font-weight: 400;
  color: #666666;
  line-height: 1.2;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.float-main-tabbar__item--active .float-main-tabbar__text {
  color: #b82441;
  font-weight: 500;
}

.float-main-tabbar--fab .float-main-tabbar__spacer,
.float-main-tabbar--fab .float-main-tabbar__dock {
  display: none;
}

.float-main-tabbar__mask {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(15, 23, 42, 0.08);
}

.float-main-tabbar__fab-trigger {
  position: fixed;
  right: 24rpx;
  bottom: calc(24rpx + var(--benben-window-bottom, 0px));
  z-index: 1000;
  width: 92rpx;
  height: 92rpx;
  border-radius: 46rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 247, 249, 0.98) 100%);
  border: 1rpx solid rgba(184, 36, 65, 0.12);
  box-shadow: 0 12rpx 28rpx rgba(16, 24, 40, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.float-main-tabbar__fab-dots {
  width: 28rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rpx;
}

.float-main-tabbar__fab-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #b82441;
}

.float-main-tabbar__fab-trigger-text {
  margin-top: 6rpx;
  font-size: 18rpx;
  line-height: 1;
  color: #b82441;
  font-weight: 600;
}

.float-main-tabbar__fab-panel {
  position: fixed;
  right: 24rpx;
  bottom: calc(132rpx + var(--benben-window-bottom, 0px));
  z-index: 999;
  width: 280rpx;
  padding: 14rpx;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.98);
  border: 1rpx solid rgba(184, 36, 65, 0.08);
  box-shadow: 0 16rpx 40rpx rgba(16, 24, 40, 0.12);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10rpx;
  opacity: 0;
  pointer-events: none;
  transform: translateY(16rpx) scale(0.96);
  transform-origin: bottom right;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.float-main-tabbar__fab-panel--show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.float-main-tabbar__fab-item {
  min-height: 92rpx;
  padding: 10rpx 8rpx;
  border-radius: 22rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.8);
}

.float-main-tabbar__fab-item--active {
  background: rgba(184, 36, 65, 0.08);
}

.float-main-tabbar__fab-icon {
  width: 38rpx;
  height: 38rpx;
}

.float-main-tabbar__fab-text {
  margin-top: 6rpx;
  font-size: 20rpx;
  color: #475467;
  line-height: 1.2;
}

.float-main-tabbar__fab-item--active .float-main-tabbar__fab-text {
  color: #b82441;
  font-weight: 600;
}

.float-main-tabbar--card {
  width: 100%;
}

.float-main-tabbar--card .float-main-tabbar__spacer {
  display: none;
}

.float-main-tabbar--card .float-main-tabbar__dock {
  position: relative;
  left: auto;
  transform: none;
  bottom: auto;
  width: 100%;
  max-width: none;
  padding: 8rpx 14rpx;
  border-radius: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(16, 24, 40, 0.05);
}

.float-main-tabbar--card .float-main-tabbar__item {
  min-height: 72rpx;
  border-radius: 20rpx;
}

.float-main-tabbar--card .float-main-tabbar__item--active:first-child {
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.float-main-tabbar--card .float-main-tabbar__item--active:last-child {
  border-top-left-radius: 20rpx;
  border-bottom-left-radius: 20rpx;
}

.float-main-tabbar__icon-box {
  position: relative;
  display: inline-flex;
}

.float-main-tabbar__badge {
  position: absolute;
  top: -10rpx;
  right: -16rpx;
  background-color: #ff3b30;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 28rpx;
  min-width: 28rpx;
  padding: 0 6rpx;
  border-radius: 14rpx;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  border: 2rpx solid #ffffff;
  z-index: 10;
}

.float-main-tabbar__badge--trigger {
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
}
</style>
