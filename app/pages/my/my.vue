<template>
	<view class="container">
		<view class="top-box">
			<view class="user-box" :style="{marginTop:`${statusBarHeight}px`,height:`calc(450rpx - ${statusBarHeight}px)`}">
				<view class="user-info" v-if="user">
					<cach-image :url="user.profileUrl" :fileMd5="user.profileUrl" width="130rpx" height="130rpx"
						radius="50%"></cach-image>
					<view class="info-box">
						<text class="user-nick">{{user.nickName}}</text>
						<view class="phone-box">
							<text class="user-phone">用户号{{user.phone}}</text>
							<image class="sex-img"
								:src="user.gender?'/static/new/man@3x.png':'/static/new/woman@3x.png'" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="top-bottom">
				<view class="top-bottom-box">
					<view class="top-bottom-top">
						<view class="top-bottom-left">
							<view class="mini-decorative-strip"></view>
							<text class="pet-info-title">宠物信息</text>
							<image class="pet-info-arrow" :src="darkMode=='light'?'/static/new/icon-arrow-black.svg':'/static/new/icon-arrow-white.svg'" mode=""></image>
						</view>
						<view class="top-bottom-right" @click="intoSwitch">
							<image class="switch-icon" src="/static/new/icon-switch-orange.svg" mode=""></image>
							<text class="switch-pet">切换宠物</text>
						</view>
					</view>
					<view class="pet-list-box">
						<scroll-view class="scroll-list" scroll-x="true" :show-scrollbar="false">
							<view class="scroll-content">
								<view class="pet-item" v-for="(item, index) in petlist" :key="index" @click="browsePet(item)">
									<image class="pet-avatar" :src="item.smallAvatarUrl ? item.smallAvatarUrl : '/static/new/default_avatar.png'" mode=""></image>
									<text class="pet-nick">{{item.nickname}}</text>
								</view>
								<view class="pet-item" @click="addpet">
									<image class="pet-avatar" :src="darkMode=='light'?'/static/imgs/add_pet/addPet.svg':'/static/new/addPet_black.svg'" mode=""></image>
									<text class="pet-nick">添加宠物</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="icon-list">
			<view class="icon-box">
				<view class="icon-item" @click="toPersonal">
					<view class="icon-left-box">
						<image class="icon-img" src="/static/new/icon-my01.png" mode=""></image>
						<text class="icon-text">个人资料</text>
					</view>
					<image class="icon-right-arrow" src="/static/new/img-info-arrow.png" mode=""></image>
				</view>
				<view class="icon-item" @click="toFeedback">
					<view class="icon-left-box">
						<image class="icon-img" src="/static/new/icon-my05.png" mode=""></image>
						<text class="icon-text">意见反馈</text>
					</view>
					<image class="icon-right-arrow" src="/static/new/img-info-arrow.png" mode=""></image>
				</view>
				<view class="icon-item" @click="service">
					<view class="icon-left-box">
						<image class="icon-img" src="/static/new/icon-my07.png" mode=""></image>
						<text class="icon-text">客服中心</text>
					</view>
					<image class="icon-right-arrow" src="/static/new/img-info-arrow.png" mode=""></image>
				</view>
				<view class="icon-item" @click="setting">
					<view class="icon-left-box">
						<image class="icon-img" src="/static/new/icon-my06.png" mode=""></image>
						<text class="icon-text">系统设置</text>
					</view>
					<image class="icon-right-arrow" src="/static/new/img-info-arrow.png" mode=""></image>
				</view>
		<!-- 		<view class="icon-item" @click="testCat">
					<view class="icon-left-box">
						<image class="icon-img" src="/static/new/icon-my06.png" mode=""></image>
						<text class="icon-text">test cat wifi</text>
					</view>
					<image class="icon-right-arrow" src="/static/new/img-info-arrow.png" mode=""></image>
				</view> -->
			</view>
		</view>
	</view>
	<!-- <div class="main-container">
		<div class="nav_row" style="height:100rpx">
		</div>
		<div class="row_center" v-if="user!=null">
			<view class="user-container">
				<cach-image :url="user.profileUrl" :fileMd5="user.profileUrl" width="150rpx" height="150rpx"
					radius="50%">
				</cach-image>
				<view class="col_start" style="margin-left: 20rpx;width: 435rpx;">
					<view class="row_between" style="width: 435rpx;">
						<text class="hidden-over-text" style="font-size: 38rpx;width: 350rpx;">{{user.nickName}}</text>
						<image :src='user.gender?"/static/imgs/home/boy.svg":"/static/imgs/home/girl.svg"'
							style="width: 60rpx;height: 60rpx;" radius="50%"></image>
					</view>
					<view class="row_between" style="width: 435rpx;">
						<text>用户号{{user.phone}}</text>
						<view style="width: 60rpx;height: 60rpx;"></view>
					</view>
				</view>
			</view>
		</div>


		<view class="pet-container"> -->
	<!-- 标题行 -->
	<!-- <view class="row_between" style="height: 40rpx; width: 100%;">
				<text style="margin-left: 30rpx;">宠物信息</text>
				<view @click="intoSwitch" class="row_center"
					style="margin-right: 30rpx; background: rgba(255, 87, 51, 1); border-radius: 20px; width: 150rpx; height: 50rpx;">
					<text style="color: #ffffff; font-size: 28rpx;">切换宠物</text>
				</view>
			</view> -->

	<!-- 宠物列表（水平滚动） -->
	<!-- <view
				style="width: 100%; height: 150rpx; overflow-x: auto; overflow-y: hidden; white-space: nowrap;">
				<view v-for="(item, index) in petlist" style="display: inline-block; height: 150rpx;">
					<div @click="browsePet(item)" class="col_center" style="width: 150rpx; height: 150rpx;">
						<view class="avatar-container" :class="{ 'active-border': index === 0 }"
							style="width: 104rpx;height: 104rpx;border-radius: 52rpx;">
							<image 
							  :src="item.small_avatar_url ? imgUrlPre + item.small_avatar_url : '/static/imgs/add_pet/avatar_default.png'"
							  style="border-radius: 50rpx; width: 100rpx; height: 100rpx;"
							></image>
							<cach-image :url="imgUrlPre+item.small_avatar_url" :fileMd5="item.avatar_url" width="0rpx" height="0rpx"></cach-image>
						</view>
						<view style="height: 30rpx;"><text style="font-size: 27rpx;">{{item.nickname}}</text></view>
					</div>

				</view>
				<view @click="addpet" style="display: inline-block; height: 160rpx;">
					<div class="col_center" style="width: 150rpx; height: 160rpx;">
						<view style="width: 104rpx;height: 104rpx;border-radius: 52rpx;">
							<image src="/static/imgs/add_pet/addPet.svg" style=" border-radius: 50rpx;width: 100rpx;height: 100rpx;"></image>
						</view>
						<view style="height: 30rpx;"><text style="font-size: 27rpx;">添加宠物</text></view>
					</div>
				</view>
			</view>
		</view>
		<view class="settings-container">
			<view class="settings-row" @click="toPersonal">
				<view class="settings-row-left">
					<image class="settings-img" src="/static/icons/my/account.png" mode="widthFix" />
					<view class="setting-txt">
						个人资料
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="toFeedback">
				<view class="settings-row-left">
					<image class="settings-img" src="/static/icons/my/customer-service.png" mode="widthFix" />
					<view class="setting-txt">
						意见反馈
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="service">
				<view class="settings-row-left">
					<image class="settings-img" src="/static/icons/my/feedback.png" mode="widthFix" />
					<view class="setting-txt">
						客服中心
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="setting" style="border-bottom: none;">
				<view class="settings-row-left">
					<image class="settings-img" src="/static/icons/my/system-settings.png" mode="widthFix" />
					<view class="setting-txt">
						系统设置
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view> 

	</div>-->
</template>

<script>
	import {
		getUserInfo
	} from '@/api/api/user'
	import {
		wgs84_to_gcj02
	} from '/common/wgs84ToGcj02';
	export default {
		data() {
			return {
				statusBarHeight: 80,
				darkMode:'light',
				petlist: new Array(),
				queryIsUpdate: false,
				user: null
			}
		},
		onLoad() {
			uni.$on('darkMode', this.darkModeChange)
		},
		onUnload() {
			uni.$off('darkMode', this.darkModeChange)
		},
		onShow() {
			uni.$off('darkMode', this.darkModeChange)
			uni.$on('darkMode', this.darkModeChange)
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight ?? 0
					this.darkMode=res.osTheme
				}
			})
			this.queryIsUpdate = getApp().globalData.redCircleShow;
			this.getPetList()
			console.log('getApp().globalData.presentPet', getApp().globalData.presentPet)
			// let pid = getApp().globalData.presentPet[0].pid
			// this.getUser(pid)
			// let uid = getApp().globalData.uid
			this.getUser()
		},
		methods: {
			darkModeChange(theme){
				console.log('onTheme',theme)
				this.darkMode = theme
			},
			addpet() {
				uni.navigateTo({
					url: "/pages/add-pet/add-pet?item="
				})
			},
			intoSwitch() {
				uni.navigateTo({
					url: '/pages/home/switchPet/switchPet'
				})
			},
			toPersonal() {
				let userStr = JSON.stringify(this.user)
				console.log("userStr", userStr)
				uni.navigateTo({
					url: '/pages/my/personalMessage/personalMessage?para=' + userStr
				})
			},
			browsePet(item) {
				console.log('removepet', item);
				//删除宠物的话需要更新当前宠物全局变量和设备
				uni.navigateTo({
					url: '/pages/add-pet/add-pet?item=' + JSON.stringify(item)
				})
			},
			returnParent() {
				getApp().backParents();
			},
			toFeedback() {
				uni.navigateTo({
					url: '/pages/setting/feedBackReport/feedBackReport'
				})
			},
			service() {
				uni.navigateTo({
					url: '/pages/setting/service/service'
				})
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			testCat(){
				plus.geolocation.getCurrentPosition(function(p) {
					console.log('p', p)
					let pos = wgs84_to_gcj02(p.coords.longitude, p.coords
						.latitude)
					console.log('pos', pos)
					let paramater = {
						serialCode: 'be1904084c10',
						rute: 'add',
						la: pos[1],
						lo: pos[0],
						wifi_la: '',
						wifi_lo: ''
					}
					uni.hideLoading()
					uni.navigateTo({
						url: '/pages/my/wifiSetting/catWifiSelect/catWifiSelect?paramater=' + JSON
							.stringify(paramater)
					})
				}, function(e) {
					//alert('Geolocation error: ' + e.message);
					uni.hideLoading()
					uni.showToast({
						title: '找不到服务器了',
						icon: 'error'
					})
				});
				
			},
			getPetList() {
				this.petlist = null;
				// if (getApp().globalData.allData.length > 0) {
				// 	var pets = new Array();
				// 	getApp().globalData.allData.forEach((item, index) => {
				// 		if (item.pet_account)
				// 			pets.push(item.pet_account);
				// 	})

				// 	this.petlist = pets;
				// } else {
				// 	this.petlist = new Array();
				// }
				this.petlist=getApp().globalData.allPets
				console.log('this pet list', this.petlist)
			},
			getUser() {
				getUserInfo().then((recivedata) => {
					console.log('recivedata.data.user', recivedata)
					this.user = recivedata.data.user
				})
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.container {
		width: 100vw;
		height: 100vh;
		background-color: #F4F5F7;
	}

	.top-box {
		width: 100%;
		height: 650rpx;
		background-image: url('/static/new/my_bg.png');
		background-size: 100% 450rpx;
		background-repeat: no-repeat;
		position: relative;
	}

	.user-box {
		width: 100%;
		justify-content: center;
	}

	.user-info {
		height: 130rpx;
		margin-left: 30rpx;
		flex-direction: row;
		position: absolute;
	}

	.info-box {
		height: 130rpx;
		justify-content: center;
		margin-left: 24rpx;
		gap: 10rpx;
	}

	.user-nick {
		font-size: 34rpx;
		color: white;
		font-weight: bold;
	}

	.phone-box {
		flex-direction: row;
		gap: 10rpx;
		justify-content: center;
		align-items: center;
	}

	.user-phone {
		color: white;
		font-size: 28rpx;
	}

	.sex-img {
		width: 30rpx;
		height: 30rpx;
	}

	.top-bottom {
		width: 100%;
		height: 300rpx;
		/* position: absolute;
		bottom: 0; */
		padding: 20rpx;
	}
	.top-bottom-box{
		background-color: white;
		border-radius: 20rpx;
		width: 100%;
		height: 100%;
	}
	.top-bottom-top{
		width: 100%;
		height: 80rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.top-bottom-left{
		height: 100%;
		flex-direction: row;
		align-items: center;
		margin-left: 20rpx;
	}
	.mini-decorative-strip{
		width: 6rpx;
		height: 22rpx;
		border-radius: 50rpx;
		background: #FA5300;
	}
	.pet-info-title{
		margin-left: 10rpx;
		font-size: 28rpx;
	}
	.pet-info-arrow{
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
	.top-bottom-right{
		height: 100%;
		align-items: center;
		flex-direction: row;
		margin-right: 30rpx;
		gap: 10rpx;
	}
	.switch-icon{
		width:25rpx;
		height: 25rpx;
	}
	.switch-pet{
		color: #FA5300;
		font-size: 25rpx;
	}
	.pet-list-box{
		flex: 1;
		flex-direction: row;
		padding: 0 20rpx 20rpx 20rpx;
	}
	.scroll-list{
		height: 100%;
	}
	.scroll-content{
		display: flex;
		flex-direction: row;
		gap: 63rpx;
	}
	.pet-item{
		width: 120rpx;
		gap: 10rpx;
	}
	.pet-avatar{
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
	}
	.pet-nick{
		width: 120rpx;
		font-size: 24rpx;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.icon-list{
		width: 100%;
		height: 440rpx;
		padding: 0 20rpx;
	}
	.icon-box{
		width: 100%;
		height: 100%;
		background-color: white;
		border-radius: 20rpx;
	}
	.icon-item{
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
	.icon-left-box{
		height: 50rpx;
		flex-direction: row;
		gap: 20rpx;
	}
	.icon-img{
		width: 50rpx;
		height: 50rpx;
	}
	.icon-text{
		height: 100%;
		font-size: 32rpx;
		align-content: center;
	}
	.icon-right-arrow{
		width: 40rpx;
		height: 40rpx;
	}
	
	/* #ifdef APP-HARMONY */
	@media (prefers-color-scheme: dark){
		.container {
			width: 100vw;
			height: 100vh;
			background-color: #0A0B14;
		}
		.top-box {
			width: 100%;
			/* height: 650rpx; */
			background-image: url('/static/new/my_bg_black.png');
			background-size: 100% 450rpx;
			background-repeat: no-repeat;
			position: relative;
		}
		.top-bottom-box{
			background-color: #1F212E;
			border-radius: 20rpx;
			width: 100%;
			height: 100%;
		}
		.icon-box{
			width: 100%;
			height: 100%;
			background-color: #1F212E;
			border-radius: 20rpx;
		}
	}
	/* #endif */
	
	
</style>
