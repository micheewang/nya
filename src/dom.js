'use strict';

import { isComponent } from './component';
import { isElement } from './element';

/**
 *
 * @param {$Element | Component} element
 */
export function renderDOM(element) {}

//element diff
function diff() {}

function isNotObject(v) {
  return typeof v !== 'object';
}

// runtime optimization
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
