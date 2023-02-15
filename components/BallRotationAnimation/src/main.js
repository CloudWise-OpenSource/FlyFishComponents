
'use strict';

/**
 * @description 注册62d60a64ae3be617a2a61ad3组件到大屏中
 */

import { registerComponent } from "data-vi/components";

import Component from "./Component";

registerComponent('${ComponentIdTpl}', 'v-current',  Component);
