import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  左侧数据
    leftList:[],
    // 右侧数据
    rightList:[],
    changecate:0
  },
  Cates: [],

  
  onLoad: function (options) {
   const Cates=wx.getStorageSync("cates");
   if(!Cates){
    this.getcategorylist();
   }else{
     if(Date.now()-Cates.time>300000){
      this.getcategorylist();
     }else{
        this.Cates = Cates.data;
        let leftList = this.Cates.map(x=>x.cat_name);
        let rightList = this.Cates[0].children
        this.setData({
          leftList,
          rightList
      })
     }
   }
  },
  getcategorylist(){
    // var reqTask = wx.request({
    //   // https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
    //   url: '/categories',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
    //     this.Cates = result.data.message;
    //     wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    //     let leftList = this.Cates.map(x=>x.cat_name);
    //     let rightList = this.Cates[0].children
    //     this.setData({
    //       leftList,
    //       rightList
    //     })
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    request({url:'/categories'}).then(res=>{
      this.Cates = res;
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      let leftList = this.Cates.map(x=>x.cat_name);
      let rightList = this.Cates[0].children
      this.setData({
        leftList,
        rightList
      })
    })
    
  },
  tapName(e){
    const {index} = e.currentTarget.dataset;
    let rightList = this.Cates[index].children
      this.setData({
      changecate:index,
      rightList
    });
  }
})