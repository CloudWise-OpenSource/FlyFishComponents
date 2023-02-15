import React, { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
// const colors = ['rgba(245, 166, 35, 1)', 'rgba(19, 173, 255, 1)', '#00DEFF','#00FFB1','#FACF14','#A116D9','#F1F3E8','#FF9E2A','#0093FF'];
// const areaColors = ['rgba(245, 166, 35, 0.3)', 'rgba(19, 173, 255, 0.3)','rgba(0,222,255, 0.3)', 'rgba(0,255,177, 0.3)','rgba(250,207,20,0.3)', 'rgba(161,22,217,0.3)','rgba(241,243,232,0.3)','rgba(255,158,42,0.3)','rgba(0,147,255,0.3)']
export default function BallOption(props) {
    const chartDom = useRef(null);
    const myChart = useRef(null);
    const { data = {}, colors = [], areaColors = [] } = props;

    useEffect(() => {
        if (!myChart.current) {
            myChart.current = echarts.init(chartDom.current);
        }
        optionFun()
    }, [data, colors, areaColors])
    
    const optionFun = () => {
        let { name = [], value = [] } = data;
        let indicator = [];
        let seriesData = [];
        let legendVal = [];
        if(name.length > 0){
            indicator = name.map((item, index) => {
                if(index === 0){
                    return  {
                        name: item,
                        max: 100,
                        axisLabel: {
                            show: true, //刻度
                            color:'#fff',
                        }
                        
                    }
                }else{
                    return  {
                        name: item,
                        max: 100
                    }
                }
            })
        }

        if(value.length > 0){
            seriesData = value.map((item, index) => {
                return {
                    name: item.title,
                    type: "radar",
                    symbol: "circle",
                    symbolSize: 10,
                    areaStyle: {
                        normal: {
                            color: areaColors[index] || areaColors[0]
                        }
                    },
                    itemStyle:{
                        color:colors[index] || colors[0],
                        borderColor:areaColors[index] || areaColors[0],
                        borderWidth:10,
                    },
                    lineStyle: {
                        normal: {
                            type: "dashed",
                            color: colors[index] || colors[0],
                            width: 2
                        }
                    },
                    data: [item.val]
                }
            })
            legendVal = value.map(item => {
                return item.title
            })
        }

       
        let option = {
            color: ["rgba(74, 112, 194, 1)", "rgba(74, 112, 194, 1)"],
            tooltip: {
                show: true,
                trigger: "item",
                showDelay:50,
            },
            legend: {
                show: true,
                icon: "circle",
                left: "35%",
                top: "90%",
                orient: "horizontal",
                textStyle: {
                    fontSize: 14,
                    color: "#fff"
                },
                data:legendVal
            },
            radar: {
                center: ["50%", "50%"],
                radius: "70%",
                startAngle: 90,
                splitNumber: 4,
                shape: "polygon", //支持 'polygon'-多边形 和 'circle'-圆。
                splitArea: { //坐标轴在 grid 区域中的分隔区域
                    areaStyle: {
                        color: ["transparent"]
                        // color:['rgba(250,250,250,0)','rgba(200,200,200,0.1)']
                    }
                },
                axisName:{
                    color:'#fff'
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#4A70C2"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#4A70C2"
                    }
                },
                indicator: indicator
            },
            series: seriesData
        };
        myChart.current.setOption(option)
    }

    /**
     * 注册父级大小变化事件，在宽高发生变化的时候重新绘制canvas
     */
    useEffect(() => {
        const eventBus = props.parent;
        eventBus && eventBus.bind('resized', ({ width, height }) => {
            myChart.current.resize({ width, height });
        });
        return () => {
            chartDom.current && echarts.init(chartDom.current).dispose()
        }
    }, [])

    return <div style={{ width: '100%', height: '100%' }} ref={chartDom} />
}

