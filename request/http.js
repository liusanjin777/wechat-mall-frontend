let ajxaTimes=0;
export const request = (params)=>{
  ajxaTimes++;
  wx.showLoading({
    title: '加载中',
  })
  let header = {...params}
  // header["Authorization"] = wx.getStorageSync("token");
  const baseUrl="http://localhost:8888"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success:(res)=>{
        resolve(res.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajxaTimes--;
        if(ajxaTimes === 0) {
          wx.hideLoading()
        }
      }
    });
  })
}