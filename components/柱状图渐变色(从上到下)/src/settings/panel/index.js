/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 22:00:47
 * @Description: file content
 */
import React from 'react'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
export default function Index(props) {
  const { options, initialValues, onChange } = props;
  const { lineBackground = [] } = options || {};

  const lineFunc = (e, index, key) => {
    const newLineBackground = lineBackground.map((item, i) => {
      return i === index ? {
        ...item,
        [key]: e
      } : item
    })
    onChange({ lineBackground: newLineBackground })
  }
console.log(lineBackground,'<--lineBackground')
  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="面积颜色" key="1">
          <FormItemGroup layout="vertical">
            {
              lineBackground.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}条线面积颜色`}>
                  <ColorPickerInput onChange={(e) => lineFunc(e, index, 'background')} value={item.background} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
        <CollapsePanel title="字体颜色" key="1">
          <FormItemGroup layout="vertical"  initialValues={initialValues} onValuesChange={onChange}>
            <FormItem label="X轴字体" name="xAxisFontColor">
              <ColorPickerInput gradientMode="gradient" />
            </FormItem>
            <FormItem label="Y轴字体" name="yAxisFontColor">
              <ColorPickerInput gradientMode="gradient" />
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
