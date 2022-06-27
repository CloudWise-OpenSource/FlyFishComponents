import React, { useEffect, useRef, useState } from 'react';
import ReactComponent from 'data-vi/ReactComponent';

import PropTypes from 'prop-types';

import { USEINSTANCEFUNCTION } from './constant';
import {
  recursionOptions,
  defaultsDeep,
  escapeEmptyString,
  log,
} from '@cloudwise-fe/chart-panel';

import { COLORS } from './Chart/theme';

import * as echarts from 'echarts';
import ChinaJSON from './assets/china';

echarts.registerMap('China', ChinaJSON);

import './index.less';

// default asp
const defaultRatio = 1864 / 1506;

const grid = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const defaultLineStyle = {
  type: 'dotted',
  opacity: 0.8,
  curveness: 0.2,
};

const CustomChinaMap = ({
  data,
  parent,
  series = {},
  rangeColor,
  ...props
}) => {
  const renderDOM = useRef();
  const chartRef = useRef();
  const [rect, setRect] = useState({});

  useEffect(() => {
    const { width } = parent.getConfig();
    setRect({ width, height: width / defaultRatio });
  }, []);

  useEffect(() => {
    // 始终保持规定的比例
    parent.bind('resized', ({ width }) =>
      setRect({ width, height: width / defaultRatio }),
    );

    return () => {
      parent.unbind('resized');
    };
  }, [parent]);

  useEffect(() => {
    if (renderDOM.current && !chartRef.current) {
      console.log('init chart');
      chartRef.current = echarts.init(renderDOM.current);
    }

    return () => {
      chartRef.current && chartRef.current.clear();
    };
  }, [renderDOM.current]);

  useEffect(() => {
    if (chartRef.current) {
      window.ch = chartRef.current;
      const { width, height } = rect;
      if (typeof width === 'undefined') return;
      // 实际高度大于计算高度: 正常宽度, 计算高度; 实际高度小于正常高度: 正常高度, 计算宽度
      const rectHeight = width / defaultRatio;
      const { label, tooltip, useInstance, transferSeriesData, line, color } =
        recursionOptions(props, true);
      const coordsData = convertData(transferSeriesData(data));
      const confirmData = combineItemStyleWithRangeColor(
        coordsData,
        rangeColor,
      );
      console.log(
        combineLineStyleWithRangeColor(convertLineData(coordsData), rangeColor),
      );
      chartRef.current.setOption({
        color,
        tooltip,
        geo: {
          id: 'china',
          map: 'China',
          aspectScale: 0.82,
          zoom: 1.1,
          layoutSize: rectHeight >= height ? defaultRatio * height : width,
          layoutCenter: ['52%', '68%'],
          silent: true,
          itemStyle: {
            areaColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(255, 255, 255, 0)',
            borderWidth: 1,
          },
        },
        grid,
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: confirmData,
            zlevel: 1,
            rippleEffect: {
              scale: 4,
              brushType: 'stroke',
            },
            label,
          },
          {
            type: 'lines',
            animation: false,
            lineStyle: { color: color[0], ...line },
            data: combineLineStyleWithRangeColor(
              convertLineData(coordsData),
              rangeColor,
            ),
            coordinateSystem: 'geo',
            zlevel: 1,
            silent: true,
            label: {
              show: false,
            },
          },
        ],
      });
      try {
        useInstance(chartRef.current, parent);
      } catch (e) {
        console.warn('自定义实例方法错误', e);
      }
    }
  }, [data, rect, series, rangeColor, props]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resize(rect);
    }
  }, [rect]);

  return (
    <div
      className="ff-component-custom-china-map"
      style={{ ...rect }}
      ref={renderDOM}
    >
      CustomChinaMap
    </div>
  );
};

CustomChinaMap.propsType = {
  /**
   * @default
   * @description: 格式化数据
   */
  transferSeriesData: PropTypes.func,
  /**
   * @default
   * @description: 操作实例
   */
  useInstance: PropTypes.func,
  /**
   * @default []
   * @description: 区间色值
   */
  rangeColor: PropTypes.array,
  /**
   * @default {}
   * @description: 标签设置
   */
  label: PropTypes.object,
  /**
   * @default {}
   * @description: 提示框设置
   */
  tooltip: PropTypes.object,
  /**
   * @default {}
   * @description: 线段设置
   */
  line: PropTypes.object,
  /**
   * @default COLORS
   * @description: 主题色
   */
  color: PropTypes.array,
};

const transferData = (data) => data;

export default class ChartComponent extends ReactComponent {
  static enableLoadCssFile = true;
  /**
   * @description 默认选项(默认值 => defaultProps)
   */
  static defaultOptions = {
    rangeColor: [],
    color: COLORS,
    tooltip: {
      show: true,
      formatter: `function(params) { return params.name + ': ' + params.value[2]; }`,
    },
    label: {
      show: true,
      position: 'bottom',
      color: '#DAE4F2',
      formatter: '{b}',
    },
    line: defaultLineStyle,
    // 事件
    transferSeriesData: transferData,
    useInstance: USEINSTANCEFUNCTION,
  };

  getDefaultConfig() {
    return {
      left: 434,
      top: 200,
      width: 233,
      height: 188.25,
      visible: true,
    };
  }

  getDefaultData() {
    return [
      { id: 1, name: '河南省', value: 300, link: 3 },
      { id: 2, name: '北京市', value: 200, link: 6 },
      { id: 3, name: '四川省', value: 200, link: 6 },
      { id: 4, name: '广东省', value: 100, link: 3 },
      { id: 5, name: '海南省', value: 100, link: 6 },
      { id: 6, name: '台湾省', value: 100, link: 3 },
    ];
  }

  getReactComponent() {
    return CustomChinaMap;
  }

  setOptions(options = {}, merge = true) {
    let { replaceAll, ...mergeOptions } = options;
    mergeOptions = escapeEmptyString(mergeOptions);
    log(mergeOptions);
    const replaceKeys = ['color', 'rangeColor'];
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

// 大部分还算是比较符合, 有几个需要改一下:
const fakeGeoInfo = [
  { name: '海南省', center: [112.33119, 20.331971] },
  { name: '台湾省', center: [124.709062, 25.544332] },
  { name: '广东省', center: [115.280637, 24.125178] },
  { name: '北京市', center: [116.805285, 39.204989] },
  { name: '天津市', center: [117.890182, 38.725596] },
  { name: '河北省', center: [115.502461, 38.045474] },
  { name: '广西壮族自治区', center: [110.320004, 24.42402] },
  { name: '福建省', center: [120.806239, 27.375302] },
  { name: '浙江省', center: [123.153576, 30.287459] },
  { name: '江苏省', center: [121.767413, 32.941544] },
  { name: '江西省', center: [118.092151, 28.676493] },
  { name: '安徽省', center: [119.283042, 32.26119] },
  { name: '重庆市', center: [108.504962, 29.933155] },
  { name: '青海省', center: [97.378916, 34.923178] },
  { name: '宁夏回族自治区', center: [106.778179, 35.46637] },
  { name: '河南省', center: [113.865412, 33.257975] },
  { name: '山西省', center: [112.549248, 36.857014] },
  { name: '山东省', center: [118.300923, 35.875807] },
  { name: '陕西省', center: [109.948024, 33.663161] },
  { name: '上海市', center: [123.472644, 32] },
  { name: '香港特别行政区', center: [117.373355, 23.320048] },
  { name: '澳门特别行政区', center: [116.373355, 23.320048] },
];

function convertData(data) {
  if (!data || !data.length) {
    return [];
  }
  // 先从地图里把地理信息拿出来

  const geoInfo = ChinaJSON.features
    .map(({ properties: { name, center } }) => {
      const findFakeInfo = fakeGeoInfo.find((v) => v.name === name);
      return {
        name,
        center: findFakeInfo ? findFakeInfo.center : center,
      };
    })
    .filter((v) => v.name && v.center);
  return data
    .map((v) => {
      const geo = geoInfo.find((t) => t.name === v.name);
      if (geo) {
        return {
          ...v,
          value: geo.center.concat(v.value),
        };
      } else {
        return v;
      }
    })
    .filter((v) => Array.isArray(v.value));
}

// 根据开始处理的地理信息再计算当前的路径信息
// {
//   id: number 当前节点id
//   name: string
//   link?: number 连接节点id
// }
function convertLineData(data) {
  console.log('convertLineData', data);
  const lineData = [];
  data.forEach(({ value, link, name }) => {
    if (typeof link !== 'undefined') {
      const findData = data.find((v) => v.id === link);
      if (findData) {
        lineData.push({
          fromName: name,
          toName: findData.name,
          coords: [value, findData.value],
        });
      }
    }
  });
  return lineData;
}

function combineItemStyleWithRangeColor(data, rangeColor) {
  if (!Array.isArray(rangeColor) || !rangeColor.length) {
    return data;
  }

  // 匹配区间增加itemStyle
  return data.map((v) => {
    const value = [...v.value].pop();
    const color = rangeColor.find((r) => r[0] >= value);
    if (color) {
      return {
        ...v,
        itemStyle: {
          color: color[1],
        },
      };
    } else {
      return v;
    }
  });
}

function combineLineStyleWithRangeColor(data, rangeColor) {
  if (!Array.isArray(rangeColor) || !rangeColor.length) {
    return data;
  }

  // 匹配区间增加LineStyle
  return data.map((v) => {
    // 取起点值的区间色
    const value = [...v.coords[0]].pop();
    const color = rangeColor.find((r) => r[0] >= value);
    if (color) {
      return {
        ...v,
        lineStyle: {
          color: color[1],
        },
      };
    } else {
      return v;
    }
  });
}
