import React from 'react';
import './index.less';
import PieGuage from './pieGuage';
import SixPolygon from './sixPolygon';

var arr = [
  { top: 28, left: 78, width: 112, type: 'leftTop' },
  { top: 28, right: 70, width: 112, type: 'rightTop' },
  { top: 398, left: 72, width: 112, type: 'leftBottom' },
  { top: 398, right: 70, width: 112, type: 'rightBottom' }
]
var preTop = 72
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: 1, // 默认比例
      newArr: arr, // 4个水波球初始化位置
      preTop: preTop // 中心圆top高度
    };
  }
  setChildDate = (data) => { // 子级监听飞鱼框变化大小
    let newArr = JSON.parse(JSON.stringify(arr))
    newArr.map(item => {
      item.top *= data
      item.left *= data
      item.right *= data
      item.width *= data
      return item
    })

    this.setState({
      w: data,
      newArr,
      preTop: preTop * data
    })
  }
  render() {
    const { w, newArr, preTop } = this.state
    const { data = { leftTop: 0.5, rightTop: 0.78, leftBottom: 0.05, rightBottom: 0.33 }, smallFontSize, bigFontSize, alarmColor } = this.props;
    const { leftTop, rightTop, leftBottom, rightBottom } = data;
    const centerData = (leftTop + rightTop + leftBottom + rightBottom) / 4;

    return (
      <div>
        <div className='ff-components-total-62b84d1f26b32a2058aa815c'>
          <div style={{ top: preTop }}>
            <PieGuage
              num={centerData ? centerData / 100 : 0}
              parent={this.props.parent}
              setChildDate={this.setChildDate}
              w={w}
              fontSize={bigFontSize}
              alarmColor={alarmColor}
            />
          </div>
          {
            newArr && newArr.map(item => {
              const { top, width, left, type, right } = item
              return (
                <div key={type} style={{ top, left, right, width, height: width }}>
                  <SixPolygon num={data[type] ? data[type] / 100 : 0} fontSize={smallFontSize} alarmColor={alarmColor} />
                </div>
              )
            })
          }
        </div>
      </div>

    );
  }
}