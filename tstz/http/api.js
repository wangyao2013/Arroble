// const WXAPI = require('apifm-wxapi')
const {
  request
} = require("./request")
module.exports = {
  // 获取导航轮播图
  getBanner(type = "index") {
    return request("/banner/list", {
      type: type
    }, "GET")
  },
  // 获取启动导航轮播图
  getStartBann(type = "app") {
    return request("/banner/list", {
      type: type
    }, "GET")
  },
  // 分类列表
  getcategoryList(data) {
    return request("shop/goods/category/all", data, "GET")
  },
  // 公告提示
  getshop() {
    return request("notice/last-one", "GET")
  },
  // 商品列表 限时秒杀
  getGoodList(data) {
    return request("shop/goods/list/v2", data, "POST")
  },
  //  分类详情
  getcateList(data) {
    // console.log(data);
    return request("shop/goods/list", "GET")
  },
  // 商品详情
  good(data) {
    return request("shop/goods/detail", data, "GET")
  },
  // 添加购物车
  addCar(data) {
    return request("shopping-cart/add", data, "POST")
  },
  // 用户登录
  userLogin(data) {
    return request(`/user/wxapp/authorize`, data, "POST")
  },

  // 检测token是否有效
  checkToken(token) {
    return request("/user/check-token", {
      token
    }, "GET")
  },
  // 修改用户信息
  updateUserApi(data) {
    return request("/user/modify", data, "POST")
  },
  //查询用户详情
  getUserDetailApi(token) {
    // console.log(token);
    return request('user/detail', {
      token
    }, 'GET')
  },
  // 读取购物车数据
  getCarlist(data) {
    return request("/shopping-cart/info", data, "GET")
  },
  // 购物车修改数量
  changeCarNumber(data) {
    return request("/shopping-cart/modifyNumber", data, "POST")
  },
  // 改变商品转态
  changeFlag(data) {
    return request("/shopping-cart/select", data, "POST")
  },
  // 删除购物车数据
  delCar(data) {
    return request("/shopping-cart/remove", data, "POST")
  },
  //  我的可领优惠券
  getCoupons(data){
    return request("/discounts/my",data,"GET")
  },
  // 添加商品收藏
  goodsLikeAdd(data){
    return request("shop/goods/fav/add",data,"POST")
  },
  // 检测是否收藏
  checkedLike(data){
    return request("/shop/goods/fav/check",data,"GET")
  },
  // 删除商品收藏
  delMylike(data){
    return request("/shop/goods/fav/delete",data,"POST")
  },
  // 获取商品评价内容
  getreputation(data){
    return request("/shop/goods/reputation/v2",data,'POST')
  },
  // 获取商品价格
  getPrice(data){
    return request("/shop/goods/price",data,"POST")
  },
  // 获取收藏列表
   getLikeList(data){
     return request("/shop/goods/fav/list/v2",data,"POST")
   }

}