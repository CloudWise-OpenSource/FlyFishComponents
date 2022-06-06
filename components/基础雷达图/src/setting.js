
'use strict';

/**
 * @description 注册629d9e81bb50b5204a0a701c组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("629d9e81bb50b5204a0a701c", "v-current", OptionsSetting);
registerComponentDataSetting("629d9e81bb50b5204a0a701c", "v-current", DataSetting);
