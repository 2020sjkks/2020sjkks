Page({
  data: {
    // 数据源
    goods:[
    ]
  },
  onLoad:function(options){
    this.getGoods();
  },
  getGoods:function(){
    console.log("tap");
    wx.request({
      url: 'http://brucemarkdown.top:5000/goods',
      method:'POST',
      complete: (res) => {
        //console.log(res);
        this.setData({
          goods:res["data"],
        })
      },
    })
  },
  get_good_info:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '/pages/good_info/good_info?good_detail='+this.data.goods[index][2]+
      '&good_id='+index+'&img='+this.data.goods[index][3]
    })
  }

})
