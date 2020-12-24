// pages/comment/comment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gid:null,
    oid:null,
    comment:null,
    input:null,
    score:null,
    oriscore:null,
    stars:[
      {
        flag:1,
        bgImg: getApp().globalData.server+'/image/star1.jpg',
        bgfImg:getApp().globalData.server+'/image/star2.jpg'
      },
      {
        flag: 1,
        bgImg: getApp().globalData.server+'/image/star1.jpg',
        bgfImg: getApp().globalData.server+'/image/star2.jpg'
      },
      {
        flag: 1,
        bgImg:getApp().globalData.server+'/image/star1.jpg',
        bgfImg: getApp().globalData.server+'/image/star2.jpg'
      },
      {
        flag: 1,
        bgImg: getApp().globalData.server+'/image/star1.jpg',
        bgfImg: getApp().globalData.server+'/image/star2.jpg'
      },
      {
        flag: 1,
        bgImg:getApp().globalData.server+'/image/star1.jpg',
        bgfImg: getApp().globalData.server+'/image/star2.jpg'
      }
    ]
  },
  score:function(e){
    var that=this;
    for(var i=0;i<that.data.stars.length;i++){
      var allItem = 'stars['+i+'].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index=e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      score:index+1
    })
    console.log(this.data.score)
    for(var i=0;i<=index;i++){
      var item = 'stars['+i+'].flag';
      that.setData({
        [item]:2
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid:options.gid,
      oid:options.oid
      //oid:105,
      //gid:1
    })
    this.get_comment()
    console.log(this.data.stars)
  },
  get_comment(){
    wx.request({
      url: getApp().globalData.server + '/get_comment',
      data:{
        gid:this.data.gid,
        oid:this.data.oid
      },
      method:'POST',
      success:(res)=>{
        this.setData({
          comment:res.data[0][1],
          oriscore:res.data[0][0]
        })
      }
    })
  },

  setcomment(){
    let input = this.data.input
    let score=this.data.score
    wx.request({
      url: getApp().globalData.server + '/set_comment',
      data:{
        input:this.data.input,
        score:this.data.score,
        oid:this.data.oid,
        gid:this.data.gid
      },
      method:'POST',
      success:(res)=>{
        if(res.data=='succeed'){
          wx: wx.showToast({
            title: '设置成功'
          })
          this.get_comment()
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