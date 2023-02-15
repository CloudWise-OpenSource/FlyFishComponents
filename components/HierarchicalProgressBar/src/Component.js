
'use strict';

import ReactComponent from "data-vi/ReactComponent";
import Index from './ProgressOval/index';
export default class Component extends ReactComponent {
	// 默认配置
	static defaultConfig = {
		width: 960,
		height: 480
	};
	// 默认选项
	static defaultOptions = {
		showStatus: true,//是否使用分层背景颜色
		max: 500,//最大值
		scheduleOne: "#00FFFF",
		scheduleTow: "#0095FF",
	};
	// 系统事件
	static events = {};
	// 是否加载css文件 如当前组件没有样式文件，设置为false
	static enableLoadCssFile = true;

	// 获取默认事件
	getDefaultData() {
		return {
			list: [
				{
					"datetime": "2020-12-23",
					"nums": 382,
					"name": "演示环境-信息1-xxx"
				},
				{
					"datetime": "2020-10-29",
					"nums": 332,
					"name": "演示环境-信息2-xxx"
				},
				{
					"datetime": "2020-06-22",
					"nums": 243,
					"name": "演示环境-信息3-xxx"
				},
				{
					"datetime": "2018-11-03",
					"nums": 192,
					"name": "演示环境-信息4-xxx"
				},
				{
					"datetime": "2020-05-27",
					"nums": 186,
					"name": "演示环境-信息5-xxx"
				},
				{
					"datetime": "2018-11-25",
					"nums": 174,
					"name": "演示环境-信息6-xxx"
				},
				{
					"datetime": "2020-10-28",
					"nums": 172,
					"name": "演示环境-信息7-xxx"
				},
				{
					"datetime": "2021-03-26",
					"nums": 166,
					"name": "演示环境-信息8-xxx"
				},
				{
					"datetime": "2021-03-25",
					"nums": 166,
					"name": "演示环境-信息9-xxx"
				},
				{
					"datetime": "2021-01-20",
					"nums": 165,
					"name": "演示环境-信息10-xxx"
				}
			]
		};
	}

	getReactComponent() {
		return Index;
	}


}

