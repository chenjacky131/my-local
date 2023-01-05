<template>
  <div>
    <h1>
      修改
    </h1>
    <form ref="formRef">
      <label for="name">
        姓名：<input type="text" name="name" v-model="nameValue"/>
      </label>
      <label for="age">
        年龄：<input type="text" name="age" v-model="ageValue"/>
      </label>
      <label for="number">
        电话：<input type="text" name="number" v-model="numberValue"/>
      </label>            
      <button @click.prevent="submit">提交</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import axios from "@/utils/axiosInstance";
const route = useRoute();
const router = useRouter();
const { name, age, number, _id } = route.query;
const nameValue = ref(name);
const ageValue = ref(age);
const numberValue = ref(number);
const formRef = ref(null);
const submit = () => {
  axios
    .request({
      method: "post",
      url: `${process.env.VUE_APP_BASE_URL}/updateData`,
      data: {
        _id: _id,
        name: nameValue.value,
        age: ageValue.value,
        number: numberValue.value
      },
    })
    .then(({ data }) => {      
      if(data.modifiedCount){
        console.log('修改成功');
        setTimeout(() => {
          router.push({path:'/list'})
        }, 300);    
      }else{
        console.log(data);
      }
    });
};
</script>
<style></style>