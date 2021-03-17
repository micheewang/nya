'use strict';

import { testAttribute } from './attribute';
import { Component, isComponent } from './component';
import { $Element, isElement } from './element';
import { current_node } from './getInstance';
import { isFunction } from './tool';

/*
 * render queen
 * type = Array<{timestamp: number, component: Component, skip: boolean}>
 */
const renderQueen = [];
export const chapterSymbol = Symbol('chapterSymbol');

/**
 *
 * @param {Component} component
 */
export function addQueen(type, component) {
  //TODO 合并队列
  renderQueen.push({
    type,
    timestamp: +new Date(),
    component,
  });
  startClearQueen();
}

/**
 * start clear render queen
 */
let pause = false;
function startClearQueen() {
  if (!pause && renderQueen.length > 0) {
    pause = true;
    requestAnimationFrame(function () {
      pause = false;
      clearQueen(renderQueen.shift());
      startClearQueen();
    });
  }
}

function clearQueen({ type, timestamp, component }) {
  if (type === chapterSymbol) {
    componentRender.call(component);
  }
}

/**
 * renderDom
 * @param {$Element | Component} element
 */
export function renderDOM(element, root) {
  if (isElement(element)) {
    whichRender(element)(root);
  } else {
    throw new Error(`The root element must mount the component.`);
  }
}

/**
 * which render
 * @param {Element|Component} element
 * @returns
 */
function whichRender(element) {
  return isComponent(element)
    ? componentRender.bind(element)
    : elementRender.bind(element);
}

function insertChildByIdx(parent, node, idx = -1) {
  let children = parent.children;
  if (idx > 0 && children.length > 0) {
    let target =
      children.length > idx ? children[idx] : children[children.length - 1];
    parent.insertBefore(node, target);
  } else {
    parent.appendChild(node);
  }
}

function insertChild(parent, node, target) {
  parent.insertBefore(node, target);
}

/**
 * bind($Element)
 * @returns Element
 */
function elementRender(parentNode) {
  let { tagName, attrs, children } = this;
  const ref = (this.ref = document.createElement(tagName));

  for (let key in attrs) {
    const value = attrs[key];
    if (testAttribute(this, key, value)) {
      continue;
    }
    if (typeof value === 'boolean') {
      ref[key] = value;
    } else if (isFunction(value) && key.startsWith('on')) {
      ref.addEventListener(key.substr(2), value);
    } else {
      ref.setAttribute(key, value);
    }
  }

  for (let element of children) {
    //don't render when element is [undefined,null,''].
    if (element === undefined || element === null || element === '') {
      continue;
    }
    if (isElement(element)) {
      whichRender(element)(ref);
    } else {
      let textNode = document.createTextNode(element);
      ref.appendChild(textNode);
    }
  }

  if (parentNode) {
    parentNode.appendChild(ref);
  }
  return ref;
}

/**
 * bind(Component)
 * @returns Element
 */
function componentRender(parentNode) {
  let renderData = {
    props: this.attrs,
    slot: this.children,
  };

  if (parentNode) {
    this.parentNode = parentNode;
  }

  //set current_node direct this
  if (this.templet === null) {
    current_node.current = this;
    this.templet = this.const();
    current_node.current = null;
  }

  let element = this.templet(renderData);
  let oldRef = this.ref;
  this.ref = elementRender.call(element, this.parentNode);
  if (!parentNode) {
    this.parentNode.replaceChild(this.ref, oldRef);
    this.unMouted && this.unMouted();
  }
  this.mouted && this.mouted();
}
