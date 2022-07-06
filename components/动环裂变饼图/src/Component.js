
'use strict';

import BaseComponent from "data-vi/ReactComponent";
import Pre from './Pre/index.jsx'

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
      name: '多彩排行柱状图',
    };
  }

  // 默认选项
  static defaultOptions = {
    fontSizeMax: 48,
    fontSizeMin: 20,
    wide: 40,
    wideColor: "#1DE2A4"
  };
  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;
  getDefaultData() {
    return {label:'工单完成率', value:66.66}
  }
  getReactComponent() {
    return Pre;
  }
}

