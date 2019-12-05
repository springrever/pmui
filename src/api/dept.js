import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'
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
export function deptQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dept/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}

export function finddeptnode(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dept/finddeptnode',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token }
  })
  return ret
}

export function deptInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/dept/adddept',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    'Content-Type': 'application/json',
    data: Items
  })
  return ret
}

export function deptUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dept/updateBySelective',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}
