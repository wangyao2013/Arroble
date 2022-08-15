

// pages/start/start.js
import {getStartBann} from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    num:0
  },
  gotoHome(){
    wx.switchTab({
      url: '/pages/home/index',
    })
    let flag=true
    wx.setStorageSync('key', flag)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 async onReady() {
  let res= await getStartBann()
  this.setData({
    list:res.data
  })
  },
  swiperChange(e){
   console.log(e.detail.current);
   this.data.num=e.detail.current
   this.setData({
     num:this.data.num
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(wx.getStorageSync('key')){
      wx.switchTab({
        url: '/pages/home/index',
      })
    }
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