import React from 'react';
import { ComponentOptionsSetting, UploadImage } from 'datavi-editor/templates';
import { transformImageUrl, merge } from 'data-vi/helpers';
import { SYMBOL } from '../constant';
import { initOptions } from '../Chart';
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
  Pictorial3DBarChart,
} from '@cloudwise-fe/chart-panel';

import { transferDataSource, formatFunctionsToOption } from '../utils';
export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true;
  constructor(props) {
    super(props);
    let options = props.options;
    this.state = {
      title: options.title,
      style: options.style,
      chooseDataName: '',
      showImageType: false,
      imageType: options.imageType,
      imageTypes: options.imageTypes,
    };
  }

  updateOptionsByKey = (options, key) => {
    console.log(options, 'options');
    const { chooseDataName = '' } = options;
    this.setState({
      chooseDataName: chooseDataName,
    });
    if (
      chooseDataName &&
      Object.keys(options[chooseDataName]).indexOf('customSymbol') > -1
    ) {
      return;
    }
    if (
      chooseDataName &&
      Object.keys(options[chooseDataName]).indexOf('imageType') > -1
    ) {
      this.setState({
        imageType: options[chooseDataName].imageType,
      });
    }
    if (
      chooseDataName &&
      Object.keys(options[chooseDataName]).indexOf('showImageType') > -1
    ) {
      this.setState({
        showImageType: options[chooseDataName].showImageType,
      });
    }
    let finallyOption = options;
    if (key) {
      finallyOption = {
        [key]: finallyOption,
      };
    }
    console.log(finallyOption);
    this.updateOptions(finallyOption);
  };
  updateOptionsByUpload = (image) => {
    const { imageType, imageTypes, showImageType, chooseDataName } = this.state;
    console.log(image, imageType, imageTypes);

    let finallyOption = {};
    if (showImageType) {
      this.setState({
        imageTypes: {
          ...this.state.imageTypes,
          [imageType]: image,
        },
      });
      finallyOption = {
        imageTypes: {
          ...this.state.imageTypes,
          [imageType]: image,
        },
        customSymbol: '',
      };
    } else {
      // this.setState({
      //   imageTypes: {},
      // });
      // let { data = [] } = transferDataSource(this.props.data);
      // const { selectedSeries } = this.state;
      // const { parentName, isAll, childrenNameIndex } = selectedSeries;
      // const filterData =
      //   data.filter((item) => {
      //     return item.name === parentName;
      //   }) || [];
      // let _data = (filterData.length > 0 && filterData[0].data) || [];
      // if (!isAll) {
      //   _data[childrenNameIndex].symbol = 'image://' + transformImageUrl(image);
      // }
      // finallyOption = isAll ? { symbol: image } : { data: _data };
      finallyOption = { symbol: image, customSymbol: '' };
      finallyOption = {
        series: {
          [chooseDataName]: finallyOption,
        },
      };
    }

    console.log(finallyOption, 'finallyOption');
    this.updateOptions(finallyOption);
  };

  updateRectOptions = (options) => {
    const [updateKey] = Object.keys(options);
    if (
      !['color', 'backgroundColor'].includes(updateKey) &&
      !updateKey.startsWith('animation')
    ) {
      options = {
        grid: options,
      };
    }
    this.updateOptionsByKey(options);
  };

  getTabs() {
    const options = merge(
      {},
      initOptions,
      recursionOptions(this.props.options, true),
      formatFunctionsToOption(this.props.options.functions),
      this.props.options.options,
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
      title = {},
      legend = {},
      tooltip = {},
      xAxis = {},
      yAxis = {},
      color = [],
      axisPointer = {},
      series = {},
      transferXAxisData,
      transferSeriesData,
    } = options;
    console.log(options);
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
    };

    const { data = [] } = transferDataSource(this.props.data);
    // 将data和series合并
    const renderData = data.map((v) => ({
      ...v,
      name: v.name || 'defaultName',
      extra: series[v.name || 'defaultName'] || {},
    }));
    console.log(this.props, options, data, renderData, series);
    return {
      grid: {
        label: '图表区',
        content: () => (
          <Rect
            visible
            values={rectValues}
            onChange={(options) => this.updateRectOptions(options)}
          />
        ),
      },
      mainTitle: {
        label: '主标题',
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
        label: '副标题',
        content: () => (
          <Title
            keyPrefix="sub"
            values={title}
            onChange={(options) => this.updateOptionsByKey(options, 'title')}
          />
        ),
      },
      legend: {
        label: '图例',
        content: () => (
          <Legend
            values={legend}
            onChange={(options) => this.updateOptionsByKey(options, 'legend')}
          />
        ),
      },
      tooltip: {
        label: '提示框',
        content: () => (
          <Tooltip
            values={tooltip}
            onChange={(options) => this.updateOptionsByKey(options, 'tooltip')}
          />
        ),
      },
      axisPointer: {
        label: '指示器',
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
        label: 'X轴',
        content: () => (
          <Axis
            type="x"
            values={xAxis}
            onChange={(options) => this.updateOptionsByKey(options, 'xAxis')}
          />
        ),
      },
      yAxis: {
        label: 'Y轴',
        content: () => (
          <Axis
            type="y"
            values={yAxis}
            onChange={(options) => this.updateOptionsByKey(options, 'yAxis')}
          />
        ),
      },
      series: {
        label: '系列',
        content: () => (
          <Pictorial3DBarChart
            values={series}
            data={renderData}
            onChange={(options) => {
              this.updateOptionsByKey(options, 'series');
            }}
            renderImage={this.otherPanel()}
          />
        ),
      },
      extend: {
        label: '自定义',
        content: () => (
          <Options
            values={options}
            onChange={(options, allValues, replaceAll = true) => {
              this.updateOptionsByKey({ ...options, replaceAll });
            }}
          />
        ),
      },
      data: {
        label: '数据',
        content: () => (
          <Data
            values={{ transferXAxisData, transferSeriesData }}
            onChange={(options) => {
              this.updateOptionsByKey(options);
            }}
          />
        ),
      },
    };
  }

  /**
   * 配置其他
   */
  otherPanel() {
    const { options = {} } = this.props;
    const { imageType, imageTypes, chooseDataName } = this.state;
    console.log(options);
    const _series = options.series;
    const symbol = _series[chooseDataName] && _series[chooseDataName].symbol;
    console.log(symbol, 'symbol');
    console.log(imageTypes, 'imageTypes');
    let _symbol = null;

    if (_series[chooseDataName] && _series[chooseDataName].showImageType) {
      _symbol = (imageTypes && imageTypes[imageType]) || null;
    } else {
      _symbol = symbol || null;
    }
    if (SYMBOL.indexOf(symbol) > -1) {
      _symbol = null;
    }
    return (
      <div className="pictorial3DBarChart">
        <UploadImage
          src={_symbol}
          onChange={(image) => this.updateOptionsByUpload(image)}
        />
      </div>
    );
  }
}
