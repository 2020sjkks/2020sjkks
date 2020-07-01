Page({
  data: {
    // 数据源
    goods:[//0:gid,1:gname,2:gphoto,3,gprice
    ],

  },
  onLoad:function(options){ 
    this.getGoods();
    //console.log(this.data.goods);
  },
  getGoods:function(){ //获取菜品信息
    console.log("tap");
    wx.request({
      url: 'http://brucemarkdown.top:5000/goods',
      method:'POST',
      complete: (res) => {
        //console.log(res);
        this.setData({
          goods:res["data"]
        })},
    })
  },
  get_good_info:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({  //提交参数到商品明细页：商品id
      url: '/pages/good_info/good_info?good_id='+this.data.goods[index][0]
    })
  },
  newGood:function(){
    wx.navigateTo({
      url: '/pages/buiness_good_edit/buiness_good_edit',
    })
  },
  editGood:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    //console.log(this.data.goods[index][0]);
    wx.navigateTo({
      url: '/pages/buiness_good_edit/buiness_good_edit?good_id='+this.data.goods[index][0],
    })
  },
  askdelete:function(e){
    var that=this;
    var index=parseInt(e.currentTarget.dataset.index);
    wx.showModal({
      content: '是否要删除该菜品',
      success (res) {
        if (res.confirm) {
          that.deleteGood(index);
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  deleteGood(index){
    wx.request({
      url: 'http://brucemarkdown.top:5000/delete_good',
      method:'POST',
      data:{
        gid:this.data.goods[index][0]
      },
      complete: (res) => {
        if(res.data=='succeed'){
          wx.showToast({
            title: '删除成功',
          });
          this.onLoad();
        }
        else{
          wx.showToast({
            title: '删除失败',
            icon:"none"
          })
        }
      },
    })
  },
  onShow: function () {
    this.onLoad();
  },
})
