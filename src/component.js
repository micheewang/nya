'use strict';

import { $Element } from './element';
import { isStore, RESPONSIVE_VALUE } from './store';

class Component extends $Element {
  constructor(tagName, props, slot, dep, store) {
    super(tagName, props, slot);
    this.dep = dep;
    this.depElement = null;
    this.store = store;
    this.ref = null;
  }

  //TODO delete
  render() {
    let renderData = {
      props: this.attrs,
      slot: this.children,
      store: this.store[RESPONSIVE_VALUE],
    };
    const depElement = (this.depElement = this.dep(renderData));
    depElement.render();
    return depElement.ref;
  }
}

function increaseId() {
  return increaseId.id === undefined ? (increaseId.id = 0) : increaseId++;
}

function curryComponent(...args) {
  //These components belong to one type.
  const name = Symbol('Component-' + increaseId());

  return function (props, slot) {
    return new Component(name, props, slot, ...args);
  };
}

export function isComponent(con){
  return con instanceof Component
}

export function createComponent(dep, store) {
  if (typeof dep !== 'function') {
    throw new Error('function');
  }
  if (!isStore(store)) {
    throw new Error('store');
  }

  return curryComponent(dep, store);
}
