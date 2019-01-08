import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/timeline.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/information.vue')
    }
  ]
})
