'use strict';

export function isMarket(con) {
  return con instanceof Market;
}

//TODO
export const TAG = new Proxy(
  {},
  {
    get(obj, prop) {
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = function (attrs, children) {
          return new Market(prop, attrs, children);
        };
      }
      return obj[prop];
    },
  }
);

export class Market {
  constructor(tagName, attrs, children) {
    if (typeof attrs === 'string' || isMarket(attrs)) {
      children = [attrs];
      attrs = {};
    } else if (Array.isArray(attrs)) {
      children = attrs;
      attrs = {};
    }

    attrs = attrs || {};
    children = children
      ? Array.isArray(children)
        ? children
        : [children]
      : [];
     
    this.tagName = tagName;
    this.ref = null;
    this.dep = null;
    this.mark = {};
    this.attrs = attrs;
    this.children = children;
  }
}
