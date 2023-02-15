
'use strict';

import BaseComponent from "data-vi/ReactComponent";
import { isFunction, call } from "data-vi/helpers";
import RatioPie from "./RatioPie";

export default class Component extends BaseComponent {
     // 默认配置
     static defaultConfig = {
        width: 800,
        height: 600
    };
    // 默认选项
    static defaultOptions = {
        "radio": 2,
        "lineColor":[],
        "show": 1,
        "fontSize": 40
    };
    // 系统事件
    static events = {};
    // 是否加载css文件 如当前组件没有样式文件，设置为false
    static enableLoadCssFile = true;

    // 获取默认事件
    getDefaultData() {
      return [
          {
              value: 300,
              total: 350,
              name: '01'
          },
          {
              value: 150,
              total: 210,
              name: '02'
          },
          {
              value: 80, 
              total: 130,
              name: '03'
          },
          {
              value: 45, 
              total: 75,
              name: '04'
          },
          {
              value: 30, 
              total: 60,
              name: '05'
          }
      ];
    }

    getReactComponent() {
      return RatioPie;
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

