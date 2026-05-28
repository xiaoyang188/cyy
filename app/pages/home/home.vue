<template>
	<view class='grad'>
		<view style="position: fixed; width: 0; height: 0; overflow: hidden;">
			<!-- <canvas canvas-id="myCanvas" :style="{ width: powerW * 98 + 'px', height: powerW * 110+ 'px' }"></canvas>
			<canvas canvas-id="canvasBell" :style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas>
			<canvas canvas-id="canvasLight" :style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas>
			<canvas canvas-id="canvasBellLight"
				:style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas> -->
		</view>
		<!-- 折叠式标题栏 -->
		<view class="collapse-header"
			:style="{ background: 'rgba(255,255,255,' + headerOpacity + ')', height: headerHeight + 'rpx' }">
			<view class="collapse-header-content">
				<text class="collapse-header-title" :style="{ opacity: headerOpacity }">运动</text>
			</view>
		</view>
		<view class="scroll-container" scroll-y>
			<view class="message-body">
				<!-- 背景图区域 -->
				<view class="petBackground" :style="{ backgroundImage: 'url(' + breedUrl + ')' }">
					<view class="pet-portra" @click="switchBackground(0)">
						<view class="pet-portra-text">更换背景</view>
					</view>
				</view>
				<!-- 头像和卡片区域 -->
				<view class="pet-card-wrapper">
					<view class="pet-portrait">
						<cach-image v-if="presentPet.length>0" :url="presentPet[0].smallAvatarUrl"
							:fileMd5="presentPet[0].smallAvatarUrl" width="150rpx" height="150rpx"
							radius="50%"></cach-image>
						<image v-else src="/static/new/default_avatar.png"
							style="width: 150rpx; height: 150rpx; border-radius: 50%;"></image>
					</view>
					<view class="pet-container">
						<view class="pet-switch" v-if="presentPet.length>0" @click="intoSwitch">
							<image class="pet-switch-png"
								:src="darkMode=='light'?'/static/new/icon-switch.svg':'/static/new/icon-switch_white.svg'">
							</image>
							<view class="pet-switch-text">
								切换宠物
							</view>
						</view>
						<view class="pet-switch" v-else @click="addpet">
							<text style="font-size: 28rpx;"
								:style="{color:darkMode=='light'?'rgba(128, 128, 128, 1)':'#b8b8b8'}">点击新建宠物</text>
						</view>
						<view class="pet-box">
							<view class="pet-basic" v-if="presentPet.length > 0">
								<view class="pet-name-container">
									<view class="pet-name">{{ presentPet[0].nickname }}</view>
								</view>
								<view class="pet-gender">
									<image
										:src="presentPet[0].gender?'/static/imgs/home/girl.svg':'/static/imgs/home/boy.svg'"
										style="width: 45rpx;height: 45rpx;" radius="50%"></image>
								</view>
							</view>
							<view class="pet-information" v-if="presentPet.length>0">
								<text class="pet-info-text">{{ petAge }}</text>
								<view class="pet-info-divider"></view>
								<text class="pet-info-text">{{ petWeight * 2 }}斤</text>
								<view class="pet-info-divider"></view>
								<text class="pet-info-text-breed">{{ petBreed }}</text>
							</view>
							<view class="equipment-setting">
								<view class="equipment-setting-text">设备设置</view>
								<view class="battery-box" v-if="devicelist && devicelist.serialCode">
									<image class="battery-power" :src="battaryImageSrc" mode=""></image>
									
									<view class="battery-text-box"><text v-if="batteryMode"
											class="battery-text">{{ presentBattary }}</text>
									<image v-if="isCharge" class="battery-power-charge" src="/static/xixin/charge.png" mode=""></image>
									</view>
								</view>
								<view class="equipment-setting-text2">
									<view>
										<text @click="todeviceSetting"
											v-if="devicelist && devicelist.serialCode&&pageStatues"
											style="font-size: 26rpx;"
											:style="{color:darkMode=='light'?'rgba(128, 128, 128, 1)':'#b8b8b8'}">设备编号：{{ devicelist.serialCode }}
										</text>
										<text @click="todevice"
											v-if="(!devicelist || !devicelist.serialCode)&&pageStatues"
											style="font-size: 26rpx;"
											:style="{color:darkMode=='light'?'rgba(128, 128, 128, 1)':'#b8b8b8'}">点击绑定设备
										</text>
									</view>
								</view>
								<view class="equipment-setting-png"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pet-sports">
				<view class="pet-sports-top">
					<view class="pet-sports-title">运动数据</view>
					<view class="pet-sports-png"></view>
					<view class="data" @click="openCalendar">
						<text class="data-text">{{to_date}}</text>
						<image
							:src="darkMode=='light'?'/static/imgs/home/cal-arrow.png':'/static/imgs/home/cal-arrow-white.png'"
							class="data-png"></image>
					</view>
				</view>
				<view class="pet-sports-body">
					<view v-if="!isShowAddDevice&&pageStatues" class="body-show">
						<qiun-data-charts style="height: 200rpx;" :style="{ width: screenWidth+'px' }" type="area"
							:opts="opts" :chartData="Column" />
					</view>
					<view v-if="isShowAddDevice&&pageStatues"
						style="width: 100%;height: 200rpx;display: flex;align-items: center;justify-content: center;">
						<text style="font-size: 50rpx;"
							:style="{color:darkMode=='light'?'rgba(166, 166, 166, 1)':'#b8b8b8'}">暂无数据</text>
					</view>
				</view>
				<view class="pet-sports-bottom">
					<view class="prt-steps">
						<image class="steps-png" src="/static/imgs/home/prt-steps.png"></image>
						<view class="steps-text">步数</view>
						<view class="steps-number">{{formatSportData(sportData[2])}}</view>
					</view>
					<view class="pet-cal">
						<image class="cal-png" src="/static/imgs/home/prt-cal.png"></image>
						<view class="cal-text">卡路里/卡</view>
						<view class="cal-number">{{formatSportData(sportData[0])}}</view>
					</view>
					<view class="pet-exercise">
						<image class="exercise-png" src="/static/imgs/home/pet-exercise.png"></image>
						<view class="exercise-text">运动时长</view>
						<view class="exercise-number">{{formatSportData(formattedExerciseTime)}}</view>
					</view>
				</view>
			</view>
			<view style="height: 15rpx;"></view>
		</view>
		<uni-calendar ref="calendar" :insert="false" :lunar="info.lunar" :range="info.range"
			:start-date="info.startDate" :end-date="info.endDate" :selected="info.selected" @confirm="confirm"
			@close="closeCalendar" />
	</view>
</template>

<script>
	import util from '/common/util';
	import logger from '/common/logger.js'
	import {
		getPetInfo
	} from '@/api/api/pet';
	import {
		getMotionList
	} from '@/api/api/location'
	import {
		deviceFirmwareGet,
		getDeviceInfo
	} from '@/api/api/device'
	// #ifdef APP-HARMONY
	import {
		openPermission
	} from '@/uni_modules/srh-openPermission';
	import {
		mkdirDir,
		directoryFileList,
		isExist,
		getStaticOh
	} from "@/utils/file.js"
	// #endif
	import {
		getOsTheme
	} from "@/uni_modules/jiannor-oh-tools"
	import {
		$uni
	} from "@/utils/main.js"

	import {
		saveToFilesDir,
		mergeWithCanvas,
		getStaticPath
	} from "@/uni_modules/jiannor-oh-tools"

	export default {
		async onShow() {
			this.darkMode = getOsTheme()
			uni.$off('darkMode', this.darkModeChange)
			uni.$on('darkMode', this.darkModeChange)
			this.pageStatues = 1
			this.batteryMode = getApp().globalData.batteryShowMode;
			if (getApp().globalData.presentPet && getApp().globalData.presentPet.length > 0) {
				this.petClickCallBack(getApp().globalData.presentPet[0].pid);
				this.devicelist = getApp().globalData.presentPet[0].deviceInfo;
			} else { //说明之前没有切换过
				if (getApp().globalData.allPets && getApp().globalData.allPets.length > 0)
					this.petClickCallBack(getApp().globalData.allPets[0].pid);
			}
			console.log('getApp().globalData.presentPet', getApp().globalData.presentPet)
			this.presentUser = getApp().globalData.uid;
			console.log('this.devicelist ', this.devicelist)
			if (getApp().globalData.allPets.length <= 0) {
				this.presentPet = new Array();
				this.devicelist = null;
				// this.otherPets = new Array();
			}

			//循环更新电量
			if (this.devicelist) {
				this.bataryRoll = true;
				this.isShowAddDevice = false;
			} else {
				this.bataryRoll = false;
				this.isShowAddDevice = true;
			}
			console.log('this.presentPet', this.presentPet);
			// TODO 模拟请求跟新日历数据

			this.info.date = this.to_date;
			this.info.startDate = this.getDate(new Date(), -30).fullDate;
			this.info.endDate = this.getDate(new Date(), 0).fullDate;
			//push message 赋值
			// this.dataPushMessage = getApp().globalData.recivePushData;
			//拉取推送消息
			getApp().getMessagePage()
			// getApp().newGetPushData()
			//检查推送消息提示栏
			// getApp().checkPushDataScan()
			//检查是否要显示引导页面
			this.isShowGuild = uni.getStorageSync("isGuild")
			console.log('orageSync("isGuild")', this.isShowGuild)
			if (this.isShowGuild === '' || this.isShowGuild === 0)
				this.isShowGuild = 1
			if (this.isShowGuild === 2)
				this.isShowGuild = 3
			if (this.isShowGuild === 6)
				this.isShowGuild = 7
			console.log('this.isShowGuild', this.isShowGuild)
			uni.setStorageSync("isGuild", this.isShowGuild)
		},
		onUnload() {
			this.bataryRoll = false;
			// uni.$off('switchPet')
			// uni.$off('update')
			uni.$off('darkMode', this.darkModeChange)
		},
		onHide() {
			this.pageStatues = 0
			uni.$off('presentBattary')
			// $uni.offKnockShare()
		},
		mounted() {
			// 获取屏幕宽度比率
			this.powerW = uni.getSystemInfoSync().windowWidth / 375;
			// console.log(this.powerW, '宽度比率');
			// 创建画布 初始化canvas上下文
			this.ctx = uni.createCanvasContext('myCanvas');
			this.ctxBell = uni.createCanvasContext('canvasBell');
			this.ctxLight = uni.createCanvasContext('canvasLight');
			this.ctxBellLight = uni.createCanvasContext('canvasBellLight');
			console.log('this.devicelist', this.devicelist)

		},
		computed: {
			battaryValueChange() {
				this.caculateBattary()
			},
			deviceClick() {
				return {
					zIndex: this.deviceIndex
				}
			},
			// 格式化运动时长为 00:00 格式（小时:分钟）
			formattedExerciseTime() {
				const totalMinutes = this.sportData[1] || 0;
				const hours = Math.floor(totalMinutes / 60);
				const minutes = Math.floor(totalMinutes % 60);
				return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
			}
		},
		onLoad(Options) {
			let info = uni.getDeviceInfo()
			this.platform = info.platform
			this.darkMode = getOsTheme()
			uni.$on('darkMode', this.darkModeChange)
			// #ifdef APP-HARMONY
			// openPermission('ohos.permission.ACCESS_BLUETOOTH');
			// openPermission('ohos.permission.DISCOVER_BLUETOOTH')
			// openPermission('ohos.permission.APPROXIMATELY_LOCATION')
			// openPermission('ohos.permission.LOCATION')

			$uni.requestSystemPermission({
				permissions: ['ohos.permission.ACCESS_BLUETOOTH', 'ohos.permission.DISCOVER_BLUETOOTH',
					'ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION',
					'ohos.permission.APP_TRACKING_CONSENT'
				],
				accept(allRight, grantedList) {
					console.log("requestSystemPermission allRight", allRight, "grantedList", grantedList)
				},
				refuse(doNotAskAgain, grantedList) {
					console.log("requestSystemPermission doNotAskAgain", doNotAskAgain, "grantedList",
						grantedList)
				},
				error(error) {
					console.log("requestSystemPermission", error)
				}
			})
			$uni.isNotificationEnabled({
				success(res) {
					console.log("isNotificationEnabled", res)
					if (res == false) {
						uni.showModal({
							title: "提示",
							content: "如果不开启通知，将无法接收到宠物消息，是否需要开启",
							success(res) {
								if (res.confirm) {
									$uni.openNotificationSettings({
										success() {

										},
										fail(err) {
											console.log("openNotificationSettings", err)
										}
									})
								}
							}
						})
					}
				},
				fail(err) {
					console.log("isNotificationEnabled", err)
				}
			})


			$uni.getAppPath().then((path) => {
				console.log("rrrrrrrrrrrrr", path)
			})


			// #endif

			if (this.platform === 'iOS') {
				this.batteryMarginTop = 'margin-top: 7rpx';
				this.battaryTop = 'top:35%'
			} else {
				this.battaryTop = 'top:40%'
			}
			this.screenWidth = uni.getSystemInfoSync().screenWidth - 50;
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.threeModelWidth = (uni.getSystemInfoSync().screenWidth).toString() + "px"
			// this.threeModelHeight=(this.screenHeight*0.4).toString()+"px"
			// if (getApp().globalData.allData.length > 0) {
			// 	var pets = new Array();
			// 	var devices = new Array();
			// 	getApp().globalData.allData.forEach((item, index) => {
			// 		if (item.pet_account)
			// 			pets.push(item.pet_account);
			// 		if (index === 0)
			// 			devices = item.did_list;
			// 	})
			// 	getApp().globalData.showDeviceList = devices;
			// 	getApp().globalData.allPets = pets;
			// } else {
			// 	getApp().globalData.showDeviceList = new Array();
			// 	getApp().globalData.allPets = new Array();
			// }
			// this.presentUser = getApp().globalData.uid;
			const currentDate = new Date();
			const date = new Date(currentDate);
			date.setDate(currentDate.getDate());
			const formattedDate = this.formatDate(date);
			// console.log('当天日期', formattedDate);
			this.currentDate = formattedDate;
			getApp().globalData.currentDate = formattedDate;
			//每次第一次进界面，把todata刷新为当天
			this.from_date = this.getDate(new Date(), -30).fullDate;
			this.to_date = this.getDate(new Date(), -0)
				.fullDate;
			this.info.date = this.to_date;
			//缓存点击日期
			var storage = JSON.stringify(this.to_date);
			uni.setStorageSync('storageToDate', storage);
			let that = this;
			// uni.$on('update', function(data) {
			// 	// console.log('监听到事件来自 update ，携带参数 msg 为：', data);
			// 	if (data.payload.identify === 4) {
			// 		let pid = data.payload.pid
			// 		util.getBellByPid(pid).then(result => {
			// 			if (result.data.code === 200) {
			// 				let pet = result.data.data
			// 				util.locateMotifyPet(pet)
			// 				that.petClickCallBack(getApp().globalData.presentPet[0].pid);
			// 			}
			// 		})

			// 	}
			// })
			uni.$on('switchPet', function(res) {
				console.log('切换宠物pid', res)
				that.petClickCallBack(res)
			})
			getApp().globalData.batteryShowMode = uni.getStorageSync('batteryShowMode');
			if (getApp().globalData.batteryShowMode === '')
				getApp().globalData.batteryShowMode = true;
			//#ifndef APP-HARMONY
			plus.navigator.closeSplashscreen()
			//#endif
		},
		data() {
			return {
				darkMode: 'light',
				headerOpacity: 0,
				headerHeight: 0,
				showNum: 0,
				platform: "",
				pageStatues: 0,
				permissionListener: '',
				powerW: 1,
				petIcon: '',
				petBellIcon: '',
				petLightIcon: '',
				petBLIcon: '',
				ctx: '',
				petAge: 0,
				petWeight: 0,
				petBreed: '',
				battaryImageSrc: '',
				deviceIndex: 1,
				battaryTop: '',
				updateBattary: true,
				battaryValueWidth: {
					width: '0rpx',
					backgroundColor: '#000000'
				},
				batteryMarginTop: 'margin-top: 5rpx',
				batteryColors: [{
						value: 10,
						color: 'red'
					},
					{
						value: 60,
						color: '#00ef00'
					},
					{
						value: 100,
						color: '#00ef00'
					}
				],
				waitting3D: false,
				modelLoadCountdown: 0,
				threeModelLoaded: false,
				threeModelHeight: '650rpx',
				threeModelWidth: '100%',
				threeAutoRotate: false,
				threeDecoderPath: 'https://cloud.vuedata.wang/draco/',
				threeModelScale: [1, 1, 1],
				threeEnvironmentSrc: '/static/model/white.hdr',
				threeModelRotate: [-Math.PI / 2, 0, -Math.PI / 2],
				threeModelPosition: [0, 0, -0.3],
				threeActionNumber: 0,
				model3d_url: '',
				isshare: '',
				batteryMode: true,
				modelShow: 0,
				dateLine: 60 * 90,
				screenWidth: 300,
				screenHeight: 300,
				info: {
					lunar: false,
					range: false,
					insert: false,
					selected: []
				},
				opts: {
					color: ["#FA5300", "#FA5300", "#FA5300", "#FA5300", "#FA5300",
						"#FA5300"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					xAxis: {
						disableGrid: true,
						labelCount: 4,
					},
					legend: {
						show: false
					},
					dataLabel: false,
					yAxis: {
						disabled: true,
						disableGrid: true,
						gridType: "dash",
						dashLength: 2,
						data: [{
							min: 0,
						}]
					},
					series: {
						legendShape: 'none',
						legendText: ''
					},
					extra: {
						tooltip: {
							bgColor: "#ffffff", // 背景颜色 - 白色 ✓
							legendShow: false, // 隐藏图例 ✓
							borderRadius: 10, // 圆角 ✓
							borderColor: "#FF6B35", // 边框颜色 - 注意是小写borderColor，不是BorderColor
							showArrow: false, // 隐藏箭头 ✓
							fontColor: "#000000", // 字体颜色 - 应该是fontColor，不是Color
							fontSize: 10, // 可选：字体大小
							fontWeight: "normal", // 可选：字体粗细
							borderWidth: 2,
							opacity: 1, // 确保完全不透明
							bgOpacity: 1, // 背景不透明度
							fillOpacity: 1, // 填充不透明度
						},
						area: {
							type: "curve",
							opacity: 0.5,
							addLine: true,
							width: 2,
							gradient: true,
							activeType: "hollow",
							point: {
								show: false,
								pointStyle: "circle",
								pointSize: 8,
								pointColor: "#FF6B35",
								pointBorderColor: "#FF6B35",
								pointBorderWidth: 2,
								pointFillColor: "transparent"
							}
						},
						column: {
							type: "group",
							// width: 20,
							activeBgColor: "#000000",
							activeBgOpacity: 0,
							linearType: "custom",
							seriesGap: 5,
							linearOpacity: 0.5,
							barBorderCircle: true,
							customColor: [
								"#FA7D8D",
								"#EB88E2"
							]
						},
						pie: {
							activeOpacity: 0.1,
							activeRadius: 0,
							offsetAngle: 0,
							labelWidth: 5,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF"
						}

					}
				},
				deviceOffline: false,
				breedUrl: '/static/imgs/home/top-default.png', //../..png
				showMask: false,
				tamp: '--slipHeight: 0px;',
				currentDate: '',
				Column: {
					categories: ["   00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", '07:00',
						'08:00',
						'09:00', '10:00',
						'11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
						'20:00',
						'21:00', '22:00', '23:00'
					],
					series: [{
						name: "步数",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						legendShape: 'none',
						legendText: '哈哈哈哈'
					}]
				},
				seriesData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				PieA: {
					"series": [{
						"data": [{
							"name": "卡路里cal",
							"value": 1
						}, {
							"name": "运动时间",
							"value": 0
						}, {
							"name": "运动步数",
							"value": 0
						}]
					}]
				},
				sportData: [0, 0, 0],
				chartDataList: ['卡路里cal',
					'运动时间min',
					'运动步数',
				],
				chartDataListSuffix: ['cal',
					'min',
					'',
				],
				chartsDataPie2: '',
				showChartData: '',
				from_date: '',
				to_date: '2023-12-12',
				allPets: '',
				petPopoverVisible: false,
				petHide: false,
				// otherPets: '',
				presentPet: new Array(),
				presentUser: '',
				devicelist: null,
				testDeviceList: [{
						category_id: 190,
						category_name: "safe_belt",
						did: 58,
						serial_code: "be1701000316",
						time: "2023-09-01 17:00:20",
						ba: 100,
					},
					{
						category_id: 190,
						category_name: "safe_belt",
						did: 59,
						serial_code: "be1701000317",
						time: "2023-09-01 17:00:20",
						ba: 30,
					}

				],
				person: [{
					id: '1',
					name: 'heyuzhe'
				}],
				deviceImageList: [
					'/static/xixin/bell.png',
					'/static/xixin/bell.png'
				],
				bataryRoll: false,
				presentBattary: 0,
				isCharge:false,
				storageBattary: 0,
				queryIsUpdate: false,
				isShowAddDevice: true,
				isdownloading: false,
				isShowGuild: 1,
			}
		},
		methods: {
			darkModeChange(theme) {
				console.log('onTheme', theme)
				this.darkMode = theme
			},
			formatSportData(value) {
				if (!value) return '';
				// 限制为10个字符，超过部分不显示
				return value.length > 10 ? value.substring(0, 10) : value;
			},
			skipGuild() {
				this.isShowGuild = 0
				uni.setStorageSync("isGuild", 0)
			},
			todeviceSetting() {
				uni.navigateTo({
					url: '/pages/setting/deviceSetting/deviceSetting?serialCode=' + this.devicelist.serialCode
				})
				// uni.navigateTo({
				// 	url:'/pages/home/testcanv/testcanv'
				// })
			},
			switchBackground(opt) {
				console.log('into switchBackground', opt)
				// 检查是否有宠物
				if (!this.presentPet || this.presentPet.length <= 0) {
					uni.showToast({
						title: '请先添加宠物',
						icon: 'none'
					})
					return
				}
				if (opt === 1 && this.presentPet[0].category === 1) {
					this.$refs.modal.show({
						title: '温馨提示',
						content: '功能升级中,敬请期待',
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: true,
					})
					// uni.navigateTo({
					// 	url: '/pages/home/switch3dUrl/switch3dUrl?para=' + this.breedUrl
					// })
				} else {
					console.log("this.breedUrl", this.breedUrl)
					uni.navigateTo({
						url: '/pages/home/switchBackground/switchBackground?para=' + this.breedUrl
					})
				}
			},
			intoSwitch() {
				uni.navigateTo({
					url: '/pages/home/switchPet/switchPet'
				})
			},
			caculateBattary() {
				if (this.presentBattary <= 10) {
					if (this.deviceOffline) {
						this.presentBattary = 0
					}
				}
				if (this.presentBattary > 90)
					this.battaryImageSrc = "/static/xixin/100.png"
				else if (this.presentBattary > 80)
					this.battaryImageSrc = "/static/xixin/90.png"
				else if (this.presentBattary > 70)
					this.battaryImageSrc = "/static/xixin/80.png"
				else if (this.presentBattary > 60)
					this.battaryImageSrc = "/static/xixin/70.png"
				else if (this.presentBattary > 50)
					this.battaryImageSrc = "/static/xixin/60.png"
				else if (this.presentBattary > 40)
					this.battaryImageSrc = "/static/xixin/50.png"
				else if (this.presentBattary > 30)
					this.battaryImageSrc = "/static/xixin/40.png"
				else if (this.presentBattary > 20)
					this.battaryImageSrc = "/static/xixin/30.png"
				else if (this.presentBattary > 10)
					this.battaryImageSrc = "/static/xixin/20.png"
				else if (this.presentBattary > 0)
					this.battaryImageSrc = "/static/xixin/10.png"
				else
					this.battaryImageSrc = "/static/xixin/0.png"
				try {
					getApp().globalData.battaryImageSrc = this.battaryImageSrc
					getApp().globalData.presentBattary = this.presentBattary
					if (getApp().globalData.lacatePageData.hasOwnProperty('battaryImageSrc'))
						getApp().globalData.lacatePageData.battaryImageSrc = this.battaryImageSrc
					if (getApp().globalData.lacatePageData.hasOwnProperty('presentBattary'))
						getApp().globalData.lacatePageData.presentBattary = this.presentBattary
				} catch (e) {
					console.log('err', e)
				}
				uni.$emit("presentBattary", true)
			},
			onLoaded(newVal) {

				console.log('模型加载完毕', )
				//为了提前获取位置权限，防止进入地图页面一次获取太多
				uni.getLocation({
					isHighAccuracy: true
				})
				// this.modelLoadCountdown=Math.floor(newVal)
				this.modelLoadCountdown += 25
				if (this.modelLoadCountdown >= 100) {
					this.threeModelLoaded = true;
					this.modelLoadCountdown = 0
					this.getChartData(false);
				}
			},
			setPushValue(data) {
				console.log('我在home拿到了推送！', data);
			},
			tocopy() {
				uni.navigateTo({
					url: '/pages/copy/copy'
				})
			},
			getDate(date, AddDayCount = 0) {
				if (!date) {
					date = new Date()
				}
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/')
				}
				const dd = new Date(date)
				dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
				const y = dd.getFullYear()
				const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() +
					1 // 获取当前月份的日期，不足10补0
				const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
				return {
					fullDate: y + '-' + m + '-' + d,
					year: y,
					month: m,
					date: d,
					day: dd.getDay()
				}
			},
			openCalendar() {
				console.log('openCalendar called, calendar ref:', this.$refs.calendar);
				if (this.$refs.calendar) {
					this.$refs.calendar.open();
				} else {
					console.error('calendar ref is undefined');
				}
			},
			closeCalendar() {
				console.log('弹窗关闭');
			},
			updataPetBreedUrl() {
				console.log('into,updataPetBreedUrl', this.presentPet)
				// if (this.presentPet.length != '' && this.presentPet != null && this.presentPet[0]) {
				if (this.presentPet.length > 0) {
					var categoryId = this.presentPet[0].category;
					var breedId = this.presentPet[0].breedId;
					// this.breedUrl = ''; //清空breedurl；
					this.waitting3D = false
					if (this.presentPet[0].backgroudImg != null) {
						if (this.presentPet[0].backgroudImg.substring(0, 6) === 'static')
							this.breedUrl = getApp().globalData.internetDownload + '/' + this.presentPet[0]
							.backgroudImg
						else
							this.breedUrl = this.presentPet[0].backgroudImg
					} else
						this.breedUrl = '/static/imgs/home/top-default.png'
					// if (categoryId === 0) {
					// 	if (this.presentPet[0].backgroud_img != null) {
					// 		if (this.presentPet[0].backgroud_img.substring(0, 6) === 'static')
					// 			this.breedUrl = getApp().globalData.internet + '/' + this.presentPet[0].backgroud_img
					// 		else
					// 			this.breedUrl = this.presentPet[0].backgroud_img
					// 	} else
					// 		this.breedUrl = '/static/imgs/home/top-default.png'
					// } else if (categoryId === 1) {
					// 	//如果有三维图片
					// 	console.log("this.modelShow", this.modelShow)
					// 	if (this.modelShow && this.presentPet[0].model3d_img != null) {
					// 		if (this.presentPet[0].model3d_url != null)
					// 			this.waitting3D = false
					// 		else
					// 			this.waitting3D = true

					// 		if (this.presentPet[0].model3d_img.substring(0, 6) === 'static')
					// 			this.breedUrl = getApp().globalData.internet + '/' + this.presentPet[0].model3d_img;
					// 		else
					// 			this.breedUrl = this.presentPet[0].model3d_img;
					// 	} else {
					// 		if (this.presentPet[0].backgroud_img != null) {
					// 			if (this.presentPet[0].backgroud_img.substring(0, 6) === 'static')
					// 				this.breedUrl = getApp().globalData.internet + '/' + this.presentPet[0].backgroud_img
					// 			else
					// 				this.breedUrl = this.presentPet[0].backgroud_img
					// 		} else
					// 			this.breedUrl = '/static/imgs/home/top-default.png'
					// 	}
					// }
					console.log("this.breedUrl", this.breedUrl)
				}
			},
			getTimeDifferenceInSeconds(timestampStr) {
				// 将时间戳字符串转换为Date对象
				const timestamp = new Date(timestampStr);
				// 获取当前时间
				const currentTime = new Date();
				// 计算时间差值（单位：毫秒）
				const timeDifference = currentTime - timestamp;
				// 将时间差值转换为秒
				const seconds = Math.floor(timeDifference / 1000);
				return seconds;
			},
			updataBatary(serialCode) {
				clearInterval(this.intervalId);
				console.log('loginAuthorization', getApp().globalData.loginAuthorization)
				// this.presentBattary = 0
				this.intervalId = null;
				let that = this
				try {
					getDeviceInfo(serialCode).then((rebackData1) => {
						console.log('查询电量成功le', rebackData1);
						if (rebackData1.data.motionInfo.hasOwnProperty('battery'))
							that.presentBattary = rebackData1.data.motionInfo.battery
						else
							that.presentBattary = 0

						uni.setStorage({
							key: 'lastPushdDataTime' + this.devicelist.serialCode.toString(),
							data: this.presentBattary,
							success: function() {}
						});
						var timeSplice = this.getTimeDifferenceInSeconds(rebackData1.data.deviceInfo
							.latestCommunicationTime);
						if (timeSplice > this.dateLine)
							this.deviceOffline = true;
						else
							this.deviceOffline = false;
						that.caculateBattary()
						var item = rebackData1;
						
						getApp().globalData.myHardwareVersion = item.data.deviceInfo.hardwareVersion
						this.isCharge=item.data.deviceInfo.isCharing
						console.log('item.data.hardware_version', getApp().globalData.myHardwareVersion)
						deviceFirmwareGet(serialCode).then((rebackData) => {
							console.log('新接口获取固件信息', rebackData)
							getApp().globalData.myFirewareVersion = item.data.deviceInfo
								.firmwareVersion;
							if (rebackData.data != null) {
								console.log('获取最新固件版本', rebackData.data.firmwareVersion);
								console.log('当前设备固件版本', item.data.deviceInfo.firmwareVersion);
								getApp().globalData.newFirewareVersion = rebackData.data
									.firmwareVersion;
								getApp().globalData.downloadFirewareUrl = rebackData.data
									.firmwareUrl;
								console.log('获取到下载固件地址', getApp().globalData.downloadFirewareUrl);
								if (rebackData.data.firmwareVersion > item.data.deviceInfo
									.firmwareVersion &&
									getApp().globalData.queryIsUpdate === false && item.data
									.firmware_version != null &&
									item.data.deviceInfo.firmwareVersion > 34) {
									// getApp().globalData.queryIsUpdate=true;
									// this.queryIsUpdate = getApp().globalData.queryIsUpdate;
									this.queryIsUpdate = true;
									getApp().globalData.redCircleShow = true;
								} else {
									this.queryIsUpdate = false;
									getApp().globalData.redCircleShow = false;
								}
							}
						})
					}, (err) => {
						console.log('查询电量出错', err)
						uni.getStorage({
							key: 'lastPushdDataTime' + this.devicelist.serialCode.toString(),
							success: function(res) {
								let storageDate = JSON.parse(res.data)
								that.presentBattary = storageDate
								that.caculateBattary()
								console.log('缓存的电量', storageDate)
							},
						})

					})
				} catch (e) {
					console.log("查询数据出错", e)
				}
				this.intervalId = setInterval(() => {
					if (this.bataryRoll) {
						//查询一下步数
						console.log('this.bataryRoll');
						this.getChartData(false)
						// 在这里查询设备状态
						getDeviceInfo(serialCode).then((rebackData) => {
							console.log('查询设备状态结果', rebackData);
							if (rebackData.statusCode === 200) {
								console.log('查询电量成功', rebackData);
								if (rebackData.data.motionInfo.hasOwnProperty('battery'))
									that.presentBattary = rebackData.data.motionInfo.battery
								else
									that.presentBattary = 0
								this.caculateBattary()
							}
						})
					} else {
						clearInterval(this.intervalId);
						console.log("循环结束");
					}
				}, 240000);


			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			change3dmodelStatus(speed) {
				// if (this.modelShow === 1) {
				// 	if (speed === 0) {
				// 		let num = Math.floor(Math.random() * 4);
				// 		console.log('随机状态', num)
				// 		this.$refs.modelRef.set3dmodelStatus('idel', 5.5)
				// 	} else {
				// 		this.$refs.modelRef.set3dmodelStatus('walk', 5.5)
				// 	}
				// }
			},
			showNewChart(motionData, show) {
				this.sportData = [0, 0, 0];
				this.Column.series[0].data = this.seriesData;
				this.info.selected = new Array();

				let findClickDate = false;
				let todayHaveData = false;

				// 处理新的运动数据结构
				for (let j = 0; j < motionData.length; j++) {
					const dayData = motionData[j];
					const motionDate = dayData.motionDate;

					let kca_min_step = [0, 0, 0]; // [卡路里，运动时间，累计步数]
					let steps = new Array(24).fill(0); // 24小时步数数组

					// 处理每小时的详细数据
					if (dayData.motionList && dayData.motionList.length > 0) {
						dayData.motionList.forEach(hourData => {
							const hour = hourData.hour;

							// 累加总数据
							kca_min_step[0] += Number(hourData.hourCalories * 1000); // 卡路里（转换为千卡）
							kca_min_step[1] += Number(hourData.hourSportSeconds / 60); // 运动时间（分钟）
							kca_min_step[2] += hourData.hourSteps; // 步数

							// 设置每小时步数
							if (hour >= 0 && hour < 24) {
								steps[hour] = hourData.hourSteps;
							}
						});
					}

					// 处理小数和取整
					kca_min_step[0] = Math.ceil(kca_min_step[0]); // 卡路里
					kca_min_step[1] = Math.ceil(kca_min_step[1]); // 运动时间（分钟）

					// 检查是否是今天的数据（用于3D模型状态）
					let today = this.getDate(new Date(), 0).fullDate;
					if (motionDate === today && this.threeModelLoaded) {
						todayHaveData = true;
						const now = new Date();
						const milliseconds = now.getTime();
						const totalSeconds = Math.floor(milliseconds / 1000);

						let stepData = {
							time: totalSeconds,
							steps: kca_min_step[2] // 使用当天的总步数
						}

						console.log('刚得到步数', stepData);

						// 获取缓存
						uni.getStorage({
							key: this.devicelist.serialCode + "步数缓存",
							success: (res) => {
								console.log('缓存的步数', res);
								let laststep = res.data;
								if (laststep) {
									let timediff = stepData.time - laststep.time;
									let stepdiff = stepData.steps - laststep.steps;
									let speed = stepdiff / timediff;
									console.log('步数缓存差', stepdiff, '上次步数时间差', timediff, '速度', speed);
								}
							},
							fail: (err) => {
								console.log('获取缓存步数失败', err);
							},
							complete: () => {
								uni.setStorage({
									data: stepData,
									key: this.devicelist.serialCode + "步数缓存"
								});
							}
						});
					}

					// 检查是否是选中的日期
					if (motionDate === this.to_date) {
						findClickDate = true;
						console.log('遍历到点击当天', this.to_date);
						console.log('当天总步数', kca_min_step[2]);

						try {
							if (kca_min_step[2] === 0) {
								this.sportData = [0, 0, 0];
								this.Column.series[0].data = this.seriesData;
								if (show) {
									uni.showToast({
										title: '这天没运动',
										icon: 'none'
									});
								}
							} else {
								this.sportData = kca_min_step;
								this.Column.series[0].data = steps;
								console.log('当天步数分布:', steps);
								// 渲染圆形图和柱状图数据
							}
						} catch (e) {
							console.log('遍历数据出问题', e);
						}
					}

					// 记录有运动数据的日期
					if (kca_min_step[2] !== 0) {
						let dateitem = {
							date: motionDate,
							// info: '已打卡',
							steps: kca_min_step[2], // 总步数
							calories: kca_min_step[0], // 总卡路里
							sportMinutes: kca_min_step[1] // 总运动时间
						}
						this.info.selected.push(dateitem);
					}
				}

				// 如果没找到选中日期的数据
				if (!findClickDate) {
					this.sportData = [0, 0, 0];
					this.Column.series[0].data = this.seriesData;
					if (show) {
						uni.showToast({
							title: '这天没运动',
							icon: 'none'
						});
					}
				}

				// 如果今天没数据
				if (!todayHaveData) {
					console.log('今天没运动数据');
					this.change3dmodelStatus(0);
				}

				// 更新图表（如果需要）
				this.updateCharts();
			},
			showChart(showData, show) {
				this.sportData = [0, 0, 0];
				this.Column.series[0].data = this.seriesData;
				// [卡路里，运动时间，累计步数，每小时步数]，
				var chart1 = {
					series: [],
				}
				this.info.selected = new Array()
				let findClickDate = false;
				let todayHaveData = false;
				for (var j = 0; j < showData.length; j++) {
					var kca_min_step = new Array();
					kca_min_step[0] = 0;
					kca_min_step[1] = 0;
					kca_min_step[2] = 0;
					var min = 0;
					var step = 0;
					var steps = new Array();
					for (var i = 0; i < 24; i++) {
						var data_item = showData[j][i.toString()];
						steps[i] = 0;
						if (data_item) {
							// console.log('拿到数据', data_item);
							var cal = data_item[0] * 1000;
							kca_min_step[0] += Number(cal);
							kca_min_step[1] += Number(data_item[1] / 60);
							kca_min_step[2] += data_item[3];
							steps[i] = data_item[3]
						}
					}
					kca_min_step[0] = Math.ceil(kca_min_step[0])
					kca_min_step[1] = Math.ceil(kca_min_step[1])
					// console.log("showData[j]['date']'", showData[j]['date']);
					let today = this.getDate(new Date(), -0).fullDate;
					//两分钟的数据查询，保存时间戳和步数
					let that = this
					if (showData[j]['date'] === today && this.threeModelLoaded) {
						todayHaveData = true
						const now = new Date();
						const milliseconds = now.getTime();
						const totalSeconds = Math.floor(milliseconds / 1000);
						let stepData = {
							time: totalSeconds,
							steps: kca_min_step[2]
						}
						console.log('刚得到步数', stepData)
						//获取缓存
						uni.getStorage({
							key: this.devicelist.serialCode + "步数缓存",
							success: function(res) {
								console.log('缓存的步数', res)
								let laststep = res.data
								if (laststep) {
									let timediff = stepData.time - laststep.time
									let stepdiff = stepData.steps - laststep.steps
									let speed = stepdiff / timediff
									that.change3dmodelStatus(speed)
									console.log('步数缓存差', stepdiff, '上次步数时间差', timediff, '速度', speed)
								}
							},
							fail: function(err) {
								console.log('获取缓存步数失败', err);
								that.change3dmodelStatus(0)
							},
							complete() {
								uni.setStorage({
									data: stepData,
									key: that.devicelist.serialCode + "步数缓存"
								})
							}
						});
					}
					if (showData[j]['date'] === this.to_date) {
						findClickDate = true;
						console.log('遍历到点击当天', this.to_date);
						console.log('kca_min_step[2]', kca_min_step[2])
						try {
							if (kca_min_step[2] === 0) {
								// var piedata = {
								// 	data: this.PieAData
								// };
								// chart1.series[0] = piedata;
								// this.PieA = chart1;
								this.sportData = [0, 0, 0];
								this.Column.series[0].data = this.seriesData;
								if (show)
									uni.showToast({
										title: '这天没出门'
									})
							} else {

								this.sportData = kca_min_step;
								this.Column.series[0].data = steps;
								// console.log('steps', steps);
								//渲染圆形图和柱状图数据e
							}

						} catch (e) {
							console.log('遍历数据出问题', e)
						}

					}
					if (kca_min_step[2] !== 0) {
						// console.log('这天有数据', showData[j]['date'])
						var dateitem = {
							date: showData[j]['date'],
							// info: '已打卡'
						}
						this.info.selected.push(dateitem);
					}
				}
				if (!findClickDate) {
					this.sportData = [0, 0, 0];
					this.Column.series[0].data = this.seriesData;
					if (show)
						uni.showToast({
							title: '这天没出门'
						})
				}
				if (!todayHaveData) {
					console.log('今天没数据')
					this.change3dmodelStatus(0)
				}
			},
			confirm(e) {
				//查询现在和以往三十天的运动数据
				this.from_date = this.getDate(new Date(), -30).fullDate;
				this.to_date = e.fulldate;
				this.info.date = this.to_date;
				//缓存点击日期
				var storage = JSON.stringify(this.to_date);
				uni.setStorage({
					key: 'storageToDate',
					data: storage,
					success: function() {
						// console.log('storageToDate数据缓存成功', storage);
					}
				});
				this.getChartData(true);
			},
			// datechange(e) {
			// 	this.from_date = e;
			// 	this.to_date = e;
			// 	console.log('this.from_date', this.from_date);
			// 	this.getChartData();
			// },
			getChartData(show) {
				if (!this.devicelist)
					return
				var storageKey = this.devicelist.serialCode + this.from_date.toString() + 'sport';
				var traDataUrl = getApp().globalData.internet + getApp().globalData.motionData;
				var todate = this.getDate(new Date(), 0).fullDate;
				let data = {
					serialCode: this.devicelist.serialCode,
					beginDate: this.from_date,
					endDate: todate
				}
				getMotionList(data).then((recivedata) => {
					console.log('获取到运动数据', recivedata)
					var data = recivedata.data
					this.showNewChart(data, show)
				})
				// let showdata = {
				// 	serial_code: this.devicelist.serial_code,
				// 	from_date: this.from_date,
				// 	to_date: todate,
				// 	pid: this.presentPet[0].pid,
				// 	did: this.devicelist.did
				// }

				// util.requestDataFrom(traDataUrl,showdata).then((res) => {
				// 		if (res.data.code === 200) {
				// 			console.log('获取运动成功', res);
				// 			var data = res.data.data;
				// 			//拿到数据后给marker赋值
				// 			this.showChart(data, show);
				// 			uni.setStorageSync(storageKey, data)
				// 		} else {
				// 			this.$refs.modal.show({
				// 				title: '温馨提示',
				// 				content: res.data.msg,
				// 				showCancel: true,
				// 				confirmText: '确认',
				// 				cancelText: '取消',
				// 				showFooter: false,
				// 				duration: 2000,
				// 			})
				// 			console.error('获取运动失败', res);
				// 		}
				// }).catch((err)=>{
				// 	this.$refs.modal.show({
				// 		title: '温馨提示',
				// 		content: res.errMsg,
				// 		showCancel: true,
				// 		confirmText: '确认',
				// 		cancelText: '取消',
				// 		showFooter: false,
				// 		duration: 2000,
				// 	})
				// 	console.error('获取日历数据err',err)
				// })
			},
			removeStorage() {
				uni.removeStorageSync('userPpets');
				// this.$refs.ss2.setColor('red') //设置整个颜色
				// this.$refs.ss2.setPower(10) //设置 100%电量
			},
			toMessage() {
				uni.navigateTo({
					url: '/pages/home/Message/Message'
				})
			},
			sendPetIcon() {
				let data = {
					pid: this.presentPet[0].pid,
					petIcon: this.petIcon
				}
				console.log('into home send peticon', data)
				uni.$emit("petIcon", data)
				if (getApp().globalData.lacatePageData) {
					//#ifdef APP-HARMONY
					getApp().globalData.lacatePageData.petIcon = getStaticOh(this.petIcon)
					//#endif
					//#ifndef APP-HARMONY
					getApp().globalData.lacatePageData.petIcon = this.petIcon
					//#endif
					console.log('getApp().globalData.lacatePageData', getApp().globalData.lacatePageData)
				}

				// uni.setStorage({
				// 	key: 'petIcon' + this.presentPet[0].avatar_url,
				// 	data: this.petIcon.toString(),
				// });
				console.log("saveFile SUCCESS获取到的缓存合并图片路径", this.petIcon.toString())
			},
			sendPetStatusIcon(type) {
				let data = {
					pid: this.presentPet[0].pid
				}

				console.log(`into home send pet${type}icon`)
				uni.$emit(`pet${type}Icon`, data)
				if (getApp().globalData.lacatePageData) {
					if (type == 'bell') {
						//#ifdef APP-HARMONY
						getApp().globalData.lacatePageData.petBellIcon = getStaticOh(this.petBellIcon)
						//#endif
						//#ifndef APP-HARMONY
						getApp().globalData.lacatePageData.petBellIcon = this.petBellIcon
						//#endif
					} else if (type == 'light') {
						//#ifdef APP-HARMONY
						getApp().globalData.lacatePageData.petLightIcon = getStaticOh(this.petLightIcon)
						//#endif
						//#ifndef APP-HARMONY
						getApp().globalData.lacatePageData.petLightIcon = this.petLightIcon
						//#endif
					} else if (type == 'belllight') {
						//#ifdef APP-HARMONY
						getApp().globalData.lacatePageData.petBLIcon = getStaticOh(this.petBLIcon)
						//#endif
						//#ifndef APP-HARMONY
						getApp().globalData.lacatePageData.petBLIcon = this.petBLIcon
						//#endif
					}
				}
				let img = ''
				if (type == 'bell') {
					img = this.petBellIcon
				} else if (type == 'light') {
					img = this.petLightIcon
				} else if (type == 'belllight') {
					img = this.petBLIcon
				}
				uni.setStorage({
					key: `pet${type}Icon` + this.presentPet[0].avatar_url,
					data: img,
				});
				console.log("saveFile SUCCESS获取到的缓存合并图片路径", data)
			},
			async getAvatarInfo() {
				return new Promise((resolve, reject) => {
					let that = this;
					let avatar_url = that.presentPet[0].avatarUrl
					console.log('avatar_url', avatar_url)
					if (avatar_url != null) {
						if (avatar_url.substring(0, 6) === "static")
							avatar_url = getApp().globalData.internetDownload + '/' + avatar_url
					} else {
						avatar_url = "/static/new/default_avatar.png"
					}
					uni.getImageInfo({
						src: avatar_url,
						success: (res) => {
							resolve(res.path)
						},
						fail: (err) => {
							console.log('头像加载失败', err);
							resolve(null)
						}
					});
				})
			},
			recoverCacheImage(cacheKey) {
				const cachedFilePath = uni.getStorageSync(cacheKey); // 获取缓存的文件路径
				// 如果缓存中存在旧文件路径，删除旧文件
				if (cachedFilePath) {
					uni.removeSavedFile({
						filePath: cachedFilePath,
						success: () => {
							console.log('成功删除缓存中的旧文件：', cachedFilePath);
						},
						fail: (err) => {
							console.log('删除缓存中的文件失败：', err);
						}
					})
				}
			},
			canvasToFile(that, avatarPath) {

				// 1. 缓存优先逻辑（优化版）
				const key = that.presentPet[0].pid + 'peticon'; // 只定义一次key，避免冗余
				const iconUrl = uni.getStorageSync(key);

				// 严格校验缓存有效性：非空、非undefined、非空字符串
				if (iconUrl && typeof iconUrl === 'string' && iconUrl.trim() !== '') {
					that.petIcon = iconUrl;
					console.log('取了缓存头像，路径：', iconUrl);
					that.sendPetIcon();
					return; // 有缓存直接返回，不执行后续绘制
				}
				try {
					const powerW = that.powerW;
					const bgWidth = 90 * powerW;
					const bgHeight = 100 * powerW;
					const canvasWidth = 98 * powerW;
					const canvasHeight = 110 * powerW;
					let images = [{
						url: getStaticPath('/static/new/petIconBackGround.png'),
						x: 0,
						y: 0,
						width: bgWidth,
						height: bgHeight
					}];
					if (avatarPath) {
						const avatarSize = 78 * powerW - 3;
						const radius = avatarSize / 2;
						const centerX = 45 * powerW;
						const centerY = 44 * powerW;
						const avatarLeft = centerX - radius;
						const avatarTop = centerY - radius - 2;
						images.push({
							url: avatarPath,
							x: avatarLeft,
							y: avatarTop,
							width: avatarSize,
							height: avatarSize,
							shape: 'circle'
						});
					}
					mergeWithCanvas({
						width: canvasWidth,
						height: canvasHeight,
						images: images,
						success: (res) => {
							console.log('鸿蒙端合成成功：', res.tempFilePath);

							// #ifndef APP-HARMONY
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res2) => {
									console.log('图片保存成功，路径：', res2.savedFilePath);
									that.petIcon = res2.savedFilePath;
									that.sendPetIcon();
									// 缓存新路径
									uni.setStorageSync(key, res2.savedFilePath);
								},
								fail: (res2) => {
									console.error('保存图片失败：', res2);
								}
							});
							// #endif
							//#ifdef APP-HARMONY
							saveToFilesDir({
								tempFilePath: res.tempFilePath,
								fileName: `${that.devicelist.serialCode}.png`,
								success(savedFilePath) {
									console.log('canvasToFile success', savedFilePath)
									that.petIcon = savedFilePath;
									that.sendPetIcon();
									uni.setStorageSync(key, savedFilePath);
								},
								fail(err) {
									console.log('canvasToFile fail', err)
								}
							})
							//#endif
						},
						fail: (err) => {
							console.error('鸿蒙端合成失败', err);
						}
					});
				} catch (err) {
					console.log('mergeWithCanvas', err)
				}
				return;

				// // 2. 安全擦除canvas
				// that.ctx.clearRect(0, 0, 98 * that.powerW, 110 * that.powerW);
				// const petBackground = '/static/new/petIconBackGround.png';
				// that.ctx.drawImage(petBackground, 0, 0, 88 * that.powerW, 100 * that.powerW);

				// // 3. 绘制圆形头像（如有头像路径）
				// if (avatarPath) {
				// 	const avatarSize = 78 * that.powerW - 3;
				// 	const radius = avatarSize / 2;
				// 	const centerX = 44 * that.powerW;
				// 	const centerY = 44 * that.powerW;
				// 	const avatarLeft = centerX - radius;
				// 	const avatarTop = centerY - radius - 2;

				// 	// 圆形裁剪逻辑
				// 	that.ctx.save();
				// 	that.ctx.beginPath();
				// 	that.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
				// 	that.ctx.clip();
				// 	that.ctx.drawImage(avatarPath, avatarLeft, avatarTop, avatarSize, avatarSize);
				// 	that.ctx.restore();
				// }

				// // 4. 导出图片（核心修复：用draw回调替代固定延时）
				// try {
				// 	// 关键：draw的第二个参数是绘制完成的回调，确保绘制完成后再导出
				// 	that.ctx.draw(true, () => {
				// 		console.log('canvas绘制完成，开始导出临时文件');

				// 		uni.canvasToTempFilePath({
				// 			canvasId: 'myCanvas',
				// 			success: (res) => {
				// 				// 先校验临时文件路径是否有效
				// 				if (!res || !res.tempFilePath) {
				// 					console.error('临时文件路径为空', res);
				// 					return;
				// 				}
				// 				console.log('临时文件导出成功：', getStaticPath(res.tempFilePath));

				// 				// #ifndef APP-HARMONY
				// 				uni.saveFile({
				// 					tempFilePath: res.tempFilePath,
				// 					success: (res2) => {
				// 						console.log('图片保存成功，路径：', res2.savedFilePath);
				// 						that.petIcon = res2.savedFilePath;
				// 						that.sendPetIcon();
				// 						// 缓存新路径
				// 						uni.setStorageSync(key, res2.savedFilePath);
				// 						uni.setStorageSync(sourceKey,
				// 							avatarPath); // 更新源头像记录
				// 					},
				// 					fail: (res2) => {
				// 						console.error('保存图片失败：', res2);
				// 					}
				// 				});
				// 				// #endif

				// 				// #ifdef APP-HARMONY
				// 				saveToFilesDir({
				// 					tempFilePath: res.tempFilePath,
				// 					fileName: `${that.devicelist.serialCode}.png`,
				// 					success: (savedFilePath) => {
				// 						console.log('鸿蒙端保存成功：', savedFilePath);
				// 						that.petIcon = savedFilePath;
				// 						that.sendPetIcon();
				// 						uni.setStorageSync(key, savedFilePath);
				// 						uni.setStorageSync(sourceKey,
				// 							avatarPath); // 更新源头像记录
				// 					},
				// 					fail: (err) => {
				// 						console.error('鸿蒙端保存失败：', err);
				// 					}
				// 				});
				// 				// #endif
				// 			},
				// 			fail: (err) => {
				// 				console.error('导出临时文件失败：', err);
				// 			}
				// 		}, that);
				// 	});
				// } catch (err) {
				// 	console.error('canvas绘制/导出异常：', err);
				// }
			},
			canvasToFileWithStatus(that, bgImageName, type, avatarPath) {
				// 1. 第一步：参数校验 + 缓存优先逻辑
				// 定义缓存key（区分不同类型）
				const key = that.presentPet[0].pid + type;

				// 读取缓存并严格校验有效性
				const cachedIconUrl = uni.getStorageSync(key);
				if (cachedIconUrl && typeof cachedIconUrl === 'string' && cachedIconUrl.trim() !== '') {
					// 根据type赋值对应变量
					if (type === 'bell') {
						that.petBellIcon = cachedIconUrl;
					} else if (type === 'light') {
						that.petLightIcon = cachedIconUrl;
					} else if (type === 'belllight') {
						that.petBLIcon = cachedIconUrl;
					}
					console.log(`取了${type}类型的缓存头像(头像未变)：`, cachedIconUrl);
					that.sendPetStatusIcon(type);
					return; // 有缓存直接返回，不执行绘制
				}


				const powerW = that.powerW;
				const bgWidth = 90 * powerW;
				const bgHeight = 126 * powerW;
				const canvasWidth = 98 * powerW;
				const canvasHeight = 136 * powerW;

				let images = [{
					url: getStaticPath('/static/new/' + bgImageName),
					x: 0,
					y: 0,
					width: bgWidth,
					height: bgHeight
				}];

				if (avatarPath) {
					const avatarSize = 78 * that.powerW - 3;
					const radius = avatarSize / 2;
					const centerX = 46 * that.powerW;
					const centerY = 75 * that.powerW;
					const avatarLeft = centerX - radius - 2;
					const avatarTop = centerY - radius - 4;

					images.push({
						url: avatarPath,
						x: avatarLeft,
						y: avatarTop,
						width: avatarSize,
						height: avatarSize,
						shape: 'circle'
					});
				}

				mergeWithCanvas({
					width: canvasWidth,
					height: canvasHeight,
					images: images,
					success: (res) => {
						console.log(`${type}类型鸿蒙端合成成功：`, res.tempFilePath);
						//#ifndef APP-HARMONY
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: (res2) => {
								console.log(`${type}类型图片保存成功：`, res2
									.savedFilePath);
								// 根据type赋值对应变量
								if (type === 'bell') {
									that.petBellIcon = res2.savedFilePath;
								} else if (type === 'light') {
									that.petLightIcon = res2.savedFilePath;
								} else if (type === 'belllight') {
									that.petBLIcon = res2.savedFilePath;
								}
								that.sendPetStatusIcon(type);
								uni.setStorageSync(key, res2.savedFilePath);
							},
							fail: (res2) => {
								console.error(`${type}类型保存图片失败：`, res2);
							}
						});
						// #endif
						//#ifdef APP-HARMONY
						saveToFilesDir({
							tempFilePath: res.tempFilePath,
							fileName: `${that.devicelist.serialCode}-${type}.png`,
							success: (savedFilePath) => {
								console.log('canvasToFileWithStatus success', savedFilePath);
								if (type === 'bell') {
									that.petBellIcon = savedFilePath;
								} else if (type === 'light') {
									that.petLightIcon = savedFilePath;
								} else if (type === 'belllight') {
									that.petBLIcon = savedFilePath;
								}
								that.sendPetStatusIcon(type);
								uni.setStorageSync(key, savedFilePath);
							},
							fail: (err) => {
								console.error('canvasToFileWithStatus fail', err);
							}
						});
						//#endif
					},
					fail: (err) => {
						console.error(`${type}类型鸿蒙端合成失败：`, err);
					}
				});
				return;


				// // 2. 第二步：初始化canvas上下文和ID
				// let ctx;
				// let canvasId;
				// if (type === 'bell') {
				// 	ctx = that.ctxBell;
				// 	canvasId = 'canvasBell';
				// } else if (type === 'light') {
				// 	ctx = that.ctxLight;
				// 	canvasId = 'canvasLight';
				// } else if (type === 'belllight') {
				// 	ctx = that.ctxBellLight;
				// 	canvasId = 'canvasBellLight';
				// } else {
				// 	console.error('Unknown type for canvasToFileWithStatus:', type);
				// 	return;
				// }

				// // 校验canvas上下文是否存在（防止undefined）
				// if (!ctx) {
				// 	console.error(`canvas上下文不存在，type: ${type}`);
				// 	return;
				// }

				// console.log(`无${type}类型缓存，开始绘制头像`);



				// // 4. 第四步：导出图片（核心修复：用draw回调替代固定延时）
				// try {
				// 	// 3. 第三步：canvas绘制逻辑
				// 	// 安全擦除canvas（适配背景图尺寸）
				// 	ctx.clearRect(0, 0, 95 * that.powerW, 133 * that.powerW);
				// 	const petBackground = '/static/new/' + bgImageName;
				// 	// 绘制背景图
				// 	ctx.drawImage(petBackground, 0, 0, 95 * that.powerW, 133 * that.powerW);

				// 	if (avatarPath) {
				// 		const avatarSize = 76 * that.powerW;
				// 		const radius = avatarSize / 2;
				// 		// 圆心坐标
				// 		const centerX = 47.5 * that.powerW;
				// 		const centerY = 77.3 * that.powerW;
				// 		// 头像左上角坐标
				// 		const avatarLeft = centerX - radius - 2;
				// 		const avatarTop = centerY - radius - 4;

				// 		// 绘制圆形裁剪区域
				// 		ctx.save();
				// 		ctx.beginPath();
				// 		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
				// 		ctx.clip();
				// 		// 绘制头像
				// 		ctx.drawImage(avatarPath, avatarLeft, avatarTop, avatarSize, avatarSize);
				// 		ctx.restore();
				// 	}
				// 	// 绘制完成后执行回调，确保canvas绘制完毕
				// 	ctx.draw(true, () => {
				// 		console.log(`${type}类型canvas绘制完成，开始导出临时文件`);

				// 		uni.canvasToTempFilePath({
				// 			canvasId: canvasId,
				// 			success: (res) => {
				// 				// 校验临时文件路径有效性
				// 				if (!res || !res.tempFilePath) {
				// 					console.error(`${type}类型临时文件路径为空`, res);
				// 					return;
				// 				}
				// 				console.log(`${type}类型临时文件导出成功：`, res.tempFilePath);

				// 				// #ifndef APP-HARMONY
				// 				uni.saveFile({
				// 					tempFilePath: res.tempFilePath,
				// 					success: (res2) => {
				// 						console.log(`${type}类型图片保存成功：`, res2
				// 						.savedFilePath);
				// 						// 根据type赋值对应变量
				// 						if (type === 'bell') {
				// 							that.petBellIcon = res2.savedFilePath;
				// 						} else if (type === 'light') {
				// 							that.petLightIcon = res2.savedFilePath;
				// 						} else if (type === 'belllight') {
				// 							that.petBLIcon = res2.savedFilePath;
				// 						}
				// 						that.sendPetStatusIcon(type);
				// 						uni.setStorageSync(key, res2.savedFilePath);
				// 					},
				// 					fail: (res2) => {
				// 						console.error(`${type}类型保存图片失败：`, res2);
				// 					}
				// 				});
				// 				// #endif

				// 				// #ifdef APP-HARMONY
				// 				saveToFilesDir({
				// 					tempFilePath: res.tempFilePath,
				// 					fileName: `${that.devicelist.serialCode}-${type}.png`,
				// 					success: (savedFilePath) => {
				// 						console.log('canvasToFileWithStatus success',
				// 							savedFilePath);
				// 						if (type === 'bell') {
				// 							that.petBellIcon = savedFilePath;
				// 						} else if (type === 'light') {
				// 							that.petLightIcon = savedFilePath;
				// 						} else if (type === 'belllight') {
				// 							that.petBLIcon = savedFilePath;
				// 						}
				// 						that.sendPetStatusIcon(type);
				// 					},
				// 					fail: (err) => {
				// 						console.error('canvasToFileWithStatus fail', err);
				// 					}
				// 				});
				// 				// #endif
				// 			},
				// 			fail: (err) => {
				// 				console.error(`${type}类型导出图片失败：`, err);
				// 			}
				// 		}, that);
				// 	});
				// } catch (err) {
				// 	console.error(`${type}类型canvas绘制/导出异常：`, err);
				// }
			},

			// 合并图片的方法
			async mergeImages() {
				try {
					let that = this
					let avatarPath = await that.getAvatarInfo()
					// console.log('getAvatarInfo', avatarPath)
					that.canvasToFile(that, avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundBell.png', "bell", avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundLight.png', 'light', avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundBellLight.png', 'belllight', avatarPath)
				} catch (error) {
					console.log('合并图片出错', error);
				}
			},
			async tomap(item) {
				console.log('into tomap', item)
				var avatar = this.presentPet[0].avatarUrl;
				if (!avatar)
					avatar = '/static/new/default_avatar.png';
				if (item != null) {
					let storagedata = await new Promise((resolve, reject) => {
						uni.getStorage({
							key: item.serialCode + "页面缓存",
							success: function(res) {
								resolve(res);
							},
							fail: function(err) {
								// console.log('获取缓存的页面缓存 失败', err);
								reject(err);
							},
						});

					}).then(res => {
						var data = JSON.parse(res.data)
						// console.log('获取缓存的页面缓存', data);
						return data;
					}, err => {
						return null;
					})
					if (this.petIcon === '') {
						this.petIcon = '/static/new/petIconBackGround.png'
					}
					if (this.petBellIcon == '') {
						this.petBellIcon = '/static/new/petIconBackGroundBell.png'
					}
					if (this.petLightIcon == '') {
						this.petLightIcon = '/static/new/petIconBackGroundLight.png'
					}
					if (this.petBLIcon == '') {
						this.petBLIcon = '/static/new/petIconBackGroundBellLight.png'
					}
					var obj = {
						did: item.did,
						uid: this.presentUser,
						presentBattary: this.presentBattary,
						battaryImageSrc: this.battaryImageSrc,
						categoryId: item.categoryId,
						serialCode: item.serialCode,
						// serialCode:"be180100fa1d",
						pname: this.presentPet[0].nickname,
						pid: this.presentPet[0].pid,
						dogOrCat: this.presentPet[0].category,
						avatar: avatar,
						gender: this.presentPet[0].gender,
						data: storagedata,
						petIcon: this.petIcon,
						petBellIcon: this.petBellIcon,
						petLightIcon: this.petLightIcon,
						petBLIcon: this.petBLIcon
					};
					getApp().globalData.lacatePageData = obj
				}
				console.log('getApp().globalData.lacatePageData', getApp().globalData.lacatePageData)
				clearInterval(this.intervalId); //关闭循环电量
				this.intervalId = null;
			},
			require_device(option) {
				// getApp().globalData.allData.forEach((item, index) => {

				// 	if (item.pet_account.pid === option) {
				// 		this.devicelist = item.did_list;

				// 		getApp().globalData.showDeviceList = this.devicelist;
				// 	}
				// })
				// this.devicelist=option[0].deviceInfo
				if (option[0].deviceInfo) {
					this.devicelist = option[0].deviceInfo
					getApp().globalData.showDeviceList = option[0].deviceInfo
					this.isShowAddDevice = false;
					getApp().globalData.presentDevice = this.devicelist.serialCode;
					this.bataryRoll = true;
					this.updataBatary(this.devicelist.serialCode);
					this.mergeImages();
					this.tomap(this.devicelist)
				} else {
					this.isShowAddDevice = true;
					getApp().globalData.presentDevice = null;
					getApp().globalData.lacatePageData = null
					getApp().globalData.showDeviceList = null
				}
			},
			caculateAge(birthDateStr) {
				// 将字符串转换为日期对象
				const birthDate = new Date(birthDateStr);
				const today = new Date();
				// 计算年份和月份的差异
				let yearsDiff = today.getFullYear() - birthDate.getFullYear();
				let monthsDiff = today.getMonth() - birthDate.getMonth();
				// 如果当前月份小于出生月份，说明还没满一个完整的年，需要调整年份和月份
				if (monthsDiff < 0) {
					yearsDiff -= 1;
					monthsDiff += 12;
				}
				// 格式化输出为“X岁Y个月”
				if (yearsDiff > 0) {
					return `${yearsDiff}岁${monthsDiff}个月`;
				} else {
					return `${monthsDiff}个月`;
				}
			},
			petClickCallBack(option) {
				//实现轮动切换，并且缓存数据也做对应修改
				//关闭电量更新循环
				// console.log('option',option)
				getApp().globalData.queryIsUpdate = false;
				this.bataryRoll = false;
				// 切换宠物时立即重置运动数据，避免显示上一个宠物的数据
				this.sportData = [0, 0, 0];
				this.Column.series[0].data = this.seriesData;
				let index = getApp().globalData.allPets.findIndex(item => {
					return item.pid === option
				})
				if (index < 0)
					index = 0
				this.queryIsUpdate = false;
				getApp().globalData.redCircleShow = false;
				this.presentPet = getApp().globalData.allPets.slice(index, index + 1);
				console.log('prensent pet ', this.presentPet)
				getApp().globalData.presentPet = this.presentPet
				this.require_device(this.presentPet);
				this.petAge = this.caculateAge(this.presentPet[0].birthDate)
				this.petWeight = this.presentPet[0].weight
				
				getPetInfo(this.presentPet[0].pid).then(recive => {
					this.petBreed = recive.data.breedName
				})

				console.log('this.petAge', this.petAge, this.petWeight, this.petBreed)
				//3d 模型是否显示
				// if (this.modelShow) {
				// 	if (this.presentPet[0].category === 1 && this.presentPet[0].hasOwnProperty('model3d_url') &&
				// 		this
				// 		.presentPet[0].model3d_url != null) {
				// 		let url = getApp().globalData.internet + '/' + this.presentPet[0].model3d_url;
				// 		console.log('this.modelShow ', this.modelShow)
				// 		//下载然后传model
				// 		this.downloadGlb(url)
				// 		//判断有没有缓存
				// 	} else {
				// 		try {
				// 			setTimeout(() => {
				// 				this.model3d_url = ''
				// 			}, 200)
				// 		} catch (e) {
				// 			console.log("切换3d出错", e)
				// 		}
				// 	}
				// }
				try {
					//跟新宠物图片
					this.updataPetBreedUrl();
					//缓存当前pet
					var storage = JSON.stringify(this.presentPet);
					uni.setStorage({
						key: 'presentPet',
						data: storage,
						success: function() {
							console.log('present数据缓存成功', storage);
						}
					});
					// console.log('tmp2=', getApp().globalData.allPets);
					// console.log('alldata=', getApp().globalData.allData);
					let that = this;
					uni.getStorage({
						key: 'storageToDate',
						success: function(res) {
							let storageDate = JSON.parse(res.data)
							// console.log('拿到缓存的todate', storageDate)
							that.from_date = that.getDate(new Date(), -30).fullDate;
							that.to_date = storageDate;
							that.info.date = that.to_date;
						},
						fail: function(err) {
							that.from_date = that.getDate(new Date(), -30).fullDate;
							that.to_date = that.getDate(new Date(), 0).fullDate;
							that.info.date = that.to_date;
						},
						complete: function() {
							//获取图表数据
							that.getChartData(false)
						}
					});
				} catch (e) {
					console.log("加载出现异常", e)
				}

			},
			toLocatePage(id) {
				uni.navigateTo({
					url: "/pages/locatePage/locatePage?did=" + id
				})

			},
			downloadGlb(url) {
				let that = this
				that.threeModelLoaded = false
				uni.getStorage({
					key: url,
					success: function(res) {
						// 	let storageDate = JSON.parse(res.data)
						that.model3d_url = res.data.model3d_url
						that.threeModelLoaded = true
						console.log('获取缓存的3durl成功', that.model3d_url)
					},
					fail: function(err) {
						console.log('获取缓存的3durl失败', err)

						let dtask = plus.downloader.createDownload(url, {}, function(d, status) {
							// 下载完成时的回调函数
							if (status == 200) {
								// 下载成功
								console.log('下载成功:', d.filename); // d.filename 是文件保存的路径
								that.model3d_url = d.filename
								that.isdownloading = false
								uni.setStorage({
									data: {
										model3d_url: d.filename
									},
									key: url
								})
							} else {
								// 下载失败
								console.log('下载失败:', status);
							}
						});
						let prg = 0;
						if (that.isdownloading === false) {
							that.isdownloading = true
							dtask.start();
							dtask.addEventListener("statechanged", function(task, status) {
								switch (task.state) {
									case 3:
										prg = parseInt((parseFloat(task.downloadedSize) /
											parseFloat(
												task
												.totalSize)) * 100);
										that.modelLoadCountdown = prg
										break;
								}
							});

						}

					},
					complete: function() {}
				})
			},
			todevice() {
				if (this.presentUser != null && this.presentPet.length > 0) {
					var obj = new Object();
					obj.uid = this.presentUser;
					obj.pid = this.presentPet[0].pid;
					obj.name = this.presentPet[0].nickname
					// console.log('send obj', obj);
					uni.navigateTo({
						url: "/pages/add-device/add-device?obj=" + JSON.stringify(obj)
					})

				} else {
					uni.showToast({
						title: '请先添加宠物'
					})
				}

			},
			addpet() {
				uni.navigateTo({
					url: "/pages/add-pet/add-pet?item="
				})
			},
		}
	}
</script>

<style>
	@import "/assets/css/seetings-row.css";

	.loading-container {
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: #F4F5F7;
		display: flex;
		flex-direction: column;
	}

	.loading-spinner {
		width: 80rpx;
		height: 80rpx;
		border: 8rpx solid #f3f3f3;
		border-top: 8rpx solid #FA5300;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.spin-icon {
		animation: spin 4s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.grad {
		background: #F4F5F7;
	}

	/* 确保日历弹窗显示在最上层 */
	:deep(.uni-calendar__mask) {
		z-index: 9998 !important;
	}

	:deep(.uni-calendar__content) {
		z-index: 9999 !important;
	}

	.message-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #F4F5F7;
	}

	.petBackground {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		padding: 120rpx 30rpx 0 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center;
		width: 750rpx;
		height: 650rpx;
		box-sizing: border-box;
	}

	.petBackground_developing {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center;
		width: 100%;
		height: 450rpx;
		border-radius: 14rpx;
		box-sizing: border-box;
	}

	.pet-portra {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 140rpx;
		height: 60rpx;
		border-radius: 100rpx;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
	}

	.pet-portra-text {
		text-align: center;
		font-size: 26rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-variation-settings: "opsz" auto;
		color: #FFFFFF;
	}

	.pet-card-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: -162rpx;
	}

	.pet-portrait {
		background-color: white;
		width: 151rpx;
		height: 151rpx;
		z-index: 2;
		border-radius: 50%;
		margin-left: 30rpx;
		border: 1rpx solid #D7D7D7;
	}

	.pet-container {
		display: flex;
		flex-direction: column;
		background-color: white;
		width: 710rpx;
		border-radius: 14rpx;
		margin-top: -75rpx;
		padding: 100rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		position: relative;
		min-height: 380rpx;
		background-color: #FFFFFF;
	}

	.pet-box {
		width: 100%;
	}

	.pet-basic {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 55rpx;
		width: 100%;
	}

	.pet-name-container {
		display: flex;
		align-items: center;
		height: 53rpx;
		overflow: hidden;
	}

	.pet-name {
		display: block;
		font-size: 38rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-variation-settings: "opsz" auto;
		color: #000000;
		max-width: 266rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.pet-gender {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
	}

	.pet-information {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50rpx;
		margin-top: 15rpx;
		width: 490rpx;
		/* 关键设置 */
		flex-wrap: nowrap;
		/* 禁止换行 */
		overflow: hidden;
		/* 隐藏溢出部分 */
	}

	.pet-info-text {
		font-size: 32rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-variation-settings: "opsz" auto;
		color: #777777;
		flex-shrink: 0;
		/* 关键：不允许压缩 */
		white-space: nowrap;
		/* 禁止文本换行 */
	}

	.pet-info-text-breed {
		font-size: 32rpx;
		font-weight: normal;
		line-height: normal;
		color: #777777;
		/* 关键设置 */
		flex-shrink: 1;
		/* 允许适当压缩 */
		min-width: 0;
		/* 重要！允许压缩到0以下 */
		white-space: nowrap;
		/* 禁止文本换行 */
		overflow: hidden;
		/* 隐藏溢出文本 */
		text-overflow: ellipsis;
		/* 超出显示省略号 */
	}

	.pet-info-divider {
		width: 2rpx;
		height: 28rpx;
		background: #777777;
		margin: 0 20rpx;
	}

	.pet-switch {
		display: flex;
		flex-direction: row;
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		width: 200rpx;
		height: 70rpx;
		border-radius: 50rpx;
		background: #FFFFFF;
		box-sizing: border-box;
		border: 1px solid #D7D7D7;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 15rpx;
	}

	.pet-switch-text {
		display: flex;
		width: 112rpx;
		opacity: 1;
		font-size: 28rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0px;
		color: #000000;
	}

	.pet-switch-png {
		/* background-image: url("/static/imgs/home/switch.svg"); */
		display: flex;
		width: 30rpx;
		height: 30rpx;
		opacity: 1;
		background-size: cover;
		/* 按比例缩放以覆盖容器 */
		background-repeat: no-repeat;
		background-position: center;

	}

	.equipment-setting {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-radius: 14px;
		opacity: 1;
		box-sizing: border-box;
		border: 1px solid #D7D7D7;
		position: absolute;
		bottom: 37rpx;
		left: 30rpx;
		right: 30rpx;
		width: calc(100% - 60rpx);
	}

	.equipment-setting-text {
		display: flex;
		margin-left: 20rpx;
		opacity: 1;
		justify-content: center;
		font-size: 32rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		align-items: center;
		font-variation-settings: "opsz" auto;
		color: #000000;
	}

	.equipment-setting-text2 {
		display: flex;
		flex: 1;
		height: 36rpx;
		margin-left: 35rpx;
		margin-right: 10rpx;
		opacity: 1;
		justify-content: flex-end;
		align-items: center;
		font-size: 26rpx;
		font-weight: normal;
		line-height: normal;
		text-align: right;
		letter-spacing: 0em;
		font-variation-settings: "opsz" auto;
		color: #AAAAAA;
	}

	.equipment-setting-png {
		background-image: url("/static/imgs/home/equipment-setting.png");
		display: flex;
		width: 34rpx;
		height: 34rpx;
		margin-left: 10rpx;
		justify-content: center;
		align-items: center;
		opacity: 1;
		background-size: cover;
		/* 按比例缩放以覆盖容器 */
		background-repeat: no-repeat;
		background-position: center;
	}

	.battery-box {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 68rpx;
		height: 34rpx;
		margin-left: 16rpx;
		position: relative;
		justify-content: center;
		align-items: center;
	}

	.battery-text-box {
		width: 68rpx;
		height: 34rpx;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.battery-power-charge{
		width: 20rpx;
		height: 20rpx;
	}
	.battery-power {
		width: 100%;
		height: 100%;
		position: absolute;
		align-content: center;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.battery-text {
		font-size: 22rpx;
		/* position: absolute; */
		color: #000000;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.pet-sports {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		width: 95%;
		height: 838rpx;
		border-radius: 14rpx;
		margin: 24rpx 20rpx 0 20rpx;
		position: relative;
		z-index: 1;
	}

	.pet-sports-top {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 106rpx;
		border-radius: 14rpx;
		opacity: 1;
		position: relative;
		z-index: 10;
	}

	.pet-sports-title {
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
		margin-top: 30rpx;
		width: 136rpx;
		height: 48rpx;
		opacity: 1;
		font-size: 34rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		font-variation-settings: "opsz" auto;
		color: #000000;
		position: relative;
		z-index: 999;

	}

	.pet-sports-png {
		position: relative;
		left: -133rpx;
		top: 60rpx;
		width: 123rpx;
		height: 14rpx;
		border-radius: 14rpx;
		opacity: 1;
		background: linear-gradient(90deg, #FA5300 0%, #FDC6AB 57%, rgba(255, 255, 255, 0.31) 100%, #FFE5D9 100%);
		pointer-events: none;
	}

	.data {
		display: flex;
		flex-direction: row;
		margin-top: 21rpx;
		width: 243rpx;
		height: 64rpx;
		border-radius: 100rpx;
		opacity: 1;
		box-sizing: border-box;
		border: 1px solid #D7D7D7;
		margin-left: auto;
		margin-right: 30rpx;
		align-items: center;
		justify-content: center;
	}

	.data-text {
		display: flex;
		flex-direction: row;
		width: 160rpx;
		opacity: 1;
		font-size: 24rpx;
		color: #000000;
		text-align: center;
	}

	.data-png {
		display: flex;
		width: 34rpx;
		height: 34rpx;
	}

	.pet-sports-body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		height: 240rpx;
		border-top: 1px solid #D7D7D7;
		opacity: 1;
	}

	.body-show {

		width: calc(100% - 30rpx);
		height: 200rpx;
		display: flex;
		margin-top: 25rpx;
		justify-content: center;
		align-items: center;
	}

	.pet-sports-bottom {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 450rpx;
		border-radius: 20rpx;
		opacity: 1;
		position: absolute;
		bottom: 20rpx;
	}

	.prt-steps {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 150rpx;
		border-radius: 20rpx;
		opacity: 1;
	}

	.steps-png {
		display: flex;
		width: 94rpx;
		height: 120rpx;
		opacity: 1;
		margin-left: 29rpx;
		background-size: cover;
		/* 按比例缩放以覆盖容器 */
		background-repeat: no-repeat;
		background-position: center;
	}

	.steps-text {
		display: flex;
		margin-left: 20rpx;
		opacity: 1;
		font-size: 34rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		align-items: center;
		color: #000000;
	}

	.steps-number {
		display: flex;
		margin-left: auto;
		margin-right: 34rpx;
		width: 300rpx;
		height: 56rpx;
		align-items: center;
		/* 垂直居中 */
		justify-content: flex-end;
		/* 水平居中 */
		opacity: 1;
		font-size: 40rpx;
		font-weight: normal;
		line-height: normal;
		text-align: center;
		color: #000000;
	}

	.pet-cal {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 150rpx;
		border-radius: 20rpx;
		opacity: 1;

	}

	.cal-png {
		display: flex;
		width: 94rpx;
		height: 120rpx;
		opacity: 1;
		margin-left: 29rpx;
		background-size: cover;
		/* 按比例缩放以覆盖容器 */
		background-repeat: no-repeat;
		background-position: center;
	}

	.cal-text {
		display: flex;
		margin-left: 20rpx;
		opacity: 1;
		font-size: 34rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		align-items: center;
		font-variation-settings: "opsz" auto;
		color: #000000;
	}

	.cal-number {
		display: flex;
		margin-left: auto;
		margin-right: 34rpx;
		width: 300rpx;
		height: 56rpx;
		align-items: center;
		/* 垂直居中 */
		justify-content: flex-end;
		/* 水平居中 */
		opacity: 1;
		font-size: 40rpx;
		font-weight: normal;
		line-height: normal;
		text-align: center;
		color: #000000;
	}

	.pet-exercise {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 150rpx;
		border-radius: 20rpx;
		opacity: 1;
	}

	.exercise-png {
		display: flex;
		width: 94rpx;
		height: 120rpx;
		opacity: 1;
		margin-left: 29rpx;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.exercise-text {
		display: flex;
		margin-left: 20rpx;
		opacity: 1;
		font-size: 34rpx;
		font-weight: normal;
		line-height: normal;
		letter-spacing: 0em;
		align-items: center;
		color: #000000;
	}

	.exercise-number {
		display: flex;
		margin-left: auto;
		margin-right: 34rpx;
		width: 300rpx;
		height: 56rpx;
		align-items: center;
		/* 垂直居中 */
		justify-content: flex-end;
		/* 水平居中 */
		opacity: 1;
		font-size: 40rpx;
		font-weight: normal;
		line-height: normal;
		text-align: center;
		color: #000000;
	}

	/* 折叠式标题栏样式 */
	.collapse-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.collapse-header-content {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.collapse-header-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #000000;
		text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.3);
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
	}

	.scroll-container {
		width: 100%;
		/* height: 100vh; */
	}


	


	/* #ifdef APP-HARMONY */
	@media (prefers-color-scheme: dark) {
		.loading-container {
			width: 100vw;
			height: 100vh;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
			background-color: #141414;
			display: flex;
			flex-direction: column;
		}

		.grad {
			background: #474748;
		}

		.message-body {
			display: flex;
			flex-direction: column;
			width: 100%;
			background: #474748;
		}

		.pet-container {
			display: flex;
			flex-direction: column;
			background-color: white;
			width: 710rpx;
			border-radius: 14rpx;
			margin-top: -75rpx;
			padding: 100rpx 30rpx 30rpx 30rpx;
			box-sizing: border-box;
			position: relative;
			min-height: 380rpx;
			background-color: #252525;
		}

		.pet-name {
			display: block;
			font-size: 38rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
			max-width: 266rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.pet-switch {
			display: flex;
			flex-direction: row;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 200rpx;
			height: 70rpx;
			border-radius: 50rpx;
			background: #000000;
			box-sizing: border-box;
			border: 1px solid #4a4a4a;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 15rpx;
		}

		.pet-switch-text {
			display: flex;
			width: 112rpx;
			opacity: 1;
			font-size: 28rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0px;
			color: #FFFFFF;
		}

		.pet-info-text {
			font-size: 32rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			font-variation-settings: "opsz" auto;
			color: #b8b8b8;
		}

		.pet-info-divider {
			width: 2rpx;
			height: 28rpx;
			background: #b8b8b8;
			margin: 0 20rpx;
		}

		.equipment-setting-text {
			display: flex;
			margin-left: 20rpx;
			width: 130rpx;
			opacity: 1;
			text-align: center;
			font-size: 32rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;

			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
		}

		.equipment-setting {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-radius: 14px;
			opacity: 1;
			box-sizing: border-box;
			border: 1px solid #4a4a4a;
			position: absolute;
			bottom: 37rpx;
			left: 30rpx;
			right: 30rpx;
			width: calc(100% - 60rpx);
		}

		.pet-sports {
			display: flex;
			flex-direction: column;
			background-color: #252525;
			width: 95%;
			height: 838rpx;
			border-radius: 14rpx;
			margin: 24rpx 20rpx 0 20rpx;
			position: relative;
			z-index: 1;
		}

		.pet-sports-title {
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			margin-top: 30rpx;
			width: 136rpx;
			height: 48rpx;
			opacity: 1;
			font-size: 34rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
			position: relative;
			z-index: 999;

		}

		.pet-sports-png {
			position: relative;
			left: -133rpx;
			top: 60rpx;
			width: 123rpx;
			height: 14rpx;
			border-radius: 14rpx;
			opacity: 1;
			background: linear-gradient(90deg, #D45B00 0%, #9C6A55 57%, rgba(18, 18, 18, 0.7) 100%, #2A211E 100%);
			pointer-events: none;
		}

		.data-text {
			display: flex;
			flex-direction: row;
			width: 160rpx;
			opacity: 1;
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
		}

		.data {
			display: flex;
			flex-direction: row;
			margin-top: 21rpx;
			width: 243rpx;
			height: 64rpx;
			border-radius: 100rpx;
			opacity: 1;
			box-sizing: border-box;
			border: 1px solid #4a4a4a;
			margin-left: auto;
			margin-right: 30rpx;
			align-items: center;
			justify-content: center;
		}

		.steps-text {
			display: flex;
			margin-left: 20rpx;
			opacity: 1;
			font-size: 34rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			align-items: center;
			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
		}

		.steps-number {
			display: flex;
			margin-top: 47rpx;
			margin-left: auto;
			margin-right: 34rpx;
			width: 300rpx;
			height: 56rpx;
			align-items: center;
			/* 垂直居中 */
			justify-content: flex-end;
			/* 水平居中 */
			opacity: 1;
			font-size: 40rpx;
			font-weight: normal;
			line-height: normal;
			text-align: center;
			color: #FFFFFF;
		}

		.cal-text {
			display: flex;
			margin-left: 20rpx;
			opacity: 1;
			font-size: 34rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			align-items: center;
			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
		}

		.cal-number {
			display: flex;
			margin-top: 47rpx;
			margin-left: auto;
			margin-right: 34rpx;
			width: 300rpx;
			height: 56rpx;
			align-items: center;
			/* 垂直居中 */
			justify-content: flex-end;
			/* 水平居中 */
			opacity: 1;
			font-size: 40rpx;
			font-weight: normal;
			line-height: normal;
			text-align: center;
			color: #FFFFFF;
		}

		.exercise-text {
			display: flex;
			margin-left: 20rpx;
			opacity: 1;
			font-size: 34rpx;
			font-weight: normal;
			line-height: normal;
			letter-spacing: 0em;
			align-items: center;
			font-variation-settings: "opsz" auto;
			color: #FFFFFF;
		}

		.exercise-number {
			display: flex;
			margin-top: 47rpx;
			margin-left: auto;
			margin-right: 34rpx;
			width: 300rpx;
			height: 56rpx;
			align-items: center;
			/* 垂直居中 */
			justify-content: flex-end;
			/* 水平居中 */
			opacity: 1;
			font-size: 40rpx;
			font-weight: normal;
			line-height: normal;
			text-align: center;
			color: #FFFFFF;
		}
	}

	/* #endif */
</style>