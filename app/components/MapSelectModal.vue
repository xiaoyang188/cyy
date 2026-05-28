<template>
	<view v-if="show" class="map-select-modal mask" :style="{ 
			height: height + 'px', 
			zIndex: 999
		}" @touchstart.stop @touchmove.stop
		@touchend.stop>
		<view class="modal-content" :style="{ width: screenwidth + 'px' }">
			<view class="modal-card">
				<view class="modal-header">
					<text class="modal-title">选择地图应用</text>
				</view>

				<view class="modal-item" @click="$emit('select', 0)">
					<text class="modal-item-text">百度地图</text>
				</view>

				<view class="modal-item" @click="$emit('select', 1)">
					<text class="modal-item-text">高德地图</text>
				</view>
				
			</view>
			<view class="modal-button" @click="$emit('cancel')">
				<text class="modal-button-text">取消</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MapSelectModal',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			height: {
				type: Number,
				default: 0
			},
			screenwidth: {
				type: Number,
				default: 375
			}
		}
	};
</script>

<style scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		z-index: 9999;
	}
	.modal-button{
		height: 100rpx;  /* 固定高度 */
		display: flex;
		align-items: center;
		justify-content: center; 
		width: 500rpx;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
	}
	.modal-title{
		line-height: 50rpx;
		color:rgba(255, 87, 51, 1);
	}
	.modal-button-text{
		color: #FFFFFF;
	}
	/* 使用 rpx 而不是 % */
	.modal-content {
		width: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.modal-card {
		background-color: #FFFFFF;
		width: 500rpx;  /* 固定宽度 */
		border-radius: 40rpx 40rpx 0 0;
		overflow: hidden;
	}
	
	.modal-header {
		height: 100rpx;  /* 固定高度 */
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.modal-item {
		height: 100rpx;  /* 固定高度 */
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>