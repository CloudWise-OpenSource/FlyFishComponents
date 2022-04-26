/**
 * @description 注册组件的设置面板
 */
import {
  // registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from 'datavi-editor/adapter'

import DataSetting from '../src/settings/data'
import OptionsSetting from '../src/settings/options'

registerComponentOptionsSetting('61aa27acd39bdf74f6d602cd', 'v-current',  OptionsSetting)
// registerComponentDataSetting('61aa27acd39bdf74f6d602cd', 'v-current',  DataSetting)
