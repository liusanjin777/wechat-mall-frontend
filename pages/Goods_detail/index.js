import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      let page =  getCurrentPages();
      let currentpage = page[page.length - 1]
      const {goods_id} =currentpage.options
      this.getGoodsDtailList(goods_id)
    
  },
  async getGoodsDtailList(goods_id) {
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo=goodsObj
    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id) 
    
    this.setData({
      goodsObj:{
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics : goodsObj.pics
      },
      isCollect
    })
  },
  handlePerviewImage(e){
    const current=e.currentTarget.dataset.url
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })

  },
  handleCartAdd(){
    let cart= wx.getStorageSync("cart") || [];
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1) {
      this.GoodsInfo.checked=true;
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo)
    }else {
      cart[index].num++
    }
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '加入成功',
      mask: true,
      
    });
  },
  handleCollect(){
  let isCollect =false
  let collect=  wx.getStorageSync("collect") || [];
  let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
  console.log(this.GoodsInfo);
  if(index !== -1) {
    collect.splice(index,1)
    isCollect =false
    wx.showToast({
      title: '取消成功',
      icon:"success",
      mask: true,
      
    });
  }else {
    collect.push(this.GoodsInfo)
    isCollect =true
    wx.showToast({
      title: '收藏成功成功',
      icon:"success",
      mask: true,
    });
  }
  wx.setStorageSync("collect", collect);
  this.setData({
    isCollect
  })
  }
  
})