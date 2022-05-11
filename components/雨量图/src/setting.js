
'use strict';

/**
 * @description 注册627b5d68988a433c0cb98381组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("627b5d68988a433c0cb98381", "v-current", OptionsSetting);
registerComponentDataSetting("627b5d68988a433c0cb98381", "v-current", DataSetting);
