<template>
  <h1>大文件切片上传</h1>
  <div>
    <input ref="fileRef" type="file">
    <button ref="buttonRef" @click="handleClick">上传</button>
    <div ref="progressRef" style="width:300px"></div>
    <div>进度：{{ progressPercent }}</div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import axios from "@/utils/axiosInstance";
const fileRef = ref(null);
const buttonRef = ref(null);
const progressRef = ref(null);
let files = reactive({}); //  创建一个文件对象
let chunkList = ref([]); //  存放切片的数组
let defaultChunkSize = ref(2 * 1024 * 1024);  //  默认切片大小
let progress = ref(0);  //  上传进度
/**
 * @description:  创建切片
 * @param {Object} file  大文件
 * @param {Number} size  切片的大小(默认2Mb,应为是字节数，所有需要转成字节大小)
 * @return {*}
 */
const createChunk = (file, size = defaultChunkSize.value) => {
  chunkList.value = [];
  let cur = 0;
  while(cur < file.size){
    chunkList.value.push({
      file: file.slice(cur, cur + size) //  使用slice进行切片
    });
    cur += size;
  }
}
/**
 * @description: 上传切片
 * @param {*} list  //  切片数组
 * @return {*}
 */
const uploadFile = async (list) => {
  const requestList = list.map(({file, fileName, index, chunkName}) => {
    const formData = new FormData();  //  创建表单类型数据
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("chunkName", chunkName);
    return { formData, index}
  })
    .map(({formData, index}) => axios.request({
      method: "post",
      url: "http://localhost:3000/upload",
      data: formData
    }).then(res => {
      //  显示每个切片上传进度
      let p = document.createElement("p");
      p.innerHTML = `${list[index].chunkName}--${res.data.message}`;
      progressRef.value.appendChild(p);
      progress.value = progress.value + 1;
    }))
  await Promise.all(requestList);
}
const handleClick = async () => {
  const uploadList = chunkList.value.map(({file}, index) => {
    return {
      file,
      chunkName: `${files.name}-${index}`,
      fileName: files.name,
      index
    }
  });
  await uploadFile(uploadList);
  mergeFile(files.name);
}
const mergeFile = (fileName) => {
  axios.request({
    method: "post",
    url: "http://localhost:3000/merge",
    data: JSON.stringify({
      size: defaultChunkSize.value,
      fileName
    })
  }).then(({data}) => {
    if(data.code === 0){
      alert(data.message)
    }
  })
}
const progressPercent = computed(() => {
  if(chunkList.value.length === 0){
    return '0%'
  }else{
    return `${(progress.value / chunkList.value.length) * 100}%`
  }
});
onMounted(() => {
  //  读取文件
  fileRef.value.addEventListener("change", (e) => {
    files = e.target.files[0];
    // 创建切片
    createChunk(files);
  });
});
</script>