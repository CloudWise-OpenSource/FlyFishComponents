/*
 * @Author: Rise.Hao
 * @Date: 2022-05-19 17:08:54
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 17:37:54
 * @Description: file content
 */
'use strict';

import ReactComponent from 'data-vi/ReactComponent';
import ForecastChart from './ForecastChart';

export default class Component extends ReactComponent {
  // 默认配置
  static defaultConfig = {
    width: 800,
    height: 600
  };
  // 默认选项
  static defaultOptions = {};
  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;

  // 获取默认选项
  getDefaultOptions() {
    return this.constructor.defaultOptions;
  }

  static defaultOptions = {
    "lineColor":'#FACF14',
    "fontColor":'#FFFFFF',
    "background": {
      "type": "linear",
      "angle": 90,
      "colorStops": [
        {
          "offset": 0,
          "color": "#46C5FF",
          "opacity": 1,
          "id": 1,
          "active": true
        },
        {
          "offset": 1,
          "color": "#7F63FF",
          "id": 2,
          "active": false
        }
      ]
    }
  }

  // 获取默认事件
  getDefaultData() {
    return {
      title: '中国数据库市场规模（亿元）',
      xAxisList: [2015, 2016, 2017, 2018, 2019, 2020],
      dataList: [
        {
          column: 240.9,
          line: 0.15
        },
        {
          column: 309.35,
          line: 0.284
        },
        {
          column: 368,
          line: 0.19
        },
        {
          column: 492.75,
          line: 0.339
        },
        {
          column: 611.05,
          line: 0.24
        },
        {
          column: 688.02,
          line: 0.126
        }
      ]
    }
  }

  getReactComponent() {
    return ForecastChart;
  }
}
