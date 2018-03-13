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
// 定义全局路由钩子,为避免路由内组件接口在没有token的情况下，此处采用async/await方案，所有路由内接口等待token验证后执行
router.beforeEach(async (to, from, next) => {
  // 当前页面需要认证（需要token）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem('HomedTOKEN')
    // token不存在时以游客身份登陆
    if (!token) {
      // 游客登陆前先清除本地已登陆的用户信息
      localStorage.removeItem('HomedTOKEN')
      localStorage.removeItem('HomedUserID')
      localStorage.removeItem('HomedDeviceID')
      localStorage.removeItem('HomedHomeID')
      localStorage.removeItem('nickName')
      let refreshToken, refreshTime
      let num = 0
      // 游客登陆
      await ajax.post('slave', '/account/get_access_token', {
        role: 'guest',
        deviceno: '11223344556677',
        deviceType: 'yuj',
        accesstoken: 'unwanted'
      }, true).then(res => {
        localStorage.setItem('HomedTOKEN', res.accessToken)
        localStorage.HomedIsGuest = 1
        refreshToken = res.refreshToken
        refreshTime = res.refreshTime
      })
      // 定时刷新token
      let rTimer = setInterval(async () => {
        if (num > refreshTime) {
          await ajax.post('slave', '/account/refresh_access_token', {
            accessToken: localStorage.HomedTOKEN,
            refreshToken: refreshToken,
            accesstoken: 'unwanted'
          }, true).then(res => {
            localStorage.setItem('HomedTOKEN', res.accessToken)
            clearInterval(rTimer)
          })
        } else {
          num++
        }
      }, 1000)
    }
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
