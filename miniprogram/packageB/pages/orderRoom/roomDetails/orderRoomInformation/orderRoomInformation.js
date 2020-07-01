// pages/home/orderRoom/roomDetails/orderRoomInformation/orderRoomInformation.js
Page({

  /**
   * Page initial data
   */
  data: {
    selectedDate: '',
    calendarShow: false,
    value: '',
  },
  onDisplay() {
    this.setData({ calendarShow: true });
  },
  onClose() {
    this.setData({ calendarShow: false });
  },
  formatDate(selectedDate) {
    selectedDate = new Date(selectedDate);
    return `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      calendarShow: false,
      selectedDate: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },

  // save(){
  //   wx.redirectTo({
  //     url: '../roomDetails',
  //   })
  // },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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