import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'

export default function Index({parent, data, fontSizeMax, fontSizeMin, wide, wideColor}) {
  const chartDom = useRef(null)
  var myChart = useRef(null)
  const { label, value = 0} = data

  const options = useMemo(() => {
    return {
      grid:{
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      title: {
        text: "{a|" + value.toFixed(2).split(".")[0] + "}{b|." + value.toFixed(2).split(".")[1] + "}\n{c|"+ label +"}", // 环形中间文字
        x: "center",
        y: "center",
        textStyle: {
          rich: {
            a: {
              fontSize: fontSizeMax,
              color: wideColor,
            },
            b: {
              fontSize: fontSizeMin,
              color: wideColor,
              padding: [0, 0, 14, 0],
            },
            c: {
              fontSize: fontSizeMin,
              color: "#ffffff",
              padding: [5, 0],
            },
          },
        },
      },
      series: [
        {
          type: "gauge",
          radius: "100%",
          clockwise: false,
          startAngle: "90",
          endAngle: "-269.9999",
          splitNumber: 25,
          detail: {
            offsetCenter: [0, -20],
            formatter: " ",
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [
                [value / 100, "rgba(32,187,252,0.15)"], // 外层第一圈
                [1, wideColor], // 外层第一二圈
              ],
              width: wide,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            length: wide,
            lineStyle: {
              color: "#051F54",
              width: 6,
            },
          },
          axisLabel: {
            show: false,
          },
        },
        {
          type: "pie",   // 内环（可一直嵌套）
          name: "内层细圆环",
          radius: ["63%", "65%"],
          hoverAnimation: false,
          clockWise: false,
          itemStyle: {
            normal: {
              color: "#0C355E",
            },
          },
          label: {
            show: false,
          },
          data: [100],
        },
      ],
    };

  }, [label, value, fontSizeMax, fontSizeMin, wide, wideColor])


  useEffect(() => {
    if (!myChart.current) myChart.current = echarts.init(chartDom.current)
    myChart.current.setOption(options)
  }, [options, data])

  useEffect(() => {
    parent && parent.bind('resized', ({ width, height }) => {
      myChart.current.resize({
        width,
        height,
      });
    });
    return () => {
      // 销毁实例
      chartDom.current && echarts.init(chartDom.current).dispose()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 420, minWidth: 420 }} ref={chartDom} />
  )
}
