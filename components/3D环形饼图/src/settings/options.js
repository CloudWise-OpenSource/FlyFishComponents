
'use strict';

import React from 'react';
import {
    ComponentOptionsSetting,
} from 'datavi-editor/templates';
import Base from './panel/index.js'
import { recursionOptions } from '@cloudwise-fe/chart-panel'
export default class OptionsSetting extends ComponentOptionsSetting {
  constructor(props) {
    super(props)
  }
  
  enableLoadCssFile = true;
  getTabs() {
    const options = recursionOptions(this.props.options, true);
    const { updateOptions, data } = this.props;
    return {
      config: {
        label: '配置',
        content: () => <Base initialValues={options} onChange={updateOptions} />,
      },
    };
  }
}
