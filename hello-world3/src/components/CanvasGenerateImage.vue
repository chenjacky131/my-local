<template>
  <div>
    <img :src="imageSrc" alt="canvaImage">
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { canvasGenerateImage } from './hooks/useCanvasGenerateImage';
import { bigShipWhite } from './constant/shipsConstant';
const imageSrc = ref();
onBeforeMount(() => {
  imageSrc.value = canvasGenerateImage(bigShipWhite);
})
</script>