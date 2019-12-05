/**
 * Create by JMR on Mon Nov 12 10:26:55 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function weeklyHeaderQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyHeader/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function weeklyHeaderInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/weeklyHeader/insertWeeklyHeader',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function weeklyHeaderUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyHeader/updateBySelective',
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
    url: '/weeklyHeader/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
