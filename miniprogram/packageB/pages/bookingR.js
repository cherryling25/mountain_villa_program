// pages/myPage/booking.js
var app = getApp();
Page({
  data: {
    active: 0,
    currentStatus:'',
    orders: []
  },
  findByStatus() {
    wx.cloud.init();
    let requestObj = {};
    if (this.data.currentStatus) {
      requestObj = { status: this.data.currentStatus};
    }
    const db = wx.cloud.database();
    db.collection('bookingR').where(requestObj).get({
      success: res => {
        let list = [];
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          let statusCn = '';
          let btnStatus = '';
          if (res.data[i].status == 'new') {
            statusCn = '待入住';
            btnStatus = '取消订单';
          } else if (res.data[i].status == 'invoiced') {
            statusCn = '待评价';
            btnStatus = '评价';
          } else if (res.data[i].status == 'cancelled') {
            statusCn = '已取消';
          }
          let item = {
            id: res.data[i]._id,
            startTime: res.data[i].selectedDate.substring(0, 10).replace(/\//g, '-'),
            endTime: res.data[i].selectedDate.substring(13, 23).replace(/\//g, '-'),
            price: res.data[i].total,
            status: res.data[i].status,
            statusCn : statusCn,
            btnStatus: btnStatus
          };
          list.push(item);
        }
        this.setData({
          orders: list
        });
      }
    });
  },
  onChange(e) {
    console.log(e);
    if(e.detail.index == 0){
      this.data.currentStatus = null;
    }
    if (e.detail.index == 1) {
      this.data.currentStatus = 'new';
    }
    if (e.detail.index == 2) {
      this.data.currentStatus = 'invoiced';
    }
    if (e.detail.index == 3) {
      this.data.currentStatus = 'cancelled';
    }
    this.findByStatus();
  },
  cancelOrder(e){
    let id = e.target.dataset.id;
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingR').doc(id).update({
      data : {status:'cancelled'},
      success: () => {
        this.findByStatus();
        console.log('update success')
      }
      });
  },
  
  detail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './detailR/detailR?id='+ id
    })
  },
  onLoad: function (option) {
    this.findByStatus();
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