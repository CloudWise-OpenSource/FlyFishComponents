import * as echarts from 'echarts';
import { merge } from 'data-vi/helpers';

import {
  COLORS,
  FONTCOLOR,
  FONTFAMILY,
  FONTLINEHEIGHT,
  GRID,
  BACKGROUNDCOLOR,
  INITTITLES,
  LEGENDPAGEICONCOLOR,
  LEGENDPAGEICONINACITVECOLOR,
  LEGEND,
  TOOLTIP,
  INITFONTSTYLE,
  INITSERIES,
  ANIMATION,
} from './theme';

// 这里不加colors的原因是渐变色还不支持
const textStyle = {
  color: FONTCOLOR,
  fontFamily: FONTFAMILY,
  lineHeight: FONTLINEHEIGHT,
  ...INITFONTSTYLE,
};
export const initOptions = {
  backgroundColor: BACKGROUNDCOLOR,
  textStyle,
  legend: {
    ...LEGEND,
    textStyle: {
      ...textStyle,
      color: '#9AABBD',
    },
    pageIconColor: LEGENDPAGEICONCOLOR,
    pageIconInactiveColor: LEGENDPAGEICONINACITVECOLOR,
    pageTextStyle: {
      color: FONTCOLOR,
    },
  },
  title: {
    ...INITTITLES,
    textStyle,
    subtextStyle: textStyle,
  },
  tooltip: {
    ...TOOLTIP,
    textStyle,
  },
  grid: {
    show: false,
    ...GRID,
  },
  series: INITSERIES,
  ...ANIMATION,
};

export const initChart = (dom, options = {}) => {
  console.log(options);
  const mergeOptions = merge(
    {
      color: COLORS,
    },
    initOptions,
    options,
  );
  const echartsRef = echarts.init(dom, mergeOptions);

  return echartsRef;
};
