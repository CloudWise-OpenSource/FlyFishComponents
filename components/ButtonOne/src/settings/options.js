import React from 'react'
import {
  ComponentOptionsSetting,
} from 'datavi-editor/templates'
import { FormCodeModal, ChartProvider, FormItem, FormItemGroup, CollapsePanel, Collapse, recursionOptions, Font, RadioBooleanGroup } from '@cloudwise-fe/chart-panel'
import { Input, Select, ConfigProvider, InputNumber } from 'antd';
import './index.less'
const { TextArea } = Input;
const { Option } = Select;

const TEXTALIGN = {
  'center': '居中',
  left: '居左',
  right: '居右'
}

const prefix = 'ant4';
export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true
  constructor(props) {
    super(props)
  }

  /**
   * 获取Tabs项
   */
  getTabs() {
    return {
      config: {
        label: '配置',
        content: () => this.renderButton(),
      },
    }
  }

  /**
   * 渲染按钮
   */
  renderButton() {
    const values = recursionOptions(this.props.options, true)
    return (
      <ChartProvider>
        <ConfigProvider prefixCls={prefix}>
          <Collapse>
            <CollapsePanel key="1" title="内容设置">
              <FormItemGroup layout="vertical" initialValues={values} onValuesChange={options => this.updateOptions(options)}>
                <FormItem label="按钮名称" name="text">
                  <TextArea rows={5} placeholder="请输入按钮名称" />
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
            <CollapsePanel key="2" title="文字设置">
              <Font values={values} overflow={false} shadow={false} border={false} onChange={options => this.updateOptions(options)} />
              <FormItemGroup initialValues={values} onValuesChange={options => this.updateOptions(options)}>
                <FormItem name="textAlign" label="居中方式">
                  <Select placeholder="请选择居中方式">
                    {
                      Object.entries(TEXTALIGN).map(([key, label]) => (
                        <Option key={key} value={key}>{label}</Option>
                      ))
                    }
                  </Select>
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
            <CollapsePanel key="3" title="背景设置">
              <FormItemGroup initialValues={values} onValuesChange={options => this.updateOptions(options)}>
                <FormItem label="高度" name="backgroundHeight" tooltip="非百分比请自行添加px">
                  <Input placeholder="请输入背景高度" />
                </FormItem>
                <FormItem label="宽度" name="backgroundWidth" tooltip="非百分比请自行添加px">
                  <Input placeholder="请输入背景宽度" />
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
            <CollapsePanel key="4" title="其他设置">
              <FormItemGroup initialValues={values} onValuesChange={options => this.updateOptions(options)}>
                <FormItem label="自定义样式" name="style">
                  <FormCodeModal
                    word="自定义样式"
                    mode="css"
                    type="style"
                  />
                </FormItem>
                <FormItem label="点击事件" name="onClick">
                  <FormCodeModal
                    stringfiy
                    word="自定义事件"
                    mode="javascript"
                  />
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
            <CollapsePanel key="5" title="交互设置">
              <FormItemGroup initialValues={values} onValuesChange={options => this.updateOptions(options)}>
                <FormItem label="点击跳转" name="link" tooltip="注意: 若设置跳转则点击方法失效">
                  <RadioBooleanGroup />
                </FormItem>
                <FormItem label="新窗口" name="target">
                  <RadioBooleanGroup />
                </FormItem>
                <FormItem label="跳转地址" name="href">
                  <Input placeholder="请输入跳转地址" />
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
          </Collapse>
        </ConfigProvider>
      </ChartProvider>
    )
  }
}
