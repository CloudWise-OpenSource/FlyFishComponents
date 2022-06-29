import React from 'react';
import './index.less';
import 'echarts-liquidfill';
import ReactEcharts from 'echarts-for-react';

export default class SixPolygon extends React.Component {
  colors = () => {
    let color = "#50e3c2"
    const {alarmColor,num } = this.props
    const newnum = num * 100
    if(alarmColor[0].num <= newnum && alarmColor[1].num > newnum) {
      return alarmColor[0].color
    } else if(alarmColor[1].num <= newnum && alarmColor[2].num > newnum){
      return alarmColor[1].color
    } else if(alarmColor[2].num <= newnum && 100 > newnum){
      return alarmColor[2].color
    }
    return color
  }
  render() {
    const { num = 0.85, fontSize } = this.props;
    let option = {
      series: [
        {
          type: 'liquidFill',
          radius: '100%', // 半径大小
          center: ['50%', '50%'],
          data: [num, num], // data个数代表波浪数
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: this.colors() },
                { offset: 0.5, color: this.colors() },
                { offset: 1, color: this.colors() },
              ],
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: this.colors() },
                { offset: 0.5, color: this.colors() },
                { offset: 1, color: this.colors() },
              ],
            },
          ],
          backgroundStyle: {
            borderWidth: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(19,226,248,0.55)' },
                { offset: 0.3, color: 'rgba(19,226,248,0.24)' },
                { offset: 1, color: 'rgba(19,226,248,0.2)' },
              ],
            },
          },
          label: {
            formatter: function () {
              return '{a|' + num ? (num * 100).toFixed(0) : 0 + '}' + '{b|健康度}';
            },
            rich: {
              a: {
                fontSize: 34,
              },
              b: {
                fontSize: 16,
                lineHeight: 24,
              },
            },
            textStyle: {
              fontSize,
              color: '#fff',
            },

          },
          outline: {
            show: false,
          },
        },
      ],
    };

    return (
      <div className={'centerSix'}>
        <ReactEcharts style={{ width: '100%', height: '100%' }} option={option} />
      </div>
    );
  }
}