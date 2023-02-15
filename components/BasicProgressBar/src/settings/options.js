import React from 'react';
import { ComponentOptionsSetting } from 'datavi-editor/templates';
import { recursionOptions } from '@cloudwise-fe/chart-panel';

import Appearance from './Appearance';
import { COLORSPLIT } from '../constant';

const DEFAULTFONT = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 28,
  color: '#60bdff',
};
export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true;
  constructor(props) {
    super(props);
  }

  generateOptions = () => {
    console.log(this.props);
    const {
      fill,
      showTitle,
      placement,
      border,
      borderType,
      borderColor,
      borderWidth,
      borderRadius,
      showNumber,
      numberPlacement,
      height,
      showBackground,
      backgroundColor,
      colors = COLORSPLIT,
      showShadow,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      titleStyle,
      numberStyle,
      titleMargin,
      numberMargin,
      addOnFix,
      maxNum,
      titleRender,
      numberRender,
    } = recursionOptions(this.props.options, true);
    const borderStyle = {
      border,
      borderType,
      borderColor,
      borderWidth,
      borderRadius,
    };
    const shadow = {
      showShadow,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
    };
    const base = {
      showBackground,
      backgroundColor,
      fill,
      height,
    };
    const mergeTitleStyle = {
      ...DEFAULTFONT,
      ...titleStyle,
      titleMargin,
      showTitle,
      placement,
    };
    const mergeNumberStyle = {
      ...DEFAULTFONT,
      color: '#fff',
      ...numberStyle,
      numberMargin,
      showNumber,
      numberPlacement,
      addOnFix,
    };
    return {
      titleStyle: mergeTitleStyle,
      numberStyle: mergeNumberStyle,
      border: borderStyle,
      shadow,
      base,
      colors,
      maxNum,
      titleRender,
      numberRender,
    };
  };

  /**
   * 获取Tabs项
   */
  getTabs() {
    const props = this.generateOptions();
    return {
      config: {
        label: '基础',
        content: () => (
          <Appearance {...props} onChange={this.props.updateOptions} />
        ),
      },
    };
  }
}
