<template>
  <div id="map">
    <!-- <DrawContainer ref="drawContainer" mapRef="map" /> -->
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import maplibregl from 'maplibre-gl';
import * as turf from "@turf/turf";
import {
  TerraDraw,
  TerraDrawPointMode,
  TerraDrawCircleMode,
  TerraDrawLineStringMode,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
  TerraDrawFreehandMode,
  TerraDrawRectangleMode,
  TerraDrawMapLibreGLAdapter,
  TerraDrawGreatCircleMode
} from 'terra-draw';
import { generateBigShipImage } from './hooks/useCanvasGenerateImage';
import { getMapRatio } from '../components/mymap/utils';
let dataMap = new Map();
let aniId = null;
const timeStampStep = 1/60; //  60分之一秒
let times = 10;  //  动画播放倍数
let iter = null;
const getModes = () => {
  const mainColor = 'rgb(251 176 59)';
  const selectedColor = 'rgb(255 0 0)';
  const selectedMidPointColor = 'green';
  const pointOutlineColor = 'white';
  const pointWidth = 4;
  const lineStringWidth = 4;
  const polygonOutlineWidth = 2;
  const circleOutlineWidth = 2;
  const pointOutlineWidth = 2;
  const opacity = 0.3;
  return [
    new TerraDrawSelectMode({
      flags: {
        arbitary: {
          feature: {},
        },
        polygon: {
          feature: {
            draggable: true,
            rotateable: true,
            scaleable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
          styles:{
            fillColor:'#f00'
          }
        },
        freehand: {
          feature: { draggable: true, coordinates: {} },
        },
        linestring: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },
        circle: {
          feature: {
            draggable: true,
          },
        },
        point: {
          feature: {
            draggable: true,
          },
        },
      },
      styles:{
        	// Point
        selectedPointColor: selectedColor,
        selectedPointWidth: pointWidth,
        selectedPointOutlineColor: pointOutlineColor,
        selectedPointOutlineWidth: pointOutlineWidth,
        // LineString
        selectedLineStringColor: selectedColor,
        selectedLineStringWidth: lineStringWidth,
        // Polygon
        selectedPolygonColor: selectedColor,
        selectedPolygonFillOpacity: opacity,
        selectedPolygonOutlineColor: selectedColor,
        selectedPolygonOutlineWidth: pointOutlineWidth,
        	// Selection Points (points at vertices of a polygon/linestring feature)
        selectionPointWidth: pointWidth,
        selectionPointColor: selectedColor,
        selectionPointOutlineColor: pointOutlineColor,
        selectionPointOutlineWidth: pointOutlineWidth,
        	// Mid points (points at mid point of a polygon/linestring feature)
        midPointColor: selectedMidPointColor,
        midPointOutlineColor: pointOutlineColor,
        midPointWidth: pointWidth,
        midPointOutlineWidth: pointOutlineWidth,
      }
    }),
    new TerraDrawPointMode({
      styles:{
        pointWidth: pointWidth,
        pointColor: mainColor,
        pointOutlineColor: pointOutlineColor,
        pointOutlineWidth: pointOutlineWidth
      }
    }),
    new TerraDrawLineStringMode({
      snapping: true,
      allowSelfIntersections: false,
      styles:{
        lineStringWidth: lineStringWidth,
        lineStringColor: mainColor,
        closingPointColor: mainColor,
        closingPointWidth: pointWidth,
        closingPointOutlineColor: pointOutlineColor,
        closingPointOutlineWidth: pointOutlineWidth,
      }
    }),
    new TerraDrawGreatCircleMode({ snapping: true }),
    new TerraDrawPolygonMode({
      snapping: true,
      allowSelfIntersections: false,
      styles:{
        fillColor: mainColor,
        outlineColor: mainColor,
        outlineWidth: polygonOutlineWidth,
        fillOpacity: opacity,
        closingPointWidth: pointWidth,
        closingPointColor: mainColor,
        closingPointOutlineWidth: pointOutlineWidth,
        closingPointOutlineColor: pointOutlineColor,
      }
    }),
    new TerraDrawRectangleMode(),
    new TerraDrawCircleMode({
      styles:{
        fillColor: mainColor,
        outlineColor: mainColor,
        outlineWidth: circleOutlineWidth,
        fillOpacity: opacity,
      }
    }),
    new TerraDrawFreehandMode()
  ];
};
const clearDraw = () => {
  window.$draw.start();
  window.$draw.stop();
}
const initDraw = (map) => {  //  初始化绘图工具
  const draw = new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({
      map,
      coordinatePrecision: 9
    }),
    modes: getModes(),
  });
  window.$draw = draw;
  draw.start();
  draw.setMode('linestring');
  draw.on('finish', (ids) => {
    const features = draw.getSnapshot();
    const coordinates = features[0].geometry.coordinates;
    console.log(features)
    draw.clear();
    draw.addFeatures([{
      "id": draw._store.getId(),
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": coordinates
      },
      "properties": {
        "mode": "linestring",
      }
    }]);
    draw.setMode('select');
  });
}
const loadImage = async (src) => {  //  加载图片
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    }
  });
}
const addShipIcon = async () => { //  添加船舶图标
  const map = window.$map;
  const lnglat = [118.10504072356139, 24.49370149987277];
  let ratio = getMapRatio(map);
  const zoom = map.getZoom();
  const _length = 2042/ratio > 2042 ? 2042 : 2042/ratio;
  const shipLength = _length;
  const shipIconName = `big-ship-${shipLength}-${zoom}`;
  const isImageExist = map.getImage(shipIconName);
  if(!isImageExist){
    const bigShipImage = generateBigShipImage(shipLength, '#ff0000', '#444444');
    const img = await loadImage(bigShipImage);
    map.addImage(shipIconName, img);    
  }
  const shipSource = map.getSource('shipSource');
  const data = {
    type: "FeatureCollection",
    features: [{
      type:'Feature',
      geometry: {
        type: 'Point',
        coordinates: lnglat
      },
      properties:{
        icon: shipIconName,
      }
    }],
  }
  if(!shipSource){
    map.addSource('shipSource', {
      type: 'geojson',
      data
    });    
  }else{
    shipSource.setData(data);
  }
  const shipLayer = map.getLayer('shipLayer');
  if(!shipLayer){
    map.addLayer({
      id: 'shipLayer',
      type: 'symbol',
      source: 'shipSource',
      layout: {
        "icon-image": ['get', 'icon'],
        "icon-size": 1,
        "icon-pitch-alignment": "map",
        "icon-rotation-alignment": "map",
        "icon-overlap": "always",
        "icon-rotate": 15,
      },
    })    
  }
}
const playbackAnimation = () => {
  const map = window.$map;
  const dataObj = iter.next();
  if(!dataObj.done){
    const data = dataObj.value[1];
    const geojson = {
      type: 'FeatureCollection',
      features: data
    }
    const source = map.getSource("shipsSource");
    source.setData(geojson);
    aniId = requestAnimationFrame(() => {
      playbackAnimation()
    }); 
  }else{
    cancelAnimationFrame(aniId);
    console.log('结束')
  }
}
const handleData = (obj) => {
  const {start, end, data} = obj;
  for(let i = start; i <= end; i+=times){
    let locationsArr = []
    data.map(shipLocations => {
      if(i === start){  //  开始时间点
        const _location = shipLocations[0];
        const {lon, lat, heading, course} = _location;
        locationsArr.push({
          type: 'Feature',
          properties:{
            ..._location,
            lon: lon / 600000,
            lat: lat / 600000,
            dir: heading && heading !== -1 ? heading : course / 10,
            icon: 'ship',
            posTime: i
          },
          geometry:{
            type: 'Point',
            coordinates: [lon / 600000, lat / 600000]
          }
        })
      }else{
        const existLocation = shipLocations.find(item => item.posTime === i);
        if(existLocation){
          const {lon, lat, mmsi} = existLocation;
          const thisPoint = [lon/600000, lat/600000];
          const lastSecondDatas = dataMap.get(`${i - times}-0`); //  上一秒的数据
          const lastPointObj = lastSecondDatas.find(feature => feature.properties.mmsi === mmsi); //  上一秒这艘船的feature数据
          const {lon: lastLon, lat: lasLat} = lastPointObj.properties;
          const lastPoint = [lastLon, lasLat];
          denserData(thisPoint, lastPoint, i, existLocation);//  先加密，再推下个点的数据进去
          //  往里推整秒的这条船的数据
          const dir = turf.bearing(turf.point(lastPoint), turf.point(thisPoint))
          locationsArr.push({
            type: 'Feature',
            properties:{
              ...existLocation,
              lon: lon / 600000,
              lat: lat / 600000,
              dir,
              icon: 'ship',
              posTime: i
            },
            geometry:{
              type: 'Point',
              coordinates: [lon / 600000, lat / 600000]
            }
          });
        }else{  //  当前时间点无数据，取上个时间点的数据
          let time = i - times;
          let lastMapData = dataMap.get(`${time}-0`);
          const mmsi = shipLocations[0].mmsi;
          const existLastLocation = lastMapData.find(item => item.properties.mmsi === mmsi);
          if(existLastLocation){
            const {lon, lat} = existLastLocation.properties;
            denserData([lon, lat], [lon,lat], i, existLastLocation.properties)
            locationsArr.push({
              type: 'Feature',
              properties:{
                ...existLastLocation.properties,
                icon: 'ship',
                posTime: i
              },
              geometry:{
                type: 'Point',
                coordinates: [lon, lat]
              }
            })
          }
        }
      }
    });
    dataMap.set(`${i}-0`, locationsArr);
  }
}
const denserData = (thisPoint, lastPoint, second, info) => {  //  加密数据
  const line = turf.lineString([lastPoint, thisPoint]);
  const from = turf.point(thisPoint);
  const to = turf.point(lastPoint);
  const distance = turf.distance(from, to); //  两点之间的距离
  const step = distance/60; //  距离分成60份
  if(step === 0){ //  如果上个点和这个点位置没变化
    for(let i = 1; i < 60; i++){
      const lnglat = thisPoint;
      const timeStamp = (second-times) + timeStampStep*(i);
      let timeStampData = dataMap.get(`${second-times}-${i}`);
      if(!timeStampData){
        timeStampData = []
      }
      timeStampData.push({
        type: 'Feature',
        properties:{
          ...info,
          lon: lnglat[0],
          lat: lnglat[1],
          icon: 'ship',
          posTime: timeStamp
        },
        geometry:{
          type: 'Point',
          coordinates: lnglat
        }
      });
      dataMap.set(`${second-times}-${i}`, timeStampData)
    }
    return
  }
  const along = turf.lineChunk(line,step);
  const pointsInBetween = []
  along.features.map((feature, i) => {
    if(i !== 0&&i<=60){
      const point = feature.geometry.coordinates[0];
      pointsInBetween.push(point);
    }
  });
  for(let i = 0; i < pointsInBetween.length; i++){
    if(i === 59){ //  有个别会多出一段，舍弃最后一段使所有数据长度保持同步
      break;
    }
    let dir = 0;
    if(i === 0){
      dir = info.dir
    }else{
      dir = turf.bearing(turf.point(pointsInBetween[i - 1]), turf.point(pointsInBetween[i]))
    }
    const lnglat = pointsInBetween[i];
    const timeStamp = (second-times) + timeStampStep*(i+1);
    let timeStampData = dataMap.get(`${second-times}-${i+1}`);
    if(!timeStampData){
      timeStampData = []
    }
    timeStampData.push({
      type: 'Feature',
      properties:{
        ...info,
        dir,
        lon: lnglat[0],
        lat: lnglat[1],
        icon: 'ship',
        posTime: timeStamp
      },
      geometry:{
        type: 'Point',
        coordinates: lnglat
      }
    });
    dataMap.set(`${second-times}-${i+1}`, timeStampData)
  }
}
const drawLineGapDoubleLine = (map) => {
  //  画双线
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      "line-gap-width": 10,
      "line-dasharray": [2, 4]
    }
  });
}
const drawTextAloneLine = (map) => {
  //  文字加到线上去
  map.addLayer({
    "id": "name",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              118.08484245696809,
              24.44185647899667
            ],
            [
              118.13951529126632,
              24.466977561876917
            ],
            [
              118.19418812556336,
              24.503939097416563
            ]
          ],
          "type": "LineString"
        }
      }
    },
    "layout": {
      "text-field": '测试',
      'symbol-spacing': 10000,
      'symbol-placement': 'line-center'
    }
  });
}
const drawDoubleLine = (map) => {
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      "line-dasharray": [2, 4]
    }
  });
  map.addLayer({
    "id": "route2",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      'line-offset': -10
    }
  });
}
const shipAnimation = (map) => {
  const startPoint = turf.point([118.041786248,24.404686234]);
  const speed = 100;  //  km/h
  const distance = speed*(5/3600);  //  5秒内走过的距离（千米）
  const bearing = 90;
  const options = {units: 'kilometers'};
  const destination = turf.destination(startPoint, distance, bearing, options);
  const line = turf.lineString([startPoint.geometry.coordinates, destination.geometry.coordinates]);
  const step = distance/300;
  const chunk = turf.lineChunk(line, step, {units: 'kilometers'});
  const dots = []
  chunk.features.map((feature,index) => {
    if(index === 0){  //  第一个feature
      dots.push(feature.geometry.coordinates[0]);
    }else{
      dots.push(feature.geometry.coordinates[1]);
    }
  });
  const dotsGeojson = {
    type: 'FeatureCollection',
    features: []
  }
  dotsGeojson.features = dots.map(dot => {
    const feature = {
      type: 'Feature',
      geometry:{
        coordinates: dot,
        type: 'Point'
      }
    }
    return feature;
  });
  map.addSource('shipSource', {
    type: 'geojson',
    data: dotsGeojson
  });
  map.addLayer({
    id: 'shipLayer',
    type: 'symbol',
    source: 'shipSource',
    layout: {
      "icon-image": 'shipIcon',
      "icon-size": 0.5,
      "icon-pitch-alignment": "map",
      "icon-rotation-alignment": "map",
      "icon-overlap": "always",
    },
  });
  let count = 0;
  function animate(){
    const source = map.getSource('shipSource');
    source.setData({
      type: 'FeatureCollection',
      features: [dotsGeojson.features[count]]
    });
    count++;
    if(count !== dotsGeojson.features.length){
      requestAnimationFrame(animate);
    }
  }
  animate();
}
/// 回放
const start = () => {
  playback.start();
}
const pause = () => {
  playback.pause();
}
const stop = () => {
  playback.stop();
}
let playback = null;  //  回放实例
onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [118.10529821563091, 24.49471688046323], // starting position [lng, lat]
    zoom: 12, // starting zoom
    maxPitch: 85, //  最大倾斜度
  });
  window.$map = map;
  window.$turf = turf;
  map.on('click', (e) => {
    console.log('当前点击的经纬度：',e.lngLat.toArray())
  });
  map.on('zoomend', (e) => {
    console.log('当前缩放等级：',e.target.getZoom())  
    const shipSource = map.getSource('shipSource');
    const data = {
      type: "FeatureCollection",
      features: [],
    }
    shipSource.setData(data);
    addShipIcon();
  });
  map.on('load', async () => {
    const area = [
      {
          "lon": 118.02130106,
          "lat": 24.408658693
      },
      {
          "lon": 118.131889865,
          "lat": 24.452087311
      },
      {
          "lon": 118.132315752,
          "lat": 24.492917239
      },
      {
          "lon": 118.099238485,
          "lat": 24.497955457
      },
      {
          "lon": 118.002703969,
          "lat": 24.490979409
      },
      {
          "lon": 118.02130106,
          "lat": 24.408658693
      }
    ]
    const transformArea = area.map(item => [item.lon, item.lat]);
    var polygon = turf.polygon([transformArea], { name: 'poly1' });
    const point = turf.point([118.18434827971515, 24.53993205211006])
    const inside = turf.booleanContains(polygon, point);
    console.log(inside)
  })
});
</script>
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
.btns {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
