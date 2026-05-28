<template>
	<view class="page">
		<view class="top-area">
			<view class="status-bar" :style="{ height: `${statusBarHeight}px` }"></view>
			<view class="top-bar">
				<text class="back" @click="goBack">‹</text>
				<text class="title">立即支付</text>
				<text class="placeholder"></text>
			</view>
		</view>

		<view class="amount-card">
			<text class="amount-label">支付金额</text>
			<view class="amount-row">
				<text class="currency">¥</text>
				<text class="amount">{{ displayAmount || orderMoney }}</text>
			</view>
			<text class="countdown" v-if="orderType != '1'">支付剩余时间：{{ countdownText }}</text>
			<!-- <text class="order">订单号：{{ displayOrderSn }}</text> -->
		</view>

		<!-- <view class="detail-card">
      <text class="section-title">订单详情</text>
      <text v-if="detailLoading" class="detail-empty">订单详情加载中...</text>
      <template v-else>
        <view class="detail-row">
          <text class="detail-label">订单编号</text>
          <text class="detail-value">{{ displayOrderSn }}</text>
        </view>
        <view class="detail-row" v-if="currentOrderDetail.order_money">
          <text class="detail-label">订单金额</text>
          <text class="detail-value"
            >¥{{ currentOrderDetail.order_money }}</text
          >
        </view>
        <view class="detail-row" v-if="currentOrderDetail.payable_money">
          <text class="detail-label">应付金额</text>
          <text class="detail-value"
            >¥{{ currentOrderDetail.payable_money }}</text
          >
        </view>
        <view class="detail-row" v-if="currentOrderDetail.goods_money">
          <text class="detail-label">商品总额</text>
          <text class="detail-value"
            >¥{{ currentOrderDetail.goods_money }}</text
          >
        </view>
        <view class="detail-row" v-if="currentOrderDetail.status_txt">
          <text class="detail-label">订单状态</text>
          <text class="detail-value">{{ currentOrderDetail.status_txt }}</text>
        </view>
        <view class="detail-row" v-if="currentOrderDetail.create_time">
          <text class="detail-label">下单时间</text>
          <text class="detail-value">{{ currentOrderDetail.create_time }}</text>
        </view>
      </template>
    </view> -->

		<view class="pay-card">
			<text class="section-title">选择支付方式</text>
			<text v-if="payTypeLoading" class="pay-empty">支付方式加载中...</text>
			<text v-else-if="payTypes.length === 0" class="pay-empty">暂无可用支付方式</text>
			<view v-for="item in payTypes" :key="item.type" class="pay-item" :class="{ active: payType === item.type }"
				@click="payType = item.type">
				<view class="pay-left">
					<image v-if="item.image" class="pay-image" :src="item.image" mode="aspectFit"></image>
					<view v-else class="pay-icon" :class="item.type">
						{{ item.shortName }}
					</view>
					<text class="pay-name">{{ item.name }}</text>
				</view>
				<view class="radio" :class="{ checked: payType === item.type }"></view>
			</view>
		</view>

		<button class="pay-button" :disabled="loading || payTypeLoading || detailLoading" @click="handlePay">
			{{ loading ? "支付中..." : detailLoading ? "加载中..." : "立即支付" }}
		</button>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from "vue";
	import {
		onLoad,
		onUnload
	} from "@dcloudio/uni-app";
	import {
		notifyH5PaySuccess,
		readShopPayTokenFromOptions,
	} from "@/utils/nativePayBridge.js";

	const API_BASE_URL = "https://shop.chongyueyue.cn/api/m20336";
	const API_HASH = {
		payTypes: "64424fe115688",
		wxpay: "645cc07566415",
		alipay: "645cc048d1f34",
		orderDetail: "62c92b9d5ada3",
		integralDetail: "6415509c196eb",
	};

	const getApiUrl = (hash) => `${API_BASE_URL}/${hash}`;

	const statusBarHeight = ref(0);
	const orderSn = ref("");
	const orderType = ref("3");
	const orderMoney = ref(0);
	const amount = ref("");
	const payType = ref("wxpay");
	const loading = ref(false);
	const payTypeLoading = ref(false);
	const detailLoading = ref(false);
	const countdownSeconds = ref(0);
	const timer = ref(null);
	const payTypes = ref([]);
	const orderDetail = ref({});
	const integralDetail = ref({});
	const token = ref("");

	const displayAmount = computed(() => amount.value || "0.00");
	const currentOrderDetail = computed(() =>
		orderType.value == "4" ? integralDetail.value : orderDetail.value,
	);
	const displayOrderSn = computed(
		() => currentOrderDetail.value.order_sn || orderSn.value || "暂无订单号",
	);
	const countdownText = computed(() => {
		const secondsTotal = Math.max(Number(countdownSeconds.value) || 0, 0);
		const days = Math.floor(secondsTotal / 86400);
		const secondsInDay = secondsTotal % 86400;
		const secondsInHour = secondsTotal % 3600;
		const hours = String(Math.floor(secondsInDay / 3600)).padStart(2, "0");
		const minutes = String(Math.floor(secondsInHour / 60)).padStart(2, "0");
		const seconds = String(secondsTotal % 60).padStart(2, "0");

		return days > 0 ?
			`${days}天 ${hours}:${minutes}:${seconds}` :
			`${hours}:${minutes}:${seconds}`;
	});

	onLoad((options = {}) => {
		const info = uni.getSystemInfoSync();
		statusBarHeight.value = info.safeAreaInsets?.top || info.statusBarHeight || 0;
		orderSn.value = options.order_sn || options.orderSn || "";
		orderType.value = String(options.order_type ?? "3");
		orderMoney.value = options.order_money || 0;
		amount.value = options.amount || "";
		token.value = readShopPayTokenFromOptions(options);
		if (!token.value) {
			console.warn("[native-pay] 未获取到商城 user-token，接口将提示未登录");
		}
		getPayTypes();
		getOrderDetail();
		startCountdown();
	});

	onUnload(() => {
		clearCountdown();
	});

	function getRequestHeader() {
		console.log(token.value, "toekn");
		if (!token.value) {
			return {
				"Content-Type": "application/json",
			};
		}
		return {
			"Content-Type": "application/json",
			"User-Token": token.value,
		};
	}

	function goBack() {
		uni.navigateBack();
	}

	function startCountdown() {
		clearCountdown();
		timer.value = setInterval(() => {
			if (countdownSeconds.value <= 0) {
				clearCountdown();
				return;
			}
			countdownSeconds.value -= 1;
		}, 1000);
	}

	function clearCountdown() {
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null;
		}
	}

	function handlePay() {
		if (!orderSn.value) {
			uni.showToast({
				title: "订单号不能为空",
				icon: "none",
			});
			return;
		}

		if (detailLoading.value) {
			uni.showToast({
				title: "订单详情加载中",
				icon: "none",
			});
			return;
		}

		if (!payType.value) {
			uni.showToast({
				title: "请选择支付方式",
				icon: "none",
			});
			return;
		}

		if (payType.value === "wxpay") {
			paymentByWxpay();
			return;
		}

		if (payType.value === "alipay") {
			paymentByAlipay();
		}
	}

	function getPayTypes() {
		if (!token.value) {
			uni.showToast({
				title: "您还没有登录，请先登录！",
				icon: "none",
			});
			return;
		}

		payTypeLoading.value = true;

		uni.request({
			url: getApiUrl(API_HASH.payTypes),
			method: "GET",
			header: getRequestHeader(),
			success: (res) => {
				console.log("支付方式回调", res);
				const result = res.data || {};

				if (result.code != 1) {
					uni.showToast({
						title: result.msg || "获取支付方式失败",
						icon: "none",
					});
					return;
				}

				const resultPayTypes = Array.isArray(result.data) ? result.data : [];
				payTypes.value = resultPayTypes
					.filter((item) => item.pay_type !== "balance")
					.map((item) => ({
						...item,
						type: item.pay_type,
						shortName: getPayShortName(item.pay_type, item.name),
					}));
				payType.value = payTypes.value.length > 0 ? payTypes.value[0].type : "";
			},
			fail: (err) => {
				console.error("获取支付方式失败", err);
				uni.showToast({
					title: "获取支付方式失败，请稍后重试",
					icon: "none",
				});
			},
			complete: () => {
				payTypeLoading.value = false;
			},
		});
	}

	function getPayShortName(type, name = "") {
		const shortNameMap = {
			wxpay: "微",
			alipay: "支",
		};

		return shortNameMap[type] || name.slice(0, 1) || "付";
	}

	function getOrderDetail() {
		if (!orderSn.value) return;
		if (orderType.value == "1") return;
		if (orderType.value == "4") {
			getIntegralDetail();
			return;
		}

		detailLoading.value = true;
		uni.request({
			url: getApiUrl(API_HASH.orderDetail),
			method: "POST",
			data: {
				order_sn: orderSn.value,
				order_type: "3",
			},
			header: getRequestHeader(),
			success: (res) => {
				console.log("订单详情回调", res);
				const result = res.data || {};

				if (result.code != 1) {
					uni.showToast({
						title: result.msg || "获取订单详情失败",
						icon: "none",
					});
					return;
				}

				orderDetail.value = result.data || {};
				amount.value = orderDetail.value.payable_money || amount.value;
				const remainSeconds = Number(orderDetail.value.cancel_surplus_second);
				if (!Number.isNaN(remainSeconds)) {
					countdownSeconds.value = remainSeconds;
				}
			},
			fail: (err) => {
				console.error("获取订单详情失败", err);
				uni.showToast({
					title: "获取订单详情失败，请稍后重试",
					icon: "none",
				});
			},
			complete: () => {
				detailLoading.value = false;
			},
		});
	}

	function getIntegralDetail() {
		detailLoading.value = true;
		uni.request({
			url: getApiUrl(API_HASH.integralDetail),
			method: "POST",
			data: {
				order_sn: orderSn.value,
			},
			header: getRequestHeader(),
			success: (res) => {
				console.log("积分订单详情回调", res);
				const result = res.data || {};

				if (result.code != 1) {
					uni.showToast({
						title: result.msg || "获取订单详情失败",
						icon: "none",
					});
					return;
				}

				integralDetail.value = result.data || {};
				amount.value =
					integralDetail.value.payable_money ||
					integralDetail.value.goods_money ||
					amount.value;
				const remainSeconds = Number(integralDetail.value.cancel_time);
				if (!Number.isNaN(remainSeconds)) {
					countdownSeconds.value = remainSeconds;
				}
			},
			fail: (err) => {
				console.error("获取积分订单详情失败", err);
				uni.showToast({
					title: "获取订单详情失败，请稍后重试",
					icon: "none",
				});
			},
			complete: () => {
				detailLoading.value = false;
			},
		});
	}

	function paymentByWxpay() {
		if (loading.value) return;
		loading.value = true;
		uni.request({
			url: getApiUrl(API_HASH.wxpay),
			method: "POST",
			data: {
				order_sn: orderSn.value,
				wxpaytype: "apppay",
			},
			header: getRequestHeader(),
			success: (res) => {
				console.log("微信支付参数回调", res);
				const result = res.data || {};

				if (result.code == 1) {
					requestPayment("wxpay", result.data);
					return;
				}

				loading.value = false;
				uni.showToast({
					title: result.msg || "订单无效，支付失败",
					icon: "none",
				});
			},
			fail: (err) => {
				console.error("获取微信支付参数失败", err);
				loading.value = false;
				uni.showToast({
					title: "获取支付参数失败，请稍后重试",
					icon: "none",
				});
			},
		});
	}

	function paymentByAlipay() {
		if (loading.value) return;
		loading.value = true;
		uni.request({
			url: getApiUrl(API_HASH.alipay),
			method: "POST",
			data: {
				order_sn: orderSn.value,
			},
			header: getRequestHeader(),
			success: (res) => {
				console.log("支付宝支付参数回调", res);
				const result = res.data || {};

				if (result.code == 1) {
					requestPayment("alipay", result.data);
					return;
				}

				loading.value = false;
				uni.showToast({
					title: result.msg || "订单无效，支付失败",
					icon: "none",
				});
			},
			fail: (err) => {
				console.error("获取支付宝支付参数失败", err);
				loading.value = false;
				uni.showToast({
					title: "获取支付参数失败，请稍后重试",
					icon: "none",
				});
			},
		});
	}

	function requestPayment(provider, orderInfo) {
		uni.requestPayment({
			provider,
			orderInfo,
			success: (res) => {
				console.log("支付成功", res);
				loading.value = false;
				uni.showToast({
					title: "支付成功",
					icon: "success",
				});

				notifyH5PaySuccess();

				setTimeout(() => {
					goBack();
				}, 1500);
			},
			fail: (err) => {
				console.log("支付失败", err);
				const isCancel = err.errMsg && err.errMsg.indexOf("cancel") !== -1;
				uni.showToast({
					title: isCancel ? "取消支付" : "支付失败，请稍后重试",
					icon: "none",
				});
				loading.value = false;
			},
		});
	}
</script>

<style scoped>
	page {
		background-color: #f4f5f7;
	}

	.page {
		min-height: 100vh;
		background-color: #f4f5f7;
	}

	.top-area {
		background-color: #ffffff;
	}

	.status-bar {
		width: 100%;
	}

	.top-bar {
		height: 96rpx;
		padding: 0 28rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.back,
	.placeholder {
		width: 80rpx;
		font-size: 58rpx;
		color: #222222;
	}

	.title {
		font-size: 34rpx;
		font-weight: 600;
		color: #222222;
	}

	.amount-card {
		margin: 24rpx;
		padding: 48rpx 28rpx;
		border-radius: 24rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.amount-label {
		font-size: 28rpx;
		color: #666666;
	}

	.amount-row {
		margin-top: 18rpx;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.currency {
		margin-bottom: 10rpx;
		font-size: 34rpx;
		color: #ff5000;
		font-weight: 600;
	}

	.amount {
		margin-left: 8rpx;
		font-size: 76rpx;
		line-height: 86rpx;
		color: #ff5000;
		font-weight: 700;
	}

	.countdown {
		margin-top: 18rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.order {
		margin-top: 14rpx;
		font-size: 24rpx;
		color: #999999;
	}

	.detail-card,
	.pay-card {
		margin: 24rpx;
		padding: 28rpx;
		border-radius: 24rpx;
		background-color: #ffffff;
	}

	.section-title {
		font-size: 30rpx;
		color: #222222;
		font-weight: 600;
	}

	.detail-empty {
		margin-top: 28rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.detail-row {
		min-height: 64rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #eeeeee;
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-label {
		font-size: 28rpx;
		color: #666666;
	}

	.detail-value {
		flex: 1;
		margin-left: 24rpx;
		font-size: 28rpx;
		color: #222222;
		text-align: right;
	}

	.pay-item {
		height: 112rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #eeeeee;
	}

	.pay-item:last-child {
		border-bottom: none;
	}

	.pay-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.pay-image,
	.pay-icon {
		width: 54rpx;
		height: 54rpx;
	}

	.pay-image {
		flex-shrink: 0;
	}

	.pay-icon {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #ffffff;
	}

	.pay-icon.wxpay {
		background-color: #1aad19;
	}

	.pay-icon.alipay {
		background-color: #1677ff;
	}

	.pay-name {
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #222222;
	}

	.pay-empty {
		margin-top: 28rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.radio {
		width: 36rpx;
		height: 36rpx;
		border: 2rpx solid #cccccc;
		border-radius: 50%;
	}

	.radio.checked {
		border: 10rpx solid #ff5000;
	}

	.pay-button {
		height: 88rpx;
		margin: 56rpx 40rpx 0;
		border-radius: 44rpx;
		background-color: #ff5000;
		color: #ffffff;
		font-size: 32rpx;
	}

	.pay-button[disabled] {
		opacity: 0.6;
	}
</style>