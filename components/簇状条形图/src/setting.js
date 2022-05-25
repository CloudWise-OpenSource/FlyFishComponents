/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import OptionsSetting from "../src/settings/options";
import DataSetting from "../src/settings/data";

registerComponentOptionsSetting('626b4131e6dcf01bc1ff6fad', 'v-current',  OptionsSetting);
registerComponentDataSetting('626b4131e6dcf01bc1ff6fad', 'v-current',  DataSetting);
