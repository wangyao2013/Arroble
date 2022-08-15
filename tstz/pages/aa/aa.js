// pages/aa/aa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  processLogin(e) {
    console.log(e);
    //如果没有用户userInfo
    if (!e.detail.userInfo) {
      wx.showToast({
        title: "取消"
      })
      return;
    } else { //如果用userInfo，则调用register注册方法
      this.register(this);
    }
  },
  async  register(page) {
    let _this = this
    wx.login({
      success: function (res) {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
  
        //微信小程序内置获取用户信息的api方法
        wx.getUserInfo({
          success: function (res) {
            
            let iv = res.iv; //加密值
            let encryptedData = res.encryptedData; //包括敏感数据在内的完整用户信息的加密数据
            let referrer = ""
            let referrer_storge = wx.getStorageSync(referrer);
            if (referrer_storge) {
              referrer = referrer_storge;
            }
            // 下面开始调用注册接口，用咱们封装调用接口方法去注册
            this.register_complex({
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              referrer: referrer
            }).then(function (res) {
              console.log(res)
              _this.login(page);
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})