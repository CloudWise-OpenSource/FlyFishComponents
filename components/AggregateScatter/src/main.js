
'use strict';

/**
 * @description 注册62a6b58418ac85202e3c0998组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
