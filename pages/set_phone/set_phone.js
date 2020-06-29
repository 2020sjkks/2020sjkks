// pages/set_phone/set_phone.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uphone:null,
    uid:null,
    input:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp(); 
    this.setData({
      uphone:app.globalData.uphone,
      uid:app.globalData.uid,
    })
  },
  setphone:function(){
    var app=getApp(); 
    let input = this.data.input
    let uid = this.data.uid
    console.log(input)
    wx.request({
      url: 'http://brucemarkdown.top:5000/setphone',
      data: {
        input:input,
        uid:uid
      },
      method:"POST",
      success: (res) => {
        if(res.data=='succeed'){
          wx: wx.showToast({
            title: '设置成功'
          })
          app.globalData.uphone=input
          this.setData({
            uphone:input,
            input:''
          })
        }
    }})
    console.log(app.globalData.uphone)
  },
  getinput(e){
    this.setData({
      input:e.detail.value
    })
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