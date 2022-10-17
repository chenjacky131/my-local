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
const map = ref("");
onBeforeMount(async () => {
})
onMounted(() => {
  map.value = init();
  drawTrackAnimate(map.value)
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
