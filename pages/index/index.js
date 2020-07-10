//index.js
//获取应用实例
const app = getApp();
import { wxApi } from '../../utils/config/wxApi.js';
const WxRequest = require('../../utils/request');
Page({
  data: {
    data:[],
    isShow:false
  },
  onLoad: async function () {
    let that = this;
    try {
      // const awx =  wx.async(wxApi);
      // let res =  await awx.login();
      // let res1 =  await awx.getSetting();
      // console.log(res1.authSetting['scope.userInfo']);
      var u_id = wx.getStorageSync("u_id")
      var _uuid = wx.getStorageSync("_uuid")
      let options = {
        url: wx.route['PAGE_INDEX_INDEX']["GET_INDEX_DATA"],
        data: {
          uid: u_id,
          uuid: _uuid
        },
        method: "post",
      }
     
      let result = await WxRequest.fetch(options);
      
      this.setData({
        data:result.data.goodsList
      })
      // console.log('==========',result);
    } catch (error) {
      console.log(error);
    }
    
   
  },
  toUser:function(){
    wx.navigateTo({
      url: '/pages/user/index',
    })
  },
  switchPop:function(){
    this.setData({
      isShow : true
    });
    
  }
})
