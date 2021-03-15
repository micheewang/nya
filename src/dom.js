'use strict';

import { Component, isComponent } from './component';
import { $Element, isElement } from './element';
import { isFunction } from './tool';

/**
 * keep current node
 */
const current_node = {
  current: null,
};

export function getInstance() {
  return current_node;
}

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

let pause = false;
/**
 * start clear render queen
 *
 */
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
    let ref = component.ref;
    let el = componentRender.call(component);
    ref.parentNode.replaceChild(el, ref);
  }
}

/**
 * renderDom
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

/**
 * bind($Element)
 * @returns Element
 */
function elementRender() {
  current_node.current = null;
  let { tagName, attrs, children } = this;
  const ref = (this.ref = document.createElement(tagName));

  //TODO attribute set
  for (let key in attrs) {
    const value = attrs[key];
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

/**
 * bind(Component)
 * @returns Element
 */
function componentRender() {
  let renderData = {
    props: this.attrs,
    slot: this.children,
  };
  current_node.current = this;
  if (this.templet === null) {
    this.templet = this.hooks();
  }
  let templet = this.templet;
  let con = templet(renderData);
  return (this.ref = elementRender.call(con));
}
