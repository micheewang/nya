'use strict';

import { Market } from './market';

export class Supermarket extends Market {
  constructor(tagName, props, slot, dep, goods) {
    super(tagName, props, slot, goods);
    this.dep = dep;
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

export function createSupermarket(dep, goods) {
  if (typeof dep !== 'function') {
    throw new Error('is not function');
  }
  return curryArgs(dep, goods);
}
