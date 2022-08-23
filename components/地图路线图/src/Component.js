
'use strict';

import BaseComponent from "data-vi/ReactComponent";
import MapLine from './MapLine/index.js';
import { defaultsDeep, isFunction, call } from "data-vi/helpers";
export default class Component extends BaseComponent {
     // 默认配置
    static defaultConfig = {
        "width": 800,
        "height": 600,
    };
    // 默认选项
    static defaultOptions = {};
    // 系统事件
    static events = {};
    // 是否加载css文件 如当前组件没有样式文件，设置为false
    static enableLoadCssFile = true;

    getReactComponent() {
      return MapLine;
    }
    static defaultOptions = {
      lineColorsDefault:'#FFF000',
      lineColorsList: []
    }
    // 获取默认事件
    getDefaultData() {
        //第一层数组长度代表路线的条数
        //第二层数组表示每条路线
      return [
        [
            {
                locationName: "台湾",
               
                monitorName: "川锦屏换",
                taskName: "±800kV锦苏直流"
            },
        ],
      ];
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
      const replaceKeys = ['lineColorsList'];
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
            const { lineColorsDefault, lineColorsList } = opt;
            const newLineColors = data.map((_,i) => lineColorsList[i] || lineColorsDefault);
            // 数据加载完成事件
            this.trigger('loaded', data);
            this.setOptions({lineColorsList: newLineColors})
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }
}

