import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'待发货',
        isActive:false
      },
      {
        id:3,
        value:'退款/退货',
        isActive:false
      }
    ],
    orders:[]
  },
  onShow(){
    const token = wx.getStorageSync("token");
    console.log(token);
    if(!token) {
      wx.navigateTo({
        url: '/pages/Auth/index',
      });
      return
    }
    let page =  getCurrentPages();
    let currentPage = page[page.length-1]
    let {type} =currentPage.options
    this.getOrder(type)
    this.handeTabAndId(type-1)
    
  },
async getOrder(type){
    const {orders} = await request({url:"/my/orders/all",data:{type}})
    this.setData({
      orders:orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  handeTabAndId(index){
    let {tabs} =this.data
    tabs.forEach((v,i)=>{
      return i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  handleChangeTabsItem(e){
    const {index} = e.detail
    this.handeTabAndId(index)
    this.getOrder(index+1)
  },

})