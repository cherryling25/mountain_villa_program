// pages/myPage/booking.js
var app = getApp();
Page({
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    msgData: [],
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
    that.display(null);
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    switch (e.detail.current) {
      case 0 : 
        that.display(null);
      break;
      case 1:
        that.display('New');
        break;
      case 2:
        that.display('Completed');
        break;
    }
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

  display: function(state) {
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database();
    const requestData = {
      userInfo: app.globalData.userInfo.nickName,
    };
    if(state) {
      requestData.state = state;
    }
    db.collection('booking').where(requestData)
      .get({
        success: function (res) {
          that.setData({ msgData: res.data });
        }
      })
  }






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