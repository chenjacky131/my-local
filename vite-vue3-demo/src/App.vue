<script setup>
import PlaceHolder from './components/PlaceholderComponent.vue';
</script>

<template>
  <router-view />
  <PlaceHolder />
</template>

<style>
html,body,#app{
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
