/**
 * Created by heganxin on 2018/8/13.
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function rolePowerQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/rolepower/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      searchItems: searchItems
    }
  })
  return ret
}

export function getSelectByRoleId(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/rolepower/getSelectByRoleId',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function rolePowerUpdate(Items) {
  var token = Cookies.get('User-Token')
  Items.createUserId = user.state.usercode
  var ret = request({
    url: '/rolepower/rolePowerUpdate',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    sync: false,
    data: Items
  })
  return ret
}
