import {
	$uni
} from '../utils/main.js';

import {
	writeBLECharacteristicValue,
} from "@/utils/bluetooth.js"
import {
	getPetList
} from '@/api/api/pet.js'

//这个文件申明了app内的公用方法
var K = 15
var maxNum = 5
// utils/ios-permission.js

/**
 * 检查iOS位置权限状态
 * @returns {Promise<{
 *   authorized: boolean,     // 是否有权限
 *   status: string,         // 详细状态
 *   message: string         // 状态描述
 * }>}
 */
function checkIOSLocationPermission() {
	return new Promise((resolve, reject) => {
		// 判断是否是iOS App平台
		const systemInfo = uni.getSystemInfoSync();
		const isIOSApp = systemInfo.platform === 'ios' && systemInfo.uniPlatform === 'app';

		if (!isIOSApp) {
			resolve({
				authorized: false,
				status: 'unsupported',
				message: '非iOS App平台'
			});
			return;
		}

		// 方法1: 使用uni.getLocation检测（推荐，会触发系统权限弹窗）
		uni.getLocation({
			type: 'wgs84',
			altitude: false, // 不获取高度
			success: () => {
				// 能成功获取位置，说明有权限
				resolve({
					authorized: true,
					status: 'authorized',
					message: '已授权位置权限'
				});
			},
			fail: (err) => {
				const errMsg = err.errMsg || '';
				let status = 'unknown';
				let authorized = false;
				let message = '';

				// 解析错误信息判断权限状态
				if (errMsg.includes('PERMISSION_DENIED') ||
					errMsg.includes('权限不足') ||
					errMsg.includes('auth deny') ||
					errMsg.includes('用户拒绝授权')) {
					status = 'denied';
					message = '用户已拒绝位置权限';
				} else if (errMsg.includes('位置服务不可用') ||
					errMsg.includes('LOCATION_SERVICES_DISABLED')) {
					status = 'disabled';
					message = '系统定位服务未开启';
				} else if (errMsg.includes('LOCATION_UNAVAILABLE')) {
					status = 'unavailable';
					message = '无法获取位置信息';
				} else if (errMsg.includes('TIMEOUT')) {
					status = 'timeout';
					message = '获取位置超时';
					// 超时不一定是权限问题
				} else {
					status = 'unknown';
					message = `获取位置失败: ${errMsg}`;
				}

				resolve({
					authorized: false,
					status,
					message
				});
			}
		});
	});
}

/**
 * 请求iOS位置权限（通过getLocation触发系统弹窗）
 * @returns {Promise<boolean>} 是否授权成功
 */
function requestIOSLocationPermission() {
	return new Promise((resolve, reject) => {
		// 方法1: 直接调用getLocation，系统会自动弹出权限请求
		uni.getLocation({
			type: 'wgs84',
			altitude: false,
			success: () => {
				resolve(true);
			},
			fail: (err) => {
				console.log('iOS位置请求失败:', err);

				// 如果用户拒绝，需要引导去设置
				if (err.errMsg && (
						err.errMsg.includes('PERMISSION_DENIED') ||
						err.errMsg.includes('用户拒绝授权') ||
						err.errMsg.includes('auth deny')
					)) {
					// 可以在这里显示引导弹窗
					showIOSPermissionGuide();
				}
				resolve(false);
			}
		});
	});
}

/**
 * 获取精确的iOS权限状态（需要原生插件或特殊处理）
 * 注意：UniApp标准API无法直接获取精确状态，以下为替代方案
 */
function getIOSPermissionStatus() {
	return new Promise((resolve) => {
		// 尝试获取位置，通过结果推断权限状态
		uni.getLocation({
			type: 'wgs84',
			altitude: false,
			success: () => {
				resolve({
					status: 'authorized',
					canUse: true,
					description: '已授权，可以获取位置'
				});
			},
			fail: (err) => {
				const errMsg = err.errMsg || '';

				// 检查是否为"使用期间"或"始终"权限
				// 注意：UniApp无法区分这两种状态
				let status = 'notDetermined';
				let canUse = false;
				let description = '未确定';

				if (errMsg.includes('PERMISSION_DENIED') ||
					errMsg.includes('用户拒绝授权')) {
					status = 'denied';
					description = '用户明确拒绝';
				} else if (errMsg.includes('位置服务不可用')) {
					status = 'disabled';
					description = '系统定位服务关闭';
				} else if (errMsg.includes('app is not active')) {
					status = 'restricted';
					description = '应用未在前台运行';
				}

				resolve({
					status,
					canUse,
					description
				});
			}
		});
	});
}

/**
 * 显示iOS权限引导弹窗
 */
function showIOSPermissionGuide() {
	uni.showModal({
		title: '需要位置权限',
		content: '请前往系统设置开启位置权限：\n\n1. 打开手机"设置"\n2. 找到当前应用\n3. 点击"位置"\n4. 选择"使用App期间"或"始终"',
		confirmText: '去设置',
		cancelText: '取消',
		success: (res) => {
			if (res.confirm) {
				openIOSSettings();
			}
		}
	});
}

/**
 * 尝试打开iOS系统设置
 * 注意：iOS限制较多，不一定能直接跳转
 */
function openIOSSettings() {
	// 方法1: 尝试使用URL Scheme（有限制）
	// iOS 8+ 支持 app-settings: URL scheme，但需要配置白名单

	// 先检查是否支持plus.runtime
	if (typeof plus !== 'undefined' && plus.runtime) {
		try {
			// 尝试打开应用设置页面
			plus.runtime.openURL('app-settings://');
		} catch (e) {
			// 如果失败，引导用户手动设置
			uni.showModal({
				title: '提示',
				content: '请手动前往：\n设置 > 隐私 > 定位服务 > 找到本应用',
				showCancel: false,
				confirmText: '知道了'
			});
		}
	} else {
		// 没有plus环境，只能提示用户手动设置
		uni.showModal({
			title: '手动设置',
			content: '请前往：\n1. 打开"设置"\n2. 进入"隐私"\n3. 选择"定位服务"\n4. 找到本应用并开启权限',
			showCancel: false,
			confirmText: '知道了'
		});
	}
}

/**
 * 检查iOS系统定位服务是否开启
 * 注意：UniApp标准API无法直接检测，需要通过错误信息推断
 */
function checkIOSLocationServices() {
	return new Promise((resolve) => {
		uni.getLocation({
			type: 'wgs84',
			altitude: false,
			success: () => {
				// 能成功获取，说明系统定位服务已开启
				resolve({
					enabled: true,
					message: '系统定位服务已开启'
				});
			},
			fail: (err) => {
				const errMsg = err.errMsg || '';
				const enabled = !errMsg.includes('位置服务不可用') &&
					!errMsg.includes('LOCATION_SERVICES_DISABLED');

				resolve({
					enabled,
					message: enabled ? '系统定位服务状态未知' : '系统定位服务未开启'
				});
			}
		});
	});
}

/**
 * 综合权限检查方法（推荐使用）
 * @returns {Promise<{
 *   hasPermission: boolean,
 *   systemLocationEnabled: boolean,
 *   needRequest: boolean,
 *   canGetLocation: boolean,
 *   errorMessage?: string
 * }>}
 */
async function checkIOSLocationPermissionComprehensive() {
	try {
		// 1. 先尝试获取位置（最直接的方法）
		const locationResult = await new Promise((resolve) => {
			uni.getLocation({
				type: 'wgs84',
				altitude: false,
				success: (res) => {
					resolve({
						success: true,
						data: res,
						error: null
					});
				},
				fail: (err) => {
					resolve({
						success: false,
						data: null,
						error: err
					});
				}
			});
		});

		// 2. 分析结果
		if (locationResult.success) {
			return {
				hasPermission: true,
				systemLocationEnabled: true,
				needRequest: false,
				canGetLocation: true,
				message: '位置权限正常，可获取位置信息'
			};
		} else {
			const error = locationResult.error;
			const errMsg = error.errMsg || '';

			let hasPermission = false;
			let systemLocationEnabled = true;
			let needRequest = false;
			let canGetLocation = false;
			let errorMessage = '';

			// 分析错误类型
			if (errMsg.includes('PERMISSION_DENIED') ||
				errMsg.includes('用户拒绝授权') ||
				errMsg.includes('auth deny')) {
				// 用户已拒绝
				hasPermission = false;
				needRequest = false; // 需要去设置页开启
				errorMessage = '用户已拒绝位置权限';
			} else if (errMsg.includes('位置服务不可用') ||
				errMsg.includes('LOCATION_SERVICES_DISABLED')) {
				// 系统定位服务关闭
				systemLocationEnabled = false;
				errorMessage = '请开启系统定位服务';
			} else if (errMsg.includes('app is not active')) {
				// 应用未激活
				errorMessage = '请确保应用在前台运行';
			} else {
				// 其他错误，可能是首次使用
				hasPermission = false;
				needRequest = true; // 可以尝试请求
				errorMessage = '需要位置权限授权';
			}

			return {
				hasPermission,
				systemLocationEnabled,
				needRequest,
				canGetLocation,
				errorMessage
			};
		}
	} catch (error) {
		return {
			hasPermission: false,
			systemLocationEnabled: false,
			needRequest: false,
			canGetLocation: false,
			errorMessage: `检查权限出错: ${error.message}`
		};
	}
}

/**
 * 获取位置（带权限检查）
 * @returns {Promise<{
 *   success: boolean,
 *   location?: { latitude: number, longitude: number },
 *   error?: string,
 *   permissionIssue?: boolean
 * }>}
 */
async function getLocationWithPermissionCheck() {
	// 先检查权限状态
	const permissionStatus = await checkIOSLocationPermissionComprehensive();

	if (!permissionStatus.systemLocationEnabled) {
		return {
			success: false,
			error: '系统定位服务未开启',
			permissionIssue: true
		};
	}

	if (!permissionStatus.hasPermission && !permissionStatus.needRequest) {
		return {
			success: false,
			error: '位置权限被拒绝，请前往设置开启',
			permissionIssue: true
		};
	}

	// 尝试获取位置
	return new Promise((resolve) => {
		uni.getLocation({
			type: 'wgs84',
			altitude: false,
			success: (res) => {
				resolve({
					success: true,
					location: {
						latitude: res.latitude,
						longitude: res.longitude,
						accuracy: res.accuracy || 0
					}
				});
			},
			fail: (err) => {
				const errMsg = err.errMsg || '';
				let error = '获取位置失败';
				let permissionIssue = false;

				if (errMsg.includes('PERMISSION_DENIED') ||
					errMsg.includes('用户拒绝授权')) {
					error = '位置权限被拒绝';
					permissionIssue = true;
				}

				resolve({
					success: false,
					error,
					permissionIssue
				});
			}
		});
	});
}

function handleUploadResponse(response) {
	console.log('原始响应:', response);

	try {
		// 如果 response 是字符串，先解析
		let responseData = response;
		if (typeof response === 'string') {
			responseData = JSON.parse(response);
		}

		console.log('处理后的数据:', responseData);

		// 检查业务逻辑是否成功
		if (responseData.code !== '200' || !responseData.success) {
			const errorMsg = responseData.msg || '上传失败';
			throw new Error(errorMsg);
		}

		// 获取文件数据
		const fileData = responseData.data;
		if (!fileData) {
			throw new Error('响应数据格式错误：缺少 data 字段');
		}

		console.log('文件信息:', fileData);
		console.log('文件URL:', fileData.fileUrl);
		console.log('文件名:', fileData.fileName);

		return fileData;

	} catch (error) {
		console.error('处理上传响应失败:', error);
		throw error;
	}
}
// 初始化全局数据
function initGlobalData(currentGlobalData = {}) {
	const appInfo = uni.getAppBaseInfo?.() || {}

	return {
		// 现在的下载地址 http://cdn.chongyueyue.cn/static/app/2023_11_14_09_18_33.apk
		//#ifdef APP-HARMONY
		staticPath: '',
		//#endif
		lastUseSerialCode: null,
		systemId: '',
		pushId: '',
		showDeviceList: new Array(),
		showPresentPet: new Array(),
		showOtherPet: new Array(),
		allPets: new Array(),
		allData: new Array(),
		presentPet: new Array(),
		dogBreedData: '',
		catBreedData: '',
		uidAndAlldata: '',
		presentDevice: null,
		uid: '',
		locateIsRuning: false,
		mapShowMode: false,
		locateIsRuningArray: new Array(),
		currentDate: '',
		//internet:'http://10.0.9.77:5001',//www.chongyueyue.cnht http://test.cdn.chongyueyue.cn/static/avatar/pet/fb101851-b847-4672-8731-f322fecc63b4.png
		internet: 'https://api.chongyueyue.cn',
		internetDownload: 'https://cdn.chongyueyue.cn',
		connect_url: '/user/test_connection',
		dateline: '/user/login',
		login_with_code: '/user/login_with_code',
		send_verification_code: '/user/send_verification_code',
		logout: '/user/logout',
		petAccount: '/pet/account',
		deviceAccount: '/dev/device',
		petAdd: '/pet/add',
		devAdd: '/dev/add',
		petMotify: '/pet/update',
		sharePet: '/user/share_pet',
		deletePet: '/pet/delete',
		deleteDevice: '/user/unbind_device',
		deviceData: '/dev/device_data',
		dataRequire: '/user/user_account',
		motionData: '/dev/motion_data',
		feedData: '/dev/feed_data',
		trajectoryData: '/dev/trajectory_data',
		getShareList: '/user/get_sharing_list',
		cancleShare: '/user/cancel_share',
		dogBreed: '/pet/dog_breed',
		catBreed: '/pet/cat_breed',
		dogBreed2: '/pet/v2/dog_breeds',
		catBreed2: '/pet/v2/cat_breeds',
		userUpdata: '/user/update',
		versionUpdate: '/app/query_update/0',
		logOn: '/user/delete',
		locateMode: '/dev/set_location_mode',
		queryUpdate: '/firmware/query_update',
		firmwarVersion: '/firmware/app_firmware_version',
		electronicFence: '/dev/set_electronic_fence',
		geofence: '/dev/v2/geofence',
		electronicTraction: '/dev/set_electronic_traction',
		controlNotify: '/dev/control_notify',
		confirmShare: '/user/confirm_share_pet',
		continuousMode: '/dev/continuous_mode',
		setRgb: '/dev/set_rgb_control',
		setBuzzer: '/dev/set_buzzer_control',
		devReboot: '/dev/reboot',
		getWorkMode: '/dev/get_work_mode',
		userMsgs: '/user/msgs',
		userMeagesV2: '/user/v2/msgs',
		update_msgs_status: '/user/v2/update_msgs_status',
		showGuildMask: false,
		checkConnectStatue: '/dev/connect_state',
		switchConnectModel: '/dev/set_connect_mode',
		checkConnectModel: '/dev/get_connect_mode',
		feedbackContact: '/feedback/contact',
		smartFeederWeights: '/smart_feeder/weights',
		smartFeederFataCalendar: '/smart_feeder/data_calendar',
		smartFeederFeeders: '/smart_feeder/feeders',
		smartFeedSettings: '/smart_feeder/settings',
		remainWeightAndDays: '/smart_feeder/remain_weight_and_days',
		smartFeederTheme: '/smart_feeder/theme/',
		feedState: '/smart_feeder/feeder_state/',
		getBluetoothControl: '/dev/get_bluetooth_control',
		setBluetoothControl: '/dev/set_bluetooth_control',
		setHomeWifi: '/dev/set_home_wifi',
		queryHomeWifi: '/dev/query_home_wifi',
		deleteHomeWifi: '/dev/delete_home_wifi',
		appFeedbackHelp: '/feedback/help',
		getHomeWifiInterval: '/dev/get_home_wifi_interval',
		getCarSwitch: '/dev/get_car_switch',
		setCarSwitch: '/dev/set_car_switch',
		getUserAccount: '/user/account?uid=',
		uploadBackGroundImg: '/pet/upload_background_img',
		send_verification_code_cyy: '/validCode/login/send',
		login_with_code_cyy: '/login',
		getLoginUser_cyy: '/api/user/getLoginUser',
		internet_cyy: 'https://api.cyy.chongyueyue.cn',
		sendCommand: '/api/device/sendCommand',
		recoverSave: '/api/loc/recovery/save',
		deviceGetInfo: '/api/device/getInfo/',
		recoverGetPage: '/api/loc/recovery/getPage',
		recoverRemove: '/api/loc/recovery/removeMultiple',
		locateAndWifisetStatue: '',
		queryIsUpdate: false,
		redCircleShow: false,
		firmwareUpEnd: false,
		recivePushData: false,
		isGuild: true,
		openLadarBluetooth: false,
		settingWifiBluetooth: false,
		initFeedBluetooth: false,
		openFirewareBluebooth: false,
		blebluetoothConnect: false,
		batteryShowMode: true,
		petShowModel: 0,
		downloadFirewareUrl: '',
		myFirewareVersion: '',
		myHardwareVersion: 0,
		newFirewareVersion: '',
		loginAuthorization: '',
		locateBluetoothId: '',
		messageCnt: 0,
		leadOut: false,
		railOut: false,
		showToast: true,
		appVersion: appInfo.appVersion,
		PushDataList: {
			systemPushDataList: new Array(),
			devicePushDataList: new Array(),
			userPushDataList: new Array(),
			systemReceiveNew: false,
			deviceReceiveNew: false,
			userReceiveNew: [],
		},
		lacatePageData: '',
		presentBattary: 0,
		battaryImageSrc: '',
		iconMap: new Map()
	}
}

function formatNumber(n, length) {
	let num = n.toString();
	let len = num.length;
	if (length) {
		while (len < length) {
			num = '0' + num;
			len++;
		}
	} else {
		while (num.length < 2) {
			num = '0' + num;
		}
	}
	return num;
}

function preparePolygon(points) {
	return points.flatMap(p => [p.longitude, p.latitude]);
}

function isPointInPolygon(point, polygon_) {
	/**
	 * 判断经纬度点point是否在polygon多边形的内部
	 */
	let polygon = preparePolygon(polygon_)
	const flattenedPolygon = polygon.flat();
	const n = flattenedPolygon.length / 2; // 获取顶点数量

	const x = point.longitude;
	const y = point.latitude;
	let intersections = 0; // 计数射线与多边形边的交点数量

	for (let i = 0; i < n; i++) {
		const p1x = flattenedPolygon[i * 2];
		const p1y = flattenedPolygon[i * 2 + 1];
		const p2x = flattenedPolygon[((i + 1) % n) * 2];
		const p2y = flattenedPolygon[((i + 1) % n) * 2 + 1];

		// 判断射线是否与边相交
		const isBetweenY = (p1y > y) !== (p2y > y);
		const xIntersect = (p2x - p1x) * (y - p1y) / (p2y - p1y) + p1x;

		if (isBetweenY && x < xIntersect) {
			intersections++;
		}
	}
	// 如果交点数量为奇数，则点在多边形内
	const result = intersections % 2 === 1;
	console.log(`设备点 ${point} ${result ? "在" : "不在"} 多边形 ${flattenedPolygon} 区域内`);
	return result;
}

function getCurrentTimeMilliseconds() {
	let date = new Date();
	let year = date.getFullYear();
	let month = formatNumber(date.getMonth() + 1);
	let day = formatNumber(date.getDate());
	let hours = formatNumber(date.getHours());
	let minutes = formatNumber(date.getMinutes());
	let seconds = formatNumber(date.getSeconds());
	let milliseconds = formatNumber(date.getMilliseconds(), 3);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
/**
 * 道格拉斯-普克算法实现
 * @param {Array} points - 包含经纬度的点数组，格式为 [{latitude, longitude}, ...]
 * @param {number} epsilon - 阈值，用于确定点的保留程度，单位为米
 * @returns {Array} - 简化后的点数组
 */
function douglasPeucker(points, epsilon) {
	if (points.length < 2) {
		return points;
	}

	let dmax = 0;
	let index = 0;

	// 找到距离最远的点
	for (let i = 1; i < points.length - 1; i++) {
		let lon1 = points[0].longitude;
		let lat1 = points[0].latitude;
		let lon2 = points[points.length - 1].longitude;
		let lat2 = points[points.length - 1].latitude;
		let lonMid = points[i].longitude
		let latMid = points[i].latitude;

		const dist = getDistance(lat1, lon1, latMid, lonMid) +
			getDistance(latMid, lonMid, lat2, lon2, ) -
			getDistance(lat1, lon1, lat2, lon2, );

		if (dist > dmax) {
			index = i;
			dmax = dist;
		}
	}

	// 如果最大距离大于epsilon，则递归处理
	if (dmax > epsilon) {
		const recs1 = douglasPeucker(points.slice(0, index + 1), epsilon);
		const recs2 = douglasPeucker(points.slice(index), epsilon);

		// 合并结果，并去除重复的点（如果有的话）
		const result = [...recs1.slice(0, -1), ...recs2];
		return result;
	} else {
		// 否则，只保留首尾两点
		return [points[0], points[points.length - 1]];
	}
}

function getDistance(lat1, lon1, lat2, lon2) {
	// console.log('lat1',lat1)
	// console.log('lat1',lat2)
	// console.log('into getdistance',Math.PI)
	const radLat1 = lat1 * Math.PI / 180.0;
	// console.log('radLat1',radLat1)
	const radLon1 = lon1 * Math.PI / 180.0;
	const radLat2 = lat2 * Math.PI / 180.0;
	// console.log('radLat2',radLat2)
	const radLon2 = lon2 * Math.PI / 180.0;

	const a = radLat1 - radLat2;
	const b = radLon1 - radLon2;
	// console.log('a',a);
	const distance = 2 * Math.asin(Math.sqrt(
		Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) *
		Math.pow(Math.sin(b / 2), 2)
	));
	// 地球平均半径（单位：米）
	const earthRadius = 6371000;

	// 计算距离（米）
	const resultDistance = distance * earthRadius;
	var result = Math.trunc(resultDistance);
	return result;
}

export function startBluetoothDeviceDiscovery() {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	adapter.openBluetoothAdapter({
		success(res) {
			console.log('打开蓝牙模块', res);
			setTimeout(() => {
				adapter.startBluetoothDevicesDiscovery({
					allowDuplicatesKey: false,
					success: resd => {
						console.log('打开蓝牙寻找成功');
					},
					fail: errd => {
						uni.showToast({
							icon: 'none',
							title: '打开蓝牙发现失败'
						})
					}
				})
			}, 3000)

		},
		fail() {
			uni.showToast({
				icon: 'none',
				title: '打开蓝牙模块失败，请检查蓝牙模块'
			})
		}
	});

}

export function convertToFormat(head, str) {
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
}

function calculateTimeDifferenceInSeconds(startTime, endTime) {
	// 检查输入是否为null或undefined
	if (startTime == null || endTime == null) {
		return 0;
	}

	// 创建一个日期对象数组，用于存储解析后的时间
	const dates = [startTime, endTime].map(dateString => {
		// 尝试解析日期字符串
		const date = new Date(dateString);
		// 检查日期是否有效（即不是Invalid Date）
		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date string: ${dateString}`);
		}
		return date;
	});

	// 获取解析后的时间戳（毫秒）
	const startTimeMs = dates[0].getTime();
	const endTimeMs = dates[1].getTime();

	// 计算时间差（毫秒），然后转换为秒
	const timeDifferenceInMilliseconds = Math.abs(endTimeMs - startTimeMs);
	const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
	return timeDifferenceInSeconds;
}

function notifyBLECharacteristicValueChange(deviceId) {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	adapter.notifyBLECharacteristicValueChange({
		characteristicId: '0000FFE4-0000-1000-8000-00805F9B34FB',
		deviceId: deviceId,
		serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
		success(res) {
			if (getApp().globalData.showToast)
				uni.showToast({
					icon: 'none',
					title: '监听蓝牙特征成功'
				})
			adapter.stopBluetoothDevicesDiscovery({
				success(res) {
					console.log('停止蓝牙搜索')
				}
			})
		},
		fail(err) {
			console.log('监听蓝牙特征失败', err);
			if (getApp().globalData.showToast)
				uni.showToast({
					icon: 'none',
					title: '监听蓝牙特征失败'
				})
			// setTimeout(()=>{
			// 	notifyBLECharacteristicValueChange(deviceId)
			// },1000)
		}
	})

}

function getRandomPointNearby(latitude, longitude, meters) {
	// 地球半径，单位：米
	// 这里我们使用平均半径作为近似值
	const EARTH_RADIUS = 6371000;

	// 将米转换为弧度
	let metersToRadians = meters / EARTH_RADIUS;

	// 生成随机角度（在南北方向和东西方向上）
	// 这里我们简化为生成一个小范围内的随机弧度
	let latRadian = (Math.random() - 0.5) * 2 * metersToRadians;
	let lngRadian = (Math.random() - 0.5) * 2 * metersToRadians / Math.cos(latitude * Math.PI / 180); // 考虑到纬度对经度的影响

	// 计算新的经纬度
	let newLatitude = latitude + latRadian * 180 / Math.PI;
	let newLongitude = longitude + lngRadian * 180 / Math.PI;

	// 限制经纬度在合理范围内
	newLatitude = Math.max(-90, Math.min(90, newLatitude));
	newLongitude = (newLongitude + 180) % 360 - 180; // 保证经度在-180到180之间

	return {
		latitude: newLatitude,
		longitude: newLongitude
	};
}

function getBLEDeviceServices(deviceId) {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	adapter.getBLEDeviceServices({
		deviceId: deviceId,
		success(res) {
			let haveFee = false;
			res.services.forEach((item, index) => {
				// console.log('item.uuid.substring(4,7)', item.uuid.substring(4, 7))
				if (item.uuid.substring(4, 7) === 'FEE') {
					haveFee = true;
				}
			})
			if (haveFee) {
				if (getApp().globalData.showToast)
					uni.showToast({
						icon: 'none',
						title: '蓝牙服务状态错误',
						duration: 3000
					})
			} else {
				setTimeout(() => {
					notifyBLECharacteristicValueChange(deviceId)
				}, 1000)

			}
		},
		fail(res) {
			if (getApp().globalData.showToast)
				uni.showToast({
					icon: 'none',
					title: '蓝牙服务获取失败'
				})
			// setTimeout(()=>{
			// 	getBLEDeviceServices(deviceId)
			// },1000)
		}
	})

}
async function createBLEConnection(deviceId) {
	//连接蓝牙
	let connect = false;
	connect = await new Promise((resolve, reject) => {
		let info = uni.getDeviceInfo()
		const adapter = info.platform == "harmonyos" ? $uni : uni;
		adapter.createBLEConnection({
			deviceId: deviceId,
			success(res) {
				console.log("蓝牙连接成功", deviceId)
				adapter.stopBluetoothDevicesDiscovery({
					success(res) {
						console.log('停止蓝牙搜索')
					}
				})
				resolve(true);
			},
			fail(res) {
				if (res.code === 10010 || res.code === -1) {
					console.log("蓝牙连接成功", res)
					adapter.stopBluetoothDevicesDiscovery({
						success(res) {
							console.log('停止蓝牙搜索')
						}
					})
					resolve(true);
				} else {
					console.log("蓝牙连接失败", res)
					uni.showToast({
						icon: 'loading',
						title: '蓝牙连接失败'
					})
					resolve(false);
				}
			},
			// complete(end) {
			// 	console.log('end',end);
			// 	if (end.code) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '蓝牙连接失败'
			// 		})

			// 		resolve(false);
			// 	} else {
			// 		if (getApp().globalData.showToast)
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '蓝牙连接成功'
			// 			})
			// 		getBLEDeviceServices(deviceId)

			// 	}
			// }
		})
	})
	return connect

}
async function BleRead(deviceId, serviceId, characteristicIdread) {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	adapter.readBLECharacteristicValue({
		deviceId: deviceId, // 蓝牙设备 deviceId
		serviceId: serviceId, // 蓝牙服务uuid
		characteristicId: characteristicIdread,
		success(res) {
			console.log('readBLECharacteristicValue success:', res)
		},
		fail(res) {
			console.log('readBLECharacteristicValue fail:', res)
		},
		complete(res) {
			console.log('read complete', res);
		}
	})
}

// 检测定位服务是否开启（Android专用）
async function checkLocationServiceForAndroid() {
	// return new Promise((resolve) => {
	//   if (uni.getSystemInfoSync().platform !== 'android') {
	//     // iOS不需要此检测
	//     return resolve(true);
	//   }

	//   // 设置1分钟超时定时器
	//   const timeoutTimer = setTimeout(() => {
	//     console.log('位置获取超时（1分钟）');
	//     resolve(false);
	//   }, 60000); // 60秒 = 60000毫秒

	//   plus.geolocation.getCurrentPosition(
	//     (p) => {
	//       clearTimeout(timeoutTimer); // 成功时清除定时器
	//       console.log('plus,获取位置成功');
	//       resolve(true);
	//     },
	//     (e) => {
	//       clearTimeout(timeoutTimer); // 失败时清除定时器
	//       console.log('plus,获取位置失败');
	//       resolve(false);
	//     }
	//   );
	// });
	return new Promise((resolve) => {
		if (uni.getSystemInfoSync().platform !== 'android') {
			// iOS 不适用此方法
			resolve(true);
			return;
		}

		const Context = plus.android.importClass('android.content.Context');
		const LocationManager = plus.android.importClass('android.location.LocationManager');
		const mainActivity = plus.android.runtimeMainActivity();
		const locationManager = mainActivity.getSystemService(Context.LOCATION_SERVICE);

		// 检查 GPS 和网络定位是否至少有一个可用
		const isGpsEnabled = plus.android.invoke(locationManager, 'isProviderEnabled', LocationManager
			.GPS_PROVIDER);
		const isNetworkEnabled = plus.android.invoke(locationManager, 'isProviderEnabled', LocationManager
			.NETWORK_PROVIDER);

		resolve(isGpsEnabled || isNetworkEnabled);
	});

}

async function openBluetoothAdapter() {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	return adapter.openBluetoothAdapter({})
}

// 设置 token
async function setToken(token) {
	const app = getApp();
	if (!app.globalData) app.globalData = {};
	app.globalData.loginAuthorization = token;
	uni.setStorageSync('loginAuthorization', token);
	console.log('✅ Token 设置成功');
}

// 获取 token
async function getToken() {
	const app = getApp();
	let token = app.globalData?.loginAuthorization;
	// 如果 globalData 中没有，从存储中读取
	if (!token) {
		token = uni.getStorageSync('loginAuthorization');
		if (token && app.globalData) {
			app.globalData.loginAuthorization = token;
		}
	}
	// if(!token)
	// 	token=''
	return token;
}

// 清除 token
async function clearToken() {
	const app = getApp();
	if (app.globalData) {
		app.globalData.loginAuthorization = null;
	}
	uni.removeStorageSync('loginAuthorization');
}

async function requestDataJson(url, para) {
	var token = await getToken()
	const res = await uni.request({
		url: url,
		method: 'POST',
		data: para,
		header: {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': token
		}
	});
	// 业务逻辑判断
	// console.log('requestDataJson 获取到的数据',res)
	if (res.data.code === '200' || res.data.code === 200) {
		return res; // 成功时返回数据
	} else {
		// 业务错误
		console.log('请求失败', res)
		const errorMsg = res.data.msg || '请求失败';
		uni.showToast({
			title: errorMsg,
			icon: 'none',
		});
		throw new Error(errorMsg);
	}
}
async function updataFile(url, para, filePath, name) {
	var token = await getToken()
	return uni.uploadFile({
		url: url,
		filePath: filePath,
		name: name,
		formData: para,
		header: {
			'Content-Type': 'multipart/form-data',
			'Authorization': token
		}
	});
}

async function requestDataFrom(url, para) {
	var token = await getToken()
	return uni.request({
		url: url,
		method: 'POST',
		data: para,
		header: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Authorization': token
		}
	});
}

async function requestDataJsonGET(url, para) {
	try {
		var token = await getToken()
		const res = await uni.request({
			url: url,
			method: 'GET',
			data: para,
			header: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Authorization': token
			}
		});
		// 业务逻辑判断
		console.log('requestDataJsonGET 获取到的数据', res)
		if (res.data.code === '200' || res.data.code === 200) {
			return res.data; // 成功时返回数据
		} else {
			// 业务错误
			const errorMsg = res.data.msg || '请求失败';
			uni.showToast({
				title: errorMsg,
				icon: 'none',
			});
			throw new Error(errorMsg);
		}
	} catch (error) {
		// 网络错误或其他异常
		console.log('捕获到的异常', error)
		if (error.message !== '请求失败') { // 避免重复显示业务错误
			uni.showToast({
				title: '网络请求失败，请检查网络连接',
				icon: 'none',
			});
		}
		throw error;
	}
}
async function getBellByPid(pid) {
	var token = await getToken()
	var petAccountUrl = getApp().globalData.internet + getApp().globalData.petAccount;
	return uni.request({
		url: petAccountUrl,
		method: 'POST',
		dataType: 'json',
		data: {
			pid: pid
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', //重点
			'Authorization': token
			// 'token':cookie
		},
	})
}
async function getBellControl(serialCode) {

	let url = getApp().globalData.internet + getApp().globalData.getBluetoothControl;
	return uni.request({
		url: url,
		method: 'POST',
		data: {
			serial_code: serialCode,
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
	});
}
async function setBellControl(serialCode, data) {
	let url = getApp().globalData.internet + getApp().globalData.setBluetoothControl;
	return uni.request({
		url: url,
		method: 'POST',
		data: {
			serial_code: serialCode,
			bluetooth_mode: data.bluetooth_mode_control,
			bluetooth_period: data.bluetooth_period,
			comm_interval_level: data.comm_interval_level
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
	});
}
async function requestService(url, para) {
	var token = await getToken()
	let result = false
	var deviceAccount = getApp().globalData.internet + url;
	return uni.request({
		url: deviceAccount,
		method: 'POST',
		data: para,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Authorization': token
		},
	});

}

function getCurrentTimePlusMinutes(minutes) {
	// 获取当前时间
	var current = new Date();

	// 将传入的分钟数转换为毫秒（因为Date对象操作基于毫秒）
	var millisecondsToAdd = minutes * 60 * 1000;

	// 将毫秒数加到当前时间上
	current.setTime(current.getTime() + millisecondsToAdd);

	// 提取新的年、月、日、小时、分钟和秒并存入相应的变量
	var year = current.getFullYear();
	var month = (current.getMonth() + 1).toString().padStart(2, '0');
	var day = current.getDate().toString().padStart(2, '0');
	var hours = current.getHours().toString().padStart(2, '0');
	var minutes = current.getMinutes().toString().padStart(2, '0');
	var seconds = current.getSeconds().toString().padStart(2, '0');

	// 组合成字符串形式的时间
	var timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	return timeString;
}
async function BleWrite(data, deviceId, serviceId, characteristicId) {
	let writetype = 'writeNoResponse ';
	let info = uni.getDeviceInfo()
	if (info.platform == 'ios')
		writetype = 'write'
	return new Promise((resolve, reject) => {
		const cb = (errNum = 0) => {
			$uni.writeBLECharacteristicValue({
				deviceId: deviceId,
				serviceId: serviceId,
				characteristicId: characteristicId,
				value: data,
				writeType: writetype,
				success(res) {
					 console.error("蓝牙发送命令成功")
					resolve(true)
				},
				fail(err) {
					// console.error('蓝牙发送命令失败', err)
					if (errNum > maxNum) {
						resolve(false)
					} else {
						cb(errNum + 1)
					}
				}
			})
		}
		cb()
	})
}
async function BleWriteOH(data, deviceId, serviceId, characteristicId) {
	console.error("BleWriteOH准备发送1")
	let writetype = 'writeNoResponse ';
	// 参数验证
	if (!deviceId || !serviceId || !characteristicId) {
		console.log('蓝牙参数无效:', {
			deviceId: deviceId,
			serviceId: serviceId,
			characteristicId: characteristicId
		});
		return;
	}

	// 确保数据格式正确 - 转换为ArrayBuffer
	let buffer = data;
	if (data instanceof Uint8Array) {
		buffer = data.buffer.slice(data.byteOffset, data.byteOffset +
			data.byteLength);
	} else if (Array.isArray(data)) {
		buffer = new Uint8Array(data).buffer;
	}

	// 验证buffer是否有效
	if (!buffer || buffer.byteLength === 0) {
		console.log('数据buffer无效:', buffer);
		return;
	}
	console.error("BleWriteOH准备发送2")
	return new Promise((resolve, reject) => {
		console.error("BleWriteOH准备发送3")
		const cb = (errNum = 0) => {
			console.error("BleWriteOH准备发送4")
			$uni.writeBLECharacteristicValue({
				deviceId: deviceId,
				serviceId: serviceId,
				characteristicId: characteristicId,
				value: buffer,
				writeType: writetype,
				success(res) {
					console.error("BleWriteOH蓝牙发送命令成功")
					resolve(true)
				},
				fail(err) {
					console.error('BleWriteOH蓝牙发送命令失败', err)
					if (errNum > maxNum) {
						resolve(false)
					} else {
						cb(errNum + 1)
					}
				}
			})
			console.error("BleWriteOH准备发送5")
		}
		console.error("BleWriteOH准备发送6")
		cb()
		console.error("BleWriteOH准备发送7")
	})
}
export function allObjectsHavePara(objects, para) {
	// 遍历数组中的每个对象
	for (let i = 0; i < objects.length; i++) {
		const obj = objects[i];
		// 检查当前对象是否包含pid属性
		if (!obj.hasOwnProperty(para)) {
			// 如果当前对象不包含pid属性，则返回false
			return false;
		}
	}
	// 如果所有对象都包含pid属性，则返回true
	return true;
}
export function filterHomeWifiData(data) {
	let LastIndex = 0
	data.forEach((item, index) => {
		if (item.loc_type === 4)
			LastIndex = index
	})
	let filteArray = []
	data.forEach((item, index) => {
		if (item.loc_type === 4 && index < LastIndex) {} else {
			filteArray.push(item)
		}
	})

	filteArray.sort((a, b) => {
		const timeA = new Date(a.time);
		const timeB = new Date(b.time);
		return timeA - timeB; // 升序排序
	});
	return filteArray
}
export function filterData(data) {
	// 辅助函数：将时间字符串转换为Date对象
	try {
		console.log('into filter data')

		function parseTime(timeStr) {
			const now = new Date();

			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
			const day = String(now.getDate()).padStart(2, '0');

			const currentDate = `${year}-${month}-${day}`;
			timeStr = currentDate + ' ' + timeStr
			return new Date(timeStr);
		}

		// 辅助函数：计算两个Date对象之间的时间差（分钟）
		function timeDifferenceInMinutes(date1, date2) {
			const diffMs = Math.abs(date1 - date2);
			return Math.round(diffMs / (1000 * 60));
		}

		// 获取当前时间
		const currentTime = new Date();
		console.log('currentTime', currentTime)
		// const currentTime = parseTime("23:58:01");
		// 第一步：分离数据
		let recentData = [];
		let oldData = [];

		data.forEach(item => {
			const itemTime = parseTime(item.time);
			if (timeDifferenceInMinutes(currentTime, itemTime) <= 5) {
				recentData.push(item);
			} else {
				oldData.push(item);
			}
		});
		console.log('oldData', data, oldData, recentData)
		// 第二步：处理时间距离现在超过十五分钟的数据 oldData.filter(item => item.loc_type === 1).length > 30
		let filteredOldData = [];
		if (oldData.length > 30) {
			let interval = 1;
			if (oldData.length < 60)
				interval = 3
			else
				interval = 2

			let count = 0;
			oldData.forEach(item => {
				if ((item.loc_type !== 1 && item.loc_type !== 2) || (count % interval !== 0)) {
					filteredOldData.push(item);
				}
				if (item.loc_type === 1 || item.loc_type === 2) {
					count++;
				}
			});
		} else {
			filteredOldData = oldData;
		}
		let resultData = filteredOldData.concat(recentData);

		console.log('filteredOldData.length', filteredOldData.length)
		let filter = filterHomeWifiData(resultData);
		console
		if (filter.length > 35)
			return filterData(filter)
		else {
			return filter
		}
		// 第三步：合并数据
	} catch (e) {
		console.log('筛选出错', e)
	}

}
export function filterGps(HW, HDOP, DB_HZ, type) {
	if (type === 2) {
		if (HW >= 36 && HDOP >= 12 && DB_HZ <= 26)
			return true
		if (HW >= 36 && HDOP >= 25)
			return true
		if (HW < 36 && HDOP > 75)
			return true
	}
	return false
}
export function filter(last, item) {
	// console.log('last',last)
	console.log('item', item)
	let distance = getDistance(last.latitude, last.longitude, item.latitude, item.longitude);
	// console.log('lasttime',last.time)
	// console.log('itemtime',item.time)
	let secondDiff = calculateTimeDifferenceInSeconds(last.time, item.time);
	// console.log('filter distance=', distance);
	// console.log('filter secondDiff', secondDiff);
	let speed = distance / secondDiff
	console.log('speed', speed, 'dis', distance, 'secon', secondDiff, 'last.time', last.time);
	if (secondDiff > 0 && secondDiff < 1800 && speed > K) //两分钟超过400米 并且时间间隔在半个小时内
	{
		return true;
	}
	return false
}
export function locateMotifyPet(motifyPet) {
	// 使用 Array.prototype.findIndex 找到要替换的宠物的索引
	const petIndex = getApp().globalData.allData.findIndex(pet => pet.pet_account.pid ===
		motifyPet.pid);
	const petindex2 = getApp().globalData.allPets.findIndex(pet => pet.pid ===
		motifyPet.pid);
	// 如果找到了匹配的索引，则替换 "pet_account" 对象
	if (petIndex !== -1) {
		getApp().globalData.allData[petIndex].pet_account = motifyPet;
		console.log('修改allData成功', getApp().globalData.allData[petIndex]);
	}
	if (petindex2 !== -1) {
		getApp().globalData.allPets[petIndex] = motifyPet;
		console.log('修改allPets成功', getApp().globalData.allData[petIndex]);
	}
}
export function transformWifiData(data) {
	let transformedData = {};
	for (let key in data) {
		let wifiInfo = data[key];
		wifiInfo.wifi_mac = key;
		transformedData[key] = wifiInfo;
	}
	// 将转换后的对象放入数组中，
	let result = Object.values(transformedData);
	return {
		data: result
	};
}
export function connectBLEDevice(deviceId, callback) {
	let info = uni.getDeviceInfo()
	const adapter = info.platform == "harmonyos" ? $uni : uni;
	adapter.createBLEConnection({
		deviceId: deviceId,
		success(res) {
			console.log("蓝牙连接成功", deviceId);
			adapter.stopBluetoothDevicesDiscovery({
				success() {
					console.log('停止蓝牙搜索');
					callback(null, 'connected');
				},
				fail(err) {
					console.error('停止蓝牙搜索失败', err);
					callback(err, null);
				}
			});
		},
		fail(res) {
			if (res.code === 10010 || res.code === -1) {
				console.log("蓝牙已经连接成功", res);
				adapter.stopBluetoothDevicesDiscovery({
					success() {
						console.log('停止蓝牙搜索');
						callback(null, 'alreadyConnected');
					},
					fail(err) {
						console.error('停止蓝牙搜索失败', err);
						callback(err, null);
					}
				});
			} else {
				console.error("蓝牙连接失败", res);
				callback(res, null);
			}
		}
	});
}
async function requestPetList() {
	getPetList().then(recivedata => {
		console.log('拿到了宠物列表', recivedata)
		getApp().globalData.allPets = recivedata.data
		uni.setStorageSync('allPets', recivedata.data);
	})
}
export default {
	filterData: filterData,
	filterGps: filterGps,
	filter: filter,
	createBLEConnection: createBLEConnection,
	BleWrite: BleWrite,
	BleWriteOH: BleWriteOH,
	requestService: requestService,
	BleRead: BleRead,
	getCurrentTimePlusMinutes: getCurrentTimePlusMinutes,
	allObjectsHavePara: allObjectsHavePara,
	getCurrentTimeMilliseconds: getCurrentTimeMilliseconds,
	startBluetoothDeviceDiscovery: startBluetoothDeviceDiscovery,
	convertToFormat: convertToFormat,
	getBellControl: getBellControl,
	setBellControl: setBellControl,
	getRandomPointNearby: getRandomPointNearby,
	getBellByPid: getBellByPid,
	locateMotifyPet: locateMotifyPet,
	connectBLEDevice: connectBLEDevice,
	getDistance: getDistance,
	requestDataJson: requestDataJson,
	calculateTimeDifferenceInSeconds: calculateTimeDifferenceInSeconds,
	transformWifiData: transformWifiData,
	douglasPeucker: douglasPeucker,
	isPointInPolygon: isPointInPolygon,
	openBluetoothAdapter: openBluetoothAdapter,
	requestDataJsonGET: requestDataJsonGET,
	checkLocationServiceForAndroid: checkLocationServiceForAndroid,
	setToken: setToken,
	requestDataFrom: requestDataFrom,
	updataFile: updataFile,
	initGlobalData: initGlobalData,
	getLocationWithPermissionCheck: getLocationWithPermissionCheck,
	showIOSPermissionGuide: showIOSPermissionGuide,
	checkIOSLocationPermissionComprehensive: checkIOSLocationPermissionComprehensive,
	requestPetList: requestPetList,
	handleUploadResponse:handleUploadResponse
}