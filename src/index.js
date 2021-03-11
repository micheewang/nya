'use strict';
import { createGoods } from './goods';
import { TAG, createMarket } from './market';
import { createSupermarket } from './supermarket';
import { renderDOM } from './consumer';
import lifecycle from './lifecycle';
import { createStore } from './store';
import { createTruck } from './truck';

window.nya = {
  createGoods,
  createEl: createMarket,
  createComponent: createSupermarket,
  renderDOM,
  createStore,
  createTruck,
  lifecycle,
  TAG,
};
