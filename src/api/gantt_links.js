/**
 * Create by JMR on Tue Jan 08 10:05:06 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function gantt_linksQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/gantt_links/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function gantt_linksInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/gantt_links/insertGantt_links',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function gantt_linksfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/gantt_links/findByIdGantt_links',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function gantt_linksUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/gantt_links/updateBySelective',
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
    url: '/gantt_links/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
