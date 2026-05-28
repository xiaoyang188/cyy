<template>
	<view v-if="visible" class="loading-overlay">
		<view class="loading-container">
			<view class="loading-spinner">
				<view class="spinner"></view>
			</view>
			<text class="loading-text">{{ title }}</text>
			<view v-if="showProgress" class="progress-container">
				<view class="progress-bar">
					<view class="progress-fill" :style="{ width: progress + '%' }"></view>
				</view>
				<text class="progress-text">{{ progress }}%</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FirmwareLoading',
	props: {
		// 是否显示加载组件
		visible: {
			type: Boolean,
			default: false
		},
		// 加载文本
		title: {
			type: String,
			default: '加载中...'
		},
		// 是否显示进度条
		showProgress: {
			type: Boolean,
			default: false
		},
		// 进度值 0-100
		progress: {
			type: Number,
			default: 0
		}
	},
	methods: {
		// 显示加载
		show(title = '加载中...', showProgress = false) {
			this.$emit('update:visible', true);
			this.$emit('update:title', title);
			this.$emit('update:showProgress', showProgress);
		},
		// 隐藏加载
		hide() {
			this.$emit('update:visible', false);
		},
		// 更新标题
		updateTitle(title) {
			this.$emit('update:title', title);
		},
		// 更新进度
		updateProgress(progress) {
			this.$emit('update:progress', progress);
		}
	}
}
</script>

<style scoped>
.loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.loading-container {
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 20rpx;
	padding: 60rpx 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 300rpx;
	max-width: 500rpx;
}

.loading-spinner {
	margin-bottom: 30rpx;
}

.spinner {
	width: 60rpx;
	height: 60rpx;
	border: 6rpx solid rgba(255, 255, 255, 0.3);
	border-top: 6rpx solid #ffffff;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.loading-text {
	color: #ffffff;
	font-size: 32rpx;
	text-align: center;
	line-height: 1.4;
	white-space: pre-line;
}

.progress-container {
	margin-top: 30rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.progress-bar {
	width: 100%;
	height: 12rpx;
	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 6rpx;
	overflow: hidden;
	margin-bottom: 15rpx;
}

.progress-fill {
	height: 100%;
	background-color: #07c160;
	transition: width 0.3s ease;
	border-radius: 6rpx;
}

.progress-text {
	color: #ffffff;
	font-size: 28rpx;
}
</style>