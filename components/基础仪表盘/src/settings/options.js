import React from 'react'
import { ComponentOptionsSetting } from 'datavi-editor/templates'
import { merge } from 'data-vi/helpers'
import { initOptions } from '../Chart'
import { formatFunctionsToOption, transferDataSource } from '../utils'
import {
	Rect,
  recursionOptions,
	TitleArea,
	Legend,
	Tooltip,
  Title,
	GaugeSeries,
	AxisLabel,
	AxisLine,
	AxisTick,
	Progress,
	SplitLine,
	Pointer,
  Anchor,
	DetailTitle,
  Options,
	Data,
} from '@cloudwise-fe/chart-panel'

export default class OptionsSetting extends ComponentOptionsSetting {
	enableLoadCssFile = true

	constructor(props) {
		super(props)
		let options = props.options
		this.state = {
			title: options.title,
			style: options.style,
		}
	}

	updateOptionsByKey = (options, key) => {
		let finallyOption = options
		if (key) {
			finallyOption = {
				[key]: finallyOption,
			}
		}
		this.updateOptions(finallyOption)
	}

	updateRectOptions = (options) => {
		const [updateKey] = Object.keys(options)
		if (
			!['color', 'backgroundColor'].includes(updateKey) &&
			!updateKey.startsWith('animation')
		) {
			options = {
				[updateKey === 'show' ? 'grid' : 'series']:  options,
			}
		}
		this.updateOptionsByKey(options)
	}

	getTabs() {
    const options = merge(
			{},
			initOptions,
			recursionOptions(this.props.options, true),
			formatFunctionsToOption(this.props.options.functions),
			this.props.options.options
		)

		const {
      backgroundColor,
			animation,
			animationThreshold,
			animationDuration,
			animationDurationUpdate,
			animationEasing,
			animationEasingUpdate,
			animationDelay,
			animationDelayUpdate,
			grid = {},
			title = {},
			series = {},
			color = [],
			transferSeriesData,
		} = options
		const {
			progress = {},
			axisLabel = {},
			axisLine = {},
			axisTick = {},
			splitLine = {},
			pointer = {},
      anchor={},
      radius, center
		} = series

    const rectValues = {
			...grid,
			color,
			backgroundColor,
			animation,
			animationThreshold,
			animationDuration,
			animationDurationUpdate,
			animationEasing,
			animationEasingUpdate,
			animationDelay,
			animationDelayUpdate,
      radius,
      center
		}

    console.log(options, rectValues)

		return {
			grid: {
				label: '?????????',
				content: () => (
					<Rect
						visible
            radius
            radiusInputType="string"
						gridTip="series"
            radiusNumber={1}
						values={rectValues}
						onChange={(options) => this.updateRectOptions(options)}
					/>
				),
			},
			mainTitle: {
				label: '?????????',
				content: () => (
					<Title
						grid
						visible
						align
						values={title}
						onChange={(options) => this.updateOptionsByKey(options, 'title')}
					/>
				),
			},
			subTitle: {
				label: '?????????',
				content: () => (
					<Title
						keyPrefix="sub"
						values={title}
						onChange={(options) => this.updateOptionsByKey(options, 'title')}
					/>
				),
			},
			series: {
				label: '??????',
				content: () => (
					<GaugeSeries
						values={series}
						onChange={(options) => this.updateOptionsByKey(options, 'series')}
					/>
				),
			},
			axisLine: {
				label: '??????',
				content: () => (
					<AxisLine
						series
						values={axisLine}
						onChange={(options) =>
							this.updateOptionsByKey({ axisLine: options }, 'series')
						}
					/>
				),
			},
			axisLabel: {
				label: '????????????',
				content: () => (
					<AxisLabel
						series
						values={axisLabel}
						onChange={(options) =>
							this.updateOptionsByKey({ axisLabel: options }, 'series')
						}
					/>
				),
			},
			axisTick: {
				label: '??????',
				content: () => (
					<AxisTick
						series
						values={axisTick}
						onChange={(options) =>
							this.updateOptionsByKey({ axisTick: options }, 'series')
						}
					/>
				),
			},
			splitLine: {
				label: '?????????',
				content: () => (
					<SplitLine
						series
						values={splitLine}
						onChange={(options) =>
							this.updateOptionsByKey({ splitLine: options }, 'series')
						}
					/>
				),
			},
			progress: {
				label: '?????????',
				content: () => (
					<Progress
						values={progress}
						onChange={(options) =>
							this.updateOptionsByKey({ progress: options }, 'series')
						}
					/>
				),
			},
			pointer: {
				label: '??????',
				content: () => (
					<Pointer
						values={pointer}
						onChange={(options) =>
							this.updateOptionsByKey({ pointer: options }, 'series')
						}
					/>
				),
			},
      anchor: {
				label: '???????????????',
				content: () => (
					<Anchor
						values={anchor}
						onChange={(options) =>
							this.updateOptionsByKey({ anchor: options }, 'series')
						}
					/>
				),
			},
			title: {
				label: '???????????????',
				content: () => (
					<DetailTitle
						type="title"
						values={series.title}
						onChange={(options) =>
							this.updateOptionsByKey({ title: options }, 'series')
						}
					/>
				),
			},
			detail: {
				label: '???????????????',
				content: () => (
					<DetailTitle
						type="detail"
						values={series.detail}
						onChange={(options) =>
							this.updateOptionsByKey({ detail: options }, 'series')
						}
					/>
				),
			},
      extend: {
				label: '?????????',
				content: () => (
					<Options
						values={options}
						onChange={(options, allValues, replaceAll = true) => this.updateOptionsByKey({ ...options, replaceAll })}
					/>
				),
			},
			data: {
				label: '??????',
				content: () => (
					<Data
						values={{ transferSeriesData }}
						onChange={(options) => {
							this.updateOptionsByKey(options)
						}}
					/>
				),
			},
		}
	}
}
