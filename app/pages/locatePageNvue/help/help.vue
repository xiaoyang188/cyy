<template>
	<div class="container">
		<div class="nav_row" style="width: 100%;">
			<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;"
				@click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">帮助</text>
			</view>
			<view class="myicon">
				<uni-icons type="gear" style="margin-right: 35rpx;" size="35" width="150rpx"
					color="rgba(0,0,0,0)"></uni-icons>
			</view>
		</div>
		<div style="height: 75vh;width: 100%; background-color: rgba(255, 255, 255, 1.0);">
			<scroll-view scroll-y="true" style="height: 75vh;">
				<view v-for="(item, index) in helps_list">
					<div class="setting_row" style="border-top: 4px solid rgba(243, 243, 249, 0.3);"
						@click="toHelpPage(item.images_number,index)">
						<text class="setting_text" style="font-size: 30rpx;">{{item.help_content}}</text>
						<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
							<image src="/static/xixin/right.png" style="width: 15rpx;height: 20rpx; "></image>
						</view>
					</div>
				</view>
			</scroll-view>

		</div>
		<div style="display: flex;flex-direction: column; justify-content: center;align-items: center;width: 100%;margin-top: 40rpx;">
			<div @click="toFeedback">
				<image src="/static/xixin/messageboard.png" style="width: 100rpx;height: 100rpx;"></image>
			</div>
			<div style=" width: 72%;display: flex;align-items: center; justify-content: space-between;">
				<text style="color: rgba(128, 128, 128, 1);font-size: 25rpx;">
					如上述问题无法解决您的问题可点击留言板留言
				</text>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '/common/util';
	export default {
		data() {
			return {
				helps_list: [{
						help_content: "刚绑定好定位器，为什么没定位？",
						images_number: 1
					},
					{
						help_content: "绑带款定位器如何固定。",
						images_number: 1
					},
					{
						help_content: "定位不准，定位点飘？",
						images_number: 1
					},
					{
						help_content: "为什么我的电量无法使用一个月？",
						images_number: 1
					},
					{
						help_content: "宠物丢了我该如何找回？",
						images_number: 6
					},
					{
						help_content: "如何开启快速定位？",
						images_number: 1
					},
					{
						help_content: "如何使用雷达寻宠？",
						images_number: 3
					},
					{
						help_content: "如何把定位器共享给家人？",
						images_number: 2
					},
					{
						help_content: "如何开启声音和灯光？",
						images_number: 1
					},
					{
						help_content: "固件如何升级？",
						images_number: 4
					},
					{
						help_content: "显示宠物在身边，但就是找不到？",
						images_number: 1
					},
					{
						help_content: "定位更新频率可以自己设置嘛？",
						images_number: 1
					}
				]
			}
		},
		onLoad() {
			let requesturl = getApp().globalData.internet + getApp().globalData.appFeedbackHelp;
			console.log('requesturl',requesturl)
			let para = {}
			try {
				uni.request({
					url: requesturl,
					method: 'POST',
					success: (revice) => {
						 if(revice.data.code===200)
						 {
							 this.helps_list=revice.data.data.helps_list
							 console.log('this.helps_list',this.helps_list)
						 }
							
					},
				})
			} catch (err) {
			  console.error(err); // 打印错误信息
			}
		},
		methods: {
			toHelpPage(number, index) {
				console.log('into to helpage', number, index)
				let data = {
					imagesNumber: number,
					index: index
				}
				uni.navigateTo({
					url: '/pages/locatePageNvue/help/helpPage/helpPage?paramater=' + JSON.stringify(data)
				})
			},
			toFeedback() {

				uni.navigateTo({
					url: '/pages/setting/feedBackReport/feedBackReport'
				})
			},
			returnParent() {
				getApp().backParents();
			},
		}
	}
</script>

<style>
.container {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
	}
</style>