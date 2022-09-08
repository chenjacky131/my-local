<template>
  <div class="color-wrap" @click="showPicker = false">
    颜色拾取器: 
    <div class="holder" @click.stop="handleClick">
      <div class="color-holder" :style="{background: `rgba(${color.r},${color.g},${color.b},${color.a})`}"></div>
      <vueColor @click.stop :color="color" v-model:color="color" v-if="showPicker"/>
    </div>    
  </div>
</template>
<script setup>
import vueColor from '@/components/vue-color.vue'
import {ref, watch} from 'vue'
const showPicker = ref(false)
const color = ref('#000000AA')
const handleClick = () => {
  showPicker.value = !showPicker.value
}
watch(() => color.value, (val) => {
  // console.log(val)
},{
  deep: true
})  

</script>
<style lang="scss" scoped>
.holder{
  -webkit-user-select: none;
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  background-image: url('../assets/alpha-bg.png');
  background-size: 10px 10px;;
  .color-holder{
    height: 100%;
  }
  .color-select{
    width: 200px;    
    position: absolute;
    left: 100%;
  }
}
</style>