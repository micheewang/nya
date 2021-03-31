'use strict';
import { TAG, createElement } from './element';
import { createComponent } from './component';
import { createStore } from './store';
import { createRef } from './createRef';
import { renderDOM } from './dom';
import hooks from './hooks';

const nya = Object.assign(
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
if (window) {
  window.nya = nya;
}
export default nya;
