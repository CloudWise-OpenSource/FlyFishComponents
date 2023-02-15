/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import OptionsSetting from "../src/settings/options";
import DataSetting from "../src/settings/data";

registerComponentOptionsSetting('${ComponentIdTpl}', 'v-current',  OptionsSetting);
registerComponentDataSetting('${ComponentIdTpl}', 'v-current',  DataSetting);
