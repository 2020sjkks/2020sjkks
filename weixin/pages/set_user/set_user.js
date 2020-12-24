// pages/set_user/set_user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:null,
    uname:null,
    upassword:null,
    input_ori_password:'',
    input_new_password:'',
    input_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp(); 
    this.setData({
      uid:app.globalData.uid,
      uname:app.globalData.uname,
      upassword:app.globalData.upassword,
    })
  },
  get_input_name(e){
    this.setData({
      input_name:e.detail.value
    })
  },
  get_input_ori_password(e){
    this.setData({
      input_ori_password:e.detail.value
    })
  },
  get_input_new_password(e){
    this.setData({
      input_new_password:e.detail.value
    })
  },
  set_name(){
    let input_name=this.data.input_name
    let uid=this.data.uid
    if (input_name == '') {
      wx: wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return false
    }
    else if(input_name=='管理员'){
      wx: wx.showToast({
        title: '用户名已存在',
        icon:'none'
      })
      this.setData({
        input_name:''
      })
      return false
    }
    else{
      wx.request({
        url: getApp().globalData.server + '/set_user_name',
        data: {
          input_name:input_name,
          uid:uid
        },
        method:"POST",
        success: (res) => {
          if(res.data=='succeed'){
            wx: wx.showToast({
              title: '修改成功',
              icon:'none'
            })
            this.setData({
              uname:input_name,
              input_name:''
            })
            var app=getApp()
            app.globalData.uname=input_name
          }
          else if (res.data='exist'){
            wx: wx.showToast({
              title: '用户名已存在',
              icon:'none'
            })
            this.setData({
              input_name:''
            })
            return false
          }
          else if(res.data=='fali'){
            wx: wx.showToast({
              title: '修改失败',
              icon:'none'
            })
            this.setData({
              input_name:''
            })
            return false
          }
          }
        })
      }
    },
  set_password(){
    let input_ori_password=this.data.input_ori_password
    let input_new_password=this.data.input_new_password
    let uid=this.data.uid
    var app=getApp()
    if(app.globalData.upassword!=input_ori_password){
      wx: wx.showToast({
        title: '原密码错误',
        icon:'none'
      })
    }
    else{
      if(input_new_password==''){
        wx: wx.showToast({
          title: '请输入新密码',
          icon:'none'
        })
      }
      else{
        wx.request({
          url: getApp().globalData.server + '/set_user_password',
          data: {
            input_new_password:input_new_password,
            uid:uid
          },
          method:"POST",
          success: (res) => {
            if(res.data=='succeed'){
              wx: wx.showToast({
                title: '修改成功',
                icon:'none'
              })
              this.setData({
                input_ori_password:'',
                input_new_password:''
              })
              var app=getApp()
              app.globalData.upassword=input_new_password
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})