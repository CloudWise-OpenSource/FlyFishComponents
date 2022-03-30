import ReactComponent from 'data-vi/ReactComponent';
import VirtualiInfiniteScrollList from './VirtualiInfiniteScrollList.js';
import ScrollList from './ScrollList';
export default class Index extends ReactComponent {
  // 默认配置
  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 441,
      height: 322,
      visible: true,
      name: '动态数据加载无限滚动列表【基础通用】',
    };
  }

  // 默认选项
  static defaultOptions = {
    defaultTheme: true, // 初始默认样式
    ellipsis: true, // 单元格是否启用超出省略功能
    center: true, // 是否文字居中
    scrollingSpeed: 3000, //定时器的执行速度
    scrollingDistance: 20, //每一次滚动的距离（百分比）
    scrollingNumber: 10, //每个dome渲染的数据量默认10条，取余10条的时候会更新一部分数据
    spaceBetween: 0, //每次数据结束到下一波数据的时候中间的间隔数量
    titleStatus: true, //title表头是否展示
    salmonSingle: true, //单行色值
    titleHeight: 60, // 表头高度
    titleStyle: {}, // 表头样式
    itemStyle: {}, // 单个元素样式
    salmon: 'rgba(216, 216, 216, 0)',
    salmonS: 'rgba(199, 236, 255, .06)',
    verticalSalmonSingle: true, // 垂直单色模式
    verticalSalmon: 'rgba(216, 216, 216, 0)',
    verticalSalmonS: 'rgba(199, 236, 255, .06)',
    tooltipBackground: '#000000d9', // 提示框背景色
    tooltip: true, // 单元格是否开启tooltip
    borderType: 'solid',
    borderWidth: 0,
    borderColor: undefined,
    borderRadius: 2,
    titleRender: `function(dataIndex, value, setEvent) { return value; }`,
    itemRender: `function(dataIndex, value, record, eventCenter) { return value; }`,
    tooltipRender: `function(dataIndex, value, record, eventCenter) { return value; }`,
    transferData: `function(data) { return data; }`,
  };
  // 系统事件
  static events = {};
  // 是否加载css文件 如当前组件没有样式文件，设置为false
  static enableLoadCssFile = true;
  getDefaultData() {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'title',
          key: 'title',
          width: '30%',
        },
        {
          title: '数值',
          dataIndex: 'number',
          key: 'number',
          width: '30%',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: '30%',
        },
      ],
      dataSource: [
        {
          title:
            '这是 FF 评价设计好坏的内在标准。基于「每个人都追求快乐工作」这一假定，我们在「确定性」和「自然」的基础上，新增「意义感」和「生长性」两个价值观，指引每个设计者做更好地判断和决策。',
          number: '数值1',
          status: '状态1',
        },
        {
          title: '标题1',
          number: '数值2',
          status: '状态2',
        },
      ],
    };
  }
  getReactComponent() {
    return ScrollList;
  }
}
