// pages/myPage/booking.js
var app = getApp();
Page({
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    msgData: [
      // { name: '入住时间', number: '2019-10-01' },
      // { name: '价格总计', number: 100+ '  元' },
    ],
    state:'已完成'
  },

  onLoad: function () {
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.cloud.init();
    //const openId = "ohB5t5f2LIWtlK0E1Sr-_cUr0DVo";
    const db = wx.cloud.database();
    db.collection('booking').where({
      // _openid: openId,
      userInfo: app.globalData.userInfo.nickName
    })
      .get({
        success: function (res) {
          console.log(res);
          that.setData({ msgData : res.data});
        }
      })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },






  /**
   * 获取文章列表
   */
  // getPostsList: async function (filter, orderBy, label) {
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   let that = this
  //   let page = that.data.page
  //   if (that.data.nomore) {
  //     wx.hideLoading()
  //     return
  //   }
  //   let result = await api.getPostsList(page, filter, 1, orderBy, label)
  //   if (result.data.length === 0) {
  //     that.setData({
  //       nomore: true
  //     })
  //     if (page === 1) {
  //       that.setData({
  //         nodata: true
  //       })
  //     }
  //   }
  //   else {
  //     that.setData({
  //       page: page + 1,
  //       posts: that.data.posts.concat(result.data),
  //     })
  //   }
  //   wx.hideLoading()
  // }
})  