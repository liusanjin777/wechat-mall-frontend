  import {request} from '../../request/http';
  import {showModal, showToast} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:[],
    allCheck:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    let address = wx.getStorageSync("address") || [];
    const cart = wx.getStorageSync("cart") || [];
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
    // const allCheck = cart.length ? cart.every(v => v.checked) : false;   与forEach重复，可以优化
    this.setData({
      address
    })
    
    this.setCart(cart)
  },
  handleReceiveAddress(){
    wx.chooseAddress({
      success: (result)=>{
        wx.setStorageSync("address", result);
      },
    });
  },
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked
    this.setCart(cart)
  },
  setCart(cart){
    
    let totalPrice = 0;
    let totalNum = 0;
    let allCheck=true;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }else {
        allCheck = false
      }
    });
    allCheck = cart.length !=0 ? allCheck : false 
    this.setData({
      totalPrice,allCheck,totalNum,cart
    })
    wx.setStorageSync("cart", cart);
  },
  handleAllCheck(){
    let {cart,allCheck} = this.data
    allCheck = !allCheck
    cart.forEach(v => v.checked = allCheck);
    this.setCart(cart)
  },
async  handleSub(e){
    const {id,operation} = e.currentTarget.dataset
    c
    const {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num === 1 && operation=== -1) {
      const result = await showModal({content:"您是否要删除"}) 
      if(result.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else {
      cart[index].num+=operation
      this.setCart(cart)
    }
    
  },
async  handlePay(){
    try {
      const {address,cart} = this.data
      if(!address.userName) {
        await showToast({title:"您还没有选择收货地址"})
        return
      }else if( cart.length===0) {
        await showToast({title:'您还未选购商品'})
      }else {
        wx.navigateTo({
          url: '/pages/Pay/index'
        });
      }
    } catch (error) {
      console.log(error);
    }
    
  }
})