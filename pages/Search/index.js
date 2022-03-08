import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    goods:[],
    isBtn:false,
    inputValue:"",
  },
  Timeid:-1,
  handleInput(e){
    const {value} = e.detail
    clearTimeout(this.Timeid)
    if(!value.trim()) {
      this.setData({
        goods:[],
        isBtn:false
      })
      return
    }
    this.setData({
      isBtn:true
    })
    
    this.Timeid = setTimeout(()=>{
      this.getSearchList(value)
    },1000)
   
  },
  async getSearchList(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      goods:res
    })
  },
  handleBtn(){
    clearTimeout(this.Timeid)
    this.setData({
      inputValue:'',
      isBtn:false,
      goods:[]
    })
  }
  
})