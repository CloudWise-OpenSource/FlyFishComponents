/**
 * @description 注册title组件的设置面板
 */
import {
  // registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from 'datavi-editor/adapter'

import DataSetting from '../src/settings/data'
import OptionsSetting from '../src/settings/options'

registerComponentOptionsSetting('${ComponentIdTpl}', 'v-current',  OptionsSetting);
// registerComponentDataSetting('${ComponentIdTpl}', 'v-current',  DataSetting);
