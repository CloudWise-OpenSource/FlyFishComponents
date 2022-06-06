/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 17:06:59
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
export default function Index(props) {
  const { initialValues, onChange} = props;
  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="颜色" key="1">
          <FormItemGroup layout="vertical"  initialValues={initialValues} onValuesChange={onChange}>
            <FormItem label="面积颜色" name="background">
              <ColorPickerInput gradientMode="gradient" />
            </FormItem>
            <FormItem label="线条颜色" name="lineColor">
              <ColorPickerInput gradientMode="gradient" />
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
