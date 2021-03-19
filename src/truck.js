import { noop, testFuntion } from './tool';

//private
const sendHandler = Symbol('truck.send.handler');
const getHandler = Symbol('truck.get.handler');

// 组件间的数据通信,只管运输,不管储存
// 是一个仓库一对多组件的形式
// 只能有一个提供者,但可以有多个接收者
// 提供者也可以作为接受者
export class Truck {
  constructor() {
    this[getHandler] = new Set();
    this[sendHandler] = noop;

    //接受数据
    this.get = (goodsName) => {
      if (this[sendHandler] === noop) {
        console.warn('No provider can provide data');
      }
      this[sendHandler].call(this, goodsName);
    };

    //发送数据
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
