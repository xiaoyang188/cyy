<template>
	<view v-if="visible" class="loading-mask" :style="{ zIndex: zIndex }">
		<view class="loading-container">
			<view class="loading-content">
				<view class="loading-spinner">
					<uni-icons type="spinner-cycle" size="40" color="#ffffff" 
						:style="{ transform: 'rotate(' + rotateAngle + 'deg)' }"></uni-icons>
				</view>
				<text class="loading-text">{{ title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CustomLoading',
	props: {
		title: {
			type: String,
			default: '加载中...'
		},
		zIndex: {
			type: Number,
			default: 9999
		}
	},
	data() {
		return {
			visible: false,
			rotateAngle: 0,
			rotateTimer: null
		}
	},
	methods: {
		show(options = {}) {
			if (options.title) {
				this.$emit('update:title', options.title);
			}
			this.visible = true;
			this.startRotate();
		},
		hide() {
			this.visible = false;
			this.stopRotate();
		},
		updateTitle(newTitle) {
			this.$emit('update:title', newTitle);
		},
		startRotate() {
			if (this.rotateTimer) return;
			this.rotateTimer = setInterval(() => {
				this.rotateAngle = (this.rotateAngle + 30) % 360;
			}, 100);
		},
		stopRotate() {
			if (this.rotateTimer) {
				clearInterval(this.rotateTimer);
				this.rotateTimer = null;
			}
		}
	},
	beforeDestroy() {
		this.stopRotate();
	}
}
</script>

<style scoped>
.loading-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading-container {
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 10rpx;
	padding: 40rpx;
	min-width: 200rpx;
	max-width: 400rpx;
}

.loading-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.loading-spinner {
	margin-bottom: 20rpx;
}

.loading-text {
	color: #ffffff;
	font-size: 28rpx;
	text-align: center;
	word-wrap: break-word;
	max-width: 300rpx;
}
</style>