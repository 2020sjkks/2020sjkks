Page({
  data:{
    selected:{},
    goods:[],
    id:'',
    totalprice:0.0
  },
  onLoad:function(options){
    this.setData({
      selected:JSON.parse(options.shop),
      goods:JSON.parse(options.goods)
    });
    //console.log(this.data.goods);
    var selectedgoods=[];
    var totalprice=0.0;
    while(this.data.goods.length!=0){
      var item =this.data.goods.pop();
      if(this.data.selected[item[0]]!=0){
        selectedgoods.push(item);
        totalprice=totalprice+this.data.selected[item[0]]*item[3]; //计算总价格
      }
      //console.log(totalprice);
    }
    this.setData({
        goods:selectedgoods.reverse(),
        totalprice:totalprice
    });
  },
  pay:function(){
    var uid=getApp().globalData.uid;
    console.log(uid);
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
        uid:uid,
        goods:this.data.selected,  //菜品信息
        totalprice:this.data.totalprice
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