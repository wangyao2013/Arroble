// pages/home/index.js
const {
  getBanner,
  getcategoryList,
  getshop,
  getGoodList
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    categoryList: [],
    title: "",
    miaoshaList: [],
    bpList: [],
    kjlist: [],
    currentValue: 0,
    ptlist: [],
    goodsList: [],
    show: true,
    pageInfo: {
      page: 1,
      pageSize: 8
    },
    floorstatus:false
  },

  // 获取分类列表
  async render() {
    let res = await getcategoryList()
    console.log(res.data);
    this.setData({
      categoryList: res.data
    })
  },

  // 获取公告
  async gg() {
    let res = await getshop()
    this.setData({
      title: res.data.title
    })
  },

  // 限时秒杀
  async miaosha() {
    let data = {
      miaosha: true,
    }
    let res = await getGoodList(data)
    this.setData({
      miaoshaList: res.data.result
    })
  },
  // 爆品推荐
  async bp() {
    let data = {
      recommendStatus: 1,
    }
    let res = await getGoodList(data)
    // console.log(res);
    this.setData({
      bpList: res.data.result
    })
  },
  gotoGood(e) {

    wx.navigateTo({
      url: `/pages/good/good?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 疯狂砍价
  async kj() {
    let data = {
      kanjia: true,

    }
    let res = await getGoodList(data)
    console.log(res);
    this.setData({
      kjlist: res.data.result
    })
  },
  // 全民拼团
  async pt() {
    let data = {
      pingtuan: true
    }
    let res = await getGoodList(data)
    console.log(res);
    this.setData({
      ptlist: res.data.result
    })
  },
  // 商品列表 
  async goods() {
    let res = await getGoodList(this.data.pageInfo)
    console.log(res);
    if (res.code == 700) {
      this.show = true
    } else {
      this.data.goodsList = this.data.goodsList.concat(res.data.result)
      this.show = false
    }

    this.setData({
      goodsList: this.data.goodsList,
      show: this.show
    })
  },
  Gohot() {
    wx.navigateTo({
      url: '/pages/hot/hot',
    })
  },
  gotoTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  gotoclass(e) {
    console.log(e.currentTarget.dataset.id);
    wx.setStorageSync('cateid', e.currentTarget.dataset.id)
    wx.switchTab({
      url: `/pages/classify/index`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  gotosearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
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


    const res = await getBanner()
    console.log(res);
    this.setData({
      bannerList: res.data
    })
    this.render()
    this.gg()
    this.miaosha()
    this.bp()
    this.kj()
    this.pt()
    this.goods()
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
  // 下拉底部触发
  onReachBottom() {
    // console.log("111");

    this.data.pageInfo.page++
    this.goods()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})