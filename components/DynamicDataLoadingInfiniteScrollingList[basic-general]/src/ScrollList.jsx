import React, {
  memo,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import classnames from 'classnames';
import {
  recursionOptions,
  log,
  ANTPREFIX,
  getGradientPreview,
} from '@cloudwise-fe/chart-panel';
import { Tooltip, ConfigProvider } from 'antd';
ConfigProvider.config({
  prefixCls: ANTPREFIX,
});
// 定成30fps
const INTERVAL = 32;
import './assets/style.less';

const ScrollList = memo((props) => {
  const {
    titleHeight,
    titleStatus,
    titleStyle,
    titleRender,
    itemRender,
    itemStyle,
    scrollingSpeed,
    defaultTheme,
    ellipsis,
    center,
    verticalSalmonSingle,
    verticalSalmon,
    verticalSalmonS,
    salmonSingle,
    salmon,
    salmonS,
    tooltip,
    tooltipBackground,
    tooltipRender,
    parent,
    borderWidth,
    borderType,
    borderColor,
    borderRadius,
  } = recursionOptions(props || {}, true);
  const { data: propsData = {}, scrollingNumber } = useMemo(() => {
    return recursionOptions(props || {}, true);
  }, [props.data, props.scrollingNumber]);
  const page = useRef(null);
  const [renderData, setRenderData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const domRefs = useRef([]);
  const containerRef = useRef();
  const timer = useRef([]);
  const init = useRef(false);
  // 点击标题的方法枚举(@author: Rookie.Ou)
  const clickTitleEnum = useRef({});
  const [operatingData, setOperatingData] = useState(null); // 操作数据类型， sort 对数据进行过滤， filter: 对数据进行过滤

  useEffect(() => {
    console.log('data change', props.data);
    if (props.data && (props.data.dataSource || props.data.length)) {
      init.current = true;
    }
  }, [props.data]);

  useEffect(() => {
    if (!init.current) return;
    log('props data change');
    let { columns = [], dataSource = [] } = transferDataSource(propsData);
    // 数据加工
    if (
      operatingData &&
      typeof clickTitleEnum.current[operatingData] === 'function'
    ) {
      dataSource = clickTitleEnum.current[operatingData](dataSource);
    }
    log(transformDataSourceWithIDX(dataSource));
    page.current = null;
    const newestDataRect = caculateDataRect(
      transformDataSourceWithIDX(dataSource),
      [],
      scrollingNumber,
      null,
    );
    setRenderData(newestDataRect);
    setTableColumns(columns);
  }, [propsData, scrollingNumber, operatingData]);

  useEffect(() => {
    if (!init.current) return;

    if (typeof page.current !== 'number') {
      resetRectTranslateState();
    }

    if (timer.current.length) {
      timer.current.reverse().forEach((v) => cancelAnimationFrame(v));
      timer.current = [];
    }

    // use delay make transition mutation succss
    if (renderData.every((v) => v.length)) {
      timer.current.push(
        requestAnimationFrame(() => {
          startAnimation();
          cancelAnimationFrame(timer.current.splice(0, 1)[0]);
        }),
      );
    }
  }, [renderData]);

  const handleTransitionEnd = useCallback(() => {
    const { dataSource = [] } = transferDataSource(propsData);
    if (dataSource.length / 2 === scrollingNumber) {
      startAnimation();
      return;
    }
    const newestDataRect = caculateDataRect(
      transformDataSourceWithIDX(dataSource),
      renderData,
      scrollingNumber,
      page.current,
    );

    setRenderData(newestDataRect);
  }, [renderData, page.current, scrollingNumber, domRefs.current]);

  const resetRectTranslateState = useCallback(() => {
    domRefs.current.forEach((ref, i) => {
      ref.style.transitionProperty = 'color';
      ref.style.removeProperty('transform');
    });
    console.log('refs & resetAnimation', domRefs.current);
  }, [domRefs.current]);

  const startAnimation = useCallback(() => {
    const current = typeof page.current === 'number' ? page.current : 0;
    const nextPage = Number(!current);

    domRefs.current.forEach((ref, i) => {
      let translateY = '-100%';
      let transitionProperty = 'transform';
      // scroll num:
      // reset: 0% -> -100%, 0% -> -100%
      // current-1: -100% -> 100% -> 0%, -100% -> -200%
      // current-0: 0% -> -100%, -200% -> 0% -> -100%
      if (typeof page.current == 'number') {
        ref.style.transitionProperty = 'color';
        const checkRequestAnimationFrameCallback = () => {
          timer.current.push(
            requestAnimationFrame(() => {
              const rect = containerRef.current.querySelectorAll(
                '.infinite-scroll-list-box',
              );
              if (
                [...rect].some(
                  (v) =>
                    window.getComputedStyle(v)['transition-property'] !==
                    'color',
                )
              ) {
                log('transition-property do not change complete');
                checkRequestAnimationFrameCallback();
              } else {
                if (current === 0) {
                  if (i === 1) {
                    ref.style.removeProperty('transform');
                  } else {
                    ref.style.transform = 'translateY(0%)';
                  }
                  timer.current.push(
                    requestAnimationFrame(() => {
                      ref.style.transitionProperty = transitionProperty;
                      ref.style.transform = 'translateY(-100%)';
                    }),
                  );
                } else {
                  if (i === 0) {
                    ref.style.transform = 'translateY(100%)';
                  } else {
                    ref.style.transform = 'translateY(-100%)';
                  }
                  timer.current.push(
                    requestAnimationFrame(() => {
                      console.log(Date.now(), 'requestAnimation');
                      ref.style.transitionProperty = transitionProperty;
                      ref.style.transform = `translateY(${
                        i === 0 ? 0 : -200
                      }%)`;
                    }),
                  );
                }
              }
            }),
          );
        };
        checkRequestAnimationFrameCallback();
        // timer.current.push(
        //   requestAnimationFrame(() => {
        //     if (current === 0) {
        //       if (i === 1) {
        //         ref.style.removeProperty('transform');
        //       } else {
        //         ref.style.transform = 'translateY(0%)';
        //       }
        //       timer.current.push(
        //         requestAnimationFrame(() => {
        //           ref.style.transitionProperty = transitionProperty;
        //           ref.style.transform = 'translateY(-100%)';
        //         }),
        //       );
        //     } else {
        //       if (i === 0) {
        //         ref.style.transform = 'translateY(100%)';
        //       } else {
        //         ref.style.transform = 'translateY(-100%)';
        //       }
        //       timer.current.push(
        //         requestAnimationFrame(() => {
        //           console.log(Date.now(), 'requestAnimation');
        //           ref.style.transitionProperty = transitionProperty;
        //           ref.style.transform = `translateY(${i === 0 ? 0 : -200}%)`;
        //         }),
        //       );
        //     }
        //   }),
        // );
      } else {
        ref.style.transitionProperty = transitionProperty;
        ref.style.transform = `translateY(${translateY})`;
      }
    });
    console.log(
      'start or trigger animation use requestAnimationFrame',
      Date.now(),
      page.current,
      nextPage,
    );

    page.current = nextPage;
  }, [page.current, domRefs.current]);

  const matchItemAttr = useCallback(
    (dataIndex, keyIndex) => {
      const single = keyIndex % 2;
      const { width = 'auto' } =
        tableColumns.find((v) => v.dataIndex === dataIndex) || {};
      const backgroundStyle = {};
      if (verticalSalmonSingle) {
        backgroundStyle.backgroundColor = single
          ? verticalSalmonS
          : verticalSalmon;
      }
      return {
        style: { ...itemStyle, width, ...backgroundStyle },
        className: classnames('infinite-scroll-list-box-item', {
          'ff-component-virtualiinfinitescrolllist-ellipsis': ellipsis,
          'ff-component-virtualiinfinitescrolllist-center': center,
        }),
      };
    },
    [
      ellipsis,
      tableColumns,
      center,
      itemStyle,
      verticalSalmonSingle,
      verticalSalmon,
      verticalSalmonS,
    ],
  );

  const computedCellStyle = useCallback(
    (item) => {
      const style = {
        height: `${100 / Number(scrollingNumber)}%`,
      };
      if (salmonSingle && item) {
        const status = item.__$id % 2;
        style.backgroundColor = status ? salmonS : salmon;
      }
      return style;
    },
    [scrollingNumber, salmonSingle, salmon, salmonS],
  );

  const memoTooltipBackground = useMemo(() => {
    if (typeof tooltipBackground === 'string') {
      return tooltipBackground;
    }
    return getGradientPreview(
      tooltipBackground.colorStops,
      tooltipBackground.angle,
    ).background;
  }, [tooltipBackground]);

  const ItemWrapper = useMemo(() => {
    return tooltip ? Tooltip : Fragment;
  }, [tooltip]);

  const setTitleClickFunc = useCallback(
    (dataIndex, callback) => {
      console.log('setTitleClickFunc', dataIndex, callback);
      clickTitleEnum.current[dataIndex] = callback;
    },
    [clickTitleEnum.current],
  );

  const onHandleTitle = useCallback((key) => {
    console.log('onHandleTitle', key, clickTitleEnum.current[key]);
    if (typeof clickTitleEnum.current[key] === 'function') {
      setOperatingData(key);
    }
  }, []);

  return (
    <ConfigProvider prefixCls={ANTPREFIX}>
      <div
        className={classnames(
          'ff-component-virtualiinfinitescrolllist-scroll-box',
          {
            'ff-component-virtualiinfinitescrolllist-scroll-box-theme':
              defaultTheme,
          },
        )}
      >
        {titleStatus && tableColumns.length > 0 && (
          <ul
            className="title-style"
            style={{ height: titleHeight, ...titleStyle }}
          >
            {tableColumns.map(({ title, dataIndex, width = 'auto' }) => (
              <li
                key={dataIndex}
                style={{ width }}
                className={classnames({
                  'ff-component-virtualiinfinitescrolllist-ellipsis': ellipsis,
                  'ff-component-virtualiinfinitescrolllist-center': center,
                })}
                onClick={() => {
                  onHandleTitle(dataIndex);
                }}
                dangerouslySetInnerHTML={{
                  __html: titleRender(dataIndex, title, setTitleClickFunc),
                }}
              ></li>
            ))}
          </ul>
        )}
        <div
          className="list-box"
          ref={containerRef}
          style={{
            height: `calc(100% - ${titleStatus ? titleHeight + 'px' : '0px'})`,
          }}
        >
          {renderData.map((v, i) => (
            <div
              key={i}
              className={classnames('infinite-scroll-list-box')}
              style={{
                transitionDuration: scrollingSpeed + 'ms',
                transitionTimingFunction: 'linear',
              }}
              ref={(ref) => (domRefs.current[i] = ref)}
              onTransitionEnd={() => i === 1 && handleTransitionEnd()}
            >
              {v.map((item) => (
                <ul
                  key={item.__$id}
                  className="scroll"
                  style={computedCellStyle(item)}
                >
                  {tableColumns.map(({ dataIndex }, keyIndex) => (
                    <ItemWrapper
                      key={dataIndex}
                      {...(tooltip
                        ? {
                            title: (
                              <div className="ff-component-virtualiinfinitescrolllist-tooltip-wrapper">
                                <div
                                  className="ff-component-virtualiinfinitescrolllist-tooltip-bg"
                                  style={{
                                    borderStyle: borderType,
                                    borderWidth,
                                    borderColor,
                                    borderRadius,
                                    width: `calc(100% + 16px + ${
                                      borderWidth * 2
                                    }px)`,
                                    height: `calc(100% + 12px + ${
                                      borderWidth * 2
                                    }px)`,
                                    top: `${-6 - borderWidth}px`,
                                    left: `${-8 - borderWidth}px`,
                                  }}
                                >
                                  <div
                                    style={{
                                      borderStyle: borderType,
                                      borderWidth,
                                      borderColor,
                                      // mark 暂未完成
                                      bottom: `${
                                        (-Math.sin(90) *
                                          (7.07 + borderWidth * 2)) /
                                        3
                                      }px`,
                                      width: `${7.07 + borderWidth * 2}px`,
                                      height: `${7.07 + borderWidth * 2}px`,
                                      transform: `translateX(-50%) rotate(45deg)`,
                                    }}
                                  />
                                </div>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: tooltipRender(
                                      dataIndex,
                                      item[dataIndex],
                                      item,
                                    ),
                                  }}
                                />
                              </div>
                            ),
                            color: memoTooltipBackground,
                            overlayClassName:
                              'ff-component-virtualiinfinitescrolllist-tooltip',
                            overlayInnerStyle: { borderRadius },
                          }
                        : {})}
                    >
                      <li
                        key={keyIndex}
                        {...matchItemAttr(dataIndex, keyIndex)}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: itemRender(
                              dataIndex,
                              item[dataIndex],
                              item,
                              parent,
                            ),
                          }}
                        />
                      </li>
                    </ItemWrapper>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
});

export default ScrollList;

function transformDataSourceWithIDX(dataSource) {
  return dataSource.map((v, i) => ({
    ...v,
    __$id: typeof v.__$id === 'number' ? v.__$id : i,
  }));
}

function caculateDataRect(dataSource, prevDataSource, number, page) {
  console.log("dataSource",dataSource,"number", number);
  // 不管满不满足。都处理出来两屏。保证可以尺寸滚动不断档
  if (!dataSource || !dataSource.length) {
    return [[], []];
  }
  const lessThenOnePage = dataSource.length <= number;
  if (lessThenOnePage) {
    return [dataSource, []];
  }
  // 大于单屏数目的时候开始判断当前渲染结果
  if (typeof page === 'number') {
    // 在滚动
    const currentDataRect = prevDataSource[page];
    const startIndex = [...currentDataRect].pop().__$id + 1;
    console.log("startIndex",startIndex );
    // 计算下一页的数据
    const sliceIndex = [startIndex];
    if (dataSource.length - 1 - startIndex < number) {
      sliceIndex.push(number - (dataSource.length - startIndex));
    }
    // 放到飞鱼里打包不能用flat, concat mock 一下吧
    const nextDataRect = [].concat(
      ...sliceIndex.map((sliceIdx, i) => {
        if (sliceIndex.length > 1) {
          return !i
            ? dataSource.slice(sliceIdx)
            : dataSource.slice(0, sliceIdx);
        } else {
          return dataSource.slice(sliceIdx, sliceIdx + number);
        }
      }),
    );
    return page === 0
      ? [currentDataRect, nextDataRect]
      : [nextDataRect, currentDataRect];
  } else {
    const firstRect = dataSource.slice(0, number);
    const secondRect =
      dataSource.length - number * 2 >= 0
        ? dataSource.slice(number, number * 2)
        : [
            dataSource.slice(number, number * 2),
            dataSource.slice(0, number * 2 - dataSource.length),
          ].flat();
    return [firstRect, secondRect];
  }
}

function transferDataSource(data) {
  if (data.columns && Array.isArray(data.columns)) {
    return { ...data };
  }
  if (Array.isArray(data) && data.length) {
    const {
      columns_title = '',
      columns_dataIndex = '',
      columns_width = '',
      id,
    } = data[0];
    const titleArray = columns_title.split(',').map((v) => v.trim());
    const widthArray = columns_width.split(',').map((v) => v.trim());
    const columns = columns_dataIndex
      .split(',')
      .map((v) => v.trim())
      .map((dataIndex, index) => ({
        dataIndex,
        title: titleArray[index],
        width: widthArray[index],
        key: id,
      }));
    return {
      columns,
      dataSource: [...data],
    };
  } else {
    return {};
  }
}
