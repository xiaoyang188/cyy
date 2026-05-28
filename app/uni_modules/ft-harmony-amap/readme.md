### 项目初衷：uniapp vue3 鸿蒙应用目前不支持高德地图，该组件就是这样来的，提供各个开发者免费使用，开源。

### 怎么配置uniapp运行鸿蒙的证书
```
uni 官方文档：
https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html#signature
```
### 怎么申请高德地图鸿蒙的appkey
```
高德 官方文档：
https://lbs.amap.com/api/harmonyosnext-map3d-sdk/guide/get-key
```

### 使用简单：vue页面直接使用

鸿蒙系统有很多原生组件，从 HBuilderX 4.62 版开始 uni-app 可以通过 uts 插件方式注册为 WebView 支持的原生组件，并且支持同层渲染。
```
<embed class="native-map" ref="amap" tag="amap" :options="options"></embed>
```

### 如果要在地图组件中使用定位功能导入定位SDK，如果不需要请不要导入，地图可以单独使用。

```
[鸿蒙高德定位-uniapp-uniappx](https://ext.dcloud.net.cn/plugin?id=24515)
请导入 https://ext.dcloud.net.cn/plugin?id=24515插件。见demo中harmony-amap-user.vue页面定位蓝点的使用
```

### 地图引入
```
同层渲染的map，地图上面可以随便加组件覆盖

<embed class="native-map" ref="amap" tag="amap" :options="options" @markertap="onMarkerTap"
	@initend="initMapEnd" @camerachange="onCameraChange"></embed>

非同层渲染的map，地图是最上层，可以解决地图缩放流畅度问题，目前官方反馈是鸿蒙支持问题。

<embed class="native-map" ref="ramap" tag="ramap" :options="options" @markertap="onMarkerTap"
	@initend="initMapEnd" @camerachange="onCameraChange"></embed>

```
### 添加线段
```javascript
addPolyline() {
	var id = uniAddPolyline({
		id: 3,
		latLngs: [{
				latitude: 39.919,
				longitude: 116.31743,
			},
			{
				latitude: 39.929,
				longitude: 116.32743,
			},
			{
				latitude: 39.939,
				longitude: 116.34743,
			},
			{
				latitude: 39.979,
				longitude: 116.38743,
			}
		],
		color: 0xffff0000,
		dottedLine: true,//设置是否画虚线，默认：false（画实线）画实线
		transparency: 0.5,//设置线段的透明度 0~1，默认：1（表示不透明）表示不透明
		visible: true,
		zIndex: 15,
		width:20,
		geodesic:false,//设置线段是否为大地曲线，默认：false（不画大地曲线）
		lineCapType:1,//线尾部形状 LineCapButt = 0 LineCapSquare = 1,LineCapArrow = 2,LineCapRound = 3
		lineJoinType:2,// LineJoinBevel = 0,LineJoinMiter = 1,LineJoinRound = 2
	})
	console.log("polyline id", id)
},
```
### 修改地图中心点

```javascript
changeCenter() {
	this.options = {
		latitude: 39.919,
		longitude: 116.38742,
		scale: 13,
	}
},
```


### 部分方法说明

| 方法 | 类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| :options |动态属性|{...,latitude,longitude,scale,zoomctrol}|动态属性，地图参数，中心点，层级设置，显示缩放 |
| uniMoveCenterCamera |Function  |无|回到地图中心点 |
| uniAddCircle |Function  |{}|添加圆形 |
| uniRemoveCircle |Function  |Number|移除圆形 |
| uniAddPolygon |Function  |{}|添加多边形 |
| uniRemovePolygon |Function  |Number|移除多边形 |
| uniAddPolyline |Function  |{}|添加线段 |
| uniRemovePolyline |Function  |Number|移除线段 |
| uniAddMarker |Function  |{}|添加点 |
| uniRemoveMarker |Function  |String|移除点 |
| uniClearMap |Function  |Boolean|清空地图 |
| uniDestroyMap |Function  |无|销毁地图，页面销毁的时候调用 |
| uniAddCustomMarker |Function  |{}|添加带Label的点 |
| uniRemovCustomMarker |Function  |String|移除带Label的点 |
| uniGetCameraPosition |Function  |String|获取地图相机返回中心点和层级 |
| @initend |EventHandle  |无|地图加载完成调用 |
| @camerachange |EventHandle  |{e.detail}|地图视图变化结束回调 |
| @markertap |EventHandle  |{e.detail}|地图点的点击回调 |
| uniShowUserLocation |Function  |Boolean|显示/隐藏 用户位置蓝点 |
| uniChangeLocationShowType |Function  |Number|用户蓝点和地图交互模式 |
| uniSetUserLocationListener |Function  |{}|设置定位蓝点的外部轨迹源 |
| :options.needUser |初始属性|{...,needUser}|是否需要初始化SDK中定位蓝点代码。不用不要设置|


更多使用见demo使用，目前属性字段对齐鸿蒙高德地图API，可以自行下载，修改，扩展，免费，开源。

如果有需求可以联系作者支撑更新


# ft-harmony-amap
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS uni-app兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)