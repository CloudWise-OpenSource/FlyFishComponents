import ReactComponent from 'data-vi/ReactComponent'
import PropTypes from 'prop-types'
import Button from './Button'

export default class Component extends ReactComponent {
  static propTypes = {
    /**
     * @description 文本内容（支持HTML格式，支持XML格式写法）
     * @default: ""
     */
    text: PropTypes.string,
    /**
     * @description 是否在新窗口打开
     * @default: true
     */
    color: PropTypes.string,
    /**
     * @description 文本大小
     * @default: 26
     */
    fontSize: PropTypes.number,
    /**
     * @description 文本字体
     * @default: default
     */
    fontFamily: PropTypes.string,
    /**
     * @description 文本粗细
     * @default: 400
     */
    fontWeight: PropTypes.string,
    /**
     * @description 自定义样式
     * @default: ''
     */
    style: PropTypes.string,
  }
  static enableLoadCssFile = true
  // 默认选项
  static defaultOptions = {
    text: '按钮',
    color: '#FFCC33',
    fontSize: 26,
    fontStyle: 'normal',
    fontFamily: 'inherit',
    fontWeight: 'normal',
    textAlign: 'center',
    lineHeight: 2.5,
    style: '',
    backgroundWidth: '100%',
    backgroundHeight: '100%',
    onClick: 'function(event, id) { console.log("当前事件源", event, id); }',
    link: false,
    target: true,
    href: '',
  }

  getDefaultConfig() {
    return {
      left: 0,
      top: 0,
      width: 254,
      height: 64,
      visible: true,
    }
  }

  getReactComponent() {
    return Button
  }
}
