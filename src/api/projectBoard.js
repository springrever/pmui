/**
 * Create by JMR on Fri Dec 21 11:20:30 CST 2018
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'
// import user from '@/store/modules/user'

export function milestoneList(projectId) {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/milestoneList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
      projectId: projectId
    }
  })
  return ret
}
// 项目看板的等待启动
export function WaitingList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/WaitingList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
    }
  })
  return ret
}
// 项目看板的项目准备
export function startList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/startList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
    }
  })
  return ret
}
// 项目看板的项目蓝图
export function blueprintList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/blueprintList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
    }
  })
  return ret
}
// 项目看板的系统搭建
export function structuresList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/structuresList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
    }
  })
  return ret
}
// 项目看板的系统上线
export function onlineList() {
  var token = Cookies.get('User-Token')
  var ret = request({
    url: '/ProjectBoard/onlineList',
    method: 'post',
    headers: { 'authorization': 'LAP ' + token },
    data: {
    }
  })
  return ret
}
