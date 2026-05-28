<template>
  <view class="container">
    <view class="top-area">
      <view
        class="status-bar"
        :style="{ height: `${statusBarHeight}px` }"
      ></view>
      <view class="top-bar">
        <text class="title">商城</text>
      </view>
    </view>
    <view class="shop" style="width: 100%; margin-top: 30rpx">
      <web-view :src="webPath" @message="onMessage"></web-view>
    </view>
    <!-- <scroll-view
      class="scroll-shop"
      scroll-y="true"
      @scrolltolower="loadMore"
      refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      refresher-background="#F4F5F7"
    >
      <view class="shop-list">
        <view
          class="shop-item"
          v-for="item in shopList"
          :key="item.code"
          @click="itemTap(item)"
        >
          <image
            :src="item.attribute.picList[0]"
            mode="aspectFill"
            class="shop-img"
          ></image>
          <view class="shop-info">
            <text class="shop-title">{{ item.name }}</text>
            <view class="price-area">
              <text class="yuan">¥</text>
              <text class="shop-price">{{ item.price }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="loading-text" v-if="loading">加载中...</view>
      <view class="loading-text" v-if="noMore">没有更多了</view>
    </scroll-view> -->
  </view>
</template>

<script setup>
import { onLoad, onUnload } from "@dcloudio/uni-app";
import { ref } from "vue";
import { openSchema, canOpenURL } from "@/uni_modules/uts-openSchema";
import { getProductList } from "@/api/api/shop.js";
import {
  normalizeWebviewMessage,
  navigateToNativePay,
} from "@/utils/nativePayBridge.js";
const statusBarHeight = ref(0);
const shopList = ref([]);
const showList = ref([]);
const loading = ref(false);
const noMore = ref(false);
const isRefreshing = ref(false);
const pageNo = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
const TOKEN = ref(" d3bb4681-552f-d05b-4179-b593e430e9af"); //接口传参
const webPath = ref(
  "http://10.10.9.105:8080/#/?__app_webview=1&user_token=" + TOKEN.value,
); //本地
// const webPath = ref(
//   "https://shop.chongyueyue.cn/web/#/?__app_webview=1&user_token=" + TOKEN,
// );

// #ifndef H5
let keyboardHandler = null;
// #endif

onLoad(() => {
  let info = uni.getSystemInfoSync();
  statusBarHeight.value = info.safeAreaInsets.top;

  getProduct();

  // #ifndef H5
  keyboardHandler = (res) => {
    if (res.height > 0) {
      uni.hideTabBar({ animation: false });
    } else {
      uni.showTabBar({ animation: false });
    }
  };
  uni.onKeyboardHeightChange(keyboardHandler);
  // #endif
});

onUnload(() => {
  // #ifndef H5
  if (keyboardHandler) {
    uni.offKeyboardHeightChange(keyboardHandler);
    keyboardHandler = null;
  }
  uni.showTabBar({ animation: false });
  // #endif
});

function getProduct() {
  getProductList({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  })
    .then((res) => {
      console.log(res);
      totalPage.value = res.data.totalCount;
      shopList.value = res.data.list;
      isRefreshing.value = false; // 停止刷新动画
    })
    .catch((err) => {
      isRefreshing.value = false; // 失败也要停止动画
      console.error("获取列表失败", err);
    });
}

const onRefresh = () => {
  isRefreshing.value = true;
  pageNo.value = 1;
  noMore.value = false;
  loading.value = false;
  shopList.value = []; // 可选：清空列表，或者等待请求成功替换
  getProduct();
};

const loadMore = () => {
  if (loading.value || noMore.value) return;
  loading.value = true;

  pageNo.value++;
  getProductList({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  })
    .then((res) => {
      loading.value = false;
      totalPage.value = res.data.totalCount;
      if (res.data.list && res.data.list.length > 0) {
        shopList.value.push(...res.data.list);
      }

      // 如果当前数据量达到或超过总数，或者返回列表为空，则标记没有更多
      if (
        shopList.value.length >= totalPage.value ||
        !res.data.list ||
        res.data.list.length === 0
      ) {
        noMore.value = true;
      }
    })
    .catch((err) => {
      loading.value = false;
      pageNo.value--; // 请求失败回退页码
      console.error("加载失败", err);
    });
};

const itemTap = (item) => {
  console.log(item.attribute.urlList);
  let urlList = item.attribute.urlList;
  if (canOpenURL(urlList.find((it) => it.platform == 1).url)) {
    //#ifdef APP-HARMONY
    openSchema(urlList.find((it) => it.platform == 4).url);
    //#endif
    //#ifndef APP-HARMONY
    openSchema(urlList.find((it) => it.platform == 1).url);
    //#endif
  } else {
    let info = uni.getSystemInfoSync();
    uni.showModal({
      title: "提示",
      content: `您没有安装淘宝，${
        info.platform == "ios" || info.platform == "harmonyos" ? "是否" : "请"
      }前往应用商店安装`,
      success(res) {
        if (res.confirm) {
          //#ifdef APP-HARMONY
          openSchema(
            "https://appgallery.huawei.com/app/detail?id=com.taobao.taobao4hmos",
          );
          //#endif
          //#ifndef APP-HARMONY
          if (info.platform == "ios") {
            openSchema("itms-apps://itunes.apple.com/app/id387682726");
          }
          //#endif
        }
      },
    });
  }
};

const toWebView = () => {
  uni.navigateTo({
    url: `/pages/shop/web-view?webPath=${encodeURIComponent(webPath.value)}`,
  });
};

const onMessage = (event) => {
  const data = normalizeWebviewMessage(event);

  if (!data || data.action !== "openNativePay") return;

  navigateToNativePay({
    orderSn: data.order_sn || data.orderSn,
    orderType: data.order_type ?? "3",
    amount: data.amount ?? "",
    token: data.token ?? "",
  });
};
</script>

<style>
page {
  background-color: #f4f5f7;
}

view {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.container {
  width: 100vw;
  height: 100vh;
}

.top-area {
  width: 100%;
  background-color: white;
  background-image: url("/static/new/bg-add2.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

.status-bar {
  /* background-color: white; */
  width: 100%;
}

.top-bar {
  /* background-color: white; */
  width: 100%;
  height: 96rpx;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 34rpx;
  font-weight: bold;
}

.scroll-shop {
  flex: 1;
  overflow: hidden;
}

.shop-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20rpx;
}

.shop-item {
  width: 48%;
  background-color: white;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.shop-img {
  width: 100%;
  height: 315rpx;
  background-color: #eee;
}

.shop-info {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
}

.shop-title {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 10rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.price-area {
  flex-direction: row;
  align-items: end;
  gap: 10rpx;
}

.yuan {
  font-size: 20rpx;
  color: #ff5000;
  font-weight: bold;
  margin-bottom: 2rpx;
}

.shop-price {
  font-size: 32rpx;
  color: #ff5000;
  font-weight: bold;
}

.loading-text {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
  width: 100%;
}
</style>
