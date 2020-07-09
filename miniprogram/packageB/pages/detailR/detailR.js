// miniprogram/packageB/pages/detailR/detailR.js
Page({

  /**
   * Page initial data
   */
  data: {
    price: '',
    startTime: '',
    endTime: '',
    num: '',
    days: '',
    name: '',
    phone: ''
  },

  query(id) {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingR').where({ _id:id}).get({
      success: res => {
        let obj = res.data[0];
        this.data.name = obj.name;
        this.data.startTime = obj.selectedDate.substring(0, 10).replace(/\//g, '-');
        this.data.endTime = obj.selectedDate.substring(13, 23).replace(/\//g, '-');
        this.data.phone = obj.phone;
        this.data.num = obj.num;
        this.data.price = obj.total;
        
        let s = new Date(this.data.startTime);
        let e = new Date(this.data.endTime);
        let difValue = (e - s) / (1000 * 60 * 60 * 24);
      
        this.setData({
          startTime: this.data.startTime,
          endTime: this.data.endTime,
          name: this.data.name,
          phone: this.data.phone,
          num: this.data.num,
          price: this.data.price,
          days: difValue
        });
      }
    });
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.query(options.id);
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