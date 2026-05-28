
<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav_row" :style="{backgroundColor:darkMode=='light'?'#f5f5f5':'#000000'}">
			<view class="row_center" style="width: 150rpx;height: 80rpx;" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" :color="darkMode=='light'?'rgb(18, 18, 18)':'rgb(255, 255, 255)'"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 36rpx;font-weight: bold;" :style="{color:darkMode=='light'?'#121212':'#FFFFFF'}">纠偏记录</text>
			</view>
			<view style="width: 150rpx;">
				<text  v-if="!isEdit" @click="setEdit">选择</text>
				<text  v-else @click="deleteRecord">完成</text>
			</view>
		</view>

		<!-- scroll-view容器 -->
		<view class="scroll-container" :style="{height: scrollHeight + 'px'}">
			<scroll-view class="scroll-content" scroll-y :show-scrollbar="false" :scroll-top="scrollTop" @scroll="onScroll"
				@scrolltolower="scrolltolower" :enhanced="true" :enable-back-to-top="true" :bounces="false">
				<view class="record-list" v-if="rectifyList.length>0">
					<view class="record-item" v-for="(item, index) in rectifyList" :key="item.id || index">
						<!-- 修改：将recordItemVue和edit-btn合并在一起 -->
						<view class="item-wrapper">
							<recordItemVue :darkMode="darkMode" :isEdit="isEdit" :item="formatRecordItem(item)" :deleteItem="deleteItem"
								@clickItem="clickItem(item)" @editItem="editItem(item)" />
							<!-- 编辑按钮放在组件内部右侧 -->
							<view class="edit-btn" v-if="!isEdit" @click="editItem(item)">
								<text>编辑</text>
							</view>
						</view>
					</view>
				</view>
				<view class="empty-container" v-else>
					<text>暂无纠偏记录</text>
				</view>

				<view class="load-more" v-if="hasNextPage && !loading">
					<text @click="loadMore" style="color: $uni-color-primary; font-size: 32rpx;">加载更多</text>
				</view>

				<view class="loading-container" v-if="loading">
					<text :style="{color:darkMode=='light'?'#000000':'#FFFFFF'}">加载中...</text>
				</view>

				<!-- 安全区域占位 -->
				<view class="safe-bottom" :style="{height: (isEdit ? 100 : 0) + 'px'}"></view>
			</scroll-view>
		</view>

		<!-- 底部删除按钮 -->
		<view class="bottom-btn-container" v-if="isEdit">
			<button class="myButton row_center" @click="deleteModal">
				<text style="color: #ffffff;font-size: 36rpx;">删除 <text v-show="deleteItem.length>0" style="color: #ffffff;font-size: 36rpx;">({{deleteItem.length}})</text> </text>
			</button>
		</view>

		<custom-modal ref="modal" />
	</view>
</template>

<script>
	// 修正导入路径
	import util from '../../../../common/util';
	import recordItemVue from '/components/recordItem/recordItem.vue';
	import {
		getRecLocList,deleteRecoveryLoc
	} from '@/api/api/location'
	export default {
		components: {
			recordItemVue,
		},
		data() {
			return {
				darkMode:'light',
				windowHeight: uni.getWindowInfo().windowHeight,
				safeTop: uni.getSystemInfoSync().statusBarHeight,
				isEdit: false,
				deleteItem: [],
				rectifyList: [],
				loading: false,
				pageNo: 1,
				pageSize: 20,
				totalCount: 0,
				hasNextPage: false,
				// 接口配置
				apiUrl: '您的历史记录接口地址', // 请替换为实际接口地址
				deleteApiUrl: getApp().globalData.internet_cyy + getApp().globalData.recoverRemove,
				iconPath: '',
				scrollHeight: 0,
				scrollTop: 0,
			};
		},
		onLoad(e) {
			this.iconPath = e.petIcon
			// 确保页面加载时计算高度
			this.$nextTick(() => {
				setTimeout(() => {
					this.calculateScrollHeight();
				}, 100);
			});
			this.getData()
			this._darkModeHandler = (theme) => {
				this.darkMode = theme
			}
			uni.$on('darkMode', this._darkModeHandler)
		},
		onUnload() {
			uni.$off('darkMode', this._darkModeHandler)
		},
		onReady() {
			// 页面渲染完成后再次计算
			setTimeout(() => {
				this.calculateScrollHeight();
			}, 300);
		},
		onShow() {
			let info=uni.getSystemInfo({
				success: (res) => {
					this.darkMode=res.osTheme
				}
			})
			// 页面显示时重新计算高度
			setTimeout(() => {
				this.calculateScrollHeight();
			}, 200);
		},
		watch: {
			// 监听编辑模式变化，重新计算高度
			isEdit() {
				this.$nextTick(() => {
					setTimeout(() => {
						this.calculateScrollHeight();
					}, 100);
				});
			}
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.pageNo = 1;
			this.getData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			calculateScrollHeight() {
				const systemInfo = uni.getSystemInfoSync();
				const windowHeight = systemInfo.windowHeight;
				const safeTop = systemInfo.statusBarHeight || 0;

				// 固定高度计算
				const navBarHeight = 100; // 导航栏固定高度（包含状态栏）
				const bottomBtnHeight = this.isEdit ? 120 : 40; // 底部按钮固定高度

				// 计算scroll-view容器高度
				this.scrollHeight = windowHeight - navBarHeight - safeTop - bottomBtnHeight;

				console.log('计算高度:', {
					windowHeight,
					navBarHeight,
					safeTop,
					bottomBtnHeight,
					scrollHeight: this.scrollHeight
				});
			},

			// scroll-view滚动事件
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},

			// scroll-view滚动到底部
			scrolltolower() {
				this.loadMore();
			},
			returnParent() {
				uni.navigateBack();
			},

			// 编辑单条记录
			editItem(item) {
				if (this.isEdit) {
					// 编辑模式下不处理编辑点击
					return;
				}

				console.log('编辑记录:', item);

				// 准备跳转参数
				const params = {
					id: item.id,
					latitude: item.latitude,
					longitude: item.longitude,
					address: item.address,
					// 如果需要设备位置ID也可以传递
					deviceLocationId: item.deviceLocationId,
					iconPath: this.iconPath,
					...(item.floor && { floor: item.floor }),
				};

				console.log('跳转参数:', params);
				uni.navigateTo({
					url: '/pages/locatePageNvue/correct/correct?para=' + JSON.stringify(params) + "&rute=2"
				})
			},

			// 请求数据方法
			async getData() {
				if (this.loading) return;

				this.loading = true;
				try {
					getRecLocList(this.pageNo, this.pageSize).then((res) => {
						console.log('res', res)
						const data = res.data;
						if (this.pageNo === 1) {
							// 第一页，直接替换数据
							this.rectifyList = data.list || [];
						} else {
							// 加载更多，追加数据
							this.rectifyList = [...this.rectifyList, ...(data.list || [])];
						}
						this.totalCount = data.totalCount || 0;
						this.hasNextPage = data.hasNextPage || false;
					})
				} catch (error) {
					console.log('获取纠偏记录失败:', error);
					uni.showToast({
						title: error,
						icon: 'none'
					})
				} finally {
					this.loading = false;
				}
			},

			// 加载更多
			loadMore() {
				if (this.hasNextPage && !this.loading) {
					this.pageNo++;
					this.getData();
				}
			},

			// 格式化记录项数据，适配您的recordItem组件
			formatRecordItem(item) {
				return {
					id: item.id,
					addressOrigin: this.getOriginalAddress(item), // 原始地址
					createTime: item.atime, // 创建时间
					address: item.address, // 纠偏后地址
					// 可以根据需要添加更多字段
					longitude: item.longitude,
					latitude: item.latitude,
					deviceLocationId: item.deviceLocationId,
					originalLongitude: item.originalLongitude,
					originalLatitude: item.originalLatitude,
					// 添加完整数据用于编辑
					fullData: item
				};
			},

			// 获取原始地址（根据您的业务逻辑调整）
			getOriginalAddress(item) {
				const recoveryData = item;
				if (recoveryData && recoveryData.originalLongitude && recoveryData.originalLatitude) {
					// 这里可以调用逆地理编码接口获取地址，或者使用您自己的逻辑
					return `原始位置: ${recoveryData.originalLongitude.toFixed(6)}, ${recoveryData.originalLatitude.toFixed(6)}`;
				}
				return '未知原始位置';
			},
			setEdit() {
				this.isEdit = true;
				this.deleteItem = [];
			},

			deleteRecord() {
				this.isEdit = false;
				this.deleteItem = [];
			},

			clickItem(item) {
				if (this.isEdit) {
					const index = this.deleteItem.findIndex(item2 => item2.id === item.id);
					if (index === -1) {
						this.deleteItem.push(item);
					} else {
						this.deleteItem.splice(index, 1);
					}
				}
			},

			deleteModal() {
				if (this.deleteItem.length === 0) {
					uni.showToast({
						title: "请选择您要删除的数据",
						icon: 'none'
					});
					return;
				}
				this.$refs.modal.show({
					title: '温馨提示',
					content: `确定删除选择的${this.deleteItem.length}条纠偏记录吗？`,
					showCancel: true,
					confirmText: '确认',
					cancelText: '取消',
					showFooter: true,
					success: () => {
						this.deleteConfirm();
					},
					fail: () => {
						console.log('用户点击了取消');
					}
				});
			},

			async deleteConfirm() {
				const arr = this.deleteItem.map(item => item.id);
				console.log('要删除的ID:', arr);
				try {
					// 调用删除接口
					// const response = await this.deleteRecords(arr);
					deleteRecoveryLoc(arr).then(recivedata=>{
						console.log('删除接口响应:', recivedata);
						this.rectifyList = this.rectifyList.filter(item => !arr.includes(item.id));
						
						uni.showToast({
							title: "删除成功",
							icon: 'success'
						});
						
						this.isEdit = false;
						this.deleteItem = [];
						
						// 如果删除了所有数据，重新加载第一页
						if (this.rectifyList.length === 0) {
							this.pageNo = 1;
							this.getData();
						}
					})

				} catch (error) {
					console.error('删除失败:', error);
				}
			},

			// 删除记录的接口方法
			async deleteRecords(ids) {
				try {
					
					// const params = {
					// 	idList: ids
					// };
					// console.log('删除请求参数:', params);
					// // 使用util.requestDataJson调用删除接口
					// const response = await util.requestDataJson(this.deleteApiUrl, params);
					// console.log('删除接口响应:', response);
					// if (response.data.code === '200') {
					// 	return {
					// 		success: true,
					// 		msg: response.data.msg
					// 	};
					// } else {
					// 	return {
					// 		success: false,
					// 		msg: response.data.msg || '删除失败'
					// 	};
					// }
				} catch (error) {
					console.error('删除接口调用失败:', error);
					throw new Error('删除请求失败');
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 修改：设置全局背景色，防止页面可以向上拖动 */
	page {
		background-color: #f5f5f5;
		height: 100%;
		overflow: hidden;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		background-color: #f5f5f5;
		position: relative;
	}

	.nav_row {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		padding: 0rpx 20rpx 0rpx 20rpx;
		margin-top: 80rpx;
		width: 750rpx;
		box-sizing: border-box;

	}

	/* scroll-view容器使用固定高度 */
	.scroll-container {
		flex: 1;
		overflow: hidden;
		position: relative;
	}

	.scroll-content {
		height: 100%;
		background-color: #f5f5f5;
		::v-deep ::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}
	}

	/* 修改：添加包装器来包含recordItemVue和edit-btn */
	.item-wrapper {
		position: relative;
		width: 100%;
	}

	/* 修改：编辑按钮样式，使其在recordItemVue组件内部 */
	.edit-btn {
		position: absolute;
		right: 15px;
		bottom: 10px;
		background-color: $uni-color-primary;
		color: #fff;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 12px;
		z-index: 10;
	}

	/* 底部按钮使用固定定位 */
	.bottom-btn-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f5f5f5;
		padding: 12px;
		z-index: 1000;

		/* 适配安全区域 */
		padding-bottom: calc(12px + constant(safe-area-inset-bottom));
		padding-bottom: calc(12px + env(safe-area-inset-bottom));

		.myButton {
			width: 100%;
			background-color: #ff5858;
			border-radius: 60rpx;
			height: 80rpx;
			color: #ffffff;
			font-size: 36rpx;
		}
	}

	.record-list {
		padding: 12px;
		background-color: #f5f5f5;
	}

	.record-item {
		position: relative;
		margin-bottom: 14px;
		background-color: #fff;
		border-radius: 8px;
		padding: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.safe-bottom {
		height: 120px;
		/* 为底部按钮预留空间 */
		background-color: #f5f5f5;
	}

	.empty-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300rpx;
		text-align: center;
		color: #999;
		background-color: #f5f5f5;
		padding: 20px;
	}

	.load-more {
		padding: 30rpx 0;
		text-align: center;
		background-color: #f5f5f5;
	}

	.loading-container {
		padding: 30rpx 0;
		text-align: center;
		color: #999;
		background-color: #f5f5f5;
	}
	
	/* #ifdef APP-HARMONY */
	@media (prefers-color-scheme: dark){
		page {
			background-color: #0a0a0a;
			height: 100%;
			overflow: hidden;
		}
		
		.container {
			display: flex;
			flex-direction: column;
			height: 100vh;
			width: 100vw;
			background-color: #000000;
			position: relative;
		}
		
		.scroll-content {
			height: 100%;
			background-color: #000000;
		}
		
		.record-list {
			padding: 12px;
			background-color: #000000;
		}
		.record-item {
			position: relative;
			margin-bottom: 14px;
			background-color: #3d3d3d;
			border-radius: 8px;
			padding: 12px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		}
		
		.safe-bottom {
			height: 120px;
			/* 为底部按钮预留空间 */
			background-color: #000000;
		}
		
		.empty-container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 300rpx;
			text-align: center;
			color: #999;
			background-color: #000000;
			padding: 20px;
		}
		
		.load-more {
			padding: 30rpx 0;
			text-align: center;
			background-color: #000000;
		}
		
		.loading-container {
			padding: 30rpx 0;
			text-align: center;
			color: #999;
			background-color: #000000;
		}
		
		.bottom-btn-container {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #3d3d3d;
			padding: 12px;
			z-index: 1000;
		
			/* 适配安全区域 */
			padding-bottom: calc(12px + constant(safe-area-inset-bottom));
			padding-bottom: calc(12px + env(safe-area-inset-bottom));
		
			.myButton {
				width: 100%;
				background-color: #ff5858;
				border-radius: 60rpx;
				height: 80rpx;
				color: #ffffff;
				font-size: 36rpx;
			}
		}
	}
	/* #endif */
</style>
