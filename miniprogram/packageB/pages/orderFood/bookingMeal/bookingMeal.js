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
    status: '',
    total : null,
    items:[],
    popupShow: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: ''
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
  // 验证
  verify() {
    if (!this.data.info.username) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.info.phone) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.info.number) {
      wx.showToast({
        title: '请输入人数',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.info.time) {
      wx.showToast({
        title: '请选择就餐时间',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  // 预订
  menuBooking: function () {
    if (!this.verify()) {
      return;
    }
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingO').add({
      data: {
        items: this.data.items,
        total: this.data.total,
        username: this.data.info.username,
        time: this.data.info.time,
        number: this.data.info.number,
        phone: this.data.info.phone,
        status: 'new'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          icon: 'success',
          title: '预订成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 2
          })
        }, 2000);
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

    let data = JSON.parse(options.data);
    this.data.items = data.items;
    this.data.total = data.total;
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