/*
 * @Author: Rise.Hao
 * @Date: 2022-05-25 14:51:26
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-03 13:41:15
 * @Description: file content
 */

import ReactComponent from "data-vi/ReactComponent";
import Index from './ScatterDiagram/index';
export default class Component extends ReactComponent {
  // 默认配置
  static defaultConfig = {
    "width": 800,
    "height": 600,
  };
  // 默认选项
  static defaultOptions = {
    fontSize: 20,
    lineWidth: 1,
    statusColor: ['lightgreen', 'red']
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
    // 注意这里的数据类型必须为[string, number, number]
    return [[150, 26.17, 16.57],[151, 7.2, 62.64],[152, 16.52, 63.2],[153, 17.61, 83.76],[154, 25.8, 75.15],[155, 2.5, 39.78],[156, 8.28, 65.44],[157, 20.68, 26.21],[158, 8.64, 70.05],[159, 20.23, 41.05],[160, 2.38, 26.01],[161, 22.91, 44.37],[162, 10.3, 38.07],[163, 27.97, 57.12],[164, 3.37, 1.08],[165, 9.34, 89.83],[166, 10.7, 63.99],[167, 2.01, 23.87],[168, 5.76, 11.78],[169, 19.48, 12.51],[170, 29.47, 76.89],[171, 10.2, 38.83],[172, 28.19, 30.47],[173, 13.94, 73.91],[174, 16.67, 87.11],[175, 0.77, 23.37],[176, 24.35, 71.38],[177, 5.16, 38.67],[178, 15.2, 17.29],[179, 4.01, 64.47],[180, 19.55, 9.67],[181, 22.38, 93.99],[182, 0.74, 5.33],[183, 25.02, 42.86],[184, 11.91, 93.88],[185, 24.73, 59.5],[186, 1.16, 75.28],[187, 7.53, 50.26],[188, 19.97, 16.98],[189, 27.32, 93.9],[190, 6.55, 72.13],[191, 27.29, 66.02],[192, 5.3, 51.8],[193, 2.67, 96.61],[194, 19.15, 47.84],[195, 14.75, 45.78],[196, 0.01, 99.07],[197, 22.1, 61.43]].map(d => [d[0] + '', d[1], d[2]]);
  }
  getReactComponent() {
    return Index;
  }
}

