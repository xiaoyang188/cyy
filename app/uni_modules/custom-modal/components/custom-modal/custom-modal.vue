<template>
  <view v-if="innerShow" class="mask" style="z-index: 999;" @tap="onMaskClick">
    <view class="custom-modal-container" @tap.stop>
      <!-- 标题 -->
      <view v-if="innerTitle" class="topBar">{{ innerTitle }}</view>

      <!-- 内容 -->
      <view class="custom-modal-content">
        <slot>
          <text class="custom-modal-message">{{ innerContent }}</text>
        </slot>
      </view>
      <!-- 底部按钮 -->
      <view v-if="innerShowFooter" class="custom-modal-footer">
        <button v-if="innerShowCancel" class="myButton" @tap="onCancel">{{ innerCancelText }}</button>
        <button v-if="innerShowConfirm" class="myButton" @tap="onConfirm">{{ innerConfirmText }}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "custom-modal",
  data() {
    return {
      innerShow: false,
      innerTitle: '',
      innerContent: '',
      innerShowCancel: false,
      innerShowConfirm: true,
      innerCancelText: '取消',
      innerConfirmText: '确定',
      innerShowFooter: true,
      innerMaskClosable: true,
      confirmCallback: null,
      cancelCallback: null,
      timer: null
    }
  },
  methods: {
    show(options = {}) {
      // 重置所有状态
      this.innerShow = true
      this.innerTitle = options.title || ''
      this.innerContent = options.content || ''
      this.innerShowCancel = options.showCancel !== false
      this.innerShowConfirm = options.showConfirm !== true
      this.innerCancelText = options.cancelText || '取消'
      this.innerConfirmText = options.confirmText || '确定'
      this.innerShowFooter = options.showFooter !== false
      this.innerMaskClosable = options.maskClosable !== false
      this.confirmCallback = options.success || options.onConfirm
      this.cancelCallback = options.fail || options.onCancel
      // 自动关闭定时器
      if (options.duration) {
        this.clearTimer()
        this.timer = setTimeout(() => {
          this.hide()
        }, options.duration)
      }
    },
    
    hide() {
      this.innerShow = false
      this.clearTimer()
      this.$emit('close')
    },
    
    onConfirm() {
      this.hide()
      this.confirmCallback && this.confirmCallback()
      this.$emit('confirm')
    },
    
    onCancel() {
      this.hide()
      this.cancelCallback && this.cancelCallback()
      this.$emit('cancel')
    },
    
    onMaskClick() {
      if (this.innerMaskClosable) {
        this.hide()
      }
    },
    
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },
  beforeUnmount() {
    this.clearTimer()
  }
}
</script>
<style>
	@import"/assets/css/seetings-row.css";
	.custom-modal-footer{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 50rpx;
	}
	.custom-modal-container{
		width: 250px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: rgb(255,255,255);
		border-radius: 30px;
	}
	.custom-modal-content{
		width: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 25rpx;
		margin-bottom: 25rpx;
	}
	.custom-modal-message{
		/* text-indent: 1.5em; */
		font-size: 32rpx;
		line-height: 55rpx;
		align-items: center;
		justify-content: center;
	}
	
	@media (prefers-color-scheme: dark){
		.custom-modal-container{
			width: 250px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			background-color: #3d3d3d;
			border-radius: 30px;
		}
	}
</style>