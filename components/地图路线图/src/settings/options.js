/*
 * @Author: Rise.Hao
 * @Date: 2022-03-16 15:27:52
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-05 22:11:53
 * @Description: file content
 */

'use strict';

import React from 'react';
import { ComponentOptionsSetting } from 'datavi-editor/templates'
import { cloneDeep } from "data-vi/helpers";
import { recursionOptions } from '@cloudwise-fe/chart-panel'
import Base from './panel/index.js'
export default class OptionsSetting extends ComponentOptionsSetting {
  constructor(props) {
    super(props)
  }
  
  // 可自定义样式: 若您在设置面板中书写样式会抽离出setting.css.
  // 显式的将以下属性设置为true可告知飞鱼来加载您的样式文件
  enableLoadCssFile = true;

  componentDidMount() {
    const { component } = this.props;
    component.bind('draw', () => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    const { component } = this.props;
    this.computedSettingStyleAppend(true);
    component.unbind('draw');
  }

  getTabs() {
    const options = recursionOptions(this.props.options, true)
    const {component, updateOptions} = this.props;
    return {
      config: {
        label: '配置',
        content: () => <Base initialValues={options}  data={component.getData()} props={this.props} options={cloneDeep(component.getOptions())} onChange={updateOptions} />,
      },
    }
  }
}
