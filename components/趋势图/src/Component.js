import React, { Component } from 'react'
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
import { GRID, TOOLTIP, XAXIS, YAXIS, FAKEYAXIS } from './Chart/theme'

const transferData = (data) => data
class FoldLineChart extends Component {
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
  chartDOM = null
  /**
   * @description 图表实例
   */
  chart = null

  componentDidMount() {
    this.init()
  }

  /**
   * @description 初始化图表
   */
  init = () => {
    this.chart = initChart(this.chartDOM)
    this.props.forwardRef && this.props.forwardRef(this.getInstance())
  }

  /**
   * @description 获取最终合并options(注意和飞鱼本身的options做区分)
   * @returns {{[_: string]: any}}
   */
  batchOptions = (xAxisData, seriesData, props = this.props) => {
    let {
      title = {},
      transferSeriesData = transferData,
      transferXAxisData = transferData,
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
      fakeYAxis,
      series: propsSeries,
      useInstance = USEINSTANCEFUNCTION,
      ...restChartOptions
    } = recursionOptions(props, true)

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
    const realTransferXAxisData =
      formatFunctions.transferXAxisData || transferXAxisData
    const realTransferSeriesData =
      formatFunctions.transferSeriesData || transferSeriesData
    // 组装(x|yAxis)数据
    const xAxisConfig = {
      data: realTransferXAxisData(xAxisData),
      ...xAxis,
    }

    // 组装图形类型
    const { series = [], type } = generateSeriesAndLegend(
      realTransferSeriesData(seriesData)
    )
    let seriesConfig = []
    if (!type || [SERIESITEM.string, SERIESITEM.number].includes(type)) {
      seriesConfig = [
        {
          yAxisIndex: 0,
          type: 'line',
          data: series,
          symbol: 'circle',
          symbolSize: 10,
          stack: 'base',
          areaStyle: {
            opacity: 1,
          },
          ...propsSeries,
        },
        {
          yAxisIndex: 1,
          type: 'line',
          data: series,
          symbol: 'none',
          symbolSize: 10,
          stack: 'base-copy',
          areaStyle: { opacity: 0 },
          lineStyle: { opacity: 0 },
        }
      ]
    } else if (type === SERIESITEM.object) {
      seriesConfig = [
        ...series.map((v) => ({
          yAxisIndex: 0,
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          stack: 'base',
          areaStyle: { opacity: 1 },
          ...v,
          ...propsSeries,
        })),
        ...series.map((v) => ({
          show: false,
          yAxisIndex: 1,
          type: 'line',
          symbol: 'none',
          symbolSize: 10,
          stack: 'base-copy',
          areaStyle: { opacity: 0 },
          lineStyle: { opacity: 0 },
          ...v,
        }))
      ]
    }

    Object.entries(yAxis).forEach(([key, value]) => {
      if (key !== 'show' && !key.startsWith('name') && !fakeYAxis[key]) {
        fakeYAxis[key] = value;
      }
    })

    const { axisLabel: yAxisLabel = {}, axisLine: yAxisLine = {} } = fakeYAxis;

    const yAxisConfig = [
      {
        id: 'normalYAxis',
        ...yAxis,
      },
      {
        id: 'percentageYAxis',
        show: true,
        type: 'value',
        ...fakeYAxis,
        position: fakeYAxis.position === 'left' ? 'right' : 'left',
        splitLine: {
          show: false,
          ...yAxisLine,
        },
        axisLabel: {
          show: true,
          ...yAxisLabel,
        }
      }
    ]

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
      options,
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
      current: this.chart,
      container: this.chartDOM,
    }
  }

  /**
   * 暴露出Option API
   * @param {[_: string]: any} options
   * @returns
   */
  setOption = (options, useInstance = USEINSTANCEFUNCTION) => {
    // console.log('setOption', options, this.chart.getOption())
    if (this.disposeTimer) {
      clearTimeout(this.disposeTimer);
    }
    const forwardOption = this.chart.getOption()
    let needDispose = false
    if (
      forwardOption &&
      (options.xAxis.type !== forwardOption.xAxis[0].type ||
        options.yAxis[0].type !== forwardOption.yAxis[0].type)
    ) {
      needDispose = true
    }
    if (needDispose) {
      this.chart.dispose()
      this.init()
    }

    this.disposeTimer = setTimeout(
      () => {
        this.chart.setOption(options, true)
        // console.log('useInstance', useInstance)
        useInstance(this.chart, this.props.parent)
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
      this.chart.resize({
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
    const { xAxis = [], data = [] } = transferDataSource(nextProps.data, nextProps.dataConfig)
    const { useInstance, ...option } = this.batchOptions(xAxis, data, nextProps)
    // console.log('nextProps', nextProps)
    // console.log('option', option)
    // console.log('useInstance', useInstance)

    this.setOption(option, useInstance)
  }

  componentWillUnmount() {
    this.removeEventListener()
  }

  render() {
    const chartStyle = this.computedBarChartStyle()
    return <div style={chartStyle} ref={(ref) => (this.chartDOM = ref)}></div>
  }
}

export default class FoldLineChartComponent extends ReactComponent {
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
    fakeYAxis: FAKEYAXIS,
    axisPointer: {},
    series: {},
    functions: {},
    color: [],
    // 事件
    forwardRef: noop,
    transferXAxisData: transferData,
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
    }
  }

  getDefaultData() {
    return {
      xAxis: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      data: [
        {
          name: '降水一',
          data: [99, 80, 110, 40, 60, 147, 120, 90, 80, 150, 140, 110],
        },
        {
          name: '降水二',
          data: [50, 55, 110, 80, 70, 110, 100, 110, 80, 90, 100, 70],
        },
        {
          name: '降水三',
          data: [110, 150, 120, 100, 190, 170, 200, 240, 210, 220, 160, 190],
        },
        {
          name: '降水四',
          data: [50, 10, 30, 70, 20, 100, 50, 80, 110, 60, 80, 40],
        },
      ],
    }
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

  getReactComponent() {
    return FoldLineChart
  }
}
