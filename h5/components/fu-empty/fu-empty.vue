<template>
  <view style="width: 100%" class="fu-empty">
    <view class="loading-wapper" v-if="!pagingListLoadedAll && !pagingListNoListData">
      <view class="loading-icon"></view>
      <text class="loading-txt">{{ $t('加载中') }}</text>
    </view>
    <view class="loading-wapper" v-if="pagingListLoadedAll && !pagingListNoListData && listDataLength != 0">
      <text class="loading-txt">{{ pagingListLoadedAllText }}</text>
    </view>
    <view v-if="((pagingListLoadedAll && pagingListNoListData) || (pagingListLoadedAll && listDataLength == 0)) && isLoadInit">
      <slot>
        <view class="public-page-empty">
          <image v-if="imageUrl" :src="imageUrl"></image>
          <image v-else :src="benbenImageSrcResolution(emptyImage + '.png', 'global')"></image>
          <view>{{ pagingListNoListDataText }}</view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'fu-empty',
  options: {
    virtualHost: true,
  },
  props: {
    pagingListLoadedAll: {
      type: Boolean,
      default: false,
    },
    pagingListNoListData: {
      type: Boolean,
      default: false,
    },
    listDataLength: {
      type: Number,
      default: 0,
    },
    pagingListLoadedAllText: {
      type: String,
      default() {
        return global.i18n.t('已加载全部')
      },
    },
    pagingListNoListDataText: {
      type: String,
      default() {
        return ''
      },
    },
    emptyImage: {
      type: String,
      default: 'order', //collect|order|message|coupons
    },
    imageUrl: {
      type: String,
      default: '',
    },
    isLoadInit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.fu-empty {
  color: var(--benben-loading-color, #999999);
  font-size: 24rpx;
  font-weight: normal;
}
.loading-wapper {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20upx;

  &.mj {
    display: flex;
  }
}

.loading-icon {
  margin: 0 10upx;
  width: 40upx;
  height: 40upx;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: a 1s steps(12) infinite;
  animation: a 1s steps(12) infinite;
  background: transparent url(resolution-image-path('loading.png')) no-repeat;
  background-size: 100%;
}

.loading-txt {
  line-height: 60upx;
}

@-webkit-keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes a {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

.public-page-empty {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 120upx 0 0 0;
  image {
    width: 300rpx;
    height: 300rpx;
  }
  .txt {
    font-size: 28upx;
    color: $uni-text-color;
    text-align: center;
    line-height: 100upx;
  }
}
</style>
