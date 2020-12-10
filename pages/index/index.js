Page({
  data: {
    // 数据源
    goods:[//0:gid,1:gname,2:gphoto,3,gprice
    ],
    sales:[],
    shopping_cart:{     //购物车商品 {菜品Aid:数量,菜品Bid:数量...}
    },
    best:[],
    random:'',
    swiperIdx: 0,
    url:getApp().globalData.server,
  },
  onLoad:function(options){ 
    this.setData({
      random:Math.random() / 9999
    })
    this.getGoods();
    this.get_sales();
  },
  getGoods:function(){ //获取菜品信息
    console.log("tap");
    wx.request({
      url: getApp().globalData.server + '/goods',
      method:'POST',
      complete: (res) => {
        //console.log(res);
        this.setData({
          goods:res.data
        })
        //创建选菜单表
        for (var item of res.data) { //获取热门推荐
          //console.log(item);
          this.setData(
            {
              ['shopping_cart.'+item[0]]:0,
            })
            wx.request({
              url: getApp().globalData.server + '/get_best_good',
              method:'POST',
              success:(res1)=>{
                var best=[]
                if(res1.data.state=='succeed'){
                  for(var index in res1.data.data){
                    for(var i in res.data){
                      if(res.data[i][0]==res1.data.data[index][0])
                        best.push(i);
                        //console.log(best);
                    }
                  }
                  this.setData({
                    best:best
                  })
                //console.log(this.data.best)
                }
              }
            })
        }},
    })
  },
  get_sales:function(){
    wx.request({
      url: getApp().globalData.server + '/sales',
      success:(res)=>{
        this.setData({
          sales:res.data
        });
        console.log(res.data);
        if(res.data==null)this.setData({sales:0});
      }
    })
  },
  
  get_good_info:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({  //提交参数到商品明细页：商品id
      url: '/pages/good_info/good_info?good_id='+this.data.goods[index][0]+'&sales='+this.data.sales[index]
    })
  },
  bindchange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },
  add_good:function(e){  //菜品添加到购物车
    var id=parseInt(e.currentTarget.dataset.index);
    var num=1;
    if(this.data.shopping_cart[id]!=undefined){
        num=this.data.shopping_cart[id]+1;
    }
    this.setData({
      ['shopping_cart.'+id]:num, //修改购物车中商品的数量
    });
  },
  minus_good:function(e){  //购物车删除菜品
    var id=parseInt(e.currentTarget.dataset.index);
    var num=0;
    if(this.data.shopping_cart[id]!=undefined&&this.data.shopping_cart[id]!=0){
        num=this.data.shopping_cart[id]-1;
    }
    this.setData({
      ['shopping_cart.'+id]:num, //修改购物车中商品的数量
    });
    //console.log(this.data.shopping_cart);
  },
  goto_shooping_cart:function(){
    console.log(this.data.goods)
    //console.log(this.data.shopping_cart);
    var selected=0;
    for(let i in this.data.goods){ //检查是否有选择菜品
      if(this.data.shopping_cart[this.data.goods[i][0]]!=0)selected=1;
    }
    if(selected==1)
      wx.navigateTo({ //字符串化选菜信息，传送到购物车页面
        url: '/pages/shoppingcart/shoppingcart?shop='+JSON.stringify(this.data.shopping_cart)
        +"&goods="+JSON.stringify(this.data.goods),
      })
    else wx.showToast({
      title: '请先选择菜品',
      icon:'none'
    })
  },
  onShow:function(){
  }
})
