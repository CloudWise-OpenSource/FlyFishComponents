
'use strict';

/**
 * @description 注册62afd60671b746202637c8eb组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('62afd60671b746202637c8eb', 'v-current', OptionsSetting);
registerComponentDataSetting('62afd60671b746202637c8eb', 'v-current', DataSetting);
