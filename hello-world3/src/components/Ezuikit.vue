<template>
  <div id="video-container"></div>
  <button @click="handleClick">操作</button>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import  EZUIKit from 'ezuikit-js';
const url1 = 'ezopen://open.ys7.com/J07764743/1.live';
const url2 = 'ezopen://open.ys7.com/J62998424/2.live';
const url3 = 'ezopen://open.ys7.com/J79588289/1.live';
const token = 'ra.9fbgx41cadv8fkmfc7fv7lzccm50df7z-64d0qc3zwf-1rtokyr-ml7menegf'
const demoUrl = 'ezopen://open.ys7.com/G39444019/1.hd.live';
const demoToken = 'ra.4uku9qnn7e86ghqe5mnmx46t5ui0vpsw-2ruavxm0of-01c5ky8-rvpfqzfa3'
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