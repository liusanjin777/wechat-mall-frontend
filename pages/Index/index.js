  import {request} from '../../request/index'
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
  getswiperlist(){
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      this.setData({
        swiperList:res
    });
  })
  },
  getcateslist(){
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
        
    //     this.setData({
          
    //       catesList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    request({
      url:'/home/catitems'
    }).then(res=>{
      this.setData({
        catesList:res
    });
  })
  },
  getfloorist(){
    // var reqTask = wx.request({
    //   url: '/home/floordata',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
        
    //     this.setData({
          
    //       floorList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    request({
      url:'/home/floordata'
    }).then(res=>{
      this.setData({
        floorList:res
    });
  })
  },

})