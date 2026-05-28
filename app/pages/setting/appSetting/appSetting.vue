<template>
	<div style="width: 100%;height: 100%;">

		<div class="nav_row">
<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;" @click="returnParent">
				<image src="/static/xixin/left.png" style="width: 25rpx;height: 40rpx; "></image></view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">显示设置</text>
			</view>
			<view style="width: 150rpx;"></view>
		</div>
		<div class="mask" v-if="showMask" @click="hideMask">
		</div>
		<div class="setting_row" style="justify-content: space-between;margin-left: 0%;margin-top: 40rpx;" @click="changeMode">
			<text class="setting_text">电量显示</text>
			<view style="display: flex;align-items: center;">

				<text style="color: #ff0000;font-size: 25rpx;">{{batteryShowMode}}</text>

				<uni-icons type="right" style="margin-right: 40rpx;" size="18" width="100rpx"
					color="rgb(153,153,153)"></uni-icons>
			</view>

		</div>
		<div class="setting_row" style="justify-content: space-between;margin-left: 0%;" >
			<text class="setting_text">3d模型展示</text>
			<view style="display: flex;align-items: center;padding-right: 30rpx;">
				<switch color="#2fa6a0" style="transform:scale(0.7)" :checked='isShowmodel3d' @change="switch1Change" />
			</view>
		</div>
		<div v-show="isShowBattery" class="user-select" id='container'
			:class="{expend:petPopoverVisible,closeContainer:petHide}">
			<div class="battery-title"><text>电量样式</text></div>
			<div class="batteryRow" @click="clickBattery(true)"
				:class="{batteryRowClick:clickMode,batteryRow:!clickMode}">
				<view>
					<text>百分比显示</text>
				</view>

				<view style="position: relative;">
					<liiy-battery :power=100 :mode='true'>
					</liiy-battery>
					<view style="position: absolute; top: 50%; left: 45%; transform: translate(-50%,-50%);">
						<text style="font-size: 10px; color: #000000;">100</text>
					</view>
				</view>

			</div>
			<div class="batteryRow" @click="clickBattery(false)"
				:class="{batteryRowClick:!clickMode,batteryRow:clickMode}">
				<text>不显示百分比</text>
				<view> <liiy-battery :power='100'> </liiy-battery>
				</view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShowBattery: false,
				batteryShowMode: '百分比显示',
				showMask: false,
				petPopoverVisible: false,
				petHide: false,
				clickMode: true,
				isShowmodel3d: true
			}
		},
		onShow() {
			this.clickMode = getApp().globalData.batteryShowMode;
			this.isShowmodel3d = getApp().globalData.petShowModel
			console.log('this.isShowmodel3d',this.isShowmodel3d)
			if (this.clickMode) {
				this.batteryShowMode = '百分比显示'
			} else {
				this.batteryShowMode = '不显示百分比'
			}
		},
		methods: {
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				this.isShowmodel3d = e.detail.value
				if(this.isShowmodel3d===true)
				{
					getApp().globalData.petShowModel=1
				}
				else
				{
					getApp().globalData.petShowModel=0
				}
				uni.setStorage({
					key:'petShowModel',
					data:getApp().globalData.petShowModel
				})
			},
			returnParent() {
				getApp().backParents();
			},
			changeMode() {
				this.hideMask();
			},
			hideMask() {
				this.isShowBattery = !this.isShowBattery
				this.showMask = !this.showMask
				this.petPopoverVisible = !this.petPopoverVisible
				this.petHide = !this.petPopoverVisible
			},
			clickBattery(mode) {
				//改变全局变量加缓存
				if (mode === true) {
					this.batteryShowMode = '百分比显示'
				} else if (mode === false) {
					this.batteryShowMode = '不显示百分比'
				}
				this.clickMode = mode;
				getApp().globalData.batteryShowMode = mode
				uni.setStorageSync('batteryShowMode', mode)
			}
		}
	}
</script>

<style>
	.battery-title {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(240, 240, 240, 1.0);
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);

		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 900;

	}

	.batteryRow {
		height: 150rpx;
		width: 85%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		border-radius: 50rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin-top: 50rpx;
		border-width: 2px;
		border-color: gray;
		border-style: solid;
	}

	.batteryRowClick {
		height: 150rpx;
		width: 85%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		border-radius: 50rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin-top: 50rpx;
		border-width: 2px;
		border-color: red;
		border-style: solid;

	}

	.user-select {
		position: absolute;
		border-radius: 25px;
		bottom: 0;
		width: 100%;
		height: 0rpx;
		background: rgba(240, 240, 240, 1.0);
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.expend {
		animation: slipIn 0.3s linear forwards;
	}

	.closeContainer {
		animation: slipOut 0.3s linear forwards;
	}

	@keyframes slipIn {
		from {
			bottom: 0rpx;
			height: 0rpx;
		}

		to {
			bottom: 0rpx;
			height: 600rpx;
		}
	}

	@keyframes slipOut {
		from {
			bottom: 0rpx;
			height: 600rpx;
		}

		to {
			bottom: 0rpx;
			height: 0rpx;
		}
	}
</style>