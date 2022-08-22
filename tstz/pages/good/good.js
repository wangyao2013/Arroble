// pages/good/good.js
const {
  good,
  goodsLikeAdd,
  checkedLike,
  delMylike,
  getreputation,
  addCar
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {},
    content: "",
    i: "",
    show: false,
    skuList: [],
    num: 1,
    i2: "",
    scFlag: true,
    duration:0,
    id: "",
    goodID: "",
    createTabs: true,
    active: 0,
    toView: "",
    top: "",
    tabs: [{
        tabsName: "商品简介",
        tabsId: "swiper-container",
        topHeight: 0
      },
      {
        tabsName: "商品详情",
        tabsId: "swiper-desc",
        topHeight: 0
      }, {
        tabsName: "商品评价",
        tabsId: "swiper-pl",
        topHeight: 0
      }
    ]
  },
  // 滚动触发
  bindscroll() {

    let query = wx.createSelectorQuery()
    query.select("#swiper-container").boundingClientRect((res) => {
      this.data.tabs[0].topHeight = res.top
      let height = res.height
      this.setData({
        tabs: this.data.tabs
      })
      if (height + this.data.tabs[0].topHeight <= 54) {
        this.setData({
          active: 1
        })
        // console.log(this.data.active);
      } else if (height + this.data.tabs[0].topHeight >= 54) {
        this.setData({
          active: 0
        })
      }
    }).exec()


  },
  changeTab(e) {
    // console.log(e.detail.index);
    let index = e.detail.index

    this.setData({
      toView: this.data.tabs[index].tabsId,
    })
    this.bindscroll(index)
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
  // 切换商品配置
  changeSize(e) {
    console.log(this.data.good);
    console.log(e.currentTarget.dataset);
    let pid = e.currentTarget.dataset.pid
    let id = e.currentTarget.dataset.id
    const father = this.data.good.properties.find(item => {
      return item.id == pid
    })
    father.childsCurGoods.forEach(item => {
      if (item.id == id) {
        item.active = true
      } else {
        item.active = false
      }
    })
    let data = {
      "optionId": pid,
      "optionValueId": id
    }
    this.data.skuList.push(data)
    //  let sku=[]
    this.setData({
      good: this.data.good,
      skuList: this.data.skuList
    })
    // console.log(father);
  },
  // 点击添加购物车
  async addCart() {
    // console.log(this.data.goodList.properties.length);

    let lenght = this.data.good.properties.length
    console.log(this.data.skuList.length);
    console.log(lenght);
    if (lenght != this.data.skuList.length) {
      wx.showToast({
        title: 'sku未选择完整',
        icon: "error"
      })
      return
    }
    let data = {
      token: wx.getStorageSync('token'),
      goodsId: this.data.goodID,
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
    console.log(this.data.good.properties);
    this.setData({
      skuList: [],
      show: false,
      num: 1,
    })
    this.render()
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 删除收藏
  async delsc(e) {
    console.log(e.currentTarget.dataset.id);
    let data = {
      token: wx.getStorageSync('token'),
      goodsId: e.currentTarget.dataset.id,
      type: 1
    }
    let res = await delMylike(data)
    console.log(res);
    if (res.code == 0) {
      wx.showToast({
        title: '取消收藏成功',
      })
    }
    this.setData({
      scFlag: true
    })
  },
  // 获取商品评论
  async getUserspl() {
    let data = {
      goodsId: this.data.id,
      page: 1,
      pageSize: 5,
      token: wx.getStorageSync('token')
    }
    let res = getreputation(data)
    console.log(res);
  },
  change(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      i: e.currentTarget.dataset.index
    })
  },
  async checkedSc() {
    console.log(this.data.good);
    let data = {
      token: wx.getStorageSync('token'),
      goodsId: this.data.goodID,
      type: 1
    }
    console.log(data);
    let res = await checkedLike(data)
    console.log(res);
    if (res.data == "已收藏") {
      this.data.scFlag = false
    } else {
      this.data.scFlag = true
    }
    this.setData({
      scFlag: this.data.scFlag
    })

  },
  async sc(e) {
    console.log(e.currentTarget.dataset.id);
    let data = {
      goodsId: this.data.goodID,
      type: 1,
      token: wx.getStorageSync('token')
    }
    console.log(data);
    let res = await goodsLikeAdd(data)
    console.log(res);
    if (res.code == 0) {
      wx.showToast({
        title: '收藏成功',
      })
    }
    this.setData({
      scFlag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options.id);
    this.setData({
      goodID: options.id
    })

  },
  async showPopup(e) {
    this.data.show = !this.data.show
    //  console.log(e.currentTarget.dataset.item);
    this.setData({
      good: this.data.good,
      show: this.data.show
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  async render() {
    let res = await good({
      id: this.data.goodID
    })
    console.log(res);
    this.data.good = res.data
    this.setData({
      good: res.data,
      id: this.data.id,
      content: res.data.content.replace(/<img /g, '<img style="width:100%;height:auto;display:block;"')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    this.render()
    this.checkedSc()
    this.getUserspl()
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