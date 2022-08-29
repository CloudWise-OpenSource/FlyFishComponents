/**
 * @description 注册组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from 'datavi-editor/adapter';

import OptionsSetting from './settings/options';
import DataSetting from './settings/data';

registerComponentOptionsSetting('61efb44befcd191bc1bb4d19', 'v-current',  OptionsSetting);
registerComponentDataSetting('61efb44befcd191bc1bb4d19', 'v-current',  DataSetting);
