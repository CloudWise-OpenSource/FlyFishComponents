/*
 * @Author: Kelly.Hao
 * @Date: 2022-06-17 10:57:22
 * @LastEditors: Kelly.Hao
 * @LastEditTime: 2022-06-01 16:52:54
 * @Description: file content
 */

'use strict';

import React from 'react';
import Base from './panel/index.js'
import { recursionOptions } from '@cloudwise-fe/chart-panel'
import { ComponentOptionsSetting } from 'datavi-editor/templates';
export default class OptionsSetting extends ComponentOptionsSetting {
  constructor(props) {
    super(props)
  }
  
  // 可自定义样式: 若您在设置面板中书写样式会抽离出setting.css.
  // 显式的将以下属性设置为true可告知飞鱼来加载您的样式文件
  enableLoadCssFile = true;

  getTabs() {
    const options = recursionOptions(this.props.options, true);
    const { updateOptions } = this.props;
    return {
      config: {
        label: '配置',
        content: () => <Base initialValues={options} onChange={updateOptions} />,
      },
    }
  }
}
