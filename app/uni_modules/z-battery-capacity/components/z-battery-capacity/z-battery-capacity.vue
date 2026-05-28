<template>
	<view class="container-battery">
		<text class="battery-percent" :style="{
			'color': percentColor
		}" v-if="showPercent">{{ batteryPercent }}</text>
		<view class="battery-box">
			<view class="battery-content" :style="{
				'width': batteryWidthValue + batteryWidthUnit
			}">
				<view class="battery-value" :style="{
					'width': value,
					'backgroundColor': color
				}">
				</view>
			</view>
			<view class="dot"></view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			battery: {
				type: Number,
				default: 0
			},
			percentColor: {
				type: String,
				default: '#1c1c1c'
			},
			batteryWidth: {
				type: String,
				default: '22'
			},
			showPercent: {
				type: Boolean,
				default: true
			},
			colors: {
				type: Array,
				default: () => {
					return [
						{
							value: 20,
							color: 'red',
						},
						{
							value: 40,
							color: 'yellow',
						},
						{
							value: 100,
							color: '#4cd964',
						},
					]
				}
			}
		},
		computed: {
			batteryPercent() {
				if(this.battery < 0) {
					return '0%'
				}
				if(this.battery > 100) {
					return '100%'
				}
				return this.battery + '%'
			},
			batteryDecimals() {
				if(this.battery < 0) {
					return 0
				}
				if(this.battery > 100) {
					return 1
				}
				return this.battery / 100
			},
			value() {
				return (this.batteryWidth - 4) * this.batteryDecimals + this.batteryWidthUnit
			},
			batteryWidthValue() {
				return this.getValue(this.batteryWidth)
			},
			batteryWidthUnit() {
				return this.getUnit(this.batteryWidth)
			},
			color() {
				for(let i = 0; i < this.colors.length; i++) {
					const item = this.colors[i]
					
					if(this.battery <= item.value) {
						return item.color
					}
				}

				return '#4cd964'
			},
		},
		methods: {
			getValue(value) {
				if (typeof value === 'number') {
					return value;
				}
				const reg = /(px|rpx)$/;
				const tempValue = value.replace(reg, '');
				return Number(tempValue);
			},
			getUnit(value) {
				if (typeof value === 'number') {
					return 'px';
				}
		
				if (/rpx$/.test(value)) {
					return 'rpx';
				}
		
				return 'px';
			}
		}
	}
</script>
<style scoped lang="scss">
	.container-battery {
		display: flex;
		// #ifdef APP-PLUS-NVUE
		flex-direction: row;
		// #endif
		align-items: center;
	}
	.battery-percent {
		font-size: 14px;
		padding-right: 4px;
	}
	.battery-content {
		// height: 12px;
		padding: 1px;
		border-radius: 3px;
		border: 1px solid #999;
		// position: relative;
		display: flex;
		// #ifdef APP-PLUS-NVUE
		flex-direction: row;
		// #endif
		// &::after {
		// 	content: ' ';
		// 	background-color: #999;
		// 	width: 2px;
		// 	height: 4px;
		// 	position: absolute;
		// 	right: -2px;
		// 	top: 3px;
		// 	border-radius: 0 2px 2px 0;
		// }
	}
	.battery-box {
		position: relative;
		padding-right: 4px;
	}
	.dot {
		background-color: #999;
		width: 2px;
		height: 4px;
		position: absolute;
		right: 2px;
		top: 4px;
		border-radius: 0 2px 2px 0;
	}
	.battery-value {
		height: 8px;
		border-radius: 1px;
	}
</style>
