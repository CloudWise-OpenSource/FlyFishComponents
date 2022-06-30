/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting
} from 'datavi-editor/adapter';

import OptionsSetting from '../src/settings/options';
import DataSetting from '../src/settings/data'

registerComponentOptionsSetting('61cd32484a9f67d281d1062f', 'v-current',  OptionsSetting);
registerComponentDataSetting('61cd32484a9f67d281d1062f', 'v-current',  DataSetting);
