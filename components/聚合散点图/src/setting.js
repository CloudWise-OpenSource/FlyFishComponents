
'use strict';

/**
 * @description 注册62a6b58418ac85202e3c0998组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("62a6b58418ac85202e3c0998", "v-current", OptionsSetting);
registerComponentDataSetting("62a6b58418ac85202e3c0998", "v-current", DataSetting);
