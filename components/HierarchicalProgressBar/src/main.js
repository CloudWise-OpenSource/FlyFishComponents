
'use strict';

/**
 * @description 注册62c5385c761a42178d753b12组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
