import { param2Obj } from '@/utils'
import Mock from 'mockjs'

const issueList = []
const count = 100

for (let i = 0; i < count; i++) {
  issueList.push(Mock.mock({
    issueid: '@id',
    issue_code: '@integer(10000,99999)',
    issue_name: '@ctitle(5,15)',
    issue_desc: '@csentence',
    issue_memo: '@csentence',
    issue_details: '@cparagraph',
    issue_rate: '@integer(1,100)',
    issue_status: '@integer(0,2)', // 0:todo 1:Working 2:Done
    issue_creator: '@cname',
    create_date: +Mock.Random.date('T'),
    history: [{
      handle_date: +Mock.Random.date('T'),
      handler: '@cname',
      handle_desc: '@cparagraph'
    },
    {
      handle_date: +Mock.Random.date('T'),
      handler: '@cname',
      handle_desc: '@cparagraph'
    }]
  }))
}

export default {
  getIssues: config => {
    const { issue_code, issue_name, page = 1, limit = 20, sort } = param2Obj(config.url)
    let mockList = issueList.filter(item => {
      if (issue_code && item.issue_code.indexOf(issue_code) < 0) return false
      if (issue_name && item.issue_name.indexOf(issue_name) < 0) return false
      return true
    })

    if (sort === '-issue_code') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      issues: pageList
    }
  },
  getIssuesByHandler: () => {
    const rsList = issueList.filter(item => {
      if (item.issue_status !== 0) return false
      return true
    })
    return {
      issues_todo: rsList
    }
  }
}
