/**
 * Create by JMR on Fri Dec 21 11:20:30 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function demandQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function demandInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/insertDemand',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function toApproval(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/toApproval',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function demandfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/findByIdDemand',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function demandUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function findByVersion(demandCode) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/findByVersion',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      demandCode: demandCode
    }
  })
  return ret
}

export function auditDemand(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand/auditDemand',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}
