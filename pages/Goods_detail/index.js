import {request} from '../../request/index'
import { http } from '../../request/http'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false,
    collect: []
  },
  GoodsInfo:{
    
  },
  isCollect: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      let page =  getCurrentPages();
      let currentpage = page[page.length - 1]
      const {goods_id} =currentpage.options
      this.getGoodsDtailList(goods_id);
      this.handleIsCollect(goods_id)

  },
  async handleIsCollect(goods_id) {
    const userInfo = wx.getStorageSync("userInfo");
    const res =  await http({
      url: '/collect',
      method: 'get',
      data: {
        goods_id,
        userId: userInfo.userId
      }
    });
    this.isCollect = res;
    this.setData({
      isCollect: res
    });
  },
  async getGoodsDtailList(goods_id) {
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj:{
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics : goodsObj.pics
      }
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
  async handleCollect(){
  const userInfo = wx.getStorageSync("userInfo");
  if( this.isCollect ) {
    this.isCollect =false
    await http({
      url: '/collect/cancel',
      method: 'delete',
      data: {
        goods_id: this.GoodsInfo.goods_id,
        userId: userInfo.userId
      }
    })
    wx.showToast({
      title: '取消成功',
      icon:"success",
      mask: true,
      
    });
  }else {
    this.isCollect =true
    await http({
      url: '/collect/add',
      method: 'post',
      data: {
        goods_id: this.GoodsInfo.goods_id,
        userId: userInfo.userId
      }
    })
    wx.showToast({
      title: '收藏成功',
      icon:"success",
      mask: true,
    });
  }
  this.setData({
    isCollect: this.isCollect
  })
  }
  
})