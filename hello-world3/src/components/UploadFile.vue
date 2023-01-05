<template>
  <div>
    <input type="file" @change="handleChange" />
    <button @click="upload">上传</button>
  </div>
</template>
<script setup>
import axios from "@/utils/axiosInstance";
let files = null;

const upload = () => {
  const form = new FormData();
  form.append("file", files);
  form.append("fileName", files.name);
  form.append("updateTime", new Date().toString());
  axios
    .request({
      method: "post",
      url: "http://localhost:3000/upload",
      data: form,
    })
    .then(({ data }) => {
      console.log(data);
    });
};
</script>
