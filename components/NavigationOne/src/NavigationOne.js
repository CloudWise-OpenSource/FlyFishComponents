import React, { Component } from 'react'
import _ from 'lodash'
import less from 'less'
import './index.less'
export default class NavigationOne extends Component {
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

  render() {
    const { text = '', backgroundTop, ...style } = this.props
    const regular = text.match(/\${[a-z,A-Z,\.]{1,}\}/g) || []
    let content = text
    if (regular) content = this.translation(regular, text)
    const backgroundStyle = {
      backgroundPosition: `center ${backgroundTop}px`
    }
    return (
      <div className="ff-component-wrap one" style={backgroundStyle}>
        <div className="ff-component-navigation" style={style} dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    )
  }
}
