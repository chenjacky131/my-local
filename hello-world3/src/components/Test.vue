<template>
  <div class="dragContainer" id="grow">
    <div class="title">标题</div>
    <div>内容</div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  var x = [];

function grow() {
  x.push(new Array(1000000).join('x'));
}

document.getElementById('grow').addEventListener('click', grow);
});
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