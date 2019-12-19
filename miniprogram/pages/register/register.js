// pages/register/register.js
const app = getApp()
Page({

  data: {
    name:'',
    tel:'',
    address:''

  },

  changeName(e){
    this.setData({
     name:e.detail.value
    })
   
  },
  changeTel(e) {
    this.setData({
      tel: e.detail.value
    })

  },
  changeAddress(e) {
    this.setData({
      address: e.detail.value
    })

  },
  submit() {
    wx.switchTab({
      url: '/pages/myPage/my'
    })
  },
  /*submit(e){
    //先判断是否为空
    wx.request({
      url: '',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },*/

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