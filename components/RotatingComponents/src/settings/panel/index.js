/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-01 17:06:59
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, InputNumber, ConfigProvider, Select } from 'antd';
const { Option } = Select;``
export default function Index(props) {
  const { initialValues, onChange } = props;
  const { bigFontSize, smallFontSize, alarmNum, alarmColor } = initialValues;

  const lineAreaColorsFunc = (e, index) => {
    console.log(e, index)
    const newalarmColor = alarmColor;
    newalarmColor[index].color = e
    console.log(newalarmColor)
    onChange({ alarmColor: newalarmColor })
  }
  console.log(alarmColor, 'alarmColor===>')
  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="字体大小" key="1">
          <FormItem>
            <InputNumber value={bigFontSize} onChange={(value) => onChange({ bigFontSize: value })} />
          </FormItem>
          <FormItem>
            <InputNumber value={smallFontSize} onChange={(value) => onChange({ smallFontSize: value })} />
          </FormItem>
        </CollapsePanel>
        <CollapsePanel title="告警颜色" key="2">
          {/* <FormItem label="告警数量">
            <Select onChange={(value) => {
              const newC = alarmColor.slice(value, 5)
              console.log(newC, 'newC===>')
              onChange({ alarmNum: value, alarmColor: [] })
            }} value={alarmNum}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
          </FormItem> */}
          <FormItemGroup layout="vertical">
            {
              alarmColor.map((item, index) => {
                return <FormItem key={`background${index}`} label={`大于${item.num}水波球颜色`}>
                  <InputNumber value={item.num} onChange={(value) => {
                    alarmColor[index].num = value
                    onChange({ alarmColor: alarmColor })
                  }
                  } />
                  <ColorPickerInput forceGradient onChange={(e) => lineAreaColorsFunc(e, index)} value={item.color} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
