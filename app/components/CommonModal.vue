<template>
	<view 
		v-if="show"
		class="common-modal-container"
		:style="{height:height}"
		@touchstart.stop
		@touchmove.stop
		@touchend.stop
	>
		<view class="modal-wrapper" :style="{ height: modalHeight }">
			<view class="modal-content drawtoast" :style="{ width: modalWidth.toString()+'px' }">
				<view class="modal-card" :style="{ width: modalWidth.toString()+'px' }">
					<!-- 标题栏 -->
					<view class="modal-header topBar" :style="{ width: modalWidth.toString()+'px'}">
						<text class="modal-title title">{{title}}</text>
					</view>
					
					<!-- 内容区域 -->
					<view class="modal-body">
						<slot name="default">
							<text v-if="!Array.isArray(message)" class="modal-message" :style="{ width: (modalWidth-30).toString()+'px' }">
								{{ message }}
							</text>
							<view v-else class="message-lines" :style="{ width: (modalWidth-30).toString()+'px' }">
								<text 
									v-for="(line, index) in message"
									:key="index"
									class="modal-message-line"
								>
									{{ line }}
								</text>
							</view>
						</slot>
						
						<slot name="content"></slot>
					</view>
					
					<!-- 按钮区域 -->
					<view 
						v-if="buttons && buttons.length > 0"
						class="modal-actions"
					>
						<view class="action-buttons" :class="buttonLayoutClass">
							<view 
								v-for="(button, index) in buttons"
								:key="index"
								class="action-button"
								:class="{
									'myButton': button.primary,
									'secondary-button': !button.primary,
									'disabled': button.disabled
								}"
								@click="!button.disabled && handleButtonClick(button)"
								:style="button.style"
							>
								<text class="button-text">{{ button.text }}</text>
								<text 
									v-if="button.loading"
									class="loading-dots"
								>{{ loadingDots }}</text>
							</view>
						</view>
					</view>
					
					<!-- 不再提醒选项 -->
					<view 
						v-if="showRemind"
						class="remind-option"
						@click="handleRemindChange"
					>
						<view class="remind-checkbox">
							<view 
								class="checkbox-icon"
								:class="{ 'checked': remind }"
							></view>
						</view>
						<text class="remind-text">不再提醒</text>
					</view>
					
					<!-- 自定义底部插槽 -->
					<slot name="footer"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CommonModal',
	props: {
		// 是否显示
		show: {
			type: Boolean,
			default: false
		},
		// 标题
		title: {
			type: String,
			default: '温馨提示'
		},
		// 消息内容（支持字符串或数组）
		message: {
			type: [String, Array],
			default: ''
		},
		// 按钮配置
		buttons: {
			type: Array,
			default: () => [],
			validator: (buttons) => {
				return buttons.every(button => 
					typeof button === 'object' && 
					button.text && 
					typeof button.text === 'string'
				);
			}
		},
		// 弹窗宽度
		width: {
			type: Number,
			default: 250
		},
		// 弹窗高度
		height: {
			type: String,
			default: 'auto'
		},
		// 是否显示不再提醒选项
		showRemind: {
			type: Boolean,
			default: false
		},
		// 不再提醒状态
		remind: {
			type: Boolean,
			default: false
		},
		// 容器样式
		containerStyle: {
			type: Object,
			default: () => ({})
		},
		containerHeight: {
			type: Number,
			default: 250
		},
		// 按钮布局：horizontal（水平）或 vertical（垂直）
		buttonLayout: {
			type: String,
			default: 'horizontal',
			validator: (value) => ['horizontal', 'vertical'].includes(value)
		},
		// 是否显示关闭按钮
		showCloseButton: {
			type: Boolean,
			default: false
		},
		// 点击遮罩是否关闭
		maskClosable: {
			type: Boolean,
			default: true
		},
		// 是否显示加载动画
		showLoading: {
			type: Boolean,
			default: false
		},
		// 加载文本
		loadingText: {
			type: String,
			default: '加载中'
		}
	},
	emits: [
		'update:show',
		'update:remind',
		'button-click',
		'close',
		'remind-change'
	],
	data() {
		return {
			loadingDots: '',
			dotCount: 0,
			loadingInterval: null
		};
	},
	computed: {
		// 容器样式
		modalContainerStyle() {
			return this.containerStyle;
		},
		
		// 弹窗宽度
		modalWidth() {
			return this.width;
		},
		
		// 弹窗高度
		modalHeight() {
			return this.height;
		},
		
		// 按钮布局类
		buttonLayoutClass() {
			return this.buttonLayout === 'vertical' ? 'vertical-layout' : 'horizontal-layout';
		},
		
		// 按钮数量
		buttonCount() {
			return this.buttons.length;
		},
		
		// 是否有主按钮
		hasPrimaryButton() {
			return this.buttons.some(button => button.primary);
		}
	},
	watch: {
		show(newVal) {
			if (newVal && this.showLoading) {
				this.startLoadingAnimation();
			} else {
				this.stopLoadingAnimation();
			}
		}
	},
	methods: {
		// 处理按钮点击
		handleButtonClick(button) {
			// 触发按钮点击事件
			this.$emit('button-click', button);
			
			// 执行按钮的 action 函数
			if (button.action && typeof button.action === 'function') {
				button.action();
			}
			
			// 如果按钮设置了自动关闭
			if (button.autoClose !== false) {
				this.closeModal();
			}
		},
		// 关闭弹窗
		closeModal() {
			this.$emit('update:show', false);
			this.$emit('close');
		},
		// 处理不再提醒变化
		handleRemindChange() {
			const newValue = !this.remind;
			this.$emit('update:remind', newValue);
			this.$emit('remind-change', newValue);
		},
		
		// 点击遮罩
		handleMaskClick() {
			if (this.maskClosable) {
				this.closeModal();
			}
		},
		
		// 开始加载动画
		startLoadingAnimation() {
			this.stopLoadingAnimation();
			this.loadingInterval = setInterval(() => {
				this.dotCount = (this.dotCount + 1) % 4;
				this.loadingDots = '...'.substring(0, this.dotCount);
			}, 500);
		},
		
		// 停止加载动画
		stopLoadingAnimation() {
			if (this.loadingInterval) {
				clearInterval(this.loadingInterval);
				this.loadingInterval = null;
			}
			this.loadingDots = '';
			this.dotCount = 0;
		},
		
		// 更新按钮状态
		updateButton(index, updates) {
			if (this.buttons[index]) {
				this.buttons[index] = { ...this.buttons[index], ...updates };
			}
		},
		
		// 显示弹窗
		showModal() {
			this.$emit('update:show', true);
		},
		
		// 隐藏弹窗
		hideModal() {
			this.$emit('update:show', false);
		},
		
		// 切换弹窗显示状态
		toggleModal() {
			this.$emit('update:show', !this.show);
		}
	},
	
	beforeUnmount() {
		this.stopLoadingAnimation();
	},
	
	// 暴露给父组件的方法
	expose: [
		'showModal', 
		'hideModal', 
		'toggleModal', 
		'closeModal', 
		'updateButton'
	]
};
</script>

<style scoped>
/* 容器样式 - 适配 nvue */
.common-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 750rpx; /* nvue 推荐使用固定宽度 */
  z-index: 9999;
}

.modal-wrapper {
  width: 750rpx; /* 使用固定宽度 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 40rpx; /* 添加内边距 */
  box-sizing: border-box;
}

.modal-content.drawtoast {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* 弹窗卡片 */
.modal-card {
 /* background-color: #ffffff; */
  border-radius: 60rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 100%; /* 使用100%相对于父容器 */
}

/* 标题栏 - 修复显示问题 */
.modal-header.topBar {
 height: 40px;
 border-radius: 30px 30px 0 0;
 /* background: linear-gradient(90deg, rgba(255, 88, 88, 1) 0%, rgba(240, 152, 25, 1) 100%); */
 background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
 display: flex;
 align-items: center;
 justify-content: center;
 color: #FFFFFF;
 font-size: 34rpx;
  
}

.modal-title.title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  /* nvue 可能需要使用 lines 属性控制显示行数 */
 lines: 2;
  text-overflow: ellipsis;
}

/* 内容区域 - 修复消息显示问题 */
.modal-body {
  padding: 20rpx 15rpx; /* 增加内边距 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120rpx; /* 增加最小高度 */
  box-sizing: border-box;
}

.modal-message {
  font-size: 28rpx;
  color: #333333;
  /* nvue 特有的文本样式 */
  lines: 0; /* 0 表示不限制行数 */
  text-overflow: ellipsis;
  word-wrap: break-word;
  padding-left: 20rpx;
  padding-right: 20rpx;
  line-height: 50rpx;
  text-align: left;
}

.modal-message-line {
  font-size: 28rpx;
  color: #333333;
  text-align: left;
  text-overflow: ellipsis;
  padding-left: 20rpx;
  padding-right: 20rpx;
  line-height: 50rpx
}

.message-lines {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15rpx;
}

/* 按钮区域 */
.modal-actions {
  padding: 0 30rpx 40rpx; /* 调整内边距 */
  box-sizing: border-box;
}

.action-buttons {
  display: flex;
  justify-content:space-around;
}

.action-buttons.horizontal-layout {
  flex-direction: row;
}

.action-buttons.vertical-layout {
  flex-direction: column;
  align-items: center;
}

.action-button {
  padding: 25rpx 40rpx; /* 增大按钮内边距 */
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150rpx; /* 最小宽度 */
  transition: all 0.3s ease;
  cursor: pointer;
  /* nvue 中可能需要使用固定宽度 */
  flex-shrink: 0; /* 防止缩小 */
}

.action-button.myButton {
  background-color: #ff5733;
  border: 1rpx solid #ff5733;
}

.action-button.secondary-button {
  background-color: #ffffff;
  border: 1rpx solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--warning-color);
  border-radius: 40rpx;
  padding: 0 var(--spacing-md);
  height: 60rpx;
  width: 80px;
}

.action-button.disabled {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  cursor: not-allowed;
  opacity: 0.6;
}

.button-text {
  font-size: 28rpx;
  font-weight: 500;
  text-align: center;
  /* nvue 文本样式 */
  lines: 1;
  text-overflow: ellipsis;
}

.action-button.myButton .button-text {
  color: #ffffff;
}

.action-button.secondary-button .button-text {
  color: #666666;
}

.action-button.disabled .button-text {
  color: #999999;
}

/* 不再提醒选项 */
.remind-option {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  padding: 0 30rpx;
  margin-bottom: 20rpx;
  cursor: pointer;
}

.remind-checkbox {
  width: 50rpx;
  height: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-icon {
  width: 25rpx;
  height: 25rpx;
  border-radius: 12rpx;
  border: 1rpx solid #c5c5c5;
  transition: all 0.3s ease;
}

.checkbox-icon.checked {
  background-color: rgba(255, 87, 51, 1);
  border-color: rgba(255, 87, 51, 1);
}

.remind-text {
  font-size: 24rpx;
  color: rgb(125, 125, 125);
  margin-left: 20rpx;
}

/* 动画效果 */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(50rpx) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-card {
  animation: modalFadeIn 0.3s ease-out;
}

/* nvue 适配 */
@media (orientation: portrait) {
  /* 竖屏样式 */
  .modal-wrapper {
    padding: 0 60rpx;
  }
  
  .modal-content.drawtoast {
    width: 630rpx; /* 750rpx - 120rpx */
  }
}

@media (orientation: landscape) {
  /* 横屏样式 */
  .modal-wrapper {
    padding: 0 100rpx;
  }
  
  .modal-content.drawtoast {
    width: 550rpx; /* 750rpx - 200rpx */
  }
  
  .action-buttons.horizontal-layout {
    flex-direction: column; /* 横屏时按钮垂直排列 */
    gap: 15rpx;
  }
}

/* 小屏幕适配 */
@media (max-width: 375px) {
  .modal-card {
    border-radius: 20rpx;
  }
  
  .modal-title.title {
    font-size: 30rpx;
  }
  
  .modal-message {
    font-size: 26rpx;
  }
  
  .action-button {
    padding: 20rpx 30rpx;
    min-width: 120rpx;
  }
}
</style>