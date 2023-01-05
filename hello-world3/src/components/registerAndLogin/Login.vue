<template>
  <div>
    <form ref="formRef">
      <label for="name">
        用户名：<input type="text" name="name" />
      </label>
      <label for="password">
        密码：<input type="password" name="password" />
      </label>                
      <button @click.prevent="submit">登录</button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosInstance";
import { useRouter } from "vue-router"
const router = useRouter()
const formRef = ref(null);
const submit = () => {
  const { name, password } = formRef.value;
  axios
    .request({
      method: "post",
      url: `${process.env.VUE_APP_BASE_URL}/login`,
      data: {
        name: name.value,
        password: password.value
      },
    })
    .then(({ data }) => {
      if(data.code === 0){
        console.log(data.msg);
        sessionStorage.setItem('user', data.user);
        router.push({path:'/list'})
      }
    });
};
</script>
<style></style>