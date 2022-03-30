import ReactComponent from 'data-vi/ReactComponent'
import PropTypes from 'prop-types'
import NavigationTwo from './NavigationTwo'

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
		 * @description 水平排列
		 * @default: flex-start
		 */
		justifyContent: PropTypes.string,
		/**
		 * @description 垂直排列
		 * @default: flex-start
		 */
		alignItems: PropTypes.string,
		/**
		 * @description 自定义样式
		 * @default: ''
		 */
		style: PropTypes.string,
	}
	static enableLoadCssFile = true
	// 默认选项
	static defaultOptions = {
		text: '我的导航',
		color: '#fff',
		fontSize: 40,
		fontFamily: 'inherit',
		fontWeight: 400,
		justifyContent: 'center',
		alignItems: 'top',
		style: '',
		backgroundTop: 0,
		top: 0,
	}

	getDefaultConfig() {
		return {
			left: 0,
			top: 0,
			width: 1920,
			height: 280,
			visible: true,
		}
	}

	getDefaultData() {
		return {
			data: {},
		}
	}

	getReactComponent() {
		return NavigationTwo
	}
}
