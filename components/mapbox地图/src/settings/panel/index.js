/*
 * @Author: Kelly.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 17:06:59
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, InputNumber, ConfigProvider, Radio, Switch } from 'antd';
export default function Index(props) {
  const { initialValues, onChange } = props;
  const { zoom, bearing, pitch, longitude, latitude, initialAnimation, accessToken } = initialValues;

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>

    <CollapsePanel title="Zoom" key="1">
      <FormItem>
        <Input value={zoom} onChange={(value) => onChange({ zoom:  Number(value.target.value) })} />
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Bearing" key="2">
      <FormItem>
        <Input value={bearing} onChange={(value) => onChange({ bearing:  Number(value.target.value) })} />
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Pitch" key="3">
      <FormItem>
        <Input value={pitch} onChange={(value) => onChange({ pitch:  Number(value.target.value) })} />
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Longitude" key="4">
      <FormItem>
        <Input value={longitude} onChange={(value) => onChange({ longitude:  parseFloat(value.target.value) })} />
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Latitude" key="5">
      <FormItem>
        <Input value={latitude} onChange={(value) => onChange({ latitude:  parseFloat(value.target.value) })} />
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Initial Animation" key="6">
      <FormItem>
        <Radio.Group onChange={(value) => onChange({ initialAnimation: value.target.value })} value={initialAnimation}>
          <Radio value={true}>开启</Radio>
          <Radio value={false}>关闭</Radio>
        </Radio.Group>
      </FormItem>
    </CollapsePanel>
    <CollapsePanel title="Access Token" key="0">
      <FormItem>
        <Input value={accessToken} onChange={(value) => onChange({ accessToken: value.target.value })} />
      </FormItem>
    </CollapsePanel>
    </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
