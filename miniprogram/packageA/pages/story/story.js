// pages/home/story/story.js
var app = getApp()

var util = require('./util.js');
Page({

  /**
   * Page initial data
   */
  data: {
    count:0,
    collected:0
  },
  
  add:function(e){
    if(this.data.collected == 1) {
      wx.showToast({
        icon: 'none',
        title: '已点赞'
      })
      return;
    }
    var time = util.formatTime(new Date());
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('awsomerecorder').add({
      data: {
        userInfo: app.globalData.userInfo.nickName,//TODO 通过api 获取用户名
        date: time //TODO 通过 api 获取当前时间
      },
      success: res => {
        this.setData({
          count: this.data.count + 1,
          collected: 1
        });
        wx.showToast({
          title: '点赞成功'
        });
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '点赞失败'
        })
        //console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('awsomerecorder').count().then(res => {
      this.setData({
        count: res.total
      });
      console.log(res.total)
    })
    if(this.data.collected == 1) {
      wx.showToast({
        icon: 'none',
        title: '已点赞'
      })
      return;
    }
    db.collection('awsomerecorder').where(res => {
      this.setData({
        count: res.total,
        userInfo: app.globalData.userInfo.nickName
      });
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})