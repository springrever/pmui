/**
 * Create by JMR on Wed Dec 26 09:49:37 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function demand_usersQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_users/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function demand_usersInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_users/insertDemand_users',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function updateDeUsers(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_users/updateDeUsers',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function demand_usersfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_users/findByIdDemand_users',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function demand_usersUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_users/updateBySelective',
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
    url: '/demand_users/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
