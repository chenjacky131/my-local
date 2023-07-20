<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import maplibregl from 'maplibre-gl';
onMounted(() => {
  var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [118.33327853317314, 24.494867363893434], // starting position [lng, lat]
    zoom: 8 // starting zoom
  });
  window.$map = map;
  map.on('click', (e) => {
    console.log(e)
  })
  map.on('load', function () {
  })
});
const drawLineGapDoubleLine = () => {
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
const drawTextAloneLine = () => {

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
      "layout": {
        "text-field":'测试',
        'symbol-placement': 'line-center'
      }
    });
}
const drawDoubleLine = () => {
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
