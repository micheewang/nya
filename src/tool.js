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




//TODO
function isNotObject(v) {
  return typeof v !== 'object';
}

//data diff
function getDiff(obj1, obj2, path = []) {
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
