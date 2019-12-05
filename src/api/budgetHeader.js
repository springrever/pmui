/**
 * Create by JMR on Thu Jan 17 09:26:56 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function budgetHeaderQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function budgetHeaderInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/insertBudgetHeader',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}
export function insertBudgetHeaderAndLine(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/insertBudgetHeaderAndLine',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function budgetHeaderfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/findByIdBudgetHeader',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}
export function findVersionByProjectId(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/findVersionByProjectId',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function budgetHeaderUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/updateBySelective',
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
    url: '/budgetHeader/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function ProjectBudgetInfo(code) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/ProjectBudgetInfo',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      code: code
    }
  })
  return ret
}

export function updateByStatus(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetHeader/updateByStatus',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}
