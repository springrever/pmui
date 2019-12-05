import { param2Obj } from '@/utils'
import Mock from 'mockjs'

const userList = []
const count = 100
const roleList = []

const RouterMap = {
  code: 2000,
  msg: '获取权限成功',
  data: [
    // {
    //   title: '权限管理',
    //   children: [
    //     {
    //       title: '用户管理'
    //     },
    //     {
    //       title: '部门管理'
    //     }]
    // },
    {
      title: 'Example',
      children: [
        {
          title: 'Table'
        },
        {
          title: 'Tree'
        }
      ]
    },
    {
      title: 'Form',
      children: [
        {
          title: 'Form'
        }
      ]
    }
  ]
}

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    cuserid: '@id',
    userCode: '@string(10)',
    userName: '@cname',
    ableDate: +Mock.Random.date('T'),
    disableDate: +Mock.Random.date('T'),
    isLocked: false,
    userNote: '@csentence'
  }))
}

const DeptTree = {
  code: 1000,
  msg: '获取部门信息成功',
  data: [{
    'canceled': false,
    'children': [{
      'canceled': false,
      'children': [{
        'canceled': false,
        'createtime': 1533114629000,
        'deptCode': 'LQ010102',
        'deptId': '3',
        'deptLevel': '3',
        'deptName': '龙旗测试部门',
        'deptNote': 'LQ010102',
        'deptShortName': '龙旗测试',
        'parentID': '2',
        'ts': 1533114629000
      }],
      'createtime': 1533114727000,
      'deptCode': 'LQ0101',
      'deptId': '2',
      'deptLevel': '2',
      'deptName': '龙旗开发部',
      'deptNote': 'LQ0101',
      'deptShortName': '龙旗',
      'parentID': '1',
      'ts': 1533114727000
    }, {
      'canceled': false,
      'children': [],
      'createtime': 1533288220000,
      'deptCode': 'LQ0102',
      'deptId': '4',
      'deptLevel': '2',
      'deptName': '龙旗实施部门',
      'deptNote': 'LQ0102',
      'deptShortName': '龙旗',
      'parentID': '1',
      'ts': 1533288220000
    }],
    'createtime': 1533114629000,
    'deptCode': 'LQ01',
    'deptId': '1',
    'deptLevel': '1',
    'deptName': '龙旗主部门',
    'deptNote': 'LQ01',
    'deptShortName': '龙旗',
    'parentID': '0',
    'ts': 1533114629000
  }, {
    'canceled': false,
    'children': [{
      'canceled': false,
      'children': [],
      'createtime': 1533615803000,
      'deptCode': 'LQ0201',
      'deptId': '6',
      'deptLevel': '2',
      'deptName': '龙旗主软件部门',
      'deptNote': 'LQ0201',
      'deptShortName': '龙旗',
      'parentID': '5',
      'ts': 1533615803000
    }],
    'createtime': 1533615748000,
    'deptCode': 'LQ02',
    'deptId': '5',
    'deptLevel': '1',
    'deptName': '龙旗主部门2',
    'deptNote': 'LQ02',
    'deptShortName': '龙旗',
    'parentID': '0',
    'ts': 1533615748000
  }]
}

const MenuTree = {
  code: 1000,
  msg: '获取菜单信息成功',
  data: [
    {
      fun_code: '1001',
      fun_name: '权限管理',
      fun_desc: '权限管理',
      url: '/permission',
      children: [
        {
          fun_code: '100101',
          fun_name: '用户管理',
          fun_desc: '用户管理',
          url: '/permission/users'
        },
        {
          fun_code: '100102',
          fun_name: '部门管理',
          fun_desc: '部门管理',
          url: '/permission/depts'
        },
        {
          fun_code: '100103',
          fun_name: '角色管理',
          fun_desc: '角色管理',
          url: '/permission/roles'
        },
        {
          fun_code: '100104',
          fun_name: '菜单管理',
          fun_desc: '菜单管理',
          url: '/permission/menus'
        }
      ]
    },
    {
      fun_code: '1002',
      fun_name: '问题管理',
      fun_desc: '问题管理',
      url: '/issue',
      children: [
        {
          fun_code: '100201',
          fun_name: '问题提交',
          fun_desc: '问题提交',
          url: '/issue/submit'
        },
        {
          fun_code: '100202',
          fun_name: '问题分配',
          fun_desc: '问题分配',
          url: '/issue/allot'
        }
      ]
    }
  ]
}

for (let i = 0; i < count; i++) {
  roleList.push(Mock.mock({
    roleId: '@id',
    role_code: 'Role@' + '@String(2)',
    role_name: 'Role@' + '@cword(2)',
    role_memo: '@csentence',
    creator: '@cname',
    createtime: +Mock.Random.date('T')
  }))
}

export default {
  getRoutersInfo: config => {
    return RouterMap
  },
  getUsers: config => {
    const { userCode, userName, page = 1, limit = 20, sort } = param2Obj(config.url)
    let mockList = userList.filter(item => {
      if (userCode && item.userCode.indexOf(userCode) < 0) return false
      if (userName && item.userName.indexOf(userName) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      users: pageList
    }
  },
  createUser: () => ({
    data: 'success'
  }),
  updateUser: () => ({
    data: 'success'
  }),
  getDepts: () => {
    return DeptTree
  },
  getRoles: config => {
    const { role_code, role_name, page = 1, limit = 20, sort } = param2Obj(config.url)
    let mockList = roleList.filter(item => {
      if (role_code && item.role_code.indexOf(role_code) < 0) return false
      if (role_name && item.role_name.indexOf(role_name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      roles: pageList
    }
  },
  createRole: () => ({
    data: 'success'
  }),
  updateRole: () => ({
    data: 'success'
  }),
  getMenus: () => {
    return MenuTree
  }
}
