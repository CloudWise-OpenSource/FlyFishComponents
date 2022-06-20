/*
 * @Author: Celestine.Gu
 * @Date: 2022-02-23 11:36:51
 * @LastEditors: Celestine.Gu
 * @LastEditTime: 2022-03-14 15:33:24
 * @Description: file content
 */

'use strict';

import BaseComponent from "data-vi/ReactComponent";
import { isFunction, call } from "data-vi/helpers";
import Index from "./Pie3D/index";
export default class ReactComponent extends BaseComponent {
    // 默认配置
    static defaultConfig = {
      "width": 583,
      "height": 445
    };
    // 默认选项
    static defaultOptions = {
      stopColors:['#F3E726', '#01C4FB', '#DD5E0F', '#00FFFF'],
      "radio": 2,
      "lineColor":[],
      "fontSize": 40,
      "alpha": 55
    };
    // 系统事件
    static events = {};
    // 是否加载css文件 如当前组件没有样式文件，设置为false
    static enableLoadCssFile = true;

    // 获取默认选项
    getDefaultOptions() {
      return this.constructor.defaultOptions;
    }
    // 获取默认事件
    getDefaultData() {
      return [{name:'11',y:20},{name:'11',y:30},{name:'11',y:20},{name:'11',y:30}];
    }

    getReactComponent(){
      return Index;
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

