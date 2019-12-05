import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/users',
    name: 'Permission',
    meta: { title: '权限管理', icon: 'permission' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'depts',
        name: 'Depts',
        component: () => import('@/views/dept/index'),
        meta: { title: '部门管理', icon: 'dept' }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'user_role' }
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('@/views/menu/index'),
        meta: { title: '菜单管理', icon: 'menu' }
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/dictionary/index'),
        meta: { title: '基础数据维护', icon: 'menu' }
      },
      {
        path: 'scheduleTask',
        name: 'ScheduleTask',
        component: () => import('@/views/scheduleTask/index'),
        meta: { title: '定时任务', icon: 'menu' }
      },
      {
        path: 'fifle',
        name: 'Fifle',
        component: () => import('@/views/fifle/index'),
        meta: { title: '上传模板', icon: 'menu' }
      }
    ]
  },
  {
    path: '/issue',
    component: Layout,
    redirect: '/issue/submit',
    name: 'Issue',
    meta: { title: '问题管理', icon: 'issue' },
    children: [
      {
        path: 'submit',
        name: 'Submit',
        component: () => import('@/views/issue/submit'),
        meta: { title: '问题提交', icon: 'submit' }
      },
      {
        path: 'handle',
        name: 'Handle',
        component: () => import('@/views/issue/handle'),
        meta: { title: '问题处理', icon: 'handle' }
      },
      {
        path: 'statistical',
        name: 'Statistical',
        component: () => import('@/views/issue/statistical'),
        meta: { title: '问题统计', icon: 'statistical' }
      },
      {
        path: 'bugDetailStatistics',
        name: 'BugDetailStatistics',
        component: () => import('@/views/issue/bugDetailStatistics'),
        meta: { title: '问题明细统计', icon: 'statistical' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/demendProjectIndex',
    name: 'project',
    meta: { title: '项目管理', icon: 'issue' },
    children: [
      {
        path: 'demendProjectIndex',
        name: 'demendProjectIndex',
        component: () => import('@/views/project/demendProjectIndex'),
        meta: { title: '项目管理', icon: 'handle' }
      }, {
        path: 'demandProjectedit',
        name: 'demandProjectedit',
        component: () => import('@/views/project/demandProjectedit'),
        meta: { title: '项目看板', icon: 'handle' }
      }, {
        path: 'projectBoard',
        name: 'projectBoard',
        component: () => import('@/views/project/projectBoard'),
        meta: { title: '项目综合看板', icon: 'handle' }
      }, {
        path: 'projectPlan',
        name: 'projectPlan',
        component: () => import('@/views/project/projectPlan'),
        meta: { title: '项目计划', icon: 'handle' }
      }, {
        path: 'projectBudget',
        name: 'projectBudget',
        component: () => import('@/views/project/projectBudget'),
        meta: { title: '项目预算', icon: 'issue' }
      }, {
        path: 'projectPlanList',
        name: 'projectPlanList',
        component: () => import('@/views/project/projectPlanList'),
        meta: { title: '项目计划列表', icon: 'handle' }
      }, {
        path: 'projectEdit',
        name: 'projectEdit',
        hidden: 'true',
        component: () => import('@/views/project/projectEdit'),
        meta: { title: '项目详情', icon: 'handle' }
      }, {
        path: 'projectSchedule',
        name: 'projectSchedule',
        component: () => import('@/views/project/projectSchedule'),
        meta: { title: '项目进度单', icon: 'handle' }
      }, {
        path: 'projectScheduleEdit',
        name: 'projectScheduleEdit',
        hidden: 'true',
        component: () => import('@/views/project/projectScheduleEdit'),
        meta: { title: '编辑项目进度单', icon: 'handle' }
      }, {
        path: 'index',
        name: 'index',
        component: () => import('@/views/template/index'),
        meta: { title: '项目模板', icon: 'handle' }
      }, {
        path: 'child',
        name: 'child',
        hidden: 'true',
        component: () => import('@/views/template/child'),
        meta: { title: '查看模板', icon: 'handle' }
      }
    ]
  },
  {
    path: '/requirements',
    component: Layout,
    redirect: '/requirements/demandindex',
    name: 'requirements',
    meta: { title: '需求管理', icon: 'issue' },
    children: [
      {
        path: 'demandindex',
        name: 'demandindex',
        component: () => import('@/views/requirements/demandindex'),
        meta: { title: '需求管理', icon: 'handle' }
      }, {
        path: 'demandedit',
        name: 'demandedit',
        hidden: true,
        component: () => import('@/views/requirements/demandedit'),
        meta: { title: '需求详细信息', icon: 'handle' }
      }
    ]
  },
  {
    path: '/weekly',
    component: Layout,
    redirect: '/weekly/index',
    name: 'weekly',
    meta: { title: '周报管理', icon: 'weekly' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/weekly/index'),
        meta: { title: '开发任务', icon: 'product' }
      },
      {
        path: '/devTasks',
        name: 'devTasks',
        hidden: 'true',
        component: () => import('@/views/weekly/devTasks'),
        meta: { title: '开发任务-新增维护', icon: 'product' }
      },
      {
        path: 'maintainUpdate',
        name: 'maintainUpdate',
        hidden: true,
        component: () => import('@/views/weekly/maintainUpdate'),
        meta: { title: '日常维护-新增维护', icon: 'day' }
      },
      {
        path: 'index2',
        name: 'index2',
        component: () => import('@/views/weekly/index2'),
        meta: { title: '日常维护', icon: 'day' }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/weekly/statistics'),
        meta: { title: '周报统计', icon: 'statistics' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   meta: { title: 'Form', icon: 'form' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
