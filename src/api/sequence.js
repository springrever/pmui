/**
 * Create by JMR on Mon Aug 27 11:18:17 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function sequenceQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/sequence/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function getSequence(searchItems) {
  var ret = request({
    url: '/sequence/getSequence',
    method: 'post',
    params: {
      type: searchItems
    }
  })
  return ret
}

export function sequenceInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/sequence/insertSequence',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function sequenceUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/sequence/updateBySelective',
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
    url: '/sequence/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
