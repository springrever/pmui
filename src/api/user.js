import request from '@/utils/request'
import Cookies from 'js-cookie'

// export function login(usercode, password) {
//   var ret = request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       usercode,
//       password
//     }
//   }),
// params: {
// }
//   return ret
// }
export function userQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/user/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}

// 获取用户的角色信息
export function getRoleByUser(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role/getRoleByUser',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    'Content-Type': 'application/json',
    data: searchItems
  })
  return ret
}

export function insertUserRole(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/user/insertUserRole',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function userInsert(Items) {
  var token = Cookies.get('User-Token')
  // Items.model.roleValue = undefined
  console.log(token)
  console.log(JSON.stringify(Items))
  var ret = request({
    url: '/user/insertUser',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function userUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/user/updateBySelective',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/user/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
