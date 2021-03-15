import { noop, testFuntion } from './tool';

//private
const sendHandler = Symbol('truck.send.handler');
const getHandler = Symbol('truck.get.handler');

export class Truck {
  constructor() {
    this[getHandler] = new Set();
    this[sendHandler] = noop;

    this.get = (goodsName) => {
      if (this[sendHandler] === noop) {
        console.warn('No provider can provide data');
      }
      this[sendHandler].call(this, goodsName);
    };

    this.send = (goods) => {
      this[getHandler].forEach((callback) => {
        callback.call(this, goods);
      });
    };
  }

  setAnswer(func) {
    testFuntion(func);
    if (this[sendHandler] !== noop) {
      console.warn(
        'The output function is unique, and the previously send function will be cancelled.'
      );
    }
    this[sendHandler] = func;
  }

  setReceive(func) {
    testFuntion(func);
    this[getHandler].add(func);
  }

  unbind(func) {
    if (this[getHandler].has(func)) {
      this[getHandler].delete(func);
    }
  }
}

export function createTruck() {
  return new Truck();
}
