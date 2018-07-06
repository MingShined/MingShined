import Vue from 'vue'
import App from './App.vue'
import router from './router/vueRouter.config.js'
// import VueRouter from 'vue-router'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
