/*
 * @Author: jack
 * @Date: 2021-05-17 16:57:42
 * @LastEditTime: 2021-08-04 15:56:05
 * @LastEditors: Please set LastEditors
 * @Description: 地图脚本
 * @FilePath: \Local\leaflet\map.js
 */
var mapNumberUtil = {
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  deg: function deg(d) {
    return d * 180/ Math.PI
  }
};
/**
* 根据一个经纬度及距离角度，算出另外一个经纬度
* @param {*} lon 经度 113.3960698
* @param {*} lat 纬度 22.941386
* @param {*} brng 方位角 45 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
* @param {*} dist 90000距离(米)
*/
function getLonAndLat (lon, lat, brng, dist) {
  //大地坐标系资料WGS-84 极坐标长半径a=6378137 极坐标短半径b=6356752.3142 扁率f=1/298.2572236
  var a = 6378137;
  var b = 6356752.3142;
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
  var A = 1 + uSq / 16384 * (4096 + uSq * ( - 768 + uSq * (320 - 175 * uSq)));
  var B = uSq / 1024 * (256 + uSq * ( - 128 + uSq * (74 - 47 * uSq)));
  var sigma = s / (b * A),
  sigmaP = 2 * Math.PI;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    var cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    var sinSigma = Math.sin(sigma);
    var cosSigma = Math.cos(sigma);
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * ( - 1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * ( - 3 + 4 * sinSigma * sinSigma) * ( - 3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
  var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  var L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * ( - 1 + 2 * cos2SigmaM * cos2SigmaM)));
  var revAz = Math.atan2(sinAlpha, -tmp); // final bearing
  var lonLatObj = {
    lon: lon1 + mapNumberUtil.deg(L),
    lat: mapNumberUtil.deg(lat2)
  }
  
  return lonLatObj;
}

const proto_setPos = L.Marker.prototype._setPos
L.Marker.include({
  _setPos: function (pos) { //  设置船朝向
    proto_setPos.call(this, pos)
    if (this.options.rotateAngle) {
      this._icon.style[
        L.DomUtil.TRANSFORM + 'Origin'
      ] = this.options.rotateOrigin
      this._icon.style[L.DomUtil.TRANSFORM] +=
        ' rotateZ(' + this.options.rotateAngle + 'deg)'
    }
  },
  _setRotateAngle: function (angle) {
    this.options.rotateAngle = angle
    this.update()
    return this
  },
  _setRotateOrigin: function (origin) {
    this.options.rotateOrigin = origin
    this.update()
    return this
  }
})

class LeafnetMap {
  map = null
  mapboxAccessToken = 'pk.eyJ1IjoiY2hlbmphY2t5MTMxIiwiYSI6ImNrbnBic3Z6ZTAxbjUydm51c2t1eDV3aXoifQ.jGcoMhAq6utjY-yjQmF9pw'
  dangerArea = '[{\"lat\":24.452306420685087,\"lng\":118.17529678344728},{\"lat\":24.494178319293756,\"lng\":118.20362091064455},{\"lat\":24.480743332238646,\"lng\":118.24413299560548},{\"lat\":24.45465036499096,\"lng\":118.24619293212892},{\"lat\":24.440429766123334,\"lng\":118.20516586303712}]'
  constructor(container, latlan) {
    this.container = container
    this.center = latlan
    this._createMap()
  }
  _createMap() {  //  创建地图
    this.map = L.map(document.querySelector(`#${this.container}`), {
      attributionControl: false,
      center: this.center,
      zoom: 12
    })
    this.map.on('click', (e) => {
      // console.log('点击点的经纬度:',e.latlng)
      // console.log('点击点的坐标:', L.CRS.EPSG3857.latLngToPoint(e.latlng, 18))
      // console.log('当前缩放等级:', this.map.getZoom())

      // console.log(this.IsPtInPoly(e.latlng.lng, e.latlng.lat, JSON.parse(this.dangerArea)) ? '在区域内' : '不再区域内')
    })
    this.map.on('zoomanim', (e) => {
      // console.log('当前缩放级别:',e.zoom)
      // console.log(L.version)
    })
    this._addMapBoxTile()
    this._addDrawToolBar()
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
   * @description: 获取夹角一半函数
   * @param {Number} angle1:第一条线段的角度
   * @param {Number} angle2:第二条线段的角度
   * @return {Number} 返回夹角的一半
   */  
  _getHalfAngle(angle1, angle2){
    if(((angle1 >= 180 && angle1 <= 270) && (angle2 >= 90 && angle2 <= 180))){ // 往北画 线段一在180和270之间并且线段二在90和180之间
      return (360 - (angle1 - angle2)) / 2
    }else if(((angle2 >= 180 && angle2 <= 270) && (angle1 >= 90 && angle1 <= 180))){ // 往北画 线段二在180和270之间并且线段一在90和180之间
      return (360 - (angle2 - angle1)) / 2
    }else if(((angle2 >= 180 && angle2 <= 270) && (angle1 >= 180 && angle1 <= 270))){ // 往北画 线段二和线段一都在180和270之间
      if(angle1 >= angle2){
        return (360 - (angle1 - angle2)) / 2
      }else{
        return (360 - (angle2 - angle1)) / 2
      }
    }else if(((angle2 >= 90 && angle2 <= 180) && (angle1 >= 90 && angle1 <= 180))){ // 往北画 线段二和线段一都在90和180之间
      if(angle1 >= angle2){
        return (360 - (angle1 - angle2)) / 2
      }else{
        return (360 - (angle2 - angle1)) / 2
      }
    }else if(((angle1 >= 270 && angle1 <= 360) && (angle2 >= 0 && angle2 <= 90))){ //  往南画  线段一在270和360之间并且线段二在0和90之间
      return (360 - (angle1 - angle2)) / 2
    }else if(((angle1 >= 0 && angle1 <= 90) && (angle2 >= 270 && angle2 <= 360))){ //  往南画  线段一在0和90之间并且线段二在270和360之间
      return (360 - (angle2 - angle1)) / 2
    }else if(((angle1 >= 270 && angle1 <= 360) && (angle2 >= 270 && angle2 <= 360))){ //  往南画  线段一线段二都在270和360之间
      if(angle1 >= angle2){
        return (360 - (angle1 - angle2)) / 2
      }else{
        return (angle2 - angle1) / 2
      }
    }else if(((angle1 >= 0 && angle1 <= 90) && (angle2 >= 0 && angle2 <= 90))){ //  往南画  线段一线段二都在0和90之间
      if(angle1 >= angle2){
        return (360 - (angle1 - angle2)) / 2
      }else{
        return (angle2 - angle1) / 2
      }
    }
  }
  /**
   * @description: 获取夹角的的地理角度
   * @param {Number} angle1:第一条线段的角度
   * @param {Number} angle2:第二条线段的角度
   * @param {Number} halfAngle: 夹角的一半，数学角度
   * @return {Number} 夹角的地理角度
   */  
  _getCornerAngle(angle1, angle2, halfAngle){
    if(halfAngle*2 <= 90){
      if(angle1 <= angle2){ //  从北往南画
        return angle2 - halfAngle
      }else{  //  从南往北画
        return angle2 + halfAngle
        // return angle1 + halfAngle
      }
    }else{
      if(angle1 <= angle2){
        return angle2 - halfAngle
      }else{
        return angle2 + halfAngle
      }
    }
  }
  /**
   * @description: 获取夹角处的线段长度
   * @param {Number} dis:航道宽度
   * @param {Number} angle1:第一条线段的角度
   * @param {Number} angle2:第二条线段的角度
   * @param {Number} pointAngelCorner:夹角的地理角度
   * @return {Number}夹角处的线段长度
   */  
  _getBevelLength(dis, angle1, angle2, pointAngelCorner,halfAngle){
    if(halfAngle <= 90){
      return (dis / 2) / Math.sin(angle2 - pointAngelCorner)
    }else{
      return (dis / 2) / Math.sin(halfAngle)
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
    // this._addLineLayer().addTo(drawnItems)
    // this._addArrow().addTo(drawnItems)
    // this._addPolygon().addTo(drawnItems)
    this.map.addLayer(drawnItems)
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });
    this.map.addControl(drawControl)
    let tempAreaArr = []  //  存放区域的点
    this.map.on(L.Draw.Event.DRAWVERTEX, (e) => {
      let tempArr = []  //  存放点的数组
      let lastPoint = ''  //  上个点
      let thisPoint = ''  //  这个点
      let lastLastPoint = ''  //  上两个点
      let targetPoint1Up = '' //  航线扩展点上部分
      let targetPoint1Down = '' //  航线扩展点下部分
      let targetPoint2Up = '' //  航线扩展点上部分
      let targetPoint2Down = '' //  航线扩展点下部分
      let pointAngle = 0 // 起点和终点的角度
      let pointAngelCorner = 0  //  拐角的角度
      let dis = 2000  //  航道宽度
      for (let key in e.layers._layers) {
        tempArr.push(e.layers._layers[key]._latlng)
      }
      if (tempArr.length >= 2) {  //  当点超过两个的时候才开始画航线
        for (let i = 0; i < tempArr.length; i++) {
          if (i === tempArr.length - 2) { //  新增线段的起点
            lastPoint = tempArr[i]
          }
          if (i === tempArr.length - 1) { //  新增线段的终点
            thisPoint = tempArr[i]
          }
          if (tempArr.length >= 3 && i === tempArr.length - 3){ //  新增线段前置的点
            lastLastPoint = tempArr[i]
          }
        }
        if(tempArr.length === 2){ //  航线只有两个点的时候
          pointAngle = this._getRotateAngle(lastPoint, thisPoint) <= 90 ? this._getRotateAngle(lastPoint, thisPoint) - 90 + 360 :  this._getRotateAngle(lastPoint, thisPoint) - 90  //  垂直于航线的角度
          targetPoint1Up = getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngle, dis / 2)
          targetPoint1Down = getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, dis / 2)
          targetPoint2Up = getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle, dis / 2)
          targetPoint2Down = getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, dis / 2)
        }else{  //  航线超过两个点后
          pointAngle = this._getRotateAngle(lastPoint, thisPoint) <= 90 ? this._getRotateAngle(lastPoint, thisPoint) - 90 + 360 :  this._getRotateAngle(lastPoint, thisPoint) - 90  //  垂直于航线的角度          
          console.log('末端航线中线到边界的地理角度：', pointAngle)
          let angle1 = this._getRotateAngle(lastPoint, lastLastPoint)
          let angle2 = this._getRotateAngle(lastPoint, thisPoint)
          console.log('中间点到起点的地理角度:', angle1,'中间点到终点的地理角度:', angle2)
          let halfAngle = this._getHalfAngle(angle1, angle2) //  得判断

          console.log('对角线角度:', halfAngle*2)
          let bevelLength = 0
          pointAngelCorner =  this._getCornerAngle(angle1, angle2, halfAngle) //  得判断
          console.log('对角线的地理角度:', pointAngelCorner)
          bevelLength =  Math.abs(this._getBevelLength(dis, angle1, angle2, pointAngelCorner, halfAngle))  // 得判断
          console.log('对角线长度:', bevelLength)
          //  折角
          targetPoint1Up = getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner, bevelLength)
          targetPoint1Down = getLonAndLat(lastPoint.lng, lastPoint.lat, pointAngelCorner >= 180 ? pointAngelCorner - 180 : pointAngelCorner + 180, bevelLength)
          L.marker(targetPoint1Down).addTo(this.map)
          //  折角结束
          targetPoint2Up = getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle, dis / 2)
          targetPoint2Down = getLonAndLat(thisPoint.lng, thisPoint.lat, pointAngle >= 180 ? pointAngle - 180 : pointAngle + 180, dis / 2)
        }        
        tempAreaArr.push([
          targetPoint1Up,
          targetPoint2Up,
          targetPoint2Down,
          targetPoint1Down
        ])
        if(tempAreaArr.length >= 2){  //  过滤掉非终点的末端的扩展点
          tempAreaArr = tempAreaArr.map((item, index) => {
            if(index === tempAreaArr.length - 1){
              return item
            }else if(index === tempAreaArr.length - 2){
              return [
                item[0],
                item[3]
              ]
            }else{  //  已经过滤过的数据直接返回
              return item
            }
          })
        }
        let latlngs = []
        if(tempAreaArr.length === 1){ //  航线只有两个点的时候
          latlngs.push(tempAreaArr[0][0])
          latlngs.push(tempAreaArr[0][1])
          latlngs.push(tempAreaArr[0][2])
          latlngs.push(tempAreaArr[0][3])
        }else{
          for(let i = 0; i < tempAreaArr.length; i++){  //  正向取航线上面的点
            if(i === tempAreaArr.length - 1){
              latlngs.push(tempAreaArr[i][0])
              latlngs.push(tempAreaArr[i][1])
              latlngs.push(tempAreaArr[i][2])
              latlngs.push(tempAreaArr[i][3])
            }else{
              latlngs.push(tempAreaArr[i][0])
            }
          }
          for(let i = tempAreaArr.length - 2; i >= 0 ; i--){ //  逆向取航线下面的点
            latlngs.push(tempAreaArr[i][1])
          }          
        }
        latlngs.push(tempAreaArr[0][0]) //  封闭多边形
        for(let key in drawnItems._layers){ //  移除上两个点绘制的多边形，重新绘制
          drawnItems.removeLayer(drawnItems._layers[key])
        }
        drawnItems.addLayer(L.polygon(latlngs, {color: 'red'}))
      }
    })
  }
}
window.onload = () => {
  const latlngXiamen = L.latLng([24.471388765957105, 118.10761928558351])
  const myMap = new LeafnetMap('mapid', latlngXiamen)
  // console.log(L.drawLocal)
}