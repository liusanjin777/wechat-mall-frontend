import {http} from '../../request/http'
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
    http({url:'/categories'}).then(res=>{
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