import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts';
import './assets/style.less';

const Scatter = (props) => {
    const { data, fontSize = 20, lineWidth = 1, startLabel, endLabel, startText, endText } = props;
    const eventBus = props.parent;
    
    const options = {
        legend: {
            left: 'center',
            top: 10,
            textStyle: { fontSize, color: '#fff' },
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params) {
                let param = params[0];
                if (param) {
                    let res = param.axisValue;
                    res += '<br/>  ' + startLabel + ': ' + param.data[0] + startText + ': ' + param.data[3];
                    res += '<br/>  ' + endLabel + ': ' + param.data[1] + endText + ': ' + param.data[2];
                    return res;
                }
            }
        },
        grid:{
            left: 100,
            right: 20
        },
        dataZoom : {
            type: 'slider',
            show : true,
            realtime: true,
            start : 50,
            end : 100
        },
        xAxis : [
            {
                type : 'category',
                axisLine: {
                    lineStyle: {
                      color: '#4CA8FF',
                      width: lineWidth,
                    },
                  },
                  // 坐标轴文本标签
                  axisLabel: {
                    fontSize: fontSize,
                    color: '#B3D2FF',
                    margin: 30,
                    fontWeight: 'bolder',
                },
                boundaryGap : true,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data : data.x
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLine: {
                    lineStyle: {
                      color: '#4CA8FF',
                      width: lineWidth,
                    },
                  },
                  // 坐标轴文本标签
                  axisLabel: {
                    fontSize: fontSize,
                    color: '#B3D2FF',
                    margin: 30,
                    fontWeight: 'bolder',
                },
                precision: 2,
                splitNumber: 9,
                boundaryGap: [0.01, 0.01]
            }
        ],
        series : [
            {
                name:'上证指数',
                type:'k',
                data: data.y
            }
        ]
    };
    
    const goAway = () => {
        myChart.current && myChart.current.setOption(options);
        myChart.current.resize({ width: eventBus.width, height: eventBus.height });
        // myChart.current.refresh();
    }
    
    const [ref, myChart] = [useRef(null), useRef(null)];
    
    useEffect(() => {
        eventBus && eventBus.bind('resized', ({ width, height }) => {
            myChart.current.resize({ width, height });
        });
        return () => ref.current && echarts.init(ref.current).dispose();
    }, []);

    useEffect(() => {
        if(!myChart.current){
            myChart.current = echarts.init(ref.current);
        }
        goAway();
    }, [data, fontSize, lineWidth, startLabel, endLabel, startText, endText]);

    return (
        <div ref={ref} className='ff-components-6242e32d3aef2a7aeb70f4311' />
    )
}

export default Scatter;