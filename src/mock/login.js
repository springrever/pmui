import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    usercode: 'admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    usercode: 'Normal Editor'
  }
}

const userNotFoundErr = {
  code: 1001,
  msg: '用户编码不存在',
  data: ''
}

const passwordIncorrectErr = {
  code: 1002,
  msg: '用户密码不正确',
  data: ''
}

const loginSuccessInfo = {
  code: 1000,
  msg: '登录成功',
  data: { userToken: 'admin' }
}

export default {
  loginByUserCode: config => {
    var data = JSON.parse(config.body)
    // console.log(data)
    var usercode = data.usercode
    var password = data.password
    if (usercode !== 'admin') {
      return userNotFoundErr
    }
    if (password !== 'admin') {
      return passwordIncorrectErr
    }
    return loginSuccessInfo
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    // console.log('123:' + config.url + token)
    if (userMap[token]) {
      console.log(userMap[token])
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
