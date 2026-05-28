<template>
	<view>
		<view class="box">
			<view class="wifi-symbol">
				<view class="wifi-circle first"></view>
				<view class="wifi-circle second"></view>
				<view class="wifi-circle third"></view>
				<view class="wifi-circle fourth"> </view>
			</view>
	</view>
	</view>
</template>
<script>
</script>
<style lang="scss">
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.wifi-symbol {
		width: 200rpx;
		height: 200rpx;
		margin-left: 18rpx;
		box-sizing: border-box;
		overflow: hidden;
		transform: rotate(45deg);
	}
	
	.wifi-circle {
		border: 25rpx solid #ccc;
		border-radius: 50%;
		position: absolute;
	}
	
	.first {
		width: 300rpx;
		height: 300rpx;
		top: 0;
		left: 0;
		animation: run1 2s linear infinite;
	}
	
	@keyframes run1 {
		0% {
			border-color: #ccc;
		}
	
		25% {
			border-color: #ccc;
		}
	
		50% {
			border-color: #ccc;
		}
	
		75% {
			border-color: #ccc;
		}
	
		100% {
			border-color: #5ac2ba;
		}
	}
	
	.second {
		width: 230rpx;
		height: 230rpx;
		top: 60rpx;
		left: 60rpx;
		animation: run2 2s linear infinite;
	}
	
	@keyframes run2 {
		0% {
			border-color: #ccc;
		}
	
		25% {
			border-color: #ccc;
		}
	
		50% {
			border-color: #ccc;
		}
	
		75% {
			border-color: #5ac2ba;
		}
	
		100% {
			border-color: #ccc;
		}
	}
	
	.third {
		width: 140rpx;
		height: 140rpx;
		top: 120rpx;
		left: 120rpx;
		animation: run3 2s linear infinite;
	}
	
	@keyframes run3 {
		0% {
			border-color: #ccc;
		}
	
		25% {
			border-color: #ccc;
		}
	
		50% {
			border-color: #5ac2ba;
		}
	
		75% {
			border-color: #ccc;
		}
	
		100% {
			border-color: #ccc;
		}
	}
	
	.fourth {
		width: 20rpx;
		height: 20rpx;
		background: #ccc;
		top: 180rpx;
		left: 180rpx;
		animation: run4 2s linear infinite;
	}
	
	@keyframes run4 {
		0% {
			background: #ccc;
			border-color: #ccc;
		}
	
		25% {
			background: #5ac2ba;
			border-color: #5ac2ba;
		}
	
		50% {
			background: #ccc;
			border-color: #ccc;
		}
	
		75% {
			background: #ccc;
			border-color: #ccc;
		}
	
		100% {
			background: #ccc;
			border-color: #ccc;
		}
	}
</style>
