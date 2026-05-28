<template>
	<view class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">设备设置</text>
			</view>
			<view style="width: 150rpx;">
			</view>
		</div>
		<view class="version-txt">
			设备编号：{{serialCode}}
		</view>
		<div class="mask" v-if="showMask" @click="hideMask">
		</div>
		<div v-if="isShowRestart" class="mask">
			<view class="drawtoast">
				<div class="topBar">
					<text style="color: rgb(255,255,255);font-size: 38rpx;">重启设备</text>
				</div>
				<div class="row_center" style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="color: rgb(128,128,128);font-size: 38rpx;font-weight: 500;">点击确定重启设备</text>
				</div>
				<div class="row_center" style="margin-bottom: 20rpx;">
					<text style="color: rgba(255, 87, 51, 1);font-size: 24rpx;">*在信号好的地方响应更快</text>
				</div>
				<view class="row_between" style="margin-bottom: 30rpx;width:340rpx;">
					<button class="myButton" style="width: 150rpx;height: 70rpx;" @click="reStart(false)"><text
							style="color: rgb(255,255,255);font-size: 38rpx;">取消</text></button>
					<button class="myButton" style="width: 150rpx;height: 70rpx;" @click="reStart(true)"><text
							style="color: rgb(255,255,255);font-size: 38rpx;">重启</text></button>
				</view>
			</view>
		</div>
		<div v-if="isShowDelete" class="mask">
			<view class="drawtoast">
				<div class="topBar">
					<text style="color: rgb(255,255,255);font-size: 38rpx;">解绑设备</text>
				</div>
				<div class="row_center" style="margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="color: rgb(128,128,128);font-size: 38rpx;font-weight: 500;">点击确定解绑设备</text>
				</div>
				<div class="row_center" style="margin-bottom: 20rpx;">
					<text style="color: rgba(255, 87, 51, 1);font-size: 24rpx;">*解出绑定后所有定位数据都会清除</text>
				</div>
				<view class="row_between" style="margin-bottom: 30rpx;width:340rpx;">
					<button class="myButton" style="width: 150rpx;height: 70rpx;" @click="deleteDevice(false)"><text
							style="color: rgb(255,255,255);font-size: 38rpx;">取消</text></button>
					<button class="myButton" style="width: 150rpx;height: 70rpx;" @click="deleteDevice(true)"><text
							style="color: rgb(255,255,255);font-size: 38rpx;">解绑</text></button>
				</view>
			</view>
		</div>
		<view class="settings-container">
			<div class="settings-row" @click="changeMode">
				<view class="settings-row-left">
					<view class="setting-txt">
						电量显示
					</view>
				</view>
				<view style="display: flex;align-items: center;">

					<text style="color: #ff0000;font-size: 25rpx;">{{batteryShowMode}}</text>

					<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
				</view>

			</div>

			<view class="settings-row" @click="sharePet">
				<view class="settings-row-left">
					<view class="setting-txt">
						共享设备
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view v-if="serialCode.substring(0,2)!='ae'" class="settings-row" @click="toFirmware">
				<view class="settings-row-left">
					<view class="setting-txt">
						固件升级
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="restartDevice">
				<view class="settings-row-left">
					<view class="setting-txt">
						重启设备
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="unbindDevice" style="border-bottom: none;">
				<view class="settings-row-left">
					<view class="setting-txt">
						解绑设备
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view>
		<div v-show="isShowBattery" class="user-select" id='container'
			:class="{expend:petPopoverVisible,closeContainer:petHide}">
			<div class="battery-title"><text>电量样式</text></div>
			<div class="batteryRow" @click="clickBattery(true)"
				:class="{batteryRowClick:clickMode,batteryRow:!clickMode}">
				<view>
					<text>百分比显示</text>
				</view>

				<view style="position: relative;">
					<liiy-battery :power=100 :mode='true'>
					</liiy-battery>
					<view style="position: absolute; top: 50%; left: 45%; transform: translate(-50%,-50%);">
						<text style="font-size: 10px; color: #000000;">100</text>
					</view>
				</view>

			</div>
			<div class="batteryRow" @click="clickBattery(false)"
				:class="{batteryRowClick:!clickMode,batteryRow:clickMode}">
				<text>不显示百分比</text>
				<view> <liiy-battery :power='100'> </liiy-battery>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	import util from '../../../common/util'
	import {
		deviceUnbind
	} from '@/api/api/device'
	export default {
		data() {
			return {
				isSubmitting: false,
				submitTimer: null,
				placeholderStyle: "color:#808080;font-size:14px",
				styles: {
					color: '#000000',
				},
				shareform: {
					pid: "",
					phone_number: '',
				},
				haveUpdata: false,
				version: '1.0.0',
				serialCode: '',
				isShowBattery: false,
				batteryShowMode: '百分比显示',
				showMask: false,
				petPopoverVisible: false,
				petHide: false,
				clickMode: true,
				isShowmodel3d: true,
				isShowShare: false,
				isShowRestart: false,
				isShowDelete: false,
				rules: {
					phone_number: {
						rules: [{
								required: true,
								errorMessage: '电话号码',
							},
							{
								pattern: /^1[34578]\d{9}$/,
								errorMessage: '电话号码格式错误',
							}
						]
					},
				}
			}
		},
		onLoad(para) {
			this.serialCode = para.serialCode
			let presentpet = getApp().globalData.presentPet
			this.shareform.pid = presentpet[0].pid;
			this.clickMode = uni.getStorageSync('batteryShowMode')
			if (this.clickMode === '')
				this.clickMode = true
			console.log('this.clickMode', this.clickMode)
			if (this.clickMode === true) {
				this.batteryShowMode = '百分比显示'
			} else if (this.clickMode === false) {
				this.batteryShowMode = '不显示百分比'
			}
		},
		onShow() {
			this.haveUpdata = getApp().globalData.redCircleShow;
			this.version = getApp().globalData.appVersion;
		},
		methods: {
			removeItem() {
				getApp().globalData.allData = getApp().globalData.allData.map((item) => {
					if (item.pet_account.pid === pid) {
						if (!item.did_list || !item.did_list.length) {
							return item;
						}
						item.did_list = item.did_list.filter(((v) => v.did !== did));
					}
					return item;
				});

				uni.removeStorageSync(did + 'refreshTime')
			},
			deleteDevice(opt) {
				// 1. 立即设置提交状态，防止定时器期间重复点击
				if (this.isSubmitting) {
					uni.showToast({
						title: '正在提交，请稍候',
						icon: 'none'
					});
					return;
				}
				// 2. 立即设置状态，而不是等定时器触发
				this.isSubmitting = true;

				// 3. 清除之前的定时器
				if (this.submitTimer) {
					clearTimeout(this.submitTimer);
					this.submitTimer = null;
				}

				// 4. 设置防抖定时器
				this.submitTimer = setTimeout(() => {
					// 统一的状态重置函数
					const resetState = () => {
						this.isSubmitting = false;
						if (this.submitTimer) {
							clearTimeout(this.submitTimer);
							this.submitTimer = null;
						}
					};

					// 统一错误处理
					const handleError = (err) => {
						console.error('解绑失败', err);
						resetState();
					};

					// 5. 处理逻辑
					if (opt) {
						deviceUnbind(this.serialCode)
							.then((recivedata) => {
								console.log('解绑结果', recivedata);

								// 清理缓存
								uni.removeStorage({
									key: this.serialCode + "页面缓存",
									success: (res) => {
										console.log('清除页面缓存success', res);
									},
									fail: (err) => {
										console.warn('清除缓存失败', err);
									}
								});

								// 更新UI状态
								this.isShowDelete = false;
								util.requestPetList();

								// 显示成功提示
								uni.showToast({
									title: '解绑成功',
									icon: 'success',
									duration: 1500
								});

								// 延迟跳转
								setTimeout(() => {
									resetState();
									this.returnParent();
								}, 1000);

							})
							.catch(handleError);
					} else {
						// 取消操作的情况
						this.isShowDelete = false;
						resetState();
					}
				}, 500);
			},
			sharePet() {
				//去分享页面
				let presentpet = getApp().globalData.presentPet
				console.log("presentpet", presentpet)
				var sharepet = presentpet[0];
				var pet = JSON.stringify(sharepet);
				// console.log('share pet', pet);
				uni.navigateTo({
					url: "/pages/sharepet/sharepet?pet=" + pet
				})
			},
			returnParent() {
				getApp().backParents();
			},
			showBattery() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/normAbove/normAbove'
				})
			},
			toFirmware() {
				uni.navigateTo({
					url: "/pages/setting/firmware/firmware?rute=0"
				})
			},
			restartDevice() {
				this.isShowRestart = true
			},
			reStart(opt) {
				console.log('restart', opt)
				if (opt === true) {
					var restart = getApp().globalData.internet + getApp().globalData.devReboot;
					let serialcode = getApp().globalData.showDeviceList.serial_code
					let data = {
						serial_code: serialcode,
						reboot_control: 1
					}
					util.requestDataFrom(restart, data).then((reciveData) => {
						if (reciveData.data.code === 200) {
							uni.showToast({
								title: '重启成功',
							})
							this.isShowRestart = false
						}
					})
				} else {
					this.isShowRestart = false
				}
			},
			unbindDevice() {
				this.isShowDelete = true
			},
			changeMode() {
				this.hideMask();
			},
			hideMask() {
				this.isShowBattery = !this.isShowBattery
				this.showMask = !this.showMask
				this.petPopoverVisible = !this.petPopoverVisible
				this.petHide = !this.petPopoverVisible
			},
			clickBattery(mode) {
				//改变全局变量加缓存
				if (mode === true) {
					this.batteryShowMode = '百分比显示'
				} else if (mode === false) {
					this.batteryShowMode = '不显示百分比'
				}
				this.clickMode = mode;
				getApp().globalData.batteryShowMode = mode
				uni.setStorageSync('batteryShowMode', mode)
			},
			restart() {

			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.myicon {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: red;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.version-txt {
		width: 100%;
		text-align: center;
		color: #808080;
		font-size: 25rpx;
	}

	.input_view {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}

	.input_view::v-deep .uni-forms-item__error {
		padding-left: 8%;
		padding-top: 0px;
	}
</style>