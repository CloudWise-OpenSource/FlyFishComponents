/**
 * @description 图片组件类
 * @author Cary
 */
import Component from 'data-vi/Component'
import { transformImageUrl, getUrlParam } from 'data-vi/helpers'
import config from 'data-vi/config'
import thumb from './thumb'
import { apiRequest } from 'data-vi/api'
import './index.less';

export default class ImageComponent extends Component {
  static enableLoadCssFile = true;
	// 默认选项
	static defaultOptions = {
		// 图片地址
		image: '',
		// 显示方式, full(铺满),contain(自适应),repeat(填充),
		type: 'full',
		animationSwitch: false,
		animationName: 'scale',
		animationDuration: 1000,
		animationIterationCount: -1,
	}

	// 默认设置
	static defaultConfig = {
		// 默认宽
		width: 153,
		// 默认高
		height: 102,
	}

	/**
	 * 渲染选项
	 *
	 * @returns {ImageComponent}
	 * @private
	 */
	_render() {
		const {
			image,
			type,
			animationSwitch,
      animationName,
			animationDuration,
			animationIterationCount,
		} = this.getOptions()
		let style = {
			backgroundImage: image
				? `url(${transformImageUrl(image)})`
				: `url(${thumb})`,
		}
    let pureClassname = this.getContainer().attr('class').replace(/scale|breath|rotate/gi, '');
    let classname = this.getContainer().attr('class').replace(/scale|breath|rotate/gi, '');

    if (animationSwitch) {
      style = {
        ...style,
        animationDuration: animationDuration + 'ms',
        animationIterationCount: animationIterationCount === -1 ? 'infinite' : animationIterationCount
      }
      classname += ' ' + animationName;
    }

		switch (type) {
			case 'full':
				style.backgroundRepeat = 'no-repeat'
				style.backgroundSize = '100% 100%'
				break
			case 'contain':
				style.backgroundRepeat = 'no-repeat'
				style.backgroundSize = 'contain'
				style.backgroundPosition = 'center'
				break
			case 'repeat':
				style.backgroundRepeat = 'repeat'
				style.backgroundSize = 'auto'
				style.backgroundPosition = 'left top'
				break
		}

		this.getContainer().attr('class', pureClassname)
    // 加一个延时来保证切换次数是ok的
    setTimeout(() => {
		console.log(this.getContainer().attr('class', classname))
      this.getContainer().attr('class', classname).css(style)
    }, 200)

		return this
	}

	_componentWillRemove() {
		let needDeleteServerImgage = true
		const { image } = this.getOptions()
		if (!image) {
			return
		}
		if (this.screen && typeof this.screen.getComponents === 'function') {
			let components = this.screen.getComponents()
			const type = this.getType()
			const id = this.getId()
			needDeleteServerImgage = components.every((component) => {
				if (component.getType() === type && component.getId() !== id) {
					const { otherImageComponentImage } = component.getOptions()
					if (image === otherImageComponentImage) {
						return false
					}
				}
				return true
			})
		}
		if (needDeleteServerImgage) {
			const imageSplitArr = image.split('/')
			apiRequest({
				url: config.screenAPI.deleteUploadScreenImg,
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					imgName: imageSplitArr[imageSplitArr.length - 1],
					screen_id: getUrlParam('id'),
				}),
			})
		}
	}
}
