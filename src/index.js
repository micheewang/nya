'use strict';
import { TAG, createElement } from './element';
import { createComponent } from './component';
import { createStore } from './store';
import { createRef } from './createRef';
import { renderDOM } from './dom';

export * from './hooks';
export {
  renderDOM,
  createRef,
  createElement,
  createComponent,
  createStore,
  TAG,
};
