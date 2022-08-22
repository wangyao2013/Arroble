const {
  userLogin,
  updateUserApi,
  getUserDetailApi
} = require("../../http/api")
const AUTH = require('../../utils/auth')
Page({
  data: {
    num: 0,
    show: true,
    flag: true,
    boxShow: false,
    userStatus: 1,
    base:{}

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

  onLoad: function () {

  },

  //收藏页面
  openUserInfo() {
    const _this=this;
    wx.getUserProfile({
      lang: 'zh_CN',
      desc:'请求用户授权',
      success(res) {
        console.log('用户头像信息：：：',res)
        //调用更新用户信息方法
        _this.updateUserInfo(res.userInfo)
      }
    })
  },
 
  async getUserInfo() {
    const token=wx.getStorageSync('token')
    const res=await getUserDetailApi(token)
    //渲染的用户信息
    const _data={}
    _data.userinfo=res.data.base
    console.log(_data);
    console.log('用户详情：：：：：',res)
    //判断是否有用户头像和用户昵称
    if(res.data.base.nick && res.data.base.avatarUrl) {

      this.setData({
        userStatus:2,
        base:_data.userinfo
      })

    }else {
      this.setData({
        userStatus:1
      })
    }

    this.setData(_data)
  },
 
  async updateUserInfo(userInfo) {
    //判断用户是否登录
    const valid= AUTH.LoginChecked()
    //如果用户登录了
    if(valid) {
      console.log(userInfo);
      //1.获取token
      const token=wx.getStorageSync('token')
      //2.拿到用户昵称  用户头像，省，市，性别，年龄，token
        const {city,nickName,province,avatarUrl,gender}=userInfo

      //3.调取更新用户接口上面的参数更新到后台数据库
      await updateUserApi({city,nick:nickName,province,avatarUrl,gender,token})

     //4.刷新当前用户界面 
      this.getUserInfo()
    }
  },
  async onShow() {
    //调取用户详情
   this.getUserInfo()

   const valid=await AUTH.LoginChecked()

   if(valid) {
     this.getUserInfo()
   }else {
     //没登录，得登录一下
    await AUTH.authLogin()
   }
   
  },
  // 点击余额
   ye(){
     wx.navigateTo({
       url: '/pages/ye/ye',
     })
   },
   dj(){
     wx.navigateTo({
       url: '/pages/dj/dj',
     })
   },
   jf(){
     wx.navigateTo({
       url: '/pages/jf/jf',
     })
   },
  //  点击成长
  cz(){
    wx.navigateTo({
      url: '/pages/cz/cz',
    })
  },

  // 点击我的订单
  ckMyorder(e){
    // console.log(e.currentTarget.dataset.index);
    let index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/myOrder/myOrder?index=${index}`,
    })
  },
  // 点击售后
  sh(){
    wx.navigateTo({
      url: `/pages/sh/sh`,
    })
  },
  Gps(){
    wx.navigateTo({
      url: `/pages/gps/gps`,
    })
  },
  // 点击回收
  backOrder(){
    wx.navigateTo({
      url: '/pages/backOrder/backOrder',
    })
  },
  // 优惠买菜
  Yhbuy(){
    wx.navigateTo({
      url: '/pages/Yhbuy/Yhbuy',
    })
  },
  yh(){
   wx.switchTab({
     url: '/pages/preferential/index',
   })
  },
  // 发票
  gobill(){
    wx.navigateTo({
      url: '/pages/bill/bill',
    })
  },
  // 每日签到
  day(){
    wx.navigateTo({
      url: '/pages/day/day',
    })
  },
  // 开票记录
  gotoJl(){
    wx.navigateTo({
      url: '/pages/jl/jl',
    })
  },
  retailer(){
    wx.navigateTo({
      url: '/pages/retailer/retailer',
    })
  },
  // 积分券兑换积分
  integral(){
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  // 积分兑换成长值
  Growth(){
    wx.navigateTo({
      url: '/pages/Growth/Growth',
    })
  },
  // 点击帮助中心
  help(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 个人信息
  information(){
    wx.navigateTo({
      url: '/pages/information/information',
    })
  },
  // 点击设置
  set(){
    wx.navigateTo({
      url: '/pages/set/set',
    })
  }
})
