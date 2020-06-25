Page({
  data: {
    // 数据源
    goods:[
    ],
    shopping_cart:{ //购物车商品 {菜品Aid:数量,菜品Bid:数量...}

    }
  },
  onLoad:function(options){ 
    this.getGoods();
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
        })
        //创建选菜单表
        for (var item of res['data']) {
          console.log(item);
          this.setData(
            {
              ['shopping_cart.'+item[0]]:0,
            })
        }console.log(this.data.shopping_cart);
      },
    })
  },
  get_good_info:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({  //提交参数到商品明细页：商品id、商品图片名称、商品介绍
      url: '/pages/good_info/good_info?good_detail='+this.data.goods[index][2]+
      '&good_id='+index+'&img='+this.data.goods[index][3]
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
    console.log(this.data.shopping_cart);
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
    console.log(this.data.shopping_cart);
  },
  goto_shooping_cart:function(){
    wx.navigateTo({ //字符串化选菜信息，传送到购物车页面
      url: '/pages/shoppingcart/shoppingcart?shop='+JSON.stringify(this.data.shopping_cart),
    })
  }
})
