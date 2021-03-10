'use strict';
export const LIFE_CYCLE =  {
  created: Symbol('created'),
  mount: Symbol('mount'),
  beforeUpdate: Symbol('beforeUpdate'),
  update: Symbol('update'),
  unmount: Symbol('unmount'),
};
