import {request} from '../../request/index'
import {requestPayment} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart");
    // const allCheck = cart.length ? cart.every(v => v.checked) : false;   与forEach重复，可以优化
    cart = cart.filter(v => v.checked)
    let totalPrice = 0;
    let totalNum = 0;
    
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }
    }); 
    this.setData({
      totalPrice,totalNum,cart,address
    })
  },
async  handlePay(){
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/Auth/index',

      });
      return ;
    }
    //1 请求头设置
    const header = {Authorization:token}
    //2 请求体设置
    const order_price=this.data.totalPrice
    const consignee_addr=this.data.address.all
    let goods=[]
    const {cart} = this.data
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price,
    }))
    const orderParams={order_price,consignee_addr,goods};
    const {order_number}=await request({url:"/my/orders/create",method:"post",data:orderParams,header})
    console.log(order_number);
    const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"post",data:{order_number},header})
    await requestPayment({pay})
    
  }
})