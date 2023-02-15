
'use strict';

/**
 * @description 注册629d9e81bb50b5204a0a701c组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
