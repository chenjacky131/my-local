<template>
  <div id="map">
    <!-- <DrawContainer ref="drawContainer" mapRef="map" /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
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
  const ratio = getMapRatio(map);
  const lnglat = [118.10158203340853,24.48492800663155];
  const zoom = map.getZoom();
  const shipLength = 100/ratio;
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
        "icon-size": 0.5,
        "icon-pitch-alignment": "map",
        "icon-rotation-alignment": "map",
        "icon-overlap": "always",
      },
    })    
  }
}
onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [118.190445, 24.498133], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });
  window.$map = map;
  window.$turf = turf;
  map.on('click', (e) => {
    // console.log(e)
  })
  map.on('load', async function () {
    const img = require('./follow-ship.png');
    const imgRes = await loadImage(img);
    map.addImage('shipIcon', imgRes);
    shipAnimation(map);
  });
  map.on('style.load', () => {
  });
  map.on('zoomend', () => {
  });
});
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
</script>
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
</style>
