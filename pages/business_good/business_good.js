Page({
  data: {
    // 数据源
    goods:[//0:gid,1:gname,2:gphoto,3,gprice
    ],

  },
  onLoad:function(options){ 
    this.getGoods();
    console.log(this.data.goods);
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
      url: '/pages/good_info/good_info?good_id='+this.data.goods[index][2]
    })
  },
  newGood:function(){
    wx.navigateTo({
      url: '/pages/buiness_good_edit/buiness_good_edit',
    })
  },
  editGood:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '/pages/buiness_good_edit/buiness_good_edit?good_id='+this.data.goods[index][2],
    })
  },
})
