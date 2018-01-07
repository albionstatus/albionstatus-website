import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/Index'),
      meta: {
        title: 'AlbionStatus - Albion Online server status tracker'
      }
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../pages/LegalNotice'),
      meta: {
        title: 'AlbionStatus - Legal notice'
      }
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('../pages/Charts'),
      meta: {
        title: 'AlbionStatus - Uptime Charts'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../pages/Privacy'),
      meta: {
        title: 'AlbionStatus - Privacy'
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../pages/Faq'),
      meta: {
        title: 'AlbionStatus - FAQ'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../pages/NotFound'),
      meta: {
        title: '404 - No server status found!'
      }
    },
    {
      path: '*',
      redirect: '404'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
