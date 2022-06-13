import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts';
import './assets/style.less';

const Scatter = (props) => {
    const { data, fontSize = 20, lineWidth = 1, statusColor = [] } = props;
    const eventBus = props.parent;
    
    const scatterOption = {
        grid:{
            left: 100,
            right: 20
        },
        tooltip : {
            trigger: 'item',
            textStyle: { fontSize },
            formatter : function ({data , seriesName}) {
                return data[0] + '：' + data[1] + ', ' + data[2]; 
            }
        },
        dataZoom: {
            show: true,
            start : 30,
            end : 70
        },
        dataRange: {
            min: 0,
            max: 100,
            orient: 'horizontal',
            y: 10,
            x: 'center',
            //text:['高','低'],           // 文本，默认为数值文本
            color: statusColor,
            splitNumber: 5,
            textStyle: {
                fontSize: fontSize,
                color: '#B3D2FF',
                fontWeight: 'bolder',
            }
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
                data : data.map(d => d[0])
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: {
                    lineStyle: {
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
            }
        ],
        animation: false,
        series : [
            {
                name:'series1',
                type:'scatter',
                symbolSize: function (value){
                    return Math.round(value[2]/10);
                },
                data: data
            }
        ]
    };
    const goAway = () => {
        myChart.current && myChart.current.setOption(scatterOption);
        myChart.current.resize({ width: eventBus.width, height: eventBus.height });
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
    }, [data, fontSize, lineWidth, statusColor]);

    return (
        <div ref={ref} className='ff-components-623428627857a37b489b0a971' />
    )
}

export default Scatter;