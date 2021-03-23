'use strict';
import { TAG, createElement } from './element';
import { createComponent } from './component';
import { renderDOM } from './dom';
import { createStore } from './store';
import hooks from './hooks';
import { createRef } from './ref';

window.nya = Object.assign(
  {
    renderDOM,
    createRef,
    createElement,
    createComponent,
    createStore,
    TAG,
  },
  hooks
);
