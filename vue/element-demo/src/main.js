import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from '../stroe/index.js'

import App from './App.vue'

Vue.prototype.$ajax = axios;
Vue.use(ElementUi)
// Vue.use(Axios)

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
