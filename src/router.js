import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/timeline.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/response',
      name: 'response',
      component: () => import('./views/response.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/information.vue'),
      meta: {
        keepAlive: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
