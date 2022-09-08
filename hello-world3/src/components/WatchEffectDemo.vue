<template>
  测试
  <div ref="dom" :data-count="count">
    {{count}}
  </div>
  <div>
    <button @click="++count">加</button>
    <button @click="++count2">2加</button>
  </div>
</template>
<script setup>
import {ref, watchEffect, watch} from 'vue'
const dom = ref(null);
const count = ref(0);
const count2 = ref(100);
watchEffect(() => {
  console.log(count.value);
  console.log(count2.value);
})
</script>
<style lang="scss" scoped>

</style>