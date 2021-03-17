import { addQueen, chapterSymbol } from './dom';
import { getInstance } from './getInstance';
import { testFuntion } from './tool';

function useChapter(chapter) {
  let current = getInstance();
  let currentData = chapter;

  Object.freeze(chapter);
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
  let current = getInstance();
  current.mouted = callback;
}

function useUpdate() {
  testFuntion(callback);
  let current = getInstance();
  current.update = callback;
}

function useUnMouted(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.unMouted = callback;
}

function useRef(callback) {
  testFuntion(callback);
}

export default {
  useRef,
  useChapter,
  useMouted,
  useUpdate,
  useUnMouted,
};
