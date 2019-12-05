/* eslint-disable no-unused-vars */
/**
 * Create by JMR on Tue Jan 08 10:05:34 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function templateList(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectTemplate/templateList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  return ret
}
export function insertTemplate(Items) {
  var token = Cookies.get('User-Token')
  Items.model.create_by = user.state.usercode
  Items.model.update_by = user.state.usercode
  var ret = request({
    url: '/projectTemplate/insertTemplate',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}
export function updateLockTemplate(Items) {
  var token = Cookies.get('User-Token')
  Items.model.create_by = user.state.usercode
  Items.model.update_by = user.state.usercode
  var ret = request({
    url: '/projectTemplate/updateLockTemplate',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}
export function childList(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectChild/selectProjectChildList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  return ret
}
export function saveChild(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectChild/saveChild',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

