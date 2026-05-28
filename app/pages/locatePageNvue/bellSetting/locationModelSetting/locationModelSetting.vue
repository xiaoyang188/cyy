<template>
	<div class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view">
				<uni-icons v-if="ruteNumber!='1'" @click="returnParent" type="left" style="" size="20" width="100rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">定位模式切换</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</div>
		<view class="mask" v-if="showFimwareTitle">
			<view>
				<view
					style="background-color: #FFFFFF;width:250px;height: 600rpx;border-radius: 25rpx;display: flex;flex-direction: column;align-items: center;">
					<view class="topBar" style="border-radius: 20rpx 20rpx 0 0 ">
						<text style="font-size: 40rpx;color: #FFFFFF;">功能提示</text>
					</view>
					<view style="margin-top: 10px;align-items: center;width: 90%;">
						<text style="padding-left: 20rpx;line-height: 55rpx;">设置项圈的工作模式为高频模式需要固件版本至少为46</text>
						<view><text style=" color: #ff4d2d;line-height: 55rpx;">点击跳过不设置，想要设置请先升级固件,升级后会自动切到高频模式</text>
						</view>
					</view>
					<view
						style="display: flex; flex-direction: row;justify-content: space-between;width: 250px;margin-top: 30rpx;margin-bottom: 30rpx;">
						<view></view>
						<button class="myButton" style="align-items: center;justify-content: center;"
							@click="firmware(false)">
							<text style="color: #FFFFFF;">跳过</text></button>
						<button class="myButton" @click="firmware(true)"><text
								style="color: #FFFFFF;">去升级</text></button>
						<view></view>
					</view>
				</view>
			</view>
		</view>
		<view
			style="width: 100%;height: 1400rpx;display: flex;flex-direction: column;align-items: center;justify-content: start;">
			<view @click="changeModol(1)"
				style="position: relative; height: 550rpx;width: 500rpx;background-color:rgba(255, 255, 255, 1) ; margin-top: 50rpx;display: flex;border-radius: 60rpx;flex-direction: column;align-items: center;justify-content: start;">

				<image src="/static/icons/locate_mode_setting/icon-search-mode.png"
					style="width: 150rpx;height: 150rpx;margin-top: 20rpx;">
				</image>
				<image src="/static/icons/locate_mode_setting/label-normal.png"
					style="width: 84rpx;position: absolute;top: 0;left: 30rpx;" mode="widthFix"></image>
				<view
					style="display: flex;flex-direction: row;align-items: center;justify-content: center;height: 100rpx;">
					<uni-icons v-if="modol!=1" type="checkbox-filled" size="30" width="150rpx"
						color="#ececec"></uni-icons>
					<uni-icons v-else type="checkbox-filled" size="30" width="150rpx"
						color="#ff4d2d"></uni-icons>
					<text style="font-weight: 500;">高频模式</text>
				</view>
				<text
					style="width: 80%;font-size: 27rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">高频模式下定位刷新会最快30秒左右更新一次</text>
				<text
					style="width: 80%;color:#FF5733 ;font-size: 23rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">*此模式下续航时间会大幅缩短（缩短到{{height}}左右）</text>
				<text
					style="width: 80%;color: #FF5733;font-size: 23rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">*从标准模式切换到高频模式可能等待较长时间</text>
					<text
						style="width: 80%;color: #FF5733;font-size: 23rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">*具体刷新时间受信号强弱影响</text>
			</view>
			<view @click="changeModol(0)"
				style="position: relative; height: 550rpx;width: 500rpx;background-color:rgba(255, 255, 255, 1) ; margin-top: 50rpx;display: flex;border-radius: 60rpx;flex-direction: column;align-items: center;justify-content: start;">
				<image src="/static/icons/locate_mode_setting/icon-normal-mode.png"
					style="width: 150rpx;margin-top: 50rpx;" mode="widthFix"></image>
				<view
					style="display: flex;flex-direction: row;align-items: center;justify-content: center;height: 100rpx;">
					<uni-icons v-if="modol===0" type="checkbox-filled" size="30" width="150rpx"
						color="#ff4d2d"></uni-icons>
					<uni-icons v-if="modol!=0" type="checkbox-filled" size="30" width="150rpx"
						color="#ececec"></uni-icons>
					<text style="font-weight: 500;">标准模式</text>
				</view>
				<text
					style="width: 80%;font-size: 27rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">标准模式下定位刷新频率会根据宠物运动情况智能调节</text>
				<text
					style="width: 80%;color:#FF5733; font-size: 23rpx;letter-spacing: 2px;line-height: 1.5;text-align: justify;">*续航时间较长待机时长可达{{stand}}左右（具体续航示定位情况而定）</text>
			</view>
			<view v-if="ruteNumber==='1'"
				style="height: 200rpx;width: 500rpx;display: flex;align-items: center;justify-content: center;flex-direction: column;">
				<button class="myButton" @click="guide()" style="width: 80%;margin: auto;font-size: 8;">下一步</button>
				<!-- <text style="font-size: 27rpx;"> 主页>点击设备>地图右上角按钮>定位模式</text> -->
			</view>
		</view>
		<custom-modal ref="modal" />
	</div>
</template>

<script>
	import util from '/common/util'
	import {
		wgs84_to_gcj02
	} from '/common/wgs84ToGcj02';
	import {
		getDeviceInfo
	} from '@/api/api/device'
	import {
		$uni
	} from "@/utils/main.js"
	import {sendCommand,getDeviceWorkMode} from "@/api/api/device.js"
	export default {
		data() {
			return {
				showGuide: false,
				modol: 1,
				serialCode: '',
				ruteNumber: '',
				showFimwareTitle: false,
				deviceId: '',
				stand:'30天',
				height:'一周'
			}
		},
		computed: {},
		onLoad(data) {
			console.log('serial', data.serialcode)
			console.log('rute', data.rute)
			this.ruteNumber = data.rute
			this.serialCode = data.serialcode
			this.deviceId = data.deviceId
			this.modol=data.modol
			console.log('this modol',this.modol)
			if(this.serialCode.substring(0,2)==='ae')
			{
				this.stand='七天'
				this.height='五天'
			}
			//第一次默认高频
			if (this.ruteNumber != '1') {
				getDeviceWorkMode(data.serialcode).then(recive=>{
					console.log('查询设备连接状态', recive);
					this.modol =recive.data.workMode.connect
					console.log('get this.modol',this.modol)
				})
				// let url = getApp().globalData.internet + getApp().globalData.checkConnectModel;
				// let dat = {
				// 	serial_code: data.serialcode,
				// }
				// util.requestDataJson(url, dat).then((rebackData) => {
				// 	console.log('查询设备连接状态', rebackData);
				// 	if (rebackData.statusCode === 200) {
				// 		if (rebackData.data.data.connect_mode_control != 1) {
				// 			this.modol = 0
				// 		}
				// 		if (rebackData.data.data.connect_mode_control === 1) {
				// 			this.modol = 1
				// 		}
				// 	}
				// })
			}

		},
		mounted() {

		},
		methods: {
			firmware(opt) {
				this.showFimwareTitle = false
				if (opt === true) {
					//如果是地图页面进来把蓝牙先断掉
					console.log('this.ruteNumber', this.ruteNumber)
					if (this.ruteNumber === '0') {
						uni.closeBLEConnection({
							deviceId: this.deviceId,
							success() {
								console.log('断开蓝牙成功')
							},
							complete: function() {
								getApp().globalData.openLadarBluetooth = false;
								uni.navigateTo({
									url: '/pages/setting/firmware/firmware?rute=1'
								})
							}
						})
						uni.stopBluetoothDevicesDiscovery({
							success(res) {
								console.log('停止蓝牙搜索')
							}
						})
						uni.closeBluetoothAdapter({
							success(res) {}
						})
					}
				} else {
					this.returnParent()
				}
			},
			submit(opt) {
				this.changeModol(this.modol)
				if (opt) {
					let that = this
					uni.showLoading({
						title: '跳转中...',
						mask: true
					});
					//#ifdef APP-HARMONY
					$uni.getLocation({
						type: 'gcj02',
						altitude: false,
						success(res) {
							console.log(res)
							let paramater = {
								serialCode: that.serialCode,
								rute: 'add',
								la: res.latitude,
								lo: res.longitude,
								wifi_la: '',
								wifi_lo: ''
							}
							uni.hideLoading()
							//如果是ae设备 直接跳转
							// if(that.serialCode.substring(0,2)==='ae')
							// {
							// 	uni.navigateTo({
							// 		url:'/pages/my/wifiSetting/catWifiSelect/catWifiSelect?paramater=' +
							// 			JSON.stringify(paramater)
							// 	})
							// }
							// else
							// {
								getDeviceInfo(that.serialCode).then((recivedata) => {
									console.log('获取设备信息', recivedata)
									getApp().globalData.myHardwareVersion = recivedata.data.deviceInfo
										.hardware_version
									if (getApp().globalData.myHardwareVersion < 38&&that.serialCode.substring(0,2)!='ae') {
										uni.navigateTo({
											url: '/pages/my/wifiSetting/homelocate/homelocate?paramater=' +
												JSON.stringify(paramater)
										})
								
									} else {
										uni.navigateTo({
											url: '/pages/my/wifiSetting/wifiSetting?paramater=' + JSON
												.stringify(paramater)
										})
									}
								
								})
							// }
						},
						fail(err) {
							uni.hideLoading()
							uni.showToast({
								title: JSON.stringify(err)
							})
						}
					})
					//#endif
					//#ifndef APP-HARMONY
					plus.geolocation.getCurrentPosition(function(p) {
						console.log('p', p)
						let pos = wgs84_to_gcj02(p.coords.longitude, p.coords
							.latitude)
						console.log('pos', pos)
						let paramater = {
							serialCode: that.serialCode,
							rute: 'add',
							la: pos[1],
							lo: pos[0],
							wifi_la: '',
							wifi_lo: ''
						}
						uni.hideLoading()
						getDeviceInfo(that.serialCode).then((recivedata) => {
							console.log('获取设备信息', recivedata)
							getApp().globalData.myHardwareVersion = recivedata.data.deviceInfo
								.hardware_version
							if (getApp().globalData.myHardwareVersion < 38) {
								uni.navigateTo({
									url: '/pages/my/wifiSetting/homelocate/homelocate?paramater=' +
										JSON.stringify(paramater)
								})

							} else {
								uni.navigateTo({
									url: '/pages/my/wifiSetting/wifiSetting?paramater=' + JSON
										.stringify(paramater)
								})
							}

						})


					}, function(e) {
						//alert('Geolocation error: ' + e.message);
						uni.hideLoading()
						uni.showToast({
							title: '找不到服务器了',
							icon: 'error'
						})
					});
					//#endif
				} else {
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			},
			guide() {
				// this.showGuide = true
				this.$refs.modal.show({
					title: '家庭wifi设置提醒',
					content: '设置家庭wifi后，可以提高宠物居家的定位精度，设置时请打开手机蓝牙功能，并确保设备在手机边上（如目前不在家里，也可选择取消并稍后在地图-设置里进行设置，不影响定位功能正常使用）',
					showCancel: true,
					confirmText: '继续',
					cancelText: '跳过',
					showFooter: true,
					success: () => {
						this.submit(true)
					},
					fail: () => {
						this.submit(false)
					}
				})
			},
			returnParent() {
				getApp().backParents();
			},
			changeModol(opt) {
				console.log('opt and modol', opt, this.modol, getApp().globalData.myFirewareVersion)
				if (opt === 1) {
					if (getApp().globalData.myFirewareVersion <= 45&&this.serialCode.substring(0,2)!='ae') {
						this.showFimwareTitle = true
						return
					}
				}
				let data = {
					serialCode: this.serialCode,
					commandType: 8,
					commandValue:opt
				}
				sendCommand(data).then(recivedata=>{
					console.log('设置设备链接长或短', recivedata);
					this.modol = opt
				})
				// let setConnectUrl = getApp().globalData.internet + getApp().globalData.switchConnectModel;
				// util.requestDataJson(setConnectUrl, data).then((rebackData) => {
				// 	console.log('设置设备链接长或短', rebackData);
				// 	if (rebackData.statusCode === 200 && rebackData.data.code === 200) {
				// 		this.modol = opt
				// 	}
				// }, (err) => {
				// 	console.log('err', err)
				// })

			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.nav {
		display: flex;
		justify-content: space-between;
		margin-left: 0%;
		padding-top: 15%;
		padding-bottom: 5%;
		align-items: center;
	}

	/* 	.mask {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.6);
	} */
</style>