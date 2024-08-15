<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import maplibregl from "maplibre-gl";
import * as turf from "@turf/turf";
import { mapboxOverlay } from "./hooks/useDeckGl"; // 引入mapboxOverlay(deck.gl)

onMounted(() => {
  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [118.10529821563091, 24.49471688046323],
    zoom: 14,
    pitch: 60,
    maxPitch: 85,
  });

  map.on("click", (e) => {
    // console.log("当前点击的经纬度：", e.lngLat.toArray());
  });
  map.on("load", () => {
    // map.addControl(mapboxOverlay())
    const polygonFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [
              [
                [118.06484725039678, 24.42910432841603],
                [118.11850280789781, 24.443557358019305],
                [118.11690186822102, 24.45296000109836],
                [118.09532220699276, 24.457570099864768],
                [118.06538561815421, 24.444187018656393],
                [118.06484725039678, 24.42910432841603],
              ],
            ],
            type: "Polygon",
          },
        },
      ],
    };
    const circleFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [
              [
                [118.0614145461156, 24.443937147590773],
                [118.07877222399446, 24.443937147590773],
                [118.07877222399446, 24.451403392776285],
                [118.0614145461156, 24.451403392776285],
                [118.0614145461156, 24.443937147590773],
              ],
            ],
            type: "Polygon",
          },
        },
      ],
    };
    map.addSource("polygon", {
      type: "geojson",
      data: polygonFeature,
    });
    map.addSource("circle", {
      type: "geojson",
      data: circleFeature,
    });
    map.addLayer({
      id: "polygonLayer",
      type: "fill",
      source: "polygon",
      paint: {
        "fill-color": "red",
      },
      layout: {
        'fill-sort-key': 1
      }
    });
    map.addLayer({
      id: "circleLayer",
      type: "fill",
      source: "circle",
      paint: {
        "fill-color": "green",
      },
      layout: {
        'fill-sort-key': 3
      }
    });
  });
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
