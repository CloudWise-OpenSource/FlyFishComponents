import React, { Component } from 'react'
import _ from 'lodash'
import less from 'less'
import './index.less'
export default class Title extends Component {
  constructor(props) {
    super(props)
  }

  id = (
    'uniq-id-' +
    Math.random(Math.random() * 10) +
    '-' +
    Date.now()
  ).replace('0.', '')

  handleTitleClick = () => {
    const { isLink, hrefUrl = '', isNewWindow = true } = this.props
    if (isLink && hrefUrl && hrefUrl.length)
      isNewWindow ? window.open(hrefUrl) : (window.location.href = hrefUrl)
  }

  translation = (arrAy = [], text = '') => {
    let { data = {} } = this.props
    data = Array.isArray(data) && data.length ? { data: data[0] } : data;
    let content = text;
    (arrAy || []).forEach((item) => {
      const regularValue = item.replace('${', '').replace('}', '');
      const replaceData = _.get(data, regularValue)
      const newdata = typeof replaceData === 'undefined' ? '' : replaceData
      content = content.replace(item, newdata)
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
      console.log(this.id, css, error)
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

  render() {
    const { text = '', hrefUrl, isNewWindow, ...style } = this.props
    const regular = text.match(/\${[a-z,A-Z,\.]{1,}\}/g) || []
    let content = text
    if (regular) content = this.translation(regular, text)
    return (
      <div className="ff-component-title" style={style}>
        <div
          onClick={this.handleTitleClick}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    )
  }
}
