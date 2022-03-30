import React from 'react'
import {
	ComponentOptionsSetting,
	Form,
	Select,
	FormItemGroup,
	ColorPickerInput,
	InputNumber,
	FormItem,
	Input,
	Radio,
	Button,
} from 'datavi-editor/templates'
import { FormCodeModal, ChartProvider } from '@cloudwise-fe/chart-panel'
import './index.less'
const { TextArea } = Input
export default class OptionsSetting extends ComponentOptionsSetting {
	enableLoadCssFile = true
	constructor(props) {
		super(props)
		const {
			text,
			isLink,
			hrefUrl,
			isNewWindow,
			color,
			fontSize,
			fontFamily,
			fontWeight,
			backgroundTop,
			top
		} = props.options
		this.state = {
			text,
			isLink,
			hrefUrl,
			isNewWindow,
			color,
			fontFamily,
			fontWeight,
			fontSize,
			visible: false,
			backgroundTop,
			top
		}
	}

	toggleModalVisible = (visible) => {
		this.setState({
			toggle: typeof visible === 'boolean' ? visible : !this.state.visible,
		})
	}

	/**
	 * 获取Tabs项
	 */
	getTabs() {
		return {
			config: {
				label: '配置',
				content: () => this.renderTitle(),
			},
		}
	}

	/**
	 * 渲染标题
	 */
	renderTitle() {
		const { options = {} } = this.props
		const { text = '', hrefUrl = '', visible } = this.state
		return (
			<React.Fragment>
				<Form>
					<FormItemGroup>
						<div style={{ fontSize: 14, fontWeight: 700, padding: '10px 0' }}>
							内容
						</div>
						<FormItem>
							<TextArea
								placeholder="支持HTML标签写法"
								value={text}
								onChange={(event) =>
									this.setState({ text: event.target.value })
								}
								rows="6"
								autosize={{ minRows: 4, maxRows: 10 }}
								onBlur={() => this.updateOptions({ text: text })}
							/>
						</FormItem>
					</FormItemGroup>

					{/* 文字 */}
					<FormItemGroup
						title={'文字'}
						labelcol={{ span: 4 }}
						wrappercol={{ span: 20 }}
					>
						<FormItem label="字体样式">
							<Select
								placeholder="请选择字体样式"
								value={options.fontFamily}
								onChange={(value) => this.updateOptions({ fontFamily: value })}
							>
								{[
									'inherit',
									'serif',
									'sans-serif',
									'cursive',
									'fantasy',
									'monospace',
								].map((item) => (
									<Option key={item} value={item}>
										{item}
									</Option>
								))}
							</Select>
						</FormItem>
						<FormItem label="字体大小">
							<InputNumber
								value={parseInt(options.fontSize)}
								min={12}
								onChange={(value) => this.updateOptions({ fontSize: value })}
							/>
						</FormItem>
						<FormItem label="字体粗细">
							<Select
								placeholder="请选择字体样式"
								value={options.fontWeight}
								onChange={(value) => this.updateOptions({ fontWeight: value })}
							>
								{[100, 200, 300, 400, 500, 600, 700, 800].map((item) => (
									<Option key={item} value={item}>
										{item}
									</Option>
								))}
							</Select>
						</FormItem>
						<FormItem label="字体颜色">
							<ColorPickerInput
								value={options.color}
								onChange={(color) => this.updateOptions({ color: color })}
							/>
						</FormItem>
						<FormItem label="文字距顶端高度">
							<InputNumber
								value={parseInt(options.top)}
								onChange={(top) => this.updateOptions({ top: top })}
							/>
						</FormItem>
					</FormItemGroup>

					{/* 背景 */}
					<FormItemGroup
						title={'背景'}
						labelcol={{ span: 4 }}
						wrappercol={{ span: 20 }}
					>
						<FormItem label="距顶端距离">
							<InputNumber
								value={parseInt(options.backgroundTop)}
								min={1}
								onChange={(value) =>
									this.updateOptions({ backgroundTop: value })
								}
							/>
						</FormItem>
						<ChartProvider>
							<FormCodeModal
								className="ff-component-title-block-button"
								word="自定义样式"
								onChange={(style) => this.updateOptions({ style })}
								mode="css"
								type="style"
								value={options.style}
							/>
						</ChartProvider>
					</FormItemGroup>
				</Form>
			</React.Fragment>
		)
	}
}
