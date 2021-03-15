'use strict';

import { Component, isComponent } from './component';
import { $Element, isElement } from './element';

const current_node = {
  current: null,
};

export function getInstance() {
  return current_node;
}

const renderQueen = [];

/**
 *
 * @param {Component} component
 */
export function addQueen(component) {
  this.renderQueen.push({
    timestamp: +new Date(),
    component: component,
  });
}

/**
 *
 * @param {$Element | Component} element
 */
export function renderDOM(element, root) {
  if (isElement(element)) {
    let el = whichRender(element)();
    root.appendChild(el);
  } else {
    throw new Error(`The root element must mount the component.`);
  }
}

function whichRender(element) {
  return isComponent(element)
    ? ComponentRender.bind(element)
    : elementRender.bind(element);
}

function elementRender() {
  current_node.current = null;
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

  for (let element of children) {
    //don't render when element is [undefined,null,''].
    if (element === undefined || element === null || element === '') {
      continue;
    }
    let el = null;
    if (isElement(element)) {
      el = whichRender(element)();
    } else {
      el = document.createTextNode(element);
    }
    ref.appendChild(el);
  }

  return ref;
}

function ComponentRender() {
  let renderData = {
    props: this.attrs,
    slot: this.children,
    data: this.getter(), //dep
  };
  current_node.current = this;
  let con = this.templet()(renderData);
  return (this.ref = elementRender.call(con));
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
