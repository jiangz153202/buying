// pages/user/index.js
const WxRequest = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:async function () {
    let res1 = await WxRequest.fetch({
      url: wx.route['PAGE_USER_INDEX'],
      isAuthor:true
    });
    console.log('index',res1);
    this.setData({
      users:res1.data
    })
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

  }
})