Page({
  data:{
    good_id:null,
    img_path:null
  },
  onLoad:function(options){
    this.setData({
      good_id:options.good_id
    });
    wx.request({
      url: 'http://brucemarkdown.top:5000/image_path',
      complete: (res) => {
        this.setData({
          img_path:'http://brucemarkdown.top:5000/image/'+res["data"],
        })
      },
    })

  }
})