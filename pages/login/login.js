// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    password:null
  },
  login:function(){
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  //注册
  register:function(){
    wx.request({
      url: 'http://brucemarkdown.top:5000/register',
      data: {
        name:this.data.name,
        password:this.data.password
      },
      method:"POST",
      success: (res) => {
        console.log(res)
        //wx.switchTab({
        //  url: '/pages/index/index',
        //})
      }
    })
  },
  //获取用户名
  getUsername:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  //获取密码
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})