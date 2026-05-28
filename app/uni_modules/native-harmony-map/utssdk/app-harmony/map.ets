import { MapComponent, mapCommon, map } from '@kit.MapKit';
import { AsyncCallback, deviceInfo } from '@kit.BasicServicesKit';
import { NativeEmbedBuilderOptions, defineNativeEmbed } from "@dcloudio/uni-app-runtime"
import { image } from '@kit.ImageKit';
import { fileIo } from '@kit.CoreFileKit';
import { geoLocationManager } from '@kit.LocationKit';
import { AppStorageV2 } from '@kit.ArkUI';
import mediaQuery from '@ohos.mediaquery'
import { common, ConfigurationConstant } from '@kit.AbilityKit';

interface AnchorOption {
  x: number
  y: number
}

interface IMarkerItem {
  id: number
  latitude: number
  longitude: number
  iconPath?: string
  rotate?: number
  zIndex?: number
  visible?: boolean
  alpha?: number
  clickable?: boolean
  width?: number
  height?: number
  anchor?: AnchorOption
  title?: string
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
  arrowIconPath?: string
  points: ILatLng[]
}

interface IPolygonItem {
  id: number
  strokeColor?: number
  fillColor?: number
  strokeWidth?: number
  visible?: boolean
  zIndex?: number
  points: ILatLng[]
}

interface ILatLng {
  latitude: number
  longitude: number
}

interface ICameraPosition {
  latitude: number
  longitude: number
  zoom: number
  tilt?: number
  bearing?: number
}

interface IMarkerArrayItem {
  id: number
}

// 导出的地图操作函数
export let uniAddMarker: Function | null = null

export let uniSetMarkerRotation: Function | null = null

export let uniAddCircle: Function | null = null

export let uniUpdateCirclePosition: Function | null = null

export let uniAddPolyline: Function | null = null

export let uniAddPolygon: Function | null = null

export let uniSetPolygonPoint: Function | null = null

export let uniRemoveMarker: Function | null = null

export let uniRemoveCircle: Function | null = null

export let uniRemovePolyline: Function | null = null

export let uniRemovePolygon: Function | null = null

export let uniUpdateCamera: Function | null = null

export let uniGetCameraPosition: Function | null = null

export let uniClearMap: Function | null = null

export let uniGetMarkerMap: Function | null = null

export let uniGetMarkerArray: Function | null = null

export let uniGetCircleMap: Function | null = null

export let uniGetPolylineMap: Function | null = null

export let uniGetPolygonMap: Function | null = null

export let uniFromScreenLocation: Function | null = null

export let uniUpdateMarkerPosition: Function | null = null

export let uniUpdateMarkerIcon: Function | null = null

export let uniRemoveMarkerByMapId: Function | null = null

export let uniRemoveCircleByMapId: Function | null = null

export let uniRemovePolylineByMapId: Function | null = null

export let uniRemovePolygonByMapId: Function | null = null

export let uniShowMyLocation: Function | null = null

export let uniClearAllMarkers: Function | null = null

export let uniClearAllPolylines: Function | null = null

export let uniHasMarker: Function | null = null

export let uniHasCircle: Function | null = null

export let uniHasPolyline: Function | null = null

export let uniHasPolygon: Function | null = null

export let uniHasElement: Function | null = null

export let uniGetElementType: Function | null = null

//不要过早使用
export let uniSetMapType: Function | null = null

export let uniInfoWindowEnable: Function | null = null

export let uniMapShow: Function | null = null

export let uniMapHide: Function | null = null

export let uniSetMyLocation: Function | null = null

export let uniUpdateCameraAnimate: Function | null = null

export let uniSetDayNightMode: Function | null = null

// docs https://uniapp.dcloud.net.cn/component/map.html
interface MapBuilderOptions extends NativeEmbedBuilderOptions {
  name: string,
  longitude: number
  latitude: number
  scale?: number
  rotate?: number
  skew?: number
  minScale?: number
  maxScale?: number
  markers?: IMarkerItem[]
  circles?: ICircleItem[]
  polylines?: IPolylineItem[]
  polygons?: IPolygonItem[]
  showCompass?: boolean
  enableZoom?: boolean
  mapType?: string
  showLocation?: boolean
  showMapTypeButton?: boolean
  onMapTap?: Function
  onMapTypeChange?: Function
}

interface IMarkerTapDetailEvent {
  markerId: string,
  latitude: number,
  longitude: number
}

interface IMarkerTapEvent {
  type: string;
  detail: IMarkerTapDetailEvent
}

interface IMapTapDetailEvent {
  latitude: number
  longitude: number
}

interface IMapTapEvent {
  type: string;
  detail: IMapTapDetailEvent
}

interface IMapTypeChangeDetailEvent {
  oldType: string
  newType: string
  timestamp: number
}

interface IMapTypeChangeEvent {
  type: string;
  detail: IMapTypeChangeDetailEvent
}

interface IMapCameraMoveStart {
  type: string,
  detail: IMapCameraMoveStartDetailEvent
}

interface IMapCameraMoveStartDetailEvent {
  reason: number
}

interface IMapCameraChange {
  type: string,
  detail: ILatLng
}

@Component
struct HuaweiMapComponent {
  @Prop name: string
  @Prop longitude: number
  @Prop latitude: number
  @Prop scaleVal: number
  @Prop skew: number
  @Prop rotateVal: number
  @Prop minScale: number
  @Prop maxScale: number
  @Prop showCompass: boolean = false
  @Prop enableZoom: boolean = true
  @Prop showMapTypeButton: boolean = true
  @Prop showLocation: boolean = true
  @Prop markers: IMarkerItem[] = []
  @Prop circles: ICircleItem[] = []
  @Prop polylines: IPolylineItem[] = []
  @Prop polygons: IPolygonItem[] = []
  @Prop mapType: string = 'STANDARD'
  @State currentMapType: string = 'STANDARD'
  @State showMapTypeSelector: boolean = false
  @State screenWidth: number = 0
  @State screenHeight: number = 0
  @State isLower: boolean = false
  @BuilderParam customInfoWindow: ($$: map.MarkerDelegate) => void = this.customInfoWindowBuilder;
  onMarkerTap?: Function
  onMapTap?: Function
  onReady?: Function
  onMapTypeChange?: Function
  cameraMoveStart?: Function
  cameraChange?: Function
  private TAG = "HuaweiMapDemo";
  private mapOptions?: mapCommon.MapOptions;
  private callback?: AsyncCallback<map.MapComponentController>;
  private mapController?: map.MapComponentController;
  private mapEventManager?: map.MapEventManager;
  // HashMap存储地图对象
  private markerMap: Map<string, map.Marker> = new Map();
  private circleMap: Map<string, map.MapCircle> = new Map();
  private polylineMap: Map<string, map.MapPolyline> = new Map();
  private polygonMap: Map<string, map.MapPolygon> = new Map();
  // 存储原始数据，用于移除后重新构建
  private originalMarkers: Map<string, IMarkerItem> = new Map();
  private originalCircles: Map<string, ICircleItem> = new Map();
  private originalPolylines: Map<string, IPolylineItem> = new Map();
  private originalPolygons: Map<string, IPolygonItem> = new Map();
  listener: mediaQuery.MediaQueryListener = this.getUIContext().getMediaQuery().matchMediaSync('(dark-mode: true)');
  @State isDark: boolean = false

  onDarkMode(mediaQueryResult: mediaQuery.MediaQueryResult) {
    if (mediaQueryResult.matches as boolean) { // /系统为深色模式时为true，否则为false。
      this.isDark = true
    } else {
      this.isDark = false
    }
  }

  // 动态计算比例尺位置
  private updateScalePosition(): void {
    if (this.mapController) {
      // 如果屏幕尺寸还未获取，使用默认值
      const widthVp = this.screenWidth > 0 ? this.screenWidth : 360;
      const heightVp = this.screenHeight > 0 ? this.screenHeight : 800;

      // 将vp转换为px
      const widthPx = this.getUIContext().vp2px(widthVp);
      const heightPx = this.getUIContext().vp2px(heightVp);

      // 计算比例尺位置：水平居中，距离底部100px
      const positionX = Math.floor(widthPx / 2 - this.getUIContext().vp2px(100));
      const positionY = Math.floor(heightPx - this.getUIContext().vp2px(30)); // 距离底部50vp

      console.log(`Setting scale position: widthVp=${widthVp}, heightVp=${heightVp}, widthPx=${widthPx}, heightPx=${heightPx}, positionX=${positionX}, positionY=${positionY}`);

      this.mapController.setScalePosition({
        positionX: positionX,
        positionY: positionY
      });
    }
  }

  private isVersionLower(current: string, target: string): boolean {
    const currentParts = current.split('.').map(Number);
    const targetParts = target.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, targetParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const targetPart = targetParts[i] || 0;

      if (currentPart < targetPart) {
        return true; // 当前版本低于目标版本
      } else if (currentPart > targetPart) {
        return false; // 当前版本高于目标版本
      }
    }
    return false; // 版本相同
  }

  // 地图类型转换方法
  private getMapType(typeString: string): mapCommon.MapType {
    switch (typeString) {
      case 'STANDARD':
        return mapCommon.MapType.STANDARD;
      case 'NONE':
        return mapCommon.MapType.NONE;
      case 'TERRAIN':
        return mapCommon.MapType.TERRAIN;
      // SATELLITE和HYBRID需要鸿蒙6.0 API20以上支持，暂时注释
      case 'SATELLITE':
        return mapCommon.MapType.SATELLITE;
      // case 'HYBRID':
      //   return mapCommon.MapType.HYBRID;
      default:
        return mapCommon.MapType.STANDARD;
    }
  }

  // 切换地图类型
  private changeMapType(newType: string): void {
    if (this.mapController) {
      const oldType = this.currentMapType;
      this.currentMapType = newType;
      this.mapController.setMapType(this.getMapType(newType));

      // 触发地图类型变化回调
      if (this.onMapTypeChange && oldType !== newType) {
        const res = {
          type: "maptypechange",
          detail: {
            oldType: oldType,
            newType: newType,
            timestamp: Date.now()
          }
        } as IMapTypeChangeEvent
        this.onMapTypeChange(res);
      }
    }
  }

  @Builder
  mapTypeSheetBuilder() {
    Column() {
      Column() {
        // 标准地图
        Row({ space: 15 }) {
          Image($r('app.media.map2'))
            .width(40)
            .height(40)
            .borderRadius(5)
          //.fillColor(this.currentMapType === 'STANDARD' ? Color.Blue : Color.Gray)

          Column({ space: 5 }) {
            Text('标准地图')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
            Text('显示道路、建筑物等基本信息')
              .fontSize(12)
              .fontColor(this.isDark ? 0xecf0f3 : Color.Gray)
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)

          if (this.currentMapType === 'STANDARD') {
            Text('✓')
              .fontSize(20)
              .fontColor(this.isDark ? Color.White : Color.Blue)
              .fontWeight(FontWeight.Bold)
          }
        }
        .width('100%')
        .padding({
          left: 20,
          right: 20,
          top: 10,
          bottom: 10
        })
        .backgroundColor(this.currentMapType === 'STANDARD' ? (this.isDark ? '#5e5e5e' : '#E3F2FD') :
          (this.isDark ? '#3d3d3d' : Color.White))
        .onClick(() => {
          this.changeMapType('STANDARD');
          this.showMapTypeSelector = false;
        })

        // SATELLITE和HYBRID需要鸿蒙6.0 API20以上支持，暂时注释
        // // 卫星地图
        if (this.isLower == false) {
          Row({ space: 15 }) {
            Image($r('app.media.map1'))
              .width(40)
              .height(40)
              .borderRadius(5)
            // .fillColor(this.currentMapType === 'SATELLITE' ? Color.Blue : Color.Gray)

            Column({ space: 5 }) {
              Text('卫星地图')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
              Text('显示卫星影像图片')
                .fontSize(12)
                .fontColor(Color.Gray)
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)

            if (this.currentMapType === 'SATELLITE') {
              Text('✓')
                .fontSize(20)
                .fontColor(this.isDark ? Color.White : Color.Blue)
                .fontWeight(FontWeight.Bold)
            }
          }
          .width('100%')
          .padding({
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
          })
          .backgroundColor(this.currentMapType === 'SATELLITE' ? (this.isDark ? '#5e5e5e' : '#E3F2FD') :
            (this.isDark ? '#3d3d3d' : Color.White))
          .onClick(() => {
            this.changeMapType('SATELLITE');
            this.showMapTypeSelector = false;
          })
        }
      }
      .width('90%')
      .borderRadius(15)
      .backgroundColor(this.isDark ? Color.Black : Color.White)
      .clip(true)
      .margin({ top: 10, bottom: 50 })
    }
    .width('100%')
  }

  async setMarker(): Promise<void> {
    this.markers.forEach(async (marker) => {
      try {
        let markerOptions: mapCommon.MarkerOptions = {
          position: {
            latitude: marker.latitude,
            longitude: marker.longitude
          },
          rotation: marker.rotate,
          alpha: marker.alpha ?? 1,
          clickable: true
        }

        // 如果有图标路径，尝试验证图片是否可以加载
        if (marker.iconPath) {
          try {
            // 如果是文件路径，尝试验证文件是否存在和可读
            if (typeof marker.iconPath === 'string' && marker.iconPath.startsWith('/data/storage/')) {
              const file = fileIo.openSync(marker.iconPath, fileIo.OpenMode.READ_ONLY);
              const imageSource = image.createImageSource(file.fd);

              // 尝试创建PixelMap来验证图片是否有效
              const decodingOptions: image.DecodingOptions = {
                desiredSize: {
                  width: 1, // 使用最小尺寸仅用于验证
                  height: 1
                }
              };

              await imageSource.createPixelMap(decodingOptions);
              fileIo.closeSync(file);

              // 如果验证成功，设置图标
              markerOptions.icon = marker.iconPath;
            } else {
              // 对于其他类型的图标路径（如base64），直接设置
              markerOptions.icon = marker.iconPath;
            }
          } catch (imageError) {
            console.error('图片加载失败，跳过添加标记:', imageError);
            // 图片加载失败，跳过这个标记
            return;
          }
        }

        let markerBoy = await this.mapController!.addMarker(markerOptions);
        console.log('标记添加成功');
      } catch (error) {
        console.error('添加标记失败:', error);
        // 添加标记失败，跳过这个标记
      }
    })
  }

  async setCircle(): Promise<void> {
    this.circles.forEach(async (circle) => {
      let mapCircleOptions: mapCommon.MapCircleOptions = {
        center: {
          latitude: circle.latitude,
          longitude: circle.longitude
        },
        radius: circle.radius,
        strokeColor: circle.color,
        fillColor: circle.fillColor,
        strokeWidth: circle.strokeWidth,
        visible: circle.visible ?? true,
        zIndex: circle.zIndex ?? 15
      }
      let mapCircle: map.MapCircle = await this.mapController!.addCircle(mapCircleOptions);
    })
  }

  async setPolyline(): Promise<void> {
    this.polylines.forEach(async (polyline) => {
      let points: mapCommon.LatLng[] = [];
      polyline.points.forEach((point) => {
        points.push({
          latitude: point.latitude,
          longitude: point.longitude
        });
      });

      let mapPolylineOptions: mapCommon.MapPolylineOptions = {
        points: points,
        color: polyline.color ?? 0xFF0000FF,
        width: polyline.width ?? 5,
        visible: polyline.visible ?? true,
        zIndex: polyline.zIndex ?? 10
      }
      let mapPolyline: map.MapPolyline = await this.mapController!.addPolyline(mapPolylineOptions);
    })
  }

  async setPolygon(): Promise<void> {
    this.polygons.forEach(async (polygon) => {
      let points: mapCommon.LatLng[] = [];
      polygon.points.forEach((point) => {
        points.push({
          latitude: point.latitude,
          longitude: point.longitude
        });
      });

      let mapPolygonOptions: mapCommon.MapPolygonOptions = {
        points: points,
        strokeColor: polygon.strokeColor ?? 0xFF0000FF,
        fillColor: polygon.fillColor ?? 0x330000FF,
        strokeWidth: polygon.strokeWidth ?? 1,
        visible: polygon.visible ?? true,
        zIndex: polygon.zIndex ?? 10
      }
      let mapPolygon: map.MapPolygon = await this.mapController!.addPolygon(mapPolygonOptions);
    })
  }

  aboutToAppear(): void {

    let currentVersion = deviceInfo.osFullName;
    let versionMatch = currentVersion.match(/(\d+\.\d+\.\d+)/);
    let currentVersionNumber = versionMatch ? versionMatch[1] : '0.0.0';
    this.isLower = this.isVersionLower(currentVersionNumber, '6.0.0')
    // 初始化当前地图类型
    this.currentMapType = this.mapType;

    // 初始化导出的地图操作函数
    uniAddMarker = (marker: IMarkerItem): Promise<string> => {
      console.log("addMarkerWithPixelMap", marker)
      return this.addMarker(marker);
    };

    uniSetMarkerRotation = (markerId: string, rotation: number): void => {
      return this.setMarkerRotation(markerId, rotation)
    }


    uniAddCircle = (circle: ICircleItem): Promise<string> => {
      return this.addCircle(circle);
    };

    uniUpdateCirclePosition = (circleId: number, latitude: number, longitude: number): void => {
      return this.updateCirclePosition(circleId, latitude, longitude)
    }

    uniAddPolyline = (polyline: IPolylineItem): Promise<string> => {
      return this.addPolyline(polyline);
    };

    uniAddPolygon = (polygon: IPolygonItem): Promise<string> => {
      return this.addPolygon(polygon);
    };

    uniSetPolygonPoint = (polygonId: number, points: ILatLng[]): void => {
      return this.setPolygonPoint(polygonId, points)
    }

    uniRemoveMarker = (markerId: string): boolean => {
      return this.removeMarker(markerId);
    };

    uniRemoveCircle = (circleId: string): boolean => {
      return this.removeCircle(circleId);
    };

    uniRemovePolyline = (polylineId: string): boolean => {
      return this.removePolyline(polylineId);
    };

    uniRemovePolygon = (polygonId: string): boolean => {
      return this.removePolygon(polygonId);
    };

    uniUpdateCamera = (position: ICameraPosition) => {
      this.updateCamera(position);
    };

    uniGetCameraPosition = (): ICameraPosition => {
      return this.getCameraPosition();
    };

    uniClearMap = () => {
      this.clearMap();
    };

    uniSetMapType = (mapType: string): boolean => {
      return this.setMapType(mapType);
    };

    uniUpdateMarkerPosition = (markerId: string, latitude: number, longitude: number): boolean => {
      return this.updateMarkerPosition(markerId, latitude, longitude);
    };

    uniUpdateMarkerIcon = (markerId: string, iconPath: string, width?: number, height?: number): boolean => {
      return this.updateMarkerIcon(markerId, iconPath, width, height);
    };

    uniRemoveMarkerByMapId = (mapId: string): boolean => {
      return this.removeMarkerByMapId(mapId);
    };

    uniRemoveCircleByMapId = (mapId: string): boolean => {
      return this.removeCircleByMapId(mapId);
    };

    uniRemovePolylineByMapId = (mapId: string): boolean => {
      return this.removePolylineByMapId(mapId);
    };

    uniRemovePolygonByMapId = (mapId: string): boolean => {
      return this.removePolygonByMapId(mapId);
    };

    uniGetMarkerMap = (): Map<string, map.Marker> => {
      return this.getMarkerMap();
    };

    uniGetMarkerArray = (): Array<IMarkerArrayItem> => {
      return this.getMarkerIdArray();
    };

    uniGetCircleMap = (): Map<string, map.MapCircle> => {
      return this.getCircleMap();
    };

    uniGetPolylineMap = (): Map<string, map.MapPolyline> => {
      return this.getPolylineMap();
    };

    uniGetPolygonMap = (): Map<string, map.MapPolygon> => {
      return this.getPolygonMap();
    };

    uniFromScreenLocation = (point: mapCommon.MapPoint): mapCommon.LatLng | null => {
      return this.fromScreenLocation(point);
    };

    uniShowMyLocation = (enable: boolean): void => {
      return this.showMyLocation(enable);
    }

    uniClearAllMarkers = (): void => {
      this.clearAllMarkers();
    };

    uniClearAllPolylines = (): void => {
      this.clearAllPolylines();
    };

    uniHasMarker = (markerId: string): boolean => {
      return this.hasMarker(markerId);
    };

    uniHasCircle = (circleId: string): boolean => {
      return this.hasCircle(circleId);
    };

    uniHasPolyline = (polylineId: string): boolean => {
      return this.hasPolyline(polylineId);
    };

    uniHasPolygon = (polygonId: string): boolean => {
      return this.hasPolygon(polygonId);
    };

    uniHasElement = (elementId: string): boolean => {
      return this.hasElement(elementId);
    };

    uniGetElementType = (elementId: string): string | null => {
      return this.getElementType(elementId);
    };
    uniInfoWindowEnable = (markerId: number, enable: boolean): void => {
      return this.InfoWindowEnable(markerId, enable)
    }
    uniMapShow = (): void => {
      return this.mapShow()
    }
    uniMapHide = (): void => {
      return this.mapHide()
    }
    uniUpdateCameraAnimate = (position: ICameraPosition, time: number): void => {
      return this.updateCameraAnimate(position, time)
    }
    uniSetDayNightMode = (mode: number): void => {
      return this.setDayNightMode(mode)
    }

    let context = this.getUIContext().getHostContext() as common.UIAbilityContext
    let config = context.config
    if (config.colorMode == ConfigurationConstant.ColorMode.COLOR_MODE_DARK) {
      this.isDark = true
    } else {
      this.isDark = false
    }
    this.listener.on('change', (mediaQueryResult: mediaQuery.MediaQueryResult) => {
      this.onDarkMode(mediaQueryResult)
    });

    // 地图初始化参数，设置地图中心点坐标及层级
    this.mapOptions = {
      mapType: this.getMapType(this.mapType),
      position: {
        target: {
          latitude: this.latitude,
          longitude: this.longitude,
        },
        zoom: this.scaleVal,
        tilt: this.skew,
        bearing: this.rotateVal
      },
      minZoom: this.minScale,
      maxZoom: this.maxScale,
      scaleControlsEnabled: true,
      alwaysShowScaleEnabled: true,
      myLocationControlsEnabled: false
    };

    // 地图初始化的回调
    this.callback = async (err, mapController) => {
      if (!err) {
        // 获取地图的控制器类，用来操作地图
        this.mapController = mapController;
        AppStorage.setOrCreate(this.name, this.mapController)
        this.mapEventManager = this.mapController.getEventManager();
        let callback = () => {
          console.info(this.TAG, `on-mapLoad name is`, this.name);
          if (this.onReady) {
            this.onReady()
          }
        }
        this.mapEventManager.on("mapLoad", callback);

        // 设置UI控制选项，禁用缩放控制按钮
        if (!this.enableZoom) {
          this.mapController.setZoomControlsEnabled(false);
        }

        // this.mapController.setMapType(mapCommon.MapType.SATELLITE)

        // 设置logo的内边距，增加底部边距使其向上移动
        //this.mapController.setLogoPadding({
        // left:40,
        //bottom:400
        //}); // 左、上、右、下边距（像素）
        this.mapController.setLogoAlignment(mapCommon.LogoAlignment.BOTTOM_END);
        // 使用动态计算的比例尺位置
        this.updateScalePosition();
        this.mapController.setMyLocationEnabled(this.showLocation)
        this.mapController.setMyLocationControlsEnabled(false)
        this.mapController.setBuildingEnabled(true)
        this.mapController.setSphereEnabled(true)
        this.mapController.setRotateGesturesEnabled(false)
        this.mapController.setDayNightMode(mapCommon.DayNightMode.AUTO);
        this.mapController.setMyLocationStyle({
          icon: $rawfile('owner.png'),
          radiusFillColor: 0x00FF6645,
          displayType: mapCommon.MyLocationDisplayType.TRACK_ROTATE
        })

        await this.setMarker()
        await this.setCircle()
        await this.setPolyline()
        await this.setPolygon()


        this.mapEventManager.on("markerClick", (marker: map.Marker) => {
          if (this.onMarkerTap) {
            // 查找包含当前mapMarker.getId的键名，提取原始id
            let originalId: string = marker.getId();
            for (const key of this.markerMap.keys()) {
              if (key.endsWith('--' + marker.getId())) {
                originalId = key.split('--')[0];
                break;
              }
            }
            let position = marker.getPosition()
            const res = {
              type: "markertap",
              detail: {
                markerId: originalId,
                latitude: position.latitude,
                longitude: position.longitude
              }
            } as IMarkerTapEvent
            this.onMarkerTap(res)
          }
        })

        // 添加地图点击事件监听
        this.mapEventManager.on("mapClick", (latLng: mapCommon.LatLng) => {
          if (this.onMapTap) {
            const res = {
              type: "maptap",
              detail: {
                latitude: latLng.latitude,
                longitude: latLng.longitude
              }
            } as IMapTapEvent
            this.onMapTap(res)
          }
        })
        //回调函数，返回number。
        //
        // number表示相机改变的原因：
        //
        // 1：地图上的用户手势
        // 2：用户交互产生的默认动画
        // 3：开发人员启动的动画
        this.mapEventManager.on('cameraMoveStart', (reason) => {
          if (this.cameraMoveStart) {
            const res = {
              type: "cameraMoveStart",
              detail: {
                reason: reason
              }
            } as IMapCameraMoveStart
            this.cameraMoveStart(res)
          }
        })

        this.mapEventManager.on('cameraChange', (data) => {
          if (this.cameraChange) {
            const res = {
              type: "cameraChange",
              detail: {
                latitude: data.latitude,
                longitude: data.longitude
              }
            } as IMapCameraChange
            this.cameraChange(res)
          }
        })
      }
    };
  }

  aboutToDisappear(): void {
    this.listener.off('change', (mediaQueryResult: mediaQuery.MediaQueryResult) => {
      console.log('media off listener')
    });
    this.mapEventManager?.off("mapLoad", () => {
      console.log("map unload")
    })
    this.mapEventManager?.off("markerClick", () => {
      console.log("map unload markerClick")
    })
    this.mapEventManager?.off("mapClick", () => {
      console.log("map unload mapClick")
    })
    this.mapEventManager?.off("cameraMoveStart", () => {
      console.log("map unload cameraMoveStart")
    })
    this.mapEventManager?.off("cameraChange", () => {
      console.log("map unload cameraChange")
    })
    try {
      geoLocationManager.off("locationChange")
    } catch (error) {
      // TODO: Implement error handling.
      console.log("LocationOff", error)
    }
  }

  @Builder
  customInfoWindowBuilder($$: map.MarkerDelegate) {
    if ($$.marker) {
      Column() {
        Text($$.marker.getTitle())
          .fontSize(10)
          .fontColor('#ff5500')
        Text($$.marker.getSnippet())
          .fontSize(10)
          .fontColor('#ff5500')
      }
      .backgroundColor($r('app.color.info_window'))
      .padding(5)
      .borderRadius(8)
      .borderWidth(1)
      .borderColor('#ff5500')
      .offset({
        y: -20
      })
    }
  }

  build() {
    Stack() {
      // 调用MapComponent组件初始化地图
      MapComponent({
        mapOptions: this.mapOptions,
        mapCallback: this.callback,
        customInfoWindow: this.customInfoWindow
      })
        .width('100%')
        .height('100%')
        .onAreaChange((oldValue: Area, newValue: Area) => {
          // 监听屏幕尺寸变化
          this.screenWidth = newValue.width as number;
          this.screenHeight = newValue.height as number;
          console.log(`Screen size changed: width=${this.screenWidth}, height=${this.screenHeight}`);
          // 动态更新比例尺位置
          this.updateScalePosition();
        });

      // 地图类型切换按钮
      if (this.showMapTypeButton) {
        Button() {
          Image($r('app.media.satellite_map'))
            .width(24)
            .height(24)
        }
        .width(45)
        .height(45)
        .margin({ top: 5 })
        .backgroundColor(this.isDark == true ? '#000000' : '#FFFFFF')
        .borderRadius(8)
        .position({ x: '90%', y: '5%' })
        .markAnchor({ x: '50%', y: 0 })
        .zIndex(1000)
        .shadow({
          radius: 12, // 模糊半径，对应12rpx
          color: '#26000000', // 颜色和透明度
          offsetX: 0, // 水平偏移
          offsetY: 4         // 垂直偏移，对应4rpx
        })
        .bindSheet($$this.showMapTypeSelector, this.mapTypeSheetBuilder(), {
          title: {
            title: "选择地图类型"
          },
          height: SheetSize.FIT_CONTENT,
          showClose: true,
          dragBar: true,
          onAppear: () => {
            console.log('Map type sheet appeared');
          },
          onDisappear: () => {
            console.log('Map type sheet disappeared');
          }
        })
        .onClick(() => {
          this.showMapTypeSelector = true;
        })
      }

      // 版权信息文本
      Text(this.currentMapType === 'SATELLITE' ? 'GS(2025)2036号' : 'GS(2024)1955号')
        .fontSize(6)
        .fontColor(Color.Gray)
        .position({ x: 10, y: '100%' })
        .markAnchor({ x: 0, y: '100%' })
        .translate({ x: 0, y: -10 })
        .zIndex(1000)
        .backgroundColor(Color.Transparent)
    }.height('100%')
  }

  showMyLocation(enable: boolean): void {
    if (this.mapController) {
      this.mapController.setMyLocationEnabled(enable)
      this.mapController.setMyLocationControlsEnabled(false)
    } else {
      console.log('更改我的位置图层显示失败：控制器未初始化');
    }
  }

  setDayNightMode(mode: number) {
    try{
      if (this.mapController) {
        this.mapController.setDayNightMode(mode);
      }
    }catch (err){
      console.log(err)
    }
  }

  // 添加标记
  addMarker(marker: IMarkerItem): Promise<string> {
    console.log("addMarker", this.name)
    // console.log("addMarkerWithPixelMap",marker.width,marker.height,marker.iconPath)
    return new Promise((resolve, reject) => {
      if (marker.id !== undefined && marker.id !== null && this.mapController) {
        // 检查是否已存在相同ID的标记，如果存在则先移除
        this.removeMarker(marker.id.toString());

        // 如果iconPath是字符串路径格式，先转换为PixelMap再添加标记
        if (marker.iconPath && typeof marker.iconPath === 'string' && marker.iconPath.startsWith('/data/storage/')) {
          this.addMarkerWithPixelMap(marker, resolve, reject);
        } else {
          this.addMarkerDirectly(marker, resolve, reject);
        }
      } else {
        console.log('添加标记失败: ID为空或地图控制器未初始化');
        reject('添加标记失败: ID为空或地图控制器未初始化');
      }
    });
  }

  // 直接添加标记（不需要转换PixelMap）
  private addMarkerDirectly(marker: IMarkerItem, resolve: (value: string) => void,
    reject: (reason?: string) => void): void {
    let markerOptions: mapCommon.MarkerOptions = {
      position: {
        latitude: marker.latitude,
        longitude: marker.longitude
      } as mapCommon.LatLng,
      visible: marker.visible ?? true,
      zIndex: marker.zIndex ?? 0,
      alpha: marker.alpha ?? 1.0,
      anchorU: marker.anchor?.x ?? 0.5,
      anchorV: marker.anchor?.y ?? 1.0,
      clickable: marker.clickable ?? true,
      title: marker.title?.split(" ")[0],
      snippet: marker.title?.split(" ")[1],
      infoWindowAnchorU: 0.5,
      infoWindowAnchorV: 1,
      rotation: marker.rotate ?? 0
    };

    if (marker.iconPath) {
      markerOptions.icon = marker.iconPath;
    }

    if (marker.rotate) {
      markerOptions.rotation = marker.rotate;
    }

    if (this.mapController) {
      this.mapController.addMarker(markerOptions).then((mapMarker: map.Marker) => {
        mapMarker.setInfoWindowVisible(true)
        console.log('添加标记成功', markerOptions);
        // 将marker保存到HashMap中，使用id和mapMarker.getId以--连接作为键名
        const key = marker.id.toString() + '--' + mapMarker.getId();
        this.markerMap.set(key, mapMarker);
        // 保存原始数据
        this.originalMarkers.set(key, marker);
        resolve(key);
      }).catch((error: Error) => {
        console.error('添加标记失败:', error.message);
        // 如果是图标相关的错误，说明图片加载失败，不添加标记
        if (error.message.includes('icon') || error.message.includes('图标') || error.message.includes('image')) {
          reject('图标加载失败，不添加标记: ' + error.message);
        } else {
          reject(error.message);
        }
      });
    } else {
      reject('地图控制器未初始化');
    }
  }

  // 添加标记（需要转换PixelMap）
  private addMarkerWithPixelMap(marker: IMarkerItem, resolve: (value: string) => void,
    reject: (reason?: string) => void): void {
    try {
      // 读取文件并转换为PixelMap
      const file = fileIo.openSync(marker.iconPath!, fileIo.OpenMode.READ_ONLY);
      const imageSource = image.createImageSource(file.fd);

      // 设置解码选项，使用传入的宽高参数，默认为60
      const markerWidth = marker.width ?? 60;
      const markerHeight = marker.height ?? 60;
      // console.log("addMarkerWithPixelMap",marker.width,marker.height,marker.iconPath)
      const decodingOptions: image.DecodingOptions = {
        desiredSize: {
          width: this.getUIContext().vp2px(markerWidth),
          height: this.getUIContext().vp2px(markerHeight)
        }
      };

      imageSource.createPixelMap(decodingOptions).then((pixelMap: image.PixelMap) => {
        fileIo.closeSync(file);

        let markerOptions: mapCommon.MarkerOptions = {
          position: {
            latitude: marker.latitude,
            longitude: marker.longitude
          } as mapCommon.LatLng,
          visible: marker.visible ?? true,
          zIndex: marker.zIndex ?? 0,
          alpha: marker.alpha ?? 1.0,
          anchorU: marker.anchor?.x ?? 0.5,
          anchorV: marker.anchor?.y ?? 1.0,
          clickable: marker.clickable ?? true,
          icon: pixelMap,
          title: marker.title?.split(" ")[0],
          snippet: marker.title?.split(" ")[1],
          infoWindowAnchorU: 0.5,
          infoWindowAnchorV: 1,
          rotation: marker.rotate ?? 0
        };

        if (marker.rotate) {
          markerOptions.rotation = marker.rotate;
        }

        if (this.mapController) {
          this.mapController.addMarker(markerOptions).then((mapMarker: map.Marker) => {

            console.log('添加标记成功（使用PixelMap）');
            // 将marker保存到HashMap中，使用id和mapMarker.getId()以--连接作为键名
            const key = marker.id.toString() + '--' + mapMarker.getId();
            this.markerMap.set(key, mapMarker);
            // 保存原始数据
            this.originalMarkers.set(key, marker);
            resolve(key);
          }).catch((error: Error) => {
            console.error('添加标记失败:', error.message);
            reject(error.message);
          });
        } else {
          reject('地图控制器未初始化');
        }

      }).catch((error: Error) => {
        console.error('转换PixelMap失败:', error.message);
        fileIo.closeSync(file);
        // 图片加载失败，不添加标记
        reject('图片加载失败，不添加标记: ' + error.message);
      });

    } catch (error) {
      console.error('读取图片文件失败:', error, marker.iconPath!);
      // 图片文件读取失败，不添加标记
      reject('图片文件读取失败，不添加标记: ' + error);
    }
  }

  private setMarkerRotation(markerId: string, rotation: number): void {
    try {
      let keyToSet: string | null = null;
      for (const key of this.markerMap.keys()) {
        if (key.startsWith(markerId + '--')) {
          keyToSet = key;
          break;
        }
      }

      if (keyToSet !== undefined && keyToSet !== null && this.markerMap.has(keyToSet)) {
        const marker = this.markerMap.get(keyToSet);
        if (marker) {
          marker.setRotation(rotation)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 添加圆形
  addCircle(circle: ICircleItem): Promise<string> {
    return new Promise((resolve, reject) => {
      if (circle.id !== undefined && circle.id !== null && this.mapController) {
        // 检查是否已存在相同ID的圆形，如果存在则先移除
        this.removeCircle(circle.id.toString());

        let circleOptions: mapCommon.MapCircleOptions = {
          center: {
            latitude: circle.latitude,
            longitude: circle.longitude
          } as mapCommon.LatLng,
          radius: circle.radius,
          strokeColor: circle.color ?? 0xFF0000FF,
          fillColor: circle.fillColor ?? 0x330000FF,
          strokeWidth: circle.strokeWidth ?? 1,
          visible: circle.visible ?? true,
          zIndex: circle.zIndex ?? 0
        };

        this.mapController.addCircle(circleOptions).then((mapCircle: map.MapCircle) => {
          console.log('添加圆形成功');
          // 将circle保存到HashMap中，使用id和mapCircle.getId()连接作为键名
          const key = circle.id.toString() + '--' + mapCircle.getId();
          this.circleMap.set(key, mapCircle);
          // 保存原始数据
          this.originalCircles.set(key, circle);
          resolve(key);
        }).catch((error: Error) => {
          console.error('添加圆形失败:', error.message);
          reject(error.message);
        });
      } else {
        console.log('添加圆形失败: ID为空或地图控制器未初始化');
        reject('添加圆形失败: ID为空或地图控制器未初始化');
      }
    });
  }

  updateCirclePosition(circleId: number, latitude: number, longitude: number) {
    try {
      let keyToSet: string | null = null;
      for (const key of this.circleMap.keys()) {
        if (key.startsWith(circleId + '--')) {
          keyToSet = key;
          break;
        }
      }

      if (keyToSet !== undefined && keyToSet !== null && this.circleMap.has(keyToSet)) {
        const circle = this.circleMap.get(keyToSet);
        if (circle) {
          circle.setCenter({
            latitude: latitude,
            longitude: longitude
          })
          console.log("更新圆形位置成功");
        }
      }
    } catch (err) {
      console.log("更新圆形中心点失败", err)
    }
  }

  // 添加折线
  addPolyline(polyline: IPolylineItem): Promise<string> {
    return new Promise((resolve, reject) => {
      if (polyline.id !== undefined && polyline.id !== null && this.mapController) {
        // 检查是否已存在相同ID的折线，如果存在则先移除
        this.removePolyline(polyline.id.toString());

        // 如果有箭头图标路径，需要转换为PixelMap
        if (polyline.arrowIconPath && typeof polyline.arrowIconPath === 'string') {
          this.addPolylineWithPixelMap(polyline, resolve, reject);
        } else {
          this.addPolylineDirectly(polyline, resolve, reject);
        }
      } else {
        console.log('添加折线失败: ID为空或地图控制器未初始化');
        reject('添加折线失败: ID为空或地图控制器未初始化');
      }
    });
  }

  // 直接添加折线（不需要转换PixelMap）
  private addPolylineDirectly(polyline: IPolylineItem, resolve: (value: string) => void,
    reject: (reason?: string) => void): void {
    let points: mapCommon.LatLng[] = [];
    polyline.points.forEach((point) => {
      points.push({
        latitude: point.latitude,
        longitude: point.longitude
      });
    });

    let polylineOptions: mapCommon.MapPolylineOptions = {
      points: points,
      color: polyline.color ?? 0xFF0000FF,
      width: polyline.width ?? 5,
      visible: polyline.visible ?? true,
      zIndex: polyline.zIndex ?? 0
    };

    if (this.mapController) {
      this.mapController.addPolyline(polylineOptions).then((mapPolyline: map.MapPolyline) => {
        console.log('添加折线成功');
        // 将polyline保存到HashMap中，使用id和mapPolyline.getId()连接作为键名
        const key = polyline.id.toString() + '--' + mapPolyline.getId();
        this.polylineMap.set(key, mapPolyline);
        // 保存原始数据
        this.originalPolylines.set(key, polyline);
        resolve(key);
      }).catch((error: Error) => {
        console.error('添加折线失败:', error.message);
        reject(error.message);
      });
    } else {
      reject('地图控制器未初始化');
    }
  }

  // 添加折线（需要转换PixelMap）
  private addPolylineWithPixelMap(polyline: IPolylineItem, resolve: (value: string) => void,
    reject: (reason?: string) => void): void {
    try {
      // 读取文件并转换为PixelMap
      const file = fileIo.openSync(polyline.arrowIconPath!, fileIo.OpenMode.READ_ONLY);
      const imageSource = image.createImageSource(file.fd);

      // 设置解码选项，使用默认尺寸
      const decodingOptions: image.DecodingOptions = {
        desiredSize: {
          width: this.getUIContext().vp2px(32),
          height: this.getUIContext().vp2px(32)
        }
      };

      imageSource.createPixelMap(decodingOptions).then((pixelMap: image.PixelMap) => {
        fileIo.closeSync(file);

        let points: mapCommon.LatLng[] = [];
        polyline.points.forEach((point) => {
          points.push({
            latitude: point.latitude,
            longitude: point.longitude
          });
        });

        let polylineOptions: mapCommon.MapPolylineOptions = {
          points: points,
          color: polyline.color ?? 0xFF0000FF,
          width: polyline.width ?? 5,
          visible: polyline.visible ?? true,
          zIndex: polyline.zIndex ?? 0,
          customTexture: pixelMap,
          isTextureMappingUsed: true
        };

        if (this.mapController) {
          this.mapController.addPolyline(polylineOptions).then((mapPolyline: map.MapPolyline) => {
            console.log('添加折线成功（使用PixelMap）');
            // 将polyline保存到HashMap中，使用id和mapPolyline.getId()连接作为键名
            const key = polyline.id.toString() + '--' + mapPolyline.getId();
            this.polylineMap.set(key, mapPolyline);
            // 保存原始数据
            this.originalPolylines.set(key, polyline);
            resolve(key);
          }).catch((error: Error) => {
            console.error('添加折线失败:', error.message);
            reject(error.message);
          });
        } else {
          reject('地图控制器未初始化');
        }

      }).catch((error: Error) => {
        console.error('转换PixelMap失败:', error.message);
        fileIo.closeSync(file);
        // 图片加载失败，使用不带图标的折线
        console.log('图片加载失败，添加不带箭头图标的折线');
        this.addPolylineDirectly(polyline, resolve, reject);
      });

    } catch (error) {
      console.error('读取图片文件失败:', error, polyline.arrowIconPath!);
      // 图片文件读取失败，使用不带图标的折线
      console.log('图片文件读取失败，添加不带箭头图标的折线');
      this.addPolylineDirectly(polyline, resolve, reject);
    }
  }

  // 添加多边形
  addPolygon(polygon: IPolygonItem): Promise<string> {
    return new Promise((resolve, reject) => {
      if (polygon.id !== undefined && polygon.id !== null && this.mapController) {
        // 检查是否已存在相同ID的多边形，如果存在则先移除
        this.removePolygon(polygon.id.toString());

        let points: mapCommon.LatLng[] = [];
        polygon.points.forEach((point) => {
          points.push({
            latitude: point.latitude,
            longitude: point.longitude
          });
        });

        let polygonOptions: mapCommon.MapPolygonOptions = {
          points: points,
          strokeColor: polygon.strokeColor ?? 0xFF0000FF,
          fillColor: polygon.fillColor ?? 0x330000FF,
          strokeWidth: polygon.strokeWidth ?? 1,
          visible: polygon.visible ?? true,
          zIndex: polygon.zIndex ?? 0
        };

        this.mapController.addPolygon(polygonOptions).then((mapPolygon: map.MapPolygon) => {
          console.log('添加多边形成功');
          // 将polygon保存到HashMap中，使用id和mapPolygon.getId()连接作为键名
          const key = polygon.id.toString() + '--' + mapPolygon.getId();
          this.polygonMap.set(key, mapPolygon);
          // 保存原始数据
          this.originalPolygons.set(key, polygon);
          resolve(key);
        }).catch((error: Error) => {
          console.error('添加多边形失败:', error.message);
          reject(error.message);
        });
      } else {
        console.log('添加多边形失败: ID为空或地图控制器未初始化');
        reject('添加多边形失败: ID为空或地图控制器未初始化');
      }
    });
  }

  setPolygonPoint(polygonId: number, point: ILatLng[]): void {
    try {
      let keyToSet: string | null = null;
      for (const key of this.polygonMap.keys()) {
        if (key.startsWith(polygonId + '--')) {
          keyToSet = key;
          break;
        }
      }

      if (keyToSet !== undefined && keyToSet !== null && this.polygonMap.has(keyToSet)) {
        const polygon = this.polygonMap.get(keyToSet);
        if (polygon) {
          let points: mapCommon.LatLng[] = [];
          point.forEach((item) => {
            points.push({
              latitude: item.latitude,
              longitude: item.longitude
            });
          });
          polygon.setPoints(points)
          console.log("设置多边形点位成功")
        }
      }
    } catch (err) {
      console.log("设置多边形点位失败", err)
    }
  }

  InfoWindowEnable(markerId: number, enable: boolean): void {
    try {
      let keys: string | null = null;
      for (const key of this.markerMap.keys()) {
        if (key.startsWith(markerId + '--')) {
          keys = key;
          break;
        }
      }
      if (keys !== undefined && keys !== null && this.markerMap.has(keys)) {
        const marker = this.markerMap.get(keys);
        marker?.setInfoWindowVisible(enable)
        console.log('更改信息窗可见性成功');
      } else {
        console.log('更改信息窗可见性失败，标记不存在');
      }
    } catch (err) {
      console.log('更改信息窗可见性失败', err);
    }
  }

  // 移除标记
  removeMarker(markerId: string): boolean {
    // 查找以markerId开头的键名
    let keyToRemove: string | null = null;
    for (const key of this.markerMap.keys()) {
      if (key.startsWith(markerId + '--')) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.markerMap.has(keyToRemove)) {
      const marker = this.markerMap.get(keyToRemove);
      if (marker) {
        // 直接调用marker的remove方法删除
        marker.remove();

        // 从HashMap和原始数据中移除
        this.markerMap.delete(keyToRemove);
        this.originalMarkers.delete(keyToRemove);

        console.log('移除标记成功:', markerId);
        return true;
      }
    }

    console.log('移除标记失败: 标记不存在');
    return false;
  }

  // 移除圆形
  removeCircle(circleId: string): boolean {
    // 查找以circleId开头的键名
    let keyToRemove: string | null = null;
    for (const key of this.circleMap.keys()) {
      if (key.startsWith(circleId + '--')) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.circleMap.has(keyToRemove)) {
      const circle = this.circleMap.get(keyToRemove);
      if (circle) {
        // 直接调用circle的remove方法删除
        circle.remove();

        // 从HashMap和原始数据中移除
        this.circleMap.delete(keyToRemove);
        this.originalCircles.delete(keyToRemove);

        console.log('移除圆形成功:', circleId);
        return true;
      }
    }

    console.log('移除圆形失败: 圆形不存在');
    return false;
  }

  // 移除折线
  removePolyline(polylineId: string): boolean {
    // 查找以polylineId开头的键名
    let keyToRemove: string | null = null;
    for (const key of this.polylineMap.keys()) {
      if (key.startsWith(polylineId + '--')) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.polylineMap.has(keyToRemove)) {
      const polyline = this.polylineMap.get(keyToRemove);
      if (polyline) {
        // 直接调用polyline的remove方法删除
        polyline.remove();

        // 从HashMap和原始数据中移除
        this.polylineMap.delete(keyToRemove);
        this.originalPolylines.delete(keyToRemove);

        console.log('移除折线成功:', polylineId);
        return true;
      }
    }

    console.log('移除折线失败: 折线不存在');
    return false;
  }

  // 移除多边形
  removePolygon(polygonId: string): boolean {
    // 查找以polygonId开头的键名
    let keyToRemove: string | null = null;
    for (const key of this.polygonMap.keys()) {
      if (key.startsWith(polygonId + '--')) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.polygonMap.has(keyToRemove)) {
      const polygon = this.polygonMap.get(keyToRemove);
      if (polygon) {
        // 直接调用polygon的remove方法删除
        polygon.remove();

        // 从HashMap和原始数据中移除
        this.polygonMap.delete(keyToRemove);
        this.originalPolygons.delete(keyToRemove);

        console.log('移除多边形成功:', polygonId);
        return true;
      }
    }

    console.log('移除多边形失败: 多边形不存在');
    return false;
  }

  // 检查标记ID是否存在
  hasMarker(markerId: string): boolean {
    // 查找以markerId开头的键名
    for (const key of this.markerMap.keys()) {
      if (key.startsWith(markerId + '--')) {
        return true;
      }
    }
    return false;
  }

  // 检查圆形ID是否存在
  hasCircle(circleId: string): boolean {
    // 查找以circleId开头的键名
    for (const key of this.circleMap.keys()) {
      if (key.startsWith(circleId + '--')) {
        return true;
      }
    }
    return false;
  }

  // 检查折线ID是否存在
  hasPolyline(polylineId: string): boolean {
    // 查找以polylineId开头的键名
    for (const key of this.polylineMap.keys()) {
      if (key.startsWith(polylineId + '--')) {
        return true;
      }
    }
    return false;
  }

  // 检查多边形ID是否存在
  hasPolygon(polygonId: string): boolean {
    // 查找以polygonId开头的键名
    for (const key of this.polygonMap.keys()) {
      if (key.startsWith(polygonId + '--')) {
        return true;
      }
    }
    return false;
  }

  // 通用ID存在性检查接口 - 检查指定ID在地图中是否存在（任何类型的元素）
  hasElement(elementId: string): boolean {
    return this.hasMarker(elementId) ||
    this.hasCircle(elementId) ||
    this.hasPolyline(elementId) ||
    this.hasPolygon(elementId);
  }

  // 获取指定ID的元素类型（如果存在）
  getElementType(elementId: string): string | null {
    if (this.hasMarker(elementId)) {
      return 'marker';
    }
    if (this.hasCircle(elementId)) {
      return 'circle';
    }
    if (this.hasPolyline(elementId)) {
      return 'polyline';
    }
    if (this.hasPolygon(elementId)) {
      return 'polygon';
    }
    return null;
  }

  updateCameraAnimate(position: ICameraPosition, time: number): void {
    if (this.mapController) {
      try {
        let cameraPosition: mapCommon.CameraPosition = {
          target: {
            latitude: position.latitude,
            longitude: position.longitude
          } as mapCommon.LatLng,
          zoom: position.zoom,
          tilt: position.tilt ?? 0,
          bearing: position.bearing ?? 0
        };
        let cameraUpdate: map.CameraUpdate = map.newCameraPosition(cameraPosition);
        this.mapController.animateCamera(cameraUpdate, 1000);
        console.log('相机视角更新成功');
      } catch (err) {
        console.log("updateCameraERR", err)
      }
    }
  }

  // 更新相机视角
  updateCamera(position: ICameraPosition): void {
    if (this.mapController) {
      try {
        let cameraPosition: mapCommon.CameraPosition = {
          target: {
            latitude: position.latitude,
            longitude: position.longitude
          } as mapCommon.LatLng,
          zoom: position.zoom,
          tilt: position.tilt ?? 0,
          bearing: position.bearing ?? 0
        };
        let cameraUpdate: map.CameraUpdate = map.newCameraPosition(cameraPosition);
        this.mapController.moveCamera(cameraUpdate);
        console.log('相机视角更新成功');
      } catch (err) {
        console.log("updateCameraERR", err)
      }
    }
  }

  // 获取当前相机位置
  getCameraPosition(): ICameraPosition {
    if (this.mapController) {
      let cameraPosition = this.mapController.getCameraPosition();
      return {
        latitude: cameraPosition.target.latitude,
        longitude: cameraPosition.target.longitude,
        zoom: cameraPosition.zoom,
        tilt: cameraPosition.tilt,
        bearing: cameraPosition.bearing
      };
    } else {
      return {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        tilt: 0,
        bearing: 0
      };
    }
  }

  // 清空地图
  clearMap(): void {
    if (this.mapController) {
      this.mapController.clear();
      // 清空HashMap
      this.markerMap.clear();
      this.circleMap.clear();
      this.polylineMap.clear();
      this.polygonMap.clear();
      // 清空原始数据存储
      this.originalMarkers.clear();
      this.originalCircles.clear();
      this.originalPolylines.clear();
      this.originalPolygons.clear();
    }
  }

  // 清除所有标记点
  clearAllMarkers(): void {
    if (this.mapController) {
      console.log('开始清除所有标记点，当前标记数量:', this.markerMap.size);

      // 遍历并移除所有标记点
      this.markerMap.forEach((marker: map.Marker, key: string) => {
        try {
          marker.remove();
          console.log('成功移除标记:', key);
        } catch (error) {
          console.error('移除标记失败:', key, error);
        }
      });
      // this.mapController.clear();

      // 清空标记相关的HashMap和原始数据
      this.markerMap.clear();
      this.originalMarkers.clear();

      console.log('所有标记点清除完成');
    } else {
      console.log('清除所有标记失败：地图控制器未初始化');
    }
  }

  // 清除所有线条
  clearAllPolylines(): void {
    if (this.mapController) {
      console.log('开始清除所有线条，当前线条数量:', this.polylineMap.size);

      // 遍历并移除所有线条
      this.polylineMap.forEach((polyline: map.MapPolyline, key: string) => {
        try {
          polyline.remove();
          console.log('成功移除线条:', key);
        } catch (error) {
          console.error('移除线条失败:', key, error);
        }
      });

      // 清空线条相关的HashMap和原始数据
      this.polylineMap.clear();
      this.originalPolylines.clear();

      console.log('所有线条清除完成');
    } else {
      console.log('清除所有线条失败：地图控制器未初始化');
    }
  }

  // 设置地图类型（外部调用接口）
  setMapType(mapType: string): boolean {
    try {
      if (this.mapController) {
        const oldType = this.currentMapType;
        this.currentMapType = mapType;
        this.mapController.setMapType(this.getMapType(mapType));

        // 触发地图类型变化回调
        if (this.onMapTypeChange && oldType !== mapType) {
          const res = {
            type: "maptypechange",
            detail: {
              oldType: oldType,
              newType: mapType,
              timestamp: Date.now()
            }
          } as IMapTypeChangeEvent
          this.onMapTypeChange(res);
        }
        console.log('设置地图类型成功')
        return true;
      }
      return false;
    } catch (error) {
      console.error('设置地图类型失败:', error);
      return false;
    }
  }

  // 获取HashMap中的marker对象（通过serialCode或ID）
  getMarkerByKey(key: string): map.Marker | undefined {
    return this.markerMap.get(key);
  }

  // 获取HashMap中的circle对象（通过serialCode或ID）
  getCircleByKey(key: string): map.MapCircle | undefined {
    return this.circleMap.get(key);
  }

  // 获取HashMap中的polyline对象（通过serialCode或ID）
  getPolylineByKey(key: string): map.MapPolyline | undefined {
    return this.polylineMap.get(key);
  }

  // 获取HashMap中的polygon对象（通过serialCode或ID）
  getPolygonByKey(key: string): map.MapPolygon | undefined {
    return this.polygonMap.get(key);
  }

  // 获取所有marker的键名列表（serialCode或ID）
  getAllMarkerKeys(): string[] {
    return Array.from(this.markerMap.keys());
  }

  // 获取所有circle的键名列表（serialCode或ID）
  getAllCircleKeys(): string[] {
    return Array.from(this.circleMap.keys());
  }

  // 获取所有polyline的键名列表（serialCode或ID）
  getAllPolylineKeys(): string[] {
    return Array.from(this.polylineMap.keys());
  }

  // 获取所有polygon的键名列表（serialCode或ID）
  getAllPolygonKeys(): string[] {
    return Array.from(this.polygonMap.keys());
  }

  // 兼容性方法：通过ID获取marker对象
  getMarkerById(markerId: string): map.Marker | undefined {
    return this.getMarkerByKey(markerId);
  }

  // 兼容性方法：通过ID获取circle对象
  getCircleById(circleId: string): map.MapCircle | undefined {
    return this.getCircleByKey(circleId);
  }

  // 兼容性方法：通过ID获取polyline对象
  getPolylineById(polylineId: string): map.MapPolyline | undefined {
    return this.getPolylineByKey(polylineId);
  }

  // 兼容性方法：通过ID获取polygon对象
  getPolygonById(polygonId: string): map.MapPolygon | undefined {
    return this.getPolygonByKey(polygonId);
  }

  // 获取markerMap的公共方法
  getMarkerMap(): Map<string, map.Marker> {
    console.log('=== markerMap内容详情 ===');
    console.log('markerMap大小:', this.markerMap.size);

    // 逐个输出markerMap中的标签
    this.markerMap.forEach((marker: map.Marker, key: string) => {
      console.log(`标签ID: ${key}`);
      console.log(`标签对象:`, marker);
      console.log('---');
    });

    console.log('=== markerMap输出完毕 ===');
    return this.markerMap;
  }

  // 获取markerMap转换为Array的公共方法
  getMarkerIdArray(): Array<IMarkerArrayItem> {
    console.log('=== 将markerMap转换为Array ===');
    console.log('markerMap大小:', this.markerMap.size);

    const markerArray: Array<IMarkerArrayItem> = [];

    // 遍历markerMap，将每个键值对转换为对象并添加到数组中
    this.markerMap.forEach((marker: map.Marker, key: string) => {
      const item: IMarkerArrayItem = {
        id: Number(key.split("--")[0])
      };
      markerArray.push(item);
      console.log(`添加到数组 - 标签ID: ${key}`);
    });

    console.log('转换完成，数组长度:', markerArray.length);
    console.log('=== markerArray转换完毕 ===');
    return markerArray;
  }

  // 获取circleMap的公共方法
  getCircleMap(): Map<string, map.MapCircle> {
    return this.circleMap;
  }

  // 获取polylineMap的公共方法
  getPolylineMap(): Map<string, map.MapPolyline> {
    return this.polylineMap;
  }

  // 获取polygonMap的公共方法
  getPolygonMap(): Map<string, map.MapPolygon> {
    return this.polygonMap;
  }

  // 根据ID更新标记位置
  updateMarkerPosition(markerId: string, latitude: number, longitude: number): boolean {
    // 查找以markerId开头的键名
    let keyToUpdate: string | null = null;
    for (const key of this.markerMap.keys()) {
      if (key.startsWith(markerId + '--')) {
        keyToUpdate = key;
        break;
      }
    }

    if (keyToUpdate !== undefined && keyToUpdate !== null && this.mapController) {
      const mapMarker = this.markerMap.get(keyToUpdate);
      const originalMarker = this.originalMarkers.get(keyToUpdate);

      if (mapMarker && originalMarker) {
        try {
          // 更新地图上的标记位置
          const newPosition: mapCommon.LatLng = {
            latitude: latitude,
            longitude: longitude
          };
          mapMarker.setPosition(newPosition);

          // 更新原始数据中的位置信息
          originalMarker.latitude = latitude;
          originalMarker.longitude = longitude;
          this.originalMarkers.set(keyToUpdate, originalMarker);

          console.log(`标记位置更新成功: ID=${markerId}, 新位置=(${latitude}, ${longitude})`);
          return true;
        } catch (error) {
          console.error('更新标记位置失败:', error);
          return false;
        }
      } else {
        console.log('更新标记位置失败: 未找到对应的标记对象');
        return false;
      }
    } else {
      console.log('更新标记位置失败: 标记不存在或地图控制器未初始化');
      console.log("markerId", markerId)
      return false;
    }
  }

  // 根据ID更新标记图标
  updateMarkerIcon(markerId: string, iconPath: string, width?: number, height?: number): boolean {
    // 查找以markerId开头的键名
    let keyToUpdate: string | null = null;
    for (const key of this.markerMap.keys()) {
      if (key.startsWith(markerId + '--')) {
        keyToUpdate = key;
        break;
      }
    }

    if (keyToUpdate !== undefined && keyToUpdate !== null && this.mapController) {
      const mapMarker = this.markerMap.get(keyToUpdate);
      const originalMarker = this.originalMarkers.get(keyToUpdate);

      if (mapMarker && originalMarker) {
        try {
          // 如果iconPath是字符串路径格式，先转换为PixelMap再更新标记图标
          if (iconPath && typeof iconPath === 'string' && iconPath.startsWith('/data/storage/')) {
            this.updateMarkerIconWithPixelMap(mapMarker, originalMarker, keyToUpdate, iconPath, width, height);
          } else {
            // 直接更新地图上的标记图标
            mapMarker.setIcon(iconPath);

            // 更新原始数据中的图标信息
            originalMarker.iconPath = iconPath;
            // 如果提供了width和height，也更新这些属性
            if (width !== undefined) {
              originalMarker.width = width;
            }
            if (height !== undefined) {
              originalMarker.height = height;
            }
            this.originalMarkers.set(keyToUpdate, originalMarker);

            console.log(`标记图标更新成功: ID=${markerId}, 新图标=${iconPath}`);
          }
          return true;
        } catch (error) {
          console.error('更新标记图标失败:', error);
          return false;
        }
      } else {
        console.log('更新标记图标失败: 未找到对应的标记对象');
        return false;
      }
    } else {
      console.log('更新标记图标失败: 标记不存在或地图控制器未初始化');
      return false;
    }
  }

  // 使用PixelMap更新标记图标
  private updateMarkerIconWithPixelMap(mapMarker: map.Marker, originalMarker: IMarkerItem, keyToUpdate: string,
    iconPath: string, width?: number, height?: number): void {
    try {
      // 读取文件并转换为PixelMap
      const file = fileIo.openSync(iconPath, fileIo.OpenMode.READ_ONLY);
      const imageSource = image.createImageSource(file.fd);

      // 设置解码选项，使用传入的宽高参数，默认为60
      const markerWidth = width ?? originalMarker.width ?? 60;
      const markerHeight = height ?? originalMarker.height ?? 60;
      const decodingOptions: image.DecodingOptions = {
        desiredSize: {
          width: this.getUIContext().vp2px(markerWidth),
          height: this.getUIContext().vp2px(markerHeight)
        }
      };

      imageSource.createPixelMap(decodingOptions).then((pixelMap: image.PixelMap) => {
        fileIo.closeSync(file);

        // 使用PixelMap更新标记图标
        mapMarker.setIcon(pixelMap);

        // 更新原始数据中的图标信息
        originalMarker.iconPath = iconPath;
        if (width !== undefined) {
          originalMarker.width = width;
        }
        if (height !== undefined) {
          originalMarker.height = height;
        }
        this.originalMarkers.set(keyToUpdate, originalMarker);

        console.log(`标记图标更新成功（使用PixelMap）: 新图标=${iconPath}, 尺寸=${markerWidth}x${markerHeight}`);

      }).catch((error: Error) => {
        console.error('转换PixelMap失败:', error.message);
        fileIo.closeSync(file);
        // 如果转换失败，使用原始路径更新标记
        mapMarker.setIcon(iconPath);
        originalMarker.iconPath = iconPath;
        if (width !== undefined) {
          originalMarker.width = width;
        }
        if (height !== undefined) {
          originalMarker.height = height;
        }
        this.originalMarkers.set(keyToUpdate, originalMarker);
      });

    } catch (error) {
      console.error('读取图片文件失败:', error);
      // 如果读取失败，使用原始路径更新标记
      mapMarker.setIcon(iconPath);
      originalMarker.iconPath = iconPath;
      if (width !== undefined) {
        originalMarker.width = width;
      }
      if (height !== undefined) {
        originalMarker.height = height;
      }
      this.originalMarkers.set(keyToUpdate, originalMarker);
    }
  }

  // 根据地图对象ID删除标记（'--'后面的部分）
  removeMarkerByMapId(mapId: string): boolean {
    // 查找以mapId结尾的键名
    let keyToRemove: string | null = null;
    for (const key of this.markerMap.keys()) {
      if (key.endsWith('--' + mapId)) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.markerMap.has(keyToRemove)) {
      const marker = this.markerMap.get(keyToRemove);
      if (marker) {
        // 直接调用marker的remove方法删除
        marker.remove();

        // 从HashMap和原始数据中移除
        this.markerMap.delete(keyToRemove);
        this.originalMarkers.delete(keyToRemove);

        console.log('根据地图对象ID移除标记成功:', mapId);
        return true;
      }
    }

    console.log('根据地图对象ID移除标记失败: 标记不存在');
    return false;
  }

  // 根据地图对象ID删除圆形（'--'后面的部分）
  removeCircleByMapId(mapId: string): boolean {
    // 查找以mapId结尾的键名
    let keyToRemove: string | null = null;
    for (const key of this.circleMap.keys()) {
      if (key.endsWith('--' + mapId)) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.circleMap.has(keyToRemove)) {
      const circle = this.circleMap.get(keyToRemove);
      if (circle) {
        // 直接调用circle的remove方法删除
        circle.remove();

        // 从HashMap和原始数据中移除
        this.circleMap.delete(keyToRemove);
        this.originalCircles.delete(keyToRemove);

        console.log('根据地图对象ID移除圆形成功:', mapId);
        return true;
      }
    }

    console.log('根据地图对象ID移除圆形失败: 圆形不存在');
    return false;
  }

  // 根据地图对象ID删除折线（'--'后面的部分）
  removePolylineByMapId(mapId: string): boolean {
    // 查找以mapId结尾的键名
    let keyToRemove: string | null = null;
    for (const key of this.polylineMap.keys()) {
      if (key.endsWith('--' + mapId)) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.polylineMap.has(keyToRemove)) {
      const polyline = this.polylineMap.get(keyToRemove);
      if (polyline) {
        // 直接调用polyline的remove方法删除
        polyline.remove();

        // 从HashMap和原始数据中移除
        this.polylineMap.delete(keyToRemove);
        this.originalPolylines.delete(keyToRemove);

        console.log('根据地图对象ID移除折线成功:', mapId);
        return true;
      }
    }

    console.log('根据地图对象ID移除折线失败: 折线不存在');
    return false;
  }

  mapShow(): void {
    if (this.mapController) {
      this.mapController.show();
      console.log("地图显示")
    }
  }

  mapHide(): void {
    if (this.mapController) {
      this.mapController.hide();
      console.log("地图隐藏")
    }
  }

  // 根据地图对象ID删除多边形（'--'后面的部分）
  removePolygonByMapId(mapId: string): boolean {
    // 查找以mapId结尾的键名
    let keyToRemove: string | null = null;
    for (const key of this.polygonMap.keys()) {
      if (key.endsWith('--' + mapId)) {
        keyToRemove = key;
        break;
      }
    }

    if (keyToRemove !== undefined && keyToRemove !== null && this.polygonMap.has(keyToRemove)) {
      const polygon = this.polygonMap.get(keyToRemove);
      if (polygon) {
        // 直接调用polygon的remove方法删除
        polygon.remove();

        // 从HashMap和原始数据中移除
        this.polygonMap.delete(keyToRemove);
        this.originalPolygons.delete(keyToRemove);

        console.log('根据地图对象ID移除多边形成功:', mapId);
        return true;
      }
    }

    console.log('根据地图对象ID移除多边形失败: 多边形不存在');
    return false;
  }

  // 将屏幕像素坐标转换为经纬度坐标
  fromScreenLocation(point: mapCommon.MapPoint): mapCommon.LatLng | null {
    if (this.mapController) {
      try {
        const projection = this.mapController.getProjection();
        const latLng: mapCommon.LatLng = projection.fromScreenLocation(point);
        console.log(`屏幕坐标转换成功: (${point.positionX}, ${point.positionY}) -> (${latLng.latitude}, ${latLng.longitude})`);
        return latLng;
      } catch (error) {
        console.error('屏幕坐标转换失败:', error);
        return null;
      }
    } else {
      console.log('屏幕坐标转换失败: 地图控制器未初始化');
      return null;
    }
  }
}

@Builder
function MapBuilder(options: MapBuilderOptions) {
  HuaweiMapComponent({
    name: options.name,
    latitude: options.latitude,
    longitude: options.longitude,
    scaleVal: options.scale ?? 16,
    rotateVal: options.rotate ?? 0,
    skew: options.skew ?? 0,
    minScale: options.minScale ?? 2,
    maxScale: options.maxScale ?? 20,
    showCompass: options.showCompass ?? false,
    enableZoom: options.enableZoom ?? false,
    showLocation: options.showLocation ?? true,
    showMapTypeButton: options.showMapTypeButton ?? true,
    markers: options.markers ?? [],
    circles: options.circles ?? [],
    polylines: options.polylines ?? [],
    polygons: options.polygons ?? [],
    mapType: options.mapType ?? 'STANDARD',
    onMarkerTap: options?.on?.get('markertap'),
    onMapTap: options?.on?.get('maptap'),
    onReady: options?.on?.get('ready'),
    onMapTypeChange: options?.on?.get('maptypechange'),
    cameraMoveStart: options?.on?.get('cameramovestart'),
    cameraChange: options?.on?.get('camerachange')
  })
    .width(options.width)
    .height(options.height)
}

defineNativeEmbed('map', {
  builder: MapBuilder
})
