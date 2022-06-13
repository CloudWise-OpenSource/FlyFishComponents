
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
                locationName: "锦屏",
                province: "四川",
                monitorName: "川锦屏换",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "月城",
                province: "四川",
                monitorName: "川月城",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "沐溪",
                province: "四川",
                monitorName: "川沐溪",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "叙府",
                province: "四川",
                monitorName: "川叙府",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "泸州",
                province: "四川",
                monitorName: "川泸州",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "复龙",
                province: "四川",
                monitorName: "川复龙",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "隆盛",
                province: "重庆",
                monitorName: "渝隆盛",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "彭水",
                province: "重庆",
                monitorName: "渝彭水",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "江垭",
                province: "湖南",
                monitorName: "湘江垭",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "潺陵",
                province: "湖北",
                monitorName: "鄂潺陵",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "咸宁",
                province: "湖北",
                monitorName: "鄂咸宁",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "高士",
                province: "安徽",
                monitorName: "皖高士",
                taskName: "±800kV锦苏直流"
            },
          
            {
                locationName: "敬亭",
                province: "安徽",
                monitorName: "皖敬亭",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "含山",
                province: "浙江",
                monitorName: "浙含山",
                taskName: "±800kV锦苏直流"
            },
            {
                locationName: "苏州",
                province: "江苏",
                monitorName: "苏苏州换",
                taskName: "±800kV锦苏直流"
            }
        ],
        [
            {
                locationName: "扎鲁特",
                province: "内蒙古",
                monitorName: "蒙扎鲁特换",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "西郊",
                province: "内蒙古",
                monitorName: "蒙西郊变",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "建平",
                province: "河北",
                monitorName: "冀北建平变",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "太平",
                province: "河北",
                monitorName: "冀北太平变",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "黄烨",
                province: "河北",
                monitorName: "冀北黄烨变",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "临淄",
                province: "山东",
                monitorName: "鲁临淄变",
                taskName: "±800kV鲁固直流"
            },
            {
                locationName: "广固",
                province: "山东",
                monitorName: "鲁广固换",
                taskName: "±800kV鲁固直流"
            }
        ],
        [
            {
                locationName: "东疆",
                province: "新疆",
                monitorName: "新东疆",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "敦煌",
                province: "甘肃",
                monitorName: "甘敦煌",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "桥湾",
                province: "甘肃",
                monitorName: "甘桥湾变",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "酒泉",
                province: "甘肃",
                monitorName: "甘酒泉",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "张掖",
                province: "甘肃",
                monitorName: "甘张掖",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "河西",
                province: "甘肃",
                monitorName: "甘河西",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "石城",
                province: "甘肃",
                monitorName: "甘石城",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "木钵",
                province: "甘肃",
                monitorName: "甘木钵",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "洛川",
                province: "陕西",
                monitorName: "陕洛川",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "临汾",
                province: "山西",
                monitorName: "晋临汾",
                taskName: "±800kV天中直流"
            },
            {
                locationName: "中州",
                province: "河南",
                monitorName: "豫中州换",
                taskName: "±800kV天中直流"
            }
        ]
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

