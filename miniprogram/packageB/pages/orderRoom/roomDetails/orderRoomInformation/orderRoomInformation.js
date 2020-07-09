// pages/home/orderRoom/roomDetails/orderRoomInformation/orderRoomInformation.js
Page({

  /**
   * Page initial data
   */
  data: {
    selectedDate: '',
    calendarShow: false,
    name: '',
    phone: '',
    num: '1',
    price: '',
    status : ''
  },
  onDisplay() {
    this.setData({
      calendarShow: true
    });
  },
  onClose() {
    this.setData({
      calendarShow: false
    });
  },
  // 格式时间
  formatDate(selectedDate) {
    const year = `${selectedDate.getFullYear()}`;
    let month = `${selectedDate.getMonth() + 1}`;
    let day = `${selectedDate.getDate()}`;

    if (month.length == 1) {
      month =  '0' + month ;
    }

    if (day.length == 1) {
      day =  '0' + day;
    }

    return year + '/' + month + '/' + day;
  },

  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      calendarShow: false,
      selectedDate: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  // 房间数量
  selectedRoomNumber(e) {
    console.log(e.detail);
    let num = e.detail;
    this.setData({
      num
    })
  },
  // 输入框的值
  onInput: function (e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    var value = e.detail;
    this.data[dataset.name] = value;
  },
  
  // 验证
  verify() {
    if (!this.data.selectedDate) {
      wx.showToast({
        title: '请选择入离日期',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },

  // 预订房间
  bookingR() {
    if (!this.verify()) {
      return;
    }
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('bookingR').add({
      data: {
        selectedDate: this.data.selectedDate,
        name: this.data.name,
        phone: this.data.phone,
        num: this.data.num,
        price: this.data.price,
        total: (this.data.price * this.data.num),
        status: 'new'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          icon: 'success',
          title: '预订成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000);
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
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let price = options.price;
    this.setData({
      price: price
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