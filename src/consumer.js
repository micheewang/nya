'use strict';

import { Supermarket, isSupermarket } from './supermarket';
import { Market, isMarket } from './market';
import { Goods } from './goods';

/**
 *
 * @param {Market | Supermarket} market
 */
export function renderDOM(market, root) {
  if (isMarket(market)) {
    let el;
    if (isSupermarket(market)) {
      el = supermarketRender.call(market);
    } else {
      el = marketRender.call(market);
    }
    root.appendChild(el);
  } else {
    throw new Error(`The root element must mount the component.`);
  }
}

function marketRender() {
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

  for (let market of children) {
    //don't render when market is [undefined,null,''].
    if (market === undefined || market === null || market === '') {
      continue;
    }
    let el = null;
    if (isMarket(market)) {
      if (isSupermarket(market)) {
        el = supermarketRender.call(market);
      } else {
        el = marketRender.call(market);
      }
    } else {
      el = document.createTextNode(market);
    }
    ref.appendChild(el);
  }

  return ref;
}

function supermarketRender() {
  let renderData = {
    props: this.attrs,
    slot: this.children,
    store: this.store,
  };
  return (this.ref = marketRender.call(this.dep(renderData)));
}

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
