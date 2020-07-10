const prefix = require('../utils/config/prefix');
const storage = require('../utils/storage');
const regExp = /\/(.*?)\//;
const app = getApp();

const refreshToken = () => {
  if (app.globalData.isOauthing) return;
  app.globalData.isOauthing = true
  var pages = getCurrentPages()
  var url = pages[pages.length - 1].route
  wx.navigateTo({
    url: '/pages/login/oauth?redirectUrl=' + url
  })
}

function httpLogInfo(url, params, res, method, header) {
  console.log('当前时间：' + new Date(Date.now()) + '\n当前url:' + url);
  console.log('头部:', header);
  console.log('方式：', method);
  console.log('参数：', params);
  console.log('结果：', res.data);
}

function httpLogErr(url, params, res, method, header) {
  console.log('请求发生异常，当前时间：' +new Date(Date.now()) + '\n当前url：' + url);
  console.log('头部:', header);
  console.log('方式：', method);
  console.log('参数：', params);
  console.log('异常：', res);
}

function successCallback(res, url, params, resolve, reject, method, header) {
  //httpLogInfo(url, params, res, method, header);
  
  if (res.statusCode == 200) {
    return resolve(res.data)
  } else {
    return reject(res.data.errMsg)
  }
}

function failCallback(res, url, params, resolve, reject, method, header) {
  httpLogErr(url, params, res, header);

  if (res.errMsg.includes('request:fail')) {
     wx.showToast({
        title: '网络无法连接服务器，请稍后再试',
        icon: 'none'
     });
  }

  if(res.errMsg.includes('getUserInfo:fail')){
    wx.showToast({
      title: '请授权信息，以便进行操作',
      icon: 'none'
   });
  }

  return reject(res)
}


function fetch(options){
    /**
     * 请求前公共数据处理
     * @param {string}  url 请求的地址
     * @param {String}  method 请求的类型
     * @param {Boolean} isAuthor 是否验证 默认关闭, true-开 false-关
     * @param {String}  sessionId 用户userToken
     * @param {Boolean} openLoad 开启加载提示,默认开启, true-开 false-关
     * @param {Object}  data 请求的数据
     * @param {Object}  header 重置请求头
     */
    let {
      url,
      openLoad = false,
      method,
      data = {},
      header = {},
      isAuthor = false
    } = options || {};
    
    openLoad && wx.showLoading({
      title: '正在加载中',
      icon:'loading'
    })

    method = method ? method : 'GET';
    let access_token = wx.getStorageSync(prefix.enumType["ACCESS_TOKEN"]);
    let hostKey = url.match(regExp)[1];
    let baseUrl = prefix.baseAPI[hostKey].host;
    url = url.replace(regExp,'/');

    if(isAuthor && access_token){
      header.Authorization = access_token.token_type + ' ' + access_token.access_token;
    }

    let headers = {
      'Content-Type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      ...header
    }
   
    return new Promise((resolve,reject) => {
      wx.request({
        url: `${baseUrl}${url}`,
        data,
        method: method ? method : 'GET',
        dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
        header: headers,
        success:res => {
          if (res.data.resultCode === 401 || res.data.resultCode === 4001 || res.data.code == 401 || res.data.code == 4001 || res.data.code === 4000) {
            refreshToken();
          }else{
            successCallback(res, url, data, resolve, reject, method, headers);
          }
        },
        fail:err => {
          failCallback(err, url, data, resolve, reject, method, headers);
        },
      })
    })

}

module.exports = {
  fetch
}