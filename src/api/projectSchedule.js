/**
 * Create by JMR on Tue Jan 08 10:05:34 CST 2019
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'

export function taskLevelList(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/taskLevelList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}
export function upTaskLevelList(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/upTaskLevelList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}

export function ProjectProgressList(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/ProjectProgressList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      searchItems: items
    }
  })
  return ret
}
// 查询计划日期
export function selectPlanData(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/selectPlanData',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}
// 查询项目进度单的项目状态
export function selectCalculate(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/selectCalculate',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      items: items
    }
  })
  return ret
}
// 查询项目进度单的项目状态
export function addProjectProgress(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/addProjectProgress',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: items
    }
  })
  return ret
}
// 修改项目计划
export function updateProjectProgress(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/updateProjectProgress',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: items
    }
  })
  return ret
}
// 审核项目计划
export function auditProjectProgress(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/auditProjectProgress',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: items
    }
  })
  return ret
}
// 删除项目进度单
export function deleteProjectProgress(items) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectProgress/deleteProjectProgress',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      Items: items
    }
  })
  return ret
}
