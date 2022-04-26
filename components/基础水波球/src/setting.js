
/**
 * @description 注册WaterWaveBall组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "../src/settings/data";
import OptionsSetting from "../src/settings/options";

registerComponentOptionsSetting('61aa27abd39bdf74f6d60147', 'v-current',  OptionsSetting);
registerComponentDataSetting('61aa27abd39bdf74f6d60147', 'v-current',  DataSetting);
