
/**
 * @description 注册Progress组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "../src/Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
