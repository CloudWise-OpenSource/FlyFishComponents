import React, { Component } from 'react'
import * as echarts from 'echarts'
import ReactComponent from 'data-vi/ReactComponent'

import PropTypes from 'prop-types'
import { merge } from 'data-vi/helpers'

import {
  noop,
  generateSeriesAndLegend,
  formatFunctionsToOption,
  transferDataSource,
} from './utils'
import { SERIESITEM, USEINSTANCEFUNCTION } from './constant'
import { recursionOptions, defaultsDeep, escapeEmptyString, log } from '@cloudwise-fe/chart-panel'

import { initChart } from './Chart'
import { GRID, TOOLTIP, XAXIS, YAXIS, SERIES } from './Chart/theme'
import './index.less';
const transferData = (data) => data
class BarChart extends Component {
  static propTypes = {
    /**
     * @description 图例配置内容(层级较高, 可使用echarts的所有配置项)
     * @default: auto
     */
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
     * @description 指示器配置
     * @default {}
     */
    axisPointer: PropTypes.object,
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
     * @description 所有函数配置保存
     * @default {}
     */
    functions: PropTypes.object,
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
  }

  constructor(props) {
    super(props)

    this.addEventListener()
  }

  /**
   * @description 图例DOM实例
   */
  barChartDOM = null
  /**
   * @description 图表实例
   */
  barChar = null

  componentDidMount() {
    this.init()
  }

  /**
   * @description 初始化图表
   */
  init = () => {
    this.barChar = initChart(this.barChartDOM)
    this.props.forwardRef && this.props.forwardRef(this.getInstance())
  }

  /**
   * @description 获取最终合并options(注意和飞鱼本身的options做区分)
   * @returns {{[_: string]: any}}
   */
  batchOptions = (yAxisData, seriesData, props = this.props) => {
    let {
      title = {},
      transferSeriesData = transferData,
      transferYAxisData = transferData,
      options = {},
      grid = {},
      legend = {},
      tooltip = {},
      axisPointer = {},
      xAxis = {},
      yAxis = {},
      color,
      functions,
      parent,
      data,
      series: propsSeries,
      useInstance = USEINSTANCEFUNCTION,
      ...restChartOptions
    } = recursionOptions(props, true)
    console.log(restChartOptions)
    let configOptions = {}
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      if (Object.prototype.toString.call(options) === '[object Function]') {
        // 新版的函数配置
        options = recursionOptions(options(), true)
      } else {
        console.warn('options is not a valid options')
        options = {}
      }
    }
    const formatFunctions = formatFunctionsToOption(functions)
    const realTransferYAxisData =
      formatFunctions.transferYAxisData || transferYAxisData
    const realTransferSeriesData =
      formatFunctions.transferSeriesData || transferSeriesData
    // 组装(x|yAxis)数据
    // 判断: 若y轴为类目轴, 则切换xAxisData为y轴data
    let xAxisConfig = {
      ...xAxis,
    }

    let yAxisConfig = {
      ...yAxis,
      data: realTransferYAxisData(yAxisData)
    }

    const { series: extraSeries = {}, ...restOptions } = options

    // 组装图形类型
    const { series = [], type } = generateSeriesAndLegend(seriesData)

    const seriesConfig =
      !type || [SERIESITEM.string, SERIESITEM.number].includes(type)
        ? {
          type: 'bar',
          data: realTransferSeriesData(series),
          ...extraSeries,
          ...propsSeries,
        }
        : realTransferSeriesData(series).map((v) => ({
          // stack: 'baseLine',
          ...v,
          ...extraSeries,
          ...propsSeries,
        }))

    configOptions = {
      xAxis: xAxisConfig,
      yAxis: yAxisConfig,
      series: seriesConfig,
      title,
      legend,
      grid,
      tooltip,
      axisPointer,
      ...(color && color.length ? { color } : {}),
    }

    return merge(
      {},
      configOptions,
      formatFunctions,
      restOptions,
      restChartOptions,
      {
        useInstance,
      }
    )
  }

  /**
   * @description 计算当前图例样式
   * @returns {{}}
   */
  computedBarChartStyle = () => {
    const { style = {} } = this.props

    return {
      width: '100%',
      height: '100%',
      ...style,
    }
  }

  /**
   * @description 外部获取图表实例以及DOM(暴露给外部去操作当前的实例, 不要滥用)
   * @returns {{ current: echarts, container: HTMLDivElement }}
   */
  getInstance = () => {
    return {
      current: this.barChar,
      container: this.barChartDOM,
    }
  }

  /**
   * 暴露出Option API
   * @param {[_: string]: any} options
   * @returns
   */
  setOption = (options, useInstance = USEINSTANCEFUNCTION) => {
    console.log('setOption', options, this.barChar.getOption())
    if (this.disposeTimer) {
      clearTimeout(this.disposeTimer);
    }
    const forwardOption = this.barChar.getOption()
    let needDispose = false
    if (
      forwardOption &&
      (options.xAxis.type !== forwardOption.xAxis[0].type ||
        options.yAxis.type !== forwardOption.yAxis[0].type)
    ) {
      needDispose = true
    }
    if (needDispose) {
      this.barChar.dispose()
      this.init()
    }

    this.disposeTimer = setTimeout(
      () => {
        this.barChar.setOption(options, true)
        console.log('useInstance', useInstance)
        useInstance(this.barChar, this.props.parent)
        clearTimeout(this.disposeTimer);
        this.disposeTimer = null;
      },
      needDispose ? 500 : 0
    )
  }

  /**
   * @description 增加事件总线
   */
  addEventListener = () => {
    const eventBus = this.props.parent
    eventBus.bind('resized', ({ width, height }) => {
      this.barChar.resize({
        width,
        height,
      })
    })
  }

  /**
   * @description 注销事件总线
   */
  removeEventListener = () => {
    const eventBus = this.props.parent
    eventBus.unbind('resized')
  }

  componentWillReceiveProps(nextProps) {
    const { yAxis = [], data = [] } = transferDataSource(nextProps.data, nextProps.dataConfig)
    const { useInstance, ...option } = this.batchOptions(yAxis, data, nextProps)
    console.log('nextProps', nextProps)
    this.setOption(option, useInstance)
  }

  componentWillUnmount() {
    this.removeEventListener()
  }

  render() {
    const barChartStyle = this.computedBarChartStyle()
    return (
      <div style={barChartStyle} ref={(ref) => (this.barChartDOM = ref)}></div>
    )
  }
}

export default class BarChartComponent extends ReactComponent {
  static enableLoadCssFile = true;
  /**
   * @description 默认选项(默认值 => defaultProps)
   */
  static defaultOptions = {
    options: {},
    title: {},
    grid: GRID,
    legend: {},
    tooltip: TOOLTIP,
    xAxis: XAXIS,
    yAxis: YAXIS,
    axisPointer: {},
    series: SERIES,
    functions: {},
    color: [],
    // 事件
    forwardRef: noop,
    transferYAxisData: transferData,
    transferSeriesData: transferData,
    useInstance: USEINSTANCEFUNCTION,
  }

  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 450,
      height: 280,
      visible: true,
      name: '正负进度条'
    }
  }

  getDefaultData() {
    return {
      yAxis: ['18-30岁', '31-45岁', '46-60岁', '61-75岁', '76-100岁'],
      data: [
        { name: '样例1', data: [20, 90, 120, 70, 55] },
        { name: '样例2', data: [20, 90, 120, 70, 55] }
      ],
    }
  }

  getReactComponent() {
    return BarChart
  }

  setOptions(options = {}, merge = true) {
    let { replaceAll, ...mergeOptions } = options
    mergeOptions = escapeEmptyString(mergeOptions)
    log(mergeOptions);
    const replaceKeys = ['color']
    // 魔改一下部分结果处理
    if (replaceAll) {
      this.options = mergeOptions
    } else if (merge) {
      let cloneOption = defaultsDeep({}, mergeOptions, this.options)
      if (replaceKeys.find((v) => typeof mergeOptions[v] !== 'undefined')) {
        cloneOption = {
          ...cloneOption,
          ...mergeOptions,
        }
      }
      this.options = cloneOption
    } else {
      this.options = defaultsDeep({}, mergeOptions, this.getDefaultOptions())
    }

    // 渲染事件
    this.trigger('optionsChange', this.options)

    return this
  }
}
