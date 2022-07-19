/*
 * @Author: Rise.Hao
 * @Date: 2022-03-08 19:49:34
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-04-21 12:12:33
 * @Description: file content
 */

'use strict';

import BaseComponent from "data-vi/ReactComponent";
import ScrollList from "./Ball/index.js"
export default class ReactComponent extends BaseComponent {
  // 默认配置
  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 1100,
      height: 800,
      visible: true,
      name: '旋转小球',
    };
  }

  // 默认选项
  static defaultOptions = {
    time: 20,
    rotateZ: 10,
    fontColor: '#EAE623',
    fontSize: 12,
    marginBottom: 0,
    defaultTheme: true, // 初始默认样式
    transferData: `function(data) { return data; }`,
  };
  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;
  getDefaultData() {
    return [
      { "title": "这决策" },
      { "title": "标题1" },
      { "title": "标题2" },
      { "title": "标题3" },
      { "title": "标题4" },
      { "title": "标题1" },
      { "title": "标题2" },
      { "title": "标题3" },
      { "title": "标题4" },
    ]
  }
  getReactComponent() {
    return ScrollList;
  }
}

