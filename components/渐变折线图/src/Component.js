/*
 * @Author: Rise.Hao
 * @Date: 2022-05-26 15:03:58
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-13 11:13:59
 * @Description: file content
 */
'use strict';

import ReactComponent from 'data-vi/ReactComponent';
import { defaultsDeep, isFunction, call } from "data-vi/helpers";
import Index from './Gradient/index.js';
export default class Component extends ReactComponent {
  
  // 默认配置
  static defaultConfig = {
    "width": 580,
    "height": 360,
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
    lineBackgroundDefault: {
      "lineColor":'#25FFFF',
      "background": {
        "type": "linear",
        "angle": 90,
        "colorStops": [
          {
            "offset": 0,
            "color": "#57E9FC",
            "opacity": 1,
            "id": 1,
            "active": true
          },
          {
            "offset": 1,
            "color": "rgba(128, 69, 248, 0.3)",
            "id": 2,
            "active": false
          }
        ]
      }
    },
    lineBackgroundList: []
  }

  // 获取默认事件
  getDefaultData() {
    return {
      title: '数量',
      xAxisList: [
      '2021-1',
      '2021-2',
      '2021-3',
      '2021-4',
      '2021-5',
      '2021-6',
      '2021-7',
      '2021-8',
      '2021-9',
      '2021-10',
      '2021-11',
      '2021-12'],
      dataList: [
        {
          name: '累计金融机构产品数',
          value: [100, 200, 300, 400, 500,600,700,800,900,1000,1100,1200]
        },
        {
          name: '金融机构数量',
          value: [1100, 1200, 1300, 1400, 1500,1600,1700,1800,1900,2000,2100,2200]
          
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
      const replaceKeys = ['lineBackgroundList'];
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
            const { lineBackgroundList, lineBackgroundDefault } = opt;
            const newLineBackground = data.dataList.map((_, i) => lineBackgroundList[i] || lineBackgroundDefault);
            // 数据加载完成事件
            this.trigger('loaded', data);
            this.setOptions({lineBackgroundList: newLineBackground})
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }

  getReactComponent() {
    return Index;
  }
}
