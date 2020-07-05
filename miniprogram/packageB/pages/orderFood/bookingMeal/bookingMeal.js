// miniprogram/packageB/pages/orderFood/bookingMeal/bookingMeal.js
var util = require('../../util.js');

Page({
  data: {
    info: {
      username: '',
      phone: '',
      number:'',
      time: ''
    },
    popupShow: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: '',
  },
 
  // 选择时间
  selectedTime(){
    this.setData({
      popupShow: true
    });
  },
  // 确定
  confirmPicker(e){
    var info = this.data.info;
    info.time = util.formatTime(new Date(e.detail));
    this.setData({
      info: info,
      popupShow: false
    })
  },
  // 取消
  cancelPicker(){
    this.setData({
      popupShow: false
    })
  },
  onInput: function (e) {
    let dataset = e.currentTarget.dataset;
    this.data.info[dataset.name] = e.detail;
    this.setData({
      info: this.data.info
    });
  },
  // menuBooking() {
  //   console.log(this.data.info);
  // },
  menuBooking: function () {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('booking').add({
      data: {
        username: this.data.info.username,
        time: this.data.info.time,
        number: this.data.info.number,
        phone: this.data.info.phone,
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
  
  onLoad: function (options) {
    var time = util.formatTime(new Date());	
    this.setData({
      time: time
    });
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