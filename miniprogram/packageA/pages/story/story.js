// pages/home/story/story.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    count:0,
    collected:0,
    wishList: [
      { dzzs: '0', collected: 1, id: 1 }
    ]
  },

  // 更改点赞状态
  onCollectionTap: function (event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.wishList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].dzzs = parseInt(message[i].dzzs) + 1
        } else {
          collectStatus = false
          message[i].collected = parseInt(message[i].collected) - 1
          message[i].dzzs = parseInt(message[i].dzzs) - 1
        }
        wx.showToast({
          title: collectStatus ? '收藏成功' : '取消收藏',
        })
      }
    }
    this.setData({
      wishList: message
    })
  },

  add:function(){
    if(this.data.collected == 1) {
      wx.showToast({
        icon: 'none',
        title: '已点赞'
      })
      return;
    }

    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('awsomerecorder').add({
      data: {
        name : 'xxx',//TODO 通过api 获取用户名
        date: '2019-12-30' //TODO 通过 api 获取当前时间
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
        console.error('[数据库] [新增记录] 失败：', err)
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