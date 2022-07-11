import React from 'react'
import { ComponentOptionsSetting } from 'datavi-editor/templates'
import {
	FormCodeModal,
	ChartProvider,
	FormItemGroup,
	FormItem,
	Collapse,
	CollapsePanel,
	RadioBooleanGroup,
	Font,
  assembleFunction,
} from '@cloudwise-fe/chart-panel'
import { InputNumber, Input, ConfigProvider, Select } from 'antd'

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
				label: '其他',
				content: () => this.otherPanel(),
			},
		}
	}

	/**
	 * 配置其他
	 */
	otherPanel() {
		const { 
			options: { 
				finalFormatTime, 
				style, 
				...options
			}, 
			updateOptions 
		} = this.props;
		const defaultStyle = {
			fontSize: 28,
			color: '#fff',
			fontStyle: 'normal',
			lineHeight: 1.5,
			fontWeight: 'normal'
		}
		const initialValues = {
			...options,
			style: {
				...defaultStyle,
				...style,
			},
      		finalFormatTime: assembleFunction(finalFormatTime)
    	}
    
		return (
			<ChartProvider>
				<ConfigProvider prefixCls="ant4">
					<Collapse>
						<CollapsePanel title="显示设置" key="1">
							<FormItemGroup
								onValuesChange={(changeValues) => updateOptions(changeValues.finalFormatTime ? { finalFormatTime: String(changeValues.finalFormatTime) } : changeValues)}
								initialValues={initialValues}
							>
								<FormItem name="useCurrent" label="是否使用当前">
									<RadioBooleanGroup />
								</FormItem>
                <FormItem name="showWeek" label="是否展示星期">
									<RadioBooleanGroup />
								</FormItem>
								<FormItem name="interval" label="是否自动更新">
									<RadioBooleanGroup />
								</FormItem>
								<FormItem name="breakLine" label="是否折行展示">
									<RadioBooleanGroup />
								</FormItem>
								<FormItem name="gutter" label="元素间隔">
									<InputNumber placeholder="请输入元素间隔" min={0} />
								</FormItem>
							</FormItemGroup>
						</CollapsePanel>
						<CollapsePanel title="字符设置" key="2">
							<Font
								shadow={false}
								border={false}
								overflow={false}
								values={initialValues.style}
								onChange={(changeValues) =>
									updateOptions({ style: changeValues })
								}
							/>
						</CollapsePanel>
						<CollapsePanel title="其他设置" key="3">
							<FormItemGroup
								onValuesChange={(changeValues) => updateOptions(changeValues)}
								initialValues={initialValues}
							>
								<FormItem name="weekAddon" label="星期前缀">
									<Input placeholder="请输入星期前缀" />
								</FormItem>
								<FormItem
									name="formatType"
									label="时间格式"
									tooltip="自定义示例：'YYYY年MM月DD日' | 'YYYY/MM/DD' | 'YYYY-MM-DD'"
								>
									<Input placeholder="请输入时间格式" />
								</FormItem>
								<FormItem name="style" label="定义样式">
									<FormCodeModal word="定义样式" mode="json" />
								</FormItem>
								<FormItem
									name="finalFormatTime"
									label="格式函数"
									tooltip="函数两个参数分别为格式化后的时间数组和dayjs实例([time, week], dayjs)"
								>
									<FormCodeModal word="格式函数" mode="javascript" />
								</FormItem>
							</FormItemGroup>
						</CollapsePanel>
					</Collapse>
				</ConfigProvider>
			</ChartProvider>
		)
	}
}
