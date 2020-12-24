// pages/new_order/new_order.js
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unaccepted_order:[],
    all_order:[],
    navbar: ['待完成', '已完成'],
    currentTab: 0,
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_unaccepted_order();
    this.get_all_order()
  },
  get_unaccepted_order(){
    wx.request({
      url: getApp().globalData.server + '/get_unaccepted_order',
      success:(res)=>{
        console.log(res.data)
        this.setData({
          unaccepted_order:res.data
        })
      }
    })
  },
  goto_order:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    console.log(index)
    wx.navigateTo({ //跳转到订单详情
      url: '/pages/order_info/order_info?oid='+this.data.unaccepted_order[index][0]+'&business=1'
    })
  },
  goto_order2:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    console.log(index)
    wx.navigateTo({ //跳转到订单详情
      url: '/pages/order_info/order_info?oid='+this.data.all_order[index][0]+'&business=1'
    })
  },
  get_all_order(){
    wx.request({
      url: getApp().globalData.server + '/get_all_order',
      success:(res)=>{
        this.setData({
          all_order:res.data
        })
      }
    })
  },

  accept_order:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.request({
      url: getApp().globalData.server + '/accept_order',
      data:{
        oid:this.data.unaccepted_order[index][0]
      },
      method:'POST',
      success:(res)=>{
        if(res.data=='succeed'){
          wx.showToast({
            title: '已派单',
            icon:"none"
          })
          this.onLoad();
      }
      }
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
    var that = this;
    interval = setInterval(function() {
      that.get_unaccepted_order()
      that.get_all_order()
      console.log("10 secs")
    }, 10000)
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
    clearInterval(interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(interval)
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