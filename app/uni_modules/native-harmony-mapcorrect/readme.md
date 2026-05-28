# 鸿蒙原生花瓣地图

鸿蒙系统有很多原生组件，从 uni-app 4.62 版开始可以通过 uts 插件方式注册为 WebView 支持的原生组件，并且支持同层渲染。 本组件为 uniapp 在鸿蒙 Next 系统上使用同层渲染鸿蒙花瓣地图。

## 新增功能

本版本新增了以下地图操作功能：

- **动态添加/移除标记 (Marker)**：支持运行时动态添加和移除地图标记
- **动态添加/移除圆形 (Circle)**：支持运行时动态添加和移除圆形覆盖物
- **动态添加/移除折线 (Polyline)**：支持运行时动态添加和移除折线覆盖物
- **相机视角控制**：支持动态更新地图的相机位置和视角
- **获取相机位置**：支持获取当前地图的相机位置信息
- **清空地图**：支持一键清空地图上的所有覆盖物
- **设置地图类型**：支持通过接口动态设置地图类型（标准、卫星、地形等）
- **地图类型变化回调**：支持监听地图类型切换事件，获取变化前后的地图类型

这些功能参考了 `ft-harmony-amap` 模块的实现，提供了完整的地图动态操作能力。

## 快速使用

鸿蒙应用可免费使用鸿蒙系统提供的地图服务。开通方式如下：

- 登录 [AGC 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 选择开发与服务 - 选择应用 - 项目设置 - API 管理 - 开启地图服务
- 下载并导入 [鸿蒙花瓣地图插件](https://ext.dcloud.net.cn/plugin?id=23082)，参考文档完成接入。

也可阅读插件文档中提到的 [UTS 插件开放文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)、[uni-app 中嵌入鸿蒙原生组件](https://uniapp.dcloud.net.cn/tutorial/harmony/native-component.html)、[鸿蒙 MapComponent 组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-mapcomponent)，参考插件逻辑自行完成能力封装。

基本示例，使用下面代码

```html
<embed class="native-map" tag="map" :options='options' @markertap='onMarkerTap'></embed>
```

```js
import "@/uni_modules/native-map";
export default {
  data() {
    return {
      options: {
        latitude: 39.909,
        longitude: 116.39742,
        scale: 12,
        circles: [
          {
            latitude: 39.909,
            longitude: 116.39743,
            color: 0xffff0000,
            fillColor: 0xff00ffff,
            radius: 80,
            strokeWidth: 10,
          },
        ],
        markers: [
          {
            latitude: 39.909,
            longitude: 116.39742,
          },
          {
            latitude: 39.9,
            longitude: 116.39741,
            iconPath:
              "data:image/png;base64,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",
          },
        ],
      },
    };
  },
  methods: {
    onMarkerTap(e) {
      console.log("onMarkerTap", e);
      uni.showToast({
        title: "onMarkerTap",
      });
    },
  },
};
```

## 参数配置

在 WebView 中使用 embed 来渲染原生组件，在 Vue 文件中使用的 embed 组件是经过 uni-app 封装的，更便于使用，支持传递额外的属性和事件。

属性

| 属性名    | 类型   | 说明                   |
| --------- | ------ | ---------------------- |
| latitude  | number | 地图中心点纬度         |
| longitude | number | 地图中心点经度         |
| scale     | number | 地图缩放级别           |
| circles   | Array  | 地图上的圆形覆盖物数组 |
| markers   | Array  | 地图上的标记点数组     |

circles 数组中的对象属性：

| 属性名      | 类型   | 说明                             |
| ----------- | ------ | -------------------------------- |
| latitude    | number | 圆形覆盖物中心点纬度             |
| longitude   | number | 圆形覆盖物中心点经度             |
| color       | number | 圆形边框颜色，使用十六进制颜色值 |
| fillColor   | number | 圆形填充颜色，使用十六进制颜色值 |
| radius      | number | 圆形半径，单位：米               |
| strokeWidth | number | 圆形边框宽度，单位：像素         |

markers 数组中的对象属性：

| 属性名    | 类型   | 说明                                 |
| --------- | ------ | ------------------------------------ |
| latitude  | number | 标记点纬度                           |
| longitude | number | 标记点经度                           |
| iconPath  | string | 标记点图标路径，支持 base64 格式图片 |

## 动态地图操作 API

### 导入方法

```typescript
import { 
  uniAddMarker, 
  uniRemoveMarker, 
  uniUpdateMarkerPosition,
  uniRemoveMarkerByMapId,
  uniAddCircle, 
  uniRemoveCircle, 
  uniRemoveCircleByMapId,
  uniAddPolyline, 
  uniRemovePolyline, 
  uniRemovePolylineByMapId,
  uniRemovePolygonByMapId,
  uniUpdateCamera, 
  uniGetCameraPosition, 
  uniClearMap 
} from '@/uni_modules/native-harmony-map/utssdk/app-harmony/map.ets'
```

### API 方法说明

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
| uniAddMarker | IMarkerItem | number | 添加标记，返回标记ID |
| uniRemoveMarker | number | void | 移除指定ID的标记 |
| uniUpdateMarkerPosition | string, number, number | boolean | 根据ID更新标记位置，参数为(markerId, latitude, longitude) |
| uniRemoveMarkerByMapId | string | boolean | 根据地图对象ID删除标记，参数为mapId（键名'--'后面的部分） |
| uniAddCircle | ICircleItem | number | 添加圆形，返回圆形ID |
| uniRemoveCircle | number | void | 移除指定ID的圆形 |
| uniRemoveCircleByMapId | string | boolean | 根据地图对象ID删除圆形，参数为mapId（键名'--'后面的部分） |
| uniAddPolyline | IPolylineItem | number | 添加折线，返回折线ID |
| uniRemovePolyline | number | void | 移除指定ID的折线 |
| uniRemovePolylineByMapId | string | boolean | 根据地图对象ID删除折线，参数为mapId（键名'--'后面的部分） |
| uniRemovePolygonByMapId | string | boolean | 根据地图对象ID删除多边形，参数为mapId（键名'--'后面的部分） |
| uniUpdateCamera | ICameraPosition | void | 更新相机视角 |
| uniGetCameraPosition | void | ICameraPosition | 获取当前相机位置 |
| uniClearMap | void | void | 清空地图所有覆盖物 |

### 数据类型定义

```typescript
interface IMarkerItem {
  id: number
  latitude: number
  longitude: number
  iconPath?: string
  rotate?: number
  zIndex?: number
  visible?: boolean
  alpha?: number
}

interface ICircleItem {
  id: number
  latitude: number
  longitude: number
  color?: number
  fillColor?: number
  radius: number
  strokeWidth?: number
  visible?: boolean
  zIndex?: number
}

interface IPolylineItem {
  id: number
  color?: number
  width?: number
  visible?: boolean
  zIndex?: number
  points: ILatLng[]
}

interface ICameraPosition {
  latitude: number
  longitude: number
  zoom: number
  tilt?: number
  bearing?: number
}
```

### 使用示例

详细的使用示例请参考 [example.md](./example.md) 文件。

## 回调方法

| 属性名     | 说明            |
| ---------- | --------------- |
| @markertap | Marker 点击事件 |

### 开发文档

- [UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
- [UTS API 插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
- [UTS uni-app 兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
- [UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
- [Hello UTS](https://gitcode.net/dcloud/hello-uts)
- [uniapp 嵌入鸿蒙原生组件](https://uniapp.dcloud.net.cn/tutorial/harmony/native-component.html)

关联关键词：华为地图、鸿蒙地图、花瓣地图。
