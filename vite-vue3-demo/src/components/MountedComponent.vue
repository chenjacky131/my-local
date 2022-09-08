<template>
  <div>
    <div>子组件{{state.name}}</div>
  </div>
</template>
<script setup>
import { onMounted, onActivated, reactive } from 'vue';
const state = reactive({
  name: 'tom'
})
onMounted(() => {
  console.log('子组件挂载')
  setTimeout(() => {
    state.name = 'jack'
  }, 2000)
})
onActivated(() => {
  console.log('子组件激活')
})
</script>
<style lang="scss" scoped>

</style>