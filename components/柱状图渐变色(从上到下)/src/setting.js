
'use strict';

/**
 * @description 注册629d6001c2057d20748eed68组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("629d6001c2057d20748eed68", "v-current", OptionsSetting);
registerComponentDataSetting("629d6001c2057d20748eed68", "v-current", DataSetting);
