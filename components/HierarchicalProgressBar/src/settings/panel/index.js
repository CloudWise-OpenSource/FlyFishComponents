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
  const { max, showStatus, scheduleOne, scheduleTow } = initialValues;

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="数据MAX值" key="1">
          <FormItem>
            <InputNumber value={max} onChange={(value) => onChange({ max: value })} />
          </FormItem>
        </CollapsePanel>
        <CollapsePanel title="颜色设置" key="2">
          <FormItemGroup layout="vertical">
            <FormItem key={"background"} label="是否使用分层背景颜色">
              <Radio.Group onChange={value => onChange({ showStatus: value.target.value })} value={showStatus}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </FormItem>
          </FormItemGroup>
          <FormItemGroup layout="vertical">
            <FormItem label="线条颜色" name="schedule">
              <ColorPickerInput gradientMode="gradient" value={scheduleTow} onChange={(value) => onChange({ scheduleTow: value })} />
              <ColorPickerInput gradientMode="gradient" value={scheduleOne} onChange={(value) => onChange({ scheduleOne: value })} />
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
