import React, { Component } from 'react'
import _ from 'lodash'
import less from 'less'
import { recursionOptions } from '@cloudwise-fe/chart-panel';
import './index.less'
export default class ButtonOne extends Component {
  constructor(props) {
    super(props)
  }

  id = (
    'uniq-id-' +
    Math.random(Math.random() * 10) +
    '-' +
    Date.now()
  ).replace('0.', '')
  translation = (arrAy = [], text = '') => {
    const { data = {} } = this.props
    let content = text
      ; (arrAy || []).forEach((item) => {
        const regularValue = item.replace('${', '').replace('}', '')
        const newdata = _.get(data, regularValue) || ''
        if (newdata) content = content.replace(item, newdata)
      })
    return content
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      style = '',
      parent: { $container, $wrap },
    } = nextProps
    const customStyle = $wrap.find('style[data-id="custom-style"]')
    $container.attr('id', this.id)
    less.render(`#${this.id} { ${style} }`, (error, { css } = {}) => {
      // console.log(this.id, css, error)
      if (!error) {
        if (customStyle.length) {
          customStyle.html(css)
        } else {
          $(`<style data-id="custom-style">${css}</style>`).insertBefore(
            $container
          )
        }
      }
    })
  }

  handleClick = () => {
    const { onClick, link, href, target } = recursionOptions(this.props, true);
    const event = this.props.parent;
    if (link && href.length) {
      target ? window.open(href) : (window.location.href = href);
    } else {
      try {
        if (onClick) {
          onClick(event, this.id);
          event.trigger('ff-component-button-click', { id: this.id })
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const { text = '', backgroundWidth, backgroundHeight, ...style } = this.props
    const regular = text.match(/\${[a-z,A-Z,\.]{1,}\}/g) || []
    let content = text
    if (regular) content = this.translation(regular, text)
    const backgroundStyle = {
      backgroundSize: `${backgroundWidth} ${backgroundHeight}`
    }
    console.log(style);
    return (
      <div className="ff-component-button-wrap two" style={backgroundStyle}>
        <div className="ff-component-button" onClick={this.handleClick} style={style} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}
