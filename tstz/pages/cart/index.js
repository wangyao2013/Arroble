// pages/cart/index.js
const {
  getCarlist,
  changeCarNumber,
  changeFlag,
  delCar
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    num: 0,

  },
  // 点击加减
  async add(e) {
    let item = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item);
    let data = {
      key: item.key,
      number: item.number + 1,
      token: wx.getStorageSync('token')
    }
    let res = await changeCarNumber(data)
    console.log(res);
    this.setData({
      cartList: res.data
    })
    this.js()
  },
  async sub(e) {
    let item = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item);
    let data = {
      key: item.key,
      number: item.number - 1,
      token: wx.getStorageSync('token')
    }
    let res = await changeCarNumber(data)
    console.log(res);
    this.setData({
      cartList: res.data
    })
    this.js()
  },
  async changeFlag(e) {
    let item = e.currentTarget.dataset.item

    console.log(e.currentTarget.dataset.item);
    let data = {
      key: item.key,
      selected: !item.selected,
      token: wx.getStorageSync('token')
    }

    let res = await changeFlag(data)
    console.log(res);
    this.setData({
      cartList: res.data
    })
    this.js()
  },
  async del(e) {
    let item = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item);
    let data = {
      key: item.key,
      token: wx.getStorageSync('token')
    }
    let res = await delCar(data)
    console.log(res);
    if (res.code == 700) {
      this.setData({
        cartList: []
      })
      wx.removeTabBarBadge({
        index: 3,
      })
      return
    }
    this.setData({
      cartList: res.data
    })
    wx.showToast({
      title: '删除成功',
    })
    this.js()
  },
  js() {
    wx.setStorageSync('num', this.data.cartList.number)
    let num = wx.getStorageSync('num')
    wx.setTabBarBadge({
      index: 3,
      text: num.toString()
    })

  },
  // 跳转付款页面
  gotoBuy(){
    wx.navigateTo({
      url: '/pages/buy/buy',
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
  async onShow() {

    let token = wx.getStorageSync('token')
    let data = {
      token
    }
    console.log(data);
    let res = await getCarlist(data)

    console.log(res);
    if (res.code == 700) {
      wx.setStorageSync('num', 0)
      return
    }
    this.setData({
      cartList: res.data
    })
    this.js()
    console.log(res.data.items.length);

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