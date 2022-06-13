/*
 * @Author: Rise.Hao
 * @Date: 2022-03-29 11:09:16
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-03 13:55:56
 * @Description: file content
 */

import React from 'react';
import { ComponentOptionsSetting } from 'datavi-editor/templates';
import { recursionOptions } from '@cloudwise-fe/chart-panel'
import { cloneDeep } from "data-vi/helpers";
import Base from './panel/index.js'
export default class OptionsSetting extends ComponentOptionsSetting {
  constructor(props) {
    super(props)
  }
  // 可自定义样式: 若您在设置面板中书写样式会抽离出setting.css.
  // 显式的将以下属性设置为true可告知飞鱼来加载您的样式文件
  enableLoadCssFile = true;
  
  getTabs() {
  const options = recursionOptions(this.props.options, true)
    const {component, updateOptions} = this.props;
    return {
      config: {
        label: '配置',
        content: () => <Base initialValues={options}  props={this.props} options={cloneDeep(component.getOptions())} onChange={updateOptions} />,
      },
    }
  }
}
