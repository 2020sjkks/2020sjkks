// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:null,
    order_data:[],
    _data:[{oid:1,uid:2,accept:1,price:20,date:'2020 0627 1642'},
            {oid:1,uid:2,accept:1,price:20,date:'2020 0627 1642'},
            {oid:1,uid:2,accept:1,price:20,date:'2020 0627 1642'},
            {oid:1,uid:2,accept:1,price:20,date:'2020 0627 1642'},]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp()
    this.setData({
      uid:app.globalData.uid
    })
    this.get_user_order()
  },
  get_user_order:function(){
    wx.request({
      url: getApp().globalData.server + '/get_user_order',
      data: {
        uid:this.data.uid
      },
      method:"POST",
      success:(res)=>{
        console.log(res.data)
        this.setData({
          order_data:res.data
        })
      }
    })
  },
  goto_order:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({ //跳转到订单详情
      url: '/pages/order_info/order_info?oid='+this.data.order_data[index][0]
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
    this.onLoad()
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