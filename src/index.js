'use strict';
import { TAG, createElement } from './element';
import { createComponent } from './component';
import { renderDOM } from './dom';
import { createTruck } from './truck';
import hooks from './hooks';

window.nya = Object.assign(
  {
    createElement,
    createComponent,
    renderDOM,
    createTruck,
    TAG,
  },
  hooks
);
