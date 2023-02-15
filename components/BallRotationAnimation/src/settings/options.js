/*
 * @Author: Celestine.Gu
 * @Date: 2022-03-10 16:12:30
 * @LastEditors: Celestine.Gu
 * @LastEditTime: 2022-07-11 15:53:57
 * @Description: file content
 */
import React from 'react';
import {
  ComponentOptionsSetting,
  Form,
  FormItemGroup,
  FormItem,
  Input,
} from 'datavi-editor/templates';
import Configure from './Configure/index.js';
import { recursionOptions } from '@cloudwise-fe/chart-panel';
export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true;
  componentDidMount() {
    const { component } = this.props;
    component.bind('draw', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    const { component } = this.props;
    // this.computedSettingStyleAppend(true);
    component.unbind('draw');
  }
  getTabs() {
    // const options = recursionOptions(this.props.options, true);
    const { component, updateOptions, options } = this.props;
    return {
      configure: {
        label: '配置',
        content: () => {
          return (
            <Configure
              data={component.getData()}
              options={options}
              updateOptions={updateOptions}
            ></Configure>
          );
        },
      },
    };
  }
}
