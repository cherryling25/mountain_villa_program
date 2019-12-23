// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
var app = getApp();

Page({
  data: {
    day: '2019-09-11',  
    time: '12:00',
    number: '',
    contact: '',
    telephone: ''
  },

  // onLoad: function (options) {
  //   if (app.globalData.openid) {
  //     this.setData({
  //       openid: app.globalData.openid
  //     })
  //   }
  // },

  userNumberInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  userNameInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  userTellInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  bindDayChange: function (e) {
    this.setData({
      day: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  
  booking: function () {
    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('booking').add({
      data: {
        data:this.data.day,
        time:this.data.time,
        number: this.data.number,
        contact: this.data.contact,
        telephone: this.data.telephone,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '预订成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '预订失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
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