<template>
  <!-- <router-link :to="{path: '/'}">首页</router-link>
  <router-link :to="{path: '/register'}">注册</router-link>
  <router-link :to="{path: '/login'}">登录</router-link>
  <router-link :to="{path: '/list'}">列表</router-link> -->
  <router-view></router-view>
</template>
<script>
export default {
  setup(props, context){
  }
}
</script>
<style lang="scss">
html,body, #app{
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
a{
  color: #333;
  &.router-link-active{
    color: red;
  }  
}

</style>