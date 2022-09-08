import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router'
const routes : Array<RouteRecordRaw> =   [
    {
      path: '/',
      name: 'index',
      component: () => import('@v/index.vue')
    }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router