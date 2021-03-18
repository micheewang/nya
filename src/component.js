'use strict';

import { $Element } from './element';
import { testFuntion } from './tool';

//extends $Element
//keep Component and $Element(name | attrs | children) the same behavior
export class Component extends $Element {
  constructor(tagName, props, slot, $const) {
    super(tagName, props, slot);
    //外层逻辑函数
    this.const = $const;
    //内层虚拟节点模板函数
    this.templet = null;
    this.vNode = null;
    this.parentNode = null;

    //lifecycle
    this.mouted = null;
    this.update = null;
    this.unMouted = null;
    //....
  }
}

export function cloneComponent(c) {
  let newC = new Component(c.tagName);
  return Object.assign(newC, c);
}

function composeArgs(...args) {
  //These component belong to one type.
  //标记这些组件属于同一类
  const name = Symbol('Component');
  return function (props, slot) {
    return new Component(name, props, slot, ...args);
  };
}

export function isComponent(con) {
  return con instanceof Component;
}

export function createComponent(f) {
  testFuntion(f);
  return composeArgs(f);
}
