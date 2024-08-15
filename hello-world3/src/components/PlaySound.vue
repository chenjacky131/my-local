<template>
  <div id="cont"></div>
</template>
<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  const parent = document.getElementById('cont')
  const audio = document.createElement('audio')
  const source = document.createElement('source')
  source.src = 'https://minio.cniship.com/tianwu-audio/e6debf96-f144-4e49-b237-d76f1d6f8124.mp3'
  audio.appendChild(source);
  parent.appendChild(audio);
  audio.load();
  audio.play();
});
</script>
<style lang="src"></style>