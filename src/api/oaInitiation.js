// import request from '@/utils/request'
import $ from 'jquery'

export function getITYYYWStart(items, callback) {
  /* return request({
    url: 'http://oatest.longcheer.net:8099/API/GetITYYYWStart',
    method: 'post',
    // headers: { 'Access-Control-Allow-Origin': 'token,Origin, X-Requested-With, Content-Type, Accept,mid,X-Token' },
    data: {
      json: items
    }
  })*/
  $.ajax({
    method: 'GET',
    url: 'http://oatest.longcheer.net:8099/API/GetITYYYWStart',
    // url: 'http://oatest.longcheer.net:8099/API/GetITYYYWStartTest',
    dataType: 'xml',
    async: false,
    type: 'jsonp',
    data: {
      json: items
    },
    success: function(data) {
      console.log('getITYYYWStart: ', data)
      callback(data)
    },
    error: function(data) {
      console.log('getITYYYWStart-error: ', data)
      callback(data)
    }
  })
}

