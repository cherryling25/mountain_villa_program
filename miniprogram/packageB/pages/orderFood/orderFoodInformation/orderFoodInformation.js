// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
var app = getApp();

Page({
  data: {
    selectedItems: [],
    total: '0.00'
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
  // 选择数量
  changeNumber(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    // let num = e.detail;
    // for (let i = 0; i < this.data.selectCard.length; i++) {
    //   if (index == i) {
    //     this.data.selectCard[i].num = num;
    //     this.setData({
    //       selectCard: this.data.selectCard
    //     });
    //     break;
    //   }
    // }
    // this.calculateTotal();
  },
  calculateTotal(price) {
    let total = 0;
    let selectedItems = this.data.selectedItems;
    for (let i = 0; i < selectedItems.length; i++) {
      let cards = selectedItems[i].card;
      for (let j = 0; j < cards.length; j++) {
        total += (cards[j].num * cards[j].price);
      }
    }

    this.setData({
      total
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