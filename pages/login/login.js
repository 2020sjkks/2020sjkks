// pages/login/index.js！！！！！！！
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:''
  },
  login:function(){
    let name = this.data.name
    let password = this.data.password
    if (name == '') {
      wx: wx.showToast({
        title: '请输入姓名'
      })
      return false
    }
    else if ( password== '') {
      wx: wx.showToast({
        title: '请输入密码'
      })
      return false
    }
    else{
      wx.request({
      url: 'http://brucemarkdown.top:5000/login',
      data: {
        name:name,
        password:password
      },
      method:"POST",
      success: (res) => {
        console.log(res.data['state'])
        if(res.data['state']=='not_exist'){
          wx: wx.showToast({
            title: '用户不存在'
          })
          return false
        }
        else if(res.data['state']=='fail'){
          wx: wx.showToast({
            title: '密码不正确'
          })
          return false
        }
        else if(res.data['state']='succeed'){
          var app=getApp(); 
          app.globalData.uid=res.data['user_info'][0] 
          app.globalData.uname=res.data['user_info'][1] 
          app.globalData.upassword=res.data['user_info'][4] 
          wx.switchTab({
            url: "/pages/index/index",
          })
        }
      }
    })
  }
  },
  //注册
  register:function(){
    let name = this.data.name
    let password = this.data.password
    if (name == '') {
      wx: wx.showToast({
        title: '请输入姓名'
      })
      return false
    }
    else if ( password== '') {
      wx: wx.showToast({
        title: '请输入密码'
      })
      return false
    }
    else{
      wx.request({
      url: 'http://brucemarkdown.top:5000/register',
      data: {
        name:this.data.name,
        password:this.data.password
      },
      method:"POST",
      success: (res) => {
        console.log(res.data)
        if(res.data=='succeed'){
          wx: wx.showToast({
            title: '成功请登录'
          })
          return false
        }
        else if(res.data=='exist'){
          wx: wx.showToast({
            title: '用户名存在'
          })
          this.setData({
            name:'',
            password:'',
          })
          return false
        }
      }
    })}
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