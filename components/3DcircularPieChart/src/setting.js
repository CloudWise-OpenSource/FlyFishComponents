/*
 * @Author: Celestine.Gu
 * @Date: 2022-03-14 10:48:10
 * @LastEditors: Celestine.Gu
 * @LastEditTime: 2022-03-14 15:26:16
 * @Description: file content
 */

'use strict';

/**
 * @description 注册62afd877f8ed882065579b40组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('${ComponentIdTpl}', 'v-current',  OptionsSetting);
registerComponentDataSetting('${ComponentIdTpl}', 'v-current',  DataSetting);
