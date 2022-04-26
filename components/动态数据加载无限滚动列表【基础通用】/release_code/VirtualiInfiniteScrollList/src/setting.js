
/**
 * @description 注册VirtualiInfiniteScrollList组件的设置面板
 */
import {
  registerComponentEvents,
  registerComponentOptionsSetting,
  registerComponentDataSetting,
} from "datavi-editor/adapter";

import DataSetting from "./settings/data";
import OptionsSetting from "./settings/options";

registerComponentOptionsSetting("VirtualiInfiniteScrollList", OptionsSetting);
registerComponentDataSetting("VirtualiInfiniteScrollList", DataSetting);
