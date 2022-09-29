import axios from 'axios';
import qs from 'qs';
const instance = axios.create()
//  请求拦截器
instance.interceptors.request.use(function(config){
  // console.log('Loading...')
 return config 
}, function(err){
  return Promise.reject(err)
})
instance.interceptors.response.use(function(response){
  // console.log('Loaded!', response)
  return response
}, function(err){
  return Promise.reject(err)
})
export default instance