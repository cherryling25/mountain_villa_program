// pages/service/orderFood/orderFoodInformation/orderFoodInformation.js
import WxValidate from '../WxValidate.js'
var util = require('../../util.js')
var app = getApp();

Page({
  data: {
    radio: '0',
    popupShow: false,
    menu: [
      {
        title: '麦麦脆汁鸡',
        price: '17.2'
      },
      {
        title: '麦麦脆汁鸡',
        price: '17.2'
      }
    ],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    
    form: {
      day: '',
      time: '',
      person:'',
      name: '',
      phone: ''
    }
  },
  // radio
  onChange(event) {
    this.setData({
      radio: event.detail,
      popupShow: true
    });
    
  },
  // 弹出层隐藏
  onClose() {
    this.setData({ popupShow: false });
  },
  // 当前时间
  onInput(event) {
    var currentDate = event.detail;

    this.setData({
      currentDate: event.detail,
    });
  },
  // 确认选择的时间
  confirmPicker(event) {
    let val = event.detail;
    // let year = val.getFullYear()
    // let month = val.getMonth() + 1
    // let day = val.getDate()
    // let hour = val.getHours()
    // let minute = val.getMinutes()
    // if (month >= 1 && month <= 9) { month = `0${month}` }
    // if (day >= 1 && day <= 9) { day = `0${day}` }
    // if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
    // if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
    
    // this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`
    // this.popupShow = false
  },

  // 选项格式化函数
  formatter(type, value) {
    if(type === 'year') {
      return `${value}年`
    } else if(type === 'month') {
      return `${value}月`
    } else if (type === 'day') {
      return `${value}日`
    } else if (type === 'hour') {
      return `${value}时`
    } else if (type === 'minute') {
      return `${value}分`
    }
    return value;
  },
  onLoad: function (options) {
    //验证方法
    this.initValidate();
    var day = util.formatTime(new Date());
    var time = util.formatDate(new Date());
    this.setData({			
      day: day,
      time:time
    });
  },
  /***验证表单字段 */
  initValidate: function () {
    const rules = {
      person: {
        required: true,
        digits: true
      },
      name: {
        required: true,
        maxlength: 5
      },
      phone: {
        required: true,
        tel: true
      }
    }
    const messages = {
      person: {
        required: '请填写就餐人数'
      },

      name: {
        required: '请填写联系人'
      },
      
      phone: {
        required: '请填写联系电话',
        tel: '请填写正确的联系电话'
      }
    }
    this.WxValidate = new WxValidate(rules, messages);
  },
  /***调用验证函数***/
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带的数据为：', e.detail.value);
    const params = e.detail.value;
    params.person = this.data.person;
    params.name = this.data.name;
    params.phone = this.data.phone;
    
    //console.log(params);
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showToast(error);
      return false;
    }
    this.booking();
  },

  /***报错 **/
  showToast(error) {
    wx.showToast({
      icon: 'none',
      title: error.msg
    })
  },
    
  userPersonInput: function (e) {
    this.setData({
      person: e.detail.value
    })
  },
  userNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  userPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('booking').add({
      data: {
        data:this.data.day,
        time:this.data.time,
        person: this.data.person,
        name: this.data.name,
        phone: this.data.phone,
        userInfo: app.globalData.userInfo.nickName,
        state:'New'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        var day = util.formatTime(new Date());
        var time = util.formatDate(new Date());
        this.setData({
          day: day,
          time: time,
          person: '',
          name: '',
          phone: '',
          userInfo: app.globalData.userInfo.nickName
        })
        wx.showToast({
          title: '预订成功',
          duration: 2000, 
          success: function () {
            setTimeout(function () {  // 返回上一页
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
          }
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