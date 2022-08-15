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
  good(data){
       return request("shop/goods/detail",data,"GET")
  },
  // 添加购物车
  addCar(data){
     return request("shopping-cart/add",data,"POST")
  },
  // 用户登录
  userLogin(data){
    return request(`/user/wxapp/login`,data,"POST")
  },
  // 用户注册
  newUsers(){
    return request("/user/wxsns/register",data,"POST")
  }


}