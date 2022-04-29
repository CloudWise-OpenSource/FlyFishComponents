
/**
 * @description 注册Video组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "../src/settings/data";
import OptionsSetting from "../src/settings/options";

registerComponentOptionsSetting('61aa27acd39bdf74f6d602dd', 'v-current',  OptionsSetting);
registerComponentDataSetting('61aa27acd39bdf74f6d602dd', 'v-current',  DataSetting);
