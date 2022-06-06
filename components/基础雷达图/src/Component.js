/*
 * @Author: Rise.Hao
 * @Date: 2022-05-19 17:09:46
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-05 22:26:58
 * @Description: file content
 */
import ReactComponent from 'data-vi/ReactComponent';
import PieProgess from './RadarMap/index';
import { isFunction, call } from "data-vi/helpers";
export default class Component extends ReactComponent {
    // 默认配置
    static defaultConfig = {
        width: 883,
        height: 645
    };
    // 默认选项
    static defaultOptions = {};
    // 系统事件
    static events = {};
    // 是否加载css文件 如当前组件没有样式文件，设置为false
    static enableLoadCssFile = true;
    
    static defaultOptions = {
      colors:['rgba(245, 166, 35, 1)'],
      areaColors: ['rgba(245, 166, 35, 0.3)']
    }
    getDefaultData() {
        return {
            name:['优秀','良好','一般','及格','不及格'],
            value:[
                {
                    title:'设备1',
                    val:  [80, 50, 55, 80, 50],
                },
                {
                    title:'设备2',
                    val:  [60, 60, 65, 60, 70],
                },
                {
                    title:'设备3',
                    val:  [70, 20, 15, 20, 30],
                }
            ]
        }
    }

    getReactComponent() {
        return PieProgess;
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
            const { colors, areaColors } = opt;
            const newColors = data.value.map(() => colors[0]);
            const newAreaColors = data.value.map(() => areaColors[0]);
            // 数据加载完成事件
            this.trigger('loaded', data);
            this.setOptions({colors: newColors, areaColors: newAreaColors })
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }
}

