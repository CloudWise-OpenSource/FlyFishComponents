/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting
} from 'datavi-editor/adapter';

import OptionsSetting from './settings/options';
import DataSetting from './settings/data'

registerComponentOptionsSetting('61aa27abd39bdf74f6d60149', 'v-current',  OptionsSetting);
registerComponentDataSetting('61aa27abd39bdf74f6d60149', 'v-current',  DataSetting);