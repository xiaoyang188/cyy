<template>
	<view class="alert-modal" :style="{height:height+'px',width:width}">
		<view class="container">
			<view class="row-button">
				<view class="close-button" @click="$emit('closeFloor')">
					<image class="close-button" src="/static/new/close.png"></image>
				</view>
			</view>
			<view class="text-container">
				<view class="floorTitle">
					<text class="infoText">{{infodata}}</text>
				</view>
				<view class="title">{{messageTitle_1}}</view>
				<text class="message">{{message_1}}</text>
				<view class="title">{{messageTitle_2}}</view>
				<text class="message">您当前位置的环境信息不足，系统正在努力收集，需要一点时间来学习和计算环境变化。待环境信息丰富后，楼层数据将自动更新。若长时间未显示，可</text>
				<text class="highlight" @click="goToCorrect">点击进入纠偏页</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AlertModal',
		props: {
			title: {
				type: String,
				default: ''
			},
			message: {
				type: [String, Array],
				default: ''
			},
			width: {
				type: String,
				default: '750px'
			},
			height: {
				type: String,
				default: '250'
			},
			infodata: {
				type: String,
				default: '可能在五楼'
			}
		},
		data() {
			return {
				messageTitle_1: '楼层定位小科普',
				message_1: '楼层定位结合多种数据源与智能算法，综合分析您周围的环境信息后估算得出，可能存在轻微偏差。',
				messageTitle_2: '为什么有时会没有楼层定位？',
				message_2: '您当前位置的环境信息不足，系统正在努力收集，需要一点时间来学习和计算环境变化。待环境信息丰富后，楼层数据将自动更新。'
			}
		},
		emits: ['close', 'button-click','closeFloor', 'correct'],
		computed: {


		},
		methods: {
			goToCorrect() {
				this.$emit('correct')
			}
		}
	};
</script>

<style scoped>
	/* 基础样式 */
	.alert-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		z-index: 9999 !important;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.container {
		width: 750rpx;
		height: 858rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.row-button {
		width: 682rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.close-button {
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
	}

	.text-container {
		width: 682rpx;
		height: 758rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 60rpx 48rpx;
	}

	.floorTitle {
		width: 587rpx;
		height: 100rpx;
		border-radius: 20rpx;
		opacity: 1;
		background: rgba(250, 83, 0, 0.1);
		padding: 27rpx 29rpx;
	}

	.infoText {
		color: #FA5300;
		font-size: 32rpx;

	}

	.title {
		margin-top: 36rpx;
		color: #000000;
		font-size: 36rpx;
	}

	.message {
		margin-top: 12rpx;
		font-weight: 400;
		font-size: 34rpx;
		color: #777777
	}
	.highlight {
	  color: #FA5300;
	  font-weight: bold;
	  margin: 0 4rpx; /* 轻微间距，更美观 */
	}
</style>