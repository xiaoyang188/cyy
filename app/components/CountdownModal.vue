<template>
	<view 
		class="countdown-modal"
		:style="modalStyle"
		v-if="show"
	>
		<view class="countdown-content">
			<view class="countdown-card">
				<!-- 背景图片 -->
				<image 
					src="/static/xixin/countdown.png" 
					class="countdown-background"
				/>
				<!-- 倒计时内容 -->
				<view class="countdown-text-content">
					<text class="countdown-number">{{ formattedCountdown }}</text>
					<text class="countdown-message">{{ message }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CountdownModal',
	props: {
		// 倒计时时间（秒或字符串）
		countdown: {
			type: [Number, String],
			default: 0
		},
		// 显示的消息
		message: {
			type: String,
			default: '内切换到高频'
		},
		// 位置样式
		position: {
			type: Object,
			default: () => ({})
		},
		// 是否显示
		show: {
			type: Boolean,
			default: true
		},
		// 倒计时格式：minutes（分钟）或 seconds（秒）
		format: {
			type: String,
			default: 'minutes',
			validator: (value) => ['minutes', 'seconds'].includes(value)
		},
		// 是否自动开始倒计时
		autoStart: {
			type: Boolean,
			default: true
		},
		// 倒计时结束回调
		onFinish: {
			type: Function,
			default: null
		}
	},
	data() {
		return {
			internalCountdown: 0,
			countdownTimer: null,
			isCounting: false
		};
	},
	computed: {
		modalStyle() {
			const baseStyle = {
				position: 'absolute',
				flexDirection: 'row',
				justifyContent: 'center',
				width: '750',
				zIndex: 998
			};
			
			return { ...baseStyle, ...this.position };
		},
		
		// 格式化倒计时显示
		formattedCountdown() {
			if (typeof this.internalCountdown === 'string') {
				return this.internalCountdown;
			}
			
			if (this.format === 'minutes') {
				const minutes = Math.floor(this.internalCountdown / 60);
				const seconds = this.internalCountdown % 60;
				
				if (minutes > 0) {
					return `${minutes}分${seconds}秒`;
				} else {
					return `${seconds}秒`;
				}
			} else {
				return `${this.internalCountdown}秒`;
			}
		},
		
		// 是否是有效的倒计时值
		isValidCountdown() {
			const value = this.internalCountdown;
			return typeof value === 'number' && value > 0;
		}
	},
	watch: {
		countdown: {
			immediate: true,
			handler(newVal) {
				this.setCountdown(newVal);
			}
		},
		
		show: {
			immediate: true,
			handler(newVal) {
				if (newVal && this.autoStart) {
					this.startCountdown();
				} else {
					this.stopCountdown();
				}
			}
		}
	},
	methods: {
		// 设置倒计时
		setCountdown(value) {
			if (typeof value === 'string') {
				this.internalCountdown = value;
				this.stopCountdown();
			} else {
				const numValue = parseInt(value);
				if (!isNaN(numValue) && numValue >= 0) {
					this.internalCountdown = numValue;
				} else {
					this.internalCountdown = 0;
				}
			}
		},
		
		// 开始倒计时
		startCountdown() {
			if (this.isCounting || !this.isValidCountdown) {
				return;
			}
			
			this.isCounting = true;
			this.countdownTimer = setInterval(() => {
				if (this.internalCountdown <= 0) {
					this.stopCountdown();
					this.handleCountdownFinish();
				} else {
					this.internalCountdown--;
				}
			}, 1000);
		},
		
		// 停止倒计时
		stopCountdown() {
			this.isCounting = false;
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer);
				this.countdownTimer = null;
			}
		},
		
		// 重置倒计时
		resetCountdown() {
			this.stopCountdown();
			this.setCountdown(this.countdown);
		},
		
		// 处理倒计时结束
		handleCountdownFinish() {
			this.stopCountdown();
			
			// 触发结束事件
			this.$emit('finish');
			
			// 执行回调函数
			if (this.onFinish && typeof this.onFinish === 'function') {
				this.onFinish();
			}
		},
		
		// 手动触发倒计时结束（用于测试）
		forceFinish() {
			this.internalCountdown = 0;
			this.handleCountdownFinish();
		}
	},
	
	beforeUnmount() {
		this.stopCountdown();
	},
	
	// 暴露给父组件的方法
	expose: ['startCountdown', 'stopCountdown', 'resetCountdown', 'forceFinish']
};
</script>

<style scoped>
.countdown-modal {
	pointer-events: none; /* 允许点击穿透 */
}

.countdown-content {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 750rpx;
}

.countdown-card {
	width: 190px;
	height: 65px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.countdown-background {
	width: 190px;
	height: 65px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.countdown-text-content {
	position: absolute;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 190px;
	padding-left: 80rpx;
}

.countdown-number {
	color: rgba(255, 87, 51, 1);
	font-size: 28rpx;
	font-weight: 600;
	
	margin-bottom: 2rpx;
	text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.countdown-message {
	font-size: 28rpx;
	color: #333333;

	text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
}

/* 动画效果 */
@keyframes countdownPulse {
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
}

.countdown-number {
	animation: countdownPulse 2s infinite;
}

/* 倒计时最后10秒的警告效果 */
.countdown-number.warning {
	color: #ff3333;
	animation: countdownPulse 0.5s infinite;
}

/* 响应式适配 */
@media (max-width: 375px) {
	.countdown-card {
		width: 160px;
		height: 55px;
	}
	
	.countdown-background {
		width: 160px;
		height: 55px;
	}
	
	.countdown-text-content {
		padding-left: 60rpx;
	}
	
	.countdown-number,
	.countdown-message {
		font-size: 24rpx;
	}
}

@media (max-width: 320px) {
	.countdown-card {
		width: 140px;
		height: 48px;
	}
	
	.countdown-background {
		width: 140px;
		height: 48px;
	}
	
	.countdown-text-content {
		padding-left: 50rpx;
	}
	
	.countdown-number,
	.countdown-message {
		font-size: 22rpx;
	}
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
	.countdown-message {
		color: #e0e0e0;
	}
}

/* 主题定制 */
.countdown-theme-default .countdown-number {
	color: #ff5733;
}

.countdown-theme-warning .countdown-number {
	color: #ff3333;
}

.countdown-theme-success .countdown-number {
	color: #52c41a;
}

/* 状态指示器 */
.countdown-status {
	position: absolute;
	top: -10rpx;
	right: -10rpx;
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	z-index: 3;
}

.countdown-status.running {
	background-color: #52c41a;
	animation: statusBlink 1s infinite;
}

.countdown-status.paused {
	background-color: #faad14;
}

.countdown-status.finished {
	background-color: #ff4d4f;
}

@keyframes statusBlink {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
</style>