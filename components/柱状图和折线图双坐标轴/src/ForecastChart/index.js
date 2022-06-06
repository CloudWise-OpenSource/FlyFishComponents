import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
//处理数字，避免出现 0.339*100 =33.900000000000006 此类的问题

const ForecastChart = ({ data = {}, background, lineColor, fontColor }) => {
  const { title, xAxisList = [], dataList = [] } = data;
  
  const numberHandle = (num, rank = 3) => {
    if (!num) return 0;
    const sign = num / Math.abs(num);
    const number = num * sign;
    const temp = rank - 1 - Math.floor(Math.log10(number));
    let ans;
    if (temp > 0) {
      ans = parseFloat(number.toFixed(temp));
    } else if (temp < 0) {
      ans = Math.round(number / Math.pow(10, temp)) * temp;
    } else {
      ans = Math.round(number);
    }
    return ans * sign;
  };

  const getOptions = useMemo(() => {
    const options = {
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
            ? `<div style="padding: 20px 20px 15px;border-radius: 20px;background-image: radial-gradient(rgba(74, 144, 226, 0), rgba(74, 144, 226, 0.8));"><div style="font-size:20px;color:#ffffff;">${params[0].axisValueLabel}</div>`
            : '';
          const tooltipArr = [axisTitleStr];
          params.forEach((item) => {
            const colorTemp = item.color.colorStops
              ? item.color.colorStops[0].color
              : item.color;
            const valueTemp =
              item.seriesIndex == 1 ? item.value + '%' : item.value;
            const makerStr = `<span style="display:inline-block;margin-right:15px;border-radius:50%;width:17.5px;height:17.5px;background-color:${colorTemp}; vertical-align:middle"></span>`;
            const textStr = `<span style="display:inline-block;font-size:18px;vertical-align: middle;color:#ffffff;">${item.seriesName}: ${valueTemp}</span>`;
            tooltipArr.push(
              `<div style="margin-top: 30px">${makerStr}${textStr}</div>`,
            );
          });
          if (params.length) {
            return tooltipArr.join('') + '</div>';
          } else {
            return tooltipArr.join('');
          }
        },
      },
      grid: {
        left: 100,
        right: 100,
        top: 150,
        bottom: 100,
      },
      legend: {
        itemWidth: 20,
        itemHeight: 20,
        textStyle: {
          fontSize: 18,
          lineHeight: 56,
          color: '#ffffff',
          padding: [0, 0, 0, 30],
        },
        top: 10,
        icon: 'circle',
      },
      xAxis: {
        type: 'category',
        data: xAxisList,
        axisLabel: {
          color: '#A8CAFB',
          fontSize: 18,
          lineHeight: 36,
          margin: 25,
        },
        axisLine: {
          lineStyle: {
            color: '#394E6B',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: 18,
            lineHeight: 56,
            padding: [0, 100, 28, 0],
          },
          alignTicks: true,
          axisLabel: {
            color: '#ffffff',
            fontSize: 18,
            lineHeight: 56,
            align: 'right',
            margin: 20,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: '#394E6B',
              width: 4,
            },
          },
        },
        {
          type: 'value',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: 18,
            lineHeight: 56,
            padding: [0, 80, 28, 0],
          },
          alignTicks: true,
          axisLabel: {
            color: '#ffffff',
            fontSize: 18,
            lineHeight: 56,
            align: 'left',
            margin: 20,
            formatter: function (value) {
              return value + '%';
            },
          },
          splitLine: {
            lineStyle: {
              color: '#394E6B',
              width: 4,
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          name: title,
          yAxisIndex: 0,
          data: dataList.map((item) => item.column),
          itemStyle: {
            color: background.colorStops ?
            {
              x: 0, y: 0, x2: 0, y2: 1,global: false, // 缺省为 false
              ...background
            }
            : background
          },
          barWidth: '15%',
        },
        {
          type: 'line',
          name: '增长率',
          yAxisIndex: 1,
          smooth: true,
          data: dataList.map((item) => numberHandle(item.line * 100)),
          itemStyle: {
            color: lineColor,
            borderWidth: 10,
          },
          symbolSize: 18,
          symbol: "emptycircle",
          lineStyle: {
            color: lineColor,
            width: 5,
          },
          label: {
            show: true,
            fontSize: 20,
            lineHeight: 70,
            color: lineColor,
            formatter: function (params) {
              return params.data + '%';
            },
          },
        },
      ],
    };
    return options;
  }, [title, xAxisList, dataList, background, lineColor, fontColor]);

  

  return (
    <ReactEcharts
      option={getOptions}
      notMerge={true}
      style={{ width: '100%', height: '100%' }}
    ></ReactEcharts>
  );
};

export default ForecastChart;
