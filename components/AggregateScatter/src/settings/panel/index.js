/*
 * @Author: Rise.Hao
 * @Date: 2022-05-29 13:33:05
 * @LastEditors: Rise.Hao
 * @LastEditTime: 2022-06-03 14:06:49
 * @Description: file content
 */
import React from 'react'
import { ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, ColorPickerInput } from '@cloudwise-fe/chart-panel'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
export default function Index(props) {
  const { initialValues, onChange, options} = props;
  const { statusColor = [] } = options || {}
  
  const statusColorFunc = (e,index) => {
    const newStatusColor = statusColor.map((item, i)=>{
      return i === index ? e : item
    })
    console.log(newStatusColor,'<--newStatusColor')
    onChange({statusColor: newStatusColor})
  }

  return <ChartProvider>
    <ConfigProvider prefixCls="ant4">
      <Collapse>
        <CollapsePanel title="样式" key="1">
          <FormItemGroup layout="vertical"  initialValues={initialValues} onValuesChange={onChange}>
            <FormItem label="字体大小" name="fontSize">
              <InputNumber />
            </FormItem>
            <FormItem label="坐标线粗细" name="lineWidth">
              <InputNumber />
            </FormItem>
            <FormItem label="低点颜色">
              <ColorPickerInput forceGradient gradientMode="gradient" value={statusColor[0]} onChange={(e)=> statusColorFunc(e, 0)} />
            </FormItem>
            <FormItem label="高点颜色">
              <ColorPickerInput forceGradient gradientMode="gradient" value={statusColor[1]} onChange={(e)=> statusColorFunc(e, 1)}/>
            </FormItem>
          </FormItemGroup>
        </CollapsePanel>
      </Collapse>
    </ConfigProvider>
  </ChartProvider>
}
