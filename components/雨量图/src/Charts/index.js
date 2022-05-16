
import * as echarts from 'echarts'
export const initOption = {
  title: {
    text: 'Rainfall and Flow Relationship',
    left: 'center'
  },
  grid: {
    bottom: 80 
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    } 
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      animation: false,
      label: {
        backgroundColor: '#505765'
      },
    },
  },
  legend: {
    data: ['Flow', 'Rainfall'],
    left: 10
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: [0],
      start:10,
      end:80
  },
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: { 
        onZero: false, 
        lineStyle:{}, 
        show:true 
      },
      axisLabel: {},
      // prettier-ignore
    }
  ],
  yAxis: [
    {
      name: 'Flow(m^3/s)',
      nameTextStyle:{
        color:'#9B9B9B'
      },
      type: 'value',
      axisLabel:{},
      axisLine:{lineStyle:{}, show:true}
    },
    {
      name: 'Rainfall(mm)',
      nameTextStyle:{
        color:'#9B9B9B'
      },
      nameLocation: 'start',
      alignTicks: true,
      type: 'value',
      inverse: true,
      axisLabel:{},
      axisLine:{lineStyle:{}, show:true}
    }
  ],
  series: [
    {
      name: 'Flow',
      type: 'line',
      areaStyle: {},
      itemStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
        },
      },
      // prettier-ignore
    },
    {
      name: 'Rainfall',
      type: 'line',
      yAxisIndex: 1,
      areaStyle: {},
      itemStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3
        },
        data: [
          [
            {
              xAxis: '2009/9/10\n7:00'
            },
            {
              xAxis: '2009/9/20\n7:00'
            }
          ]
        ]
      },
      // prettier-ignore
    }
  ]
};
export function initChart(dom){
  const Chart = echarts.init(dom)
  
  return Chart
}