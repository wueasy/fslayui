/*
 * fsLayui - A Front-end Rapid Development Framework.
 * Copyright (C) 2017-2019 wueasy.com

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
layui.use(['element'],function(){

  var element = layui.element;

	//icon动画
  $(".panel a").hover(function(){
      $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
  },function(){
      $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
  })



  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main1'));

  // 指定图表的配置项和数据
  var option = {
    title: {
        //text: '一天用电量分布',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true/*,
        feature: {
            saveAsImage: {}
        }*/
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                data: [ [{
                    name: '早高峰',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  var myChart2 = echarts.init(document.getElementById('main2'));
  var colors = ['#5793f3', '#d14a61', '#675bba'];

  var option2 = {
      color: colors,

      tooltip: {
          trigger: 'none',
          axisPointer: {
              type: 'cross'
          }
      },
      legend: {
          data:['2015 降水量', '2016 降水量']
      },
      grid: {
          top: 70,
          bottom: 50
      },
      xAxis: [
          {
              type: 'category',
              axisTick: {
                  alignWithLabel: true
              },
              axisLine: {
                  onZero: false,
                  lineStyle: {
                      color: colors[1]
                  }
              },
              axisPointer: {
                  label: {
                      formatter: function (params) {
                          return '降水量  ' + params.value
                              + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                      }
                  }
              },
              data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
          },
          {
              type: 'category',
              axisTick: {
                  alignWithLabel: true
              },
              axisLine: {
                  onZero: false,
                  lineStyle: {
                      color: colors[0]
                  }
              },
              axisPointer: {
                  label: {
                      formatter: function (params) {
                          return '降水量  ' + params.value
                              + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                      }
                  }
              },
              data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name:'2015 降水量',
              type:'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
              name:'2016 降水量',
              type:'line',
              smooth: true,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
          }
      ]
  };

  myChart2.setOption(option2);



  element.on('tab(demo)', function(data){
    if(data.index==0){
    }else{
      myChart2.resize();
    }
  });
});
