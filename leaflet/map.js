/*
 * @Author: jack
 * @Date: 2021-05-17 16:57:42
 * @LastEditTime: 2022-08-19 17:37:45
 * @LastEditors: ccw chencw@cniship.com
 * @Description: 地图脚本
 * @FilePath: \Local\leaflet\map.js
 */
var mapNumberUtil = {
  rad: function rad(d) {  //  角度转成弧度
    return d * Math.PI / 180.0;
  },
  deg: function deg(d) {  //  弧度转成角度
    return d * 180 / Math.PI
  }
};
/**
* 根据一个经纬度及距离角度，算出另外一个经纬度
* @param {*} lon 经度 113.3960698
* @param {*} lat 纬度 22.941386
* @param {*} brng 方位角 45 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
* @param {*} dist 90000距离(米)
*/
function getLonAndLat(lon, lat, brng, dist) {
  //大地坐标系资料WGS-84 极坐标长半径a=6378137 极坐标短半径b=6356752.3142 扁率f=1/298.2572236
  var a = 6378137;
  var b = 6356752.314245179;
  var f = 1 / 298.257223563;
  var lon1 = lon * 1;
  var lat1 = lat * 1;
  var s = dist;
  var alpha1 = mapNumberUtil.rad(brng);
  var sinAlpha1 = Math.sin(alpha1);
  var cosAlpha1 = Math.cos(alpha1);
  var tanU1 = (1 - f) * Math.tan(mapNumberUtil.rad(lat1));
  var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)),
    sinU1 = tanU1 * cosU1;
  var sigma1 = Math.atan2(tanU1, cosAlpha1);
  var sinAlpha = cosU1 * sinAlpha1;
  var cosSqAlpha = 1 - sinAlpha * sinAlpha;
  var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  var A = 1 + uSq / 16384 * (4096 + uSq * (- 768 + uSq * (320 - 175 * uSq)));
  var B = uSq / 1024 * (256 + uSq * (- 128 + uSq * (74 - 47 * uSq)));
  var sigma = s / (b * A),
    sigmaP = 2 * Math.PI;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    var cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    var sinSigma = Math.sin(sigma);
    var cosSigma = Math.cos(sigma);
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (- 1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (- 3 + 4 * sinSigma * sinSigma) * (- 3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
  var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (- 1 + 2 * cos2SigmaM * cos2SigmaM)));
  var revAz = Math.atan2(sinAlpha, -tmp); // final bearing
  var lonLatObj = {
    lon: lon1 + mapNumberUtil.deg(L),
    lat: mapNumberUtil.deg(lat2)
  }
  return lonLatObj;
}


class LeafnetMap {
  map = null
  mapboxAccessToken = 'pk.eyJ1IjoiY2hlbmphY2t5MTMxIiwiYSI6ImNrbnBic3Z6ZTAxbjUydm51c2t1eDV3aXoifQ.jGcoMhAq6utjY-yjQmF9pw'
  dangerArea = '[{\"lat\":24.452306420685087,\"lng\":118.17529678344728},{\"lat\":24.494178319293756,\"lng\":118.20362091064455},{\"lat\":24.480743332238646,\"lng\":118.24413299560548},{\"lat\":24.45465036499096,\"lng\":118.24619293212892},{\"lat\":24.440429766123334,\"lng\":118.20516586303712}]'
  instance
  constructor(container, latlan, options) {
    this.container = container
    this.center = latlan
    this.defaultZoom = options.zoom
    this.zoomControl = options.zoomControl
    this._createMap()
  }
  _createMap() {  //  创建地图
    let self = this
    this.map = L.map(document.querySelector(`#${this.container}`), {
      attributionControl: false,
      center: this.center,
      zoom: self.defaultZoom
    })
    this.map.on('click', (e) => {
      // console.log('点击点的经纬度:',e.latlng)
      // console.log('点击点的坐标:', L.CRS.EPSG3857.latLngToPoint(e.latlng, 18))
      // console.log('当前缩放等级:', this.map.getZoom())

      // console.log(this.IsPtInPoly(e.latlng.lng, e.latlng.lat, JSON.parse(this.dangerArea)) ? '在区域内' : '不再区域内')
    })
    if(this.zoomControl){
      this.map.on('zoomanim', (e) => {
        console.log('当前缩放级别:',e.zoom)
  
        // this.map.removeLayer(this.map.assist)
        // let latlngs = []
        // this.map.points.map(item => {
        //   console.log('pointToLatlng:', L.CRS.EPSG3857.unproject(item))
        //   latlngs.push(L.CRS.EPSG3857.unproject(item))
        // })
        // console.log('转换后的经纬度:',latlngs)
        // this.map.assist = L.polyline(latlngs, {color:'#f00'})
        // this.map.addLayer(this.map.assist)
        // console.log(L.version)
      })      
      this._addDrawToolBar()
    }

    this._addMapBoxTile()
  }
  _addMapBoxTile() {  //  添加地图图层
    const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: false,
      maxZoom: 18,
      minZoom: 1,
      id: 'mapbox/satellite-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this.mapboxAccessToken,
      detectRetina: true
    })
    tileLayer.addTo(this.map)
  }
  _addWmsTile() {  //  添加wms图层
    const nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
      layers: 'nexrad-n0r-900913',
      format: 'image/png',
      transparent: true,
      attribution: "Weather data © 2012 IEM Nexrad"
    });
    nexrad.addTo(this.map)
  }
  _addVideoLayer() {  // 添加视频图层
    const videoUrl = 'https://www.runoob.com/try/demo_source/movie.mp4',
      videoBounds = [[24.069036001915162, 117.49740600585939], [24.789228068907338, 118.62762451171876]];
    L.videoOverlay(videoUrl, videoBounds).addTo(this.map);
  }
  _addLineLayer() {  //  添加线段
    const latlng1 = [
      [24.42526977898437, 118.13770294189455],
      [24.470275545811756, 118.22799682617189],
      [24.551495208452366, 118.2997512817383]
    ]
    const latlng2 = [
      [24.553993442158802, 118.14937591552736],
      [24.515889973088104, 118.22937011718751],
      [24.477150011148677, 118.29254150390626]
    ]
    const latlngs = [
      [
        [24.42526977898437, 118.13770294189455],
        [24.470275545811756, 118.22799682617189],
        [24.551495208452366, 118.2997512817383]
      ],
      [
        [24.553993442158802, 118.14937591552736],
        [24.515889973088104, 118.22937011718751],
        [24.477150011148677, 118.29254150390626]
      ]
    ]
    return L.polyline(latlng2, { color: 'red', noClip: true })
    // zoom the map to the polyline
    // this.map.fitBounds(polyline.getBounds());
    // setTimeout(() => {
    //   polyline.remove() //  移除线段
    // }, 1000)
  }
  _addArrow() {  //  添加箭头
    const angle = this._getRotateAngle({ lat: 24.553993442158802, lng: 118.14937591552736 }, { lat: 24.515889973088104, lng: 118.22937011718751 })
    return L.marker([24.515889973088104, 118.22937011718751], {
      icon: L.icon({
        iconUrl: './static/arrow.png',
        iconSize: [20, 10],
        iconAnchor: [10, 5],
      }),
      rotateAngle: angle,
      rotateOrigin: '10px 5px'
    })
  }
  _addPolygon() {
    const latlngs = [[24.43808555733495, 118.15761566162111], [24.412765325831455, 118.21357727050783], [24.478712337272928, 118.29357147216798], [24.515577601787122, 118.21872711181642]]
    return L.polygon(latlngs, { color: 'red' })
  }
  /**
   * @description: 通过经纬度获取旋转的角度,0度为北边
   * @param {Object}} lnglat1:经纬度对象包括lng和lat属性
   * @param {Object}} lnglat2:经纬度对象包括lng和lat属性
   * @return {Number} 返回旋转角度
   */
  _getRotateAngle(lnglat1, lnglat2) {
    let course = 0;
    if (lnglat2.lng == lnglat1.lng) {
      if (lnglat2.lat > lnglat1.lat) {
        course = 0;
      } else {
        course = 180;
      }
    } else {
      let tan = Math.atan((lnglat2.lat - lnglat1.lat) / (lnglat2.lng - lnglat1.lng)) * 180 / Math.PI;

      if (tan > 0) {
        if ((lnglat2.lng - lnglat1.lng) < 0) {
          course = 270 - tan;
        } else {
          course = 90 - tan;
        }
      } else {
        if ((lnglat2.lng - lnglat1.lng) > 0) {
          course = -tan + 90;
        } else {
          course = 270 - tan;
        }
      }
    }
    return course;
  }
  /**
   * @description: 判断一个点是否在一个区域内(地理围栏算法)
   * @param {Number} ALon:这个点的经度
   * @param {Number} ALat:这个点的纬度
   * @param {Array} APoints:要判断的区域经纬度数组
   * @return {Boolean} 返回true或者false，既点是否在区域里面
   */
  IsPtInPoly(ALon, ALat, APoints) {
    let iSum = 0
    let dLon1
    let dLon2
    let dLat1
    let dLat2
    let dLon
    if (APoints.length < 3) return false

    const iCount = APoints.length
    for (let i = 0; i < iCount; i++) {
      if (i == iCount - 1) {
        dLon1 = APoints[i].lng
        dLat1 = APoints[i].lat
        dLon2 = APoints[0].lng
        dLat2 = APoints[0].lat
      } else {
        dLon1 = APoints[i].lng
        dLat1 = APoints[i].lat
        dLon2 = APoints[i + 1].lng
        dLat2 = APoints[i + 1].lat
      }
      //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
      if (((ALat >= dLat1) && (ALat < dLat2)) || ((ALat >= dLat2) && (ALat < dLat1))) {
        if (Math.abs(dLat1 - dLat2) > 0) {
          //得到 A点向左射线与边的交点的x坐标：
          dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - ALat)) / (dLat1 - dLat2)
          if (dLon < ALon)
            iSum++
        }
      }
     }
    if (iSum % 2 != 0)
      return true
    return false
  }
  /**
   * @description: 
   * @param {Object} param:需要求的函数的参数对象
   * @param {String} type:需要求的函数名称(halfAngle:对角线一半的角度,cornerAngle:对角线的地理角度,bevelLength:对角线的长度)
   * @return {Number} 返回对应函数需要的数据
   */
  _allDirection(param, type) {
    if (param.angle1 >= 270 && param.angle1 <= 360) { //  线段一在西北角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二也在西北角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.halfAngle - (360 - param.angle1))
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.halfAngle + param.angle1)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
          }
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.halfAngle + param.angle1)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle2 - param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle2 - param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      }
    } else if (param.angle1 >= 0 && param.angle1 <= 90) { //  线段一在东北角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二也在东北角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
          }
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      }
    } else if (param.angle1 >= 90 && param.angle1 <= 180) { //  线段一在东南角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二也在东南角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
          }
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      }
    } else { //  线段一在西南角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角        
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
        }
      } else { //  线段二也在西南角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle2 - param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis / 2) / Math.sin(mapNumberUtil.rad(param.halfAngle))
          }
        }
      }
    }
  }
  /**
   * @description: 修正地理角度
   * @param {Number} deg: 数学角度
   * @return {Number} 修正后的地理角度
   */  
  _fixDeg(deg){
    if(deg > 360){
      return deg - 360
    }else if(deg < 0){
      return deg + 360
    }else{
      return deg
    }
  }
  _addDrawToolBar() {  //  增加绘制工具条
    L.drawLocal.draw.toolbar.buttons = {
      polygon: '多边形',
      polyline: '折线',
      rectangle: '正方形',
      circle: '圆形',
      marker: '标记点',
      circlemarker: '圆形标记点'
    }
    // FeatureGroup 用来存储可编辑的层
    const drawnItems = new L.FeatureGroup()
    this.map.addLayer(drawnItems)
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });
    this.map.addControl(drawControl)
    let tempAreaArr = []  //  存放航道边界区域的点
    let tempArr = []  //  存放航线中线点的数组
  }
}
window.onload = () => {
  const latlngXiamen = L.latLng([24.471388765957105, 118.10761928558351])
  const latlngTaiwang = L.latLng(23.89305, 121.2561)
  const myMap1 = new LeafnetMap('mapid', latlngXiamen, {
    zoom: 12,
    zoomControl: true
  })
  // const myMap2 = new LeafnetMap('map2', latlngTaiwang, {
  //   zoom: 7,
  //   zoomControl: false
  // })
  console.log(myMap1.map.distance(latlngXiamen, latlngTaiwang))
  // myMap1.map.sync(myMap2.map);
  // myMap2.map.sync(myMap1.map);
  // myMap
  // .map.off("draw:created")
  // .on("draw:created", function (event) {
  //   myMap.map.boundary = event.layer
  //   myMap.map.addLayer(myMap.map.boundary)
  //   const latlngs = event.layer.getLatLngs()
  //   let points = []
  //   let transLatlngs = []
  //   latlngs.map(item => {
  //     const latlng = getLonAndLat(item.lng, item.lat, 90, 1000)
  //     transLatlngs.push(L.latLng(latlng.lat, latlng.lon))
  //     points.push(L.CRS.EPSG3857.project(L.latLng(latlng.lat, latlng.lon)))
  //   })
  //   myMap.map.points = points  
  //   myMap.map.assist = L.polyline(transLatlngs, {color:'#f00'})  
  //   console.log(myMap.map.assist)
  //   myMap.map.addLayer(myMap.map.assist)
  // });
}