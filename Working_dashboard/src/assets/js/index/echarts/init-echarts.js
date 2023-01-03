$(document).ready(function() {

      <!--Rainfall and Evaporation echarts init-->

      var dom = document.getElementById("rainfall");
      var rainChart = echarts.init(dom);

      var app = {};
      option = null;
      option = {
          color: ['#A768F3','#36a2f5'],
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              data:['Sale','Market']
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'Sale',
                  type:'bar',
                  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                  markPoint : {
                      data : [
                          {type : 'max', name: 'Max'},
                          {type : 'min', name: 'Min'}
                      ]
                  },
                  markLine : {
                      data : [
                          {type : 'average', name: 'Average'}
                      ]
                  }
              },
              {
                  name:'Market',
                  type:'bar',
                  data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                  markPoint : {
                      data : [
                          {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                          {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
                      ]
                  },
                  markLine : {
                      data : [
                          {type : 'average', name : 'Average'}
                      ]
                  }
              }
          ]
      };

      if (option && typeof option === "object") {
          rainChart.setOption(option, false);
      }


    <!--basic line echarts init-->

    var chartOneDom = document.getElementById("b-line");
    var chartOne = echarts.init(chartOneDom);

    var chartOneOption = {
        color: ['#FF518A','#A768F3'],

        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['Max','Min']
        },

        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data: ['Sat','Sun','Mon','Tue','Wed','Thu','Fri']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} °C'
                }
            }
        ],
        series : [
            {
                name:'Max',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: 'Max'},
                        {type : 'min', name: 'Min'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: 'Average'}
                    ]
                }
            },
            {
                name:'Min',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint : {
                    data : [
                        {name : 'Min of Week', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : 'Average'}
                    ]
                }
            }
        ]
    };

    if (chartOneOption && typeof chartOneOption === "object") {
        chartOne.setOption(chartOneOption, true);
    }
   /**
     * Resize chart on window resize
     * @return {void}
     */
    $(window).on('resize',function() {
        setTimeout(function(){
			 chartOne.resize();
     rainChart.resize();

		})

    });
});
