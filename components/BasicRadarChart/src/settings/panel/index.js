/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-05 22:27:36
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
export default function Index(props) {
  const {options, onChange} = props;
  const { colors = [], areaColors = [] } = options || {}

  const lineColorsFunc = (e,index) => {
    const newLineBackground = colors.map((item, i)=>{
      return i === index ? e : item
    })
    onChange({colors: newLineBackground})
  }

  const lineAreaColorsFunc = (e,index) => {
    const newLineBackground = areaColors.map((item, i)=>{
      return i === index ? e : item
    })
    onChange({areaColors: newLineBackground})
  }

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="线条颜色" key="1">
          <FormItemGroup layout="vertical">
            {
              colors.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}条线面积颜色`}>
                  <ColorPickerInput forceGradient onChange={(e)=>lineColorsFunc(e,index)} value={item} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
        <CollapsePanel title="面积颜色" key="2">
          <FormItemGroup layout="vertical">
            {
              areaColors.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}条线面积颜色`}>
                  <ColorPickerInput forceGradient onChange={(e)=>lineAreaColorsFunc(e,index)} value={item} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
