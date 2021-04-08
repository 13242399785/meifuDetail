import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
  	// {
  	// 	path: '/',
    //   redirect: 'login',
    // },
    {
      path: "*",
      redirect: "/404",
      // component:() => import('@/pages/404')
    },
    {
      path: "/404",
      name: "/404",
      component:() => import('@/pages/404')
    },
    {
      path: '/feedback/:id/:index',
      name: 'feedback',
      component:() => import('@/pages/feedback/feedback')
    },
    {
      path: '/info/:id/:index', 
      name: 'info',
      meta:{
        title:'我的信息'
      },
      component:() => import('@/pages/info/info')
    },

    {
      path: '/scheme/:id',
      name: 'scheme',
      component:() => import('@/pages/scheme/scheme')
    },
  ],
  
})

