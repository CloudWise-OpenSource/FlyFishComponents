import React, { Component } from 'react';
import ReactComponent from 'data-vi/ReactComponent';
import bar from './assets/bar.svg';
import PropTypes from 'prop-types';
import {
  merge,
  transformImageUrl,
  getUrlParam,
  defaultsDeep,
} from 'data-vi/helpers';

import {
  noop,
  generateSeriesAndLegend,
  formatFunctionsToOption,
  transferDataSource,
} from './utils';
import { SERIESITEM, USEINSTANCEFUNCTION, SYMBOL } from './constant';
import { recursionOptions } from '@cloudwise-fe/chart-panel';

import { initChart } from './Chart';
import { GRID, TOOLTIP, XAXIS, YAXIS } from './Chart/theme';
import defaultData from './data';
import './index.less';

class Chart extends Component {
  static enableLoadCssFile = true;
  static propTypes = {
    /**
     * @description 图例配置内容(层级较高, 可使用echarts的所有配置项)
     * @default: auto
     */
    options: PropTypes.object,
    /**
     * @description 矩阵配置
     * @default GRID
     */
    grid: PropTypes.object,
    /**
     * @description 图表标题
     * @default ''
     */
    title: PropTypes.object,
    /**
     * @description 图例配置
     * @default {}
     */
    legend: PropTypes.object,
    /**
     * @description 提示框配置
     * @default {}
     */
    tooltip: PropTypes.object,
    /**
     * @description 填充配置
     * @default {}
     */
    series: PropTypes.object,
    /**
     * @description 所有函数配置保存
     * @default {}
     */
    functions: PropTypes.object,
    /**
     * @description x轴配置
     * @default {}
     */
    xAxis: PropTypes.object,
    /**
     * @description y轴配置
     * @default {}
     */
    yAxis: PropTypes.object,
    /**
     * @description 透传图表实例(避规一下ref, ref的话还是透传当前的组件实例)
     */
    forwardRef: PropTypes.func,
    /**
     * @description 格式化xAxis数据
     * @default transferData
     */
    transferXAxisData: PropTypes.func,
    /**
     * @description 格式化数据
     * @default transferData
     */
    transferSeriesData: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.addEventListener();
  }

  /**
   * @description 图例DOM实例
   */
  chartDOM = null;
  /**
   * @description 图表实例
   */
  chart = null;

  componentDidMount() {
    this.init();
  }

  /**
   * @description 初始化图表
   */
  init = () => {
    this.chart = initChart(this.chartDOM);
    // this.props.forwardRef(this.getInstance());
  };

  computedHeightBar = (data, symbol, imageTypes) => {
    console.log(symbol, imageTypes);
    let dataMax = Math.max(
      ...data.map((item) => {
        return Object.prototype.toString.call(item) === '[object Object]'
          ? item.value
          : item;
      }),
    );
    const _data = data.map((item) => {
      let _value =
        Object.prototype.toString.call(item) === '[object Object]'
          ? item.value
          : item;
      if (_value <= dataMax / 3) {
        return {
          ...item,
          symbol:
            (imageTypes.lowImage &&
              'image://' + transformImageUrl(imageTypes.lowImage)) ||
            symbol,
        };
      } else if (_value <= (dataMax / 3) * 2 && _value > dataMax / 3) {
        return {
          ...item,
          symbol:
            (imageTypes.middleImage &&
              'image://' + transformImageUrl(imageTypes.middleImage)) ||
            symbol,
          // symbolOffset: [0, '25%'],
        };
      } else {
        return {
          ...item,
          symbol:
            (imageTypes.highImage &&
              'image://' + transformImageUrl(imageTypes.highImage)) ||
            symbol,
        };
      }
    });
    return _data;
  };
  /**
   * @description 获取最终合并options(注意和飞鱼本身的options做区分)
   * @returns {{[_: string]: any}}
   */
  batchOptions = (xAxisData, seriesData, props = this.props) => {
    let {
      title = {},
      transferSeriesData,
      transferXAxisData,
      options = {},
      grid = {},
      legend = {},
      tooltip = {},
      xAxis = {},
      yAxis = {},
      color,
      functions,
      parent,
      data,
      axisPointer = {},
      series: seriesExtra = {},
      useInstance,
      imageTypes = {},
      ...restChartOptions
    } = recursionOptions(props, true);

    let configOptions = { series };
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      if (Object.prototype.toString.call(options) === '[object Function]') {
        // 新版的函数配置
        options = recursionOptions(options(), true);
      } else {
        console.warn('options is not a valid options');
        options = {};
      }
    }
    const formatFunctions = formatFunctionsToOption(functions);
    const realTransferXAxisData =
      formatFunctions.transferXAxisData || transferXAxisData;
    const realTransferSeriesData =
      formatFunctions.transferSeriesData || transferSeriesData;
    // 组装(x|yAxis)数据
    const xAxisConfig = {
      data: realTransferXAxisData(xAxisData),
      ...xAxis,
    };
    const { series: extraSeries = {}, ...restOptions } = options;
    // 组装图形类型
    const { series = [], type } = generateSeriesAndLegend(
      realTransferSeriesData(seriesData),
    );
    let seriesConfig = [];
    if (!type || [SERIESITEM.string, SERIESITEM.number].includes(type)) {
      const [extra = {}] = seriesExtra;
      seriesConfig = {
        type: 'pictorialBar',
        symbol: 'image://' + bar,
        data: series,
        ...extra,
        ...extraSeries,
      };
    } else if (type === SERIESITEM.object) {
      seriesConfig = series.map(({ data = [], ...v }) => {
        const { data: dataSetting = [], ...extra } = seriesExtra[v.name] || {};
        // 数据可能会单独设置symbol, 单独合并一下
        dataSetting.length &&
          (data = data.map((v, i) => ({ ...v, ...dataSetting[i] })));
        console.log(extraSeries, extra, v);
        const defalutSymbol = extraSeries.symbol || extra.symbol || v.symbol;
        const _symbol =
          (defalutSymbol &&
            (SYMBOL.indexOf(defalutSymbol) > -1
              ? defalutSymbol
              : 'image://' + transformImageUrl(defalutSymbol))) ||
          'image://' + bar;
        console.log(_symbol);
        return {
          type: 'pictorialBar',
          symbol: 'image://' + bar,
          ...v,
          ...extra,
          ...extraSeries,
          symbol: _symbol,
          data: extra.showImageType
            ? this.computedHeightBar(data, _symbol, imageTypes)
            : data,
        };
      });
    }
    console.log(seriesConfig, 'seriesConfig');
    configOptions = {
      series: seriesConfig,
      title,
      legend,
      grid,
      tooltip,
      xAxis: xAxisConfig,
      yAxis,
      axisPointer,
      ...(color && color.length ? { color } : {}),
    };

    return merge(
      {},
      configOptions,
      formatFunctions,
      restOptions,
      restChartOptions,
      {
        useInstance,
      },
    );
  };

  /**
   * @description 计算当前图例样式
   * @returns {{}}
   */
  computedChartStyle = () => {
    const { style = {} } = this.props;

    return {
      width: '100%',
      height: '100%',
      ...style,
    };
  };

  /**
   * @description 外部获取图表实例以及DOM(暴露给外部去操作当前的实例, 不要滥用)
   * @returns {{ current: echarts, container: HTMLDivElement }}
   */
  getInstance = () => {
    return {
      current: this.chart,
      container: this.chartDOM,
    };
  };

  /**
   * 暴露出Option API
   * @param {[_: string]: any} options
   * @returns
   */
  setOption = (options, useInstance = USEINSTANCEFUNCTION) => {
    this.chart.dispose();
    this.init();
    setTimeout(() => {
      this.chart.setOption(options, true);
      useInstance(this.chart, this.props.parent);
    }, 500);
  };

  /**
   * @description 增加事件总线
   */
  addEventListener = () => {
    const eventBus = this.props.parent;
    eventBus.bind('dataChange', (changeData) => {
      const { xAxis = [], data = [] } = transferDataSource(changeData);
      const { useInstance, ...option } = this.batchOptions(xAxis, data);
      this.setOption(option, useInstance);
    });
    eventBus.bind('resized', ({ width, height }) => {
      this.chart.resize({
        width,
        height,
      });
    });
  };

  /**
   * @description 注销事件总线
   */
  removeEventListener = () => {
    const eventBus = this.props.parent;
    eventBus.unbind('loaded');
    eventBus.unbind('resized');
  };

  componentWillReceiveProps(nextProps) {
    const { xAxis: xAxisData = [], data = [] } = transferDataSource(
      nextProps.data,
    );
    const { useInstance, ...option } = this.batchOptions(
      xAxisData,
      data,
      nextProps,
    );
    this.setOption(option, useInstance);
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  render() {
    const chartStyle = this.computedChartStyle();
    return <div style={chartStyle} ref={(ref) => (this.chartDOM = ref)}></div>;
  }
  _componentWillRemove() {
    let needDeleteServerImgage = true;
    const { image } = this.getOptions();
    if (!image) {
      return;
    }
    if (this.screen && typeof this.screen.getComponents === 'function') {
      let components = this.screen.getComponents();
      const type = this.getType();
      const id = this.getId();
      needDeleteServerImgage = components.every((component) => {
        if (component.getType() === type && component.getId() !== id) {
          const { otherImageComponentImage } = component.getOptions();
          if (image === otherImageComponentImage) {
            return false;
          }
        }
        return true;
      });
    }
    if (needDeleteServerImgage) {
      const imageSplitArr = image.split('/');
      apiRequest({
        url: config.screenAPI.deleteUploadScreenImg,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          imgName: imageSplitArr[imageSplitArr.length - 1],
          screen_id: getUrlParam('id'),
        }),
      });
    }
  }
}

const transferData = (data) => data;

export default class ChartComponent extends ReactComponent {
  /**
   * @description 默认选项(默认值 => defaultProps)
   */
  static enableLoadCssFile = true;
  static defaultOptions = {
    options: {},
    title: {},
    grid: GRID,
    legend: {},
    tooltip: TOOLTIP,
    xAxis: XAXIS,
    yAxis: YAXIS,
    axisPointer: {},
    series: {},
    functions: {},
    color: [],
    // 事件
    forwardRef: noop,
    transferXAxisData: transferData,
    transferSeriesData: transferData,
    useInstance: USEINSTANCEFUNCTION,
  };

  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 450,
      height: 280,
      visible: true,
    };
  }

  getDefaultData() {
    return defaultData;
  }

  getReactComponent() {
    return Chart;
  }

  setOptions(options = {}, merge = true) {
    const { replaceAll, ...mergeOptions } = options;
    const replaceKeys = ['color'];
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
}
