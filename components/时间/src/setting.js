
/**
 * @description 注册Time组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('61aa27acd39bdf74f6d6024a', 'v-current', OptionsSetting);
registerComponentDataSetting('61aa27acd39bdf74f6d6024a', 'v-current', DataSetting);
