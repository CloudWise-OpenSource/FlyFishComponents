
/**
 * @description 注册CommonImage组件的设置面板
 */
import {
  registerComponentOptionsSetting,
} from "datavi-editor/adapter";

import OptionsSetting from "../src/settings/options";

registerComponentOptionsSetting('${ComponentIdTpl}', 'v-current',  OptionsSetting);
// registerComponentDataSetting('${ComponentIdTpl}', 'v-current',  DataSetting);
