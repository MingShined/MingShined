import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Detail from '../components/Detail.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/home',
    component: Home
  }, {
    path: '/news',
    component: News,
    children: [{
      path: 'detail/:id',
      component: Detail
    }]
  }]
});

export default router;
