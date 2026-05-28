<template>
	<view class="page-container">
		<view class="nav_row">
			<view class="nav-back" @click="returnParent">
				<uni-icons type="left" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view class="nav-title">
				<text style="font-size: 36rpx;font-weight: bold;">{{pageTitle}}</text>
			</view>
			<view class="nav-placeholder">
				<view v-if="listType!=0 && !isEdit" @click="setEdit">
					<text class="edit">选择</text>
				</view>
				<view v-else-if="isEdit" @click="cancelEdit">
					<text class="wanc">取消</text>
				</view>
			</view>
		</view>
		<!-- 添加 scroll-view 的刷新属性 -->
		<view class="scroll-container" :style="{height: scrollHeight + 'px'}">
			<scroll-view scroll-y="true" class="message-list" refresher-default-style='none' refresher-background='#f5f5f5'
				refresher-enabled :refresher-triggered="refresherTriggered" @refresherrefresh="onRefresh"
				@scrolltolower="onScrollToLower" >
				<!-- 刷新状态提示 -->
				<view v-if="refreshing" class="refreshing-loading">
					<text>刷新中...</text>
				</view>
			
				<view v-for="(item, index) in systemMessageList" :key="index">
					<!-- 原有内容保持不变 -->
					<view v-if="item.msgData.payload.type!=3" class="time-line">
						<text>{{item.msgData.payload.time.substring(0,19)}}</text>
					</view>
					<view @touchstart="handleTouchStart(item, index, $event)" @touchmove="handleTouchMove"
						@touchend="handleTouchEnd" v-if="item.msgData.payload.type!=3"
						:class="{systemstyle:item.msgData.payload.type!=4,userstyle:item.msgData.payload.type===4, 'selected-item': isEdit && isItemSelected(item)}">
						<view class="message-wrapper">
							<view class="message-content">
								<view class="message-header">
									<view class="head-icon">
										<image class="img-head-icon" :src="icon"></image>
									</view>
									<text>宠悦悦提醒您</text>
									<view class="del-com" v-if="isEdit" @click="toggleSelectItem(item)">
										<image
											:src="isItemSelected(item) ? '/static/imgs/correct/img-ceckbox-sel.png' : '/static/imgs/correct/img-chackbox-noSel.png'"
											class="checkbox-img"></image>
									</view>
									<view  class="del-com" v-else></view>
								</view>
								<view class="message-body ">
									<text>{{item.msgData.content}}</text>
								</view>
								<view v-if="item.msgData.payload.identify === 0&&listType === 1" class="message-body">
									<text>点击接受分享，不开启忽略</text>
								</view>
								<view class="button-row" v-if="item.msgData.payload.identify === 0&&listType === 1">
									<button :disabled="item.status===2" @click="setMessageStatuNew(item,2)" class="my-btn">
										忽略</button>
									<button class="my-btn btn-margin" :disabled="item.status===2"
										@click="sureReciveNewPlus(item,index,1)">
										接受</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			
				<!-- 加载更多提示 -->
				<view v-if="loadingMore" class="loading-more">
					<text>加载中...</text>
				</view>
				<view v-if="noMoreData && systemMessageList.length > 0" class="no-more-data">
					<text>没有更多消息了</text>
				</view>
				<view v-else-if="systemMessageList.length === 0" class="empty-list">
					<text>暂无消息</text>
				</view>
			
				<!-- 安全区域占位 -->
				<view class="safe-bottom" :style="{height: (isEdit ? 100 : 0) + 'px'}"></view>
			</scroll-view>
		</view>

		<!-- 底部删除按钮 -->
		<view class="bottom-btn-container" v-if="isEdit">
			<button class="myButton row_center" @click="deleteModal">
				<text style="color: #ffffff;font-size: 36rpx;">删除 <text style="color: #ffffff;font-size: 36rpx;">({{deleteItem.length}})</text> </text>
			</button>
		</view>
		<custom-modal ref="modal" />
	</view>
</template>

<script>
	import util from '/common/util';
	import {
		ackShare
	} from '@/api/api/pet.js'
	import {
		getPage,
		updateStatus,
		getUnReadCount,
		updateStatusMul
	} from '@/api/api/message.js'
	import {
		MREEAGE_TYPE
	} from '@/enum/message-type.ts'
	export default {
		data() {
			return {
				deleteItem: [], // 存储选中的消息
				isEdit: false, // 是否处于编辑模式
				scrollHeight: 0,
				listType: 0,
				icon: '/static/imgs/home/logo.png',
				pageTitle: '系统通知',
				systemMessageList: new Array(),
				showButon: false,
				showButonShare: false,
				isDisabled: [],
				touchStartX: 0,
				touchStartY: 0,
				longPressTimer: null,

				// 新增的下拉刷新相关变量
				refresherTriggered: false, // 控制下拉刷新状态
				refreshing: false, // 是否正在刷新
				loadingMore: false, // 是否正在加载更多
				noMoreData: false, // 是否没有更多数据
				currentPage: 1, // 当前页码
				pageSize: 10, // 每页显示数量
				isRequesting: false, // 请求互斥锁
			}
		},
		onShow() {
			// 如果需要每次显示都刷新，可以在这里调用
			// this.refreshMessageList();
		},
		onReady() {
			// 页面渲染完成后再次计算
			setTimeout(() => {
				this.calculateScrollHeight();
			}, 300);
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
		onLoad(datalist) {
			console.log("datalist", datalist)
			let receivedList = decodeURIComponent(datalist.List);
			let data = JSON.parse(receivedList)
			console.log('data', data);
			this.listType = data.type;
			this.initData(data.list)
		},
		methods: {
			initData(list) {
				this.systemMessageList = list;
				console.log('show list', this.systemMessageList);
				this.markMessagesAsRead();
			},
			
			// 进入编辑模式
			setEdit() {
				this.isEdit = true;
				this.deleteItem = []; // 清空已选中的项目
			},
			
			// 取消编辑模式
			cancelEdit() {
				this.isEdit = false;
				this.deleteItem = [];
			},
			
			// 切换选中状态
			toggleSelectItem(item) {
				const index = this.deleteItem.findIndex(i => i.id === item.id);
				if (index === -1) {
					// 未选中，添加到选中列表
					this.deleteItem.push(item);
				} else {
					// 已选中，从选中列表移除
					this.deleteItem.splice(index, 1);
				}
			},
			
			// 判断项目是否被选中
			isItemSelected(item) {
				return this.deleteItem.some(i => i.id === item.id);
			},
			
			// 显示删除确认弹窗
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
					content: `确定删除选择的${this.deleteItem.length}条消息吗？`,
					showCancel: true,
					confirmText: '确认',
					cancelText: '取消',
					showFooter: true,
					success: () => {
						this.deleteSelectedMessages();
					},
					fail: () => {
						console.log('用户点击了取消');
					}
				});
			},
			
			// 删除选中的消息
			async deleteSelectedMessages() {
				if (this.deleteItem.length === 0) {
					return;
				}
				
				uni.showLoading({
					title: '删除中...'
				});
				
				try {
					let idList = []
					this.deleteItem.forEach((item) => {
						idList.push(item.id)
					})
					
					let para = {
						idList: idList,
						status: -1
					}
					
					const result = await updateStatusMul(para);
					
					uni.hideLoading();
					
					if (result.success) {
						// 从列表中移除已删除的消息
						this.deleteItem.forEach(item => {
							const index = this.systemMessageList.findIndex(msg => msg.id === item.id);
							if (index !== -1) {
								this.systemMessageList.splice(index, 1);
							}
						});
						
						// 清空选中列表
						this.deleteItem = [];
						
						// 退出编辑模式
						this.isEdit = false;
						
						uni.showToast({
							title: '删除成功',
							icon: 'success',
							duration: 2000
						});
						
						// 如果删除后列表为空，显示空状态
						if (this.systemMessageList.length === 0) {
							// 可以触发刷新，重新加载第一页
							this.refreshMessageList();
						}
					} else {
						uni.showToast({
							title: result.msg || '删除失败',
							icon: 'none'
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('删除失败:', error);
					uni.showToast({
						title: '删除失败',
						icon: 'none'
					});
				}
			},
			
			calculateScrollHeight() {
				const systemInfo = uni.getSystemInfoSync();
				const windowHeight = systemInfo.windowHeight;
				const safeTop = systemInfo.statusBarHeight || 0;

				// 固定高度计算
				const navBarHeight = 100; // 导航栏固定高度（包含状态栏）
				const bottomBtnHeight = this.isEdit  ? 120 : 40; // 底部按钮固定高度
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
			
			// 标记消息为已读
			markMessagesAsRead() {
				let idList = []
				this.systemMessageList.forEach((item) => {
					if (item.status === 0)
						idList.push(item.id)
				})
				console.log('idList', idList)
				if (idList.length > 0) {
					let para = {
						idList: idList,
						status: 1
					}
					updateStatusMul(para).then(recivedata => {
					})
				}
				if (this.listType === 0) {
					this.pageTitle = '系统通知';
				} else if (this.listType === 1) {
					this.pageTitle = this.systemMessageList[0]?.data?.title || '用户消息';
				} else if (this.listType === 2) {
					this.pageTitle = '设备通知'
				}
			},
			
			// 下拉刷新
			onRefresh() {
				console.log('下拉刷新触发');
				// 如果正在编辑，先退出编辑模式
				if (this.isEdit) {
					this.cancelEdit();
				}
				// 直接触发刷新，不延迟
				this.refreshMessageList();
			},

			// 滚动到底部加载更多
			onScrollToLower() {
				console.log('滚动到底部');
				// 如果有正在进行的刷新或加载请求，忽略本次请求
				if (this.isRequesting || this.refreshing) {
					console.log('有请求正在进行中，忽略本次滚动');
					return;
				}
				if (this.loadingMore || this.noMoreData) {
					return;
				}
				this.loadMoreMessages();
			},
			
			// 获取消息列表的方法
			async getMessageList(params) {
				try {
					let data = {
						pageNo: params.pageNo,
						pageSize: params.size,
						type: params.type
					}
					const response = await getPage(data);
					console.log('获取刷新消息', response);
					if (response.success) {
						return {
							list: response.data.list || [],
							total: response.data.totalCount || 0,
							currentPage: response.data.pageNo || 1,
							pageSize: response.data.pageSize || 10,
							totalPages: response.data.totalPageCount || 1,
							hasNextPage: response.data.hasNextPage || false
						};
					} else {
						throw new Error(response.msg || '获取消息列表失败');
					}
				} catch (error) {
					console.error('获取消息列表失败:', error);
					throw error;
				}
			},

			// 刷新消息列表
			async refreshMessageList() {
				// 如果有正在进行的请求，先取消（这里是关键）
				if (this.isRequesting) {
					console.log('已有请求正在进行，取消本次刷新');
					this.refresherTriggered = false;
					return;
				}
				try {
					this.isRequesting = true;
					this.refresherTriggered = true;
					this.refreshing = true;
					this.currentPage = 1;
					this.noMoreData = false;
					// 清除 loadingMore 状态，防止同时进行
					this.loadingMore = false;
					// 构建请求参数
					const params = {
						pageNo: this.currentPage,
						size: this.pageSize,
						type: this.listType,
					};
					// 调用获取消息的API
					const response = await this.getMessageList(params);
					// 清空当前列表，防止重复
					this.systemMessageList = [];
					// 使用 $nextTick 确保DOM更新完成
					this.$nextTick(() => {
						// 更新消息列表
						this.systemMessageList = response.list || [];
						// 处理分页信息 - 根据API返回的hasNextPage判断
						if (response.hasNextPage !== undefined) {
							this.noMoreData = !response.hasNextPage;
						} else {
							// 如果没有hasNextPage字段，使用传统判断方式
							if (response.list && response.list.length > 0) {
								this.noMoreData = response.list.length < this.pageSize;
							} else {
								this.noMoreData = true;
							}
							// 如果有总页数信息，也可以根据总页数判断
							if (response.totalPages) {
								this.noMoreData = this.currentPage >= response.totalPages;
							}
						}
						// 重新标记已读
						this.markMessagesAsRead();
						// 显示刷新成功提示（仅在第一页刷新时）
						if (this.currentPage === 1 && response.list && response.list.length > 0) {
							uni.showToast({
								title: '刷新成功',
								icon: 'none',
								duration: 1500
							});
						}
					});
				} catch (error) {
					console.error('刷新消息列表失败:', error);
					uni.showToast({
						title: error.message || '刷新失败',
						icon: 'none',
						duration: 2000
					});
				} finally {
					// 确保所有状态都正确重置
					this.isRequesting = false;
					this.refreshing = false;
					this.refresherTriggered = false;
					this.loadingMore = false;
				}
			},

			// 加载更多消息
			async loadMoreMessages() {
				// 如果正在刷新或有其他请求，直接返回
				if (this.isRequesting || this.refreshing) {
					console.log('正在刷新中，跳过加载更多');
					return;
				}
				if (this.loadingMore || this.noMoreData) {
					return;
				}
				this.isRequesting = true;
				this.loadingMore = true;
				// 保存当前页码，用于失败时回退
				const currentPageBeforeRequest = this.currentPage;
				this.currentPage++;
				try {
					const params = {
						pageNo: this.currentPage,
						size: this.pageSize,
						type: this.listType,
					};
					console.log('底部刷新页面', params)
					const response = await this.getMessageList(params);
					const newMessages = response.list || [];
					if (newMessages.length > 0) {
						// 使用 concat 而不是扩展运算符，避免可能的重复
						this.systemMessageList = this.systemMessageList.concat(newMessages);
						this.markMessagesAsRead()
						// 检查是否还有更多数据
						if (response.hasNextPage !== undefined) {
							this.noMoreData = !response.hasNextPage;
						} else {
							// 传统判断方式
							if (newMessages.length < this.pageSize) {
								this.noMoreData = true;
							}
							// 如果有总页数信息
							if (response.totalPages) {
								this.noMoreData = this.currentPage >= response.totalPages;
							}
						}
					} else {
						// 没有新数据，标记为没有更多数据
						this.noMoreData = true;
						// 回退页码
						this.currentPage = currentPageBeforeRequest;
					}
				} catch (error) {
					console.error('加载更多消息失败:', error);
					// 加载失败时回退页码
					this.currentPage = currentPageBeforeRequest;
					uni.showToast({
						title: error.message || '加载失败',
						icon: 'none',
						duration: 2000
					});
				} finally {
					this.isRequesting = false;
					this.loadingMore = false;
				}
			},
			
			// 删除单条消息
			async setMessageStatuNew(item, statu) {
				let para = {
					id: item.id,
					status: statu
				}
				return updateStatus(para).then(recivedata => {
					// 更新本地消息状态
					item.status = statu;
					// 如果是删除操作，从列表中移除
					if (statu === -1) {
						const index = this.systemMessageList.findIndex(msg => msg.id === item.id);
						if (index !== -1) {
							this.systemMessageList.splice(index, 1);
						}
						// 如果正在编辑，也从选中列表移除
						if (this.isEdit) {
							const selectedIndex = this.deleteItem.findIndex(i => i.id === item.id);
							if (selectedIndex !== -1) {
								this.deleteItem.splice(selectedIndex, 1);
							}
						}
					}
				})
			},
			
			// 其他方法保持不变...
			returnParent() {
				getApp().backParents();
			},
			
			sureReciveNewPlus(item, index, ack) {
				uni.showLoading({
					title: "请求中"
				})
				let para = {
					sharePetsId: item.msgData.payload.msg_id,
					type: ack
				}
				ackShare(para).then(recivedata => {
					uni.hideLoading()
					console.log('确认分享', recivedata)
					util.requestPetList()
					this.$refs.modal.show({
						title: '接受成功',
						content: '请在宠物列表中查看,切换到被分享宠物才能看到项圈哦',
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: true,
						success: () => {
							console.log('用户点击了确认')
							uni.switchTab({
								url: '/pages/home/home'
							})
						},
						fail: () => {
							console.log('用户点击了取消')
						}
					})
					this.setMessageStatuNew(item, 2)
					item.status = 2
				}).catch((err)=>{
					uni.hideLoading()
				})
			},
			
			handleTouchStart(item, index, e) {
				if (e.touches && e.touches.length > 0) {
					this.touchStartX = e.touches[0].clientX;
					this.touchStartY = e.touches[0].clientY;
					this.longPressTimer = setTimeout(() => {
						if (this.listType != 0) {
							this.longpressNew(item, index);
							this.longPressTimer = null;
						}
					}, 500);
				}
			},
			
			handleTouchMove(e) {
				if (this.longPressTimer && e.touches && e.touches.length > 0) {
					let moveX = e.touches[0].clientX;
					let moveY = e.touches[0].clientY;
					let diffX = Math.abs(moveX - this.touchStartX);
					let diffY = Math.abs(moveY - this.touchStartY);
					if (diffX > 10 || diffY > 10) {
						clearTimeout(this.longPressTimer);
						this.longPressTimer = null;
					}
				}
			},
			
			handleTouchEnd() {
				if (this.longPressTimer) {
					clearTimeout(this.longPressTimer);
					this.longPressTimer = null;
				}
			},
			
			longpressNew(item, index) {
				let that = this;
				uni.showModal({
					title: '删除',
					content: '删除这条消息',
					success: function(res) {
						if (res.confirm) {
							that.setMessageStatuNew(item, -1).then(recive => {
								// that.$refs.modal.show({
								// 	title: '温馨提示',
								// 	content: '删除成功',
								// 	showCancel: true,
								// 	confirmText: '确认',
								// 	cancelText: '取消',
								// 	showFooter: false,
								// })
								uni.showToast({
									title: '删除成功',
									icon: 'success',
									duration: 2000
								});
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	/* 原有样式保持不变 */
	.page-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
		overflow: hidden;
	}
	
	.nav_row {
		flex-shrink: 0;
	}
	
	.nav-back {
		width: 150rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.nav-title {
		display: flex;
		justify-content: center;
		flex: 1;
	}
	
	.nav-placeholder {
		width: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.edit, .wanc {
		font-size: 32rpx;
		color: #333;
	}
	
	.message-list {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.message-wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.message-header {
		width: 100%;
		margin: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.head-icon {
		display: flex;
		align-items: center;
	}
	
	.del-com {
		margin-left: 20rpx;
		padding: 10rpx;
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.checkbox-img {
		width: 40rpx;
		height: 40rpx;
	}
	
	.selected-item {
		background-color: rgba(0, 122, 255, 0.05);
		border-radius: 20rpx;
	}
	
	.button-row {
		display: flex;
		flex-direction: row;
	}
	
	.btn-margin {
		margin-left: 30rpx;
	}
	
	.time-line {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		color: #999;
		font-size: 24rpx;
	}
	
	/* 修复消息内容溢出问题 */
	.message-body {
		font-size: 28rpx;
		color: #777777;
		line-height: 40rpx;
		padding: 30rpx;
		display: block;
		
		/* 关键修复：允许文本换行 */
		word-break: break-all; /* 允许在任意字符间断行 */
		word-wrap: break-word; /* 允许长单词换行 */
		overflow-wrap: break-word; /* 现代浏览器支持 */
		white-space: normal; /* 允许换行（默认值，但明确指定） */

	}
	
	
	.systemstyle {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.userstyle {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.scroll-container {
		flex: 1;
		overflow: hidden;
		position: relative;
	}
	.message-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 80%;
		border-radius: 50rpx;
		border: solid 1px #e0e0e0;
		background-color: #ffffff;
		margin: 10rpx 10rpx 10rpx 10rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		/* 确保内容区域也能自适应 */
		box-sizing: border-box;
		padding: 0 10rpx; /* 添加内边距 */
	}
	
	.img-head-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-left: 20rpx;
	}
	
	.my-btn {
		width: 150rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background-color: rgba(255, 88, 88, 1);
		border-radius: 60px;
		height: 80rpx;
		font-size: 34rpx;
		color: #ffffff;
		border: none !important;
	}
	
	button::after {
		border: none;
	}
	
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
	
	.myButton:active {
		background-color: rgba(255, 88, 88, 0.8);
	}
	
	/* 新增的刷新相关样式 */
	.refreshing-loading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		color: #999;
		font-size: 28rpx;
	}
	
	.loading-more {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		color: #999;
		font-size: 28rpx;
	}
	
	.no-more-data {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		color: #999;
		font-size: 28rpx;
	}
	
	.empty-list {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100rpx 0;
		color: #999;
		font-size: 32rpx;
	}
	
	.safe-bottom {
		transition: height 0.3s ease;
	}
</style>