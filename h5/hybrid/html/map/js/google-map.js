/**
 * @params
 * options:
 * {
 *   key:'' // Google Maps API key 必传
 *   mapId:'', // Google Maps ID 可选
 *   nodeName:'#map' // 地图容器的节点名称，默认为 'map'
 *   needNavigation:false // 是否需要导航功能，默认true，
 *   origin:{
 *      lat: 0, // 起点纬度
 *      lng: 0, // 起点经度
 *      img: 'https://example.com/image.png' // 起点图标
 *   }
 *   destination:[
 *   {
 *      lat: 0, // 终点纬度
 *      lng: 0, // 终点经度
 *      img: 'https://example.com/image.png' // 终点图标
 *   }
 *   ] ||  {
 *      lat: 0, // 终点纬度
 *      lng: 0, // 终点经度
 *      img: 'https://example.com/image.png' // 终点图标
 *   }
 *   zoom: 11 // 地图缩放级别，如果不传，则根据起点和终点自动计算
 *   showPlaceDetail: true // 是否显示地点详情信息窗口（原生带的有对应的信息窗口），默认true，
 *   mapClik:(placeInfo:获取到的地点信息)=>>{}, // 地图点击事件回调
 *   needSearch: true // 是否显示搜索地点功能，默认true，
 *   markers:[] // 自定义的标记点，格式为 [{lat: 0, lng: 0, img: 'https://example.com/image.png'}]
 * }
 */
class GooleMap {
  #key = null
  #options = null
  #map = null
  #directionsRenderer = null // 用于绘制路线

  constructor(options) {
    this.#options = options || {}
    this.#key = options?.key || null

    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const element = options[key]
        this[`${key}`] = element
      }
    }
    this.initMap()
  }

  async #createGoogleScript(lang) {
    if (!this.#key) throw new Error('Google Maps API key is required')
    ;((g) => {
      var h,
        a,
        k,
        p = 'The Google Maps JavaScript API',
        c = 'google',
        l = 'importLibrary',
        q = '__ib__',
        m = document,
        b = window
      b = b[c] || (b[c] = {})
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement('script'))
            e.set('libraries', [...r] + '')
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
                g[k]
              )
            e.set('callback', c + '.maps.' + q)
            a.src = 'https://maps.' + c + 'apis.com/maps/api/js?' + e + '&language=' + lang
            d[q] = f
            a.onerror = () => (h = n(Error(p + ' could not load.')))
            a.nonce = m.querySelector('script[nonce]')?.nonce || ''
            m.head.append(a)
          }))
      d[l] ? console.warn(p + ' only loads once. Ignoring:', g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)))
    })({
      key: this.#key,
      v: 'weekly',
    })
  }

  async initMap() {
    const { nodeName = '#map', mapId = '', zoom, origin, destination, needNavigation, language} = this.#options
    await this.#createGoogleScript(language)
    const { Map } = await google.maps.importLibrary('maps')

    // 创建地图
    this.#map = new Map(document.querySelector(nodeName), {
      zoom: needNavigation ? getZoom(origin, destination) || zoom || 11 : 11,
      center: origin,
      mapId: mapId || '',
      language: language
    })

    this.origin = await this.setPlace(origin)
    // 是否需要导航地点功能
    if (needNavigation) {
      if (Array.isArray(destination)) {
        for (let i = 0; i < destination.length; i++) {
          let dest = destination[i]
          destination[i] = await this.setPlace(dest, i)
        }
      } else if (destination) {
        this.destination = await this.setPlace(destination)
      }
    }

    // 是否需要搜索、点击显示地点信息功能
    // if (needSearch) {
    //   this.addMapClickEvent();
    // }
  }

  // 搜索地点
  async searchPlace(placeName) {
    const that = this
    const { Place } = await google.maps.importLibrary('places')
    const request = {
      textQuery: placeName,
      fields: ['*'],
    }
    const { places } = await Place.searchByText(request)
    if (places.length) {
      const { LatLngBounds } = await google.maps.importLibrary('core')
      const bounds = new LatLngBounds()
      places.forEach(async (place) => {
        const positionObj = {
          lat: place.location.lat(),
          lng: place.location.lng(),
        }
        bounds.extend(place.location)
        that.setPlace(positionObj)
      })
      that.#map.fitBounds(bounds)
    } else {
      console.log('No results')
    }
    console.log('places', places)

    return new Promise((resolve) => {
      resolve(places)
    })
  }

  // 设置地图 Place
  async setPlace(positionObj, index) {
    const location = {
      lat: positionObj?.lat || 0,
      lng: positionObj?.lng || 0,
    }
    const placeId = await this.getPlaceId(location)
    const { Place } = await google.maps.importLibrary('places')

    const placeInfo = new Place({ id: placeId })
    await placeInfo.fetchFields({
      fields: ['*'],
    })

    placeInfo.lat = location.lat
    placeInfo.lng = location.lng
    const marker = await this.setMarker(positionObj)
    await this.addMarkerEvent(marker, placeInfo, index)
    const returnInfo = {
      title: placeInfo?.displayName || '未知地点',
      formattedAddress: placeInfo?.formattedAddress || '未知地址',
      lng: location?.lng,
      lat: location?.lat,
    }

    return new Promise((resolve) => {
      resolve(returnInfo)
    })
  }

  // 获取 placeId
  async getPlaceId(location) {
    const { Geocoder } = await google.maps.importLibrary('geocoding')
    const geocoder = new Geocoder()
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].place_id)
        } else {
          reject(new Error('由于以下原因，Geocode没有成功：' + status))
        }
      })
    })
  }

  // 设置单个标记点
  async setMarker(marker) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
    const that = this
    let glyphImg
    if (marker?.img) {
      glyphImg = document.createElement('img')
      glyphImg.src = marker?.img
      glyphImg.classList.add('img-memark')
    }

    const markerElement = new AdvancedMarkerElement({
      position: { lat: marker?.lat, lng: marker?.lng },
      content: marker?.img ? glyphImg : null,
      map: that.#map,
    })
    if (this.#options.hasOwnProperty('markers')) {
      this.#options.markers.push(markerElement)
    }
    return markerElement
  }

  // 清除地图上的所有标记点
  async clearMarkers() {
    if (this.#options.hasOwnProperty('markers')) {
      this.#options.markers.forEach((marker) => {
        marker.setMap(null)
      })
      this.#options.markers = []
    }
  }

  // 给 marker 添加点击事件，点击之后可以显示信息窗口
  async addMarkerEvent(marker, placeInfo, index) {
    const content = this.createInfoWindowContent(placeInfo)
    const infoWindow = new google.maps.InfoWindow({
      content: content,
    })
    marker.addEventListener('click', (event) => {
      // event.stopPropagation() // 阻止事件冒泡
      infoWindow.open({
        anchor: marker,
        map: this.#map,
        shouldFocus: false,
      })
      // 调用有自定义的点击事件
      if (this.#options.needNavigation) {
        if (this.markerClick && typeof this.markerClick == 'function') {
          const dest = this.destination[index] || this.destination
          const originInfo = {
            title: this.origin?.title,
            lng: this.origin?.lng,
            lat: this.origin?.lat,
          }
          const markerInfo = {
            title: dest?.title,
            lng: dest?.lng,
            lat: dest?.lat,
          }
          this.markerClick(originInfo, markerInfo, index)
        }
      }
    })
  }

  // 定义好信息窗口的内容：字符串格式的 html，标题，描述，图片
  createInfoWindowContent(placeInfo) {
    return `
      <div class="info-window-content">
        <h3 class="info-window-title">${placeInfo?.displayName}</h3>
        ${placeInfo?.adrFormatAddress || `<p>${placeInfo?.formattedAddress || '未知地点'}</p>`}
        ${
          // placeInfo?.photos && placeInfo?.photos?.length
          //   ? `<div class="info-window-photos">
          //   ${placeInfo.photos
          //     .map(
          //       photo => `
          //     <img src="${photo?.getUrl({
          //       maxWidth: 100,
          //       maxHeight: 100,
          //     })}" alt="Place Photo" />
          //   `
          //     )
          //     .join('')}
          // </div>`
          //   :
          `<div><a class="jump-google" href="${placeInfo?.googleMapsURI}" target="_blank">去谷歌地图查看更多</a></div>`
        }
      </div>
    `
  }

  // 根据起点、终点、交通方式计算路线、距离、时间
  calculateRoute(origin, destination, travelMode = 'DRIVING') {
    const directionsService = new google.maps.DirectionsService()
    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
        },
        (response, status) => {
          if (status === 'OK') {
            resolve(response)
          } else {
            reject(new Error('Directions request failed due to ' + status))
          }
        }
      )
    })
  }

  // 绘制路线
  async drawRoute(options) {
    const { origin, destination, travelMode = 'DRIVING' } = options || {}
    const route = await this.calculateRoute(origin, destination, travelMode)
    await this.clearRoute()

    return new Promise((resolve) => {
      if (!route || !route.routes || route.routes.length === 0) {
        resolve('NO_RESULTS')
      } else {
        this.#directionsRenderer = new google.maps.DirectionsRenderer({
          map: this.#map,
          directions: route,
          suppressMarkers: true, // 不显示默认的起点和终点标记
        })
        resolve(route)
      }
    })
  }

  // 清除路线
  async clearRoute() {
    if (this.#directionsRenderer) {
      this.#directionsRenderer.setMap(null)
      this.#directionsRenderer = null
    }
  }

  // 移动地图到指定位置
  moveTo(lat, lng) {
    const newCenter = new google.maps.LatLng(Number(lat), Number(lng))
    this.#map.setCenter(newCenter)
  }
}

// 计算 zoom
function getZoom(origin, destination) {
  let maxDiff
  if (Array.isArray(destination)) {
    // 取出和origin的最大差值
    maxDiff = destination.reduce((max, dest) => {
      const latDiff = Math.abs(origin.lat) - Math.abs(dest.lat)
      const lngDiff = Math.abs(origin.lng) - Math.abs(dest.lng)
      return Math.max(max, latDiff, lngDiff)
    }, 0)
  } else {
    // 计算单个终点和起点的差值
    const latDiff = Math.abs(origin.lat - destination.lat)
    const lngDiff = Math.abs(origin.lng - destination.lng)
    maxDiff = Math.max(latDiff, lngDiff)
  }

  // 根据最大差值计算缩放级别
  const zoomMap = {
    0.01: 15,
    0.02: 14,
    0.04: 13,
    0.08: 11,
    0.16: 10,
    0.32: 9,
    0.64: 8,
    1.28: 7,
    2.56: 6,
    5.12: 5,
    10.24: 4,
    20.48: 3,
    40.96: 2,
    81.92: 1,
    163.84: 0,
  }
  // 根据maxDiff的值和zoomMap比较，向上拿到最大的值
  const zoomKeys = Object.keys(zoomMap).map(Number)
  const closeTomaxDiff = zoomKeys.reduce((prev, curr) => {
    return curr <= maxDiff ? curr : prev
  }, 0)
  return zoomMap[closeTomaxDiff] || 11 // 默认返回11
}

// 序列化参数
function enParams(params) {
  return encodeURIComponent(JSON.stringify(params))
}

// 反序列化
function decParams(params) {
  return JSON.parse(decodeURIComponent(params))
}

// 获取url参数
function getParameterFromUrl(key) {
  // 获取 URL 中 ? 后面的部分
  const queryString = window.location.search.slice(1)
  if (!queryString) return null
  // 分割参数对（如 "a=1&b=2" → ["a=1", "b=2"]）
  const paramPairs = queryString.split('&')
  // 遍历查找目标参数
  for (const pair of paramPairs) {
    const [paramKey, paramValue] = pair.split('=')
    if (paramKey === key) {
      // 找到目标参数，直接返回（此时还是编码后的字符串）
      return paramValue
    }
  }
  return null
}
