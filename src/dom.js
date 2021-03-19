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

let readySize = 0;
/**
 * start clear render queen
 */
function startClearQueen() {
  //TODO 合并队列完成后可以删除此处的渲染队列限制
  if (renderQueen.length - readySize > 0) {
    readySize++;
    requestAnimationFrame(function () {
      readySize--;
      clearQueen(renderQueen.shift());
      startClearQueen();
    });
  }
}

function clearQueen({ timestamp, component }) {
  // TODO 加入diff
  // let oldVnode = component.vNode;
  let update = component.update;
  let newVnode = component.templet();
  let el = elementRender.call(newVnode);
  component.parentNode.replaceChild(el, component.ref);
  component.ref = el;
  isFunction(update) && update();
}

/**
 * main function
 * @param {$Element | Component} element
 */
export function renderDOM(element, root) {
  if (isComponent(element)) {
    componentRender.call(element, root);
  } else if (isElement(element)) {
    elementRender.call(element, root);
  } else {
    throw new Error(`The root element must mount the component.`);
  }
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
  for (let node of children) {
    //把这些值排除在外就可以方便的在数组里使用表达式
    if (node === undefined || node === null || node === '') {
      continue;
    }
    //由于继承关系有可能是element,也可能是component
    if (isElement(node)) {
      if (isComponent(node)) {
        componentRender.call(node, ref);
      } else {
        elementRender.call(node, ref);
      }
    } else {
      //为本节点
      let textNode = document.createTextNode(node);
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
  this.parentNode = parentNode;

  //vnode模板函数为空时,执行
  if (this.templet === null) {
    //设置当前的节点为活动节点
    current_node.current = this;
    //组件的props和slot
    let renderData = {
      props: this.attrs,
      slot: this.children,
    };
    //const指的传入createComponent的函数,里面使用的hooks就可以指向当前的节点
    let templet = (this.templet = this.const(renderData));
    testFuntion(
      templet,
      'Creating a component must return a function that returns the virtual node'
    );
    //清空当前节点
    current_node.current = null;
  }

  //执行vnode模板获取虚拟节点
  let vNode = (this.vNode = this.templet());

  this.ref = elementRender.call(vNode, parentNode);

  //生命周期--挂载
  isFunction(this.mouted) && this.mouted();
}
