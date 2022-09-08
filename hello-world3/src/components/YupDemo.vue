<template>
  Yup
</template>
<script setup>
import * as yup from 'yup';
import '@/utils/yup-utils.js';
// 自定义校验语后就可以开始使用yup模式了

let schema = yup.object().shape({
  partner: yup.string().oneOf(['tom','jacky','harry'], '不是合伙人')
});
schema.validate({  
  partner: 'to1m',
},{
  strict: true
}).catch( (err) => {
  console.log(err.message)
});
</script>
<style lang="scss" scoped>

</style>