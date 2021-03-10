'use strict';

import { Market } from './market';

export class Supermarket extends Market {
  constructor(tagName, props, slot, dep, store) {
    super(tagName, props, slot);
    this.dep = dep;
    this.store = store;
    this.ref = null;
  }
}

function curryArgs(...args) {
  //These supermarket belong to one type.
  const name = Symbol('Supermarket');
  return function (props, slot) {
    return new Supermarket(name, props, slot, ...args);
  };
}

export function isSupermarket(con) {
  return con instanceof Supermarket;
}

export function createSupermarket(dep, store) {
  if (typeof dep !== 'function') {
    throw new Error('is not function');
  }
  return curryArgs(dep, store || null);
}
