// pages/home/home.js

Page({
  //视频加载
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  data: {
    stories: [
      {
        title: '标题1',
        url: '../../packageA/pages/story/story',
        src: '../../images/backed.jpg',
      },
      {
        title: '标题2',
        url: '../../packageA/pages/story/story',
        src: '../../images/backed.jpg',
      }
    ],
    imgurl: 
      '/images/backed.jpg'
    ,
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