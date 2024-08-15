<script setup lang="ts">
import { Chrome } from 'vue-color'
let colors = {
  hex: '#194d33',
  hex8: '#194D33A8',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}
</script>

<template>
  <div>
    <Chrome v-model="colors" />
  </div>
</template>

<style scoped>

</style>
