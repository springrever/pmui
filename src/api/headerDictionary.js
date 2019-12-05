/**
 * Create by JMR on Thu Oct 25 17:30:56 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function headerDictionaryQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/header_dictionary/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function headerDictionaryInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/header_dictionary/insertHeader_dictionary',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function headerDictionaryUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/header_dictionary/updateBySelective',
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
    url: '/header_dictionary/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
