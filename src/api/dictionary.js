/**
 * Create by JMR on Thu Aug 16 10:12:17 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
// import user from '@/store/modules/user'

export function getDictionary(item) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dictionary/getDictionary',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
    }
  })
  return ret
}

export function getDicTypes() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dictionary/getDicTypes',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token }
  })
  return ret
}

export function dictionaryQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dictionary/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  return ret
}

export function dictionaryInsert(Items) {
  var token = Cookies.get('User-Token')
  // Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/dictionary/insertDictionary',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function dictionaryUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/dictionary/updateBySelective',
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
    url: '/dictionary/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
