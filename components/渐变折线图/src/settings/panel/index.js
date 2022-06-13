/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-13 11:10:11
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
export default function Index(props) {
  const {options, onChange} = props;
  const { lineBackgroundList = [] } = options || {}

  const lineFunc = (e,index,key) => {
    const newLineBackground = lineBackgroundList.map((item, i)=>{
      return i === index ? {
        ...item,
        [key]: e
       } : item
    })
    onChange({lineBackgroundList: newLineBackground})
  }

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="面积颜色" key="1">
          <FormItemGroup layout="vertical">
            {
              lineBackgroundList.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}条线面积颜色`}>
                  <ColorPickerInput onChange={(e)=>lineFunc(e,index,'background')} value={item.background} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
        <CollapsePanel title="线条颜色" key="2">
          <FormItemGroup layout="vertical">
            {
              lineBackgroundList.map((item, index) => {
                return <FormItem key={`lineColor${index}`} label={`第${index + 1}条线颜色`}>
                  <ColorPickerInput onChange={(e)=>lineFunc(e,index,'lineColor')} value={item.lineColor} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
