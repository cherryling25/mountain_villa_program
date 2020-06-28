// miniprogram/packageB/pages/orderFood/bookingMeal/bookingMeal.js
Page({

  /**
   * Page initial data
   */
  data: {
    info: {
      username: '',
      phone: '',
      number:'',
      time: ''
    },
    popupShow: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: '',
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);

  },
  // 选择时间
  selectedTime(){
    this.setData({
      popupShow: true
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  confirmPicker(){

  },
  // 弹出层隐藏
  onClose() {
    this.setData({ popupShow: false });
  },
  // 当前时间
  onInput(event) {
    var currentDate = event.detail;

    this.setData({
      currentDate: event.detail,
    });
  },
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