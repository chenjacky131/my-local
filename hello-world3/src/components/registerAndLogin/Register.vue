<template>
  <div>
    <form ref="formRef">
      <label for="name">
        用户名：<input type="text" name="name" />
      </label>
      <label for="password">
        密码：<input type="password" name="password" />
      </label>    
      <label for="confirmPassword">
        确认密码：<input type="password" name="confirmPassword" />
      </label>                
      <button @click.prevent="submit">注册</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "@/utils/axiosInstance";
import { useRouter } from "vue-router"
const router = useRouter()
const formRef = ref(null);
const submit = () => {
  const { name, password, confirmPassword } = formRef.value;
  axios
    .request({
      method: "post",
      url: `${process.env.VUE_APP_BASE_URL}/register`,
      data: {
        name: name.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      },
    })
    .then(({ data }) => {
      if(data.code === 0){
        console.log(data.msg);
        router.push({path:'/list'})
      }
    });
};
</script>
<style></style>