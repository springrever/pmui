
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
export function dateFtt(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
// 全局page注册
export function initPage(thisobj, thisService) {
  // 定义传入后台的参数 Page为分页对象  items查询条件对象

  thisobj.searchForm = {}
  thisobj.searchForm.page = {}
  thisobj.searchForm.page.nowPage = 1
  thisobj.searchForm.page.nowcont = 20
  thisobj.searchForm.items = {}
  // 回车键
  thisobj.enterKeyup = function(e, str) {
    var keycode = window.event ? e.keyCode : e.which
    if (keycode === 13) {
      thisobj.searchAll(str)
    }
  }

  thisobj.selects = {
    '5': 5,
    '10': 10,
    '20': 20
  }

  // 查询
  thisobj.search = function search() { // 查询第一页
    thisobj.searchForm.page = {}
    thisobj.searchForm.page.nowPage = 1
    thisobj.searchN()
  }

  // 查看第一页
  thisobj.firstPage = function() {
    thisobj.searchForm.page.nowPage = 1
    thisobj.searchN()
  }

  // 查看最后一页
  thisobj.endPage = function() {
    thisobj.searchForm.page.nowPage = thisobj.searchForm.page.endPage
    thisobj.searchN()
  }

  // 查看下一页
  thisobj.nextPage = function() {
    if (thisobj.searchForm.page.nowPage !== thisobj.searchForm.page.endPage) {
      thisobj.searchForm.page.nowPage = thisobj.searchForm.page.nowPage + 1
      thisobj.searchN()
    }
  }

  // 查看上一页
  thisobj.prePage = function() {
    if (thisobj.searchForm.page.nowPage !== 1) {
      thisobj.searchForm.page.nowPage = thisobj.searchForm.page.nowPage - 1
      thisobj.searchN()
    }
  }

  thisobj.PageChange = function() {
    thisobj.search1()
  }

  // 设置显示页数
  thisobj.setPagecount = function(count) {
    thisobj.searchForm.page.nowPage = 1
    thisobj.searchForm.page.nowcont = count
    thisobj.searchN()
  }

  // 清空查询条件
  thisobj.reset = function() {
    thisobj.searchForm.searchItems = {}
  }

  // 查询第一页
  thisobj.search1 = function search1() { // 查询第一页
    if (thisobj.searchForm.page === undefined) {
      thisobj.searchForm.page = {}
    }
    thisobj.searchForm.page.nowPage = 1
    thisobj.searchN()
  }
  // 查询指定页
  thisobj.searchCurrent = function(nowPage) { // 查询指定页
    thisobj.searchForm.page.nowPage = nowPage
    thisobj.searchN()
  }

  // 查询公共方法
  thisobj.searchN = function search() { // 查询第N页
    thisService(thisobj.searchForm).then(function(r) {
      thisobj.dataList = r.data.list
      thisobj.searchForm.page = r.data.page

      if (thisobj.searchForm.page.count > thisobj.searchForm.page.nowcont) {
        thisobj.searchForm.page.endPage = Math.ceil(thisobj.searchForm.page.count / thisobj.searchForm.page.nowcont)
      } else {
        thisobj.searchForm.page.endPage = 1
      }
    })
  }
}

/*
  获取部门父节点数组 用于绑定element 级联组件
 */
export function findDepts(item, deptid) {
  var deptArray = []
  deptArray.unshift(deptid)
  var nowdeptId = deptid
  for (var i = 0; i < 10; i++) {
    var p = getDeptPid(item, nowdeptId)
    if (p !== '0' && p !== '-1') {
      deptArray.unshift(p)
      nowdeptId = p
    } else if (p === '0') {
      i = 100
    }
  }
  return deptArray
}

function getDeptPid(item, deptid) {
  var p = -1
  for (var i = 0; i < item.length; i++) {
    if (item[i].deptId === deptid) {
      p = item[i].parentID
      break
    } else if (item[i].children !== undefined) {
      var r = getDeptPid(item[i].children, deptid)
      console.log('==============2', r)
      if (r !== undefined && r !== -1) {
        p = r
        break
      }
    }
  }
  return p
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

