import './public-path';
import { createApp } from 'vue'
import App from '@/App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router'
import store from '@/store'

let instance = null
async function render(props = {}) {
  const { container, routerBase } = props;
  // 实例化vue
  instance = createApp(App);
  // 路由挂载
  const router = createRouter({
    history: createWebHistory(`${routerBase}`),
    routes
  });
  instance.use(router);
  instance.use(store);

  instance.mount(container ? container.querySelector("#app") : "#app");
}

// eslint-disable-next-line no-underscore-dangle
if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: "", routerBase: "/micro-vue" });
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  await render(props);
}

export async function unmount() {
  instance.unmount();
}