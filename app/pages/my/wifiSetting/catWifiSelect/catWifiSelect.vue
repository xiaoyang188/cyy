<template>
	<view class="main-container">
		<!-- 	<view class="mask" v-if=freshing >
			<view class="drawtoast" style="width: 250px;">
				<view style="background-color: #ffffff;width:100%;border-radius: 30px;">
					<view class="topBar">
						<text class="title" style="color: #ffffff;">扫描WiFi中</text>
					</view>
					<view class="row_center" style="width: 100%;height: 100rpx;">
						<uni-icons type="spinner-cycle" style="font-size: 60rpx;"
							:style="{ transform: 'rotate('+ladarRotateAngle+'deg)'}" color="rgb(0,0,0)"></uni-icons>
					</view>
					<view class="row_center" style="width: 100%;height: 100rpx;">
						<text>{{presentShowLoading}}</text>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 	<view v-if="isShowGuild===5&&showWiFiList.length>0" class="mask">
			<view @click="skipGuild" class="col_start" style="position:absolute;top: 120rpx;left:100rpx">
				<image src="/static/imgs/home/skip.svg" style="width: 70rpx;height: 70rpx;"></image>
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 20rpx;">跳过引导</text>
			</view>
			<view class="col_start" style="position:absolute;top: 333rpx;left:200rpx">
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 40rpx;font-weight: 700;">选择宠物当前位置WIFI</text>
				<image src="/static/imgs/home/arrowHead.svg" style="width: 170rpx;height: 170rpx;"></image>
			</view>
		</view> -->
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">家庭WiFi</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</div>
		<view class="tip-txt">
			选择自己家或附近的wifi，提高居家定位精度
		</view>
		<div
			style="width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center;	margin: 0rpx auto;width: 625rpx;">
			<div style="width: 95%;height: 100rpx;display: flex;align-items: center;justify-content: space-between;">
				<text style="margin-top: 10rpx;margin-bottom: 10rpx;">已保存网络</text>
				<div @click="closeHelp">
					<image src="/static/icons/wifi_settings/help.png" style="width: 50rpx;height: 50rpx;"></image><text
						style="font-size: 35rpx;color: rgb(171, 171, 171);"></text>
				</div>
			</div>
		</div>
		<view class="settings-container" style="margin: 0 auto;">
			<view v-if="saveWifiList.length===0" class="last-item">
				<view class="settings-row-left">
					<image style="width: 30rpx;height: 30rpx;margin-top: 20rpx;margin-right: 20rpx;"
						src="/static/icons/wifi_settings/wifi0.png" mode="heightFix"></image>
					<view class="setting-txt">暂无</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view v-if="saveWifiList.length!=0" class="last-item" v-for="(item, index) in saveWifiList">
				<view class="settings-row-left">
					<image style="width: 30rpx;height: 30rpx;margin-top: 20rpx;margin-right: 20rpx;"
						src="/static/icons/wifi_settings/wifi3.png" mode="heightFix"></image>
					<view class="setting-txt hidden-over-text" style="width: 340rpx;">{{item.wifi_ssid}}</view>
				</view>
				<view class="trash-img-block" @click.stop="deleteWiFi($event, index)">
					<image class="trash-img" src="/static/icons/my/trash_fill.svg" />
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view>
		<div @click="reFresh(60)" style="display: flex;align-items: center;justify-content: center;width: 100%;">
			<div class="setting_row" style="margin: 0rpx auto;width: 625rpx;">
				<text style="margin-top: 10rpx;margin-bottom: 10rpx;">可用网络</text>
				<text style="margin-top: 10rpx;margin-bottom: 10rpx;">{{pagestatue}}</text>
				<image v-if="!freshing" style="width: 50rpx;" src="/static/icons/wifi_settings/refresh.png"
					mode="widthFix"></image>
				<uni-icons v-if="freshing" type="spinner-cycle" style="font-size: 60rpx;"
					:style="{ transform: 'rotate('+ladarRotateAngle+'deg)'}" color="rgb(0,0,0)"></uni-icons>
			</div>
		</div>
		<view style="position: relative;" :style="{ zIndex: isShowGuild === 5&&showWiFiList.length>0 ? 901 : 1 }">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="wifi-scroll-view" style="max-height: 720rpx;">
				<view style="background-color: white;"
					:class="{ 'last-item': index === showWiFiList.length - 1 ,'wifi-row':index != showWiFiList.length - 1}"
					v-for="(item, index) in showWiFiList" @click="clickWiFi(item,false)">
					<div class="wifi-row-left">
						<image :src="getWifiImage(item.strength)"
							style="width: 30rpx;height: 30rpx;margin-right: 20rpx;margin-top: 20rpx;">
						</image>
						<view class="setting-txt hidden-over-text" style="width: 400rpx;">{{item.wifi_ssid}}</view>
					</div>
				</view>
			</scroll-view>
		</view>
		<custom-modal ref="modal" />
	</view>
</template>

<script>
	// 引入必要的工具类（根据你的项目实际情况调整）
	import util from '/common/util';
	import {
		getHomeWifi,
		setHomeWifi
	} from "@/api/api/device.js"
	import {$uni} from '@/utils/main.js'
	
	export default {
		data() {
			return {
				freshing: false, // 是否正在刷新WiFi
				ladarRotateAngle: 0, // 加载动画旋转角度
				presentShowLoading: '', // 加载提示文字
				pagestatue: '', // 页面状态提示
				showWiFiList: [], // 展示的WiFi列表
				saveWifiList: [], // 已保存的WiFi列表
				serialCode: '', // 设备序列号
				bluetoothConnect: false, // 蓝牙是否连接
				isShowGuild: 0, // 是否显示引导
				scrollTop: 0, // 滚动条位置
				scanTimeOUt: null, // 扫描超时定时器
				checkBluetoothAdapterIntervel: null, // 蓝牙检查定时器
				latitude: '', // 纬度
				longitude: '', // 经度
				rute: '', // 路由信息
				isIOS: false, // 是否是iOS系统
				iosTip: 'iOS系统仅能获取当前已连接的WiFi信息', // iOS提示文字
				rotateTimer: null // 加载动画定时器
			}
		},
		onShow() {
			// 页面显示时初始化
			this.initPage()
			// 启动加载动画旋转
			this.startRotateAnimation()
			this.requestHomeWiFi()
		},
		onHide() {
			// 清理定时器
			clearInterval(this.checkBluetoothAdapterIntervel)
			this.checkBluetoothAdapterIntervel = null
			this.clearRotateAnimation()
			this.clearRefreshTimer()
			// 停止WiFi相关监听
			this.stopWifiListen()
		},
		onUnload() {
			// 页面卸载时清理所有资源
			this.clearRotateAnimation()
			this.clearRefreshTimer()
			clearInterval(this.checkBluetoothAdapterIntervel)
			this.checkBluetoothAdapterIntervel = null
			this.stopWifiListen()
		},
		onLoad(data) {
			// 获取页面参数
			console.log('页面参数', data)
			let paramater = JSON.parse(data.paramater)
			let that = this
			this.serialCode = paramater.serialCode
			this.rute = paramater.rute
			this.longitude = paramater.lo
			this.latitude = paramater.la
			// 判断系统类型
			this.isIOS = uni.getSystemInfoSync().platform === 'ios'
			// 初始化已保存的WiFi列表
			// this.requestHomeWiFi()
		},
		methods: {
			/**
			 * 初始化页面
			 */
			initPage() {
				this.pagestatue = ''
				this.presentShowLoading = ''
				this.freshing = false
			},
			/**
			 * 启动加载动画旋转
			 */
			startRotateAnimation() {
				this.clearRotateAnimation()
				this.rotateTimer = setInterval(() => {
					this.ladarRotateAngle = (this.ladarRotateAngle + 10) % 360
				}, 50)
			},
			/**
			 * 清除加载动画定时器
			 */
			clearRotateAnimation() {
				if (this.rotateTimer) {
					clearInterval(this.rotateTimer)
					this.rotateTimer = null
				}
			},

			/**
			 * 停止WiFi监听和扫描
			 */
			stopWifiListen() {
				//#ifdef APP-HARMONY
				$uni.offGetWifiList()
				$uni.stopWifi({
				//#endif
				//#ifndef APP-HARMONY
				uni.offGetWifiList()
				uni.stopWifi({
				//#endif
				
					success: () => {
						console.log('WiFi服务已停止')
					},
					fail: (err) => {
						console.error('停止WiFi服务失败:', err)
					}
				})
			},
			/**
			 * 获取WiFi列表（核心方法）
			 */
			async getWifiListHandler() {
				try {
					// 1. 初始化WiFi模块
					await this.initWifiModule()

					// 2. 根据系统类型获取WiFi列表
					if (this.isIOS) {
						// iOS仅能获取已连接的WiFi
						await this.getConnectedWifiForIOS()
					} else {
						// Android 和鸿蒙扫描附近所有WiFi
						await this.scanWifiForAndroid()
					}
					this.freshing = false;
					uni.showToast({
						title:'检测完成',
						icon:'none',
						duration:1000
					})
					this.pagestatue = this.showWiFiList.length > 0 ?
						`共找到${this.showWiFiList.length}个WiFi` :
						'未扫描到可用WiFi';

				} catch (error) {
					console.error('获取WiFi列表失败:', error)
					this.clearRefreshTimer()
					this.freshing = false;
					uni.showToast({
						title: '获取WiFi失败: ' + error.message,
						icon: 'none',
						duration: 3000
					})
					this.freshing = false
				}
			},
			/**
			 * 初始化WiFi模块
			 */
			initWifiModule() {
				return new Promise((resolve, reject) => {
					//#ifdef APP-HARMONY
					$uni.startWifi({
					//#endif
					//#ifndef APP-HARMONY
					uni.startWifi({
					//#endif
						success: () => {
							console.log('WiFi模块初始化成功')
							resolve()
						},
						fail: (err) => {
							console.error('初始化WiFi模块失败:', err)
							// 常见错误码处理
							if (err.errCode === 12000) {
								reject(new Error('当前系统不支持WiFi功能'))
							} else if (err.errCode === 12001) {
								reject(new Error('WiFi模块未初始化'))
							} else if (err.errCode === 12002) {
								reject(new Error('WiFi扫描失败'))
							} else {
								reject(new Error(err.errMsg || '初始化WiFi失败'))
							}
						}
					})
				})
			},
			/**
			 * iOS系统获取已连接的WiFi
			 */
			getConnectedWifiForIOS() {
				return new Promise((resolve, reject) => {
					uni.getConnectedWifi({
						success: (res) => {
							console.log('iOS获取已连接WiFi:', res)
							const wifiInfo = res.wifi
							// 构造统一格式的WiFi数据
							const wifiItem = {
								wifi_ssid: wifiInfo.SSID || '未知WiFi',
								wifi_mac: wifiInfo.BSSID || '',
								strength: wifiInfo.signalStrength || -50,
								wifi_location: {
									la: this.latitude,
									lo: this.longitude
								}
							}
							this.showWiFiList = [wifiItem]
							this.pagestatue = '共找到1个已连接WiFi'
							this.clearRefreshTimer()
							resolve()
						},
						fail: (err) => {
							console.error('iOS获取已连接WiFi失败:', err)
							if (err.errCode === 12003||err.errCode===12010) {
								reject(new Error('未连接到WiFi'))
							} else if (err.errCode === 12004) {
								reject(new Error('获取已连接WiFi信息失败，需要定位权限'))
							} else {
								reject(new Error(err.errMsg || '获取已连接WiFi失败'))
							}
						}
					})
				})
			},
			/**
			 * Android系统扫描附近WiFi
			 */
			scanWifiForAndroid() {
				return new Promise((resolve, reject) => {
					// 监听WiFi列表回调
					//#ifdef APP-HARMONY
					$uni.onGetWifiList((res) => {
					//#endif
					//#ifndef APP-HARMONY
					uni.onGetWifiList((res) => {
					//#endif
						console.log('Android扫描到WiFi列表:', res)
						if (res.wifiList && res.wifiList.length > 0) {
							// 格式化WiFi列表数据
							this.showWiFiList = res.wifiList.map(item => ({
								wifi_ssid: item.SSID || '隐藏WiFi',
								wifi_mac: item.BSSID || '',
								strength: item.signalStrength || -80,
								wifi_location: {
									la: this.latitude,
									lo: this.longitude
								}
							})).filter(item => {
								// 过滤空SSID的WiFi
								return item.wifi_ssid && item.wifi_ssid.trim() !== ''
							})
							this.pagestatue = `共找到${this.showWiFiList.length}个WiFi`
							uni.showToast({
								title: `已扫描到${this.showWiFiList.length}个WiFi`,
								icon: 'none'
							})
						} else {
							this.showWiFiList = []
							this.pagestatue = '未扫描到可用WiFi'
							uni.showToast({
								title: '未扫描到可用WiFi',
								icon: 'none'
							})
						}
						this.clearRefreshTimer()
						resolve()
					})

					//#ifdef APP-HARMONY
					$uni.getWifiList({
					//#endif
					//#ifndef APP-HARMONY
					uni.getWifiList({
					//#endif
						success: () => {
							console.log('开始扫描WiFi...')
							uni.showToast({
								icon: 'none',
								title: '正在扫描附近WiFi...'
							})
						},
						fail: (err) => {
							console.error('Android扫描WiFi失败:', err)
							
							//#ifdef APP-HARMONY
							$uni.offGetWifiList()
							//#endif
							//#ifndef APP-HARMONY
							uni.offGetWifiList()
							//#endif
							if (err.errCode === 12004) {
								reject(new Error('需要定位权限才能扫描WiFi'))
							} else {
								reject(new Error(err.errMsg || '扫描WiFi失败'))
							}
						}
					})
				})
			},
			/**
			 * 删除已保存的WiFi
			 */
			deleteWiFi(event, index) {
				console.log('我点击了删除')
				// 阻止事件冒泡
				event.stopPropagation()
				// 把要删除的wifi提交服务器
				this.$refs.modal.show({
					title: '温馨提示',
					content: '点击确认将会清除家庭wifi设置',
					showCancel: true,
					confirmText: '确认',
					cancelText: '取消',
					showFooter: true,
					success: () => {
						let url = getApp().globalData.internet + getApp().globalData.deleteHomeWifi;
						uni.request({
							url: url, //仅为示例，并非真实接口地址。
							method: 'POST',
							data: {
								serial_code: this.serialCode,
								wifi_mac: this.saveWifiList[index].wifi_mac
							},
							header: {
								'content-type': 'application/json' //重点
							},
							success: (res) => {
								console.log('删除结果', res)
								if (res.data.code === 200) {
									uni.showToast({
										title: "删除成功",
										icon: 'none'
									})
									// 本地删除对应项
									this.saveWifiList.splice(index, 1)
									setTimeout(() => {
										this.returnParent()
									}, 1000)
								} else {
									uni.showToast({
										title: res.data.msg || '删除失败',
										icon: 'none'
									})
								}
							},
							fail: ((err) => {
								console.log('删除结果失败', err)
								uni.showToast({
									title: err.errMsg || '网络错误',
									icon: 'none'
								})
							})
						});
					},
					fail: () => {
						console.log('不删除了')
					}
				})
			},
			/**
			 * 跳过引导
			 */
			skipGuild() {
				this.isShowGuild = 0
				uni.setStorageSync("isGuild", 0)
			},
			/**
			 * 请求已保存的家庭WiFi
			 */
			requestHomeWiFi() {
				// 这里替换为你实际的接口调用
				console.log('this.serialCode', this.serialCode)
				getHomeWifi(this.serialCode).then((res) => {
					console.log('requestHomeWiFi', res)
					if (res.data != null) {
						let list = []
						list.push({
							wifi_ssid: res.data.wifi_ssid,
							wifi_mac: res.data.wifi_mac
						})
						this.saveWifiList = list
					} else {
						console.log('家庭wifi设置是空的')
						this.reFresh(60)
						//#ifdef APP-HARMONY

						// #endif
					}
				}).catch((err) => {
					console.error('require wifi list fail', err)
				})
			},
			/**
			 * 点击WiFi项
			 */
			clickWiFi(item, opt) {
				var wifiMacList = new Array()
				var wifiStrengthList = new Array()
				for (let i = 0; i < this.showWiFiList.length; i++) {
					let mac = this.showWiFiList[i].wifi_mac
					let strength = this.showWiFiList[i].strength
					if (item.wifi_mac != mac) {
						wifiMacList.push(mac)
						wifiStrengthList.push(strength)
					}
				}
				let wifi = {
					version: 3,
					wifi_ssid: item.wifi_ssid,
					wifi_mac: item.wifi_mac,
					strength: item.strength,
					wifi_location: item.wifi_location,
					wifi_macList: wifiMacList,
					wifi_strength: wifiStrengthList,
					serialCode: this.serialCode,
				}
				let paramater = {
					wifiData: wifi,
					isAdd: opt,
					serialCode: this.serialCode,
					rute: this.rute,
					la: this.latitude,
					lo: this.longitude,
					wifi_macList: wifiMacList
				}
				//#ifndef APP-HARMONY
				uni.navigateTo({
					url: '/pages/my/wifiSetting/wifiLocateNew/wifiLocateNew?data=' + JSON.stringify(paramater)

				})
				//#endif
				//#ifdef APP-HARMONY
				$uni.isLocationEnabled({
					success: (res) => {
						if (res == false) {
							uni.showModal({
								title: "提示",
								content: "位置服务已关闭，是否重新开启定位服务？",
								success(res) {
									if (res.confirm) {
										$uni.requestGlobalSwitch(2)
									}
								}
							})
						} else {
							$uni.chooseLocation({
								location: {
									latitude: Number(this.latitude),
									longitude: Number(this.longitude)
								},
								searchEnabled: true,
								showNearbyPoi: true,
								success: (res) => {
									console.log("chooseLocation", res)
									let data = {
										version: 3,
										serialCode: this.serialCode,
										wifi_ssid: item.wifi_ssid,
										wifi_mac: item.wifi_mac,
										strength: item.strength,
										wifi_location: {
											la: res.location.latitude,
											lo: res.location.longitude
										},
										wifi_macList: wifiMacList,
										wifi_strength: wifiStrengthList
									}
									console.log('我点击了确认提交', data)
									try {
										// setHomeWifi(data).then((res)=>{
										// 模拟接口返回
										const res = {
											code: '200',
											msg: '设置成功'
										}
										console.log('require wifi list success', res)
										if (res.code === '200') {
											uni.showToast({
												title: '设置完成',
												icon: 'success'
											})
											setTimeout(() => {
												uni.navigateBack({
													delta: 4
												});
											}, 500)
										} else {
											uni.showToast({
												icon: 'none',
												title: res.msg
											})
										}
										// }).catch((err)=>{
										// 	console.error(err)
										// 	uni.showToast({
										// 		icon: 'none',
										// 		title: "请求未成功，请稍后在试"
										// 	})
										// })
									} catch (e) {
										console.log('提交异常', e)
									}
								},
								fail: (err) => {
									console.log('chooseLocationError', err)
								}
							})
						}
					},
					fail: (err) => {
						console.log("isLocationEnabled", err)
					}
				})
				//#endif
			},
			/**
			 * 返回上一页
			 */
			returnParent() {
				getApp().backParents();
			},
			/**
			 * 刷新WiFi列表
			 */
			async reFresh(timeout = 10000) {
				try {
					// 防止重复刷新
					if (this.freshing) return;
					this.freshing = true;
					this.showWiFiList = []
					this.pagestatue = '扫描中...'

					// 初始化UI状态
					uni.showToast({
						icon: 'none',
						title: '开始检测'
					})
					this.ladarRotateAngle = 0;

					// 清理之前的定时器
					this.clearRefreshTimer();

					// 检查定位服务
					let locate = await util.checkLocationServiceForAndroid()
					console.log("获取定位结果", locate)
					if (!locate) {
						uni.showModal({
							title: "温馨提示",
							content: "请打开定位服务后重新进入此页面",
							complete() {
								getApp().backParents();
							}
						})
						console.error("获取定位结果失败")
						this.freshing = false;
						return
					}
					// 设置超时检测
					this.scanTimeOUt = setTimeout(() => {
						this.handleScanTimeout();
					}, 10000);
					// 开始扫描WiFi
					await this.getWifiListHandler()

				} catch (error) {
					console.error('刷新出错', error);
					this.handleRefreshError(error);
				}
			},
			/**
			 * 清除刷新定时器
			 */
			clearRefreshTimer() {
				console.log('清除刷新时钟')
				if (this.scanTimeOUt) {
					clearTimeout(this.scanTimeOUt);
					this.scanTimeOUt = null;
				}
			},
			handleScanTimeout() {
				this.clearRefreshTimer();
				console.error("WiFi扫描超时了")
				if (this.freshing) {
					this.freshing = false;
					if (this.showWiFiList.length <= 0) {
						uni.showToast({
							title: this.isIOS ? '未连接到任何WiFi' : "没扫描到wifi，请稍后重新点击刷新按钮",
							icon: 'none'
						})
						this.pagestatue = '请稍后重试';
					}
				}
			},
			/**
			 * 处理刷新错误
			 */
			handleRefreshError(error) {
				this.freshing = false;
				this.clearRefreshTimer();
				console.error('Refresh error:', error);
				uni.showToast({
					title: error.message || '刷新失败',
					icon: 'none',
					duration: 3000
				})
			},
			/**
			 * 根据信号强度获取WiFi图标
			 */
			getWifiImage(strength) {
				if (strength <= -80) {
					return '/static/icons/wifi_settings/wifi1.png';
				} else if (strength <= -60) {
					return '/static/icons/wifi_settings/wifi2.png';
				} else {
					return '/static/icons/wifi_settings/wifi3.png';
				}
			},
			/**
			 * 关闭帮助提示（占位方法）
			 */
			closeHelp() {
				// 可实现帮助提示逻辑
				//#ifndef APP-HARMONY
				if(this.isIOS){
					uni.showToast({
						title: '温馨提示：iphone 请先连接WI-FI网络',
						icon: 'none'
					})
				}
				else{
					uni.showToast({
						title: '温馨提示：请不要选择热点网络',
						icon: 'none'
					})
				}
				//#endif
				//#ifdef APP-HARMONY
				//#endif
			}
		}
	}
</script>

<style>
	@import "/assets/css/seetings-row.css";

	.wifi-scroll-view {
		flex: 1;
		border-radius: 50rpx;
		margin: 30rpx auto;
		width: 585rpx;
		background-color: white;
		border-radius: 50rpx;
		padding: 20rpx;
		overflow: hidden;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	}

	.wifi-row {
		display: flex;
		border-bottom: 1rpx solid #E5E5E5;
		align-items: center;
		margin: 10rpx;
	}

	.wifi-row-left {
		flex: 1;
		display: flex;
	}

	.tip-txt-orange {
		width: 80%;
		color: #FF5733;
		font-size: 23rpx;
		line-height: 1.5;
		text-align: justify;
	}

	.icon-ble {
		position: absolute;
		right: 30rpx;
		width: 40rpx;
		margin: auto 0;
	}

	.tip-txt {
		margin: 20rpx auto;
		font-size: 23rpx;
		color: #808080;
		text-align: center;
		width: 100%;
	}

	.button {
		width: 120rpx;
		height: 50rpx;
		border-radius: 20rpx;
		background-color: rgb(47, 166, 160);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.button-hover {
		width: 120rpx;
		height: 50rpx;
		border-radius: 20rpx;
		background-color: rgb(61, 216, 206);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	/* 新增样式：加载弹窗样式优化 */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.drawtoast {
		background-color: transparent;
	}

	.topBar {
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;

		text-align: center;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.row_center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.col_start {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>