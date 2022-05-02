// pages/collect/index.js
import { http } from '../../request/http'

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
  async onShow(){
    const userInfo = wx.getStorageSync('userInfo');
    const collectList = await http({
      url: `/collect/${userInfo.userId}`
    })
    console.log(collectList);
    let collect = wx.getStorageSync("collect") || [];
    console.log(collect);
    this.setData({
      collect: collectList
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