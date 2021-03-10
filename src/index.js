'use strict';
import { createStore } from './store';
import { TAG } from './element';
import { createComponent } from './component';
import { LIFE_CYCLE } from './action';
import { renderDOM } from './dom';

window.nya = {
  createStore,
  createComponent,
  renderDOM,
  lifeCycle: LIFE_CYCLE,
  TAG,
};
