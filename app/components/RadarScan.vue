<template>
	<view 
		class="radar-scan rssi-contant"
		:style="containerStyle"
	>
		<view class="scan-content">
			<!-- 旋转背景 -->
			<view 
				class="rotate-background"
				:style="{ transform: 'rotate(' + angle + 'deg)' }"
			>
				<image 
					src="/static/imgs/locate/ladarSearch.png"
					class="radar-image"
				/>
			</view>
			
			<!-- 信号强度显示 -->
			<view class="rssi-flicker">
				<view class="blinking-text">
					<text class="rssi-value">{{ rssi }}</text>
				</view>
			</view>
			
			<!-- 底部文字 -->
			<view class="radar-bottom-text">
				<view class="text-row">
					<text class="text-label">信号数值范围0~100</text>
				</view>
				
				<view class="text-row">
					<text class="text-description">{{ text }}</text>
					<text 
						v-if="!bluetoothConnect"
						class="text-dots"
					>{{ dots }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'RadarScan',
	props: {
		top: {
			type: Number,
			default: 0
		},
		left: {
			type: Number,
			default: 130
		},
		angle: {
			type: Number,
			default: 0
		},
		rssi: {
			type: [String, Number],
			default: '0'
		},
		text: {
			type: String,
			default: ''
		},
		bluetoothConnect: {
			type: Boolean,
			default: false
		},
		dots: {
			type: String,
			default: '.'
		}
	},
	computed: {
		containerStyle() {
			return {
				top: this.top + 'px',
				left: this.left + 'rpx'
			};
		}
	}
};
</script>

<style scoped>
.radar-scan {
	border-radius: 40rpx;
	width: 490rpx;
	height: 550rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	z-index: 999;
}

.scan-content {
	width: 490rpx;
	height: 550rpx;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

/* 旋转背景 */
.rotate-background {
	position: absolute;
	transition: transform 0.5s ease-in-out;
}

.radar-image {
	width: 320rpx;
	height: 320rpx;
}

/* 信号强度显示 */
.rssi-flicker {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: absolute;
}

.blinking-text {
	opacity: 1;
	animation: blink 1s infinite;
}

@keyframes blink {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.7; }
}

.rssi-value {
	font-size: 50rpx;
	color: #FFFFFF;
}

/* 底部文字 */
.radar-bottom-text {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 450rpx;
	width: 490rpx;
}

.text-row {
	height: 50rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.text-label,
.text-description {
	font-size: 28rpx;
	color: rgba(255, 87, 51, 1);
}

.text-dots {
	font-size: 28rpx;
	color: rgba(255, 87, 51, 1);
	margin-left: 5rpx;
}
</style>