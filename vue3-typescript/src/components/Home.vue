<template>
  <div>
    <div>Home组件</div>
    <br>
    <button @click="setTitle">改变title</button>
    <br>
    {{title}}  
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
let title = '我是home组件的title'
export default defineComponent({
  name:'home',
  data(){
    return {
      title
    }
  },
  methods:{
    setTitle():void{
      this.title = '我是改变后的title'
    }
  }
})
</script>