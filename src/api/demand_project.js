/**
 * Create by JMR on Tue Dec 25 15:06:21 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function demand_projectQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_project/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function demand_projectInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/demand_project/insertDemand_project',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function demand_projectfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_project/findByIdDemand_project',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function demand_projectUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_project/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function demand_projectToAproved(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/demand_project/toAproved',
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
    url: '/demand_project/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
