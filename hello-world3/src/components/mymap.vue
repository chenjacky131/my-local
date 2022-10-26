<template>
  <div id="map" class="my-map"></div>
</template>

<script setup>
import L from "leaflet";
import '../../node_modules/leaflet.motion/dist/leaflet.motion'
// import "@/utils/leaflet.textpath";
// import "leaflet-polylinedecorator";
// import heatMap from "leaflet-heatmap";
import { onMounted, ref, onBeforeMount } from "vue";
import { calcLatLngAngle, calcLatLngByAngleAndDistance } from '@/utils/latLngUtils.js';
import {init, drawTrackAnimate} from '@/components/mymap/utils.js';
import {login} from '@/api/index.js';
import 'leaflet-plugin-trackplayback';
const map = ref("");
onBeforeMount(async () => {
})
onMounted(() => {
  map.value = init();
  // drawTrackAnimate(map.value);
  let data = [
  {
    "mmsi": 413264910,
    "lon": 70872432,
    "lat": 14631393,
    "posTime": 1666244151,
    "course": 318.6,
    "heading": 320,
    "speed": 7.5
  },
  {
    "mmsi": 413264910,
    "lon": 70871511,
    "lat": 14632351,
    "posTime": 1666244212,
    "course": 319.4,
    "heading": 320,
    "speed": 7.4
  },
  {
    "mmsi": 413264910,
    "lon": 70870920,
    "lat": 14632966,
    "posTime": 1666244252,
    "course": 318.7,
    "heading": 320,
    "speed": 7.3
  },
  {
    "mmsi": 413264910,
    "lon": 70870344,
    "lat": 14633565,
    "posTime": 1666244291,
    "course": 318.9,
    "heading": 320,
    "speed": 7.3
  },
  {
    "mmsi": 413264910,
    "lon": 70869904,
    "lat": 14634033,
    "posTime": 1666244322,
    "course": 319.2,
    "heading": 319,
    "speed": 7.3
  },
  {
    "mmsi": 413264910,
    "lon": 70869144,
    "lat": 14634812,
    "posTime": 1666244372,
    "course": 317.9,
    "heading": 320,
    "speed": 7.4
  },
  {
    "mmsi": 413264910,
    "lon": 70868536,
    "lat": 14635444,
    "posTime": 1666244412,
    "course": 318.7,
    "heading": 320,
    "speed": 7.5
  },
  {
    "mmsi": 413264910,
    "lon": 70868072,
    "lat": 14635940,
    "posTime": 1666244443,
    "course": 318.6,
    "heading": 319,
    "speed": 7.5
  },
  {
    "mmsi": 413264910,
    "lon": 70867471,
    "lat": 14636563,
    "posTime": 1666244481,
    "course": 318.7,
    "heading": 321,
    "speed": 7.6
  },
  {
    "mmsi": 413264910,
    "lon": 70866864,
    "lat": 14637220,
    "posTime": 1666244521,
    "course": 319.7,
    "heading": 320,
    "speed": 7.7
  },
  {
    "mmsi": 413264910,
    "lon": 70866375,
    "lat": 14637726,
    "posTime": 1666244552,
    "course": 318.6,
    "heading": 320,
    "speed": 7.7
  },
  {
    "mmsi": 413264910,
    "lon": 70865760,
    "lat": 14638393,
    "posTime": 1666244592,
    "course": 319.9,
    "heading": 318,
    "speed": 7.8
  },
  {
    "mmsi": 413264910,
    "lon": 70865247,
    "lat": 14638897,
    "posTime": 1666244623,
    "course": 317.1,
    "heading": 318,
    "speed": 7.9
  },
  {
    "mmsi": 413264910,
    "lon": 70864624,
    "lat": 14639517,
    "posTime": 1666244661,
    "course": 317.5,
    "heading": 318,
    "speed": 7.9
  },
  {
    "mmsi": 413264910,
    "lon": 70864111,
    "lat": 14640021,
    "posTime": 1666244692,
    "course": 316.7,
    "heading": 318,
    "speed": 7.9
  },
  {
    "mmsi": 413264910,
    "lon": 70863447,
    "lat": 14640681,
    "posTime": 1666244732,
    "course": 317.4,
    "heading": 318,
    "speed": 7.9
  },
  {
    "mmsi": 413264910,
    "lon": 70862808,
    "lat": 14641326,
    "posTime": 1666244772,
    "course": 317.6,
    "heading": 318,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70862152,
    "lat": 14641995,
    "posTime": 1666244812,
    "course": 317.7,
    "heading": 318,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70861495,
    "lat": 14642665,
    "posTime": 1666244851,
    "course": 318.2,
    "heading": 313,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70860391,
    "lat": 14643594,
    "posTime": 1666244911,
    "course": 309.7,
    "heading": 305,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70859607,
    "lat": 14644102,
    "posTime": 1666244951,
    "course": 302,
    "heading": 301,
    "speed": 7.9
  },
  {
    "mmsi": 413264910,
    "lon": 70858752,
    "lat": 14644570,
    "posTime": 1666244992,
    "course": 300.6,
    "heading": 301,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70857928,
    "lat": 14645022,
    "posTime": 1666245031,
    "course": 300.7,
    "heading": 301,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70857087,
    "lat": 14645481,
    "posTime": 1666245071,
    "course": 300.7,
    "heading": 302,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70856232,
    "lat": 14645956,
    "posTime": 1666245112,
    "course": 301.5,
    "heading": 302,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70855399,
    "lat": 14646418,
    "posTime": 1666245151,
    "course": 301.3,
    "heading": 302,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70854535,
    "lat": 14646905,
    "posTime": 1666245193,
    "course": 302.1,
    "heading": 302,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70853696,
    "lat": 14647372,
    "posTime": 1666245232,
    "course": 301.5,
    "heading": 302,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70852839,
    "lat": 14647861,
    "posTime": 1666245272,
    "course": 302,
    "heading": 300,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70852000,
    "lat": 14648326,
    "posTime": 1666245313,
    "course": 299.4,
    "heading": 300,
    "speed": 8
  },
  {
    "mmsi": 413264910,
    "lon": 70851160,
    "lat": 14648782,
    "posTime": 1666245352,
    "course": 300.5,
    "heading": 300,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70850096,
    "lat": 14649351,
    "posTime": 1666245403,
    "course": 299.4,
    "heading": 298,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70849239,
    "lat": 14649798,
    "posTime": 1666245443,
    "course": 297.6,
    "heading": 298,
    "speed": 8.1
  },
  {
    "mmsi": 413264910,
    "lon": 70848367,
    "lat": 14650246,
    "posTime": 1666245483,
    "course": 299.4,
    "heading": 299,
    "speed": 8.2
  },
  {
    "mmsi": 413264910,
    "lon": 70847496,
    "lat": 14650696,
    "posTime": 1666245523,
    "course": 300.7,
    "heading": 299,
    "speed": 8.2
  },
  {
    "mmsi": 413264910,
    "lon": 70846624,
    "lat": 14651142,
    "posTime": 1666245563,
    "course": 299.8,
    "heading": 298,
    "speed": 8.2
  },
  {
    "mmsi": 413264910,
    "lon": 70845744,
    "lat": 14651599,
    "posTime": 1666245603,
    "course": 301.5,
    "heading": 299,
    "speed": 8.3
  },
  {
    "mmsi": 413264910,
    "lon": 70844896,
    "lat": 14652056,
    "posTime": 1666245641,
    "course": 300.1,
    "heading": 299,
    "speed": 8.3
  },
  {
    "mmsi": 413264910,
    "lon": 70844208,
    "lat": 14652417,
    "posTime": 1666245673,
    "course": 299.8,
    "heading": 299,
    "speed": 8.3
  },
  {
    "mmsi": 413264910,
    "lon": 70843359,
    "lat": 14652886,
    "posTime": 1666245711,
    "course": 301.5,
    "heading": 299,
    "speed": 8.3
  },
  {
    "mmsi": 413264910,
    "lon": 70842680,
    "lat": 14653265,
    "posTime": 1666245743,
    "course": 301,
    "heading": 299,
    "speed": 8.3
  },
  {
    "mmsi": 413264910,
    "lon": 70841815,
    "lat": 14653743,
    "posTime": 1666245782,
    "course": 301.1,
    "heading": 299,
    "speed": 8.4
  },
  {
    "mmsi": 413264910,
    "lon": 70840935,
    "lat": 14654224,
    "posTime": 1666245822,
    "course": 300.9,
    "heading": 299,
    "speed": 8.4
  },
  {
    "mmsi": 413264910,
    "lon": 70840263,
    "lat": 14654599,
    "posTime": 1666245853,
    "course": 300.6,
    "heading": 298,
    "speed": 8.4
  },
  {
    "mmsi": 413264910,
    "lon": 70839375,
    "lat": 14655081,
    "posTime": 1666245892,
    "course": 299.7,
    "heading": 298,
    "speed": 8.4
  },
  {
    "mmsi": 413264910,
    "lon": 70838704,
    "lat": 14655436,
    "posTime": 1666245923,
    "course": 300,
    "heading": 298,
    "speed": 8.4
  }
]
  data = data.map(item => {
    return {
      lat: item.lat/600000,
      lng: item.lon/600000,
      time: item.posTime,
      dir: item.course,
      info:[
        {
        key: item.mmsi,
        value: item.mmsi
        }
      ]
    }
  })
const trackplayback = L.trackplayback(data, map.value);
window.trackplayback = trackplayback;
trackplayback.start();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-map {
  width: 100%;
  height: 100%;
}
:deep(.leaflet-div-icon){
  background: transparent;
  border: 0;
}
:deep(.logo){
  background: url('~@/assets/logo.png') no-repeat 0 0 / 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
