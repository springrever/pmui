import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserCode } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    usercode: '',
    avatar: '',
    roles: [],
    authoritys: [],
    deptid: '',
    deptname: '',
    fullName: '',
    number: ''
  },

  mutations: {
    SET_NUMBER: (state, number) => {
      state.number = number
    },
    SET_FULLNAME: (state, fullName) => {
      state.fullName = fullName
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERCODE: (state, usercode) => {
      state.usercode = usercode
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHORITYS: (state, authoritys) => {
      state.authoritys = authoritys
    },
    SET_DEPTID: (state, deptid) => {
      state.deptid = deptid
    },
    SET_DEPNAME: (state, deptname) => {
      state.deptname = deptname
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const usercode = userInfo.usercode.trim()
      return new Promise((resolve, reject) => {
        login(usercode, userInfo.password).then(response => {
          if (response.data.Code !== '403') {
            const data = response.data
            setToken(data)
            setUserCode(usercode)
            commit('SET_TOKEN', data)
            resolve()
          } else {
            reject(response.data.Msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          if (data.authoritys && data.authoritys.length > 0) { // 验证返回的AUTHORITYS是否是一个非空数组
            commit('SET_AUTHORITYS', data.authoritys)
          } else {
            reject('getInfo: authoritys must be a non-null array !')
          }
          commit('SET_USERCODE', data.usercode)
          commit('SET_NUMBER', data.number)
          commit('SET_FULLNAME', data.fullName)
          commit('SET_AVATAR', data.avatar)
          if (data.deptid) {
            commit('SET_DEPTID', data.deptid)
            commit('SET_DEPNAME', data.deptname)
          } else {
            reject('用户部门不能为空')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        /* logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })*/
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERCODE', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
