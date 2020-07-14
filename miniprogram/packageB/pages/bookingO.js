// miniprogram/packageB/pages/bookingO.js
Page({

  /**
   * Page initial data
   */
  data: {
    active: 0,
    currentStatus: '',
    orders: [],
    menus: []
  },
  findByStatus() {
    wx.cloud.init();
    let requestObj = {};
    if (this.data.currentStatus) {
      requestObj = { status: this.data.currentStatus };
    }
    const db = wx.cloud.database();
    db.collection('bookingO').where(requestObj).get({
      success: res => {
        console.log(res.data);
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          let statusCn = '';
          let btnStatus = '';
          if (res.data[i].status == 'new') {
            statusCn = '待付款';
            btnStatus = '去付款';
          } else if (res.data[i].status == 'invoiced') {
            statusCn = '已付款';
            btnStatus = '取消';
          } else if (res.data[i].status == 'cancelled') {
            statusCn = '已取消';
          }
          let product0 = this.getProduct(res.data[i].items[0].id);
          let product1 = this.getProduct(res.data[i].items[1].id);
          let item = {
            id: res.data[i]._id,
            product0: product0,
            product1: product1,
            price: res.data[i].total,
            status: res.data[i].status,
            statusCn: statusCn,
            btnStatus: btnStatus,
            piece: res.data[i].items.length
          };
          list.push(item);
        }
        this.setData({
          orders: list
        });
      }
    });
  },
  getProduct(id) {
    for (let i = 0; i < this.data.menus.length; i++) {
      let cards = this.data.menus[i].card;
      for (let j = 0; j < cards.length; j++) {
        if (id == cards[j].id) {
          return {
            imgurl: cards[j].imgurl, 
            commodityTitle: cards[j].commodityTitle
          };
        }
      }
    }
  },
  menuList(){
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('menu').get({
      success: res => {
        this.setData({
          menus : res.data
        });
        this.findByStatus();
      }
    });
  },
  onChange(e) {
    console.log(e);
    if (e.detail.index == 0) {
      this.data.currentStatus = null;
    }
    if (e.detail.index == 1) {
      this.data.currentStatus = 'new';
    }
    if (e.detail.index == 2) {
      this.data.currentStatus = 'invoiced';
    }
    if (e.detail.index == 3) {
      this.data.currentStatus = 'cancelled';
    }
    this.findByStatus();
  },
  payment(e) {
    let id = e.target.dataset.id;
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingO').doc(id).update({
      data: { status: 'invoiced' },
      success: () => {
        this.findByStatus();
        console.log('update success')
      }
    });
  },
  cancelOrder(e) {
    let id = e.target.dataset.id;
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingO').doc(id).update({
      data: { status: 'cancelled' },
      success: () => {
        this.findByStatus();
        console.log('update success')
      }
    });
  },
  detail(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: './detailO/detailO?id=' + id
    })
    
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.menuList();
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