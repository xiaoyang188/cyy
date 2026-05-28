<template>
	<view 
		class="right-toolbar"
		:style="{ top: top + 'rpx' }"
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
				<text 
					v-if="button.showDots"
					class="toolbar-dots"
				>{{ dots }}</text>
			</view>
		</view>
	</view>
	
	
	<view
		class="right-toolbar-bottom"
		:style="{ top: buttonsTop + 'px' }"
	>
		<view 
			v-for="(button, index) in bottomButtons"
			:key="index"
			class="toolbar-button"
			@click="handleButtonClick(button)"
		>
			<image :src="button.icon" class="toolbar-icon" />
			
			<view v-if="button.text" class="toolbar-text-container">
				<text class="toolbar-text">{{ button.text }}</text>
				<text 
					v-if="button.showDots"
					class="toolbar-dots"
				>{{ dots }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'RightToolbar',
	props: {
		top: {
			type: Number,
			default: 80
		},
		buttonsTop: {
			type: Number,
			default: 200
		},
		buttons: {
			type: Array,
			default: () => []
		},
		bottomButtons: {
			type: Array,
			default: () => []
		},
		dots: {
			type: String,
			default: '.'
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
.right-toolbar {
	position: absolute;
	right: 8px;
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
.right-toolbar-bottom{
	position: absolute;
	right: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
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

.toolbar-dots {
	font-size: 20rpx;
	color: rgba(255, 87, 51, 0.7);
	width: 20rpx;
}
</style>