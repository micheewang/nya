'use strict';

export function isElement(con) {
  return con instanceof $Element;
}

//TODO
export const TAG = new Proxy(
  {},
  {
    get(obj, prop) {
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = function (attrs, children) {
          return new $Element(prop, attrs, children);
        };
      }
      return obj[prop];
    },
  }
);

export class $Element {
  constructor(tagName, attrs, children) {
    if (typeof attrs === 'string' || isElement(attrs)) {
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

  //TODO delete
  render() {
    let { tagName, attrs, children } = this;
    const ref = (this.ref = document.createElement(tagName));

    for (let key in attrs) {
      const value = attrs[key];
      if (typeof value === 'boolean') {
        ref[key] = value;
      } else {
        ref.setAttribute(key, value);
      }
    }
    for (let value of children) {
      if (value instanceof $Element) {
        ref.appendChild(value.render());
      } else {
        ref.appendChild(document.createTextNode(value));
      }
    }
    return ref;
  }
}
