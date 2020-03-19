import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Info from '../views/Info.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redierct:'/home',
    children:[
      {path:'/home',name:'Home',component:Home},
      {path:'/info',name:'Info',component:Info},
      {path:'/article/:aid',name:'Article',component:Article}
    ] 
  }
]

const router = new VueRouter({
  routes
})

export default router