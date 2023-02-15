import { merge } from 'data-vi/helpers'

/**
 * @description noop
 */
export const noop = () => { }

/**
 * @description 判断数组类型(比如返回`string`则为string[], 依次类推)
 */
export const checkArrayType = (array) => {
  if (!array || !array.length) {
    console.warn('typeof args must be array object[], not empty')
    return false
  }
  const [item] = array
  return Object.prototype.toString
    .call(item)
    .match(/\[object ([A-Z][a-z]+)\]/)[1]
}

/**
 * @description 根据seriesData生成对应的图例和series
 */
export const generateSeriesAndLegend = (series) => {
  let formatSeries = {}
  // 判断是哪种类型, 对应处理数据
  const type = checkArrayType(series)
  if (!type) return formatSeries

  formatSeries = {
    series: series.map((v) => ({ ...v, type: 'bar' })),
    type,
  }

  return formatSeries
}

/**
 * @description 匹配函数体
 * @param {string} value
 * @returns
 */
export const matchFunctionBody = (value = '') => {
  value = value.replace(/\n/g, '')
  const reg = /\{([\s\S]*)\}/
  const markParam = /\(([^\)]*)\)/
  let params = (value.match(markParam)[1] || '')
    .split(',')
    .map((v) => v.replaceAll(' ', ''))

  return [params.length > 1 ? params : params[0], value.match(reg)[1] || '']
}

/**
 * @description 首字母大写
 * @param {string} word
 * @returns
 */
export const upperCaseIndentWord = (word) => {
  const wordArray = word.split('')
  if (wordArray.length >= 1) {
    wordArray.splice(0, 1, wordArray[0].toUpperCase())
  }
  return wordArray.join('')
}

export const transferDataSource = (dataSource,{ classify = 'name', y = 'label', x = 'value' }) => {
  const isObject =
    Object.prototype.toString.call(dataSource) === '[object Object]'
  // 默认数组为modal的数据。对象为当前的标准数据模型
  if (!dataSource) {
    return {}
  } else if (Array.isArray(dataSource)) {
    // return dataSource.reduce((entries, item) => {
    //   const { data = [], yAxis = [] } = entries
    //   const { y_axis = '', name = '', value = '' } = item
    //   return {
    //     data: [
    //       ...data,
    //       { name, data: value.split(',').map((v) => parseInt(v.trim())) },
    //     ],
    //     yAxis: y_axis.split(',').map((v) => v.trim()),
    //   }
    // }, {})
    return dataSource.reduce((entries, item) => {
      let { data = [], yAxis = [] } = entries;
      const classifyVal = item[classify || 'name'] || "";
      const yVal = item[y || 'label'];
      const xVal = item[x || 'value'];
      let targetIndex = 0;
      if (yVal) {
        targetIndex = yAxis.findIndex((z) => z === yVal);
        if (targetIndex === -1) {
          yAxis = yAxis.concat([yVal]);
          targetIndex = yAxis.length - 1;
        }
      }
      let targetDataIndex = data.findIndex((z) => z.name === classifyVal);
      if (targetDataIndex === -1) {
        let newSeries = {
          name: classifyVal,
          data: [],
        };
        newSeries.data[targetIndex] = xVal;
        data = data.concat([newSeries]);
      } else {
        data[targetDataIndex].data = data[targetDataIndex].data || [];
        data[targetDataIndex].data[targetIndex] = xVal;
      }
      return {
        data: data,
        yAxis: yAxis,
      };
    }, {});
    // 默认为是数据模型
  } else if (isObject) {
    return Array.isArray(dataSource.data) ? dataSource : dataSource.data
  }
}

export const formatFunctionsToOption = (functions = {}) => {
  let options = {}
  Object.entries(functions).forEach(([key, value]) => {
    const realKey = key.split('.')
    const [functionParams, functionBody] = matchFunctionBody(value)
    const params = [functionParams].flat()
    const formatterFunction = new Function(...params, functionBody)
    const initReduce = { [[...realKey].pop()]: formatterFunction }
    const formatObject = realKey
      .slice(0, -1)
      .reverse()
      .reduce((reduce, currentKey) => ({ [currentKey]: reduce }), initReduce)
    options = merge({}, options, formatObject)
  })
  return options
}
