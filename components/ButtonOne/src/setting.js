/**
 * @description 注册组件的设置面板
 */
import {
  // registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from 'datavi-editor/adapter'

import DataSetting from './settings/data'
import OptionsSetting from './settings/options'

registerComponentOptionsSetting('ButtonOne', OptionsSetting)
// registerComponentDataSetting('ButtonOne', DataSetting)
