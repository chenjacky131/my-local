<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import _ from 'lodash'
defineProps({
  msg: String
})
const time = dayjs()
var users = [
    { 'user': 'barney',  'age': 36 },
    { 'user': 'fred',    'age': 40 },
    { 'user': 'pebbles', 'age': 1 }
  ];

console.log(_.orderBy(users, ['age'], ['desc']));
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
