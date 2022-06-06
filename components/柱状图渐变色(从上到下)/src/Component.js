/*
 * @Author: Rise.Hao
 * @Date: 2022-05-26 13:53:00
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-06 16:04:18
 * @Description: file content
 */

'use strict';

import ReactComponent from "data-vi/ReactComponent";
import GradientBar from './GradientBar';
import { isFunction, call, defaultsDeep } from "data-vi/helpers";
export default class Component extends ReactComponent {
  // 默认配置
  static defaultConfig = {
    width: 800,
    height: 600,
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
    xAxisFontColor: '#9EEAFF',
    yAxisFontColor: '#9EEAFF',
    lineBackgroundDefault:{
      "fontColor": '#FACF14',
      "background": {
        "type": "bar",
        "angle": 90,
        "colorStops": [
          {
            "offset": 0,
            "color": "#25FFFF",
            "opacity": 1,
            "id": 1,
            "active": true
          },
          {
            "offset": 1,
            "color": "rgba(37, 255, 255, 0.06)",
            "id": 2,
            "active": false
          }
        ]
      }
    },
    lineBackground: []
  }
  // 获取默认事件
  getDefaultData() {
    return {
      title: '人数（人）',
      xAxisList: [
        '模块一',
        '模块二',
        '模块三',
        '模块四',
        '模块五',
      ],
      dataList: [
        {
          name: '调用量',
          value: [20, 30, 40, 40, 40]
        },
        {
          name: '金融机构数量',
          value: [110, 120, 130, 140, 150] 
        }
      ]
    }
  }

   /**
     * 设置选项
     *
     * @param {Object} options 选项
     * @param {boolean} merge 是否合并原来的选项
     * @returns {Component}
     */
    setOptions(options = {}, merge = true) {
        const { replaceAll, ...mergeOptions } = options;
        const replaceKeys = ['lineBackground'];
        // 魔改一下部分结果处理
        if (replaceAll) {
          this.options = mergeOptions;
        } else if (merge) {
          let cloneOption = defaultsDeep({}, mergeOptions, this.options);
          if (replaceKeys.find((v) => typeof mergeOptions[v] !== 'undefined')) {
            cloneOption = {
              ...cloneOption,
              ...mergeOptions,
            };
          }
          this.options = cloneOption;
        } else {
          this.options = defaultsDeep({}, mergeOptions, this.getDefaultOptions());
        }
    
        // 渲染事件
        this.trigger('optionsChange', this.options);
        return this;
      }

/**
     * 加载数据
     *
     * @param {Object=} options 临时加载选项
     * @param {function(Array.<Object>)=} onSuccess 加载完成回调
     * @param {function(string)} onError 加载失败回调
     * @returns {Component}
     */
    load(options = {}, onSuccess = null, onError = null) {
      if (this.hasDataSource()) {
        if (isFunction(options)) {
          /* eslint-disable no-param-reassign */
          onError = onSuccess;
          onSuccess = options;
          options = {};
          /* eslint-enable no-param-reassign */
        }
        // 加载数据事件
        this.trigger('load');
        this.dataSource.load(
          options,
          (data) => {
            call(onSuccess, this, data);
            let opt = this.getOptions()
            const { lineBackgroundDefault, lineBackground } = opt;
            
            const newLineBackground = data.dataList.map((_,i) => lineBackground[i] || lineBackgroundDefault);
            // 数据加载完成事件
            console.log(newLineBackground, '<--data2')
            this.trigger('loaded', data);
            this.setOptions({lineBackground: JSON.parse(JSON.stringify(newLineBackground))})
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }

  getReactComponent() {
    return GradientBar;
  }
}

