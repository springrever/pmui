/**
 * Created by heganxin on 2018/11/21.
 */
/**
 * Created by heganxin on 2018/8/6.
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function excleOutPut(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/excle/outPut',
    method: 'post',
    'Content-Type': 'application/json',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

