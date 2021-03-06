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
        {/* ?????????????????? */}
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
   * @description ??????????????????
   * @default false
   */
  fill: PropTypes.bool,
  /**
   * @description ????????????, ?????????fill, ???????????????
   * @default 30
   */
  height: PropTypes.number,
  /**
   * @description ??????????????????
   * @default true
   */
  showTitle: PropTypes.bool,
  /**
   * @description ??????????????????
   * @default 'left'
   */
  placement: PropTypes.oneOf(PLACEMENT),
  /**
   * @description ???????????????????????????
   * @default false
   */
  border: PropTypes.bool,
  /**
   * @description ????????????
   * @default "#3891FF"
   */
  borderColor: PropTypes.string,
  /**
   * @description ????????????
   * @default solid
   */
  borderType: PropTypes.string,
  /**
   * @description ????????????
   * @default 0.5
   */
  borderWidth: PropTypes.number,
  /**
   * @description ??????
   * @default 15
   */
  borderRadius: PropTypes.number,
  /**
   * @description ????????????
   * @default
   */
  addOnFix: PropTypes.string,
  /**
   * @description ??????????????????
   * @default true
   */
  showNumber: PropTypes.bool,
  /**
   * @description ????????????
   * @default 'right'
   */
  numberPlacement: PropTypes.oneOf(NUMBERPLACEMENT),
  /**
   * @description ???????????????????????????
   * @default true
   */
  showBackground: PropTypes.bool,
  /**
   * @description ??????????????????
   * @default 'rgba(56, 145, 255, 0.2)'
   */
  backgroundColor: PropTypes.string,
  /**
   * @description ??????????????????
   * @default COLORSPLIT
   */
  colors: PropTypes.object,
  /**
   * @description ??????????????????(????????????????????????, ?????????????????????????????????)
   * @default false
   */
  showShadow: PropTypes.bool,
  /**
   * @description ????????????????????????
   * @default 0
   */
  shadowOffsetX: PropTypes.number,
  /**
   * @description ????????????????????????
   * @default -20
   */
  shadowOffsetY: PropTypes.number,
  /**
   * @description ???????????????
   * @default 0.5
   */
  shadowBlur: PropTypes.number,
  /**
   * @description ??????????????????
   * @default {}
   */
  titleStyle: PropTypes.object,
  /**
   * @description ??????????????????
   * @default {}
   */
  numberStyle: PropTypes.object,
  /**
   * @description ???????????????????????????
   */
  titleMargin: PropTypes.number,
  /**
   * @description ???????????????????????????
   */
  numberMargin: PropTypes.number,
  /**
   * @description ?????????????????????
   */
  maxNum: PropTypes.number,
  /**
   * @description ???????????????????????????
   */
  titleRender: PropTypes.string,
  /**
   * @description ???????????????????????????
   */
  numberRender: PropTypes.string,
};

export default class Component extends ReactComponent {
  static enableLoadCssFile = true;
  // ????????????
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
    return { title: '????????????', percentage: 50 };
  }

  getReactComponent() {
    return Progress;
  }

  setOptions(options = {}, merge = true) {
    const { replaceAll, ...mergeOptions } = options;
    const replaceKeys = ['colors'];
    // ??????????????????????????????
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

    // ????????????
    this.trigger('optionsChange', this.options);

    return this;
  }
}
