/**
 * Created by heganxin on 2018/8/15.
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function bugDetailQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}
export function syncDemand(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/syncDemand',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
export function findtoMap(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/findtoMap',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}
export function getEchars(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/getEchars',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function bugDetailQuery2(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/query2',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function bugDetailInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/bugDetail/insertBugDetail',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function bugDetailUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/bugDetail/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
