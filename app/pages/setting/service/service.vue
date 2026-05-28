<template>
	<div class="main-container">
<!-- 		<div class="nav_row">
			<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;" @click="returnParent">
							<image src="/static/xixin/left.png" style="width: 25rpx;height: 40rpx; "></image></view>
						<view style="display: flex;justify-content: center;width: 100%;">
							<text style="font-size: 50rpx;">客服中心</text>
						</view>
						<view style="width: 150rpx;"></view>
		</div> -->
		<div class="nav_row" >
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">客服中心</text>
			</view>
			<view  style="width: 150rpx;">
		
			</view>
		</div>
		<view class="col_center" style="width: 750rpx;margin-top: 100rpx;">
		  <view class="row_start" style="width: 600rpx; height: 200rpx;">
		    <image src="/static/imgs/home/logo.png" style="border-radius: 25rpx; width: 120rpx; height: 120rpx;"></image>
		    <view class="col_start" style="width: 480rpx; height: 200rpx; align-items: flex-start;justify-content: center;">
		     <div class="row_start server_phone" style="justify-content: flex-start; width: 100%;">
		       <text style="margin-left: 15rpx; font-size: 35rpx; color: #000000;">15395863798</text>
		     </div>
			  <view class="row_start server_time">
		        <view class="row_start">
		          <text style="margin-left: 15rpx; font-size: 32rpx; color: #000000;">时间：9:00-17:00(节假日除外)</text>
		        </view>
		      </view>
		     
		    </view>
		  </view>
		  <image v-if="haveLink" src="https://api.chongyueyue.cn/static/qiwei.jpeg" style="margin-top: 50rpx; width: 600rpx;height: 600rpx;border-radius: 15rpx;"></image>
		  <view v-if="haveLink" class="row_center" style="margin-top: 40rpx;" ><text style="color: #b1b1b1;font-size: 32rpx;ma">微信扫码联系您的专属客服</text></view>
		</view>
	
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				haveLink:false,
				imageWidth:150,
				imageHeight:150
			}
		},
		onLoad() {
			this.getImage()
		},
		methods: {
			returnParent(){
				getApp().backParents();
			},
			getImage(){
				let that=this
				uni.getImageInfo({
							src: 'https://api.chongyueyue.cn/static/qiwei_.jpeg',
							success: function (image) {
								this.imageHeight=image.height
								this.imageWidth=image.width
								that.haveLink=true
							},
							fail(err) {
								console.log('getimage fail',err)
								that.haveLink=false
							}
						});
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	.server_time{
		height: 60rpx;
		border-bottom: 1.5px #eeeeee solid;
		/* border-top: 1.5px #eeeeee solid; */
		
	}
	.server_phone{
		height: 60rpx;
		border-bottom: 1.5px #eeeeee solid;
	}
</style>
