
'use strict';

/**
 * @description 注册6273ac7c988a433c0cb93db9组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("6273ac7c988a433c0cb93db9", "v-current", OptionsSetting);
registerComponentDataSetting("6273ac7c988a433c0cb93db9", "v-current", DataSetting);
