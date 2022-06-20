/*
 * @Author: Kelly.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 17:06:59
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, InputNumber, ConfigProvider, Radio } from 'antd';
export default function Index(props) {
  const { initialValues, onChange } = props;
  const { radio, lineColor, fontSize, show } = initialValues;

  const lineAreaColorsFunc = (e, index) => {
    const newLineBackground = lineColor.map((item, i) => {
      return i === index ? e : item
    })
    onChange({ lineColor: newLineBackground })
  }

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="图例显隐" key="3">
        <FormItem>
            <Radio.Group onChange={(value) => onChange({ show: value.target.value })} value={show}>
              <Radio value={1}>显示</Radio>
              <Radio value={2}>隐藏</Radio>
            </Radio.Group>
          </FormItem>
        </CollapsePanel>
        <CollapsePanel title="字体大小" key="1">
          <InputNumber value={fontSize} onChange={(value) => onChange({ fontSize: value })} />
        </CollapsePanel>
        <CollapsePanel title="面积颜色" key="2">
          <FormItem>
            <Radio.Group onChange={(value) => onChange({ radio: value.target.value })} value={radio}>
              <Radio value={1}>开启</Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </FormItem>
          <FormItemGroup layout="vertical">
            {
              lineColor.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}个面积颜色`}>
                  <ColorPickerInput forceGradient onChange={(e) => lineAreaColorsFunc(e, index)} value={item} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
