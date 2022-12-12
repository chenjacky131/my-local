<template>
  <div id="video-container"></div>
  <button @click="handleClick">操作</button>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import  EZUIKit from 'ezuikit-js';
const demoUrl = 'ezopen://open.ys7.com/J07764743/1.live';
const demoToken = 'ra.3zzerohc7t4s4zs7cx39obns9vhgqogf-2kr4ovalmx-1y6h61l-acgildn5t'
let player;
const handleClick = () => {
  player.getOSDTime()
  .then((time)=>{
    console.log("获取到的当前播放时间", time);
  });
}
onMounted(() => {
  player = new EZUIKit.EZUIKitPlayer({
    id: 'video-container', // 视频容器ID
    accessToken: demoToken,
    url: demoUrl,
    width: 600,
    height: 400,
    handleSuccess: function(){
      console.log('自动播放成功回调')
    }
  })
  window.player = player
})
</script>