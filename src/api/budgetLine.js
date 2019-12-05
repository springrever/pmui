/**
 * Create by JMR on Thu Jan 17 09:32:38 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function budgetLineQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetLine/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function budgetLineInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetLine/insertBudgetLine',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function budgetLinefindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetLine/findByIdBudgetLine',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function budgetLineUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/budgetLine/updateBySelective',
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
    url: '/budgetLine/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
