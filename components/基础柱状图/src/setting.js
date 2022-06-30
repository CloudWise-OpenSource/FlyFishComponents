/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import OptionsSetting from "../src/settings/options";
import DataSetting from "../src/settings/data";

registerComponentOptionsSetting('62bd5820ea24a70e97a33ea8', 'v-current',  OptionsSetting);
registerComponentDataSetting('62bd5820ea24a70e97a33ea8', 'v-current',  DataSetting);
