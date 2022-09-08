<template>
  <div class="hello">
    <h1>我是C2组件</h1>
    <input type="text" v-model="name" @change="handleChange">
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
export default {
  name: 'component2',
  setup(){
    const { ctx } = getCurrentInstance()
    const $bus = ctx.$bus
    const name = ref('')
    const handleChange = (e) => {
      $bus.$emit('diy-event', {
        name: name.value
      })
    }
    return {
      handleChange,
      name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text{
  color: v-bind(color);
}
</style>
<style module="test">
  .red{
    color: red;
  }
  .blue{
    color: blue;
  }
</style>
