import Mock from 'mockjs'
import loginAPI from './login'
import PermissionAPI from './permission'
import IssueAPI from './issue'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock('/user/login', 'post', loginAPI.loginByUserCode)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock('/permission/getRouters', 'post', loginAPI.getRoutersInfo)

// 权限相关
Mock.mock('/permission/getRouters', 'post', PermissionAPI.getRoutersInfo)
Mock.mock(/\/user\/getUsers\.*/, 'get', PermissionAPI.getUsers)
Mock.mock(/\/user\/createUser/, 'post', PermissionAPI.createUser)
Mock.mock(/\/user\/updateUser/, 'post', PermissionAPI.updateUser)

Mock.mock(/\/dept\/getDepts/, 'post', PermissionAPI.getDepts)

Mock.mock(/\/role\/getRoles\.*/, 'get', PermissionAPI.getRoles)
Mock.mock(/\/role\/createRole/, 'post', PermissionAPI.createRole)
Mock.mock(/\/role\/updateRole/, 'post', PermissionAPI.updateRole)

Mock.mock(/\/menu\/getMenus/, 'post', PermissionAPI.getMenus)

// 问题相关
Mock.mock(/\/issue\/getIssues\.*/, 'get', IssueAPI.getIssues)
Mock.mock(/\/issue\/getIssuesByHandler/, 'post', IssueAPI.getIssuesByHandler)

