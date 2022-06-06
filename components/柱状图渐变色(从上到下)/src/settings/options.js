/*
 * @Author: Rise.Hao
 * @Date: 2022-05-11 22:53:50
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 21:33:08
 * @Description: file content
 */

'use strict';

import React from 'react';
import Base from './panel/index.js'
import { cloneDeep } from "data-vi/helpers";
import { recursionOptions } from '@cloudwise-fe/chart-panel'
import { ComponentOptionsSetting } from 'datavi-editor/templates';
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
    console.log(options,'===', this.props, '===', cloneDeep(component.getOptions()))
    return {
      config: {
        label: '配置',
        content: () => <Base initialValues={options}  data={component.getData()} props={this.props} options={cloneDeep(component.getOptions())} onChange={updateOptions} />,
      },
    }
  }
}
