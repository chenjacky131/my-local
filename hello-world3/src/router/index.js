import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'list',
    meta:{
      needLogin: true
    },
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
  },
  {
    path: '/edit',
    name: 'EditView',
    meta:{
      needLogin: true
    },
    component: () => import(/* webpackChunkName: "editView" */ '../views/Edit.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../components/registerAndLogin/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/registerAndLogin/Login.vue')
  },
  {
    path: '/:path(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  //  读取的是publicPath
  routes
});
router.beforeEach((to, from) => {
  const user = sessionStorage.getItem('user');
  if(!user){
    if(to.meta?.needLogin){
      return {
        path: '/login'
      }
    }
  }else{
    if(to.path === '/login'){
      return false
    }
  }
})

export default router
