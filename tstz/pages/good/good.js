// pages/good/good.js
const {
  getcategoryList,
  getcateList,
  good
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: [],
    content:"",
    i:"",
    show:false,
    goodList:[],
    num:1,
    i2:""
  },
  onClose() {
    this.setData({ show: false });
  },
  change(e){
    console.log(e.currentTarget.dataset.index);
    this.setData({
      i:e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options.id);
    let res = await good({
      id: options.id
    })
    console.log(res);
    this.data.good = res.data
    this.setData({
      good: res.data,
      content : res.data.content.replace(/<img /g, '<img style="width:100%;height:auto;display:block;"')
    })
  },
  async showPopup(e){
    this.data.show=!this.data.show
   //  console.log(e.currentTarget.dataset.item);
   this.setData({
     goodList:this.data.goodList,
     show:this.data.show
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