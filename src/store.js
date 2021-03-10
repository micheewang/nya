'use strict';
import { copy } from './tool';

export const RESPONSIVE_VALUE = Symbol('store.value');
export const RESPONSIVE_CALL = Symbol('store.call');

export function createStore(value) {
  return new Store(value);
}

export function isStore(con) {
  return con instanceof Store;
}

class Store {
  constructor(value) {
    this[RESPONSIVE_VALUE] = copy(value);
    this[RESPONSIVE_CALL] = {};
  }

  /**
   *
   * @param {string|symbol} action
   * @param {any} value
   * @param {Array|undefined} diff
   */
  dispatch(action, newValue) {
    var that = this;
    let callList = this[RESPONSIVE_CALL];
    let actionFn = callList[action];
    if (actionFn) {
      actionFn.forEach(function (callback) {
        callback.call(that, newValue);
      });
    }
  }

  addAction(actionName, action) {
    if (typeof action === 'function') {
      let callList = this[RESPONSIVE_CALL];
      let actionList = (callList[actionName] = callList[actionName] || []);
      actionList.unshift(action);
    } else {
      throw new Error('Action must be a function!');
    }
  }

  //TODO
  __collect__(){

  }

  __collectEnd__(){

  }
}
