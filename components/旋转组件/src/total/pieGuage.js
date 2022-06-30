import React from 'react';
import './index.less';
import 'echarts-liquidfill';
import ReactEcharts from 'echarts-for-react';

var size = 450, arice = 141; // 中心圆宽高
export default class PieGuage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: size, // 中心圆宽高
      widthParent: props.parent.config.width, // 记录父级
      echartsArice: arice // 中心水波球宽高
    }
  }
  componentDidMount() {
    const { parent } = this.props

    parent && parent.bind('resized', ({ width, height }) => {
      const { widthParent, echartsArice } = this.state
      const scale = width / widthParent;
      const data = this.state.width * scale / size; // 向父级传递缩放
      // 改变此组件子级父级宽高
      this.setState({
        width: this.state.width * scale,
        widthParent: width,
        echartsArice: echartsArice * scale
      })
      // 传递父级组件缩放比例
      this.props.setChildDate(data)
    });
  }

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
    const { echartsArice, width, height } = this.state
    let { num = 0.5, fontSize, alarmColor } = this.props;
    if (num > 1) num = 1;
    if (num < 0) num = 0;
    let option = {
      series: [
        {
          type: 'liquidFill',
          radius: '100%', // 半径大小
          center: ['50%', '50%'],
          data: [num, num, num], // data个数代表波浪数
          color: [this.colors(), this.colors(), this.colors()],
          backgroundStyle: {
            borderWidth: 1,
            color: 'rgb(255,0,255,0.1)',
            // color: this.colors(),
          },
          label: {
            normal: {
              formatter: num ? (num * 100).toFixed(0) : 0 + '%',
              textStyle: {
                fontSize,
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
      <div style={{ width: width, height: width }} className={'centerBall'}>
        <div style={{ width: width, height: width }} />
        <div style={{ width: width, height: width }} />
        <div style={{ width: echartsArice, height: echartsArice }}>
          <ReactEcharts style={{ width: '100%', height: '100%' }} option={option} />
        </div>
      </div>
    );
  }
}