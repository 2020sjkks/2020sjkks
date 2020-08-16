// pages/courier/courier.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://brucemarkdown.top:5000/get_uncouried_order',
      success:(res)=>{
        this.setData({
          orderinfo:res.data
        })
      }
    })
  },
  be_a_courier:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    console.log(getApp().globalData.uphone);
    wx.request({
      url: 'http://brucemarkdown.top:5000/be_a_courier',
      method:'POST',
      data: {
        uid:getApp().globalData.uid,
        oid:this.data.orderinfo[index][0],
        phone:getApp().globalData.uphone,
      },
      success:(res)=>{
        if(res.data=='succeed'){
          wx.showModal({
            title:'接单成功',
            content:"请保证外卖送到指定地点",
            showCancel:false
          })
          this.onLoad();
        }
        else{
          wx.showToast({
            title: '接单失败！',
            icon:'none'
          })
        }
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
    this.onLoad();
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