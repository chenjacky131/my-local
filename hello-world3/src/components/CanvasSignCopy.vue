<template>
  <div>
    <canvas id="sign-canvas"></canvas>
  </div>
  <div>
    <button @click="save">导出签名</button>
    <button @click="cancel">清除画布</button>
    <span>画笔粗细：{{config.lineWidth}}</span>
    <button @click="increaseLineWidth">加粗画笔</button>
    <button @click="decreaseLineWidth">减细画笔</button>
    <button @click="resetLineWidth">复原画笔尺寸</button>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
const canvas = ref(null);
const ctx = ref(null);
const config = reactive({
  width: 500,
  height: 500,
  strokeStyle: 'black',
  lineWidth: 5,
  lineCap: 'round',
  lineJoin: 'round',
})
const init = (event) => {
  const { pageX, pageY } = event;
  ctx.value.strokeStyle = config.strokeStyle;
  ctx.value.lineWidth = config.lineWidth;
  ctx.value.lineCap = config.lineCap;
  ctx.value.lineJoin = config.lineJoin;
  ctx.value.beginPath();
  ctx.value.moveTo(pageX, pageY);
  window.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', closeDraw);
}
const closeDraw = () => {
  ctx.value.closePath();
  window.removeEventListener('mousemove', draw);
}
const draw = (event) => {
  const { pageX, pageY} = event;
  ctx.value.lineTo(pageX, pageY);
  ctx.value.stroke();
}
const cancel = () => {
  ctx.value.clearRect(
    0,
    0,
    config.width,
    config.height
  );
}
const save = () => {
  canvas.value.toBlob(blob => {
    const a = document.createElement('a');
    const date = Date.now().toString();
    a.download = `${date}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();    
  });
}
const increaseLineWidth = () => {
  config.lineWidth++;
}
const decreaseLineWidth = () => {
  config.lineWidth--;
}
const resetLineWidth = () => {
  config.lineWidth = 5;
}
onMounted(() => {
  canvas.value = document.querySelector('#sign-canvas');
  canvas.value.width = config.width;
  canvas.value.height = config.height;
  ctx.value = canvas.value.getContext('2d');
  ctx.value.fillStyle = 'transparent';
  ctx.value.clearRect(
    0,
    0,
    config.width,
    config.height
  );
  window.addEventListener('mousedown', init);
});
</script>
<style lang="scss" scoped>
#sign-canvas{
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.4);
}
</style>