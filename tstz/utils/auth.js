const AUTH = require("../http/api")
function checkWXStatus() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
async function LoginChecked() {
  const token = wx.getStorageSync('token')
  if (!token) {
    return false
  }
  const res = await AUTH.checkToken(token)
  if (res.code !== 0) {
    wx.removeStorageSync('token')
    return false
  }
  // 检查小程序的登录态
  const flag = await checkWXStatus()
  if (!flag) {
    // 说明未登录
    wx.removeStorageSync('token')
    return false
  }
  return true
}
//自动注册与登录方法
function authLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      async success(res) {
        // res::获取code向后端发送请求
        console.log(res);
        const result = await AUTH.userLogin({code:res.code})
        console.log(result);
        // 后端返回token
        wx.setStorageSync('token', result.data.token)
      }
    })
  })
}
module.exports={
  authLogin,
  LoginChecked
}