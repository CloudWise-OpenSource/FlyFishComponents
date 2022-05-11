
'use strict';

import React from 'react';
import {
    ComponentOptionsSetting,
    Form,
    FormItemGroup,
    FormItem,
    Input,
    ColorPickerInput,
    InputNumber
} from 'datavi-editor/templates';
import _ from 'lodash'
import './option.css'
export default class OptionsSetting extends ComponentOptionsSetting {
    
  getTabs() {
    const {options={},updateOptions} = this.props
    
    return {
      series:{
        label:'系列',
        content:()=>(
          <Form>
            <FormItem label='流速颜色'>
              <ColorPickerInput value={options.series[0].areaStyle.color} onChange={color=>updateOptions({series:_.merge(options.series,[{areaStyle:{color},lineStyle:{color}}])})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='降水量颜色'>
              <ColorPickerInput value={options.series[1].areaStyle.color} onChange={color=>updateOptions({series:_.merge(options.series,[{},{areaStyle:{color},lineStyle:{color}}])})} ></ColorPickerInput>
            </FormItem>
          </Form>
        )
      },
      tooltip:{
        label:'指示器',
        content:()=>(
          <Form>
            <FormItem label='背景颜色'>
              <ColorPickerInput value={options.tooltip.backgroundColor} onChange={backgroundColor=>updateOptions({tooltip:{...options.tooltip,backgroundColor}})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='宽度'>
              <InputNumber style={{width:'100%'}} value={options.tooltip.width} onChange={width=>updateOptions({tooltip:{...options.tooltip,width}})}></InputNumber>
            </FormItem>
            <FormItem label='高度'>
              <InputNumber style={{width:'100%'}} value={options.tooltip.height} onChange={height=>updateOptions({tooltip:{...options.tooltip,height}})}></InputNumber>
            </FormItem>
          </Form>
        )
      },
      axis:{
        label:'x/y轴样式',
        content:()=>(
          <Form>
            <FormItem label='x轴字体颜色'>
              <ColorPickerInput value={options.xAxis.axisLabel.color} onChange={color=>updateOptions({xAxis:_.merge(options.xAxis,{axisLabel:{color}})})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='x轴字体大小'>
              <InputNumber style={{width:'100%'}} value={options.xAxis.axisLabel.fontSize} onChange={fontSize=>updateOptions({xAxis:_.merge(options.xAxis,{axisLabel:{fontSize}})})} ></InputNumber>
            </FormItem>
            <FormItem label='x轴字体字重'>
              <InputNumber style={{width:'100%'}}  value={options.xAxis.axisLabel.fontWeight} onChange={fontWeight=>updateOptions({xAxis:_.merge(options.xAxis,{axisLabel:{fontWeight}})})} ></InputNumber>
            </FormItem>
            <FormItem label='x轴线条粗细'>
              <InputNumber style={{width:'100%'}}  value={options.xAxis.axisLine.lineStyle.width} onChange={width=>updateOptions({xAxis:_.merge(options.xAxis,{axisLine:{lineStyle:{width}}})})} ></InputNumber>
            </FormItem>
            <FormItem label='x轴线条颜色'>
              <ColorPickerInput value={options.xAxis.axisLine.lineStyle.color} onChange={color=>updateOptions({xAxis:_.merge(options.xAxis,{axisLine:{lineStyle:{color}}})})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='y轴字体颜色'>
              <ColorPickerInput value={options.yAxis.axisLabel.color} onChange={color=>updateOptions({yAxis:_.merge(options.yAxis,{axisLabel:{color}})})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='y轴字体大小'>
              <InputNumber style={{width:'100%'}} value={options.yAxis.axisLabel.fontSize} onChange={fontSize=>updateOptions({yAxis:_.merge(options.yAxis,{axisLabel:{fontSize}})})} ></InputNumber>
            </FormItem>
            <FormItem label='y轴字体字重'>
              <InputNumber style={{width:'100%'}}  value={options.yAxis.axisLabel.fontWeight} onChange={fontWeight=>updateOptions({yAxis:_.merge(options.yAxis,{axisLabel:{fontWeight}})})} ></InputNumber>
            </FormItem>
            <FormItem label='y轴线条粗细'>
              <InputNumber style={{width:'100%'}}  value={options.yAxis.axisLine.lineStyle.width} onChange={width=>updateOptions({yAxis:_.merge(options.yAxis,{axisLine:{lineStyle:{width}}})})} ></InputNumber>
            </FormItem>
            <FormItem label='y轴线条颜色'>
              <ColorPickerInput value={options.yAxis.axisLine.lineStyle.color} onChange={color=>updateOptions({yAxis:_.merge(options.yAxis,{axisLine:{lineStyle:{color}}})})} ></ColorPickerInput>
            </FormItem>
          </Form>
        )
      },
      legend:{
        label:'图例',
        content:()=>(
          <Form>
            <FormItem label='上距离'>
              <InputNumber value={options.legend.top} onChange={top=>{console.log(top);updateOptions({legend:{...options.legend,top}})}} ></InputNumber>
            </FormItem>
            <FormItem label='下距离'>
              <InputNumber value={options.legend.bottom} onChange={bottom=>updateOptions({legend:{...options.legend,bottom}})} ></InputNumber>
            </FormItem>
            <FormItem label='左距离'>
              <InputNumber value={options.legend.left} onChange={left=>updateOptions({legend:{...options.legend,left}})} ></InputNumber>
            </FormItem>
            <FormItem label='右距离'>
              <InputNumber value={options.legend.right} onChange={right=>updateOptions({legend:{...options.legend,right}})} ></InputNumber>
            </FormItem>
            <FormItem label='字体颜色'>
              <ColorPickerInput value={options.legend.textStyle.color} onChange={color=>updateOptions({legend:_.merge(options.legend,{textStyle:{color}})})} ></ColorPickerInput>
            </FormItem>
            <FormItem label='字体大小'>
              <InputNumber style={{width:'100%'}} value={options.legend.textStyle.fontSize} onChange={fontSize=>updateOptions({legend:_.merge(options.legend,{textStyle:{fontSize}})})} ></InputNumber>
            </FormItem>
            <FormItem label='字体字重'>
              <InputNumber style={{width:'100%'}} value={options.legend.textStyle.fontWeight} onChange={fontWeight=>updateOptions({legend:_.merge(options.legend,{textStyle:{fontWeight}})})} ></InputNumber>
            </FormItem>
          </Form>
        )
      }
    };
  }
}
