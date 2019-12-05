/**
 * Create by JMR on Fri Oct 19 17:52:18 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function roleAuthorityQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role_authority/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function role_authorityInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/role_authority/insertRole_authority',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function roleAuthorityUpdate(Items) {
  var token = Cookies.get('User-Token')
  Items.createUserId = user.state.usercode
  var ret = request({
    url: '/role_authority/roleAuthorityUpdate',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    sync: false,
    data: Items
  })
  return ret
}

export function roleAuthorityUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/role_authority/updateBySelective',
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
    url: '/role_authority/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
