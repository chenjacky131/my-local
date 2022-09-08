/*
 * @Author: ccw chencw@cniship.com
 * @Date: 2022-08-29 17:01:44
 * @LastEditors: ccw chencw@cniship.com
 * @LastEditTime: 2022-08-29 17:28:56
 * @FilePath: \small-ship-web\src\views\fleet\mapMenu\mark\utils\latLatUtils.js
 * @Description: 经纬度计算的一些工具函数
 */
/**
 * @description: 根据相对于当前经纬度的方位角和距离计算出另一个点
 * @param {*} latLng 经纬度对象 {lat: 24.0, lng: 118.0}
 * @param {*} angle 方位角 ---- 正北方：000°或360° 正东方：090° 正南方：180° 正西方：270°
 * @param {*} distance 距离 100米
 * @return {*} 经纬度对象 {lat: 24.0, lng: 118.0}
 */
export const calcLatLngByAngleAndDistance = (latLng, angle, distance) => {
  //大地坐标系资料WGS-84 极坐标长半径a=6378137 极坐标短半径b=6356752.3142 扁率f=1/298.2572236
  let a = 6378137;
  let b = 6356752.314245179;
  let f = 1 / 298.257223563;
  let lon1 = latLng.lng * 1;
  let lat1 = latLng.lat * 1;
  let s = distance;
  let alpha1 = angleRadian.rad(angle);
  let sinAlpha1 = Math.sin(alpha1);
  let cosAlpha1 = Math.cos(alpha1);
  let tanU1 = (1 - f) * Math.tan(angleRadian.rad(lat1));
  let cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)),
    sinU1 = tanU1 * cosU1;
  let sigma1 = Math.atan2(tanU1, cosAlpha1);
  let sinAlpha = cosU1 * sinAlpha1;
  let cosSqAlpha = 1 - sinAlpha * sinAlpha;
  let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  let A = 1 + uSq / 16384 * (4096 + uSq * (- 768 + uSq * (320 - 175 * uSq)));
  let B = uSq / 1024 * (256 + uSq * (- 128 + uSq * (74 - 47 * uSq)));
  let sigma = s / (b * A),
    sigmaP = 2 * Math.PI;
  let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (- 1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (- 3 + 4 * sinSigma * sinSigma) * (- 3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  let lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
  let C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  let L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (- 1 + 2 * cos2SigmaM * cos2SigmaM)));
  // let revAz = Math.atan2(sinAlpha, -tmp); // final bearing
  let lonLatObj = {
    lng: lon1 + angleRadian.deg(L),
    lat: angleRadian.deg(lat2)
  }

  return lonLatObj;
}
/**
 * @description: 角度弧度转换对象
 */
export const angleRadian = {
  rad: function rad(d) {  //  角度转成弧度
    return d * Math.PI / 180.0;
  },
  deg: function deg(d) {  //  弧度转成角度
    return d * 180 / Math.PI
  }
}
/**
 * @description: 计算经纬度2相对于经纬度1的方位角
 * @param {*} latLng_1  经纬度对象 {lat: 24.0, lng: 118.0}
 * @param {*} latLng_2 经纬度对象 {lat: 24.0, lng: 118.0}
 * @return {*} 方位角 ---- 正北方：0或360 正东方：90 正南方：180 正西方：270
 */
export const calcLatLngAngle = (latLng_1, latLng_2) => {
  let course = 0;
  if (latLng_2.lng == latLng_1.lng) {
    if (latLng_2.lat > latLng_1.lat) {
      course = 0;
    } else {
      course = 180;
    }
  } else {
    let tan = Math.atan((latLng_2.lat - latLng_1.lat) / (latLng_2.lng - latLng_1.lng)) * 180 / Math.PI;

    if (tan > 0) {
      if ((latLng_2.lng - latLng_1.lng) < 0) {
        course = 270 - tan;
      } else {
        course = 90 - tan;
      }
    } else {
      if ((latLng_2.lng - latLng_1.lng) > 0) {
        course = -tan + 90;
      } else {
        course = 270 - tan;
      }
    }
  }
  return course;
}
