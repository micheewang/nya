import { Goods } from './goods';

export function createTruck(fn) {
  /**
   *
   * @param {Goods} goods
   */
  function transport(goods) {
    fn(goods);
  }
  return transport;
}

export function Truck() {
  return;
}
