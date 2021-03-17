export const current_node = {
  current: null,
};

export function getInstance(errorMessage) {
  let current = current_node.current;
  if (!current) {
    throw new Error(errorMessage || 'hooks must be called inside Component');
  }
  return current;
}
