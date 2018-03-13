'use strict'

import axios from 'axios'
// import qs from 'qs'

const _config = {
  slave: 'http://slave.homed.me', // slave请求地址
  dtv: 'http://dtv.homed.me', // dtv请求地址
  access: 'http://access.homed.me' // access请求地址
}
// 添加请求拦截器，请求之前对相关参数进行修改
axios.interceptors.request.use(config => {
  // 在发送请求之前给每个请求拼接一个token，无此参数可去掉此部分
  const token = localStorage.getItem('token')
  const type = config.method === 'get' ? 'params' : 'data'

  if (config[type]) {
    if (config[type].accesstoken === 'unwanted') { // 配置不需要token
      delete config[type].accesstoken
    } else if (!config[type].accesstoken) { // 配置以config中的token为先
      config[type].accesstoken = token // 给config添加默认的token
    }
  } else {
    config[type] = { accesstoken: token }
  }

  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据之前检查是否返回错误消息
  return response
}, error => {
  console.log(error)
  // 对响应错误做点什么
  return Promise.resolve(error.response)
})

/**
 * [检查状态]
 * @param  {[object]} response [返回结果]
 * @param  {[boolean]} nocheck  [是否执行检查]
 * @return {[object]}          [返回结果]
 */
function checkStatus (response, nocheck) {
  if (nocheck) { // 直接返回
    return response.data
  }
  // 当接口返回数据不存在认为接口异常，跳转到登陆页面
  if (!response) {
    // router.replace({path: '/login'})
  }

  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // token失效时跳转到登陆页面，让用户重新登陆
    if (response.data.ret === 9021 || response.data.ret === 9022) {
      // Toast('TOKEN失效')
      localStorage.removeItem('HomedTOKEN')
      // router.push({path: '/login'})
    }
    return response.data
  }

  // 其余情况认为接口异常，给出提示，跳转到登陆页面
  // Toast('服务器异常')
  // router.replace({path: '/login'})

  // 异常状态下，把错误信息返回出去
  // 由于前面页面做了跳转，此部分代码也无实际意义，可去掉
  return {
    status: -404,
    msg: '网络异常'
  }
}

// 为需要catch中处理异常的封装提供方法
function checkCode (res) {
  // 如果code异常（这里已经包括网络错误，服务器错误，后端抛出的错误），可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // Toast(res.msg)
  } else {
    // Toast('服务器异常')
  }
  // 系统发生接口请求发生异常时为了美观让页面跳转到登陆页
  // router.replace({path: '/login'})
  return res
}

export default {
  // 此处不用Promise封装，调用时直接采用最新的async/await写法即可
  /**
   * [get get封装]
   * @param  {[type]} type    [接口的http地址，baseURL有多个时需此参数]
   * @param  {[type]} url     [接口去除baseURL后路径]
   * @param  {[type]} params  [参数]
   * @param  {[type]} nocheck [返回数据是否进行过滤，默认不]
   * @return {[type]}         [description]
   */
  get (http, url, params, nocheck) {
    return axios({
      method: 'get',
      baseURL: http === 'slave' ? _config.slave : http === 'access' ? _config.access : http === 'dtv' ? _config.dtv : '',
      url,
      params, // get请求时带的参数
      timeout: 10000
    }).then(res => {
      return checkStatus(res, nocheck)
    }).catch(res => {
      return checkCode(res)
    })
  },
  /**
   * [post封装，其中post方法为解决跨域加入了Content-Type限定请求方式为form data形式，对于payload形式的请求不支持]
   * @param  {[string]} http [接口的http地址]
   * @param  {[string]} url  [接口去除域名后路径]
   * @param  {[object]} data [参数]
   * @param  {[boolean]} bfy [是否将json格式字符串数据转化为json格式传送，默认转化]
   */
  post (http, url, data, bfy) {
    // 此种axios封装catch部分其实无效，所有消息全部会在then中捕获，不像axios.get或.post提供了catch捕获异常
    return axios({
      method: 'post',
      baseURL: http === 'slave' ? _config.slave : http === 'access' ? _config.access : http === 'dtv' ? _config.dtv : '',
      url,
      data: data, // qs.stringify(data)根据需要是否转化为json字符串
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(res => {
      return checkStatus(res)
    }).catch(res => {
      return checkCode(res)
    })
  }
}
