// pages/myPage/booking.js
var app = getApp()
Page({
  data: {
    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,
    showHot: false,
    showLabels: false,
    hotCur: 0,
    // //页面配置 
    // winWidth: 0,
    // winHeight: 0,
    // // tab切换  
    // currentTab: 0,
    msgData: [
      { name: '价格', number: 10 }, 
      { name: '入住人数', number: 2 +'人' }, 
      { name: '入住时间', number: '2019-10-01' },
      { name: '价格总计', number: 100+ '元' },
    ],
    state:'已完成'
  },
  booking: function () {
    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('booking').add({
      data: {
        data: this.data.day,
        time: this.data.time,
        number: this.data.number,
        contact: this.data.contact,
        telephone: this.data.telephone
      },
      success: res => {
        this.setData({
          counterId: res._id,
          count: 1,
          day: '2019-09-11',
          time: '12:00',
          number: '',
          contact: '',
          telephone: ''
        })
        wx.showToast({
          title: '预订成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '预订失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
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
 * tab切换
 * @param {} e 
 */
  tabSelect: async function (e) {
    let that = this;
    console.log(e);
    let tabCur = e.currentTarget.dataset.id
    switch (tabCur) {
      case 1: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          nomore: false,
          nodata: false,
          showHot: false,
          showLabels: false,
          defaultSearchValue: "",
          posts: [],
          page: 1,
          whereItem: ['', 'createTime', '']
        })

        //await that.getPostsList("", 'createTime')
        break
      }
      case 2: {
        that.setData({
          posts: [],
          tabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          showHot: true,
          showLabels: false,
          defaultSearchValue: "",
          page: 1,
          nomore: false,
          nodata: false,
          whereItem: ['', 'totalVisits', '']
        })
        //await that.getPostsList("", "totalVisits")
        break
      }
      case 3: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
          showHot: false,
          showLabels: true,
        })

        //let task = that.getPostsList("", 'createTime')
        //let labelList = await api.getLabelList()
        that.setData({
          labelList: labelList.result.data
        })
        await task

        break
      }
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