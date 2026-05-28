+<template>
	<view class="main-container">
		<!-- <view class="title-container">
			<image class="icon-back" src="/static/icons/public/icon-back.png" mode="widthFix" @click="returnParent" />
			用户行为规范
		</view> -->
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="150rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">用户行为规范</text>
			</view>
			<view  style="width: 150rpx;">
				
			</view>
		</div>
		<scroll-view class="scroll-content" scroll-y="true">
			<view class="section">
				<view class="section-title">1. 合法使用</view>
				<view class="section-content">
					<view class="content-item">
						您在使用本APP时需遵守国家法律法规和相关规定，不得利用本APP从事任何非法，违法，或损害他人利益的行为。您应对您在本APP上的行为负责
					，并承担由此产生的所有法律责任
					</view>
					
				</view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">2. 禁止行为</view>
				<view class="section-content">
						在使用本APP时不得进行以下行为：
						<view class="content-item">发布，储存，传播违法，淫秽，恶意攻击，侵犯他人隐私等违反法律法规或社会工序良俗的信息；</view>
						<view class="content-item">利用本APP从事任何可能对本APP正常运营造成干扰或损害的行为；</view>
						<view class="content-item">未经授权，对本APP进行任何形式的修改，复制，传播或发行；</view>
				</view>
			</view>
		</scroll-view>
	</view>



</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			returnParent() {
				getApp().backParents();
			},
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	.main-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 30rpx;
	}
 /* 内容区域样式 */
  .scroll-content {
    flex: 1;
	padding-top: 40rpx;
  }
  
  .section {
  /* margin-bottom: 40rpx; */
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding-left: 30rpx;
    position: relative;
    line-height: 1.5;
  }
  
  .section-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8rpx;
    height: 32rpx;
    background-color: #07C160;
    border-radius: 4rpx;
  }
  
  .section-content {
    background-color: #f9f9f9;
	width: 660rpx;
    border-radius: 16rpx;
    padding: 24rpx 15rpx;
  }
  
  .content-item {
    font-size: 28rpx;
    color: #666;
    line-height: 1.8;
    margin-bottom: 20rpx;
    text-align: justify;
    position: relative;
    padding-left: 20rpx;
  }
  
  .content-item::before {
    content: "•";
    position: absolute;
    left: 5rpx;
    color: #07C160;
    font-weight: bold;
  }
  
  .content-item:last-child {
    margin-bottom: 0;
  }
</style>