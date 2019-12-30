// pages/register/register.js
const app = getApp()
Page({

  data: {
    name: '',
    tel: '',
    address: '',
    wishList: [
      { dzzs: '1', collected: 1, id: 1 }
    ]
  },
  
  // onCollectionTap: function (item_id) {
  //   var that = this;
  //   var show;//传递到数据库点赞的状态   
  //   var cookie_mid = wx.getStorageSync('index') || [];//获取全部点赞的mid    
  //   var newmessage = [];

  //   for (var i = 0; i < that.data.item_list; i++) {
  //     if (that.data.item_list[i].id == item_id) {//遍历找到对应的id
  //       var num = that.data.item_list[i].like_num;//当前赞数
  //       var isshow; //点赞的状态

  //       if (cookie_mid.includes(item_id)) {//说明已经点过赞,取消赞  
  //         for (var j = 0; j < cookie_mid.length; j++) {
  //           if (cookie_mid[j] == item_id) {
  //             cookie_mid.splice(j, 1);//删除取消赞的mid 
  //           }
  //         }
  //         --num;
  //         isshow = 0;//点赞的状态
  //         that.setData({
  //           [`item_list[${i}].like_num`]: num, //es6模板语法（反撇号字符）
  //           [`item_list[${i}].favor_img`]: "../../image/favor.png",
  //         })
  //         wx.setStorageSync('index', cookie_mid);
  //         wx.showToast({
  //           title: "取消点赞!",
  //           icon: 'none'
  //         })
  //         //console.log("前端取消点赞"+isshow)

  //       } else {
  //         isshow = 1;//点赞的状态
  //         ++num;
  //         that.setData({
  //           [`item_list[${i}].like_num`]: num,//es6模板语法（反撇号字符）
  //           [`item_list[${i}].favor_img`]: "../../image/favor_press.png",
  //         })
  //         cookie_mid.unshift(item_id);//新增赞的mid
  //         wx.setStorageSync('index', cookie_mid);
  //         wx.showToast({
  //           title: "点赞成功!",
  //           icon: 'none'
  //         })
  //         //console.log("前端点赞成功" + isshow)
  //       }
  //       //console.log(cookie_mid); 
  //       //点赞数据同步到数据库
  //       // wx.request({
  //       //   url: 'https://xxx.xxxx.xxx/zan.php',
  //       //   method: 'POST',
  //       //   header: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //       //   data: {
  //       //     id: item_id,
  //       //     show: isshow,
  //       //   },
  //       //   success: function (res) {
  //       //     //console.log("show:" +show)
  //       //     //console.log(res.data);
  //       //   }
  //       // })
  //     }
  //   }
  // },

  // /**
  //  * 点赞
  //  */
  // favorclick: function (options) {
  //   var item_id = options.currentTarget.dataset.id;//此处找到列表的id
  //   //console.log(item_id);//列表id
  //   this.onCollectionTap(item_id);
  // },

  // 更改点赞状态
  onCollectionTap: function (event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.wishList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].dzzs = parseInt(message[i].dzzs) + 1
        } else {
          collectStatus = false
          message[i].collected = parseInt(message[i].collected) - 1
          message[i].dzzs = parseInt(message[i].dzzs) - 1
        }
        wx.showToast({
          title: collectStatus ? '收藏成功' : '取消收藏',
        })
      }
    }
    this.setData({
      wishList: message
    })
  },


  changeName(e) {
    this.setData({
      name: e.detail.value
    })

  },
  changeTel(e) {
    this.setData({
      tel: e.detail.value
    })

  },
  changeAddress(e) {
    this.setData({
      address: e.detail.value
    })

  },
  submit() {
    wx.switchTab({
      url: '/pages/myPage/my'
    })
  },
  /*submit(e){
    //先判断是否为空
    wx.request({
      url: '',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },*/

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(option) {
  

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})