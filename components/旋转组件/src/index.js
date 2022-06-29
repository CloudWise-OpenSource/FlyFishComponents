import React from 'react';
import './index.less';
import ReactEcharts from 'echarts-for-react';
import 'echarts-liquidfill';

class PieGuage extends React.Component {
  render() {
    let { num = 0.5 } = this.props;
    if(num>1)num = 1;
    if(num<0)num = 0;
    let option = {
      series: [
        {
          type: 'liquidFill',
          radius: '100%', // 半径大小
          center: ['50%', '50%'],
          data: [num, num, num], // data个数代表波浪数
          color: ['#D8D8D8', 'rgba(64,245,248,0.5)', 'rgba(64,245,248,0.2)'],
          backgroundStyle: {
            borderWidth: 1,
            color: 'rgb(255,0,255,0.1)',
          },
          label: {
            normal: {
              formatter: num?(num * 100).toFixed(0):0 + '%',
              textStyle: {
                fontSize: 46,
                color: '#fff',
              },
            },
          },
          outline: {
            show: false,
          },
        },
      ],
    };

    return (
      <div className={'centerBall'}>
        <div />
        <div />
        <div style={{ padding: '155px 0 0 151px' }}>
          <ReactEcharts style={{ width: 141, height: 141 }} option={option} />
        </div>
      </div>
    );
  }
}

class SixPolygon extends React.Component {
  render() {
    const { num = 0.85 } = this.props;
    // const num = 0.96
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
                { offset: 0, color: '#25C9DC' },
                { offset: 0.5, color: '#2356D9' },
                { offset: 1, color: '#2356D9' },
              ],
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#25C9DC' },
                { offset: 0.5, color: '#2356D9' },
                { offset: 1, color: '#2356D9' },
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
              formatter:function(){
                return '{a|' + num?(num * 100).toFixed(0):0 + '}' +  '{b|健康度}';
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
                fontSize: 24,
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
        <ReactEcharts style={{ width: 112, height: 112 }} option={option} />
      </div>
    );
  }
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data = {hardwareHealthInfo: 0.5, softwareHealthInfo: 0.78, alertHealthInfo: 0.05, appPerformanceHealthInfo: 0.33} } = this.props;
    const {hardwareHealthInfo, softwareHealthInfo, alertHealthInfo, appPerformanceHealthInfo} = data;
    // const xtztfx = (hardwareHealthInfo+alertHealthInfo+appPerformanceHealthInfo)/3;
    // const centerData = (hardwareHealthInfo+softwareHealthInfo+alertHealthInfo+appPerformanceHealthInfo+xtztfx)/5;
    const centerData = (hardwareHealthInfo+softwareHealthInfo+alertHealthInfo+appPerformanceHealthInfo)/4;

    return (
      <div className={'centermark'}>
        <div style={{ top: '65px', left: '199px' }}>
          <PieGuage num={centerData?centerData / 100:0} />
        </div>
        <div style={{ top: '28px', left: '80px' }}>
          <SixPolygon num={hardwareHealthInfo?hardwareHealthInfo / 100:0} />
        </div>
        <div style={{ bottom: '63px', left: '73px' }}>
          <SixPolygon num={softwareHealthInfo?softwareHealthInfo / 100:0} />
        </div>
        <div style={{ top: '28px', right: '69px' }}>
          <SixPolygon num={alertHealthInfo?alertHealthInfo / 100:0} />
        </div>
        <div style={{ bottom: '63px', right: '69px' }}>
          <SixPolygon num={appPerformanceHealthInfo?appPerformanceHealthInfo / 100:0} />
        </div>
      </div>
    );
  }
}