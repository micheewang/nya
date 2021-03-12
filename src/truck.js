import { noop, testFuntion } from './tool';

//private
const get = Symbol('Truck.Send'),
  send = Symbol('Truck.Send');

const sendHandler = Symbol('Truck.Send'),
  getHandler = Symbol('Truck.Get');

//TODO timestamp limit
export class Truck {
  constructor() {
    this[getHandler] = new Set();
    this[sendHandler] = noop;
    this.get = (goodsName) => {
      this[get](goodsName);
    };
    this.send = (goods) => {
      this[send](goods);
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

  unbind(func) {}

  [get](goodsName) {
    this[sendHandler].call(this, goodsName);
  }

  [send](goods) {
    this[getHandler].forEach((callback) => {
      callback.call(this, goods);
    });
  }
}

export function createTruck() {
  return new Truck();
}
