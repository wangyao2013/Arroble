// pages/classify/index.js
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
    cateList: [],
    cateRightList: [],
    cateid: 322007,
    show:false,
    goodList:[],
    num:1,
    i:""
  },
  async render() {
    let res = await getcategoryList()
    // console.log(res);
    this.setData({
      cateList: res.data
    })

  },
  change(e) {
    // console.log(e.currentTarget.dataset.id);
    this.setData({
      cateid: e.currentTarget.dataset.id
    })
    this.render2()
  },
  render2() {
    getcateList().then(res => {
      // console.log(res);
      this.data.cateRightList = res.data.filter(item => {
        return item.categoryId == this.data.cateid
      })
      this.setData({
        cateRightList: this.data.cateRightList
      })
    })
    

    // this.setData({
    //   cateRightList:res.data
    // })
  },
  onClose() {
    this.setData({ show: false });
  },
  // 查看商品详情
  gotoGood(e){
   wx.navigateTo({
     url: `/pages/good/good?id=${e.currentTarget.dataset.id}`,
   })
  },
  // 控制是否显示弹出层
 async showPopup(e){
   this.data.show=!this.data.show
  //  console.log(e.currentTarget.dataset.item);
  let data={
    id:e.currentTarget.dataset.item
  }
   let res=await good(data)
   console.log(res);
  this.data.goodList=res.data
  this.setData({
    goodList:this.data.goodList,
    show:this.data.show
  })

  
  },
  // 切换商品配置
  changeSize(e){
    // console.log(e);
      //  console.log(e.currentTarget.dataset.index);
      this.data.i=e.currentTarget.dataset.item
      this.setData({
        i:this.data.i
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  //  console.log(options);
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
    
    let id=wx.getStorageSync('cateid')
    if(id){
      this.setData({
        cateid:id
       })
       wx.removeStorageSync('cateid')
    }
   
    console.log(this.data.cateid);
    this.render()
    // this.render2()
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