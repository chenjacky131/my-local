<template>
  <div class="dragContainer" id="p1" v-resize:ratio-2-1-100-600-100-600 v-drag>
    <div class="title">标题</div>
    <div>内容</div>
  </div>
</template>
<script setup>
import { dirResize } from '@/directive/resize.js';
import { dirDrag } from '@/directive/drag.js';
const vResize = dirResize;
const vDrag = dirDrag;
</script>
<style lang="scss" scoped>
.dragContainer{
  border: 1px solid #f00;
  position: absolute;
  margin: 0;
  user-select: none;
  width: 300px;
  height: 150px;
}
</style>