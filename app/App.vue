<script>
	import logger from "/common/logger"
	import util, {
		filter
	} from '/common/util';
	import {
		getPage,
		updateStatus,
		getUnReadCount,
		updateStatusMul
	} from '@/api/api/message.js'
	//#ifdef APP-PLUS
	import {
		registerRequestPermissionTipsListener,
		unregisterRequestPermissionTipsListener,
		setRequestPermissionTips
	} from "@/uni_modules/uni-registerRequestPermissionTips"
	//#endif
	import permision from '/js_sdk/wa-permission/permission';
	import {
		$uni
	} from "@/utils/main.js"
	import {
		getPetList
	} from '/api/api/pet.js'
	import {
		getAppLatest,
		getIOSStore
	} from "@/api/api/system.js"
	//#ifdef APP-HARMONY
	import {
		isExist,
		getStaticOh
	} from "@/utils/file.js"
	import {
		ScreenOrientation
	} from "@/uni_modules/jiannor-oh-tools"
	//#endif
	import {
		onBluetoothStateChange,
		offBluetoothStateChange,
		getOsTheme
	} from '@/uni_modules/jiannor-oh-tools'
	import {
		WebUrl
	} from "@/api/webUrl.ts"
	var PermissionTips = {}
	const permissionNames = {
		"android.permission.ACCESS_FINE_LOCATION": "精确位置权限",
		"android.permission.ACCESS_COARSE_LOCATION": "大致位置权限",
		"android.permission.CAMERA": "相机权限",
		"android.permission.READ_MEDIA_IMAGES": "读取照片权限",
		"android.permission.READ_MEDIA_VIDEO": "读取视频权限",
		"android.permission.WRITE_EXTERNAL_STORAGE": "存储权限",
		"android.permission.ACCESS_BACKGROUND_LOCATION": "后台定位权限",
		"android.permission.BLUETOOTH_SCAN": "蓝牙扫描附近设备权限",
		"android.permission.BLUETOOTH_CONNECT": "蓝牙权限",
		"android.permission.ACCESS_NETWORK_STATE": '网路权限',
		"android.permission.ACCESS_WIFI_STATE": "访问WI_FI权限",
		"android.permission.CHANGE_NETWORK_STATE": "网络切换权限",
		"android.permission.CHANGE_WIFI_STATE": "WIFI切换权限",
		"android.permission.FLASHLIGHT": '闪光灯',

	};
	PermissionTips["android.permission.ACCESS_BACKGROUND_LOCATION"] =
		"<h4 style=\"font-size:40px;\">后台定位权限说明：</h4><font color=#cccccc>为了能在程序在后台时仍能获取到手机位置，刷新app中手机位置</font>"
	PermissionTips["android.permission.BLUETOOTH_SCAN"] =
		"<h4 style=\"font-size:40px;\">蓝牙扫描附近设备权限说明：</h4><font color=#cccccc>为了能对设备蓝牙进行搜寻</font>"
	PermissionTips["android.permission.BLUETOOTH_CONNECT"] =
		"<h4 style=\"font-size:40px;\">打开蓝牙权限：</h4><font color=#cccccc>为了能打开蓝牙进行设备搜索</font>"
	PermissionTips["android.permission.ACCESS_FINE_LOCATION"] =
		"<h4 style=\"font-size:40px;\">精确位置权限使用说明：</h4><font color=#cccccc>获取位置用来在地图界面展示</font>"
	PermissionTips["android.permission.ACCESS_COARSE_LOCATION"] =
		"<h4 style=\"font-size:40px;\">大概位置权限使用说明：</h4><font color=#cccccc>获取位置用来在地图界面展示</font>"
	PermissionTips["android.permission.CAMERA"] =
		"<h4 style=\"font-size:40px;\">相机权限使用说明：</h4><font color=#cccccc>用来拍照以实现上传头像，背景，以及反馈等功能</font>"
	PermissionTips["android.permission.READ_MEDIA_IMAGES"] =
		"<h4 style=\"font-size:40px;\">相册/相机权限使用说明：</h4><font color=#cccccc>便于您使用该功能上传/拍摄您的照片/图片用于更换头像，主页背景，以及反馈问题等场景中读取相册内容。</font>"
	PermissionTips["android.permission.READ_MEDIA_VIDEO"] =
		"<h4 style=\"font-size:40px;\">相册/相机权限使用说明：</h4><font color=#cccccc>便于您使用该功能上传/拍摄您的照片/图片用于更换头像，主页背景，以及反馈问题等场景中读取相册内容。</font>"
	PermissionTips["android.permission.WRITE_EXTERNAL_STORAGE"] =
		"<h4 style=\"font-size:40px;\">存储权限使用说明：</h4><font color=#cccccc>便于您访问您的照片用于更换头像，主页背景，以及反馈问题等场景中读取相册内容。</font>"
	PermissionTips["android.permission.ACCESS_NETWORK_STATE"] =
		"<h4 style=\"font-size:40px;\">网络权限使用说明：</h4><font color=#cccccc>用来检查APP是否可以正常访问网络。</font>"
	PermissionTips["android.permission.ACCESS_WIFI_STATE"] =
		"<h4 style=\"font-size:40px;\">WI_FI权限使用说明：</h4><font color=#cccccc>用来检查APP是否可以正常打开WIFI模块，用来进行WIFI扫描。</font>"
	PermissionTips["android.permission.CHANGE_NETWORK_STATE"] =
		"<h4 style=\"font-size:40px;\">网络切换权限使用说明：</h4><font color=#cccccc>为了APP能在WIFI和移动网络切换时正常运行。</font>"
	PermissionTips["android.permission.CHANGE_WIFI_STATE"] =
		"<h4 style=\"font-size:40px;\">wifi切换权限使用说明：</h4><font color=#cccccc>为了APP能在WIFI和移动网络切换时正常运行。</font>"
	PermissionTips["android.permission.FLASHLIGHT"] =
		"<h4 style=\"font-size:40px;\">闪光灯权限使用说明：</h4><font color=#cccccc>为了APP能在拍照时使用闪光灯。</font>"
	export default {
		data() {
			return {
				stateChangeTimer: null, // 定义在组件数据中
			}
		},
		onLoad() {
			console.log('into app onload')
		},
		onUnload() {
			offBluetoothStateChange()

		},
		onExit: function() {
			//#ifdef APP-HARMONY
			$uni.removeStorageOH("createWant")
			//#endif

			let info = uni.getDeviceInfo()
			if (info.platform === 'android') {
				unregisterRequestPermissionTipsListener(null)
			}
			uni.offThemeChange()
		},
		onLaunch: function(options) {
			console.log("App onLaunch 开始执行")
			this.checkPrivacyAgreement()
		},
		onShow: function() {
			console.log('App Show')
			// getApp().globalData.locateIsRuning=uni.getStorageSync('locateIsRuning');
			//#ifndef APP-HARMONY
			plus.runtime.setBadgeNumber(0);
			//#endif
			//#ifdef APP-HARMONY
			try {
				$uni.setBadgeNumber({
					badgeNumber: 0
				})
			} catch (err) {
				console.log("setBadgeNumber", err)
			}
			//#endif
			uni.getStorage({
				key: 'locateIsRuning',
				success: function(res) {
					getApp().globalData.locateIsRuningArray = JSON.parse(res.data)
					console.log('获取缓存的locateIsRuning' + JSON.stringify(getApp().globalData
						.locateIsRuningArray));
				},
				fail: function(err) {
					console.log('获取缓存的locateIsRuning 失败' + JSON.stringify(err));
				},
			});
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initSDKs() {
				// // 添加请求拦截器
				this.initGlobalData()
				uni.addInterceptor('request', {
					invoke(args) {
						console.log('🔗 发出的请求:', {
							method: args.method,
							headers: args.header,
							data: args.data,
							url: args.url.toString(), // 添加 URL 打印
						});
					},
					success(args) {
						console.log('✅ 请求成功:', args.statusCode);
					},
					fail(args) {
						console.log('❌ 请求失败:', args);
					}
				});
				//#ifdef APP-HARMONY
				let path = $uni.getStaticPath("/static/logo.png")
				getApp().globalData.staticPath = path.replaceAll('/static/logo.png', '')

				let createWant = $uni.getStorageOH("createWant")
				console.log("createWant", createWant)
				if (createWant.uri && createWant.uri != null || undefined && createWant.uri != '') {
					let param = $uni.parseURL(createWant.uri)
					console.log("createWant onNewWant", param.params)
				}

				$uni.onNewWant({
					receiveShare: true,
					onNewWant(want) {
						console.log("onNewWant", want)
						if (want.uri && want.uri != null || undefined && want.uri != '') {
							let param = $uni.parseURL(want.uri)
							console.log("onNewWant", param.params)
						}
					},
					onShare(dataList) {
						console.log("onNewWantShare", dataList)
					}
				})
				//#endif
				try {
					let info = uni.getDeviceInfo()
					if (info.platform == 'android') {
						var brand = uni.getSystemInfoSync().deviceBrand
						setRequestPermissionTips(PermissionTips)
						registerRequestPermissionTipsListener({
							onRequest: (e) => {
								console.log(e)
							},
							onConfirm: (e) => {
								console.log(e)
							},
							onComplete: (e) => {
								console.log('可能需要引导打开权限', e)
								// 华为手机在权限禁止之后，再次申请权限不会出现权限申请框。此时应该引导用户去系统设置开启此权限，不应该频繁申请。
								if (info.platform === 'Android') {
									var tips = {}
									var hasDeniedPermission = false
									var name = ''
									for (var k in PermissionTips) {
										if (e[k] != "denied") {
											tips[k] = PermissionTips[k]
										} else {
											hasDeniedPermission = true
											name += permissionNames[k] + ' '
										}
									}
									setRequestPermissionTips(tips) // 更新弹框提醒，防止华为手机不出现权限申请框时权限提醒框闪烁的情况
									if (hasDeniedPermission)
										uni.showModal({
											content: name + "已经被拒绝，请前往设置中开启",
											success: (res) => {
												if (res.confirm) {
													if (res.confirm)
														permision.gotoAppPermissionSetting()
												} else if (res.cancel) {
													console.log('用户点击取消');

												}
											}
										})
								}
							}
						})
					}
				} catch (err) {
					console.log("lanchhhhhhhhhhhhh", err)
				}
				console.log('getApp().globalData.batteryShowMode', getApp().globalData.batteryShowMode);
				//获取缓存，如果不是第一次，就不提醒了
				uni.getStorage({
					key: 'notifecationPermit',
					success: function(res) {},
					fail: function(err) {
						getApp().permissions();
					}
				});

				try {
					$uni.onBluetoothDeviceFound(devices => {
						// console.log('发现新的蓝牙',devices)
						if (getApp().globalData.settingWifiBluetooth) {
							console.log('把设备发送到WiFi界面')
							uni.$emit('wifiDevice', devices)
						}
						if (getApp().globalData.openLadarBluetooth && !getApp().globalData.settingWifiBluetooth) {
							// console.log('send to openLadarBluetooth')
							uni.$emit('ladarDevice', devices)
						}
						if (getApp().globalData.openFirewareBluebooth) {
							// console.log('send bluetooth',devices);
							uni.$emit('firewareDevice', devices)
						}
						if (getApp().globalData.initFeedBluetooth) {
							uni.$emit('initFeedBluetooth', devices)
						}
					})
					$uni.onBLECharacteristicValueChange((res) => {
						if (getApp().globalData.settingWifiBluetooth) {
							console.log('send settingWifiBluetooth');
							uni.$emit('wifiCharacter', res)
						}
						if (getApp().globalData.openLadarBluetooth && !getApp().globalData.settingWifiBluetooth) {
							console.log('send openLadarBluetooth', devices);
							uni.$emit('ladarCharacter', res)
						}
						if (getApp().globalData.openFirewareBluebooth) {
							// console.log('send bluetooth',devices);
							uni.$emit('firwareCharacter', res)
						}
						if (getApp().globalData.initFeedBluetooth) {
							uni.$emit('initFeedCharacter', res)
						}
					})
					let that = this
					$uni.onBLEConnectionStateChange((res => {
						console.log('监听到 蓝牙连接发生变化', res)
						if (getApp().globalData.openLadarBluetooth && !getApp().globalData
							.settingWifiBluetooth && !getApp().globalData.openFirewareBluebooth) {
							console.log('send LadarBluetooth', res);
							uni.$emit('ladarConnect', res)
						}
						if (getApp().globalData.settingWifiBluetooth) {
							uni.$emit('wifiBlueConnect', res)
						}
						if (getApp().globalData.openFirewareBluebooth) {
							// console.log('send bluetooth',devices);
							uni.$emit('firwareConnect', res)
						}
						if (getApp().globalData.initFeedBluetooth) {
							uni.$emit('initFeedConnect', res)
						}
						// 你的业务逻辑
					}))
					let stateChangeTimer = null

					//#ifdef APP-HARMONY
					let darkMode = getOsTheme()
					console.log('darkMode', darkMode)
					uni.$emit('darkMode', darkMode)
					uni.onThemeChange((res) => {
						console.log('darkMode', res.theme)
						try {
							uni.$emit('darkMode', res.theme)
						} catch (err) {
							console.log('onThemeChange', err)
						}
					})
					//#endif

					//#ifdef APP-PLUS
					onBluetoothStateChange((res) => {
						console.log('蓝牙状态:', res.state)
						clearTimeout(stateChangeTimer);
						stateChangeTimer = setTimeout(() => {
							console.log('蓝牙适配器状态变化:', res);
							if (getApp().globalData.openLadarBluetooth && !getApp().globalData
								.settingWifiBluetooth && !getApp().globalData.openFirewareBluebooth) {
								console.log('send LadarBluetooth', res);
								uni.$emit('BluetoothAdapterStateChange', res)
							}
							if (getApp().globalData.settingWifiBluetooth) {
								uni.$emit('wifiBluetoothAdapterStateChange', res)
							}
							if (getApp().globalData.openFirewareBluebooth) {
								// console.log('send bluetooth',devices);
								uni.$emit('firwareBluetoothAdapterStateChange', res)
							}
						}, 500)

					})
					//#endif
					// $uni.onBluetoothAdapterStateChange((res) => {

					// });
					//#ifdef APP-HARMONY
					$uni.onBluetoothStateChange((result) => {
						uni.$emit('bluetoothState', result)
					})

					$uni.onLocationEnabledChange((result) => {
						uni.$emit('locationEnabledState', result)
					})
					//#endif

				} catch (err) {
					console.log("onBluetoothDeviceFound", err)
				}
				// uni.onBLECharacteristicValueChange((res) => {
				// 	uni.$emit('CharacteristicValueChange', res)

				// })
				uni.getPushClientId({
					success: (res) => {
						console.log('我拿到了pushid' + JSON.stringify(res.cid));
						getApp().globalData.pushId = res.cid;
					},
					fail(err) {
						console.log("err", err)
					}
				})
				uni.getSystemInfo({
					success: function(res) {
						console.log('我拿到了systemid', res.deviceId)
						getApp().globalData.systemId = res.deviceId
					}
				});
				uni.getStorage({
					key: 'leadOut',
					success: function(res) {
						getApp().globalData.leadOut = JSON.parse(res.data)
						console.log('获取缓存的leadOut' + getApp().globalData.leadOut);
					},
					fail: function(err) {
						console.log('获取缓存的leadOut' + JSON.stringify(err));
					},
				});
				uni.getStorage({
					key: 'railOut',
					success: function(res) {
						getApp().globalData.railOut = JSON.parse(res.data)
						console.log('获取缓存的railOut' + getApp().globalData.railOut);

					},
					fail: function(err) {
						console.log('获取缓存的railOut' + JSON.stringify(err));
					},
				});

				uni.onPushMessage((res) => {
					//收到新消息recivePushData
					console.log('收到一个推送新消息', res.data, res.type)
					if (res.type === "receive") {
						// this.newGetPushData()
						this.getMessagePage()
						//如果时被取消共享，直接删除一下  如果取消了 再共享 然后又接受 那反复执行这里会把后接受的删掉，应该只在第一次收到的时候过滤一下
						//靠来什么来判断是第一次呢，
						uni.$emit('update', res.data)
						if (res.data.payload.identify === 1) {
							getPetList().then((recivedata) => {
								console.log('获取到宠物列表', recivedata)
								getApp().globalData.allPets = recivedata.data
							})

						}
						if (res.data.title === '电子牵引') {
							//如果是结束牵引把消息传入地图界面
							getApp().globalData.leadOut = true;
							let savedata = JSON.stringify(getApp().globalData.leadOut);
							uni.setStorage({
								key: 'leadOut',
								data: savedata,
							});
						}
						if (res.data.title === '电子围栏') {
							getApp().globalData.railOut = true;
							let savedata = JSON.stringify(getApp().globalData.railOut);
							uni.setStorage({
								key: 'railOut',
								data: savedata,
							});
						}
						uni.createPushMessage({
							title: res.data.title,
							content: res.data.content,
							payload: res.data.payload,
							success() {
								console.log('createPushMessage 成功')
							},
							fail(err) {
								console.log('createPushMessage 失败' + JSON.stringify(err))
							}
						})
					} else {

					}

				})

				console.log('App Launch')
				//#ifndef APP-HARMONY
				plus.screen.lockOrientation("portrait-primary")
				//#endif
				//#ifdef APP-HARMONY
				$uni.setScreenOrientation(ScreenOrientation.PORTRAIT)
				//#endif
				console.log('into init');
				uni.getSystemInfo({
					success: (res) => {
						var that = this;
						//检测当前平台，如果是安卓则启动安卓更新
						console.log('detect android' + JSON.stringify(res));
						// if (res.platform === "android") {
						// 	console.log('into')
						that.checkUpdateApp();
						// }
					}
				})
				uni.getStorage({
					key: 'presentPet',
					success: function(res) {
						getApp().globalData.presentPet = JSON.parse(res.data)
						console.log('获取缓存的presentPet' + JSON.stringify(getApp().globalData.presentPet));

					},
					fail: function(err) {
						console.log('获取缓存的presentPet 失败' + JSON.stringify(err));
					},
				});
			},
			checkPrivacyAgreement() {
				// 使用条件编译
				// #ifdef APP-PLUS
				// 获取平台信息
				const systemInfo = uni.getSystemInfoSync()
				const platform = systemInfo.platform.toLowerCase()
				if (platform === 'android') {
					// Android 平台：使用 plus.runtime 方法
					if (plus.runtime.isAgreePrivacy()) {
						this.initSDKs()
					} else {
						plus.runtime.agreePrivacy(() => {
							this.initSDKs()
						})
						// plus.runtime.quit();
					}
				} else if (platform === 'ios') {
					// iOS 平台：直接初始化或使用自己的逻辑
					this.initSDKs()
					// 注意：iOS 的隐私弹窗通常在原生代码中处理
					// 这里需要确保用户已经同意隐私协议
				}
				// #endif
				//#ifdef APP-HARMONY
				this.initSDKs()
				//#endif
			},
			initGlobalData() {
				this.globalData = util.initGlobalData()
				console.log('全局数据初始化完成', this.globalData)
			},
			getMessagePage() {
				getUnReadCount().then(revicedata => {
					console.log('获取没读的消息数', revicedata)
					let cnt = revicedata.data
					if (cnt > 0) {
						uni.setTabBarBadge({
							index: 3, // 消息 tab 的索引，从0开始计算
							text: cnt.toString()
						});
					} else {
						uni.removeTabBarBadge({
							index: 3
						})
					}
				})
			},
			getAppList() {
				// 获取用户已装应用列表
				// console.log('into get list');
				// plus.android.importClass("java.util.ArrayList");
				// plus.android.importClass("android.content.pm.PackageInfo");
				// plus.android.importClass("android.content.pm.PackageManager");
				// const ApplicationInfo = plus.android.importClass("android.content.pm.ApplicationInfo");
				// const MainActivity = plus.android.runtimeMainActivity();
				// const PackageManager = MainActivity.getPackageManager();
				// const installedPackages = plus.android.invoke(PackageManager, "getInstalledPackages", 0);
				// if (installedPackages != null) {
				// 	const apkList = [];
				// 	for (let i = 0; i < installedPackages.size(); i++) {
				// 		const pkginfo = installedPackages.get(i);
				// 		const issysapk =
				// 			(pkginfo.plusGetAttribute("applicationInfo").plusGetAttribute("flags") &
				// 				ApplicationInfo.FLAG_SYSTEM) !=
				// 			0 ?
				// 			true :
				// 			false;
				// 		'"appName":"宠悦悦","packageName":"cyy.client","versionName":"1.3.0","versionCode":130'
				// 		if (issysapk == false) {
				// 			const apkinfo = {
				// 				appName: pkginfo.plusGetAttribute("applicationInfo").loadLabel(PackageManager)
				// 					.toString(),
				// 				packageName: pkginfo.plusGetAttribute("packageName"),
				// 				versionName: pkginfo.plusGetAttribute("versionName"),
				// 				versionCode: pkginfo.plusGetAttribute("versionCode"),
				// 			};
				// 			if (pkginfo.plusGetAttribute("applicationInfo").loadLabel(PackageManager).toString() ===
				// 				"宠悦悦" && pkginfo.plusGetAttribute("versionCode") <= 132) {
				// 				console.log('我发现有老的宠悦悦app需要删除', pkginfo.plusGetAttribute("versionCode"));
				// 				uni.showModal({
				// 					title: "版本检测",
				// 					content: "全新的版本将为您提供更好的体验和更多功能。更新后为了确保您能享受最新功能，请将旧版本卸载。",
				// 					success: (res) => {
				// 						if (res.confirm) {
				// 							// uni.showLoading({
				// 							// 	title:"正在更新",
				// 							// 	mask:true
				// 							// })
				// 							// getApp().install(appurl);


				// 						} else if (res.cancel) {
				// 							console.log('用户点击取消');

				// 						}
				// 					},
				// 					fail: () => {
				// 						uni.hideLoading();
				// 					}
				// 				})
				// 			}
				// 			// apkList.push(apkinfo);
				// 		}
				// 	}
				// 	// console.log(JSON.stringify(apkList));
				// }
			},
			// pushItemToQueue(itemcontent, userpushdatalist) {
			// 	try {
			// 		let item = itemcontent.data
			// 		let status = itemcontent.status
			// 		// console.log('itemcontent', itemcontent)
			// 		// 遍历userpushdatalist中的队列
			// 		for (let i = 0; i < userpushdatalist.length; i++) {
			// 			const queue = userpushdatalist[i];
			// 			// 检查队列中第一个元素的title是否与item的title相同
			// 			if (queue[0].data.title === item.title) {
			// 				queue.push(itemcontent);
			// 				if (status === 0)
			// 					getApp().globalData.PushDataList.userReceiveNew[i] = true;
			// 				// console.log('queue',queue);
			// 				return;
			// 			}
			// 		}
			// 		// 如果没有找到相同title的队列，创建一个新队列并将item添加到队列中
			// 		console.log('新的消息队列', itemcontent)
			// 		const newQueue = [itemcontent];
			// 		if (itemcontent.status === 0)
			// 			getApp().globalData.PushDataList.userReceiveNew.push(true);
			// 		else
			// 			getApp().globalData.PushDataList.userReceiveNew.push(false);
			// 		console.log('getApp().globalData.PushDataList.userReceiveNew' + JSON.stringify(getApp()
			// 			.globalData.PushDataList
			// 			.userReceiveNew));
			// 		userpushdatalist.push(newQueue);
			// 	} catch (e) {
			// 		//TODO handle the exception
			// 		console.log('pushItemToQueue irror' + JSON.stringify(e));
			// 	}
			// },
			getTimeDifferenceInSeconds(time1, time2) {
				const date1 = new Date(time1);
				const date2 = new Date(time2);
				const difference = Math.floor((date2 - date1) / 1000);
				return difference;
			},
			checkUpdateApp() {
				//  获取manifest.json里的配置信息
				//#ifndef APP-HARMONY
				let appInfo = uni.getAppBaseInfo();
				getApp().globalData.appVersion = appInfo.appVersion
				let info = uni.getSystemInfoSync();
				if (info.platform == 'android') {
					getAppLatest().then((srcData) => {
						console.log('getAppLatest', srcData.data)
						var data = srcData;
						if (data && (appInfo.appVersion < data.data.code)) {
							uni.showModal({
								title: "更新提示",
								confirmText: "立即升级",
								content: data.data.remark,
								success: (res) => {
									if (res.confirm) {
										getApp().install(data.data.url);
									} else if (res.cancel) {
										// console.log('用户点击取消');
									}
								},
								fail: () => {
									uni.hideLoading();
								}
							})
						}
					})
				} else if (info.platform == 'ios') {
					getIOSStore().then((res) => {
						console.log('查询appstore 最新版本' + res.results[0].version)
						console.log('当前app版本' + appInfo.appVersion)
						if (appInfo.appVersion >= res.results[0].version) {
							console.log('当前app版本已经是最新的')
						} else {
							console.log('当前app版本不是最新的')
							uni.showModal({
								title: "更新提示",
								content: "有新的版本可以升级",
								confirmText: '更新',
								success: (res) => {
									if (res.confirm) {
										let appleId = '6469095095'
										plus.runtime.launchApplication({
											action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
										}, function(e) {
											console.log(
												'Open system default browser failed: ' +
												e.message);
										});
									} else if (res.cancel) {

									}
								},
								fail: () => {
									uni.hideLoading();
								}
							})
						}
					})
				}
				//#endif
				//#ifdef APP-HARMONY
				try {
					let base = uni.getAppBaseInfo()
					getApp().globalData.appVersion = base.appVersion;
					$uni.checkAndShowUpdate({
						success(res) {
							console.log("checkAndShowUpdateSuccess", res)
						},
						fail(err) {
							console.log("checkAndShowUpdateFail", err)
						}
					})
				} catch (err) {
					console.log(err)
				}
				//#endif
			},
			install(fileUrl) {
				//仅安卓会调用
				// 检查plus对象
				if (plus === 'undefined') {
					uni.showToast({
						title: '环境不支持',
						icon: 'none'
					});
					return;
				}

				// 检查下载器
				if (!plus.downloader) {
					uni.showToast({
						title: '下载功能不可用',
						icon: 'none'
					});
					return;
				}

				// 验证URL
				if (!fileUrl || typeof fileUrl !== 'string') {
					console.error('无效的下载URL:', fileUrl);
					uni.showToast({
						title: '下载地址无效',
						icon: 'none'
					});
					return;
				}

				// 创建更新任务
				const dtask = plus.downloader.createDownload(fileUrl, {
					filename: "_doc/update/"
				}, function(d, status) {
					if (status == 200) {
						plus.runtime.install(d.filename, {
							force: true
						}, function() {
							//除了电话号以外的缓存都清掉
							// let number = uni.getStorageSync('phoneNumber');
							// uni.clearStorage();
							// uni.clearStorageSync();
							// uni.setStorageSync('phoneNumber', number);
							plus.nativeUI.closeWaiting();
							// plus.nativeUI.alert("稍后请重新打开app！", function() {
							// 	plus.runtime.quit();
							// });
						}, function(e) {
							plus.nativeUI.closeWaiting();
							console.log("安装文件失败[" + e.code + "]：" + e.message);
						});
					} else {
						console.log("下载失败！");
					}
					plus.nativeUI.closeWaiting();
				})
				// 监听更新进度
				let prg = 0;
				const showLoading = plus.nativeUI.showWaiting("更新中...");
				dtask.start();
				dtask.addEventListener("statechanged", function(task, status) {
					switch (task.state) {
						case 1:
							showLoading.setTitle("正在下载");
							break;
						case 3:
							prg = parseInt(
								(parseFloat(task.downloadedSize) /
									parseFloat(task.totalSize)) *
								100
							);
							showLoading.setTitle("  正在下载" + prg + "%  ");
							break;
						case 4:
							plus.nativeUI.closeWaiting();
							break;
					}
				});
			},
			backParents() {
				uni.navigateBack({
					delta: 1
				});
			},
			permissions() {
				console.log('into permisssion')
				let firstNotificationPermit = 0;
				uni.setStorage({
					key: 'notifecationPermit',
					data: firstNotificationPermit.toString(),
					success: function() {
						console.log('第一次通知提醒缓存成功');
					}
				})
				// #ifdef APP-PLUS  
				let info = uni.getDeviceInfo()
				if (info.platform == 'android') { // 判断是Android
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName();
					var uid = main.getApplicationInfo().plusGetAttribute("uid");
					var NotificationManagerCompat = plus.android.importClass(
						"android.support.v4.app.NotificationManagerCompat");
					if (NotificationManagerCompat == null) {
						NotificationManagerCompat = plus.android.importClass(
							"androidx.core.app.NotificationManagerCompat");
					}
					// var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
					// // 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
					// if (!areNotificationsEnabled) {
					// 	uni.showModal({
					// 		title: '通知权限开启提醒',
					// 		content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
					// 		success(res) {
					// 			if (res.confirm) {
					// 				getApp().openTongZhi();
					// 			} else if (res.cancel) {
					// 				console.log('用户点击取消');
					// 			}
					// 		}
					// 	})
					// }
				}
				// #endif  
			},
			async getImageCache(filePath, fileMd5) {
				// 图片缓存key值
				if (filePath === '' || filePath === null) {
					return '/static/new/default_avatar.png';
				}
				let storageKey = 'IMAGE_CACHE_INFO_' + fileMd5

				const cacheFileInfo = uni.getStorageSync(storageKey)

				//#ifndef APP-HARMONY
				if (cacheFileInfo) {
					console.log("已缓存为：" + cacheFileInfo)
					return cacheFileInfo
				} else {
					console.log("未缓存,进行下载保存")
					// 如果没有，执行下载，并存储起来后
					uni.downloadFile({
						url: filePath,
						success: (res) => {
							if (res.statusCode === 200) {
								console.log('下载成功', res)
								// 再进行本地保存
								uni.saveFile({
									tempFilePath: res.tempFilePath,
									success: function(res2) {
										console.log(res2.savedFilePath)
										uni.setStorageSync(storageKey, res2.savedFilePath)
										return res2.savedFilePath
									},
									fail: function(res2) {
										return '/static/new/default_avatar.png'
									}
								})
							} else {
								console.log('下载临时文件失败', filePath, res)
								// uni.setStorageSync(storageKey, res2.savedFilePath)
								return '/static/new/default_avatar.png'
							}
						},
						fail: (res) => {
							console.log(res)
							return filePath
						}
					})
				}
				//#endif

				//#ifdef APP-HARMONY
				if (cacheFileInfo && await isExist(cacheFileInfo) == true) {
					// console.log("已缓存为：" + cacheFileInfo)
					return cacheFileInfo
				} else {
					// console.log("未缓存,进行下载保存")
					// 如果没有，执行下载，并存储起来后
					if (filePath.startsWith("http") || filePath.startsWith("https")) {
						uni.downloadFile({
							url: filePath,
							success: (res) => {
								if (res.statusCode === 200) {
									console.log('下载成功', filePath);
									// 再进行本地保存
									$uni.getAppPath().then((path) => {
										let manager = uni.getFileSystemManager()
										manager.saveFile({
											tempFilePath: res.tempFilePath,
											filePath: `${path.cacheDir}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.png`,
											success(res2) {
												console.log(res2.savedFilePath)
												uni.setStorageSync(storageKey, res2
													.savedFilePath)
												return res2.savedFilePath
											},
											fail(err) {
												return '/static/new/default_avatar.png'
											}
										})
									})
								} else {
									console.log('下载临时文件失败', filePath, res)
									// uni.setStorageSync(storageKey, res2.savedFilePath)
									return '/static/new/default_avatar.png'
								}
							},
							fail: (res) => {
								console.log(res)
								return filePath
							}
						})
					} else if (filePath.startsWith("static/")) {
						let url = WebUrl.ADDRESS + '/' + filePath
						uni.downloadFile({
							url: url,
							success: (res) => {
								if (res.statusCode === 200) {
									console.log('下载成功', filePath);
									// 再进行本地保存
									$uni.getAppPath().then((path) => {
										let manager = uni.getFileSystemManager()
										manager.saveFile({
											tempFilePath: res.tempFilePath,
											filePath: `${path.cacheDir}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.png`,
											success(res2) {
												console.log(res2.savedFilePath)
												uni.setStorageSync(storageKey, res2
													.savedFilePath)
												return res2.savedFilePath
											},
											fail(err) {
												return '/static/new/default_avatar.png'
											}
										})
									})
								} else {
									console.log('下载临时文件失败', filePath, res)
									// uni.setStorageSync(storageKey, res2.savedFilePath)
									return '/static/new/default_avatar.png'
								}
							},
							fail: (res) => {
								console.log(res)
								return filePath
							}
						})
					} else if (filePath.startsWith("/static") || filePath.startsWith("/data/storage")) {
						return filePath
					} else {
						console.log("getImageCache", "图片缓存有问题", filePath)
					}
				}
				//#endif
			},
			isFeedmachine(serial_code) {
				if (serial_code.substring(0, 2) === 'be') {
					return false
				} else {
					return true
				}

			},
			openTongZhi() { //弹窗按钮绑定方法
				let platform = uni.getSystemInfoSync().platform; //获取安卓还是ios
				if (platform == "ios") { //如果机型是ios，ios由于权限问题，可能需要手动开启
					var UIApplication = plus.ios.import("UIApplication");
					var app = UIApplication.sharedApplication();
					var settings = app.currentUserNotificationSettings();
					var enabledTypes = settings.plusGetAttribute("types");
					var NSURL2 = plus.ios.import("NSURL");
					var setting2 = NSURL2.URLWithString("app-settings:");
					var application2 = UIApplication.sharedApplication();
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
					plus.ios.deleteObject(settings);
				} else if (platform == "android") { //如果机型是安卓
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName();
					var uid = main.getApplicationInfo().plusGetAttribute("uid");
					var Intent = plus.android.importClass("android.content.Intent");
					var Build = plus.android.importClass("android.os.Build");
					//android 8.0引导
					if (Build.VERSION.SDK_INT >= 26) { //判断安卓系统版本
						var intent = new Intent("android.settings.APP_NOTIFICATION_SETTINGS");
						intent.putExtra("android.provider.extra.APP_PACKAGE", pkName);
					} else if (Build.VERSION.SDK_INT >= 21) { //判断安卓系统版本
						//android 5.0-7.0
						var intent = new Intent("android.settings.APP_NOTIFICATION_SETTINGS");
						intent.putExtra("app_package", pkName);
						intent.putExtra("app_uid", uid);
					} else {
						//(<21)其他--跳转到该应用管理的详情页
						intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
						var uri = Uri.fromParts(
							"package",
							mainActivity.getPackageName(),
							null
						);
						intent.setData(uri);
					}
					// 跳转到该应用的系统通知设置页
					main.startActivity(intent);
				}
			}
		},
	}
</script>

<style>
	/*每个页面公共css */
	/* @font-face {
		font-family: 'huawei';
		src: url('/static/ttf/HarmonyOS_SansSC_Regular.ttf');
	}
	
	@font-face{
		font-family: 'google';
		src: url('/static/ttf/GoogleSansFlex_120pt-Regular.ttf')
	}

	text {
		font-family: 'huawei';
	} */

	.myicon {
		position: relative;
	}

	/* 	:root {
		--slipHeight: 600rpx;
	} */
	/* .body {
		font-family: 'jinshan';
	} */

	.setting_text {
		margin-left: 40rpx;
		/* font-family: jinshan; */
		font-size: 40rpx;
		color: rgba(105, 105, 105, 1);
	}

	.col {
		display: flex;
		align-items: center;
		flex-direction: column;
		/* justify-content: center; */
	}

	/* .content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: start;
	} */

	/* .topBar {
		width: 100%;
		height: 20%;
		border-radius: 20rpx;
		border-radius: 20rpx 20rpx 0 0/20rpx 20rpx 0 0;
		background: rgba(47, 166, 160, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	} */
	.container {
		display: flex;
		flex-direction: column;
	}

	.row_start {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.row_end {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.row_center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.row_between {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.row_around {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.col_center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.col_between {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.col_start {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: start; */
	}

	.nav {
		/* height: 200rpx; */
		padding-top: 35px;
		padding-left: 10px;
		display: flex;
		flex-direction: row;
		background-color: #2fa6a0;
		justify-content: space-between;
		margin-left: 0%;
		align-items: center;
	}

	.nav-text {
		font-size: 40rpx;
		/* font-family:jinshan; */
		color: #ffffff;
	}

	.nav-placeholder {
		width: 80rpx;
	}

	.myButton {
		width: 80px;
		border-radius: 60rpx;
		height: 34px;
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
		/* font-family: jinshan; */
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.myButton:active {
		/* 点击时样式 */
		transform: scale(0.98);
		/* 轻微缩小效果 */
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
		/* 内阴影实现按下效果 */
		width: 80px;
		border-radius: 60rpx;
		height: 34px;
		/* font-family: jinshan; */
		background-color: rgb(128, 128, 128);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.map-container {
		height: 1250px;
		width: 750px;
	}

	.row {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		position: absolute;
		height: 240rpx;
		top: 530rpx;
		/* justify-content:center; */
	}

	.row_pet {
		height: 100%;
		width: 92%;
		opacity: 1;
		border-radius: 70rpx;
		background: rgba(255, 255, 255, 1);
		/* 	backdrop-filter: blur(5px); */
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: start */
	}

	.setting_row {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 80rpx;
		justify-content: space-between;
		margin-left: 0%;
		border-bottom: 4px solid rgba(243, 243, 249, 0.3);
	}

	.nav_row {
		display: flex;
		justify-content: space-around;
		padding-top: 12%;
		padding-bottom: 1%;
		align-items: center;
	}

	.avatarSelected {
		border: 1px solid rgba(47, 166, 160, 1);
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	}

	.mynvagation {
		padding-top: 7%;
		height: 100rpx;
		display: flex;
		background-color: #2fa6a0;
		color: #FFFFFF;
		justify-content: space-between;
		margin-left: 0%;
		align-items: center;
	}

	.imgdevice {
		width: 100rpx;
		height: 90rpx;
	}

	.btn-get-code {
		font-size: 30rpx;
		color: #fff;
		/* border-radius: 2rpx; */
		padding: 4rpx 4rpx;
		margin: 0%;
		border-radius: 100rpx;
		background: rgba(47, 166, 160, 1);
	}

	.topBar {
		width: 250px;
		height: 40px;
		border-radius: 30px 30px 0 0;
		/* background: linear-gradient(90deg, rgba(255, 88, 88, 1) 0%, rgba(240, 152, 25, 1) 100%); */
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 34rpx;
	}

	.main-container {
		/* width: 100vw;
		height: 100vh;
		background: linear-gradient(to bottom, #e8eaeb, #fdfafa);
		overflow: hidden;
		padding-top: env(safe-area-inset-top);
		padding-bottom: env(safe-area-inset-bottom);
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right); */
		height: 100vh;
		background: linear-gradient(180deg, rgba(235, 237, 238, 1) 0%, rgba(253, 251, 251, 1) 100%);
	}

	.title-container {
		width: 100%;
		text-align: center;
		font-weight: bold;
		position: relative;
	}

	.icon-back {
		position: absolute;
		left: 30rpx;
		width: 50rpx;
		/* margin: auto 0; */
	}

	/* #ifdef APP-HARMONY */
	@media (prefers-color-scheme: dark) {
		.topBar {
			width: 250px;
			height: 40px;
			border-radius: 30px 30px 0 0;
			/* background: linear-gradient(90deg, rgba(255, 88, 88, 1) 0%, rgba(240, 152, 25, 1) 100%); */
			background: linear-gradient(90deg, rgba(163, 41, 41, 1) 0%, rgba(173, 114, 31, 1) 100%);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 34rpx;
		}

		.myButton {
			width: 80px;
			border-radius: 60rpx;
			height: 34px;
			background: linear-gradient(90deg, rgba(163, 41, 41, 1) 0%, rgba(173, 114, 31, 1) 100%);
			/* font-family: jinshan; */
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			font-size: 32rpx;
		}
	}

	/* #endif */
</style>