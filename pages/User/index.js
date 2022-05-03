// pages/user/index.js
import { http } from '../../request/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectNum:0
  },
  async onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = await http({
      url: `/collect/${userInfo.userId}`
    })
    wx.setStorageSync('collect', collect)
    this.setData({
      userinfo:userInfo,
      collectNum: collect.length
    })
  },
})