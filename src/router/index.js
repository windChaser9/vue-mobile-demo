import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/page/home/homeIndex'
import MoreIndex from '@/page/more/moreIndex'
import CellSwipe from '@/page/more/cellSwipe'
import NetEaseView from '@/page/more/netEaseView'

import UserIndex from '@/page/user/userIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex,
      meta: {
        title: 'Home',
        alive: true, // 是否缓存
        requiresAuth: true, // 是否需要校验token
        pageID: 1 // 主页id，对应footer
      }
    },
    {
      path: '/more/moreIndex',
      name: 'MoreIndex',
      component: MoreIndex,
      meta: {
        title: 'More',
        alive: true, // 是否缓存
        pageID: 2 // 主页id，对应footer
      }
    },
    {
      path: '/user/userIndex',
      name: 'UserIndex',
      component: UserIndex,
      meta: {
        title: 'About me',
        alive: true, // 是否缓存
        pageID: 3 // 主页id，对应footer
      }
    },
    {
      path: '/more/cellSwipe',
      name: 'CellSwipe',
      component: CellSwipe,
      meta: {
        title: 'cellSwipe'
      }
    },
    {
      path: '/more/netEaseView',
      name: 'NetEaseView',
      component: NetEaseView,
      meta: {
        title: '网易适配测试'
      }
    }]
})
