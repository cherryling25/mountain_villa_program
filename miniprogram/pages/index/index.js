//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    markers: [
      {
        iconPath: "/images/home.png",
        id: 1,
        latitude: 26.418841,
        longitude: 111.289698,
        width: 30,
        height: 30
      }
    ],
    //当前定位位置
    latitude: '',
    longitude: ''
  },

  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
      latitude: this.data.markers[0].latitude,//要去的纬度-地址
      longitude: this.data.markers[0].longitude,//要去的经度-地址
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
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
