import { NativeEmbedBuilderOptions, defineNativeEmbed } from "@dcloudio/uni-app-runtime"
import { HashMap, ArrayList } from '@kit.ArkTS';
import { geoLocationManager } from '@kit.LocationKit';
import {
  NodeRenderType,
} from '@ohos.arkui.node'
import {
  AMap,
  MapViewCreateCallback,
  LatLng,
  Circle,
  CircleOptions,
  Polygon,
  PolygonOptions,
  Polyline,
  PolylineOptions,
  Marker,
  MarkerOptions,
  CameraUpdateFactory,
  BitmapDescriptor,
  BitmapDescriptorFactory,
  MapsInitializer,
  MapView,
  MapViewComponent,
  MapViewManager,
  LocationSource,
  OnLocationChangedListener,
  MyLocationStyle,
  CameraPosition,
  OnCameraChangeListener
} from '@amap/amap_lbs_map3d';
import { AsyncCallback } from '@kit.BasicServicesKit';

interface MapBuilderOptions extends NativeEmbedBuilderOptions {
  appKey: string
  needUser: boolean
  longitude: number
  latitude: number
  scale?: number
  zoomctrol: boolean
}


interface IMarkerItem {
  latitude: number
  longitude: number
  title?: string
  icon?: string
  rotate?: number
  zIndex?: number
  visible?: boolean
  alpha?: number,
  infoWindowEnable?: boolean
  custom?: ICustomMarker
}


interface IUserLocationItem {
  latitude: number
  longitude: number
  accuracy?: number //精度
  direction?: number //方向
  speed?: number //速度
  sourceType?: number
}


interface ICustomMarker {
  color?: number
  backgroundColor?: number
  fontSize?: number,
  iconWidth?: number,
  iconHeight?: number
}


interface ICircleItem {
  id: number,
  latitude: number
  longitude: number
  color?: number
  fillColor?: number
  radius: number
  visible?: boolean
  zIndex?: number
  strokeWidth?: number
}

interface IPolygonItem {
  id: number,
  color?: number
  fillColor?: number
  radius: number
  visible?: boolean
  zIndex?: number
  strokeWidth?: number
  latLngs: ILatLng[]
}


interface IPolylineItem {
  id: number,
  color?: number
  dottedLine: boolean
  transparency?: number
  visible?: boolean
  zIndex?: number
  width?: number
  geodesic?: boolean
  lineCapType?: number
  lineJoinType?: number
  latLngs: ILatLng[]
}


interface ICameraPosition {
  latLng: ILatLng
  zoom: number
}

interface IMarkerTapDetailEvent {
  markerId: string
}

interface IMarkerTapEvent {
  type: string;
  detail: IMarkerTapDetailEvent | ICameraPosition
}


interface ILatLng {
  latitude: number
  longitude: number
}


interface CenterOptions extends NativeEmbedBuilderOptions {
  longitude: number
  latitude: number
}


interface OnUserLocation {
  callBackLocation: () => IUserLocationItem; // 获取
};


export let testLog: Function | null = null

export let uniMoveCenterCamera: Function | null = null


export let uniAddCircle: Function | null = null

export let uniRemoveCircle: Function | null = null


export let uniAddPolygon: Function | null = null

export let uniRemovePolygon: Function | null = null

export let uniAddPolyline: Function | null = null

export let uniRemovePolyline: Function | null = null


export let uniDestroyMap: Function | null = null

export let uniClearMap: Function | null = null


export let uniAddMarker: Function | null = null

export let uniRemoveMarker: Function | null = null


export let uniAddCustomMarker: Function | null = null

export let uniRemoveCustomMarker: Function | null = null

export let uniGetCameraPosition: Function | null = null



export let uniShowUserLocation: Function | null = null

export let uniSetUserLocationListener: Function | null = null

export let uniChangeLocationShowType: Function | null = null


//  export const testLog = ()=> {
// console.log("testLog")
//  };


@Component
struct MapComponent {
  @Prop appKey: string
  @Prop needUser: boolean
  @Prop @Watch('onScaleValUpdated') longitude: number
  @Prop @Watch('onScaleValUpdated') latitude: number
  @Prop @Watch('onScaleValUpdated') scaleVal: number
  @Prop @Watch('onScaleValUpdated') zoomctrol: boolean
  
  onInitEnd?: Function
  onMarkerTap?: Function
  onCameraChange?: Function
  onGetUserLocation?: Function
  private aMap?: AMap
  private mapView?: MapView
  private mapViewCreateCallback?: MapViewCreateCallback
  private locationStyle: MyLocationStyle = new MyLocationStyle();
  //存储地图元素
  private circleHashMap: HashMap<number, Circle> = new HashMap();
  private polygonHashMap: HashMap<number, Polygon> = new HashMap();
  private polylineHashMap: HashMap<number, Polyline> = new HashMap();
  private bitmapDescriptorHashMap: HashMap<string, BitmapDescriptor> = new HashMap();
  private customBitmapDescriptorHashMap: HashMap<string, BitmapDescriptor> = new HashMap();
  private userLocation?: IUserLocationItem
  private onUserLocation?: OnUserLocation

  @Builder
  customMarkerBuilder(text: string, icon: string, rotate: number, custom: ICustomMarker) {
    // 自定义组件marker
    Column({ space: 8 }) { // 纵向布局，间距 8
      Text(text)
        .fontSize(custom.fontSize)
        .fontColor(custom.color)
        .padding({
          left: 12,
          right: 12,
          top: 6,
          bottom: 6
        })
        .backgroundColor(custom.backgroundColor)// 蓝色背景
        .borderRadius(8)// 圆角
        .border({ width: 2, color: Color.White }) // 白色边框

      Image($r(icon))//'app.media.startIcon'
        .width(custom.iconWidth)// 按需调整
        .height(custom.iconHeight)
        .objectFit(ImageFit.Fill)
        .rotate({ angle: rotate })
    }
    .alignItems(HorizontalAlign.Center) // 水平居中
    .justifyContent(FlexAlign.Center) // 垂直居中（如无外层约束可省）
  }

  // @Watch 回调
  onScaleValUpdated(propName: string): void {
    console.log("scaleVal", this.scaleVal)
    console.log("propName", propName)
    this.moveCenterCamera()
	this.aMap?.getUiSettings()?.setZoomControlsEnabled(this.zoomctrol); // 启用缩放按钮
  }

  // 在执行其build()函数之前执行。允许在aboutToAppear函数中改变状态变量，更改将在后续执行build()函数中生效
  aboutToAppear() {
    console.log("Component aboutToAppear");
    this.initMap()
    testLog = async (circle: ICircleItem) => {
      console.log("MapComponent testLog")
      console.log("MapComponent testLog circle", circle)
      await this.moveCenterCamera()
    };

    uniMoveCenterCamera = () => {
      this.moveCenterCamera()
    };

    uniAddCircle = (circle: ICircleItem): number => {
      return this.addCircle(circle)
    };

    uniRemoveCircle = (id: number) => {
      this.removeCircle(id)
    };

    uniAddPolygon = (polygon: IPolygonItem): number => {
      return this.addPolygon(polygon)
    };

    uniRemovePolygon = (id: number) => {
      this.removePolygon(id)
    };

    uniGetCameraPosition = ():ICameraPosition =>  {
      return this.getCameraPosition()
    };
     
    uniAddPolyline = (polyline: IPolylineItem): number => {
      return this.addPolyline(polyline)
    };

    uniRemovePolyline = (id: number) => {
      this.removePolyline(id)
    };

    uniAddMarker = async (marker: IMarkerItem): Promise<string> => {
      return await this.addMarker(marker)
    };

    uniRemoveMarker = (id: string) => {
      this.removeMarker(id)
    };

    uniAddCustomMarker = async (marker: IMarkerItem): Promise<string> => {
      return await this.addCustomMarker(marker)
    };

    uniRemoveCustomMarker = (id: string) => {
      this.removeCustomMarker(id)
    };

    uniDestroyMap = () => {
      this.destroyMap()
    };

    uniClearMap = (isKeepMyLocationOverlay?: boolean) => {
      this.clearMap(isKeepMyLocationOverlay)
    };

    //反向监听获取外部定位点  无法通过veiw组件的回调Void获取  使用直接回调
    uniShowUserLocation = (show: boolean) => {
      console.log("location uniShowUserLocation", this.onUserLocation)
      if (show) {
        let location = this.onUserLocation?.callBackLocation();
        console.log("location", location)
        this.userLocation = location
        this.aMap?.setMyLocationEnabled(true); //打开定位图层
      } else {
        this.aMap?.setMyLocationEnabled(false); //打开定位图层
      }
    }

    uniChangeLocationShowType = (location_show_type: number) => {
      this.locationStyle.myLocationType(location_show_type);
      this.aMap?.setMyLocationStyle(this.locationStyle);
    }

    uniSetUserLocationListener = (onUserLocation?: OnUserLocation) => {
      console.log("location uniSetUserLocationListener", onUserLocation)
      this.onUserLocation = onUserLocation
      let location = this.onUserLocation?.callBackLocation();
      console.log("location", location)
      this.userLocation = location
    }

  }

  clearMap(isKeepMyLocationOverlay?: boolean): void {
    this.aMap?.clear(isKeepMyLocationOverlay)
    this.circleHashMap.clear()
    this.polygonHashMap.clear()
    this.polylineHashMap.clear()
    let iter = this.bitmapDescriptorHashMap.values();
    let temp: IteratorResult<BitmapDescriptor> = iter.next();
    while (!temp.done) {
      console.info("value:" + temp.value);
      if (temp.value) {
        temp.value.recycle()
      }
      temp = iter.next();
    }
    this.bitmapDescriptorHashMap.clear()

    let citer = this.customBitmapDescriptorHashMap.values();
    let ctemp: IteratorResult<BitmapDescriptor> = citer.next();
    while (!ctemp.done) {
      console.info("value:" + ctemp.value);
      if (ctemp.value) {
        ctemp.value.recycle()
      }
      ctemp = citer.next();
    }
    this.customBitmapDescriptorHashMap.clear()

  }

  async moveCenterCamera(): Promise<void> {
    this.aMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(this.latitude, this.longitude),
      this.scaleVal)); //设置地图中心点以及缩放级别
  }

  //添加圆形
  addCircle(circle: ICircleItem): number {
    if (circle.id && !this.circleHashMap.hasKey(circle.id)) {
      let circleOptions: CircleOptions = new CircleOptions();
      circleOptions.setRadius(circle.radius); //设置圆的半径，单位:米
      circleOptions.setCenter(new LatLng(circle.latitude, circle.longitude)); //设置圆心经纬度坐标
      circleOptions.setFillColor(circle.fillColor); //设置圆的填充颜色
      circleOptions.setStrokeColor(circle.color); //设置圆的边框颜色
      circleOptions.setStrokeWidth(circle.strokeWidth);
      circleOptions.setVisible(circle.visible);
      circleOptions.setZIndex(circle.zIndex);
      let m_circle = this.aMap?.addCircle(circleOptions)
      if (m_circle) {
        this.circleHashMap.set(circle.id, m_circle)
        return circle.id
      } else {
        console.log("add fail amap addCircle api");
        return 0
      }
    } else {
      console.log("add fail error id");
      return 0
    }
  }

  //移除圆形
  removeCircle(id: number) {
    let m_circle = this.circleHashMap.get(id)
    if (m_circle) {
      this.circleHashMap.remove(id)
      m_circle.remove()
    }
  }

  //添加多边形
  addPolygon(polygon: IPolygonItem): number {
    if (polygon.id && !this.polygonHashMap.hasKey(polygon.id)) {
      let polygonOptions: PolygonOptions = new PolygonOptions();
      let latLngs: ArrayList<LatLng> = new ArrayList();
      polygon.latLngs.forEach((latLng) => {
        latLngs.add(new LatLng(latLng.latitude, latLng.longitude))
      })
      polygonOptions.setPoints(latLngs)
      polygonOptions.setFillColor(polygon.fillColor); //设置填充颜色
      polygonOptions.setStrokeColor(polygon.color); //设置边框颜色
      polygonOptions.setStrokeWidth(polygon.strokeWidth);
      polygonOptions.setVisible(polygon.visible);
      polygonOptions.setZIndex(polygon.zIndex);
      let m_polygon = this.aMap?.addPolygon(polygonOptions)
      if (m_polygon) {
        this.polygonHashMap.set(polygon.id, m_polygon)
        return polygon.id
      } else {
        console.log("add fail amap addPolygon api");
        return 0
      }
    } else {
      console.log("add fail error id");
      return 0
    }
  }

  //移除多边形
  removePolygon(id: number) {
    let m_polygon = this.polygonHashMap.get(id)
    if (m_polygon) {
      this.polygonHashMap.remove(id)
      m_polygon.remove()
    }
  }

  //添加线段
  addPolyline(polyline: IPolylineItem): number {
    if (polyline.id && !this.polylineHashMap.hasKey(polyline.id)) {
      let options: PolylineOptions = new PolylineOptions();
      let latLngs: ArrayList<LatLng> = new ArrayList();
      polyline.latLngs.forEach((latLng) => {
        latLngs.add(new LatLng(latLng.latitude, latLng.longitude))
      })
      options.setPoints(latLngs)
      options.setDottedLine(polyline.dottedLine); //设置是否画虚线，默认：false（画实线）画实线
      options.setColor(polyline.color); //
      options.setTransparency(polyline.transparency); //设置线段的透明度 0~1，默认：1（表示不透明）表示不透明
      options.setVisible(polyline.visible);
      options.setWidth(polyline.width);
      options.setZIndex(polyline.zIndex);
      options.setGeodesic(polyline.geodesic); //设置线段是否为大地曲线，默认：false（不画大地曲线）
      options.setLineCapType(polyline.lineCapType) //线尾部形状 LineCapButt = 0 LineCapSquare = 1,LineCapArrow = 2,LineCapRound = 3
      options.setLineJoinType(polyline.lineJoinType) // LineJoinBevel = 0,LineJoinMiter = 1,LineJoinRound = 2
      let m_polyline = this.aMap?.addPolyline(options)
      if (m_polyline) {
        this.polylineHashMap.set(polyline.id, m_polyline)
        return polyline.id
      } else {
        console.log("add fail amap addPolyline api");
        return 0
      }
    } else {
      console.log("add fail error id");
      return 0
    }
  }

  //移除线段
  removePolyline(id: number) {
    let m_polyline = this.polylineHashMap.get(id)
    if (m_polyline) {
      this.polylineHashMap.remove(id)
      m_polyline.remove()
    }
  }

  //添加点
  async addMarker(marker: IMarkerItem): Promise<string> {
    console.log("marker", marker);
    let options: MarkerOptions = new MarkerOptions();
    options.setPosition(new LatLng(marker.latitude, marker.longitude));

    options.setTitle(marker.title ?? ""); //设置标记的标题
    options.setSnippet("") //设置标记的文字描述
    options.setRotateAngle(marker.rotate)
    options.autoOverturnInfoWindow(true) //是否自动旋转
    options.setInfoWindowEnable(true) // 设置Marker覆盖物的InfoWindow是否允许显示,默认为true marker.infoWindowEnable ?? 
    //marker.showInfoWindow()显示 InfoWindow
    //marker.hideInfoWindow()隐藏 InfoWindow
    if (marker.icon) {
      if (this.bitmapDescriptorHashMap.hasKey(marker.icon)) {
        let bitmapDes = this.bitmapDescriptorHashMap.get(marker.icon)
        options.setIcon(bitmapDes);
      } else {
        let bitmapDes = await BitmapDescriptorFactory.fromRawfilePath(getContext().getApplicationContext(),
          marker.icon);
        if (bitmapDes) {
          options.setIcon(bitmapDes);
          this.bitmapDescriptorHashMap.set(marker.icon, bitmapDes)
        }
      }
    }

    //setIcon(icon)设置Marker覆盖物的图标。相同图案的 icon 的 Marker 最好使用同一个 BitmapDescriptor 对象以节省内存空间。
    options.setAlpha(marker.alpha)


    options.setAnchor(0.5, 1.0) //设置标记的锚点比例。锚点标记图标接触地图平面的点。图标的左顶点为（0,0）点，右底点为（1,1）点，默认为（0.5,1.0）
    options.setVisible(marker.visible)
    options.setDraggable(false)

    options.setZIndex(marker.zIndex)

    options.setFlat(false) //平贴地图设置为 true，面对镜头设置为 false。

    //setDisplayLevel(level): 覆盖物的InfoWindow避让优先级
    // setIcons(icons)//设置Marker覆盖物的动画帧图标列表，多张图片模拟gif的效果。
    let m_marker = this.aMap?.addMarker(options);


    console.log("marker", m_marker?.getId());
    return m_marker?.getId() ?? ""
  }

  //移除点
  removeMarker(id: string) {
    this.aMap?.removeOverlay(id);
  }

  //添自定义加点
  async addCustomMarker(marker: IMarkerItem): Promise<string> {
    console.log("marker", marker);
    let options: MarkerOptions = new MarkerOptions();
    options.setPosition(new LatLng(marker.latitude, marker.longitude));

    options.setTitle(marker.title ?? ""); //设置标记的标题
    options.setSnippet("") //设置标记的文字描述
    options.autoOverturnInfoWindow(true) //是否自动旋转
    options.setInfoWindowEnable(false) // 设置Marker覆盖物的InfoWindow是否允许显示,默认为true marker.infoWindowEnable ?? 
    if (!marker.custom) {
      return ""
    }
    let bitmapDes = await BitmapDescriptorFactory.fromView(() => {
      this.customMarkerBuilder(marker.title ?? "", marker.icon ?? "", marker.rotate ?? 0, marker.custom!);
    });
    if (bitmapDes) {
      options.setIcon(bitmapDes);
      options.setAnchor(0.5, 1.0) //设置标记的锚点比例。锚点标记图标接触地图平面的点。图标的左顶点为（0,0）点，右底点为（1,1）点，默认为（0.5,1.0）
      options.setVisible(marker.visible)
      options.setDraggable(false)
      options.setZIndex(marker.zIndex)

      options.setFlat(false) //平贴地图设置为 true，面对镜头设置为 false。

      //setDisplayLevel(level): 覆盖物的InfoWindow避让优先级
      // setIcons(icons)//设置Marker覆盖物的动画帧图标列表，多张图片模拟gif的效果。
      let m_marker = this.aMap?.addMarker(options);
      console.log("marker", m_marker?.getId());
      let id = m_marker?.getId() ?? ""
      if (id) {
        this.customBitmapDescriptorHashMap.set(id, bitmapDes)
      }
      return id
    } else {
      return ""
    }


  }

  //移除自定义点
  removeCustomMarker(id: string) {
    this.aMap?.removeOverlay(id);
    let bitmapDescriptor = this.customBitmapDescriptorHashMap.get(id)
    if (bitmapDescriptor) {
      bitmapDescriptor.recycle()
      this.customBitmapDescriptorHashMap.remove(id)

    }
  }

  //
  getCameraPosition(): ICameraPosition {
    let position = this.aMap?.getCameraPosition()
    if (position) {
      let cp = {
        zoom: position.zoom,
        latLng: {
          longitude: position.target.longitude,
          latitude: position.target.latitude
        }
      } as ICameraPosition
      return cp
    } else {
		let cp = {
		  zoom: 0,
		  latLng: {
		    longitude: 0,
		    latitude: 0
		  }
		} as ICameraPosition
      return cp
    }
  }

  //build()函数之后执行，开发者可以在这个阶段进行埋点数据上报等不影响实际UI的功能。不建议在onDidBuild函数中更改状态变量、使用animateTo等功能，这可能会导致不稳定的UI表现。
  onDidBuild() {
    console.log("Component onDidBuild");
  }

  // 销毁时执行。不允许在aboutToDisappear函数中改变状态变量
  aboutToDisappear() {
    console.log("Component aboutToDisappear");
    this.destroyMap()
  }

  destroyMap(): void {
    if (this.mapViewCreateCallback) {
      MapViewManager.getInstance().unregisterMapViewCreatedCallback(this.mapViewCreateCallback);
    }
    if (this.mapView) {
      this.mapView.onDestroy();
      this.mapView = undefined;
      this.aMap = undefined;
    }
    console.log("Component destroyMap");

  };

  initMap(): void {
    console.log("Component initMap");
    MapsInitializer.setApiKey(this.appKey);
    this.mapViewCreateCallback = async (mapview?: MapView, mapViewName?: string) => {
      if (!mapview) {
        return;
      }
      this.mapView = mapview;
      this.mapView.onCreate();
      this.mapView.getMapAsync(async (map) => {
        this.aMap = map;
        await this.moveCenterCamera()
		this.aMap.getUiSettings()?.setZoomControlsEnabled(this.zoomctrol); // 启用缩放按钮
        this.aMap.setOnMarkerClickListener((marker: Marker): boolean => {
          // marker 被点击的 marker 对象
          // 返回true表示已处理点击事件，不再继续传递；返回false则继续传递
          console.log(marker.getId(), " at uni_modules/ft-harmony-amap/utssdk/app-harmony/amap.ets:592");
          if (this.onMarkerTap) {
            const res = {
              type: "markertap",
              detail: {
                markerId: marker.getId()
              }
            } as IMarkerTapEvent
            this.onMarkerTap(res)
          }
          // 返回true表示已处理点击事件，不再继续传递；返回false则继续传递
          return false
        })
        this.aMap.setOnCameraChangeListener(new OnCameraChangeListener(
          (position: CameraPosition) => {
            //移动中
          },
          (position: CameraPosition) => {
            //移动完成
            if (this.onCameraChange) {
              const res = {
                type: "camerachange",
                detail: {
                  zoom: position.zoom,
                  latLng: {
                    longitude: position.target.longitude,
                    latitude: position.target.latitude
                  }
                }
              } as IMarkerTapEvent
            this.onCameraChange(res)
           }
          }));


        if (this.needUser) {
          console.log("needUser", "setLocationSource")
          //定义了一个定位源，为地图提供定位数据
          let that = this
          let locationSource: LocationSource = {
            activate(listener: OnLocationChangedListener): void {
              console.log("location activate")
              console.log("location activate userLocation", that.userLocation)
              if (that.userLocation) {
                let location: geoLocationManager.Location = {
                  accuracy: that.userLocation.accuracy ?? 1000,
                  direction: that.userLocation.direction ?? 0,
                  latitude: that.userLocation.latitude,
                  longitude: that.userLocation.longitude,
                  speed: that.userLocation.speed ?? 0,
                  sourceType: that.userLocation.sourceType,
                  altitude: 0, //海拔
                  timeSinceBoot: 123587419434256,
                  timeStamp: 0,
                  altitudeAccuracy: 0, //高度精度
                  speedAccuracy: 0,
                  directionAccuracy: 0,
                  uncertaintyOfTimeSinceBoot: 10,
                }
                try {
                  listener.onLocationChanged(location);
                } catch (e) {
                  console.log("onLocationChanged", e);
                }
              }


            },
            deactivate() {
              console.log("location deactivate")
            }
          };
          this.aMap?.setLocationSource(locationSource); //设置定位源
        }
        if (this.onInitEnd) {
          this.onInitEnd()
        }
      })

    };
    MapViewManager.getInstance().registerMapViewCreatedCallback(this.mapViewCreateCallback)
  }

  build() {
    Stack() {
      // 调用MapComponent组件初始化地图
      MapViewComponent({ mapViewName: "高德地图" }).zIndex(0);
    }.height('100%')

  }
}

@Builder
function MapBuilder(options: MapBuilderOptions) {
  MapComponent({
    appKey: options.appKey,
    needUser: options.needUser ?? false,
    latitude: options.latitude,
    longitude: options.longitude,
    scaleVal: options.scale ?? 16,
	zoomctrol: options.zoomctrol ?? false,
    onInitEnd: options?.on?.get('initend'),
    onMarkerTap: options?.on?.get('markertap'),
    onCameraChange: options?.on?.get('camerachange'),
    onGetUserLocation: options?.on?.get('onuserLocation'), //该方法是void，无法直接从外部拿到值

  })
    .width(options.width)
    .height(options.height)
}

defineNativeEmbed('amap', {
  builder: MapBuilder
})

defineNativeEmbed('ramap', {
  builder: MapBuilder,
  nodeRenderType: NodeRenderType.RENDER_TYPE_DISPLAY
})




