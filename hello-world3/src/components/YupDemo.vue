<template>
  <span v-pre>{{ this will not be compiled }}</span>
</template>
<script setup>
import * as yup from 'yup';
import '@/utils/yup-utils.js';
const _promise = require('@/utils/promise.js')
const p = new _promise((resolve, reject) => {
  console.log('我进来了');
  setTimeout(() => {
    reject('失败')
  }, 1000);
})
p.then(res => {
  console.log('成功的结果:', res)
}, err => {
  console.log('失败的结果:', err)
})
// // 自定义校验语后就可以开始使用yup模式了

// let schema = yup.object().shape({
//   partner: yup.string().oneOf(['tom','jacky','harry'], '不是合伙人')
// });
// schema.validate({  
//   partner: 'to1m',
// },{
//   strict: true
// }).catch( (err) => {
//   // console.log(err.message)
// });
</script>
<style lang="scss" scoped>

</style>