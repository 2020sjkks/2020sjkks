Page({
  data:{
    selected:{},
    goods:[],
    id:''
  },
  onLoad:function(options){
    this.setData({
      selected:JSON.parse(options.shop),
      goods:JSON.parse(options.goods)
    });
    //this.data.goods.slice();
    var selectedgoods=[];
    while(this.data.goods.length!=0){
      var item =this.data.goods.pop();
      if(this.data.selected[item[0]]!=0){
        selectedgoods.push(item);
      }
    }
    this.setData({
        goods:selectedgoods.reverse()
    });
  },
  pay:function(){
    wx.showLoading({
      title: '正在下单',
    });
    setTimeout(function () {
      wx.hideLoading();
      }, 2000);
    //此处提交request
    wx.request({
      url: 'http://brucemarkdown.top:5000/order',
      data: {
        goods:this.data.selected  //菜品信息
      },
      method:"POST",
      success: (res) => {
        console.log(res);
        if(res.data.result=='succeed'){
          wx.showToast({
            title: '下单成功',
            icon:"none"
          });
        this.setData({
          id:res.data.id  //成功返回订单id
        });
        console.log(this.data.id);
        }
        else {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '下单失败',
            icon:"none"
          })
        }
      }
    })
    
  }
})