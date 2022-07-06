
'use strict';

/**
 * @description 注册62c5385c761a42178d753b12组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('62c5385c761a42178d753b12', 'v-current', OptionsSetting);
registerComponentDataSetting('62c5385c761a42178d753b12', 'v-current', DataSetting);
