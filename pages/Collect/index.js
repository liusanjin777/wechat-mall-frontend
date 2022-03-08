// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false
      },
      {
        id:3,
        value:'我的足迹',
        isActive:false
      }
    ],
    collect:[]
  },
  onShow(){
    let collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  },
  handleChangeTabsItem(e){
    const {index} = e.detail
    let {tabs} =this.data
    tabs.forEach((v,i)=>{
      return i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  }
})