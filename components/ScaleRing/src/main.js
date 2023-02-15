
'use strict';

/**
 * @description 注册62afd60671b746202637c8eb组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
