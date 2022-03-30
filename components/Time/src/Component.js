import ReactComponent from 'data-vi/ReactComponent'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef, Fragment, useCallback } from 'react'
import dayjs from 'dayjs'
import { assembleFunction } from '@cloudwise-fe/chart-panel';

import './index.less'

/**
 * @description 枚举星期
 */
export const weekMap = ['日', '一', '二', '三', '四', '五', '六']

/**
 * @description 默认星期前缀
 */
const defaultWeekAddon = '星期'

/**
 * @description 默认元素间隔
 */
const defaultGutter = 10

/**
 * @description 默认时间格式日期
 */
const defaultFormatType = 'YYYY/MM/DD HH:mm:ss'

const defaultFinalFormatTime = function (time, timeForDayjs) {
	return time
}

const Time = ({
	data,
	formatType,
	finalFormatTime,
	interval,
	weekAddon,
	showWeek,
  style,
  gutter,
  breakLine,
  useCurrent
}) => {
	const timeStamp = useRef(Date.now());
  /**
   * @description interval id
   */
  const timerId = useRef();
  const [displayTime, setDisplayTIme] = useState([]);

  useEffect(() => {
    clearInterval(timerId.current);
    if (interval) {
      timerId.current = setInterval(() => {
        setDisplayTIme(formatDate());
      }, 1000);
    } else {
      setDisplayTIme(formatDate());
    }

    return () => clearInterval(timerId.current);
  }, [interval, showWeek, formatType, breakLine, data, weekAddon, finalFormatTime, useCurrent]);

	const formatDate = useCallback(() => {
		let date = Date.now()

    if (!useCurrent) {
      if (Array.isArray(data) && data.length) {
        date = data[0].time
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        date = data.time
      }
    }
		
		let formatTime = dayjs(date)
		let finalTime
		if (!formatType || !formatTime.isValid())
			return ['时间解析错误，请检查参数！']
		// 如果是自定义时间且自动更新，以指定时间节点开始递增
		if (date && interval) {
			formatTime = dayjs(
				formatTime.valueOf() + (useCurrent ? 0 : (Date.now() - timeStamp.current))
			)
		}

		// 是否自定义格式中增加了星期解析
		const formatWithWeek = /d+/.test(formatType)
		const timeWithFormatType = formatTime.format(formatType)
		let addAfterTime = ''
		// 未指定星期解析且展示星期
		if (!formatWithWeek && showWeek) {
			addAfterTime += weekAddon + weekMap[formatTime.day()]
		}
		finalTime = [timeWithFormatType, addAfterTime]
		try {
      const translateFinal = assembleFunction(finalFormatTime);
			finalTime = translateFinal(finalTime, formatTime)
			if (
				!(
					Array.isArray(finalTime) &&
					finalTime.every((v) => typeof v === 'string')
				)
			) {
				finalTime = [timeWithFormatType, addAfterTime]
			}
		} catch (e) {
      console.log(e);
			finalTime = [timeWithFormatType, addAfterTime]
		}
		return finalTime
	}, [data, formatType, finalFormatTime, interval, weekAddon, showWeek, timeStamp, useCurrent])
	return <p className="ff-component-time" style={style}>
    {
      displayTime.map((time, index) => {
        const last = index === displayTime.length - 1;
        return (
          <Fragment key={index}>
            <span style={{ marginRight: !last && gutter ? gutter : 0 }}>
              {time}
            </span>
            {breakLine && !last ? <br /> : null}
          </Fragment>
        );
      })
    }
  </p>
}

Time.propTypes = {
	/**
	 * @description 展示时间
	 * @default Date.now
	 */
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	/**
	 * @description 时间格式 自定义示例：'YYYY年MM月DD日' | 'YYYY/MM/DD' | 'YYYY-MM-DD'
	 * @default defaultFormatType
	 */
	formatType: PropTypes.string,
	/**
	 * @description 是否自动更新(若开启则每秒更新一次)
	 */
	interval: PropTypes.bool,
	/**
	 * @description 样式属性
	 */
	style: PropTypes.object,
	/**
	 * @description 是否折行展示;
	 * @default false
	 */
	breakLine: PropTypes.bool,
  /**
	 * @description 是否使用当前时间;
	 * @default false
	 */
	useCurrent: PropTypes.bool,
	/**
	 * @description 是否显示星期
	 * @default true
	 */
	showWeek: PropTypes.bool,
	/**
	 * @description 星期前缀
	 */
	weekAddon: PropTypes.string,
	/**
	 * @description 元素间隔
	 */
	gutter: PropTypes.number,
	/**
	 * @description 最终格式时间函数
	 */
	finalFormatTime: PropTypes.string,
}

export default class Component extends ReactComponent {
	static enableLoadCssFile = true
	// 默认选项
	static defaultOptions = {
		formatType: defaultFormatType,
		interval: true,
		breakLine: false,
		showWeek: true,
    useCurrent: false,
		weekAddon: defaultWeekAddon,
		gutter: defaultGutter,
		style: {},
		finalFormatTime: String(defaultFinalFormatTime),
	}

	getDefaultConfig() {
		return {
			left: 534,
			top: 200,
			width: 1000,
			height: 700,
			visible: true,
		}
	}

	getDefaultData() {
		return { time: Date.now() }
	}

	getReactComponent() {
		return Time
	}
}
