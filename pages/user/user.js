// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid:null,
    uname:null,
    uphoto:null,
    uaddress:null,
    upassword:null,
    uphone:null,
    img_src:null,
    random:'',
  },

  changeAvatar:function(){
    var that = this 
    const id=that.data.uid
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePath = res.tempFilePaths[0];
        wx.uploadFile({
           url: getApp().globalData.server + '/upload_user_photo',
           filePath: tempFilePath,
           name: 'file',
           formData: {
             uid:id
           },
           success(res) {
             if(res.data='succeed'){
              wx: wx.showToast({
                title: '修改成功',
                icon:'none'
              })
              that.onLoad()
             }
           }
         })   
      }
    })
  },

  noimage:function(e){
    this.setData({
      img_src:'/imgs/head.jpg'
    })
  },
  
  exit:function(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  set_address(){
    wx.navigateTo({
      url: '/pages/set_address/set_address',
    })
    
  },
  set_phone(){
    wx.navigateTo({
      url: '/pages/set_phone/set_phone',
    })
  },
  set_user(){
    wx.navigateTo({
      url: '/pages/set_user/set_user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp(); 
    this.setData({
      random:Math.random() / 9999
    })
    this.setData({
      uid:app.globalData.uid,
      uname:app.globalData.uname,
      uphoto:app.globalData.uphoto,
      uaddress:app.globalData.uaddress,
      upassword:app.globalData.upassword,
      uphone:app.globalData.uphone,
      img_src:getApp().globalData.server + '/image/u'+app.globalData.uid+'.jpg'+'?'+this.data.random,
    })
    console.log(this.data.img_src)
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