import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
  Fragment,
} from 'react'
import classnames from 'classnames'
import { recursionOptions } from '@cloudwise-fe/chart-panel'
import './assets/style.less'
import { Tooltip, ConfigProvider } from 'antd'
ConfigProvider.config({
  prefixCls: 'ant4',
})

const VirtualiInfiniteScrollList = (props) => {
  const {
    defaultTheme = true,
    ellipsis = true,
    titleRender,
    itemRender,
    transferData,
    center = true,
    tooltip,
    scrollingSpeed = 3000, //定时器的执行速度
    spaceBetween = 0, //条数之间的间隔
    scrollingNumber, //每个dome渲染的数据量默认10条，取余10条的时候会更新一部分数据
    titleHeight,
    titleStyle,
    itemStyle,
    salmon,
    salmonS,
    salmonSingle,
    verticalSalmonSingle,
    verticalSalmon,
    verticalSalmonS,
    titleStatus = false,
    swiperStatus = false, //轮播图状态
    data: { columns = [], dataSource = [] } = {},
  } = recursionOptions(props || {}, true)
  const prevProps = useRef(recursionOptions(props || {}, true));
  const dataNumber = dataSource ? dataSource.length : 0
  const viewingAreaDataDome = useRef(null)
  const bufferAreaDataDome = useRef(null)
  const invisibleAreaDataDome = useRef(null)
  const translateNumber = useRef(0) //最终滚动到的位置（百分比）
  const spaceBetweenNumber = useRef(0) //当前是间隔的第某个条数
  const areaNumber = useRef(0) //应该获取的数据范围
  const initStatus = useRef(false) //初始化执行一次
  const pausedStatus = useRef(true) //鼠标经过状态
  const [viewingData, setViewingData] = useState(0) //第一个dome的数据
  const [bufferData, setBufferData] = useState(0) //第二个dome的数据
  const [invisibleData, setInvisibleData] = useState(0) //第三个dome的数据
  const speedDomeOne = [
    viewingAreaDataDome,
    bufferAreaDataDome,
    invisibleAreaDataDome,
  ] //dome可视化时的操作
  const timer = useRef()
  const intervalTimer = useRef()

  useEffect(() => {
    prevProps.current = recursionOptions(props || {}, true);
  }, [props])

  /**
   * 定时器执行
   */
  useEffect(() => {
    if (dataNumber && dataNumber > Number(scrollingNumber)) {
      timer.current = setTimeout(() => {
        window.requestAnimationFrame(startFunc)
      }, 1000)
    }
    return () => {
      if (initStatus.current) {
        spaceBetweenNumber.current = 0
        translateNumber.current = 0
      }
      initStatus.current = false
      clearTimeout(timer.current)
      clearTimeout(intervalTimer.current)
    }
  }, [dataNumber, scrollingSpeed, scrollingNumber])

  /**
   * 每一块dom进入可视化区域的数据调整
   */
  const startFunc = useCallback(() => {
    console.log('scrollingSpeed', scrollingSpeed)
    if (pausedStatus.current) {
      let translate = 0
      if (swiperStatus) {
        translate =
          translateNumber.current <= -300
            ? -100 / scrollingNumber
            : translateNumber.current - 100 / scrollingNumber
      } else {
        translate =
          translateNumber.current <= -300 ? -100 : translateNumber.current - 100
      }
      //最终滚到的位置 = 当前位置 <= -300 (表示已到临界值）？归零计算每一次滚动的距离 ： 当前位置 - 每一次滚动的距离
      translateNumber.current = translate

      //第一块dom
      if (translate >= -100) {
          if (initStatus.current) {
            domeFunc(setInvisibleData)
          }
        
        if (!initStatus.current) {
          initStatus.current = true
          // areaNumber.current = 0
        }
        scrollTransitionFunc(2)
        scrollTopFunc([translate, translate, translate])
        //第二块dom
      } else if (translate >= -200) {
          domeFunc(setViewingData)
        scrollTransitionFunc(0)
        scrollTopFunc([300 + translate, translate, translate])
        //第三块dom
      } else if (translate >= -300) {
        domeFunc(setBufferData)
        scrollTransitionFunc(1)
        scrollTopFunc([300 + translate, 300 + translate, translate])
      }
    }

    intervalTimer.current = setTimeout(() => {
      window.requestAnimationFrame(startFunc)
    }, Number(swiperStatus ? scrollingSpeed / scrollingNumber : scrollingSpeed))
  }, [dataNumber, scrollingSpeed, initStatus, areaNumber])

  /**
   * 更新的数据范围
   * @param {*} setData
   */
  const domeFunc = (setData) => {
    setData && setData(areaNumber.current)
  }

  /**
   * dome的移动动画，目的是看起来有过渡效果，移动起来不那么生硬
   * @param {*} num
   */
  const scrollTransitionFunc = (num) => {
    speedDomeOne.forEach((dome, index) => {
      dome.current.style.transition = `transform ${(typeof num === 'boolean' || index === num)
        ? 0
        : Number(
          swiperStatus
            ? scrollingSpeed / scrollingNumber / 2
            : scrollingSpeed
        )
        }ms linear`
    })
  }

  /**
   * dome的移动位置
   * @param {*} dome
   * @param {*} percentage
   */
  const scrollTopFunc = (translateList) => {
    speedDomeOne.forEach((dome, index) => {
      dome.current.style.transform = `translate(0, ${translateList[index]}%)`
    })
  }

  /**
   * 获取不同区域的数据
   * @param {*} list
   */
  const areaDatafunc = () => {
    console.log('dataNumber', dataNumber, dataSource)
    if (!dataNumber) return []
    const realDataSource = transferData(dataSource)
    let areaData = []
    for (let i = 0; i < Number(scrollingNumber); i++) {
      if (realDataSource[areaNumber.current]) {
        areaData.push({
          ...realDataSource[areaNumber.current],
          key: areaNumber.current,
        })
        areaNumber.current = areaNumber.current + 1
      } else {
        if (dataNumber < scrollingNumber) return areaData
        if (spaceBetweenNumber.current === Number(spaceBetween)) {
          spaceBetweenNumber.current = 0
          areaNumber.current = 0
          areaData.push({
            ...realDataSource[areaNumber.current],
            key: areaNumber.current,
          })
          areaNumber.current = areaNumber.current + 1
        } else {
          areaData.push(undefined)
          spaceBetweenNumber.current = spaceBetweenNumber.current + 1
        }
      }
    }
    return areaData
  }

  //显示区域渲染数据处理
  const viewingAreaData = useMemo(() => {
    const { scrollingNumber: prevScrollingNumber, data: { dataSource: prevDataSource = [] } = {} } = prevProps.current;
    if (scrollingNumber !== prevScrollingNumber || dataNumber !== prevDataSource.length) {
      console.log('reset');
      areaNumber.current = 0;
      spaceBetweenNumber.current = 0;
      scrollTransitionFunc(true)
      scrollTopFunc([0, 0, 0])
    }
    return areaDatafunc()
  }, [viewingData, dataNumber, spaceBetween, scrollingSpeed, scrollingNumber])

  //缓冲区域渲染数据处理
  const bufferAreaData = useMemo(() => {
    return dataNumber < scrollingNumber ? [] : areaDatafunc()
  }, [bufferData, dataNumber, spaceBetween, scrollingSpeed, scrollingNumber])

  //不可见区域渲染数据处理
  const invisibleAreaData = useMemo(() => {
    return dataNumber < scrollingNumber ? [] : areaDatafunc()
  }, [invisibleData, dataNumber, spaceBetween, scrollingSpeed, scrollingNumber])

  /**
   * 鼠标悬浮事件
   * @param {*} status 
   */
  const onMouseFunc = (status) => {
    pausedStatus.current = status;
    speedDomeOne.forEach((dome) => {
      dome.current.style.animationPlayState = 'paused';
    })
  }

  const matchItemAttr = useCallback(
    (dataIndex, keyIndex) => {
      const single = keyIndex % 2
      const { width = 'auto' } =
        columns.find((v) => v.dataIndex === dataIndex) || {}
      const backgroundStyle = {}
      if (verticalSalmonSingle) {
        backgroundStyle.backgroundColor = single
          ? verticalSalmonS
          : verticalSalmon
      }
      return {
        style: { ...itemStyle, width, ...backgroundStyle },
        className: classnames('infinite-scroll-list-box-item', {
          'ff-component-virtualiinfinitescrolllist-ellipsis': ellipsis,
          'ff-component-virtualiinfinitescrolllist-center': center,
        }),
      }
    },
    [
      ellipsis,
      columns,
      center,
      itemStyle,
      verticalSalmonSingle,
      verticalSalmon,
      verticalSalmonS,
    ]
  )

  const computedCellStyle = useCallback(
    (item) => {
      const style = {
        height: `${100 / Number(scrollingNumber)}%`,
      }
      if (salmonSingle && item) {
        const status = item.key % 2
        style.backgroundColor = status ? salmonS : salmon
      }
      return style
    },
    [scrollingNumber, salmonSingle, salmon, salmonS]
  )

  const ItemWrapper = useMemo(() => {
    return tooltip ? Tooltip : Fragment
  }, [tooltip])

  const renderContent = (ref, data, cls) => {
    return (
      <div className={classnames('infinite-scroll-list-box', cls)} ref={ref}>
        {data.map((item, index) => {
          return item ? (
            <ul key={index} className="scroll" style={computedCellStyle(item)}>
              {columns.map(({ dataIndex }, keyIndex) => (
                <ItemWrapper
                  key={dataIndex}
                  title={
                    <span
                      dangerouslySetInnerHTML={{
                        __html: itemRender(dataIndex, item[dataIndex], item),
                      }}
                    />
                  }
                >
                  <li {...matchItemAttr(dataIndex, keyIndex)}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: itemRender(dataIndex, item[dataIndex], item),
                      }}
                    />
                  </li>
                </ItemWrapper>
              ))}
            </ul>
          ) : null
        })}
      </div>
    )
  }

  const renderData = [viewingAreaData, bufferAreaData, invisibleAreaData]

  const renderCls = [
    'viewingAreaDataDome',
    'bufferAreaDataDome',
    'invisibleAreaDataDome',
  ]

  return (
    <ConfigProvider prefixCls="ant4">
      <div
        className={classnames(
          'ff-component-virtualiinfinitescrolllist-scroll-box',
          {
            'ff-component-virtualiinfinitescrolllist-scroll-box-theme':
              defaultTheme,
          }
        )}
        onMouseEnter={() => onMouseFunc(false)}
        onMouseLeave={() => onMouseFunc(true)}
      >
        {titleStatus && columns.length && (
          <ul
            className="title-style"
            style={{ height: titleHeight, ...titleStyle }}
          >
            {columns.map(({ title, dataIndex, width = 'auto' }) => (
              <li
                key={dataIndex}
                style={{ width }}
                className={classnames({
                  'ff-component-virtualiinfinitescrolllist-ellipsis': ellipsis,
                  'ff-component-virtualiinfinitescrolllist-center': center,
                })}
                dangerouslySetInnerHTML={{
                  __html: titleRender(dataIndex, title),
                }}
              ></li>
            ))}
          </ul>
        )}
        <div
          className="list-box"
          style={{
            height: `calc(100% - ${titleStatus ? titleHeight + 'px' : '0px'})`,
          }}
        >
          {speedDomeOne.map((ref, index) => (
            <Fragment key={index}>
              {renderContent(ref, renderData[index], renderCls[index])}
            </Fragment>
          ))}
        </div>
      </div>
    </ConfigProvider>
  )
}
export default VirtualiInfiniteScrollList
