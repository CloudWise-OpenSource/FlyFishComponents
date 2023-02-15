
'use strict';

import BaseComponent from "data-vi/ReactComponent";
import { isFunction, call } from "data-vi/helpers";
import Pre from './Pie/index.jsx'

export default class ReactComponent extends BaseComponent {
  // 默认配置
  // 默认配置
  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 441,
      height: 322,
      visible: true,
      name: '环形饼图',
    };
  }

  // 获取默认选项
  getDefaultOptions() {
    return this.constructor.defaultOptions;
  }

  // 默认选项
  static defaultOptions = {
    "radio": 2,
    "lineColor":[],
    "fontSize": 20,
    "show": 1
  };

  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;
  getDefaultData() {
    return [
      { value: 40, name: 'rose 1' },
      { value: 38, name: 'rose 2' },
      { value: 32, name: 'rose 3' },
      { value: 30, name: 'rose 4' },
      { value: 28, name: 'rose 5' },
      { value: 26, name: 'rose 6' },
      { value: 22, name: 'rose 7' },
      { value: 18, name: 'rose 8' }
    ]
  }
  getReactComponent() {
    return Pre;
  }

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
          const { lineColor } = opt;
          const newLineColor = data.map((item, index) => lineColor[index]);
          console.log(newLineColor, lineColor, '===>')
          // 数据加载完成事件
          this.trigger('loaded', data);
          this.setOptions({ lineColor: newLineColor })
          this.draw(data);
        },
        onError
      );
    }
    return this;
  }
}

