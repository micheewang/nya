export interface Ref<T> {
  (ref: T);
  current: T | null;
}

interface UseRef {
  <T>(): Ref<T>;
}

export const useRef: UseRef = function useRef() {
  const setRef = function (s) {
    setRef.current = s;
  };

  setRef.current = null;
  return setRef;
};
