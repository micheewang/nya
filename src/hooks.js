import { getInstance } from './dom';

function resolveDispatcher() {
  let current = getInstance().current;
  if (!current) {
    throw new Error('hooks must be called inside Component');
  }
  return current;
}

function useChapter(chapter) {
  let current = resolveDispatcher();
  current.chapter = chapter
  let setChapter = (current.setChapter = function (effect) {
    this.chapter = chapter;
  });
  return [chapter, setChapter];
}

export default {
  useChapter,
};
