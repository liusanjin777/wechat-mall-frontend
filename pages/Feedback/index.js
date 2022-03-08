// pages/feedback/index.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        isActive:true
      },
      {
        id:1,
        value:'投诉',
        isActive:false
      }
    ],
    imgAdress:[],
    textValue:""
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
  handleImgAdress(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        // console.log(result.tempFilePaths)
        this.setData({
          imgAdress:[...this.data.imgAdress,result.tempFilePaths]
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  handleDeleteImg(e){
    let {imgAdress} = this.data
    console.log(e);
    const {index} = e.currentTarget.dataset
    imgAdress.splice(index,1)
    this.setData({
      imgAdress
    })
  },
  handleTextValue(e){
    const {value} = e.detail
    this.setData({
      textValue:value
    })
  },
  handleSubmit(){
    let {textValue} = this.data
    if(!textValue.trim()) {
      wx.showToast({
        title: '请重新输入',
        icon: 'none',
        mask: true,
      });
      return
    }
    wx.showToast({
      title: '表面是上传成功',
      icon: 'sucess',
      image: '',
      duration: 1500,
      mask: true,
      
    });
    
  }
})