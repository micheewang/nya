import { addQueen, chapterSymbol, getInstance } from './dom';
import { compose, noop, testFuntion } from './tool';

function resolveDispatcher() {
  let current = getInstance().current;
  if (!current) {
    throw new Error('hooks must be called inside Component');
  }
  return current;
}

function useChapter(chapter) {
  let current = resolveDispatcher();
  Object.freeze(chapter);
  let currentData = chapter;

  return [
    function getter() {
      return currentData;
    },
    function setter(value) {
      currentData = value;
      addQueen(chapterSymbol, current);
    },
  ];
}

function useMouted(callback) {
  testFuntion(callback);
  let current = resolveDispatcher();
  current.mouted = callback;
}

function useUnMouted(callback) {
  testFuntion(callback);
  let current = resolveDispatcher();
  current.unMouted = callback;
}

export default {
  useChapter,
  useMouted,
  useUnMouted,
};
