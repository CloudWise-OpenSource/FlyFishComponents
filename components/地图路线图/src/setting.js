
'use strict';

/**
 * @description 注册62a6af1cb80781203cdf73f9组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("62a6af1cb80781203cdf73f9", "v-current", OptionsSetting);
registerComponentDataSetting("62a6af1cb80781203cdf73f9", "v-current", DataSetting);
