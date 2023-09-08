<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import maplibregl from 'maplibre-gl';
import * as turf from "@turf/turf";
onMounted(() => {
  var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [118.190445, 24.498133], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });
  window.$map = map;
  window.$turf = turf;
  map.on('click', (e) => {
    console.log(e)
  })
  map.on('load', function () {
    
  });
  map.on('style.load', () => {
  });
  var polygon = turf.polygon([
          [
            [
              118.1251003460361,
              24.45348394046404
            ],
            [
              118.20269559809196,
              24.45348394046404
            ],
            [
              118.20269559809196,
              24.518378131458633
            ],
            [
              118.1251003460361,
              24.518378131458633
            ],
            [
              118.1251003460361,
              24.45348394046404
            ]
          ]
        ]);
  var point = turf.point([
          118.18060848594746,
          24.526311298749647
        ]);
  const isInside = turf.booleanContains(polygon, point);
  console.log(isInside)
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
        "line-dasharray":[2,4]
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
        "data":     {
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
        "text-field":'测试',
        'symbol-spacing':10000,
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
        "line-dasharray":[2,4]
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
</script>
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
</style>
