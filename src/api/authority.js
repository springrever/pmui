/**
 * Create by JMR on Fri Oct 19 18:15:31 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function authorityQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/authority/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function getAuthoritys(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/authority/getAuthoritys',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token }
  })
  return ret
}

export function authorityInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/authority/insertAuthority',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function authorityUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/authority/updateBySelective',
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
    url: '/authority/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
