import React from 'react';
import {
  ChartProvider,
  FormItemGroup,
  FormItem,
  CollapsePanel,
  Collapse,
  RadioBooleanGroup,
  ColorPickerInput,
  FormCodeModal,
  Border,
} from '@cloudwise-fe/chart-panel';
import { ConfigProvider, InputNumber } from 'antd';

const Base = ({ initialValues, onChange }) => {
  return (
    <ChartProvider>
      <ConfigProvider prefixCls="ant4">
        <Collapse>
          <CollapsePanel title="位置与尺寸设置" key="1">
            <FormItemGroup
              initialValues={initialValues}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="titleHeight" label="表头高度">
                <InputNumber placeholder="请输入表头高度" min={0} />
              </FormItem>
              <FormItem name="titleStatus" label="显示表头">
                <RadioBooleanGroup />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
          <CollapsePanel title="通用样式设置" key="2">
            <FormItemGroup
              initialValues={initialValues}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem
                name="defaultTheme"
                label="默认样式"
                tooltip="若设置会应用初始样式, 取消则只会有骨架样式"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem
                name="ellipsis"
                label="文字省略"
                tooltip="若设置则标题和单元格在超出设置长度之后会自动省略"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem
                name="center"
                label="居中"
                tooltip="若设置则标题和单元格自定居中"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem
                name="salmonSingle"
                label="双色表格"
                tooltip="若设置则会跳格变色"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="salmon" label="奇数颜色">
                <ColorPickerInput forceGradient />
              </FormItem>
              <FormItem name="salmonS" label="偶数颜色">
                <ColorPickerInput forceGradient />
              </FormItem>
              <FormItem
                name="verticalSalmonSingle"
                label="垂直双色表格"
                tooltip="若设置则会跳列变色"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="verticalSalmon" label="奇数颜色">
                <ColorPickerInput forceGradient />
              </FormItem>
              <FormItem name="verticalSalmonS" label="偶数颜色">
                <ColorPickerInput forceGradient />
              </FormItem>
              <FormItem name="titleStyle" label="表头样式">
                <FormCodeModal mode="json" word="设置表头样式" />
              </FormItem>
              <FormItem name="itemStyle" label="元素样式">
                <FormCodeModal mode="json" word="设置元素样式" />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
          <CollapsePanel title="动画设置" key="3">
            <FormItemGroup
              initialValues={initialValues}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="scrollingNumber" label="渲染条数">
                <InputNumber placeholder="请输入渲染条数" />
              </FormItem>
              <FormItem name="scrollingSpeed" label="执行速度">
                <InputNumber placeholder="请输入定时器执行速度" min={200} />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
          <CollapsePanel title="气泡设置" key="4">
            <FormItemGroup
              initialValues={initialValues}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem
                name="tooltip"
                label="气泡弹窗"
                tooltip="若担心数据不展示完全, 可开启"
              >
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="tooltipBackground" label="气泡背景色">
                <ColorPickerInput gradientMode="gradient" />
              </FormItem>
            </FormItemGroup>
            <Border
              values={initialValues}
              onChange={(changeValues) => onChange(changeValues)}
            />
          </CollapsePanel>
        </Collapse>
      </ConfigProvider>
    </ChartProvider>
  );
};

export default Base;
