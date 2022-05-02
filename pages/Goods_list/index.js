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
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'最新',
        isActive:false
      },
      {
        id:2,
        value:'最热',
        isActive:false
      }
    ],
    goods_list:[]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid=options.cid || "";
    this.QueryParams.query=options.query || "";
    this.getGoodsList()
  },
  async getGoodsList(){
    const res= await request({url:'/goods/search',data:this.QueryParams})
    const total = res.total;
    this.totalPages =Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goods_list:[...this.data.goods_list,...res.goods]
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
  },
  onReachBottom(){
    if(this.totalPages<=this.QueryParams.pagenum) {
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }else {
      this.QueryParams.pagenum ++;
      this.getGoodsList()
    }
  }
 
})