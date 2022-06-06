import React, { useMemo } from 'react'
import ReactEcharts from 'echarts-for-react';
import './style.less';

const Index = (props) => {
    const { data = {}, lineBackground, xAxisFontColor, yAxisFontColor } = props;
    const { xAxisList = [], dataList = [], title } = data;
    const newDataList = dataList.map((item, index)=>{
      return {
        ...item,
        ...lineBackground[index]
      }
    })
    console.log(dataList.length,'<--rise2')
    const option = useMemo(() => {
        return {
            tooltip: {
                show: true
            },
            legend: {
                icon: 'circle',
                top: '5%',
                right: '10%',
                itemHeight: 20,
                itemWidth: 20,
                itemGap: 20,
                textStyle: {
                    color: '#B1D0FC',
                    fontFamily: 'Helvetica',
                    fontSize: 24,
                    color: '#B1D0FC',
                    letterSpacing: 0.34
                },
            },
            grid: {
                top: '20%',
                left: '10%',
            },
            xAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: xAxisFontColor,
                        fontSize: 24
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#B1D0FC',
                        opacity: 0.2
                    },
                    width: 5
                },
                axisTick: {
                    show: false,
                },
                data: xAxisList
            },
            yAxis: {
                name: title,
                nameTextStyle: {
                    color: '#9EEAFF',
                    fontSize: 24,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(56, 145, 255, 0.4)',
                        width: 1
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: yAxisFontColor,
                        fontSize: 24,
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(56, 145, 255, 0.4)',
                        width: 1
                    }
                },
            },
            series: newDataList.map((item)=>({
                name: item.name,
                type: 'bar',
                barWidth: 50,
                itemStyle: {
                    normal: {
                        color: item.background.colorStops ?
                        {
                          x: 0, y: 0, x2: 0, y2: 1,
                          ...item.background
                        }
                        :
                        item.background,
                        width: 2,
                      },
                },
                data: item.value
            }))
        }
    }, [xAxisList, newDataList, xAxisFontColor, yAxisFontColor, lineBackground, dataList.length])

    return (
        <div className='ff-components-gradientbar-627bcdff52f04f1bc977833f'>
            { 
                (!dataList.length && !xAxisList.length)
                 ?
                <div className="noData">暂无数据</div>
                 : 
                <ReactEcharts
                    notMerge={true}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                    option={option}
                />
            }
        </div>
    )
}
export default Index;