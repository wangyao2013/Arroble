// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    list:[
      {name:"22",flag:true}
    ],
    a:"",
    b:""
  },
 getvalue(e){
    //  console.log(e.detail.value);
     this.data.value=e.detail.value
     this.setData({
        value:this.data.value
     })
     this.render()
  },
  add(){
    if(this.data.value==""){
      return
    }
       let data={
         name:this.data.value,
         flag:false,
       }
       this.data.list.push(data)
       this.setData({
        list:this.data.list
       })
       this.render()

  },
  change(e){
    // console.log(e.currentTarget.dataset.i);
    let i=e.currentTarget.dataset.i
    this.data.list[i].flag=!this.data.list[i].flag
    this.setData({
      list:this.data.list
    })
    this.render()
  },
  del(e){
    // console.log(e);
      let i=e.currentTarget.dataset.index
      this.data.list.splice(i,1)
      this.setData({
        list:this.data.list
      })
      this.render()
  },
  render(){
    this.data.a=this.data.list.filter(item=>item.flag==false).length
    this.data.b=this.data.list.filter(item=>item.flag==true).length
    this.setData({
      a:this.data.a,
      b:this.data.b
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.render()
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