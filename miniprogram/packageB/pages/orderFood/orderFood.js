// pages/home/orderFood/orderFood.js
Page({

  /**
   * Page initial data
   */
  data: {
    activeKey: 0,
    list:[
      {title: "主食",
        card: [{
          num: 1,
          price: 10.00,
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        },
          {
            num: 1,
            price: 10.00,
            commodityTitle: '商品标题',
            desc: '好吃的好吃的吃的',
            imgurl:
              'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
            currentIcon: true
          }],
      },
      {
        title: "2",
        card: [{
          num: 2,
          price: 10.00,
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
      {
        title: "3",
        card: [{
          num: 2,
          price: 10.00,
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
      {
        title: "4",
        card: [{
          num: 2,
          price: 10.00,
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
    ],
    selectCard: [],
    
    
  },
  booking(){
    wx.navigateTo({
      url: './orderFoodInformation/orderFoodInformation'
    })
  },
  onChange(e) {
    console.log(e);
    for(let i=0; i < this.data.list.length; i++) {
      if(e.detail == i) {
        this.setData({
          selectCard : this.data.list[i].card
        });
        break;
      }
    }
  },
  hide(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    for(let i = 0; i < this.data.selectCard.length; i++){
      if(index == i){
        this.data.selectCard[i].currentIcon = false;
        this.setData({
          selectCard: this.data.selectCard
        });
        break;
      }
    }
    // console.log(e);
    // this.setData({
    //   currentIcon: false
    // })
    
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      selectCard: this.data.list[0].card
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