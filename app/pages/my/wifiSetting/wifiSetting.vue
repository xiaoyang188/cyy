<template>
	<view class="main-container">
		<view class="mask" v-if="freshing">
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
		</view>

		<view v-if="isShowGuild===5&&showWiFiList.length>0" class="mask">
			<view @click="skipGuild" class="col_start" style="position:absolute;top: 120rpx;left:100rpx">
				<image src="/static/imgs/home/skip.svg" style="width: 70rpx;height: 70rpx;"></image>
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 20rpx;">跳过引导</text>
			</view>
			<view class="col_start" style="position:absolute;top: 333rpx;left:200rpx">
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 40rpx;font-weight: 700;">选择宠物当前位置WIFI</text>
				<image src="/static/imgs/home/arrowHead.svg" style="width: 170rpx;height: 170rpx;"></image>
			</view>
		</view>
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">家庭WiFi</text>
			</view>
			<view style="width: 150rpx;">
				<image
					:src="bluetoothConnect ? '/static/icons/wifi_settings/bluetooth.png':'/static/icons/wifi_settings/bluetoothGray.png'"
					style="width: 24rpx;height: 35rpx;"></image>
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
					<!-- <view class="setting-txt">{{item.wifi_mac}}</view> -->
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view v-if="saveWifiList.length!=0" class="last-item" v-for="(item, index) in saveWifiList"
				>
				<view class="settings-row-left">
					<image style="width: 30rpx;height: 30rpx;margin-top: 20rpx;margin-right: 20rpx;"
						src="/static/icons/wifi_settings/wifi3.png" mode="heightFix"></image>
					<view class="setting-txt hidden-over-text" style="width: 340rpx;">{{item.wifi_ssid}}</view>
					<!-- <view class="setting-txt">{{item.wifi_mac}}</view> -->
				</view>
				<view class="trash-img-block" @click.stop="deleteWiFi($event, index)">
					<image class="trash-img" src="/static/icons/my/trash_fill.svg" />
				</view>
				<image @click="clickWiFi(item,true)" class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view>
		<view style="margin: 0rpx auto;width: 605rpx;margin-top: 10rpx;">
			<view class="tip-txt-orange">*请打开手机蓝牙功能，并确保设备在手机边上。(仅支持2.4GWi-Fi)</view>
			<view class="tip-txt-orange"></view>
		</view>
		<div @click="reFresh(60)" style="display: flex;align-items: center;justify-content: center;width: 100%;">
			<div class="setting_row" style="margin: 0rpx auto;width: 625rpx;">
				<text style="margin-top: 10rpx;margin-bottom: 10rpx;">可用网络</text>
				<text style="margin-top: 10rpx;margin-bottom: 10rpx;">{{pagestatue}}</text>
				<!-- 				<uni-icons v-if="!freshing" type="refreshempty" style="font-size: 60rpx;"
					color="rgb(47, 166, 160)"></uni-icons> -->
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


		<!-- <div>
			<button @click="writetest">send</button>
			<button @click="BleRead">read</button>
		</div> -->
		<view class="floor-mask" v-if="showFloorDialog" @touchstart.stop @touchmove.stop @touchend.stop>
			<view class="floor-dialog">
				<view class="floor-title">
					<text>楼层设置</text>
				</view>
				<view class="floor-input-area" style="display: flex; justify-content: center; align-items: center; margin: 30rpx 0;">
					<input type="text" v-model="floorInput" placeholder="请输入家庭所处楼层" maxlength="10"
						style="width: 80%; height: 60rpx; font-size: 28rpx; border: 1px solid #E5E5E5; border-radius: 20rpx; padding: 0 20rpx;" />
				</view>
				<view class="floor-actions">
					<view class="myButton" @click="handleCancelFloor"><text style="color: #FFFFFF;">取消</text></view>
					<view class="myButton" @click="handleSubmitFloor"><text style="color: #FFFFFF;">提交</text></view>
				</view>
			</view>
		</view>
		<custom-modal ref="modal" />
	</view>
</template>

<script>
	import permision from '/js_sdk/wa-permission/permission';
	import util from '/common/util';
	import fileParse from '/common/fileParesUtil'
	import logger from '/common/logger.js'
	import {
		wgs84_to_gcj02
	} from '/common/wgs84ToGcj02';
	import {
		$uni
	} from "@/utils/main.js"
	import {getHomeWifi,setHomeWifi} from "@/api/api/device.js"
	//#ifdef APP-HARMONY
	import {
		BluetoothStateEnum
	} from "@/uni_modules/jiannor-oh-tools"
	//#endif
	export default {
		data() {
			return {
				platform: '',
				loadingTitle: '加载中...',
				isShowGuild: 0,
				ladarRotateAngle: 0,
				rute: '',
				communciateType: '',
				characteristicIdwrite: "0000FFE1-0000-1000-8000-00805F9B34FB",
				intervalId: null,
				serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
				showLoading: '',
				wifiCount: 0,
				serialCode: '',
				scrollTop: 0,
				freshing: false,
				bluetoothConnect: false,
				blueToothDeviceId: '',
				longitude: '',
				latitude: '',
				showWiFiList: new Array(),
				wifiMacList: new Array(),
				downLoadingWifiList: '',
				lastScanWifiList: new Array(),
				wifilist: [{
						wifi_ssid: 'wifi1',
						wifi_mac: 'ca:ss:bc:ws:ae',
						strength: 10,
						wifi_location: {
							la: '19.123',
							lo: '29.123'
						}
					},
					{
						wifi_ssid: 'wifi2',
						wifi_mac: 'ca:ss:bc:ws:af',
						strength: 10,
						wifi_location: {
							la: '19.123',
							lo: '29.123'
						}
					},
					{
						wifi_ssid: 'wifi3',
						wifi_mac: 'ca:ss:bc:ws:ag',
						strength: 10,
						wifi_location: {
							la: '19.123',
							lo: '29.123'
						}
					}
				],
				saveWifiList: new Array(),
				checkBluetoothAdapterIntervel: null,
				connectCnt: 0,
				bluetoothOpening: true,
				pagestatue: '',
				presentShowLoading: '',
				blueToothHeartCnt: '',
				androidTimeout: null,
				refreshTimeout: null,
				scanTimeOUt: null,
				showFloorDialog: false,
				floorInput: '',
				pendingWifiItem: null,
				pendingLocationRes: null,
				pendingWifiMacList: null,
				pendingWifiStrengthList: null,
			}
		},
		onShow() {
			//从服务器查询wifi列表

			// if(this.rute!='set')
			// {
			// 	this.restartBluetooth()
			// }

			this.checkBluetoothAdapterIntervel = setInterval(() => {
				if (this.bluetoothConnect && !this.freshing)
					this.bluetoothSendHeart()
			}, 6000)
			let that = this
			this.requestHomeWiFi()
			// this.requireWiFiList()
			// plus.geolocation.getCurrentPosition(function(p) {
			// 	console.log('p', p)
			// 	//alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
			// 	let pos = wgs84_to_gcj02(p.coords.longitude, p.coords.latitude)
			// 	console.log('pos', pos)
			// 	that.longitude = pos[0]
			// 	that.latitude = pos[1]

			// }, function(e) {
			// 	//alert('Geolocation error: ' + e.message);
			// 	console.log('获取位置出错', )
			// });
		},
		onHide() {
			clearInterval(this.checkBluetoothAdapterIntervel)
			this.checkBluetoothAdapterIntervel = null
		},
		onUnload() {
			getApp().globalData.settingWifiBluetooth = false
			clearTimeout(this.androidTimeout)
			clearTimeout(this.refreshTimeout)
			clearInterval(this.checkBluetoothAdapterIntervel)
			clearInterval(this.intervalId)
			clearTimeout(this.scanTimeOUt)
			this.scanTimeOUt = null
			this.checkBluetoothAdapterIntervel = null

			uni.$off("wifiBlueConnect")
			uni.$off("wifiCharacter")
			uni.$off("wifiDevice")
			// if (this.rute != 'set')
			this.stopBluetooth(() => {
				console.log('关闭蓝牙')
			})
		},
		onLoad(data) {
			let info = uni.getDeviceInfo()
			this.platform = info.platform
			//初始化蓝牙
			let paramater = JSON.parse(data.paramater)
			let that = this
			this.serialCode = paramater.serialCode
			// this.communciateType=fileParse.getStartWiFiScan()
			this.rute = paramater.rute
			that.longitude = paramater.lo
			that.latitude = paramater.la
			this.pagestatue = getApp().globalData.locateAndWifisetStatue

			//需要监听蓝牙连接状态
			try {
				getApp().globalData.settingWifiBluetooth = true
				getApp().globalData.openLadarBluetooth = false;

				uni.$on('wifiBlueConnect', function(res) {
					try {
						that.connectCnt++
						console.log('into connect', that.connectCnt)
						let intocnt = 1
						if (that.platform === 'ios')
							intocnt = 2
						if (res.connected && that.connectCnt === intocnt) {
							that.pagestatue = ''
							that.connectCnt = 0
							that.bluetoothConnect = true
							// that.presentShowLoading.setTitle('蓝牙已连接')
							that.presentShowLoading = '蓝牙已连接'
							if (that.blueToothDeviceId === '') {
								console.log('that.blueToothDeviceId === 空')
								that.blueToothDeviceId = getApp().globalData.locateBluetoothId
							}
							if (that.platform === 'ios') {
								that.freshing = false
								that.reFresh(60)
							} else {
								clearTimeout(that.androidTimeout)
								that.androidTimeout = setTimeout(() => {
									console.log('that.blueToothDeviceId', that.blueToothDeviceId)
									$uni.getBLEDeviceServices({
										deviceId: that.blueToothDeviceId,
										success(res) {
											console.log('device services:', res)
										},
										fail(err) {
											console.log('获取service出错', err)
										}
									})
									$uni.getBLEDeviceCharacteristics({
										// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
										deviceId: that.blueToothDeviceId,
										// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
										serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
										success(res) {
											console.log('device getBLEDeviceCharacteristics:', res
												.characteristics)
											that.freshing = false
											that.reFresh(60)
										},
										fail(err) {
											console.log('获取特征出错', err, that.blueToothDeviceId, that
												.serviceId)
											//需要断开蓝牙重做
											that.freshing = false
											clearTimeout(this.scanTimeOUt)
											that.restartBluetooth()
										}
									})
								}, 15000)
							}


							$uni.stopBluetoothDevicesDiscovery({
								success(res) {
									console.log('停止蓝牙搜索')
								}
							})

						}
						if (!res.connected && that.connectCnt === intocnt) {
							that.pagestatue = '蓝牙断开'
							that.freshing = false;
							console.error('蓝牙设备已断开')
							// uni.showToast({
							// 	icon: 'none',
							// 	title: '与设备的蓝牙连接断开'
							// })
							that.connectCnt = 0
							that.bluetoothConnect = false
						}
					} catch (err) {
						console.log("wifiBlueConnect", err)
					}
				})
				uni.$on('wifiCharacter', function(res) {
					const byteBuffer = new Uint8Array(res.value);
					const hexArr = Array.prototype.map.call(
						new Uint8Array(res.value),
						function(bit) {
							return ('00' + bit.toString(16)).slice(-2)
						}
					)
					console.log('接收成功', hexArr)
					//处理蓝牙反馈
					that.callbackBluetoothData(byteBuffer)
				})
				uni.$on('wifiDevice', function(devices) {
					try {
						console.log('WiFi界面收到数据', devices)
						let id = util.convertToFormat('CYY', that.serialCode); //转到util
						let otaid = util.convertToFormat('OTA', that.serialCode);
						console.log('recive wifi', devices.devices[0].name, id)
						if (devices.devices[0].name === id || devices.devices[0].name === otaid || devices.devices[
								0]
							.localName === id || devices.devices[0].localName === otaid) {
							that.blueToothDeviceId = devices.devices[0].deviceId;
							console.log('发现目标蓝牙', devices.devices[0].name)
							$uni.stopBluetoothDevicesDiscovery()
							util.connectBLEDevice(devices.devices[0].deviceId, (err, status) => {
								if (err) {
									that.showMessage('蓝牙连接不上了')
								} else if (status === 'alreadyConnected') {
									that.showMessage('蓝牙已连接')
								} else if (status === 'connected') {
									that.showMessage("扫描wifi中")

								}
							})
						}
					} catch (err) {
						console.log("wifiDevice", err)
					}
				})
				this.intervalId = setInterval(() => {
					// 更新UI动画
					this.ladarRotateAngle = (this.ladarRotateAngle + 40) % 360;
					// 超时处理
				}, 200);

			} catch (e) {
				console.log('监听蓝牙事件出错', e)
			}
			this.isShowGuild = uni.getStorageSync("isGuild")
			if (this.isShowGuild === 4)
				this.isShowGuild = 5
			uni.setStorageSync('isGuild', this.isShowGuild)
		},
		methods: {
			deleteWiFi(event, index) {
				console.log('我点击了删除')
				//把要删除的wifi提交服务器
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
								// logger.info('delete wifi  success', JSON.stringify(res))
								console.log('删除结果', res)
								if (res.data.code === 200) {
									uni.showToast({
										title: "删除成功",
										icon: 'none'
									})
									setTimeout(() => {
										this.returnParent()
									}, 1000)
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							},
							fail: ((err) => {
								console.log('删除结果失败', res)
								// logger.info('delete wifi fail', JSON.stringify(err))
								uni.showToast({
									title: err.errMsg,
									icon: 'none'
								})
							})
						});
						//更新wifi列表
					},
					fail: () => {
						console.log('不删除了')
					}
				})

			},
			skipGuild() {
				this.isShowGuild = 0
				uni.setStorageSync("isGuild", 0)
			},
			bluetoothSendHeart() {
				const heart = new Uint8Array(1);
				heart[0] = 0x21;
				let writetype = 'writeNoResponse ';
				if (this.platform == 'ios')
					writetype = 'write'
				console.log('写入特征值')
				let that = this

				// 确保数据格式正确 - 转换为ArrayBuffer
				let buffer = heart;
				if (heart instanceof Uint8Array) {
					buffer = heart.buffer.slice(heart.byteOffset, heart.byteOffset +
						heart.byteLength);
				} else if (Array.isArray(heart)) {
					buffer = new Uint8Array(heart).buffer;
				}

				// 验证buffer是否有效
				if (!buffer || buffer.byteLength === 0) {
					console.log('数据buffer无效:', buffer);
					resolve(false);
					return;
				}

				$uni.writeBLECharacteristicValue({
					deviceId: that.blueToothDeviceId, // 蓝牙设备 deviceId
					serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB", // 蓝牙服务uuid
					characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 (即 writeId)
					value: this.platform == 'harmonyos' ? buffer : heart, // 这里的value是ArrayBuffer类型
					writeType: writetype,
					success(res) {
						console.log('写入指令发送成功', heart)
						that.blueToothHeartCnt = 0
					},
					fail(err) {
						// that.bluetoothSendLocateMakesure();
						console.log('写入指令发送失败', err)
						that.blueToothHeartCnt++
						if (that.blueToothHeartCnt > 10)
							that.restartBlueTooth()
					}
				})
			},
			resetWifiScan() {
				let command = fileParse.resetWiFiScan()
				this.BleWrite(command).then((success) => {
					if (success) {
						console.log('写入成功');
					}
				}).catch((failure) => {
					if (failure) {
						console.log('写入失败');
					}
				});
			},
			closeHelp() {
				let that = this
				if (!this.bluetoothConnect) {
					uni.showModal({
						title: '重启蓝牙',
						content: '如果蓝牙一直无法连接成功，可以尝试靠近设备并点击重启按钮，重连过程十秒左右',
						confirmText: '重启',
						success: function(res) {
							if (res.confirm)
								that.restartBluetooth()
						}
					});
				} else if (this.showWiFiList.length === 0) {
					uni.showModal({
						title: '重新扫描',
						content: '如果多次都未扫描到有效Wi-Fi可以点击重启按钮，重启过程二十秒左右',
						confirmText: '重启',
						success: function(res) {
							if (res.confirm)
								that.resetWifiScan()
						}
					});
				} else {
					uni.showModal({
						title: '',
						content: '如果发生了无法连接蓝牙，或扫描不到有效Wi-Fi的情况，检查手机蓝牙开启无误后，可以尝试退出App重新进入家庭WiFi页面',
					});
				}
			},
			writetest() {
				this.BleWrite(this.communciateType)
			},
			stopBluetooth(cb) {
				$uni.closeBLEConnection({
					deviceId: this.blueToothDeviceId,
					success() {
						console.log('断开蓝牙成功')
					}
				})
				$uni.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log('停止蓝牙搜索')
					}
				})
				let that = this
				$uni.closeBluetoothAdapter({
					success(res) {

					},
					complete() {
						console.log('关闭蓝牙模块');
						that.connectCnt = 0
						getApp().globalData.blebluetoothConnect = false
						that.bluetoothConnect = false
						cb & cb()
					}
				})
			},
			restartBluetooth() {
				console.log('into restart bluetooth')
				let that = this
				this.stopBluetooth(() => {
					$uni.openBluetoothAdapter({
						success(res) {
							console.log('打开蓝牙模块', res);
							that.pagestatue = '连接蓝牙中...'
							that.showMessage("连接蓝牙中...")
							that.bluetoothOpening = true
							$uni.startBluetoothDevicesDiscovery({
								allowDuplicatesKey: false,
								success: resd => {
									console.log('wifi打开蓝牙搜索成功')
									that.showMessage("搜索蓝牙中")
								},
								fail: errd => {
									console.log('wifi打开蓝牙搜索失败', errd)
									that.showMessage("打开蓝牙搜索失败")
								}
							})
						},
						fail(e) {
							console.error('打开蓝牙适配失败', e)
							that.freshing = false
							that.bluetoothOpening = false
							//#ifndef APP-HARMONY
							uni.showModal({
								title: '温馨提示',
								content: '请打开蓝牙后重新进入界面',
								showCancel: true,
								showFooter: true,
								success: () => {
									that.returnParent()
								},
								fail: () => {
									that.returnParent()
								}
							})
							//#endif

							//没开蓝牙 我开启一个定时检测蓝牙是否开启的功能
						}
					});
				})
			},
			requestHomeWiFi(){
				getHomeWifi(this.serialCode).then((res)=>{
					console.log('requestHomeWiFi',res)
					if(res.data!=null){
						let list=[]
						list.push(res.data)
						this.saveWifiList=list
					}else{
						console.log('家庭wifi设置是空的')
						this.reFresh(60)
						//#ifdef APP-HARMONY
						$uni.getBluetoothState({
							success: (res) => {
								if (res == BluetoothStateEnum.STATE_OFF) {
									uni.showModal({
										title: "提示",
										content: "蓝牙已关闭，请打开蓝牙后进入！",
										success(res) {
											if (res.confirm || res.cancel) {
												uni.navigateBack()
											}
										}
									})
								} else if (res == BluetoothStateEnum.STATE_ON) {
									this.reFresh(60)
								} else {
									console.log("getBluetoothState", res)
								}
							},
							fail: (err) => {
								console.log("getBluetoothStateErr", err)
							}
						})
						// #endif
					}
				}).catch((err)=>{
					logger.info('require wifi list fail', JSON.stringify(err))
				})
			},
			callbackBluetoothData(byteBuffer) {
				let that = this
				if (that.communciateType[0] != byteBuffer[0]) {
					//重新写上一条命令
					console.log('重写一条', that.communciateType[0])
					that.BleWrite(that.communciateType).then((success) => {
						if (success) {
							console.log('写入成功');
							// 可以在这里进行其他操作，比如更新UI等  
						}
					}).catch((failure) => {
						if (failure) {
							console.log('写入失败');
							// 可以在这里处理失败的情况，比如显示错误消息等  
						}
					});
					return
				}
				console.log('into callback', byteBuffer)
				if (byteBuffer[0] === 0x10) {
					that.showMessage("扫描进度2%")
					switch (byteBuffer[1]) {
						case 1:
							console.log("扫描中...");
							let command = fileParse.getStartWiFiScanStatus()
							that.BleWrite(command).then((success) => {
								if (success) {
									console.log('写入成功');
									// 可以在这里进行其他操作，比如更新UI等  
								}
							}).catch((failure) => {
								if (failure) {
									console.log('写入失败');
									// 可以在这里处理失败的情况，比如显示错误消息等  
								}
							});
							break;
						default:
							console.log("启动中...");
							//0.5秒后再次查询第一步
							setTimeout(() => {
								let command = fileParse.getStartWiFiScanStatus()
								that.BleWrite(command).then((success) => {
									if (success) {
										console.log('写入成功');
										// 可以在这里进行其他操作，比如更新UI等  
									}
								}).catch((failure) => {
									if (failure) {
										console.log('写入失败');
										// 可以在这里处理失败的情况，比如显示错误消息等  
									}
								});
							}, 200)
							break;
					}
				} else if (byteBuffer[0] === 0x11) {
					that.showMessage("扫描进度5%")
					switch (byteBuffer[1]) {
						case 0:
							console.log("没触发scan");
							setTimeout(() => {
								let command = fileParse.getStartWiFiScanStatus()
								that.BleWrite(command).then((success) => {
									if (success) {
										console.log('写入成功');
										// 可以在这里进行其他操作，比如更新UI等  
									}
								}).catch((failure) => {
									if (failure) {
										console.log('写入失败');
										// 可以在这里处理失败的情况，比如显示错误消息等  
									}
								});
							}, 200)
							break;
						case 1:
							console.log("扫描启动中");
							setTimeout(() => {
								let command = fileParse.getStartWiFiScanStatus()
								that.BleWrite(command).then((success) => {
									if (success) {
										console.log('写入成功');
										// 可以在这里进行其他操作，比如更新UI等  
									}
								}).catch((failure) => {
									if (failure) {
										console.log('写入失败');
										// 可以在这里处理失败的情况，比如显示错误消息等  
									}
								});
							}, 200)
							break;
						case 2:
							console.log("正在扫描");
							setTimeout(() => {
								let command = fileParse.getStartWiFiScanStatus()
								that.BleWrite(command).then((success) => {
									if (success) {
										console.log('写入成功');
										// 可以在这里进行其他操作，比如更新UI等  
									}
								}).catch((failure) => {
									if (failure) {
										console.log('写入失败');
										// 可以在这里处理失败的情况，比如显示错误消息等  
									}
								});
							}, 500)
							break;
						case 3:
							console.log("扫描结束，正在加载");
							that.wifiCount = byteBuffer[2]
							console.log('扫描的mac数量为', that.wifiCount)
							//进行下一步 获得数量后一个一个查询
							that.setWiFiList(that.wifiCount)
							that.checkWiFiList()
							break;
						case 15:
							console.log("扫描失败，请稍后重试");
							setTimeout(() => {
								let command = fileParse.getStartWiFiScanStatus()
								that.BleWrite(command).then((success) => {
									if (success) {
										console.log('写入成功');
										// 可以在这里进行其他操作，比如更新UI等  
									}
								}).catch((failure) => {
									if (failure) {
										console.log('写入失败');
										// 可以在这里处理失败的情况，比如显示错误消息等  
									}
								});
							}, 200)
							break;
					}
				} else if (byteBuffer[0] === 0x12) {
					switch (byteBuffer[1]) {
						case 0:
							console.log("查询错误，超过范围");
							//从新查询这一条
							that.checkWiFiList()
							break;
						default:
							console.log("加载中...");
							//把mac和ssid长度存下来 我需要一个list存放所有的对象
							that.setWifiItem(byteBuffer)
							that.checkWiFiList()
							break
					}
				} else if (byteBuffer[0] === 0x13) {
					switch (byteBuffer[1]) {
						case 0:
							console.log("查询错误，ssid超过范围");
							//从新查询这一条
							that.checkWiFiList()
							break;
						default:
							console.log("加载中...");
							//ssid存下来 我需要一个list存放所有的对象
							that.setWifiItem(byteBuffer)
							that.checkWiFiList()
							//查询下一条
							break;
					}
				} else if (byteBuffer[0] === 0x14) {
					switch (byteBuffer[1]) {
						case 1:
							let command = fileParse.getStartWiFiScan()
							that.BleWrite(command)
							break;
						default:
							setTimeout(() => {
								let command = fileParse.readyWiFiScan()
								that.BleWrite(command)
							}, 200)
							//查询下一条
							break;
					}
				} else if (byteBuffer[0] === 0x15) {
					switch (byteBuffer[1]) {
						case 1:
							let command = fileParse.stopWiFiScan()
							that.BleWrite(command)
							break;
						default:
							break;
					}
				}
			},
			setWifiItem(buff) {
				try {
					console.log('into setWifiItem', buff)
					console.log('this.downLoadingWifiList 0', this.downLoadingWifiList)
					let index = buff[1] - 1
					// this.presentShowLoading.setTitle("扫描进度" + buff[1].toString() + "0%")
					this.presentShowLoading = "扫描进度" + buff[1].toString() + "0%"
					if (buff[0] === 0x12) {
						let ssidlength = buff[9]

						let int8Array = new Int8Array(1); // 创建一个长度为1的Int8Array  
						int8Array[0] = buff[8]; // 尝试将uint8Value赋给int8Array的第一个元素  
						let rssi = int8Array[0]
						// 但实际上，由于uint8Value超出了Int8的正数范围，它会被自动转换为对应的负数  
						let mac = ''
						const hexArr = Array.prototype.map.call(
							new Uint8Array(buff),
							function(bit) {
								return ('00' + bit.toString(16)).slice(-2)
							}
						)
						mac = hexArr[2] + ':' + hexArr[3] + ':' + hexArr[4] + ':' + hexArr[5] + ':' + hexArr[6] + ':' +
							hexArr[7]
						this.downLoadingWifiList[index].mac = mac
						this.downLoadingWifiList[index].rssi = rssi
						this.downLoadingWifiList[index].ssidlength = ssidlength
					} else if (buff[0] === 0x13) {
						let ssid = ''
						let ss1_ss2 = buff[2]
						let namearray = buff.slice(3, buff.length - 1)
						console.log('namearray', namearray)
						
						ssid = fileParse.bytesToUtf8String(namearray)
						console.log('ssid', ssid)
						// this.showMessage('ssid'+ssid)
						if (ss1_ss2 === 1) {
							this.downLoadingWifiList[index].ssid1 = ssid
						} else if (ss1_ss2 == 2) {
							this.downLoadingWifiList[index].ssid2 = ssid
						}
					}
				} catch (e) {
					console.log('set wifi item error', e)
				}

			},
			setWiFiList(count) {
				this.downLoadingWifiList = new Array;
				for (let i = 0; i < count; i++) {
					this.downLoadingWifiList[i] = {
						ssid1: '',
						ssid2: '',
						mac: '',
						rssi: 0,
						ssidlength: 0,
						wifi_location: {
							la: '',
							lo: ''
						}
					};
				}
			},
			mergeWifiList(listA, listB) {
				// 创建一个 Map 来存储基于 mac 的唯一项  
				console.log('合并前', listA, listB)
				for (let i = 0; i < listB.length; i++) {
					let find = false
					for (let j = 0; j < listA.length; j++) {
						if (listB[i].wifi_mac === listA[j].wifi_mac) {
							console.log('发现一个重复mac', listB[i].wifi_mac)
							find = true
						}
					}
					if (!find) {
						let item = listB[i]
						listA.push(item)
					}
				}
				console.log('合并后', listA)
				return listA
			},
			checkWiFiList() {
				let that = this
				for (let i = 0; i < this.downLoadingWifiList.length; i++) {
					if (this.downLoadingWifiList[i].mac === '') {
						//查询这个mac
						let command = fileParse.getWiFiData(i + 1)
						that.BleWrite(command).then((success) => {
							if (success) {
								console.log('写入成功');
								// 可以在这里进行其他操作，比如更新UI等  
							}
						}).catch((failure) => {
							if (failure) {
								console.log('写入失败');
								// 可以在这里处理失败的情况，比如显示错误消息等  
							}
						});
						return
					} else if (this.downLoadingWifiList[i].ssidlength > 0 && this.downLoadingWifiList[i].ssid1 === '' &&
						this.downLoadingWifiList[i].ssidlength < 16) {
						//查询ssid前半
						let command = fileParse.getWiFiSsid(i + 1, 1)
						that.BleWrite(command).then((success) => {
							if (success) {
								console.log('写入成功');
								// 可以在这里进行其他操作，比如更新UI等  
							}
						}).catch((failure) => {
							if (failure) {
								console.log('写入失败');
								// 可以在这里处理失败的情况，比如显示错误消息等  
							}
						});
						return
					} else if (this.downLoadingWifiList[i].ssidlength > 16 && (this.downLoadingWifiList[i].ssid1 === '' ||
							this.downLoadingWifiList[i].ssid2 === '')) {
						//查询ssid后半
						let command = fileParse.getWiFiSsid(i + 1, 1)
						if (this.downLoadingWifiList[i].ssid1 === '') {
							command = fileParse.getWiFiSsid(i + 1, 1)
						} else if (this.downLoadingWifiList[i].ssid2 === '') {
							command = fileParse.getWiFiSsid(i + 1, 2)
						}

						that.BleWrite(command).then((success) => {
							if (success) {
								console.log('写入成功');
								// 可以在这里进行其他操作，比如更新UI等  
							}
						}).catch((failure) => {
							if (failure) {
								console.log('写入失败');
								// 可以在这里处理失败的情况，比如显示错误消息等  
							}
						});
						return
					}
				}
				//检查数据完毕
				let command = fileParse.stopWiFiScan()
				that.BleWrite(command)
				this.showWiFiList = new Array()
				this.wifiMacList = new Array()
				// for (let i = 0; i < this.downLoadingWifiList.length; i++) {
				// 	let name = this.downLoadingWifiList[i].ssid1 + this.downLoadingWifiList[i].ssid2
				// 	let item = {
				// 		wifi_ssid: name,
				// 		wifi_mac: this.downLoadingWifiList[i].mac,
				// 		strength: this.downLoadingWifiList[i].rssi,
				// 		wifi_location: {
				// 			la: this.latitude,
				// 			lo: this.longitude
				// 		},
				// 	}
				// 	that.showWiFiList.push(item)
				// }
				that.showWiFiList = this.downLoadingWifiList.reduce((acc, curr) => {
					const cleanSsid1 = (curr.ssid1 || '').replace(/[\x00-\x1F\x7F]/g, '').trim();
					const cleanSsid2 = (curr.ssid2 || '').replace(/[\x00-\x1F\x7F]/g, '').trim();
					const name = cleanSsid1 + cleanSsid2;
					// 只有当 name 非空时才处理
					if (name) {
						const isDuplicate = acc.some(item => item.wifi_ssid === name);

						if (!isDuplicate) {
							acc.push({
								wifi_ssid: name,
								wifi_mac: curr.mac,
								strength: curr.rssi,
								wifi_location: {
									la: this.latitude,
									lo: this.longitude
								}
							});
						}
					}
					return acc;
				}, []);
				that.pagestatue = ''
				that.showWiFiList = this.mergeWifiList(that.showWiFiList, that.lastScanWifiList)
				that.lastScanWifiList = that.showWiFiList
				console.error('检查完毕', that.showWiFiList)
				this.freshing = false
				clearTimeout(this.scanTimeOUt)
			},
			async BleRead(retryCount = 0) {
				console.log('into read');
				let Time = new Date();
				let timestemp = Time.getTime();
				let that = this;
				return new Promise((resolve, reject) => {
					try {
						// 检查蓝牙连接状态
						if (!this.bluetoothConnect) {
							console.log('蓝牙未连接，取消读取');
							reject(false);
							return;
						}
						$uni.readBLECharacteristicValue({
							deviceId: this.blueToothDeviceId,
							serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
							characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB",
							success(res) {
								let Time2 = new Date();
								let timestemp2 = Time2.getTime() - timestemp;
								console.log('读取耗时:', timestemp2 + 'ms');

								// 这里可以添加对返回数据的处理
								// 例如：resolve(res.value) 如果返回的是ArrayBuffer数据
								resolve(true);
							},
							fail(res) {
								console.log('读取失败:', retryCount);

								if (retryCount < 10) {
									console.log(`第${retryCount + 1}次重试...`);
									setTimeout(() => {
										that.BleRead(retryCount + 1)
											.then(resolve)
											.catch(reject);
									}, 100);
								} else {
									console.log('已达最大重试次数');
									that.freshing = false
									clearTimeout(this.scanTimeOUt)
									that.$refs.modal.show({
										title: '温馨提示',
										content: '传输数据不成功，请点击刷新按钮重试',
										showCancel: true,
										confirmText: '确认',
										cancelText: '取消',
										showFooter: true,
									})
									reject(false);
								}
							}
						});
					} catch (e) {
						console.log('读取异常:', e);
						reject(false);
					}
				});
			},
			async BleWrite(instruction, retryCount = 0) {
				return new Promise((resolve, reject) => {
					try {
						let that = this;
						let writetype = 'writeNoResponse';
						if (this.platform == 'ios') {
							writetype = 'write';
						}
						this.communciateType = instruction;
						console.log('写入内容', this.communciateType, that.serviceId, that.blueToothDeviceId);

						// 确保数据格式正确 - 转换为ArrayBuffer
						let buffer = instruction;
						if (instruction instanceof Uint8Array) {
							buffer = instruction.buffer.slice(instruction.byteOffset, instruction.byteOffset +
								instruction.byteLength);
						} else if (Array.isArray(instruction)) {
							buffer = new Uint8Array(instruction).buffer;
						}

						// 验证buffer是否有效
						if (!buffer || buffer.byteLength === 0) {
							console.log('数据buffer无效:', buffer);
							resolve(false);
							return;
						}

						$uni.writeBLECharacteristicValue({
							deviceId: that.blueToothDeviceId,
							serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
							characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB",
							value: this.platform == "harmonyos" ? buffer : instruction,
							writeType: writetype,
							success(res) {
								console.log('写入指令发送成功', res);
								setTimeout(() => {
									that.BleRead();
								}, 200);
								resolve(true);
							},
							fail(err) {
								console.log('写入指令发送失败', err);

								if (!that.bluetoothConnect) {
									that.$refs.modal.show({
										title: '温馨提示',
										content: '蓝牙连接断开，请点击刷新按钮重试',
										showCancel: true,
										confirmText: '确认',
										cancelText: '取消',
										showFooter: true,
									})
									that.freshing = false
									clearTimeout(this.scanTimeOUt)
									// that.showMessage('数据传输不成功，请点击刷新按钮重试')
									resolve(false);
									return;
								}
								// 检查重试次数
								if (retryCount < 10) { // 已经失败1次，所以最多再重试4次，总共5次
									console.log(`写入失败，第${retryCount + 1}次重试...`);
									setTimeout(() => {
										that.BleWrite(instruction, retryCount + 1)
											.then(resolve)
											.catch(reject);
									}, 100);
								} else {
									console.log('写入失败，已达最大重试次数(5次)');
									that.freshing = false
									clearTimeout(this.scanTimeOUt)
									that.$refs.modal.show({
										title: '温馨提示',
										content: '传输数据不成功，请点击刷新按钮重试',
										showCancel: true,
										confirmText: '确认',
										cancelText: '取消',
										showFooter: true,
									})
									resolve(false);
								}
							},
							complete(c) {
								console.log('接口调用结束', c);
							}
						});
					} catch (e) {
						console.log('err', e);
						reject(false);
					}
				});
			},
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
				console.log('item.wifi_location',item.wifi_location)
				let wifi = {
					version: 3,
					wifi_ssid: item.wifi_ssid,
					wifi_mac: item.wifi_mac,
					strength: item.strength,
					wifi_location:item.wifi_location,
					wifi_macList: wifiMacList,
					wifi_strength: wifiStrengthList,
					serialCode:this.serialCode,
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
									if (this.serialCode && this.serialCode.startsWith('ae')) {
										this.pendingWifiItem = item
										this.pendingLocationRes = res
										this.pendingWifiMacList = wifiMacList
										this.pendingWifiStrengthList = wifiStrengthList
										this.openFloorDialog()
									} else {
										this.submitHomeWifi(item, res, wifiMacList, wifiStrengthList, false)
									}
									// let data={
									// 	version:3,
									// 	serialCode:this.serialCode,
									// 	wifi_ssid:item.wifi_ssid,
									// 	wifi_mac:item.wifi_mac,
									// 	strength:item.strength,
									// 	wifi_location:{
									// 		la:res.location.latitude,
									// 		lo:res.location.longitude
									// 	},
									// 	wifi_macList:wifiMacList,
									// 	wifi_strength:wifiStrengthList
									// }
									// console.log('我点击了确认提交', data)
									// try {
									// 	setHomeWifi(data).then((res)=>{
									// 		console.log('require wifi list success',res)
									// 		if (res.code === '200') {
									// 			uni.showToast({
									// 				title: '设置完成',
									// 				icon: 'success'
									// 			})
									// 			setTimeout(() => {
									// 				uni.navigateBack({
									// 					delta:4
									// 				});
									// 			}, 500)
									// 		} else {
									// 			uni.showToast({
									// 				icon: 'none',
									// 				title: res.msg
									// 			})
									// 		}
									// 	}).catch((err)=>{
									// 		console.error(err)
									// 		uni.showToast({
									// 			icon: 'none',
									// 			title: "请求未成功，请稍后在试"
									// 		})
									// 	})
										
									// } catch (e) {
									// 	console.log('提交异常', e)
									// }
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
			returnParent() {
				getApp().backParents();
			},
			scanWifi() {
				console.log('into scan wifi')
				this.showWiFiList = new Array()
				let command = fileParse.readyWiFiScan()
				this.BleWrite(command).then((success) => {
					if (success) {
						console.log('写入成功');
						this.pagestatue = '扫描WiFi中...'
						this.showMessage("扫描WiFi中...")
						// 可以在这里进行其他操作，比如更新UI等  
					}
				}).catch((failure) => {
					if (failure) {
						console.log('写入失败');
					}
				});
			},
			showMessage(text) {
				this.presentShowLoading = text
				this.loadingTitle = text
			},
			updateLoadingTitle(text) {
				this.loadingTitle = text
			},
			async reFresh(timeout = 120000) {
				try {
					// 防止重复刷新
					if (this.freshing) return;
					this.freshing = true;
					// 初始化UI状态
					// this.presentShowLoading = '开始刷新';
					this.showMessage('开始检测')
					this.ladarRotateAngle = 0;
					// 清理之前的定时器
					this.clearRefreshTimer();
					//检查定位服务
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
					// 检查蓝牙连接
					if (!this.bluetoothConnect) {
						this.handleBluetoothDisconnected();
						return;
					}
					// 开始扫描流程
					this.startScanProcess(timeout);

				} catch (error) {
					console.error('刷新出错', error);
					this.handleRefreshError(error);
				}
			},
			clearRefreshTimer() {
				if (this.scanTimeOUt) {
					clearTimeout(this.scanTimeOUt);
					this.scanTimeOUt = null;
				}
			},
			handleBluetoothDisconnected() {
				this.showMessage('蓝牙未连接,正在重新扫描蓝牙');
				this.restartBluetooth();
				console.log('蓝牙未连接，连接后再刷新');
				// this.freshing = false;
			},
			startScanProcess(timeout) {
				// 开始WiFi扫描
				// console.error("开始扫描")
				this.scanWifi();
				setTimeout(() => {
					this.showMessage('正在扫描附近WiFi');
				}, 2000);
				// 设置超时检测


				this.scanTimeOUt = setTimeout(() => {
					this.handleScanTimeout();
					this.freshing = false;
				}, 120000);
			},

			handleScanTimeout() {
				this.clearRefreshTimer();
				console.error("超时了")
				this.freshing = false;
				if (!this.bluetoothConnect) {
					// this.showMessage('没扫描到wifi，请检查位置权限和蓝牙后重试');
					uni.showToast({
						title: "没扫描到wifi，请检查位置权限和蓝牙后重试",
						icon: 'none'
					})
					this.pagestatue = '请稍后重试';
					return;
				}

				if (this.showWiFiList.length <= 0) {
					// this.showMessage('没扫描到wifi，请稍后重新点击刷新按钮');
					uni.showToast({
						title: "没扫描到wifi，请稍后重新点击刷新按钮",
						icon: 'none'
					})
					this.pagestatue = '请稍后重试';
				}
			},
			handleRefreshError(error) {
				this.freshing = false;
				this.clearRefreshTimer();
				this.showMessage('刷新过程中出现错误');
				console.error('Refresh error:', error);
			},
			submitHomeWifi(item, res, wifiMacList, wifiStrengthList, addFloor) {
				try {
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
					if (addFloor && this.floorInput) {
						data.floor = this.floorInput
					}
					console.log('我点击了确认提交', data)
					setHomeWifi(data).then((recivedata) => {
						console.log('require wifi list success', recivedata)
						const code = recivedata.code || recivedata.data?.code
						const msg = recivedata.msg || recivedata.data?.msg
						if (code === '200' || code === 200) {
							uni.showToast({
								title: '设置完成',
								icon: 'success'
							})
							this.showFloorDialog = false
							setTimeout(() => {
								uni.navigateBack({
									delta: 4
								});
							}, 500)
						} else {
							uni.showToast({
								icon: 'none',
								title: msg || '提交失败'
							})
						}
					}).catch((err) => {
						console.error(err)
						uni.showToast({
							icon: 'none',
							title: "请求未成功，请稍后再试"
						})
					})
				} catch (e) {
					console.log('提交异常', e)
				}
			},
			openFloorDialog() {
				this.floorInput = ''
				this.showFloorDialog = true
			},
			handleCancelFloor() {
				this.showFloorDialog = false
			},
			handleSubmitFloor() {
				if (!this.floorInput || this.floorInput.trim() === '') {
					uni.showToast({ icon: 'none', title: '请输入楼层' })
					return
				}
				if (this.serialCode && this.serialCode.startsWith('ae')) {
					this.submitHomeWifi(
						this.pendingWifiItem,
						this.pendingLocationRes,
						this.pendingWifiMacList,
						this.pendingWifiStrengthList,
						true
					)
				}
			},
			getWifiImage(strength) {
				if (strength <= -80) {
					return '/static/icons/wifi_settings/wifi1.png';
				} else if (strength <= -60) {
					return '/static/icons/wifi_settings/wifi2.png';
				} else {
					return '/static/icons/wifi_settings/wifi3.png';
				}
			},
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
	.floor-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.5);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.floor-dialog {
		width: 520rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		padding: 30rpx 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.floor-title {
		width: 100%;
		height: 80rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		color: rgba(255, 87, 51, 1);
	}
	.floor-actions {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 20rpx;
	}
</style>
