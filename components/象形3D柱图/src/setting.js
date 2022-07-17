/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting
} from 'datavi-editor/adapter';

import OptionsSetting from '../src/settings/options';
import DataSetting from '../src/settings/data'

registerComponentOptionsSetting('61cd7a50d1857fd23c9c8bc9', 'v-current',  OptionsSetting);
registerComponentDataSetting('61cd7a50d1857fd23c9c8bc9', 'v-current',  DataSetting);