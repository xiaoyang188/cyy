<template>
	<view class="container">
		<view class="loading" v-if="isLoading">

		</view>
		<!-- 返回按钮 - 固定定位，始终显示 -->
		<view
			style="position: fixed;left: 36rpx;top:80rpx;display: flex;flex-direction: column;align-items: center;background-color: rgb(255,255,255);border-radius: 30rpx;padding: 10rpx;pointer-events: auto;z-index: 1001;">
			<image @click="returnParent" src="/static/icons/public/icon-back.png" style="width: 60rpx;height: 60rpx;">
			</image>
		</view>
		<!-- 导航栏 -->
		<view class="map-view" :style="{ height: mapHeight+'px', opacity: isLoading ? 0 : 1 }"
			style="position: relative;">
			<!-- <map id='map' ref="map" class="map" :polyline="polyline" :enable-satellite='enableSatellite'
				:show-location="false" v-if="mapviz===true" :latitude="latitude" :scale="18" :longitude="longitude"
				:markers="markers" @markertap="markertap" @callouttap="callouttap" @regionchange="onregionchange"
				style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">

			</map> -->
			<embed class="map" tag="mappath" v-if="mapviz===true" :options="options" @markertap="markertap"
				@ready="onReady" @maptypechange="onMapTypeChange"></embed>
			<!-- 滑块 - 绝对定位 -->
			<view class="slider-container" style="position: absolute; pointer-events: none;">
				<view style="width: 100rpx;height: 600rpx;position: relative;">
					<view v-if="showSliderCallout" class="slider-callout" :style="thumbStyle">
						<view class="row_center"
							style="width: 100rpx;height: 60rpx;border: solid 1rpx  #ff5500;border-radius: 30rpx;background-color: #ffffff;">
							<text style="color: #ff5500;">{{calloutContent}}</text>
						</view>
					</view>
				</view>
				<view class="col_center" style="width: 40rpx;height: 600rpx;position: relative; pointer-events: auto;">
					<view class="slider" id="slider" style="pointer-events: auto;"></view>
					<view class="slider-thumb" :style="thumbStyle" @touchstart="startThumb" @touchmove="moveThumb"
						@touchend="stopThumb" style="pointer-events: auto;">
						<view style="position: relative; width: 60rpx; height: 60rpx;">
							<image src="/static/imgs/tragectory/circleHalo.png"
								style="width: 60rpx; height: 60rpx; position: absolute; z-index: 1;">
							</image>
						</view>
					</view>
				</view>
			</view>

			<!-- 信息卡片 - 绝对定位 -->
			<view class="info-card-container" v-if="markers.length"
				style="position: absolute; bottom: 300rpx; left: 0; width: 100%; pointer-events: auto; z-index: 500;">
				<view class="top-controls">
					<view class="map-info">
						<image src="/static/imgs/locate/petalmap.png"
							style="width: 32rpx;height: 32rpx;margin-right: 8rpx;"></image>
						<view class="map-text">
							<text style="font-size: 22rpx;color: #000000;font-weight: 600;">Petal Maps</text>
							<text style="font-size: 10rpx;color: #666666;">{{mapNumber}}</text>
						</view>
					</view>
					<view @click="clickPath" class="path-button">
						<image src="/static/imgs/tragectory/pathIcon.png"
							style="width: 32rpx;height: 32rpx;margin-right: 8rpx;"></image>
						<text style="font-size: 22rpx;color: #000000;font-weight: 500;">{{showPathTitle}}</text>
					</view>
				</view>
				<view class="info-card">
					<view class="card-header">
						<text class="date-text">{{clickDate}}</text>
						<text class="device-text">设备编号:{{serial_code}}</text>
						<image class="gps-icon"
							:src="locateTypeGps?'/static/imgs/locate/gps.png':'/static/imgs/locate/gpsGray.png'">
						</image>
						<view class="status-badge">
							<text class="status-text">{{locateType}}</text>
						</view>
					</view>
					<view class="address-section">
						<image src="/static/imgs/tragectory/locate.png" class="location-icon"></image>
						<text class="address-text">{{address}}</text>
					</view>
				</view>
			</view>

			<!-- 日期选择器 - 绝对定位 -->
			<view v-if="!isLoading" class="date-selector-container"
				style="position: absolute; bottom: 0; left: 0; width: 100%; height: 240rpx; pointer-events: auto; z-index: 500;">
				<view class="date-selector-wrapper">
					<scroll-view class="scroll-view-container" scroll-x="true" :show-scrollbar="false">
						<view class="date-item-wrapper" v-for="(date, index) in dates" :key="index"
							@click="dateClick(date.date,index)">
							<view class="day-label">
								<text style="font-size: 24rpx;color: rgba(128, 128, 128, 1);">{{date.days}}</text>
							</view>
							<view :class="clickIndex!=index?'date-circle':'date-circle-selected'">
								<text
									:class="clickIndex!=index?'date-number':'date-number-selected'">{{ date.date.substring(8,10) }}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<view :style="dataContainer"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref,
		reactive
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import util, {
		filter
	} from '@/common/util'
	import {
		wgs84_to_gcj02
	} from '@/common/wgs84ToGcj02';
	import {
		$uni
	} from "@/utils/main.js"
	import {
		uniAddMarker,
		uniRemoveMarker,
		uniUpdateCamera,
		uniUpdateMarkerPosition,
		uniUpdateMarkerIcon,
		uniGetMarkerMap,
		uniClearMap,
		uniShowMyLocation,
		uniSetMapType,
		uniClearAllMarkers,
		uniHasMarker,
		uniClearAllPolylines,
		uniAddPolyline,
		uniInfoWindowEnable,
		uniMapShow,
		uniMapHide
	} from "@/uni_modules/native-harmony-mappath"
	import "@/uni_modules/native-harmony-mappath";
	import {
		getStaticOh
	} from '@/utils/file';
	import {
		colorToHexNumber
	} from "@/utils/color.js"
	import {
		calculateSphericalCenter
	} from '@/utils/locate.js'
	import {
		gcj02_to_wgs84
	} from "@/common/wgs84ToGcj02.js"
	import {
		amapLocation,
		getLocationList
	} from '@/api/api/location';
	
	const showPath=ref(0)
	const options = reactive({
		name: "path",
		latitude: 39.909,
		longitude: 116.39742,
		scale: 12,
		showLocation: false,
		showMapTypeButton: true
	})
	const isLoading = ref(true)
	const mapNumber = ref('GS(2024)1955号')
	const minValue = ref(0)
	const maxValue = ref(86400)
	const dogulas_peuker_distance = ref(20)
	const locateTypeGps = ref(true)
	const scaleborderStyle = ref('')
	const scaleShow = ref('')
	const thumbTop = ref(0) //0 到 300之间
	const sliderTop = ref(150)
	const sliderBottom = ref(450)
	const sliderHight = ref(300)
	const drawRange = ref(30)
	const polyline = ref([])
	const polylineData = ref([])
	const showPolyLine = ref(true)
	const clickDate = ref('')
	const serial_code = ref('')
	const showSliderCallout = ref(false)
	const calloutContent = ref('')
	const Pid = ref('')
	const Did = ref('')
	const scaleArray = ref(['1000km', '500km', '200km', '100km', '50km', '30km', '20km', '10km', '5km', '2km', '1km',
		'500m', '200m', '100m', '50m', '25m', '10m', '5m'
	])
	const ishow = ref(true)
	const scrollX = ref(0) // 用于保存水平滚动位置
	const startX = ref(0) // 用于保存滑动起始位置
	const isDragging = ref(false) // 标记是否正在拖动
	const dates = ref([])
	const markers = ref([])
	const latitude = ref(39.9096045)
	const longitude = ref(116.3972282)
	const address = ref('')
	const coverTime = ref('')
	const locateType = ref('')
	const navHeight = ref(10) // 导航栏高度百分比
	const mapHeight = ref(100) // 地图高度百分比
	const scrollViewHeight = ref(15) // 滚动视图高度百分比
	const dataViewHeight = ref(17)
	const scrollViewTop = ref('')
	const screenheight = ref(800) // 设置默认屏幕高度，避免初始化时UI不可见
	const screenwidth = ref(375) // 设置默认屏幕宽度，避免初始化时UI不可见
	const dataWidth = ref('')
	const currentDate = ref('')
	const mapviz = ref(true)
	const clickIndex = ref(0)
	const slideIndex = ref(0)
	const enableSatellite = ref(false)
	const polylineId = ref(-1)
	const testArray = ref([{
			latitude: 40.019262966666666,
			longitude: 113.1643111,
			time: "2025-03-21 14:21:25",
			locType: 2,
			HDOP: 9,
			DB_HZ: 40
		},
		{
			latitude: 40.019265383333334,
			longitude: 113.16454943333333,
			time: "2025-03-21 14:21:47",
			locType: 2,
			HDOP: 10,
			DB_HZ: 42
		},
		{
			latitude: 40.01934451666666,
			longitude: 113.16297173333334,
			time: "14:24:30",
			locType: 4,
			HDOP: null,
			DB_HZ: null
		},
		{
			latitude: 40.01905983333333,
			longitude: 113.16686915,
			time: "2025-03-21 14:25:04",
			locType: 2,
			HDOP: 13,
			DB_HZ: 38
		},
		{
			latitude: 40.0189938,
			longitude: 113.16725963333333,
			time: "2025-03-21 14:25:49",
			locType: 2,
			HDOP: 8,
			DB_HZ: 35
		},
		{
			latitude: 40.018959333333335,
			longitude: 113.1691434,
			time: "2025-03-21 14:28:39",
			locType: 2,
			HDOP: 10,
			DB_HZ: 35
		},
		{
			latitude: 40.01934451666666,
			longitude: 113.16297173333334,
			time: "2025-03-21 14:34:23",
			locType: 4,
			HDOP: null,
			DB_HZ: null
		},
		{
			latitude: 40.0194523,
			longitude: 113.16990198333333,
			time: "2025-03-21 17:50:47",
			locType: 2,
			HDOP: 15,
			DB_HZ: 28
		},
		{
			latitude: 40.0190206,
			longitude: 113.16909101666667,
			time: "2025-03-21 17:52:25",
			locType: 2,
			HDOP: 11,
			DB_HZ: 38
		},
		{
			latitude: 40.019122016666664,
			longitude: 113.16877771666667,
			time: "2025-03-21 17:53:08",
			locType: 2,
			HDOP: 6,
			DB_HZ: 40
		},
		{
			latitude: 40.01976281666666,
			longitude: 113.16206935,
			time: "2025-03-21 17:56:02",
			locType: 2,
			HDOP: 10,
			DB_HZ: 36
		},
		{
			latitude: 40.01986753333333,
			longitude: 113.16232633333334,
			time: "2025-03-21 17:58:45",
			locType: 2,
			HDOP: 12,
			DB_HZ: 44
		},
		{
			latitude: 40.01934451666666,
			longitude: 113.16297173333334,
			time: "2025-03-21 19:04:36",
			locType: 4,
			HDOP: null,
			DB_HZ: null
		}
	])
	const _mapContext = ref(null)
	const map = ref(null)
	const showPathTitle=ref('点位路径')

	onLoad((options) => {
		console.log('into datapath onloac', options);

		if (options.data) {
			let data = JSON.parse(options.data);
			serial_code.value = data.serialCode;
			Pid.value = data.pid;
			Did.value = data.did;
			if (data.dogulas_peuker_distance)
				dogulas_peuker_distance.value = data.dogulas_peuker_distance
		}

	})

	const thumbStyle = computed(() => {
		return {
			top: thumbTop.value + 'px',

		};
	})

	const scrollStyle = computed(() => {
		return {
			bottom: '0rpx',
			left: '0rpx',
			width: '100%',
			height: '120px', // 固定高度
		};
	})
	const dataStyle = computed(() => {
		return {
			bottom: '160px', // 固定位置：日期选择器高度120px + 间距40px
			left: '0rpx',
			width: '100%',
			height: '180px', // 固定高度
		};
	})
	const dataContainer = computed(() => {
		return {
			top: screenheight.value.toString() + 'px'
		};
	})

	function onMapTypeChange(event) {
		if (event.detail.newType == "STANDARD") {
			mapNumber.value = 'GS(2024)1955号'
		} else {
			mapNumber.value = 'GS(2025)2036号'
		}
		uni.setStorage({
			key: "mapType",
			data: event.detail.newType
		})
	}

	function onReady() {
		try {
			const systemInfo = uni.getSystemInfoSync();
			screenheight.value = systemInfo.screenHeight;
			screenwidth.value = systemInfo.screenWidth;
			enableSatellite.value = getApp().globalData.mapShowMode
			dataWidth.value = screenwidth.value * 0.95
			mapHeight.value = screenheight.value;
			console.log('uni.getWindowInfo().windowHeight', uni.getWindowInfo())
			scrollViewHeight.value = (screenheight.value * 15) / 100; // 使用固定的15%而不是自身的值
			let pixelRatio = uni.getWindowInfo().screenWidth / 750
			dataViewHeight.value = 250 * pixelRatio
			scaleborderStyle.value = {
				margin: '10rpx 0rpx 0rpx 0rpx'
			}
			showPolyLine.value = uni.getStorageSync("showPoline")
			console.log('showPolyLine.value', showPolyLine.value)
			if (showPolyLine.value === '' || showPolyLine.value === null)
				showPolyLine.value = true
			dateClick(currentDate.value, 0);
			uni.getStorage({
				key: "mapType",
				success: (res) => {
					console.log(res)
					uniSetMapType(res.data)
				}
			})
		} catch (err) {
			console.log("onReady", err)
		}
	}

	// onReady(() => {
	// 	_mapContext.value = uni.createMapContext("map");
	// 	_mapContext.value.initMarkerCluster({
	// 		enableDefaultStyle: true,
	// 		zoomOnClick: true,
	// 		gridSize: 60,
	// 		complete(res) {
	// 			console.log('initMarkerCluster', res)
	// 		}
	// 	});
	// 	// dateClick(currentDate.value, 0);
	// })

	onMounted(() => {
		// 在这里初始化地图组件
		initDates();
		// const currentDate = new Date();
		// const date = new Date(currentDate);
		// date.setDate(currentDate.getDate());
		// const formattedDate = this.formatDate(date);
		// console.log('当天日期', formattedDate);
		currentDate.value = getApp().globalData.currentDate;
		console.log('dateClick(currentDate.value);', currentDate.value)

	})

	function clickPath() {
		console.log(markers.value)
		// showPolyLine.value = !showPolyLine.value
		// if (polyline.value.length != 0) {
		// 	polylineData.value = polyline.value
		// }
		// if (showPolyLine.value == true) {
		// 	polyline.value = new Array()
		// 	polyline.value = polylineData.value
		// 	console.log(polyline.value)
		// 	uniClearAllPolylines()
		// 	try {
		// 		// 修复：polyline.value是数组，需要访问第一个元素
		// 		const polylineItem = polyline.value[0]
		// 		if (polylineItem) {
		// 			polylineId.value = uniAddPolyline({
		// 				id: 0,
		// 				points: polylineItem.points,
		// 				width: polylineItem.width,
		// 				// color: colorToHexNumber(String(polylineItem.color)),
		// 				arrowIconPath: getStaticOh(polylineItem.arrowIconPath)
		// 			})
		// 		}
		// 	} catch (err) {
		// 		console.log("uniAddPolyline", err)
		// 	}
		// } else {
		// 	polyline.value = new Array()
		// 	uniClearAllPolylines()
		// }
		
		showPath.value++;
		if(showPath.value>2){
			showPath.value=0
		}
		polylineData.value = polyline.value
		if(showPath.value==0){
			const polylineItem = polyline.value[0]
			if (polylineItem) {
				polylineId.value = uniAddPolyline({
					id: 0,
					points: polylineItem.points,
					width: polylineItem.width,
					// color: colorToHexNumber(String(polylineItem.color)),
					arrowIconPath: getStaticOh(polylineItem.arrowIconPath)
				})
			}
			if(markers.value.length>0){
				showPathTitle.value='点位路径'
				uni.showLoading({
					title:'加载中'
				})
				for(let item of markers.value){
					uniAddMarker({
						id: item.id,
						latitude: item.latitude,
						longitude: item.longitude,
						iconPath: item.iconPath,
						width: item.width,
						height: item.height,
						title: item.time
					})
				}
				uni.hideLoading()
			}
			
		}else if(showPath.value==1){
			uniClearAllPolylines()
			// if(markers.value.length>0){
			// 	for(let item of markers.value){
			// 		await uniAddMarker({
			// 			id: item.id,
			// 			latitude: item.latitude,
			// 			longitude: item.longitude,
			// 			iconPath: item.iconPath,
			// 			width: item.width,
			// 			height: item.height,
			// 			title: item.time
			// 		})
			// 	}
			// }
			showPathTitle.value='运动点位'
		}else if(showPath.value==2){
			uniClearAllMarkers()
			const polylineItem = polyline.value[0]
			if (polylineItem) {
				polylineId.value = uniAddPolyline({
					id: 0,
					points: polylineItem.points,
					width: polylineItem.width,
					// color: colorToHexNumber(String(polylineItem.color)),
					arrowIconPath: getStaticOh(polylineItem.arrowIconPath)
				})
			}
			showPathTitle.value='运动路径'
		}
		// this.polyline.map(item => {
		// 	if (!this.showPolyLine) {
		// 		item.width = 0;
		// 	} else {
		// 		item.width = 15;
		// 	}
		// 	return item;
		// });
		// let polyline = this.polyline
		// this.polyline = new Array()
		// setTimeout(() => {
		// 	this.polyline = polyline
		// }, 10)
		uni.setStorageSync("showPoline", showPolyLine.value)
		console.log("polyline.value", showPolyLine.value)
	}

	function callouttap(e) {
		console.log("callout", e)
	}

	function timeToSeconds(timeStr) {
		const [dateStr, timeStrPart] = timeStr.split(' ');
		const [year, month, day] = dateStr.split('-').map(Number);
		const [hour, minute, second] = timeStrPart.split(':').map(Number);

		const date = new Date(year, month - 1, day, hour, minute, second);
		const startOfDay = new Date(year, month - 1, day, 0, 0, 0);

		return Math.floor((date - startOfDay) / 1000);
	}

	function findClosestItemWithIndex(items, targetSeconds) {
		let closestItem = null;
		let closestIndex = -1;
		let minDifference = Infinity;
		items.forEach((item, index) => {
			const itemSeconds = timeToSeconds(item.time);
			const difference = Math.abs(itemSeconds - targetSeconds);
			// console.log('itemSeconds', itemSeconds, targetSeconds, difference)

			if (difference < minDifference) {
				minDifference = difference;
				closestItem = item;
				closestIndex = index; // 修复：更新最接近项目的索引
			}
		});

		return {
			closestItem,
			closestIndex
		};
	}

	function startThumb(event) {
		showSliderCallout.value = true
		moveThumb(event);
	}

	async function moveThumb(event) {
		const {
			touches
		} = event;
		// 使用clientY而不是screenY，并且需要考虑滑块容器的位置
		const y = touches[0].clientY;
		// 计算滑块容器在屏幕中的位置（top: 25%）
		const containerTop = screenheight.value * 0.25;
		const position = y - containerTop;

		// 计算滑动条的实际高度（600rpx转换为px）
		const pixelRatio = screenwidth.value / 750; // uni-app中750rpx = 屏幕宽度
		const sliderHeight = 600 * pixelRatio; // 滑动条高度
		const thumbHeight = 60 * pixelRatio; // 滑块高度
		const maxPosition = sliderHeight - thumbHeight; // 滑块可移动的最大位置

		// 限制滑块在有效范围内，确保不会滑出滑动条
		if (position < 0) {
			thumbTop.value = 0;
		} else if (position > maxPosition) {
			thumbTop.value = maxPosition;
		} else {
			thumbTop.value = position;
		}

		// console.log('this.thumbTop', this.thumbTop);
		// console.log('sliderHeight', sliderHeight);
		const percent = ((sliderHeight - thumbTop.value) / sliderHeight) * 100;
		// console.log('percent', percent);
		drawRange.value = Math.round(percent * (maxValue.value - minValue.value)) / 100;
		// console.log(markers.value)
		let findeResult = findClosestItemWithIndex(markers.value, drawRange.value + minValue.value)
		console.log(findeResult)
		// 添加安全检查
		if (findeResult.closestItem && findeResult.closestIndex >= 0) {
			calloutContent.value = findeResult.closestItem.callout.content
			slideIndex.value = findeResult.closestIndex
			// console.log("找到目标", findeResult)
			// let tampMarkers = markers.value.slice(0)
			// tampMarkers[findeResult.closestIndex].latitude = findeResult.closestItem.latitude
			// tampMarkers[findeResult.closestIndex].longitude = findeResult.closestItem.longitude
			// tampMarkers[findeResult.closestIndex].callout.content = findeResult.closestItem.callout.content
			// markers.value = new Array()
			// markers.value = tampMarkers
			uniInfoWindowEnable(markers.value[findeResult.closestIndex].id, true)
		}
		console.log("slideIndex.value", slideIndex.value)
	}

	function stopThumb() {
		// 停止拖动滑块
		showSliderCallout.value = false
		// console.log('into moveThumb', this.drawRange);
		// console.log('检测到停止滑块', this.markers)
		let findeResult = findClosestItemWithIndex(markers.value, drawRange.value + minValue.value)

		// 添加安全检查
		if (findeResult.closestItem && findeResult.closestIndex >= 0) {
			const event = {
				detail: {
					markerId: findeResult.closestItem.id
				},
			};
			markertap(event);
		}
		// this.callouttap(event)
		//根据时间更新滑块停止时的 位置
	}

	function ohosReverseLocation(longitude, latitude) {
		uni.showLoading({
			title:"鸿蒙解析位置中"
		})
		let position = gcj02_to_wgs84(longitude, latitude)
		$uni.getAddressesFromLocation({
			latitude: position[1],
			longitude: position[0],
			success: (res) => {
				console.log("getAddressesFromLocation", res)
				uni.hideLoading()
				address.value = res[0].placeName;
			},
			fail: (err) => {
				console.log("getAddressesFromLocationErr", err)
				console.log('获取标记位置失败', res);
			}
		})
	}

	function loAcquire(longitude, latitude) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});


		amapLocation(latitude.toString(), longitude.toString(), 1000).then((res) => {
			uni.hideLoading()
			console.log('res.data.', res)
			if (res.status === '1') {
				address.value = res.regeocode.formatted_address;
				console.log('res.data.result.address', res.regeocode.formatted_address);
			} else {
				ohosReverseLocation(latitude, longitude)
			}
		}).catch((err) => {
			console.log('获取标记位置失败', res);
			uni.hideLoading()
			ohosReverseLocation(latitude, longitude)
		})
	}

	function onregionchange() {
		_mapContext.value.getScale({
			success: (res) => {
				// console.log('获取缩放尺度',res)
				let index = Math.trunc(res.scale) - 3
				// console.log('index',index)
				scaleShow.value = scaleArray.value[index]
				// console.log('that.mapScale',that.scaleShow)
			},
			fail: (err) => {

			}
		})
	}

	function markertap(e) {
		var clickid = e.detail.markerId;
		console.log("markertap",e)
		uniInfoWindowEnable(clickid, true)
		console.log("click e=", e);
		console.log('clickid', clickid);
		console.log('time', markers.value.find(marker => marker.id == clickid).time);
		coverTime.value = markers.value.find(marker => marker.id == clickid).time;
		switch (markers.value.find(marker => marker.id == clickid).locType) {
			case 1:
				locateType.value = "GPS信号弱"
				locateTypeGps.value = false
				break;
			case 2:
				locateTypeGps.value = true
				if (markers.value.find(marker => marker.id == clickid).HDOP < 15)
					locateType.value = "GPS信号强"
				else
					locateType.value = "GPS信号弱"
				break;
			case 3:
				locateTypeGps.value = false
				locateType.value = "基站"
				break;
			case 4:
				locateTypeGps.value = false
				locateType.value = "home"
				break;
			default:
				break;
		}
		loAcquire(markers.value.find(marker => marker.id == clickid).latitude, markers.value.find(marker => marker.id ==
			clickid).longitude);
		// this._mapContext.moveToLocation({
		// 	longitude: this.markers[clickid].longitude,
		// 	latitude: this.markers[clickid].latitude
		// })
	}

	function adjustMapView() {
		try {
			console.log('start')
			// if (!_mapContext.value || markers.value.length === 0) return;
			// if (!_mapContext.value || markers.value.length === 0) return;
			// 调用地图组件的 includePoints 方法
			// _mapContext.value.includePoints({
			// 	points: markers.value,
			// 	padding: [90, 90, 90, 90] // 上右下左的边距
			// });
			let info = uni.getSystemInfoSync()
			console.log(info.windowWidth, info.windowHeight)
			let center = calculateSphericalCenter(markers.value, info.windowWidth, info.windowHeight)
			console.log(center)
			uniUpdateCamera({
				latitude: center.latitude,
				longitude: center.longitude,
				zoom: center.scale
			})
			console.log('end', markers.value)
			uniInfoWindowEnable(markers.value[markers.value.length-1].id,true)
		} catch (e) {
			console.log('包裹点出错', e)
		}

	}

	async function showMarker(data, date) {
		if (data != null && data.length > 0) {
			console.log('data', data);
			let dataArray = new Array();
			dataArray = util.douglasPeucker(data, 0)
			console.log('dataArray', dataArray);
			var markarray = new Array();
			try {
				let lastitem;
				let cnt = 0;
				//在这里加一个简单的过滤根据时间和距离删除跳变的点
				for (let i = 0; i < dataArray.length; i++) {
					var icon = '/static/imgs/tragectory/trajectory.png';
					let item = dataArray[i];

					var marker = {
						id: cnt,
						latitude: item.latitude,
						longitude: item.longitude,
						locType: item.locType,
						iconPath: getStaticOh(icon),
						width: 20,
						height: 20,
						time: item.atime,
						// joinCluster: true,
						callout: {
							content: item.atime.substring(11, 16),
							// anchorY: 5,
							// anchorX: 0,
							display: "BYCLICK",
							color: '#ff5500',
							bgColor: 'rgba(255, 255, 255, 1)',
							textAlign: 'center',
							borderRadius: '10rpx',
							borderColor: 'rgba(255, 85, 0, 1.0)',
							borderWidth: 1,
							padding: 4
						}
					}
					if (i > 0) {
						let HW = getApp().globalData.myHardwareVersion
						let HDOP = item.HDOP
						let DB_HZ = item.DB_HZ
						let type = item.locType
						if (item.locType === 3) {
							console.log('我发现一个可能的噪点');
						} else {
							markarray[cnt] = marker;
							cnt++;
						}
					} else {
						markarray[cnt] = marker;
						cnt++;
					}

				}

			} catch (e) {
				console.log('发现噪点出错', e);
			}

			if (markarray.length > 0) {
				console.log('showPolyLine.value', showPolyLine.value)
				const newList = markarray.map(item => ({
					latitude: item.latitude,
					longitude: item.longitude
				}));
				console.log("newList", newList)
				let line = {
					points: newList,
					color: "#31c27c",
					width: 40,
					arrowLine: true,
					borderWidth: 2, //线的边框宽度，还有很多参数，请看文档 
					borderColor: "#808080",
					arrowIconPath: "/static/imgs/traffic_texture.png"
				}
				polyline.value = new Array()
				polyline.value[0] = line
				uniClearAllPolylines()
				showPolyLine.value = true
				try {
					// 修复：polyline.value是数组，需要访问第一个元素
					const polylineItem = polyline.value[0]
					if (polylineItem) {
						polylineId.value = uniAddPolyline({
							id: 0,
							points: polylineItem.points,
							width: polylineItem.width,
							// color: colorToHexNumber(String(polylineItem.color)),
							arrowIconPath: getStaticOh(polylineItem.arrowIconPath)
						})
					}
				} catch (err) {
					console.log("uniAddPolyline", err)
				}


				maxValue.value = timeToSeconds(markarray[markarray.length - 1].time)
				minValue.value = timeToSeconds(markarray[0].time)
				console.log('maxValue.value', maxValue.value, minValue.value)


				let calloutitem = JSON.parse(JSON.stringify(markarray[markarray.length - 1]));
				const event = {
					detail: {
						markerId: calloutitem.id
					},
				};
				calloutitem.id = 1000
				calloutitem.callout.display = "ALWAYS"
				calloutitem.calloutitem = ''
				markarray.push(calloutitem)
				markers.value = new Array();
				markers.value = markarray;
				
				console.log('markers.value', markers.value);
				//this.latitude = this.markers[0].latitude;
				longitude.value = markers.value[markers.value.length - 1].longitude;
				latitude.value = markers.value[markers.value.length - 1].latitude;
				console.log('MapCamera', latitude.value, longitude.value);
				uniClearAllMarkers()
				for (let item of markers.value) {
					uniAddMarker({
						id: item.id,
						latitude: item.latitude,
						longitude: item.longitude,
						iconPath: item.iconPath,
						width: item.width,
						height: item.height,
						title: item.time
					})
				}
				markertap(event)
				setTimeout(() => {
					adjustMapView()
				}, 500)
				// this._mapContext.moveToLocation({
				// 	longitude: this.longitude,
				// 	latitude: this.latitude,
				// 	success: (res) => {
				// 		console.log('跳转地图中心点成功');
				// 	},
				// 	fail: (err) => {
				// 		console.log('跳转地图中心点失败');
				// 	}
				// })

			}
		} else {
			uni.showToast({
				title: '当天休息',
				icon: 'error'
			})
			markers.value = new Array();
			uniClearAllMarkers()
			polyline.value = new Array();
			uniClearAllPolylines()
			$uni.getLocation({
				isHighAccuracy: true,
				type: "gcj02",
				success(res) {
					alert('Geolocation\nLatitude:' + res.latitude + '\nLongitude:' + res.longitude +
						'\nAltitude:' + res.altitude);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					latitude.value = res.longitude
					longitude.value = res.latitude
				},
				fail(err) {
					console.error('获取位置失败：', err);
				}
			})
		}
	}

	function getDistance(lat1, lon1, lat2, lon2) {
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
	// 新的数据获取方法
	function getNewLocationList({
		serialCode = serial_code.value,
		queryDate = date.value
	}) {
		return new Promise((resolve, reject) => {
			getLocationList({
				serialCode,
				queryDate
			}).then(async (reciveData) => {
				isLoading.value = false
				if (reciveData.success && reciveData.data && reciveData.data.length > 0) {
					console.log('获取到轨迹数据:', reciveData.data);
					await showMarker(reciveData.data, queryDate);
					resolve(reciveData.data);
				} else {
					uni.showToast({
						title: '当天无位置数据',
						icon: 'error'
					});
					markers.value = new Array();
					polyline.value = new Array();
					uniClearAllMarkers()
					uniClearAllPolylines()
					uni.hideLoading()
					resetToCurrentLocation();
					resolve([]);
				}
			}).catch(error => {
				console.error('获取轨迹数据失败:', error);
				reject(error);
			});
		});
	}

	function resetToCurrentLocation() {
		$uni.getLocation({
			type: "gcj02",
			success: (res) => {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				// let pos = wgs84_to_gcj02(res.longitude, res.latitude);
				latitude.value = res.longitude;
				longitude.value = res.latitude;
				uniUpdateCamera({
					latitude: latitude.value,
					longitude: longitude.value,
					zoom: 18
				})
			},
			fail: (err) => {
				console.error('获取位置失败：', e);
				// 设置默认位置
				latitude.value = 30.043543;
				longitude.value = 120.808837;
				uniUpdateCamera({
					latitude: latitude.value,
					longitude: longitude.value,
					zoom: 18
				})
			}
		})
		plus.geolocation.getCurrentPosition(function(p) {
			console.log('当前位置的经度：' + p.coords.longitude);
			console.log('当前位置的纬度：' + p.coords.latitude);
			let pos = wgs84_to_gcj02(p.coords.longitude, p.coords.latitude);
			that.latitude = pos[1];
			that.longitude = pos[0];
		}, function(e) {
			console.error('获取位置失败：', e);
			// 设置默认位置
			that.latitude = 30.043543;
			that.longitude = 120.808837;
		});
	}

	function dateClick(date, index) {
		uni.showLoading({
			title: date.toString(),
			mask: true
		})
		thumbTop.value = 0
		clickIndex.value = index;
		address.value = '';
		coverTime.value = '';
		locateType.value = '';
		const parts = date.split('-');
		clickDate.value = parts.join('/');
		console.log('date click', date, serial_code.value)
		// 调用新的方法
		getNewLocationList({
			serialCode: serial_code.value,
			queryDate: date
		})
		var storageKey = serial_code.value.toString() + date.toString();
		console.log('storageKey', storageKey);
		// var storageKey = serial_code.value.toString() + date.toString();
		// return new Promise((resolve, reject) => {
		// 	var traDataUrl = getApp().globalData.internet + getApp().globalData
		// 		.trajectoryData;
		// 	console.log('参数', serial_code.value, date, Did.value, Pid.value)
		// 	uni.request({
		// 		url: traDataUrl,
		// 		method: 'POST',
		// 		data: {
		// 			serial_code: serial_code.value,
		// 			date: date,
		// 			did: Did.value,
		// 			pid: Pid.value
		// 		},
		// 		header: {
		// 			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', //重点
		// 			// 'token':cookie
		// 		},
		// 		success: (res) => {
		// 			resolve(res);
		// 		},
		// 		fail: (err) => {
		// 			reject(err);
		// 		}
		// 	})
		// }).then(async (res) => {
		// 	console.log(res)
		// 	uni.hideLoading();
		// 	if (res.data.code === 200) {
		// 		isLoading.value=false
		// 		//缓存
		// 		console.log('获取日期路径成功', res);
		// 		var data = res.data.data;
		// 		//拿到数据后给marker赋值
		// 		uni.setStorageSync(storageKey, data)
		// 		await showMarker(data, date);
		// 		console.log('新缓存一组日期路径数据', data);
		// 	} else {
		// 		uniClearMap()
		// 		console.log('获取日期路径失败', res);
		// 		var err = new Array();
		// 		//拿到数据后给marker赋值
		// 		// uni.setStorageSync(storageKey, err);
		// 		await showMarker(err, date);
		// 		uni.hideLoading()
		// 		// uni.showToast({
		// 		// 	title: '当天休息',
		// 		// 	icon: 'error'
		// 		// })
		// 	}
		// }, (err) => {
		// 	uni.hideLoading()
		// 	uni.showToast({
		// 		title: '查询失败',
		// 		icon: 'error'
		// 	})
		// 	console.log('查询失败', err)
		// })
	}

	function onTouchStart(event) {
		startX.value = event.touches[0].clientX; // 记录起始触摸位置
		isDragging.value = true; // 标记开始拖动
	}

	function onTouchMove(event) {
		if (isDragging.value) {
			const deltaX = event.touches[0].clientX - startX.value; // 计算水平滑动距离
			scrollX.value += deltaX; // 更新滚动位置
			startX.value = event.touches[0].clientX; // 更新起始位置
			// 防止滚动超出边界，可以添加逻辑来限制滚动范围
			// 例如：if (this.scrollX < 0) this.scrollX = 0;
			//       if (this.scrollX > 最大滚动距离) this.scrollX = 最大滚动距离;
		}
	}


	function onTouchEnd() {
		isDragging.value = false; // 结束拖动
	}

	function initDates() {
		const currentDate = new Date();
		for (let i = 0; i < 30; i++) {
			const date = new Date(currentDate);
			date.setDate(currentDate.getDate() - i);
			const formattedDate = formatDate(date);
			dates.value.push(formattedDate);
		}
	}

	function formatDate(date) {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		// return `${year}-${month}-${day}`;
		const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		return {
			days: weekdays[date.getDay()],
			date: `${year}-${month}-${day}`
		}
	}

	function returnParent() {
		getApp().backParents();
	}


	function calculateTimeDifferenceInSeconds(startTime, endTime) {
		// 将时间字符串拆分为小时、分钟和秒
		const startParts = startTime.split(':');
		const endParts = endTime.split(':');

		// 将时间部分转换为整数
		const startHours = parseInt(startParts[0]);
		const startMinutes = parseInt(startParts[1]);
		const startSeconds = parseInt(startParts[2]);

		const endHours = parseInt(endParts[0]);
		const endMinutes = parseInt(endParts[1]);
		const endSeconds = parseInt(endParts[2]);

		// 将时间转换为秒
		const startTotalSeconds = (startHours * 3600) + (startMinutes * 60) + startSeconds;
		const endTotalSeconds = (endHours * 3600) + (endMinutes * 60) + endSeconds;

		// 计算时间差并返回结果
		const timeDifferenceInSeconds = Math.abs(endTotalSeconds - startTotalSeconds);
		return timeDifferenceInSeconds;
	}
</script>

<style>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}

	.scroll-contain {
		/* 导航栏占 10% 高度 */
		background-color: #ffffff;
	}

	.map-view {
		/* 导航栏占 10% 高度 */
		/* background-color: #2fa6a0; */
		width: 100%;
		/* position: relative;
		display: flex;
		flex-direction: column; */
	}

	.slider {
		width: 20rpx;
		height: 600rpx;
		border-radius: 10rpx;
		background: linear-gradient(to top, rgba(255, 87, 51, 1), rgba(255, 152, 25, 1));
		position: relative;
		box-shadow: 0rpx 4rpx 12rpx rgba(255, 87, 51, 0.3);
	}

	.scale-border {
		text-align: center;
		margin-top: 20rpx;
		height: 10%;
		border-bottom: 2rpx solid #000000;
		border-left: 2rpx solid #000000;
		border-right: 2rpx solid #000000;
	}

	.slider-left {
		height: 20rpx;
		width: 0rpx;
		background-color: rgba(47, 166, 160, 0.5);
		border-radius: 10rpx;
		position: relative;
	}

	.container {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.slider-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 160rpx;
		height: 600rpx;
		position: absolute;
		top: 25%;
		right: 30rpx;
		z-index: 10;
	}

	.slider-callout {
		width: 100rpx;
		height: 60rpx;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		left: -110rpx;
	}

	.slider-thumb {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 16rpx rgba(0, 0, 0, 0.3);
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3rpx solid rgba(255, 87, 51, 1);
	}

	.slider-value {
		width: 90rpx;
		text-align: center;
		padding-left: 10rpx;
	}

	.map {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	.scroll-view-container {
		flex: 1;
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		overflow-x: auto;
	}

	.date-selector-container {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 30rpx 30rpx 0 0;
		box-shadow: 0rpx -4rpx 20rpx rgba(0, 0, 0, 0.1);
		padding: 20rpx 0;
	}

	.date-selector-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 260rpx;
	}

	.date-item-wrapper {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20rpx;
		padding: 15rpx;
		height: 150rpx;
	}

	.day-label {
		margin-bottom: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.date-circle {
		height: 80rpx;
		width: 80rpx;
		border-radius: 40rpx;
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.date-circle-selected {
		height: 80rpx;
		width: 80rpx;
		border-radius: 40rpx;
		background-color: rgba(255, 87, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.date-number {
		font-size: 32rpx;
		color: rgba(51, 51, 51, 1);
		font-weight: 500;
	}

	.date-number-selected {
		font-size: 32rpx;
		color: rgba(255, 255, 255, 1);
		font-weight: 600;
	}

	.background_border {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.info-card-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: absolute;
	}

	.top-controls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.map-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 8rpx 16rpx;
		box-shadow: 0rpx 4rpx 16rpx rgba(0, 0, 0, 0.1);
		min-height: 48rpx;
	}

	.map-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.path-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 8rpx 16rpx;
		box-shadow: 0rpx 4rpx 16rpx rgba(0, 0, 0, 0.1);
		min-height: 48rpx;
	}

	.info-card {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		box-shadow: 0rpx 4rpx 24rpx rgba(0, 0, 0, 0.15);
		padding: 24rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.card-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		flex-wrap: wrap;
	}

	.date-text {
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
	}

	.device-text {
		font-size: 24rpx;
		color: #666666;
	}

	.gps-icon {
		width: 32rpx;
		height: 32rpx;
	}

	.status-badge {
		background-color: rgba(255, 87, 51, 1);
		border-radius: 16rpx;
		padding: 6rpx 12rpx;
		display: flex;
		align-items: center;
	}

	.status-text {
		font-size: 22rpx;
		color: white;
		font-weight: 500;
	}

	.address-section {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.location-icon {
		width: 24rpx;
		height: 26rpx;
		margin-right: 12rpx;
		flex-shrink: 0;
	}

	.address-text {
		flex: 1;
		font-size: 24rpx;
		color: rgba(255, 87, 51, 1);
		line-height: 1.4;
	}

	.icon {}

	.row_center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.col_center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>