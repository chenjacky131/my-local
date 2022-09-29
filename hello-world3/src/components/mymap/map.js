import {mapZoomCrs, TDLayer, satelliteLayer, mapLayer} from '@/constants'
import worldRequest from '@/views/fleet/mapMenu/world-canvas/world-request'

class MapInstance {
  static getInstance () {
    if (!MapInstance.instance) MapInstance.instance = new MapInstance()
    return MapInstance.instance
  }

  constructor () {
    if (this.$map) this.$map.remove()
    this.tempShowMarkIcons = [] // 临时展示的marker
  }

  initMap(center = [24.48146, 118.16517], zoom = 12, mapId = 'map', mapOptions = {},) {
    const mapDom = document.querySelector(`${mapId}`)
    mapDom && (mapDom.innerHTML = '')
    try {
      const isFrame = window.parent !== window
      this.$map = new L.map(`${mapId}`, {
        ...mapZoomCrs,
        center,
        zoom,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: isFrame ? 'center' : true,
        keyboard: false,
        zoomAnimation: false,
        fadeAnimation: true,
        // zoomSnap: 0.5,
        markerZoomAnimation: true,
        ...mapOptions
      })
      L.$_map = this.$map
      this.$map.createPane('popToolTipPane').style.zIndex = 420
      this.$map.createPane('anchorPane').style.zIndex = 400
      this.$map.getPane('tooltipPane').style.zIndex = 400
      L.Tooltip.include({
        getBounds () {
          const latLng = this.getLatLng()
          if (!latLng) return false
          const point = L.$_map.latLngToLayerPoint(latLng)
          const { direction } = this.options
          const offset = this.options.offset || [0, 0]
          const [oWidth, oHeight] = offset
          const width = this._contentNode.offsetWidth + oWidth
          const height = this._contentNode.offsetHeight + oHeight
          let topLeft, bottomRight
          if (direction === 'left') {
            topLeft = new L.Point(point.x - width, point.y + height / 2)
            bottomRight = new L.Point(point.x, point.y - height / 2)
          } else {
            topLeft = new L.Point(point.x + width, point.y + height / 2)
            bottomRight = new L.Point(point.x, point.y - height / 2)
          }
          return L.bounds(topLeft, bottomRight)
        }
      })

      L.Marker.include({
        _getBounds () {
          const latLng = this.getLatLng()
          const point = L.$_map.latLngToLayerPoint(latLng)
          const iconEl = this._icon ? this._icon.firstChild || this._icon : null
          let topLeft, bottomRight
          if (iconEl) {
            const width = iconEl.offsetWidth
            const height = iconEl.offsetHeight
            topLeft = new L.point(point.x - width / 2, point.y - height / 2)
            bottomRight = new L.point(point.x + width / 2, point.y + height / 2)
            return L.bounds(topLeft, bottomRight)
          }
          return null
        }
      })

      this.tempLayerGroup = L.featureGroup([])
      this.tempLayerGroup.addTo(L.$_map)
      this.$map.on('zoomend', () => {
        this.tempShowMarkIcons = [] // 每次zoomend，重置临时展示的markerIcon
        this.tempLayerGroup.clearLayers()
        this.otherTooltipReset()
        this.$map.eachLayer(layer => {
          if (layer.layerTypeName === 'area') this.checkTextBounds(layer)
          if (layer._text) {
            layer._removeTxtPath()
            const id = 'pathdef-' + L.Util.stamp(layer)
            layer._path.setAttribute('id', id)
            setTimeout(() => layer._setText())
          }
          // 是 marker 的进入
          if (layer instanceof L.Marker && !['camera', 'search'].includes(layer.layerTypeName)) {
            this.checkMarkerIconBounds(layer)
          }
        })
      })
      this.$map.on('moveend', e => {
        this.$map.eachLayer(layer => {
          if (layer._text) {
            layer._removeTxtPath() // 解决试图外的图层没有环绕文字的问题
            const id = 'pathdef-' + L.Util.stamp(layer)
            layer._path.setAttribute('id', id)
            layer._setText()
          }
        })
      })
      this.$map.addLayer = (...arg) => {
        const layer = arg[0]
        if (layer.layerTypeName) {
          if (layer.layerTypeName === 'area' || layer.layerTypeName === 'point') {
            setTimeout(() => this.checkTextBounds(layer))
          }
        }
        this.$map.__proto__.addLayer.call(this.$map, ...arg)
      }
      L.control.zoom({ position: 'bottomright' }).addTo(this.$map)
      this.resetBounds()
      return this
    } catch (err) {

    }
  }

  mapChange (code, model = {}) {
    try {
      if (window.parent === window) {
        window.currentMapAttr = { code, model }
        const iframeList = document.querySelectorAll('.map-popup iframe')
        iframeList.length && iframeList.forEach(iframe => {
          iframe.contentWindow.receiveMessage({
            data: {
              data: { code, model },
              eventType: 'changeMapTileLayer'
            }
          })
        })
      } else {
        code = window.parent.currentMapAttr.code
        model = window.parent.currentMapAttr.model
      }
    } catch (err) {
      console.log('给画中画设置参数 err', err)
    }
    this.clearExistTiles() // !!!改变底图模式之前，先清理掉上一次的底图
    if (typeof code === 'number') {
      const mapModelRender = this.mapModelType()
      mapModelRender[code](model) // mode在海图/白天模式会有 简洁 标准 完整
    } else if (typeof code === 'string') {
      this.drawCommonMapModel(code)
    }
    worldRequest.deBounceRequest && worldRequest.deBounceRequest()
    this.$map.eachLayer(layer => {
      if (layer.layerTypeName === 'area' || layer.layerTypeName === 'point') {
        setTimeout(() => this.checkTextBounds(layer))
      }
    })
    if (isFleetOrMapInMap) {
      anchorRange.resetMap()
    }
  }

  mapModelType () {
    return {
      0: () => this.plusLayer(mapLayer),
      2: () => this.plusLayer(satelliteLayer),
      3: (model) => {
        if (Object.keys(model).length) {
          const { elementModel } = model
          const mapUrl = this.getMapTilesURL(elementModel, true)
          // elementModel类型(plain -> 白天/简洁版、standard -> 白天/标准、complete -> 白天/完整)
          if (elementModel === 'complete' || elementModel === 'standard') {
            this.drawSeaMapDayType(mapUrl, { type: elementModel })
          } else {
            this.drawSeaMapDayType(mapUrl)
          }
        }
      },
    }
  }

  plusLayer (layer) {
    if (this.mapLayer) {
      this.$map.removeLayer(this.mapLayer)
      if (this.TDLayer) this.$map.removeLayer(this.TDLayer)
    }
    this.mapLayer = layer
    this.TDLayer = TDLayer
    Promise.resolve().then(() => this.$map.addLayer(this.mapLayer))
    Promise.resolve().then(() => this.$map.addLayer(TDLayer))
  }

  drawCommonMapModel (themeName) {
    const mapUrl = this.getMapTilesURL(themeName)
    this.mapLayer = new L.TileLayer(mapUrl, mapZoomCrs)
    this.TDLayer = TDLayer
    Promise.resolve().then(() => this.$map.addLayer(this.mapLayer))
    Promise.resolve().then(() => this.$map.addLayer(TDLayer))
  }

  drawSeaMapDayType (layerUrl, type = '') {
    this.mapLayer = new L.TileLayer(layerUrl, mapZoomCrs)
    Promise.resolve().then(() => this.$map.addLayer(this.mapLayer))
    if (type) { // 叠加天地图层
      this.TDLayer = TDLayer
      Promise.resolve().then(() => this.$map.addLayer(TDLayer))
    }
  }

  getMapTilesURL (name, isDay=false) { // 不是白天模式，走其他主题
    if (!isDay) return `https://img.cniship.com/tiles/${name}/standard/{z}/{y}/{x}.png`
    return `https://img.cniship.com/tiles/day/${name}/{z}/{y}/{x}.png`
  }

  clearExistTiles () { // 清底图
    if (this.mapLayer) this.$map.removeLayer(this.mapLayer)
    if (this.TDLayer) this.$map.removeLayer(this.TDLayer)
  }

  // 其他 tooltip 的隐藏和现实，防交叉
  otherTooltipReset () {
    const otherBoundsList = []
    const otherToolList = Object.values(this.$map._layers).filter(
      layer =>
        layer._tooltip && ['ship', 'moveMarker', 'typhoonMarker'].every(v => v !== layer.layerTypeName)
    )
    otherToolList.forEach(marker => {
      try {
        marker.toolOptions = marker._tooltip.options
        marker.toolContent = marker._tooltip._content
        marker.unbindTooltip().bindTooltip(marker.toolContent, marker.toolOptions)
        if (!marker.getTooltip().getBounds()) return console.log('不存在Bounds')
        const bound = marker.getTooltip().getBounds()
        const flag = otherBoundsList.some(b => b.intersects(bound))
        if (flag) {
          marker.closeTooltip()
        } else {
          otherBoundsList.push(bound)
          marker.unbindTooltip().bindTooltip(marker.toolContent, marker.toolOptions)
        }
      } catch (error) {
        console.log({ error })
      }
    })

    setTimeout(() => {

    }, 10)
  }

  // 检测中间文字的名字是否与区域碰撞
  checkTextBounds (layer) {
    setTimeout(() => {  //  延迟获取，防止范围获取有误
      try {
        if (layer._centerTxt && layer._centerTxt._icon) {
          const layBounds = layer.getBounds()
          const iconBounds = layer._centerTxt._getBounds()
          if(Number.isNaN(iconBounds.max.x)) return ;
          const latLngBottomRight = L.$_map.layerPointToLatLng(iconBounds.max)
          const latLngTopLeft = L.$_map.layerPointToLatLng(iconBounds.min)
          const nameBounds = L.latLngBounds(latLngTopLeft, latLngBottomRight)
          if (layBounds.contains(nameBounds)) {
            layer._centerTxt._icon.classList.remove('center-text-hidden')
          } else {
            layer._centerTxt._icon.classList.add('center-text-hidden')
          }
        }
      } catch (err) {
        console.log('检测中间文字的名字是否与区域碰撞 err', err)
      }
    }, 0);
  }

  // 检测图标之间是否存在区域碰撞
  checkMarkerIconBounds (layer) {
    const iconBounds = layer._getBounds()
    const isIntersect = this.tempShowMarkIcons.some(tempLayer => {
      const otherBounds = tempLayer._getBounds()
      if (otherBounds.intersects(iconBounds)) return true
    })
    if (isIntersect) {
      layer._icon.classList.add('mark-icon-hidden')
    } else {
      this.tempShowMarkIcons.push(layer)
      layer._icon.classList.remove('mark-icon-hidden')
    }
  }

  resetBounds () {
    let southWest = new L.latLng(-85, -360)
    let northEast = new L.latLng(85, 360)
    let bounds = new L.latLngBounds(southWest, northEast)
    this.$map.setMaxBounds(bounds)
  }
  removeItemLayer(key) {
    this.$map.eachLayer(function (layer) {
      const name = layer.options.layerName
      if (key===name) {
        layer.remove()
      }
    })
  }
}

export default new MapInstance()
export { MapInstance }
