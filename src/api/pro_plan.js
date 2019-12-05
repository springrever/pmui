/**
 * Create by JMR on Tue Dec 25 14:52:41 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function pro_planQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/pro_plan/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function pro_planInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/pro_plan/insertPro_plan',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function pro_planfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/pro_plan/findByIdPro_plan',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function pro_planUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/pro_plan/updateBySelective',
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
    url: '/pro_plan/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
