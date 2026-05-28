<template>
	<view 
		class="left-toolbar"
		:style="{ top: top + 'px' }"
	>
		<view 
			v-for="(button, index) in buttons"
			:key="index"
			class="toolbar-button"
			@click="handleButtonClick(button)"
		>
			<image :src="button.icon" class="toolbar-icon" />
			
			<view v-if="button.text" class="toolbar-text-container">
				<text class="toolbar-text">{{ button.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'LeftToolbar',
	props: {
		top: {
			type: Number,
			default: 0
		},
		buttons: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		handleButtonClick(button) {
			if (button.action && typeof button.action === 'function') {
				button.action();
			}
		}
	}
};
</script>

<style scoped>
.left-toolbar {
	position: absolute;
	left: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.tool-icon{
		width: 60rpx;
		height: 60rpx;
	}
.help-icon {
		width: 40rpx;
		height: 40rpx;
		padding: 5rpx;
	}
.toolbar-button {
	margin-bottom: 15rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.toolbar-icon {
	width: 120rpx;
	height: 120rpx;
}

.toolbar-text-container {
	height: 15rpx;
	width: 120rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.toolbar-text {
	font-size: 20rpx;
	color: rgba(255, 87, 51, 0.7);
}
</style>