<template>
  <div>
    数据：
    <hr/>
    <ul>
      <li v-for="(item,index) in list">
        {{item.wea}}
      </li>
    </ul>
  </div>
</template>
<script>
//  通过cancelToken取消请求
import axiosIns from "@/utils/axiosInstance";
import axios from 'axios'
import { reactive, toRefs } from 'vue'
const CancelToken = axios.CancelToken;
let cancel;
export default{
  name: 'axiosDemo1',
  setup(){
    const state = reactive({
      list: []
    })
    const requestApi = () => {
      axiosIns.request({
        url: '/api/',
        params: {
          appid: '23035354',
          appsecret: '8YvlPNrz',
          version: 'v9',
          cityid: '0',
          city: '青岛',
          ip: '0',
          callback: '0'
        },
        maxRedirects: 0,
        cancelToken: new CancelToken(function executor(c) {
          cancel = c
        })
      }).then(res => {
        console.log(res.data.data)
        state.list = res.data.data
      }).catch(err => {
        console.warn(err)
      })      
    }
    requestApi()
    cancel('主动取消请求')
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style>
</style>