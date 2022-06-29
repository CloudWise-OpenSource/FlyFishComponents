
/**
 * @description 注册CenterBall组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('62b84d1f26b32a2058aa815c', 'v-current', OptionsSetting);
registerComponentDataSetting('62b84d1f26b32a2058aa815c', 'v-current', DataSetting);
