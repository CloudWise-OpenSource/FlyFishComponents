import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
const TopBarChart = (props) => {
  const {data, lineBackgroundList} = props;
  const { xAxisList = [], dataList = [], title } = data;
  const newDataList = dataList.map((item, index)=>{
    return {
      ...item,
      ...lineBackgroundList[index]
    }
  })
  const option = useMemo(() => {
    return {
      color: ['#9570FF', '#37FFC7'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        padding: 0,
        formatter: function (params) {
          console.log(params);
          const axisTitleStr = params.length
            ? `<div style="padding: 10px 10px 10px;border-radius: 20px;background-image: radial-gradient(rgba(74, 144, 226, 0), rgba(74, 144, 226, 0.8));"><div style="font-size:18px;color:#ffffff;">${params[0].axisValueLabel}</div>`
            : '';
          const tooltipArr = [axisTitleStr];
          params.forEach((item) => {
            const colorTemp = item.color.colorStops
              ? item.color.colorStops[0].color
              : item.color;
            const makerStr = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:18px;height:18px;background-color:${colorTemp}; vertical-align:middle"></span>`;
            const textStr = `<span style="display:inline-block;font-size:14px;vertical-align: middle;color:#ffffff;">${item.seriesName}: ${item.value}</span>`;
            tooltipArr.push(
              `<div style="margin-top: 10px">${makerStr}${textStr}</div>`,
            );
          });
          if (params.length) {
            return tooltipArr.join('') + '</div>';
          } else {
            return tooltipArr.join('');
          }
        },
      },
      legend: {
        show: true,
        icon: 'circle',
        top: '3%',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        boundaryGap: true,
        triggerEvent: false,
        axisLabel: {
          show: true,
          align: 'center',
          rotate: 30,
          interval: 0,
          margin: 18,
          verticalAlign: 'top',
          textStyle: {
            fontSize: 14,
            color: '#A8CAFB',
          },
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#3891FF',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#394E6B',
            width: 1,
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: 'red',
          },
        },
        splitArea: {
          show: false,
          interval: 0,
          areaStyle: {
            color: ['rgba(58,154,255,0.1)', 'rgba(58,154,255,0)'],
          },
        },
        data: xAxisList,
      },
      yAxis: {
        name: title,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 14,
          align: 'right',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#394E6B',
            width: 2,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#009CFF',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#FFFFFF',
            fontSize: 14,
          },
          margin: 14,
          formatter: function (value) {
            return value;
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: newDataList.map((item) => ({
          name: item.name,
          type: 'line',
          stack: 'Total',
          symbol: 'emptyCircle',
          smooth: true,
          symbolSize: 12,
          lineStyle: {
            normal: {
              color: item.background.lineColor ?
              {
                x: 0, y: 0, x2: 0, y2: 1,
                ...item.lineColor
              }
              :
              item.lineColor,
              width: 2,
            },
          },
          itemStyle: {
            color: item.lineColor,
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
          data: item.value,
        }))
    }
  }, [xAxisList, newDataList, title]);

  return (
    <ReactEcharts
      notMerge={true}
      option={option}
      style={{ width: '100%', height: '100%' }}
    ></ReactEcharts>
  );
};

export default TopBarChart;
