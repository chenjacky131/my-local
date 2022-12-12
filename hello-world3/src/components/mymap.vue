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
// import irregularChannel from 'leaflet-irregular-channel';
import '../assets/js/irregular-channel/index'
const map = ref("");
onBeforeMount(async () => {
})
onMounted(() => {
  map.value = init();
  const data = [
    {
      lat: 24.43683529482618, 
      lng: 118.04363250732423,
      widthLeft: 100,
      widthRight: 100
    },
    {
      lat: 24.396507684805687, 
      lng: 118.12808990478517,
      widthLeft: 200,
      widthRight: 100
    },
    {
      lat: 24.473400349324073,
      lng: 118.21907043457033,
      widthLeft: 100,
      widthRight: 200
    } 
  ]
  irregularChannel(data, map.value);
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
