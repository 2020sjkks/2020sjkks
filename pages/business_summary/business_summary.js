// pages/business_summary/business_summary.js
import * as echarts from '../../ec-canvas/echarts';
let chart1 = null;
let chart2 = null;
function initChart1(canvas1, width, height, dpr) {
  var option = {};
  wx.request({
    url: getApp().globalData.server + '/refresh_sales',
    complete:(res)=>{
      if(res.data.state=='succeed'){
        option={
          title: {
            text: '历史销售额',
            left: 'left',
            textStyle:{fontSize:17},
            top:'5%'
          },backgroundColor: "#ffffff",
          color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
          legend: {
            data: ['A', 'B', 'C'],
            top: 50,
            left: 'center',
            z: 100
          },
          grid: {
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.data.x1,
            // show: false
          },
          yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
            // show: false
          },
          series: [{
            name: '销售额',
            type: 'line',
            smooth: true,
            data: res.data.y1,
            color:'red'
          }]
        };
        chart1 = echarts.init(canvas1, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas1.setChart(chart1);
        chart1.setOption(option);
        return chart1;
      }
      else{
        wx.showToast({
          title: '刷新失败',
          icon:'none'
        })
      }
    }
  })
}
function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }
function initChart2(canvas2, width, height, dpr) {
  var option = {};
  wx.request({
    url: getApp().globalData.server + '/refresh_sales',
    complete:(res)=>{
      if(res.data.state=='succeed'){
        var percent=[];
        for (var i in res.data.x2)percent.push({name:res.data.x2[i],value:res.data.y2[i]});
        percent.sort(randomSort)
        option={
          title: {
            text: '售量占比',
            left: 'left',
            textStyle:{fontSize:17}
          },
          
          backgroundColor: "#ffffff",
          color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
          series: [{
            label: {
              normal: {
                fontSize: 14
              }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['10%', '65%'],
            data: percent,
            itemStyle: {
              normal: {label:{
              show:true,
              formatter:'{b}\n{d}%'
            },
            labelLine:{show:true}},
              emphasis: {
                  label: {
                      show: true,
                      formatter: "{b}\n{c} ({d}%)",
                      position: 'center',
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              }
          },
          }]
        };
        chart2 = echarts.init(canvas2, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas2.setChart(chart2);
        chart2.setOption(option);
        return chart2;
      }
      else{
        wx.showToast({
          title: '刷新失败',
          icon:'none'
        })
      }
    }
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    random:'',
    ec1: {
      onInit: initChart1
    },
    ec2: {
      onInit: initChart2
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})