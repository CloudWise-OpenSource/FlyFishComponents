
'use strict';

/**
 * @description 注册62d60a64ae3be617a2a61ad3组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting('62d60a64ae3be617a2a61ad3', 'v-current', OptionsSetting);
registerComponentDataSetting('62d60a64ae3be617a2a61ad3', 'v-current', DataSetting);
