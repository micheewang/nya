'use strict';
export function copy(v) {
  let type = typeof v;
  if (type === 'object') {
    if (Array.isArray(v)) {
      return v.map((v) => copy(v));
    } else {
      let obj = {};
      for (const key in v) {
        const value = v[key];
        obj[key] = copy(value);
      }
      return obj;
    }
  } else {
    return v;
  }
}

export function noop() {}

export function testFuntion(a, msg) {
  if (!isFunction(a)) {
    throw new TypeError(msg || 'Parameter must be a function.');
  }
}

export function isFunction(f) {
  return typeof f === 'function';
}
