export function createRef() {
  return function f(ref) {
    f.current = ref;
  };
}
