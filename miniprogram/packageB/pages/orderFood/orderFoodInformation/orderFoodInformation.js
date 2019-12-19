// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
var app = getApp();

Page({
  data: {
    day: '2019-09-11',  
    time: '12:00',
    number: '',
    contact: '',
    telephone: ''
  },
 
  userNumberInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  userNameInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  userTellInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  bindDayChange: function (e) {
    this.setData({
      day: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  booking: function () {
    const cloud = require('wx-server-sdk')
    cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV
    })
    const db = cloud.database()
    exports.main = async (event, context) => {
      let {
        type,
        yuefen
      } = event
      try {
        if (type == 'all') {
          const _ = db.command
          return await db.collection('gongzi').where({
            yuefen: _.exists(true) //只要月份字段存在，就删除
          }).remove()
        } else {
          return await db.collection('gongzi').where({
            yuefen: yuefen
          }).remove()
        }

      } catch (e) {
        console.error(e)
      }
    }
  }
  // booking: function () {
  //   if (this.data.name) {
  //     const db = wx.cloud.database()
  //     db.collection('booking').doc(this.data.name).remove({
  //       success: res => {
  //         wx.showToast({
  //           title: '删除成功',
  //         })
  //         this.setData({
  //           counterId: '',
  //           count: null,
  //         })
  //       },
  //       fail: err => {
  //         wx.showToast({
  //           icon: 'none',
  //           title: '删除失败',
  //         })
  //         console.error('[数据库] [删除记录] 失败：', err)
  //       }
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '无记录可删，请见创建一个记录',
  //     })
  //   }
  // },


  // booking: function () {
  //   wx.cloud.init();
  //   const db = wx.cloud.database()
  //   db.collection('booking').add({
  //     data: {
  //       data:this.data.day,
  //       time:this.data.time,
  //       number: this.data.number,
  //       contact: this.data.contact,
  //       telephone: this.data.telephone,
  //     },
  //     success: res => {
  //       // 在返回结果中会包含新创建的记录的 _id
  //       this.setData({
  //         counterId: res._id,
  //         count: 1
  //       })
  //       wx.showToast({
  //         title: '预订成功',
  //       })
  //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '预订失败'
  //       })
  //       console.error('[数据库] [新增记录] 失败：', err)
  //     }
  //   })
  // },



// Page({
//   data: {
//     inputValue: '',
//     numberValue: '',

//     date: '2019-09-11',  //默认为当天的日期
//     time: '12:00'  //默认为当天的时间
//   },
//   booking() {
//     wx.cloud.init();
//     const db = wx.cloud.database();
//     db.collection('booking').add({
//       // data 字段表示需新增的 JSON 数据
//       data: {
//         // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
//         name: "Hello World",
//        numberValue: ""
//       },
//       success: function (res) {
//         // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
//         console.log(res)
//       }
//     })
//   },
//   bindKeyInput: function (e) {
//     this.setData({
//       inputValue: e.detail.value,
//       numberValue: e.detail.value
//     })
//   },
//   bindDateChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       date: e.detail.value
//     })
//   },
//   bindTimeChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       time: e.detail.value
//     })
//   },
//   /**
//    * Lifecycle function--Called when page load
//    */
//   onLoad: function (options) {
  //   if (app.globalData.openid) {
  //     this.setData({
  //       openid: app.globalData.openid
  //     })
  //   }
//   },

//   /**
//    * Lifecycle function--Called when page is initially rendered
//    */
//   onReady: function () {

//   },

//   /**
//    * Lifecycle function--Called when page show
//    */
//   onShow: function () {

//   },

//   /**
//    * Lifecycle function--Called when page hide
//    */
//   onHide: function () {

//   },

//   /**
//    * Lifecycle function--Called when page unload
//    */
//   onUnload: function () {

//   },

//   /**
//    * Page event handler function--Called when user drop down
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * Called when page reach bottom
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * Called when user click on the top right corner to share
//    */
//   onShareAppMessage: function () {

//   }
 })