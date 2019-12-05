/**
 * Created by heganxin on 2018/8/6.
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'
// export function login(rolecode, password) {
//   var ret = request({
//     url: '/role/login',
//     method: 'post',
//     data: {
//       rolecode,
//       password
//     }
//   }),
// params: {
// }
//   return ret
// }
export function roleQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role/query',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function roleInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/role/insertRole',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function roleUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
