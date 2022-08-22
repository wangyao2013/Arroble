// pages/preferential/index.js
const {getCoupons} =require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:["可领","已领","失效","口令"],
    showIndex:0,
    CouponsList:[]
  },
  // 点击切换
  changeShow(e){
    // console.log(e.currentTarget.dataset.index);
    this.setData({
      showIndex:e.currentTarget.dataset.index
    })
  },
 async render(){
   let data={
    token:wx.getStorageSync('token'),
    status:0
   }
   let res= await getCoupons(data)
   console.log(res);
   this.setData({
    CouponsList:res.data
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
   this.render()
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