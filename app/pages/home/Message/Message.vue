<template>
	<view class="container">
		<view class="top-title" :style="{marginTop:`${statusBarHeight}px`}">
			<text>消息中心</text>
		</view>
		<view class="message-list">
			<view class="message-box" @click="toSystemMessage(systemList,0,0)">
				<view class="message-icon-box">
					<image class="message-icon" src="/static/new/buzzer_icon@3x.png" mode=""></image>
					<uni-icons v-if="systemList.length>0&&systemList[0].status===0" type="smallcircle-filled"
						style="font-size: 25rpx; border-radius: 50%; position: absolute;right: 0;top:0;"
						color="rgb(255, 0, 0)"></uni-icons>
				</view>
				<view class="message-text-box">
					<view class="message-title-box">
						<text class="message-title">系统通知</text>
						<text class="message-time"
							v-if="systemList.length>0">{{formatDisplayTime(systemList[0].msgData.payload.time)}}</text>
					</view>
					<view class="message-content-box">
						<text class="message-content"
							v-if="systemList.length>0">[{{systemTotal}}条]{{systemList[0].msgData.content}}</text>
					</view>
				</view>
			</view>
			<view class="message-box" hover-class="message-box-active" 
				@click="toSystemMessage(deviceList,2,0)">
				<view class="message-icon-box">
					<image class="message-icon" src="/static/new/ring@3x.png" mode=""></image>
					<uni-icons v-if="deviceList.length>0&&deviceList[0].status===0" type="smallcircle-filled"
						style="font-size: 25rpx; border-radius: 50%; position: absolute;right: 0;top:0;"
						color="rgb(255, 0, 0)"></uni-icons>
				</view>
				<view class="message-text-box">
					<view class="message-title-box">
						<text class="message-title">设备通知</text>
						<text class="message-time"
							v-if="deviceList.length>0">{{formatDisplayTime(deviceList[0].msgData.payload.time)}}</text>
					</view>
					<view class="message-content-box">
						<text class="message-content"
							v-if="deviceList.length>0">[{{deviceTotal}}条]{{deviceList[0].msgData.content}}</text>
					</view>
				</view>
			</view>
			<view class="message-box" hover-class="message-box-active" 
				@click="toSystemMessage(userDataList,1,0)">
				<view class="message-icon-box">
					<image class="message-icon" src="/static/new/team@3x.png" mode=""></image>
					<uni-icons v-if="userDataList.length>0&&userDataList[0].status===0" type="smallcircle-filled"
						style="font-size: 25rpx; border-radius: 50%; position: absolute;right: 0;top:0;"
						color="rgb(255, 0, 0)"></uni-icons>
				</view>
				<view class="message-text-box">
					<view class="message-title-box">
						<text class="message-title">用户消息</text>
						<text class="message-time"
							v-if="userDataList.length>0">{{formatDisplayTime(userDataList[0].msgData.payload.time)}}</text>
					</view>
					<view class="message-content-box">
						<text class="message-content"
							v-if="userDataList.length>0">[{{userTotal}}条]{{userDataList[0].msgData.content}}</text>
					</view>
				</view>
			</view>
			

		</view>
	</view>
</template>
<script>
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
				statusBarHeight: 80,
				isFocused: false,
				isActive: false,
				searchQuery: '',
				placeholder: '搜索',
				deviceList: new Array(),
				userDataList: new Array(),
				systemList: new Array(),
				systemTotal:0,
				deviceTotal:0,
				userTotal:0
			}
		},
		onShow() {
			// getApp().newGetPushData().then(() => {
			// 	this.initData()
			// })
			this.initData()
			getApp().getMessagePage()
		},
		onLoad() {
			let that = this
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight
				}
			})
			uni.$on('update', function(data) {
				that.initData()
				getApp().getMessagePage()
			})
		},
		onUnload() {
			uni.$off('update')
		},
		methods: {
			formatDisplayTime(timeStr) {
				console.log('timeStr', timeStr);
				if (!timeStr) return '-';

				// 直接分割日期和时间部分
				const [datePart, timePart] = timeStr.split(' ');
				if (!datePart || !timePart) return '-';

				// 解析日期（已经是 YYYY-MM-DD 格式）
				const itemDate = new Date(datePart + 'T' + timePart.split('.')[0]);
				if (isNaN(itemDate.getTime())) return '-';

				// 获取今天的日期（忽略时间部分）
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				// 格式化时间部分（"01:11:57" → "01:11"）
				const formattedTime = timePart.substring(0, 5); // 直接取前5个字符 "01:11"

				return itemDate >= today ?
					formattedTime :
					datePart; // 直接返回 YYYY-MM-DD 格式
			},
			focusInput() {
				this.$refs.input.focus();
			},
			initData() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					type: MREEAGE_TYPE.SYSTEM
				}
				getPage(data).then(reciveSys => {
					console.log('获取到系统消息', reciveSys)
					this.systemList = reciveSys.data.list;
					console.log('this.systemList', this.systemList)
					this.systemTotal=reciveSys.data.totalCount
				})
				data.type = MREEAGE_TYPE.USER
				getPage(data).then(reciveSys => {
					console.log('获取到用户消息', reciveSys)
					this.userDataList = reciveSys.data.list
					this.userTotal=reciveSys.data.totalCount
				})
				data.type = MREEAGE_TYPE.DEVICE
				getPage(data).then(reciveSys => {
					console.log('获取到设备消息', reciveSys)
					this.deviceList = reciveSys.data.list
					this.deviceTotal=reciveSys.data.totalCount
				})
			},
			returnParent() {
				getApp().backParents();
			},
			toSystemMessage(dataList, type, inde) {
				try {
					console.log('点击的datalist', dataList);
					if (dataList.length > 0) {
						let data = {
							type: type,
							list: dataList,
							index: inde
						}
						let List = JSON.stringify(data);
						let encodedList = encodeURIComponent(List); // 对 JSON 字符串进行编
						console.log('list', List)
						uni.navigateTo({
							url: '/pages/home/Message/systemMessage/systemMessage?List=' + encodedList
						})
					} else {
						uni.showToast({
							title: '没有消息',
						})
					}
				} catch (e) {
					console.log('跳转出错', e)
				}

			}
		}
	}
</script>
<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.container {
		width: 100vw;
		height: 100vh;
		background-image: url('/static/new/bg-add2.png');
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.top-title {
		width: 100%;
		height: 120rpx;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		font-weight: 500;
	}

	.message-list {
		flex: 1;
	}

	.message-box {
		width: 100%;
		height: 150rpx;
		flex-direction: row;
		align-items: center;
	}

	.message-box-active {
		width: 100%;
		height: 150rpx;
		flex-direction: row;
		align-items: center;
		background-color: #dcdcdc;
		opacity: 0.6;
	}

	.message-icon-box {
		width: 100rpx;
		height: 100rpx;
		margin-left: 30rpx;
		position: relative;
	}

	.message-icon {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.message-text-box {
		flex: 1;
		height: 100rpx;
		margin-left: 26rpx;
		margin-right: 30rpx;
		overflow: hidden;
	}

	.message-title-box {
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
	}

	.message-title {
		font-size: 32rpx;
		align-content: center;
		font-weight: bold;
	}

	.message-time {
		align-content: center;
		font-size: 24rpx;
		color: #CCCCCC;
	}

	.message-content-box {
		flex: 1;
		justify-content: center;
	}

	.message-content {
		font-size: 26rpx;
		color: #999999;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* #ifdef APP-HARMONY */
	@media (prefers-color-scheme: dark) {
		.container {
			width: 100vw;
			height: 100vh;
			background: none;
		}
	}

	/* #endif */
</style>