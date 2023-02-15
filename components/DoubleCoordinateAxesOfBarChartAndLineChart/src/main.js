
'use strict';

/**
 * @description 注册629d9d40c1b51f206f35714a组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
