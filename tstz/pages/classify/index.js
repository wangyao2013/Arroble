// pages/classify/index.js
const {
  getcategoryList,
  getcateList,
  good,
  addCar,
  getPrice
} = require("../../http/api")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    cateRightList: [],
    cateid: 322006,
    show: false,
    goodList: [],
    num: 1,
    i: "",
    skuList: [],
    id: '',
    strList: [],
    newPrice: ""
  },
  async getPrice() {
    let arr=[]
    this.data.strList.forEach((item, index) => {
      let str = `${item.pid}:${item.id}`
      arr.push(str)
    })
    console.log(arr);
    let data = {
      token: wx.getStorageSync('token'),
      propertyChildIds: arr.join(","),
      goodsId: this.data.id
    }
    // console.log(data);
    let res = await getPrice(data)
    console.log(res);
    if (res.code == 0) {
      this.setData({
        newPrice: res.data.price,
      })
      //  this.data.strList=[]
    }

  },
  async render() {
    let res = await getcategoryList()
    // console.log(res);
    this.setData({
      cateList: res.data
    })

  },
  add() {
    this.data.num++
    this.setData({
      num: this.data.num
    })
  },
  sub() {
    this.data.num--
    this.setData({
      num: this.data.num
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
      console.log(res);
      this.data.cateRightList = res.data.filter(item => {
        return item.categoryId == this.data.cateid
      })
      this.setData({
        cateRightList: this.data.cateRightList
      })
    })
  },
  // 添加购物车
  async addCard(e) {
    let token = wx.getStorageSync('token')
    let num = wx.getStorageSync('num')
    let id = e.currentTarget.dataset.id
    const good = this.data.cateRightList.find(item => {
      return item.id == id
    })
    console.log(num);
    let num2 = num
    wx.setStorageSync('num', num2)
    wx.setTabBarBadge({
      index: 3,
      text: num2.toString()
    })
    let res = await addCar({
      goodsId: good.id,
      number: 1,
      token,
      sku: this.data.skuList
    })

    console.log(res);
    if (res.code == 0) {
      wx.showToast({
        title: '添加成功',
      })
    }

  },
  onClose() {
    wx.showTabBar({
      animation: true,
    })
    this.setData({
      show: false
    });
  },
  // 查看商品详情
  gotoGood(e) {
    wx.navigateTo({
      url: `/pages/good/good?id=${e.currentTarget.dataset.id}`,
    })
  },
  onChange() {

  },
  // 控制是否显示弹出层
  async showPopup(e) {
    this.data.strList=[]
    wx.hideTabBar({
      animation: true,
    })
    if (this.data.show == false) {
      this.data.show = !this.data.show
      this.data.id = e.currentTarget.dataset.item
      // console.log(e.currentTarget.dataset.number);
      let data = {
        id: e.currentTarget.dataset.item
      }
      let res = await good(data)
      this.data.goodList = res.data
      this.setData({
        goodList: this.data.goodList,
        show: this.data.show
      })
    } else {
      this.setData({
        show: false
      })
    }
  },
  // 切换商品配置
  changeSize(e) {
    let pid = e.currentTarget.dataset.pid
    let id = e.currentTarget.dataset.id
    const father = this.data.goodList.properties.find(item => {
      return item.id == pid
    })
    father.childsCurGoods.forEach(item => {
      if (item.id == id) {
        item.active = true
      } else {
        item.active = false
      }
    })
    let str = {
      pid: pid,
      id: id
    }
    let flag2 = false
    this.data.strList.forEach((item, index) => {
      if (item.pid == pid) {
        this.data.strList[index].id = id
        flag2 = true
      }
    })
    if (flag2 == false) {
      this.data.strList.push(str)
    }
   
    let lenght = this.data.goodList.properties.length
    if(lenght==this.data.strList.length){
      this.getPrice()
    }
    this.setData({
      goodList: this.data.goodList,
      skuList: this.data.skuList
    })
    // console.log(this.data.strList);
    let data = {
      "optionId": pid,
      "optionValueId": id
    }
  
    this.data.skuList.push(data)
  },
  async addCart() {
    let lenght = this.data.goodList.properties.length
    if (lenght != this.data.skuList.length) {
      wx.showToast({
        title: 'sku未选择完整',
        icon: "error"
      })
      return
    }
    let num = wx.getStorageSync('num')
    let num2 = num + 1
    wx.setTabBarBadge({
      index: 3,
      text: num2.toString()
    })
    wx.showTabBar({
      animation: true,
    })
    let data = {
      token: wx.getStorageSync('token'),
      goodsId: this.data.id,
      sku: JSON.stringify(this.data.skuList),
      number: this.data.num
    }

    let res = await addCar(data)
    if (res.code == 0) {
      wx.showToast({
        title: '添加成功',
      })
    } else if (res.code == 30000) {
      wx.showToast({
        title: '"当前商品没有该sku组合"',
        icon: "error"
      })
    } else {
      wx.showToast({
        title: '添加失败',
        icon: "error"
      })
    }
    wx.setStorageSync('num', this.data.num)
    this.setData({
      skuList: [],
      show: false,
      num: 1,
      strList:[]
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
    this.render()
    let id = wx.getStorageSync('cateid')
    if (id) {
      this.setData({
        cateid: id
      })
      wx.removeStorageSync('cateid')
    } else {
      this.render2()
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