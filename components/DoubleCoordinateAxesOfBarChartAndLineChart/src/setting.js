
'use strict';

/**
 * @description 注册629d9d40c1b51f206f35714a组件的设置面板
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
