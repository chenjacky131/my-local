<template>
  <div class="hello">
    <h1>我是C1组件 :{{name}}</h1>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
export default {
  name: 'component1',
  setup(){
    const { ctx } = getCurrentInstance()
    const $bus = ctx.$bus
    const name = ref('')
    $bus.$on('diy-event', (val) => {
      name.value = val.name
    })
    return {
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
