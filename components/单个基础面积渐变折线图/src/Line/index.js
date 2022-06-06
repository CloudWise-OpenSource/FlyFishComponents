import React, { useMemo } from 'react'
import './style.less';
import ReactEcharts from 'echarts-for-react';
const Lines = (props) => {
  const {data, lineBackground = []} = props;

  const { xAxisList = [], dataList = [], title = '' } = data || {};
  const newDataList = dataList.map((item,index)=>{
    return {
      ...item,
      ...lineBackground[index]
    }
  })
  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#25FFFF',
            width: 1,
            type: 'solid',
          },
        },
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        backgroundColor: 'rgba(37,255,255,0.3)',
        borderColor: '#25FFFF',
        borderWidth: 1,
        padding: 10,
      },
      legend: {
        show: true,
        height: 10,
        top: 8,
        itemHeight: 7,
        itemWidth: 14,
        right: 20,
        borderColor: 'red',
        textStyle: {
          color: '#B1D0FC',
          fontSize: 12,
          lineHeight: -1
        },
        itemGap: 20,
      },
      grid: {
        //显示四周边框
        show: true,
        borderWidth: 1,
        borderColor: 'rgba(56,145,255, 0.4)',
        top: '10%',
        bottom: '5%',
        left: '1%',
        right: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: newDataList.length > 0 ? true : false,
            lineStyle: {
              width: 1,
              color: 'rgba(56, 145, 255, 0.4)'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'rgba(56, 128, 255, 0.14)'],
            }
          },
          boundaryGap: true,
          axisLabel: {
            formatter: function (value) {
              let valueTxt = '';
              if (value.length > 16) {
                valueTxt = value.substring(0, 16) + '...';
              }
              else {
                valueTxt = value;
              }
              return valueTxt;
            },
            show: true,
            textStyle: {
              margin: 10,
              fontSize: 22,
              color: '#B1D0FC',
            },
          },
          data: xAxisList
        }],
      yAxis: {
        name: title,
        nameTextStyle: {
          fontSize: 16,
          color: '#B1D0FC',
          padding: [0, 0, 8, -36],
        },
        type: "value",
        axisLabel: {
          fontSize: 22,
          color: '#B1D0FC',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(45,76,143, 0.5)',
            width: 1
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: newDataList.length > 0 ? true : false,
          lineStyle: {
            color: 'rgba(56, 145, 255, 0.4)'
          }
        },
        splitArea: {
          show: false,
          areaStyle: {
            color: 'rgba(0,180,255,0.2)'
          }
        }

      },
      series: newDataList.map((item,index) => ({
        name: item.name,
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: true,
        legend: {
          show: true,
        },
        lineStyle: {
          normal: {
            color: item.lineColor,
            width: 2,
          },
        },
        itemStyle: {
          color: item.lineColor,
          //圆点的阴影
          borderColor: item.borderColor,
          borderWidth: item.borderSize,
        },
        areaStyle: {
          color: item.background.colorStops ?
          {
            x: 0, y: 0, x2: 0, y2: 1,
            ...item.background
          }
          :
          item.background
        },
        data: item.value
      }))
    }
  }, [xAxisList, newDataList]);

  return (
    <div className="ff-component-62284bd0230821173ac390c9">
      <ReactEcharts
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        notMerge={true}
        option={options}
        opts={{ devicePixelRatio: 1 }}
      />
      {
        !dataList.length && <div className="noData">暂无数据</div>
      }
    </div>
  );
}

export default Lines