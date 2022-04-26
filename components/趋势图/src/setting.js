/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting
} from 'datavi-editor/adapter';

import OptionsSetting from '../src/settings/options';
import DataSetting from '../src/settings/data'

registerComponentOptionsSetting('61aa27abd39bdf74f6d600b8', 'v-current',  OptionsSetting);
registerComponentDataSetting('61aa27abd39bdf74f6d600b8', 'v-current',  DataSetting);