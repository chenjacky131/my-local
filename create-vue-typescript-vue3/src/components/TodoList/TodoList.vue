<template>
  <div>
    <div>备忘录程序</div>
    <ul class="toto-list">
      <li v-for="(item,index) in todoList" :key="index" :style="{ textDecoration: (item.done ? 'line-through' : 'auto') } ">
        {{ item.name }}
        <label><input v-model="item.done" type="checkbox"/>完成</label>
        <button @click="handleDelete(index)">删除</button>
      </li>
    </ul>
  </div>
  <div>增加备忘</div>
  <div><input type="text" v-model="newTodoValue" /> <button @click="add">增加</button></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const newTodoValue = ref("");
const todoList = ref([{
    name: "吃饭",
    done: true,
}]);
const add = () => {
  todoList.value.push({
    name: newTodoValue.value.trim() === "" ? `备忘: --` : newTodoValue.value,
    done: false
  });
  newTodoValue.value = "";
}
const handleDelete = (index: number) => {
  todoList.value = todoList.value.filter(
    (item, subIndex) => index !== subIndex
  );
}
</script>
<style>
.todo-list{
  color: red;
}
</style>