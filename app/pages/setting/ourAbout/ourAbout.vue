<template>
	<view class="main-container" style="width: 100%;height: 100%;">
		
		<view class="settings-container">
			<view class="settings-row">
				<view class="settings-row-left">
					<view class="setting-txt">
						个人资料
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row">
				<view class="settings-row-left">
					<view class="setting-txt">
						意见反馈
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row">
				<view class="settings-row-left">
					<view class="setting-txt">
						客服中心
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="ourAbout">
				<view class="settings-row-left">
					<view class="setting-txt">
						系统设置
					</view> 
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view>
	
<!-- 		<div class="nav_row">
			<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;" @click="returnParent">
				<image src="/static/xixin/left.png" style="width: 25rpx;height: 40rpx; "></image></view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">系统设置</text>
			</view>
			<view style="width: 150rpx;"></view>
		</div>
		<div class="logoBox">
			
		</div>
		<div  class="setting_row" style="border-top: 4px solid rgba(243, 243, 249, 0.3);margin-top: 40rpx;" @click="toNorm" >
			<text class="setting_text">行为规范</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<image src="/static/xixin/right.png" style="width: 20rpx;height: 30rpx; "></image>
			</view>
		</div>
		<div  class="setting_row" @click="toServeice" >
			<text class="setting_text">服务协议</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<image src="/static/xixin/right.png" style="width: 20rpx;height: 30rpx; "></image>
			</view>
		</div>
		<div  class="setting_row"  @click="toPrivate" >
			<text class="setting_text">隐私政策</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<image src="/static/xixin/right.png" style="width: 20rpx;height: 30rpx; "></image>
			</view>
		</div>
		<div  class="setting_row" >
			<text class="setting_text">版本号</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<text style="font-size: 40rpx;color: rgba(105, 105, 105, 1);">{{version}}</text>
			</view>
		</div> -->
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				version:'1.0.0'
			}
		},
		onShow() {
			this.version=getApp().globalData.appVersion;
		},
		onHide() {
			// console.log('into onhide our');
		},
		methods: {
			returnParent() {
				getApp().backParents();
			},
			toPrivate()
			{
				uni.navigateTo({
					url:'/pages/setting/ourAbout/privateAbove/privateAbove'
				})
			},
			toServeice(){
				uni.navigateTo({
					url:'/pages/setting/ourAbout/serviceAbove/serviceAbove'
				})
			},
			toNorm(){
				uni.navigateTo({
					url:'/pages/setting/ourAbout/normAbove/normAbove'
				})
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
</style>
