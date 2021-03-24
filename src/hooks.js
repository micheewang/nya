import { addQueen } from './dom';
import { getInstance } from './instance';
import { compose, testFuntion } from './tool';

//数据hooks
function useChapter(chapter) {
  //获取当前active的虚拟节点
  let current = getInstance();
  //局部变量保存值
  let currentData = chapter;

  //getter
  current.getter = current.getter
    ? current.getter
    : function getter() {
        return currentData;
      };

  //setter
  current.setter = current.setter
    ? current.setter
    : function setter(value) {
        //缓存新值
        currentData = value;
        //添加至渲染队列
        addQueen(current);
      };

  return [current.getter, current.setter];
}

function useMouted(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.mouted = current.mouted
    ? compose(current.mouted, callback)
    : callback;
}

function useUpdate(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.update = current.update
    ? compose(current.update, callback)
    : callback;
}

function useUnMouted(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.unMouted = current.unMouted
    ? compose(current.unMouted, callback)
    : callback;
}

export default {
  useChapter,
  useMouted,
  useUpdate,
  useUnMouted,
};
