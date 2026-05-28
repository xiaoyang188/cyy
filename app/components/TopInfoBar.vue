<template>
	<view class="top-info-bar ">
		<!-- 比例尺和地图信息 -->
		<view class="map-info">
			<image src="/static/imgs/locate/gaode.png" class="map-icon" />
			<view class="map-text">
				<text class="map-title">高德地图</text>
				<text class="map-number" v-if="data.mapNumber">{{ data.mapNumber }}</text>
			</view>
		</view>
		<image class="bg-image" src="/static/new/bg-add2.png"></image>
		<view class="device-info-section" :style="deviceInfoStyle">
			<view class="device-card">
				<view class="avatar-section">
					<image :src="data.loadobject.avatar" class="avatar-image" />
					<!-- <text v-if="data.loadobject" class="pet-name">{{ data.loadobject.pname }}</text> -->
				</view>
				<view class="device-details">
					<view class="detail-row-status" style="width: 240rpx;" @tap="$emit('showFloorTitle')">
						<text class="status-text">{{data.infoData}}</text>
						<image v-if="data.infoData!='设备在线'" src="/static/new/icon-arrow-black.png" class="status-arrow" mode="widthFix"></image>
					</view>
					<view class="detail-row" style="height: 40rpx;">
						<text v-if="data.loadobject" class="device-serial">
							设备编号:{{ data.loadobject.serialCode }}
						</text>
					</view>
					<view class="detail-row" style="height: 40rpx;">
						
						<view class="status-icons">
							<view class="battery-container">
								<image v-if="data.loadobject" :src="data.loadobject.battaryImageSrc"
									class="battery-icon" />
								 <view
								    v-if="data.loadobject && data.batteryMode"
								    class="battery-text-wrap"
								  >
								  <view class="battery-text-inner">
									  <view style="height: 26rpx;width: 30rpx;display: flex;align-items: center;justify-content: center;">  <text class="battery-text">
									    {{ data.loadobject.presentBattary }}
									  </text></view>
									  <image v-if="data.isCharge" class="battery-power-charge" src="/static/xixin/charge.png" mode=""></image>
								  </view>
								  </view>
							</view>
							<view class="signal-section" :style="{ backgroundColor: signalBgColor }">
								<image :src="gpsIcon" class="status-icon" style="margin-left: 5rpx;" />
								<text class="signal-text">{{ data.positionSignal}}</text>
							</view> 
							<view class="signal-section" :style="{ backgroundColor: bluetoothBgColor }">
								<image :src="bluetoothIcon" class="status-icon" style="margin-left: 5rpx;" />
								<text class="signal-text">{{data.bluetoothConnect ? '蓝牙已连接':'蓝牙未连接'}}</text>
							</view> 
						</view>
					</view>
				</view>
				<view class="button-details">
					<view class="ln-area" @click="$emit('refresh')">
						<image class="ln-icon" src="/static/new/icon-refresh.png" mode=""></image>
						<text class="ln-text">定位</text>
					</view>
					<view class="ln-area" @click="$emit('nagivation')">
						<image class="ln-icon" src="/static/new/icon-navigation.png" mode=""></image>
						<text class="ln-text">导航</text>
					</view>
				</view>
			</view>
		</view>
		<view :style="scaleStyle">
			<view class="scale-content">
				<view class="time-area">
					<text class="time-text">
					    更新：{{ data.lastLocateTime }} 
					</text>
					<view v-if="data.deviceOffline != '设备离线'">
					    <view  class="row_center" style="margin-left: 8rpx;" v-if="data.locateTime.length !== 11">
					        <text class="time-text">{{ data.loacateClock }}</text> 
					        <text v-if="showDots" class="dots">{{ data.dots }}</text>
					    </view>
					    <view v-else>
					        <text class="time-text" style="margin-left: 8rpx;" >({{ data.serviceLocateMode }})</text> 
					    </view>
					</view>
					<view style="margin-left: 8rpx;"  v-else>
					    <text class="time-text">已离线</text> 
					</view>
					<image class="time-right" v-if="data.deviceOffline === '设备离线'" src="/static/new/icon-arrow-black.png"></image>
				</view>
				<view class="locate-area" @click="$emit('model-change')">
					<view class="locate-box">
						<image class="locate-icon" src="/static/new/icon-locate-mode.png" mode=""></image>
						<text class="locate-text">{{data.deviceConnectModolStatue}}</text>
						<text v-if="data.deviceConnectModolStatue === '切换中'" class="dots">{{ data.dots }}</text>
					</view>
					<image class="time-right" src="/static/new/icon-arrow-black.png"></image>
				</view>
				<!-- 

				<view class="scale-container">
					<view class="scale-border">
						<text class="scale-text">{{ scaleShow }}</text>
					</view>
				</view>

				<view class="action-buttons">
					<view v-if="showRefresh" class="action-button" @click="$emit('refresh')">
						<image src="/static/imgs/locate/refresh.png" class="button-icon" />
						<text class="button-text">刷新位置</text>
					</view>
					<view class="action-button" @click="$emit('change-target')">
						<image src="/static/imgs/locate/targetLogo.png" class="button-icon" />
						<text class="button-text">位置切换</text>
					</view>
					<view class="action-button" @click="$emit('model-change')">
						<image src="/static/imgs/locate/blackPath.png" class="button-icon" />
						<text class="button-text">{{ data.deviceConnectModolStatue }}</text>
						<text v-if="data.deviceConnectModolStatue === '切换中'" class="dots">{{ data.dots }}</text>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TopInfoBar',
		props: {
			data: {
				type: Object,
				default: () => ({
					mapNumber: '',
					firmwareVersion: 0,
					DeviceConnectModol: 0,
					deviceConnectModolStatue: '',
					dots: '.',
					loadobject: null,
					locType: 0,
					bluetoothConnect: false,
					batteryMode: false,
					lastLocateTime: '',
					locateTime: '',
					deviceOffline: '',
					loacateClock: '',
					serviceLocateMode: '',
					positionSignal: '',
					infoData:'',
				})
			},
			scaleShow: {
				type: String,
				default: '100m'
			}
		},
		computed: {
			showRefresh() {
				return this.data.firmwareVersion >= 60 && this.data.DeviceConnectModol === 1;
			},
			avatarBorderColor() {
				if (!this.data.loadobject) return '#2a82e4';
				return this.data.loadobject.gender === 0 ?
					'rgba(42, 130, 228, 1)' :
					'rgba(227, 60, 100, 1)';
			},
			gpsIcon() {
				if (this.data.locType === 2) return '/static/xixin/GPS.png';
				if (this.data.locType === 4) return '/static/xixin/GPSGray.png';
				return '/static/xixin/GPSGray.png';
			},
			bluetoothIcon() {
				return this.data.bluetoothConnect ?
					'/static/xixin/Bluetooth.png' :
					'/static/xixin/Bluetooth_disconnect.png';
			},
			timeBgColor() {
				if (!this.data.loadobject) return '#2a82e4';
				return this.data.loadobject.gender === 0 ?
					'rgba(42, 130, 228, 1)' :
					'rgba(227, 60, 100, 1)';
			},
			signalBgColor() {
				if (this.data.locType === 2) return '#EFF4FF';
				if (this.data.locType === 4) return '#F3F4F8';
				return '#F3F4F8';
			},
			bluetoothBgColor(){
				return this.data.bluetoothConnect ?
					'#EFF4FF' :
					'#F3F4F8';
			},
			showDots() {
				const clock = this.data.loacateClock;
				return clock === '请求中' || clock === '定位中' ||
					clock === '等待中' || clock === '获取中';
			},
			scaleStyle() {
				// 根据类型计算位置
				return {
					position: 'absolute',
					bottom: '5rpx',
					left: '15rpx',
					right: '15rpx',
				};

			},
			deviceInfoStyle() {
				// 根据类型计算位置
				const baseStyle = {
					position: 'absolute',
					left: '15rpx',
					right: '15rpx',

				};

				return {
					...baseStyle,
					top: '84rpx'
				};
			}
		},
		methods: {
			handleTimeClick() {
				if (this.data.deviceOffline) {
					this.$emit('offline-click');
				}
			}
		}
	};
</script>

<style scoped>
	.top-info-bar {
		width: 750rpx;
		height: 330rpx;
		position: fixed;
		bottom: 0px;
		left: 0px;
		z-index: 999;
		padding: 20rpx;
		pointer-events: auto;
		overflow: hidden;
		/* 确保圆角生效 */
	}

	/* 比例尺部分 */
	.scale-content {
		width: 720rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content:space-between;
	}

	.map-info {
		width: 145rpx;
		height: 60rpx;
		padding-right: 5rpx;
		border-radius: 25rpx;
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.map-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.map-text {
		display: flex;
		flex-direction: column;
		margin-left: 5rpx;
	}

	.map-title {
		font-size: 20rpx;
		color: rgba(125, 125, 125, 0.50);
		font-weight: 700;
	}

	.map-number {
		font-size: 13rpx;
		color: rgba(125, 125, 125, 0.50);
	}

	/* 比例尺容器 */
	.scale-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 125rpx;
		height: 60rpx;
	}

	.scale-border {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 30rpx;
		border-bottom: 1px solid #000000;
		border-left: 1px solid #000000;
		border-right: 1px solid #000000;
	}

	.scale-text {
		color: #000000;
		font-size: 24rpx;
		text-align: center;
	}

	/* 操作按钮 */
	.action-buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.action-button {
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.20);
		height: 50rpx;
		background-color: #ffffff;
		padding: 0 5rpx;
		border-radius: 25rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 5rpx;
	}

	.action-button:last-child {
		margin-right: 5rpx;
	}

	.button-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.button-text {
		font-size: 24rpx;
		color: #000000;
		margin-left: 5rpx;
	}

	.dots {
		color: #000000;
		text-align: center;
		width: 30rpx;
	}

	/* 设备信息卡片 */
	.device-card {
		display: flex;
		flex-direction: row;
		height: 160rpx;
		justify-content: space-around;

		border-radius: 25rpx;
	}

	.avatar-section {
		width: 150rpx;
		height: 160rpx;
		border-radius: 25rpx 0 0 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0;
	}

	/* .avatar-container {
		height: 115rpx;
		width: 115rpx;
		border-radius: 49rpx;
		border-width: 6rpx;
		border-style: solid;
		display: flex;
		align-items: center;
		justify-content: center;
	} */

	.avatar-image {
		width: 110rpx;
		height: 110rpx;
		border-radius: 55rpx;
	}

	.pet-name {
		font-size: 24rpx;
		font-weight: 400;
		margin-top: 5rpx;
	}

	/* 设备详情 */
	.device-details {
		width: 350rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.button-details {
		width: 220rpx;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.detail-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		width: 350rpx;
	}
	.detail-row-status{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		width: 240rpx;
		border-radius: 24rpx;
		background-color: #FFFFFF;
	}
	.device-serial {
		color: rgba(128, 128, 128, 1);
		font-size: 28rpx;
	}

	.status-icons {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 350rpx;
	}

	.status-icon {
		width: 28rpx;
		height: 28rpx;
		margin-left: 15rpx;
	}


	/* 电量容器 */
	.battery-container {
		width: 60rpx;
		height: 26rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.battery-icon {
		width: 50rpx;
		height: 26rpx;
		position: absolute;
		top: 0;
		left: 5rpx;
	}

	.battery-text {
		font-size: 15rpx;
		color: #000000;
		z-index: 1;
		position: absolute;
		width: 50rpx;
		text-align: center;
	}
	.battery-text-wrap {
	  position: absolute;
	  top: 0;
	  width: 50rpx;
	  height: 26rpx;
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	}
	.battery-text-inner {
	 height: 18rpx;    
	  width: 50rpx;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	}
/* 	iOS 特有样式
	.platform-ios .battery-container {
		width: 66rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.platform-ios .battery-icon {
		width: 66rpx;
		height: 30rpx;
		left: 0;
	}

	.platform-ios .battery-text {
		width: 66rpx;
		left: 0;
		top: 0;
		height: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	} */

	/* 时间部分 */
	.time-section {
		width: 380rpx;
		border-radius: 40rpx;
		padding: 0 5rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 60rpx;
	}

	.time-label {
		font-size: 25rpx;
		color: #FFFFFF;
	}

	.time-value,
	.time-mode {
		font-size: 25rpx;
		color: #FFFFFF;
		margin-left: 2rpx;
	}

	/* 离线显示 */
	.offline-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 2rpx;
		height: 60rpx;
		padding-left: 5rpx;
	}

	.offline-text {
		font-size: 25rpx;
		color: #FFFFFF;
	}
	.status-text{
		margin-left: 10rpx;
		 font-size: 28rpx;
		 color: #000000;
	}
	.status-arrow {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	
	.offline-arrow {
		width: 25rpx;
		height: 25rpx;
		margin-left: 5rpx;
	}

	/* 信号指示器 */
	.signal-section {
		width: 134rpx;
		height: 35rpx;
		margin-left: 7rpx;
		display: flex;
		border-radius: 100rpx 8rpx 8rpx 100rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.signal-indicator {
		width: 170rpx;
		height: 60rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.signal-text {
		font-size: 18rpx;
		margin-left: 5rpx;
		color: #000000;
	}

	.bg-image {
		position: absolute;
		top: 60rpx;
		left: 0;
		width: 750rpx;
		height: 270rpx;
		z-index: -1;
		border-radius: 40rpx 40rpx 0px 0px;
		background-color: #FFFFFF;
		/* 放在内容下面 */
	}

	.bottom-top {
		flex: 2;
		flex-direction: row;
	}

	.device-info-section {
		border-radius: 25rpx;
	}
	.ln-area{
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.ln-icon{
		width: 40rpx;
		height: 40rpx;
	}
	.ln-text{
		width: 60rpx;
		font-size: 28rpx;
		margin-top: 15rpx;
		text-align: center;
	}
	.time-area{
		background: rgba(250, 83, 0, 0.03);
		border: 1rpx solid rgba(250, 83, 0, 0.5);
		border-radius: 16rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 0 15rpx;
		width: 444rpx;
		height: 70rpx;
		margin-left: 10rpx;
	}
	.locate-area{
		background: rgba(250, 83, 0, 0.03);
		border: 1rpx solid rgba(250, 83, 0, 0.5);
		border-radius: 16rpx;
		flex-direction: row;
		align-items: center;
		padding: 0 15rpx ;
		margin-right: 10rpx;
		width: 240rpx;
		height: 70rpx;
	}
	.time-text{
		font-size: 28rpx;
	}
	.time-right{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: 20rpx;
		
	}
	.locate-box{
		position: absolute;
		height: 100%;
		flex-direction: row;
		align-items: center;
	}
	.locate-icon{
		width: 44rpx;
		height: 44rpx;
	}
	.locate-text{
		font-size: 28rpx;
		margin-left: 10rpx;
	}
	.battery-power-charge{
		width: 15rpx;
		height: 15rpx;
	}
</style>