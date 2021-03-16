'use strict';

import { $Element } from './element';
import { testFuntion } from './tool';

//extends $Element
//keep Component and $Element(name | attrs | children) the same behavior
export class Component extends $Element {
  constructor(tagName, props, slot, $const) {
    super(tagName, props, slot);
    this.const = $const;
    this.templet = null;
    this.parentNode = null;

    //lifecycle
    this.mouted = null;
    this.update = null;
    this.unMouted = null;
    //....
  }
}

function composeArgs(...args) {
  //These component belong to one type.
  const name = Symbol('Component');
  return function (props, slot) {
    return new Component(name, props, slot, ...args);
  };
}

export function isComponent(con) {
  return con instanceof Component;
}

export function createComponent(hooks) {
  testFuntion(hooks);
  return composeArgs(hooks);
}
