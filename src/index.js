// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/tool/adjustPage'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ajax from '@/tool/ajax'

Vue.config.productionTip = false
// vue引入mint-ui
Vue.use(MintUI)
// 全局将封装的ajax绑定在vue上
Vue.prototype.$ajax = ajax
// 全局将MintUI绑定在vue上
Vue.prototype.$MintUI = MintUI
// 定义全局路由钩子，此处采用async/await方案，所有路由内接口等待需要的认证后执行
router.beforeEach(async (to, from, next) => {
  // 当前页面需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
  }
  // 默认头部显示，底部不显示，页面可自行设置
  store.state.isShowHeader = true
  store.state.isShowFooter = false
  // 修改路由页面标题
  document.title = to.meta.name ? to.meta.name : document.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
