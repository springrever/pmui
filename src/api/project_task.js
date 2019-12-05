/**
 * Create by JMR on Tue Jan 08 10:05:34 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
import user from '@/store/modules/user'

export function project_taskQuery(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/query',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}
export function queryAndChildren(searchItems) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/queryAndChildren',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: searchItems
  })
  console.log('send usercode:' + user.state.usercode)
  return ret
}

export function project_taskInsert(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/insertProject_task',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function project_taskfindById(id) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/findByIdProject_task',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      id: id
    }
  })
  return ret
}

export function project_taskUpdateBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/updateBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function deleteBySelective(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/deleteBySelective',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      Items: Items
    }
  })
  return ret
}

export function listProjectTask(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/listProjectTask',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      items: Items
    }
  })
  return ret
}

export function projectTemplateList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectTemplate/projectTemplateList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
    }
  })
  return ret
}

export function insertProjectTaskChild(templateId, projectId, createBy) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/insertProjectTaskChild',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    params: {
      templateId: templateId,
      projectId: projectId,
      createBy: createBy
    }
  })
  return ret
}

export function revisionProjectTask(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/revisionProjectTask',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}

export function taskChildList(templateId) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/projectChild/taskChildList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      templateId: templateId
    }
  })
  return ret
}

export function selectDuration(Items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/project_task/selectDuration',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: Items
    }
  })
  return ret
}
