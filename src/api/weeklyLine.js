/**
 * Create by JMR on Mon Nov 12 11:06:48 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function weeklyLineQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}

export function readWeeklyLine(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/readWeeklyLine',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}

export function findDarw(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/findDarw',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}
export function daliyDarw(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/daliyDarw',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}
export function getStatisExcel(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/files/n/weeklyLine/getStatisExcel',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}
export function weeklyLineInsert(Items) {
  var token = Cookies.get('User-Token')
  Items.model.createUserId = user.state.usercode
  var ret = request({
    url: '/weeklyLine/insertWeeklyLine',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}

export function weeklyLineUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/weeklyLine/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}
