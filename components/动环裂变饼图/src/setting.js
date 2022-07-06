
'use strict';

/**
 * @description 注册6232de889436f47b0e39cbf8组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('6232de889436f47b0e39cbf8', 'v-current', OptionsSetting);
registerComponentDataSetting('6232de889436f47b0e39cbf8', 'v-current', DataSetting);
