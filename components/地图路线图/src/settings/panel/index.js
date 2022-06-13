/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-13 11:06:47
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { ConfigProvider } from 'antd';
export default function Index(props) {
  const {options, onChange} = props;
  const { lineColorsList = [] } = options || {}

  const lineFunc = (e,index) => {
    const newLineBackground = lineColorsList.map((item, i)=>{
      return i === index ? e : item
    })
    onChange({lineColorsList: newLineBackground})
  }

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="线条颜色" key="1">
          <FormItemGroup layout="vertical">
            {
              lineColorsList.map((item, index) => {
                return <FormItem key={`background${index}`} label={`第${index + 1}条线面积颜色`}>
                  <ColorPickerInput forceGradient onChange={(e)=>lineFunc(e,index)} value={item} gradientMode="gradient" />
                </FormItem>
              })
            }
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
