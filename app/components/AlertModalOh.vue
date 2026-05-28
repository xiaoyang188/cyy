<template>
	<cover-view class="alert-modal-oh">
		<cover-view class="mask" @touchmove.stop.prevent></cover-view>
		<cover-view class="content-box">
			<cover-view class="container">
				<cover-view class="row-button">
					<cover-view class="close-button-wrapper" @click="close">
						<cover-image class="close-button" src="/static/new/close.png"></cover-image>
					</cover-view>
				</cover-view>
				<cover-view class="text-container">
					<cover-view class="floorTitle">
						<text class="infoText">{{infodata}}</text>
					</cover-view>
					<cover-view class="title">{{messageTitle_1}}</cover-view>
					<text class="message">{{message_1}}</text>
					<cover-view class="title">{{messageTitle_2}}</cover-view>
					<!-- <text class="message">{{message_2}}</text> -->
					<text class="message">
						您当前位置的环境信息不足，系统正在努力收集，需要一点时间来学习和计算环境变化。待环境信息丰富后，楼层数据将自动更新。若长时间未显示，可
						<text class="highlight" @click="goToCorrect">进入纠偏页</text>
						，协助系统更快完成定位。
					</text>
				</cover-view>
			</cover-view>
		</cover-view>
	</cover-view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue';

	const messageTitle_1 = ref('楼层定位小科普')
	const message_1 = ref('楼层定位结合多种数据源与智能算法，综合分析您周围的环境信息后估算得出，可能存在轻微偏差。')
	const messageTitle_2 = ref('为什么有时会没有楼层定位？')
	const message_2 = ref('您当前位置的环境信息不足，系统正在努力收集，需要一点时间来学习和计算环境变化。待环境信息丰富后，楼层数据将自动更新')

	const prop = withDefaults(defineProps<{
		infodata : string
	}>(), {
		infodata: '可能在五楼'
	})
	const emit = defineEmits(['closeFloor','correct'])

	function close() {
		emit('closeFloor')
	}
	function goToCorrect() {
		emit('correct')
	}
</script>

<style scoped>
	.alert-modal-oh {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		width: 100%;
		height: 100%;
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}

	.content-box {
		position: relative;
		z-index: 10000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.row-button {
		width: 90%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.close-button-wrapper {
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
		z-index: 10001;
	}

	.close-button {
		width: 70rpx;
		height: 70rpx;
	}

	.text-container {
		box-sizing: border-box;
		width: 90%;
		height: 750rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 60rpx 48rpx;
	}

	.floorTitle {
		width: 80%;
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
		margin: 0 4rpx;
		/* 轻微间距，更美观 */
	}
</style>