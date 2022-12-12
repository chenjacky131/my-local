<template>
  <div>
    <canvas id="sign-canvas"></canvas>
  </div>
  <div>
    <button @click="save">保存</button>
    <button @click="cancel">取消</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const canvas = ref(null);
const ctx = ref(null);
const config = {
  width: 500,
  height: 500,
  lineWidth: 5,
  strokeStyle: 'black',
  lineCap: 'round',
  lineJoin: 'round'
};
const client = {
  offsetX: 0,
  offsetY: 0,
  endX: 0,
  endY: 0
};
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
    const date = Date.now().toString();
    const a = document.createElement('a');
    a.download = `${date}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}
onMounted(() => {
  canvas.value = document.querySelector('#sign-canvas');
  canvas.value.width = config.width;
  canvas.value.height = config.height;
  ctx.value = canvas.value.getContext('2d');
  ctx.value.fillStyle = "transparent";
  ctx.value.fillRect(
    0,
    0,
    config.width,
    config.height
  );
  const draw = (event) => {
    const { pageX, pageY } = event;
    client.endX = pageX;
    client.endY = pageY;
    ctx.value.lineTo(pageX, pageY);
    ctx.value.stroke();
  };
  const closeDraw = () => {
    ctx.value.closePath();
    window.removeEventListener('mousemove', draw);
  };
  const init = (event) => {
    const { offsetX, offsetY, pageX, pageY } = event;
    client.offsetX = offsetX;
    client.offsetY = offsetY;
    client.endX = pageX;
    client.endY = pageY;
    ctx.value.beginPath();
    ctx.value.lineWidth = config.lineWidth;
    ctx.value.strokeStyle = config.strokeStyle;
    ctx.value.lineCap = config.lineCap;
    ctx.value.lineJoin = config.lineJoin;
    ctx.value.moveTo(client.endX, client.endY);
    window.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', closeDraw);
  };
  window.addEventListener('mousedown', init);
});
</script>
<style lang="scss" scoped>
#sign-canvas{
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.4);
}
</style>