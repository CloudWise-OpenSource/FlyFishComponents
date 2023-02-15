import React from 'react';

import {
  ComponentDataSetting,
  FormItem,
  AutoComplete,
} from 'datavi-editor/templates';

import { map } from 'data-vi/helpers';

export default class DataSetting extends ComponentDataSetting {
  render() {
    const { fields, config, data } = this.props;
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null;
    }
    return (
      <div>
        <FormItem label="数据分组" full>
          <AutoComplete
            placeholder="默认读取name字段"
            dataSource={map(fields, (field) => field.value)}
            value={config.classify}
            onChange={(val) =>
              this.updateConfig({
                classify: val,
              })
            }
          />
        </FormItem>
        <FormItem label="X轴数据" full>
          <AutoComplete
            placeholder="默认读取value字段"
            dataSource={map(fields, (field) => field.value)}
            value={config.x}
            onChange={(val) =>
              this.updateConfig({
                x: val,
              })
            }
          />
        </FormItem>
        <FormItem label="Y轴数据" full>
          <AutoComplete
            placeholder="默认读取label字段"
            dataSource={map(fields, (field) => field.value)}
            value={config.y}
            onChange={(val) =>
              this.updateConfig({
                y: val,
              })
            }
          />
        </FormItem>
      </div>
    );
  }
}
