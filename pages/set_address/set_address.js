// pages/set_address/set_address.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uaddress:null,
    uid:null,
    input:''
  },
  getinput(e){
    this.setData({
      input:e.detail.value
    })
  },
  setaddress:function(){
    var app=getApp(); 
    let input = this.data.input
    let uid = this.data.uid
    console.log(input)
    wx.request({
      url: getApp().globalData.server + '/setaddress',
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
          app.globalData.uaddress=input
          this.setData({
            uaddress:input,
            input:''
          })
        }
    }})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp(); 
    this.setData({
      uaddress:app.globalData.uaddress,
      uid:app.globalData.uid,
    })
  },

   //移动选点
 onChangeAddress: function () {
  var _page = this;
  wx.chooseLocation({
   success: function (res) {
    _page.setData({
     input: res.name
    });
   },
   fail: function (err) {
    console.log(err)
   }
  });
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