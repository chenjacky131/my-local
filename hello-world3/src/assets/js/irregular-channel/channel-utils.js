/*
 * @Author: jack chen
 * @Date: 2021-08-05 16:38:42
 * @LastEditTime: 2022-11-01 14:31:49
 * @LastEditors: ccw chenjacky131@gmail.com
 * @Description: In User Settings Edit
 */
import angleRadian from "./angleRadian"

let channelUtils = {
  /**
  * 根据一个经纬度及距离角度，算出另外一个经纬度
  * @param {*} lon 经度 113.3960698
  * @param {*} lat 纬度 22.941386
  * @param {*} brng 方位角 45 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
  * @param {*} dist 90000距离(米)
  */
  getLonAndLat(lon, lat, brng, dist) {
    //大地坐标系资料WGS-84 极坐标长半径a=6378137 极坐标短半径b=6356752.3142 扁率f=1/298.2572236
    var a = 6378137;
    var b = 6356752.314245179;
    var f = 1 / 298.257223563;
    var lon1 = lon * 1;
    var lat1 = lat * 1;
    var s = dist;
    var alpha1 = angleRadian.rad(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);
    var tanU1 = (1 - f) * Math.tan(angleRadian.rad(lat1));
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
      lon: lon1 + angleRadian.deg(L),
      lat: angleRadian.deg(lat2)
    }

    return lonLatObj;
  },
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
  },
  /**
   * @description: 航线所有方位的判断
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
            return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.halfAngle + param.angle1)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
          }
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.halfAngle + param.angle1)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle2 - param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle2 - param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      }
    } else if (param.angle1 >= 0 && param.angle1 <= 90) { //  线段一在东北角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二也在东北角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
          }
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      }
    } else if (param.angle1 >= 90 && param.angle1 <= 180) { //  线段一在东南角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二也在东南角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
          }
        }
      } else { //  线段二在西南角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      }
    } else { //  线段一在西南角
      if (param.angle2 >= 270 && param.angle2 <= 360) { //  线段二西北角
        if (type === 'halfAngle') {
          return (param.angle2 - param.angle1) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 0 && param.angle2 <= 90) { //  线段二在东北角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
        }
      } else if (param.angle2 >= 90 && param.angle2 <= 180) { //  线段二在东南角
        if (type === 'halfAngle') {
          return (360 - (param.angle1 - param.angle2)) / 2
        }else if(type === 'cornerAngle'){
          return (param.angle1 + param.halfAngle)
        }else if(type === 'bevelLength'){
          return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
        }
      } else { //  线段二也在西南角
        if (param.angle1 >= param.angle2) {
          if (type === 'halfAngle') {
            return (360 - (param.angle1 - param.angle2)) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle2 - param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(180 - param.halfAngle))
          }
        } else {
          if (type === 'halfAngle') {
            return (param.angle2 - param.angle1) / 2
          }else if(type === 'cornerAngle'){
            return (param.angle1 + param.halfAngle)
          }else if(type === 'bevelLength'){
            return (param.dis) / Math.sin(angleRadian.rad(param.halfAngle))
          }
        }
      }
    }
  },
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
  },
  resetMap(layer,type,codeCopy){ //  切换地图时重置经纬度
    if(([3,4,5,6].includes(type))&&[0,2].includes(codeCopy)){ //  从海图切换到地图或者卫星图
      let latlngs = ''
      for(let key in layer._layers){
        latlngs = layer._layers[key].getLatLngs()
        if(!layer._layers[key].oldLatlng2){
          layer._layers[key].oldLatlng2 = latlngs
        }
        let transformedLatlng = ''
        if(latlngs.length > 1){ //  航线
          transformedLatlng = latlngs.map(item => {
            const newLatlng = L.GPS.transform(item.lat, item.lng)
            return {
              lat: newLatlng[0],
              lng: newLatlng[1]
            }
          })
          if(transformedLatlng.length > 0){
            layer._layers[key].setLatLngs(transformedLatlng)
          }
        }else if(latlngs.length === 1){ //  航道
          let shipChannelInnerLatlng = latlngs[0][0]
          transformedLatlng = [[]]
          transformedLatlng[0][0] = shipChannelInnerLatlng.map(item => {
            const newLatlng = L.GPS.transform(item.lat, item.lng)
            return {
              lat: newLatlng[0],
              lng: newLatlng[1]
            }
          })
          if(transformedLatlng.length > 0){
            layer._layers[key].setLatLngs(transformedLatlng)
          }
        }
      }
    }else if((type===0 || type === 2)&&[0,2].includes(codeCopy)){ //  卫星图和地图之间互切
      return
    }else{  //  卫星图和地图切到海图
      for(let key in layer._layers){
        if(layer._layers[key].oldLatlng2){
          layer._layers[key].setLatLngs(layer._layers[key].oldLatlng2)
        }
      }
    }
  }
}
export default channelUtils
