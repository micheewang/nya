import { addQueen } from './dom';
import { getInstance } from './instance';
import { testFuntion } from './tool';

//数据hooks
function useChapter(chapter) {
  //获取当前active的虚拟节点
  let current = getInstance();
  //局部变量保存值
  let currentData = chapter;

  return [
    //getter
    function getter() {
      return currentData;
    },
    //setter
    function setter(value) {
      //缓存新值
      currentData = value;
      //添加至渲染队列
      addQueen(current);
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

export default {
  useChapter,
  useMouted,
  useUpdate,
  useUnMouted,
};
