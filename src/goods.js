'use strict';
import { copy } from './tool';

export function createGoods(value) {
  return new Goods(value);
}

export function isGoods(con) {
  return con instanceof Goods;
}

export class Goods {
  constructor(value) {
    Object.assign(this, copy(value));
  }
}
