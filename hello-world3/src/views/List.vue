<template>
  <div>
    <button @click="logout">登出</button>
    <ul>
      <li v-for="item in list" :key="item._id">
        姓名:{{item.name }}            
        年龄:{{item.age }}
        电话:{{item.number }}
        <button @click="handleDelete(item._id)">删除</button>
        <button @click="handleEdit(item)">修改</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router"
import axios from "@/utils/axiosInstance";
const router = useRouter();
const list = ref([]);
const handleDelete = (id) => {
  axios
    .request({
      method: "post",
      url: `${process.env.VUE_APP_BASE_URL}/deleteData`,
      data: {
        id: id
      }
    })
    .then(({ data }) => {
      if(data.deletedCount){
        console.log('删除成功');
        getData()
      }
    });
}
const handleEdit = (item) => {
  router.push({path:'/edit', query:{
    ...item
  }});
}
const logout = () => {
  axios
    .request({
      method: "post",
      url: `${process.env.VUE_APP_BASE_URL}/logout`,
    })
    .then(({ data }) => {
      if(data.code === 0){
        console.log(data.msg);
        sessionStorage.clear();
        router.push({path:'/login'});
      };
    });
}
const getData = () => {
  axios
    .request({
      method: "get",
      url: `${process.env.VUE_APP_BASE_URL}/findData`,
    })
    .then(({ data }) => {
      if(data instanceof Array){
        list.value = data;
      }
    });
}
onBeforeMount(() => {
  getData()
});
</script>