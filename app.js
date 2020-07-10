//app.js
const { toAsync } = require('./utils/wechat');
const routes = require('./utils/config/requestRoute');
App({
  onLaunch: function () {
    //异步api请求
    wx.async = toAsync;
    //全局请求api路径 统一配置
    wx.route = routes;

    this.clearStorageBeforeLauch()

    this.SET_LOCATION();
    this.GET_UUID();
  },
  globalData: {
    userInfo: null,
    location: null,
    pageParamStoreKey: 'store_param_store_key',
    isOauthing: false
  },
  GET_UUID:function(){
    var _uuid = wx.getStorageSync("_uuid")
    if (!_uuid) {
      let guid = function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      };
      _uuid = guid();
      wx.setStorageSync("_uuid", _uuid)
    }
  },
  SET_LOCATION:function(){
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        var location = {
          lng: res.longitude,
          lat: res.latitude
        }

        wx.request({
          url: 'https://capi.wm.dddingjiu.com/api/mapsearch/tmGeocoder',
          data: location,
          success: res => {
            if (res.statusCode == 200) {
              var data = res.data.data.result
              var address = data.address
              var address_component = data.address_component
              location.address = address
              location.address_component = address_component
            }
            this.globalData.location = location
          }
        })

      }
    })

  },
  clearStorageBeforeLauch: function() {
    wx.removeStorageSync(this.globalData.pageParamStoreKey)
    wx.removeStorageSync("p_from")
    wx.removeStorageSync("u_from")
  }
})