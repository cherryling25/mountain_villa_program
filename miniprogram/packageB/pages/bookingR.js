// pages/myPage/booking.js
var app = getApp();
Page({
  data: {
    active: 1,
    orders: [
    ]
  },
  find(){
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingR').get({
      success: res => {
        this.setData({
          orders: res.data
        });
      }
    });
  },
  findByStatus(status) {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingR').where({status : status}).get({
      success: res => {
        this.setData({
          orders: res.data
        });
      }
    });
  },
  onChange(e) {
    console.log(e);
    if(e.detail.index == 0){
      this.find();
    }
    if (e.detail.index == 1) {
      this.findByStatus('new');
    }
    if (e.detail.index == 2) {
      this.findByStatus('invoiced');
    }
    if (e.detail.index == 3) {
      this.findByStatus('cancelled');
    }
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
  },
  detail(){
    wx.navigateTo({
      url: './detailR/detailR',
    })
  },
  onLoad: function (option) {
    this.find();
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