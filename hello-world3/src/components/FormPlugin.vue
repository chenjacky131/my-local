<template>
  <div>
    <input v-model="value" name="名字" type="text">
    <span>{{errorMessage}}</span>
  </div>
</template>
<script setup>
import { useField, defineRule, configure} from 'vee-validate'
import {required} from '@vee-validate/rules';
import { localize, setLocale} from '@vee-validate/i18n';
import {defineProps, toRef} from 'vue';
import * as yup from 'yup';
const props = defineProps({
  name:String
})
defineRule('required', required);
configure({
  generateMessage: localize({
    zh_CN:{
      messages: {
        required: '该字段为必填项'
      }
    }
  })
})
setLocale('zh_CN')
const nameRef = toRef(props, 'name')
const {errorMessage, value}  = useField(nameRef, 'required');

</script>
<style lang="scss" scoped>

</style>