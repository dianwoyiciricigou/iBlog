import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/admin/user',component:User}
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{ isPublic:true }
  }
]

const router = new VueRouter({
  routes
})

//前端路由守卫，阻止用户通过地址栏直接访问私密页面
router.beforeEach((to,from,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
