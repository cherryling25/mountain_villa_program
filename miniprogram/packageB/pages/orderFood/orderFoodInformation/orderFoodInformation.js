// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
var app = getApp();

Page({
  data: {
    selectedItems: []
  },

  // 线上预订
  booking(){
    wx.navigateTo({
      url: '../bookingMeal/bookingMeal'
    })
  },
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    let selectedItems = [];
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('menu').orderBy('serialnumber', 'asc').get({
      success: res => {
        console.log(res.data);
        for(let i=0;i<res.data.length;i++) {
          for(let j=0;j<res.data[i].card.length;j++) {
              for(let k=0;k<data.selectedItems.length;k++) {
                if (data.selectedItems[k].id == res.data[i].card[j].id) {
                  res.data[i].card[j].num = data.selectedItems[k].num;
                  selectedItems.push(res.data[i].card[j]);
                }
              }
          }
        }
        this.setData({
          selectedItems: selectedItems
        });
      }
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