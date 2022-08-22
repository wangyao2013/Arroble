// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    historyList: [],
    show: {
      primary: true,
      success: true,
    },
  },
  onChange(e) {
    //  console.log(e.detail);
    this.setData({
      value: e.detail
    })
  },
  search1(e) {
    // console.log(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: `/pages/goodsList/goodsList?k=${e.currentTarget.dataset.name}`
    })
  },
  search() {
    let falg = false
    this.data.historyList.forEach(item => {
      if (item == this.data.value) {
        falg = true
      }
    })
    if (falg == false) {
      this.data.historyList.push(this.data.value)
      wx.setStorageSync('history', this.data.historyList)
      // console.log(this.data.value);
    
    
    }
    wx.navigateTo({
      url: `/pages/goodsList/goodsList?k=${this.data.value}`
    })
    this.data.value = ""
    this.setData({
      value: this.data.value
    })


    this.render()
  },
  onClose(e) {
    let index = e.currentTarget.dataset.index
    this.data.historyList.splice(index, 1)
    this.setData({
      historyList: this.data.historyList
    })
    wx.setStorageSync('history', this.data.historyList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  render() {
    let data = wx.getStorageSync('history')
    if (data) {
      this.setData({
        historyList: data
      })
    } else {
      this.setData({
        historyList: []
      })
    }
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
    this.render()
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