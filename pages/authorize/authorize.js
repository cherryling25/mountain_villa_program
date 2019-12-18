// pages/authorize/authorize.js
const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {

    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px;'
      },
      children: [{
        type: 'text',
        text: '生态农庄'
      }]
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              //console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo;
              wx.switchTab({
                url: "/pages/index/index"
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    //console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo;
      wx.switchTab({
        url: "/pages/index/index"
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '请授权之后进入小程序',
      })
    }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})