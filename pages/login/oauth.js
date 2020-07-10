// pages/login/oauth.js

const app = getApp()
const WxRequest = require('../../utils/request');
const prefix = require('../../utils/config/prefix');

var _this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirectUrl: '/pages/index/index'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    if (options.redirectUrl) {
      this.setData({
        redirectUrl: options.redirectUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.globalData.isOauthing = false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  oauth: async function(e) {
    try {
      if(!e.detail.errMsg.includes("getUserInfo:ok")){
        wx.showToast({
          title: '需要您的授权才能进行下一步操作',
          icon:'none'
        })
        return;
      }
      
      const awx =  wx.async(['login']);
      let userInfo =  e.detail.userInfo;
      
      let res2 =  await awx.login();

      let data = {
        code: res2.code,
        avatarUrl: userInfo.avatarUrl,
        nickName:  userInfo.nickName,
        gender:    userInfo.gender
      };

      let access_token = await WxRequest.fetch({
        url:wx.route["AUTH_LOGIN"],
        data:data,
        method: 'POST',
      })


      wx.setStorageSync(prefix.enumType["ACCESS_TOKEN"], access_token);

      wx.showToast({
        title: '登录成功',
        icon:'success'
      })

      let res4 = await WxRequest.fetch({
        url:wx.route["PAGE_USER_INDEX"],
        isAuthor:true
      })
      if(res4.code == 0){
        wx.setStorageSync("u_id", res4.data.u_id)
        wx.setStorageSync("p_id", res4.data.p_id)
        wx.navigateBack()
      }
     
      
    } catch (error) {
      console.error('error:',error);
      wx.showToast({
        title: '出现异常',
      })
    }
   
  },
  
  cancel: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})