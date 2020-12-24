Page({
  data:{
    selected:{},
    goods:[],
    id:'',
    totalprice:'',
    address:'', 
    phone:'',
    buttonDisable:false,
    buttonContent:"支付",
    buttonFunction:'pay',
    url:getApp().globalData.server,
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
        totalprice:totalprice,
        buttonContent:this.data.buttonContent+totalprice.toString()+'元' ,
        address:getApp().globalData.uaddress,
        phone:getApp().globalData.uphone,
    });
  },
  editPhone:function(){
    wx.navigateTo({
      url: '/pages/set_phone/set_phone',
    });
  },
  editAddress:function(){
    wx.navigateTo({
      url: '/pages/set_address/set_address',
    });
  },
  pay:function(){
    this.setData({
      buttonDisable:true
    });
    var uid=getApp().globalData.uid;
    console.log(uid);
    wx.showLoading({
      title: '正在下单',
    });
    //此处提交request
    wx.request({
      url: getApp().globalData.server + '/order',
      data: { 
        uid:uid,
        goods:this.data.selected,  //菜品信息
        totalprice:this.data.totalprice,
        phone:this.data.phone,
        address:this.data.address
      },
      method:"POST",
      success: (res) => {
          console.log(res);
          if(res.data.result=='succeed'){
            this.setData({
              buttonContent:'查看订单',
              totalprice:""
            })
            wx.showToast({
              title: '支付成功,订单号为'+res.data.id,
              icon:"none"
            });
          this.setData({
            id:res.data.id,  //成功返回订单id
            buttonDisable:false,
            buttonFunction:'goto_Order'
          });
          console.log(this.data.id);
          var pages = getCurrentPages()                //获取加载的页面( 页面栈 )
      　　 //var currentPage = pages[pages.length - 1]  // 获取当前页面
      　　 var prevPage = pages[pages.length - 2]       //获取上一个页面
      　　 prevPage.onLoad();
        }
        else if(res.data.result=='wrong'){
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '请检查地址和电话号码',
            icon:"none"
          });
          this.setData({
            buttonDisable:false
          });
        }
        else {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '网络错误',
            icon:"none"
          });
          this.setData({
            buttonDisable:false
          });
        }
      }
    })
  },
  goto_Order:function(){
    wx.navigateTo({ //跳转到订单详情
      url: '/pages/order_info/order_info?oid='+this.data.id
    })
  },
  onShow(){
    this.setData({
      address:getApp().globalData.uaddress,
      phone:getApp().globalData.uphone,
    })
  }
})