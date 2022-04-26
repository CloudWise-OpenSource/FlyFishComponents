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

registerComponentOptionsSetting('61b08a137f8cf51699105fa3', 'v-current',  OptionsSetting)
// registerComponentDataSetting('61b08a137f8cf51699105fa3', 'v-current',  DataSetting)
