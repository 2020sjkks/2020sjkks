Page({
  data:{
    good_id:null,
    good_name:null,
    good_detail:null,
    good_price:null,
    img_path:null,
    score:null,
    comment:[],
    sales:null,
    random:'',
    url:getApp().globalData.server,
  },
  con:function(){
    console.log(this.data.comment)
  },
  onLoad:function(options){
    this.setData({
      random:Math.random() / 9999
    })
    this.setData({
      good_id:options.good_id,
      sales:options.sales
      //img_path:getApp().globalData.server+'/image/"+options.img+'.jpg'
    });
    if(options.sales[0]==null)this.setData({sales:0});
    this.get_goodinfo()
    this.get_score()
  },
  get_score(){
    wx.request({
      url: getApp().globalData.server + '/get_introd',
      method:'POST',
      data:{
        good_id:this.data.good_id
      },
      success:(res)=>{
        this.setData({
          score:res.data
        })
        console.log(res.data)
        if(res.data.length==0)this.setData({score:'暂无'})
      }
    })
  },
  get_goodinfo(){
    wx.request({
      url: getApp().globalData.server + '/goodinfo',
      method:'POST',
      data: {
        good_id:this.data.good_id,
      },
      success: (res)=>{
        var comm=[]
        for ( var i = 0; i <res.data.comment.length; i++){
          if(res.data.comment[i][0]!=undefined){
            console.log(res.data.comment[i][3])
            if(res.data.comment[i][3]==undefined){
              res.data.comment[i][3]='head'
            }
            
            comm.push(res.data.comment[i])
          }
        }
        console.log(comm)
        this.setData({
          good_name:res.data.info[0][1],
          good_detail:res.data.info[0][2],
          good_price:res.data.info[0][4],
          img_path:getApp().globalData.server+'/image/'+res.data.info[0][3]+'.jpg'+'?'+this.data.random,
          comment:comm
        })
      }
})
  }
})
