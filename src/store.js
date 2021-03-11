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
  constructor(truck, goods) {
    /**
     *
     */
    this.truck = truck;
    /**
     *
     */
    this.goods = goods || {};
    /**
     * async or sync get good
     */
    this.channel = {};
  }

  addChannel(goodName, func) {
    if (typeof func !== 'function') {
      throw new TypeError('channel must be a function.');
    }
    this.channel[goodName] = func;
  }
  /**
   *
   * @param {Goods} goods
   */
  addGoods(goodName, goods) {
    this.goods[goodName] = goods;
  }

  present(goodName) {
    let { goods, channel } = this;
    if (Object.hasOwnProperty.call(goods, goodName)) {
      this.truck(this.goods[goodsName]);
    } else if (Object.hasOwnProperty.call(channel, goodName)) {
      channel((good) => this.truck((goods[goodName] = good)));
    }
  }
}
