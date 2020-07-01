// pages/home/orderRoom/roomDetails/roomDetails.js
Page({

  /**
   * Page initial data
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      '../../../../images/backed.jpg',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,

    //日历
      dayStyle: [
        { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
        { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
      ],
  },

  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#84e7d0"
    })

  },

  warnButton: function(){
    wx.redirectTo({
      url: './orderRoomInformation/orderRoomInformation',
    })
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