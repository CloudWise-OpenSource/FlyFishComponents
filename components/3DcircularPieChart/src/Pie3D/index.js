/*
 * @Author: Celestine.Gu
 * @Date: 2022-02-23 11:43:03
 * @LastEditors: Celestine.Gu
 * @LastEditTime: 2022-03-14 15:38:31
 * @Description: file content
 */
import React from 'react'
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import factoryWithThrowingShims from 'prop-types/factoryWithThrowingShims';
highcharts3d(Highcharts);
export default class index extends React.Component {
  dom = React.createRef();
  /**
   * 控制提示框在图标范围内，不会被截断
   * @param {*} labelWidth 
   * @param {*} labelHeight 
   * @param {*} point 
   * @returns 
   */
  positionerFun = (labelWidth, labelHeight, point) => {
    var x, y;
    // 计算x坐标
    if ((labelWidth + point.plotX) > this.dom.current.clientWidth) {
      x = this.dom.current.clientWidth - labelWidth
    } else {
      x = point.plotX
    }
    // 计算y坐标
    if ((labelHeight + point.plotY) > this.dom.current.clientHeight) {
      y = this.dom.current.clientHeight - labelHeight
    } else {
      y = point.plotY
    }
    return { x, y };
  }
  /**
   * 处理每一项数据 加入sliced 属性
   * @param {*} data 
   * @returns 
   */
  getData = (data) => data.map(item => ({ ...item, sliced: true }))

  /**
   * 图表重绘
   */
  redrawPie = (width, height) => {
    const { data = {}, alpha, radio } = this.props;
    if (this.chart) {
      if (width && height) {
        this.chart.update({
          chart: { ...this.options.chart, width, height },
        });
        this.chart.redraw(); //重绘
      } else {
        this.chart.update({
          chart: {
            ...this.options.chart,
            width,
            height
          },
          series: [
            {
              legendIndex: true,
              data: this.getData(data),
              colors: radio == 1 ? this.props.lineColor : undefined,
              slicedOffset: 10,
            }
          ]
        }, true, true);
        this.chart.redraw(); //重绘

      }
    }
  }
  componentDidMount() {
    //初始化图表
    this.chart = Highcharts.chart(this.dom.current, this.options);
    const eventBus = this.props.parent;
    eventBus && eventBus.bind('resized', ({ width, height }) => {
      this.redrawPie(width, height);
    });
  }
  componentDidUpdate() {

    //重绘图表
    this.redrawPie();
  }
  options = {
    chart: {
      type: 'pie',
      backgroundColor: '',
      reflow: false,
      options3d: {
        enabled: true,  //是否开启3D模式
        fontSize: "40px",
        style: {
          fontSize: '40px'
        },
        alpha: 55       //z轴旋转角度
      }
    },
    title: {    //标题
      text: '',
      style: {
        color: 'white',
        fontSize: '28px'
      },
      align: 'left'
    },
    tooltip: {
      enabled: true,
      positioner: this.positionerFun,
    },
    legend: {
      enabled: true,
      itemHoverStyle: {
        color: 'white',
      },
      itemStyle: {
        fontSize: 14,
        color: 'white',

      }
    },
    credits: false, //去除版权信息
    plotOptions: {
      pie: {
        showInLegend: true,
        center: ['50%', '50%'],
        innerSize: '55%',
        minSize: 50,
        depth: 30,
        startAngle: 20,
        borderWidth: 0,
        borderColor: '',
        dataLabels: {
          distance: 20, //引导线的距离	
          formatter: function (e) {
            return `<div style='color:${this.color};font-size:20px;'>${Highcharts.numberFormat(this.percentage, 0)}%</div>`
          },
          style: {
            textOutline: 'none',  //去掉文字白边
            fontSize: '40px'
          }
        }

      },
    },
    series: [{
      legendIndex: true,
      data: [],
      colors: null,
      slicedOffset: 10, //设置分割距离
      fontSize: "40px",
      style: {
        fontSize: "40px",
      }
    }]
  };
  render() {
    return (
      <div
        className='ff-components-pie3d-62afd877f8ed882065579b40'
        ref={this.dom}
        style={{ width: '100%', height: '100%' }}
      ></div>
    )
  }
}
