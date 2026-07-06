<template>
  <page-body>
    <view class="page">
      <view class="member-header-bg"></view>

      <view class="member-nav benben-position-layout" :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }">
        <view class="member-nav__inner">
          <view class="member-nav__side" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 member-nav__back" style="color: #fff">&#xE794;</text>
          </view>
          <text class="member-nav__title" style="color: #fff">{{ $t('会员权益') }}</text>
          <view class="member-nav__side"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>

      <!-- 加载骨架 -->
      <view v-if="pageLoading && isLogin" class="member-body">
        <view class="member-skeleton member-skeleton--hero"></view>
        <view class="member-skeleton member-skeleton--stats"></view>
        <view class="member-skeleton member-skeleton--grid"></view>
        <view class="member-skeleton member-skeleton--rules"></view>
      </view>

      <view v-else class="member-body">
        <!-- 未登录 -->
        <view v-if="!isLogin" class="guest-card" @tap.stop="toLoginDiy">
          <view class="guest-card__icon-wrap">
            <image class="guest-card__icon" mode="aspectFill" :src="STATIC_URL + '331.png'"></image>
          </view>
          <text class="guest-card__title">{{ $t('登录查看会员权益') }}</text>
          <text class="guest-card__desc">{{ $t('登录后可查看等级、折扣与专属特权') }}</text>
          <view class="guest-card__btn">
            <text>{{ $t('立即登录') }}</text>
          </view>
        </view>

        <template v-else>
          <!-- 会员主卡片 -->
          <view class="hero-card" :class="{ 'hero-card--vip': isVip }" style="margin-top: 32rpx">
            <view class="hero-card__shine"></view>
            <view class="hero-card__top">
              <view class="hero-card__avatar-wrap">
                <image class="hero-card__avatar" mode="aspectFill" :src="userAvatar"></image>
                <!-- <view v-if="levelIcon" class="hero-card__avatar-badge">
                  <image mode="aspectFit" :src="levelIcon"></image>
                </view> -->
              </view>
              <view class="hero-card__info">
                <text class="hero-card__name">{{ userNickname }}</text>
                <view class="hero-card__level-pill">
                  <text>{{ levelName }}</text>
                </view>
                <text class="hero-card__slogan">{{ heroSlogan }}</text>
              </view>
            </view>

            <!-- 非会员提示 -->
            <view v-if="!isVip" class="hero-card__tip-bar">
              <text>{{ $t('开通会员享专属折扣与身份标识，永久有效') }}</text>
            </view>

            <!-- 会员进度 -->
            <view v-if="isVip && dataDetails.is_max_level != '1'" class="hero-card__progress">
              <view class="hero-card__progress-head">
                <view class="hero-card__progress-level">
                  <text class="hero-card__progress-current">{{ dataDetails.name }}</text>
                  <text class="hero-card__progress-arrow">→</text>
                  <text class="hero-card__progress-next">{{ dataDetails.next_level_name }}</text>
                </view>
                <text class="hero-card__progress-percent">{{ progressWidth }}%</text>
              </view>
              <view class="hero-card__progress-track">
                <view class="hero-card__progress-fill" :style="{ width: progressWidth + '%' }"></view>
              </view>
              <view v-if="upgradeHint" class="hero-card__progress-foot">
                <text>{{ upgradeHint }}</text>
              </view>
            </view>
            <view v-else-if="isVip" class="hero-card__progress hero-card__progress--max">
              <text>
                {{ $t('累计消费') }}
                <text class="hero-card__highlight">{{ dataDetails.total_consumption_money || 0 }}</text>
                {{ $t('元') }} · {{ $t('已达最高等级') }}
              </text>
            </view>
          </view>

          <!-- 数据概览 -->
          <view class="stats-row">
            <view class="stats-row__item">
              <text class="stats-row__value" style="color: #fd513d">{{ statsConsumption }}</text>
              <text class="stats-row__label">{{ $t('累计消费(元)') }}</text>
            </view>
            <view class="stats-row__divider"></view>
            <view class="stats-row__item">
              <text class="stats-row__value stats-row__value--gold" style="color: #fd513d">{{ statsDiscount }}</text>
              <text class="stats-row__label">{{ $t('会员折扣') }}</text>
            </view>
            <view class="stats-row__divider"></view>
            <view class="stats-row__item">
              <text class="stats-row__value" style="color: #fd513d">{{ statsNextLevel }}</text>
              <text class="stats-row__label">{{ $t('下一等级') }}</text>
            </view>
          </view>

          <!-- 权益亮点 -->
          <view class="section-block">
            <view class="section-block__head">
              <text class="section-block__title">{{ $t('尊享权益') }}</text>
              <text class="section-block__sub">{{ $t('会员专属特权一览') }}</text>
            </view>
            <view class="privilege-grid">
              <view
                v-for="(item, index) in privilegeHighlights"
                :key="index"
                class="privilege-grid__item"
                :class="{ 'privilege-grid__item--active': item.active }"
              >
                <view class="privilege-grid__icon" :class="'privilege-grid__icon--' + item.type">
                  <text>{{ item.emoji }}</text>
                </view>
                <text class="privilege-grid__name">{{ item.title }}</text>
                <text class="privilege-grid__desc">{{ item.desc }}</text>
                <view v-if="item.active" class="privilege-grid__tag">
                  <text>{{ $t('已享') }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 特权详情 -->
          <view class="section-block">
            <view class="section-block__head">
              <text class="section-block__title">{{ $t('特权说明') }}</text>
            </view>
            <view class="rules-card">
              <view v-if="privilegeContent" class="rules-card__content">
                <jyf-parser class="rules-card__parser" :html="privilegeContent | richTextFormat"></jyf-parser>
              </view>
              <view v-else class="rules-card__empty">
                <text class="rules-card__empty-icon">📋</text>
                <text class="rules-card__empty-text">{{ $t('暂无详细说明，请联系客服了解') }}</text>
              </view>
            </view>
          </view>
        </template>

        <view class="member-body__safe-bottom" :class="{ 'member-body__safe-bottom--cta': showUpgradeBtn }"></view>
      </view>

      <!-- 底部升级按钮 -->
      <view v-if="showUpgradeBtn" class="bottom-cta benben-position-layout">
        <view class="bottom-cta__inner">
          <view class="bottom-cta__info">
            <text class="bottom-cta__label">{{ $t('升级至') }}{{ dataDetails.next_level_name || $t('更高等级') }}</text>
            <text v-if="upgradeHint" class="bottom-cta__sub">{{ upgradeHint }}</text>
          </view>
          <view class="bottom-cta__btn" @tap.stop="goUpgrade">
            <text>{{ $t('立即升级') }}</text>
          </view>
        </view>
      </view>
    </view>
  </page-body>
</template>
<script>
export default {
  data() {
    return {
      pageLoading: false,
      dataMessage: {
        nickname: '',
        avatar: '',
        userlevel_id: 0,
        total_consumption_money: '',
      },
      dataDetails: {
        name: '',
        icon: '',
        levelid: '',
        content: '',
        intro: '',
        empirical: '',
        next_speed: 0,
        next_level_name: '',
        is_max_level: '',
        total_consumption_money: '',
        discount: '',
      },
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token
    },
    isVip() {
      const levelId = Number(this.dataDetails.levelid || this.dataMessage.userlevel_id || 0)
      return levelId > 0
    },
    userNickname() {
      return this.dataMessage.nickname || this.$t('会员用户')
    },
    userAvatar() {
      return this.dataMessage.avatar || this.STATIC_URL + '331.png'
    },
    levelName() {
      return this.dataDetails.name || (this.isVip ? 'Lv.1' : 'Lv.0')
    },
    levelIcon() {
      return this.dataDetails.icon || (this.isVip ? this.STATIC_URL + '1678.png' : this.STATIC_URL + '1676.png')
    },
    progressWidth() {
      const speed = Number(this.dataDetails.next_speed || 0)
      return Math.min(Math.max(Math.round(speed), 0), 100)
    },
    privilegeContent() {
      return this.dataDetails.content || ''
    },
    upgradeHint() {
      return (this.dataDetails.intro || '').trim()
    },
    discountText() {
      return this.formatMemberDiscount(this.dataDetails.discount)
    },
    heroSlogan() {
      if (this.isVip) {
        return this.discountText ? this.$t('尊贵身份 · 全场') + this.discountText + this.$t('特享') : this.$t('尊贵身份 · 会员特享')
      }
      return this.$t('开通会员，解锁专属折扣与特权')
    },
    statsConsumption() {
      const val = this.dataDetails.total_consumption_money || this.dataMessage.total_consumption_money || 0
      return val
    },
    statsDiscount() {
      return this.discountText || '--'
    },
    statsNextLevel() {
      if (this.dataDetails.is_max_level == '1') return this.$t('已满级')
      return this.dataDetails.next_level_name || '--'
    },
    showUpgradeBtn() {
      return this.isLogin && this.dataDetails.is_max_level != '1'
    },
    privilegeHighlights() {
      const active = this.isVip
      const discount = this.discountText
      return [
        {
          type: 'discount',
          emoji: '💰',
          title: discount || this.$t('专属折扣'),
          desc: discount ? this.$t('全场商品享会员价') : this.$t('开通即享折扣优惠'),
          active,
        },
        {
          type: 'badge',
          emoji: '👑',
          title: this.$t('身份标识'),
          desc: this.$t('专属会员等级徽章'),
          active,
        },
      ]
    },
  },
  onShow() {
    if (this.isLogin) {
      this.fetchMemberData()
    }
  },
  onPullDownRefresh() {
    if (this.isLogin) {
      this.fetchMemberData(true)
    } else {
      uni.stopPullDownRefresh()
    }
  },
  methods: {
    formatMemberDiscount(val) {
      const n = parseFloat(val)
      if (!val || isNaN(n)) return ''
      let zhe = n > 10 ? n / 10 : n
      if (zhe >= 10 || zhe <= 0) return ''
      const text = Number.isInteger(zhe) ? String(zhe) : zhe.toFixed(1).replace(/\.0$/, '')
      return text + this.$t('折')
    },
    goUpgrade() {
      this.$urouter.navigateTo('/pages/sy/gift/gift')
    },
    async fetchMemberData(fromRefresh = false) {
      if (!fromRefresh) this.pageLoading = true
      try {
        await Promise.all([this.fetchUserInfo(), this.fetchLevelDetails()])
      } finally {
        this.pageLoading = false
        if (fromRefresh) uni.stopPullDownRefresh()
      }
    },
    async fetchUserInfo() {
      const res = await this.$api.get(global.apiUrls.post5c78c4772da97, {})
      if (res.data.code != 1) {
        this.$message.info(res.data.msg)
        return
      }
      this.dataMessage = res.data.data || this.dataMessage
    },
    async fetchLevelDetails() {
      const res = await this.$api.get(global.apiUrls.post636de668c7eb0, {})
      if (res.data.code != 1) {
        this.$message.info(res.data.msg)
        return
      }
      this.dataDetails = { ...this.dataDetails, ...(res.data.data || {}) }
    },
  },
}
</script>
<style lang="scss" scoped>
$primary: #f9bfb8;
$primary-dark: #e8968e;
$primary-darker: #d4766e;
$primary-light: #fdf0ee;
$primary-bg: #fdf5f4;
$text-dark: #5c3d38;
$text-accent: #c96860;

.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: $primary-bg;
  position: relative;
}

.member-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 420rpx;
  background: linear-gradient(180deg, $primary-dark 0%, $primary 55%, $primary-bg 100%);
  pointer-events: none;
}

.member-nav {
  z-index: 10;
  top: 0;
  background: transparent;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    height: 88rpx;
  }

  &__side {
    width: 80rpx;
  }

  &__back {
    font-size: 36rpx;
    color: $text-dark;
  }

  &__title {
    font-size: 34rpx;
    font-weight: 600;
    color: $text-dark;
    letter-spacing: 2rpx;
  }
}

.member-body {
  position: relative;
  z-index: 1;
  padding: 0 32rpx 0;
  margin-top: -16rpx;

  &__safe-bottom {
    height: 48rpx;

    &--cta {
      height: calc(140rpx + env(safe-area-inset-bottom));
    }
  }
}

// 骨架屏
.member-skeleton {
  border-radius: 24rpx;
  background: linear-gradient(90deg, #f5e8e6 25%, $primary-bg 50%, #f5e8e6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  margin-bottom: 24rpx;

  &--hero {
    height: 320rpx;
  }

  &--stats {
    height: 140rpx;
  }

  &--grid {
    height: 280rpx;
  }

  &--rules {
    height: 200rpx;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// 未登录
.guest-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64rpx 48rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06);

  &__icon-wrap {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary-light, $primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;
    border: 4rpx solid rgba($primary-dark, 0.3);
  }

  &__icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
  }

  &__title {
    font-size: 34rpx;
    font-weight: 700;
    color: $text-dark;
    line-height: 48rpx;
    margin-bottom: 12rpx;
  }

  &__desc {
    font-size: 26rpx;
    color: #999;
    line-height: 38rpx;
    text-align: center;
    margin-bottom: 40rpx;
  }

  &__btn {
    padding: 0 64rpx;
    height: 80rpx;
    background: linear-gradient(90deg, $primary, $primary-dark);
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba($primary-darker, 0.35);

    text {
      font-size: 28rpx;
      font-weight: 600;
      color: #fff;
    }
  }
}

// 主卡片
.hero-card {
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 24rpx;

  &--vip {
    background: linear-gradient(145deg, #fff 0%, $primary-light 100%);
  }

  &__shine {
    position: absolute;
    top: -60rpx;
    right: -40rpx;
    width: 280rpx;
    height: 280rpx;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
    pointer-events: none;
  }

  &__top {
    display: flex;
    align-items: center;
    padding: 40rpx 36rpx 28rpx;
  }

  &__avatar-wrap {
    position: relative;
    flex-shrink: 0;
    margin-right: 28rpx;
  }

  &__avatar {
    width: 112rpx;
    height: 112rpx;
    border-radius: 50%;
    border: 4rpx solid rgba(255, 255, 255, 0.8);
    background: #fff;
    box-shadow: 0 4rpx 16rpx rgba($primary-darker, 0.15);
  }

  &__avatar-badge {
    position: absolute;
    bottom: -4rpx;
    right: -4rpx;
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);

    image {
      width: 32rpx;
      height: 28rpx;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    display: block;
    font-size: 36rpx;
    font-weight: 700;
    color: $text-dark;
    line-height: 50rpx;
    margin-bottom: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__level-pill {
    display: inline-flex;
    padding: 4rpx 20rpx;
    background: linear-gradient(90deg, $primary, $primary-dark);
    border-radius: 20rpx;
    margin-bottom: 10rpx;

    text {
      font-size: 22rpx;
      font-weight: 600;
      color: #fff;
      line-height: 32rpx;
    }
  }

  &__slogan {
    display: block;
    font-size: 24rpx;
    color: $text-accent;
    line-height: 34rpx;
  }

  &__tip-bar {
    margin: 0 36rpx 36rpx;
    padding: 20rpx 24rpx;
    background: rgba($primary, 0.35);
    border-radius: 16rpx;
    border: 1rpx solid rgba($primary-dark, 0.25);

    text {
      font-size: 24rpx;
      color: $text-accent;
      line-height: 36rpx;
    }
  }

  &__progress {
    margin: 0 36rpx 36rpx;
    padding: 24rpx;
    background: $primary-light;
    border-radius: 16rpx;

    &--max {
      padding: 20rpx 36rpx 36rpx;

      text {
        font-size: 24rpx;
        color: $text-accent;
        line-height: 34rpx;
      }
    }
  }

  &__progress-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
  }

  &__progress-level {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__progress-current {
    font-size: 26rpx;
    font-weight: 700;
    color: $text-dark;
    margin-right: 8rpx;
  }

  &__progress-arrow {
    font-size: 22rpx;
    color: $primary-dark;
    margin-right: 8rpx;
  }

  &__progress-next {
    font-size: 26rpx;
    font-weight: 600;
    color: $text-accent;
  }

  &__progress-max {
    font-size: 22rpx;
    color: $text-accent;
    background: rgba($primary, 0.45);
    padding: 2rpx 12rpx;
    border-radius: 8rpx;
  }

  &__progress-percent {
    font-size: 28rpx;
    font-weight: 700;
    color: $text-accent;
  }

  &__progress-track {
    position: relative;
    height: 12rpx;
    background: rgba($primary, 0.5);
    border-radius: 8rpx;
    margin-bottom: 16rpx;
  }

  &__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $primary, $primary-dark);
    border-radius: 6rpx;
    transition: width 0.6s ease;
  }

  &__progress-foot {
    text {
      font-size: 22rpx;
      color: $text-accent;
      line-height: 32rpx;
    }
  }

  &__highlight {
    font-weight: 700;
    color: $text-accent;
    margin: 0 4rpx;
  }
}

// 数据概览
.stats-row {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx 0;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__value {
    font-size: 36rpx;
    font-weight: 700;
    color: $text-dark;
    line-height: 50rpx;
    margin-bottom: 6rpx;

    &--gold {
      color: $text-accent;
    }
  }

  &__label {
    font-size: 22rpx;
    color: #999;
    line-height: 30rpx;
  }

  &__divider {
    width: 1rpx;
    height: 60rpx;
    background: rgba($primary, 0.5);
  }
}

// 区块
.section-block {
  margin-bottom: 24rpx;

  &__head {
    margin-bottom: 20rpx;
  }

  &__title {
    display: block;
    font-size: 32rpx;
    font-weight: 700;
    color: $text-dark;
    line-height: 44rpx;
    margin-bottom: 4rpx;
  }

  &__sub {
    display: block;
    font-size: 24rpx;
    color: #999;
    line-height: 34rpx;
  }
}

// 权益网格
.privilege-grid {
  display: flex;

  &__item {
    flex: 1;
    margin-right: 16rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28rpx 16rpx 24rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
    border: 2rpx solid transparent;
    transition: border-color 0.2s;

    &--active {
      border-color: rgba($primary-dark, 0.35);
      background: $primary-light;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__icon {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;
    font-size: 36rpx;

    &--discount {
      background: linear-gradient(135deg, $primary-light, $primary);
    }

    &--badge {
      background: linear-gradient(135deg, #fce8e6, $primary);
    }

    &--forever {
      background: linear-gradient(135deg, #fdf0ee, #f5d4d0);
    }
  }

  &__name {
    font-size: 24rpx;
    font-weight: 600;
    color: $text-dark;
    line-height: 34rpx;
    text-align: center;
    margin-bottom: 6rpx;
  }

  &__desc {
    font-size: 20rpx;
    color: #999;
    line-height: 28rpx;
    text-align: center;
  }

  &__tag {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    padding: 2rpx 10rpx;
    background: $primary-dark;
    border-radius: 8rpx;

    text {
      font-size: 18rpx;
      color: #fff;
      line-height: 26rpx;
    }
  }
}

// 特权说明
.rules-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  &__content {
    color: #666;
    font-size: 26rpx;
    line-height: 44rpx;
  }

  &__parser {
    color: #666;
    font-size: 26rpx;
    line-height: 44rpx;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32rpx 0;
  }

  &__empty-icon {
    font-size: 48rpx;
    margin-bottom: 16rpx;
  }

  &__empty-text {
    font-size: 24rpx;
    color: #999;
    line-height: 36rpx;
  }
}

// 底部 CTA
.bottom-cta {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: #fff;
  border-top: 1rpx solid #eee;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.04);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 32rpx;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__label {
    display: block;
    font-size: 28rpx;
    font-weight: 600;
    color: $text-dark;
    line-height: 40rpx;
  }

  &__sub {
    display: block;
    font-size: 22rpx;
    color: $text-accent;
    line-height: 32rpx;
    margin-top: 2rpx;
  }

  &__btn {
    flex-shrink: 0;
    margin-left: 24rpx;
    padding: 0 48rpx;
    height: 80rpx;
    background: linear-gradient(90deg, $primary, $primary-dark);
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba($primary-darker, 0.35);

    text {
      font-size: 28rpx;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>
