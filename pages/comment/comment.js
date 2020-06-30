// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:null,
    oid:null,
    comment:null,
    input:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid:options.gid,
      oid:options.oid
    })
    this.get_comment()
  },
  get_comment(){
    wx.request({
      url: 'http://brucemarkdown.top:5000/get_comment',
      data:{
        gid:this.data.gid,
        oid:this.data.oid
      },
      method:'POST',
      success:(res)=>{
        this.setData({
          comment:res.data
        })
      }
    })
  },

  setcomment(){
    let input = this.data.input
    wx.request({
      url: 'http://brucemarkdown.top:5000/set_comment',
      data:{
        input:this.data.input,
        oid:this.data.oid,
        gid:this.data.gid
      },
      method:'POST',
      success:(res)=>{
        if(res.data=='succeed'){
          wx: wx.showToast({
            title: '设置成功'
          })
          this.setData({
            comment:input,
            input:''
          })
        }
      }
  })
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