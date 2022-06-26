import React from 'react';
import { ComponentOptionsSetting } from 'datavi-editor/templates';

import {
  Tooltip,
  Options,
  Data,
  recursionOptions,
  ChartProvider,
  FormItemGroup,
  FormItem,
  Collapse,
  CollapsePanel,
  Theme,
  ANTPREFIX,
  Label,
} from '@cloudwise-fe/chart-panel';
import { ConfigProvider, Slider, Select } from 'antd';
import RangeColor from './RangeColor';

export const LINETYPE = {
  solid: '实线',
  dashed: '虚线',
  dotted: '点',
};

export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true;

  constructor(props) {
    super(props);
    let options = props.options;
    this.state = {
      title: options.title,
      style: options.style,
    };
  }

  updateOptionsByKey = (options, key) => {
    let finallyOption = options;
    if (key) {
      finallyOption = {
        [key]: finallyOption,
      };
    }
    this.updateOptions(finallyOption);
  };

  getTabs() {
    const options = recursionOptions(this.props.options, true);
    const {
      tooltip = {},
      color = [],
      transferSeriesData,
      label,
      line,
      rangeColor,
    } = options;

    console.log(options);
    return {
      normal: {
        label: '基础',
        content: () => (
          <ChartProvider>
            <ConfigProvider prefixCls={ANTPREFIX}>
              <Collapse>
                <CollapsePanel key="1" title="基础设置">
                  <Theme
                    values={color}
                    onChange={(changeColor) =>
                      this.updateOptionsByKey(changeColor.color, 'color')
                    }
                  />
                </CollapsePanel>
                <CollapsePanel key="4" title="区间设置">
                  <RangeColor
                    rangeColor={rangeColor}
                    onChange={(colors) =>
                      this.updateOptionsByKey(colors, 'rangeColor')
                    }
                  />
                </CollapsePanel>
              </Collapse>
            </ConfigProvider>
          </ChartProvider>
        ),
      },
      map: {
        label: '元素',
        content: () => (
          <ChartProvider>
            <ConfigProvider prefixCls={ANTPREFIX}>
              <Collapse>
                <CollapsePanel key="1" title="字符设置">
                  <Label
                    tooltipPrefix="label"
                    values={label}
                    onChange={(changeValues) =>
                      this.updateOptionsByKey(changeValues, 'label')
                    }
                    useDistance
                    precision={false}
                    rect={false}
                  />
                </CollapsePanel>
                <CollapsePanel key="2" title="线段设置">
                  <FormItemGroup
                    initialValues={line}
                    onValuesChange={(changeValues) =>
                      this.updateOptionsByKey(changeValues, 'line')
                    }
                  >
                    <FormItem name="type" label="类型">
                      <Select placeholder="选择线类型">
                        {Object.entries(LINETYPE).map(([key, value]) => (
                          <Select.Option value={key} key={key}>
                            {value}
                          </Select.Option>
                        ))}
                      </Select>
                    </FormItem>
                    <FormItem name="curveness" label="曲度">
                      <Slider step={0.1} min={0} max={1} />
                    </FormItem>
                    <FormItem name="opacity" label="透明度">
                      <Slider step={0.1} min={0} max={1} />
                    </FormItem>
                  </FormItemGroup>
                </CollapsePanel>
              </Collapse>
            </ConfigProvider>
          </ChartProvider>
        ),
      },
      tooltip: {
        label: '提示框',
        content: () => (
          <Tooltip
            values={tooltip}
            border={false}
            font={false}
            position={false}
            trigger={false}
            triggerOn={false}
            onChange={(options) => this.updateOptionsByKey(options, 'tooltip')}
          />
        ),
      },
      extend: {
        label: '自定义',
        content: () => (
          <Options
            preview={false}
            setOptions={false}
            values={options}
            onChange={(options, allValues, replaceAll = true) =>
              this.updateOptionsByKey({ ...options, replaceAll })
            }
          />
        ),
      },
      data: {
        label: '数据',
        content: () => (
          <Data
            values={{ transferSeriesData }}
            onChange={(options) => {
              this.updateOptionsByKey(options);
            }}
          />
        ),
      },
    };
  }
}
