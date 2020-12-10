// pages/courier/courier.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo:[],
    myorderinfo:[],
    navbar: ['待接单', '我的接单'],
    currentTab: 0,
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.server + '/get_uncouried_order',
      success:(res)=>{
        this.setData({
          orderinfo:res.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.server + '/get_my_package',
      data:{
        uid:getApp().globalData.uid,
      },
      method:'POST',
      success:(res)=>{
        this.setData({
          myorderinfo:res.data
        })
        console.log(this.data.myorderinfo)
      }
    })
  },
  end_game:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.request({
      url: getApp().globalData.server + '/end_game',
      method:'POST',
      data: {
        oid:this.data.myorderinfo[index][0],
      },
      success:(res)=>{
        if(res.data=='succeed'){
          wx.showModal({
            title:'已送达！',
            content:"谢谢你的劳动",
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
    })
  },

  be_a_courier:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    console.log(getApp().globalData.uphone);
    wx.request({
      url: getApp().globalData.server + '/be_a_courier',
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

  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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