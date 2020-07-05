// pages/home/orderFood/orderFood.js
Page({

  /**
   * Page initial data
   */
  data: {
    activeKey: 0,
    show: false,
    list:[
      {title: "炒菜",
        card: [{
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的',
          tag: '牛肉',
          tag1: '小葱',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        },
        {
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
      {
        title: "蔬菜",
        card: [{
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        },
        {
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
      {
        title: "汤羹类",
        card: [{
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
      },
      {
        title: "甜品类",
        card: [{
          num: 0,
          price: 10.00,
          amount: '',
          commodityTitle: '商品标题',
          desc: '好吃的好吃的吃的',
          imgurl:
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
          currentIcon: true
        }],
        
      },
    ],
    selectCard: [],
    total: 0
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
        this.data.selectCard[i].num = 1;
        this.setData({
          selectCard: this.data.selectCard
        });
        break;
      }
    }
    this.calculateTotal();
  },
  // 选择数量
  changeNumber(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let num = e.detail;
    for (let i = 0; i < this.data.selectCard.length; i++) {
      if (index == i) {
        this.data.selectCard[i].num = num;
        this.setData({
          selectCard: this.data.selectCard
        });
        break;
      }
    }
    this.calculateTotal();
  },
  calculateTotal(price) {
    let total = 0;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      let cards = list[i].card;
      for (let j = 0; j < cards.length;j++) {
        total += (cards[j].num * cards[j].price);
      }
    }
    
    this.setData({
      total
    });
  },
  onClickShow() {
    var openId = wx.getStorageSync('openId');
    console.log(openId);
    if(openId) {
      wx.navigateTo({
        url: './orderFoodInformation/orderFoodInformation'
      });
    } else {
      this.setData({ show: true });
    }
  },
  onClickHide() {
    this.setData({ show: false });
  },
  bindGetUserInfo(e) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //获取登录临时凭证
        var code = res.code;
        console.log(res)
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  getApp().globalData.userInfo = res.userInfo;
                  console.log(res.userInfo)
                  
                  //调用后端接口 获取微信的session_key 和 openID
                  wx.cloud.init();
                  wx.cloud.callFunction({
                    name : 'login',
                    data : {},
                    success : res => {
                      //TODO 弹出来提示框 授权成功
                      console.log(res);
                      getApp().globalData.openId = res.result.openid; // 这里id是小写
                      wx.setStorageSync('openId', res.result.openid);
                      wx.navigateTo({
                        url: './orderFoodInformation/orderFoodInformation'
                      });
                    }
                  });
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      }
    });
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