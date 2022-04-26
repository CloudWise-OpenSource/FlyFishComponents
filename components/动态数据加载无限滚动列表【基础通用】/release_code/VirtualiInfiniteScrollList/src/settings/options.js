import React from 'react'
import {
	ComponentOptionsSetting,
} from 'datavi-editor/templates'

import { recursionOptions, Data } from '@cloudwise-fe/chart-panel'

import Base from './panel/Base'

export default class OptionsSetting extends ComponentOptionsSetting {
	enableLoadCssFile = true
	constructor(props) {
		super(props)
	}
	getTabs() {
		const options = recursionOptions(this.props.options, true)
		const { titleRender, itemRender, transferData } = options
		const { updateOptions } = this.props
		return {
			base: {
				label: '基础',
				content: () => (
					<Base initialValues={options} onChange={updateOptions} />
				),
			},
			data: {
				label: '其他',
				content: () => (
					<Data
						values={{ titleRender, itemRender, transferData }}
						onChange={changeValues => updateOptions(changeValues)}
					/>
				),
			},
		}
	}
}
