/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-13 10:50:47
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse } from '@cloudwise-fe/chart-panel'
import { Input, ConfigProvider, InputNumber } from 'antd';
export default function Index(props) {
  const { initialValues, onChange, options} = props;

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="样式" key="1">
          <FormItemGroup layout="vertical"  initialValues={initialValues} onValuesChange={onChange}>
          <FormItem label="提示框起点标题" name="startLabel">
              <Input />
            </FormItem>
            <FormItem label="提示框尾点标题" name="endLabel">
              <Input />
            </FormItem>
            <FormItem label="提示框起点文本" name="startText">
              <Input />
            </FormItem>
            <FormItem label="提示框尾点文本" name="endText">
              <Input />
            </FormItem>
            <FormItem label="字体大小" name="fontSize">
              <InputNumber />
            </FormItem>
            <FormItem label="坐标线粗细" name="lineWidth">
              <InputNumber />
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
