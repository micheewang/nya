'use strict';

import { testAttribute } from './attribute';
import { Component, isComponent } from './component';
import { $Element, isElement } from './element';
import { current_node } from './instance';
import { isFunction, testFuntion } from './tool';

/*
 * render queen
 * type = Array<{timestamp: number, component: Component, skip: boolean}>
 */
const renderQueen = [];

/**
 *
 * @param {Component} component
 */
export function addQueen(component) {
  //TODO 合并队列
  renderQueen.push({
    timestamp: +new Date(),
    component,
  });
  //清空队列
  startClearQueen();
}

/**
 * start clear render queen
 */
let pause = false;
function startClearQueen() {
  //pause 保证同时只有一个渲染队列
  //TODO 合并队列完成后可以删除此处的渲染队列限制
  if (!pause && renderQueen.length > 0) {
    pause = true;
    requestAnimationFrame(function () {
      pause = false;
      clearQueen(renderQueen.shift());
      startClearQueen();
    });
  }
}

function clearQueen({ timestamp, component }) {
  // TODO 加入diff
  // let oldVnode = component.vNode;
  // let newVnode = component.vNode = component.templet() 
  componentRender.call(component);
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
 * vnode => element
 */
function elementRender(parentNode) {
  let { tagName, attrs, children } = this;
  const ref = (this.ref = document.createElement(tagName));

  for (let key in attrs) {
    const value = attrs[key];
    //属性匹配/设置函数
    if (testAttribute(this, key, value)) {
      continue;
    }
    //boolean值直接赋值readOnly等
    if (typeof value === 'boolean') {
      ref[key] = value;
    }
    //事件 value为函数
    else if (key.startsWith('on')) {
      testFuntion(value);
      ref.addEventListener(key.substr(2), value);
    }
    //其他类型
    else {
      ref.setAttribute(key, value);
    }
  }

  /**
   * 子元素渲染
   */
  for (let element of children) {
    //don't render when element is [undefined,null,''].
    //把这些值排除在外就可以方便的在数组里使用表达式
    if (element === undefined || element === null || element === '') {
      continue;
    }
    if (isElement(element)) {
      //有可能是element,也可能是component
      whichRender(element)(ref);
    } else {
      //为本节点
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
 * vnode组件渲染
 */
function componentRender(parentNode) {
  //不传parentNode就可以使用上次的保存的值
  if (parentNode) {
    this.parentNode = parentNode;
  }

  //vnode模板函数为空时,执行
  if (this.templet === null) {
    //设置当前的节点为活动节点
    current_node.current = this;
    let renderData = {
      props: this.attrs,
      slot: this.children,
    };
    //const指的传入createComponent的函数,里面使用的hooks
    //就可以指向当前的节点
    let templet = (this.templet = this.const(renderData));
    testFuntion(
      templet,
      'Creating a component must return a function that returns the virtual node'
    );
    //清空当前节点
    current_node.current = null;
  }

  //执行vnode模板获取虚拟节点
  let element = (this.vNode = this.templet());
  let oldRef = this.ref;

  //在diff算法完成前临时使用替换节点方法
  //替换节点
  if (!parentNode) {
    //dom实例
    this.ref = elementRender.call(element);
    this.parentNode.replaceChild(this.ref, oldRef);
    //生命周期--卸载
    this.unMouted && this.unMouted();
  } else {
    this.ref = elementRender.call(element, this.parentNode);
  }

  //生命周期--挂载
  this.mouted && this.mouted();
}
