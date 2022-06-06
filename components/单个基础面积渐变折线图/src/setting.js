
'use strict';

/**
 * @description 注册629d997a26b32a2058aa4b86组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("629d997a26b32a2058aa4b86", "v-current", OptionsSetting);
registerComponentDataSetting("629d997a26b32a2058aa4b86", "v-current", DataSetting);
