<template>
	<view>
		<!-- <embed class="native-map" tag="map" :options="options" @markertap="onMarkerTap" @initMapEnd="initMapEnd"
			@onCameraChange="onCameraChange"></embed> -->
		<embed class="native-map" tag="map" :options="options" @markertap="onMarkerTap" @ready="onReady"
			@maptap="onMapTap" @maptypechange="onMapTypeChange"></embed>
		<view class="container">
			<view class="top-button" v-if="!showHaveDevice">
				<view class="help-wrapper" @click="showHelp">
					<image class="help-icon"
						:src="darkMode=='light'?'/static/new/icon-help.svg':'/static/new/icon-help-light.svg'" mode="">
					</image>
					<text class="help-text">帮助</text>
				</view>
				<view class="setting-correct">
					<view class="sc-area" @click="toBellSetting">
						<image class="help-icon"
							:src="darkMode=='light'?'/static/new/icon-setting.svg':'/static/new/icon-setting-light.svg'"
							mode=""></image>
						<text class="help-text">设置</text>
					</view>
					<view class="divider-sc"></view>
					<view class="sc-area" @click="openCorrect">
						<image class="help-icon"
							:src="darkMode=='light'?'/static/new/icon-correct.svg':'/static/new/icon-correct-light.svg'"
							mode=""></image>
						<text class="help-text">纠偏</text>
					</view>
				</view>
			</view>

			<view class="left-tools" v-if="!showHaveDevice">
				<view class="sc-area"
					:style="{backgroundColor:ladarUse?(darkMode=='light'?'rgba(255, 87, 51, 0.1)':'#3d3d3d'):(darkMode=='light'?'#FFF':'#000')}"
					@click="ladarPet">
					<image class="tool-icon" :src="ladarUrl" mode=""></image>
					<text class="tool-text">寻宠</text>
				</view>
				<view class="divider-tools"></view>
				<view class="sc-area"
					:style="{backgroundColor:railUse?(darkMode=='light'?'rgba(255, 87, 51, 0.1)':'#3d3d3d'):(darkMode=='light'?'#FFF':'#000')}"
					@click="railPet">
					<image class="tool-icon" :src="railUrl" mode=""></image>
					<text class="tool-text">围栏</text>
				</view>
				<view class="divider-tools"></view>
				<view class="sc-area"
					:style="{backgroundColor:leadUse?(darkMode=='light'?'rgba(255, 87, 51, 0.1)':'#3d3d3d'):(darkMode=='light'?'#FFF':'#000')}"
					@click="leadPet">
					<image class="tool-icon" :src="leadUrl" mode=""></image>
					<text class="tool-text">牵引</text>
				</view>
				<view class="divider-tools"></view>
				<view class="sc-area" @click="dataRoute" :style="{backgroundColor:darkMode=='light'?'#FFF':'#000'}">
					<image class="tool-icon" src="/static/new/5@3x.png" mode=""></image>
					<text class="tool-text">轨迹</text>
				</view>
			</view>

			<view class="map-info">
				<image src="/static/imgs/locate/petalmap.png" style="width: 32rpx;height: 32rpx;margin-right: 8rpx;">
				</image>
				<view class="map-text">
					<text style="font-size: 22rpx;font-weight: 600;"
						:style="{color:darkMode=='light'?(mapNumber=='GS(2024)1955号'?'#000000':'#FFFFFF'):'#FFFFFF'}">Petal
						Maps</text>
					<text style="font-size: 10rpx;"
						:style="{color:darkMode=='light'?(mapNumber=='GS(2024)1955号'?'#666666':'#b4b4b4'):'#b4b4b4'}">{{mapNumber}}</text>
				</view>
			</view>
			<!-- <AlertModal v-if='showFloor' :infodata="floor==''?deviceOffline:floor" @closeFloor="showFloorTitle" /> -->
			<view class="right-tools" v-if="!showHaveDevice">
				<view class="setting-correct">
					<view class="sc-area" @click="clickedRgbOrBell('bell')"
						:style="{backgroundColor:bellUse?(darkMode=='light'?'rgba(255, 87, 51, 0.1)':'#3d3d3d'):(darkMode=='light'?'#FFF':'#000')}">
						<image class="br-icon"
							:src="darkMode=='light'?'/static/new/icon-buzzer.svg':'/static/new/icon-buzzer-light.svg'"
							mode=""></image>
						<text
							:class="waitBellText !== '' ? 'control-text' : 'help-text'">{{waitBellText !== ''?waitBellText:'响铃'}}</text>
					</view>
					<view class="divider-sc"></view>
					<view class="sc-area" @click="clickedRgbOrBell('rgb')"
						:style="{backgroundColor:rgbUse?(darkMode=='light'?'rgba(255, 87, 51, 0.1)':'#3d3d3d'):(darkMode=='light'?'#FFF':'#000')}">
						<image class="br-icon"
							:src="darkMode=='light'?'/static/new/icon-rgb.svg':'/static/new/icon-rgb-light.svg'"
							mode=""></image>
						<text
							:class="waitRgbText !== '' ? 'control-text' : 'help-text'">{{waitRgbText!=''?waitRgbText:'灯光'}}</text>
					</view>
				</view>
				<view class="location-switch" @click="changeTarget">
					<image class="sight-icon"
						:src="darkMode=='light'?'/static/new/icon-sight.svg':'/static/new/icon-sight-light.svg'">
					</image>
				</view>
			</view>

			<view class="bottom-area" v-if="!showHaveDevice">
				<view class="bottom-top">
					<view class="avater-area">
						<image class="pet-avater" :src="(loadobject && loadobject.avatar) ? loadobject.avatar : ''">
						</image>
						<!-- <image class="pet-switch" src="/static/new/icon-switch.svg"></image> -->
						<!-- <text class="pet-name">{{ (loadobject && loadobject.pname) ? loadobject.pname : '' }}</text> -->
					</view>
					<view class="data-button">
						<view class="data-modal">
							<view class="info-modal">
								<view class="info-status">
									<text class="info-text" v-if="locateInfoData!=''">{{locateInfoData}}</text>
									<text class="info-text" v-else>{{deviceOffline}}</text>
									<image class="info-left" v-if="loadobject.serialCode.startsWith('ae')"
										:src="darkMode=='light'?'/static/new/icon-arrow-black.svg':'/static/new/icon-arrow-white.svg'"
										@click="showFlowDialog">
									</image>
								</view>
							</view>
							<view class="device-serial">
								<text
									class="serial-text">设备编号：{{ (loadobject && loadobject.serialCode) ? loadobject.serialCode : '' }}</text>
							</view>
							<view class="device-info">
								<view class="battery-area">
									<image class="battery-icon" v-if="loadobject!=null"
										:src="loadobject.battaryImageSrc" />
									<text
										class="battery-text">{{ (loadobject && loadobject.presentBattary !== undefined) ? loadobject.presentBattary : 0 }}</text>
									<image class="charge-icon" src="/static/xixin/charge.png" v-if="isCharge==true"></image>	
								</view>
								<view class="bluetooth-location"
									:style="{backgroundColor:locType === 2 ? '#d5e2fe' : (locType === 4 ? '#F3F4F8' : '#F3F4F8')}">
									<view class="location-box"
										:style="{backgroundColor:locType === 2 ? '#105CF4' : (locType === 4 ? '#B2B2B2' : '#B2B2B2')}">
										<image class="gps-icon" src="/static/new/icon-gps.svg" mode=""></image>
									</view>
									<text
										class="gps-text">{{locType === 2 ? 'GPS信号强' : (locType === 4 ? 'GPS信号弱' : 'GPS信号弱')}}</text>
								</view>
								<view class="bluetooth-location"
									:style="{backgroundColor:bluetoothConnect?'#d5e2fe':'#F3F4F8'}">
									<view class="location-box"
										:style="{backgroundColor:bluetoothConnect ? '#105CF4' : '#B2B2B2'}">
										<image class="gps-icon" src="/static/new/icon-bluetooth.svg" mode=""></image>
									</view>
									<text class="gps-text">{{bluetoothConnect ? '蓝牙已连接':'蓝牙未连接'}}</text>
								</view>
							</view>
						</view>
						<view class="location-navigation">
							<view class="ln-area" hover-class="ln-area-active" @tap="reFresh(true)">
								<image class="ln-icon"
									:src="darkMode=='light'?'/static/new/icon-refresh.png':'/static/new/icon-refresh-light.png'"
									mode=""></image>
								<text class="ln-text">定位</text>
							</view>
							<view class="ln-area" hover-class="ln-area-active" @tap="toMapAppOH()">
								<image class="ln-icon"
									:src="darkMode=='light'?'/static/new/icon-navigation.png':'/static/new/icon-navigation-light.png'"
									mode=""></image>
								<text class="ln-text">导航</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-status">
					<view class="time-area">
						<text class="time-text">更新：{{lastLocateTime}}
							{{deviceOffline == "设备离线"?'已离线':''}}{{deviceOffline == "设备离线"?'':loacateClock}}</text>
						<image class="time-right" v-if="dataModal=='离线'"
							:src="darkMode=='light'?'/static/new/icon-arrow-black.svg':'/static/new/icon-arrow-white.svg'">
						</image>
					</view>
					<view class="locate-area" @click="toModelChange">
						<view class="locate-box">
							<image class="locate-icon" src="/static/new/icon-locate-mode.svg" mode=""></image>
							<text class="locate-text">{{deviceConnectModolStatue}}</text>
						</view>
						<image class="time-right"
							:src="darkMode=='light'?'/static/new/icon-arrow-black.svg':'/static/new/icon-arrow-white.svg'">
						</image>
					</view>
				</view>
			</view>

			<cover-view v-if="railToast" class="row_center"
				style="position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; display: flex; justify-content: center; align-items: center; margin-top: 100rpx; z-index: 999; pointer-events: none;">
				<cover-view v-if="!showNewRail" class="col_start"
					style="z-index: 1; width: 400rpx;height: 350rpx; border-radius: 40rpx; pointer-events: auto;"
					:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
					<view class="row_between" style="width: 360rpx;margin-top: 10rpx;">
						<div style="width: 30rpx;height: 50rpx;"></div>
						<div><text style="font-size: 28rpx;">电子围栏</text></div>
						<div @click="railPet()" class="row_center" style="width: 50rpx;height: 70rpx;">
							<image
								:src="darkMode=='light'?'/static/imgs/global/close.png':'/static/imgs/global/close-light.png'"
								style="width: 20rpx;height: 20rpx;">
							</image>
						</div>
					</view>
					<view class="col_between"
						style="width: 360rpx;height: 240rpx;padding-top: 30rpx;padding-bottom: 20rpx;">
						<view v-for="(item, index) in localSavePolygons">
							<div v-if="item.points.length>0" class="row_start"
								style=" height: 52rpx; width: 360rpx;border:1px solid rgba(222, 222, 222, 0.5); border-radius: 20px;">
								<!-- <view @click="clickNewRail(item,index)" class="row_start" style="width: 220rpx;"> -->
								<view class="row_start" style="width: 220rpx;">
									<div>
										<image src="/static/imgs/locate/rail_home.png"
											style="width: 25rpx;height: 25rpx;margin-left: 20rpx;"></image>
									</div>
									<div style="margin-left: 25rpx;"><text
											style="lines: 1;text-overflow:ellipsis;width: 150rpx; font-size:25rpx; color: rgba(255, 87, 51, 1);">{{item.name}}</text>
									</div>
								</view>
								<view class="row_end" style="width: 140rpx;">
									<image @click="switchRail(index)"
										:src="item.switch?'/static/imgs/locate/on.png':'/static/imgs/locate/off.png'"
										src="" style="width: 65rpx;height: 65rpx;margin-right: 25rpx;"></image>
									<image @click="deleteRail(index)" src="/static/imgs/locate/delete.png"
										style="width: 35rpx;height: 35rpx;margin-right: 20rpx;"></image>
								</view>
							</div>
							<div @click="clickNewRail(item,index)" v-if="item.points.length<=0" class="row_start"
								style=" height: 52rpx; width: 360rpx;border:1px solid rgba(222, 222, 222, 0.5); border-radius: 20px;">
								<view class="row_start" style="width:220rpx;">
									<div>
										<image src="/static/imgs/locate/add.png"
											style="width: 25rpx;height: 25rpx;margin-left: 20rpx;"></image>
									</div>
									<div style="margin-left: 25rpx;"><text
											style="lines: 1;text-overflow:ellipsis;width: 150rpx; font-size:25rpx; color: rgba(166, 166, 166, 1);">新建围栏</text>
									</div>
								</view>
								<!-- <view class="row_end" style="width:140rpx;">
									<image src="/static/imgs/locate/off.png"
										style="width: 35rpx;height: 35rpx;margin-right: 25rpx;"></image>
									<image src="/static/imgs/locate/delete.png"
										style="width: 35rpx;height: 35rpx;margin-right: 20rpx;"></image>
								</view> -->
							</div>
						</view>
					</view>
				</cover-view>
				<cover-view v-if="showNewRail" class="col_start"
					style="z-index: 2; width: 400rpx;height: 480rpx; border-radius: 40rpx; pointer-events: auto;"
					:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
					<view class="row_between" style="width: 360rpx;margin-top: 20rpx;">
						<div style="width: 30rpx;height: 50rpx;"></div>
						<div><text
								style="font-size: 28rpx;width: 200rpx;color: rgba(255, 87, 51, 1);">按顺序点击地图上位置形成围栏</text>
						</div>
						<div @click="cancleRail" class="row_center" style="width: 50rpx;height: 70rpx;">
							<image
								:src="darkMode=='light'?'/static/imgs/global/close.png':'/static/imgs/global/close-light.png'"
								style="width: 20rpx;height: 20rpx;">
							</image>
						</div>
					</view>
					<div>
						<image src="/static/imgs/locate/railGuild.png" style="width: 238rpx;height: 180rpx;">
						</image>
					</div>
					<div class="row_between"
						style="margin-top: 20rpx; width: 300rpx;border-bottom: 0.5px solid rgba(229, 229, 229, 1);">
						<view style="width: 180rpx;"><text style="font-size: 28rpx;"
								:style="{style:darkMode=='light'?'rgba(56, 56, 56, 1)':'#FFFFFF'}">围栏名称</text></view>
						<view style="width: 180rpx;"> <input type="text"
								v-model="localSavePolygons[clickPolygonIndex].name" maxlength="4" placeholder="请输入"
								style="margin-left: 40rpx; font-size: 28rpx; height: 50rpx;text-align: end;" />
						</view>
					</div>
					<div class="row_around" style="width: 360rpx;margin-top: 20rpx;margin-bottom: 50rpx;">
						<view @click="reDrawRail()" class="myButton" style="width: 120rpx;height: 60rpx;"><text
								style="color: #FFFFFF;font-size: 30rpx;">重绘</text></view>
						<view @click="saveNewRail()" class="myButton" style="width: 120rpx;height: 60rpx;"><text
								style="color: #FFFFFF;font-size: 30rpx;">保存</text></view>
					</div>
				</cover-view>
			</cover-view>

			<view class="maplabel_rail" v-if="outinside">
				<view class="col_center" style="width: 280px;border-radius: 30px;padding: 20rpx;"
					:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
					<!-- <view><cach-image url="../../static/xixin/96x96.png" fileMd5="../../static/xixin/96x96.png"
							width="80rpx" height="80rpx" radius="50%"></cach-image></view> -->
					<view style="align-items: center;padding-left: 5px;margin-top: 20rpx;">
						<text style="width: 220px;">宠悦悦提醒您，您的宠物已经越过电子围栏</text>
					</view>
					<view class="row_around" style="margin-top: 15rpx;margin-bottom: 20rpx;width: 220px;">
						<view @click="closeRail(actionPolygonIndex)" class="myButton"><text
								style="color: #ffffff;">关闭</text>
						</view>
						<view @click="sureRail(1)" class="myButton"><text style="color: #ffffff;">重置</text>
						</view>
					</view>
				</view>
			</view>

			<view class="mask" v-if="ladarToast" @touchstart.stop @touchmove.stop @touchend.stop>
				<view class="drawtoast" style="width:250px">
					<view style="width:250px;border-radius: 30px;"
						:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
						<view class="topBar">
							<text class="title">雷达寻宠</text>
						</view>
						<view style="align-items: center;padding-left: 5px;">
							<text
								style="padding-left: 20rpx;padding-right: 20rpx;line-height: 50rpx;">开启雷达寻宠，蓝牙将持续搜索您附近已关联宠物的绑定设备
								，信号值越强说明设备与您距离越近,是否开启该功能.</text>
							<text
								style="padding-left: 20rpx;padding-right: 20rpx;line-height: 50rpx;">（搜索过程中请勿关闭蓝牙，蓝牙探测范围15米左右）</text>
						</view>
						<view class="button-container">
							<div class="myButton" @click="cancleLadar">
								<text style="color: #FFFFFF;">取消</text>
							</div>
							<div class="myButton" @click="sureLadar(true)">
								<text style="color: #FFFFFF;">确定</text>
							</div>
						</view>
					</view>
				</view>
			</view>

			<div v-if="stopLadarToast" class="rssi-contant">
				<view class="row_center" style="width: 490rpx;height: 550rpx;position: relative;">
					<div class="rotate-background"
						:style="{ transform: 'translate(-50%, -50%) rotate('+ladarRotateAngle+'deg)'}">
						<image src="/static/imgs/locate/ladarSearch.png" style="width: 320rpx;height: 320rpx;">
						</image>
					</div>
					<div class="rssi-flicker">
						<div class="blinking-text"><text style="font-size: 50rpx;color: #FFFFFF;">{{RSSI}}</text></div>
					</div>
					<div class="rotate-bottom-text">
						<view class="row_center" style="height: 60rpx; margin-bottom: 10rpx;"><text
								style="font-size: 28rpx;color:  rgba(255, 87, 51, 1); line-height: 40rpx;">信号数值范围0~100</text>
						</view>
						<view class="row_center" style="height: 60rpx;"><text
								style="font-size: 28rpx;color:  rgba(255, 87, 51, 1); line-height: 40rpx;">{{RSSIText}}
							</text><text v-if="!bluetoothConnect" style="line-height: 40rpx;">{{dots}} </text></view>
					</div>
				</view>

			</div>

			<view class="mask" v-if="drawToast" @touchstart.stop @touchmove.stop @touchend.stop>
				<view class="drawtoast">
					<view style="width:515rpx;border-radius: 62rpx;"
						:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
						<view class="topBar">
							<text class="title">电子牵引</text>
						</view>
						<view style="align-items: center;padding-left: 20rpx;padding-right: 20rpx;">
							<text
								style="padding-left: 20rpx;padding-right: 20rpx;line-height: 50rpx;">开启电子牵引，围绕本人设置一个半径30米范围，宠物离开这个范围App会发送通知</text>
							<text
								style="padding-left: 20rpx;padding-right: 20rpx;line-height: 50rpx;">（开启过程中请不要关闭App）</text>
						</view>
						<view class="button-container">
							<div class="myButton" @click="cancleLead(true)">
								<text style="color: #FFFFFF;">取消</text>
							</div>
							<div class="myButton" @click="sureLead">
								<text style="color: #FFFFFF;">确定</text>
							</div>
						</view>
					</view>
				</view>
			</view>

			<view v-if="showCountdown" :style="{marginTop:`${statusBarHeight+200}rpx`}"
				style="display: flex; justify-content: center; align-items: center;width: 100%;">
				<view style="display: flex;
							flex-direction: row;
							align-items: center;
							width: 190px;
							height: 65px;
							justify-content: center;
							position: relative;">
					<image src="/static/xixin/countdown.png" style="width:190px;height:65px;">
					</image>
					<view
						style="position: absolute;flex-direction: column;align-items: center;justify-content: center;padding-left: 80rpx;">
						<text style="color: rgba(255, 87, 51, 1);font-size: 23rpx;">{{countdown}}</text>
						<text style="font-size: 23rpx;color: black;">内切换到高频</text>
					</view>
				</view>
			</view>

			<view v-if="petDistanceOver" class="maplabel_rail" :style="{ width: screenwidth+'px'}">
				<view class="distanceview">
					<view>
						<image src="/static/imgs/home/logo.png" style="width: 80rpx;height: 80rpx;border-radius: 50%;">
						</image>
					</view>
					<view style="display: flex;align-items: center;padding-left: 5px;">
						<text style="width: 200px;">宠悦悦提醒您，您的宠物已离开您的牵引范围</text>
					</view>
				</view>
			</view>

			<view class="mask" :style="{ height: mapHeight +'px' }" style="width: 750rpx;"
				v-if="showWifiPoint && !showHaveDevice">
				<view class="drawtoast">
					<view style="width:250px;border-radius: 30px;"
						:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
						<view class="topBar">
							<text class="title">温馨提示</text>
						</view>
						<view style="align-items: center;padding-left: 5px;">
							<text
								style="padding-left: 20rpx;padding-right: 20rpx; line-height: 50rpx;">设置家庭Wifi可以提高定位精度，点击确定前去设置</text>
						</view>
						<view
							style="display: flex;flex-direction: row;justify-content: space-between;width: 250px;margin-bottom: 15rpx;margin-top: 10rpx;">
							<view></view>
							<div class="myButton" @click="cancWifiSet">
								<text style="color: #FFFFFF;">取消</text>
							</div>
							<div class="myButton" @click="setWifi"><text style="color: #FFFFFF;">确定</text></div>
							<view></view>
						</view>
						<view @click="nolonger()"
							style="display: flex;flex-direction: row; width: 250px;justify-content: center;align-items: center;height:70rpx;">
							<view style="width: 50rpx;height: 30rpx;">
								<div v-if="!remind"
									style=" width:25rpx;height: 25rpx;border-radius: 12rpx;border:solid #c5c5c5 1px;margin-right: 20rpx;">
								</div>
								<div v-if="remind"
									style=" width:25rpx;height: 25rpx;border-radius: 12rpx;border:solid #c5c5c5 1px;margin-right: 20rpx;background-color: rgba(255, 87, 51, 1);">
								</div>
							</view>
							<text style="font-size: 23rpx;color: rgb(125,125,125);">不再提醒</text>
						</view>
					</view>
				</view>
			</view>

			<view class="mask" :style="{ height: mapHeight+'px' }" style="width: 750rpx;" v-if="showHaveDevice">
				<view class="drawtoast">
					<view style="width:250px;border-radius: 30px;"
						:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
						<view class="topBar">
							<text class="title">温馨提示</text>
						</view>
						<view style="align-items: center;padding-left: 5px;">
							<text
								style="padding-left: 20rpx;padding-right: 20rpx; line-height: 50rpx;">地图界面需要设备数据，请先回主页添加设备</text>
						</view>
						<view
							style="display: flex;flex-direction: row;justify-content: space-between;width: 250px;margin-bottom: 15rpx;">
							<view></view>
							<div class="myButton" @click="goHome"><text style="color: #FFFFFF;">确定</text></div>
							<view></view>
						</view>

					</view>
				</view>
			</view>

			<view class="mask" style="width: 750rpx;" :style="{height:screenheight+'px'}" v-if="showOfflineTitle">
				<view class="drawtoast" style="width: 600rpx;">
					<view class="leave" style="width: 600rpx;">
						<view class="topBar">
							<text class="title">温馨提示</text>
						</view>
						<view style="padding: 40rpx; flex: 1; display: flex; flex-direction: column;"
							:style="{backgroundColor:darkMode=='light'?'#FFFFFF':'#3d3d3d'}">
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
								<text style="padding: 20rpx;line-height: 50rpx;">您的项圈设备已离线，可能是因为电量不足或信号不佳。</text>
							</view>
							<view style="display: flex;flex-direction: row;align-items: center;justify-content: left;">
								<text style="padding: 0px 20rpx;line-height: 50rpx;">尝试以下操作：</text>
							</view>
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
								<text
									style="padding: 0px 20rpx;line-height: 50rpx;">1.检查电量：设备可能因电量耗尽而离线。若电量低，请立即充电。</text>
							</view>
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
								<text
									style="padding: 0px 20rpx;line-height: 50rpx;">2.检查信号：设备可能处于信号较弱或无信号区域（地下室，山区）。请将设备移至开阔区域，等待信号恢复。</text>
							</view>
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
								<text
									style="padding: 0px 20px 0rpx 20rpx;line-height: 50rpx;">3.联系客服：如果问题仍未解决，请点击联系客服，进一步获取帮助</text>
							</view>
							<view
								style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;margin-bottom:20rpx;margin-top: 20rpx;">
								<view></view>
								<div class="myButton" @tap="closeOfflineTitle(0)">
									<text style="color: #FFFFFF;">我知道了</text>
								</div>
								<div class="myButton" @tap="closeOfflineTitle(1)">
									<text style="color: #FFFFFF;">联系客服</text>
								</div>
								<view></view>
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>

		<AlertModal v-if='showFloor' @correct="openCorrect" :infodata="locateInfoData==''?deviceOffline:locateInfoData"
			@closeFloor="showFloorTitle" />

	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount,
		nextTick
	} from 'vue'
	import {
		onLoad,
		onShow,
		onHide,
		onUnload
	} from '@dcloudio/uni-app'
	import AlertModal from '@/components/AlertModalOh.vue';
	import logger from '@/common/logger.js'
	import {
		wgs84_to_gcj02
	} from '@/common/wgs84ToGcj02';
	import {
		setBuzzer,
		setRgb,
		setLocation
	} from '@/common/fileParesUtil.js'
	import permision from '@/js_sdk/wa-permission/permission';
	import util, {
		filter
	} from '@/common/util';
	import {
		isString,
		isObject,
		isType
	} from '@/common/is_type.js';
	import {
		sendCommand,
		getDeviceWorkMode,
		getDeviceInfo,
		getHomeWifi
	} from "@/api/api/device.js"
	import {
		$uni
	} from "@/utils/main.js"
	import "@/uni_modules/native-harmony-map";
	import {
		openPermission
	} from '@/uni_modules/srh-openPermission';
	import {
		COMMAND_TYPE
	} from '@/enum/command-type.enum.ts'
	import {
		closeBLEConnection,
		createBLEConnection,
		closeBluetoothAdapter,
		startBluetoothDevicesDiscovery,
		openBluetoothAdapter,
		stopBluetoothDevicesDiscovery,
		writeBLECharacteristicValue,
		readBLECharacteristicValue,
		getBLEDeviceServices,
		getBLEDeviceCharacteristics,
		getBLEDeviceRSSI
	} from "@/utils/bluetooth.js"
	import {
		BluetoothStateEnum
	} from "@/uni_modules/jiannor-oh-tools"
	import {
		uniAddMarker,
		uniRemoveMarker,
		uniFromScreenLocation,
		uniUpdateCamera,
		uniUpdateMarkerPosition,
		uniUpdateMarkerIcon,
		uniGetMarkerMap,
		uniClearMap,
		uniShowMyLocation,
		uniAddPolygon,
		uniRemovePolygon,
		uniSetMapType,
		uniClearAllMarkers,
		uniAddCircle,
		uniRemoveCircle,
		uniHasMarker,
		uniGetMarkerArray,
		uniSetPolygonPoint,
		uniSetMarkerRotation,
		uniUpdateCirclePosition,
		uniMapShow,
		uniMapHide,
		uniSetDayNightMode
	} from "@/uni_modules/native-harmony-map"
	import {
		getLocation,
		gcj02tobd09
	} from "@/utils/locate.js"
	import {
		colorToHexNumber
	} from "@/utils/color.js"
	import {
		getStaticOh
	} from '@/utils/file';
	import {
		amapLocation
	} from '@/api/api/location';

	const bluetoothAdapterAvailable = ref(0)
	const isReconnecting = ref(false)
	const reconnectAttempts = ref(0)
	const maxReconnectAttempts = ref(2)
	const reconnectTimer = ref(null)

	const heartTimer = ref(-1)

	const darkMode = ref('light')
	// 响应式数据
	const options = reactive({
		name: "main",
		latitude: 39.909,
		longitude: 116.39742,
		scale: 12,
		showLocation: true,
		showMapTypeButton: true
	})
	const ladarUse = ref(false)
	const railUse = ref(false)
	const leadUse = ref(false)

	const bellUse = ref(false)
	const rgbUse = ref(false)
	const firmwareVersion = ref(0)
	const devicePlatform = ref('')
	const batteryMode = ref(false)
	const permission = ref(false)
	const showOfflineTitle = ref(false)
	const firstGetPetPose = ref(true)
	const remind = ref(false)
	const GuildSrc = ref(getStaticOh('/static/imgs/locate/locateGuild1.png'))
	const focusTarget = ref(0)
	const dataModal = ref('离线')

	const pageStatues = ref(0)
	const lastCommunicate = ref('1998-11-14 03:31:48.752965')
	const nextCommunicate = ref('')
	const myHardwareVersion = ref(0)
	const clickBellImgSrc = ref('/static/new/icon-buzzer.svg')
	const clickRgbImgSrc = ref('/static/new/icon-rgb.svg')
	const deviceConnectModolStatue = ref('标准模式')
	const clickBell = ref(false)
	const clickRgb = ref(false)
	const enableSatellite = ref(false)
	const bluetooth_mode = ref('0')
	const countdown = ref(-1)
	const countdownTimer = ref(null)
	const showCountdown = ref(false)
	const dots = ref('') // 初始化为一个点
	const dotCount = ref(1) // 点的数量
	const blinkInterval = ref(null) // 用于存储setInterval的返回值，以便稍后清除它
	const searchBluetoothLogo = ref(false)
	const bleConnectionStateChangeHandler = ref(null)
	const intervaldoBgTask = ref(null)
	const scaleArray = ref(['1000km', '500km', '200km', '100km', '50km', '30km', '20km', '10km', '5km', '2km', '1km',
		'500m', '200m', '100m', '50m', '25m', '10m', '5m'
	])
	const widcnt = ref(-1)
	const leadClick = ref(0)
	const leadTime = ref(null)
	const wid = ref(null)
	const updateTimer = ref(1000 * 10)
	const petPosition = ref('')
	const myPosition = ref('')
	const outinside = ref(false)
	const margintop = ref('margin-top')
	const detectCircle = ref(2)
	const mapHeight = ref(88) // 地图高度百分比
	const WindowInfo = ref({
		pixelRatio: 2,
		screenWidth: 414,
		screenHeight: 896,
		windowWidth: 414,
		windowHeight: 790,
		statusBarHeight: 48,
		safeArea: {
			left: 0,
			right: 414,
			top: 48,
			bottom: 790,
			width: 414,
			height: 742
		},
		safeAreaInsets: {
			top: 48,
			right: 0,
			bottom: 0,
			left: 0
		},
		windowTop: 0,
		windowBottom: 0,
		screenTop: 106
	})
	const marginTopHeight = ref(9)
	const drawRange = ref(30)
	const signalStrength = ref(getStaticOh('/static/xixin/wifi0.png'))
	const stopLadarToast = ref(false)
	const ladarToast = ref(false)
	const ladaring = ref(false)
	const sureleading = ref(false)
	const drawToast = ref(false)
	const toMapping = ref(false)
	const railToast = ref(false)
	const showNewRail = ref(false)
	const railing = ref(false)
	const leading = ref(false)
	const mapScale = ref(16)
	const scaleShow = ref('')
	const wifiColor1 = ref('#ccc')
	const wifiColor2 = ref('#ccc')
	const wifiColor3 = ref('#ccc')
	const wifiColor4 = ref('#ccc')
	const petDistanceOver = ref(false)
	const petDistance = ref(0)
	const loadobject = ref({
		avatar: '',
		serialCode: '',
		battaryImageSrc: '',
		presentBattary: 0,
		pname: '',
		petIcon: '',
		petBellIcon: '',
		petLightIcon: '',
		petBLIcon: '',
		uid: '',
		pid: '',
		did: ''
	})
	const leadUrl = ref('/static/new/2@3x.png')
	const railUrl = ref('/static/new/3@3x.png')
	const ladarUrl = ref('/static/new/1@3x.png')
	const categoryId = ref(1)
	const latitude = ref(39.9096045)
	const longitude = ref(116.3972282)
	const avatarDirection = ref(0)
	const markers = ref([
		// 	{
		// 	id: 0,
		// 	latitude: 39.9096045,
		// 	longitude: 116.3972282,
		// 	iconPath: getStaticOh("/static/xixin/owner.png"),
		// 	rotate: 353.360001,
		// 	anchor: {
		// 		x: 0.5,
		// 		y: 0.5
		// 	},
		// 	width: 30,
		// 	height: 30
		// },
	])
	const polygonsPoints = ref(new Array())
	const actionPolygonIndex = ref(0)
	const clickPolygonIndex = ref(0)
	const localSavePolygons = ref([{
		points: new Array(),
		name: "",
		switch: false,
	}, {
		points: new Array(),
		name: "",
		switch: false,
	}, {
		points: new Array(),
		name: "",
		switch: false,
	}])
	const polygons = ref([{
		points: [],
		strokeWidth: 2,
		strokeColor: '#FF0000',
		fillColor: '#00FF00',
		zIndex: 1,
	}])
	const circles = ref([])
	const topType = ref('')
	const scaleTopType = ref('')
	const scaleRightType = ref('')
	const blueToothTopType = ref('')
	const scaleborderStyle = ref('')
	const waitRgbText = ref('')
	const waitBellText = ref('')
	const countdownTopType = ref('')
	const mapviz = ref(false)
	const screenwidth = ref(0)
	const unpdataUserPosition = ref(false)
	const RSSI = ref(0)
	const RSSIText = ref('蓝牙连接中')
	const progressNumber = ref(0)
	const ladarRotateAngle = ref(0)
	const blueToothDeviceId = ref(null)
	const blueToothServiceId = ref('0000FFE0-0000-1000-8000-00805F9B34FB')
	const blueToothCharacteristicId = ref('0000FFE1-0000-1000-8000-00805F9B34FB')
	const intervalId2 = ref(null)
	const intervalLocate = ref(null)
	const bluetoothConnect = ref(false)
	const loacateMode = ref(1)
	const serviceLocateMode = ref('获取中')
	const loacateClock = ref('现在')
	const locateTime = ref(-1)
	const lastLocateTime = ref('')
	const leadOutCnt = ref(0)
	const testArray = ref([{
		lo: 107.80374091666667,
		la: 26.58351091666667,
		loc_type: 0,
		location_time: '10:58:43',
		//10:58:43 GPS [107.80374091666667, 26.58351091666667]
		//10:58:58 WiFi [107.88830471666667, 26.514174666666666]
		//(35) 11:14:26 GPS [107.81160111666667, 26.583365383333334]
	}, {
		lo: 107.88830471666667,
		la: 26.514174666666666,
		loc_type: 1,
		location_time: '10:58:58',
	}, {
		lo: 107.81160111666667,
		la: 26.583365383333334,
		loc_type: 0,
		location_time: '11:14:26',
	}])
	const testcnt = ref(0)
	const checkBluetoothAdapterIntervel = ref(null)
	const showWifiPoint = ref(false)
	const showHaveDevice = ref(false)
	const DeviceConnectModol = ref(0)
	const blueToothHeartCnt = ref(0)
	const positionSignal = ref("GPS信号弱")
	const deviceOffline = ref("")
	const locateInfoData = ref("")
	const locType = ref('')
	const homeWifi = ref(null)
	const guildImageClickCnt = ref(1)
	const dogulas_peuker_distance = ref(20)
	const platform = ref(true)
	const startDiscover = ref(null)
	const let_right_bottom = ref(300)
	const id = ref(1)
	const la = ref(39.909)
	const lo = ref(116.39742)
	const phoneMarker = ref(null)
	const ready = ref(false)
	const showPolygonId = ref("0")
	const lastClickBellTime = ref(0)
	const lastClickRGBTime = ref(0)
	const bluetoothOffModalShown = ref(false) // 防止蓝牙关闭弹窗重复显示
	const showCircles = ref("0")
	const locationEnable = ref(false)
	const bluetoothEnable = ref(false)
	const statusBarHeight = ref(0)
	const screenheight = ref(0)
	const refreshTime = ref(0)
	const mapNumber = ref('GS(2024)1955号')
	const refreshRipple = ref(false)
	const navRipple = ref(false)
	const showFloor = ref(false)
	const isCharge = ref(false)

	const intoSwitch = () => {
		uni.navigateTo({
			url: '/pages/home/switchPet/switchPet'
		})
	}

	// 方法定义
	const onMapTypeChange = (event) => {
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

	function tap(event) {
		console.log(event)
	}
	const add = () => {
		uniClearMap()
	}

	const initMapEnd = () => {
		//地图初始化完成
		console.log("initMapEnd")
	}

	const onCameraChange = (e) => {
		//地图视图变化完成回调
		console.log("onCameraChange", e)
	}

	const onMarkerTap = (e) => {
		//marker 点击事件
		console.log("onMarkerTap", e)
		undoRailPoint(e)
	}

	const showHelp = () => {
		uni.navigateTo({
			url: "/pages/locatePageNvue/help/help"
		})
	}

	const closeOfflineTitle = (para) => {
		if (para)
			uni.navigateTo({
				url: '/pages/setting/service/service'
			})
		else
			showOfflineTitle.value = false
	}

	const clickOffline = () => {
		showOfflineTitle.value = true
	}


	const moveToPet = () => {
		let petMarkers = markers.value.find(item => item.id === 2)
		if (petMarkers) {
			latitude.value = petMarkers.latitude
			longitude.value = petMarkers.longitude
			// this._mapContext.moveToLocation({
			// 	longitude: longitude.value,
			// 	latitude: latitude.value,
			// 	success: (res) => {
			// 		// console.log('跳转地图中心点成功');
			// 	},
			// 	fail: (err) => {
			// 		// console.log('跳转地图中心点失败');
			// 	}
			// })
			try {
				uniUpdateCamera({
					longitude: longitude.value,
					latitude: latitude.value,
					zoom: 16
				})
			} catch (err) {
				console.log(err)
			}
		}
	}

	const openCorrect = () => {
		if (firmwareVersion.value >= 60 || loadobject.value.serialCode.substring(0, 2) === 'ae') {
			let petpose = markers.value.filter(item => item.id === 2)
			if (petpose <= 0) {
				uni.showToast({
					title: '暂时没有获取到位置，请稍后！'
				})
				return
			}
			if (!petpose[0].loc_type) {
				uni.showToast({
					title: '未获取到位置类型！'
				})
				return
			}
			if (petpose[0].loc_type == 2 || petpose[0].loc_type == 4) {
				uni.showToast({
					title: '当前位置不可纠偏，请尝试刷新'
				})
				return
			}
			if (petpose) {
				uni.navigateTo({
					url: '/pages/locatePageNvue/correct/correct?para=' + JSON.stringify(petpose[0]) + "&rute=1"
				})
			} else {
				uni.showToast({
					title: '没有可纠偏点位',
					icon: 'none'
				})
			}
		} else {
			uni.showToast({
				title: '请先升级固件',
				icon: 'none'
			})
			setTimeout(() => {
				uni.showToast({
					title: '即将自动跳转',
					icon: 'success',
				})
				pageStatues.value = 0
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/setting/firmware/firmware"
					})
				}, 500)

			}, 1000)
		}

	}

	const changeTarget = () => {
		console.log('click change target')
		$uni.isLocationEnabled({
			success(res) {
				locationEnable.value = res
				if (res == false) {
					uni.showModal({
						title: "提示",
						content: "位置服务已关闭，无法获取手机位置，是否重新开启定位服务？",
						success(res) {
							if (res.confirm) {
								$uni.requestGlobalSwitch(2)
							}
						}
					})
				} else {

					$uni.getLocation({
						type: "gcj02",
						success: (res) => {
							phoneMarker.value = {
								latitude: res.latitude,
								longitude: res.longitude
							}
							focusTarget.value = !focusTarget.value
							let petMarkers = markers.value.find(item => item.id === 2)

							if (!focusTarget.value) {
								if (petMarkers) {
									console.log("宠物的位置")
									latitude.value = petMarkers.latitude
									longitude.value = petMarkers.longitude
								}
							} else {
								if (phoneMarker.value) {
									console.log("主人位置")
									latitude.value = phoneMarker.value.latitude
									longitude.value = phoneMarker.value.longitude
								}
							}
							uniUpdateCamera({
								longitude: longitude.value,
								latitude: latitude.value,
								zoom: 16
							})
						}
					})

				}
			},
			fail(err) {
				console.log("isLocationEnabled", err)
			}
		})

		// this._mapContext.moveToLocation({
		// 	longitude: longitude.value,
		// 	latitude: latitude.value,
		// 	success: (res) => {
		// 		// console.log('跳转地图中心点成功');
		// 	},
		// 	fail: (err) => {
		// 		// console.log('跳转地图中心点失败');
		// 	}
		// })

	}

	const goHome = () => {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}



	const closeRail = (index) => {
		let requestFenceUrl = getApp().globalData.internet + getApp().globalData
			.electronicFence
		let para = {
			switch: 0,
			did: loadobject.value.did,
			serial_code: loadobject.value.serialCode,
		}
		util.requestDataFrom(requestFenceUrl, para).then(async (rebackData2) => {
			console.log('查询围栏', rebackData2)
			if (rebackData2.data.code === 200) {
				try {
					railing.value = false
					clearPolygonsPoints()
					for (let item of markers.value) {
						if (item.id > 3) {
							await uniRemoveMarker(item.id)
						}
					}
					var marker = markers.value.filter(item => item.id <= 3)
					outinside.value = false
					// if (markers.value.length > 4) {
					// 	for (let i = 4; i < markers.value.length - 1; i++) {
					// 		uniRemoveMarker(markers.value[i].id)
					// 	}
					// }

					markers.value = []
					markers.value = marker
					getApp().globalData.railOut = false
					let savedata = JSON.stringify(getApp().globalData.railOut)
					uni.setStorage({
						key: 'railOut',
						data: savedata,
						success: function() {
							console.log('railOut数据缓存成功');
						}
					});
					localSavePolygons.value[index].switch = false
					savePage()
				} catch (err) {
					console.log("closeRail", err)
				}
			} else {
				uni.showToast({
					title: rebackData2.data.msg,
					icon: 'none'
				})
			}
		})

	}

	const switchRail = async (index) => {
		actionPolygonIndex.value = index
		let offOn = !localSavePolygons.value[index].switch
		console.log("switchRail", offOn)
		//1  直接关  2 直接开  3 关一个 开一个 等于直接开
		if (offOn === false) {
			//调用结束围栏的接口
			closeRail(index)
			console.log("switchRail1", offOn)
		} else {
			console.log("switchRail2", offOn)
			try {
				clearPolygonsPoints()
				var marker = markers.value.filter(item => item.id <= 3)
				if (markers.value.length > 4) {
					for (let i = 4; i < markers.value.length - 1; i++) {
						uniRemoveMarker(markers.value[i].id)
					}
				}
				console.log("switchRail2", localSavePolygons.value[index])
				markers.value = []
				markers.value = marker
				polygonsPoints.value = localSavePolygons.value[index].points
				sureRail(1)
				// showPolygonId.value = await uniAddPolygon({
				// 	id: 1,
				// 	strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
				// 	fillColor: colorToHexNumber(polygons.value[0].fillColor),
				// 	strokeWidth: polygons.value[0].strokeWidth,
				// 	zIndex: polygons.value[0].zIndex,
				// 	points: polygons.value[0].points
				// })
			} catch (err) {
				console.log("switchRail3", err)
			}
		}
	}

	const undoRailPoint = (e) => {
		let clickid = e.detail.markerId
		console.log('点击了气泡点', e.detail)
		// markers.value.splice(clickid, 1);
		let clickItem = markers.value.find(item => item.id === clickid)
		console.log('点击的item', clickItem)
		console.log('clickid', clickid)
		console.log("marker删除前", markers.value)
		if (clickid > 3) {
			markers.value = markers.value.filter(item => item.id != clickid)
			uniRemoveMarker(clickid)
		}
		console.log("marker删除后", markers.value)
		// clearPolygonsPoints();

		console.log("polygonsPoints删除前", polygonsPoints.value)
		polygonsPoints.value = polygonsPoints.value.filter(item => {

			return item.latitude != e.detail.latitude && item.longitude != e.detail.longitude
		})
		console.log("polygonsPoints删除后", polygonsPoints.value)
		// if (homeWifi.value != null)
		// 	points.splice(clickid - 4, 1)
		// else
		// 	points.splice(clickid - 3, 1)
		var polygon = [{
			points: polygonsPoints.value,
			strokeWidth: 2,
			strokeColor: '#FF0000',
			fillColor: 'rgba(255,0,0,0.2)',
			zIndex: 1,
		}]
		polygons.value = []
		polygons.value = polygon
		// uniRemovePolygon(showPolygonId.value.split("--")[0])
		// showPolygonId.value = await uniAddPolygon({
		// 	id: 1,
		// 	strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
		// 	fillColor: colorToHexNumber(polygons.value[0].fillColor),
		// 	strokeWidth: polygons.value[0].strokeWidth,
		// 	zIndex: polygons.value[0].zIndex,
		// 	points: polygons.value[0].points
		// })
		uniSetPolygonPoint(showPolygonId.value.split("--")[0], polygonsPoints.value)
	}

	const deleteRail = (index) => {
		uni.showModal({
			title: '温馨提示',
			content: '点击确定后将删除此条围栏，请点击确认删除',
			confirmText: '确定',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					// 删除围栏逻辑
					if (localSavePolygons.value[index].switch) {
						uni.showToast({
							title: "请先关闭围栏",
							icon: 'none'
						})
					} else {
						localSavePolygons.value[index] = {
							points: [],
							name: "",
							switch: false
						}
					}
				}
			}
		})
	}

	const clickNewRail = async (item, index) => {
		try {
			//如果围栏是打开的 提醒先关闭
			if (localSavePolygons.value[index].switch) {
				uni.showToast({
					title: '请先关闭围栏，再点击编辑',
					icon: 'none'
				})
				return
			}
			//清除显示围栏
			clearPolygonsPoints()
			var marker = markers.value.filter(item => item.id <= 3)
			markers.value = []
			markers.value = marker
			// uniClearAllMarkers()
			for (let item of markers.value) {
				// if (item.id <= 3) {
				// 	await uniAddMarker({
				// 		id: item.id,
				// 		latitude: item.latitude,
				// 		longitude: item.longitude,
				// 		iconPath: item.iconPath,
				// 		width: item.width,
				// 		height: item.height,
				// 		rotate:item.rotate
				// 	})
				// }
				if (item.id > 3) {
					uniRemoveMarker(item.id)
				}
			}
			// console.log('item', item)
			clickPolygonIndex.value = index
			for (let i = 0; i < item.points.length; i++) {
				let element = item.points[i]
				let latitude = element.latitude
				let longitude = element.longitude
				var point = {
					latitude: latitude,
					longitude: longitude,
				}
				polygonsPoints.value.push(point)
				console.log('polygonsPoints=', polygonsPoints.value)
				// 创建标记点
				var marker = [{
					id: markers.value.length + 4,
					latitude,
					longitude,
					title: '点击位置',
					iconPath: getStaticOh('/static/xixin/railPoint.png'), // 自定义标记图标路径
					width: 32,
					height: 32,
					callout: {
						content: "撤销",
						display: "ALWAYS",
						color: '#ff5500',
						bgColor: 'rgba(255, 255, 255, 1)',
						textAlign: 'center',
						borderRadius: '5px',
						borderColor: 'rgba(255, 85, 0, 1.0)',
						borderWidth: 1,
						padding: 4
					}
				}]
				var newMarker = markers.value.slice(0)
				newMarker.push(marker[0])
				markers.value = newMarker
				await uniAddMarker({
					id: markers.value.length + 4,
					latitude: marker[0].latitude,
					longitude: marker[0].longitude,
					iconPath: marker[0].iconPath,
					width: marker[0].width,
					height: marker[0].height,
					rotate: marker[0].rotate
				})
			}
			let polysort = sortByClockwiseOrder(polygonsPoints.value)
			var polygon = [{
				points: polysort,
				strokeWidth: 2,
				strokeColor: '#FF0000',
				fillColor: 'rgba(255,0,0,0.2)',
				zIndex: 1,
			}]
			polygons.value = polygon
			if (polygons.value[0].points && polygons.value[0].points.length > 0) {
				showPolygonId.value = await uniAddPolygon({
					id: 1,
					strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
					fillColor: colorToHexNumber(polygons.value[0].fillColor),
					strokeWidth: polygons.value[0].strokeWidth,
					zIndex: polygons.value[0].zIndex,
					points: polygons.value[0].points
				})
			}
			// console.log('markers', markers.value)
			showNewRail.value = true
			railToast.value = false
			setTimeout(() => {
				railToast.value = true
			}, 50)
		} catch (err) {
			console.log("clickNewRail", err)
		}
	}

	const clickedRgbOrBell = (rgbOrBell) => {
		try {
			const now = Date.now()
			if (rgbOrBell === 'bell') {
				if (now - lastClickBellTime.value < 2500) {
					uni.showToast({
						title: '操作太频繁了',
						icon: 'none'
					})
				} else {
					let ss = '关闭'
					if (!clickBell.value)
						ss = '开启'
					uni.showModal({
						title: "温馨提示",
						content: "点击确定发送" + ss + "响铃命令",
						success(res) {
							if (res.confirm) {
								clickRgbFun(rgbOrBell, true, false, true)
								lastClickBellTime.value = now
							}
						}
					})
				}
			} else if (rgbOrBell === 'rgb') {
				if (now - lastClickRGBTime.value < 2500) {
					uni.showToast({
						title: '操作太频繁了',
						icon: 'none'
					})
				} else {
					let ss = '关闭'
					if (!clickRgb.value)
						ss = '开启'
					uni.showModal({
						title: "温馨提示",
						content: "点击确定发送" + ss + "灯光命令",
						success(res) {
							if (res.confirm) {
								clickRgbFun(rgbOrBell, true, false, true)
								lastClickRGBTime.value = now
							}
						}
					})
				}
			}
		} catch (err) {
			console.log("rgbOrBell", err)
		}
	}

	const clickRgbFun = (rgbOrBell, opt, opt2, opt3) => {
		//opt 代表是否变更状态  opt2 代表是否禁用 opt3代表是否弹关闭命令已发送的接口
		console.log('开关rgb和 蜂鸣器', rgbOrBell, opt, opt2)
		let buttonClick = clickRgb.value
		if (rgbOrBell === 'bell')
			buttonClick = clickBell.value
		if (opt)
			buttonClick = !buttonClick
		let cmd = 0
		if (buttonClick === true)
			cmd = 1
		console.log("into click rgb", cmd)
		var data = {
			uid: loadobject.value.uid,
			serialCode: loadobject.value.serialCode,
			commandType: COMMAND_TYPE.RGB_LIGHT,
			commandValue: cmd
		};
		let setRgbcontrol = setRgb(cmd)
		if (rgbOrBell === 'bell') {
			setRgbcontrol = setBuzzer(cmd)
			data = {
				uid: loadobject.value.uid,
				serialCode: loadobject.value.serialCode,
				commandType: COMMAND_TYPE.BUZZER,
				commandValue: cmd
			};
		}
		sendCommand(data).then((recivedata) => {
			console.log('响铃 recivedata', recivedata)
			if (rgbOrBell === 'bell') {
				clickBell.value = buttonClick
				clickBellImgSrc.value = clickBell.value ? getStaticOh('/static/imgs/locate/bellYellow.png') :
					getStaticOh('/static/imgs/locate/bell.png')
				bellUse.value = clickBell.value
				if (cmd === 0)
					waitBellText.value = '响铃关闭中'
				else
					waitBellText.value = '响铃开启中'
			} else {
				clickRgb.value = buttonClick
				clickRgbImgSrc.value = clickRgb.value ? getStaticOh('/static/imgs/locate/lightYellow.png') :
					getStaticOh('/static/imgs/locate/light.png')
				rgbUse.value = clickRgb.value
				if (cmd === 0)
					waitRgbText.value = '灯光关闭中'
				else
					waitRgbText.value = '灯光开启中'
			}
			if (bluetoothConnect.value) {
				console.log('准备蓝牙发送') //给设备发灯的请求
				util.BleWriteOH(setRgbcontrol, blueToothDeviceId.value, blueToothServiceId.value,
					blueToothCharacteristicId.value)
			}
			savePage()
		}).catch((err) => {
			console.log('响铃 recivedata err', recivedata)
		})
	}

	const changeMapLevel = () => {
		if (loadobject.value.serialCode)
			enableSatellite.value = !enableSatellite.value
	}
	const heartTimeTask = () => {
		heartTimer.value = setInterval(() => {
			if (bluetoothConnect.value && getApp().globalData.myFirewareVersion > 43 || loadobject.value
				.serialCode.substring(0, 2) === 'ae') {
				// console.log('into util write', blueToothDeviceId.value)
				bluetoothSendHeart()
			}
		}, 10000)
	}
	const startIntervalTasks = (onready) => {
		let cnt = 0
		if (ready.value == true) {
			if (onready == false) {
				uniShowMyLocation(true)
			}
			heartTimeTask()

			checkBluetoothAdapterIntervel.value = setInterval(() => {

				//计算倒计时
				if (locateTime.value.length != 5) {
					const now = new Date();
					const target = new Date(locateTime.value);
					const diff = now - target;
					let clocktime = Math.floor(diff / 1000) + 1;
					if (clocktime > 3600 * 24) {
						clocktime = Math.floor(clocktime / 3600 / 24)
						loacateClock.value = '请求中'
					} else if (clocktime > 1800) {
						clocktime = Math.floor(clocktime / 3600)
						loacateClock.value = '定位中'
					} else if (clocktime > 300) {
						clocktime = Math.floor(clocktime / 3600)
						loacateClock.value = '等待中'
					} else if (clocktime > 60) {
						clocktime = Math.floor(clocktime / 60)
						loacateClock.value = '获取中'
					} else if (clocktime > 0) {
						loacateClock.value = clocktime.toString() + '秒前';
					} else {
						// logger.info('定位时间出问题' + JSON.stringify(clocktime.toString()))
						// logger.info('locateTime' + JSON.stringify(locateTime.value.toString()))
					}
					if (locateTime.value === -1) {
						loacateClock.value = '';
					}
				}
				if (cnt % 17 === 0) {
					let para = {
						serial_code: loadobject.value.serialCode
					}
					getWorkMode(getApp().globalData.getWorkMode, para)
				}
				if (cnt % 33 === 0) {
					if (!railToast.value)
						checkRail()
				}

				if (cnt % 120 === 0) {
					sendLocateMode(loadobject.value.serialCode, 1)
				}
				if (cnt % 20 === 0) {

					if (sureleading.value) {
						if (bluetoothConnect.value) {
							//关闭出界弹窗
							leadOutCnt.value = 0
							petDistanceOver.value = false
							getApp().globalData.leadOut = false
							console.log('petDistanceOver', petDistanceOver.value)
						}
						if (!bluetoothConnect.value) {
							leadOutCnt.value++
							if (leadOutCnt.value === 5) {
								console.log('宠物出牵引范围')
								//打开出界弹窗
								petDistanceOver.value = true
								getApp().globalData.leadOut = true
								savePage()
								uni.createPushMessage({
									title: '电子牵引',
									content: '宠物已经跑出牵引范围',
									success() {
										console.log('createPushMessage 成功')
									},
									fail(err) {
										console.log('createPushMessage 失败', err)
									}
								})
							}
						}
					}
				}
				// if (cnt % 40 === 0) {
				// 	getDeviceConnectModol();
				// }

				cnt++;
			}, 500)
		}
	}

	const setWifi = () => {
		showWifiPoint.value = false


		if (getApp().globalData.myFirewareVersion >= 44 || loadobject.value.serialCode.substring(0, 2) === 'ae') {
			console.log('点击了跳转')
			if (phoneMarker.value) {
				uni.showLoading({
					title: '跳转中...',
				})
				let paramater = {
					serialCode: loadobject.value.serialCode,
					rute: 'set',
					la: phoneMarker.value.latitude,
					lo: phoneMarker.value.longitude,
					wifi_la: '',
					wifi_lo: ''
				}
				uni.hideLoading()
				console.log('执行跳转命令')
				if (getApp().globalData.myHardwareVersion >= 38) {
					uni.navigateTo({
						url: '/pages/my/wifiSetting/wifiSetting?paramater=' + JSON
							.stringify(paramater)
					})
				} else {
					//#ifdef APP-HARMONY
					uni.showModal({
						title: "提示",
						content: "由于设备过于陈旧，该功能不支持鸿蒙系统"
					})
					//#endif
					//#ifndef APP-HARMONY
					uni.navigateTo({
						url: '/pages/my/wifiSetting/homelocate/homelocate?paramater=' + JSON
							.stringify(paramater)
					})
					//#endif
				}
			} else {
				uni.showToast({
					title: '获取位置出错了',
					icon: 'none'
				})
			}

		} else {
			uni.showToast({
				title: '请先升级固件',
				icon: 'none'
			})
			setTimeout(() => {
				uni.showToast({
					title: '即将自动跳转',
					icon: 'success',
				})
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/setting/firmware/firmware"
					})
				}, 500)

			}, 1000)
		}
	}

	const cancWifiSet = () => {
		showWifiPoint.value = false
	}

	const toModelChange = () => {
		uni.navigateTo({
			url: '/pages/locatePageNvue/bellSetting/locationModelSetting/locationModelSetting?serialcode=' +
				loadobject.value.serialCode +
				'&rute=0' +
				"&deviceId=" + blueToothDeviceId.value
		})
	}
	const setupEventListeners = () => {
		uni.$on('ladarDevice', function(devices) {
			// console.log('监听finddevice ', devices.devices[0]);
			let id = convertToFormat('CYY', loadobject.value.serialCode);
			let otaid = convertToFormat('OTA', loadobject.value.serialCode);
			// console.log('serial code :', id);
			// console.log('devices.devices[0].name:', devices.devices[0].name);
			if (devices.devices[0].name === id || devices.devices[0].name === otaid || devices.devices[
					0]
				.localName === id || devices.devices[0].localName === otaid) {
				blueToothDeviceId.value = devices.devices[0].deviceId;
				getApp().globalData.locateBluetoothId = devices.devices[0].deviceId
				getApp().globalData.locateAndWifisetStatue = '蓝牙连接中...'
				console.log('发现目标蓝牙', devices.devices[0])
				connectAndLocate(devices.devices[0].deviceId);
				$uni.stopBluetoothDevicesDiscovery({

				})

			}
		})
		uni.$once("petIcon", function(data) {
			console.log('收到合并好的图片路径', data)
			if (data.pid === loadobject.value.pid)
				loadobject.value.petIcon = data.petIcon
		})
		uni.$once('petbellIcon', (data) => {
			console.log('收到合并好的响铃图片路径', data)
			if (data.pid === loadobject.value.pid)
				loadobject.value.petBellIcon = data.petBellIcon
		})
		uni.$once('petlightIcon', (data) => {
			console.log('收到合并好的响铃图片路径', data)
			if (data.pid === loadobject.value.pid)
				loadobject.value.petLightIcon = data.petLightIcon
		})
		uni.$once('petbelllightIcon', (data) => {
			console.log('收到合并好的响铃图片路径', data)
			if (data.pid === loadobject.value.pid)
				loadobject.value.petBLIcon = data.petBLIcon
		})

		uni.$once('presentBattary', function(data) {
			console.log('接受到电量变化', data)
			loadobject.value.presentBattary = getApp().globalData.presentBattary
			loadobject.value.battaryImageSrc = getApp().globalData.battaryImageSrc
		})

		// 监听位置服务状态变化
		uni.$on("locationEnabledState", (result) => {
			console.log('位置服务状态变化:', result)
			// 根据位置服务状态进行相应处理
			if (result.enabled) {
				console.log('位置服务已开启')
				locationEnable.value = true
				// 位置服务开启后，可以重新获取位置信息
				// 重新启动位置更新
				$uni.onLocationChange((res) => {
					phoneMarker.value = {
						latitude: res.latitude,
						longitude: res.longitude
					}
					if (widcnt.value > 30000)
						widcnt.value = 0;
					phonelocation(res.latitude, res.longitude);
					//为了不同时弹蓝牙提示窗和位置提示窗 位置获取成功，再打开蓝牙

					widcnt.value++;
				})
				setTimeout(() => {
					$uni.startLocationUpdate({
						type: "gcj02",
						success(res) {
							console.log("startLocationUpdateSuccess", res)
						},
						fail(err) {
							console.log("startLocationUpdateErr", err)
						}
					})
				}, 500)
			} else {
				console.log('位置服务已关闭')
				locationEnable.value = false
				// 位置服务关闭时，提示用户开启
				uni.showModal({
					title: "提示",
					content: "位置服务已关闭，定位功能可能受影响，是否重新开启定位服务？",
					success(res) {
						if (res.confirm) {
							$uni.requestGlobalSwitch(2)
						}
					}
				})
			}
		})

		uni.$on("bluetoothState", (result) => {
			console.log('蓝牙状态变化:', result)
			// 根据蓝牙状态进行相应处理
			switch (result.state) {
				case 0: // STATE_OFF
					bluetoothEnable.value = false
					console.log('蓝牙已关闭')
					bluetoothConnect.value = false
					getApp().globalData.blebluetoothConnect = false
					RSSIText.value = '蓝牙已关闭'
					// 停止相关蓝牙功能
					if (stopLadarToast.value) {
						stopLadar(false)
					}
					// 防止重复弹窗
					if (!bluetoothOffModalShown.value) {
						bluetoothOffModalShown.value = true
						uni.showModal({
							title: "提示",
							content: "蓝牙已关闭，响铃与灯光可能受影响，是否重新开启蓝牙？",
							success(res) {
								if (res.confirm) {
									$uni.enableBluetooth()
								}
								// 弹窗关闭后重置标志，允许下次弹窗
								setTimeout(() => {
									bluetoothOffModalShown.value = false
								}, 1000)
							}
						})
					}
					break
				case 2: // STATE_ON
					console.log('蓝牙已开启')
					bluetoothEnable.value = true
					// 重置弹窗标志
					bluetoothOffModalShown.value = false
					// 蓝牙开启后，如果之前有连接需求，可以尝试重新连接
					if (getApp().globalData.openLadarBluetooth && !bluetoothConnect.value) {
						setTimeout(() => {
							restartBlueTooth(false)
						}, 1000)
					}
					break
				case 1: // STATE_TURNING_ON
					console.log('蓝牙正在开启')
					bluetoothEnable.value = false
					RSSIText.value = '蓝牙正在开启'
					break
				case 3: // STATE_TURNING_OFF
					console.log('蓝牙正在关闭')
					bluetoothEnable.value = false
					RSSIText.value = '蓝牙正在关闭'
					break
				default:
					console.log('蓝牙状态未知:', result.state)
					bluetoothEnable.value = false
					break
			}
		})
	}
	const compareVersions = (version1, version2) => {
		// 将版本号拆分为数组  
		const arr1 = version1.split('.')
		const arr2 = version2.split('.')

		// 找到两个数组中最长的长度  
		const maxLength = Math.max(arr1.length, arr2.length)

		// 逐位比较  
		for (let i = 0; i < maxLength; i++) {
			// 如果当前位不存在，则视为0  
			const num1 = parseInt(arr1[i] || 0, 10)
			const num2 = parseInt(arr2[i] || 0, 10)

			if (num1 > num2) {
				return 1 // version1 大于 version2  
			} else if (num1 < num2) {
				return -1 // version1 小于 version2  
			}
		}
		// 所有位都相等  
		return 0 // version1 等于 version2  
	}

	const nolonger = () => {
		remind.value = !remind.value
		savePage()
	}

	const checkWifiIsSet = () => {
		console.log('loadobject.serialCode', loadobject.value)

		getHomeWifi(loadobject.value.serialCode).then((res) => {
			if (res.data != null) {
				console.log('获取到的家庭wifi数据', res.data)
				homeWifi.value = {
					id: 1,
					latitude: res.data.wifi_location.la,
					longitude: res.data.wifi_location.lo,
					// iconPath: getApp().globalData.iconMap.get("home"),
					iconPath: getStaticOh("/static/xixin/home.png"),
					// iconPath:'/data/storage/el1/bundle/entry/resources/resfile/apps/HBuilder/www/static/xixin/home.png',
					anchor: {
						x: .5,
						y: .5
					},
					width: 40,
					height: 40
				}
				if (homeWifi.value != null) {
					findeOrChangeById(homeWifi.value, markers.value)
				}
			} else {
				console.log('家庭WIFI为空')
				if (!remind.value) {
					showWifiPoint.value = true
				}
				markers.value = markers.value.filter(item => item.id != 1)
				uniRemoveMarker(1)
			}
		}).catch((err) => {
			console.log('require wifi list fail', err)
		})

		// let url = getApp().globalData.internet + getApp().globalData.queryHomeWifi
		// let data = {
		// 	serial_code: loadobject.value.serialCode
		// }
		// uni.request({
		// 	url: url, //仅为示例，并非真实接口地址。
		// 	method: 'POST',
		// 	data: data,
		// 	header: {
		// 		'content-type': 'application/json' //重点
		// 	},
		// 	success: (res) => {
		// 		if (res.data.data != null) {
		// 			let transData = util.transformWifiData(res.data.data)
		// 			console.log('获取到的家庭wifi数据', transData)
		// 			homeWifi.value = {
		// 				id: 1,
		// 				latitude: transData.data[0].wifi_location.la,
		// 				longitude: transData.data[0].wifi_location.lo,
		// 				// iconPath: getApp().globalData.iconMap.get("home"),
		// 				iconPath: getStaticOh("/static/xixin/home.png"),
		// 				// iconPath:'/data/storage/el1/bundle/entry/resources/resfile/apps/HBuilder/www/static/xixin/home.png',
		// 				anchor: {
		// 					x: .5,
		// 					y: .5
		// 				},
		// 				width: 40,
		// 				height: 40
		// 			}
		// 			if (homeWifi.value != null) {
		// 				findeOrChangeById(homeWifi.value, markers.value)
		// 			}
		// 		} else {
		// 			console.log('家庭WIFI为空')
		// 			if (!remind.value) {
		// 				showWifiPoint.value = true
		// 			}
		// 			markers.value = markers.value.filter(item => item.id != 1)
		// 			uniRemoveMarker(1)
		// 		}
		// 	},
		// 	fail: ((err) => {
		// 		console.log('require wifi list fail', JSON.stringify(err))
		// 	})
		// })
	}

	const toBellSetting = () => {

		$uni.isLocationEnabled({
			success(res) {
				locationEnable.value = res
				if (res == false) {
					uni.showModal({
						title: "提示",
						content: "位置服务已关闭，定位功能可能受影响，是否重新开启定位服务？",
						success(res) {
							if (res.confirm) {
								$uni.requestGlobalSwitch(2)
							}
						}
					})
				} else {
					uni.showLoading({
						title: '加载中'
					})
					$uni.getLocation({
						type: "gcj02",
						success: (res) => {
							uni.hideLoading()
							phoneMarker.value = {
								latitude: res.latitude,
								longitude: res.longitude
							}
							savePage()
							uni.navigateTo({
								url: '/pages/locatePageNvue/bellSetting/bellSetting?serialcode=' +
									loadobject.value
									.serialCode +
									"&deviceId=" + blueToothDeviceId.value + "&la=" +
									phoneMarker.value.latitude + "&lo=" +
									phoneMarker.value.longitude
							})
						},
						fail() {
							uni.hideLoading()
							uni.showToast({
								title: '获取位置失败'
							})
						}
					})
				}

			},
			fail(err) {
				console.log("isLocationEnabled", err)
			}
		})

	}

	const doBgTask = () => {
		console.log('into doBgTask')
		if (sureleading.value) {
			clearInterval(intervaldoBgTask.value)
			//需要做的就是不断检测蓝牙连接
			intervaldoBgTask.value = setInterval(() => {
				if (bluetoothConnect.value === false) {
					leadOutCnt.value++
					if (leadOutCnt.value === 3) {
						console.log('后台检测到电子牵引出界')
						petDistanceOver.value = true
						getApp().globalData.leadOut = true
						savePage()
						uni.createPushMessage({
							title: '电子牵引',
							content: '宠物已经跑出牵引范围',
							success() {
								console.log('createPushMessage 成功')
							},
							fail(err) {
								console.log('createPushMessage 失败', err)
							}
						})
					}
				}
				if (bluetoothConnect.value === true) {
					leadOutCnt.value = 0
				}
				console.log('执行后台程序')
			}, 3000)
		}
	}

	const leadTimeClick = (index) => {
		leadClick.value = index
	}

	const coverIcon = (opt) => {
		if (opt === 1) {
			ladarUrl.value = '/static/new/1@3x.png'
			railUrl.value = '/static/new/3@3x-nouse.png'
			leadUrl.value = '/static/new/2@3x-nouse.png'

			ladarUse.value = true
			railUse.value = false
			leadUse.value = false
		} else if (opt === 2) {
			ladarUrl.value = '/static/new/1@3x-nouse.png'
			railUrl.value = '/static/new/3@3x.png'
			leadUrl.value = '/static/new/2@3x-nouse.png'

			ladarUse.value = false
			railUse.value = true
			leadUse.value = false
		} else if (opt === 3) {
			ladarUrl.value = '/static/new/1@3x-nouse.png'
			railUrl.value = '/static/new/3@3x-nouse.png'
			leadUrl.value = '/static/new/2@3x.png'

			ladarUse.value = false
			railUse.value = false
			leadUse.value = true
		} else if (opt === 0) {
			ladarUrl.value = '/static/new/1@3x.png'
			railUrl.value = '/static/new/3@3x.png'
			leadUrl.value = '/static/new/2@3x.png'

			ladarUse.value = false
			railUse.value = false
			leadUse.value = false
		}
		savePage()
	}

	const getWorkMode = (url, para) => {
		getDeviceWorkMode(para.serial_code).then(async (res) => {
			console.log('请求工作状态成功', res)
			let status = 'normal'
			if (res.code == '200') {
				let mode = 0
				if (res.data.workMode.continuous != 'unknown' || res.data.workMode.continuous !=
					undefined ||
					res.data.workMode.continuous != null) {
					mode = res.data.workMode.continuous
				} else {
					mode = res.data.control.continuous
				}
				if (mode == 0) {
					serviceLocateMode.value = '标准定位'
				} else if (mode === 1) {
					serviceLocateMode.value = '快速定位'
					// countdown.value = 1
				}
				DeviceConnectModol.value = res.data.workMode.connect
				if (res.data.workMode.connect != res.data.control.connect) {
					deviceConnectModolStatue.value = '切换中'
					if (res.data.control.connect === 1) {
						//拿一个上次通讯时间
						if (nextCommunicate.value) {
							showCountdown.value = true
							startCountdown(nextCommunicate.value)
						}
					}
				} else {
					showCountdown.value = false
					clearInterval(countdownTimer.value);
					if (DeviceConnectModol.value === 0) {
						deviceConnectModolStatue.value = '标准模式'
					}

					if (DeviceConnectModol.value === 1) {
						deviceConnectModolStatue.value = '高频模式'
					}
				}
				// let marker1 = {
				// 	id: 3,
				// 	latitude: item.latitude,
				// 	longitude: item.longitude,
				// 	iconPath: getStaticOh("/static/imgs/locate/smallBell.png"),
				// 	width: 64,
				// 	height: 64,
				// 	time: item.location_time,
				// 	loc_type: item.loc_type,
				// 	anchor: {
				// 		x: .5,
				// 		y: 1
				// 	}
				// }
				// const target = markers.value.find(item => item.id === 2);
				// let marker1=JSON.parse(JSON.stringify(target))

				console.log("res.data.workMode.buzzer", res.data.workMode.buzzer)
				console.log("res.data.control.buzzer", res.data.control.buzzer)
				if (res.data.workMode.buzzer == 0 && res.data.workMode.rgb == 0) {
					//删掉id=3的
					// markers.value = markers.value.filter(item => item.id !== 3)
					// uniRemoveMarker(3)
					status = 'normal'
				}
				if (res.data.workMode.rgb == 1) {
					//加一个rgb图标	

					// marker1.id = 3
					status = 'light'
				}
				if ((res.data.workMode.rgb != res.data.control.rgb)) { //&& DeviceConnectModol.value === 1
					setTimeout(() => {
						clickRgbFun('rgb', false, false, true)
					}, 200)
				} else {
					waitRgbText.value = ''
				}
				if (res.data.workMode.buzzer == 1) {
					//加一个响铃图标

					status = 'buzzer'
					if (res.data.workMode.rgb == 1) {

						status = 'bl'
					}

					// marker1.id = 4
				}
				// await findeOrChangeById(marker1, markers.value)
				// let newMarker = markers.value.slice(0)
				// markers.value = new Array()
				// markers.value = newMarker
				// console.log("工作模式重置标点", markers.value)
				// await saveMarkers()
				getPetPosition(loadobject.value, false, true, status)

				if (firstGetPetPose.value) {
					moveToPet()
					firstGetPetPose.value = false
				}
				uni.hideLoading()
				// if (bluetoothConnect.value && !stopLadarToast.value) {
				// 	if (item.locType && item.locType === 4) {
				// 		//如果位置是家庭wifi 但是时间超过10分钟，连上蓝牙后以手机位置为主
				// 		if (diff > 5) {
				// 			mergeToPhone()
				// 		}
				// 	} else {
				// 		mergeToPhone();
				// 	}
				// }


				console.error('markers.value addrgb', markers.value)
				// console.log("uniGetMarkerArray", uniGetMarkerArray())
				if ((res.data.workMode.buzzer != res.data.control
						.buzzer)) { // && DeviceConnectModol.value === 1
					setTimeout(() => {
						clickRgbFun('bell', false, false, true)
					}, 400)
				} else {
					waitBellText.value = ''
				}
			} else {
				console.log('请求工作状态失败', res)
			}
		}).catch((err) => {
			console.log('请求工作状态失败', err)
		})

		// var deviceAccount = getApp().globalData.internet + url
		// util.requestDataFrom(deviceAccount, para).then(async (res) => {
		// 	console.log('请求工作状态成功', res, para)
		// 	if (res.data.code === 200) {
		// 		// let mode = res.data.data.control_mode.continuous_control_mode
		// 		let mode = 0
		// 		if (res.data.data.work_mode.continuous_work_mode != "unknown") {
		// 			mode = res.data.data.work_mode.continuous_work_mode
		// 		} else {
		// 			mode = res.data.data.control_mode.continuous_control_mode
		// 		}
		// 		if (mode === 0) {
		// 			serviceLocateMode.value = '标准定位'
		// 		} else if (mode === 1) {
		// 			serviceLocateMode.value = '快速定位'
		// 			// countdown.value = 1
		// 		}
		// 		let item = markers.value.find(item => item.id === 2)
		// 		if (!item) {
		// 			console.log("还没有宠物定位")
		// 			return

		// 		}
		// 		console.log('item', item)
		// 		let marker1 = {
		// 			id: 3,
		// 			latitude: item.latitude,
		// 			longitude: item.longitude,
		// 			iconPath: getStaticOh("/static/imgs/locate/smallBell.png"),
		// 			width: 64,
		// 			height: 64,
		// 			time: item.location_time,
		// 			loc_type: item.loc_type,
		// 			anchor: {
		// 				x: .5,
		// 				y: 1
		// 			}
		// 		}
		// 		console.log("res.data.data.work_mode.buzzer_work_mode", res.data.data.work_mode
		// 			.buzzer_work_mode)
		// 		console.log("res.data.data.control_mode.buzzer_control_mode)", res.data.data
		// 			.control_mode.buzzer_control_mode)
		// 		if (res.data.data.work_mode.buzzer_work_mode === 0 && res.data.data.work_mode
		// 			.rgb_work_mode === 0) {
		// 			//删掉id=3的
		// 			markers.value = markers.value.filter(item => item.id !== 3)
		// 			uniRemoveMarker(3)
		// 		}
		// 		if (res.data.data.work_mode.rgb_work_mode === 1) {
		// 			//加一个rgb图标	
		// 			marker1.iconPath = getStaticOh("/static/imgs/locate/smallLight.png")
		// 			// marker1.id = 3
		// 			findeOrChangeById(marker1, markers.value)
		// 		}
		// 		if ((res.data.data.work_mode.rgb_work_mode != res.data.data.control_mode
		// 				.rgb_control_mode)) { //&& DeviceConnectModol.value === 1
		// 			setTimeout(() => {
		// 				clickRgbFun('rgb', false, false, true)
		// 			}, 200)
		// 		} else {
		// 			waitRgbText.value = ''
		// 		}
		// 		if (res.data.data.work_mode.buzzer_work_mode === 1) {
		// 			//加一个响铃图标
		// 			marker1.iconPath = getStaticOh("/static/imgs/locate/smallBell.png")
		// 			if (res.data.data.work_mode.rgb_work_mode === 1)
		// 				marker1.iconPath = getStaticOh("/static/imgs/locate/smallLightAndBell.png")
		// 			// marker1.id = 4
		// 			findeOrChangeById(marker1, markers.value)
		// 		}
		// 		let newMarker = markers.value.slice(0)
		// 		markers.value = new Array()
		// 		markers.value = newMarker
		// 		console.log("工作模式重置标点", markers.value)
		// 		// uniClearAllMarkers()
		// 		// for (let item of markers.value) {
		// 		// 	console.log("工作模式标点添加")
		// 		// 	await uniAddMarker({
		// 		// 		id: item.id,
		// 		// 		latitude: item.latitude,
		// 		// 		longitude: item.longitude,
		// 		// 		iconPath: item.iconPath,
		// 		// 		width: item.width,
		// 		// 		height: item.height,
		// 		// 		rotate: item.rotate
		// 		// 	})
		// 		// }
		// 		await saveMarkers()

		// 		console.error('markers.value addrgb', markers.value)
		// 		// console.log("uniGetMarkerArray", uniGetMarkerArray())
		// 		if ((res.data.data.work_mode.buzzer_work_mode != res.data.data.control_mode
		// 				.buzzer_control_mode)) { // && DeviceConnectModol.value === 1
		// 			setTimeout(() => {
		// 				clickRgbFun('bell', false, false, true)
		// 			}, 400)
		// 		} else {
		// 			waitBellText.value = ''
		// 		}
		// 	} else {
		// 		console.log('请求工作状态失败', res)
		// 	}
		// }).catch((err) => {
		// 	console.log('请求工作状态失败', err)
		// })

	}
	const saveMarkers = async () => {
		let mapArr = uniGetMarkerArray()
		// 获取 markers.value 中所有的 id
		let markerIds = markers.value.map(m => m.id)
		// 找出 mapArr 中有但 markers.value 中没有的 id
		let delArr = mapArr.filter(item => !markerIds.includes(item.id)).map(item => item.id)
		// 获取 markers.value 中 id 不在 delArr 中的部分
		let keepMarkers = markers.value.filter(m => !delArr.includes(m.id))

		for (let id of delArr) {
			await uniRemoveMarker(id)
		}
		for (let m of keepMarkers) {
			findeOrChangeById(m, markers.value)
		}
	}

	const sendLocateMode = (serialcode, mode) => {
		var data = {
			uid: loadobject.value.uid,
			serialCode: loadobject.value.serialCode,
			commandType: COMMAND_TYPE.CONTINUOUS_LOCATION,
			commandValue: mode
		};
		sendCommand(data).then(recivedata => {
			console.log('设置定位模式成功', success)
		})
		// let setlocate = {
		// 	serial_code: serialcode,
		// 	continuous_mode: mode
		// }
		// util.requestService(getApp().globalData.locateMode, setlocate)
	}

	const restartBlueTooth = async (isshow) => {
		// 检查页面状态，如果已离开页面则不执行
		if (pageStatues.value !== 1) {
			console.log('页面已离开，跳过蓝牙重启')
			return Promise.reject(new Error('页面已离开'))
		}

		return new Promise((resolve, reject) => {

			$uni.requestSystemPermission({
				permissions: ['ohos.permission.ACCESS_BLUETOOTH',
					'ohos.permission.DISCOVER_BLUETOOTH'
				],
				accept(allRight, grantedList) {
					console.log("requestSystemPermission allRight", allRight, "grantedList",
						grantedList)
					if (allRight == true) {
						// 再次检查页面状态
						if (pageStatues.value !== 1) {
							console.log('页面已离开，取消蓝牙操作')
							reject(new Error('页面已离开'))
							return
						}
						$uni.closeBluetoothAdapter({
							success: () => {
								console.log('关闭蓝牙适配器成功');
								// 延迟确保完全关闭
								setTimeout(() => {
									retryOpenBluetoothAdapter(isshow, resolve,
										reject);
								}, 300);
							},
							fail: (err) => {
								console.log('关闭蓝牙适配器失败，可能已经关闭', err);
								//把蓝牙适配器状态置为false
								// 即使关闭失败也继续尝试打开
								setTimeout(() => {
									retryOpenBluetoothAdapter(isshow, resolve,
										reject);
								}, 300);
							}
						});
					}
				},
				refuse(doNotAskAgain, grantedList) {
					console.log("requestSystemPermission doNotAskAgain", doNotAskAgain,
						"grantedList",
						grantedList)
					uni.showToast({
						title: '请检查蓝牙权限'
					})
				},
				error(error) {
					console.log("requestSystemPermission", error)
				}
			})


		})

	}

	const stopBluetoothOperations = () => {
		$uni.stopBluetoothDevicesDiscovery({
			success: (res) => {
				console.log('停止蓝牙设备搜索成功');
			},
			fail: (err) => {
				console.log('停止蓝牙设备搜索失败:', err);
			}
		})
		if (blueToothDeviceId.value && bluetoothConnect.value) {
			$uni.closeBLEConnection({
				deviceId: blueToothDeviceId.value,
				success: () => {
					console.log('关闭蓝牙连接成功');
				},
				fail: (err) => {
					console.log('关闭蓝牙连接失败:', err);
				},
				complete: (res) => {
					bluetoothConnect.value = false;
					getApp().globalData.blebluetoothConnect = false;
				}
			})
		}
	}

	const retryOpenBluetoothAdapter = (isshow, resolve, reject) => {
		if (pageStatues.value != 1) {
			console.log('已经离开定位界面')
			return
		}

		// 检查蓝牙是否可用
		if (!bluetoothEnable.value) {
			console.log('蓝牙未开启，跳过适配器初始化')
			reject({
				success: false,
				error: new Error('蓝牙未开启'),
				message: '蓝牙未开启'
			});
			return
		}

		let retryCount = 0
		const maxRetries = 3;

		function startScanning(thatInstance) {
			console.log('into start scan', pageStatues.value);

			if (pageStatues.value == 1 && bluetoothEnable.value) {
				return new Promise((scanResolve) => {
					if (startDiscover.value) {
						clearTimeout(startDiscover.value);
					}
					startDiscover.value = setTimeout(() => {
						// 再次检查蓝牙状态
						if (!bluetoothEnable.value) {
							console.log('蓝牙已关闭，取消扫描');
							scanResolve({
								type: 'scan',
								success: false,
								message: '蓝牙已关闭'
							});
							return;
						}
						startBluetoothDeviceDiscovery();
						scanResolve({
							type: 'scan',
							success: true,
							message: '开始扫描设备'
						});
					}, 800);
				});
			} else {
				console.error('已经离开当前界面或蓝牙已关闭', pageStatues.value, bluetoothEnable.value);
				return Promise.reject(new Error('已经离开当前界面或蓝牙已关闭，无法开始扫描'));
			}
		}

		async function tryOpen() {
			// 每次重试前检查蓝牙状态
			if (!bluetoothEnable.value) {
				console.log('蓝牙已关闭，停止重试');
				reject({
					success: false,
					error: new Error('蓝牙已关闭'),
					message: '蓝牙已关闭'
				});
				return;
			}

			retryCount++;
			try {
				const openResult = await new Promise((openResolve, openReject) => {
					$uni.openBluetoothAdapter({
						success: openResolve,
						fail: openReject
					});
				});
				console.log('打开蓝牙适配器成功，尝试第' + retryCount + '次');
				await new Promise(r => setTimeout(r, 200));

				// 再次检查蓝牙状态
				if (!bluetoothEnable.value) {
					console.log('蓝牙已关闭，取消后续操作');
					return;
				}

				bluetoothAdapterAvailable.value = 2
				stopBluetoothOperations()
				checkWifiIsSet()
				await new Promise(r => setTimeout(r, 300));

				// 再次检查蓝牙状态
				if (!bluetoothEnable.value) {
					console.log('蓝牙已关闭，取消扫描');
					return;
				}

				console.log('that.blueToothDeviceId', blueToothDeviceId.value, pageStatues.value);
				let finalResult;
				console.log('开始扫描新设备')
				const scanResult = await startScanning();
				finalResult = scanResult;
				resolve(finalResult);
			} catch (err) {
				console.log('打开蓝牙适配器失败，尝试第' + retryCount + '次:', err);
				if (retryCount < maxRetries && bluetoothEnable.value) {
					// 指数退避重试
					const delay = Math.min(500 * Math.pow(2, retryCount), 2000);
					console.log('将在' + delay + 'ms后重试');
					await new Promise(r => setTimeout(r, delay));
					await tryOpen();
				} else {
					let errorMsg = bluetoothEnable.value ? '没连上蓝牙:' + err : '蓝牙已关闭';

					if (isshow && pageStatues.value === 1 && bluetoothEnable.value) {
						uni.showToast({
							icon: 'none',
							title: errorMsg
						});
						checkWifiIsSet();
					}

					reject({
						success: false,
						error: err,
						message: errorMsg,
						retryCount: retryCount
					});
				}
			}

		}
		tryOpen();
	}

	const bluetoothSendHeart = () => {
		const heart = new Uint8Array(1)
		heart[0] = 0x21
		let writetype = 'writeNoResponse '
		if (devicePlatform.value == 'ios')
			writetype = 'write'
		// console.log('写入特征值')

		let buffer = heart
		if (heart instanceof Uint8Array) {
			buffer = heart.buffer.slice(heart.byteOffset, heart.byteOffset +
				heart.byteLength)
		} else if (Array.isArray(heart)) {
			buffer = new Uint8Array(heart).buffer
		}

		// 验证buffer是否有效
		if (!buffer || buffer.byteLength === 0) {
			console.log('数据buffer无效:', buffer)
			resolve(false)
			return
		}
		$uni.writeBLECharacteristicValue({
			deviceId: blueToothDeviceId.value, // 蓝牙设备 deviceId
			serviceId: blueToothServiceId.value, // 蓝牙服务uuid
			characteristicId: blueToothCharacteristicId.value, // 蓝牙特征值的 (即 writeId),
			writeType: writetype,
			value: buffer, // 这里的value是ArrayBuffer类型
			success(res) {
				// console.log('写入指令发送成功', heart)
				blueToothHeartCnt.value = 0
			},
			fail(err) {
				// bluetoothSendLocateMakesure()
				console.log('写入指令发送失败', err)
				blueToothHeartCnt.value++
				if (blueToothHeartCnt.value > 1)
					restartBlueTooth()
			}
		})
	}

	const bluetoothSendLocateMakesure = async () => {
		//发送定位
		console.log('getApp().globalData.myFirewareVersion', getApp().globalData.myFirewareVersion)
		try {
			if (getApp().globalData.myFirewareVersion > 34 || loadobject.value.serialCode.substring(0, 2) ===
				'ae') {
				// await new Promise((resolve) => setTimeout(resolve, 2000))
				const setLocatecontrol = setLocation(loacateMode.value)
				let writetype = 'writeNoResponse '
				if (devicePlatform.value == 'ios')
					writetype = 'write'
				// console.log('写入特征值',blueToothCharacteristicId.value)

				let buffer = setLocatecontrol
				if (setLocatecontrol instanceof Uint8Array) {
					buffer = setLocatecontrol.buffer.slice(setLocatecontrol.byteOffset, setLocatecontrol
						.byteOffset +
						setLocatecontrol.byteLength)
				} else if (Array.isArray(setLocatecontrol)) {
					buffer = new Uint8Array(setLocatecontrol).buffer
				}

				// 验证buffer是否有效
				if (!buffer || buffer.byteLength === 0) {
					console.log('数据buffer无效:', buffer)
					resolve(false)
					return
				}

				const adapter = devicePlatform.value == "harmonyos" ? $uni : uni
				adapter.writeBLECharacteristicValue({
					deviceId: blueToothDeviceId.value, // 蓝牙设备 deviceId
					serviceId: blueToothServiceId.value, // 蓝牙服务uuid
					characteristicId: blueToothCharacteristicId.value, // 蓝牙特征值的 (即 writeId)
					value: devicePlatform.value == "harmonyos" ? buffer :
					setLocatecontrol, // 这里的value是ArrayBuffer类型
					writeType: writetype,
					success(res) {
						console.log('写入指令发送成功', loacateMode.value)
					},
					fail(err) {
						// bluetoothSendLocateMakesure()
						console.log('写入指令发送失败', err)

					}
				})

			}
		} catch (e) {
			console.log('下发错误原因', e)
		}
	}

	const stopBluetooth = (cb) => {
		closeBLEConnection(blueToothDeviceId.value).then((res) => {
			console.log('主动断开蓝牙')
		})
		stopBluetoothDevicesDiscovery()
		closeBluetoothAdapter().then((res) => {
			console.log('调用关闭适配器结束')
			getApp().globalData.blebluetoothConnect = false
			bluetoothConnect.value = false
			cb && cb()
		}).catch((err) => {
			console.log('closeBluetoothAdapter fail', fail)
		})
	}

	const openLocate = async (deviceId) => {
		return new Promise((resolve, reject) => {
			let connectTimeout = setTimeout(() => {
				reject(new Error('蓝牙连接超时'));
			}, 10000); // 10秒超时

			$uni.createBLEConnection({
				deviceId: deviceId,
				timeout: 10000,
				success: (res) => {
					clearTimeout(connectTimeout);
					console.log("蓝牙连接成功", deviceId);

					// 停止扫描
					$uni.stopBluetoothDevicesDiscovery({
						success: (stopRes) => {
							console.log('停止蓝牙搜索成功');
							resolve(res);
						},
						fail: (stopErr) => {
							console.log('停止搜索失败，但连接成功');
							resolve(res);
						}
					});
				},
				fail: (res) => {
					clearTimeout(connectTimeout);
					console.log('蓝牙连接失败:', res);

					if (res.errCode === 10010 || res.errCode === -1) {
						console.log("蓝牙可能已经连接");
						resolve(res);
					} else if (res.code === 10012) {
						reject(new Error('连接超时'));
					} else {
						reject(res);
					}
				}
			});
		});
	}

	const connectAndLocate = async (deviceId) => {
		// 参数校验
		if (!deviceId) {
			console.error('connectAndLocate: deviceId 未提供');
			throw {
				success: false,
				status: 'invalid_params',
				deviceId: null,
				error: new Error('deviceId is required'),
				message: 'deviceId 参数缺失'
			};
		}

		if (bluetoothConnect.value) {
			console.log('已经在连接状态，跳过重复连接');
			return {
				success: true,
				status: 'already_connected',
				message: '已在连接状态'
			};
		}
		try {
			const result = await openLocate(deviceId);
			console.log('连接成功返回');

			// 返回连接成功的详细数据
			return {
				success: true,
				status: 'connected',
				deviceId: deviceId,
				data: result,
				message: '设备连接成功'
			};
		} catch (error) {
			console.error('连接设备失败:', error);
			bluetoothConnect.value = false; // 只在失败时清除

			// 连接失败，尝试重新扫描
			if (reconnectAttempts.value < maxReconnectAttempts.value) {
				setTimeout(() => {
					if (that.pageStatues === 1) {
						startBluetoothDeviceDiscovery();
					}
				}, 1000);
			}

			// 抛出错误信息对象
			throw {
				success: false,
				status: 'connect_failed',
				deviceId: deviceId,
				error: error,
				message: error.message || '连接失败'
			};
		}
	}

	const requestAndroidPermission = async (permisionID, statue) => {
		var result = await permision.requestAndroidPermission(permisionID)
		var strStatus
		if (result == 1) {
			strStatus = "已获得授权"
		} else if (result == 0) {
			strStatus = "未获得授权"
		} else {
			strStatus = "被永久拒绝权限"
		}
		if (result != 1)
			uni.showModal({
				content: "当前位置权限被拒绝，请打开" + statue + "权限",
				showCancel: false,
				success(res) {
					if (res.confirm) {
						permision.gotoAppPermissionSetting()
					}
				}
			})
		return result === 1
	}

	const savePage = () => {
		var savelocate = {
			remind: remind.value,
			outinside: outinside.value,
			margintop: margintop.value,
			// detectCircle: detectCircle.value,
			mapHeight: mapHeight.value,
			marginTopHeight: marginTopHeight.value,
			drawRange: drawRange.value,
			leadTime: leadTime.value,
			signalStrength: signalStrength.value,
			stopLadarToast: stopLadarToast.value,
			ladarToast: ladarToast.value,
			ladaring: ladaring.value,
			drawToast: drawToast.value,
			railToast: railToast.value,
			railing: railing.value,
			leading: leading.value,
			mapScale: mapScale.value,
			petDistanceOver: petDistanceOver.value,
			petDistance: petDistance.value,
			// loadobject: loadobject.value,
			leadUrl: leadUrl.value,
			railUrl: railUrl.value,
			ladarUrl: ladarUrl.value,

			leadUse: leadUse.value,
			railUse: railUse.value,
			ladarUse: ladarUse.value,
			// categoryId: categoryId.value,
			latitude: latitude.value,
			longitude: longitude.value,
			avatarDirection: avatarDirection.value,
			markers: markers.value,
			polygonsPoints: polygonsPoints.value,
			localSavePolygons: localSavePolygons.value,
			actionPolygonIndex: actionPolygonIndex.value,
			polygons: polygons.value,
			circles: circles.value,
			// topType: topType.value,
			// mapviz: mapviz.value,
			screenwidth: screenwidth.value,
			unpdataUserPosition: unpdataUserPosition.value,
			sureleading: sureleading.value,
			blueToothDeviceId: blueToothDeviceId.value,
			clickBell: clickBell.value,
			clickRgb: clickRgb.value,
			clickBellImgSrc: clickBellImgSrc.value,
			clickRgbImgSrc: clickRgbImgSrc.value,
			bellUse: bellUse.value,
			rgbUse: rgbUse.value,
			focusTarget: focusTarget.value
		}
		loadobject.value.data = savelocate
		var storage = JSON.stringify(savelocate)
		uni.setStorage({
			key: loadobject.value.serialCode + "页面缓存",
			data: storage,
			success: function() {
				console.error('数据缓存成功', storage)
			}
		})
	}

	const startCountdown = (targetTime) => {
		const now = new Date()
		const target = new Date(targetTime)
		if (target <= now) {
			// console.log('目标时间已过')
			getPetPosition(loadobject.value, false, true)
			countdown.value = '1(分钟)'
			return
		}
		const diff = target - now
		countdown.value = Math.floor(diff / 1000) // 转换为分钟
		if (countdown.value > 60) {
			countdown.value = Math.floor(countdown.value / 60)
			countdown.value = countdown.value.toString() + '(分钟)'
		} else {
			countdown.value = '1(分钟)'
		}
		// countdownTimer.value = setInterval(() => {
		// 	const newNow = new Date()
		// 	const newDiff = target - newNow
		// 	let second = Math.floor(newDiff / 1000)
		// 	if (newDiff <= 0) {
		// 		countdown.value = '1(分钟)'
		// 		getPetPosition(loadobject.value, false, true)
		// 		clearInterval(countdownTimer.value)
		// 		console.log('倒计时结束1')
		// 	} else {
		// 		if (second > 60) {
		// 			second = Math.floor(second / 60)
		// 			countdown.value = second.toString() + '(分钟)'
		// 		} else {
		// 			countdown.value = '1(分钟)'
		// 		}
		// 		// console.log('countdown.value', countdown.value)
		// 	}
		// }, 30000) // 每10秒更新一次
	}


	// const getDeviceConnectModol = () => {
	// 	let url = getApp().globalData.internet + getApp().globalData.checkConnectModel
	// 	let data = {
	// 		serial_code: loadobject.value.serialCode,
	// 	}
	// 	util.requestDataJson(url, data).then((rebackData) => {
	// 		console.log('查询设备连接状态', rebackData)
	// 		if (rebackData.statusCode === 200) {
	// 			DeviceConnectModol.value = rebackData.data.data.connect_mode
	// 			if (rebackData.data.data.connect_mode != rebackData.data.data.connect_mode_control) {
	// 				deviceConnectModolStatue.value = '切换中'
	// 				if (rebackData.data.data.connect_mode_control === 1) {
	// 					//拿一个上次通讯时间
	// 					if (rebackData.data.data.next_comm_time && !showCountdown.value) {
	// 						showCountdown.value = true
	// 						nextCommunicate.value = rebackData.data.data.next_comm_time
	// 						startCountdown(nextCommunicate.value)
	// 					}
	// 				}
	// 			} else {
	// 				showCountdown.value = false
	// 				clearInterval(countdownTimer.value)
	// 				if (DeviceConnectModol.value === 0) {
	// 					deviceConnectModolStatue.value = '标准模式'
	// 				}


	// 				if (DeviceConnectModol.value === 1) {
	// 					deviceConnectModolStatue.value = '高频模式'
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	const initData = () => {
		console.log('initData')
		outinside.value = false
		drawRange.value = 30
		leadTime.value = null
		stopLadarToast.value = false
		ladarToast.value = false
		ladaring.value = false
		drawToast.value = false
		railToast.value = false
		railing.value = false
		leading.value = false
		mapScale.value = 16
		petDistanceOver.value = false
		petDistance.value = 0
		leadUrl.value = '/static/new/2@3x.png'
		railUrl.value = '/static/new/3@3x.png'
		ladarUrl.value = '/static/new/1@3x.png'

		ladarUse.value = false
		railUse.value = false
		leadUse.value = false
		markers.value = new Array()
		polygonsPoints.value = new Array()
		localSavePolygons.value = [{
			points: new Array(),
			name: "",
			switch: false,
		}, {
			points: new Array(),
			name: "",
			switch: false,
		}, {
			points: new Array(),
			name: "",
			switch: false,
		}]
		actionPolygonIndex.value = 0
		polygons.value = [{
			points: [

			],
			strokeWidth: 2,
			strokeColor: '#FF0000',
			fillColor: '#00FF00',
			zIndex: 1,
		}]
		circles.value = []
		sureleading.value = false
		blueToothDeviceId.value = null
		clickBell.value = false
		clickRgb.value = false
		clickBellImgSrc.value = '/static/imgs/locate/bell.png'
		clickRgbImgSrc.value = '/static/imgs/locate/light.png'
		bellUse.value = false
		rgbUse.value = false
		focusTarget.value = 0
		showPolygonId.value = "0"
		showCircles.value = "0"
		if (ready.value == true) {
			uniClearMap()
		}
	}

	const isEqual = (arr1, arr2) => {
		if (arr1.length !== arr2.length) return false
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i].latitude !== arr2[i].latitude || arr1[i].longitude !== arr2[i].longitude) return false
		}
		return true
	}

	const checkRail = () => {
		//查询一下服务器围栏开启状态，如果服务器围栏打开，但是本地是关闭就要同步一下
		//这种情况就本地添加服务器的围栏，默认保存到第一个 
		try {
			let geofenceUrl = getApp().globalData.internet + getApp().globalData
				.geofence
			let para = {
				serial_code: loadobject.value.serialCode,
			}
			util.requestDataJsonGET(geofenceUrl, para).then(async (rebackData) => {
				console.log('获取到的围栏数据', rebackData)
				if (rebackData.data.code === 200) {
					let data = rebackData.data.data
					if (data.state === "on") {
						//本地添加围栏数据 服务器围栏打开 本地同步一下
						let polygon = data.geofence.polygon
						polygonsPoints.value = []
						for (let i = 0; i < polygon.length; i += 2) {
							var point = {
								latitude: polygon[i], // 偶数索引是纬度
								longitude: polygon[i + 1] // 奇数索引是经度
							}
							polygonsPoints.value.push(point)
						}
						var findIndex = -1
						let polysort = sortByClockwiseOrder(polygonsPoints.value)
						for (var index = 0; index < localSavePolygons.value.length; index++) {
							var element = localSavePolygons.value[index]
							localSavePolygons.value[index].switch = false
							if (isEqual(element.points, polysort))
								findIndex = index
						}
						// console.error('localSavePolygons.value',localSavePolygons.value)
						if (findIndex === -1) {
							findIndex = localSavePolygons.value.findIndex(element => element.points
								.length <= 0)
							localSavePolygons.value[findIndex].name = '围栏' + actionPolygonIndex.value
								.toString()
						}
						// console.error('findIndex',findIndex)
						if (findIndex === -1)
							findIndex = 0
						actionPolygonIndex.value = findIndex
						var marker = markers.value.filter(item => item.id <= 3)
						markers.value = []
						markers.value = marker

						for (let item of markers.value) {
							if (item.id > 3) {
								uniRemoveMarker(item.id)
							}
						}

						var poly = [{
							points: polysort,
							strokeWidth: 2,
							strokeColor: '#FF0000',
							fillColor: 'rgba(255,0,0,0.2)',
							zIndex: 1,
						}]
						polygons.value = poly
						uniRemovePolygon(showPolygonId.value.split("--")[0])
						showPolygonId.value = await uniAddPolygon({
							id: 1,
							strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
							fillColor: colorToHexNumber(polygons.value[0].fillColor),
							strokeWidth: polygons.value[0].strokeWidth,
							zIndex: polygons.value[0].zIndex,
							points: polygons.value[0].points
						})

						//
						// await uniClearMap()
						// showPolygonId.value = "0"
						// for (let i = 0; i < markers.value.length; i++) {
						// 	await uniAddMarker({
						// 		id: markers.value[i].id,
						// 		latitude: markers.value[i].latitude,
						// 		longitude: markers.value[i].longitude,
						// 		iconPath: markers.value[i].iconPath,
						// 		width: markers.value[i].width,
						// 		height: markers.value[i].height,
						// 		rotate:markers.value[i].rotate
						// 	})
						// }
						// console.log("fillColor", colorToHexNumber(polygons.value[0].fillColor))

						// showPolygonId.value = await uniAddPolygon({
						// 	id: 1,
						// 	strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
						// 	fillColor: colorToHexNumber(polygons.value[0].fillColor),
						// 	strokeWidth: polygons.value[0].strokeWidth,
						// 	zIndex: polygons.value[0].zIndex,
						// 	points: polygons.value[0].points
						// })
						//

						//拿polysort 和本地的localSavePolygons.value做对比找出index 找不到就默认覆盖第一个
						railing.value = true
						localSavePolygons.value[findIndex].points = polysort
						localSavePolygons.value[findIndex].switch = true

						//显示围栏
					} else {
						//服务器围栏关闭 本地同步一下
						closeRail(actionPolygonIndex.value)
					}
				}
			})
		} catch (error) {
			console.error('error', error)
		}

	}

	const loadPageData = async () => {
		// return new Promise((resolve, reject) => {
		// 	uni.getStorage({
		// 		key: loadobject.value.serialCode + "页面缓存",
		// 		success: function(res) {
		// 			resolve(res)
		// 		},
		// 		fail: function(err) {
		// 			console.log('获取缓存的页面缓存 失败', err)
		// 		},
		// 	})
		// }).then(res => {
		console.log('获取缓存的页面缓存loadPageData', loadobject.value.data)
		if (loadobject.value.data != null) {
			let data = loadobject.value.data
			try {
				remind.value = data.remind
				outinside.value = data.outinside
				margintop.value = data.margintop
				drawRange.value = data.drawRange
				leadTime.value = data.leadTime
				signalStrength.value = data.signalStrength
				stopLadarToast.value = data.stopLadarToast
				ladarToast.value = data.ladarToast
				ladaring.value = data.ladaring
				drawToast.value = data.drawToast
				railToast.value = data.railToast
				railing.value = data.railing
				leading.value = data.leading
				mapScale.value = data.mapScale
				petDistanceOver.value = data.petDistanceOver
				petDistance.value = data.petDistance
				leadUrl.value = data.leadUrl
				railUrl.value = data.railUrl
				ladarUrl.value = data.ladarUrl

				leadUse.value = data.leadUse
				railUse.value = data.railUse
				ladarUse.value = data.ladarUse

				categoryId.value = data.categoryId ? data.categoryId : null;
				// if (markers.value.length > 1) {
				// 	data.markers[0] = markers.value[0]
				// 	data.markers[1] = markers.value[1]
				// }
				markers.value = data.markers
				polygonsPoints.value = data.polygonsPoints
				localSavePolygons.value = data.localSavePolygons
				actionPolygonIndex.value = data.actionPolygonIndex
				polygons.value = data.polygons

				circles.value = data.circles
				sureleading.value = data.sureleading
				blueToothDeviceId.value = data.blueToothDeviceId
				clickBell.value = data.clickBell
				clickRgb.value = data.clickRgb
				clickBellImgSrc.value = data.clickBellImgSrc
				clickRgbImgSrc.value = data.clickRgbImgSrc
				bellUse.value = data.bellUse
				console.log('loadPageData', bellUse.value)
				rgbUse.value = data.rgbUse
				focusTarget.value = data.focusTarget
				if (stopLadarToast.value)
					setTimeout(() => {
						keepLadar()
					}, 700)
				if (sureleading.value)
					setTimeout(() => {
						keepLeading()
					}, 700)
				// if (railing.value) {
				// 	setTimeout(() => {
				// 		sureRail(0)
				// 	}, 700)
				// } 
				// else {
				// 	checkRail()
				// }
				//如果markers里有null  这里加把缓存手机位置清除是为了解决有的用户反映手机位置和家庭wifi重合，位置不变
				console.log('过滤前marker', markers.value)
				markers.value = markers.value.filter(item => item !== null && item.id !== undefined)
				let newMarker = markers.value.slice(0)
				markers.value = new Array()
				markers.value = newMarker

				try {
					await uniClearMap()
					showPolygonId.value = "0"
					showCircles.value = "0"
					for (let i = 0; i < markers.value.length; i++) {
						await uniAddMarker({
							id: markers.value[i].id,
							latitude: markers.value[i].latitude,
							longitude: markers.value[i].longitude,
							iconPath: markers.value[i].iconPath,
							width: markers.value[i].width,
							height: markers.value[i].height,
							rotate: markers.value[i].rotate
						})
					}
					console.log("fillColor", colorToHexNumber(polygons.value[0].fillColor))

					showPolygonId.value = await uniAddPolygon({
						id: 1,
						strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
						fillColor: colorToHexNumber(polygons.value[0].fillColor),
						strokeWidth: polygons.value[0].strokeWidth,
						zIndex: polygons.value[0].zIndex,
						points: polygons.value[0].points
					})

					showCircles.value = await uniAddCircle({
						id: 1,
						latitude: marker.latitude, // 圆心纬度
						longitude: marker.longitude, // 圆心经度
						color: colorToHexNumber(circles.value[0].color), // 圆的颜色
						fillColor: colorToHexNumber(circles.value[0].fillColor), // 圆的填充颜色
						radius: 30,
					})

				} catch (err) {
					console.log("initAAAAAAAAA", err)
				}
				moveToPet()
				console.log('过滤过的marker', markers.value)
				// if (drawToast.value) {
				// 	getsliderRect()
				// }
			} catch (e) {
				console.log('获取页面缓存出错', e)
			}
		} else {
			//发生在宠物切换，另一只第一次进来不能显示之前的宠物位置，当时还没缓存
			initData()
		}

		// })
	}

	const showFloorTitle = () => {
		if (locateInfoData.value != '') {
			showFloor.value = !showFloor.value
		} else {
			showFloor.value = false
			clickOffline()
		}
	}

	const controltap = (e) => {
		// let vm = this
		if (e.detail.controlId === 0) {
			reFresh()
		}
	}
	// 判断两条线段是否相交
	const checkIntersection = (line1_start, line1_end, line2_start, line2_end) => {
		var x1 = line1_start.latitude,
			y1 = line1_start.longitude,
			x2 = line1_end.latitude,
			y2 = line1_end.longitude
		var x3 = line2_start.latitude,
			y3 = line2_start.longitude,
			x4 = line2_end.latitude,
			y4 = line2_end.longitude
		const m1 = (y2 - y1) / (x2 - x1)
		const m2 = (y4 - y3) / (x4 - x3)
		const b1 = y1 - (m1 * x1)
		const b2 = y3 - (m2 * x3)

		const x_intercept = (b2 - b1) / (m1 - m2)

		if (
			Math.min(x1, x2) < x_intercept &&
			x_intercept < Math.max(x1, x2) &&
			Math.min(x3, x4) < x_intercept &&
			x_intercept < Math.max(x3, x4)
		) {
			const y_intercept = (m1 * x_intercept) + b1

			if (
				Math.min(y1, y2) < y_intercept &&
				y_intercept < Math.max(y1, y2) &&
				Math.min(y3, y4) < y_intercept &&
				y_intercept < Math.max(y3, y4)
			) {
				return true
			}
		}
		return false
	}

	// 判断points1的两个点构成的直线是否与points2构成的多边形有重叠部分
	const isOverlap = (points1, points2) => {
		for (let i = 0; i < points2.length - 1; i++) {
			const point1 = points2[i]
			const point2 = points2[i + 1]
			if (checkIntersection(points1[0], points1[1], point1, point2)) {
				return true
			}
		}
		return false
	}

	const initCompass = (res) => {
		// console.log('罗盘回调', res)
		avatarDirection.value = res.direction - 180
		if (avatarDirection.value < 0)
			avatarDirection.value += 360
		// uniSetMarkerRotation(0,avatarDirection.value)
		let phone = markers.value.find(item => item.id === 0)
		if (phone) {
			let dis = Math.abs(phone.rotate - avatarDirection.value)
			if (phone && dis > 10) {
				phone.rotate = avatarDirection.value
				findeOrChangeById(phone, markers.value)
				let newmarker = markers.value.slice(0)
				markers.value = newmarker
				// console.log('phone',markers.value)
			}
		}

	}

	const convertToFormat = (head, str) => {
		var constr = ""
		for (var i = 0; i < str.length; i++) {
			var char = str.charAt(i)
			if (char >= 'a' && char <= 'z') {
				char = char.toUpperCase()
			}
			constr += char
		}

		var result = head + '-' + constr.slice(6)
		return result
	}

	const stopLadar = (options) => {
		console.log('into stop ladar')
		// sendLocateMode(loadobject.value, 0)
		if (options) {
			// let setrgb = {
			// 	serial_code: loadobject.value.serialCode,
			// 	rgb_control: 0
			// }
			// let setbuzzer = {
			// 	serial_code: loadobject.value.serialCode,
			// 	buzzer_control: 0
			// }
			// if (getApp().globalData.myFirewareVersion > 33) {
			// 	util.requestService(getApp().globalData.setRgb, setrgb) //给服务器发灯的请求
			// 	util.requestService(getApp().globalData.setBuzzer, setbuzzer)
			// }

			if (getApp().globalData.myFirewareVersion > 34 || loadobject.value.serialCode.substring(0, 2) === 'ae') {
				console.log('执行蓝牙关闭rgb和蜂鸣器', blueToothCharacteristicId.value)

				// if (bluetoothConnect.value) {
				// 	const setRgbcontrol = setRgb(0)
				// 	util.BleWrite(setRgbcontrol, blueToothDeviceId.value, 
				// 		blueToothServiceId.value, blueToothCharacteristicId.value
				// 		) //给设备发灯的请求
				// }
				if (clickRgb.value)
					clickRgbFun('rgb', true, false, false)
				// let setrgb = {serial_code: loadobject.value.serialCode,rgb_control: 0}
				// util.requestService(getApp().globalData.setRgb, setrgb).then((recivedata) => {
				// 	console.log('设置rgb', recivedata)
				// 	if (recivedata.statusCode === 200 && recivedata.data.code === 200) {

				// 	}
				// })
				setTimeout(() => {
					if (clickBell.value)
						clickRgbFun('bell', true, false, false)
					// if (bluetoothConnect.value) {
					// 	const setbuzzercontrol = setBuzzer(0)
					// 	util.BleWrite(setbuzzercontrol, blueToothDeviceId.value,
					// 		blueToothServiceId.value, blueToothCharacteristicId.value)
					// }

					// let setbuzzer = {
					// 	serial_code: loadobject.value.serialCode,
					// 	buzzer_control: 0
					// }
					// util.requestService(getApp().globalData.setBuzzer, setbuzzer).then((
					// 	recivedata) => {
					// 	if (recivedata.statusCode === 200 && recivedata.data.code ===
					// 		200) {

					// 	}
					// })
				}, 500)
			}
		}
		stopLadarToast.value = false
		ladaring.value = false
		RSSI.value = 0
		progressNumber.value = 0
		ladarRotateAngle.value = 0
		clearInterval(intervalId2.value)
		intervalId2.value = null
		// uni.stopBluetoothDevicesDiscovery({
		// 	success(res) {
		// 		console.log(res)
		// 	}
		// })
	}

	const onregionchange = () => {
		// let that = this
		_mapContext.getScale({
			success: (res) => {
				// console.log('获取缩放尺度',res)
				let index = Math.trunc(res.scale) - 3
				// console.log('index',index)
				scaleShow.value = scaleArray.value[index]
				// console.log('scaleShow',scaleShow.value)
			},
			fail: (err) => {

			}
		})
	}

	const onMapTap = async (event) => {
		console.log(event)
		// 当地图被点击时触发
		//点击了电子围栏才有效
		if (showNewRail.value) {
			const latitude = event.detail.latitude
			const longitude = event.detail.longitude
			// 更新经纬度信息
			// latitude.value = latitude
			// longitude.value = longitude
			var point = {
				latitude: latitude,
				longitude: longitude,
			}
			//判断是否有重叠，不重叠继续，重叠了提醒用户，并且不加
			polygonsPoints.value.push(point)
			// let polysort = sortByClockwiseOrder(polygonsPoints.value)
			var polygon = [{
				points: polygonsPoints.value,
				strokeWidth: 2,
				strokeColor: '#FF0000',
				fillColor: 'rgba(255,0,0,0.2)',
				zIndex: 1,
			}]
			polygons.value = polygon
			if (showPolygonId.value && showPolygonId.value != "0") {
				await uniRemovePolygon(showPolygonId.value.split("--")[0])
			}
			showPolygonId.value = await uniAddPolygon({
				id: 1,
				strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
				fillColor: colorToHexNumber(polygons.value[0].fillColor),
				strokeWidth: polygons.value[0].strokeWidth,
				zIndex: polygons.value[0].zIndex,
				points: polygons.value[0].points
			})

			console.log('polygonsPoints=', polygonsPoints.value)

			// 创建标记点
			var marker = [{
				id: markers.value[markers.value.length - 1].id + 4,
				latitude,
				longitude,
				iconPath: getStaticOh('/static/xixin/railPoint.png'), // 自定义标记图标路径
				width: 32,
				height: 32,
				callout: {
					content: "撤销",
					display: "ALWAYS",
					color: '#ff5500',
					bgColor: 'rgba(255, 255, 255, 1)',
					textAlign: 'center',
					borderRadius: '5px',
					borderColor: 'rgba(255, 85, 0, 1.0)',
					borderWidth: 1,
					padding: 4
				}
			}]
			var newMarker = markers.value.slice(0)
			newMarker.push(marker[0])
			markers.value = newMarker
			await uniAddMarker({
				id: marker[0].id,
				latitude: marker[0].latitude,
				longitude: marker[0].longitude,
				iconPath: marker[0].iconPath,
				width: 32,
				height: 32,
			})

			// console.log('polygonsPoints', polygonsPoints.value)
			// console.log('polygons', polygons.value)
			// console.log('markers', markers.value)
			// markers.value = marker
		}

	}

	const sortByClockwiseOrder = (points) => {
		// 计算数组中每个点的极坐标角度
		function getAngle(point) {
			const {
				latitude,
				longitude
			} = point
			const y = latitude - center.latitude
			const x = longitude - center.longitude
			return Math.atan2(y, x)
		}

		// 计算数组中心点
		function getCenterPoint(points) {
			const sum = points.reduce(
				(accumulator, point) => {
					return {
						latitude: accumulator.latitude + point.latitude,
						longitude: accumulator.longitude + point.longitude
					}
				}, {
					latitude: 0,
					longitude: 0
				}
			)
			const count = points.length
			return {
				latitude: sum.latitude / count,
				longitude: sum.longitude / count
			}
		}

		// 按照角度进行排序
		function compareAngles(point1, point2) {
			const angle1 = getAngle(point1)
			const angle2 = getAngle(point2)
			return angle1 - angle2
		}

		const center = getCenterPoint(points)
		return points.sort(compareAngles)
	}

	const startBluetoothDeviceDiscovery = () => {
		console.log('开始蓝牙设备搜索');

		// 检查蓝牙是否可用
		if (!bluetoothEnable.value) {
			console.log('蓝牙未开启，跳过搜索');
			return;
		}

		// 检查页面状态
		if (pageStatues.value !== 1) {
			console.log('页面已离开，跳过搜索');
			return;
		}

		// 创建停止搜索的Promise，带超时控制
		const stopPromise = new Promise((resolve) => {
			let isResolved = false;

			// 设置超时（如果停止操作卡住，300ms后强制继续）
			const timeoutId = setTimeout(() => {
				if (!isResolved) {
					console.log('停止操作超时，强制继续');
					isResolved = true;
					resolve(false); // 超时返回false
				}
			}, 300);

			// 尝试停止搜索
			$uni.stopBluetoothDevicesDiscovery({
				success: () => {
					if (!isResolved) {
						clearTimeout(timeoutId);
						console.log('停止搜索成功');
						isResolved = true;
						resolve(true); // 成功返回true
					}
				},
				fail: (err) => {
					if (!isResolved) {
						clearTimeout(timeoutId);
						console.log('停止搜索失败:', err);
						isResolved = true;
						resolve(false); // 失败返回false
					}
				}
			});
		});

		// 无论停止操作结果如何，都执行开始搜索
		stopPromise.finally(() => {
			// 再次检查蓝牙状态和页面状态
			if (!bluetoothEnable.value || pageStatues.value !== 1) {
				console.log('蓝牙已关闭或页面已离开，取消搜索');
				return;
			}

			// 等待一个短时间确保稳定性
			setTimeout(() => {
				// 最终检查
				if (!bluetoothEnable.value || pageStatues.value !== 1) {
					console.log('蓝牙已关闭或页面已离开，取消搜索');
					return;
				}

				console.log('执行蓝牙设备搜索');

				$uni.startBluetoothDevicesDiscovery({
					allowDuplicatesKey: false,
					interval: 500,
					success: (res) => {
						console.log('蓝牙搜索成功启动');
						searchBluetoothLogo.value = true;
					},
					fail: (err) => {
						console.log('蓝牙搜索启动失败:', err);
						searchBluetoothLogo.value = false;
					}
				});
			}, 100); // 100ms延迟确保操作顺序
		});
	}

	const reFresh = async (show) => {
		show = show ?? false;
		const now = Date.now();
		var diff = now - refreshTime.value; // 处理初始值为undefined的情况
		if (diff < 2000) {
			uni.showToast({
				title: '操作太频繁了',
				icon: 'none'
			})
			return; // 直接返回，不执行后续代码
		}

		// 立即更新时间戳，防止重复点击
		refreshTime.value = now;

		var commandUrl = getApp().globalData.internet_cyy + getApp().globalData.sendCommand;
		var data = {
			uid: loadobject.value.uid,
			serialCode: loadobject.value.serialCode,
			commandType: COMMAND_TYPE.SINGLE_LOCATION,
			commandValue: 1
		};
		sendCommand(data).then(res => {
			if (show) {
				uni.showToast({
					title: '发送成功请耐心等待',
					icon: 'none'
				})
			}
		}).catch(err => {
			refreshTime.value = 0;
		})
		// try {
		// 	const res = await util.requestDataJson(commandUrl, data);
		// 	console.log('res', res);
		// 	if (res.data.code === '200') {
		// 		if (show) {
		// 			uni.showToast({
		// 				title: '发送成功请耐心等待',
		// 				icon: 'none'
		// 			})
		// 		}
		// 	} else {
		// 		throw new Error('单次命令发送失败' + res.data.msg);
		// 	}
		// } catch (err) {
		// 	if (show) {
		// 		uni.showToast({
		// 			title: err.message || err.errMsg,
		// 			icon: 'none'
		// 		})
		// 	}
		// 	// 可选：请求失败时重置时间戳，允许用户重试
		// 	refreshTime.value = 0;
		// }
	}

	const ladarInterval = (opt) => {
		let cnt = 0
		// let that = this
		intervalId2.value = setInterval(() => {
			cnt++
			if (stopLadarToast.value) {
				ladarRotateAngle.value += 20
				if (ladarRotateAngle.value >= 360)
					ladarRotateAngle.value = 0
				// console.log("getApp().globalData.myFirewareVersion", getApp().globalData.myFirewareVersion)
				if (cnt === 15 && getApp().globalData.myFirewareVersion > 34 || loadobject.value.serialCode
					.substring(0, 2) === 'ae') {
					if (!clickRgb.value) {
						// let setrgb = {
						// 	serial_code: loadobject.value.serialCode,
						// 	rgb_control: 1
						// }
						// if (bluetoothConnect.value) {
						// 	const setRgbcontrol = setRgb(1)
						// 	util.BleWriteOH(setRgbcontrol, blueToothDeviceId.value,
						// 		blueToothServiceId.value, blueToothCharacteristicId.value
						// 	) //给设备发灯的请求
						// }
						// console.log("进入蓝牙打开rgb")
						clickRgbFun('rgb', true, false, true)
					}
					// util.requestService(getApp().globalData.setRgb, setrgb).then((recivedata) => {
					// 	console.log('设置rgb', recivedata)
					// 	if (recivedata.statusCode === 200 && recivedata.data.code === 200) {

					// 	}
					// })
					setTimeout(() => {
						if (!clickBell.value) {
							// let setbuzzer = {
							// 	serial_code: loadobject.value.serialCode,
							// 	buzzer_control: 1
							// }
							// if (bluetoothConnect.value) {
							// 	const setbuzzercontrol = setBuzzer(1)
							// 	util.BleWriteOH(setbuzzercontrol, blueToothDeviceId.value,
							// 		blueToothServiceId.value, blueToothCharacteristicId.value)
							// }
							clickRgbFun('bell', true, false, true)
						}
					}, 1500)
				}
				if (cnt % 10 === 0) {
					// console.log('into get rssi')
					if (bluetoothConnect.value) {
						$uni.getBLEDeviceRSSI({
							deviceId: blueToothDeviceId.value,
							success(res) {
								// console.log('拿到设备的蓝牙ssi', res)
								var rssiValue = res.RSSI
								if (rssiValue >= 0) {
									rssiValue = -100
								}
								RSSI.value = rssiValue + 100
								if (RSSI.value < 0)
									RSSI.value = 0
								if (RSSI.value > 60)
									RSSI.value = 60
								RSSI.value = Math.floor(RSSI.value / 0.6)
							},
							fail(err) {
								console.log('获取ssi失败', err)
							}
						})
					}
				}
			}
		}, 100)
	}

	const sureLadar = async (option) => {
		$uni.openBluetoothAdapter({
			success(res) {
				if (bluetoothConnect.value === false) {
					RSSIText.value = '蓝牙连接中'
					// blinkInterval.value = setInterval(() => {
					// 	dotCount.value = (dotCount.value + 1) % 4 // 循环增加点的数量，最多到3个
					// 	dots.value = '...'.substring(0, dotCount.value) // 根据点的数量设置dots的值
					// }, 500)
				}
				// if (bluetoothConnect.value != false) {
				ladarToast.value = false
				stopLadarToast.value = true
				ladaring.value = true
				ladarToast.value = false
				storageLocateStatue(true)
				//把图标变成黑色
				// ladarUrl.value = "../../static/xixin/clickladar.png"
				coverIcon(1)
				uni.showLoading({
					title: '蓝牙连接中'
				})
				console.log('blueToothDeviceId', blueToothDeviceId.value)
				console.log('bluetoothConnect', bluetoothConnect.value)
				uni.hideLoading()
				ladarInterval(option)
				savePage()
			},
			fail(err) {
				cancleLadar()
				uni.showModal({
					title: '提示',
					content: '此功能需要打开蓝牙，请检查蓝牙和权限'
				})
			}
		})
	}

	const sureLead = () => {
		if (bluetoothConnect.value === false) {
			uni.showModal({
				title: '提示',
				content: '此功能需要连接蓝牙，请靠近设备，蓝牙会自动连接。'
			})
			// searchBluetoothLogo.value = true
			cancleLead(true)
		} else {
			storageLocateStatue(true)
			sureleading.value = true
			drawToast.value = false
			mapScale.value = 18
		}
	}

	const storageLocateStatue = (statue) => {
		const Index = getApp().globalData.locateIsRuningArray.findIndex(item => {
			return item.serial_code === loadobject.value.serialCode
		})
		if (Index !== -1) {
			getApp().globalData.locateIsRuningArray[Index].locateStatue = statue
			let savedata = JSON.stringify(getApp().globalData.locateIsRuningArray)
			uni.setStorage({
				key: 'locateIsRuning',
				data: savedata,
				success: function() {
					console.log('railOut数据缓存成功')
				}
			})
		}
	}

	const deleteRailPoint = () => {
		//多边形和marker的尾部去掉一个点
		if (polygonsPoints.value.length > 0) {
			var points = polygonsPoints.value.slice(0, polygonsPoints.value.length - 1)
			polygonsPoints.value = []
			polygonsPoints.value = points
			var polygon = [{
				points: points,
				strokeWidth: 2,
				strokeColor: '#FF0000',
				fillColor: 'rgba(255,0,0,0.2)',
				zIndex: 1,
			}]

			if (markers.value[markers.value.length - 1].id > 3) {
				var marker = markers.value.slice(0, markers.value.length - 1)
				markers.value = []
				markers.value = marker
			}
			// polygons.value = polygon
			// console.log('polygons.value', polygons.value)
		} else {
			uni.showToast({
				title: '没点可删了',
				icon: 'none'
			})

		}
		// if (homeWifi.value != null) {
		// 	if (markers.value.length > 3) {
		// 		var marker = markers.value.slice(0, markers.value.length - 1)
		// 		markers.value = []
		// 		markers.value = marker
		// 	}
		// } else {
		// 	if (markers.value.length > 2) {
		// 		var marker = markers.value.slice(0, markers.value.length - 1)
		// 		markers.value = []
		// 		markers.value = marker
		// 	}
		// }

	}

	const reDrawRail = () => {
		clearPolygonsPoints()
		// var marker = markers.value.slice(0, 2)

		markers.value.forEach(async (item) => {
			if (item.id > 3) {
				await uniRemoveMarker(item.id)
			}
		})

		let marker = markers.value.filter(item => item.id <= 3)
		markers.value = []
		markers.value = marker
		// localSavePolygons.value[clickPolygonIndex.value].points = []
	}

	const saveNewRail = () => {
		if (polygonsPoints.value.length > 2) {
			let polysort = sortByClockwiseOrder(polygonsPoints.value)
			localSavePolygons.value[clickPolygonIndex.value].points = polysort
			//如果围栏是打开的 切换显示运行的围栏
			if (localSavePolygons.value[actionPolygonIndex.value].switch) {
				clearPolygonsPoints()
				polygonsPoints.value = localSavePolygons.value[actionPolygonIndex.value].points
				sureRail(1)
			} else {
				uniRemovePolygon(showPolygonId.value.split("--")[0])
			}

			markers.value.forEach(async (item) => {
				if (item.id > 3) {
					await uniRemoveMarker(item.id)
				}
			})
			var marker = markers.value.filter(item => item.id <= 3)
			markers.value = []
			markers.value = marker

			showNewRail.value = false
			railToast.value = false
			setTimeout(() => {
				railToast.value = true
			}, 50)
		} else {
			uni.showToast({
				title: '至少要三个点哦',
				icon: 'none'
			})
		}
	}

	const sureRail = async (source) => {
		//是缓存还是按钮点击
		//把围栏点按照顺序排一遍
		let polysort = sortByClockwiseOrder(polygonsPoints.value)
		var polygon = [{
			points: polysort,
			strokeWidth: 2,
			strokeColor: '#FF0000',
			fillColor: 'rgba(255,0,0,0.2)',
			zIndex: 1,
		}]
		polygons.value = polygon
		if (showPolygonId.value && showPolygonId.value != "0") {
			uniRemovePolygon(showPolygonId.value.split("--")[0])
		}
		if (polygons.value[0].points && polygons.value[0].points.length > 0) {
			showPolygonId.value = await uniAddPolygon({
				id: 1,
				strokeColor: colorToHexNumber(polygons.value[0].strokeColor),
				fillColor: colorToHexNumber(polygons.value[0].fillColor),
				strokeWidth: polygons.value[0].strokeWidth,
				zIndex: polygons.value[0].zIndex,
				points: polygons.value[0].points
			})
		}

		let ployToService = new Array()
		//把点集合成一维数组发给服务器
		console.log('polysort', polysort)
		for (let i = 0; i < polysort.length; i++) {
			console.log('polysort[i]', polysort[i])
			ployToService.push(polysort[i].latitude)
			ployToService.push(polysort[i].longitude)
		}
		//判断多边形的点大于两个
		//然后开始循环十秒检测一次宠物位置
		//计算是否出圈
		console.log('polygons.value', polygons.value)
		if (polygons.value.length > 0) {
			if (polygons.value[0].points.length > 2) {
				//直接调用后端接口
				if (source === 1) {
					var deviceAccount = getApp().globalData.internet + getApp().globalData
						.electronicFence
					console.log('围栏url', deviceAccount)
					util.requestDataFrom(deviceAccount, {
						switch: 1,
						did: loadobject.value.did,
						serial_code: loadobject.value.serialCode,
						pid: loadobject.value.pid,
						pet_nickname: loadobject.value.pname,
						polygon: ployToService
					}).then((res) => {
						console.log('第一次给服务器发送开始围栏', res)
						if (res.data.code === 200) {
							railing.value = true
							// localSavePolygons.value[actionPolygonIndex.value].points = polygons.value[0].points
							localSavePolygons.value[actionPolygonIndex.value].switch = true
							// storageLocateStatue(true)
							for (let i = 0; i < localSavePolygons.value.length; i++) {
								if (localSavePolygons.value[i].switch === true && i != actionPolygonIndex
									.value)
									localSavePolygons.value[i].switch = false
							}
							if (!res.data.data.inside) {
								outinside.value = true
								getApp().globalData.railOut = true
							} else {
								outinside.value = false
								getApp().globalData.railOut = false
							}
							savePage()
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch((err) => {
						console.log('第一次给服务器发送开始围栏失败', err)
					})
				}
				// var point = {
				// 	longitude: markers.value[1].longitude,
				// 	latitude: markers.value[1].latitude
				// }
				// outinside.value = isPointInPolygon(point, polygons.value[0].points)
			} else {
				uni.showToast({
					title: '至少要三个点哦',
					icon: 'none'
				})
			}
		} else {
			uni.showToast({
				title: '至少要三个点哦',
				icon: 'none'
			})
		}
	}

	const getsliderRect = () => {
		// setTimeout(() => {
		// 	uni.createSelectorQuery()
		// 		.in(this)
		// 		.select('#slider')
		// 		.boundingClientRect((rect) => {
		// 			console.log('rect', rect)
		// 			sliderLeft.value = rect.left
		// 			sliderWidth.value = rect.width - 7
		// 		})
		// 		.exec()
		// }, 500)
	}

	const leadPet = async (opt) => {
		if (locationEnable.value == false || bluetoothEnable.value == false) {
			uni.showModal({
				title: "提示",
				content: "此功能需要开启定和蓝牙位开关，点击确定后将进行授权，打开开关后需要点击确定方能打开！",
				success(res) {
					if (res.confirm) {
						if (locationEnable.value == false) {
							$uni.requestGlobalSwitch(2)
						}

						if (bluetoothEnable.value == false) {
							$uni.enableBluetooth()
						}
					}
				}
			})
			return
		}
		uni.showLoading({
			title: 'loading'
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		uni.hideLoading()
		if (!drawToast.value && !railToast.value && !ladarToast.value && !stopLadarToast.value && !railing.value) {
			if (!leading.value) {
				drawToast.value = !drawToast.value
				// if (drawToast.value) { //获取一下滑动条位置，半径
				// 	drawRange.value = 30
				// 	getsliderRect()
				// }
			}
			petDistanceOver.value = false
			getApp().globalData.leadOut = false
			let savedata = JSON.stringify(getApp().globalData.leadOut)
			uni.setStorage({
				key: 'leadOut',
				data: savedata,
				success: function() {
					console.log('railOut数据缓存成功')
				}
			})
			leading.value = !leading.value
			if (leading.value === false) {
				drawToast.value = false
				circles.value = new Array()
				uniRemoveCircle(showCircles.value.split("--")[0])
				showCircles.value = '0'
				//关闭后台位置检测
				sureleading.value = false
			}
			console.log('leading.value', leading.value)
			if (leading.value) {
				// leadUrl.value = '../../static/xixin/clickLead.png'
				coverIcon(3)

			} else {
				// leadUrl.value = '../../static/xixin/Lead.png'
				coverIcon(0)
				// if (!ladaring.value && !railing.value) {
				// 	storageLocateStatue(false)
				// }
				//调用服务器的关闭lead接口
				//这里调用服务器打开牵引的接口
				var deviceAccount = getApp().globalData.internet + getApp().globalData
					.electronicTraction
				util.requestDataFrom(deviceAccount, {
					switch: 0,
					did: loadobject.value.did,
					serial_code: loadobject.value.serialCode,
				}).then((res) => {
					console.log('给服务器发送关闭牵引', res)
				}).catch((err) => {
					console.log('发送关闭牵引出错', err)
				})
			}
		} else {
			uni.showToast({
				icon: 'loading',
				title: '请先关掉其他功能'
			})
		}
	}

	const ladarPet = async () => {
		// console.log('railing.value', railing.value)
		// console.log('railToast.value', railToast.value)
		// console.log('drawToast.value', drawToast.value)
		// console.log('ladarToast.value', ladarToast.value)
		// console.log('stopLadarToast.value', stopLadarToast.value)
		// console.log('leading.value', leading.value)
		if (bluetoothEnable.value == false) {
			uni.showModal({
				title: "提示",
				content: "此功能需要开启蓝牙，点击确定开启蓝牙！",
				success(res) {
					if (res.confirm) {
						$uni.enableBluetooth()
					}
				}
			})
			return
		}
		uni.showLoading({
			title: 'loading'
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		uni.hideLoading()

		if (!railing.value && !railToast.value && !drawToast.value && !ladarToast.value && !leading.value) {
			//显示弹窗关闭弹窗
			if (!ladaring.value) {
				ladarToast.value = !ladarToast.value
			}
			ladaring.value = false
			console.log('ladaring.value', ladaring.value)
			if (ladaring.value) {
				// ladarUrl.value = '../../static/xixin/clickladar.png'
				coverIcon(1)
			} else {
				if (!leading.value && !railing.value) {
					storageLocateStatue(false)
				}
				stopLadar(true)
				coverIcon(0)
			}
			savePage()
		} else {
			uni.showToast({
				icon: 'loading',
				title: '请先关掉其他功能'
			})
		}
	}

	const railPet = async () => {
		// uni.showLoading({
		// 	title: 'loading'
		// })
		// await new Promise((resolve) => setTimeout(resolve, 1000))
		// uni.hideLoading()
		if (!drawToast.value && !ladarToast.value && !stopLadarToast.value && !leading.value) {
			railToast.value = !railToast.value
			if (railToast.value) {
				coverIcon(2)
			} else {
				if (!railing.value) {
					clearPolygonsPoints()
					var marker = markers.value.filter(item => item.id <= 3)
					if (markers.value.length > 4) {
						for (let i = 4; i < marks.value.length - 1; i++) {
							uniRemoveMarker(markers.value[i].id)
						}
					}
					markers.value = []
					markers.value = marker
				}

				coverIcon(0)
			}
		} else {
			uni.showToast({
				icon: 'loading',
				title: '请先关掉其他功能'
			})
		}
	}

	const clearPolygonsPoints = () => {
		// var points = polygonsPoints.value.slice(0, 0)
		// polygonsPoints.value = []
		try {
			polygonsPoints.value = []
			polygons.value = [{
				points: [],
				strokeWidth: 2,
				strokeColor: '#FF0000',
				fillColor: 'rgba(255,0,0,0.2)',
				zIndex: 1,
			}]
			console.log("showPolygonId.value", showPolygonId.value)
			if (showPolygonId.value && showPolygonId.value != 0) {
				uniRemovePolygon(showPolygonId.value.split("--")[0])
			}
			showPolygonId.value = "0"
			// polygons.value = polygon
		} catch (err) {
			console.log("clearPolygonsPoints", err)
		}
	}

	const cancleLadar = () => {
		ladarToast.value = false
		ladaring.value = false
	}

	const cancleRail = () => {
		//关闭提示窗，清除多边形
		// clearPolygonsPoints()
		// var marker = markers.value.slice(0, 2)
		// markers.value = []
		// markers.value = marker
		// railToast.value = false
		clearPolygonsPoints()
		markers.value.forEach(async (item) => {
			if (item.id > 3) {
				await uniRemoveMarker(item.id)
			}
		})
		var marker = markers.value.filter(item => item.id <= 3)
		markers.value = []
		markers.value = marker
		polygonsPoints.value = localSavePolygons.value[actionPolygonIndex.value].points
		polygons.value = [{
			points: polygonsPoints.value,
			strokeWidth: 2,
			strokeColor: '#FF0000',
			fillColor: 'rgba(255,0,0,0.2)',
			zIndex: 1,
		}]
		//没点保存应该复原本地原本存储的围栏

		showNewRail.value = false
		railToast.value = false
		setTimeout(() => {
			railToast.value = true
		}, 50)
	}

	const keepLeading = () => {
		leading.value = true
		sureleading.value = true
		drawToast.value = false
		console.log('keep lead petDistanceOver', petDistanceOver.value)
		coverIcon(3)
	}

	const keepLadar = () => {
		ladarToast.value = false
		stopLadarToast.value = true
		ladaring.value = true
		ladarToast.value = false
		storageLocateStatue(true)
		ladarInterval(true)
		// blinkInterval.value = setInterval(() => {
		// 	dotCount.value = (dotCount.value + 1) % 4 // 循环增加点的数量，最多到3个
		// 	dots.value = '...'.substring(0, dotCount.value) // 根据点的数量设置dots的值
		// }, 500)
	}

	const cancleLead = (opt) => {
		if (opt)
			drawToast.value = false
		leading.value = false
		sureleading.value = false
		petDistanceOver.value = false
		circles.value = new Array()
		try {
			uniRemoveCircle(showCircles.value.split("--")[0])
			showCircles.value = '0'
		} catch (err) {
			console.log("cancleLead", err)
		}
		// leadUrl.value = '../../static/xixin/Lead.png'
		coverIcon(0)
	}

	const returnParent = () => {
		if (sureleading.value) {
			uni.showModal({
				title: '电子牵引',
				content: '返回主页电子牵引将被关闭',
				success: function(res) {
					if (res.confirm) {
						getApp().backParents()
					} else if (res.cancel) {

					}
				}
			})
		} else {
			getApp().backParents()
		}
	}
	const dataRoute = () => {
		//需要设备的数据 去轨迹界面查看
		// unpdataUserPosition.value = false
		// uni.offCompassChange(initCompass)
		// if (!drawToast.value && !railToast.value && !ladarToast.value && !railing.value && !stopLadarToast.value && !
		// 	leading.value) {
		var obj = {
			did: loadobject.value.did,
			uid: loadobject.value.uid,
			pid: loadobject.value.pid,
			serialCode: loadobject.value.serialCode,
			dogulas_peuker_distance: dogulas_peuker_distance.value
			//serialCode: 'be1801044a16',
		}
		var data = JSON.stringify(obj)
		console.log('topath send serial=', data)
		uni.navigateTo({
			url: '/pages/dataPathNvue/dataPathNvueOH/dataPathNvueOH?data=' + data
		})
		// }
	}
	const getDistance = (lat1, lon1, lat2, lon2) => {
		const radLat1 = lat1 * Math.PI / 180.0
		const radLon1 = lon1 * Math.PI / 180.0
		const radLat2 = lat2 * Math.PI / 180.0
		const radLon2 = lon2 * Math.PI / 180.0

		const a = radLat1 - radLat2
		const b = radLon1 - radLon2

		const distance = 2 * Math.asin(Math.sqrt(
			Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) *
			Math.pow(Math.sin(b / 2), 2)
		))
		// 地球平均半径（单位：米）
		const earthRadius = 6371000

		// 计算距离（米）
		const resultDistance = distance * earthRadius
		var result = Math.trunc(resultDistance)
		return result
	}

	const getTextWidth = (str) => {
		const canvas = uni.createCanvasContext('measureCanvas')
		const text = str // 获取文本内容
		canvas.setFontSize(15) // 设置字体大小
		const metrics = canvas.measureText(text) // 测量文本宽度
		return metrics.width
	}

	const phonelocation = async (la, lo) => {

		console.log('at phone', sureleading.value)

		if (sureleading.value == true) {
			var cir = [{
				latitude: phoneMarker.value.latitude, // 圆心纬度
				longitude: phoneMarker.value.longitude, // 圆心经度
				color: "#FF0000", // 圆的颜色
				fillColor: "rgba(255,0,0,0.2)", // 圆的填充颜色
				radius: 30, // 半径，单位为米
			}]
			circles.value = cir
			// uniRemoveCircle(showCircles.value.split("--")[0])
			// showCircles.value = await uniAddCircle({
			// 	id: 1,
			// 	latitude: marker.latitude, // 圆心纬度
			// 	longitude: marker.longitude, // 圆心经度
			// 	color: colorToHexNumber(circles.value[0].color), // 圆的颜色
			// 	fillColor: colorToHexNumber(circles.value[0].fillColor), // 圆的填充颜色
			// 	radius: 30,
			// })
			if (showCircles.value != "0") {
				uniUpdateCirclePosition(showCircles.value.split("--")[0], la, lo)
			} else {
				showCircles.value = await uniAddCircle({
					id: 1,
					latitude: cir[0].latitude, // 圆心纬度
					longitude: cir[0].longitude, // 圆心经度
					color: colorToHexNumber(circles.value[0].color), // 圆的颜色
					fillColor: colorToHexNumber(circles.value[0].fillColor), // 圆的填充颜色
					radius: 30,
				})
			}
		}
	}

	const isValidPosition = (position) => {
		console.log('isValidPosition', position)
		return position != null && position.time != null && position.loc_type === 1 && position.latitude != null
	}

	const findeOrChangeById = async (item, markers) => {
		try {
			let found = false
			// console.log("item and markers",item,markers)
			for (let i = 0; i < markers.length; i++) {
				if (markers[i] != null && markers[i].id === item.id) {
					markers[i] = item // 找到了，赋值
					found = true
					// 只有当地图中确实存在该标记时，才更新地图标记
					if (uniHasMarker(item.id)) {
						try {
							uniUpdateMarkerPosition(item.id, item.latitude, item.longitude)
							uniUpdateMarkerIcon(item.id, item.iconPath, item.width, item.height)
						} catch (err) {
							console.log(err)
						}
					} else {
						// 如果地图中不存在，需要添加到地图
						try {
							console.log("地图中不存在，重新添加marker")
							await uniAddMarker({
								id: item.id,
								latitude: item.latitude,
								longitude: item.longitude,
								iconPath: item.iconPath,
								width: item.width,
								height: item.height,
								rotate: item.rotate
							})
						} catch (err) {
							console.log("uniAddMarker", err)
						}
					}
					break
				}
			}
			if (!found && item != null && item.hasOwnProperty('id')) {
				markers.push(item) // 没找到，添加到数组
				console.log("已添加marker到数组")
				// 只有当地图中不存在该标记时，才添加到地图
				if (!uniHasMarker(item.id)) {
					try {
						await uniAddMarker({
							id: item.id,
							latitude: item.latitude,
							longitude: item.longitude,
							iconPath: item.iconPath,
							width: item.width,
							height: item.height,
							rotate: item.rotate
						})
						console.log("已添加marker到地图")
					} catch (err) {
						console.log("uniAddMarker", err)
					}
				} else {
					console.log("地图已存在该marker，更新")
					try {
						for (let i = 0; i < markers.length; i++) {
							if (markers[i].id == item.id) {
								markers[i] = item
								uniUpdateMarkerPosition(item.id, item.latitude, item.longitude)
								uniUpdateMarkerIcon(item.id, item.iconPath, item.width, item.height)
								break
							}
						}
					} catch (err) {
						console.log("uniUpdateMarkerPosition,", err)
					}
				}
			}
		} catch (err) {
			console.log("findeOrChangeById", err)
		}
		// 排序
		// markers.sort((a, b) => a.id - b.id)
	}

	const showFlowDialog = () => {
		showFloor.value = !showFloor.value
	}

	const mergeToPhone = async (petMarker) => {
		if (phoneMarker.value) {
			const randomPoint = util.getRandomPointNearby(phoneMarker.value.latitude, phoneMarker.value
				.longitude, 5)
			// let markerToUpdate1 = markers.value.find(marker => marker.id === 2)
			if (petMarker) {
				petMarker.latitude = randomPoint.latitude // 修改找到的项的 la 值
				petMarker.longitude = randomPoint.longitude
			}
			// await saveMarkers()
			uni.setStorageSync(loadobject.value.serialCode + 'refreshTime', util
				.getCurrentTimeMilliseconds())
		}
	}
	const getPetPosition = async (object, upmap, ismanual, status) => {

		if (showHaveDevice.value)
			return
		var newMarker = new Array();
		getDeviceInfo(loadobject.value.serialCode).then(async (res) => {
			console.log("获取到新的宠物位置-------------", res)
			try{
				if(res.data.motionInfo.battery){
					loadobject.value.presentBattary=res.data.motionInfo.battery
				}
				
				if(res.data.deviceInfo.isCharing){
					isCharge.value=res.data.deviceInfo.isCharing
				}
				
				var item = res.data.locationInfo;
				
				const localTimeString = res.data.deviceInfo.latestCommunicationTime.replace(' ', 'T');
				const date = new Date(localTimeString);
				date.setMinutes(date.getMinutes() + 30);
				
				// 添加时区偏移
				const timezoneOffset = date.getTimezoneOffset() * 60000; // 转换为毫秒
				const localDate = new Date(date.getTime() - timezoneOffset);
				nextCommunicate.value = localDate.toISOString().slice(0, 19).replace('T', ' ');
				
				var X = getTextWidth(object.pname.toString());
				let labeltime = uni.getStorageSync(object.serialCode + 'refreshTime')
				
				const now = new Date();
				const target = new Date(item.atime);
				const diff = (now - target) / 1000 / 60;
				console.log('获取宠物位置', item, labeltime)
				deviceOffline.value = ""
				if (res.data.deviceInfo.onlineStatus != 2) {
					deviceOffline.value = "设备离线"
					locateInfoData.value = ''
					
				} else {
					deviceOffline.value = "设备在线"
					console.log("可能在", item)
					if ((item.floor && locType.value != 2 && item.floorStatus != 0) || (item.floor&&item.floor != 1 &&
							locType.value === 2 && item.floorStatus != 0)) {
						if (item.floor < -2)
							item.floor = -2
						if (item.floor < 0)
							locateInfoData.value = `可能在负${Math.abs(item.floor)}楼`
						else
							locateInfoData.value = `可能在${item.floor}楼`
					} else {
						locateInfoData.value = "设备在线"
					}
					
				}
				let petMarker = null
				locType.value = item.locType
				if (locType.value === 1) {
					positionSignal.value = "GPS信号弱"
				} else if (locType.value === 2) {
					positionSignal.value = "GPS信号强"
				} else if (locType.value === 4) {
					positionSignal.value = "家庭位置"
				}
				
				//如果高频模式定位时长超过10分钟
				if (diff > 10 && DeviceConnectModol.value === 1)
					positionSignal.value = "信号弱"
				petMarker = markers.value.find(item => item && item.hasOwnProperty('id') && item.id === 2);
				
				if (item.atime) {
					// console.log('into 2', item.location_time)
					labeltime = item.atime
					//这里是为了骗用户，显示的时候把时间设置为当前
					uni.setStorageSync(object.serialCode + 'refreshTime', labeltime)
					petMarker = {
						id: 2,
						latitude: item.latitude,
						longitude: item.longitude,
						locId: item.id,
						iconPath: loadobject.value.petIcon,
						width: 40,
						height: 46,
						time: item.locTime,
						loc_type: item.locType,
						anchor: {
							x: .5,
							y: 1
						},
					};
					if (status == 'normal') {
						petMarker.iconPath = loadobject.value.petIcon
						petMarker.width = 40
						petMarker.height = 46
					} else if (status == 'buzzer') {
						petMarker.iconPath = loadobject.value.petBellIcon
						petMarker.width = 40
						petMarker.height = 56
					} else if (status == 'light') {
						petMarker.iconPath = loadobject.value.petLightIcon
						petMarker.width = 40
						petMarker.height = 56
					} else if (status == 'bl') {
						petMarker.iconPath = loadobject.value.petBLIcon
						petMarker.width = 40
						petMarker.height = 56
					}
					if (bluetoothConnect.value && !stopLadarToast.value) {
						if (item.locType && item.locType === 4) {
							//如果位置是家庭wifi 但是时间超过10分钟，连上蓝牙后以手机位置为主
							if (diff > 5) {
								mergeToPhone(petMarker)
							}
						} else {
							mergeToPhone(petMarker);
						}
					}
					await findeOrChangeById(petMarker, markers.value)
					let newMarker = markers.value.slice(0)
					markers.value = new Array()
					markers.value = newMarker
					console.log("工作模式重置标点", markers.value)
					await saveMarkers()
					// getWorkMode(getApp().globalData.getWorkMode, para, petMarker)
					// }
				} else {
					labeltime = util.getCurrentTimeMilliseconds()
				}
				
				if (DeviceConnectModol.value === 1) {
					if (labeltime != '')
						locateTime.value = labeltime
				} else {
					if (labeltime != '')
						locateTime.value = labeltime.substring(5, 16)
				}
				lastLocateTime.value = labeltime.substring(5, 16)
				// if (bluetoothConnect.value && !stopLadarToast.value) {
				// 	if (item.locType && item.locType === 4) {
				// 		//如果位置是家庭wifi 但是时间超过10分钟，连上蓝牙后以手机位置为主
				// 		if (diff > 5) {
				// 			mergeToPhone()
				// 		}
				// 	} else {
				// 		mergeToPhone();
				// 	}
				// }
				savePage()
				//如果电子围栏是开启的话判断一下要不要显示出界
				if (railing.value) {
					let petPosition = markers.value.find(marker => marker.id === 2);
					if (petPosition) {
						let poly = localSavePolygons.value[actionPolygonIndex.value]
						if (poly) {
							outinside.value = !util.isPointInPolygon(petPosition, poly.points)
						}
					}
				}
				
				if (!upmap) {
					mapviz.value = true;
				}
			}catch(err){
				console.log("getPetPosition",err)
				uni.showModal({
					title:'提示',
					content:`${err},${JSON.stringify(err)}`
				})
			}

		})

		// let deviceAccount = getApp().globalData.internet_cyy + getApp().globalData.deviceGetInfo + object
		// 	.serialCode;
		// util.requestDataJsonGET(deviceAccount, {}).then((res) => {

		// })
	}

	const toMapAppOH = () => {
		try {
			var petMarker = markers.value.find(item => item.id === 2)
			$uni.isLocationEnabled({
				success: (res) => {
					locationEnable.value = res
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

						if (petMarker) {
							// "location": "120.02,30.2115",
							// "direction": "东北",
							// "name": "留漫巷",, 33.054195
							const la = 33.054195
							const lo = 117.37343733333333
							uni.showLoading({
								title: "加载中"
							})
							var latitude = petMarker.latitude
							var longitude = petMarker.longitude
							$uni.getLocation({
								type: "gcj02",
								success(res) {
									uni.hideLoading()
									$uni.startAbilityByNavigation({
										originName: "我的位置",
										originLatitude: res
											.latitude,
										originLongitude: res
											.longitude,
										destinationName: "宠物的位置",
										destinationLatitude: latitude,
										destinationLongitude: longitude,
										success(res) {
											console.log(
												"startAbilityByNavigation",
												res)
										},
										fail(err) {
											console.log(
												"startAbilityByNavigation",
												err)
										},
										complete(res) {
											console.log(
												"startAbilityByNavigation",
												res)
										}
									})
								},
								fail(err) {
									uni.hideLoading()
									uni.showModal({
										title: '错误',
										content: `获取位置失败：${err.errMsg}`,
										success(res) {

										}
									})
								}
							})
							// amapLocation(petMarker.longitude, petMarker.latitude).then((res) => {
							// 	console.log('res.data.', res)
							// 	if (res.status === '1') {
							// 		if (res.regeocode.pois.length > 0) {
							// 			// var name = res.data.regeocode.roads[0].name;
							// 			var pois = res.regeocode.pois;
							// 			let item = pois[0];
							// 			let maxdistance = 10000
							// 			console.log('name0', item)
							// 			for (var i = 0; i < pois.length; i++) {
							// 				// console.log('pois[i].distance',pois[i].distance)
							// 				if ((parseFloat(pois[i].distance) < parseFloat(
							// 						maxdistance)) &&
							// 					pois[i].address != "") {
							// 					item = pois[i];
							// 					maxdistance = pois[i].distance
							// 					console.log('min distance', pois[i]
							// 						.distance, pois[i].address)
							// 				}
							// 			}
							// 			let name = item.address;
							// 			console.log('name', item);
							// 			console.log('res.data.regeocode.roads[0]', res)


							// 			var latitude = petMarker.latitude
							// 			var longitude = petMarker.longitude

							// 		} else {
							// 			uni.showToast({
							// 				icon: 'none',
							// 				title: '未找到可导航地理位置，请自己手动导航'
							// 			})
							// 		}

							// 	}
							// }).catch((err) => {
							// 	uni.hideLoading()
							// 	console.log('获取标记位置失败', err);
							// 	uni.showToast({
							// 		icon: 'none',
							// 		title: '未找到可导航地理位置，可稍后重试，或自己手动导航'
							// 	})
							// })

						} else {
							uni.hideLoading()
							uni.showToast({
								title: '找不到宠物',
								icon: 'none'
							})
						}
					}
				},
				fail(err) {
					console.log("isLocationEnabled", err)
				}
			})

		} catch (err) {
			console.log("toMapApp", err)
		}
	}

	const toMapAPP = (opt) => {

		try {
			var petMarker = markers.value.find(item => item.id === 2)
			if (!phoneMarker.value) {
				uni.showToast({
					title: '获取位置出错了',
					icon: 'none'
				})
				return
			}
			if (petMarker) {
				// "location": "120.02,30.2115",
				// "direction": "东北",
				// "name": "留漫巷",, 33.054195
				const la = 33.054195
				const lo = 117.37343733333333
				let str =
					'https://restapi.amap.com/v3/geocode/regeo?key=9f8eb22902ff76102e32ba52c7dee1e6&radius=2000&extensions=all&batch=false&roadlevel=0&location=' +
					petMarker.longitude + ',' + petMarker.latitude
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: str,
					data: {},
					method: 'GET',
					success: res => {
						uni.hideLoading()
						console.log('res.data.', res)
						if (res.data.status === '1') {
							if (res.data.regeocode.pois.length > 0) {
								// var name = res.data.regeocode.roads[0].name;
								var pois = res.data.regeocode.pois;
								let item = pois[0];
								let maxdistance = 10000
								console.log('name0', item)
								for (var i = 0; i < pois.length; i++) {
									// console.log('pois[i].distance',pois[i].distance)
									if ((parseFloat(pois[i].distance) < parseFloat(maxdistance)) &&
										pois[i].address != "") {
										item = pois[i];
										maxdistance = pois[i].distance
										console.log('min distance', pois[i].distance, pois[i].address)
									}
								}
								let name = item.address;
								console.log('name', item);
								console.log('res.data.regeocode.roads[0]', res.data)


								var latitude = petMarker.latitude
								var longitude = petMarker.longitude
								switch (opt) {
									//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
									case 0:
										console.log('点击Petal Map')
										var url =
											`https://www.petalmaps.com/place/?z=16&marker=${latitude},${longitude}&utm_source=com.chongyueyue.client`
										uni.showModal({
											title: "提示",
											content: "点击确定跳转花瓣地图（地图App）,如果没有安装，请点击应用市场。",
											cancelText: "应用市场",
											success(res) {
												if (res.confirm) {
													$uni.openLink(url)
												} else if (res.cancel) {
													let hmmapAppGallery =
														"https://appgallery.huawei.com/app/detail?id=com.huawei.hmos.maps.app"
													$uni.openLink(hmmapAppGallery)
												}
											}
										})


										break
									case 1:
										console.log('点击高德地图');
										let canAmapLink = 'amapuri://com.amap.hmapp/open';
										var canAmapOpen = $uni.canOpenLink(canAmapLink);
										if (canAmapOpen) {
											let openAmapOpen =
												`amapuri://route/plan?dlat=${latitude}&dlon=${longitude}&dname=定位点&t=0`
											$uni.startAbility({
												url: openAmapOpen,
												success(res) {
													console.log("startAbility", res)
												},
												fail(err) {
													console.log("startAbility", err)
												}
											})
										} else {
											uni.showModal({
												title: "提示",
												content: "您没有安装高德地图，是否前往应用市场安装。",
												success(res) {
													if (res.confirm) {
														let amapAppGallary =
															"https://appgallery.huawei.com/app/detail?id=com.amap.hmapp"
														$uni.openLink(amapAppGallary)
													}
												}
											})
										}
										break;

									case 2:
										console.log('点击百度地图');
										let canBaiduLink = "baidumap://map/direction"
										var canBaiduOpen = $uni.canOpenLink(canBaiduLink)
										if (canBaiduOpen) {
											let location = gcj02tobd09(latitude, longitude)
											let openBaiduLink =
												`baidumap://map/direction?destination=latlng:${location.latitude},${location.longitude}|name:定位点`
											$uni.startAbility({
												url: openBaiduLink,
												success(res) {
													console.log("startAbility", res)
												},
												fail(err) {
													console.log("startAbility", err)
												}
											})
										} else {
											uni.showModal({
												title: "提示",
												content: "您没有安装百度地图，是否前往应用市场安装。",
												success(res) {
													if (res.confirm) {
														let baiduAppGallary =
															"https://appgallery.huawei.com/app/detail?id=com.baidu.hmmap"
														$uni.openLink(baiduAppGallary)
													}
												}
											})
										}
										break;
									default:
										break;
								}

							} else {
								uni.showToast({
									icon: 'none',
									title: '未找到可导航地理位置，请自己手动导航'
								})
							}

						}
					},
					fail: res => {
						uni.hideLoading()
						console.log('获取标记位置失败', res);
						uni.showToast({
							icon: 'none',
							title: '未找到可导航地理位置，可稍后重试，或自己手动导航'
						})
					},
				})
			} else {
				uni.hideLoading()
				uni.showToast({
					title: '找不到宠物',
					icon: 'none'
				})
			}
		} catch (err) {
			console.log("toMapApp", err)
		}
	}

	const setUpLoadListener = () => {
		try {
			console.log('即将触发ladarConnect')
			uni.$on('ladarConnect', function(res) {
				//注意ios断开一次这里会触发两次 connect也一样


				console.log('触发ladarConnect', res)
				if (res.connected) {
					console.log('蓝牙设备已连接');
					RSSIText.value = '信号值越大越近定位器'
					dotCount.value = 1;
					dots.value = '';
					bluetoothConnect.value = true
					getApp().globalData.blebluetoothConnect = true
					getApp().globalData.locateAndWifisetStatue = ''
					//https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/gatt-development-guide#%E5%AE%A2%E6%88%B7%E7%AB%AF
					//后续的读写特征值、读写描述符等操作都需要在服务发现操作完成后进行，否则会失败。
					//后续的读写等操作中指定的特征值或描述符必须包含在服务能力集合中，否则会失败。
					getBLEDeviceServices(res.deviceId).then((serviceList) => {
						console.log("getBLEDeviceServices 服务获取成功，写入功能开放！")
					})
				} else if (!res.connected) {
					console.log('蓝牙设备已断开')
					RSSIText.value = '蓝牙连接断开'
					RSSI.value = 0
					bluetoothConnect.value = false
					getApp().globalData.blebluetoothConnect = false
					// openLocate(blueToothDeviceId.value);
					console.log('pageStatues', pageStatues.value)
					if (pageStatues.value == 1) {
						restartBlueTooth()
					}
					// 处理断开连接逻辑
				}
			})
		} catch (err) {
			console.log('监听蓝牙事件出错', e)
		}

		$uni.onLocationChange((res) => {
			console.log('onLocationChange', res)
			phoneMarker.value = {
				latitude: res.latitude,
				longitude: res.longitude
			}
			if (widcnt.value > 30000)
				widcnt.value = 0;
			phonelocation(res.latitude, res.longitude);
			//为了不同时弹蓝牙提示窗和位置提示窗 位置获取成功，再打开蓝牙

			widcnt.value++;
		})
		darkMode.value = $uni.getOsTheme()
		uni.$on('darkMode', darkModeChange)
	}

	// 生命周期钩子 - onReady
	const onReady = () => {
		console.log("this is onReady")
		ready.value = true
		pageStatues.value = 1
		loadobject.value = getApp().globalData.lacatePageData || loadobject.value;
		console.log("onReady", loadobject.value)
		if (getApp().globalData.presentDevice === null) {
			initData()
			showHaveDevice.value = true
			return
		} else {
			loadPageData();
			showHaveDevice.value = false
		}
		if (loadobject.value.avatar.startsWith("static/"))
			loadobject.value.avatar = getApp().globalData.internet + '/' + loadobject.value.avatar
		console.log('loadobject', loadobject.value)
		unpdataUserPosition.value = false;
		myHardwareVersion.value = getApp().globalData.myHardwareVersion
		batteryMode.value = getApp().globalData.batteryShowMode;



		getApp().globalData.openLadarBluetooth = true;
		loacateMode.value = 1;
		// getDeviceConnectModol();
		// let requestStatueUrl = getApp().globalData.internet + getApp().globalData.checkConnectStatue;
		// let para = {
		// 	serial_code: loadobject.value.serialCode
		// }
		// util.requestDataJson(requestStatueUrl, para).then((rebackData2) => {
		// 	console.log('查询设备是否离线', rebackData2);
		// 	if (rebackData2.statusCode === 200) {
		// 		deviceOffline.value = ""
		// 		if (rebackData2.data.data.connect_state != 1) {
		// 			dataModal.value = '离线'
		// 			deviceOffline.value = "设备离线"
		// 		} else {
		// 			dataModal.value = '在线'
		// 		}
		// 	}
		// })
		startIntervalTasks(true)
		clearInterval(intervaldoBgTask.value);
		$uni.setKeepScreenOn({
			keepScreenOn: true
		});
		widcnt.value = -1
		try {

			$uni.startLocationUpdate({
				type: "gcj02",
				success(res) {
					console.log("startLocationUpdateSuccess", res)
				},
				fail(err) {
					console.log("startLocationUpdateErr", err)
				}
			})
		} catch (err) {
			console.log("startLocationUpdate", err)
		}
		let a = setTimeout(() => {
			uni.getStorage({
				key: "mapType",
				success: (res) => {
					console.log(res)
					uniSetMapType(res.data)
					clearTimeout(a)
				}
			})
		}, 2000)

		uni.getSystemInfo({
			success: (res) => {
				if (res.osTheme == 'dark') {
					uniSetDayNightMode(1)
				} else {
					uniSetDayNightMode(0)
				}
				uniSetDayNightMode(2)
			}
		})
	}



	// 生命周期钩子 - onShow
	onShow(() => {

		uni.$off('darkMode', darkModeChange)
		uni.$on('darkMode', darkModeChange)

		uni.getSystemInfo({
			success: (res) => {
				console.log('getThemeInfo', res.osTheme)
				darkMode.value = res.osTheme

				// if (ready.value == 'true') {
				// 	if (res.osTheme == 'dark') {
				// 		uniSetDayNightMode(1)
				// 	} else {
				// 		uniSetDayNightMode(0)
				// 	}
				// 	uniSetDayNightMode(2)
				// }
			}
		})
		if (ready.value) {
			uniMapShow()
		}
		pageStatues.value = 1
		loadobject.value = getApp().globalData.lacatePageData || loadobject.value;
		if (getApp().globalData.presentDevice === null) {
			initData()
			showHaveDevice.value = true
			return
		} else {
			if (ready.value == true)
				loadPageData();
			showHaveDevice.value = false
		}

		if (loadobject.value.avatar.startsWith("static/"))
			loadobject.value.avatar = getApp().globalData.internet + '/' + loadobject.value.avatar
		console.log('loadobject', loadobject.value)
		unpdataUserPosition.value = false;
		myHardwareVersion.value = getApp().globalData.myHardwareVersion
		batteryMode.value = getApp().globalData.batteryShowMode;
		firmwareVersion.value = getApp().globalData.myFirewareVersion
		getApp().globalData.openLadarBluetooth = true;
		loacateMode.value = 1;
		// getDeviceConnectModol();
		// let requestStatueUrl = getApp().globalData.internet + getApp().globalData
		// 	.checkConnectStatue;
		// let para = {
		// 	serial_code: loadobject.value.serialCode
		// }
		// util.requestDataJson(requestStatueUrl, para).then((rebackData2) => {
		// 	console.log('查询设备是否离线', rebackData2);
		// 	if (rebackData2.statusCode === 200) {
		// 		deviceOffline.value = ""
		// 		if (rebackData2.data.data.connect_state != 1)
		// 			deviceOffline.value = "设备离线"
		// 	}
		// })
		startIntervalTasks(false)
		if (ready.value == true) {
			$uni.startLocationUpdate({
				type: "gcj02",
				success(res) {
					console.log("startLocationUpdateSuccess", res)
				},
				fail(err) {
					console.log("startLocationUpdateErr", err)
				}
			})
		}
		clearInterval(intervaldoBgTask.value);
		// $uni.onCompassChange((res)=>{
		// 	initCompass(res)
		// });
		// $uni.startCompass()
		$uni.setKeepScreenOn({
			keepScreenOn: true
		});
		try {
			// uni.$on('update', function(data) {
			// 	console.log('收到通知消息', data);
			// 	if (data.title === '电子牵引' && leading.value) {
			// 		petDistanceOver.value = true;
			// 	}
			// 	if (data.title === '自动关闭电子牵引' && leading.value) {}
			// 	if (data.title === '电子围栏' && railing.value) {
			// 		outinside.value = true;
			// 	}
			// })

		} catch (e) {
			console.log('打开蓝牙find出错', e);
		}

		setupEventListeners()


		try {
			restartBlueTooth(true);
		} catch (err) {
			console.log("restartBlueTooth", err)
		}

		if (ready.value) {
			let a = setTimeout(() => {
				uni.getStorage({
					key: "mapType",
					success: (res) => {
						console.log(res)
						uniSetMapType(res.data)
						clearTimeout(a)
					}
				})
			}, 1000)
		}
	})

	const darkModeChange = (theme) => {
		console.log('onTheme', theme)
		darkMode.value = theme
	}

	const cleanupTimers = () => {
		clearInterval(countdownTimer.value);
		clearInterval(checkBluetoothAdapterIntervel.value);
		clearInterval(intervalId2.value);
		clearInterval(intervalLocate.value);
		clearInterval(heartTimer.value)
	}


	// 生命周期钩子 - onHide (第二个)
	onHide(() => {
		console.log("触发 locate onhide");
		pageStatues.value = 0
		cleanupTimers()

		uni.$off("ladarDevice");
		uni.$off("petIcon")
		uni.$off('petbellIcon')
		uni.$off("petlightIcon")
		uni.$off("petBLIcon")
		uni.$off("presentBattary")
		uni.$off("bluetoothState")
		uni.$off("locationEnabledState")
		// $uni.stopCompass()
		// $uni.offCompassChange(initCompass);
		savePage();
		stopBluetoothOperations()
		if (ready.value == true) {
			uniShowMyLocation(false)
			$uni.stopLocationUpdate({
				success(res) {
					console.log("stopLocationUpdate", res)
				},
				fail(err) {
					console.log("stopLocationUpdate", err)
				}
			})
			uniMapHide()
		}
	})

	// 生命周期钩子 - onLoad
	onLoad(async () => {
		// openPermission('ohos.permission.ACCESS_BLUETOOTH');
		// openPermission('ohos.permission.DISCOVER_BLUETOOTH')
		// openPermission('ohos.permission.APPROXIMATELY_LOCATION')
		// openPermission('ohos.permission.LOCATION')
		$uni.requestSystemPermission({
			permissions: ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION'],
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

		WindowInfo.value = uni.getWindowInfo()
		screenheight.value = WindowInfo.value.screenHeight
		screenwidth.value = WindowInfo.value.windowWidth;
		mapHeight.value = WindowInfo.value.windowHeight

		uni.getSystemInfo({
			success(res) {
				statusBarHeight.value = res.safeAreaInsets.top
			}
		})

		$uni.getBluetoothState({
			success(res) {
				if (res == BluetoothStateEnum.STATE_OFF) {
					bluetoothEnable.value = false
					uni.showModal({
						title: "提示",
						content: "蓝牙已关闭，响铃与灯光可能受影响，是否重新开启蓝牙？",
						success(res) {
							if (res.confirm) {
								$uni.enableBluetooth()
							}
							// 弹窗关闭后重置标志，允许下次弹窗
							setTimeout(() => {
								bluetoothOffModalShown.value = false
							}, 1000)
						}
					})
				} else if (res == BluetoothStateEnum.STATE_ON) {
					bluetoothEnable.value = true
				} else {
					bluetoothEnable.value = false
				}
			},
			fail(err) {
				console.log("getBluetoothState", err)
			}
		})
		$uni.isLocationEnabled({
			success(res) {
				locationEnable.value = res
				if (res == false) {
					uni.showModal({
						title: "提示",
						content: "位置服务已关闭，定位功能可能受影响，是否重新开启定位服务？",
						success(res) {
							if (res.confirm) {
								$uni.requestGlobalSwitch(2)
							}
						}
					})
				}

			},
			fail(err) {
				console.log("isLocationEnabled", err)
			}
		})


		getApp().globalData.blebluetoothConnect = false;
		let info = uni.getDeviceInfo()
		devicePlatform.value = info.platform
		platform.value = devicePlatform.value

		blinkInterval.value = setInterval(() => {
			dotCount.value = (dotCount.value + 1) % 4; // 循环增加点的数量，最多到3个
			dots.value = '...'.substring(0, dotCount.value); // 根据点的数量设置dots的值
		}, 500);

		var obj = getApp().globalData.lacatePageData;
		loadobject.value = obj || loadobject.value;
		console.log('loadobject.value', loadobject.value)
		if (loadobject.value.avatar.startsWith("static/")) {
			loadobject.value.avatar = `${getApp().globalData.internet}/${loadobject.value.avatar}`
		}
		if (loadobject.value != null && loadobject.value.data != null && loadobject.value != '') {
			let data = loadobject.value.data
			try {
				remind.value = data.remind
				latitude.value = data.latitude
				longitude.value = data.longitude
				outinside.value = data.outinside
				margintop.value = data.margintop
				drawRange.value = data.drawRange
				leadTime.value = data.leadTime
				signalStrength.value = data.signalStrength
				stopLadarToast.value = data.stopLadarToast
				ladarToast.value = data.ladarToast
				ladaring.value = data.ladaring
				drawToast.value = data.drawToast
				railToast.value = data.railToast
				railing.value = data.railing
				leading.value = data.leading
				mapScale.value = data.mapScale
				petDistanceOver.value = data.petDistanceOver
				petDistance.value = data.petDistance
				leadUrl.value = data.leadUrl
				railUrl.value = data.railUrl
				ladarUrl.value = data.ladarUrl

				leadUse.value = data.leadUse
				railUse.value = data.railUse
				ladarUse.value = data.ladarUse
				// categoryId.value = data.categoryId
				// if (markers.value.length > 0)
				// 	data.markers[0] = markers.value[0]
				markers.value = data.markers
				polygonsPoints.value = data.polygonsPoints
				localSavePolygons.value = data.localSavePolygons
				actionPolygonIndex.value = data.actionPolygonIndex
				polygons.value = data.polygons
				circles.value = data.circles
				blueToothDeviceId.value = data.blueToothDeviceId
			} catch (e) {
				console.log('获取页面缓存出错', e);
			}
		}
		setUpLoadListener()
		getApp().globalData.mapShowMode = uni.getStorageSync('mapShowMode');
		if (getApp().globalData.mapShowMode === '')
			getApp().globalData.mapShowMode = false;

	})


	// 生命周期钩子 - onUnload
	onUnload(() => {
		console.log('b的onunload')
		clearInterval(countdownTimer.value);
		clearInterval(checkBluetoothAdapterIntervel.value)
		clearInterval(heartTimer.value)
		getApp().globalData.openLadarBluetooth = false;
		getApp().globalData.blebluetoothConnect = false
		if (bluetoothConnect.value) {
			$uni.closeBLEConnection({
				deviceId: blueToothDeviceId.value,
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

		$uni.stopLocationUpdate()
		// $uni.offLocationChange()
		// 取消蓝牙状态变化监听
		uni.$off("bluetoothState")
		// 取消位置服务状态变化监听
		uni.$off("locationEnabledState")
		$uni.offLocationEnabledChange()
		unpdataUserPosition.value = false;
		clearInterval(blinkInterval.value);
		$uni.stopCompass()
		$uni.offCompassChange(initCompass);
		uni.$off('ladarConnect')
		uni.$off('ladarCharacter')
		uni.$off("update");
		uni.$off('closeLead')
		uni.$off('darkMode', darkModeChange)
	})
	onBeforeUnmount(() => {
		// $uni.offCompassChange(initCompass);
	})
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.native-map {
		width: 100vw;
		height: 100vh;
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
	}

	.top-button {
		width: 100rpx;
		position: absolute;
		right: 25rpx;
		top: 200rpx;
	}

	.help-wrapper {
		width: 100%;
		height: 120rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 12rpx;
		justify-content: center;
		align-items: center;
		pointer-events: auto;
	}

	.help-icon {
		width: 40rpx;
		height: 40rpx;
		padding: 4rpx;
	}

	.br-icon {
		width: 50rpx;
		height: 50rpx;
		padding: 5rpx;
	}

	.help-text {
		width: 50rpx;
		font-size: 25rpx;
		margin-top: 5rpx;
	}

	.control-text {
		width: 90rpx;
		font-size: 14rpx;
		margin-top: 5rpx;
		color: #FA5300;
		text-align: center;
	}

	.tool-icon {
		width: 65rpx;
		height: 65rpx;
	}

	.tool-text {
		width: 50rpx;
		font-size: 25rpx;
		margin-top: 5rpx;
		text-align: center;
	}

	.setting-correct {
		width: 100%;
		height: 240rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 12rpx;
		margin-top: 30rpx;
		pointer-events: auto;
		overflow: hidden;
	}

	.left-tools {
		width: 100rpx;
		height: 480rpx;
		position: absolute;
		bottom: 350rpx;
		left: 25rpx;
		background-color: white;
		box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 12rpx;
		overflow: hidden;
		align-items: center;
		pointer-events: auto;
	}

	.right-tools {
		width: 100rpx;
		height: 400rpx;
		position: absolute;
		bottom: 350rpx;
		right: 25rpx;
		pointer-events: auto;
	}

	.location-switch {
		flex: 1;
		background-color: #FFF;
		margin-top: 30rpx;
		border-radius: 50rpx;
		box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
		justify-content: center;
		align-items: center;
	}

	.sight-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.sc-area {
		flex: 1;
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.divider-sc {
		background-color: #EBEBEB;
		height: 1rpx;
		margin: 0 20rpx;
	}

	.divider-tools {
		background-color: #EBEBEB;
		height: 1rpx;
		margin: 0 20rpx;
		align-self: stretch;
	}

	.map-info {
		position: absolute;
		flex-direction: row;
		/* background-color: rgba(255, 255, 255, 0.9); */
		border-radius: 20rpx;
		padding: 8rpx 16rpx;
		/* box-shadow: 0rpx 4rpx 16rpx rgba(0, 0, 0, 0.1); */
		min-height: 48rpx;
		align-items: center;
		bottom: 270rpx;
		left: 20rpx;
	}

	.bottom-area {
		width: 100%;
		height: 270rpx;
		background-color: #FFFFFF;
		background-image: url('/static/new/bg-add2.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		border-radius: 40rpx 40rpx 0px 0px;
		position: absolute;
		bottom: 0;
		padding: 20rpx;
		pointer-events: auto;
	}

	.bottom-top {
		flex: 2;
		flex-direction: row;
	}

	.avater-area {
		width: 110rpx;
		height: 100%;
	}

	.data-button {
		flex: 1;
		margin-left: 24rpx;
		flex-direction: row;
	}

	.data-modal {
		flex: 2;
	}

	.info-modal {
		flex: 1;
	}

	.info-status {
		height: 100%;
		width: 240rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		padding: 0 15rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.info-text {
		font-size: 28rpx;
		height: 100%;
		align-content: center;
	}

	.info-left {
		width: 20rpx;
		height: 15rpx;
	}

	.device-serial {
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.serial-text {
		font-size: 28rpx;
		color: #555555;
	}

	.device-info {
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.battery-area {
		width: 60rpx;
		height: 26rpx;
		position: relative;
	}

	.battery-text {
		font-size: 18rpx;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		color: #000000;
	}
	.charge-icon{
		width: 10rpx;
		height: 23rpx;
		position: absolute;
		right: 5rpx;
		top: 1rpx;
		z-index: 3;
	}

	.battery-icon {
		width: 60rpx;
		height: 26rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.bluetooth-location {
		width: 134rpx;
		height: 36rpx;
		border-radius: 100rpx 40rpx 40rpx 100rpx;
		opacity: 0.8;
		margin-left: 20rpx;
		align-items: center;
		flex-direction: row;
	}

	.location-box {
		box-sizing: border-box;
		width: 30rpx;
		height: 30rpx;
		justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		margin-left: 3rpx;
	}

	.gps-icon {
		width: 18rpx;
		height: 18rpx;
	}

	.gps-text {
		flex: 1;
		font-size: 18rpx;
		margin-left: 5rpx;
		color: #000;
	}

	.location-navigation {
		flex: 0.8;
		flex-direction: row;
	}

	.ln-area {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
	}

	.ln-area-active {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
		background-color: rgba(250, 83, 0, 0.15);
	}

	.ln-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.ln-text {
		width: 60rpx;
		font-size: 28rpx;
		margin-top: 15rpx;
		text-align: center;
	}

	.pet-avater {
		width: 110rpx;
		height: 110rpx;
		border-radius: 100rpx;
	}

	.pet-name {
		flex: 1;
		width: 100%;
		height: 100%;
		text-align: center;
		max-lines: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.pet-switch {
		box-sizing: border-box;
		width: 40rpx;
		height: 40rpx;
		background-color: white;
		padding: 10rpx;
		border-radius: 20rpx;
		position: absolute;
		bottom: 0;
		right: 0;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
	}

	.bottom-status {
		flex: 1;
		flex-direction: row;
		gap: 30rpx;
		margin-top: 10rpx;
	}

	.time-area {
		flex: 2;
		background: rgba(250, 83, 0, 0.03);
		border: 1rpx solid rgba(250, 83, 0, 0.5);
		border-radius: 16rpx;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
		position: relative;
	}

	.time-text {
		font-size: 28rpx;
		position: absolute;
	}

	.time-right {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		right: 0;
		margin-right: 20rpx;
	}

	.locate-area {
		flex: 1;
		background: rgba(250, 83, 0, 0.03);
		border: 1rpx solid rgba(250, 83, 0, 0.5);
		border-radius: 16rpx;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
		position: relative;
	}

	.locate-box {
		position: absolute;
		height: 100%;
		flex-direction: row;
		align-items: center;
	}

	.locate-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.locate-text {
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	/* 弹窗遮罩层样式 */
	.container .mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
		z-index: 9999;
	}

	.container .distanceview {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		width: 250px;
		height: 80px;
		border-radius: 0.78125rem;
		justify-content: center;
	}

	.container .drawtoast {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 按钮容器样式 */
	.container .button-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 500rpx;
		padding: 6rpx 0 20rpx 0;
		gap: 20rpx;
	}

	/* 按钮样式 */
	.container .myButton {
		background-color: #007AFF;
		border-radius: 24rpx;
		padding: 8rpx 20rpx;
		min-width: 70rpx;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container .topBar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 0;
		background-color: #007AFF;
		border-radius: 40rpx 40rpx 0 0;
		width: 100%;
	}

	.container .title {
		font-size: 36rpx;
		font-weight: bold;
		color: white;
	}

	/* 电子围栏提醒弹窗样式 */
	.container .maplabel_rail {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
		z-index: 1000;
	}

	/* 雷达搜索界面样式 */
	.rssi-contant {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rotate-background {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rssi-flicker {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.blinking-text {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: blink 1s infinite;
	}

	@keyframes blink {

		0%,
		50% {
			opacity: 1;
		}

		51%,
		100% {
			opacity: 0.3;
		}
	}

	.rotate-bottom-text {
		position: absolute;
		bottom: -100rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 400rpx;
		min-height: 120rpx;
	}

	.leave {
		background-color: #FFFFFF;
		border-radius: 40rpx;
		padding: 0;
		width: 600rpx;
		min-height: 600rpx;
		max-width: 90%;
		max-height: 85%;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
	}

	@media (prefers-color-scheme: dark) {
		.help-wrapper {
			width: 100%;
			height: 120rpx;
			background-color: black;
			box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
			border-radius: 12rpx;
			justify-content: center;
			align-items: center;
			pointer-events: auto;
		}

		.bottom-area {
			width: 100%;
			height: 270rpx;
			background: none;
			background-color: #000000;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			border-radius: 40rpx 40rpx 0px 0px;
			position: absolute;
			bottom: 0;
			padding: 20rpx;
			pointer-events: auto;
		}

		.setting-correct {
			width: 100%;
			height: 240rpx;
			background-color: black;
			box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
			border-radius: 12rpx;
			margin-top: 30rpx;
			pointer-events: auto;
			overflow: hidden;
		}

		.info-status {
			height: 100%;
			width: 240rpx;
			background-color: #3d3d3d;
			border-radius: 10rpx;
			padding: 0 15rpx;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.serial-text {
			font-size: 28rpx;
			color: #FFFFFF;
		}

		.left-tools {
			width: 100rpx;
			height: 480rpx;
			position: absolute;
			bottom: 350rpx;
			left: 25rpx;
			background-color: black;
			box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
			border-radius: 12rpx;
			overflow: hidden;
			align-items: center;
			pointer-events: auto;
		}

		.location-switch {
			flex: 1;
			background-color: black;
			margin-top: 30rpx;
			border-radius: 50rpx;
			box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
			justify-content: center;
			align-items: center;
		}

		.control-text {
			width: 90rpx;
			font-size: 14rpx;
			margin-top: 5rpx;
			color: white;
			text-align: center;
		}

		.time-area {
			flex: 2;
			background: #3d3d3d;
			border: none;
			border-radius: 16rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;
			position: relative;
		}

		.locate-area {
			flex: 1;
			background: #3d3d3d;
			border: none;
			border-radius: 16rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;
			position: relative;
		}

		.container .distanceview {
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: #3d3d3d;
			width: 250px;
			height: 80px;
			border-radius: 0.78125rem;
			justify-content: center;
			box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
		}
	}
</style>
