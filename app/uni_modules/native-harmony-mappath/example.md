# Native Harmony Map 使用示例

本文档展示了如何使用 native-harmony-map 模块的新增功能，包括添加标记、折线、圆形、更新相机视角和清空地图等操作。

## 导入模块

```typescript
import { 
  uniAddMarker, 
  uniRemoveMarker, 
  uniAddCircle, 
  uniRemoveCircle, 
  uniAddPolyline, 
  uniRemovePolyline, 
  uniUpdateCamera, 
  uniGetCameraPosition, 
  uniClearMap 
} from '@/uni_modules/native-harmony-map/utssdk/app-harmony/map.ets'
```

## 添加标记 (Marker)

```typescript
// 添加一个标记
const markerId = uniAddMarker?.({
  id: 1,
  latitude: 39.9042,
  longitude: 116.4074,
  iconPath: '/static/marker.png', // 可选，自定义图标
  rotate: 0, // 可选，旋转角度
  zIndex: 10, // 可选，层级
  visible: true, // 可选，是否可见
  alpha: 1.0 // 可选，透明度
});

// 移除标记
uniRemoveMarker?.(1);
```

## 添加圆形 (Circle)

```typescript
// 添加一个圆形
const circleId = uniAddCircle?.({
  id: 1,
  latitude: 39.9042,
  longitude: 116.4074,
  radius: 1000, // 半径，单位：米
  color: 0xFF0000FF, // 边框颜色
  fillColor: 0x330000FF, // 填充颜色
  strokeWidth: 2, // 边框宽度
  visible: true, // 是否可见
  zIndex: 5 // 层级
});

// 移除圆形
uniRemoveCircle?.(1);
```

## 添加折线 (Polyline)

```typescript
// 添加一条折线
const polylineId = uniAddPolyline?.({
  id: 1,
  color: 0xFF0000FF, // 线条颜色
  width: 5, // 线条宽度
  visible: true, // 是否可见
  zIndex: 8, // 层级
  points: [ // 折线的点集合
    { latitude: 39.9042, longitude: 116.4074 },
    { latitude: 39.9142, longitude: 116.4174 },
    { latitude: 39.9242, longitude: 116.4274 }
  ]
});

// 移除折线
uniRemovePolyline?.(1);
```

## 更新相机视角

```typescript
// 更新相机位置和视角
uniUpdateCamera?.({
  latitude: 39.9042,
  longitude: 116.4074,
  zoom: 15, // 缩放级别
  tilt: 30, // 可选，倾斜角度
  bearing: 45 // 可选，方位角
});
```

## 设置地图类型

```typescript
// 设置地图类型
const success = uniSetMapType?.('SATELLITE'); // 切换到卫星地图
if (success) {
  console.log('地图类型设置成功');
} else {
  console.log('地图类型设置失败');
}

// 支持的地图类型：
// 'STANDARD' - 标准地图（默认）
// 'SATELLITE' - 卫星地图
// 'TERRAIN' - 地形图
// 'NONE' - 无底图
```

## 获取当前相机位置

```typescript
// 获取当前相机位置信息
const cameraPosition = uniGetCameraPosition?.();
console.log('当前位置:', cameraPosition);
// 返回格式：
// {
//   latitude: number,
//   longitude: number,
//   zoom: number,
//   tilt: number,
//   bearing: number
// }
```

## 清空地图

```typescript
// 清空地图上的所有标记、圆形和折线
uniClearMap?.();
```

## 完整使用示例

```typescript
export default {
  data() {
    return {
      mapOptions: {
        latitude: 39.9042,
        longitude: 116.4074,
        scale: 16
      }
    }
  },
  
  onLoad() {
    // 等待地图加载完成后添加元素
    setTimeout(() => {
      this.addMapElements();
    }, 1000);
  },
  
  methods: {
    addMapElements() {
      // 添加标记
      uniAddMarker?.({
        id: 1,
        latitude: 39.9042,
        longitude: 116.4074,
        iconPath: '/static/marker.png'
      });
      
      // 添加圆形
      uniAddCircle?.({
        id: 1,
        latitude: 39.9042,
        longitude: 116.4074,
        radius: 500,
        color: 0xFF0000FF,
        fillColor: 0x330000FF
      });
      
      // 添加折线
      uniAddPolyline?.({
        id: 1,
        color: 0xFF0000FF,
        width: 3,
        points: [
          { latitude: 39.9042, longitude: 116.4074 },
          { latitude: 39.9142, longitude: 116.4174 }
        ]
      });
    },
    
    clearAllElements() {
      // 清空所有地图元素
      uniClearMap?.();
    },
    
    moveToLocation(lat: number, lng: number) {
      // 移动到指定位置
      uniUpdateCamera?.({
        latitude: lat,
        longitude: lng,
        zoom: 16
      });
    }
  }
}
```

## 监听地图类型变化

```html
<embed class="native-map" tag="map" :options='options' @maptypechange='onMapTypeChange'></embed>
```

```typescript
export default {
  data() {
    return {
      options: {
        latitude: 39.909,
        longitude: 116.39742,
        scale: 12,
        mapType: 'STANDARD', // 初始地图类型
        showMapTypeButton: true // 显示地图类型切换按钮
      }
    }
  },
  methods: {
    // 地图类型变化回调
    onMapTypeChange(event) {
      console.log('地图类型变化:', event);
      // event 包含以下信息：
      // {
      //   type: 'maptypechange',
      //   detail: {
      //     oldType: 'STANDARD',  // 之前的地图类型
      //     newType: 'SATELLITE', // 新的地图类型
      //     timestamp: 1234567890 // 变化时间戳
      //   }
      // }
      
      // 可以在这里处理地图类型变化的逻辑
      if (event.detail.newType === 'SATELLITE') {
        console.log('切换到卫星地图');
      } else if (event.detail.newType === 'STANDARD') {
        console.log('切换到标准地图');
      }
    }
  }
}
```

## 注意事项

1. 所有的 ID 必须是唯一的，重复的 ID 会导致添加失败
2. 在调用这些方法之前，请确保地图已经初始化完成
3. 颜色值使用 ARGB 格式，例如：0xFF0000FF 表示红色
4. 所有的异步操作都有错误处理，失败时会在控制台输出错误信息
5. 建议在地图加载完成后再调用这些方法，可以通过延时或监听地图加载事件来实现
6. `onMapTypeChange` 回调只有在地图类型真正发生变化时才会触发