// pages/likeList/likeList.js
const {
  getLikeList,
  delMylike
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  async del(e) {
    console.log(this.data.list.length);
    let item = e.currentTarget.dataset.data
    // this.data.list.forEach((ele,index)=>{
    //   if(ele.id==item.id){
    //     this.data.list[index].splice(index,1)
    //   }
    // })
    // this.setData({
    //   list:this.data.list
    // })
    console.log(e.currentTarget.dataset.data);
    let data = {
      type: 1,
      goodsId: item.id,
      token: wx.getStorageSync('token')
    }
    let res = await delMylike(data)
  
    console.log(res);
    if (res.code == 0) {
      wx.showToast({
        title: '删除成功',
      })
       this.getList()

    }
    // console.log(this.data.list.length);
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
  async getList() {
    let data = {
      token: wx.getStorageSync('token'),
      type: 1
    }
    let res = await getLikeList(data)
    console.log(res);
  
    if (res.code == 0) {
    
      this.setData({
        list: res.data.goodsMap
      })
    }else if(res.code==700){
      this.setData({
        list:[]
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getList()
   
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