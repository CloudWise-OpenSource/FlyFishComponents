import React from 'react';
import {
  ChartProvider,
  FormItemGroup,
  FormItem,
  Collapse,
  CollapsePanel,
  RadioBooleanGroup,
  Font,
  ColorPickerInput,
  Border,
  Shadow,
  FormCodeModal,
} from '@cloudwise-fe/chart-panel';
import { InputNumber, Input, ConfigProvider, Select } from 'antd';
import ColorModal from './ColorModal';
import { NUMBERPLACEMENTMAP, PLACEMENTMAP } from '../constant';

ConfigProvider.config({
  prefixCls: 'ant4',
});

const Option = Select.Option;

const Appearance = ({
  titleStyle = {},
  numberStyle = {},
  border = {},
  shadow = {},
  base = {},
  colors,
  maxNum,
  titleRender,
  numberRender,
  onChange,
}) => {
  return (
    <ChartProvider>
      <ConfigProvider prefixCls="ant4">
        <Collapse>
          <CollapsePanel key="1" title="位置尺寸设置">
            <FormItemGroup
              initialValues={base}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="height" label="高度">
                <InputNumber min={0} placeholder="请输入进度条高度" />
              </FormItem>
              <FormItem
                name="fill"
                label="是否充满"
                tooltip="若设置填充, 阴影失效"
              >
                <RadioBooleanGroup />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
          <CollapsePanel key="2" title="填充设置">
            <FormItemGroup
              initialValues={base}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="showBackground" label="显示背景">
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="backgroundColor" label="背景色">
                <ColorPickerInput forceGradient />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
          <CollapsePanel key="3" title="标题字符设置">
            <FormItemGroup
              initialValues={titleStyle}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="showTitle" label="是否展示">
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="placement" label="标题位置">
                <Select placeholder="请选择标题位置">
                  {Object.entries(PLACEMENTMAP).map(([key, label]) => (
                    <Option key={key} value={key}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem
                name="titleMargin"
                label="右边距"
                tooltip="当位置为上方下方时为失效状态"
              >
                <InputNumber placeholder="请输入右边距" />
              </FormItem>
            </FormItemGroup>
            <FormItemGroup
              initialValues={titleStyle}
              onValuesChange={(changeValues) =>
                onChange({ titleStyle: changeValues })
              }
            >
              <FormItem name="width" label="宽度">
                <InputNumber placeholder="请输入宽度" />
              </FormItem>
            </FormItemGroup>
            <Font
              values={titleStyle}
              onChange={(changeValues) =>
                onChange({ titleStyle: changeValues })
              }
              border={false}
              shadow={false}
              overflow={false}
            />
          </CollapsePanel>
          <CollapsePanel key="4" title="数字字符设置">
            <FormItemGroup
              initialValues={numberStyle}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="showNumber" label="是否展示">
                <RadioBooleanGroup />
              </FormItem>
              <FormItem name="numberPlacement" label="数字位置">
                <Select placeholder="请选择数字位置">
                  {Object.entries(NUMBERPLACEMENTMAP).map(([key, label]) => (
                    <Option key={key} value={key}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem name="addOnFix" label="单位">
                <Input placeholder="请输入数字单位" />
              </FormItem>

              <FormItem
                name="numberMargin"
                label="左边距"
                tooltip="当位置为内部时为失效状态"
              >
                <InputNumber placeholder="请输入左边距" />
              </FormItem>
            </FormItemGroup>
            <FormItemGroup
              initialValues={numberStyle}
              onValuesChange={(changeValues) =>
                onChange({ numberStyle: changeValues })
              }
            >
              <FormItem name="width" label="宽度">
                <InputNumber placeholder="请输入宽度" />
              </FormItem>
            </FormItemGroup>
            <Font
              values={numberStyle}
              onChange={(changeValues) =>
                onChange({ numberStyle: changeValues })
              }
              border={false}
              shadow={false}
              overflow={false}
            />
          </CollapsePanel>
          <CollapsePanel key="5" title="边框设置">
            <FormItemGroup
              initialValues={border}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="border" label="是否展示">
                <RadioBooleanGroup />
              </FormItem>
            </FormItemGroup>
            <Border
              forceGradient
              values={border}
              onChange={(changeValues) => onChange(changeValues)}
            />
          </CollapsePanel>
          <CollapsePanel key="6" title="阴影设置">
            <FormItemGroup
              initialValues={shadow}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="showShadow" label="是否展示">
                <RadioBooleanGroup />
              </FormItem>
            </FormItemGroup>
            <Shadow
              showColor={false}
              values={shadow}
              onChange={(changeValues) => onChange(changeValues)}
              blurProps={{ min: 0, max: 1, step: 0.01 }}
            />
          </CollapsePanel>
          <CollapsePanel key="7" title="其他设置">
            <ColorModal
              colors={colors}
              onChange={(changeValues) => onChange({ colors: changeValues })}
            />
            <FormItemGroup
              style={{ marginTop: 24 }}
              layout="vertical"
              initialValues={{ maxNum, titleRender, numberRender }}
              onValuesChange={(changeValues) => onChange(changeValues)}
            >
              <FormItem name="maxNum" label="最大值" extra="即数值以多少为百值">
                <InputNumber min={0} placeholder="请输入最大值" />
              </FormItem>
              <FormItem
                name="titleRender"
                label="自定义标题"
                extra="参数为当前标题"
              >
                <FormCodeModal stringfiy word="点击设置标题函数" />
              </FormItem>
              <FormItem
                name="numberRender"
                label="自定义标题"
                extra="参数依次为当前数值, 配置单位"
              >
                <FormCodeModal stringfiy word="点击设置标题函数" />
              </FormItem>
            </FormItemGroup>
          </CollapsePanel>
        </Collapse>
      </ConfigProvider>
    </ChartProvider>
  );
};

export default Appearance;
