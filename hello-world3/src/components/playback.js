import * as turf from "@turf/turf";
export class PlayBack{
  constructor(data, map){
    this.originalData = data;
    this.flatData = [];  //  扁平化的所有数据
    this.isPause = false;  //  是否停止播放
    this.animateId = null;  //  动画id
    this.map = map; //  地图实例
    this.curTime = data.start; //  当前播放的时间点
    this.startTime = data.start;  //  动画开始时间点
    this.endTime = data.end;  //  动画结束时间点
    this.times = 10; //  倍数
  }
  start(){  //  开始播放回放
    this.playback();
  }
  pause(){  //  暂停播放
    cancelAnimationFrame(this.animateId);
  }
  stop(){ //  停止回放
    cancelAnimationFrame(this.animateId);
    this.curTime = this.startTime;
  }
  getLocationByTime(t){  //  获取某个时间点的数据
    const features = [];
    //  找到当前时刻的位置点，如果没有，则用二分法找前后的时间
    this.originalData.data.map(shipLocations => { //  循环每艘船的数据
      let timeStamps = [],m;
      shipLocations.map(_locationInfo => {  //  取出这条船的时间戳数组
        const {posTime} = _locationInfo;
        timeStamps.push(posTime);
      });
      if(t === this.startTime){ //  第一个点
        const _locationInfo = shipLocations[0];
        const {lon,lat,heading,course} = _locationInfo;
        features.push({
          type: 'Feature',
          properties: {
            ..._locationInfo,
            lon: lon/600000,
            lat: lat/600000,
            icon: 'ship',
            dir: heading && heading !== -1 ? heading : course/10
          },
          geometry:{
            type: 'Point',
            coordinates: [lon/600000, lat/600000]
          }
        })
      }else{
        let left = 0, right = timeStamps.length - 1;
        while(right - left !== 1){
          m = parseInt((left+right) / 2);
          if(t > timeStamps[m]) left = m
          else right = m
        }
        let t0 = timeStamps[left];
        let t1 = timeStamps[right];
        let p0 = shipLocations.find(_locationInfo => _locationInfo.posTime === t0);
        let p1 = shipLocations.find(_locationInfo => _locationInfo.posTime === t1);
        let point0 = turf.point([p0.lon/600000, p0.lat/600000]);
        let point1 = turf.point([p1.lon/600000, p1.lat/600000]);
        const bearing = turf.bearing(point0, point1);
        let s = turf.distance(point0, point1);
        if(s <= 0){ //  上个点和下个点的距离不变
          features.push({
            type: 'Feature',
            properties:{
              lon: p0.lon/600000,
              lat: p0.lat/600000,
              icon: 'ship',
              dir: bearing
            },
            geometry:{
              type: 'Point',
              coordinates: point0.geometry.coordinates
            }
          })
        }else{
          const speed = s/(t1-t0);
          const step = speed*(t - t0);
          const thisPointFeature = turf.destination(point0, step, bearing);
          const geometry = thisPointFeature.geometry;
          features.push({
            type: 'Feature',
            properties:{
              lon: geometry.coordinates[0],
              lat: geometry.coordinates[1],
              icon: 'ship',
              dir: bearing
            },
            geometry: thisPointFeature.geometry,
          });         
        }
      }
    });
    return features;
  }
  playback(){
    this.animateId = requestAnimationFrame(() => {
      const data = this.getLocationByTime(this.curTime);
      const geojson = {
        type: 'FeatureCollection',
        features: data
      }
      const source = this.map.getSource("shipsSource");
      source.setData(geojson);
      this.curTime += this.times/60;
      if(this.curTime >= this.endTime){
        this.stop();
      }else{
        if(this.isPause){
          this.pause();
        }else{
          this.playback();
        }
      }
    });
  }
}