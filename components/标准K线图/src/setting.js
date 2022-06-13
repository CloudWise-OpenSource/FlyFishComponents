
'use strict';

/**
 * @description 注册62a6ac3dd67fbf2034b30684组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("62a6ac3dd67fbf2034b30684", "v-current", OptionsSetting);
registerComponentDataSetting("62a6ac3dd67fbf2034b30684", "v-current", DataSetting);
