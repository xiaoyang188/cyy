<template>
	<view 
		v-if="show"
		class="guide-layer"
		:style="{ 
			height: height + 'px', 
			zIndex: 9999
		}"
		@click="$emit('click')"
	>
		<view class="guide-container" :style="{ height: screenheight + 'px' }">
			<image 
				:src="src" 
				class="guide-image"
				:style="{ 
					height: height + statusBarHeight + 'px',
					flex: 1
				}"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: 'GuideLayer',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		height: {
			type: Number,
			default: 0
		},
		src: {
			type: String,
			default: ''
		},
		screenheight: {
			type: Number,
			default: 0
		},
		statusBarHeight: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style scoped>
.guide-layer {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 750rpx;
	z-index: 9999 !important;
}

.guide-container {
	width: 750rpx;
	flex-direction: column;
}

.guide-image {
	width: 750rpx;
}
</style>