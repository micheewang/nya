import { testFuntion } from './tool';

export function createStore(...arg) {
  return new Store(...arg);
}

export class Store {
  /**
   *
   * @param {Truck}
   */
  constructor(goods, channel) {
    /**
     * store
     */
    this.goods = goods || {};

    /**
     * async or sync get goods
     */
    this.channel = channel || {};
  }

  /**
   *
   * @param {stirng} goodsName
   * @param {Function} func
   */
  addChannel(goodsName, func) {
    testFuntion(func);
    this.channel[goodsName] = func;
  }

  /**
   *
   * @param {stirng} goodsName
   * @param {Goods} goods
   */
  addGoods(goodsName, goods) {
    this.goods[goodsName] = goods;
  }

  /**
   *
   * @param {string | symbol} goodsName
   * @param {Function} call
   */
  getGoods(goodsName, call) {
    let { goods, channel } = this;
    let hasOwnProperty = Object.hasOwnProperty;
    if (hasOwnProperty.call(goods, goodsName)) {
      call(this.goods[goodsName]);
    } else if (hasOwnProperty.call(channel, goodsName)) {
      channel[goodsName]((good) => call((goods[goodsName] = good)));
    }
  }
}
