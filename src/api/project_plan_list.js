/**
 * Create by JMR on Tue Jan 08 10:05:34 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function project_taskQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}
export function project_taskInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/insertProject_task',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function getUserRouters(roles) {
  console.log('这里是开始路由请求')
  return request({
    url: '/permission/getRouters',
    // url: '/permission/getRouters',
    method: 'post',
    // headers: { 'Authorization': 'LAP' + getToken() },
    params: { },
    data: { roles }
  })
}
// 获得菜单信息
export function fetchMenus() {
  return request({
    url: '/project_task/query',
    method: 'get'
  })
}
// 新增菜单
export function insertfun(params) {
  return request(
    {
      url: '/fun/insertFun',
      method: 'post',
      // headers: { 'Authorization': 'LAP' + getToken() },
      params: { params }
    }
  )
}
// 更新菜单
export function updatefun(params) {
  console.log(params)
  return request(
    {
      url: '/fun/updateBySelective',
      method: 'post',
      // headers: { 'Authorization': 'LAP' + getToken() },
      params: { params }
    }
  )
}

export function taskStatusInfo(projectId) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectTaskStatus/taskStatusInfo',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      projectId: projectId
    }
  })
  return ret
}

export function updateTaskStatus(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectTaskStatus/updateTaskStatus',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}

export function taskVersionList(projectId) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/taskVersionList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      projectId: projectId
    }
  })
  return ret
}

export function selectTaskVersion(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/selectTaskVersion',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}

export function selectVerify(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/selectVerify',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}
