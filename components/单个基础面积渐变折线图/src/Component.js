/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 10:42:54
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-06 16:05:03
 * @Description: file content
 */
import ReactComponent from 'data-vi/ReactComponent';
import Line from './Line/index';
import { defaultsDeep, isFunction, call } from "data-vi/helpers";
export default class Component extends ReactComponent {
  // 默认配置
  static defaultConfig = {};
  // 默认选项
  static defaultOptions = {};
  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;
  //在大屏上面的默认宽高
  getDefaultConfig() {
    return {
      width: 1019,
      height: 494,
      visible: true,
      colorList: []
    };
  }

  static defaultOptions = {
    lineBackgroundDefault: {
      "lineColor":'#25FFFF',
      "borderColor": 'rgba(37,255,255,0.4)',
      "borderSize": 10,
      "background": {
        "type": "linear",
        "angle": 90,
        "colorStops": [
          {
            "offset": 0,
            "color": "rgba(37,255,255,1)",
            "opacity": 1,
            "id": 1,
            "active": true
          },
          {
            "offset": 1,
            "color": "rgba(37,255,255,0)",
            "id": 2,
            "active": false
          }
        ]
      }
    },
    lineBackground: []
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
          const { lineBackground, lineBackgroundDefault } = opt;
          const newLineBackground = data.dataList.map((_, i) => lineBackground[i] || lineBackgroundDefault);
          // 数据加载完成事件
          this.trigger('loaded', data);
          this.setOptions({lineBackground: newLineBackground})
          this.draw(data);
        },
        onError
      );
    }
    return this;
  }

  getDefaultData() {
    return {
      title: '数量',
      xAxisList: ['xxx1', 'xxx2', 'xxx3', 'xxx4', 'xxx5'],
      dataList: [
        {
          name: '数据1',
          value: [190, 188, 165, 150, 130]
        },
        {
          name: '数据2',
          value: [90, 88, 65, 50, 30]
          
        }
      ]
    }
  }

  getReactComponent() {
    return Line;
  }
}

