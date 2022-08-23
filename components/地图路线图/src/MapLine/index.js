import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts"
import "./assets/styles.less";
//位置映射
import positions from './assets/map';
// 边框映射
import chinaBorder from "./assets/chinaBorder"
import china from './assets/china';
echarts.registerMap('chinaBorder', chinaBorder);
echarts.registerMap('china', china);
//路线图线的颜色，与地图路线的数量相对应

class MapLine extends Component {
    constructor(props) {
        super(props);
    }

    // 设置元素点位置
    getPosition = (value) => {
        console.log(value,'<--value')
        let data = positions[value];
        console.log(data,'<--https://docp-ops.cloudwise.com/#/lcap/app/component-develop')
        // data[1] += 1.8;
        return data
    }

    /**
     * 地图渲染option参数配置
     * @param {*} mapData 地图数据
     * @returns 
     */
    getOption = (mapData)=>{
        let pointData=[];   //线数据
        let listData=[];    //点数据 
        if(mapData.length) {
            pointData = mapData.map((v, i) => {
                return v.map((item) => {
                    let toCoord = this.getPosition(item.locationName);
                    return {
                        monitorName: item.monitorName,
                        taskName: item.taskName,
                        value: [...toCoord],
                        itemStyle: {
                            normal: {
                                color: this.props.lineColorsList[i] || '#FFF000',
                            }
                        },
                    }
                })
            })
            listData = mapData.map((v, i) => {
                return v.map((item, index) => {
                    let toCoord = this.getPosition(item.locationName);
                    let fromCoord = this.getPosition(v[index + 1] ? v[index + 1].locationName : item.locationName);
                    return [
                        {
                            coord: toCoord,
                            value: item,
                        }, {
                            lineStyle:{
                                color: this.props.lineColorsList[i] || '#FFF000',
                                width: 2,
                                curveness:0
                            },
                            coord: fromCoord,
                            value: v[index + 1] ? v[index + 1].locationName : item.locationName
                        }
                    ]
                })
            })
        }
        //点的ECharts相关设置
        let pointDataECharts = pointData.map((item) => {
            return {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'emphasis',
                zlevel: 10,
                rippleEffect: {
                    period: 10,
                    scale: 4,
                    brushType: 'fill'
                },
                geoIndex:0,
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'bottom',
                        padding: [10, 0, 0, 0],
                        fontSize: 14,
                        color: '#fff',
                        show: true
                    },
                },

                symbolSize: 8,
                tooltip: {
                    backgroundColor: "rgba(50,50,50,0.7)",
                    show: true,
                    formatter: function(param) {
                        return "名称："+param.data.monitorName+"<br>特高压直流："+param.data.taskName+"</br>"
                    },
                    textStyle:{
                        fontSize: 18,
                        color: "#fff"
                    }
                },
                data: item
            }; 
        })
        //线的ECharts相关设置
        let listDataECharts = listData.map((item) => {
            return {
                type: 'lines',
                zlevel: 1,
                lineStyle: {
                    normal: {
                        width: 2, //线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: 0 //尾迹线条曲直度
                    }
                },
                data: item
            }; 
        })
        let option = {
            tooltip: {
                show: false,
                backgroundColor: "rgba(0,0,0,0)",
                textStyle:{
                    fontSize: 10
                }
            },
            geo: [
                // 上层label图层
                {
                  type: 'map',
                  map: 'china',
                  top: '10%',
                  silent: false,
                  zoom: 1.2,
                  itemStyle: {
                      emphasis: {
                          //对应的鼠标悬浮效果
                          show: true,
                          borderColor: 'rgb(103, 153, 204,0.7)',
                          borderWidth: 2,
                          areaColor:'rgba(128, 216, 243, 0.2)'
                      },
                      normal: {
                          borderColor: 'rgb(103, 153, 204,0.7)',
                          // shadowColor: 'rgba(28, 216, 243, 1)',
                          // shadowBlur: 5,
                          borderWidth: 2,
                          areaColor: {
                              type: 'radial',
                              x: 0.5,
                              y: 0.5,
                              r: 0.75,
                              colorStops: [{
                                  offset: 0,
                                  color: 'rgba(128, 216, 243, 0.02)' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: 'rgba(128, 216, 243, 0.02)' // 100% 处的颜色
                              }],
                              globalCoord: true // 缺省为 false
                          },
                      }
                  },
                  label: {
                      show: true,
                      // 省份名称样式设置
                      normal: {
                          show: true, //显示省份标签
                          textStyle: {
                              color: "#FFF", //省份标签字体颜色
                              fontSize: 14
                          },
                      },
                      emphasis:{
                          textStyle: {
                              color: "#FFF", //省份标签字体颜色
                              fontSize: 14
                          },
                      }
                  },
                  tooltip: {
                      show: false
                  },
              },
              // 底部地图图层
              {
                  type: 'map',
                  map: 'china',
                  top: '10%',
                  silent: false,
                  zoom: 1.2,
                  label: {
                      show: false,
                      emphasis: {
                          //对应的鼠标悬浮效果
                          show: false,
                          textStyle: {
                              color: "#8CCBFF", //省份标签字体颜色
                              fontSize: 12
                          },
                      }
                  },
                  itemStyle: {
                      emphasis: {
                          areaColor: 'rgba(0,71,142,0.6)',
                      },
                      normal: {
                          borderWidth: 0,
                          areaColor: {
                              type: 'radial',
                              x: 0.5,
                              y: 0.5,
                              r: 0.75,
                              colorStops: [{
                                  offset: 0,
                                  color: 'rgba(24,146,255,0.2)' // 0% 处的颜色
                              }, {
                                  offset: 1,
                                  color: 'rgba(24,146,255,0.2)' // 100% 处的颜色
                              }],
                              globalCoord: true // 缺省为 false
                          },
                          // shadowColor: 'rgb(58,115,192)',
                          // shadowOffsetX: 10,
                          // shadowOffsetY: 11,
                      },
                      emphasis: {
                          areaColor: 'rgba(56,110,255,0.2)',
                      },
                  },
                  regions: [{
                      name: '南海诸岛',
                      itemStyle: {
                          areaColor: 'rgba(24,146,255,0.4)',
                          borderColor: 'rgba(24,146,255,0.4)',
                          normal: {
                              opacity: 0,
                              label: {
                                  show: false,
                                  color: "#009cc9",
                              }
                          }
                      },
                  }],
              },
              // 底层边框
              {
                  map: 'chinaBorder',
                  background: "rgba(0,108,255,0.08)",
                  silent: true,
                  top: '12%',
                  type: 'map',
                  zoom: 1.2,
                  tooltip: {
                      show: false
                  },
                  label: {
                      show: false,
                      emphasis: {
                          //对应的鼠标悬浮效果
                          show: false,
                          textStyle: {
                              color: "#8CCBFF", //省份标签字体颜色
                              fontSize: 12
                          },
                      }
                  },
                  roam: false,
                  itemStyle: {
                      normal: {
                          areaColor: 'rgba(0,16,135,0.1)',
                          borderColor: '#2B91aF',
                          borderWidth: 1.4,
                          shadowColor: '#2B91aF',
                          shadowOffsetX: 0,
                          shadowOffsetY: 4,
                          shadowBlur: 10,
                      },
                      emphasis: {
                          show: false,
                      }
                  },
                  regions: [
                      {
                          name: '南海诸岛',
                          itemStyle: {
                              opacity: 0,
                          },
                      },
                  ],
              },
             // 中国地图外框
              {
                  map: 'chinaBorder',
                  background: "rgba(0,108,255,0.2)",
                  silent: true,
                  top: '10%',
                  type: 'map',
                  zoom: 1.2,
                  tooltip: {
                      show: false
                  },
                  label: {
                      show: false,
                      emphasis: {
                          //对应的鼠标悬浮效果
                          show: false,
                          textStyle: {
                              color: "#8CCBFF", //省份标签字体颜色
                              fontSize: 12
                          },
                      }
                  },
                  roam: false,
                  itemStyle: {
                      normal: {
                          areaColor: 'rgba(0,255,255,0.02)',
                          borderColor: '#4BE1FF',
                          borderWidth: 2.4,
                          shadowColor: '#4BE1FF',
                          shadowOffsetX: 0,
                          shadowOffsetY: 4,
                          shadowBlur: 10,
                         
                      },
                      emphasis: {
                          show: false,
                      }
                  },
                  regions: [
                      {
                          name: '南海诸岛',
                          itemStyle: {
                              opacity: 0,
                          },
                      },
                  ],
              }
            ],
            series: pointDataECharts.concat(listDataECharts),
        };
        return option;
    }

    render() {
        return (
            <div className="ff-component-623191790990e57b45299418">
                <ReactEcharts
                    ref={(e) => this.myChart = e}
                    notMerge={true}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                    option={this.getOption(this.props.data)}
                />
            </div>
        );
    }
}

export default MapLine;