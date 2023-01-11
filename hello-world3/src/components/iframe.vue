<template>
  <iframe src="http://localhost:8080/?locate=1" frameborder="0"></iframe>
</template>
<script setup>
window.addEventListener('message', (e) => {
  if(e.origin === 'http://localhost:8080' && e.data.type === 'receive-latlng'){
    //  e.data.data发送的过来的经纬度
    console.log(e.data.data)    
  }
})
</script>
<style lang="scss" scoped>
iframe{
  width: 100%;
  height: 100%;
}
</style>