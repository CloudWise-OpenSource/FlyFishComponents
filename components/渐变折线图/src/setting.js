
'use strict';

/**
 * @description 注册62a6b47855cde8202771f1c5组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("62a6b47855cde8202771f1c5", "v-current", OptionsSetting);
registerComponentDataSetting("62a6b47855cde8202771f1c5", "v-current", DataSetting);
