/*
 * @Author: Celestine.Gu
 * @Date: 2022-07-06 15:05:50
 * @LastEditors: Celestine.Gu
 * @LastEditTime: 2022-07-11 16:09:10
 * @Description: file content
 */
import React from 'react';
import { InputNumber,ConfigProvider } from 'antd';
import {
  ChartProvider,
  FormItem,
  FormItemGroup,
  CollapsePanel,
  Collapse,
  ColorPickerInput,
} from '@cloudwise-fe/chart-panel';
export default function Index({updateOptions, options}) {
  return (
    <ChartProvider>
      <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="小球动画" key="1">
        <FormItemGroup
            layout="vertical"
            initialValues={options}
            onValuesChange={updateOptions}
          >
            <FormItem label="倾斜角度" name="rotateZ">
              <InputNumber></InputNumber>
            </FormItem>
            <FormItem label="旋转速度" name="time">
            <InputNumber></InputNumber>
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
        <CollapsePanel title="字体配置" key="2">
          <FormItemGroup
            layout="vertical"
            initialValues={options}
            onValuesChange={updateOptions}
          >
            <FormItem label="文字大小" name="fontSize">
              <InputNumber min={12}></InputNumber>
            </FormItem>
            <FormItem label="文字颜色" name="fontColor">
              <ColorPickerInput forceGradient />
            </FormItem>
            <FormItem label="与球体相对的位置" name="marginBottom">
              <InputNumber />
            </FormItem>
            
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
      </ConfigProvider>
    </ChartProvider>
  );
}
