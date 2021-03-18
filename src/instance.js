//当前的活动组件
export const current_node = {
  current: null,
};

//获取当前的活动组件
export function getInstance(errorMessage) {
  let current = current_node.current;
  if (!current) {
    throw new Error(errorMessage || 'hooks must be called inside Component');
  }
  return current;
}
