import React from "react";
import { ComponentOptionsSetting } from "datavi-editor/templates";

import { merge } from "data-vi/helpers";
import { GRID } from "../Chart/theme";
import { initOptions } from '../Chart'
import { formatFunctionsToOption } from "../utils";
import {
	Rect,
	Legend,
	Tooltip,
	Axis,
	Title,
	AxisPointer,
	Options,
	Data,
	recursionOptions,
	LineSeries,
} from '@cloudwise-fe/chart-panel'

export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true;
  
  constructor(props) {
    super(props);
    let options = props.options;
    this.state = {
      title: options.title,
      style: options.style,
    };
  }

  updateOptionsByKey = (options, key) => {
    let finallyOption = options;
    if (key) {
      finallyOption = {
        [key]: finallyOption,
      };
    }
    this.updateOptions(finallyOption);
  };

	updateRectOptions = (options) => {
		const [updateKey] = Object.keys(options)
		if (
			!['color', 'backgroundColor'].includes(updateKey) &&
			!updateKey.startsWith('animation')
		) {
			options = {
				grid: options,
			}
		}
		this.updateOptionsByKey(options)
	}

  getTabs() {
    const options = merge(
      {},
      initOptions,
      recursionOptions(this.props.options, true),
      formatFunctionsToOption(this.props.options.functions)
    );
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
      grid = GRID,
      title = {},
      legend = {},
      tooltip = {},
      xAxis = {},
      yAxis = {},
      color = [],
      series = {},
      axisPointer = {},
      transferXAxisData,
			transferSeriesData,
    } = options;
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
		}
    console.log(options)
    return {
      grid: {
        label: "?????????",
        content: () => (
          <Rect
            visible
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
      legend: {
				label: '??????',
				content: () => (
					<Legend
						values={legend}
						onChange={(options) => this.updateOptionsByKey(options, 'legend')}
					/>
				),
			},
			tooltip: {
				label: '?????????',
				content: () => (
					<Tooltip
						values={tooltip}
						onChange={(options) => this.updateOptionsByKey(options, 'tooltip')}
					/>
				),
			},
			axisPointer: {
				label: '?????????',
				content: () => (
					<AxisPointer
						values={axisPointer}
						onChange={(options) =>
							this.updateOptionsByKey(options, 'axisPointer')
						}
					/>
				),
			},
      xAxis: {
				label: 'X???',
				content: () => (
					<Axis
						type="x"
						values={xAxis}
						onChange={(options) => this.updateOptionsByKey(options, 'xAxis')}
					/>
				),
			},
			yAxis: {
				label: 'Y???',
				content: () => (
					<Axis
						type="y"
						values={yAxis}
						onChange={(options) => this.updateOptionsByKey(options, 'yAxis')}
					/>
				),
			},
      series: {
				label: '??????',
				content: () => (
					<LineSeries
						values={series}
						onChange={(options) => this.updateOptionsByKey(options, 'series')}
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
						values={{ transferXAxisData, transferSeriesData }}
						onChange={(options) => {
							this.updateOptionsByKey(options)
						}}
					/>
				),
			},
    };
  }
}
