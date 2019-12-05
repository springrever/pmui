/**
 * Create by JMR on Fri Nov 23 08:41:13 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function scheduleTaskQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/scheduleTask/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function scheduleTaskInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/scheduleTask/insertScheduleTask',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function scheduleTaskUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/scheduleTask/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: Items
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/scheduleTask/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
