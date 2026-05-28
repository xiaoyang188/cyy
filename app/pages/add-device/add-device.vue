<template>
	<view class="main-container">
		<custom-modal ref="modal" />
		<!-- <view v-if="isShowGuild===4" class="mask">
			<view @click="skipGuild" class="col_start" style="position:absolute;top: 120rpx;left:100rpx">
				<image src="/static/imgs/home/skip.svg" style="width: 70rpx;height: 70rpx;"></image>
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 20rpx;">跳过引导</text>
			</view>
		</view> -->
		<view class="nav_row">
			<view style="width: 150rpx;height: 150rpx;display: flex;align-items: center;justify-content: center;"
				@click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;" @click="clickNum++">添加设备</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</view>


		<view class="view-scan" @click="scan" style="position: relative;"
			:style="{ zIndex: isShowGuild === 4 ? 901 : 1 }">
			<image class="icon-scan" src="/static/icons/add_device/icon-scan.png" mode="widthFix"></image>

		</view>
		<view class="row_center" style="width: 100%;">
			<text style="font-size: 38rpx;font-weight: 500;margin: 20rpx;">扫描二维码</text>
		</view>
		<!-- <button @click="scan2">button</button> -->
		<view style="position: relative;" :style="{ zIndex: isShowGuild === 4 ? 901 : 1 }">
			<uni-forms ref="form" :modelValue="device" :rules="rules" label-align="left" label-width="200rpx">
				<view class="settings-container">
					<view class="settings-row">
						<view class="settings-row-left">
							<view class="setting-txt">
								设备编号
							</view>
						</view>
						<uni-forms-item name="serial_code" label-width="0" style="margin: 0;padding: 0">
							<uni-easyinput :inputBorder="false" maxlength="12" :clearable="false" style="font-size: 8;"
								type="text" v-model="device.serial_code" placeholder="请输入设备编号"
								:value="device.serial_code" />
						</uni-forms-item>
					</view>
					<view class="settings-row">
						<view class="settings-row-left">
							<view class="setting-txt">
								绑定宠物
							</view>
						</view>
						<uni-forms-item name="" label-width="0" style="margin: 0;padding: 0;">
							<uni-easyinput class="input_view" :inputBorder="false" :clearable="false" :disabled="true"
								style="font-size: 8;" type="text" placeholder="123456" :value="device.nickname" />
						</uni-forms-item>
					</view>
				</view>
				<view class="tip-txt">
					*可以扫描二维码获取设备编号添加设备，若二维码扫描失败也可手动输入设备编号添加设备。
				</view>
				<view>
					<button class="myButton" style="width: 200rpx;border-radius:40rpx ;" @click="guide()">保存</button>
				</view>
				<view v-if="clickNum>10">
					<button class="myButton" style="width: 200rpx;border-radius:40rpx ;margin-top: 20rpx;"
						@click="toUpdate">去升级</button>
				</view>
				<uni-forms-item label="" name="pid" style="width: 0%;height: 0%;border: none;">
					<input v-model="device.pid">
				</uni-forms-item>
				<uni-forms-item label="" name="uid" style="width: 0%;height: 0%;border: none;">
					<input v-model="device.uid">
				</uni-forms-item>
			</uni-forms>
		</view>

	</view>
</template>

<script>
	import util from '../../common/util';
	import {
		wgs84_to_gcj02
	} from '/common/wgs84ToGcj02';
	import {
		$uni
	} from "@/utils/main.js"

	//#ifdef APP-HARMONY
	import {
		BluetoothStateEnum
	} from "@/uni_modules/jiannor-oh-tools"
	//#endif
	import {
		deviceFirmwareGet,
		getDeviceInfo,
		deviceBind
	} from '@/api/api/device'
	export default {
		data() {
			return {
				isShowGuild: 4,
				// showRecharge: false,
				// showGuide: false,
				bluetoothConnect: false,
				isshow: false,
				clickNum: 0,
				device: {
					serial_code: '',
					pid: '',
					uid: '',
					nickname: 'xx',
				},
				rules: {
					serial_code: {
						rules: [{
								required: true,
								errorMessage: '请填写产品编码',
							},
							{
								pattern: /^[A-Za-z0-9]{12}$/, // 只允许字母和数字，长度为12  
								errorMessage: '编码格式错误',
							},
						]
					}
				}
			}
		},
		onShow() {
			// this.getDeviceCode('ssasdas?yy=asd');
			// Page.query()
		},
		onLoad(options) {
			var receivedata = JSON.parse(options.obj)
			console.log('add device onload', options);
			console.log('uid', receivedata.uid);
			console.log('pid', receivedata.pid);
			this.device.pid = receivedata.pid;
			this.device.uid = receivedata.uid;
			this.device.nickname = receivedata.name;
			$uni.openBluetoothAdapter({
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: '添加设备需要打开蓝牙，请先打开手机蓝牙'
					})
				}
			})
			this.isShowGuild = uni.getStorageSync("isGuild")
			if (this.isShowGuild === 3)
				this.isShowGuild = 4
			uni.setStorageSync('isGuild', this.isShowGuild)
			console.log('isShowGuild', this.isShowGuild)
		},
		methods: {
			skipGuild() {
				this.isShowGuild = 0
				uni.setStorageSync("isGuild", 0)
			},
			// closeRecharge() {
			// 	this.showRecharge = false
			// },
			open() {

				const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
				const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法
				if (blueadapter) {
					// 判断蓝牙是否开启
					if (blueadapter.isEnabled()) {
						// 已开启
					} else {
						uni.showModal({
							title: '提示',
							content: '蓝牙尚未打开，后续操作需要打开蓝牙',
							showCancel: true,
							cancelText: '取消',
							confirmText: '确定',
							success(res) {
								// 点击确定后通过系统打开蓝牙
								if (res.confirm) {
									const blueadapter = BluetoothAdapter.getDefaultAdapter();
									if (blueadapter != null) {
										return blueadapter.enable();
									}
								} else {
									// 点击取消什么也不做
									console.log("点击了取消");
								}
							}
						})
					}
				}
			},
			localAddDevice(pid, obj) {
				console.log('getApp().globalData.allData', getApp().globalData.allData);
				getApp().globalData.allData = getApp().globalData.allData.map((item) => {
					if (item.pid === pid) {
						// if (!item.did_list || !item.did_list.length) {
						//   return item;
						// }
						if (!item.did_list)
							item.did_list = new Array();
						item.did_list.push(obj);
						getApp().globalData.showDeviceList = item.did_list;
					}
					return item;
				});
				console.log('getApp().globalData.allData', getApp().globalData.allData);
				// getApp().globalData.showDeviceList.push(obj)
				console.log('add device after', getApp().globalData.showDeviceList);

			},
			getDeviceCode(data) {
				var pattern = /(\w+)=(\w+)/ig;
				var parames = {};
				data.replace(pattern, function(a, b, c) {
					parames[b] = c;
				});
				console.log(parames['serial_code']);
				this.device.serial_code = parames['serial_code'];
				//判断一下如过是项圈获取序列号后就可以直接添加，如果是称重碗的话需要添加wifi和密码
			},
			returnParent() {
				getApp().backParents();
			},
			toUpdate() {
				if (this.device.serial_code.trim() == '' || !this.device.serial_code) {
					uni.showModal({
						title: "提示",
						content: "设备序列号不能为空！",
						success() {

						}
					})
				} else {
					getDeviceInfo(this.device.serial_code.trim()).then((rebackData1) => {
						console.log('查询电量成功le', rebackData1);
						console.log('准备查询设备连接状态');
						if(rebackData1.data?.deviceInfo.hardwareVersion){
							getApp().globalData.myHardwareVersion = rebackData1.data.deviceInfo
								.hardwareVersion; // 修正：移除多余括号，添加分号
							getApp().globalData.myFirewareVersion = rebackData1.data.deviceInfo.firmwareVersion;
							console.log('item.data.hardware_version', getApp().globalData.myHardwareVersion);
							deviceFirmwareGet(this.device.serial_code.trim()).then((rebackData) => {
								console.log('新接口获取固件信息', rebackData);
							
								if (rebackData.data != null) {
									console.log('获取最新固件版本', rebackData.data.firmwareVersion);
									console.log('当前设备固件版本', getApp().globalData.myFirewareVersion);
							
									getApp().globalData.newFirewareVersion = rebackData.data.firmwareVersion;
									getApp().globalData.downloadFirewareUrl = rebackData.data.firmwareUrl;
							
									console.log('获取到下载固件地址', getApp().globalData.downloadFirewareUrl);
									uni.hideLoading();
									uni.navigateTo({
										url: "/pages/setting/firmware/firmware?rute=1&serialCode=" +
											this.device.serial_code.trim()
									});
								}
							});
						}else{
							uni.showModal({
								title:'提示',
								content:'无法获取到设备信息'
							})
						}
					});
				}
			},
			guide() {
				this.$refs.form.validate().then(res => {
					// 把设备先添加了
					let requestStatueUrl = getApp().globalData.internet + getApp().globalData.checkConnectStatue;
					let para = {
						serial_code: this.device.serial_code.trim(),
					}
					util.requestDataJson(requestStatueUrl, para).then((rebackData2) => {
						console.log('查询设备是否离线', rebackData2);

						if (rebackData2.data.code === 200) {
							if (rebackData2.data.data.connect_state != 1) {
								this.$refs.modal.show({
									title: '功能提示',
									content: "在添加设备前请先充电两小时激活设备，以保证设备正常使用.",
									showCancel: true,
									confirmText: '确认',
									cancelText: '取消',
									showFooter: true,
									success: () => {
										console.log("success")
										this.$refs.modal.onCancel()
									},
									fail: () => {
										this.$refs.modal.onCancel()
									}
								})
								return; // 添加return防止继续执行
							} else {
								uni.showLoading({
									title: '正在提交信息，请耐心等待',
									mask: true,
								})
								let para = {
									serialCode: this.device.serial_code.trim(),
									pid: this.device.pid
								}
								deviceBind(para).then((reciveData) => {
									console.log('新接口添加设备成功', reciveData)
									uni.hideLoading()
									// this.localAddDevice(this.device.pid, item);
									util.requestPetList()
									uni.showToast({
										title: '设备添加成功',
										icon: 'success'
									})
										getDeviceInfo(this.device.serial_code).then((rebackData) => {
											console.log('rebackData',rebackData)
											getApp().globalData.myFirewareVersion = rebackData.data.deviceInfo.firmwareVersion
											uni.navigateTo({
												url: '/pages/locatePageNvue/bellSetting/locationModelSetting/locationModelSetting?serialcode=' +
													this.device
													.serial_code +
													'&rute=1' +
													"&deviceId=''"+'&modol=1'
											})
										})
								})
							}
						} else {
							// 处理查询设备状态返回非200的情况
							uni.showModal({
								content: rebackData2.data.msg || '查询设备状态失败',
							})
						}
					}).catch((err) => {
						console.error('查询设备状态失败', err);
						uni.showModal({
							content: '网络错误，请检查网络连接',
						})
					})
				}).catch(err => {
					uni.showToast({
						title: '设备信息有误',
						icon: 'error'
					})
					console.log('表单错误信息：', err);
				})
			},
			// submit(opt) {
			// 	let that = this
			// 	let deviceAccount = getApp().globalData.internet_cyy +
			// 		getApp().globalData.deviceGetInfo + this.device
			// 		.serial_code;
			// 	util.requestDataJsonGET(deviceAccount, {}).then((
			// 		recivedata) => {
			// 		getApp().globalData.myFirewareVersion = recivedata.data.deviceInfo.firmware_version;
			// 		getApp().globalData.myHardwareVersion = recivedata.data.deviceInfo.hardware_version
			// 		if (getApp().globalData.myFirewareVersion > 45) {
			// 			//把连接模式设置未长连接
			// 			let data = {
			// 				serial_code: this.device.serial_code,
			// 				connect_mode: 1
			// 			}
			// 			let setConnectUrl = getApp().globalData.internet + getApp().globalData
			// 				.switchConnectModel;
			// 			util.requestDataJson(setConnectUrl, data)
			// 		}
			// 		if (opt) {
			// 			//查询固件 对比
			// 			if (getApp().globalData.myFirewareVersion >= 44) {
			// 				uni.showLoading({
			// 					title: '跳转中...',
			// 				});
			// 				//#ifdef APP-PLUS
			// 				plus.geolocation.getCurrentPosition(function(p) {
			// 					console.log('p', p)
			// 					let pos = wgs84_to_gcj02(p.coords.longitude, p.coords
			// 						.latitude)
			// 					console.log('pos', pos)
			// 					let paramater = {
			// 						serialCode: that.device.serial_code,
			// 						rute: 'add',
			// 						la: pos[1],
			// 						lo: pos[0],
			// 						wifi_la: '',
			// 						wifi_lo: ''
			// 					}
			// 					uni.hideLoading()
			// 					getDeviceInfo(that.device.serial_code).then((rebackData) => {
			// 						getApp().globalData.myHardwareVersion = recivedata.data
			// 							.deviceInfo.hardwareVersion
			// 						console.log('获取到硬件版本', getApp().globalData.myHardwareVersion)
			// 						if (getApp().globalData.myHardwareVersion >= 38) {
			// 							uni.navigateTo({
			// 								url: '/pages/my/wifiSetting/wifiSetting?paramater=' +
			// 									JSON
			// 									.stringify(paramater)
			// 							})
			// 						} else {
			// 							uni.navigateTo({
			// 								url: '/pages/my/wifiSetting/homelocate/homelocate?paramater=' +
			// 									JSON.stringify(paramater)
			// 							})
			// 						}
			// 					})
			// 				}, function(e) {
			// 					uni.hideLoading()
			// 					uni.showToast({
			// 						title: '找不到服务器了',
			// 						icon: 'error'
			// 					})
			// 				});
			// 				//#endif
			// 				//#ifdef APP-HARMONY
			// 				$uni.getLocation({
			// 					type: 'gcj02',
			// 					success: (res) => {
			// 						let pos = wgs84_to_gcj02(res.longitude, res.latitude)
			// 						console.log('pos', pos)
			// 						let paramater = {
			// 							serialCode: this.device.serial_code,
			// 							rute: 'add',
			// 							la: pos[1],
			// 							lo: pos[0],
			// 							wifi_la: '',
			// 							wifi_lo: ''
			// 						}
			// 						uni.hideLoading()
			// 						getDeviceInfo(that.device.serial_code).then((rebackData) => {
			// 							getApp().globalData.myHardwareVersion = recivedata.data
			// 								.deviceInfo.hardwareVersion
			// 							console.log('获取到硬件版本', getApp().globalData
			// 								.myHardwareVersion)
			// 							if (getApp().globalData.myHardwareVersion >= 38) {
			// 								uni.navigateTo({
			// 									url: '/pages/my/wifiSetting/wifiSetting?paramater=' +
			// 										JSON
			// 										.stringify(paramater)
			// 								})
			// 							} else {
			// 								uni.showModal({
			// 									title: "提示",
			// 									content: "由于设备过于陈旧，该功能不支持鸿蒙系统"
			// 								})
			// 							}
			// 						})

			// 					},
			// 					fail: (err) => {
			// 						uni.hideLoading()
			// 						uni.showToast({
			// 							title: '找不到服务器了',
			// 							icon: 'error'
			// 						})
			// 					}
			// 				})
			// 				//#endif
			// 			} else {
			// 				uni.showToast({
			// 					title: '请先升级固件',
			// 					icon: 'error',
			// 				})
			// 				setTimeout(() => {
			// 					uni.showToast({
			// 						title: '即将自动跳转',
			// 						icon: 'success',
			// 					})
			// 					setTimeout(() => {
			// 						uni.navigateTo({
			// 							url: "/pages/setting/firmware/firmware"
			// 						})
			// 					}, 500)

			// 				}, 1000)
			// 			}
			// 		} else {
			// 			this.returnParent()
			// 		}
			// 	})
			// },
			scan2() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			scan() {
				console.log('inti scan');
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'],
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						// console.log(JSON.stringify(res));
						this.getDeviceCode(res.result);
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			async connectBluetooth(Id) {
				if (!this.bluetoothConnect) {
					this.bluetoothConnect = await util.createBLEConnection(Id)
					if (!this.bluetoothConnect) {
						this.connectBluetooth(Id);
					} else {
						uni.showToast({
							icon: 'none',
							title: '蓝牙连接成功'
						})
						//弹窗输入wifi和密码
						console.log('蓝牙连接成功')
					}
				}
				// await new Promise((resolve) => setTimeout(resolve, 1000));
			},
			initFeedBluetooth() {
				getApp().globalData.initFeedBluetooth = true
				//接收一下蓝牙
				util.startBluetoothDeviceDiscovery();
				uni.$on('initFeedBluetooth', function(devices) {
					// console.log('监听finddevice ', devices.devices[0].name);
					let id = util.convertToFormat('CYY', this.device.serial_code);
					let otaid = util.convertToFormat('OTA', this.device.serial_code);
					// console.log('serial code :', id);
					// console.log('devices.devices[0].name:', devices.devices[0].name);
					if (devices.devices[0].name === id || devices.devices[0].name === otaid) {
						let blueToothDeviceId = devices.devices[0].deviceId;
						console.log('发现目标蓝牙', devices.devices[0].name)
						uni.showToast({
							icon: 'loading',
							title: '发现目标蓝牙'
						})
						this.connectBluetooth(blueToothDeviceId)
						$uni.stopBluetoothDevicesDiscovery({})

					}
				})
			}
		},
		onReady() {},
		onUnload() {
			getApp().globalData.initFeedBluetooth = false
			if (this.bluetoothConnect) {
				$uni.closeBLEConnection({
					deviceId: this.blueToothDeviceId,
					success() {
						// console.log('断开蓝牙成功')
					}
				})
			}

			$uni.stopBluetoothDevicesDiscovery({
				success(res) {
					console.log('停止蓝牙搜索')
				}
			})

			$uni.closeBluetoothAdapter({
				success(res) {
					console.log('关闭蓝牙模块', res);
				}
			})

		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.uni-forms-item {
		margin: 0;
		padding: 0;
	}

	.view-scan {
		margin: 30rpx auto;
		width: 170rpx;
		height: 170rpx;
		border-radius: 110rpx;
		align-items: center;
		justify-content: center;
		background-color: white;
	}

	.icon-scan {
		margin: 25rpx;
		width: 120rpx;
	}

	/deep/ .uni-easyinput__content.is-disabled {
		background-color: rgba(0, 0, 0, 0) !important;
		color: #000000
	}

	.btn-save {
		width: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: linear-gradient(to right, #FF5858, #F09819);
		color: white;
		border-radius: 100rpx;
	}

	.tip-txt {
		margin: 20rpx auto;
		width: 500rpx;
		font-size: 23rpx;
		color: #FF5733;
	}


	.scanRow {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-bottom: 4px solid rgba(237, 237, 244, 1.0);
		margin: 0%;
		padding: 0%;
	}


	.myButton {
		width: 80px;
		background-color: rgba(47, 166, 160, 1);
		border-radius: 60rpx;
		height: 40px;
		/* font-family: jinshan; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>