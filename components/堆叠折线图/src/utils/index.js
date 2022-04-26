import { merge } from "data-vi/helpers";

/**
 * @description noop
 */
export const noop = () => { };

/**
 * @description 判断数组类型(比如返回`string`则为string[], 依次类推)
 */
export const checkArrayType = (array) => {
  if (!array || !array.length) {
    console.warn('typeof args must be array object[], not empty');
    return false;
  }
  const [item] = array;
  return Object.prototype.toString.call(item).match(/\[object ([A-Z][a-z]+)\]/)[1];
}

/**
 * @description 根据seriesData生成对应的图例和series
 */
export const generateSeriesAndLegend = (series) => {
  let formatSeries = {};
  console.log(series,'seriesseries')
  // 判断是哪种类型, 对应处理数据
  const type = checkArrayType(series);
  console.log(type,'typetypetypetype')

  if (!type) return formatSeries;

  formatSeries = {
    series,
    type
  }

  return formatSeries;
}

/**
 * @description 匹配函数体
 * @param {string} value 
 * @returns 
 */
export const matchFunctionBody = (value = '') => {
  value = value.replace(/\n/g, '');
  const reg = /\{([\s\S]*)\}/;
  const markParam = /\(([^\)]*)\)/;
  let params = (value.match(markParam)[1] || '').split(',').map(v => v.replaceAll(' ', ''));

  return [params.length > 1 ? params : params[0], value.match(reg)[1] || ''];
}

/**
 * @description 首字母大写
 * @param {string} word 
 * @returns 
 */
export const upperCaseIndentWord = (word) => {
  const wordArray = word.split('');
  if (wordArray.length >= 1) {
    wordArray.splice(0, 1, wordArray[0].toUpperCase());
  }
  return wordArray.join('');
}

export const transferDataSource = (dataSource,{ classify = 'name', x = 'label', y = 'value' }) => {
  console.log(dataSource,'dataSourcedataSourcedataSource')
  const isObject = Object.prototype.toString.call(dataSource) === '[object Object]'
  // 默认数组为modal的数据。对象为当前的标准数据模型
  if (!dataSource) {
    return {};
  } else if (Array.isArray(dataSource)) {
    // let data = [];
    // dataSource.forEach(item => {
    //   data.push({name:item.name,data:item.value});
    // })
    // return {
    //   xAxis:dataSource[0].x_axis,
    //   data:data,
    // };
    // return dataSource.reduce((entries, item) => {
    //   const { data = [], xAxis = [] } = entries;
    //   const { x_axis = '', name = '', value = '' } = item;
    //   return {
    //     data: [...data, { name, data: value.split(',').map(v => parseInt(v.trim())) }],
    //     xAxis: x_axis.split(',').map(v => v.trim())
    //   }
    // }, {})
    // 默认为是数据模型
    return dataSource.reduce((entries, item) => {
			let { data = [], xAxis = [] } = entries;
			const classifyVal = item[classify || 'name'] || "";
			const xVal = item[x || 'label'];
			const yVal = item[y || 'value'];
			let targetIndex = 0;
			if (xVal) {
			  targetIndex = xAxis.findIndex((z) => z === xVal);
			  if (targetIndex === -1) {
				xAxis = xAxis.concat([xVal]);
				targetIndex = xAxis.length - 1;
			  }
			}
			let targetDataIndex = data.findIndex((z) => z.name === classifyVal);
			if (targetDataIndex === -1) {
			  let newSeries = {
				name: classifyVal,
				data: [],
			  };
			  newSeries.data[targetIndex] = yVal;
			  data = data.concat([newSeries]);
			} else {
			  data[targetDataIndex].data = data[targetDataIndex].data || [];
			  data[targetDataIndex].data[targetIndex] = yVal;
			}
			return {
			  data: data,
			  xAxis: xAxis,
			};
		  }, {});
  } else if (isObject) {
    return Array.isArray(dataSource.data) ? dataSource : dataSource.data
  }
}

export const formatFunctionsToOption = (functions = {}) => {
  let options = {};
  Object.entries(functions).forEach(([key, value]) => {
    const realKey = key.split('.');
    const [functionParams, functionBody] = matchFunctionBody(value);
    const params = [functionParams].flat();
    const formatterFunction = new Function(...params, functionBody);
    const initReduce = { [[...realKey].pop()]: formatterFunction }
    const formatObject = realKey.slice(0, -1).reverse().reduce((reduce, currentKey) => ({ [currentKey]: reduce }), initReduce);
    options = merge({}, options, formatObject)
  });
  return options;
}