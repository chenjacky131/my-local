import { createApp } from 'vue'
import { useStore } from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Global from '@/utils/global'
import 'leaflet/dist/leaflet.css'
const app = createApp(App)
  app.config.errorHandler = (err, vm, info) => {
    console.log('err: ', err)
    console.log('vm: ', vm.$el)
    console.log('info: ', info)
  }
  app
  .directive('pin', {
    mounted(el, binding){
      el.style.position = 'fixed'
      let direction = binding.arg || 'top'
      el.style[direction] = binding.value + 'px'
      el.style.zIndex = '1000'
    }
  })
  .use(store)
  .use(router)
  .use(Global)
  .mount('#app')
