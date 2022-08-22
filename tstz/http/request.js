const {
  baseURL
} = require("./url").prod
const isVip = "Arroble"

module.exports = {
  request: function (url = "", data = {}, method = "get", isDomain = true) {

    // console.log(url, data, method);
    if (isDomain) {
      url = `${baseURL}/${isVip}/${url}`
    } else {
      url = `${baseURL}/${url}`
    }
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '拼命加载中',
      })

      wx.request({
        url,
        method,
        data,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        appid:"wx0d5e53904ab1e860",
        secret:"ab8f37f5639fce00a44888949a222adf",
     
        success(res) {
          // console.log(res);
          resolve(res.data)
          wx.hideLoading()
        },
        fail(error) {
          reject(error)
        }
      })
    })
  }
}