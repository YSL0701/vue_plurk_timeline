import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
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
      path: '/plurk/:plurk_id',
      name: 'plurk',
      component: () => import('./views/plurkPage.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: () => import('./views/bookmark.vue'),
      meta: {
        keepAlive: true,
        title: '書籤 - 噗浪時光機'
      }
    },
    {
      path: '/bookmark/:plurk_id',
      name: 'bookmarkPage',
      component: () => import('./views/bookmarkPage.vue'),
      meta: {
        keepAlive: false,
        title: '書籤 - 噗浪時光機'
      }
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('./views/information.vue'),
      meta: {
        keepAlive: false,
        title: '說明 - 噗浪時光機'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue'),
      meta: {
        keepAlive: false,
        title: '關於 - 噗浪時光機'
      }
    },
    {
      path: '*',
      redirect: '/'
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

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '噗浪時光機'
  }
  next()
})

export default router
