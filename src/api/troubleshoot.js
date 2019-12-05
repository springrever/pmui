/**
 * Create by JMR on Mon Sep 03 10:45:56 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function troubleshootQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/troubleshoot/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function troubleshootInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/troubleshoot/insertTroubleshoot',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function troubleshootUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/troubleshoot/updateBySelective',
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
    url: '/troubleshoot/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
