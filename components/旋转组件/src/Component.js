import ReactComponent from "data-vi/ReactComponent";
import { isFunction, call } from "data-vi/helpers";
import Index from "./total/index";

export default class CenterBall extends ReactComponent {
  // 默认配置
  getDefaultConfig() {
    return {
      width: 850,
      height: 580,
      visible: true,
      name: '旋转组件',
    };
  }

    // 默认配置
    static defaultConfig = {};
    // 默认选项
    static defaultOptions = {
      smallFontSize: 30,
      bigFontSize: 40,
      alarmNum: 2,
      alarmColor: [{ num: 0, color: "#50e3c2"}, {num : 50, color: "#f5a623"}, {num : 80, color: "#c92b67"}]
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
      return {
        "leftTop":70,
        "rightTop":82,
        "leftBottom":18,
        "rightBottom":35};
    }
    _construct() {

    }

    getReactComponent() {
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
            const { alarmColor } = opt;
            console.log(data, opt)
            // const newAlarmColor = data.map((item, index) => alarmColor[index]);
            // 数据加载完成事件
            this.trigger('loaded', data);
            this.setOptions({ alarmColor: alarmColor })
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }

}
