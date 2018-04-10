// 存放相关模块的接口，第二次封装
import ajax from '@/tool/ajax'

// 比如获取用户信息接口
export function getUserInfo(type = '', data = {}) {
  return ajax.get(type, '/api/user/getInfo', data)
}