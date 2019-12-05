import request from '@/utils/request'

// 查询问题
export function fetchIssues(query) {
  return request({
    url: '/issue/getIssues',
    method: 'get',
    params: query
  })
}

// 查询处理人对应的问题
export function fetchIssuesByHandler() {
  return request({
    url: '/issue/getIssuesByHandler',
    method: 'post'
  })
}
