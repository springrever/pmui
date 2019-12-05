import request from '@/utils/request'
// import { getToken } from '../utils/auth'

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

// 查询用户
export function fetchUsers(query) {
  return request({
    url: '/user/getUsers',
    method: 'get',
    params: query
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/user/createUser',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

// 获得部门信息
export function fetchDepts() {
  return request({
    url: '/dept/getDepts',
    method: 'post'
  })
}

// 获得角色信息
export function fetchRoles(query) {
  return request({
    url: '/role/getRoles',
    method: 'get',
    params: query
  })
}

// 创建角色
export function createRole(data) {
  return request({
    url: '/role/createRole',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data
  })
}

// 获得菜单信息
export function fetchMenus() {
  return request({
    url: '/fun/query',
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

