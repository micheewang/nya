import { noop, testFuntion } from './tool';

export function createTruck() {
  return new Truck();
}

const getGoods = Symbol('Truck.GetGoods');
const sendGoods = Symbol('Truck.SendGoods');
const set = Symbol('Truck.Set');
const get = Symbol('Truck.Get');
const setPhone = Symbol('Truck.phone');
const getPhone = Symbol('Truck.phone');

//TODO timestamp limit
export class Truck {
  constructor() {
    this[get] = new Set();
    this[set] = noop;
  }

  sendCallback(func) {
    testFuntion(func);
    if(this[set] !== noop){
      console.warn('The output function is unique, and the previously set function will be cancelled.')
    }
    this[set] = func;
  }

  getCallback(func) {
    testFuntion(func);
    this[get].add(func);
  }

  getGoods() {
    return this[getPhone]
      ? this[getPhone]
      : (this[getPhone] = (goodsName) => {
          this[getGoods](goodsName);
        });
  }

  sendGoods() {
    return this[setPhone]
      ? this[setPhone]
      : (this[setPhone] = (goods) => {
          this[sendGoods](goods);
        });
  }

  [getGoods](goodsName) {
    this[set](goodsName);
  }

  [sendGoods](goods) {
    this[get].forEach((callback) => {
      callback(goods);
    });
  }
}
