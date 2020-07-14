// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
var app = getApp();

Page({
  data: {
    selectedItems: [],
    total: '0.00'
  },

  // 预订
  booking(){
    let list = this.data.selectedItems;
    console.log(list);
    let items = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].num > 0) {
          items.push({
            id: list[i].id,
            num: list[i].num,
            price: list[i].price
          });
        }
    }
    let obj = {
      items: items,
      total: this.data.total
    }
    let objStr = JSON.stringify(obj);
    console.log(objStr);

    wx.navigateTo({
      url: '../bookingMeal/bookingMeal?data=' + objStr
    })
  },
  calculateTotal() {
    let total = 0;
    let list = this.data.selectedItems;
    for (let i = 0; i < list.length; i++) {
      total += (list[i].num * list[i].price) ;
    }
    this.setData({
      total
    });
  },
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    console.log(data);
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
        this.calculateTotal();
      }
    });
   
  },
  // 选择数量
  changeNumber(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let num = e.detail;
    for (let i = 0; i < this.data.selectedItems.length; i++) {
      if (index == i) {
        this.data.selectedItems[i].num = num;
        this.setData({
          selectedItems: this.data.selectedItems
        });
        break;
      }
    }
    this.calculateTotal();
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