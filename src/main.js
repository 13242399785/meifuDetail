// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
// import '../static/iconfont/iconfont.css'
// import './js/drag'
import api from './api/article'
import Axios from 'axios'
// require('es6-promise').polyfill();
// require('es6-promise/auto');

Vue.prototype.$api=api;
Vue.prototype.$axios = Axios

window.router=router
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {

//   if(to.name=='linkqr'){
//     return false;
//   }else if(to.meta=='rolve'&&localStorage.getItem("usertype")=='普通用户'){
//     alert('很抱歉您目前没有管理权限!')
//     next('login');
//     return false;
//   }else{
//     next();
//   }
//   next();
// })