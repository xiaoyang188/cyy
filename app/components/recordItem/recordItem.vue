<template>
	<view class="item" @click="handleClick">
		<view class="current-location">
			<image :src="darkMode=='light'?'/static/imgs/correct/icon-correction.png':'/static/imgs/correct/icon-correction-light.png'"></image>
			<text class="current-location-text">{{ item.address }}</text>
		</view>
		<view class="item-info">
			<text class="left">原地址：</text>
			<text class="right">{{ addressOrigin || '---' }}</text>
		</view>
		<view class="item-info">
			<text class="left">纠偏日期：</text>
			<text class="right">{{ item.createTime }}</text>
		</view>
		<view class="item-info">
			<text class="left">纠偏结果：</text>
			<text class="right isSuccess">成功</text>
		</view>
		<!-- 编辑按钮插槽 -->
		<slot name="edit-btn"></slot>
		<view class="del-com" v-if="isEdit">
			<image
				:src="getSel ? '/static/imgs/correct/img-ceckbox-sel.png' : '/static/imgs/correct/img-chackbox-noSel.png'"
				class="img"></image>
		</view>
	</view>
</template>

<script>
	import util from '/common/util';
	export default {
		props: {
			darkMode:String,
			isEdit: Boolean,
			item: Object,
			deleteItem: Array
		},
		data() {
			return {
				addressOrigin: '', // 原始地址
				// 添加缓存
				cachedAddresses: {}, // 缓存已获取的地址
				isRequesting: false // 防止重复请求
			}
		},
		computed: {
			getSel() {
				return this.deleteItem.some(deletedItem => this.item.id === deletedItem.id);
			},
			// 获取原始经纬度
			originalLocation() {
				if (this.item.originalLatitude && this.item.originalLongitude) {
					return {
						latitude: this.item.originalLatitude,
						longitude: this.item.originalLongitude
					}
				}
				return null;
			},
			// 生成缓存key
			cacheKey() {
				if (!this.originalLocation) return '';
				return `${this.originalLocation.longitude}_${this.originalLocation.latitude}`;
			}
		},
		watch: {
			// 优化：只在必要的时候获取地址
			item: {
				immediate: true,
				handler(newVal, oldVal) {
					// 只有在原始经纬度变化且没有缓存时才获取地址
					if (this.originalLocation && !this.cachedAddresses[this.cacheKey]) {
						// 防抖处理，避免频繁触发
						this.debounceGetAddress();
					}
				}
			}
		},
		mounted() {
			// 组件挂载时检查是否需要获取地址
			if (this.originalLocation && !this.cachedAddresses[this.cacheKey]) {
				this.debounceGetAddress();
			}
		},
		methods: {
			handleClick() {
				this.$emit('clickItem', this.item);
			},

			// 防抖函数
			debounceGetAddress() {
				if (this.timer) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					this.getOriginalAddress();
				}, 100);
			},

			// 根据原始经纬度获取地址
			async getOriginalAddress() {
				// 检查缓存
				if (this.cacheKey && this.cachedAddresses[this.cacheKey]) {
					this.addressOrigin = this.cachedAddresses[this.cacheKey];
					return;
				}

				// 防止重复请求
				if (this.isRequesting) return;

				try {
					this.isRequesting = true;

					const {
						longitude,
						latitude
					} = this.originalLocation;
					if (!longitude || !latitude) {
						this.addressOrigin = '--';
						return;
					}

					// 检查全局缓存（如果有）
					const globalCacheKey = `address_${longitude}_${latitude}`;
					const cached = uni.getStorageSync(globalCacheKey);
					if (cached) {
						this.addressOrigin = cached;
						this.cachedAddresses[this.cacheKey] = cached;
						return;
					}

					const url =
						`https://restapi.amap.com/v3/geocode/regeo?key=9f8eb22902ff76102e32ba52c7dee1e6&radius=2000&extensions=all&batch=false&roadlevel=0&location=${longitude},${latitude}`;

					const res = await util.requestDataFrom(url, {});
					console.log('获取原始经纬度的地理名', res);

					if (res.data.status === '1') {
						let address = '未知地址';

						if (res.data.regeocode.pois.length > 0) {
							const pois = res.data.regeocode.pois;
							let nearestPoi = pois[0];

							// 找到距离最近的POI
							for (let i = 1; i < pois.length; i++) {
								if (parseFloat(pois[i].distance) < parseFloat(nearestPoi.distance)) {
									nearestPoi = pois[i];
								}
							}
							address = nearestPoi.name;
						} else {
							// 如果没有POI，使用格式化地址
							address = res.data.regeocode.formatted_address || '未知地址';
						}

						this.addressOrigin = address;
						// 缓存结果
						this.cachedAddresses[this.cacheKey] = address;
						// 全局缓存（可选）
						uni.setStorage({
							key: globalCacheKey,
							data: address
						});
					} else {
						this.addressOrigin = '获取地址失败';
					}
				} catch (error) {
					console.error('获取原始地址失败:', error);
					this.addressOrigin = '获取地址失败';
				} finally {
					this.isRequesting = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		background-color: #fff;
		border-radius: 14rpx;
		padding: 28rpx 24rpx 12rpx;
		margin-bottom: 28px;
		position: relative;

		.current-location {
			padding: 0 0 20rpx;
			display: flex;
			align-items: center;

			.current-location-text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-left: 16rpx;
			}

			image {
				width: 60rpx;
				height: 60rpx;
				flex-shrink: 0;
			}
		}

		.item-info {
			display: flex;
			margin-bottom: 20rpx;

			.left {
				color: #777777;
				flex-shrink: 0;
				width: 170rpx;
			}

			.right {
				color: #777777;
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				&.isSuccess {
					color: rgba(23, 183, 95, 1);
				}
			}
		}

		.del-com {
			position: absolute;
			right: 30rpx;
			bottom: 20rpx;

			.img {
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	
	@media (prefers-color-scheme: dark) {
		.item {
			background-color: #3d3d3d;
			border-radius: 14rpx;
			padding: 28rpx 24rpx 12rpx;
			margin-bottom: 28px;
			position: relative;
		
			.current-location {
				padding: 0 0 20rpx;
				display: flex;
				align-items: center;
		
				.current-location-text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin-left: 16rpx;
				}
		
				image {
					width: 60rpx;
					height: 60rpx;
					flex-shrink: 0;
				}
			}
		
			.item-info {
				display: flex;
				margin-bottom: 20rpx;
		
				.left {
					color: #b0b0b0;
					flex-shrink: 0;
					width: 160rpx;
				}
		
				.right {
					color: #b0b0b0;
					flex: 1;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
		
					&.isSuccess {
						color: rgba(23, 183, 95, 1);
					}
				}
			}
		
			.del-com {
				position: absolute;
				right: 30rpx;
				bottom: 20rpx;
		
				.img {
					width: 46rpx;
					height: 46rpx;
				}
			}
		}
	}
</style>