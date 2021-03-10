'use strict';
import { createGoods } from './goods';
import { TAG } from './market';
import { createSupermarket } from './supermarket';
import { LIFE_CYCLE } from './action';
import { renderDOM } from './consumer';

window.nya = {
  createGoods,
  createComponent:createSupermarket,
  renderDOM,
  lifeCycle: LIFE_CYCLE,
  TAG,
};
