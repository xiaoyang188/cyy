<template>
	<div class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">固件升级</text>
			</view>
			<view style="width: 150rpx;">
			</view>
		</div>
		<!-- 信息提示框 -->
		<div class="container">
			<div class="container-box">
				<view style="margin: 10rpx auto;" @click="clickCnt">
					<cach-image url="/static/imgs/home/bell.png" fileMd5="../../static/xixin/default.png" width="300rpx"
						height="300rpx" radius="50%"></cach-image>
				</view>
				<view><text style="font-size: 38rpx;">最新的固件版本为 {{newVersion}}</text></view>
				<view style="margin-top: 5rpx;"><text style="font-size: 34rpx;color: rgb(128,128,128);">当前固件版本
						{{myVersion}}</text></view>
			</div>
			<div class="container-text-title">
				<text style="font-weight: 500;">
					重要提示！
				</text>
				<image :src="bluetoothConnect ? '/static/xixin/Bluetooth.png':'/static/xixin/Bluetooth_disconnect.png'"
					style="width: 40rpx;height: 40rpx;"></image>
			</div>
			<div class="container-text">
				<text
					style="color:rgba(255, 87, 51, 1) ;line-height: 1.5; ">升级需要手机开启蓝牙，并确保手机在设备旁边，蓝牙自动连接成功后右上角蓝牙图标会亮起！</text>
				<text style="margin-top: 10rpx;">-电量高于20%</text>
				<text style="margin-top: 10rpx;">-据上次升级间隔超过十分钟</text>
			</div>
			<div v-if="showUpgradeView" class="myButton" style="width: 300rpx;margin-top: 100rpx;border-radius: 30px;"
				@click="callBack(0)"><text style="color: rgb(255, 255, 255);">马上升级</text></div>
		</div>
	</div>
	<custom-modal ref="modal" />
	<firmware-loading :visible="loadingVisible" :title="loadingTitle" :show-progress="showProgress"
		:progress="loadingProgress" />
	<!-- <view>
		<button @tap="callBack(0)">重启蓝牙</button>
	</view>
	<div>
		<button @tap="testIosFileRead">测试ios文件读取</button>
	</div>
	<div><button @tap="sendStartUpdate">开始升级</button></div>
	<div>
		<button @tap="sendErase">擦除</button>
	</div>
	<div>
		<button @tap="hexWrite">写入</button>
	</div>
	<div>
		<button @tap="hexRead">验证</button>
	</div>
	<div>
		<button @tap="BleRead1">读取</button>
	</div>
	<div>
		<button @tap="Blend">结束升级</button>
	</div>
	<div><button @tap="postFirmwareVersion">关闭app</button></div> -->
</template>

<script>
	// import { Result } from "element-ui"
	const CMD_IAP_PROM = 0x80 // IAP编程命令
	const CMD_IAP_ERASE = 0x81 // IAP擦除命令
	const CMD_IAP_VERIFY = 0x82 // IAP校验命令
	const CMD_IAP_END = 0x83 // IAP结束标志
	const CMD_IAP_INFO = 0x84 // IAP获取设备信息
	const CMD_BLOCK_SIZE = 4096
	import {
		getStartCommand,
		getEndCommand,
		getProgrammeCommand2,
		getVerifyCommand2,
		getEraseCommand,
		parseHexFileStartAddr,
		parseHexFile,
		hexStringValid,
		hexString2ByteArray,
		bytesToHexString,
		charToByte,
	} from "../../../common/fileParesUtil.js"
	import util from "../../../common/util.js";
	import permision from '../../../js_sdk/wa-permission/permission';
	import {
		closeBLEConnection,
		stopBluetoothDevicesDiscovery,
		closeBluetoothAdapter,
		openBluetoothAdapter,
		writeBLECharacteristicValue,
		createBLEConnection,
		startBluetoothDevicesDiscovery,
		getBLEDeviceRSSI,
		getBLEDeviceServices,
		getBLEDeviceCharacteristics,
		setBLEMTU,
		notifyBLECharacteristicValueChange,
		readBLECharacteristicValue,
		setKeepScreenOn
	} from "@/utils/bluetooth.js"
	// #ifdef APP-HARMONY
	import {
		openPermission
	} from '@/uni_modules/srh-openPermission';
	import {
		$uni
	} from '@/utils/main.js';
	import {
		BluetoothStateEnum
	} from "@/uni_modules/jiannor-oh-tools"
	// #endif
	import FirmwareLoading from '@/components/firmware-loading/firmware-loading.vue';

	export default {
		components: {
			'firmware-loading': FirmwareLoading
		},
		data() {
			return {
				platform: '',
				insurance: 0,
				bluetoothConnect: false,
				// 加载组件控制变量
				loadingVisible: false,
				loadingTitle: '加载中...',
				showProgress: false,
				loadingProgress: 0,
				showMessage: '有新的固件可升级，请点击下方设备进行升级',
				showMessage2: "当前固件已经是最新版本",
				byteBuffer: '',
				CurrentImageInfo: {
					type: '',
					version: '',
					offset: '',
					chipType: 'CH583',
					blockSize: 4096,
					IAP_VER: 0 //老版本00 新版本>=40
				},
				tamp_did_list: null,
				isUpdata: false,
				firmwareUrl: '',
				characteristicIdread: '0000FFE3-0000-1000-8000-00805F9B34FB',
				characteristicIdwrite: '0000FFE3-0000-1000-8000-00805F9B34FB',
				characteristicIdnotify: '0000FFE4-0000-1000-8000-00805F9B34FB',
				serviceId: '',
				deviceId: '',
				isUping: false,
				connectBlueTooth: {
					name: '',
					id: ''
				},
				OTABlueTooth: {
					name: '',
					id: ''
				},
				getInfoRequest: [0x84, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
					0x00, 0x00, 0x00, 0x00, 0x00
				],
				// eraseSuccess:false;
				verifySuccess: false,
				deviceSerialCode: '',

				newVersion: '',
				myVersion: '',
				initCnt: 0,
				intervalId: '',
				ruteNumber: '',
				showUpgradeView: false,
				stateChangeTimer: null,
				TimeoutDateLine: null,
				timeoutSendData: null,
				timeoutCreatConnect: null,
				updateStep: 0,
			}
		},
		onShow() {
			//查询固件版本写上去
			this.myVersion = getApp().globalData.myFirewareVersion;
			this.newVersion = getApp().globalData.newFirewareVersion;
			if (this.newVersion > this.myVersion && this.myVersion > 34 && getApp().globalData.myHardwareVersion >= 38) {
				this.showUpgradeView = true
			}
			// if(this.newVersion===this.myVersion)
			// {
			// 	this.showMessage="当前固件已经是最新版本"
			// }
			// this.postFirmwareVersion()
		},
		mounted() {},
		onHide() {},
		methods: {
			// 加载组件控制方法
			showCustomLoading(title = '加载中...', showProgress = false) {
				this.loadingTitle = title;
				this.showProgress = showProgress;
				this.loadingVisible = true;
			},
			hideCustomLoading() {
				this.loadingVisible = false;
			},
			updateLoadingTitle(title) {
				this.loadingTitle = title;
			},
			updateLoadingProgress(progress) {
				this.loadingProgress = progress;
			},
			clickCnt() {
				this.insurance++
				if (this.insurance >= 5) {
					this.showUpgradeView = true
				}
				if (this.insurance >= 10) {
					uni.showToast({
						icon: 'none',
						title: '升级特别固件'
					})
					getApp().globalData.downloadFirewareUrl =
						'https://cyy-firmware.oss-cn-hangzhou.aliyuncs.com/repair.hex?' + Math.random().toString()
					console.log('下载固件地址', getApp().globalData.downloadFirewareUrl)
				}
			},
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				var strStatus = ''
				if (result == 1) {
					strStatus = "已获得授权"
				} else if (result == 0) {
					strStatus = "未获得授权"
				} else {
					strStatus = "被永久拒绝权限"
				}
				console.log('定位权限获取状态', strStatus, result)
				if (result != 1)
					uni.showModal({
						content: "请打开位置权限，当前位置权限" + strStatus,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								permision.gotoAppPermissionSetting()
							}
						}
					});
			},
			testIosFileRead() {
				var query = getApp().globalData.downloadFirewareUrl
				let that = this
				uni.downloadFile({
					url: query, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							that.firmwareUrl = res.tempFilePath;
							console.log('相对文件路径', res.tempFilePath)
							let systemurl = plus.io
								.convertLocalFileSystemURL(res
									.tempFilePath)
							console.log('绝对路径', systemurl)
						}
					},
					fail(err) {
						console.log('下载文件失败', err);
						this.showCustomLoading('固件文件失败');
					}
				});
			},
			async sendErase() {
				try { //v1.2--修改擦除块的计算方式
					const blockSize = CMD_BLOCK_SIZE;
					const nBlocks = Math.ceil(this.byteBuffer.length / CMD_BLOCK_SIZE);
					//开始擦除 起始地址 和块的数量
					console.log('nBlocks-1',nBlocks-1)
					const erasedata = getEraseCommand(CMD_BLOCK_SIZE, 46);
					//写入并且读取回复 第一个字节是0x00表示擦除成功
					let write_statue = await this.BleWrite(erasedata)
					let verifySuccessCount = 5
					for (let i = 0; i < verifySuccessCount; i++) {
						if (!write_statue) {
							console.log(`擦除操作失败，重试第${i + 1}次`);
							const delayTime = Math.min(200 + i * 100, 500);
							await new Promise((resolve) => setTimeout(resolve, delayTime));
							write_statue = await this.BleWrite(erasedata)
						} else {
							console.log('擦除操作成功');
							return write_statue;
						}
					}

					if (!write_statue) {
						console.log('擦除操作最终失败');
						this.hideCustomLoading();
						uni.showToast({
							title: '设备擦除失败，请重试',
							icon: 'none'
						});
					}
					return write_statue;
				} catch (e) {
					console.log('擦除操作异常:', e);
					this.hideCustomLoading();
					uni.showToast({
						title: '擦除操作异常，请重试',
						icon: 'none'
					});
					return false;
				}
			},
			async Blend() {
				const upend = getEndCommand();
				console.log('upend', upend);
				let write_statue = this.BleWrite(upend);
				return true
				//发出结束指令
				// let verifySuccessCount = 5
				// for (let i = 0; i < verifySuccessCount; i++) {
				// 	if (!write_statue) {
				// 		await new Promise((resolve) => setTimeout(resolve, 100));
				// 		write_statue = await this.BleWrite(upend)
				// 	} else
				// 		return write_statue
				// }
				// return write_statue
			},
			async hexWrite() {
				var offset = 0;
				console.log('offset', offset);
				let startAddr = 4096;
				let byteBuffer = this.byteBuffer;
				let Time = new Date();
				let timestemp = Time.getTime();
				let retry_cnt = 0
				while (offset < byteBuffer.length) {
					//有效数据的长度
					const programmeLength = Math.min(240, byteBuffer.length - offset);
					const programmeCommand = getProgrammeCommand2(offset + startAddr, byteBuffer, offset,
						programmeLength);
					//向蓝牙写入数据 写入失败应该继续从写
					// console.log('programmeCommand', programmeCommand);
					let Time2 = new Date();
					let timestemp2 = Time2.getTime();
					// console.log('上次写到这次写花的时间',timestemp2-timestemp)
					timestemp = timestemp2;
					let write_statue = await this.BleWrite(programmeCommand)
					// await new Promise((resolve) => setTimeout(resolve, 40));
					if (write_statue) {
						retry_cnt = 0
						offset += programmeLength;
						let prg = parseInt(offset / byteBuffer.length * 50);
						this.showCustomLoading("蓝灯闪烁 \n  正在更新" + prg + "%  ", true);
						this.updateLoadingProgress(prg);
						console.log('写入数据进度', offset / byteBuffer.length, offset, byteBuffer.length);
					} else {
						retry_cnt++;
						console.log(`写入数据失败，重试第${retry_cnt}次，进度: ${(offset / byteBuffer.length * 100).toFixed(1)}%`);

						if (retry_cnt > 5) {
							console.log('写入失败次数过多，终止升级');
							this.hideCustomLoading();
							uni.showToast({
								title: '固件升级失败，请重试',
								icon: 'none'
							});
							return false;
						}

						// 增加延迟时间，给蓝牙连接恢复的时间
						const delayTime = Math.min(200 + retry_cnt * 100, 1000);
						await new Promise((resolve) => setTimeout(resolve, delayTime));
					}

				}
				console.log('发送结束', retry_cnt);
				return true
			},
			async hexWrite1(showLoading) {
				var offset = 0;
				console.log('offset', offset);
				let startAddr = CMD_BLOCK_SIZE;
				let byteBuffer = this.byteBuffer;
				console.log('this.byteBuffer.', this.byteBuffer.length)
				let cnt = 0;
				let Time = new Date();
				let timestemp = Time.getTime();
				while (offset < byteBuffer.length) {
					//有效数据的长度
					const programmeLength = Math.min(240, byteBuffer.length - offset);
					const programmeCommand = getProgrammeCommand2(offset + startAddr, byteBuffer, offset,
						programmeLength);
					//向蓝牙写入数据 写入失败应该继续从写
					// console.log('programmeCommand', programmeCommand);
					let Time2 = new Date();
					let timestemp2 = Time2.getTime();
					// console.log('上次写到这次写花的时间',timestemp2-timestemp)
					timestemp = timestemp2;
					let write_statue = await util.BleWrite(this.deviceId, this.serviceId, this.characteristicIdwrite,
						programmeCommand)
					// await new Promise((resolve) => setTimeout(resolve, 40));
					if (write_statue) {
						cnt = 0
						//新固件理论上这里要读取一下
						if (this.CurrentImageInfo.IAP_VER != 127) {
							this.verifySuccess = false
							let readcnt = 0
							while (!this.verifySuccess && readcnt < 5) {
								await new Promise((resolve) => setTimeout(resolve, 10));
								await new Promise((resolve) => {
									this.BleRead(resolve)
								});
								readcnt++
							}
							if (this.verifySuccess) {
								console.log('读取成功', offset)
								offset += programmeLength;
								let prg = parseInt(offset / byteBuffer.length * 50);
								// showLoading.setTitle("蓝灯闪烁 \n  正在更新" + prg + "%  ");
								// console.log('写入数据进度', offset / byteBuffer.length);
							} else {
								write_statue = false
								cnt++;
								console.log('写入成功5次没读取成功，即将重写')
							}
						} else {
							offset += programmeLength;
							let prg = parseInt(offset / byteBuffer.length * 50);
							// showLoading.setTitle("蓝灯闪烁 \n  正在更新" + prg + "%  ");
							console.log('写入数据进度', offset / byteBuffer.length);
						}
						console.log('写入成功', offset)

					} else {
						cnt++;
						console.log('写入数据失败休息一会继续写入', offset / byteBuffer.length);
						await new Promise((resolve) => setTimeout(resolve, 100));
					}
					if (cnt > 5) {
						//写入2次都不成功 从擦除开始重来
						console.log('写入失败重新擦除')
						//this.startOTAUpdate()
						return
						// this.startUpdate()
					}
				}
				console.log('发送结束', cnt);
			},
			async hexRead() {
				var offset = 0;
				console.log('offset', offset);
				let startAddr = CMD_BLOCK_SIZE;
				let byteBuffer = this.byteBuffer;
				let retry_cnt = 0
				while (offset < byteBuffer.length) {
					//有效数据的长度
					const programmeLength = Math.min(240, byteBuffer.length - offset);
					const programmeCommand = getVerifyCommand2(offset + startAddr, byteBuffer, offset,
						programmeLength);
					//向蓝牙写入数据 写入失败应该继续从写
					// console.log('programmeCommand', programmeCommand);
					let write_statue = await this.BleWrite(programmeCommand)
					// await new Promise((resolve) => setTimeout(resolve, 40));
					if (write_statue) {
						retry_cnt = 0
						offset += programmeLength;
						let prg = parseInt(offset / byteBuffer.length * 50 + 50);
						this.showCustomLoading("蓝灯闪烁 \n   正在更新" + prg + "%  ", true);
						this.updateLoadingProgress(prg);
						// console.log('验证数据进度', offset / byteBuffer.length);
					} else {
						retry_cnt++;
						console.log(`验证数据失败，重试第${retry_cnt}次，进度: ${(offset / byteBuffer.length * 100).toFixed(1)}%`);

						if (retry_cnt > 5) {
							console.log('验证失败次数过多，终止升级');
							this.hideCustomLoading();
							uni.showToast({
								title: '固件验证失败，请重试',
								icon: 'none'
							});
							return false;
						}

						// 增加延迟时间，给蓝牙连接恢复的时间
						const delayTime = Math.min(200 + retry_cnt * 100, 1000);
						await new Promise((resolve) => setTimeout(resolve, delayTime));
					}

				}
				console.log('验证发送结束', retry_cnt);
				return true
			},
			readListCsv(path) {
				let reader = null;
				let data = [];
				// #ifdef APP-PLUS
				return new Promise((resolve, reject) => {
					plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, fs => {
						fs.root.getFile(path, {
							create: true
						}, fileEntry => {
							fileEntry.file(function(file) {
								reader = new plus.io.FileReader();
								reader.onloadend = function(evt) {
									const hexStr = evt.target.result;
									const lines = hexStr.split("\n");
									let minAddr = -1;
									let maxAddr = -1;
									let maxAddr_Data_Len = 0;
									try {
										//处理文件内容的逻辑
										let l_addr = 0;
										for (let i = 0; i < lines.length; i++) {

											const hexStr = lines[i].trim();
											// console.log('hexStr',hexStr)
											const fileStruct = {};
											fileStruct.format = 0x00;
											fileStruct.length = parseInt(hexStr
												.substring(1, 3), 16);
											fileStruct.offset = parseInt(hexStr
												.substring(3, 7), 16);
											fileStruct.type = parseInt(hexStr
												.substring(7, 9), 16);
											fileStruct.data = hexString2ByteArray(
												hexStr.substring(9, 9 + fileStruct
													.length * 2));
											fileStruct.check = parseInt(hexStr
												.substring(9 + fileStruct.length *
													2, 9 + fileStruct.length * 2 +
													2), 16);

											const type = fileStruct.type;
											// console.log('fileStruct.format',fileStruct.format);
											if (type === 0x00) {
												if (fileStruct.format === 0x00) {
													l_addr = fileStruct.offset;
													// console.log('l_ddr',l_addr)
												} else if (fileStruct.format ===
													0x02) {
													l_addr = (fileStruct.address <<
															4) +
														fileStruct.offset;
													console.log('l_ddr2', l_addr)
												} else if (fileStruct.format ===
													0x04) {
													l_addr = (fileStruct.address <<
															16) +
														fileStruct.offset;
													console.log('l_ddr3', l_addr)
												} else {
													throw new Error("Invalid type!");
												}

												if (minAddr < 0) {
													minAddr = l_addr;
													// console.log('我没进来？')
												} else {
													minAddr = Math.min(l_addr,
														minAddr);
													// if(minAddr===0)
													// {
													// 	console.log('在这给0了',l_addr);
													// }
												}

												// if (maxAddr < 0) {
												// 	maxAddr = l_addr;
												// 	maxAddr_Data_Len = fileStruct.data.length;
												// } else {
												// 	maxAddr = Math.max(l_addr, maxAddr);
												// 	if (l_addr === maxAddr) {
												// 		maxAddr_Data_Len = fileStruct.data.length;
												// 	}
												// }
											} else if (type === 0x01) {
												fileStruct.format = 0x01;
												break;
											} else if (type === 0x02) {
												if (fileStruct.length !== 0x02) {
													throw new Error(
														"Incorrect length for extended segment address record!"
													);
												}
												if (fileStruct.offset !== 0x0000) {
													throw new Error(
														"Incorrect address for extended segment address record!"
													);
												}
												fileStruct.format = 0x02;
												fileStruct.address = (fileStruct.data[
														0] <<
													8) | fileStruct.data[1];
											} else if (type === 0x03) {
												console.log(
													"Start Segment Address record: ignored"
												);
											} else if (type === 0x04) {
												if (fileStruct.length !== 0x02) {
													throw new Error(
														"Incorrect length for extended linear address record!"
													);
												}
												if (fileStruct.offset !== 0x0000) {
													throw new Error(
														"Incorrect address for extended linear address record!"
													);
												}
												fileStruct.format = 0x04;
												fileStruct.address = (fileStruct.data[
														0] <<
													8) | fileStruct.data[1];
											} else if (type === 0x05) {
												console.log(
													"Start Linear Address record: ignored"
												);
											} else {
												throw new Error("Undefined type!");
											}
										}

										resolve(minAddr);
									} catch (error) {
										reject(error);
									}


								};
								reader.readAsText(file, "UTF-8");
							}, function(err) {
								reject(new Error("Failed to get"));
							});
						}, function(err) {
							reject(new Error("Failed to get file entry"));
						})
					}, function(err) {
						reject(new Error("Failed to request file system"));
					})
				})
				// #endif
			},
			async parseHexFile(path) {
				let reader = null;
				let buffawait = null;

				// path="./../myApp.app/www/"+path;
				//#ifndef APP-HARMONY
				buffawait = await new Promise((resolve, reject) => {
					plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
						let a = fs.root.toURL();
						path = path.substring(5);
						fs.root.getFile(path, {
							create: false
						}, fileEntry => {
							fileEntry.file(function(file) {
								reader = new plus.io.FileReader();
								reader.readAsText(file, 'UTF-8');
								reader.onloadend = function(evt) {
									try {
										const hexStr = evt.target.result;
										// console.log('filepath',path);
										// console.log('evt.target',evt);
										// console.log('all hexStr',hexStr);
										const lines = hexStr.split('\n');
										const list = [];
										let totalLen = 0;
										let minAddr = -1;
										let maxAddr = -1;
										let maxAddrDataLen = 0;
										const fileStruct = {};
										fileStruct.format = 0x00;

										for (const line of lines) {

											const hexStr = line.trim();
											fileStruct.length = parseInt(hexStr
												.substring(1, 3), 16);
											fileStruct.offset = parseInt(hexStr
												.substring(3, 7), 16);
											fileStruct.type = parseInt(hexStr
												.substring(7, 9), 16);
											fileStruct.data = hexString2ByteArray(
												hexStr.substring(9, 9 +
													fileStruct.length * 2));
											fileStruct.check = parseInt(hexStr
												.substring(9 + fileStruct
													.length * 2, 9 + fileStruct
													.length * 2 + 2), 16);
											let l_addr = 0;

											let type = fileStruct.type;
											if (type === 0x00) {
												if (fileStruct.format === 0x00) {
													l_addr = fileStruct.offset;
												} else if (fileStruct.format ===
													0x02) {
													l_addr = (fileStruct.address <<
														4) + fileStruct.offset;
												} else if (fileStruct.format ===
													0x04) {
													l_addr = (fileStruct.address <<
														16) + fileStruct.offset;
												} else {
													throw new Error(
														'Invalid type!');
												}

												if (minAddr < 0) {
													minAddr = l_addr;
												} else {
													minAddr = Math.min(l_addr,
														minAddr);
												}

												if (maxAddr < 0) {
													maxAddr = l_addr;
													maxAddrDataLen = fileStruct
														.data.length;
												} else {
													maxAddr = Math.max(l_addr,
														maxAddr);
													if (l_addr === maxAddr) {
														maxAddrDataLen = fileStruct
															.data.length;
													}
												}
												const hexRec = {
													addr: l_addr,
													len: fileStruct.length,
													data: fileStruct.data,
												};
												list.push(hexRec);
												totalLen += fileStruct.data.length;
											} else if (type === 0x01) {
												// File end record, break the loop
												break;
											} else if (type === 0x02) {
												if (fileStruct.length !== 0x02) {
													throw new Error(
														'Incorrect length for extended segment address record!'
													);
												}
												if (fileStruct.offset !== 0x0000) {
													throw new Error(
														'Incorrect address for extended segment address record!'
													);
												}

												fileStruct.format = 0x02;
												fileStruct.address = (fileStruct
														.data[0] << 8) | fileStruct
													.data[1];
											} else if (type === 0x03) {
												// Start segment address record, ignored
											} else if (type === 0x04) {
												if (fileStruct.length !== 0x02) {
													throw new Error(
														'Incorrect length for extended linear address record!'
													);
												}
												if (fileStruct.offset !== 0x0000) {
													throw new Error(
														'Incorrect address for extended linear address record!'
													);
												}

												fileStruct.format = 0x04;
												fileStruct.address = (fileStruct
														.data[0] << 8) | fileStruct
													.data[1];
											} else if (type === 0x05) {
												// Start linear address record, ignored
											} else {
												throw new Error('Undefined type!');
											}
										}

										console.log('Total size:', totalLen);
										console.log('Min address:', minAddr);
										console.log('Max address:', maxAddr);
										console.log('maxAddrDataLen',
											maxAddrDataLen);
										const realSize = maxAddr - minAddr +
											maxAddrDataLen;
										// console.log('realSize',realSize);
										if (realSize !== totalLen) {
											console.log(
												'Hex file addresses are not continuous:',
												'realSize->', realSize,
												'totalLen', totalLen);
										}
										totalLen = Math.max(realSize, totalLen);

										const buffer2 = new Uint8Array(totalLen);
										for (const element of list) {
											const offset = element.addr - minAddr;
											buffer2.set(element.data, offset);
										}
										// return ;
										resolve(buffer2);
									} catch (error) {
										reject(error);
									}

								};
								reader.onerror = function() {
									console.log(' read error');
								};
							}, function(err) {
								reject(new Error("Failed to get"));
							});
						}, function(err) {
							console.log('Failed to get file entry err', err);
							reject(new Error("Failed to get file entry"));
						})
					}, function(err) {
						reject(new Error("Failed to request file system"));
					})
				})
				//#endif
				//#ifdef APP-HARMONY
				buffawait= await new Promise((resolve,reject)=>{
					let manager = uni.getFileSystemManager()
					manager.readFile({
						encoding: "utf-8",
						filePath: path,
						success:(result)=>{
							try{
								const hexStr = evt.target.result;
								// console.log('filepath',path);
								// console.log('evt.target',evt);
								// console.log('all hexStr',hexStr);
								const lines = hexStr.split('\n');
								const list = [];
								let totalLen = 0;
								let minAddr = -1;
								let maxAddr = -1;
								let maxAddrDataLen = 0;
								const fileStruct = {};
								fileStruct.format = 0x00;
								
								for (const line of lines) {
								
									const hexStr = line.trim();
									fileStruct.length = parseInt(hexStr
										.substring(1, 3), 16);
									fileStruct.offset = parseInt(hexStr
										.substring(3, 7), 16);
									fileStruct.type = parseInt(hexStr
										.substring(7, 9), 16);
									fileStruct.data = hexString2ByteArray(
										hexStr.substring(9, 9 +
											fileStruct.length * 2));
									fileStruct.check = parseInt(hexStr
										.substring(9 + fileStruct
											.length * 2, 9 + fileStruct
											.length * 2 + 2), 16);
									let l_addr = 0;
								
									let type = fileStruct.type;
									if (type === 0x00) {
										if (fileStruct.format === 0x00) {
											l_addr = fileStruct.offset;
										} else if (fileStruct.format ===
											0x02) {
											l_addr = (fileStruct.address <<
												4) + fileStruct.offset;
										} else if (fileStruct.format ===
											0x04) {
											l_addr = (fileStruct.address <<
												16) + fileStruct.offset;
										} else {
											throw new Error(
												'Invalid type!');
										}
								
										if (minAddr < 0) {
											minAddr = l_addr;
										} else {
											minAddr = Math.min(l_addr,
												minAddr);
										}
								
										if (maxAddr < 0) {
											maxAddr = l_addr;
											maxAddrDataLen = fileStruct
												.data.length;
										} else {
											maxAddr = Math.max(l_addr,
												maxAddr);
											if (l_addr === maxAddr) {
												maxAddrDataLen = fileStruct
													.data.length;
											}
										}
										const hexRec = {
											addr: l_addr,
											len: fileStruct.length,
											data: fileStruct.data,
										};
										list.push(hexRec);
										totalLen += fileStruct.data.length;
									} else if (type === 0x01) {
										// File end record, break the loop
										break;
									} else if (type === 0x02) {
										if (fileStruct.length !== 0x02) {
											throw new Error(
												'Incorrect length for extended segment address record!'
											);
										}
										if (fileStruct.offset !== 0x0000) {
											throw new Error(
												'Incorrect address for extended segment address record!'
											);
										}
								
										fileStruct.format = 0x02;
										fileStruct.address = (fileStruct
												.data[0] << 8) | fileStruct
											.data[1];
									} else if (type === 0x03) {
										// Start segment address record, ignored
									} else if (type === 0x04) {
										if (fileStruct.length !== 0x02) {
											throw new Error(
												'Incorrect length for extended linear address record!'
											);
										}
										if (fileStruct.offset !== 0x0000) {
											throw new Error(
												'Incorrect address for extended linear address record!'
											);
										}
								
										fileStruct.format = 0x04;
										fileStruct.address = (fileStruct
												.data[0] << 8) | fileStruct
											.data[1];
									} else if (type === 0x05) {
										// Start linear address record, ignored
									} else {
										throw new Error('Undefined type!');
									}
								}
								
								console.log('Total size:', totalLen);
								console.log('Min address:', minAddr);
								console.log('Max address:', maxAddr);
								console.log('maxAddrDataLen',
									maxAddrDataLen);
								const realSize = maxAddr - minAddr +
									maxAddrDataLen;
								// console.log('realSize',realSize);
								if (realSize !== totalLen) {
									console.log(
										'Hex file addresses are not continuous:',
										'realSize->', realSize,
										'totalLen', totalLen);
								}
								totalLen = Math.max(realSize, totalLen);
								
								const buffer2 = new Uint8Array(totalLen);
								for (const element of list) {
									const offset = element.addr - minAddr;
									buffer2.set(element.data, offset);
								}
								// return ;
								resolve(buffer2);
							}catch(err){
								reject(err)
							}
						},
						fail:(err)=>{
							reject(err)
						}
					})
				})
				//#endif

				return buffawait;
			},
			postFirmwareVersion() {
				let that = this
				let requesturl = getApp().globalData.internet + getApp().globalData.firmwarVersion;
				let para = {
					serial_code: this.deviceSerialCode,
					version: this.newVersion
				}
				console.log('url', requesturl, para)
				uni.request({
					url: requesturl, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: JSON.stringify(para),
					header: {
						'Content-Type': 'application/json' //重点
					},
					success: (res) => {
						console.log('res', res)
						that.hideCustomLoading();
						clearInterval(this.intervalId);
						// 引导用户手动返回或重启
						uni.showModal({
							title: '提示',
							//#ifndef APP-HARMONY
							content: '固件更新已完成，建议您手动重启应用',
							//#endif
							//#ifdef APP-HARMONY
							content: '固件更新已完成，点击确定重启应用',
							//#endif
							showCancel: false,
							success: function() {
								// 返回首页或其他适当页面
								that.isUping = false;
								getApp().globalData.queryIsUpdate = true;
								getApp().globalData.redCircleShow = false;
								//#ifndef APP-HARMONY
								uni.reLaunch({
									url: '/pages/index/index'
								});
								//#endif
								//#ifdef APP-HARMONY
								$uni.restartApp()
								//#endif
							}
						});
					},
					fail: ((err) => {
						console.log('推送固件版本出错')
					})
				});
				if (that.ruteNumber === 1 && that.newVersion > 45) {
					//把连接模式设置未长连接
					let data = {
						serial_code: that.deviceSerialCode,
						connect_mode: 1
					}
					let setConnectUrl = getApp().globalData.internet + getApp().globalData
						.switchConnectModel;
					util.requestDataJson(setConnectUrl, data).then((rebackData) => {
						if (rebackData.statusCode === 200 && rebackData.data.code === 200) {

						} else {
							uni.showModal({
								content: recivedata.data.msg,
							})
							console.log('设置高频模式失败', recivedata.data.msg)
						}

					}, (err) => {
						console.log('设置设备长连接失败err', err)
					})
				}
			},
			convertToFormat(head, str) {
				var constr = "";
				for (var i = 0; i < str.length; i++) {
					var char = str.charAt(i);
					if (char >= 'a' && char <= 'z') {
						char = char.toUpperCase();
					}
					constr += char;
				}

				var result = head + '-' + constr.slice(6);
				return result;
			},
			async verifyRead(awaitTime = 3000, maxRetry = 2) {
				if (!this.verifySuccess) {
					console.log('写入没成功')
					return false
				}
				this.verifySuccess = false
				let cnt = 0
				for (let retry = 0; retry <= maxRetry; retry++) {
					try {
						// 等待设备响应
						await new Promise(resolve => setTimeout(resolve, awaitTime));
						await new Promise((resolve) => {
							this.BleRead(resolve)
						});
						// await new Promise(resolve => setTimeout(resolve, 100)); //读取成功之后需要监听函数里更改 success的状态，所以延迟一下
						console.log('即将返回true', cnt)
						cnt++
						return true; // 读取成功
					} catch (error) {
						console.log(`verifyRead 失败 (${retry + 1}/${maxRetry + 1}):`, error);
						// 最后一次重试仍失败
						if (retry === maxRetry) {
							return false;
						}
						// 添加重试延迟
						await new Promise(resolve => setTimeout(resolve, 1000));
					}
				}
				return false;
			},
			async connectCb() {
				console.log('连接成功')
				try {
					this.verifySuccess = false
					let retry = 0;
					if (this.isUping) {
						//确认一下啊bytebuffer 是否存在
						this.characteristicIdwrite = '0000FEE1-0000-1000-8000-00805F9B34FB'
						this.characteristicIdread = '0000FEE1-0000-1000-8000-00805F9B34FB'
						let byteBuffer = null;
						let progress = 0
						const MAXRETRY = 3
						console.log('this.firmwareUrl', this.firmwareUrl)
						byteBuffer = await parseHexFile(this.firmwareUrl)
						this.byteBuffer = byteBuffer
						if (byteBuffer) {
							this.updateStep = 0
							while (this.updateStep <= 4 && retry < MAXRETRY) {
								switch (this.updateStep) {
									case 0:
										console.log(`开始升级`)
										this.verifySuccess = await this.sendStartUpdate()
										console.log("this.verifySuccess", this.verifySuccess)
										this.showCustomLoading("写入升级");
										//先写再读的 确认模式
										await this.verifyRead()
										break
									case 1:
										console.log(`开始擦除`)
										this.verifySuccess = await this.sendErase()
										console.log('写入擦除', this.verifySuccess)
										this.showCustomLoading("写入擦除");
										await this.verifyRead()
										break
									case 2:
										this.verifySuccess = await this.hexWrite();
										console.log(`开始传输`)

										break
									case 3:
										console.log(`开始校验`)
										this.verifySuccess = await this.hexRead();
										await this.verifyRead()
										console.log('验证结果', this.verifySuccess)
										if (this.verifySuccess)
											this.showCustomLoading("验证成功");
										else
											this.showCustomLoading("验证失败");
										break
									case 4:
										console.log('等待重启')
										this.verifySuccess = await this.Blend()

										//发出结束指令
										this.showCustomLoading("开始重启");
										//新版本需要读，旧版本不读
										console.log('this.CurrentImageInfo.IAP_VER', this.CurrentImageInfo.IAP_VER)
										// if (this.CurrentImageInfo.IAP_VER === 40)
										// 	await this.verifyRead(100, 1)
										break
								}
								await new Promise(resolve => setTimeout(resolve, 600));
								console.log('设置新步骤，', this.updateStep, this.verifySuccess)
								if (this.verifySuccess) {
									this.updateStep++;
									retry = 0; // 重置重试
									if (this.updateStep > 4) { // 升级完成
										console.log('升级成功');
										this.postFirmwareVersion()
										break;
									}
								} else {
									this.updateStep = 1
									retry++;
								}
							}
							if (retry >= MAXRETRY) {
								console.error('升级失败，超过最大重试次数');
								this.showCustomLoading('升级失败，超过最大重试次数');
							}
							if (!this.verifySuccess) {
								console.log('升级失败,失败位置', this.updateStep)
								let ss = "开始"
								if (this.updateStep === 1)
									ss = "擦除"
								else if (this.updateStep === 2)
									ss = "编程"
								else if (this.updateStep === 3)
									ss = "校验"
								else if (this.updateStep === 4)
									ss = "重启"
								else
									ss = "结束"
								this.showCustomLoading('升级失败,失败位置' + ss);
							}
						} else {
							console.log('下载文件失败')
							this.showCustomLoading('下载文件失败');
						}
					} else {
						let info = uni.getDeviceInfo()
						if (info.platform == "ios") {
							console.log('that.characteristicIdwrite');
							this.characteristicIdwrite = '0000FFE3-0000-1000-8000-00805F9B34FB'
							setTimeout(() => {
								this.notifyBLECharacteristicValueChanges(this.deviceId, this.serviceId, this
									.characteristicIdnotify)
							}, 2000)
						} else {
							this.characteristicIdwrite = '0000FFE3-0000-1000-8000-00805F9B34FB'
							const buffer = new ArrayBuffer(1)
							const dataView = new DataView(buffer)
							dataView.setUint8(0, 0)
							this.BleWrite(buffer)
						}
					}
				} catch (error) {
					console.error(`步骤 ${this.updateStep} 失败:`, error);
					this.showCustomLoading(`步骤 ${this.updateStep} 失败:` + error);
					this.verifySuccess = false;
					if (error === 'timeout') {
						console.warn('设备响应超时');
					}
				}
			},
			checkOhBlueTooth() {
				return new Promise((resolve, reject) => {
					try{
						$uni.getBluetoothState({
							success(res) {
								let bluetoothEnable = false
								if (res == BluetoothStateEnum.STATE_ON) {
									bluetoothEnable = true
								} else {
									bluetoothEnable = false
								}
								resolve(bluetoothEnable)
							},
							fail(err) {
								console.log("getBluetoothState", err)
								reject(err)
							}
						})
					}catch(err){
						reject(err)
					}
				})
			},
			async callBack(index) {
				// if(getApp().globalData.queryIsUpdate===false&&this.myVersion!=this.newVersion)
				//#ifdef APP-HARMONY
				let bluetooth = await this.checkOhBlueTooth()
				if (bluetooth == false) {
					this.hideCustomLoading();
					uni.showToast({
						title:'固件升级需要开启蓝牙，请启动蓝牙后尝试！'
					})
					return
				}
				//#endif
				let that = this
				this.showCustomLoading("正在检查资源");
				let locate = await util.checkLocationServiceForAndroid()
				console.log("定位服务开关", locate)
				if (locate) {
					util.openBluetoothAdapter().then(() => {
						this.hideCustomLoading();
						return new Promise((resolve, reject) => {
							uni.showModal({
								title: '开始更新',
								content: '请点击确认后耐心等待',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										resolve(res);
									} else {
										console.log('用户点击取消');
										reject(res);
									}
								},
							});

						}).then(res => {
							//开启一个时钟
							that.intervalId = setInterval(() => {
								that.hideCustomLoading();
								//#ifdef APP-PLUS
								plus.nativeUI.alert(
									"1 请确认手机中没有蓝牙记录！\n2 请确保手机和设备距离够近!\n3 请检查后重新更新！",
									function() {
										clearTimeout(that.TimeoutDateLine)
										that.TimeoutDateLine = setTimeout(function() {
											if (uni.getSystemInfoSync()
												.platform == 'ios') {
												plus.ios.import(
														"UIApplication")
													.sharedApplication()
													.performSelector("exit")
											} else if (uni.getSystemInfoSync()
												.platform ==
												'android') {
												plus.runtime.quit();
											} else if (uni.getSystemInfoSync()
												.platform ==
												'harmonyos') {
												plus.runtime.quit();
											}
										}, 500)
									}, '更新未成功', '确定');
								clearInterval(that.intervalId);
								//#endif
								//#ifdef APP-HARMONY
								uni.showModal({
									title: "更新未成功",
									content: "1 请确认手机中没有蓝牙记录！\n2 请确保手机和设备距离够近!\n3 请检查后重新更新！",
									success(res) {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
								//#endif
							}, 1000 * 60 * 5);
							getApp().globalData.openFirewareBluebooth = true;
							getApp().globalData.openLadarBluetooth = false;
							console.log(JSON.stringify(that.tamp_did_list) + "-----------------")
							console.log('that.tamp_did_list',that.tamp_did_list)
							that.connectBlueTooth.name = that.convertToFormat('CYY', that.tamp_did_list.serialCode);
							that.OTABlueTooth.name = that.convertToFormat('OTA', that.tamp_did_list.serialCode);
							that.deviceSerialCode = that.tamp_did_list.serialCode;
							console.log('this.connectBlueTooth.name', that.connectBlueTooth.name);
							var query = getApp().globalData.downloadFirewareUrl
							// query='https://cyy-prod.oss-cn-hangzhou.aliyuncs.com/static/firmware/OTA_APP_chomoon_5000.hex'
							console.log('下载地址', query);
							that.showCustomLoading("连接服务器中...");
							uni.downloadFile({
								url: query, //仅为示例，并非真实的资源
								success: (res) => {
									if (res.statusCode === 200) {
										that.firmwareUrl = res.tempFilePath;
										console.log('相对文件路径', res.tempFilePath)
										let systemurl = plus.io
											.convertLocalFileSystemURL(res
												.tempFilePath)
										console.log('绝对路径', systemurl)
										that.showCustomLoading('更新初始化中...');
										that.initBle();
									}
								},
								fail(err) {
									console.log('下载文件失败', err);
									that.showCustomLoading('固件文件失败');
								}
							});

						}).catch((err) => {
							// that.$refs.modal.show({
							// 	title: '温馨提示',
							// 	content: err,
							// 	showCancel: true,
							// 	confirmText: '确认',
							// 	cancelText: '取消',
							// 	showFooter: false,
							// 	duration: 2000,
							// })
							console.log(err)
						})
					}).catch((e) => {
						console.log('请打开手机蓝牙', e)
						that.hideCustomLoading();
						that.$refs.modal.show({
							title: '温馨提示',
							content: '请检查蓝牙开关以及蓝牙权限',
							showCancel: true,
							confirmText: '确认',
							cancelText: '取消',
							showFooter: false,
							duration: 4000,
						})
					})

				} else {
					that.hideCustomLoading();
					that.$refs.modal.show({
						title: '温馨提示',
						content: '无法获取定位服务，请检查定位服务和信号',
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: false,
						duration: 4000,
					})
				}
			},
			returnParent() {
				getApp().backParents();
			},
			stopBluetooth(cb) {
				closeBLEConnection(this.deviceId).then((res) => {
					console.log('主动断开蓝牙')
				})
				stopBluetoothDevicesDiscovery()
				closeBluetoothAdapter().then((res) => {
					console.log('调用关闭适配器结束')
					getApp().globalData.blebluetoothConnect = false
					cb && cb()
				}).catch((err) => {
					console.log('closeBluetoothAdapter fail', err)
				})
			},
			initBle() {
				console.log('--------------------初始化蓝牙----------------');
				this.bleDevs = [];
				let that = this
				console.log('即将重启蓝牙')
				closeBluetoothAdapter().then((res)=>{
					openBluetoothAdapter().then((res) => {
						that.showCustomLoading('适配状态成功');
						setTimeout(() => {
							that.startBluetoothDeviceDiscovery()
						}, 1000)
					
					}).catch((err) => {
						that.showCustomLoading('打开蓝牙失败');
					})
				})
				
				// this.stopBluetooth(() => {
				// 	console.log('即将重启蓝牙')
				// 	openBluetoothAdapter().then((res) => {
				// 		that.showCustomLoading('适配状态成功');
				// 		setTimeout(() => {
				// 			that.startBluetoothDeviceDiscovery()
				// 		}, 1000)

				// 	}).catch((err) => {
				// 		that.showCustomLoading('打开蓝牙失败');
				// 	})
				// })
			},
			// 开始搜索蓝牙设备
			startBluetoothDeviceDiscovery() {
				let _this = this
				startBluetoothDevicesDiscovery().then((res) => {
					_this.showCustomLoading('打开搜索成功');
					console.log('搜索蓝牙外围设备完成', getApp().globalData.openFirewareBluebooth);

				}).catch((err) => {
					console.log(err)
					_this.hideCustomLoading();
				})
			},
			//选择设备连接把deviceId传进来
			createBLEConnection(deviceId) {
				let that = this;
				createBLEConnection(deviceId).then((res) => {

				})
			},
			// 获取蓝牙的所有服务
			async getBLEDeviceServices(deviceId) {
				const that = this;
				try {
					// 1. 获取设备服务
					const servicesRes = await new Promise((resolve, reject) => {
						getBLEDeviceServices(deviceId).then((res) => {
							resolve(res)
						}).catch((err) => {
							reject(err)
						})
					});
					console.log("uni获取服务成功", servicesRes);
					that.showCustomLoading('获取服务成功');
					// 2. 检查服务特征
					that.isUping = servicesRes.services.some(
						item => item.uuid.substring(4, 7) === 'FEE'
					);
					let info = uni.getDeviceInfo()
					// 3. 设置MTU（仅Android）
					if (this.platform !== 'ios') {
						try {
							await new Promise((resolve, reject) => {
								setBLEMTU(deviceId, 247).then((res) => {
									resolve(res)
								}).catch((err) => {
									reject(err)
								})
							});
							that.showCustomLoading('蓝灯闪烁 \n 设置传输成功');
						} catch (err) {
							console.log('set blemtu fail', err);
							that.showCustomLoading('设置传输失败');
							// 即使MTU设置失败，也继续后续流程
						}
					}
					// 4. 处理服务列表
					if (servicesRes.services.length === 0) {
						that.showCustomLoading('设备服务为空');
						that.initBle();
						return;
					}
					// 5. 确定要使用的服务ID
					const serviceId = that.isUping ?
						'0000FEE0-0000-1000-8000-00805F9B34FB' :
						'0000FFE0-0000-1000-8000-00805F9B34FB';
					that.serviceId = serviceId;
					that.showCustomLoading('蓝灯闪烁 \n 设备服务存在');

					// 6. 获取服务特征（延迟3秒）
					setTimeout(() => {
						this.getBLEDeviceCharacteristicses(deviceId, serviceId);
					}, 3000);

				} catch (error) {
					console.log("获取蓝牙Service失败", error);
					that.showCustomLoading('获取服务失败');
					// 可以根据需要添加重试逻辑
				}
			},
			async sendStartUpdate() {
				console.log('into is uping')
				const getInfo = getStartCommand();
				let write_statue = await this.BleWrite(getInfo)
				let verifySuccessCount = 5
				for (let i = 0; i < verifySuccessCount; i++) {
					if (!write_statue) {
						await new Promise((resolve) => setTimeout(resolve, 100));
						write_statue = await this.BleWrite(getInfo)
					} else
						return write_statue
				}
				return write_statue
			},
			//获取蓝牙特征
			getBLEDeviceCharacteristicses(deviceId, serviceId) {
				console.log("------------------进入特征------------------", deviceId);
				console.log("------------------进入特征------------------", serviceId);
				let that = this;
				// that.characteristics = res.characteristics
				// 这里哪个特征支持notify或indicate  就选择哪个
				// that.characteristicIdread = res.characteristics[0].uuid // 接收数据的特征uuid
				// that.characteristicIdwrite = res.characteristics[1].uuid //发送数据的特征uuid
				getBLEDeviceCharacteristics(deviceId, serviceId).then((res) => {

					console.log("res.characteristics.", res.characteristics)
					that.showCustomLoading("获取特征成功");
					that.connectCb()
					// if (that.isUping) { //获取imageinfo和文件
					// 	 that.startUpdate()
					// 	//开始传输文件
					// } else if (plus.os.name == 'Android') {
					// 	console.log('that.characteristicIdwrite');
					// 	that.characteristicIdwrite = '0000FFE3-0000-1000-8000-00805F9B34FB'
					// 	setTimeout(() => {
					// 		that.notifyBLECharacteristicValueChange(deviceId, serviceId, that
					// 			.characteristicIdnotify)
					// 	}, 2000)

					// } else {
					// 	try {
					// 		that.characteristicIdwrite = '0000FFE3-0000-1000-8000-00805F9B34FB'
					// 		const buffer = new ArrayBuffer(1)
					// 		const dataView = new DataView(buffer)
					// 		dataView.setUint8(0, 0)
					// 		util.BleWrite(deviceId, serviceId, that.characteristicIdwrite, buffer)
					// 	} catch (e) {
					// 		console.log('err', e);
					// 	}

					// }
				}).catch((err) => {
					console.log(res)
					that.showCustomLoading('获取特征失败');
				})
			},
			// 启用 notify 功能
			notifyBLECharacteristicValueChanges(deviceId, serviceId, characteristicId) {
				let that = this
				notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId).then((res) => {

					//监听设备发送数据
					console.log('启用notice')
					that.showCustomLoading('重启设备成功');
					setTimeout(() => {
						const buffer = new ArrayBuffer(1)
						const dataView = new DataView(buffer)
						dataView.setUint8(0, 0)
						this.BleWrite(buffer)
						//发送00 来切换到升级状态

						// that.BleWrite(buffer);
					}, 3000);

				}).catch((err) => {
					console.log('启用 notify 功能失败', res)
					that.showCustomLoading('启用notify不成功');
					uni.showToast({
						icon: 'none',
						title: '设备暂不支持接收数据',
						duration: 3000
					})
				})
			},
			// 二进制流转ascii
			ab2ascii(buffer) {
				var str = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return String.fromCharCode(bit);
					}
				)
				return str.join('');
			},
			closeBleAbove(closeFirewareB) {

				if (closeFirewareB) {
					uni.$off("firewareDevice");
					uni.$off('firwareCharacter');
					uni.$off('firwareConnect');
					getApp().globalData.openFirewareBluebooth = false;
				}
				//断开连接
				closeBLEConnection(this.deviceId).then((res) => {

					console.log('断开蓝牙连接成功', res)

				}).catch((err) => {
					console.log('断开蓝牙失败', res)
				})
				//stop discover
				stopBluetoothDevicesDiscovery().then((res) => {
					console.log('停止搜索蓝牙', res)

				})
				closeBluetoothAdapter({
					success(res) {
						console.log('关闭蓝牙模块', res);
					}
				})

			},
			BleRead1() {
				console.log('into read')
				let Time = new Date();
				let timestemp = Time.getTime();
				readBLECharacteristicValue(this.deviceId, this.serviceId, this.characteristicIdread).then((res) => {

					let Time2 = new Date();
					let timestemp2 = Time2.getTime() - timestemp;
					console.log('我读一个信息时间', timestemp2);
					console.log('readBLECharacteristicValue success:', res)
				}).catch((err) => {
					console.log('readBLECharacteristicValue fail:', err)
				})
			},
			//从蓝牙读取数据
			BleRead(resolve) {
				console.log('into read')
				let Time = new Date();
				let timestemp = Time.getTime();
				readBLECharacteristicValue(this.deviceId, this.serviceId, this.characteristicIdread).then((res) => {
					let Time2 = new Date();
					let timestemp2 = Time2.getTime() - timestemp;
					console.log('我读一个信息时间', timestemp2);
					console.log('readBLECharacteristicValue success:', res)
					resolve(); // 调用resolve完成Promise
				}).catch((err) => {
					console.log('readBLECharacteristicValue fail:', err)
					resolve(); // 即使失败也要调用resolve完成Promise
				})
			},
			// 向蓝牙写入数据
			async BleWrite(instruction) {
				try {
					//instruction  写入的数据
					let _this = this
					let sendsuccess = false;
					sendsuccess = await new Promise((resolve, reject) => {
						let writetype = 'writeNoResponse ';
						let info = uni.getDeviceInfo()
						if (info.platform == 'ios')
							writetype = 'write'

						// 参数验证
						if (!_this.deviceId || !_this.serviceId || !_this.characteristicIdwrite) {
							console.log('蓝牙参数无效:', {
								deviceId: _this.deviceId,
								serviceId: _this.serviceId,
								characteristicId: _this.characteristicIdwrite
							});
							resolve(false);
							return;
						}

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
						const adapter = info.platform == "harmonyos" ? $uni : uni;
						adapter.writeBLECharacteristicValue({
							deviceId: _this.deviceId, // 蓝牙设备 deviceId
							serviceId: _this.serviceId, // 蓝牙服务uuid
							characteristicId: _this.characteristicIdwrite, // 蓝牙特征值的 (即 writeId)
							value: info.platform == "harmonyos" ? buffer :
							instruction, // 这里的value是ArrayBuffer类型
							writeType: writetype,
							success(res) {
								console.log('写入指令发送成功')
								if (_this.characteristicIdwrite ===
									'0000FFE3-0000-1000-8000-00805F9B34FB') {
									// _this.showLoading.setTitle(' 蓝灯闪烁 \n切换蓝牙运行状态')
								}
							},
							fail(err) {
								console.log('写入指令发送失败', err)
								if (_this.characteristicIdwrite ===
									'0000FFE3-0000-1000-8000-00805F9B34FB') {
									// _this.showLoading.setTitle(' 蓝灯闪烁 \n切换蓝牙运行状态不成功')
								}
								resolve(sendsuccess);
							},
							complete(end) {
								if (end.code) {
									console.log('指令发送失败');
									resolve(false);
								} else {
									console.log('指令发送成功')
									resolve(true);
								}
							}
						})
					})
					// console.log('写入返回值',sendsuccess)
					return sendsuccess;
				} catch (e) {
					console.log('err', e);
				}

			},
			// ascii  转  二进制流
			asciiToArrayBuffer(str) {
				if (!str) {
					return new ArrayBuffer(0);
				}
				var buffer = new ArrayBuffer(str.length);
				// let dataView = new DataView(buffer)
				var bufView = new Uint8Array(buffer);
				for (var i = 0, strLen = str.length; i < strLen; i++) {
					bufView[i] = str.charCodeAt(i);
				}
				return buffer;
			},
		},
		onLoad(data) {
			this.ruteNumber = data.rute
			if (data.rute == 1) {
				getApp().globalData.showDeviceList = [{
					serialCode: data.serialCode
				}]
			}
			// #ifdef APP-HARMONY

			$uni.requestSystemPermission({
				permissions: ['ohos.permission.ACCESS_BLUETOOTH', 'ohos.permission.DISCOVER_BLUETOOTH'],
				accept(allRight, grantedList) {
					console.log("requestSystemPermission allRight", allRight, "grantedList", grantedList)
				},
				refuse(doNotAskAgain, grantedList) {
					console.log("requestSystemPermission doNotAskAgain", doNotAskAgain, "grantedList", grantedList)
				},
				error(error) {
					console.log("requestSystemPermission", error)
				}
			})

			// #endif

			let that = this
			this.ruteNumber = data.rute

			setKeepScreenOn(true);

			console.log(JSON.stringify(getApp().globalData.showDeviceList) + "------------")
			this.tamp_did_list = getApp().globalData.showDeviceList;
			console.log("this.tamp_did_list", this.tamp_did_list);
			if (this.platform === 'android')
				this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
			uni.$on('firwareConnect', function(res) {
				//#ifndef APP-HARMONY
				console.log('recive firwareConnect', res)
				//200毫秒内重复触发只执行一次
				clearTimeout(that.stateChangeTimer);
				that.stateChangeTimer = setTimeout(() => {
					//奇怪的是在蓝牙通过设置发生切换的时候 在ios又只触发一次断开 其他情况都是触发两次
					if (res.connected === false && that.updateStep < 4) {
						that.bluetoothConnect = false
						that.showCustomLoading('蓝牙设备断开了');
						that.showCustomLoading("初始化蓝牙");
						that.initBle();
					}
					if (res.connected === true) {
						that.bluetoothConnect = true
						that.showCustomLoading(' 设备连接成功');
						console.log("蓝牙连接成功", res.deviceId)
						that.deviceId = res.deviceId;
						clearTimeout(that.timeoutSendData)
						that.timeoutSendData = setTimeout(() => {
							//获取服务
							that.getBLEDeviceServices(res.deviceId);
						}, 15000)
					}
				}, 200);
				//#endif
				//#ifdef APP-HARMONY
				console.log('recive firwareConnect', res)
				if (res.connected == false && that.updateStep < 4) {
					that.bluetoothConnect = false
					that.showCustomLoading('蓝牙设备断开了');
					that.showCustomLoading("初始化蓝牙");
					that.initBle();
				}
				if (res.connected == true) {
					that.bluetoothConnect = true
					that.showCustomLoading(' 设备连接成功');
					console.log("蓝牙连接成功", res.deviceId)
					that.deviceId = res.deviceId;
					clearTimeout(that.timeoutSendData)
					that.timeoutSendData = setTimeout(() => {
						//获取服务
						that.getBLEDeviceServices(res.deviceId);
					}, 15000)
				}
				//#endif
			})
			//监听蓝牙发回的消息
			uni.$on('firwareCharacter', function(res) {
				console.log("监听成功", res)
				const byteBuffer56 = new Uint8Array(res.value);
				if (byteBuffer56.length === 2 || byteBuffer56.length === 20) {
					if (byteBuffer56[0] === 2 || (byteBuffer56[0] === 1 && byteBuffer56[19] === CMD_IAP_INFO)) {
						that.verifySuccess = true;
						console.log('得到硬件信息');
						that.CurrentImageInfo.blockSize = (byteBuffer56[6] & 0xff) * 256 + (byteBuffer56[5] &
							0xff);
						console.log('块大小', that.CurrentImageInfo.blockSize);
						that.CurrentImageInfo.IAP_VER = byteBuffer56[9] & 0xff //>=40说明用新固件的升级方法
						console.log("that.CurrentImageInfo.IAP_VER", that.CurrentImageInfo.IAP_VER)
						// const byteBuffer=res.value
						//that.showLoading.setTitle('蓝灯闪烁 \n 固件大小获取')
					} else if (byteBuffer56[0] === 0) {
						that.verifySuccess = true;
						that.showCustomLoading("设备验证成功");
						console.log('收到正确验证')
					} else if (byteBuffer56[0] === 20) {
						that.showCustomLoading("设备验证失败");
						if (byteBuffer56[19] === CMD_IAP_ERASE) {
							if (byteBuffer56[0] === 0xcc) //擦除中
								console.log('正在擦除中') //的继续等待 3秒等不到就重新擦除
							else if (byteBuffer56[0] === 0xff)
								console.log('new长度超范围')
						} else if (byteBuffer56[19] === CMD_IAP_PROM) {
							if (byteBuffer56[0] === 0xfe) //下一帧待写入地址出错 说明前面的帧有的没写对 会返回待写入地址，然后去写这个待写入帧
							{
								console.log("输出需要重写的地址", uint32Value.toString(16)); // 输出: 12345678（十六进制）
								// const dataView = new DataView(byteBuffer56, 1, 4); // 从偏移量1读取4字节
								// const uint32Value = dataView.getUint32(0, true); // true表示小端序
								// const offset = uint32Value - CMD_BLOCK_SIZE
								// const programmeLength = Math.min(240, byteBuffer.length - offset);
								// const programmeCommand = getVerifyCommand2(uint32Value, byteBuffer, offset,programmeLength);
							} //第一第二存需要重新写入的 地址 可能要除16
							else if (byteBuffer56[0] === 0xff)
								console.log('编程长度超范围')
							else
								console.log('编程错误')
						} else if (byteBuffer56[19] === CMD_IAP_VERIFY) {
							console.log('CMD_IAP_VERIFY 错误')
						} else if (byteBuffer56[19] === CMD_IAP_END) {
							console.log("结束错误")
						} else {

							console.log("收到未知类型数据")
						}
					}
				} else {
					console.log("读取的数据格式错误")
				}

				// imageInfo.setBlockSize((response[6] & 0xff)*256+(response[5] & 0xff));
				const hexArr = Array.prototype.map.call(
					new Uint8Array(res.value),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				const str = hexArr.join('-')
				console.log('接收成功', hexArr)

			})
			uni.$on('firewareDevice', function(devices) {
				console.log('监听device find：', that.connectBlueTooth.name);
				console.log('that.OTABlueTooth.name', that.OTABlueTooth.name)
				if (devices.devices[0].name === that.connectBlueTooth.name || devices.devices[0].name === that
					.OTABlueTooth.name || devices.devices[0].name === that.connectBlueTooth.localName || devices
					.devices[0].localName === that
					.OTABlueTooth.name) {
					console.log('find bluetooth', devices.devices[0].name);
					console.log('find target', devices.devices[0]);
					//#ifndef APP-HARMONY
					stopBluetoothDevicesDiscovery()
					clearTimeout(that.timeoutCreatConnect)
					that.timeoutCreatConnect = setTimeout(() => {
						that.createBLEConnection(devices.devices[0].deviceId);
					}, 1000)
					//#endif
					//#ifdef APP-HARMONY
					that.createBLEConnection(devices.devices[0].deviceId);
					clearTimeout(that.timeoutCreatConnect)
					//#endif

				}
			})

		},
		onUnload() {
			clearTimeout(this.timeoutCreatConnect)
			clearTimeout(this.TimeoutDateLine)
			clearTimeout(this.timeoutSendData)
			clearInterval(this.intervalId);
			this.closeBleAbove(true);


		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.row-button {
		display: flex;
		width: 100%;
		justify-content: start;
		margin-left: 0%;
		/* background-color: #49c3bf; */
		margin-top: 40rpx;
		align-items: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.container-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90%;
		/* 	border-radius: 25rpx;
		box-shadow: 5px 5px 5px gray;
		background-color: #49c3bf; */
		margin-top: 20rpx;
	}

	.device-box {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-size: contain;
		background-repeat: no-repeat;
		width: 100%;
		height: 210rpx;
		border-bottom: 2px solid rgba(195, 195, 200, 1.0);
		margin-bottom: 10rpx;
	}

	.container-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 70%;
		border-radius: 25rpx;
		margin-top: 10rpx;
		background-color: rgb(255, 255, 255);
		padding: 20rpx;
	}

	.container-text-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 70%;
		border-radius: 25rpx;
		margin-top: 40rpx;
		padding: 20rpx;
	}

	.message-title {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
	}

	.message {
		width: 90%;
		margin-top: 40rpx;
		border-radius: 25rpx;
		/* background-color: #49c3bf; */
		display: flex;
		justify-content: center;
	}
</style>