
/**
 * @description 注册Progress组件的设置面板
 */
import {
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("Progress", OptionsSetting);
registerComponentDataSetting("Progress", DataSetting);
