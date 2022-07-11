/**
 * @description
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
	ComponentOptionsSetting,
	Form,
	FormItemGroup,
	FormItem,
	UploadImage,
	RadioGroup,
	Radio,
	InputNumber,
	RadioBooleanGroup,
} from 'datavi-editor/templates'

export default class OptionsSetting extends ComponentOptionsSetting {
	static propTypes = {
		options: PropTypes.object.isRequired,
		updateOptions: PropTypes.func.isRequired,
	}

	getTabs() {
		return {
			chart: {
				label: '图片',
				content: () => this.renderText(),
			},
		}
	}

	renderText() {
		const { options } = this.props

		return (
			<Form>
				<FormItemGroup title="图片">
					<FormItem full>
						<UploadImage
							src={options.image}
							onChange={(image) => this.updateOptions({ image })}
						/>
					</FormItem>
					<FormItem label="方式" full>
						<RadioGroup
							value={options.type}
							onChange={(event) =>
								this.updateOptions({ type: event.target.value })
							}
						>
							<Radio value="full">铺满</Radio>
							<Radio value="contain">适应</Radio>
							<Radio value="repeat">填充</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem full label="开启动画">
						<RadioBooleanGroup
							value={options.animationSwitch}
							onChange={(event) =>
								this.updateOptions({ animationSwitch: event.target.value })
							}
						/>
					</FormItem>
					<FormItem label="动画名称" full>
						<RadioGroup
							value={options.animationName}
							onChange={(event) =>
								this.updateOptions({ animationName: event.target.value })
							}
						>
							<Radio value="scale">放大</Radio>
							<Radio value="rotate">旋转</Radio>
							<Radio value="breath">呼吸</Radio>
						</RadioGroup>
					</FormItem>
					{options.animationName && (
						<FormItem full label="动画时长">
							<InputNumber
								style={{ width: '100%' }}
								value={options.animationDuration}
								placeholder="请输入动画时长"
								min={0}
								onChange={(animationDuration) =>
									this.updateOptions({ animationDuration })
								}
							/>
						</FormItem>
					)}
					{options.animationName && (
						<FormItem
							full
							label="动画次数"
							extra="输入-1表示重复循环无限次"
						>
							<InputNumber
								style={{ width: '100%' }}
								value={options.animationIterationCount}
								placeholder="请输入动画次数"
								min={-1}
								onChange={(animationIterationCount) =>
									this.updateOptions({ animationIterationCount })
								}
							/>
						</FormItem>
					)}
				</FormItemGroup>
			</Form>
		)
	}
}
