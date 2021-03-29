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
export function warn(msg) {
  console.warn(msg);
}
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
//TODO
// 数据的diff,用于值改变后通过对比依赖来获取需要改变的节点
export function getDiff(obj1, obj2, path = []) {
  let diff = [];
  if (isNotObject(obj1) || isNotObject(obj2)) {
    if (obj1 !== obj2) {
      diff.push(path);
    }
  } else {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      obj1.forEach((value, index) => {
        let _path = path.concat(index);
        let _diff = getDiff(value, obj2[index], _path);
        diff = Array.prototype.concat.apply(_diff, diff);
      });
    } else {
      for (const key in obj1) {
        let _path = path.concat(key);
        let _diff = getDiff(obj1[key], obj2[key], _path);
        diff = Array.prototype.concat.apply(_diff, diff);
      }
    }
  }
  return diff;
}
