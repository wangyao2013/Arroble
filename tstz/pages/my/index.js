const {userLogin} =require("../../http/api")
Page({
  data: {
    userInfo: {},
    num: 0,
    show: true,
    flag: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  lj() {
    this.setData({
      show: true
    })
    //this.getTf()
  },
  // 点击优惠
  yh(){
    wx.switchTab({
      url: '/pages/preferential/index',
    })
  },
  getUserProfile: function (res) {
    wx.getUserProfile({
      desc: '用于微信账号与平台账号绑定', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res,
          flag: !this.data.flag
          // userInfoStr: JSON.stringify(res)
        })
      },
      fail: (res) => {
        console.log("获取用户个人信息失败: ", res);
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    })
  },
  onLoad: function () {

  },
  tc() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: `https://api.it120.cc/fyy/user/loginout?token=${token}`,
      header: {
        'content-type': ' application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: {},
          show: true,
          flag: true
        })
      }
    })
    wx.removeStorageSync('token')
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //收藏页面
  sc() {
    wx.navigateTo({
      url: '/pages/sc/sc',
    })
  },
  getTf() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: `https://api.it120.cc/Arroble/user/detail?token=${token}`,
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          //如果后台有这个用户，说明已经登录过了
          // 调用na这个方法，获取用户信息渲染到页面
          this.na();
          this.setData({
            show: false,
            flag: true
          })
        } else {
          this.setData({
            show: true,
            flag: false
          })
        }
      }
    })
  },
  onShow() {

  },
  yx() {
    this.lg();
    this.getTf()
  },
  zb() {
    console.log(this.data.flag)
    this.setData({
      show: false,
      flag: false
    })
    //this.getTf();
  },
  na() {
    wx.getUserInfo({
      success: (ress) => {
        console.log(ress)
        this.setData({
          userInfo: ress.userInfo
        })
      }
    })
  },
  lg() {
    wx.login({
      success(res) {
        // console.log('wx.login:',res)
        let data={
           code:res.code
        }
         console.log(res.code);
        userLogin(data).then(res=>{
          console.log(res);
        })
      
      }
    })
  },
})