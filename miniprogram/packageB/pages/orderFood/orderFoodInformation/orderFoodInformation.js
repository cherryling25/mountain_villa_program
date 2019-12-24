// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
import WxValidate from '../WxValidate.js'
var app = getApp();

Page({
  data: {
    form: {
      day: '2019-09-11',
      time: '12:00',
      number: '',
      name: '',
      telephone: ''
    }
  },
  
  // onLoad中有多个函数的写法，onLoad函数内写函数名，函数在onLoad外定义
  onLoad() {
    this.initValidate()//验证规则函数
  },

//onLoad中只有一个函数的写法
onLoad: function () {
    rules: { }
    messages: { }
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      telephone: {
        required: true,
        tel: true
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      telephone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    })
  },
  //onLoad: function (options) {

    // if (app.globalData.openid) {
    //   this.setData({
    //     openid: app.globalData.openid
    //   })
    // }
  //},

  userNumberInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  userNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  userTellInput: function (e) {
   
    // this.setData({
    //   telephone: e.detail.value
    // })
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
    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('booking').add({
      data: {
        data:this.data.day,
        time:this.data.time,
        number: this.data.number,
        contact: this.data.contact,
        telephone: this.data.telephone
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
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