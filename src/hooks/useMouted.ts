import { Lifecycle } from '../component';
import { getInstance } from '../instance';
import { compose } from '../util';

export const unMouted = function (callback: Lifecycle): void {
  const current = getInstance();
  current.unMouted ? compose(current.unMouted, callback) : callback;
};

export type UnMouted = typeof unMouted;
