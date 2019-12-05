import { asyncRouterMap, constantRouterMap } from '@/router'
import { getUserRouters } from '@/api/permission'
import { removeToken } from '@/utils/auth'
// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }
//
// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

/**
 *
 * @param {Array} userRouter 后台返回的用户权限json
 * @param {Array} allRouter 前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
function recursionRouter(userRouter = [], allRouter = []) {
  var realRoutes = []
  allRouter.forEach((v) => {
    if (v.meta) {
      userRouter.forEach((item) => {
        // if (item.title === '问题管理' && v.meta.title === '问题管理') {
        //   debugger
        // }
        if (v.meta.title === '项目详情')console.log(item.title + '->', v.meta.title)
        if (item.title === v.meta.title) {
          if (item.children && item.children.length > 0) {
            v.children = recursionRouter(item.children, v.children)
          }
          realRoutes.push(v)
        }
      })
    } else {
      realRoutes.push(v)
    }
  })
  // debugger
  return realRoutes
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    /* GenerateRoutes({ commit }, data) {
        return new Promise(resolve => {
          const { roles } = data
          let accessedRouters
          if (roles.indexOf('admin') >= 0) {
            accessedRouters = asyncRouterMap
          } else {
            accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          }
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      } */
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        getUserRouters(roles).then(response => {
          console.log('路由返回response', response)
          const dynamicRouter = response.data
          // let accessedRouters
          // if (roles.indexOf('admin') >= 0) {
          //   accessedRouters = asyncRouterMap
          // } else {
          //   accessedRouters = recursionRouter(dynamicRouter, asyncRouterMap)
          // }
          var accessedRouters = recursionRouter(dynamicRouter, asyncRouterMap)
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        }).catch(error => {
          console.log(error)
          removeToken()
          reject(error)
        })
      })
    }
  }
}

export default permission
