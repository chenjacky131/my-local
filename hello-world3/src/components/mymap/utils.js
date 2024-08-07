import * as turf from '@turf/turf';
export const addMapBoxTile = (map) => {
  //  添加地图图层
  const tileLayer = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: false,
      maxZoom: 18,
      minZoom: 1,
      id: "mapbox/satellite-v9",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiY2hlbmphY2t5MTMxIiwiYSI6ImNrbnBic3Z6ZTAxbjUydm51c2t1eDV3aXoifQ.jGcoMhAq6utjY-yjQmF9pw",
      detectRetina: true,
    }
  );
  tileLayer.addTo(map);
};
export const addArrowHead = (map) => {
  //  添加箭头
  var polyline = L.polyline([
    { lat: 24.430583796336172, lng: 118.05084228515626 },
    { lat: 24.505112714431142, lng: 118.18405151367189 },
  ]).addTo(map);
  var decorator = L.polylineDecorator(polyline, {
    patterns: [
      {
        offset: 50,
        repeat: 200,
        symbol: L.Symbol.arrowHead({
          pixelSize: 10,
          polygon: false,
          pathOptions: { stroke: true },
        }),
      },
    ],
  }).addTo(map);
};
export const addImageArrow = (map) => {
  //  添加图标箭头
  var polyline = L.polyline([
    { lat: 24.430583796336172, lng: 118.05084228515626 },
    { lat: 24.505112714431142, lng: 118.18405151367189 },
  ]).addTo(map);
  var decorator = L.polylineDecorator(polyline, {
    patterns: [
      {
        offset: 50,
        repeat: 200,
        symbol: L.Symbol.marker({
          rotate: true,
          markerOptions: {
            icon: L.icon({
              iconUrl: require("@/assets/logo.png"),
              iconAnchor: [5, 5],
              iconSize: [10, 10],
            }),
          },
        }),
      },
    ],
  }).addTo(map);
};
export const addTextToPath = (map) => {
  //  添加环绕文字
  var layer = L.polyline([
    { lat: 24.515421415845374, lng: 118.10646057128906 },
    { lat: 24.39369364986622, lng: 118.11195373535158 },
  ]).addTo(map);
  layer.setText("我是文字", {
    offset: 20,
    below: false,
    center: true,
    repeat: false,
    orientation: "flip",
    attributes: {
      fill: "red",
      "font-size": 14,
    },
  });
};
export const addHeatMap = (map) => {
  var testData = {
    max: 8,
    data: [
      { lat: 24.6408, lng: 46.7728, count: 3 },
      { lat: 50.75, lng: -1.55, count: 1 },
      { lat: 52.6333, lng: 1.75, count: 1 },
      { lat: 48.15, lng: 9.4667, count: 1 },
      { lat: 52.35, lng: 4.9167, count: 2 },
      { lat: 60.8, lng: 11.1, count: 1 },
      { lat: 43.561, lng: -116.214, count: 1 },
      { lat: 47.5036, lng: -94.685, count: 1 },
      { lat: 42.1818, lng: -71.1962, count: 1 },
      { lat: 42.0477, lng: -74.1227, count: 1 },
      { lat: 40.0326, lng: -75.719, count: 1 },
      { lat: 40.7128, lng: -73.2962, count: 2 },
      { lat: 27.9003, lng: -82.3024, count: 1 },
      { lat: 38.2085, lng: -85.6918, count: 1 },
      { lat: 46.8159, lng: -100.706, count: 1 },
      { lat: 30.5449, lng: -90.8083, count: 1 },
      { lat: 44.735, lng: -89.61, count: 1 },
      { lat: 41.4201, lng: -75.6485, count: 2 },
      { lat: 39.4209, lng: -74.4977, count: 1 },
      { lat: 39.7437, lng: -104.979, count: 1 },
      { lat: 39.5593, lng: -105.006, count: 1 },
      { lat: 45.2673, lng: -93.0196, count: 1 },
      { lat: 41.1215, lng: -89.4635, count: 1 },
      { lat: 43.4314, lng: -83.9784, count: 1 },
      { lat: 43.7279, lng: -86.284, count: 1 },
      { lat: 40.7168, lng: -73.9861, count: 1 },
      { lat: 47.7294, lng: -116.757, count: 1 },
      { lat: 47.7294, lng: -116.757, count: 2 },
      { lat: 35.5498, lng: -118.917, count: 1 },
      { lat: 34.1568, lng: -118.523, count: 1 },
      { lat: 39.501, lng: -87.3919, count: 3 },
      { lat: 33.5586, lng: -112.095, count: 1 },
      { lat: 38.757, lng: -77.1487, count: 1 },
      { lat: 33.223, lng: -117.107, count: 1 },
      { lat: 30.2316, lng: -85.502, count: 1 },
      { lat: 39.1703, lng: -75.5456, count: 8 },
      { lat: 30.0041, lng: -95.2984, count: 2 },
      { lat: 29.7755, lng: -95.4152, count: 1 },
      { lat: 41.8014, lng: -87.6005, count: 1 },
      { lat: 37.8754, lng: -121.687, count: 7 },
      { lat: 38.4493, lng: -122.709, count: 1 },
      { lat: 40.5494, lng: -89.6252, count: 1 },
      { lat: 42.6105, lng: -71.2306, count: 1 },
      { lat: 40.0973, lng: -85.671, count: 1 },
      { lat: 40.3987, lng: -86.8642, count: 1 },
      { lat: 40.4224, lng: -86.8031, count: 4 },
      { lat: 47.2166, lng: -122.451, count: 1 },
      { lat: 32.2369, lng: -110.956, count: 1 },
      { lat: 41.3969, lng: -87.3274, count: 2 },
      { lat: 41.7364, lng: -89.7043, count: 2 },
      { lat: 42.3425, lng: -71.0677, count: 1 },
      { lat: 33.8042, lng: -83.8893, count: 1 },
      { lat: 36.6859, lng: -121.629, count: 2 },
      { lat: 41.0957, lng: -80.5052, count: 1 },
      { lat: 46.8841, lng: -123.995, count: 1 },
      { lat: 40.2851, lng: -75.9523, count: 2 },
      { lat: 42.4235, lng: -85.3992, count: 1 },
      { lat: 39.7437, lng: -104.979, count: 2 },
      { lat: 25.6586, lng: -80.3568, count: 7 },
      { lat: 33.0975, lng: -80.1753, count: 1 },
      { lat: 25.7615, lng: -80.2939, count: 1 },
      { lat: 26.3739, lng: -80.1468, count: 1 },
      { lat: 37.6454, lng: -84.8171, count: 1 },
      { lat: 34.2321, lng: -77.8835, count: 1 },
      { lat: 34.6774, lng: -82.928, count: 1 },
      { lat: 39.9744, lng: -86.0779, count: 1 },
      { lat: 35.6784, lng: -97.4944, count: 2 },
      { lat: 33.5547, lng: -84.1872, count: 1 },
      { lat: 27.2498, lng: -80.3797, count: 1 },
      { lat: 41.4789, lng: -81.6473, count: 1 },
      { lat: 41.813, lng: -87.7134, count: 1 },
      { lat: 41.8917, lng: -87.9359, count: 1 },
      { lat: 35.0911, lng: -89.651, count: 1 },
      { lat: 32.6102, lng: -117.03, count: 1 },
      { lat: 41.758, lng: -72.7444, count: 1 },
      { lat: 39.8062, lng: -86.1407, count: 1 },
      { lat: 41.872, lng: -88.1662, count: 1 },
      { lat: 34.1404, lng: -81.3369, count: 1 },
      { lat: 46.15, lng: -60.1667, count: 1 },
      { lat: 36.0679, lng: -86.7194, count: 1 },
      { lat: 43.45, lng: -80.5, count: 1 },
      { lat: 44.3833, lng: -79.7, count: 1 },
      { lat: 45.4167, lng: -75.7, count: 2 },
      { lat: 43.75, lng: -79.2, count: 2 },
      { lat: 45.2667, lng: -66.0667, count: 3 },
      { lat: 42.9833, lng: -81.25, count: 2 },
      { lat: 44.25, lng: -79.4667, count: 3 },
      { lat: 45.2667, lng: -66.0667, count: 2 },
      { lat: 34.3667, lng: -118.478, count: 3 },
      { lat: 42.734, lng: -87.8211, count: 1 },
      { lat: 39.9738, lng: -86.1765, count: 1 },
      { lat: 33.7438, lng: -117.866, count: 1 },
      { lat: 37.5741, lng: -122.321, count: 1 },
      { lat: 42.2843, lng: -85.2293, count: 1 },
      { lat: 34.6574, lng: -92.5295, count: 1 },
      { lat: 41.4881, lng: -87.4424, count: 1 },
      { lat: 25.72, lng: -80.2707, count: 1 },
      { lat: 34.5873, lng: -118.245, count: 1 },
      { lat: 35.8278, lng: -78.6421, count: 1 },
    ],
  };
  var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    radius: 2,
    maxOpacity: 0.8,
    // scales the radius based on map zoom
    scaleRadius: true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    useLocalExtrema: true,
    // which field name in your data represents the latitude - default "lat"
    latField: "lat",
    // which field name in your data represents the longitude - default "lng"
    lngField: "lng",
    // which field name in your data represents the data value - default "value"
    valueField: "count",
  };
  var heatmapLayer = new heatMap(cfg);
  heatmapLayer.setData(testData);
  heatmapLayer.addTo(map);
};
export const init = () => {
  const latlngXiamen = L.latLng([24.471388765957105, 118.10761928558351]);
  const map = L.map("map", {
    center: latlngXiamen,
    zoom: 12
  });
  L.control.scale({
    imperial: false
  }).addTo(map);
  map.on('click', ({latlng, layerPoint, containerPoint, originalEvent}) => {
    console.log('latlng:', latlng, ' layerPoint:', layerPoint, ' containerPoint:', containerPoint, ' originalEvent:', originalEvent)
  })
  addMapBoxTile(map);
  return map
};
export const drawBar = (map,{point1, point2, angle, barHeight, color}) => {
    const point3 = calcLatLngByAngleAndDistance({ lng:point2.lng, lat:point2.lat }, angle +90, barHeight);
    const point4 = calcLatLngByAngleAndDistance({ lng:point1.lng, lat:point1.lat }, angle +90, barHeight);
    L.polygon([point1, point2, point3, point4], {
      fill: true,
      fillColor: color,
      stroke: false,
      fillOpacity: .9
    }).bindTooltip("my tooltip text").openTooltip().addTo(map);
    
  draw(point1);
  draw(point2);
  draw(point3);
  draw(point4);
}
export const draw = (map, point, color = 'yellow') => {
  L.circle(point, {color: color}).addTo(map);
}
const durationRun = (duration) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve()
    }, duration);
  })
}
export const drawTrackAnimate = (map) => {
  const duration = 3000;
  var myIcon = L.divIcon({html: "<div class='logo' motion-base='4050'></div>", iconSize: [20,20]});
  const l1 = L.motion.polyline([ {lat: 24.44621196143135, lng: 118.03367614746095}, {lat: 24.41776725577444, lng: 118.09925079345705}], {
    color: "red"
  }, {
  }, {
    removeOnEnd: true,
    showMarker: true,
    icon:  myIcon
  }).motionDuration(duration);
  const l2 = L.motion.polyline([ {lat: 24.41776725577444, lng: 118.09925079345705}, {lat: 24.437772992870016, lng: 118.16345214843751}], {
    color: "red"
  }, {
  }, {
    removeOnEnd: true,
    showMarker: false,
    icon:  myIcon
  }).motionDuration(duration);
  const l22 = L.motion.polyline([ {lat: 24.42776725577444, lng: 118.09925079345705}, {lat: 24.447772992870016, lng: 118.16345214843751}], {
    color: "red"
  }, {
  }, {
    removeOnEnd: true,
    showMarker: false,
    icon:  myIcon
  }).motionDuration(duration);
  const l3 = L.motion.polyline([ {lat: 24.437772992870016, lng: 118.16345214843751}, {lat: 24.50245730590211, lng: 118.21357727050783}], {
    color: "red"
  }, {
  }, {
    removeOnEnd: true,
    showMarker: false,
    icon:  myIcon
  }).motionDuration(duration);
  const l4 = L.motion.polyline([ {lat: 24.50245730590211, lng: 118.21357727050783}, {lat: 24.546186296608525, lng: 118.19229125976564}], {
    color: "red"
  }, {
  }, {
    removeOnEnd: false,
    showMarker: false,
    icon:  myIcon
  }).motionDuration(duration);
  // const group1 = L.motion.group([l1]);
  // const group2 = L.motion.group([l2,l22]);
  // const group3 = L.motion.group([l3]);
  // const group4 = L.motion.group([l4]);
  // group1.addTo(map)
  // group2.addTo(map);
  // group3.addTo(map)
  // group4.addTo(map)
  var seqGroup = L.motion.seq([
    l1
  ]).addTo(map);
  // group1.motionStart()
  // await durationRun(duration)
  // group2.motionStart()
  // await durationRun(duration)
  // group3.motionStart()  
  // await durationRun(duration)
  // group4.motionStart()
  // seqGroup.motionStart()
  // l1.addTo(map)
  // l1.motionStart()
  // l2.addTo(map)
  // l2.motionStart()
  seqGroup.motionStart()
  let lastPoint = {lat: 24.41776725577444, lng: 118.09925079345705};
  map.on('click', ({latlng, layerPoint, containerPoint, originalEvent}) => {
    const layer = L.motion.polyline([lastPoint, latlng], {
      color: "red"
    }, {
    }, {
      removeOnEnd: true,
      showMarker: false,
      icon:  myIcon
    }).motionDuration(duration);;
    seqGroup.addLayer(layer, true)
    lastPoint = latlng;
    // l1.motionResume();
  })
  // L.motion.polyline(, {
  //   color: "red"
  // }, {
  //   auto: true,
  //   duration: 2000
  // }, {
  //   removeOnEnd: false,
  //   showMarker: true,
  //   icon:  L.divIcon({html: "<i motion-base='180'>@</i>", iconSize: [20,20]})
  // }).addTo(map);
}
//  获取地图的像素与公里的比例
export const getMapRatio = (map) => {
  const y = map._container.clientHeight / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([10000, y]);
  const maxMeters = left.distanceTo(right);
  const ratio = maxMeters/10000;
  return ratio;
}
function a(){
  console.log('aaa')
}
export default {
  a
}