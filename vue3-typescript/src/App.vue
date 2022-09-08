<template>
  <div>
    <div>跟组件</div>
    <hr>
    <v-home></v-home>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import Home from './components/Home.vue'
import axios from 'axios'
export default defineComponent({
  name:'app',
  components:{
    'v-home': Home
  },
  created(){
    axios.request({
      url:'/api/users',
      method:'get'
    }).then(res => {
      console.log(res)
    })
  }
})
</script>
<style lang="scss">
@include reset()
</style>
