<template>
	<div class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">定位设置</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</div>
		<div class="mask" v-if="showMask" @click="hideMask">
		</div>
		<view class="settings-container">
			<view class="settings-row" @click="toWifiSetting">
				<view class="settings-row-left">
					<view class="setting-txt">
						家庭WiFi
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<!-- #ifndef APP-HARMONY -->
			<div class="settings-row" @click="changeMode">
				<view class="settings-row-left">
					<view class="setting-txt">
						地图图层
					</view>
				</view>
				<view style="display: flex;align-items: center;">
			
					<text style="color: #ff0000;font-size: 25rpx;">{{mapShowMode}}</text>
			
					<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
				</view>
			
			</div>
			<!-- #endif -->
			<view class="settings-row" @click="toModeSetting">
				<view class="settings-row-left">
					<view class="setting-txt">
						定位模式
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class=" last-item">
				<view class="settings-row-left">
					<view class="setting-txt">
						行车模式
					</view>
				</view>
				<switch v-if="showSwitch" color="rgba(255, 87, 51, 1)" style="transform:scale(0.7)" :checked='carIsOpen'
					@change="switch1Change" />
			</view>
		</view>
		<div v-show="isShowMap" class="user-select" id='container'
			:class="{expend:petPopoverVisible,closeContainer:petHide}">
			<div class="battery-title"><text>图层样式</text></div>
			<div class="batteryRow" @click="clickBattery(true)"
				:class="{batteryRowClick:clickMode,batteryRow:!clickMode}">
				<view>
					<text>卫星图层</text>
				</view>

				<view style="position: relative;">
					<image src="/static/imgs/locate/map2.png" style="width: 90rpx;height: 90rpx;"></image>
				</view>

			</div>
			<div class="batteryRow" @click="clickBattery(false)"
				:class="{batteryRowClick:!clickMode,batteryRow:clickMode}">
				<view><text>平面图层</text></view>
				<view>
					<image src="/static/imgs/locate/map1.png" style="width: 90rpx;height: 90rpx;"></image>
				</view>
			</div>
		</div>

		<!-- 		<div class="setting_row" style="border-top: 4px solid rgba(243, 243, 249, 0.3);margin-top: 40rpx;"
			@click="toWifiSetting">
			<text
				style="margin-left: 40rpx;font-size: 40rpx;color: rgba(105, 105, 105, 1);">家庭WiFi</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<image src="/static/xixin/right.png" style="width: 20rpx;height: 30rpx; "></image>
			</view>
		</div>
		<div class="setting_row" style="border-top: 4px solid rgba(243, 243, 249, 0.3);margin-top: 40rpx;"
			@click="toModeSetting">
			<text
				style="margin-left: 40rpx;font-size: 40rpx;color: rgba(105, 105, 105, 1);">定位模式</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 40rpx;width: 100rpx;">
				<image src="/static/xixin/right.png" style="width: 20rpx;height: 30rpx; "></image>
			</view>
		</div>
		<div class="setting_row"  style="border-top: 4px solid rgba(243, 243, 249, 0.3);margin-top: 40rpx;" >
			<text
				style="margin-left: 40rpx;font-size: 40rpx;color: rgba(105, 105, 105, 1);">行车模式</text>
			<text style="font-size: 20rpx;color: rgba(105, 105, 105, 1);">（开启后设备在汽车上定位更准）</text>
			<view style="display: flex;justify-content: end;align-items: center;margin-right: 20rpx;width: 100rpx;">
				<switch v-if="showSwitch" color="#2fa6a0" style="transform:scale(0.7)" :checked='carIsOpen' @change="switch1Change" />
			</view>
		</div> -->
	</div>
</template>

<script>
	import util from '/common/util'
	import {
		wgs84_to_gcj02
	} from '/common/wgs84ToGcj02';
	export default {
		data() {
			return {
				serialCode: '',
				latitude: '',
				longitude: '',
				deviceId: '',
				phoneLa: '',
				phoneLo: '',
				carIsOpen: 1,
				showSwitch: true,
				isShowMap: false,
				showMask: false,
				petPopoverVisible: false,
				petHide: false,
				mapShowMode: '平面图层',
				clickMode: false,
			}
		},
		computed: {},
		onShow() {
			this.requireWiFiList()
			this.requireCarStatue()
		},
		onLoad(data) {

			this.serialCode = data.serialcode
			this.deviceId = data.deviceId
			this.phoneLa = data.la
			this.phoneLo = data.lo
			console.log('data.la', data.la)
			this.clickMode = uni.getStorageSync('mapShowMode')
			if (this.clickMode === '')
				this.clickMode = false
			if (this.clickMode === true) {
				this.mapShowMode = '卫星图层'
			} else if (this.clickMode === false) {
				this.mapShowMode = '平面图层'
			}
		},
		mounted() {

		},
		methods: {
			clickBattery(mode) {
				//改变全局变量加缓存
				if (mode === true) {
					this.mapShowMode = '卫星图层'
				} else if (mode === false) {
					this.mapShowMode = '平面图层'
				}
				this.clickMode = mode;
				getApp().globalData.mapShowMode = mode
				uni.setStorageSync('mapShowMode', mode)
			},
			changeMode() {
				this.hideMask();
			},
			hideMask() {
				this.isShowMap = !this.isShowMap
				this.showMask = !this.showMask
				this.petPopoverVisible = !this.petPopoverVisible
				this.petHide = !this.petPopoverVisible
			},
			transformWifiData(data) {
				let transformedData = {};
				for (let key in data) {
					let wifiInfo = data[key];
					wifiInfo.wifi_mac = key;
					transformedData[key] = wifiInfo;
				}
				// 将转换后的对象放入数组中，‌以满足题目要求的格式
				let result = Object.values(transformedData);
				return {
					data: result
				};
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				if (e.detail.value === true) {
					this.setCarStatue(1)
				} else {
					this.setCarStatue(0)
				}
			},
			requireCarStatue() {
				console.log('this.serialCode', this.serialCode)
				try {
					let url = getApp().globalData.internet + getApp().globalData.getCarSwitch;
					let dat = {
						serial_code: this.serialCode
					}
					console.log('data', dat)
					util.requestDataJson(url, dat).then((reciveData) => {
						console.log('获得的行车定位状态', reciveData)
						if (reciveData.data.code === 200)
							this.carIsOpen = reciveData.data.data.car_switch
					})
				} catch (e) {
					console.log('e', e)
				}

			},
			setCarStatue(modol) {
				let url = getApp().globalData.internet + getApp().globalData.setCarSwitch;
				let data = {
					serial_code: this.serialCode,
					car_switch: modol
				}
				util.requestDataJson(url, data).then((reciveData) => {
					console.log('设置行车定位状态', reciveData)
					if (reciveData.data.code === 200) {
						this.carIsOpen = modol
						uni.showToast({
							title: "修改成功",
							icon: "success"
						})
					} else {
						let that = this
						uni.showModal({
							title: '设置出错',
							content: reciveData.data.msg,
							success: function(res) {
								that.showSwitch = false
								setTimeout(() => {
									that.showSwitch = true
								}, 50)
							}
						})
					}
				})
			},
			requireWiFiList() {
				let url = getApp().globalData.internet + getApp().globalData.queryHomeWifi;
				uni.request({
					url: url, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						serial_code: this.serialCode,
					},
					header: {
						'Content-Type': 'application/json' //重点
					},
					success: (res) => {
						console.log('wifi list', JSON.stringify(res))
						if (res.data.data != null) {
							console.log('获取家庭wifi', res)
							let transData = this.transformWifiData(res.data.data)

							console.log('transData', transData)
							let data = transData.data
							this.latitude = data[0].wifi_location.la
							this.longitude = data[0].wifi_location.lo

						} else {
							console.log('家庭wifi设置是空的')
						}
					},
					fail: ((err) => {
						console.log('require wifi list fail', JSON.stringify(err))
					})
				});
			},
			returnParent() {
				getApp().backParents();
			},
			toModeSetting() {
				uni.navigateTo({
					url: '/pages/locatePageNvue/bellSetting/locationModelSetting/locationModelSetting?serialcode=' +
						this.serialCode + '&rute=0' + '&deviceId=' + this.deviceId
				})
			},
			toWifiSetting() {
				let that = this
				let paramater = {
					serialCode: that.serialCode,
					rute: 'set',
					la: this.phoneLa,
					lo: this.phoneLo,
					wifi_la: this.latitude,
					wifi_lo: this.longitude
				}
				// uni.navigateTo({
				// 	url:'/pages/my/wifiSetting/catWifiSelect/catWifiSelect?paramater=' + JSON.stringify(paramater)
				// })
				if(that.serialCode.substring(0,2)==='ae'){
					// uni.navigateTo({
					// 	url:'/pages/my/wifiSetting/catWifiSelect/catWifiSelect?paramater=' + JSON.stringify(paramater)
					// })
					uni.navigateTo({
						url: '/pages/my/wifiSetting/wifiSetting?paramater=' + JSON.stringify(paramater)
					})
				}else{
					if (getApp().globalData.myHardwareVersion >= 38) {
						uni.navigateTo({
							url: '/pages/my/wifiSetting/wifiSetting?paramater=' + JSON.stringify(paramater)
						})
					} else {
						//#ifndef APP-HARMONY
						uni.navigateTo({
							url: '/pages/my/wifiSetting/homelocate/homelocate?paramater=' + JSON
								.stringify(paramater)
						})
						//#endif
						//#ifdef APP-HARMONY
						uni.showModal({
							title:"提示",
							content:"由于定位器过于陈旧，请更换定位器。"
						})
						//#endif
					}
				}
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
</style>