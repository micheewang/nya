'use strict';

import { Market } from './market';
import { isFunction, testFuntion } from './tool';

export class Supermarket extends Market {
  constructor(tagName, props, slot, templet, getter) {
    super(tagName, props, slot);
    this.templet = templet;
    this.getter = isFunction(getter) ? getter : () => getter;
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

export function createSupermarket(templet, ...args) {
  testFuntion(templet);
  return curryArgs(templet, ...args);
}
