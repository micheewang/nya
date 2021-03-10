import { Goods } from './goods';
import { Truck } from './truck';

export function createStore(...arg) {
  return new Store(...arg);
}

export class Store {
  /**
   *
   * @param {Truck} 
   */
  constructor(truck) {
    this.truck = truck;
    this.goods = {};
  }

  /**
   *
   * @param {Goods} goods
   */
  addGoods(goodsName, goods) {
    this.goods[goodsName] = goods;
  }

  present(goodsName) {
    this.car(this.goods[goodsName]);
  }
}
