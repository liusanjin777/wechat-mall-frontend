  import {request} from '../../request/http'
Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  onLoad: function(options) {
   this.getswiperlist();
   this.getcateslist();
   this.getfloorist();

  },
  async getswiperlist(){
    const res = await request({
      url:'/home/swiperdata'
    });
    this.setData({
      swiperList:res
  });
  },
  async getcateslist(){
    const res = await request({
      url:'/home/catitems'
    })
    this.setData({
      catesList:res
    });
  },
  async getfloorist(){
    const res = await request({
      url:'/home/floordata'
    });
    this.setData({
      floorList:res
  });
  },

})