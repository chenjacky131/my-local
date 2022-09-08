import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun';

createApp(App).use(store).use(router).mount('#app')

registerMicroApps([
  {
    name: 'micro-vue-demo',
    entry: '//localhost:2000',
    container: '#container-vue',
    activeRule: '/micro-vue',
    // 传递给子应用的参数
    props: {
      routerBase: '/micro-vue',
    }
  }
]);
// 启动 qiankun
start();