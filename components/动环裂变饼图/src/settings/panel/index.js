/*
 * @Author: Kelly.Hao
 * @Date: 2022-07-05 13:33:05
 * @LastEditors: Kelly.Hao
 * @LastEditTime: 2022-07-05 17:06:59
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Radio, InputNumber, ConfigProvider } from 'antd';
export default function Index(props) {
  const { initialValues, onChange } = props;
  const { wide, fontSizeMax, fontSizeMin, wideColor } = initialValues;

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="环形设置" key="1">
          <FormItem label="字体大小">
            <InputNumber value={fontSizeMax} onChange={(value) => onChange({ fontSizeMax: value })} />
            <InputNumber value={fontSizeMin} onChange={(value) => onChange({ fontSizeMin: value })} />
          </FormItem>
          <FormItem label="外环宽度">
            <InputNumber value={wide} onChange={(value) => onChange({ wide: value })} />
          </FormItem>
          <FormItem label="环形颜色">
            <ColorPickerInput gradientMode="gradient" value={wideColor} onChange={(value) => onChange({ wideColor: value })} />
          </FormItem>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
