
/**
 * @description 注册VirtualiInfiniteScrollList组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "../src/settings/data";
import OptionsSetting from "../src/settings/options";

registerComponentOptionsSetting('61aa27acd39bdf74f6d60295', 'v-current',  OptionsSetting);
registerComponentDataSetting('61aa27acd39bdf74f6d60295', 'v-current',  DataSetting);
