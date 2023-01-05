<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleBtn">揍你</button>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
window.addEventListener('message', function(e){
  console.log(e)
});
const handleBtn = () => {
  window.parent.postMessage('从子页面来的消息', window.location.origin)
}
onBeforeMount(() => {
});
</script>