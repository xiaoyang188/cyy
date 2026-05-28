<template>
	<view class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="150rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">服务协议</text>
			</view>
			<view  style="width: 150rpx;">
			</view>
		</div>
		<scroll-view class="scroll-content" scroll-y="true">
			<view class="section">
			  <view class="section-title">总则</view>
			  <view class="section-content">
			    <view class="content-item">1. 请务必认真阅读和理解本《APP服务协议》(以下简称《协议》)中规定的所有权利和限制。</view>
			    <view class="content-item">2. 除非另有明确规定，宠悦悦APP平台所推出的新功能、新服务，均无条件的使用本协议。</view>
			    <view class="content-item">3. 宠悦悦APP平台保留在任何时候修改本协议条款的权利，且无需另行通知，用户在使用服务时应关注并遵守；当发生有关争议时，以最新的协议文本为准。</view>
			  </view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">用户注册</view>
				<view class="section-content">
					<view class="content-item">1. 用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“确认”按钮即表示用户完全接受本协议项下的全部条款。</view>
					<view class="content-item">2. 用户在使用本平台服务过程中应保证各项服务业务所需信息的真实性，如果因确认的信息不真实而引起的问题，并对问题发生所带来的后果，宠悦悦APP平台不负任何责任。</view>
					<view class="content-item">3. 注册时，请您选择填写用户名和密码，并按页面提示提交相关信息。您负有对用户名和密码保密的义务，并对该用户名和密码下发生的所有活动承担责任。请您不要把用户名、密码和注册时填写的个人信息提供给第三方网站或他人使用。</view>
					<view class="content-item">4. 在您注册和使用宠悦悦APP平台时，本平台会提示、收集您的部分个人信息资料，本平台不对外公开或向第三方提供用户的信息资料。仅会将这些资料用于：改进为您提供的服务及网页内容。</view>
				</view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">服务内容</view>
				<view class="section-content">
						<view class="content-item">1. 宠悦悦APP平台免费为用户提供服务，用户使用网络下载服务软件产生的流量费用需自行承担。</view>
						<view class="content-item">2. 除非本服务协议另有其它明示规定，本平台所推出的新产品、新功能、新服务，均受到本服务协议之规范。</view>
						<view class="content-item">3. 用户同意使用本平台进行在线寻宠、宠物运动数据查询等服务，由本平台根据实际情况提供。用户的使用行为视为其对服务条款以及本平台在服务中发出的各类公告的同意。</view>
				</view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">服务变更、中断或终止</view>
				<view class="section-content">
						<view class="content-item">1. 宠悦悦APP平台会定期或不定期的对本平台系统进行检修或维护，无需为此承担任何责任。</view>
						<view class="content-item">2. 鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为的存在及宠悦悦APP平台无法控制的情形），用户同意宠悦悦APP平台有权随时中断或终止部分或全部的服务。
						</view>
				</view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">用户使用规则</view>
				<view class="section-content">
						<view class="content-item">用户在使用系统过程中，应遵守国家相关法律和法规。</view>
						<view class="content-item"> 用户应遵守本平台网络服务协议的各项规定。</view>
						<view class="content-item"> 用户对以其账号发生的或通过其账号发生的一切活动和事件负全部法律责任。</view>
						<view class="content-item"> 用户不得为任何非法目的或利用本平台系统服务进行不正当活动。</view>
						<view class="content-item"> 用户不得对本平台系统服务任何部分或本平台系统服务中使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。</view>
				</view>
			</view>
			<view style="height: 40rpx;width: 100%;"></view>
			<view class="section">
				<view class="section-title">免费声明</view>
				<view class="section-content">
						<view class="content-item">鉴于本科技系统使用网络服务的特殊性，不担保网络服务一定满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性和准确性也不作担保。</view>
						<view class="content-item"> 对于因电信系统或互联网网络故障、计算机故障、计算机系统问题或其它任何不可抗力原因而产生损失， 本平台系统不承担任何责任，但将尽力减少因此给用户造成的损失和影响。</view>
				</view>
			</view>
			<view style="height: 50rpx;"></view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				statusBarHeight: 0
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
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
  .nav_row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	/* height: 100rpx; */
	height: auto;
	padding-bottom: 20rpx;
	position: sticky;
	top: 0;
	z-index: 100;
	background-color: #fff;
	padding-left: 30rpx;
	padding-right: 30rpx;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #fff;
	/* padding: 30rpx; */
	overflow: hidden;
  }
  
  
  /* 内容区域样式 */
  .scroll-content {
    flex: 1;
	height: 0;
    padding: 40rpx 30rpx 0 30rpx;
  }
  
  .section {
    /* margin-bottom: 40rpx; */
	/* margin-top: 40rpx; */
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