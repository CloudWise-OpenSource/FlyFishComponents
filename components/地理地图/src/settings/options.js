import React from "react";
import { ComponentOptionsSetting } from "datavi-editor/templates";
import { merge } from "data-vi/helpers";

import { TOOLTIP } from "../Chart/theme";
import { initOptions } from '../Chart'
import { transferDataSource, formatFunctionsToOption } from "../utils";
import {
	Rect,
	Tooltip,
	Title,
	Options,
	Data,
	recursionOptions,
	MapSeries,
  EffectScatterSeries,
  LineSeries
} from '@cloudwise-fe/chart-panel'

export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true

  constructor(props) {
    super(props);
    let options = props.options;
    this.state = {
      title: options.title,
      style: options.style,
    };
  }

  updateOptionsByKey = (options, key) => {
    console.log(options, key)
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
				geo: options,
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
      grid = {},
      maps = {},
      chooseMap,
      title = {},
      series = {},
      geo = {},
      select = {},
      emphasis = {},
      mapLines ={},
      color = [],
      transferSeriesData
    } = options;
    const data = transferDataSource(this.props.data);
    const tooltip = merge({}, TOOLTIP, geo.tooltip || {});
    console.log(this.props);

    const rectValues = {
			...geo,
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

    return {
      grid: {
				label: '?????????',
				content: () => (
					<Rect
						visible
            geo
            tooltipPrefix="geo"
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
      tooltip: {
				label: '?????????',
				content: () => (
					<Tooltip
						values={geo.tooltip || {}}
						onChange={(options) => this.updateOptionsByKey({ tooltip: options }, 'geo')}
					/>
				),
			},
      mapScatter: {
        label: "?????????",
        content: () => (
          <EffectScatterSeries
            values={{ ...mapLines, geo }}
            visible
            data={data}
            dataConfig={mapLines.detailConfig || {}}
            onChange={(options) =>
              this.updateOptionsByKey(options, 'mapScatter')
            }
          />
        ),
      },
      mapLines: {
        label: "??????",
        content: () => (
          <LineSeries
            values={{ ...mapLines, geo }}
            data={data}
            effect
            threshold
            dataConfig={mapLines.detailConfig || {}}
            onChange={(options) =>
              this.updateOptionsByKey(options, 'mapLines')
            }
          />
        ),
      },
      series: {
        label: "??????",
        content: () => (
          <MapSeries
            values={{ series, geo }}
            data={data}
            maps={maps}
            chooseMap={chooseMap}
            dataConfig={series.detailConfig || {}}
            onChange={(options) =>
              this.updateOptionsByKey(options, 'geo')
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
    };
  }
}
