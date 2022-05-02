import { http } from '../../request/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.login({
      success (code) {
        console.log(code.code);
        http({
          url: '/users/login',
          method: 'post',
          data: {
            code: code.code
          }
        }).then(res => {
          userInfo.userId = res.userId
          wx.setStorageSync("userInfo", userInfo);
        })
      }
    })
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})