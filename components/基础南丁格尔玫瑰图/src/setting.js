
'use strict';

/**
 * @description 注册62afd0bb6b1f6420422fa7ad组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('62afd0bb6b1f6420422fa7ad', 'v-current', OptionsSetting);
registerComponentDataSetting('62afd0bb6b1f6420422fa7ad', 'v-current', DataSetting);
