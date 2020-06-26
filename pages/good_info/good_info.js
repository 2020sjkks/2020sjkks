Page({
  data:{
    good_id:null,
    good_name:null,
    good_detail:null,
    good_price:null,
    img_path:null,
    comment:null
  },
  con:function(){
    console.log(this.data.good_id)
  },
  onLoad:function(options){
    this.setData({
      good_id:options.good_id,
      //img_path:"http://brucemarkdown.top:5000/image/"+options.img+'.jpg'
    });
    this.get_goodinfo()
  },
  get_goodinfo(){
    wx.request({
      url: 'http://brucemarkdown.top:5000/goodinfo',
      method:'POST',
      data: {
        good_id:this.data.good_id,
      },
      success: (res)=>{
        this.setData({
          good_name:res.data.info[0][1],
          good_detail:res.data.info[0][2],
          good_price:res.data.info[0][4],
          img_path:"http://brucemarkdown.top:5000/image/"+res.data.info[0][3]+'.jpg',
          comment:res.data.comment
        })
      }
})
  }
})
