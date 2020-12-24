Page({
  data: {
    // 数据源
    goods:[//0:gid,1:gname,2:gphoto,3,gprice
    ],
    sales:[],
    random:'',
    url:getApp().globalData.server,
  },
  onLoad:function(options){ 
    this.getGoods();
    this.get_sales();
    this.setData({
      random:Math.random() / 9999
    })
    //console.log(this.data.goods);
  },
  getGoods:function(){ //获取菜品信息
    console.log("tap");
    wx.request({
      url: getApp().globalData.server + '/goods',
      method:'POST',
      complete: (res) => {
        //console.log(res);
        this.setData({
          goods:res["data"]
        })},
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
  newGood:function(){
    wx.navigateTo({
      url: '/pages/business_good_edit/business_good_edit',
    })
  },
  editGood:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    //console.log(this.data.goods[index][0]);
    wx.navigateTo({
      url: '/pages/business_good_edit/business_good_edit?good_id='+this.data.goods[index][0],
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
      url: getApp().globalData.server + '/delete_good',
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
