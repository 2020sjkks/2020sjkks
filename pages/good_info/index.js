Page({
  data:{
    good_id:null
  },
  onLoad:function(options){
    this.setData({
      good_id:options.good_id
    });
    console.log(this.data.good_id);

  }
})