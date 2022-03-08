/**
 * 
 * @param {object} params  
 */
export const showModal = ({content})=>{
    return new Promise ((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: content,
        success: (result) => {
          resolve(result)
        },
        fail: (err)=>{
          reject(err)
        },
      });
    })
}
export const showToast = ({title}) => {
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success: (result)=>{
        resolve(result)
      },
      fail: (result)=>{
        reject(result)
      },
      complete: ()=>{}
    });
  })
}
export const login = () => {
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}
export const requestPayment = ({pay}) => {
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}
