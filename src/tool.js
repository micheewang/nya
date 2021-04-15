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

export const [warn, error, log] = [
  'warn',
  'error',
  'info',
  'log',
].map((v) => (...arg) => console[v](...arg));

//合并函数为一个函数
export function compose(...fns) {
  return function (...arg) {
    fns.forEach((fn) => fn.call(this, ...arg));
  };
}

export function memoize(fn) {
  var memoize = function (...args) {
    var cache = memoize.cache;
    var address = args.join(',');
    if (!Object.hasOwnProperty.call(cache, address)) {
      cache[address] = fn.apply(this, args);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
}

export function noop() {}

export function testFuntion(a, msg) {
  if (!isFunction(a)) {
    throw new TypeError(msg || 'Parameter must be a function.');
  }
}

//https://v8.dev/blog/system-analyzer
export function transformFastObject(obj) {
  if (obj === Object(obj)) {
    var a = function () {};
    a.prototype = obj;
    new a();
    new a();
    return obj;
  } else {
    throw new Error('Argument must be of object type');
  }
}

export function isFunction(f) {
  return typeof f === 'function';
}

export function insertChildByIdx(parent, node, idx = -1) {
  let children = parent.children;
  if (idx > 0 && children.length > 0) {
    let target =
      children.length > idx ? children[idx] : children[children.length - 1];
    parent.insertBefore(node, target);
  } else {
    parent.appendChild(node);
  }
}

export function insertChild(parent, node, target) {
  parent.insertBefore(node, target);
}
