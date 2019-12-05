import request from '@/utils/request'

// export function login(usercode, password) {
//   var ret = request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       usercode,
//       password
//     }
//   })
//   return ret
// }
export function login(username, password) {
  var ret = request({
    url: '/auth/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
  return ret
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     data: { token }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    headers: { 'authorization': token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

