/**
 * Create by JMR on Fri Aug 24 11:23:17 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function filesQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/files/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function getFile(id) {
  var ret = request({
    url: '/files/n/getFile?id=' + id,
    method: 'GET'
  })
  return ret
}

export function filesInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/files/insertFiles',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function filesUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/files/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function deleteById(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/files/deleteById',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: Items
    }
  })
  return ret
}

export function addFiles(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/files/addFiles',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}
