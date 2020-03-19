import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'

import Main from '../views/Main.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Article from '../views/Article.vue'
import ArticleEdit from '../views/ArticleEdit.vue'

import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Main',
    component: Main,
    children:[
      {path:'/admin/user/',component:User},
      {path:'/admin/userAdd',component:UserEdit},
      {path:'/admin/userEdit/:username/:email/:role/:state',component:UserEdit},
      {path:'/admin/article/',component:Article},
      {path:'/admin/articleAdd/:uid',component:ArticleEdit},
      {path:'/admin/articleEdit/:_id/:title/:userID',component:ArticleEdit}
    ]
  },
  {
    path:'/home',
    name:'Home',
    component:Home
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
