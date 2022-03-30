import ReactComponent from 'data-vi/ReactComponent';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import {
  getGradientPreview,
  defaultsDeep,
  recursionOptions,
} from '@cloudwise-fe/chart-panel';
import { COLORSPLIT, PLACEMENT, NUMBERPLACEMENT } from './constant';

import './index.less';

const getBackgroundColor = (color, angle = 90) => {
  return typeof color === 'string'
    ? color
    : getGradientPreview(color, angle).background;
};

const Progress = ({
  data: { title = '', percentage = 0 } = {},
  fill,
  showNumber,
  showTitle,
  placement,
  numberPlacement,
  addOnFix,
  border,
  borderType,
  borderColor,
  borderWidth,
  borderRadius,
  height,
  showBackground,
  backgroundColor,
  colors = COLORSPLIT,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  showShadow,
  titleStyle,
  numberStyle,
  titleMargin,
  numberMargin,
  maxNum,
  titleRender,
  numberRender,
}) => {
  const wrapperCls = useMemo(() => {
    return classnames('ff-component-progress', {
      'ff-component-progress-fill': fill,
    });
  }, [fill]);

  const progressBarStyle = useMemo(() => {
    let style = {
      borderRadius,
    };

    if (!fill) {
      style.height = height;
    }

    if (showBackground) {
      style.backgroundColor = backgroundColor;
    }

    return style;
  }, [fill, height, borderRadius, showBackground, backgroundColor]);

  const progressBarWithBorderStyle = useMemo(() => {
    let style = {
      ...progressBarStyle,
    };
    if (border) {
      style = {
        ...style,
        borderColor,
        borderWidth,
        borderStyle: borderType,
      };
    }

    return style;
  }, [border, borderColor, borderWidth, borderType, progressBarStyle]);

  const progressBarInnerStyle = useMemo(() => {
    console.log('memo colors ------', colors);
    const sortColors = Object.entries(colors).sort((a, b) => b[0] - a[0]);
    const filterBackground =
      sortColors.length === 1
        ? sortColors[0]
        : sortColors.find(([step]) => step <= percentage / maxNum) || [];
    console.log(filterBackground, Object.entries(colors));
    return {
      width:
        (percentage < 0
          ? 0
          : percentage > maxNum
          ? 100
          : (percentage / maxNum) * 100) + '%',
      borderRadius,
      background: getBackgroundColor(
        ...(filterBackground[1]
          ? [
              filterBackground[1].colorStops || filterBackground[1],
              filterBackground[1].angle,
            ]
          : ['white']),
      ),
    };
  }, [percentage, borderRadius, colors, maxNum]);

  const wrapperShadowStyle = useCallback(
    (prevStyle = {}, inner) => {
      return fill
        ? {}
        : {
            ...prevStyle,
            ...(inner ? {} : { top: shadowOffsetY, left: shadowOffsetX }),
            opacity: shadowBlur,
          };
    },
    [shadowBlur, shadowOffsetX, shadowOffsetY, fill],
  );

  const wrapperStyle = useMemo(() => {
    return showShadow && !fill
      ? {
          marginTop: -Math.min(0, shadowOffsetY),
          paddingRight: shadowOffsetX > 0 ? shadowOffsetX : 0,
        }
      : {};
  }, [shadowOffsetX, shadowOffsetY, showShadow, height, fill]);

  const convertTitleRender = useMemo(() => {
    return recursionOptions({ titleRender }, true).titleRender;
  }, [titleRender]);

  const convertNumberRender = useMemo(() => {
    return recursionOptions({ numberRender }, true).numberRender;
  }, [numberRender]);

  return (
    <div className={wrapperCls} style={wrapperStyle}>
      {showTitle && (
        <span
          className={`ff-component-progress-title ff-component-progress-title-${placement} ${
            titleStyle.width > 0 ? 'ff-component-progress-ellipsis' : ''
          }`}
          style={{ marginRight: titleMargin, ...titleStyle }}
          dangerouslySetInnerHTML={{ __html: convertTitleRender(title) }}
        />
      )}
      <div
        className="ff-component-progress-bar"
        style={progressBarWithBorderStyle}
      >
        {/* 渐变做在这里 */}
        {showShadow && (
          <div
            className="ff-component-progress-bar-shadow"
            style={wrapperShadowStyle(progressBarStyle)}
          >
            <div
              style={wrapperShadowStyle(progressBarInnerStyle, true)}
              className="ff-component-progress-bar-inner"
            />
          </div>
        )}

        <div
          style={progressBarInnerStyle}
          className="ff-component-progress-bar-inner"
        ></div>
        {showNumber &&
        numberPlacement !== 'right' &&
        !(numberPlacement === 'after' && Number(percentage) >= maxNum) ? (
          <span
            className={`ff-component-progress-number ff-component-progress-number-${numberPlacement} ${
              numberStyle.width > 0 ? 'ff-component-progress-ellipsis' : ''
            }`}
            style={{
              ...numberStyle,
              ...(numberPlacement === 'after'
                ? {
                    left: Math.max(0, (percentage / maxNum) * 100) + 2 + '%',
                    marginLeft: numberMargin,
                  }
                : numberPlacement === 'inner'
                ? {
                    left:
                      Math.max(0, ((percentage / maxNum) * 100) / 2 - 1) + '%',
                  }
                : {}),
            }}
            dangerouslySetInnerHTML={{
              __html: convertNumberRender(percentage, addOnFix),
            }}
          />
        ) : null}
      </div>
      {showNumber &&
      ((numberPlacement === 'after' && Number(percentage) >= maxNum) ||
        numberPlacement === 'right') ? (
        <span
          style={{ marginLeft: numberMargin, ...numberStyle }}
          className={`ff-component-progress-number ff-component-progress-number-right ${
            numberStyle.width > 0 ? 'ff-component-progress-ellipsis' : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: convertNumberRender(percentage, addOnFix),
          }}
        />
      ) : null}
    </div>
  );
};

Progress.propTypes = {
  /**
   * @description 是否自动充满
   * @default false
   */
  fill: PropTypes.bool,
  /**
   * @description 元素高度, 若设置fill, 则高度无效
   * @default 30
   */
  height: PropTypes.number,
  /**
   * @description 是否展示标题
   * @default true
   */
  showTitle: PropTypes.bool,
  /**
   * @description 标题展示位置
   * @default 'left'
   */
  placement: PropTypes.oneOf(PLACEMENT),
  /**
   * @description 进度条是否展示边框
   * @default false
   */
  border: PropTypes.bool,
  /**
   * @description 边框颜色
   * @default "#3891FF"
   */
  borderColor: PropTypes.string,
  /**
   * @description 边框类型
   * @default solid
   */
  borderType: PropTypes.string,
  /**
   * @description 边框宽度
   * @default 0.5
   */
  borderWidth: PropTypes.number,
  /**
   * @description 圆角
   * @default 15
   */
  borderRadius: PropTypes.number,
  /**
   * @description 数值单位
   * @default
   */
  addOnFix: PropTypes.string,
  /**
   * @description 是否展示数值
   * @default true
   */
  showNumber: PropTypes.bool,
  /**
   * @description 数值位置
   * @default 'right'
   */
  numberPlacement: PropTypes.oneOf(NUMBERPLACEMENT),
  /**
   * @description 是否展示进度条背景
   * @default true
   */
  showBackground: PropTypes.bool,
  /**
   * @description 进度条背景色
   * @default 'rgba(56, 145, 255, 0.2)'
   */
  backgroundColor: PropTypes.string,
  /**
   * @description 进度条分段色
   * @default COLORSPLIT
   */
  colors: PropTypes.object,
  /**
   * @description 是否展示阴影(阴影不可定制颜色, 是当前进度条的偏移镜像)
   * @default false
   */
  showShadow: PropTypes.bool,
  /**
   * @description 阴影水平偏移位置
   * @default 0
   */
  shadowOffsetX: PropTypes.number,
  /**
   * @description 阴影垂直偏移位置
   * @default -20
   */
  shadowOffsetY: PropTypes.number,
  /**
   * @description 阴影透明度
   * @default 0.5
   */
  shadowBlur: PropTypes.number,
  /**
   * @description 标题额外样式
   * @default {}
   */
  titleStyle: PropTypes.object,
  /**
   * @description 数字额外样式
   * @default {}
   */
  numberStyle: PropTypes.object,
  /**
   * @description 标题和元素之间间隔
   */
  titleMargin: PropTypes.number,
  /**
   * @description 数值和元素之间间隔
   */
  numberMargin: PropTypes.number,
  /**
   * @description 满值即总和峰值
   */
  maxNum: PropTypes.number,
  /**
   * @description 标题自定义渲染函数
   */
  titleRender: PropTypes.string,
  /**
   * @description 数值自定义渲染函数
   */
  numberRender: PropTypes.string,
};

export default class Component extends ReactComponent {
  static enableLoadCssFile = true;
  // 默认选项
  static defaultOptions = {
    fill: false,
    showTitle: true,
    placement: 'left',
    border: false,
    borderType: 'solid',
    borderColor: '#3891FF',
    borderWidth: 0.5,
    borderRadius: 15,
    showNumber: true,
    numberPlacement: 'right',
    height: 30,
    showBackground: false,
    backgroundColor: 'rgba(56, 145, 255, 0.2)',
    colors: undefined,
    showShadow: true,
    shadowOffsetX: 0,
    shadowOffsetY: -20,
    shadowBlur: 0.5,
    titleStyle: {},
    numberStyle: {},
    titleMargin: 20,
    numberMargin: 6,
    maxNum: 100,
    titleRender: `function(title) { return title || ''; }`,
    numberRender: `function(number, addOnFix) { return (number || '') + '' + (addOnFix || ''); }`,
  };

  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 1000,
      height: 700,
      visible: true,
    };
  }

  getDefaultData() {
    return { title: '天气因素', percentage: 50 };
  }

  getReactComponent() {
    return Progress;
  }

  setOptions(options = {}, merge = true) {
    const { replaceAll, ...mergeOptions } = options;
    const replaceKeys = ['colors'];
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
