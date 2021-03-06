import ReactComponent from "data-vi/ReactComponent";
import React,{useEffect,useRef,useState} from "react";
import * as echarts from 'echarts'
import { initOption } from "./Charts";
import _ from 'lodash'


const Rainfall = (props)=>{
  const {series,tooltip,xAxis,yAxis,legend,parent,data} = props
  const chartDom = useRef(null)
  const chart = useRef(null)

  useEffect(()=>{
    chart.current = echarts.init(chartDom.current,{})
  },[])
  useEffect(()=>{
    sizeChangeListen()
    return ()=>{
      removeSizeChange()
    }
  },[])
  useEffect(()=>{
    setOption()
  },[props])
  // 监听尺寸变化
  const sizeChangeListen = ()=>{
    const eventBus = parent;
    eventBus.bind('resized', ({ width, height }) => {
      chart.current.resize({width,height})
    });
  }
  const removeSizeChange=()=>{
    const eventBus = parent;
    eventBus.unbind('resized')
  }
  const setOption = ()=>{
    const option = mergeData()
    chart.current.setOption(option,true)
  }
  const mergeData = () => {
    const option = initOption
    if(data.xAxis) option.xAxis[0].data = data.xAxis
    if(data.flow) option.series[0].data = data.flow
    if(data.rainfall) option.series[1].data = data.rainfall
    // 合并series
    _.merge(option.series,series)
    // 合并tooltip
    tooltip.extraCssText = `width:${tooltip.width}px;height:${tooltip.height}px`
    _.merge(option.tooltip,tooltip)
    //合并x/y轴
    _.merge(option.xAxis[0],xAxis)
    _.merge(option.yAxis[0],yAxis)
    _.merge(option.yAxis[1],yAxis)
    // 合并图例
    _.merge(option.legend,legend)
    return option
  }
  return (
      <div ref={chartDom} style={{width:'100%',height:'100%'}}></div>
  )
}
export default class Test extends ReactComponent {
  // 默认配置
  static defaultConfig = {};
  // 默认选项
  static defaultOptions = {
    series:[{
      areaStyle:{
        color:'#5470c6'
      },
      lineStyle:{
        color:'#5470c6'
      }},
      {
        areaStyle:{
          color:'#91cc75'
        },
        lineStyle:{
          color:'#91cc75'
        }
    }],
    tooltip:{
      backgroundColor:'#FFFFFF',
      width:150,
      height:90
    },
    xAxis:{
      axisLabel:{
        color:'#9B9B9B',
        fontSize:12,
        fontWeight:400
      },
      axisLine:{
        lineStyle:{
          width:1,
          color:'#333',

        }
      }
    },
    yAxis:{
      axisLabel:{
        color:'#9B9B9B',
        fontSize:12,
        fontWeight:400
      },
      axisLine:{
        lineStyle:{
          width:1,
          color:'#333',
        }
      }
    },
    legend:{
      top:'auto',
      bottom:'auto',
      left:10,
      right:'auto',
      textStyle:{
        color:'#9B9B9B',
        fontSize:12,
        fontWeight:400
      }
    }
  };
  // 系统事件
  static events = {
    
  };
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = false;

  // 获取默认选项
  getDefaultOptions() {
    return this.constructor.defaultOptions;
  }

  // 获取默认事件
  getDefaultData() {
    return {xAxis:["10:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"],flow:[99,80,110,40,60,147,120,90,80,150,140,110],rainfall:[0.5,0.5,1.5,8.5,7.5,11.5,10.5,11.5,8.5,9.5,10.5,7.5]};
  }

  getReactComponent() {
    return Rainfall;
  }
}
