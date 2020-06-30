Page({
  data:{
    good_id:null,
    good_name:'商品名称',
    good_detail:'商品详情',
    good_price:'0.0',
    img_path:'',
  },
  con:function(){
    console.log(this.data.good_id)
  },
  onLoad:function(options){
    if(options.good_id==undefined){
      console.log("创建商品");
    }
    else{
      this.setData({
        good_id:options.good_id,
        //img_path:"http://brucemarkdown.top:5000/image/"+options.img+'.jpg'
      });
      this.get_goodinfo();
      console.log("编辑商品")
    }
  },
  get_goodinfo(){
    wx.request({
      url: 'http://brucemarkdown.top:5000/goodinfo',
      method:'POST',
      data: {
        good_id:this.data.good_id,
      },
      success: (res)=>{
        console.log(res.data);
        this.setData({
          good_name:res.data.info[0][1],
          good_detail:res.data.info[0][2],
          good_price:res.data.info[0][4],
          img_path:"http://brucemarkdown.top:5000/image/"+res.data.info[0][3]+'.jpg',
        })
      }
  })
  },
  finish:function(){ //完成修改

  }
})
