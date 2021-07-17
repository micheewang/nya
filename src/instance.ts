import { Component } from './component';

interface CurrentNode {
  current: null | Component;
}

// active Element
export const currentNode: CurrentNode = {
  current: null,
};

//获取当前的活动组件
export function getInstance(errorMessage?: string): Component {
  let current = currentNode.current;
  if (!current) {
    throw new Error(errorMessage || 'hooks must be called inside Component');
  }
  return current;
}
