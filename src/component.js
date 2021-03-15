'use strict';

import { $Element } from './element';
import { isFunction, testFuntion } from './tool';

export class Component extends $Element {
  constructor(tagName, props, slot, templet, getter) {
    super(tagName, props, slot);
    this.templet = templet;
    this.getter = isFunction(getter) ? getter : () => getter;
  }
}

function curryArgs(...args) {
  //These component belong to one type.
  const name = Symbol('Component');
  return function (props, slot) {
    return new Component(name, props, slot, ...args);
  };
}

export function isComponent(con) {
  return con instanceof Component;
}

export function createComponent(templet, ...args) {
  testFuntion(templet);
  return curryArgs(templet, ...args);
}
