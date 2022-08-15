// pages/goodsList/goodsList.js
const {
  getGoodList
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    k: "",
    list: [],
    value: "",
    index: 0,
    flag: true
  },
  async render(obj) {
    let data = {
      nameLike: this.data.value,
      ...obj
    }
    let res = await getGoodList(data)
    this.setData({
      list: res.data.result
    })
    console.log(res);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  gotoGood(e) {

    wx.navigateTo({
      url: `/pages/good/good?id=${e.currentTarget.dataset.id}`,
    })
  },
  onLoad(options) {
    // console.log(options.k);
    this.setData({
      value: options.k
    })
    this.render()
  },
  change(e) {
    //  console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index
    if (index == 3) {
      let data = {
        orderBy: "priceUp",
      }
      this.render(data)
    } else if (index == 1) {
      let data = {
        orderBy: "addedDown"
      }
      this.render(data)
    } else if (index == 2) {
      let data = {
        orderBy: "ordersDown"
      }
      this.render(data)
    }else if(index==0){
      let data={
        orderBy: "nameUp" 
      }
      this.render(data)
   
    }
    this.setData({
      index: e.currentTarget.dataset.index
    })


  },
  changeimg() {
    this.data.flag = !this.data.flag
    this.setData({
      flag: this.data.flag
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