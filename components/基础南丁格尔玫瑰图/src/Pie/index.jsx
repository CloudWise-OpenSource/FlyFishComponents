import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

let colorList = [
  "rgb(152, 201, 250)",
  "rgb(177, 169, 255)",
  "rgb(253, 204, 96)",
  "rgb(250, 181, 152)",
  "rgb(208, 178, 180)",
]

export default function Index(props) {
  const { data = [], radio, lineColor, fontSize, show } = props
  console.log(fontSize)
  const chartDom = useRef(null)
  const myChart = useRef(null)
  /**
   * 初始化调用canvas绘制方法
   */
  const options = useMemo(() => {
    const opt = {
      legend: {
        show: show == 1 ? true : false,
        top: 'bottom',
        textStyle: {
          fontSize: 20,
          color: function (params) { //中间文字的颜色
            return colorList[params.dataIndex]
          }
        },
      },
      series: [
        {
          name: '玫瑰图',
          type: 'pie',
          radius: ["25%", "50%"],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
            fontSize: 40,
          },
          emphasis: {
            rich: {
              b: {
                //name ⽂字样式
                lineHeight: 20,
                fontSize: 18,
                textAlign: "center",
                color: "#fff",
              },
              c: {
                //value ⽂字样式
                lineHeight: 36,
                fontSize: 18,
                textAlign: "center",
                color: "#fff",
              }
            },
            label: {
              show: true,
              fontSize: fontSize,
              fontWeight: 'bold',
              color: function (params) { //中间文字的颜色
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            color: '#fff',
            fontSize: fontSize
          },
          data: data
        }
      ]
    };
    if(radio == 1) opt.color = lineColor;
    return opt
  }, [data, radio, lineColor, fontSize])

  // 重新绘制data数据
  const refreshData = (options) => {
    // console.log(options, 'options2===>')
    // var option = myChart.current.getOption();
    // option.series[0].data = data;
    myChart.current.setOption(options, true);
  }

  /**
   * 绘制canvas
   * @param {[]} data
   */
  useEffect(() => {
    if (!data.length) return;
    if (!myChart.current) {
      myChart.current = echarts.init(chartDom.current)
      myChart.current.setOption(options, true)
    } else {
      refreshData(options)
    }
  }, [options, data, radio, lineColor, fontSize])

  /**
  *  注册父级大小变化事件，在宽高发生变化的时候重新绘制canvas
  * @param {[]} data
  */
  useEffect(() => {
    const eventBus = props.parent;
    eventBus && eventBus.bind('resized', ({ width, height }) => {
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
    <div style={{ width: '100%', height: '100%' }} ref={chartDom} />
  )
}
